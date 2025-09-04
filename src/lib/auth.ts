import { betterAuth, BetterAuthOptions } from "better-auth";
import { bearer, oneTap, oAuthProxy } from "better-auth/plugins";
import { convex } from "@convex-dev/better-auth/plugins";
import { convexAdapter } from "@convex-dev/better-auth";
import { betterAuthComponent } from "../../convex/auth";
import { GenericCtx } from "../../convex/_generated/server";

const baseURL =
  process.env.BETTER_AUTH_URL ||
  (process.env.VERCEL === "1"
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000");

console.log({ baseURL });

const createOptions = (ctx: GenericCtx) =>
  ({
    appName: "Al qalam",
    baseURL,
    database: convexAdapter(ctx, betterAuthComponent),
    account: {
      accountLinking: {
        trustedProviders: ["github"],
      },
    },
    socialProviders: {
      github: {
        clientId: process.env.GITHUB_CLIENT_ID || "",
        clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
      },
    },
    plugins: [oAuthProxy()],
  }) satisfies BetterAuthOptions;

export const createAuth = (ctx: GenericCtx) => {
  const options = createOptions(ctx);
  return betterAuth({
    ...options,
    plugins: [...options.plugins, convex({ options })],
  });
};
