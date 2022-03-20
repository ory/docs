import { getNodeLabel } from "@ory/integrations/ui"
import { NodeInputProps } from "@/types"
import { MouseEvent } from "react"

export function NodeInputButton({
  node,
  attributes,
  setValue,
  disabled,
  dispatchSubmit,
}: NodeInputProps) {
  // Some attributes have dynamic JavaScript - this is for example required for WebAuthn.
  const onClick = (e: MouseEvent) => {
    // This section is only used for WebAuthn. The script is loaded via a <script> node
    // and the functions are available on the global window level. Unfortunately, there
    // is currently no better way than executing eval / function here at this moment.
    if (attributes.onclick) {
      const run = new Function(attributes.onclick)
      run()
    }
    setValue(attributes.value).then(() => dispatchSubmit(e))
  }

  return (
    <button
      name={attributes.name}
      onClick={(event: MouseEvent) => onClick(event)}
      className="px-3 py-2 text-xs rounded-md inline-flex items-center border font-medium border-primary shadow-sm leading-4 text-primary bg-white hover:bg-primary hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      value={attributes.value || ""}
      disabled={attributes.disabled || disabled}
    >
      {getNodeLabel(node)}
    </button>
  )
}
