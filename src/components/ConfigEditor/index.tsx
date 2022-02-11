import React, { useEffect, useState } from 'react'
import Form from '@rjsf/core'
import { Resolver } from '@stoplight/json-ref-resolver'
import axios from 'axios'
import RefParser from '@apidevtools/json-schema-ref-parser'


export default function ConfigEditor(props: { schema: any }) {
  const [schema, setSchema] = useState<any>()

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
    <Form
      schema={schema}
      liveValidate={true}
    />
  )
}
