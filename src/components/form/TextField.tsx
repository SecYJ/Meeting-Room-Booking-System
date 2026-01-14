import type { ReactNode } from "react";
import { FieldError } from "@/components/form/FieldError";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFieldContext } from "@/hooks/form-context";

type TextFieldProps = {
    label: string;
    type: string;
    autoComplete?: string;
    inputMode?: "email" | "text" | "numeric" | "tel" | "search" | "url" | "none";
    placeholder?: string;
    leadingIcon?: ReactNode;
    inputClassName?: string;
};

export const TextField = ({
    label,
    type,
    autoComplete,
    inputMode,
    placeholder,
    leadingIcon,
    inputClassName,
}: TextFieldProps) => {
    const field = useFieldContext<string>();

    return (
        <div className="space-y-2">
            <Label htmlFor={field.name}>{label}</Label>
            <div className="relative">
                {leadingIcon ? (
                    <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                        {leadingIcon}
                    </div>
                ) : null}
                <Input
                    id={field.name}
                    name={field.name}
                    type={type}
                    autoComplete={autoComplete}
                    inputMode={inputMode}
                    placeholder={placeholder}
                    className={inputClassName}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                />
            </div>
            <FieldError />
        </div>
    );
};
