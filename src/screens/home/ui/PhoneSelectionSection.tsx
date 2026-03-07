"use client";
import type { FC } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const categories = [
    {
        title: "iPhone Series",
        description: "The latest from Apple. From iPhone 13 to 16 Pro Max.",
        image: "/images/iphone-category.jpg",
        link: "/phones?brand=iphone",
        color: "bg-zinc-800",
        startingPrice: "85,000"
    },
    {
        title: "Samsung Series",
        description: "Premium Android Flagships. High-performance models for power users.",
        image: "/images/samsung-category.jpg",
        link: "/phones?brand=samsung",
        color: "bg-blue-900/20",
        startingPrice: "145,000"
    },
    {
        title: "Google Collection",
        description: "Smart, sleek imported devices with professional-grade cameras.",
        image: "/images/pixel-category.jpg",
        link: "/phones?brand=pixel",
        color: "bg-orange-900/20",
        startingPrice: "65,000"
    }
];


const PhoneSelectionSection: FC = () => {
    return (
        <section className="py-20 bg-black">
            <div className="container">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-3xl md:text-5xl font-bold text-white mb-12 text-center"
                >
                    Choose Your Next Phone
                </motion.h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {categories.map((cat, i) => (
                        <motion.div
                            key={cat.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            className={`${cat.color} rounded-3xl p-8 hover:scale-105 transition-transform cursor-pointer border border-zinc-700/50 flex flex-col items-center text-center`}
                        >
                            <h3 className="text-2xl font-bold text-white mb-4">{cat.title}</h3>
                            <p className="text-zinc-400 mb-4">{cat.description}</p>
                            <p className="text-blue-500 font-bold mb-8">Starting from KSh {cat.startingPrice}</p>
                            <Link
                                href={cat.link}

                                className="mt-auto bg-white text-black px-6 py-2 rounded-full font-bold hover:bg-zinc-200 transition-colors"
                            >
                                Shop Now
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default PhoneSelectionSection;
