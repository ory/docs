import { NodeTextProps } from "@/types"
import { UiText, UiNodeTextAttributes } from "@ory/client"
import { CodeBox, P } from "@ory/themes"

const Content = ({ attributes }: { attributes: UiNodeTextAttributes }) => {
  switch (attributes.text.id) {
    case 1050015:
      // This text node contains lookup secrets. Let's make them a bit more beautiful!
      const secrets = (attributes.text.context as any).secrets.map(
        (text: UiText, k: number) => (
          <div
            key={k}
            data-testid={`node/text/${attributes.id}/lookup_secret`}
            className="col-xs-3"
          >
            {/* Used lookup_secret has ID 1050014 */}
            <code>{text.id === 1050014 ? "Used" : text.text}</code>
          </div>
        )
      )
      return (
        <div
          className="container-fluid"
          data-testid={`node/text/${attributes.id}/text`}
        >
          <div className="row">{secrets}</div>
        </div>
      )
  }

  return (
    <div data-testid={`node/text/${attributes.id}/text`}>
      <CodeBox classNames="overflow-x-auto" code={attributes.text.text} />
    </div>
  )
}

export const NodeText = ({ node, attributes }: NodeTextProps) => {
  return (
    <>
      <P data-testid={`node/text/${attributes.id}/label`}>{node.meta?.label?.text}</P>
      <Content attributes={attributes} />
    </>
  )
}
