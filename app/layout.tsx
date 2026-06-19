import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/NavBar";
import { AuthProvider } from "@/app/lib/auth-context";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Money Co-Pilot \u2014 AI Financial Assistant | SBI Hackathon 2026",
  description:
    "The first AI financial assistant that works FOR you \u2014 not ON you. Built for SBI Hackathon @ GFF 2026.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="min-h-screen bg-[#0A0F1E] text-[#F0F4FF] antialiased">
        <AuthProvider>
          <NavBar />
          <main className="pt-16 min-h-[calc(100vh-4rem)]">{children}</main>
          <footer className="border-t border-[rgba(255,255,255,0.06)] py-8 text-center">
            <p className="text-[#8892A4] text-sm">
              Built for SBI Hackathon @ GFF 2026
            </p>
          </footer>
        </AuthProvider>
      </body>
    </html>
  );
}
