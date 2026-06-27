import type { InputHTMLAttributes, TextareaHTMLAttributes } from "react";

const inputClassName =
    "w-full rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-white outline-none focus:border-blue-500";

export function AdminField({
    label,
    children,
}: {
    label: string;
    children: React.ReactNode;
}) {
    return (
        <label className="block space-y-2">
            <span className="text-sm font-semibold text-zinc-300">{label}</span>
            {children}
        </label>
    );
}

export function AdminInput(props: InputHTMLAttributes<HTMLInputElement>) {
    return <input {...props} className={`${inputClassName} ${props.className ?? ""}`} />;
}

export function AdminTextarea(props: TextareaHTMLAttributes<HTMLTextAreaElement>) {
    return (
        <textarea
            {...props}
            className={`${inputClassName} min-h-[120px] ${props.className ?? ""}`}
        />
    );
}

export function AdminButton({
    children,
    variant = "primary",
    ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: "primary" | "secondary" | "danger";
}) {
    const variants = {
        primary: "bg-blue-600 text-white hover:bg-blue-700",
        secondary: "border border-zinc-700 text-white hover:bg-zinc-800",
        danger: "bg-red-600 text-white hover:bg-red-700",
    };

    return (
        <button
            {...props}
            className={`rounded-xl px-4 py-3 text-sm font-bold transition-colors disabled:opacity-50 ${variants[variant]} ${props.className ?? ""}`}
        >
            {children}
        </button>
    );
}
