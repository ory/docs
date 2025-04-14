import { NextResponse, NextRequest } from "next/server"
import ory from "@/lib/ory"

export async function middleware(request: NextRequest) {
  console.log("Middleware executed for path:", request.nextUrl.pathname)
  try {
    await ory.toSession({
      cookie: request.headers.get("cookie") || "",
    })
    // If toSession() doesn't throw, the session is valid
    return NextResponse.next()
  } catch (error) {
    const basePath =
      process.env.NEXT_PUBLIC_ORY_SDK_URL || "http://localhost:4000"
    return NextResponse.redirect(`${basePath}/self-service/login/browser`)
  }
}
// Configure which routes to protect
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|public).*)"],
}
