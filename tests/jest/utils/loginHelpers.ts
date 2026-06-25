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

  // --- DEBUG: capture response framing before consuming the body ---
  console.log("[debug] login/api status:", loginFlowRes.status)
  console.log(
    "[debug] login/api content-encoding:",
    loginFlowRes.headers.get("content-encoding"),
  )
  console.log(
    "[debug] login/api transfer-encoding:",
    loginFlowRes.headers.get("transfer-encoding"),
  )
  console.log(
    "[debug] login/api content-length:",
    loginFlowRes.headers.get("content-length"),
  )
  console.log(
    "[debug] login/api connection:",
    loginFlowRes.headers.get("connection"),
  )

  let loginFlowData: any
  try {
    loginFlowData = await loginFlowRes.json()
  } catch (err: any) {
    console.error("[debug] login/api body read FAILED")
    console.error("[debug]   name:", err?.name)
    console.error("[debug]   code:", err?.code)
    console.error("[debug]   message:", err?.message)
    console.error("[debug]   errno/type:", err?.errno, err?.type)
    console.error("[debug]   cause:", err?.cause?.message || err?.cause)

    // Probe: re-fetch the SAME url with Node's native fetch (undici), which does
    try {
      const probe = await (globalThis as any).fetch(
        `${baseUrl}/self-service/login/api`,
        { headers: { Accept: "application/json" } },
      )
      const text = await probe.text()
      console.error("[debug] native-fetch probe status:", probe.status)
      console.error("[debug] native-fetch probe body length:", text.length)
      let parsedId: string | undefined
      try {
        parsedId = JSON.parse(text)?.id
      } catch {}
      console.error(
        "[debug] native-fetch probe parsed flow id:",
        parsedId ?? "(parse failed)",
      )
      console.error(
        parsedId
          ? "[debug] => body was COMPLETE; node-fetch raised a FALSE premature close"
          : "[debug] => native fetch also could not parse; body may be genuinely truncated",
      )
    } catch (probeErr: any) {
      console.error(
        "[debug] native-fetch probe ALSO failed:",
        probeErr?.name,
        probeErr?.message,
      )
      console.error("[debug] => upstream likely genuinely truncating the body")
    }

    throw err
  }
  // --- END DEBUG ---

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
