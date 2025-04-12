"use client"
import {ReactNode} from "react";
import {useAuth} from "@/hooks/use-auth";
import {redirect} from "next/navigation";
import Spinner from "@/components/spinner";
import Navigation from "@/app/(main)/_components/navigation";
import SidebarProvider from "@/components/providers/sidebar-provider";

export default function MainLayout({
                                       children
                                   }: {
    children: ReactNode
}) {
    const {isAuthenticated, isLoading} = useAuth()

    if (isLoading) {
        return (
            <div className="h-full w-full flex items-center justify-center">
                <Spinner size="lg"/>
            </div>
        )
    }

    if (!isAuthenticated) {
        redirect("/")
    }

    return (
        <SidebarProvider>
            <div className="h-full flex">
                <Navigation/>
                {children}
            </div>
        </SidebarProvider>
    )
}
