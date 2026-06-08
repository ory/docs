import fetch from "node-fetch"
import {
  examplesBaseUrl,
  startExamplesApp,
  stopExamplesApp,
} from "../utils/startExpressExamples"
import { selfServiceLogin } from "../utils/loginHelpers"

describe("identity logout (Express/JS)", () => {
  let testEmail: string
  let testPassword: string
  let baseUrl: string

  beforeAll(async () => {
    await startExamplesApp()

    testEmail = process.env.TEST_USER_EMAIL || ""
    testPassword = process.env.TEST_USER_PASSWORD || ""
    baseUrl = process.env.ORY_SDK_URL || ""

    if (!testEmail || !testPassword) {
      throw new Error(
        "TEST_USER_EMAIL and TEST_USER_PASSWORD environment variables must be set. " +
          "These should be provided by the CI pipeline from GitHub secrets.",
      )
    }

    if (!baseUrl) {
      throw new Error(
        "ORY_SDK_URL environment variable must be set. " +
          "This should be provided by the CI pipeline from GitHub secrets.",
      )
    }
  })

  afterAll(async () => {
    await stopExamplesApp()
  })

  it("logs in using predefined env variables then logs out", async () => {
    // Login and get session cookie
    const sessionCookie = await selfServiceLogin(
      baseUrl,
      testEmail,
      testPassword,
    )

    // Logout
    const logoutRes = await fetch(`${examplesBaseUrl}/logout`, {
      redirect: "manual",
      headers: {
        Cookie: sessionCookie,
      },
    })

    // After logout, user should be redirected to home page
    const logoutLocation = logoutRes.headers.get("location")
    expect(logoutRes.status).toBe(302)
    expect(logoutLocation).toBe("http://127.0.0.1:3000/")
  })
})
