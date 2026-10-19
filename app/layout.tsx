import type { Metadata } from "next";
import { Archivo, JetBrains_Mono } from "next/font/google";
import { Header } from "@/components/nav";
import { Spotlight } from "@/components/spotlight";
import { Footer } from "@/components/ui";
import { BRAND } from "@/lib/brand";
import "./globals.css";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  axes: ["wdth"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: `${BRAND.name} · ${BRAND.tagline}`,
  description:
    "Self-hosted AI tools for content, competitor research, sentiment, ads and SEO. Pay once, run on your servers, use any model.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${archivo.variable} ${jetbrains.variable} antialiased`}>
      <body className="font-sans">
        <Header />
        {children}
        <Footer />
        <Spotlight />
      </body>
    </html>
  );
}
