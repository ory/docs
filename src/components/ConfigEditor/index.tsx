import React, { useEffect, useState } from 'react'
import Form, { IChangeEvent } from '@rjsf/core'
import CodeBlock from '@theme/CodeBlock'
import YAML from 'yaml'
import { Resolver } from '@stoplight/json-ref-resolver'
import axios from 'axios'
import RefParser from '@apidevtools/json-schema-ref-parser'

import styles from './index.module.css'

export default function ConfigEditor(props: { schema: any }) {
  const [schema, setSchema] = useState<any>()

  const yamlString = React.useMemo(() => YAML.stringify(schema), [schema])

  const handleChange = (evt: IChangeEvent<any>) => {
    console.info('handleChange', evt)
  }

  useEffect(() => {
    RefParser.dereference(props.schema, (err, api) => {
      if (err) {
        console.log(err)
      } else {
        setSchema(api)
      }
    })
  }, [schema])

  if (!schema) {
    return null
  }

  return (
    <div className={styles.root}>
      <Form
        className={styles.form}
        onChange={handleChange}
        schema={schema}
        liveValidate={true}
      />
      <CodeBlock className={styles.yaml} language="yaml">
        {yamlString}
      </CodeBlock>
    </div>
  )
}
