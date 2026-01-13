import { betterAuth } from "better-auth";
import { env } from "./env";

export const auth = betterAuth({
    socialProviders: {
        google: {
            clientId: env.GOOGLE_CLIENT_ID,
            clientSecret: env.GOOGLE_CLIENT_SECRET,
        },
    },
});
