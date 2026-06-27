import { NextResponse } from "next/server";

import { requireAdmin } from "@/lib/auth/require-admin";
import { isValidUploadCategory, saveUploadedImage } from "@/lib/data/upload";

export async function POST(request: Request) {
    const unauthorized = await requireAdmin();

    if (unauthorized) {
        return unauthorized;
    }

    try {
        const formData = await request.formData();
        const file = formData.get("file");
        const category = formData.get("category");

        if (!(file instanceof File)) {
            return NextResponse.json({ error: "No file provided" }, { status: 400 });
        }

        if (typeof category !== "string" || !isValidUploadCategory(category)) {
            return NextResponse.json({ error: "Invalid upload category" }, { status: 400 });
        }

        const result = await saveUploadedImage(file, category);

        if ("error" in result) {
            return NextResponse.json({ error: result.error }, { status: 400 });
        }

        return NextResponse.json(result);
    } catch {
        return NextResponse.json({ error: "Failed to upload image" }, { status: 500 });
    }
}
