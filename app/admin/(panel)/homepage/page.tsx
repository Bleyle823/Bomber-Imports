import HomepageEditor from "@/features/admin/ui/HomepageEditor";
import { getHomepageConfig } from "@/lib/data/homepage";
import { getPhones } from "@/lib/data/phones";

export default async function AdminHomepagePage() {
    const [config, phones] = await Promise.all([getHomepageConfig(), getPhones()]);

    return (
        <div>
            <h1 className="mb-2 text-3xl font-bold text-white">Homepage content</h1>
            <p className="mb-8 text-zinc-400">
                Update hero copy, featured phones, category cards, and highlight slides.
            </p>
            <HomepageEditor initialConfig={config} phones={phones} />
        </div>
    );
}
