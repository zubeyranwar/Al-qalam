"use client"

import Image from "next/image";
import {Button} from "@/components/ui/button";
import ThemeSwitcher from "@/components/theme-switcher";
import Spinner from "@/components/spinner";
import {useRouter} from "next/navigation";
import {useAuth} from "@/hooks/use-auth";
import UserButton from "@/components/user-button";
import {Authenticated, AuthLoading, Unauthenticated} from "convex/react";

export default function Heading() {
    const router = useRouter()
    const {login, session} = useAuth()

    const handleLogin = async () => {
        const response = await login()
        if (response?.data?.url) {
            router.push(response.data.url)
        }
    }

    const renderUserButton = () => {
        return (
            <>
                <AuthLoading>
                    <Spinner/>
                </AuthLoading>
                <Unauthenticated>
                    <Button variant="ghost" onClick={handleLogin}>Login</Button>
                    <Button variant="primary" onClick={handleLogin}>Register Now</Button>
                </Unauthenticated>
                <Authenticated>
                    <Button variant="primary" onClick={() => router.push("/documents")}>Enter Al Qalam</Button>
                    <UserButton session={session}/>
                </Authenticated>
            </>
        )
    }

    return (
        <div className="w-full flex items-center justify-between font-[family-name:var(--font-geist-mono)] z-30">
            <div className="flex items-center gap-2">
                <a
                    href="#"
                >

                    <Image
                        src="/pen-new.png"
                        alt="pen"
                        width={40}
                        height={40}
                        className="object-cover"
                    />
                </a>

                <h2 className="text-xl font-semibold">Al Qalam</h2>
            </div>

            <div className="flex items-center gap-2">
                <div className="flex items-center gap-2">
                    {renderUserButton()}
                </div>
                <ThemeSwitcher/>
            </div>
        </div>
    )
}
