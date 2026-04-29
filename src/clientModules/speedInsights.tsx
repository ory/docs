import { injectSpeedInsights } from "@vercel/speed-insights"

if (typeof window !== "undefined") {
  injectSpeedInsights()
}
