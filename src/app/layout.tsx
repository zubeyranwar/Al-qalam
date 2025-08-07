import type {Metadata} from "next";
import {Geist, Geist_Mono} from "next/font/google";
import "./globals.css";
import {ThemeProvider} from "@/components/providers/theme-provider";
import ConvexProviderClient from "@/components/providers/convex-provider";
import {ModalProvider} from "@/components/providers/modal-provider";
import {EdgeStoreProvider} from "@/lib/edgestore";
import {Toaster} from "sonner";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Al Qalam",
    description: "Best notion alternative",
    icons: {
        icon: {
            media: "(prefers-color-scheme: dark)",
            href: "/pen.png",
            url: "/pen.png",
        }
        //Add for dark (optional)
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
            className={`${geistSans.variable} ${geistMono.variable} antialiased`}
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
