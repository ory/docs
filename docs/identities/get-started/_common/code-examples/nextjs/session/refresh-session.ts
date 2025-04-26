import { NextResponse } from "next/server";
export async function GET() {
    return NextResponse.redirect(
        `${process.env.ORY_SDK_URL}/self-service/login/browser?refresh=true`,
    );
}
