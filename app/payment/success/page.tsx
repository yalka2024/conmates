"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Download, ArrowRight, FileText, Shield } from "lucide-react"
import Link from "next/link"
import { useLanguage } from "@/components/language-provider"

export default function PaymentSuccessPage() {
  const { t } = useLanguage()
  const searchParams = useSearchParams()
  const sessionId = searchParams.get("session_id")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading time for better UX
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Processing your payment...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          {/* Success Header */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {t('payment.success.title')}
            </h1>
            <p className="text-lg text-gray-600">
              {t('payment.success.description')}
            </p>
          </div>

          {/* Order Details */}
          <Card className="shadow-lg mb-8">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="w-5 h-5 text-blue-600" />
                <span>{t('payment.success.orderDetails')}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">{t('payment.success.product')}</span>
                  <span className="font-medium">Conmates - Lease Analysis</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">{t('payment.success.amount')}</span>
                  <span className="font-medium">$9.99</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">{t('payment.success.status')}</span>
                  <Badge className="bg-green-100 text-green-800">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    {t('payment.success.paid')}
                  </Badge>
                </div>
                {sessionId && (
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">{t('payment.success.transactionId')}</span>
                    <span className="font-mono text-sm text-gray-500">{sessionId}</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Next Steps */}
          <Card className="shadow-lg mb-8">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <ArrowRight className="w-5 h-5 text-blue-600" />
                <span>{t('payment.success.nextSteps')}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-blue-600 font-bold text-sm">1</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{t('payment.success.step1.title')}</h4>
                    <p className="text-sm text-gray-600 mt-1">{t('payment.success.step1.description')}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-blue-600 font-bold text-sm">2</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{t('payment.success.step2.title')}</h4>
                    <p className="text-sm text-gray-600 mt-1">{t('payment.success.step2.description')}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-blue-600 font-bold text-sm">3</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{t('payment.success.step3.title')}</h4>
                    <p className="text-sm text-gray-600 mt-1">{t('payment.success.step3.description')}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/upload" className="flex-1">
              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3">
                <FileText className="w-5 h-5 mr-2" />
                {t('payment.success.uploadLease')}
              </Button>
            </Link>
            <Link href="/dashboard" className="flex-1">
              <Button variant="outline" className="w-full py-3">
                <ArrowRight className="w-5 h-5 mr-2" />
                {t('payment.success.goToDashboard')}
              </Button>
            </Link>
          </div>

          {/* Security Notice */}
          <div className="mt-8 p-4 bg-blue-50 rounded-lg">
            <div className="flex items-start space-x-3">
              <Shield className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-medium text-blue-900">{t('payment.success.securityTitle')}</h4>
                <p className="text-sm text-blue-800 mt-1">
                  {t('payment.success.securityDescription')}
                </p>
              </div>
            </div>
          </div>

          {/* Support */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600 mb-2">
              {t('payment.success.needHelp')}
            </p>
            <Link href="/support">
              <Button variant="link" className="text-blue-600 hover:text-blue-700">
                {t('payment.success.contactSupport')}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
} 