import { NextResponse } from "next/server";

import { isAdminAuthenticated } from "@/lib/auth/admin-session";

export async function requireAdmin() {
    const authenticated = await isAdminAuthenticated();

    if (!authenticated) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    return null;
}
