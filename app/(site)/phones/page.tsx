import { getPhones } from "@/lib/data/phones";

import PhonesPageClient from "./PhonesPageClient";

export const dynamic = "force-dynamic";

export default async function PhonesPage() {
    const phones = await getPhones();

    return <PhonesPageClient phones={phones} />;
}
