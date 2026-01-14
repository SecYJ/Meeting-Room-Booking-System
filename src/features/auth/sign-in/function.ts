import { createServerFn } from "@tanstack/react-start";
import { loginSchema } from "./schema";
import { auth } from "@/lib/utils/auth";

export const signInWithEmailFn = createServerFn({ method: "POST" })
    .inputValidator(loginSchema)
    .handler(async ({ data }) => {
        await auth.api.signInSocial({
            body: {
                provider: "google",
            },
        });
    });
