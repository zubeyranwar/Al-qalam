"use client"
import {ReactNode} from "react";
import Spinner from "@/components/spinner";
import Navigation from "@/app/(main)/_components/navigation";
import {Toaster} from "sonner";
import SearchCommand from "@/components/search-command";
import {Authenticated, AuthLoading, Unauthenticated} from "convex/react";
import MarketingPage from "@/app/(marketing)/page";

export default function MainLayout({
                                       children
                                   }: {
    children: ReactNode
}) {
    return (
        <>
            <AuthLoading>
                <div className="h-full w-full flex items-center justify-center">
                    <Spinner size="lg"/>
                </div>
            </AuthLoading>
            <Unauthenticated>
                <MarketingPage/>
            </Unauthenticated>
            <Authenticated>

                <div className="flex h-full dark:bg-[#1F1F1F]">
                    <Navigation/>
                    <main className="h-full flex-1 overflow-y-auto">
                        <SearchCommand/>
                        {children}
                    </main>
                </div>
            </Authenticated>
            <Toaster/>
        </>
    )
}
