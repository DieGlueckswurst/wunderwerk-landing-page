import { cn } from "@/lib/utils";
import React from "react";

type TagVariant = "neutral" | "warning";

export interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
    variant?: TagVariant;
}

export function Tag({ children, className, variant = "neutral", ...props }: TagProps) {
    const baseClasses = "inline-block px-3 py-1 rounded-full text-xs font-medium font-sans";
    const variantClasses =
        variant === "warning"
            ? "bg-amber-100 text-amber-800"
            : "bg-gray-50 text-gray-700 border border-gray-200";

    return (
        <span className={cn(baseClasses, variantClasses, className)} {...props}>
            {children}
        </span>
    );
}

export default Tag;


