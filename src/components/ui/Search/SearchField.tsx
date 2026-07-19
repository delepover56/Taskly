import type { ComponentPropsWithoutRef } from "react";
import { Search } from "lucide-react"
import { cn } from "@/lib/cn";

type SearchFieldProps = Omit<ComponentPropsWithoutRef<'input'>, 'type' | 'className' | 'aria-label'>
    & {
        'aria-label': string,
        className?: string
    }