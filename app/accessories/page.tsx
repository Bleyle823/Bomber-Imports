import Link from "next/link";

import { createWhatsAppLink } from "@/shared/constants/contact";

const accessories = [
    {
        name: "MagSafe Clear Case",
        category: "Cases",
        price: "KES 3,500",
        description: "Slim transparent protection for iPhone models with MagSafe-style magnetic alignment.",
        compatibility: "iPhone 14, 15, and 16 series",
    },
    {
        name: "45W USB-C Fast Charger",
        category: "Chargers",
        price: "KES 4,200",
        description: "Compact wall adapter for fast charging Samsung, Pixel, iPhone, and other USB-C devices.",
        compatibility: "USB-C phones and tablets",
    },
    {
        name: "Tempered Glass Protector",
        category: "Protection",
        price: "KES 1,200",
        description: "Edge-friendly glass protector with clear touch response and scratch resistance.",
        compatibility: "Available for iPhone, Samsung, and Pixel",
    },
    {
        name: "Wireless Earbuds Pro",
        category: "Audio",
        price: "KES 8,500",
        description: "Everyday wireless earbuds with noise reduction, compact case, and long battery life.",
        compatibility: "Bluetooth smartphones",
    },
    {
        name: "10,000mAh Power Bank",
        category: "Power",
        price: "KES 5,800",
        description: "Portable backup battery with USB-C input and output for charging on the move.",
        compatibility: "USB-C and USB-A devices",
    },
    {
        name: "Camera Lens Protector",
        category: "Protection",
        price: "KES 1,500",
        description: "Low-profile camera ring protector for flagship phones with large camera modules.",
        compatibility: "Selected iPhone and Samsung models",
    },
];

export default function AccessoriesPage() {
    return (
        <main className="min-h-screen bg-black pt-24 pb-20 text-white">
            <div className="container">
                <section className="mx-auto max-w-4xl text-center">
                    <p className="mb-4 text-sm font-bold uppercase tracking-[0.3em] text-blue-500">Accessories</p>
                    <h1 className="text-4xl font-black tracking-tight md:text-6xl">Mock accessory examples</h1>
                    <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-zinc-300">
                        Browse sample accessories for phones, charging, protection, and audio. Message us to confirm availability and bundle pricing.
                    </p>
                </section>

                <section className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                    {accessories.map((accessory) => (
                        <article key={accessory.name} className="flex h-full flex-col rounded-3xl border border-zinc-800 bg-zinc-950 p-6">
                            <div className="mb-6 flex h-48 items-center justify-center rounded-2xl bg-zinc-900">
                                <div className="rounded-full border border-zinc-700 px-5 py-3 text-sm font-bold uppercase tracking-[0.2em] text-zinc-400">
                                    {accessory.category}
                                </div>
                            </div>
                            <div className="flex-1">
                                <div className="mb-3 flex items-start justify-between gap-4">
                                    <h2 className="text-2xl font-bold">{accessory.name}</h2>
                                    <p className="shrink-0 font-bold text-blue-500">{accessory.price}</p>
                                </div>
                                <p className="text-sm leading-6 text-zinc-400">{accessory.description}</p>
                                <p className="mt-5 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">Compatibility</p>
                                <p className="mt-2 text-sm text-zinc-300">{accessory.compatibility}</p>
                            </div>
                            <Link
                                href={createWhatsAppLink(`Hi Bomber Imports, I want to ask about the ${accessory.name}.`)}
                                target="_blank"
                                className="mt-6 block rounded-xl bg-white px-4 py-3 text-center font-bold text-black transition-colors hover:bg-zinc-200"
                            >
                                Ask about accessory
                            </Link>
                        </article>
                    ))}
                </section>
            </div>
        </main>
    );
}
