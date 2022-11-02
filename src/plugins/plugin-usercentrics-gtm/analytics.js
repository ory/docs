import ExecutionEnvironment from "@docusaurus/ExecutionEnvironment"

export default (function () {
  if (!ExecutionEnvironment.canUseDOM) {
    return null
  }

  return {
    onRouteDidUpdate({ location, previousLocation }) {
      if (
        previousLocation &&
        (location.pathname !== previousLocation.pathname ||
          location.search !== previousLocation.search ||
          location.hash !== previousLocation.hash)
      ) {
        window.dataLayer = window.dataLayer || []
        window.dataLayer.push({
          event: "track",
          action: "page_view",
          track: null,
        })
      }
    },
  }
})()
