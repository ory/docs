import fetch from "node-fetch"
import {
  examplesBaseUrl,
  startExamplesApp,
  stopExamplesApp,
} from "../utils/startExpressExamples"

describe("identity login (Express/JS)", () => {
  beforeAll(async () => {
    await startExamplesApp()
  })

  afterAll(async () => {
    await stopExamplesApp()
  })

  it("redirects to Ory login UI when no session on /login", async () => {
    const res = await fetch(`${examplesBaseUrl}/login`, {
      redirect: "manual",
    })

    expect(res.status).toBe(302)
    const location = res.headers.get("location")
    expect(location).toContain("/self-service/login/browser")
  })
})
