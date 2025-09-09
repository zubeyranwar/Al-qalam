import type {Metadata} from "next";
import "./globals.css";
import {ThemeProvider} from "@/components/providers/theme-provider";
import ConvexProviderClient from "@/components/providers/convex-provider";
import {ModalProvider} from "@/components/providers/modal-provider";
import {EdgeStoreProvider} from "@/lib/edgestore";
import {Toaster} from "sonner";
import {Inter} from "next/font/google";


const inter = Inter({
    variable: "--font-inter",
    subsets: ["latin"],
    weight: ["100", "400"]
})

export const metadata: Metadata = {
    title: "Al Qalam",
    description: "Best notion alternative",
    icons: {
        icon: {
            media: "(prefers-color-scheme: dark)",
            href: "/pen-new.png",
            url: "/pen-new.png",
        }
    }
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
        <body
            className={`${inter.className} antialiased bg-[#eee9db] dark:bg-[#222]`}
        >
        <ConvexProviderClient>
            <EdgeStoreProvider>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <ModalProvider/>
                    <Toaster/>
                    {children}
                </ThemeProvider>
            </EdgeStoreProvider>
        </ConvexProviderClient>
        </body>
        </html>
    );
}
