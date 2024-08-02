import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ApiProvider } from "./context";
import Notification from "./components/toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "MinuLink",
    description: "Generated by create next app",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <ApiProvider>

                <Notification />

                <body className={inter.className}>{children}</body>
            </ApiProvider>


        </html>
    );
}
