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
        core.summary.addRaw('### Docker Tags Action', true)
        core.summary.addTable([
            [
                { data: 'Key', header: true },
                { data: 'Value', header: true },
            ],
            [{ data: 'key1' }, { data: 'value1' }],
            [{ data: 'other.key2' }, { data: 'A Value With Spaces...' }],
        ])
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
