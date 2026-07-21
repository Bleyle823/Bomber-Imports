import { mkdir, writeFile } from "fs/promises";
import path from "path";
import { randomUUID } from "crypto";

import type { UploadCategory } from "@/lib/data/types";

const MAX_FILE_SIZE = 5 * 1024 * 1024;

const ALLOWED_MIME_TYPES = new Set([
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
]);

const MIME_EXTENSIONS: Record<string, string> = {
    "image/jpeg": ".jpg",
    "image/jpg": ".jpg",
    "image/png": ".png",
    "image/webp": ".webp",
};

const EXTENSION_MIME_TYPES: Record<string, string> = {
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".png": "image/png",
    ".webp": "image/webp",
};

export function isValidUploadCategory(value: string): value is UploadCategory {
    return value === "phones" || value === "accessories" || value === "categories";
}

function isUploadFile(value: FormDataEntryValue | null): value is File {
    return (
        typeof value === "object" &&
        value !== null &&
        typeof value.arrayBuffer === "function" &&
        typeof value.size === "number"
    );
}

function getFileName(file: File): string {
    return typeof file.name === "string" && file.name.length > 0 ? file.name : "upload";
}

function resolveMimeType(file: File): string | null {
    const declaredType = (file.type || "").toLowerCase().trim();

    if (declaredType && ALLOWED_MIME_TYPES.has(declaredType)) {
        return declaredType === "image/jpg" ? "image/jpeg" : declaredType;
    }

    const extension = path.extname(getFileName(file)).toLowerCase();
    return EXTENSION_MIME_TYPES[extension] ?? null;
}

export async function saveUploadedImage(
    file: File,
    category: UploadCategory,
): Promise<{ url: string } | { error: string }> {
    const mimeType = resolveMimeType(file);

    if (!mimeType) {
        return { error: "Only JPEG, PNG, and WebP images are allowed" };
    }

    if (file.size <= 0) {
        return { error: "Uploaded file is empty" };
    }

    if (file.size > MAX_FILE_SIZE) {
        return { error: "Image must be 5MB or smaller" };
    }

    const extension = MIME_EXTENSIONS[mimeType];
    const filename = `${Date.now()}-${randomUUID()}${extension}`;
    const uploadDir = path.join(process.cwd(), "public", "images", "uploads", category);

    await mkdir(uploadDir, { recursive: true });

    const buffer = Buffer.from(await file.arrayBuffer());
    await writeFile(path.join(uploadDir, filename), buffer);

    return { url: `/images/uploads/${category}/${filename}` };
}

export function parseUploadFile(value: FormDataEntryValue | null): File | null {
    if (!isUploadFile(value)) {
        return null;
    }

    return value;
}
