import {createAuthClient} from "better-auth/react";
import {convexClient, crossDomainClient} from "@convex-dev/better-auth/client/plugins";
import {genericOAuthClient} from "better-auth/client/plugins";

export const authClient = createAuthClient({
    plugins: [
        convexClient(),
        crossDomainClient(),
        genericOAuthClient()
    ],
});