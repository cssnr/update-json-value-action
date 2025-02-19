const core = require('@actions/core')
const fs = require('fs')

;(async () => {
    try {
        core.info('🏳️ Starting Update JSON Value Action')

        // Parse Inputs
        const file = core.getInput('file', { required: true })
        console.log('file:', file)
        const keys = core.getInput('keys', { required: true }).split('\n')
        console.log('keys:', keys)
        const values = (
            core.getInput('values') || process.env.GITHUB_REF_NAME
        ).split('\n')
        console.log('values:', values)
        const write = core.getBooleanInput('write')
        console.log('write:', write)
        const seperator = core.getInput('seperator', {
            required: true,
            trimWhitespace: false,
        })
        console.log('seperator:', seperator)
        const summary = core.getBooleanInput('summary')
        console.log('summary:', summary)

        // Validate Inputs
        if (keys.length !== values.length) {
            return core.setFailed('Keys and Values length are not equal.')
        }

        // Update JSON
        const fileData = fs.readFileSync(file)
        const data = JSON.parse(fileData.toString())
        for (let i = 0; i < keys.length; i++) {
            const key = keys[i]
            const value = values[i]
            console.log(`--- ${i + 1}: ${key}: ${value}`)
            setNestedValue(data, key, value, seperator)
        }

        // Display Result
        const result = JSON.stringify(data, null, 2)
        console.log('-'.repeat(40))
        console.log(result)
        console.log('-'.repeat(40))

        // Write File
        if (write) {
            core.info(`\u001b[32mWriting result to file: ${file}`)
            fs.writeFileSync(file, result)
        } else {
            core.info('\u001b[33mNot writing file because write is false.')
        }

        // Set Output
        core.setOutput('result', JSON.stringify(data))

        // Job Summary
        core.info('📝 Writing Job Summary')
        const results = []
        keys.forEach((key, i) => {
            results.push([{ data: key }, { data: values[i] }])
        })

        core.summary.addRaw('### Update JSON Value Action\n')
        const icon = write ? '✔️' : '❌'
        core.summary.addRaw(`💾 ${icon} \`${file}\`\n`)

        core.summary.addRaw('<details><summary>Results</summary>\n\n')
        core.summary.addRaw(`\`\`\`json\n${result}\n\`\`\``)
        core.summary.addRaw('\n\n</details>\n')

        core.summary.addRaw('<details><summary>Keys/Values</summary>')
        core.summary.addTable([
            [
                { data: 'Key', header: true },
                { data: 'Value', header: true },
            ],
            ...results,
        ])
        core.summary.addRaw('</details>\n')

        core.summary.addRaw('<details><summary>Inputs</summary>')
        core.summary.addTable([
            [
                { data: 'Input', header: true },
                { data: 'Value', header: true },
            ],
            [{ data: 'file' }, { data: `<code>${file}</code>` }],
            [{ data: 'keys' }, { data: `<code>${keys.join(',')}</code>` }],
            [{ data: 'values' }, { data: `<code>${values.join(',')}</code>` }],
            [{ data: 'write' }, { data: `<code>${write}</code>` }],
            [{ data: 'seperator' }, { data: `<code>${seperator}</code>` }],
        ])
        core.summary.addRaw('</details>\n')

        const text = 'View documentation, report issues or request features'
        const link = 'https://github.com/cssnr/update-json-value-action'
        core.summary.addRaw(`\n[${text}](${link}?tab=readme-ov-file#readme)`)
        await core.summary.write()

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
