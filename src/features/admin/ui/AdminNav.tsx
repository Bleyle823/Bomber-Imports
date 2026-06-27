"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const links = [
    { href: "/admin", label: "Dashboard" },
    { href: "/admin/phones", label: "Phones" },
    { href: "/admin/accessories", label: "Accessories" },
    { href: "/admin/homepage", label: "Homepage" },
];

export default function AdminNav() {
    const pathname = usePathname();
    const router = useRouter();

    const handleLogout = async () => {
        await fetch("/api/admin/auth/logout", { method: "POST" });
        router.push("/admin/login");
        router.refresh();
    };

    return (
        <header className="border-b border-zinc-800 bg-zinc-950">
            <div className="container flex flex-wrap items-center justify-between gap-4 py-4">
                <div>
                    <p className="text-xs font-bold uppercase tracking-[0.3em] text-blue-500">Bomber Imports</p>
                    <h1 className="text-xl font-bold text-white">Admin</h1>
                </div>
                <nav className="flex flex-wrap items-center gap-2">
                    {links.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`rounded-lg px-3 py-2 text-sm font-semibold transition-colors ${
                                pathname === link.href
                                    ? "bg-blue-600 text-white"
                                    : "text-zinc-300 hover:bg-zinc-800"
                            }`}
                        >
                            {link.label}
                        </Link>
                    ))}
                    <Link
                        href="/"
                        className="rounded-lg px-3 py-2 text-sm font-semibold text-zinc-400 hover:bg-zinc-800"
                    >
                        View site
                    </Link>
                    <button
                        type="button"
                        onClick={handleLogout}
                        className="rounded-lg px-3 py-2 text-sm font-semibold text-zinc-300 hover:bg-zinc-800"
                    >
                        Log out
                    </button>
                </nav>
            </div>
        </header>
    );
}
