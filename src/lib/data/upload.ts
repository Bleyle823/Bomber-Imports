import { mkdir, writeFile } from "fs/promises";
import path from "path";
import { randomUUID } from "crypto";

import type { UploadCategory } from "@/lib/data/types";

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ALLOWED_MIME_TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);

const MIME_EXTENSIONS: Record<string, string> = {
    "image/jpeg": ".jpg",
    "image/png": ".png",
    "image/webp": ".webp",
};

export function isValidUploadCategory(value: string): value is UploadCategory {
    return value === "phones" || value === "accessories" || value === "categories";
}

export async function saveUploadedImage(
    file: File,
    category: UploadCategory,
): Promise<{ url: string } | { error: string }> {
    if (!ALLOWED_MIME_TYPES.has(file.type)) {
        return { error: "Only JPEG, PNG, and WebP images are allowed" };
    }

    if (file.size > MAX_FILE_SIZE) {
        return { error: "Image must be 5MB or smaller" };
    }

    const extension = MIME_EXTENSIONS[file.type];
    const filename = `${Date.now()}-${randomUUID()}${extension}`;
    const uploadDir = path.join(process.cwd(), "public", "images", "uploads", category);

    await mkdir(uploadDir, { recursive: true });

    const buffer = Buffer.from(await file.arrayBuffer());
    await writeFile(path.join(uploadDir, filename), buffer);

    return { url: `/images/uploads/${category}/${filename}` };
}
