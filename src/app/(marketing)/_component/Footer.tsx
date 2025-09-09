"use client"

import {ArrowDown, Asterisk} from 'lucide-react'
import {MotionDiv} from '@/components/motion'
import {AnimatedTitle} from '@/components/animated-title'
import {useAuth} from "@/hooks/use-auth";
import {useRouter} from "next/navigation";

function StartCTA() {
    return (
        <span className="group relative block size-20 rounded-full sm:size-28 sm:text-lg lg:size-32 cursor-pointer">
      <span className="absolute inset-0 animate-footer-pulse rounded-full bg-highlight group-hover:paused"/>
      <span
          className="absolute inset-0 flex items-center justify-center font-bold uppercase underline decoration-wavy underline-offset-2 transition-transform duration-300 ease-out group-hover:scale-125">
        start
      </span>
    </span>
    )
}

export default function Footer() {
    const router = useRouter()
    const {login} = useAuth()

    const handleLogin = async () => {
        const response = await login()
        if (response?.data?.url) {
            router.push(response.data.url)
        }
    }
    return (
        <footer className="space-y-4 px-1 pb-4">
            <MotionDiv
                initial={{y: '10%', scale: 0.95, opacity: 0}}
                whileInView={{y: '0%', scale: 1, opacity: 1}}
                transition={{duration: 0.4}}
                viewport={{once: true}}
                className="relative mx-auto flex h-80 flex-col justify-between overflow-hidden rounded-4xl bg-primary-depth/90 text-background dark:bg-card sm:h-96 lg:h-[26rem]"
            >
                <div
                    className="flex border-b-2 border-border/70 dark:border-card dark:bg-primary max-md:flex-col-reverse">
                    <div
                        className="group flex w-full flex-1 gap-12 overflow-hidden whitespace-nowrap border-border/70 py-2 text-lg capitalize max-md:border-t-2 sm:text-2xl md:border-r-2 md:py-4">
                        <p className="flex animate-footer-marquee items-center gap-12 group-hover:paused">
                            <span>capture your ideas, beautifully.</span>
                            <ArrowDown className="h-[1.5em] w-[1.5em]" aria-hidden="true" strokeWidth={2.25}/>
                            <span>organize, publish, and grow.</span>
                            <Asterisk className="h-[1.5em] w-[1.5em]" aria-hidden="true" strokeWidth={2.25}/>
                        </p>
                        <p
                            className="flex animate-footer-marquee items-center gap-12 group-hover:paused"
                            aria-hidden="true"
                        >
                            <span>capture your ideas, beautifully.</span>
                            <ArrowDown className="h-[1.5em] w-[1.5em]" aria-hidden="true" strokeWidth={2.25}/>
                            <span>organize, publish, and grow.</span>
                            <Asterisk className="h-[1.5em] w-[1.5em]" aria-hidden="true" strokeWidth={2.25}/>
                        </p>
                        <p
                            className="flex animate-footer-marquee items-center gap-12 group-hover:paused"
                            aria-hidden="true"
                        >
                            <span>capture your ideas, beautifully.</span>
                            <ArrowDown className="h-[1.5em] w-[1.5em]" aria-hidden="true" strokeWidth={2.25}/>
                            <span>organize, publish, and grow.</span>
                            <Asterisk className="h-[1.5em] w-[1.5em]" aria-hidden="true" strokeWidth={2.25}/>
                        </p>
                    </div>
                    <a
                        className="flex items-center justify-end px-4 py-2 text-center font-semibold uppercase opacity-70 before:content-['@_'] after:content-['_*'] hover:opacity-100 sm:px-12 md:py-4 lg:text-2xl"
                        href="https://github.com/zubeyranwar/Al-qalam"
                        target="_blank"
                    >
                        Github
                    </a>
                </div>
                <div className="flex-grow select-none overflow-hidden">
                    <AnimatedTitle
                        className="-bottom-38 left-54 md:absolute md:-bottom-1/10 md:left-0 md:translate-x-0">
                        <p className="pr-6 font-display text-[clamp(2rem,15vw,12rem)] -tracking-widest dark:text-card-foreground">
                            Al Qalam
                        </p>
                    </AnimatedTitle>
                </div>
                <div className="absolute right-1/4 top-1/3 md:right-1/8 md:top-[30%]">
                    <button className="rounded-full" onAuxClick={handleLogin}>
                        <StartCTA/>
                    </button>
                </div>
            </MotionDiv>
            <p className="text-center max-sm:text-sm">
                © 2024 — Al Qalam by{' '}
                <a
                    href="https://github.com/zubeyranwar"
                    target="_blank"
                    className="font-semibold decoration-dotted transition hover:underline"
                >
                    @zubeyranwar
                </a>{' '}
                +{' '}
                <a
                    href="https://www.youtube.com/@codewithantonio"
                    target="_blank"
                    className="font-semibold decoration-dotted transition hover:underline"
                >
                    @CodeWithAntonio
                </a>
                .
            </p>
            <p className="text-center text-2xl">{`{◕ ◡ ◕}`}</p>
        </footer>
    )
}