import type { PlaywrightTestConfig } from "@playwright/test"
import { devices } from "@playwright/test"

const config: PlaywrightTestConfig = {
  testDir: "./tests/playwright-argos",
  webServer: {
    port: 3000,
    command: "npm run serve",
  },

  // Tests shouldn't fail. If they do something is wrong with the test or the site.
  maxFailures: 0,
  workers: 3,
  fullyParallel: true,

  projects: [
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
      },
    },
  ],
}

export default config
