import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ThemeRegistry from "@/app/ThemeRegistry";
import Providers from "./providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AI-Based Chatbot for Mental Health",
  description: "AI-powered chat (GPT integration), Emergency contact suggestions",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`} style={{ backgroundColor: '#f5f5f5' }}>
        <Providers>
          <ThemeRegistry>{children}</ThemeRegistry>
        </Providers>
      </body>
    </html>
  );
}
