import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

import { requireAdmin } from "@/lib/auth/require-admin";
import { getHomepageConfig, updateHomepageConfig } from "@/lib/data/homepage";
import type { HomepageConfig } from "@/lib/data/types";

function revalidateHomepagePaths() {
    revalidatePath("/");
}

export async function GET() {
    const unauthorized = await requireAdmin();

    if (unauthorized) {
        return unauthorized;
    }

    const config = await getHomepageConfig();
    return NextResponse.json(config);
}

export async function PATCH(request: Request) {
    const unauthorized = await requireAdmin();

    if (unauthorized) {
        return unauthorized;
    }

    try {
        const body = (await request.json()) as HomepageConfig;
        const config = await updateHomepageConfig(body);
        revalidateHomepagePaths();
        return NextResponse.json(config);
    } catch {
        return NextResponse.json({ error: "Failed to update homepage" }, { status: 500 });
    }
}
