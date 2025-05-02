import { NextRequest, NextResponse } from "next/server"
import ory from "@/lib/ory"

export async function GET(request: NextRequest) {
  try {
    const { logout_url } = await ory.createBrowserLogoutFlow({
      cookie: request.headers.get("cookie") || "",
    })

    return NextResponse.redirect(logout_url)
  } catch (error) {
    return NextResponse.redirect(new URL("/", request.url))
  }
}
