import { NextResponse } from "next/server";

import {
    ADMIN_SESSION_COOKIE,
    createSessionToken,
    getAdminPassword,
    getSessionCookieOptions,
} from "@/lib/auth/admin-session";

export async function POST(request: Request) {
    try {
        const body = (await request.json()) as { password?: string };
        const password = body.password ?? "";

        if (password !== getAdminPassword()) {
            return NextResponse.json({ error: "Invalid password" }, { status: 401 });
        }

        const response = NextResponse.json({ success: true });
        response.cookies.set(ADMIN_SESSION_COOKIE, createSessionToken(), getSessionCookieOptions());
        return response;
    } catch {
        return NextResponse.json({ error: "Admin auth is not configured" }, { status: 500 });
    }
}
