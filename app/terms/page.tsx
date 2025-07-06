"use client"

import { useLanguage } from "@/components/language-provider"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function TermsPage() {
  const { t } = useLanguage()

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Link href="/">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-center">
              {t("termsOfService")}
            </CardTitle>
          </CardHeader>
          <CardContent className="prose max-w-none">
            <div className="space-y-6">
              <section>
                <h2 className="text-xl font-semibold mb-3">Acceptance of Terms</h2>
                <p>
                  By accessing and using ConMates, you accept and agree to be bound by the terms 
                  and provision of this agreement. If you do not agree to abide by the above, 
                  please do not use this service.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3">Service Description</h2>
                <p>
                  ConMates provides AI-powered lease document analysis and legal insights. 
                  Our service is designed to help users understand their lease agreements 
                  and identify potential issues or opportunities.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3">Legal Disclaimer</h2>
                <p>
                  The information provided by ConMates is for educational and informational 
                  purposes only and does not constitute legal advice. You should consult 
                  with a qualified attorney for specific legal matters.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3">User Responsibilities</h2>
                <p>
                  You are responsible for ensuring that any documents you upload do not 
                  violate any laws or third-party rights. You must not use our service 
                  for any unlawful purposes or in any way that could damage our service.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3">Limitation of Liability</h2>
                <p>
                  ConMates shall not be liable for any indirect, incidental, special, 
                  consequential, or punitive damages, including without limitation, 
                  loss of profits, data, use, goodwill, or other intangible losses.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3">Termination</h2>
                <p>
                  We may terminate or suspend your account and bar access to the service 
                  immediately, without prior notice or liability, under our sole discretion, 
                  for any reason whatsoever.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3">Changes to Terms</h2>
                <p>
                  We reserve the right to modify or replace these Terms at any time. 
                  If a revision is material, we will provide at least 30 days notice 
                  prior to any new terms taking effect.
                </p>
              </section>

              <section>
                <p className="text-sm text-gray-600">
                  Last updated: {new Date().toLocaleDateString()}
                </p>
              </section>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
