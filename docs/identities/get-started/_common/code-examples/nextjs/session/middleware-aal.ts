export async function middleware(request: NextRequest) {
  console.log("Middleware executed for path:", request.nextUrl.pathname)
  try {
    const session = await ory.toSession({
      cookie: request.headers.get("cookie") || "",
    })
    // highlight-start
    if (session.authenticator_assurance_level === "aal2") {
      return NextResponse.next()
    } else {
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_ORY_SDK_URL}/self-service/login/browser?aal=aal2`,
      )
    }
    // highlight-end
  } catch (error) {
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_ORY_SDK_URL}/self-service/login/browser`,
    )
  }
}
// Configure which routes to protect
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|public).*)"],
}
