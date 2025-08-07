import {convexAdapter} from "@convex-dev/better-auth";
import {convex} from "@convex-dev/better-auth/plugins";
import {betterAuth} from "better-auth";
import {betterAuthComponent} from "../../convex/auth";
import {type GenericCtx} from "../../convex/_generated/server";

const siteUrl = process.env.NODE_ENV === "production"
    ? process.env.NEXT_PUBLIC_SITE_URL!
    : "http://localhost:3000";

export const createAuth = (ctx: GenericCtx) =>
    betterAuth({
        baseURL: siteUrl,
        database: convexAdapter(ctx, betterAuthComponent),
        trustedOrigins: [siteUrl],
        socialProviders: {
            github: {
                clientId: process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID!,
                clientSecret: process.env.NEXT_PUBLIC_GITHUB_CLIENT_SECRET!,
            }
        },
        plugins: [
            convex(),
        ],
    });