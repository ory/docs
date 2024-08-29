import RefParser from "@apidevtools/json-schema-ref-parser"
import { ChakraProvider } from "@chakra-ui/react"
import { Theme as ChakraUITheme } from "@rjsf/chakra-ui"
import { withTheme } from "@rjsf/core"
import validator from "@rjsf/validator-ajv8"
import axios from "axios"
import { useEffect, useState } from "react"

const Form = withTheme(ChakraUITheme)

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
      <ChakraProvider>
        <Form schema={schema} liveValidate={true} validator={validator} />
      </ChakraProvider>
    </div>
  )
}
