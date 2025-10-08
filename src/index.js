const core = require('@actions/core')
const fs = require('fs')

const merge = require('deepmerge')

;(async () => {
    try {
        core.info('🏳️ Starting Update JSON Value Action')

        // Parse Inputs
        const inputs = getInputs()
        core.startGroup('Parsed Inputs')
        console.log('inputs:', inputs)
        core.endGroup() // Inputs

        if (inputs.keys.length !== inputs.values.length) {
            return core.setFailed('Keys and Values length are not equal.')
        }

        // Source Data
        const fileData = fs.readFileSync(inputs.file)
        const source = JSON.parse(fileData.toString())
        // console.log('source:', source)

        // Update JSON
        let data
        core.startGroup('Processing')
        if (inputs.json) {
            if (fs.existsSync(inputs.json)) {
                console.log(`Parsing JSON File: ${inputs.json}`)
                const file = fs.readFileSync(inputs.json, 'utf8')
                // console.log('file:', file)
                const json = JSON.parse(file)
                // console.log('json:', json)
                data = merge(source, json)
            } else {
                console.log('Parsing JSON String.')
                const json = JSON.parse(inputs.json)
                // console.log('json:', json)
                data = merge(source, json)
            }
        } else {
            for (let i = 0; i < inputs.keys.length; i++) {
                const key = inputs.keys[i]
                const value = inputs.values[i]
                console.log(`${i + 1}: ${key}: \u001b[36m${value}`)
                setNestedValue(source, key, value, inputs.seperator)
            }
            data = source
        }
        // console.log('data:', data)
        core.endGroup() // Processing

        // Parse Result
        core.startGroup('Results')
        const result = JSON.stringify(data, null, 2)
        console.log(result)
        core.endGroup() // Results

        // Write File
        if (inputs.write) {
            core.info(`💾 Wriring Result: \u001b[32;1m${inputs.file}`)
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
            try {
                await writeSummary(inputs, result)
            } catch (e) {
                console.log(e)
                core.error(`Error writing Job Summary ${e.message}`)
            }
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
 * @function writeSummary
 * @param {Inputs} inputs
 * @param {String} result
 * @return {Promise<void>}
 */
async function writeSummary(inputs, result) {
    core.summary.addRaw('### Update JSON Value Action\n')
    const icon = inputs.write ? '✔️' : '❌'
    core.summary.addRaw(`💾 ${icon} \`${inputs.file}\`\n`)

    const results = []
    inputs.keys.forEach((key, i) => {
        results.push([{ data: key }, { data: `<code>${inputs.values[i]}</code>` }])
    })
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

    const yaml = Object.entries(inputs)
        .map(([k, v]) => `${k}: ${JSON.stringify(v)}`)
        .join('\n')
    core.summary.addRaw('<details><summary>Inputs</summary>')
    core.summary.addCodeBlock(yaml, 'yaml')
    core.summary.addRaw('</details>\n')

    const text = 'View Documentation, Report Issues or Request Features'
    const link = 'https://github.com/cssnr/update-json-value-action'
    core.summary.addRaw(`\n[${text}](${link}?tab=readme-ov-file#readme)\n\n---`)
    await core.summary.write()
}

/**
 * Get Inputs
 * @typedef {Object} Inputs
 * @property {String} file
 * @property {String[]} keys
 * @property {String[]} values
 * @property {String} json
 * @property {Boolean} write
 * @property {String} seperator
 * @property {Boolean} summary
 * @return {Inputs}
 */
function getInputs() {
    const values = core.getInput('values') || process.env.GITHUB_REF_NAME
    return {
        file: core.getInput('file', { required: true }),
        keys: core.getInput('keys', { required: true }).split('\n'),
        values: values.split('\n'),
        json: core.getInput('json'),
        write: core.getBooleanInput('write'),
        seperator: core.getInput('seperator', {
            required: true,
            trimWhitespace: false,
        }),
        summary: core.getBooleanInput('summary'),
    }
}
