import { put, list } from "@vercel/blob";
import { mkdir, writeFile, readFile } from "fs/promises";
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

export function canUseBlobStorage(): boolean {
    return Boolean(process.env.BLOB_READ_WRITE_TOKEN);
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

async function saveToLocalDisk(
    buffer: Buffer,
    category: UploadCategory,
    filename: string,
): Promise<string> {
    const uploadDir = path.join(process.cwd(), "public", "images", "uploads", category);
    await mkdir(uploadDir, { recursive: true });
    await writeFile(path.join(uploadDir, filename), buffer);
    return `/images/uploads/${category}/${filename}`;
}

async function saveToVercelBlob(
    buffer: Buffer,
    category: UploadCategory,
    filename: string,
    mimeType: string,
): Promise<string> {
    const blob = await put(`uploads/${category}/${filename}`, buffer, {
        access: "public",
        contentType: mimeType,
        addRandomSuffix: false,
        token: process.env.BLOB_READ_WRITE_TOKEN,
    });

    return blob.url;
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
    const buffer = Buffer.from(await file.arrayBuffer());

    try {
        if (canUseBlobStorage()) {
            const url = await saveToVercelBlob(buffer, category, filename, mimeType);
            return { url };
        }

        const url = await saveToLocalDisk(buffer, category, filename);
        return { url };
    } catch (error) {
        const message = error instanceof Error ? error.message : "Failed to save image";

        // Common production failure when Blob is not configured on serverless hosts.
        if (message.includes("EROFS") || message.includes("read-only file system")) {
            return {
                error:
                    "Image uploads require Vercel Blob on this host. Add BLOB_READ_WRITE_TOKEN in your project env.",
            };
        }

        return { error: message };
    }
}

export function parseUploadFile(value: FormDataEntryValue | null): File | null {
    if (!isUploadFile(value)) {
        return null;
    }

    return value;
}

export async function findBlobByPathname(pathname: string) {
    const { blobs } = await list({
        prefix: pathname,
        limit: 20,
        token: process.env.BLOB_READ_WRITE_TOKEN,
    });

    return blobs.find((blob) => blob.pathname === pathname) ?? null;
}

export async function putJsonBlob(pathname: string, data: unknown): Promise<string> {
    const blob = await put(pathname, JSON.stringify(data, null, 2), {
        access: "public",
        contentType: "application/json",
        addRandomSuffix: false,
        allowOverwrite: true,
        token: process.env.BLOB_READ_WRITE_TOKEN,
    });

    return blob.url;
}

export async function readLocalJsonFile(filename: string): Promise<string> {
    const filePath = path.join(process.cwd(), "data", filename);
    return readFile(filePath, "utf-8");
}
