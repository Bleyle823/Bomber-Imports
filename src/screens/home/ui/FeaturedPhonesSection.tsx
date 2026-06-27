"use client";
import type { FC } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

import { createWhatsAppLink } from "@/shared/constants/contact";
import type { Phone } from "@/lib/data/types";

const FeaturedPhonesSection: FC<{ phones: Phone[] }> = ({ phones }) => {
    const formatPrice = (price: number) => {
        return new Intl.NumberFormat("en-KE", {
            style: "currency",
            currency: "KES",
            minimumFractionDigits: 0,
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
                    {phones.map((phone, i) => (
                        <motion.div
                            key={phone.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            className="bg-zinc-900 rounded-2xl p-6 border border-zinc-800 hover:border-zinc-700 transition-colors group"
                        >
                            <Link
                                href={`/phones/${phone.id}`}
                                className="h-48 bg-zinc-800 rounded-xl mb-6 relative overflow-hidden flex items-center justify-center group-hover:scale-105 transition-transform"
                            >
                                {phone.images[0] ? (
                                    <Image
                                        src={phone.images[0]}
                                        alt={phone.model}
                                        fill
                                        className="object-contain p-4"
                                    />
                                ) : (
                                    <span className="text-zinc-500">No image</span>
                                )}
                            </Link>
                            <h3 className="text-xl font-bold text-white mb-2">{phone.model}</h3>
                            <p className="text-blue-500 font-bold text-lg mb-4">{formatPrice(phone.price)}</p>
                            <div className="grid gap-3">
                                <Link
                                    href={`/phones/${phone.id}`}
                                    className="block w-full text-center py-2 border border-zinc-700 text-white rounded-lg font-bold hover:bg-zinc-800 transition-colors"
                                >
                                    View details
                                </Link>
                                <Link
                                    href={createWhatsAppLink(`Hello, I want to negotiate the price for the ${phone.model}`)}
                                    target="_blank"
                                    className="block w-full text-center py-2 bg-white text-black rounded-lg font-bold hover:bg-zinc-200 transition-colors"
                                >
                                    Negotiate price
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturedPhonesSection;
