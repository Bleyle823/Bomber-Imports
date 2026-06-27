import Link from "next/link";

import { AdminPageHeader } from "@/features/admin/ui/AdminActions";
import { DeleteAccessoryButton } from "@/features/admin/ui/DeleteAccessoryButton";
import { getAccessories } from "@/lib/data/accessories";

export default async function AdminAccessoriesPage() {
    const accessories = await getAccessories();

    return (
        <div>
            <AdminPageHeader
                title="Accessories"
                description="Manage gadget and accessory listings with images."
                actionHref="/admin/accessories/new"
                actionLabel="Add accessory"
            />

            <div className="overflow-x-auto rounded-3xl border border-zinc-800">
                <table className="min-w-full text-left text-sm">
                    <thead className="bg-zinc-950 text-zinc-400">
                        <tr>
                            <th className="px-4 py-3">Name</th>
                            <th className="px-4 py-3">Category</th>
                            <th className="px-4 py-3">Price</th>
                            <th className="px-4 py-3">Images</th>
                            <th className="px-4 py-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {accessories.map((accessory) => (
                            <tr key={accessory.id} className="border-t border-zinc-800 bg-zinc-900/40">
                                <td className="px-4 py-4 font-semibold text-white">{accessory.name}</td>
                                <td className="px-4 py-4 text-zinc-300">{accessory.category}</td>
                                <td className="px-4 py-4 text-zinc-300">{accessory.price}</td>
                                <td className="px-4 py-4 text-zinc-300">{accessory.images.length}</td>
                                <td className="px-4 py-4">
                                    <div className="flex flex-wrap gap-2">
                                        <Link
                                            href={`/admin/accessories/${accessory.id}/edit`}
                                            className="rounded-lg bg-zinc-800 px-3 py-2 text-xs font-bold text-white hover:bg-zinc-700"
                                        >
                                            Edit
                                        </Link>
                                        <DeleteAccessoryButton accessory={accessory} />
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
