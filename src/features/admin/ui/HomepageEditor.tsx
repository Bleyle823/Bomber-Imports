"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { AdminButton, AdminField, AdminInput, AdminTextarea } from "./AdminFormFields";
import ImageUploadField from "./ImageUploadField";
import type { HomepageConfig, Phone } from "@/lib/data/types";

interface HomepageEditorProps {
    initialConfig: HomepageConfig;
    phones: Phone[];
}

export default function HomepageEditor({ initialConfig, phones }: HomepageEditorProps) {
    const router = useRouter();
    const [config, setConfig] = useState(initialConfig);
    const [error, setError] = useState("");
    const [saving, setSaving] = useState(false);

    const toggleFeaturedPhone = (phoneId: string) => {
        const featuredPhoneIds = config.featuredPhoneIds.includes(phoneId)
            ? config.featuredPhoneIds.filter((id) => id !== phoneId)
            : [...config.featuredPhoneIds, phoneId];

        setConfig({ ...config, featuredPhoneIds });
    };

    const updateCategory = (
        index: number,
        field: keyof HomepageConfig["categories"][number],
        value: string,
    ) => {
        const categories = [...config.categories];
        categories[index] = { ...categories[index], [field]: value };
        setConfig({ ...config, categories });
    };

    const updateSlide = (index: number, field: "title" | "videoSrc", value: string) => {
        const highlightSlides = [...config.highlightSlides];
        highlightSlides[index] = { ...highlightSlides[index], [field]: value };
        setConfig({ ...config, highlightSlides });
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setSaving(true);
        setError("");

        try {
            const response = await fetch("/api/admin/homepage", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(config),
            });

            const data = (await response.json()) as { error?: string };

            if (!response.ok) {
                throw new Error(data.error ?? "Failed to save homepage");
            }

            router.refresh();
        } catch (submitError) {
            setError(
                submitError instanceof Error ? submitError.message : "Failed to save homepage",
            );
        } finally {
            setSaving(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-10">
            {error && <p className="rounded-xl bg-red-950/50 px-4 py-3 text-sm text-red-300">{error}</p>}

            <section className="space-y-4 rounded-3xl border border-zinc-800 bg-zinc-950 p-6">
                <h2 className="text-xl font-bold text-white">Hero section</h2>
                <div className="grid gap-4 md:grid-cols-2">
                    <AdminField label="Headline">
                        <AdminInput
                            value={config.hero.headline}
                            onChange={(event) =>
                                setConfig({ ...config, hero: { ...config.hero, headline: event.target.value } })
                            }
                        />
                    </AdminField>
                    <AdminField label="Primary CTA label">
                        <AdminInput
                            value={config.hero.ctaLabel}
                            onChange={(event) =>
                                setConfig({ ...config, hero: { ...config.hero, ctaLabel: event.target.value } })
                            }
                        />
                    </AdminField>
                    <AdminField label="Primary CTA link">
                        <AdminInput
                            value={config.hero.ctaLink}
                            onChange={(event) =>
                                setConfig({ ...config, hero: { ...config.hero, ctaLink: event.target.value } })
                            }
                        />
                    </AdminField>
                    <AdminField label="Secondary CTA label">
                        <AdminInput
                            value={config.hero.secondaryCtaLabel}
                            onChange={(event) =>
                                setConfig({
                                    ...config,
                                    hero: { ...config.hero, secondaryCtaLabel: event.target.value },
                                })
                            }
                        />
                    </AdminField>
                    <AdminField label="Secondary CTA link">
                        <AdminInput
                            value={config.hero.secondaryCtaLink}
                            onChange={(event) =>
                                setConfig({
                                    ...config,
                                    hero: { ...config.hero, secondaryCtaLink: event.target.value },
                                })
                            }
                        />
                    </AdminField>
                </div>
                <AdminField label="Subheadline">
                    <AdminTextarea
                        value={config.hero.subheadline}
                        onChange={(event) =>
                            setConfig({ ...config, hero: { ...config.hero, subheadline: event.target.value } })
                        }
                    />
                </AdminField>
            </section>

            <section className="space-y-4 rounded-3xl border border-zinc-800 bg-zinc-950 p-6">
                <h2 className="text-xl font-bold text-white">Featured phones</h2>
                <div className="grid gap-2 md:grid-cols-2">
                    {phones.map((phone) => (
                        <label
                            key={phone.id}
                            className="flex items-center gap-3 rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3"
                        >
                            <input
                                type="checkbox"
                                checked={config.featuredPhoneIds.includes(phone.id)}
                                onChange={() => toggleFeaturedPhone(phone.id)}
                            />
                            <span className="text-sm text-zinc-200">
                                {phone.brand} {phone.model}
                            </span>
                        </label>
                    ))}
                </div>
            </section>

            <section className="space-y-6 rounded-3xl border border-zinc-800 bg-zinc-950 p-6">
                <h2 className="text-xl font-bold text-white">Category cards</h2>
                {config.categories.map((category, index) => (
                    <div key={index} className="space-y-4 rounded-2xl border border-zinc-800 p-4">
                        <h3 className="font-semibold text-zinc-200">Category {index + 1}</h3>
                        <div className="grid gap-4 md:grid-cols-2">
                            <AdminField label="Title">
                                <AdminInput
                                    value={category.title}
                                    onChange={(event) => updateCategory(index, "title", event.target.value)}
                                />
                            </AdminField>
                            <AdminField label="Starting price">
                                <AdminInput
                                    value={category.startingPrice}
                                    onChange={(event) =>
                                        updateCategory(index, "startingPrice", event.target.value)
                                    }
                                />
                            </AdminField>
                            <AdminField label="Link">
                                <AdminInput
                                    value={category.link}
                                    onChange={(event) => updateCategory(index, "link", event.target.value)}
                                />
                            </AdminField>
                            <AdminField label="Color class">
                                <AdminInput
                                    value={category.color}
                                    onChange={(event) => updateCategory(index, "color", event.target.value)}
                                />
                            </AdminField>
                        </div>
                        <AdminField label="Description">
                            <AdminTextarea
                                value={category.description}
                                onChange={(event) => updateCategory(index, "description", event.target.value)}
                            />
                        </AdminField>
                        <ImageUploadField
                            label="Category image"
                            category="categories"
                            images={category.image ? [category.image] : []}
                            onChange={(images) =>
                                updateCategory(index, "image", images[images.length - 1] ?? "")
                            }
                        />
                    </div>
                ))}
            </section>

            <section className="space-y-6 rounded-3xl border border-zinc-800 bg-zinc-950 p-6">
                <h2 className="text-xl font-bold text-white">Highlight slides</h2>
                {config.highlightSlides.map((slide, index) => (
                    <div key={index} className="space-y-4 rounded-2xl border border-zinc-800 p-4">
                        <h3 className="font-semibold text-zinc-200">Slide {index + 1}</h3>
                        <AdminField label="Title">
                            <AdminTextarea
                                value={slide.title}
                                onChange={(event) => updateSlide(index, "title", event.target.value)}
                            />
                        </AdminField>
                        <AdminField label="Video path">
                            <AdminInput
                                value={slide.videoSrc}
                                onChange={(event) => updateSlide(index, "videoSrc", event.target.value)}
                            />
                        </AdminField>
                    </div>
                ))}
            </section>

            <AdminButton type="submit" disabled={saving}>
                {saving ? "Saving..." : "Save homepage"}
            </AdminButton>
        </form>
    );
}
