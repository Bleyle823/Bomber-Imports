import { notFound } from "next/navigation";

import PhoneForm from "@/features/admin/ui/PhoneForm";
import { getPhoneById } from "@/lib/data/phones";

interface Props {
    params: {
        id: string;
    };
}

export default async function EditPhonePage({ params }: Props) {
    const phone = await getPhoneById(params.id);

    if (!phone) {
        notFound();
    }

    return (
        <div>
            <h1 className="mb-8 text-3xl font-bold text-white">Edit {phone.model}</h1>
            <PhoneForm mode="edit" initialPhone={phone} />
        </div>
    );
}
