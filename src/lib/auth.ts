import {convexAdapter} from "@convex-dev/better-auth";
import {convex} from "@convex-dev/better-auth/plugins";
import {betterAuth, BetterAuthOptions} from "better-auth";
import {betterAuthComponent} from "../../convex/auth";
import {type GenericCtx} from "../../convex/_generated/server";
import {requireEnv} from "@/lib/utils";

const siteUrl = requireEnv("SITE_URL");

const createOptions = (ctx: GenericCtx) => ({
    baseURL: siteUrl,
    database: convexAdapter(ctx, betterAuthComponent),
    trustedOrigins: [siteUrl],
    socialProviders: {
        github: {
            clientId: process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID as string,
            clientSecret: process.env.NEXT_PUBLIC_GITHUB_CLIENT_SECRET as string,
        },
    },
}) satisfies BetterAuthOptions

export const createAuth = (ctx: GenericCtx) => {
    const options = createOptions(ctx);

    return betterAuth({
        ...options,
        plugins: [
            convex({options}),
        ],
    });
}
