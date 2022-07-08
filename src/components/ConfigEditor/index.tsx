import React, { useEffect, useState } from "react"
import axios from "axios"
import RefParser from "@apidevtools/json-schema-ref-parser"
import Form from "@rjsf/material-ui"

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

  return (
    <div className="bootstrap">
      <Form schema={schema} liveValidate={true} />
    </div>
  )
}
