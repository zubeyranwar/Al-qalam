import {betterAuth} from "better-auth"
import {convexAdapter} from "@better-auth-kit/convex";
import {ConvexHttpClient} from "convex/browser";

export const convexClient = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export const auth = betterAuth({
    database: convexAdapter(convexClient),
    socialProviders: {
        github: {
            clientId: process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID!,
            clientSecret: process.env.NEXT_PUBLIC_GITHUB_CLIENT_SECRET!,
        }
    },
})