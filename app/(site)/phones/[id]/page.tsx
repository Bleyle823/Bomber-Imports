import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { createWhatsAppLink } from "@/shared/constants/contact";
import { getPhoneById } from "@/lib/data/phones";

interface Props {
    params: {
        id: string;
    };
}

const reviews = [
    {
        name: "Brian M.",
        location: "Nairobi",
        rating: "5.0",
        comment: "The team helped me compare options and delivered exactly what we agreed on.",
    },
    {
        name: "Amina K.",
        location: "Mombasa",
        rating: "4.9",
        comment: "Quick response on WhatsApp, fair pricing, and the phone arrived in great condition.",
    },
    {
        name: "David O.",
        location: "Kisumu",
        rating: "5.0",
        comment: "I liked being able to negotiate before buying. The specs were explained clearly.",
    },
];

const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-KE", {
        style: "currency",
        currency: "KES",
        minimumFractionDigits: 0,
    }).format(price);
};

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: Props) {
    const phone = await getPhoneById(params.id);

    if (!phone) {
        return {
            title: "Phone not found | Bomber Imports",
        };
    }

    return {
        title: `${phone.model} | Bomber Imports`,
        description: `${phone.model} specs, price, and customer reviews from Bomber Imports.`,
    };
}

export default async function PhoneDetailsPage({ params }: Props) {
    const phone = await getPhoneById(params.id);

    if (!phone) {
        notFound();
    }

    const whatsappMessage = `Hi Bomber Imports, I want to negotiate the price for the ${phone.brand} ${phone.model} listed at ${formatPrice(phone.price)}.`;
    const specRows = [
        ["Display", phone.specs.display],
        ["Processor", phone.specs.processor],
        ["Camera", phone.specs.camera],
        ["Storage", phone.detailSpecs.storage],
        ["Battery", phone.detailSpecs.battery],
        ["Condition", phone.detailSpecs.condition],
        ["Warranty", phone.detailSpecs.warranty],
        ["Network", phone.detailSpecs.network],
    ];

    const primaryImage = phone.images[0] ?? "/images/iphone-category.jpg";

    return (
        <main className="min-h-screen bg-black pt-24 pb-20 text-white">
            <div className="container">
                <Link href="/phones" className="text-sm font-semibold text-blue-500 hover:underline">
                    Back to phones
                </Link>

                <section className="mt-8 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
                    <div className="rounded-[2rem] border border-zinc-800 bg-zinc-950 p-4 md:p-6">
                        <div className="relative h-[420px] overflow-hidden rounded-3xl bg-zinc-900 md:h-[560px]">
                            <Image
                                src={primaryImage}
                                alt={phone.model}
                                fill
                                priority
                                className="object-contain p-8"
                            />
                        </div>

                        {phone.images.length > 1 && (
                            <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
                                {phone.images.map((image) => (
                                    <div key={image} className="relative h-28 overflow-hidden rounded-2xl bg-zinc-900">
                                        <Image src={image} alt={`${phone.model} preview`} fill className="object-contain p-3" />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="space-y-8">
                        <div>
                            <p className="mb-3 text-sm font-bold uppercase tracking-[0.3em] text-blue-500">{phone.brand}</p>
                            <h1 className="text-4xl font-black tracking-tight md:text-6xl">{phone.model}</h1>
                            <p className="mt-4 text-3xl font-bold text-blue-500">{formatPrice(phone.price)}</p>
                            <p className="mt-5 text-lg leading-8 text-zinc-300">{phone.description}</p>
                        </div>

                        <a
                            href={createWhatsAppLink(whatsappMessage)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex w-full items-center justify-center rounded-2xl bg-white px-6 py-4 text-center font-bold text-black transition-colors hover:bg-zinc-200"
                        >
                            Negotiate price
                        </a>

                        <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6">
                            <h2 className="mb-5 text-2xl font-bold">Full specs</h2>
                            <div className="grid gap-3">
                                {specRows.map(([label, value]) => (
                                    <div key={label} className="flex flex-col gap-1 rounded-2xl bg-zinc-900 p-4 sm:flex-row sm:items-center sm:justify-between">
                                        <span className="text-sm text-zinc-500">{label}</span>
                                        <span className="font-semibold text-zinc-100">{value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                <section className="mt-12 grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
                    <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6">
                        <h2 className="text-2xl font-bold">Highlights</h2>
                        <ul className="mt-5 space-y-3 text-zinc-300">
                            {phone.detailSpecs.highlights.map((highlight) => (
                                <li key={highlight} className="rounded-2xl bg-zinc-900 px-4 py-3">
                                    {highlight}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6">
                        <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                            <div>
                                <p className="text-sm font-bold uppercase tracking-[0.3em] text-blue-500">Reviews</p>
                                <h2 className="mt-2 text-2xl font-bold">What customers say</h2>
                            </div>
                            <p className="text-sm text-zinc-400">General Bomber Imports reviews</p>
                        </div>
                        <div className="grid gap-4 md:grid-cols-3">
                            {reviews.map((review) => (
                                <article key={review.name} className="rounded-2xl bg-zinc-900 p-5">
                                    <div className="mb-4 flex items-center justify-between">
                                        <div>
                                            <h3 className="font-bold">{review.name}</h3>
                                            <p className="text-xs text-zinc-500">{review.location}</p>
                                        </div>
                                        <span className="rounded-full bg-blue-600/20 px-3 py-1 text-xs font-bold text-blue-300">
                                            {review.rating}
                                        </span>
                                    </div>
                                    <p className="text-sm leading-6 text-zinc-300">{review.comment}</p>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>
            </div>
        </main>
    );
}
