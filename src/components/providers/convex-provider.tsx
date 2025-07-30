"use client"

import {ReactNode} from "react";
import { ConvexBetterAuthProvider } from "@convex-dev/better-auth/react";
import {authClient} from "@/lib/auth-client";
import {ConvexReactClient} from "convex/react";

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export default function ConvexClientProvider({
                                           children
                                       }: {
    children: ReactNode
}) {
    return (
        <ConvexBetterAuthProvider  client={convex} authClient={authClient}>
            {children}
        </ConvexBetterAuthProvider>
    )
}
