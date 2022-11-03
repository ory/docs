// Copyright © 2022 Ory Corp
// SPDX-License-Identifier: Apache-2.0

// Needed as a workaround for https://answers.netlify.com/t/trailing-slash-missing-on-proxied-netlify-site/36367
;(function () {
  if (location.pathname === "/docs") {
    window.location = location.href + "/welcome"
  } else if (location.pathname === "/docs/") {
    window.location = location.href + "welcome"
  }
})()
