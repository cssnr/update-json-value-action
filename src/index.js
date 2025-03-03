const core = require('@actions/core')
const fs = require('fs')

;(async () => {
    try {
        core.info('🏳️ Starting Update JSON Value Action')

        // Parse Inputs
        const inputs = parseInputs()
        console.log('inputs:', inputs)

        // Validate Inputs
        if (inputs.keys.length !== inputs.values.length) {
            return core.setFailed('Keys and Values length are not equal.')
        }

        // Update JSON: data
        const fileData = fs.readFileSync(inputs.file)
        const data = JSON.parse(fileData.toString())
        for (let i = 0; i < inputs.keys.length; i++) {
            const key = inputs.keys[i]
            const value = inputs.values[i]
            console.log(`--- ${i + 1}: ${key}: ${value}`)
            setNestedValue(data, key, value, inputs.seperator)
        }

        // Display Result: result
        const result = JSON.stringify(data, null, 2)
        console.log('-'.repeat(40))
        console.log(result)
        console.log('-'.repeat(40))

        // Write File
        if (inputs.write) {
            core.info(`💾 \u001b[32mWriring Results: ${inputs.file}`)
            fs.writeFileSync(inputs.file, result)
        } else {
            core.info('⏩ \u001b[33mSkipping Wriring File')
        }

        // Set Output
        core.info('📩 Setting Outputs')
        core.setOutput('result', JSON.stringify(data))

        // Job Summary
        if (inputs.summary) {
            core.info('📝 Writing Job Summary')
            await writeSummary(inputs, result)
        } else {
            core.info('⏩ Skipping Job Summary')
        }

        core.info('✅ \u001b[32;1mFinished Success')
    } catch (e) {
        core.debug(e)
        core.info(e.message)
        core.setFailed(e.message)
    }
})()

/**
 * @function setNestedValue
 * @param {Object} obj JSON Object
 * @param {String} path Nested Key String
 * @param {String} value Value to set
 * @param {String} sep Nested Key Seperator
 */
function setNestedValue(obj, path, value, sep) {
    const keys = path.split(sep)
    let current = obj
    for (let i = 0; i < keys.length - 1; i++) {
        const key = keys[i]
        if (!(key in current)) {
            current[key] = {}
        }
        current = current[key]
    }
    current[keys[keys.length - 1]] = value
}

/**
 * @function parseInputs
 * @return {{file: string, keys: string[], values: string[], write: boolean, seperator: string, summary: boolean}}
 */
function parseInputs() {
    const values = core.getInput('values') || process.env.GITHUB_REF_NAME
    const seperator = core.getInput('seperator', {
        required: true,
        trimWhitespace: false,
    })
    return {
        file: core.getInput('file', { required: true }),
        keys: core.getInput('keys', { required: true }).split('\n'),
        values: values.split('\n'),
        write: core.getBooleanInput('write'),
        seperator: seperator,
        summary: core.getBooleanInput('summary'),
    }
}

/**
 * @function writeSummary
 * @param {Object} inputs
 * @param {String} result
 * @return {Promise<void>}
 */
async function writeSummary(inputs, result) {
    const results = []
    inputs.keys.forEach((key, i) => {
        results.push([
            { data: key },
            { data: `<code>${inputs.values[i]}</code>` },
        ])
    })

    core.summary.addRaw('### Update JSON Value Action\n')
    const icon = inputs.write ? '✔️' : '❌'
    core.summary.addRaw(`💾 ${icon} \`${inputs.file}\`\n`)

    core.summary.addRaw('<details><summary>Keys/Values</summary>')
    core.summary.addTable([
        [
            { data: 'Key', header: true },
            { data: 'Value', header: true },
        ],
        ...results,
    ])
    core.summary.addRaw('</details>\n')

    core.summary.addRaw('<details><summary>Results</summary>\n\n')
    core.summary.addRaw(`\`\`\`json\n${result}\n\`\`\``)
    core.summary.addRaw('\n\n</details>\n')

    core.summary.addRaw('<details><summary>Inputs</summary>')
    core.summary.addTable([
        [
            { data: 'Input', header: true },
            { data: 'Value', header: true },
        ],
        [{ data: 'file' }, { data: `<code>${inputs.file}</code>` }],
        [{ data: 'keys' }, { data: `<code>${inputs.keys.join(',')}</code>` }],
        [
            { data: 'values' },
            { data: `<code>${inputs.values.join(',')}</code>` },
        ],
        [{ data: 'write' }, { data: `<code>${inputs.write}</code>` }],
        [{ data: 'seperator' }, { data: `<code>${inputs.seperator}</code>` }],
    ])
    core.summary.addRaw('</details>\n')

    const text = 'View Documentation, Report Issues or Request Features'
    const link = 'https://github.com/cssnr/update-json-value-action'
    core.summary.addRaw(`\n[${text}](${link}?tab=readme-ov-file#readme)`)
    await core.summary.write()
}
