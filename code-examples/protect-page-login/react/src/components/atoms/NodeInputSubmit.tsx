import { getNodeLabel } from "@ory/integrations/ui"
import { NodeInputProps } from "@/types"
import { MouseEvent } from "react"

export function NodeInputSubmit({
  node,
  attributes,
  setValue,
  disabled,
  dispatchSubmit,
}: NodeInputProps) {
  const handleOnClick = (event: MouseEvent) => {
    // On click, we set this value, and once set, dispatch the submission!
    setValue(attributes.value).then(() => dispatchSubmit(event))
  }
  return (
    <button
      name={attributes.name}
      className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      onClick={(event: MouseEvent) => handleOnClick(event)}
      value={attributes.value || ""}
      disabled={attributes.disabled || disabled}
    >
      {getNodeLabel(node)}
    </button>
  )
}
