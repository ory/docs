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

  const script = document.createElement('script')
  script.onload = (evt) => console.info('/scripts.js loaded', evt)
  script.src = '/scripts.js'
  document.body.appendChild(script)
  console.info('loading /scripts.js');
  
  return {
    onRouteUpdate() {
      console.info('onRouteUpdate', typeof window.initAnalytics);
      if (
        window
        && typeof window.initAnalytics === 'function'
        // && process.env.NODE_ENV === 'production'
      ) {
        window.initAnalytics()
      }
    }
  }
})()
