import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

import { requireAdmin } from "@/lib/auth/require-admin";
import { createPhone, getPhones } from "@/lib/data/phones";
import type { Phone } from "@/lib/data/types";

function revalidatePhonePaths() {
    revalidatePath("/");
    revalidatePath("/phones");
}

export async function GET() {
    const unauthorized = await requireAdmin();

    if (unauthorized) {
        return unauthorized;
    }

    const phones = await getPhones();
    return NextResponse.json(phones);
}

export async function POST(request: Request) {
    const unauthorized = await requireAdmin();

    if (unauthorized) {
        return unauthorized;
    }

    try {
        const body = (await request.json()) as Omit<Phone, "id"> & { id?: string };

        if (!body.brand || !body.model || !body.description || !body.images?.length) {
            return NextResponse.json(
                { error: "Brand, model, description, and at least one image are required" },
                { status: 400 },
            );
        }

        const phone = await createPhone(body);
        revalidatePhonePaths();
        return NextResponse.json(phone, { status: 201 });
    } catch {
        return NextResponse.json({ error: "Failed to create phone" }, { status: 500 });
    }
}
