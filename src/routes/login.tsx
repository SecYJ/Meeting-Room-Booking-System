import { createFileRoute } from "@tanstack/react-router";
import { Lock, Mail } from "lucide-react";
import { useState } from "react";
import { GoogleIcon } from "@/assets/GoogleIcon";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { withPasswordVisibleLoginSchema } from "@/features/auth/sign-in/schema";
import { useAppForm } from "@/hooks/form";
import { authClient } from "@/lib/auth-client";

export const Route = createFileRoute("/login")({
    head: ({ loaderData }) => ({ meta: [{ title: `Sign in: ${loaderData}` }] }),
    loader: () => 3,
    component: LoginRoute,
});

function LoginRoute() {
    const [showPassword, setShowPassword] = useState(false);

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
    });

    const signIn = async () => {
        const test = await authClient.signIn.social({
            provider: "google",
        });

        console.log("test", test);
    };

    return (
        <main className="relative min-h-dvh bg-background text-foreground">
            <div
                className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
                aria-hidden="true"
            >
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
                                        onTogglePasswordVisibility={() =>
                                            setShowPassword((v) => !v)
                                        }
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
                                        disabled={isSubmitting}
                                        onClick={signIn}
                                    >
                                        <GoogleIcon className="h-4 w-4" />
                                        Continue with Google
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
