const RefParser = require('json-schema-ref-parser')
const parser = new RefParser();
const jsf = require('json-schema-faker')
yaml = require('js-yaml');

jsf.option({
    alwaysFakeOptionals: true,
    useExamplesValue: true,
    useDefaultValue: true,
    minItems: 1,
})

const overrides = {}

const override = (values, schema) => {
    Object.keys(values).forEach((key) => {
        overrides

        delete values[key]
    })

}

new Promise((resolve, reject) => {
    parser.dereference(require(process.argv[2]), (err, result) => err ? reject(err) : resolve(result))
}).then((schema) => {
    const values = jsf.generate(schema)


    return Promise.resolve({
        schema,
        values: jsf.generate(schema)
    })
}).then((out) => {
    console.log(out)
})

const format = (key, {
    title,
    type = 'unknown',
    description,
    properties,
    examples,
    pattern,
    ...others
}, level) => {
    let out = `# ${title || key}
#
`

    if (description) {
        out += `# ${description}
#
`
    }

    out += `# Type: ${type}
`

    if (examples) {
        out += `# Examples:
# ${yaml.safeDump(examples).split('\n').join('\n#')}
`
    }

    if (type === 'object') {
        out += Object.keys(properties).reduce((text, key) => `${text}
`, '')
    }

    return out.split('\n').join(`${'  '.repeat(level)}\n`)
}
