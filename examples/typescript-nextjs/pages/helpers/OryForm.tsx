import {UiContainer, UiNodeInputAttributes} from "@ory/client";
import {Field, Form} from "formik";

export default function OryForm({ui}: { ui: UiContainer }) {
  return (
    <Form>
      {ui.messages && (
        <div>
          {ui.messages.map((message) => (
            <p>{message.text}</p>
          ))}
        </div>
      )}
      {ui.nodes.map((node) => {
        switch (node.type) {
          case 'input':
          default:
            const attributes = node.attributes as UiNodeInputAttributes
            switch (attributes.type) {
              case 'submit':
                return (
                  <button type="submit" name={attributes.name} disabled={attributes.disabled}>{
                    node.meta?.label?.text || attributes.name
                  }</button>
                )
              case 'hidden':
                return (
                  <Field type={attributes.type} name={attributes.name}
                         required={attributes.required} disabled={attributes.disabled}/>
                )
              default:
                return (
                  <fieldset>
                    <label htmlFor={attributes.name}> {
                      node.meta?.label?.text || attributes.name
                    }</label>
                    <br/>
                    <Field type={attributes.type} name={attributes.name}
                           required={attributes.required} disabled={attributes.disabled}/>
                    {node.messages && (
                      <div>
                        {node.messages.map((message) => (
                          <p>{message.text}</p>
                        ))}
                      </div>
                    )}
                  </fieldset>
                )
            }
        }
      })}
    </Form>
  )
}
