import { NextResponse, NextRequest } from "next/server"
import ory from "@/lib/ory"

export async function middleware(request: NextRequest) {
  try {
    await ory.toSession({
      cookie: request.headers.get("cookie") || "",
    })
    // If toSession() doesn't throw, the session is valid
    return NextResponse.next()
  } catch (error) {
    return NextResponse.redirect(`${ process.env.ORY_SDK_URL}/self-service/login/browser`)
  }
}
// Configure which routes to protect
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|public).*)"],
}
