import PhoneForm from "@/features/admin/ui/PhoneForm";

export default function NewPhonePage() {
    return (
        <div>
            <h1 className="mb-8 text-3xl font-bold text-white">Add phone</h1>
            <PhoneForm mode="create" />
        </div>
    );
}
