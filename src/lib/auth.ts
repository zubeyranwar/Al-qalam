import { betterAuth, BetterAuthOptions } from "better-auth";
import { bearer, oneTap, oAuthProxy } from "better-auth/plugins";
import { convex } from "@convex-dev/better-auth/plugins";
import { convexAdapter } from "@convex-dev/better-auth";
import { betterAuthComponent } from "../../convex/auth";
import { GenericCtx } from "../../convex/_generated/server";

const baseURL: string | undefined =
  process.env.VERCEL === "1"
    ? process.env.VERCEL_ENV === "production"
      ? process.env.BETTER_AUTH_URL
      : process.env.VERCEL_ENV === "preview"
        ? `https://${process.env.VERCEL_URL}`
        : undefined
    : undefined;

const createOptions = (ctx: GenericCtx) =>
  ({
    appName: "Al qalam",
    baseURL,
    database: convexAdapter(ctx, betterAuthComponent),
    account: {
      accountLinking: {
        trustedProviders: ["google", "github", "demo-app"],
      },
    },
    socialProviders: {
      github: {
        clientId: process.env.GITHUB_CLIENT_ID || "",
        clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
      },
    },
    plugins: [oAuthProxy(), bearer(), oneTap()],
    trustedOrigins: ["exp://", process.env.SITE_URL!],
  }) satisfies BetterAuthOptions;

export const createAuth = (ctx: GenericCtx) => {
  const options = createOptions(ctx);
  return betterAuth({
    ...options,
    plugins: [...options.plugins, convex({ options })],
  });
};
