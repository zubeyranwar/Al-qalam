import {convexAdapter} from "@convex-dev/better-auth";
import {convex} from "@convex-dev/better-auth/plugins";
import {betterAuth} from "better-auth";
import {betterAuthComponent} from "../../convex/auth";
import {type GenericCtx} from "../../convex/_generated/server";

export const createAuth = (ctx: GenericCtx) => {
    console.log({trustedOrigins: process.env.VERCEL_URL!});

    return betterAuth({
        database: convexAdapter(ctx, betterAuthComponent),
        trustedOrigins: [process.env.VERCEL_URL!, "https://al-qalam-omega.vercel.app"],
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

}

