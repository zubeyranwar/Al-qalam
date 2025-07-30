"use client";
import Heading from "@/app/(marketing)/_component/Heading";
import Footer from "@/app/(marketing)/_component/Footer";
import Hero from "@/app/(marketing)/_component/Hero";

export default function MarketingPage() {
    return (
        <div className="h-full flex flex-col items-center pt-6 px-8 overflow-x-hidden">
            <Heading/>
            <Hero/>
            <Footer/>
        </div>
    );
}
