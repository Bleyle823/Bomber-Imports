import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

import { requireAdmin } from "@/lib/auth/require-admin";
import { deletePhone, getPhoneById, updatePhone } from "@/lib/data/phones";
import type { Phone } from "@/lib/data/types";

interface RouteContext {
    params: {
        id: string;
    };
}

function revalidatePhonePaths(id: string) {
    revalidatePath("/");
    revalidatePath("/phones");
    revalidatePath(`/phones/${id}`);
}

export async function GET(_request: Request, { params }: RouteContext) {
    const unauthorized = await requireAdmin();

    if (unauthorized) {
        return unauthorized;
    }

    const phone = await getPhoneById(params.id);

    if (!phone) {
        return NextResponse.json({ error: "Phone not found" }, { status: 404 });
    }

    return NextResponse.json(phone);
}

export async function PATCH(request: Request, { params }: RouteContext) {
    const unauthorized = await requireAdmin();

    if (unauthorized) {
        return unauthorized;
    }

    try {
        const body = (await request.json()) as Partial<Phone>;
        const phone = await updatePhone(params.id, body);

        if (!phone) {
            return NextResponse.json({ error: "Phone not found" }, { status: 404 });
        }

        revalidatePhonePaths(params.id);
        return NextResponse.json(phone);
    } catch {
        return NextResponse.json({ error: "Failed to update phone" }, { status: 500 });
    }
}

export async function DELETE(_request: Request, { params }: RouteContext) {
    const unauthorized = await requireAdmin();

    if (unauthorized) {
        return unauthorized;
    }

    const deleted = await deletePhone(params.id);

    if (!deleted) {
        return NextResponse.json({ error: "Phone not found" }, { status: 404 });
    }

    revalidatePhonePaths(params.id);
    return NextResponse.json({ success: true });
}
