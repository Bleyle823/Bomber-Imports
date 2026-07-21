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
        credentials: "include",
    });

    let data: { url?: string; error?: string } = {};

    try {
        data = (await response.json()) as { url?: string; error?: string };
    } catch {
        throw new Error(
            response.ok ? "Upload failed: invalid server response" : `Upload failed (${response.status})`,
        );
    }

    if (!response.ok || !data.url) {
        throw new Error(data.error ?? `Upload failed (${response.status})`);
    }

    return data.url;
}
