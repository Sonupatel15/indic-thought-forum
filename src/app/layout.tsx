import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { site } from "@/lib/site";

const manrope = localFont({
  src: "../../node_modules/@fontsource-variable/manrope/files/manrope-latin-wght-normal.woff2",
  weight: "200 800",
  display: "swap",
  variable: "--font-manrope",
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: "Indic Thought Forum | Awakening Bharat. Inspiring the Future.", template: "%s | Indic Thought Forum" },
  description: site.description,
  applicationName: site.name,
  alternates: { canonical: "/" },
  icons: { icon: "/images/logo-mark.png", apple: "/images/logo-mark.png" },
  openGraph: {
    type: "website", locale: "en_IN", siteName: site.name, title: site.name,
    description: site.description, url: "/",
    images: [{ url: "/images/heritage-hero.webp", width: 1536, height: 1024, alt: "An artistic panorama celebrating Bharateeya heritage" }],
  },
  twitter: { card: "summary_large_image", title: site.name, description: site.description, images: ["/images/heritage-hero.webp"] },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#f7f5ef" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body id="top" className={manrope.variable}><a className="skip-link" href="#main-content">Skip to content</a><Header /><main id="main-content" tabIndex={-1}>{children}</main><Footer /></body></html>;
}
