import React, { useEffect } from "react"

import axios from "axios"
import RefParser from "@apidevtools/json-schema-ref-parser"
import jsf from "json-schema-faker"
import YAML from "yaml"
import Admonition from "@theme/Admonition"
import CodeBlock from "@theme/CodeBlock"
import { pathOr } from "../../utils/pathOr"

const parser = new RefParser()

const refs = {
  "ory://tracing-config": `https://raw.githubusercontent.com/ory/x/master/otelx/config.schema.json`,
  "ory://logging-config": `https://raw.githubusercontent.com/ory/x/master/logrusx/config.schema.json`,
  "ory://serve-config": `https://raw.githubusercontent.com/ory/x/master/configx/serve.schema.json`,
  "ory://cors-config": `https://raw.githubusercontent.com/ory/x/master/configx/cors.schema.json`,
  "ory://tls-config": `https://raw.githubusercontent.com/ory/x/master/configx/tls.schema.json`,
}

const enhance =
  (schema, parents = []) =>
  (item) => {
    const key = item.key.value

    const path = [
      ...parents.map((parent) => ["properties", parent]),
      ["properties", key],
    ].flat()

    if (["title", "description"].find((f) => path[path.length - 1] === f)) {
      return
    }

    const comments = [`# ${pathOr(key, [...path, "title"], schema)} ##`, ""]

    const description = pathOr("", [...path, "description"], schema)
    if (description) {
      comments.push(" " + description.split("\n").join("\n "), "")
    }

    const defaultValue = pathOr("", [...path, "default"], schema)
    if (defaultValue || defaultValue === false) {
      comments.push(" Default value: " + defaultValue, "")
    }

    const enums = pathOr("", [...path, "enum"], schema)
    if (enums && Array.isArray(enums)) {
      comments.push(
        " One of:",
        ...YAML.stringify(enums)
          .split("\n")
          .map((i) => ` ${i}`),
      ) // split always returns one empty object so no need for newline
    }

    const min = pathOr("", [...path, "minimum"], schema)
    if (min || min === 0) {
      comments.push(` Minimum value: ${min}`, "")
    }

    const max = pathOr("", [...path, "maximum"], schema)
    if (max || max === 0) {
      comments.push(` Maximum value: ${max}`, "")
    }

    const examples = pathOr("", [...path, "examples"], schema)
    if (examples) {
      comments.push(
        " Examples:",
        ...YAML.stringify(examples)
          .split("\n")
          .map((i) => ` ${i}`),
      ) // split always returns one empty object so no need for newline
    }

    let hasChildren
    if (item.value.items) {
      item.value.items.forEach((item) => {
        if (item.key) {
          enhance(schema, [...parents, key])(item)
          hasChildren = true
        }
      })
    }

    const showEnvVarBlockForObject = pathOr(
      "",
      [...path, "showEnvVarBlockForObject"],
      schema,
    )
    if (!hasChildren || showEnvVarBlockForObject) {
      const env = [...parents, key].map((i) => i.toUpperCase()).join("_")
      comments.push(
        " Set this value using environment variables on",
        " - Linux/macOS:",
        `    $ export ${env}=<value>`,
        " - Windows Command Line (CMD):",
        `    > set ${env}=<value>`,
        "",
      )

      // Show this if the config property is an object, to call out how to specify the env var
      if (hasChildren) {
        comments.push(
          " This can be set as an environment variable by supplying it as a JSON object.",
          "",
        )
      }
    }

    item.commentBefore = comments.join("\n")
    item.spaceBefore = true
  }

export const oryResolver = {
  order: 1,
  canRead: /^ory:/i,
  read: ({ url }) => axios.get(refs[url]).then(({ data }) => data),
}

export default function ConfigMarkdown(props: { src: string; binary: string }) {
  const [content, setContent] = React.useState("")

  jsf.option({
    alwaysFakeOptionals: true,
    useExamplesValue: true,
    useDefaultValue: true,
    minItems: 1,
    random: () => 0,
  })

  useEffect(() => {
    fetch(props.src)
      .then((r) => r.json())
      .then((schema) => {
        new Promise((resolve, reject) => {
          if (schema.title === "ORY Oathkeeper Configuration") {
            schema["$id"] =
              "https://github.com/ory/oathkeeper/schema/config.schema.json"
          }
          parser.dereference(
            schema,
            {
              resolve: {
                ory: oryResolver,
              },
            },
            (err, result) => (err ? reject(err) : resolve(result)),
          )
        })
          .then((schema: any) => {
            const removeAdditionalProperties = (o) => {
              delete o["additionalProperties"]
              if (o.properties) {
                Object.keys(o.properties).forEach((key) =>
                  removeAdditionalProperties(o.properties[key]),
                )
              }
            }

            const enableAll = (o) => {
              if (o.properties) {
                Object.keys(o.properties).forEach((key) => {
                  if (key === "enable") {
                    o.properties[key] = true
                  }
                  enableAll(o.properties[key])
                })
              }
            }

            removeAdditionalProperties(schema)
            enableAll(schema)
            if (schema.definitions) {
              Object.keys(schema.definitions).forEach((key) => {
                removeAdditionalProperties(schema.definitions[key])
                enableAll(schema.definitions[key])
              })
            }

            jsf.option({
              useExamplesValue: true,
              useDefaultValue: false, // do not change this!!
              fixedProbabilities: true,
              alwaysFakeOptionals: true,
            })

            const values = jsf.generate(schema)
            const doc = YAML.parseDocument(YAML.stringify(values))

            const comments = [
              `# ${pathOr(props.binary, ["title"], schema)}`,
              "",
            ]

            const description = pathOr("", ["description"], schema)
            if (description) {
              comments.push(" " + description)
            }

            doc.commentBefore = comments.join("\n")
            doc.spaceAfter = false
            doc.spaceBefore = false

            doc.contents.items.forEach(enhance(schema, []))

            return Promise.resolve({
              // schema,
              // values,
              yaml: doc.toString(),
            })
          })
          .then((out) => {
            setContent(out.yaml)
          })
      })
  }, [props.src])

  return (
    <>
      <p>
        You can load the config file from another source using the{" "}
        <code>-c path/to/config.yaml</code> or{" "}
        <code>--config path/to/config.yaml</code> flag:{" "}
        <code>${props.binary} --config path/to/config.yaml</code>.
      </p>
      <p>
        Config files can be formatted as JSON, YAML and TOML. Some configuration
        values support reloading without server restart. All configuration
        values can be set using environment variables, as documented below.
      </p>

      <Admonition type="warning" title={"Disclaimer"}>
        <p>
          This reference configuration documents all keys, also deprecated ones!
          It is a reference for all possible configuration values.
        </p>
        <p>
          If you are looking for an example configuration, it is better to try
          out the quickstart.
        </p>
      </Admonition>
      <p>
        To find out more about edge cases like setting string array values
        through environmental variables head to the{" "}
        <a href={"/docs/ecosystem/configuring"}>Configuration</a> section.
      </p>

      <CodeBlock language="yaml">{content}</CodeBlock>
    </>
  )
}
