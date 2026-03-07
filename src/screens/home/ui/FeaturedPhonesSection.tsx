"use client";
import type { FC } from "react";
import { motion } from "framer-motion";
import { phones } from "@/shared/constants/phones";
import Link from "next/link";
import Image from "next/image";

const FeaturedPhonesSection: FC = () => {
    // Take one from each main brand for variety
    const featured = [
        phones.find(p => p.id === "iphone-16-pro-max"),
        phones.find(p => p.id === "samsung-s24-ultra"),
        phones.find(p => p.id === "google-pixel-9-pro"),
        phones.find(p => p.id === "iphone-15")
    ].filter(Boolean);

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('en-KE', {
            style: 'currency',
            currency: 'KES',
            minimumFractionDigits: 0
        }).format(price);
    };

    return (
        <section className="py-20 bg-zinc-950">
            <div className="container">
                <div className="flex justify-between items-end mb-12">
                    <motion.h2
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-3xl md:text-5xl font-bold text-white"
                    >
                        Hot Deals
                    </motion.h2>
                    <Link href="/phones" className="text-blue-500 hover:underline text-lg">
                        See all phones →
                    </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {featured.map((phone, i) => (
                        phone && (
                            <motion.div
                                key={phone.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                                className="bg-zinc-900 rounded-2xl p-6 border border-zinc-800 hover:border-zinc-700 transition-colors group cursor-pointer"
                                onClick={() => window.location.href = `/phones?brand=${phone.brand.toLowerCase()}`}
                            >
                                <div className="h-48 bg-zinc-800 rounded-xl mb-6 relative overflow-hidden flex items-center justify-center group-hover:scale-105 transition-transform">
                                    <Image
                                        src={phone.images[0]}
                                        alt={phone.model}
                                        fill
                                        className="object-contain p-4"
                                    />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">{phone.model}</h3>
                                <p className="text-blue-500 font-bold text-lg mb-4">{formatPrice(phone.price)}</p>
                                <Link
                                    href={`https://wa.me/254769655561?text=Hello, I am interested in the ${phone.model}`}
                                    target="_blank"
                                    className="block w-full text-center py-2 bg-white text-black rounded-lg font-bold hover:bg-zinc-200 transition-colors"
                                >
                                    Chat with Vendor
                                </Link>
                            </motion.div>
                        )
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturedPhonesSection;
