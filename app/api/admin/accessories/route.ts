import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

import { requireAdmin } from "@/lib/auth/require-admin";
import { createAccessory, getAccessories } from "@/lib/data/accessories";
import type { Accessory } from "@/lib/data/types";

function revalidateAccessoryPaths() {
    revalidatePath("/accessories");
}

export async function GET() {
    const unauthorized = await requireAdmin();

    if (unauthorized) {
        return unauthorized;
    }

    const accessories = await getAccessories();
    return NextResponse.json(accessories);
}

export async function POST(request: Request) {
    const unauthorized = await requireAdmin();

    if (unauthorized) {
        return unauthorized;
    }

    try {
        const body = (await request.json()) as Omit<Accessory, "id"> & { id?: string };

        if (!body.name || !body.category || !body.price || !body.description) {
            return NextResponse.json(
                { error: "Name, category, price, and description are required" },
                { status: 400 },
            );
        }

        const accessory = await createAccessory({
            ...body,
            images: body.images ?? [],
            compatibility: body.compatibility ?? "",
        });

        revalidateAccessoryPaths();
        return NextResponse.json(accessory, { status: 201 });
    } catch {
        return NextResponse.json({ error: "Failed to create accessory" }, { status: 500 });
    }
}
