import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/cn";

type CardProps = ComponentPropsWithoutRef<"div">;

const Card = ({ children, className, ...props }: CardProps) => {
    return (
        <div className={cn(
            'rounded-card border border-border bg-surface shadow-card backdrop-blur-lg',
            className,
        )}
            {...props}>
            {children}

        </div>
    )
}

export default Card;