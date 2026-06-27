"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { AdminButton } from "@/features/admin/ui/AdminFormFields";
import type { Phone } from "@/lib/data/types";

interface DeletePhoneButtonProps {
    phone: Phone;
}

export default function DeletePhoneButton({ phone }: DeletePhoneButtonProps) {
    const router = useRouter();
    const [deleting, setDeleting] = useState(false);

    const handleDelete = async () => {
        if (!window.confirm(`Delete ${phone.model}?`)) {
            return;
        }

        setDeleting(true);

        try {
            const response = await fetch(`/api/admin/phones/${phone.id}`, { method: "DELETE" });

            if (!response.ok) {
                throw new Error("Failed to delete phone");
            }

            router.refresh();
        } catch {
            window.alert("Could not delete phone");
        } finally {
            setDeleting(false);
        }
    };

    return (
        <AdminButton type="button" variant="danger" disabled={deleting} onClick={handleDelete}>
            {deleting ? "Deleting..." : "Delete"}
        </AdminButton>
    );
}

export function AdminPageHeader({
    title,
    description,
    actionHref,
    actionLabel,
}: {
    title: string;
    description: string;
    actionHref?: string;
    actionLabel?: string;
}) {
    return (
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
                <h1 className="text-3xl font-bold text-white">{title}</h1>
                <p className="mt-2 text-zinc-400">{description}</p>
            </div>
            {actionHref && actionLabel && (
                <Link
                    href={actionHref}
                    className="rounded-xl bg-blue-600 px-4 py-3 text-sm font-bold text-white hover:bg-blue-700"
                >
                    {actionLabel}
                </Link>
            )}
        </div>
    );
}
