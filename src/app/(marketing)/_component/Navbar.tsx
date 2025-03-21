import Image from "next/image";
import {Button} from "@/components/ui/button";
import ThemeSwitcher from "@/app/(marketing)/_component/ThemeSwitcher";

export default function Navbar() {
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
                <Button variant="ghost">Login</Button>
                <Button>Register Now</Button>
                <ThemeSwitcher />
            </div>
        </div>
    )
}
