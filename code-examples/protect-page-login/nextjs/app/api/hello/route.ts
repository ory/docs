import { getServerSession } from "@ory/nextjs/app"
import { NextResponse } from "next/server"

export async function GET() {
  // Check if the user is authenticated
  const session = await getServerSession()

  if (!session) {
    // Return 401 if not authenticated
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
  }

  // Return data for authenticated users
  return NextResponse.json({
    message: "Hello from protected API!",
    user: session?.identity?.traits,
  })
}
