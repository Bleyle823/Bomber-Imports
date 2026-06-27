import { readFile, writeFile, mkdir } from "fs/promises";
import path from "path";

const dataDir = path.join(process.cwd(), "data");

export async function readJsonFile<T>(filename: string): Promise<T> {
    const filePath = path.join(dataDir, filename);
    const content = await readFile(filePath, "utf-8");
    return JSON.parse(content) as T;
}

export async function writeJsonFile<T>(filename: string, data: T): Promise<void> {
    await mkdir(dataDir, { recursive: true });
    const filePath = path.join(dataDir, filename);
    await writeFile(filePath, JSON.stringify(data, null, 2), "utf-8");
}

export function slugify(text: string): string {
    return text
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
}
