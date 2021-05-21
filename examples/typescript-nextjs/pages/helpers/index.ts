import {Configuration, DefaultApi, UiContainer, UiNodeInputAttributes} from "@ory/client";

// We point the SDK to the Ory Proxy
const oryProxyUrl = 'https://localhost:4000/.ory'

export const ory = new DefaultApi(new Configuration({
  basePath: oryProxyUrl
  // DO NOT include the Ory Access Token here!
}))


export const toFormikValues = (container: UiContainer) => {
  const values: {[key: string]: any} = {}
  container.nodes.forEach((node) => {
    switch (node.type) {
      case 'input': {
        const attributes = node.attributes as UiNodeInputAttributes
        values[attributes.name] = attributes.value
      }
    }
  })
  return values
}
