const core = require('@actions/core')
const fs = require('fs')

;(async () => {
    try {
        // Parse Inputs
        const inputFile = core.getInput('file')
        console.log('inputFile:', inputFile)
        const inputKeys = core.getInput('keys')
        console.log('inputKeys:', inputKeys)
        const inputValues =
            core.getInput('values') || process.env.GITHUB_REF_NAME
        console.log('inputValues:', inputValues)

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
        let file = fs.readFileSync(inputFile)
        let data = JSON.parse(file.toString())
        for (let i = 0; i < keys.length; i++) {
            const key = keys[i]
            const value = values[i]
            console.log(`-- ${i} -- ${key}: ${value}`)
            setNestedValue(data, key, value)
        }

        // Write File
        core.info(`Writing result to file ${inputFile}`)
        let result = JSON.stringify(data, null, 2)
        fs.writeFileSync(inputFile, result)

        // Display Result
        console.log('-'.repeat(40))
        console.log(result)
        console.log('-'.repeat(40))
    } catch (e) {
        core.debug(e)
        core.info(e.message)
        core.setFailed(e.message)
    }
})()

/**
 * @function setNestedValue
 * @param {Object} obj
 * @param {String} path
 * @param {String} value
 */
function setNestedValue(obj, path, value) {
    const keys = path.split('.')
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
