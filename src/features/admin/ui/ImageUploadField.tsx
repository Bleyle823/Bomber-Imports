"use client";

import Image from "next/image";
import { useState } from "react";

import { AdminButton } from "./AdminFormFields";
import { uploadAdminImage } from "@/lib/admin/upload-client";
import type { UploadCategory } from "@/lib/data/types";

interface ImageUploadFieldProps {
    label: string;
    category: UploadCategory;
    images: string[];
    onChange: (images: string[]) => void;
}

export default function ImageUploadField({
    label,
    category,
    images,
    onChange,
}: ImageUploadFieldProps) {
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState("");

    const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];

        if (!file) {
            return;
        }

        setUploading(true);
        setError("");

        try {
            const url = await uploadAdminImage(file, category);
            onChange([...images, url]);
        } catch (uploadError) {
            setError(uploadError instanceof Error ? uploadError.message : "Upload failed");
        } finally {
            setUploading(false);
            event.target.value = "";
        }
    };

    const removeImage = (index: number) => {
        onChange(images.filter((_, imageIndex) => imageIndex !== index));
    };

    return (
        <div className="space-y-3">
            <div className="flex items-center justify-between gap-4">
                <span className="text-sm font-semibold text-zinc-300">{label}</span>
                <label className="cursor-pointer">
                    <span className="rounded-lg bg-zinc-800 px-3 py-2 text-xs font-bold uppercase tracking-wide text-white">
                        {uploading ? "Uploading..." : "Add image"}
                    </span>
                    <input
                        type="file"
                        accept="image/jpeg,image/png,image/webp"
                        className="hidden"
                        disabled={uploading}
                        onChange={handleUpload}
                    />
                </label>
            </div>

            {error && <p className="text-sm text-red-400">{error}</p>}

            {images.length > 0 ? (
                <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                    {images.map((image, index) => (
                        <div key={`${image}-${index}`} className="relative overflow-hidden rounded-xl bg-zinc-900">
                            <div className="relative h-28">
                                <Image
                                    src={image}
                                    alt=""
                                    fill
                                    unoptimized
                                    className="object-contain p-2"
                                />
                            </div>
                            <AdminButton
                                type="button"
                                variant="danger"
                                className="mt-2 w-full py-2 text-xs"
                                onClick={() => removeImage(index)}
                            >
                                Remove
                            </AdminButton>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-sm text-zinc-500">No images uploaded yet.</p>
            )}
        </div>
    );
}
