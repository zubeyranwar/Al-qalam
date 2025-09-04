import {convexAdapter} from "@convex-dev/better-auth";
import {convex} from "@convex-dev/better-auth/plugins";
import {betterAuth, BetterAuthOptions} from "better-auth";
import {betterAuthComponent} from "../../convex/auth";
import {type GenericCtx} from "../../convex/_generated/server";
import {requireEnv} from "@/lib/utils";

const ensureProtocol = (url: string) => {
    if (url.startsWith("http://") || url.startsWith("https://")) return url;
    return `https://${url}`;
};

const trimTrailingSlash = (url: string) => url.replace(/\/$/, "");

const resolveBaseUrl = () => {
    const explicit = process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL;
    const vercelUrl = process.env.VERCEL_URL;
    const origin = explicit ?? (vercelUrl ? ensureProtocol(vercelUrl) : "http://localhost:3000");
    return trimTrailingSlash(origin);
};

const siteUrl = resolveBaseUrl();

const createOptions = (ctx: GenericCtx) => ({
    baseURL: siteUrl,
    database: convexAdapter(ctx, betterAuthComponent),
    trustedOrigins: Array.from(new Set([
        siteUrl,
        ...(
            process.env.VERCEL_URL ? [trimTrailingSlash(ensureProtocol(process.env.VERCEL_URL))] : []
        ),
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
