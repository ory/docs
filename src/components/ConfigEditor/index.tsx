import RefParser from "@apidevtools/json-schema-ref-parser"
import { withTheme } from '@rjsf/core';
import { Theme as Bootstrap4Theme } from '@rjsf/bootstrap-4';
import validator from "@rjsf/validator-ajv8"
import axios from "axios"
import { useEffect, useState } from "react"

const Form = withTheme(Bootstrap4Theme);

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
    <div className="config-editor">
      <Form schema={schema} liveValidate={true} validator={validator}/>
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css"
            integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
            crossOrigin="anonymous"/>
    </div>
  )
}
