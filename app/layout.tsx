import type { Metadata } from "next";
import { Lexend } from "next/font/google";
import Header from "../components/layouts/Header";
import Footer from "@/components/layouts/Footer";
import AOSComonent from "@/components/animations/AOSComponent";
import "./globals.css";

const lexend = Lexend({
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "KrepDL",
    description: "Download Twitter media for free.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${lexend.className} min-h-screen antialiased w-screen`}
            >
                <Header />
                <AOSComonent>
                    <main className="bg-slate-200 min-h-screen">
                        {children}
                    </main>
                </AOSComonent>

                <Footer />
            </body>
        </html>
    );
}
