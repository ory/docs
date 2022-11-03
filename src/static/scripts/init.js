// Copyright © 2022 Ory Corp
// SPDX-License-Identifier: Apache-2.0

;(function () {
  const script = document.createElement("script")
  script.src = "https://www.ory.sh/scripts.js"
  script.async = true
  script.onload = function () {
    window.initAnalytics("GTM-NTT7RMX")
  }
  document.body.appendChild(script)
})()
