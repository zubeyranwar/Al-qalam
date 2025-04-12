import {authClient} from "@/lib/auth-client";

export const useAuth = () => {
    const {data: session, isPending: isLoading} = authClient.useSession()
    const isAuthenticated = !!session?.user
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