import { createFileRoute } from "@tanstack/react-router";
import { Lock, Mail } from "lucide-react";
import { useState } from "react";
import type { SVGProps } from "react";
import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert";
import { Button } from "~/components/ui/button";
import { Separator } from "~/components/ui/separator";
import { signInWithEmailFn, startGoogleOAuthFn } from "~/features/auth/sign-in/function";
import { loginSchema, withPasswordVisibleLoginSchema } from "~/features/auth/sign-in/schema";
import { useAppForm } from "~/hooks/form";

export const Route = createFileRoute("/login")({
	head: () => ({ meta: [{ title: "Sign in" }] }),
	component: LoginRoute,
});

function LoginRoute() {
	const navigate = Route.useNavigate();
	const [serverError, setServerError] = useState<string | null>(null);
	const [showPassword, setShowPassword] = useState(false);
	const [isStartingGoogle, setIsStartingGoogle] = useState(false);

	const form = useAppForm({
		defaultValues: {
			email: "",
			password: {
				value: "",
				visible: false,
			},
		},
		validators: {
			onChange: withPasswordVisibleLoginSchema,
		},
		onSubmit: async ({ value }) => {
			setServerError(null);

			const data = loginSchema.parse(value);

			const res = await signInWithEmailFn({ data });

			if (!res.ok) {
				setServerError(res.message);
				return;
			}
			await navigate({ to: "/" });
		},
	});

	return (
		<main className="relative min-h-dvh bg-background text-foreground">
			<div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
				<div className="absolute -top-32 left-1/2 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-primary/20 blur-3xl dark:bg-primary/10" />
				<div className="absolute -bottom-40 right-[-10%] h-[520px] w-[520px] rounded-full bg-chart-2/20 blur-3xl dark:bg-chart-2/10" />
			</div>

			<div className="mx-auto flex min-h-dvh w-full max-w-md flex-col justify-center px-4 py-10">
				<header className="mb-8 text-center">
					<div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl border bg-card/80 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-card/70">
						<Lock className="h-5 w-5 text-primary" aria-hidden="true" />
					</div>
					<h1 className="text-3xl font-semibold tracking-tight">Sign in</h1>
					<p className="mt-2 text-sm text-muted-foreground">
						Use your work account to book rooms and manage meetings.
					</p>
				</header>

				<section className="rounded-2xl border bg-card/80 p-6 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-card/70">
					<form.AppForm>
						<form
							onSubmit={(e) => {
								e.preventDefault();
								e.stopPropagation();
								void form.handleSubmit();
							}}
							className="space-y-6"
						>
							{serverError ? (
								<Alert variant="destructive">
									<AlertTitle>Sign-in failed</AlertTitle>
									<AlertDescription>{serverError}</AlertDescription>
								</Alert>
							) : null}

							<form.AppField name="email">
								{(field) => (
									<field.TextField
										label="Email"
										type="email"
										autoComplete="email"
										inputMode="email"
										placeholder="you@company.com"
										inputClassName="pl-10"
										leadingIcon={<Mail className="h-4 w-4" />}
									/>
								)}
							</form.AppField>

							<form.AppField name="password">
								{(field) => (
									<field.PasswordField
										showPassword={showPassword}
										onTogglePasswordVisibility={() => setShowPassword((v) => !v)}
									/>
								)}
							</form.AppField>

							<form.SubscribeButton>Sign In</form.SubscribeButton>

							<div className="flex items-center gap-3">
								<Separator className="flex-1" />
								<span className="text-xs text-muted-foreground">or</span>
								<Separator className="flex-1" />
							</div>

							<form.Subscribe selector={(state) => state.isSubmitting}>
								{(isSubmitting) => (
									<Button
										type="button"
										variant="outline"
										className="w-full"
										disabled={isStartingGoogle || isSubmitting}
										onClick={async () => {
											setServerError(null);
											setIsStartingGoogle(true);
											try {
												const res = await startGoogleOAuthFn({ data: { callbackURL: "/" } });
												if (!res.ok) {
													setServerError(res.message);
													return;
												}
												window.location.assign(res.url);
											} finally {
												setIsStartingGoogle(false);
											}
										}}
									>
										<GoogleIcon className="h-4 w-4" />
										{isStartingGoogle ? "Starting Google…" : "Continue with Google"}
									</Button>
								)}
							</form.Subscribe>
						</form>
					</form.AppForm>
				</section>

				<p className="mt-6 text-center text-xs text-muted-foreground">
					Trouble signing in? Contact your administrator.
				</p>
			</div>
		</main>
	);
}

const GoogleIcon = (props: SVGProps<SVGSVGElement>) => {
	return (
		<svg viewBox="0 0 48 48" aria-hidden="true" {...props}>
			<path
				fill="#EA4335"
				d="M24 9.5c3.1 0 5.8 1.1 7.9 3.1l5.9-5.9C34.1 3.4 29.5 1.5 24 1.5 14.6 1.5 6.6 6.9 2.7 14.7l6.9 5.4C11.4 14 17.1 9.5 24 9.5z"
			/>
			<path
				fill="#4285F4"
				d="M46.1 24.5c0-1.7-.2-3.3-.6-4.9H24v9.3h12.3c-.5 2.5-1.9 4.6-3.9 6.1l6.3 4.9c3.6-3.3 5.4-8.1 5.4-13.4z"
			/>
			<path
				fill="#FBBC05"
				d="M9.6 28.2c-.5-1.4-.8-2.9-.8-4.4s.3-3.1.8-4.4l-6.9-5.4C1.6 16.4 1 19.1 1 23.8s.6 7.4 1.7 10.2l6.9-5.8z"
			/>
			<path
				fill="#34A853"
				d="M24 46.1c5.5 0 10.1-1.8 13.4-4.9l-6.3-4.9c-1.7 1.2-4 1.9-7.1 1.9-6.8 0-12.6-4.6-14.7-10.8l-6.9 5.8C6.4 41.1 14.5 46.1 24 46.1z"
			/>
			<path fill="none" d="M1 1.5h46v45H1z" />
		</svg>
	);
};
