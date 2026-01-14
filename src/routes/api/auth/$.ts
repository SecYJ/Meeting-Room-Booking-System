import { createFileRoute } from "@tanstack/react-router";

import { auth } from "@/lib/utils/auth";

export const Route = createFileRoute("/api/auth/$")({
    server: {
        handlers: {
            GET: async ({ request }) => {
                return auth.handler(request);
            },
            POST: async ({ request }) => {
                return auth.handler(request);
            },
        },
    },
});
