import { devices } from "@playwright/test"
import type { PlaywrightTestConfig } from "@playwright/test"

const config: PlaywrightTestConfig = {
  testDir: "./tests/playwright-argos",
  webServer: {
    port: 3000,
    command: "npm run serve",
  },
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
