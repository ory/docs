// Copyright © 2022 Ory Corp
// SPDX-License-Identifier: Apache-2.0

import React, { useEffect, useState } from "react"
import Redoc from "@theme/Redoc"
import "./API.module.css"
import { useLatestRelease } from "../hooks"

const canUseDOM: boolean = !!(
  typeof window !== "undefined" &&
  window.document &&
  window.document.createElement
)

function API({
  url,
  repo,
  override,
}: {
  url?: string
  repo?: string
  override?: any
}) {
  const version = repo ? useLatestRelease(repo, "master") : "master"
  const [spec, setSpec] = useState<any>(override)

  useEffect(() => {
    if (override || !canUseDOM || !url) {
      return
    }
    fetch(url.replace(/master/, version))
      .then((r) => r.json())
      .then((res) => {
        setSpec(res)
      })
  }, [url, version, override])

  if (!spec || !canUseDOM) {
    return <></>
  }

  return <Redoc spec={spec} />
}

export default API