import { createFormHook } from "@tanstack/react-form";
import { fieldContext, formContext } from "./form-context";
import { PasswordField } from "@/components/form/PasswordField";
import { TextField } from "@/components/form/TextField";
import { SubscribeButton } from "@/components/form/SubscribeButton";

export const { useAppForm, withForm, withFieldGroup } = createFormHook({
    fieldComponents: {
        TextField,
        PasswordField,
    },
    formComponents: {
        SubscribeButton,
    },
    fieldContext,
    formContext,
});
