import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Noto_Sans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { env } from "@/env";
import { defaultLocale } from "@/i18n/config";
import Template from "./template";
import { ThemeProvider } from "@/providers/theme-provider";

const geistHeading = Geist({ subsets: ["latin"], variable: "--font-heading" });
const notoSans = Noto_Sans({ subsets: ["latin"], variable: "--font-sans" });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const appUrl = env.NEXT_PUBLIC_BASE_URL ?? "https://erp-pos.com";

export const metadata: Metadata = {
  metadataBase: new URL(appUrl),
  title: {
    template: `%s | ${env.NEXT_PUBLIC_TITLE}`,
    default: `${env.NEXT_PUBLIC_TITLE ? env.NEXT_PUBLIC_TITLE : "ERP-POS"}`,
  },
  description: `${env.NEXT_PUBLIC_DESCRIPTION}`,
  openGraph: {
    title: `${env.NEXT_PUBLIC_TITLE ? env.NEXT_PUBLIC_TITLE : "ERP-POS"}`,
    description: `${env.NEXT_PUBLIC_DESCRIPTION}`,
    images: [`${env.NEXT_PUBLIC_APP_IMAGO}`],
    type: "website",
    locale: "es",
    siteName: `${env.NEXT_PUBLIC_TITLE ? env.NEXT_PUBLIC_TITLE : "ERP-POS"}`,
  },
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#09090b" },
  ],
};
export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang={defaultLocale}
      suppressHydrationWarning
      className={cn(
        "h-full",
        "antialiased",
        geistSans.variable,
        geistMono.variable,
        "font-sans",
        notoSans.variable,
        geistHeading.variable,
      )}
    >
      <body className="antialiased" cz-shortcut-listen="true">
        <Template>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </Template>
      </body>
    </html>
  );
}
