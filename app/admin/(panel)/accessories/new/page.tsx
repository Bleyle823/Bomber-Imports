import AccessoryForm from "@/features/admin/ui/AccessoryForm";

export default function NewAccessoryPage() {
    return (
        <div>
            <h1 className="mb-8 text-3xl font-bold text-white">Add accessory</h1>
            <AccessoryForm mode="create" />
        </div>
    );
}
