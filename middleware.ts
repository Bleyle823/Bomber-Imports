import { NextResponse, type NextRequest } from "next/server";

import { verifySessionTokenEdge } from "@/lib/auth/admin-session-edge";
import { ADMIN_SESSION_COOKIE } from "@/lib/auth/session-token";

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    if (!pathname.startsWith("/admin")) {
        return NextResponse.next();
    }

    if (pathname.startsWith("/admin/login")) {
        return NextResponse.next();
    }

    const token = request.cookies.get(ADMIN_SESSION_COOKIE)?.value;
    const secret = process.env.ADMIN_SESSION_SECRET;

    if (token && secret && (await verifySessionTokenEdge(token, secret))) {
        return NextResponse.next();
    }

    const loginUrl = new URL("/admin/login", request.url);
    loginUrl.searchParams.set("from", pathname);
    return NextResponse.redirect(loginUrl);
}

export const config = {
    matcher: ["/admin/:path*"],
};
