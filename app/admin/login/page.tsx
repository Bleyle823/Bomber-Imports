"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";

import { AdminButton, AdminField, AdminInput } from "@/features/admin/ui/AdminFormFields";

function LoginForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setLoading(true);
        setError("");

        try {
            const response = await fetch("/api/admin/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ password }),
            });

            const data = (await response.json()) as { error?: string };

            if (!response.ok) {
                throw new Error(data.error ?? "Login failed");
            }

            const redirectTo = searchParams.get("from") ?? "/admin";
            router.push(redirectTo);
            router.refresh();
        } catch (loginError) {
            setError(loginError instanceof Error ? loginError.message : "Login failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-black px-4">
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-md space-y-6 rounded-3xl border border-zinc-800 bg-zinc-950 p-8"
            >
                <div>
                    <p className="text-xs font-bold uppercase tracking-[0.3em] text-blue-500">Bomber Imports</p>
                    <h1 className="mt-2 text-3xl font-bold text-white">Admin login</h1>
                </div>

                {error && <p className="text-sm text-red-400">{error}</p>}

                <AdminField label="Password">
                    <AdminInput
                        type="password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        required
                    />
                </AdminField>

                <AdminButton type="submit" disabled={loading} className="w-full">
                    {loading ? "Signing in..." : "Sign in"}
                </AdminButton>
            </form>
        </div>
    );
}

export default function AdminLoginPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-black" />}>
            <LoginForm />
        </Suspense>
    );
}
