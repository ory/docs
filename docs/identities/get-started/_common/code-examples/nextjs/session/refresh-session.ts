
export async function GET(request: NextRequest) {
  const basePath =
    process.env.NEXT_PUBLIC_ORY_SDK_URL || "http://localhost:4000"
  return NextResponse.redirect(`${basePath}/self-service/login/browser?refresh=true`)
}
