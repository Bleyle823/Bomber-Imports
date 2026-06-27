"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { AdminButton, AdminField, AdminInput, AdminTextarea } from "./AdminFormFields";
import ImageUploadField from "./ImageUploadField";
import type { Phone } from "@/lib/data/types";

const emptyPhone: Omit<Phone, "id"> = {
    brand: "",
    model: "",
    price: 0,
    description: "",
    images: [],
    model3d: "",
    specs: {
        display: "",
        processor: "",
        camera: "",
    },
    detailSpecs: {
        storage: "",
        battery: "",
        condition: "",
        warranty: "",
        network: "",
        highlights: [""],
    },
};

interface PhoneFormProps {
    initialPhone?: Phone;
    mode: "create" | "edit";
}

export default function PhoneForm({ initialPhone, mode }: PhoneFormProps) {
    const router = useRouter();
    const [form, setForm] = useState<Omit<Phone, "id"> & { id?: string }>(
        initialPhone ?? emptyPhone,
    );
    const [error, setError] = useState("");
    const [saving, setSaving] = useState(false);

    const updateHighlight = (index: number, value: string) => {
        const highlights = [...form.detailSpecs.highlights];
        highlights[index] = value;
        setForm({
            ...form,
            detailSpecs: { ...form.detailSpecs, highlights },
        });
    };

    const addHighlight = () => {
        setForm({
            ...form,
            detailSpecs: {
                ...form.detailSpecs,
                highlights: [...form.detailSpecs.highlights, ""],
            },
        });
    };

    const removeHighlight = (index: number) => {
        setForm({
            ...form,
            detailSpecs: {
                ...form.detailSpecs,
                highlights: form.detailSpecs.highlights.filter((_, i) => i !== index),
            },
        });
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setSaving(true);
        setError("");

        const payload = {
            ...form,
            price: Number(form.price),
            model3d: form.model3d || undefined,
            detailSpecs: {
                ...form.detailSpecs,
                highlights: form.detailSpecs.highlights.filter(Boolean),
            },
        };

        try {
            const response = await fetch(
                mode === "create" ? "/api/admin/phones" : `/api/admin/phones/${initialPhone?.id}`,
                {
                    method: mode === "create" ? "POST" : "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(payload),
                },
            );

            const data = (await response.json()) as { error?: string };

            if (!response.ok) {
                throw new Error(data.error ?? "Failed to save phone");
            }

            router.push("/admin/phones");
            router.refresh();
        } catch (submitError) {
            setError(submitError instanceof Error ? submitError.message : "Failed to save phone");
        } finally {
            setSaving(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {error && <p className="rounded-xl bg-red-950/50 px-4 py-3 text-sm text-red-300">{error}</p>}

            <div className="grid gap-6 md:grid-cols-2">
                <AdminField label="Brand">
                    <AdminInput
                        value={form.brand}
                        onChange={(event) => setForm({ ...form, brand: event.target.value })}
                        required
                    />
                </AdminField>
                <AdminField label="Model">
                    <AdminInput
                        value={form.model}
                        onChange={(event) => setForm({ ...form, model: event.target.value })}
                        required
                    />
                </AdminField>
                <AdminField label="Price (KES)">
                    <AdminInput
                        type="number"
                        min={0}
                        value={form.price}
                        onChange={(event) => setForm({ ...form, price: Number(event.target.value) })}
                        required
                    />
                </AdminField>
                <AdminField label="3D model path (optional)">
                    <AdminInput
                        value={form.model3d ?? ""}
                        onChange={(event) => setForm({ ...form, model3d: event.target.value })}
                        placeholder="/models/scene.glb"
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
                label="Phone images"
                category="phones"
                images={form.images}
                onChange={(images) => setForm({ ...form, images })}
            />

            <div className="grid gap-6 md:grid-cols-3">
                <AdminField label="Display">
                    <AdminInput
                        value={form.specs.display}
                        onChange={(event) =>
                            setForm({ ...form, specs: { ...form.specs, display: event.target.value } })
                        }
                        required
                    />
                </AdminField>
                <AdminField label="Processor">
                    <AdminInput
                        value={form.specs.processor}
                        onChange={(event) =>
                            setForm({ ...form, specs: { ...form.specs, processor: event.target.value } })
                        }
                        required
                    />
                </AdminField>
                <AdminField label="Camera">
                    <AdminInput
                        value={form.specs.camera}
                        onChange={(event) =>
                            setForm({ ...form, specs: { ...form.specs, camera: event.target.value } })
                        }
                        required
                    />
                </AdminField>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                {(["storage", "battery", "condition", "warranty", "network"] as const).map((field) => (
                    <AdminField key={field} label={field.charAt(0).toUpperCase() + field.slice(1)}>
                        <AdminInput
                            value={form.detailSpecs[field]}
                            onChange={(event) =>
                                setForm({
                                    ...form,
                                    detailSpecs: { ...form.detailSpecs, [field]: event.target.value },
                                })
                            }
                            required
                        />
                    </AdminField>
                ))}
            </div>

            <div className="space-y-3">
                <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-zinc-300">Highlights</span>
                    <AdminButton type="button" variant="secondary" onClick={addHighlight}>
                        Add highlight
                    </AdminButton>
                </div>
                {form.detailSpecs.highlights.map((highlight, index) => (
                    <div key={index} className="flex gap-2">
                        <AdminInput
                            value={highlight}
                            onChange={(event) => updateHighlight(index, event.target.value)}
                            placeholder="Feature highlight"
                        />
                        <AdminButton type="button" variant="danger" onClick={() => removeHighlight(index)}>
                            Remove
                        </AdminButton>
                    </div>
                ))}
            </div>

            <div className="flex gap-3">
                <AdminButton type="submit" disabled={saving}>
                    {saving ? "Saving..." : mode === "create" ? "Create phone" : "Save changes"}
                </AdminButton>
                <AdminButton type="button" variant="secondary" onClick={() => router.push("/admin/phones")}>
                    Cancel
                </AdminButton>
            </div>
        </form>
    );
}
