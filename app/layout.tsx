import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { LanguageProvider } from "@/components/language-provider"
import { StateProvider } from "@/components/state-provider"
import { Toaster } from "@/components/ui/toaster"
import Script from "next/script"
import { ThemeProvider } from "@/components/theme-provider"
import { CookieConsent } from "@/components/cookie-consent"
import { ErrorBoundary } from "@/components/error-boundary"
import MobileNavigation from "@/components/mobile-navigation"
import { LanguageSelector } from "@/components/language-selector"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FileText, Upload, BookOpen, Scale, FileCheck, GraduationCap, CreditCard, HelpCircle, Shield, BarChart3, Play, Target, Mail, DollarSign, TrendingUp, Users, Zap, Crown } from "lucide-react"
import Link from "next/link"

const inter = Inter({ subsets: ["latin"] })
import "./globals.css"

export const metadata: Metadata = {
  title: "Conmates - AI-Powered Lease Analysis & Tenant Resources",
  description: "Understand your lease with AI analysis, access tenant rights, and get legal resources. Upload your lease for instant insights and recommendations.",
  keywords: "lease analysis, tenant rights, AI lease review, rental agreement, tenant resources, legal aid",
  authors: [{ name: "Conmates" }],
  creator: "ConMates",
  publisher: "ConMates",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://conmates.com"),
  openGraph: {
    title: "Conmates - AI-Powered Lease Analysis",
    description: "Upload your lease for instant AI analysis and tenant rights information",
    url: "https://conmates.com",
    siteName: "ConMates",
    images: [
      {
        url: "/placeholder-logo.png",
        width: 1200,
        height: 630,
        alt: "Conmates - AI-Powered Lease Analysis",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Conmates - AI-Powered Lease Analysis",
    description: "Upload your lease for instant AI analysis and tenant rights information",
    images: ["/placeholder-logo.png"],
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
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/placeholder-logo.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#3b82f6" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* Google Analytics temporarily disabled to fix preload warning */}
        {/* 
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-XXXXXXXXXX', {
                page_title: document.title,
                page_location: window.location.href,
              });
            `,
          }}
        />
        */}
      </head>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ErrorBoundary>
            <LanguageProvider>
              <StateProvider>
                {/* Header */}
                <header className="border-b border-blue-100">
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                      {/* Logo */}
                      <Link href="/" className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                          <Shield className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-xl font-semibold text-gray-900">Conmates</span>
                      </Link>

                      {/* Desktop Navigation */}
                      <nav className="hidden md:flex items-center space-x-8">
                        <Link href="/upload" className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition-colors">
                          <Upload className="w-4 h-4" />
                          <span>Analyze Lease</span>
                        </Link>
                        <Link href="/resources" className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition-colors">
                          <FileText className="w-4 h-4" />
                          <span>Resources</span>
                        </Link>
                        <Link href="/courses" className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition-colors">
                          <GraduationCap className="w-4 h-4" />
                          <span>Courses</span>
                        </Link>
                        <Link href="/support" className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition-colors">
                          <HelpCircle className="w-4 h-4" />
                          <span>Support</span>
                        </Link>
                      </nav>

                      {/* Right side */}
                      <div className="flex items-center space-x-4">
                        <Button asChild variant="outline" size="sm">
                          <Link href="/upload">
                            Start Free Analysis
                          </Link>
                        </Button>
                        <Button asChild size="sm">
                          <Link href="/courses">
                            <Crown className="w-4 h-4 mr-2" />
                            Premium Courses
                          </Link>
                        </Button>
                        <LanguageSelector />
                        <MobileNavigation />
                      </div>
                    </div>
                  </div>
                </header>

                {children}
                <Toaster />
                <CookieConsent />
              </StateProvider>
            </LanguageProvider>
          </ErrorBoundary>
        </ThemeProvider>
      </body>
    </html>
  )
}
