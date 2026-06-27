import { readJsonFile, writeJsonFile } from "./json-store";
import type { HomepageConfig } from "./types";

const FILENAME = "homepage.json";

export async function getHomepageConfig(): Promise<HomepageConfig> {
    return readJsonFile<HomepageConfig>(FILENAME);
}

export async function updateHomepageConfig(data: HomepageConfig): Promise<HomepageConfig> {
    await writeJsonFile(FILENAME, data);
    return data;
}
