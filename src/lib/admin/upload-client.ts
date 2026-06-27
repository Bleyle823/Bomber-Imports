"use client";

import type { UploadCategory } from "@/lib/data/types";

export async function uploadAdminImage(
    file: File,
    category: UploadCategory,
): Promise<string> {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("category", category);

    const response = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
    });

    const data = (await response.json()) as { url?: string; error?: string };

    if (!response.ok || !data.url) {
        throw new Error(data.error ?? "Upload failed");
    }

    return data.url;
}
