import Link from "next/link";

import DeletePhoneButton, { AdminPageHeader } from "@/features/admin/ui/AdminActions";
import { getPhones } from "@/lib/data/phones";

export default async function AdminPhonesPage() {
    const phones = await getPhones();

    return (
        <div>
            <AdminPageHeader
                title="Phones"
                description="Add, edit, or remove phones and gadget listings."
                actionHref="/admin/phones/new"
                actionLabel="Add phone"
            />

            <div className="overflow-x-auto rounded-3xl border border-zinc-800">
                <table className="min-w-full text-left text-sm">
                    <thead className="bg-zinc-950 text-zinc-400">
                        <tr>
                            <th className="px-4 py-3">Model</th>
                            <th className="px-4 py-3">Brand</th>
                            <th className="px-4 py-3">Price</th>
                            <th className="px-4 py-3">Images</th>
                            <th className="px-4 py-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {phones.map((phone) => (
                            <tr key={phone.id} className="border-t border-zinc-800 bg-zinc-900/40">
                                <td className="px-4 py-4 font-semibold text-white">{phone.model}</td>
                                <td className="px-4 py-4 text-zinc-300">{phone.brand}</td>
                                <td className="px-4 py-4 text-zinc-300">
                                    {new Intl.NumberFormat("en-KE", {
                                        style: "currency",
                                        currency: "KES",
                                        minimumFractionDigits: 0,
                                    }).format(phone.price)}
                                </td>
                                <td className="px-4 py-4 text-zinc-300">{phone.images.length}</td>
                                <td className="px-4 py-4">
                                    <div className="flex flex-wrap gap-2">
                                        <Link
                                            href={`/admin/phones/${phone.id}/edit`}
                                            className="rounded-lg bg-zinc-800 px-3 py-2 text-xs font-bold text-white hover:bg-zinc-700"
                                        >
                                            Edit
                                        </Link>
                                        <DeletePhoneButton phone={phone} />
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
