import fetch from "node-fetch"
import { examplesBaseUrl, startExamplesApp, stopExamplesApp } from "../utils/startExpressExamples"

const hasOryConfig = !!process.env.ORY_SDK_URL

describe("identity get-started signup/signin examples (Express/JS)", () => {
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


  it("redirects to Ory registration UI when no session on /signup", async () => {
    const res = await fetch(`${examplesBaseUrl}/signup`, {
      redirect: "manual",
    })

    expect(res.status).toBe(302)
    const location = res.headers.get("location") || ""
    expect(location).toContain("/self-service/registration/browser")
  })

  it("redirects to Ory login UI when no session on /login", async () => {
    const res = await fetch(`${examplesBaseUrl}/login`, {
      redirect: "manual",
    })

    expect(res.status).toBe(302)
    const location = res.headers.get("location") || ""
    expect(location).toContain("/self-service/login/browser")
  })
})


