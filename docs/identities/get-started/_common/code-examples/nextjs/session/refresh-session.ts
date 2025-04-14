import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const basePath =
    process.env.NEXT_PUBLIC_ORY_SDK_URL || "http://localhost:4000"
  return NextResponse.redirect(`${basePath}/ui/login?refresh=true`)
}
