import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

import { requireAdmin } from "@/lib/auth/require-admin";
import { deleteAccessory, getAccessoryById, updateAccessory } from "@/lib/data/accessories";
import type { Accessory } from "@/lib/data/types";

interface RouteContext {
    params: {
        id: string;
    };
}

export async function GET(_request: Request, { params }: RouteContext) {
    const unauthorized = await requireAdmin();

    if (unauthorized) {
        return unauthorized;
    }

    const accessory = await getAccessoryById(params.id);

    if (!accessory) {
        return NextResponse.json({ error: "Accessory not found" }, { status: 404 });
    }

    return NextResponse.json(accessory);
}

export async function PATCH(request: Request, { params }: RouteContext) {
    const unauthorized = await requireAdmin();

    if (unauthorized) {
        return unauthorized;
    }

    try {
        const body = (await request.json()) as Partial<Accessory>;
        const accessory = await updateAccessory(params.id, body);

        if (!accessory) {
            return NextResponse.json({ error: "Accessory not found" }, { status: 404 });
        }

        revalidatePath("/accessories");
        return NextResponse.json(accessory);
    } catch {
        return NextResponse.json({ error: "Failed to update accessory" }, { status: 500 });
    }
}

export async function DELETE(_request: Request, { params }: RouteContext) {
    const unauthorized = await requireAdmin();

    if (unauthorized) {
        return unauthorized;
    }

    const deleted = await deleteAccessory(params.id);

    if (!deleted) {
        return NextResponse.json({ error: "Accessory not found" }, { status: 404 });
    }

    revalidatePath("/accessories");
    return NextResponse.json({ success: true });
}
