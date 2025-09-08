import {convexAdapter} from "@convex-dev/better-auth";
import {convex} from "@convex-dev/better-auth/plugins";
import {betterAuth} from "better-auth";
import {betterAuthComponent} from "../../convex/auth";
import {type GenericCtx} from "../../convex/_generated/server";

const siteUrl = "http://localhost:3000";

export const createAuth = (ctx: GenericCtx) =>
    betterAuth({
        baseURL: process.env.NEXT_PUBLIC_SITE_URL,
        database: convexAdapter(ctx, betterAuthComponent),
        socialProviders: {
            github: {
                clientId: process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID!,
                clientSecret: process.env.NEXT_PUBLIC_GITHUB_CLIENT_SECRET!,
                redirectURI: `${process.env.NEXT_PUBLIC_SITE_URL}/api/auth/callback/github`
            }
        },
        plugins: [
            convex(),
        ],
    });