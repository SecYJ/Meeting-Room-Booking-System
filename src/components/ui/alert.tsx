import * as React from "react";
import { cva } from "class-variance-authority";
import type { VariantProps } from "class-variance-authority";

import { cn } from "~/lib/utils/cn";

const alertVariants = cva("relative w-full rounded-lg border p-4", {
	variants: {
		variant: {
			default: "bg-background text-foreground",
			destructive: "border-destructive/50 text-destructive [&_a]:text-destructive",
		},
	},
	defaultVariants: {
		variant: "default",
	},
});

export type AlertProps = React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>;

export function Alert({ className, variant, ...props }: AlertProps) {
	return <div role="alert" className={cn(alertVariants({ variant }), className)} {...props} />;
}

export function AlertTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
	return <h5 className={cn("mb-1 font-medium leading-none tracking-tight", className)} {...props} />;
}

export function AlertDescription({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
	return <div className={cn("text-sm [&_p]:leading-relaxed", className)} {...props} />;
}
