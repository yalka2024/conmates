"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Shield, CreditCard, Loader2 } from "lucide-react"
import { useLanguage } from "@/components/language-provider"

export default function PaymentPage() {
  const { t } = useLanguage()
  const [formData, setFormData] = useState({
    email: "",
    name: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      // Create Stripe Checkout Session
      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          name: formData.name,
        }),
      })

      const { sessionId, error } = await response.json()

      if (error) {
        throw new Error(error)
      }

      // Redirect to Stripe Checkout
      const stripe = await import("@stripe/stripe-js")
      const stripeInstance = await stripe.loadStripe(
        process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
      )

      if (stripeInstance) {
        const { error } = await stripeInstance.redirectToCheckout({
          sessionId,
        })

        if (error) {
          throw new Error(error.message)
        }
      }
    } catch (err) {
      console.error("Payment error:", err)
      setError(err instanceof Error ? err.message : "Payment failed. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {t('payment.completeYourPurchase')}
            </h1>
            <p className="text-lg text-gray-600">
              {t('payment.securePayment')} Get instant access to your lease analysis.
            </p>
          </div>

          {/* Payment Card */}
          <Card className="shadow-lg">
            <CardHeader className="text-center">
              <CardTitle className="flex items-center justify-center space-x-2">
                <CreditCard className="w-6 h-6 text-blue-600" />
                <span>{t('payment.leaseAnalysis')}</span>
              </CardTitle>
              <div className="flex items-center justify-center space-x-4 mt-4">
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  <CheckCircle className="w-4 h-4 mr-1" />
                  {t('payment.instantAccess')}
                </Badge>
                <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                  <Shield className="w-4 h-4 mr-1" />
                  {t('payment.securePayment')}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              {/* Price Display */}
              <div className="text-center mb-6">
                <div className="text-4xl font-bold text-gray-900">$9.99</div>
                <p className="text-gray-600 mt-2">{t('payment.oneTimePayment')}</p>
              </div>

              {/* What's Included */}
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <h3 className="font-semibold text-gray-900 mb-3">{t('payment.whatsIncluded')}:</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                    {t('payment.aiAnalysis')}
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                    {t('payment.clauseBreakdown')}
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                    {t('payment.redFlagDetection')}
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                    {t('payment.pdfReport')}
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                    {t('payment.communityAccess')}
                  </li>
                </ul>
              </div>

              {/* Payment Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="email">{t('payment.emailAddress')}</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder={t('payment.enterEmail')}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="name">{t('payment.fullName')}</Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder={t('payment.enterName')}
                    className="mt-1"
                  />
                </div>

                {error && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-700 text-sm">{error}</p>
                  </div>
                )}

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3"
                >
                  {isLoading ? (
                    <div className="flex items-center space-x-2">
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>{t('payment.processing')}</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <CreditCard className="w-5 h-5" />
                      <span>{t('payment.payNow')} $9.99</span>
                    </div>
                  )}
                </Button>
              </form>

              {/* Security Notice */}
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <div className="flex items-start space-x-3">
                  <Shield className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-blue-900">{t('payment.securePayment')}</h4>
                    <p className="text-sm text-blue-800 mt-1">
                      {t('payment.stripeSecurity')} Your payment is secure, and we never store your financial data. All transactions are processed through Stripe&apos;s secure servers.
                    </p>
                  </div>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="mt-6 flex items-center justify-center space-x-4 text-xs text-gray-500">
                <div className="flex items-center space-x-1">
                  <Shield className="w-4 h-4" />
                  <span>SSL Encrypted</span>
                </div>
                <div className="flex items-center space-x-1">
                  <CreditCard className="w-4 h-4" />
                  <span>Powered by Stripe</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Money Back Guarantee */}
          <div className="mt-8 text-center">
            <div className="inline-flex items-center space-x-2 bg-green-50 px-4 py-2 rounded-full">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span className="text-green-800 font-medium">{t('payment.moneyBackGuarantee')}</span>
            </div>
            <p className="text-sm text-gray-600 mt-2">
              {t('payment.guaranteeDescription')}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
