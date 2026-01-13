import { betterAuth } from "better-auth";
import { tanstackStartCookies } from "better-auth/tanstack-start";
import { memoryAdapter } from "better-auth/adapters/memory";
import { env } from "./env";

const memoryDb = (() => {
	const g = globalThis as typeof globalThis & {
		__betterAuthMemoryDb?: Record<string, Array<Record<string, unknown>>>;
	};
	g.__betterAuthMemoryDb ??= {};
	return g.__betterAuthMemoryDb;
})();

export const auth = betterAuth({
	baseURL: env.BETTER_AUTH_URL,
	secret: env.BETTER_AUTH_SECRET,
	database: memoryAdapter(memoryDb),
	emailAndPassword: {
		enabled: true,
	},
	socialProviders: {
		google: {
			clientId: env.GOOGLE_CLIENT_ID,
			clientSecret: env.GOOGLE_CLIENT_SECRET,
		},
	},
	plugins: [tanstackStartCookies()],
});
