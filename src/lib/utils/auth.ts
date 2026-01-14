import { betterAuth } from "better-auth";
import { memoryAdapter } from "better-auth/adapters/memory";
import { tanstackStartCookies } from "better-auth/tanstack-start";
import { env } from "./env";

const memoryDb = (() => {
    const g = globalThis as typeof globalThis & {
        __betterAuthMemoryDb?: Record<string, Array<Record<string, unknown>>>;
    };
    g.__betterAuthMemoryDb ??= {};
    return g.__betterAuthMemoryDb;
})();

export const auth = betterAuth({
    baseURL: "http://localhost:3000",
    secret: env.BETTER_AUTH_SECRET,
    database: memoryAdapter(memoryDb),
    emailAndPassword: {
        enabled: true,
    },
    socialProviders: {
        google: {
            clientId: env.GOOGLE_CLIENT_ID,
            clientSecret: env.GOOGLE_CLIENT_SECRET,
            scopes: ["email"],
        },
    },
    plugins: [tanstackStartCookies()],
});
