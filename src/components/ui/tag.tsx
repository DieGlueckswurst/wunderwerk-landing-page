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
            ? "bg-warm text-white"
            : "bg-warm/10 text-warm";

    return (
        <span className={cn(baseClasses, variantClasses, className)} {...props}>
            {children}
        </span>
    );
}

export default Tag;


