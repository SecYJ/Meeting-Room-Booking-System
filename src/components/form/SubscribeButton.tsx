import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { useFormContext } from "@/hooks/form-context";
import { cn } from "@/lib/utils/cn";

type Props = {
    className?: string;
    children: ReactNode;
};

export const SubscribeButton = ({ className, children }: Props) => {
    const form = useFormContext();

    return (
        <form.Subscribe selector={(state) => state.isSubmitting}>
            {(isSubmitting) => (
                <Button type="submit" className={cn("w-full", className)} disabled={isSubmitting}>
                    {children}
                </Button>
            )}
        </form.Subscribe>
    );
};
