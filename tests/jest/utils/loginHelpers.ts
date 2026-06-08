import fetch from "node-fetch"
import { parseCookie } from "./cookieHelpers"

/**
 * Performs login using Ory's self-service login API flow
 * @param baseUrl - The base URL of the Ory instance
 * @param email - User email/identifier
 * @param password - User password
 * @returns The session cookie string
 */
export async function selfServiceLogin(
  baseUrl: string,
  email: string,
  password: string,
): Promise<string> {
  //  Get login API flow
  const loginFlowRes = await fetch(`${baseUrl}/self-service/login/api`, {
    headers: {
      Accept: "application/json",
    },
  })
  const loginFlowData = await loginFlowRes.json()
  const loginFlowId = loginFlowData.id

  // Submit login with identifier and password in single request
  const csrfNode = loginFlowData.ui.nodes.find(
    (node: any) =>
      node.attributes.node_type === "input" &&
      node.attributes.name === "csrf_token",
  )
  const csrfToken =
    csrfNode && "value" in csrfNode.attributes ? csrfNode.attributes.value : ""

  const loginSubmitRes = await fetch(
    `${baseUrl}/self-service/login?flow=${loginFlowId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      redirect: "manual",
      body: JSON.stringify({
        method: "password",
        csrf_token: csrfToken,
        identifier: email,
        password: password,
      }),
    },
  )

  if (loginSubmitRes.status === 400) {
    const errorData = await loginSubmitRes.json()
    console.error("Login error:", JSON.stringify(errorData, null, 2))
    throw new Error(
      `Login failed: ${JSON.stringify(errorData.ui?.messages || errorData)}`,
    )
  }

  // Extract session cookie from login response
  if (loginSubmitRes.status !== 200) {
    throw new Error(
      `Login failed with status ${loginSubmitRes.status}. Expected 200.`,
    )
  }

  const loginSetCookieHeader = loginSubmitRes.headers.get("set-cookie")
  const sessionCookie = parseCookie(loginSetCookieHeader)

  if (!sessionCookie) {
    throw new Error("No session cookie received from login response")
  }

  return sessionCookie
}
