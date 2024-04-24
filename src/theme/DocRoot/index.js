import React from "react"
import DocRoot from "@theme-original/DocRoot"

export default function DocRootWrapper(props) {
  return (
    <div id={"route-identifier"} data-route={props.location.pathname}>
      <DocRoot {...props} />
    </div>
  )
}
