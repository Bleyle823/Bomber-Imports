import { notFound } from "next/navigation";

import AccessoryForm from "@/features/admin/ui/AccessoryForm";
import { getAccessoryById } from "@/lib/data/accessories";

interface Props {
    params: {
        id: string;
    };
}

export default async function EditAccessoryPage({ params }: Props) {
    const accessory = await getAccessoryById(params.id);

    if (!accessory) {
        notFound();
    }

    return (
        <div>
            <h1 className="mb-8 text-3xl font-bold text-white">Edit {accessory.name}</h1>
            <AccessoryForm mode="edit" initialAccessory={accessory} />
        </div>
    );
}
