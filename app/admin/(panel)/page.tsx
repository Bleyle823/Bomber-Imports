import Link from "next/link";

import { getAccessories } from "@/lib/data/accessories";
import { getHomepageConfig } from "@/lib/data/homepage";
import { getPhones } from "@/lib/data/phones";

export default async function AdminDashboardPage() {
    const [phones, accessories, homepage] = await Promise.all([
        getPhones(),
        getAccessories(),
        getHomepageConfig(),
    ]);

    const cards = [
        { href: "/admin/phones", label: "Phones", count: phones.length },
        { href: "/admin/accessories", label: "Accessories", count: accessories.length },
        {
            href: "/admin/homepage",
            label: "Featured phones",
            count: homepage.featuredPhoneIds.length,
        },
    ];

    return (
        <div>
            <h1 className="text-3xl font-bold text-white">Dashboard</h1>
            <p className="mt-2 text-zinc-400">Manage catalog content for Bomber Imports.</p>

            <div className="mt-8 grid gap-6 md:grid-cols-3">
                {cards.map((card) => (
                    <Link
                        key={card.href}
                        href={card.href}
                        className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6 transition-colors hover:border-zinc-700"
                    >
                        <p className="text-sm uppercase tracking-[0.2em] text-zinc-500">{card.label}</p>
                        <p className="mt-3 text-4xl font-black text-white">{card.count}</p>
                    </Link>
                ))}
            </div>
        </div>
    );
}
