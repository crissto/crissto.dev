import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { PostHogPageView } from "@/components/PostHogPageView";
import "@/styles/tailwind.css";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "focus-visible";
import type { Metadata, Viewport } from "next";
import { ViewTransitions } from "next-view-transitions";
import { Inter } from "next/font/google";
import Script from "next/script";
import { Suspense } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Christian Stoyanov | Software Developer & Product Builder",
  description:
    "Experienced software developer and product builder specializing in web technologies. Explore my projects, articles, and insights on software development and product management.",
  keywords: [
    "software developer",
    "product builder",
    "web development",
    "JavaScript",
    "React",
    "Node.js",
  ],
  authors: [{ name: "Christian Stoyanov", url: "https://crissto.dev" }],
  openGraph: {
    title: "Christian Stoyanov | Software Developer & Product Builder",
    description:
      "Experienced software developer and product builder specializing in web technologies. Explore my projects, articles, and insights on software development and product management.",
    url: "https://crissto.dev",
    siteName: "Christian Stoyanov's Portfolio",
    images: [
      {
        url: "https://crissto.dev/me.png",
        width: 1200,
        height: 630,
        alt: "Christian Stoyanov",
      },
    ],
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    site: "@crissto39",
    creator: "@crissto39",
    title: "Christian Stoyanov | Software Developer & Product Builder",
    description:
      "Experienced software developer and product builder specializing in web technologies. Explore my projects, articles, and insights on software development and product management.",
    images: ["https://crissto.dev/me.png"],
  },
  alternates: {
    types: {
      "application/rss+xml": `${process.env.NEXT_PUBLIC_SITE_URL}/rss/feed.xml`,
      "application/feed+json": `${process.env.NEXT_PUBLIC_SITE_URL}/rss/feed.json`,
    },
  },
  robots: "index, follow",
  metadataBase: new URL("https://crissto.dev"),
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: { children: React.ReactNode }) {
  return (
    <ViewTransitions>
      <html lang="en" className="h-full antialiased">
        <head>
          <Script src="/scripts/modeScript.js" strategy="beforeInteractive" />
        </head>
        <body
          className={`flex h-full flex-col bg-zinc-50 dark:bg-black ${inter.className}`}
        >
          <Suspense fallback={null}>
            <PostHogPageView />
          </Suspense>
          <SpeedInsights />
          <div className="fixed inset-0 flex justify-center sm:px-8">
            <div className="flex w-full max-w-7xl lg:px-8">
              <div className="w-full bg-white ring-1 ring-zinc-100 dark:bg-zinc-900 dark:ring-zinc-300/20" />
            </div>
          </div>
          <div className="relative">
            <Header />
            <main>{children}</main>
            <Footer />
            <Analytics />
          </div>
        </body>
      </html>
    </ViewTransitions>
  );
}
