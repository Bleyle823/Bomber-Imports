import type { FC, PropsWithChildren } from "react";

import AdminNav from "@/features/admin/ui/AdminNav";

const AdminPanelLayout: FC<PropsWithChildren> = ({ children }) => {
    return (
        <div className="min-h-screen bg-black text-white">
            <AdminNav />
            <main className="container py-10">{children}</main>
        </div>
    );
};

export default AdminPanelLayout;
