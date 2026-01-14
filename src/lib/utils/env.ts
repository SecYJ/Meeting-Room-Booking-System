import { createClientOnlyFn, createServerOnlyFn } from "@tanstack/react-start";
import { z } from "zod";

export const env = z
    .object({
        BETTER_AUTH_SECRET: z.string().min(1),
        BETTER_AUTH_URL: z.url(),
        GOOGLE_CLIENT_ID: z.string().min(1),
        GOOGLE_CLIENT_SECRET: z.string().min(1),
    })
    .parse({
        BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET,
        BETTER_AUTH_URL: process.env.VITE_BETTER_AUTH_URL,
        GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
        GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    });

export const serverEnv = createServerOnlyFn(() => {
    return z
        .object({
            BETTER_AUTH_SECRET: z.string().min(1),
            BETTER_AUTH_URL: z.url(),
            GOOGLE_CLIENT_ID: z.string().min(1),
            GOOGLE_CLIENT_SECRET: z.string().min(1),
        })
        .parse({
            BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET,
            BETTER_AUTH_URL: process.env.VITE_BETTER_AUTH_URL,
            GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
            GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
        });
})();

// export const clientEnv = createClientOnlyFn(() => {
//     return z
//         .object({
//             BETTER_AUTH_URL: z.url(),
//         })
//         .parse({
//             BETTER_AUTH_URL: import.meta.env.VITE_BETTER_AUTH_URL,
//         });
// })();
