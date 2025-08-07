import {
    BetterAuth,
    type AuthFunctions,
    type PublicAuthFunctions,
} from "@convex-dev/better-auth";
import { api, components, internal } from "./_generated/api";
import { query } from "./_generated/server";
import type { Id, DataModel } from "./_generated/dataModel";
import {createAuth} from "@/lib/auth";

const authFunctions: AuthFunctions = internal.auth;
const publicAuthFunctions: PublicAuthFunctions = api.auth;

export const betterAuthComponent = new BetterAuth(
    components.betterAuth,
    {
        authFunctions,
        publicAuthFunctions,
    }
);

export const {
    createUser,
    updateUser,
    deleteUser,
    createSession,
    isAuthenticated,
} =
    betterAuthComponent.createAuthFunctions<DataModel>({
        // Must create a user and return the user id
        onCreateUser: async (ctx, user) => {
            // @ts-ignore
            return ctx.db.insert("users", {});
        },

        onDeleteUser: async (ctx, userId) => {
            // @ts-ignore
            await ctx.db.delete(userId as Id<"users">);
        },
    });

export const getSession = query({
    args: {},
    handler: async (ctx) => {
        const auth = createAuth(ctx);
        const headers = await betterAuthComponent.getHeaders(ctx);
        const session = await auth.api.getSession({
            headers,
        });
        if (!session) {
            return null;
        }
        return session;
    }
});