const core = require('@actions/core')
const fs = require('fs')

;(async () => {
    try {
        core.info('🏳️ Starting Update JSON Value Action')

        // Parse Config
        const config = getConfig()
        core.startGroup('Parsed Config')
        console.log('config:', config)
        core.endGroup() // Config

        if (config.keys.length !== config.values.length) {
            return core.setFailed('Keys and Values length are not equal.')
        }

        // Update JSON
        core.startGroup('Processing')
        const fileData = fs.readFileSync(config.file)
        const data = JSON.parse(fileData.toString())
        for (let i = 0; i < config.keys.length; i++) {
            const key = config.keys[i]
            const value = config.values[i]
            console.log(`${i + 1}: ${key}: \u001b[36m${value}`)
            setNestedValue(data, key, value, config.seperator)
        }
        core.endGroup() // Processing

        // Parse Result
        core.startGroup('Results')
        const result = JSON.stringify(data, null, 2)
        console.log(result)
        core.endGroup() // Results

        // Write File
        if (config.write) {
            core.info(`💾 Wriring Result: \u001b[32;1m${config.file}`)
            fs.writeFileSync(config.file, result)
        } else {
            core.info('⏩ \u001b[33mSkipping Wriring File')
        }

        // Set Output
        core.info('📩 Setting Outputs')
        core.setOutput('result', JSON.stringify(data))

        // Job Summary
        if (config.summary) {
            core.info('📝 Writing Job Summary')
            await writeSummary(config, result)
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
 * @param {Config} config
 * @param {String} result
 * @return {Promise<void>}
 */
async function writeSummary(config, result) {
    const results = []
    config.keys.forEach((key, i) => {
        results.push([
            { data: key },
            { data: `<code>${config.values[i]}</code>` },
        ])
    })

    core.summary.addRaw('### Update JSON Value Action\n')
    const icon = config.write ? '✔️' : '❌'
    core.summary.addRaw(`💾 ${icon} \`${config.file}\`\n`)

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

    core.summary.addRaw('<details><summary>config</summary>')
    core.summary.addTable([
        [
            { data: 'Input', header: true },
            { data: 'Value', header: true },
        ],
        [{ data: 'file' }, { data: `<code>${config.file}</code>` }],
        [{ data: 'keys' }, { data: `<code>${config.keys.join(',')}</code>` }],
        [
            { data: 'values' },
            { data: `<code>${config.values.join(',')}</code>` },
        ],
        [{ data: 'write' }, { data: `<code>${config.write}</code>` }],
        [{ data: 'seperator' }, { data: `<code>${config.seperator}</code>` }],
    ])
    core.summary.addRaw('</details>\n')

    const text = 'View Documentation, Report Issues or Request Features'
    const link = 'https://github.com/cssnr/update-json-value-action'
    core.summary.addRaw(`\n[${text}](${link}?tab=readme-ov-file#readme)`)
    await core.summary.write()
}

/**
 * Get Config
 * @typedef {Object} Config
 * @property {String} file
 * @property {String[]} keys
 * @property {String[]} values
 * @property {Boolean} write
 * @property {String} seperator
 * @property {Boolean} summary
 * @return {Config}
 */
function getConfig() {
    const values = core.getInput('values') || process.env.GITHUB_REF_NAME
    return {
        file: core.getInput('file', { required: true }),
        keys: core.getInput('keys', { required: true }).split('\n'),
        values: values.split('\n'),
        write: core.getBooleanInput('write'),
        seperator: core.getInput('seperator', {
            required: true,
            trimWhitespace: false,
        }),
        summary: core.getBooleanInput('summary'),
    }
}
