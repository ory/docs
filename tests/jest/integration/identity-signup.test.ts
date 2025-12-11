import fetch from "node-fetch"
import {
  examplesBaseUrl,
  startExamplesApp,
  stopExamplesApp,
} from "../utils/startExpressExamples"

describe("identity signup (Express/JS)", () => {
  beforeAll(async () => {
    await startExamplesApp()
  })

  afterAll(async () => {
    await stopExamplesApp()
  })

  it("redirects to Ory registration UI when no session on /signup", async () => {
    const res = await fetch(`${examplesBaseUrl}/signup`, {
      redirect: "manual",
    })

    expect(res.status).toBe(302)
    const location = res.headers.get("location")
    expect(location).toContain("/self-service/registration/browser")
  })
})
