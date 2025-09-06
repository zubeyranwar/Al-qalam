import {createAuthClient} from "better-auth/react";
import {convexClient} from "@convex-dev/better-auth/client/plugins";

export const authClient = createAuthClient({
    baseURL: (process.env.NEXT_PUBLIC_SITE_URL || process.env.BETTER_AUTH_URL) as string,
    plugins: [
        convexClient(),
    ],
});