import { createServerFn } from "@tanstack/react-start";
import z from "zod";
import { loginSchema, startGoogleOAuthSchema } from "./schema";

export const signInWithEmailFn = createServerFn({ method: "POST" })
	.inputValidator(loginSchema)
	.handler(async ({ data }) => {
		try {
			const [{ auth }, { getRequestHeaders }] = await Promise.all([
				import("~/lib/utils/auth"),
				import("@tanstack/react-start/server"),
			]);
			await auth.api.signInEmail({
				body: {
					email: data.email,
					password: data.password,
				},
				headers: getRequestHeaders(),
			});
			return { ok: true as const };
		} catch (err) {
			return { ok: false as const, message: getSafeErrorMessage(err) };
		}
	});

export const startGoogleOAuthFn = createServerFn({ method: "POST" })
	.inputValidator(startGoogleOAuthSchema)
	.handler(async ({ data }) => {
		try {
			const [{ auth }, { getRequestHeaders }] = await Promise.all([
				import("~/lib/utils/auth"),
				import("@tanstack/react-start/server"),
			]);
			const res = await auth.api.signInSocial({
				body: {
					provider: "google",
					callbackURL: data.callbackURL ?? "/",
					disableRedirect: true,
				},
				headers: getRequestHeaders(),
			});

			const url = typeof res.url === "string" ? res.url : null;
			if (!url) {
				return { ok: false as const, message: "Unable to start Google sign-in. Please try again." };
			}

			return { ok: true as const, url };
		} catch (err) {
			return { ok: false as const, message: getSafeErrorMessage(err) };
		}
	});

const getSafeErrorMessage = (err: unknown) => {
	const parsed = z
		.object({
			message: z.string().trim().min(1),
		})
		.safeParse(err);

	if (!parsed.success) return "Unable to sign in. Please try again.";

	return parsed.data.message;
};
