"use client";

import { type FC, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

import { createWhatsAppLink } from "@/shared/constants/contact";
import type { Phone } from "@/lib/data/types";
import Phone3DPreview from "@/shared/ui/Phone3DPreview";

const brandAliases: Record<string, string> = {
    iphone: "Apple",
    pixel: "Google",
};

const PhoneCard: FC<{ phone: Phone }> = ({ phone }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [viewMode, setViewMode] = useState<"image" | "3d">("image");

    const nextImage = () => {
        setCurrentImageIndex((prev) => (prev + 1) % phone.images.length);
    };

    const prevImage = () => {
        setCurrentImageIndex((prev) => (prev - 1 + phone.images.length) % phone.images.length);
    };

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat("en-KE", {
            style: "currency",
            currency: "KES",
            minimumFractionDigits: 0,
        }).format(price);
    };

    const whatsappMessage = `Hi Bomber Imports, I'm interested in the ${phone.brand} ${phone.model} for ${formatPrice(phone.price)}. Is it available?`;
    const whatsappLink = createWhatsAppLink(whatsappMessage);

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 flex flex-col h-full overflow-hidden"
        >
            <div className="relative h-64 mb-6 group">
                <div className="w-full h-full bg-zinc-800 rounded-2xl flex items-center justify-center text-zinc-500 overflow-hidden relative">
                    {viewMode === "3d" && phone.model3d ? (
                        <Phone3DPreview modelPath={phone.model3d} />
                    ) : phone.images.length > 0 ? (
                        <div className="w-full h-full relative p-4">
                            <Image
                                src={phone.images[currentImageIndex]}
                                alt={phone.model}
                                fill
                                className="object-contain"
                            />
                        </div>
                    ) : (
                        <span>No image</span>
                    )}

                    {phone.model3d && (
                        <button
                            onClick={() => setViewMode(viewMode === "image" ? "3d" : "image")}
                            className="absolute bottom-2 right-2 z-10 bg-blue-600 text-white text-[10px] px-3 py-1 rounded-full font-bold hover:bg-blue-700 transition-colors uppercase tracking-wider"
                        >
                            {viewMode === "image" ? "View in 3D" : "View Image"}
                        </button>
                    )}
                </div>
                {viewMode === "image" && phone.images.length > 1 && (
                    <>
                        <button
                            onClick={prevImage}
                            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                            ←
                        </button>
                        <button
                            onClick={nextImage}
                            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                            →
                        </button>
                    </>
                )}
            </div>

            <div className="flex-1">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-white">{phone.model}</h3>
                    <span className="text-blue-500 font-bold">{formatPrice(phone.price)}</span>
                </div>
                <p className="text-zinc-400 text-sm mb-4 line-clamp-2">{phone.description}</p>

                <div className="space-y-2 mb-6">
                    <div className="flex justify-between text-xs">
                        <span className="text-zinc-500">Display:</span>
                        <span className="text-zinc-300">{phone.specs.display}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                        <span className="text-zinc-500">Chip:</span>
                        <span className="text-zinc-300">{phone.specs.processor}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                        <span className="text-zinc-500">Camera:</span>
                        <span className="text-zinc-300">{phone.specs.camera}</span>
                    </div>
                </div>
            </div>

            <div className="mt-auto grid gap-3">
                <Link
                    href={`/phones/${phone.id}`}
                    className="w-full border border-zinc-700 text-white text-center py-3 rounded-xl font-bold hover:bg-zinc-800 transition-colors"
                >
                    View details
                </Link>
                <a
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-white text-black text-center py-3 rounded-xl font-bold hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2"
                >
                    <span>Negotiate price</span>
                </a>
            </div>
        </motion.div>
    );
};

const PhonesList: FC<{ phones: Phone[] }> = ({ phones }) => {
    const searchParams = useSearchParams();
    const brandFilter = searchParams.get("brand");
    const resolvedBrandFilter = brandFilter
        ? (brandAliases[brandFilter.toLowerCase()] ?? brandFilter)
        : null;

    const filteredPhones = resolvedBrandFilter
        ? phones.filter((p) => p.brand.toLowerCase() === resolvedBrandFilter.toLowerCase())
        : phones;

    return (
        <>
            <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
                        {brandFilter ? `${brandFilter}s` : "Available Phones"}
                    </h1>
                    <p className="text-zinc-400 text-lg">
                        {brandFilter
                            ? `Currently viewing our selection of ${brandFilter} models.`
                            : "Browse our curated selection of premium smartphones."}
                    </p>
                </div>
                {brandFilter && (
                    <Link href="/phones" className="text-blue-500 hover:underline">
                        View all brands
                    </Link>
                )}
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {filteredPhones.map((phone) => (
                    <PhoneCard key={phone.id} phone={phone} />
                ))}
            </div>
            {filteredPhones.length === 0 && (
                <div className="text-center py-20 text-zinc-500">
                    No phones found matching your criteria.
                </div>
            )}
        </>
    );
};

export default function PhonesPageClient({ phones }: { phones: Phone[] }) {
    return (
        <main className="min-h-screen bg-black pt-24 pb-20">
            <div className="container">
                <Suspense fallback={<div className="text-white">Loading...</div>}>
                    <PhonesList phones={phones} />
                </Suspense>
            </div>
        </main>
    );
}
