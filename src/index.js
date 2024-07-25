const core = require('@actions/core')
const fs = require('fs')

;(async () => {
    try {
        // Parse Inputs
        const inputFile = core.getInput('file', { required: true })
        console.log('inputFile:', inputFile)
        const inputKeys = core.getInput('keys', { required: true })
        console.log('inputKeys:', inputKeys)
        const inputValues =
            core.getInput('values') || process.env.GITHUB_REF_NAME
        console.log('inputValues:', inputValues)
        const writeFile = core.getBooleanInput('write')
        console.log('writeFile:', writeFile)
        const seperator = core.getInput('seperator', {
            required: true,
            trimWhitespace: false,
        })
        console.log('seperator:', seperator)

        // Parse Keys
        const keys = inputKeys.split('\n')
        console.log('keys:', keys)

        // Parse Values
        const values = inputValues.split('\n')
        console.log('values:', values)

        // Validate Inputs
        if (keys.length !== values.length) {
            return core.setFailed('Keys and Values length are not equal.')
        }

        // Update JSON
        const fileData = fs.readFileSync(inputFile)
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
        if (writeFile) {
            core.info(`\u001b[32mWriting result to file: ${inputFile}`)
            fs.writeFileSync(inputFile, result)
        } else {
            core.info('\u001b[33mNot writing file because write is false.')
        }

        // Set Output
        core.setOutput('result', JSON.stringify(data))
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
