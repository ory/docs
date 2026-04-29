import { injectSpeedInsights } from "@vercel/speed-insights"

if (typeof window !== "undefined") {
  injectSpeedInsights({
    scriptSrc:
      "https://docs-omega-six.vercel.app/_vercel/speed-insights/script.js",
    endpoint: "https://docs-omega-six.vercel.app/_vercel/speed-insights/vitals",
  })
}
