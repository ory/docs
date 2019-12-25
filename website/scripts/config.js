const RefParser = require('json-schema-ref-parser');
const parser = new RefParser();
const jsf = require('json-schema-faker');
const YAML = require('yaml');
const { pathOr } = require('ramda');

jsf.option({
  alwaysFakeOptionals: true,
  useExamplesValue: true,
  useDefaultValue: true,
  minItems: 1,
});

const enhance = (schema, parents = []) => item => {
  const key = item.key.value;

  const path = [
    ...parents.map(parent => ['properties', parent]),
    ['properties', key],
  ].flat();

  if (['title', 'description'].find(f => path[path.length - 1] === f)) {
    return;
  }

  const comments = [`# ${pathOr(key, [...path, 'title'], schema)} ##`, ''];

  const description = pathOr('', [...path, 'description'], schema);
  if (description) {
    comments.push(' ' + description.split('\n').join('\n '), '');
  }

  const defaultValue = pathOr('', [...path, 'default'], schema);
  if (defaultValue || defaultValue === false) {
    comments.push(' Default value: ' + defaultValue, '');
  }

  const examples = pathOr('', [...path, 'examples'], schema);
  if (examples) {
    comments.push(
      ' Examples:',
      ...YAML.stringify(examples)
        .split('\n')
        .map(i => ` ${i}`)
    ); // split always returns one empty object so no need for newline
  }

  let hasChildren;
  if (item.value.items) {
    item.value.items.forEach(item => {
      if (item.key) {
        enhance(schema, [...parents, key])(item);
        hasChildren = true;
      }
    });
  }

  if (!hasChildren) {
    const env = [...parents, key].map(i => i.toUpperCase()).join('_');
    comments.push(
      ' Set this value using environment variables on',
      ' - Linux/macOS:',
      `    $ export ${env}=<value>`,
      ' - Windows Command Line (CMD):',
      `    > set ${env}=<value>`,
      ''
    );
  }

  item.commentBefore = comments.join('\n');
  item.spaceBefore = true;
};

new Promise((resolve, reject) => {
  parser.dereference(require(process.argv[2]), (err, result) =>
    err ? reject(err) : resolve(result)
  );
})
  .then(schema => {
    const removeAdditionalProperties = o => {
      delete o['additionalProperties'];
      if (o.properties) {
        Object.keys(o.properties).forEach(key =>
          removeAdditionalProperties(o.properties[key])
        );
      }
    };

    const enableAll = o => {
      if (o.properties) {
        Object.keys(o.properties).forEach(key => {
          if (key === 'enable') {
            o.properties[key] = true;
          }
          enableAll(o.properties[key]);
        });
      }
    };

    removeAdditionalProperties(schema);
    enableAll(schema);
    if (schema.definitions) {
      Object.keys(schema.definitions).forEach(key => {
        removeAdditionalProperties(schema.definitions[key]);
        enableAll(schema.definitions[key]);
      });
    }

    jsf.option({
      useExamplesValue: true,
      useDefaultValue: false, // do not change this!!
      fixedProbabilities: true,
      alwaysFakeOptionals: true,
    });

    const values = jsf.generate(schema);
    const doc = YAML.parseDocument(YAML.stringify(values));

    const comments = [
      `# ${pathOr(process.argv[2].split('/').pop(), ['title'], schema)}`,
      '',
    ];

    const description = pathOr('', ['description'], schema);
    if (description) {
      comments.push(' ' + description);
    }

    doc.commentBefore = comments.join('\n');
    doc.spaceAfter = false;
    doc.spaceBefore = false;

    doc.contents.items.forEach(enhance(schema, []));

    return Promise.resolve({
      // schema,
      // values,
      yaml: doc.toString(),
    });
  })
  .then(out => {
    console.log(`
---
id: configuration
title: Configuration
---

<!-- THIS FILE IS BEING AUTO-GENERATED. DO NOT MODIFY IT AS ALL CHANGES WILL BE OVERWRITTEN.
OPEN AN ISSUE IF YOU WOULD LIKE TO MAKE ADJUSTMENTS HERE AND MAINTAINERS WILL HELP YOU LOCATE THE RIGHT
FILE -->

If file \`$HOME/.${
      process.argv[3]
    }.yaml\` exists, it will be used as a configuration file which supports all
configuration settings listed below.

You can load the config file from another source using the \`-c path/to/config.yaml\` or \`--config path/to/config.yaml\`
flag: \`${process.argv[3]} --config path/to/config.yaml\`.

Config files can be formatted as JSON, YAML and TOML. Some configuration values support reloading without server restart.
All configuration values can be set using environment variables, as documented below.

\`\`\`yaml    
${out.yaml}
`);
  });
