"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { AdminButton } from "@/features/admin/ui/AdminFormFields";
import type { Accessory } from "@/lib/data/types";

export function DeleteAccessoryButton({ accessory }: { accessory: Accessory }) {
    const router = useRouter();
    const [deleting, setDeleting] = useState(false);

    const handleDelete = async () => {
        if (!window.confirm(`Delete ${accessory.name}?`)) {
            return;
        }

        setDeleting(true);

        try {
            const response = await fetch(`/api/admin/accessories/${accessory.id}`, {
                method: "DELETE",
            });

            if (!response.ok) {
                throw new Error("Failed to delete accessory");
            }

            router.refresh();
        } catch {
            window.alert("Could not delete accessory");
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
