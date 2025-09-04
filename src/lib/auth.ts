import {convexAdapter} from "@convex-dev/better-auth";
import {convex} from "@convex-dev/better-auth/plugins";
import {betterAuth, BetterAuthOptions} from "better-auth";
import {betterAuthComponent} from "../../convex/auth";
import {type GenericCtx} from "../../convex/_generated/server";

const ensureProtocol = (url: string) => {
    if (url.startsWith("http://") || url.startsWith("https://")) return url;
    return `https://${url}`;
};

const trimTrailingSlash = (url: string) => url.replace(/\/$/, "");

const resolveBaseUrl = () => {
    const explicit = process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL;
    if (process.env.NODE_ENV === "production") {
        if (!explicit) {
            throw new Error("SITE_URL (or NEXT_PUBLIC_SITE_URL) must be set in production");
        }
        return trimTrailingSlash(ensureProtocol(explicit));
    }
    // Development fallback
    return trimTrailingSlash(explicit ? ensureProtocol(explicit) : "http://localhost:3000");
};

const siteUrl = "https://al-qalam-ashy.vercel.app";

const createOptions = (ctx: GenericCtx) => ({
    baseURL: siteUrl,
    database: convexAdapter(ctx, betterAuthComponent),
    trustedOrigins: Array.from(new Set([
        siteUrl,
        "http://localhost:3000",
        "https://localhost:3000",
    ])),
    socialProviders: {
        github: {
            clientId: (process.env.GITHUB_CLIENT_ID || process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID) as string,
            clientSecret: (process.env.GITHUB_CLIENT_SECRET || process.env.NEXT_PUBLIC_GITHUB_CLIENT_SECRET) as string,
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
