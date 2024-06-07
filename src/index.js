const core = require('@actions/core')
const github = require('@actions/github')
const fs = require('fs')
const semver = require('semver')

;(async () => {
    try {
        // Process Inputs
        const inputFile = core.getInput('file')
        console.log('file:', inputFile)
        const inputKey = core.getInput('key')
        console.log('inputKey:', inputKey)
        const inputVersion = core.getInput('version')
        console.log('inputVersion:', inputVersion)

        // Parse Version
        const parsedTag = github.context.ref.replace('refs/tags/', '')
        console.log('parsedTag:', parsedTag)
        const version = semver.clean(inputVersion || parsedTag)
        console.log('version:', version)
        if (!version) {
            return core.setFailed('No Input or Parsed Version.')
        }

        // Update JSON
        let file = fs.readFileSync(inputFile)
        let data = JSON.parse(file.toString())
        setNestedValue(data, inputKey, version)
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
