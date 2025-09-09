import Heading from "@/app/(marketing)/_component/Heading";
import Footer from "@/app/(marketing)/_component/Footer";

export default function LandingLayout({children}: { children: React.ReactNode }) {
    return (
        <div>
            <svg
                className="fixed w-full h-full"
                xmlns="http://www.w3.org/2000/svg"
            >
                <filter id="grainy">
                    <feTurbulence type="turbulence" baseFrequency="0.65"/>
                </filter>
            </svg>
            <div className="container overflow-hidden w-full  mx-auto flex flex-grow flex-col px-2 pt-6">
                <Heading/>
                <main className="flex flex-1 flex-col">{children}</main>
                <Footer/>
            </div>
        </div>
    )
}