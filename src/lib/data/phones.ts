import { readJsonFile, writeJsonFile, slugify } from "./json-store";
import type { Phone } from "./types";

const FILENAME = "phones.json";

export async function getPhones(): Promise<Phone[]> {
    return readJsonFile<Phone[]>(FILENAME);
}

export async function getPhoneById(id: string): Promise<Phone | undefined> {
    const phones = await getPhones();
    return phones.find((phone) => phone.id === id);
}

export async function savePhones(phones: Phone[]): Promise<void> {
    await writeJsonFile(FILENAME, phones);
}

export async function createPhone(
    data: Omit<Phone, "id"> & { id?: string },
): Promise<Phone> {
    const phones = await getPhones();
    const baseId = data.id ?? slugify(`${data.brand}-${data.model}`);
    let id = baseId;
    let counter = 1;

    while (phones.some((phone) => phone.id === id)) {
        id = `${baseId}-${counter}`;
        counter += 1;
    }

    const phone: Phone = { ...data, id };
    phones.push(phone);
    await savePhones(phones);
    return phone;
}

export async function updatePhone(id: string, data: Partial<Phone>): Promise<Phone | null> {
    const phones = await getPhones();
    const index = phones.findIndex((phone) => phone.id === id);

    if (index === -1) {
        return null;
    }

    const updated: Phone = { ...phones[index], ...data, id };
    phones[index] = updated;
    await savePhones(phones);
    return updated;
}

export async function deletePhone(id: string): Promise<boolean> {
    const phones = await getPhones();
    const nextPhones = phones.filter((phone) => phone.id !== id);

    if (nextPhones.length === phones.length) {
        return false;
    }

    await savePhones(nextPhones);
    return true;
}
