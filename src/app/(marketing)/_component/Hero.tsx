"use client"

import Spinner from "@/components/spinner";
import {Button} from "@/components/ui/button";
import Image from "next/image";
import {useRouter} from "next/navigation";
import {useAuth} from "@/hooks/use-auth";
import {Authenticated, AuthLoading, Unauthenticated} from "convex/react";
import {MotionDiv} from "@/components/motion";

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
                    <Spinner/>
                </AuthLoading>
                <Unauthenticated>
                    <Button variant="primary" size="lg"
                            className="w-full font-semibold"
                            onClick={handleLogin}>
                        Get started
                    </Button>
                </Unauthenticated>
                <Authenticated>
                    <Button variant="primary" size="lg"
                            className="w-full font-semibold" onClick={() => router.push("/documents")}>Enter Al
                        Qalam</Button>
                </Authenticated>
            </>
        )
    }

    return (
        <MotionDiv
            initial={{y: '10%', scale: 0.95, opacity: 0}}
            whileInView={{y: '0%', scale: 1, opacity: 1}}
            transition={{duration: 0.4}}
            viewport={{once: true}}
            className="z-[9999]"
        >
            <div className="mt-36 mb-40 flex-1 flex flex-col justify-center items-center">
                <h1 className="text-5xl text-center font-bold">Your Ideas, Documents, &<br/> Plans. Unified. Welcome
                    to<br/>
                    Al Qalam</h1>
                <p className="mt-4 text-base text-muted-foreground text-center">Al Qalam is the connected workspace
                    where<br/>
                    better, faster work happens</p>
                <div className="my-8 max-w-60 w-full flex justify-center">
                    {renderEnterToDocumentButton()}
                </div>

                <div className="flex items-center gap-4">
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
        </MotionDiv>
    )
}
