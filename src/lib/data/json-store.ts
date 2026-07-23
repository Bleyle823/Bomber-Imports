import path from "path";
import { mkdir, writeFile } from "fs/promises";

import {
    canUseBlobStorage,
    findBlobByPathname,
    putJsonBlob,
    readLocalJsonFile,
} from "@/lib/data/upload";

const dataDir = path.join(process.cwd(), "data");

async function readFromBlob<T>(filename: string): Promise<T | null> {
    const pathname = `cms/${filename}`;
    const blob = await findBlobByPathname(pathname);

    if (!blob) {
        return null;
    }

    const response = await fetch(blob.url, { cache: "no-store" });

    if (!response.ok) {
        return null;
    }

    return (await response.json()) as T;
}

async function writeToLocalDisk<T>(filename: string, data: T): Promise<void> {
    await mkdir(dataDir, { recursive: true });
    const filePath = path.join(dataDir, filename);
    await writeFile(filePath, JSON.stringify(data, null, 2), "utf-8");
}

export async function readJsonFile<T>(filename: string): Promise<T> {
    if (canUseBlobStorage()) {
        const fromBlob = await readFromBlob<T>(filename);

        if (fromBlob) {
            return fromBlob;
        }

        // Seed Blob from the committed local JSON the first time.
        const localContent = await readLocalJsonFile(filename);
        const parsed = JSON.parse(localContent) as T;
        await putJsonBlob(`cms/${filename}`, parsed);
        return parsed;
    }

    const content = await readLocalJsonFile(filename);
    return JSON.parse(content) as T;
}

export async function writeJsonFile<T>(filename: string, data: T): Promise<void> {
    if (canUseBlobStorage()) {
        await putJsonBlob(`cms/${filename}`, data);
        return;
    }

    try {
        await writeToLocalDisk(filename, data);
    } catch (error) {
        const message = error instanceof Error ? error.message : "Failed to write data";

        if (message.includes("EROFS") || message.includes("read-only file system")) {
            throw new Error(
                "Catalog updates require Vercel Blob on this host. Add BLOB_READ_WRITE_TOKEN in your project env.",
            );
        }

        throw error;
    }
}

export function slugify(text: string): string {
    return text
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
}
