import z from "zod";

export const baseLoginSchema = z.object({
	email: z.string().min(1, "Email is required").pipe(z.email("Enter a valid email address")),
	password: z.string().min(6, "Password must be at least 6 characters"),
});

export const loginSchema = baseLoginSchema;

export const withPasswordVisibleLoginSchema = baseLoginSchema.pick({ email: true }).extend({
	password: z.object({
		value: baseLoginSchema.shape.password,
		visible: z.boolean(),
	}),
});

export const startGoogleOAuthSchema = z.object({
	callbackURL: z.string().optional(),
});
