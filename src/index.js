const core = require('@actions/core')
const fs = require('fs')

;(async () => {
    try {
        // Parse Inputs
        const inputFile = core.getInput('file')
        console.log('file:', inputFile)
        const inputKeys = core.getInput('keys')
        console.log('inputKeys:', inputKeys)
        const inputValues = core.getInput('values')
        console.log('inputValues:', inputValues)

        // Parse Keys
        if (!inputKeys) {
            return core.setFailed('No Keys Found.')
        }
        const parsedKeys = inputKeys.split('\n')
        console.log('parsedKeys:', parsedKeys)

        // Parse Values
        const parsedValues = []
        if (!inputValues) {
            parsedValues.push(process.env.GITHUB_REF_NAME)
        } else {
            parsedValues.push(...inputValues.split('\n'))
        }
        console.log('parsedValues:', parsedValues)

        // Validate Parsed Inputs
        if (parsedKeys.length !== parsedValues.length) {
            return core.setFailed('Keys and Values are not equal in length.')
        }

        // Update JSON
        let file = fs.readFileSync(inputFile)
        let data = JSON.parse(file.toString())
        for (let i = 0; i < parsedKeys.length; i++) {
            const key = parsedKeys[i]
            const value = parsedValues[i]
            console.log(`-- ${i} -- ${key}: ${value}`)
            setNestedValue(data, key, value)
        }
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
