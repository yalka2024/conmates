import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { LanguageProvider } from "@/components/language-provider" // Import LanguageProvider
import { StateProvider } from "@/components/state-provider"

const inter = Inter({ subsets: ["latin"] })
import "./globals.css"
import ErrorBoundary from "@/components/error-boundary"

export const metadata: Metadata = {
  title: "v0 App",
  description: "Created with v0",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ErrorBoundary>
          <LanguageProvider>
            <StateProvider>{children}</StateProvider>
          </LanguageProvider>
        </ErrorBoundary>
      </body>
    </html>
  )
}
