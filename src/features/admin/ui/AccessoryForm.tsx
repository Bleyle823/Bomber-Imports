"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { AdminButton, AdminField, AdminInput, AdminTextarea } from "./AdminFormFields";
import ImageUploadField from "./ImageUploadField";
import type { Accessory } from "@/lib/data/types";

const emptyAccessory: Omit<Accessory, "id"> = {
    name: "",
    category: "",
    price: "",
    description: "",
    compatibility: "",
    images: [],
};

interface AccessoryFormProps {
    initialAccessory?: Accessory;
    mode: "create" | "edit";
}

export default function AccessoryForm({ initialAccessory, mode }: AccessoryFormProps) {
    const router = useRouter();
    const [form, setForm] = useState<Omit<Accessory, "id">>(initialAccessory ?? emptyAccessory);
    const [error, setError] = useState("");
    const [saving, setSaving] = useState(false);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setSaving(true);
        setError("");

        try {
            const response = await fetch(
                mode === "create"
                    ? "/api/admin/accessories"
                    : `/api/admin/accessories/${initialAccessory?.id}`,
                {
                    method: mode === "create" ? "POST" : "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(form),
                },
            );

            const data = (await response.json()) as { error?: string };

            if (!response.ok) {
                throw new Error(data.error ?? "Failed to save accessory");
            }

            router.push("/admin/accessories");
            router.refresh();
        } catch (submitError) {
            setError(
                submitError instanceof Error ? submitError.message : "Failed to save accessory",
            );
        } finally {
            setSaving(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {error && <p className="rounded-xl bg-red-950/50 px-4 py-3 text-sm text-red-300">{error}</p>}

            <div className="grid gap-6 md:grid-cols-2">
                <AdminField label="Name">
                    <AdminInput
                        value={form.name}
                        onChange={(event) => setForm({ ...form, name: event.target.value })}
                        required
                    />
                </AdminField>
                <AdminField label="Category">
                    <AdminInput
                        value={form.category}
                        onChange={(event) => setForm({ ...form, category: event.target.value })}
                        required
                    />
                </AdminField>
                <AdminField label="Price label">
                    <AdminInput
                        value={form.price}
                        onChange={(event) => setForm({ ...form, price: event.target.value })}
                        placeholder="KES 3,500"
                        required
                    />
                </AdminField>
                <AdminField label="Compatibility">
                    <AdminInput
                        value={form.compatibility}
                        onChange={(event) => setForm({ ...form, compatibility: event.target.value })}
                    />
                </AdminField>
            </div>

            <AdminField label="Description">
                <AdminTextarea
                    value={form.description}
                    onChange={(event) => setForm({ ...form, description: event.target.value })}
                    required
                />
            </AdminField>

            <ImageUploadField
                label="Accessory images"
                category="accessories"
                images={form.images}
                onChange={(images) => setForm({ ...form, images })}
            />

            <div className="flex gap-3">
                <AdminButton type="submit" disabled={saving}>
                    {saving ? "Saving..." : mode === "create" ? "Create accessory" : "Save changes"}
                </AdminButton>
                <AdminButton
                    type="button"
                    variant="secondary"
                    onClick={() => router.push("/admin/accessories")}
                >
                    Cancel
                </AdminButton>
            </div>
        </form>
    );
}
