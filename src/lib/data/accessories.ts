import { readJsonFile, writeJsonFile, slugify } from "./json-store";
import type { Accessory } from "./types";

const FILENAME = "accessories.json";

export async function getAccessories(): Promise<Accessory[]> {
    return readJsonFile<Accessory[]>(FILENAME);
}

export async function getAccessoryById(id: string): Promise<Accessory | undefined> {
    const accessories = await getAccessories();
    return accessories.find((accessory) => accessory.id === id);
}

export async function saveAccessories(accessories: Accessory[]): Promise<void> {
    await writeJsonFile(FILENAME, accessories);
}

export async function createAccessory(
    data: Omit<Accessory, "id"> & { id?: string },
): Promise<Accessory> {
    const accessories = await getAccessories();
    const baseId = data.id ?? slugify(data.name);
    let id = baseId;
    let counter = 1;

    while (accessories.some((accessory) => accessory.id === id)) {
        id = `${baseId}-${counter}`;
        counter += 1;
    }

    const accessory: Accessory = { ...data, id };
    accessories.push(accessory);
    await saveAccessories(accessories);
    return accessory;
}

export async function updateAccessory(
    id: string,
    data: Partial<Accessory>,
): Promise<Accessory | null> {
    const accessories = await getAccessories();
    const index = accessories.findIndex((accessory) => accessory.id === id);

    if (index === -1) {
        return null;
    }

    const updated: Accessory = { ...accessories[index], ...data, id };
    accessories[index] = updated;
    await saveAccessories(accessories);
    return updated;
}

export async function deleteAccessory(id: string): Promise<boolean> {
    const accessories = await getAccessories();
    const nextAccessories = accessories.filter((accessory) => accessory.id !== id);

    if (nextAccessories.length === accessories.length) {
        return false;
    }

    await saveAccessories(nextAccessories);
    return true;
}
