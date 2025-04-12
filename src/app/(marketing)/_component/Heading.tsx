"use client"

import Image from "next/image";
import {Button} from "@/components/ui/button";
import ThemeSwitcher from "@/components/theme-switcher";
import Spinner from "@/components/spinner";
import {authClient} from "@/lib/auth-client";
import {useRouter} from "next/navigation";
import {useAuth} from "@/hooks/use-auth";
import UserButton from "@/components/user-button";

export default function Heading() {
    const router = useRouter()
    const {login} = useAuth()

    const {
        data: session,
        isPending,
    } = authClient.useSession()

    const handleLogin = async () => {
        const response = await login()
        if (response?.data?.url) {
            router.push(response.data.url)
        }
    }

    const renderUserButton = () => {
        if (isPending) {
            return <Spinner/>
        }

        if (!session?.user && !isPending) {
            return (
                <>
                    <Button variant="ghost" onClick={handleLogin}>Login</Button>
                    <Button onClick={handleLogin}>Register Now</Button>
                </>
            )
        }

        return (
            <>
                <Button variant="secondary" onClick={() => router.push("/documents")}>Enter Al Qalam</Button>
                <UserButton session={session}/>
            </>
        )
    }

    return (
        <div className="w-full flex items-center justify-between font-[family-name:var(--font-geist-mono)]">
            <div className="flex items-center gap-2">
                <a
                    href="#"
                >
                    <Image
                        src="/pen.png"
                        alt="pen"
                        width={25}
                        height={25}
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
