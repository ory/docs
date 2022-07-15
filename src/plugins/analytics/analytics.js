/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment'

export default (function () {
  if (!ExecutionEnvironment.canUseDOM) {
    return null
  }

  // Workaround until https://github.com/facebook/docusaurus/issues/3399 is fixed
  let lastLocation = window.location.pathname
  return {
    onRouteUpdate({ location }) {
      if (typeof window.gtag !== 'function') {
        return
      }

      const pagePath = location
        ? location.pathname + location.search + location.hash
        : undefined

      if (lastLocation === location.pathname) {
        return
      }
      lastLocation = location.pathname

      window.gtag('config', 'UA-71865250-1', {
        page_path: pagePath
      })
    }
  }
})()
