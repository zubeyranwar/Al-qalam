"use client"

import Spinner from "@/components/spinner";
import {Button} from "@/components/ui/button";
import {ArrowRightIcon} from "lucide-react";
import Image from "next/image";
import {useRouter} from "next/navigation";
import {useAuth} from "@/hooks/use-auth";
import {Authenticated, AuthLoading, Unauthenticated} from "convex/react";

export default function Hero() {
    const router = useRouter()
    const {login} = useAuth()

    const handleLogin = async () => {
        const response = await login()
        if (response?.data?.url) {
            router.push(response.data.url)
        }
    }

    const renderEnterToDocumentButton = () => {
        return (
            <>
                <AuthLoading>
                    <Button>
                        <Spinner/>
                    </Button>
                </AuthLoading>
                <Unauthenticated>
                    <Button onClick={handleLogin}>
                        Register Now
                        <ArrowRightIcon className="mr-2"/>
                    </Button>
                </Unauthenticated>
                <Authenticated>
                    <Button onClick={() => router.push("/documents")}>Enter Al Qalam</Button>
                </Authenticated>
            </>
        )
    }

    return (
        <div className="mt-10 flex-1 flex flex-col justify-center items-center">
            <h1 className="text-5xl text-center font-bold">Your Ideas, Documents, &<br/> Plans. Unified. Welcome
                to<br/>
                Al Qalam</h1>
            <p className="mt-2 text-base text-center">Al Qalam is the connected workspace where<br/>
                better, faster work happens</p>
            <div className="mt-4">
                {renderEnterToDocumentButton()}
            </div>

            <div className="mt-6 flex items-center gap-4">
                <Image
                    src="/documents.png"
                    alt="A man trying catch the papers"
                    width={400}
                    height={400}
                    className="dark:hidden"
                />

                <Image
                    src="/documents-dark.png"
                    alt="A man trying catch the papers"
                    width={400}
                    height={400}
                    className="hidden dark:block"
                />

                <Image
                    src="/reading.png"
                    alt="A woman chill sitting on chair"
                    width={400}
                    height={400}
                    className="dark:hidden"
                />

                <Image
                    src="/reading-dark.png"
                    alt="A woman chill sitting on chair"
                    width={400}
                    height={400}
                    className="hidden dark:block"
                />
            </div>
        </div>
    )
}
