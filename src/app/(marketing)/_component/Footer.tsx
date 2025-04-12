import Image from "next/image";

export default function Footer() {
    return (
        <div className="w-full flex justify-between items-center pt-12 pb-4 font-[family-name:var(--font-geist-mono)]">
            <div className="flex items-center gap-2">
                <a
                    href="#"
                >
                    <Image
                        src="/pen.png"
                        alt="pen"
                        width={20}
                        height={20}
                        className="object-cover"
                    />
                </a>

                <h2 className="text-base font-semibold">Al Qalam</h2>
            </div>

            <div>
                <ul className="flex gap-6 text-sm">
                    <a><li>Privacy Policy</li></a>
                    <a><li>Terms & Conditions</li></a>
                </ul>
            </div>
        </div>
    )
}
