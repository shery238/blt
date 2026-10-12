import type { Metadata, Viewport } from "next";
import "@fontsource-variable/bricolage-grotesque";
import "@fontsource-variable/hanken-grotesk";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ScrollProgress } from "@/components/ScrollProgress";
import { ConsentAnalytics } from "@/components/ConsentAnalytics";
import { JsonLd } from "@/components/JsonLd";
import { MotionProvider } from "@/components/MotionProvider";
import { site } from "@/lib/site";
import { organizationJsonLd, websiteJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | AI, Data, Cloud and Healthcare Research Consultancy`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name, url: site.url }],
  keywords: [
    "AI consultancy UK", "healthcare innovation", "responsible AI", "AI governance",
    "data and analytics consultancy", "cloud engineering", "healthcare AI research",
    "MLOps", "LLMOps", "research and development", "neurodivergent research",
  ],
  formatDetection: { telephone: false },
  verification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION } : undefined,
  openGraph: { siteName: site.name, locale: site.locale, type: "website" },
};

export const viewport: Viewport = {
  themeColor: "#0A1626",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB">
      <body>
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80] focus:rounded-full focus:bg-white focus:px-5 focus:py-3 focus:text-ink">
          Skip to main content
        </a>
        <JsonLd data={[organizationJsonLd(), websiteJsonLd()]} />
        <MotionProvider>
          <ScrollProgress />
          <Header />
          <main id="main">{children}</main>
          <Footer />
        </MotionProvider>
        <ConsentAnalytics />
      </body>
    </html>
  );
}
