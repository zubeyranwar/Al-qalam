import {authClient} from "@/lib/auth-client";
import {useConvexAuth, useQuery} from "convex/react";
import {api} from "../../convex/_generated/api";

export const useAuth = () => {
    const {isAuthenticated, isLoading} = useConvexAuth()
    const session = useQuery(api.auth.getSession)
    const login = async () => {
        try {
            return await authClient.signIn.social({
                provider: "github",
                callbackURL: "/documents",
                errorCallbackURL: "/error",
                disableRedirect: true,
            });

        } catch (error) {
            console.error('Login error:', error);
        }
    }

    const logout = async () => {
        try {
            await authClient.signOut()
        } catch (error) {
            console.error("Logout error: ", error)
        }
    }

    return {
        session,
        isAuthenticated,
        isLoading,
        login,
        logout,
    }
}