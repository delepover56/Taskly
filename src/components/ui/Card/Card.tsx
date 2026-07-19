import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/cn";

type CardProps = ComponentPropsWithoutRef<"div">;

const Card = ({ children, className, ...CardProps }: CardProps) => {
    return (
        <div className={cn(
            'rounded-card border border-border bg-surface shadow-card backdrop-blur-lg',
            className,
        )}
            {...CardProps}>
            {children}

        </div>
    )
}

export default Card;