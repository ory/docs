import fetch from "node-fetch"
import { examplesBaseUrl, startExamplesApp, stopExamplesApp } from "../utils/startExpressExamples"

const hasOryConfig = !!process.env.ORY_SDK_URL

describe("identity get-started logout and session examples (Express/JS)", () => {
  beforeAll(async () => {
    if (!hasOryConfig) {
      return
    }
    await startExamplesApp()
  })

  afterAll(async () => {
    if (!hasOryConfig) {
      return
    }
    await stopExamplesApp()
  })


  it("redirects on /logout (to Ory logout URL if session exists, or / if no session)", async () => {
    const res = await fetch(`${examplesBaseUrl}/logout`, {
      redirect: "manual",
    })

    expect(res.status).toBe(302)
    const location = res.headers.get("location") || ""
    // Without a session cookie, the logout route redirects to "/" (fallback)
    // With a session, it redirects to Ory logout URL
    if (location.includes("/self-service")) {
      expect(location).toContain("logout")
    } else {
      // No session case - redirect to "/" is the expected fallback
      expect(location).toMatch(/\/$/)
    }
  })

  it("redirects to Ory login UI when accessing /session without session cookie", async () => {
    const res = await fetch(`${examplesBaseUrl}/session`, {
      redirect: "manual",
    })

    expect(res.status).toBe(302)
    const location = res.headers.get("location") || ""
    expect(location).toContain("/self-service/login/browser")
  })

  it("redirects to refresh URL on /refresh-session", async () => {
    const res = await fetch(`${examplesBaseUrl}/refresh-session`, {
      redirect: "manual",
    })

    expect(res.status).toBe(302)
    const location = res.headers.get("location") || ""
    expect(location).toContain("/ui/login?refresh=true")
  })
})


