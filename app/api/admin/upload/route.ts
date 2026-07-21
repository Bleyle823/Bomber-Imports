import { NextResponse } from "next/server";

import { requireAdmin } from "@/lib/auth/require-admin";
import { isValidUploadCategory, parseUploadFile, saveUploadedImage } from "@/lib/data/upload";

export const runtime = "nodejs";

export async function POST(request: Request) {
    const unauthorized = await requireAdmin();

    if (unauthorized) {
        return unauthorized;
    }

    try {
        const formData = await request.formData();
        const file = parseUploadFile(formData.get("file"));
        const category = formData.get("category");

        if (!file) {
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
    } catch (error) {
        console.error("Upload failed:", error);
        const message = error instanceof Error ? error.message : "Failed to upload image";
        return NextResponse.json({ error: message }, { status: 500 });
    }
}
