import Navbar from "@/app/(marketing)/_component/Navbar";
import Footer from "@/app/(marketing)/_component/Footer";
import {Button} from "@/components/ui/button";
import {ArrowRightIcon} from "lucide-react";
import Image from "next/image";

export default function Home() {
    return (
        <div className="h-full flex flex-col items-center pt-6 px-8 overflow-x-hidden">
            <Navbar/>
            <div className="mt-10 flex-1 flex flex-col justify-center items-center">
                <h1 className="text-5xl text-center font-bold">Your Ideas, Documents, &<br/> Plans. Unified. Welcome to
                    Al Qalam</h1>
                <p className="mt-2 text-base text-center">Al Qalam is the connected workspace where<br/>
                    better, faster work happens</p>
                <Button className="mt-4">
                    Register Now
                    <ArrowRightIcon className="mr-2"/>
                </Button>
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
            <Footer/>
        </div>
    );
}
