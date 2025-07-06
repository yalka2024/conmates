import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { LanguageProvider } from "@/components/language-provider"
import { StateProvider } from "@/components/state-provider"
import { Toaster } from "@/components/ui/toaster"
import Script from "next/script"

const inter = Inter({ subsets: ["latin"] })
import "./globals.css"
import ErrorBoundary from "@/components/error-boundary"

export const metadata: Metadata = {
  title: "ConMates - AI-Powered Lease Analysis",
  description: "Get instant AI-powered analysis of your lease agreements. Identify risks, opportunities, and legal insights with ConMates.",
  keywords: "lease analysis, rental agreement, legal AI, tenant rights, lease review",
  authors: [{ name: "ConMates Team" }],
  creator: "ConMates",
  publisher: "ConMates",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://conmates.com"),
  openGraph: {
    title: "ConMates - AI-Powered Lease Analysis",
    description: "Get instant AI-powered analysis of your lease agreements. Identify risks, opportunities, and legal insights.",
    url: "https://conmates.com",
    siteName: "ConMates",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "ConMates - AI-Powered Lease Analysis",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ConMates - AI-Powered Lease Analysis",
    description: "Get instant AI-powered analysis of your lease agreements.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#3b82f6" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={inter.className}>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'GA_MEASUREMENT_ID');
          `}
        </Script>
        <ErrorBoundary>
          <LanguageProvider>
            <StateProvider>
              {children}
              <Toaster />
            </StateProvider>
          </LanguageProvider>
        </ErrorBoundary>
      </body>
    </html>
  )
}
