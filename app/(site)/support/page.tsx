import Link from "next/link";

import { createWhatsAppLink, supportContact } from "@/shared/constants/contact";

const supportOptions = [
    {
        title: "Call support",
        description: "Speak to us about availability, delivery, warranty, or after-sales support.",
        value: supportContact.phoneDisplay,
        href: `tel:${supportContact.phoneDisplay.replace(/\s/g, "")}`,
    },
    {
        title: "WhatsApp",
        description: "Get a fast response for phone deals, trade questions, and price negotiation.",
        value: supportContact.phoneDisplay,
        href: createWhatsAppLink("Hi Bomber Imports, I need support with a phone purchase."),
    },
    {
        title: "Email",
        description: "Send detailed questions about specs, warranty, delivery, or order support.",
        value: supportContact.email,
        href: `mailto:${supportContact.email}`,
    },
];

export default function SupportPage() {
    return (
        <main className="min-h-screen bg-black pt-24 pb-20 text-white">
            <div className="container">
                <section className="mx-auto max-w-4xl text-center">
                    <p className="mb-4 text-sm font-bold uppercase tracking-[0.3em] text-blue-500">Support</p>
                    <h1 className="text-4xl font-black tracking-tight md:text-6xl">We are here to help</h1>
                    <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-zinc-300">
                        Contact Bomber Imports for phone recommendations, delivery updates, warranty questions, or help choosing the right smartphone.
                    </p>
                </section>

                <section className="mt-12 grid gap-6 md:grid-cols-3">
                    {supportOptions.map((option) => (
                        <Link
                            key={option.title}
                            href={option.href}
                            target={option.href.startsWith("http") ? "_blank" : undefined}
                            className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6 transition-colors hover:border-zinc-600"
                        >
                            <h2 className="text-2xl font-bold">{option.title}</h2>
                            <p className="mt-4 min-h-24 text-sm leading-6 text-zinc-400">{option.description}</p>
                            <p className="mt-6 font-bold text-blue-400">{option.value}</p>
                        </Link>
                    ))}
                </section>

                <section className="mt-10 rounded-3xl border border-zinc-800 bg-zinc-950 p-6 md:p-8">
                    <h2 className="text-2xl font-bold">What we can help with</h2>
                    <div className="mt-6 grid gap-4 md:grid-cols-2">
                        {["Phone specs and comparisons", "Price negotiation", "Delivery across Kenya", "Warranty and after-sales support"].map((item) => (
                            <div key={item} className="rounded-2xl bg-zinc-900 px-4 py-3 text-zinc-300">
                                {item}
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </main>
    );
}
