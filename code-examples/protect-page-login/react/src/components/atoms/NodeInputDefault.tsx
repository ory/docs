import { NodeInputProps } from "@/types"
import { v4 as uuid } from "uuid"

export function NodeInputDefault(props: NodeInputProps) {
  const { node, attributes, value = "", setValue, disabled } = props
  const uniqueId = `${
    attributes.name ? attributes.name.toLowerCase().split(" ").join("-") : "input"
  }-${uuid()}`
  // Some attributes have dynamic JavaScript - this is for example required for WebAuthn.
  const onClick = () => {
    // This section is only used for WebAuthn. The script is loaded via a <script> node
    // and the functions are available on the global window level. Unfortunately, there
    // is currently no better way than executing eval / function here at this moment.
    if (attributes.onclick) {
      const run = new Function(attributes.onclick)
      run()
    }
  }

  const hasError = !!node.messages.find(({ type }) => type === "error")

  // Render a generic text input field.
  return (
    <div>
      <label htmlFor={uniqueId} className="block text-sm font-medium text-gray-700">
        {attributes.name}
      </label>
      <input
        id={uniqueId}
        title={node.meta.label?.text}
        onClick={onClick}
        onChange={(e) => {
          setValue(e.target.value)
        }}
        type={attributes.type}
        name={attributes.name}
        className={`shadow-sm block w-full sm:text-sm rounded-md disabled:opacity-50 ${
          hasError
            ? "border-red-300 text-red-900 placeholder-red-300 focus:outline-none focus:ring-red-500"
            : "border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
        }
        `}
        value={value}
        disabled={attributes.disabled || disabled}
      />
      {node.messages &&
        node.messages.map(({ text, id }, k) => (
          <span key={`${id}-${k}`} data-testid={`ui/message/${id}`}>
            {text}
          </span>
        ))}
    </div>
  )
}
