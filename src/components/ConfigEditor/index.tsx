import React, { useEffect, useState } from 'react'
import Form from '@rjsf/core'
import axios from 'axios'
import RefParser from '@apidevtools/json-schema-ref-parser'

export default function ConfigEditor(props: { url: any }) {
  const [schema, setSchema] = useState<any>()

  useEffect(() => {
    axios.get(props.url).then((res) => {
      RefParser.dereference(res.data, (err, api) => {
        if (err) {
          console.log(err)
        } else {
          setSchema(api)
        }
      })
    })
  }, [props.url])

  if (!schema) {
    return null
  }

  return <Form schema={schema} liveValidate={true} />
}
