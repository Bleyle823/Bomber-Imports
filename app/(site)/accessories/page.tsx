import Image from "next/image";
import Link from "next/link";

import { createWhatsAppLink } from "@/shared/constants/contact";
import { getAccessories } from "@/lib/data/accessories";

export const dynamic = "force-dynamic";

export default async function AccessoriesPage() {
    const accessories = await getAccessories();

    return (
        <main className="min-h-screen bg-black pt-24 pb-20 text-white">
            <div className="container">
                <section className="mx-auto max-w-4xl text-center">
                    <p className="mb-4 text-sm font-bold uppercase tracking-[0.3em] text-blue-500">Accessories</p>
                    <h1 className="text-4xl font-black tracking-tight md:text-6xl">Gadgets & accessories</h1>
                    <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-zinc-300">
                        Browse accessories for phones, charging, protection, and audio. Message us to confirm availability and bundle pricing.
                    </p>
                </section>

                <section className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                    {accessories.map((accessory) => (
                        <article key={accessory.id} className="flex h-full flex-col rounded-3xl border border-zinc-800 bg-zinc-950 p-6">
                            <div className="relative mb-6 flex h-48 items-center justify-center overflow-hidden rounded-2xl bg-zinc-900">
                                {accessory.images[0] ? (
                                    <Image
                                        src={accessory.images[0]}
                                        alt={accessory.name}
                                        fill
                                        className="object-contain p-4"
                                    />
                                ) : (
                                    <div className="rounded-full border border-zinc-700 px-5 py-3 text-sm font-bold uppercase tracking-[0.2em] text-zinc-400">
                                        {accessory.category}
                                    </div>
                                )}
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
