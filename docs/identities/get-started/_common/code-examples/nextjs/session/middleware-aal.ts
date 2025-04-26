import { NextRequest, NextResponse } from "next/server";
import ory from "@/lib/ory";

export async function middleware(request: NextRequest) {
    try {
        const session = await ory.toSession({
            cookie: request.headers.get("cookie") || "",
        });
        // If toSession() doesn't throw, the session is valid
        if (session.authenticator_assurance_level === "aal2") {
            return NextResponse.next();
        } else {
            return NextResponse.redirect(
                `${process.env.NEXT_PUBLIC_ORY_SDK_URL}/self-service/login/browser?aal=aal2`,
            );
        }
    } catch (error) {
        return NextResponse.redirect(
            `${process.env.ORY_SDK_URL}/self-service/login/browser`,
        );
    }
}
// Configure which routes to protect
export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico|public).*)"],
};
