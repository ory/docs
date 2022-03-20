import { UiText } from "@ory/client"
import { toast } from "react-toastify"

export function showMessages(messages: UiText[] | undefined) {
  if (!messages) return
  messages.forEach((message: UiText) => {
    const type = message.type === "error" ? "error" : "info"
    toast[type](message.text)
  })
}
