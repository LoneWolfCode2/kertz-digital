import type { Metadata } from "next";
import { Archivo, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@/components/analytics";
import { JsonLd } from "@/components/json-ld";
import { MobileActionBar } from "@/components/layout/mobile-action-bar";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { MotionProvider } from "@/components/motion/motion-provider";
import { ThemeProvider } from "@/components/theme-provider";
import { site } from "@/content/site";
import { allowIndexing, siteUrl } from "@/lib/env";
import { organizationSchema, websiteSchema } from "@/lib/schema";

const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"], // unlocks the width axis for font-stretch
  variable: "--font-body",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-code",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    template: `%s | ${site.name}`,
    default: site.name,
  },
  description: site.description,
  applicationName: site.name,
  // Google Search Console: set NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION to the
  // content value of the HTML-tag verification method.
  ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION && {
    verification: { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION },
  }),
  // Off until NEXT_PUBLIC_ALLOW_INDEXING=true (see src/lib/env.ts).
  ...(!allowIndexing && { robots: { index: false, follow: false } }),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${archivo.variable} ${plexMono.variable}`}
    >
      <body className="font-sans antialiased">
        <JsonLd data={[organizationSchema(), websiteSchema()]} />
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          <MotionProvider>
            <SiteHeader />
            {children}
            <SiteFooter />
            <MobileActionBar />
          </MotionProvider>
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
