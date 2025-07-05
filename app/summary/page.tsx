"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import {
  FileText,
  ArrowLeft,
  ChevronDown,
  ChevronUp,
  Shield,
  AlertTriangle,
  Key,
  Crown,
  Check,
  Unlock,
} from "lucide-react"
import Link from "next/link"

export default function SummaryPage() {
  const [openSections, setOpenSections] = useState({
    keyTerms: true,
    rights: false,
    concerns: false,
  })
  const [analysis, setAnalysis] = useState<any | null>(null)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('leaseAnalysis')
      if (stored) {
        setAnalysis(JSON.parse(stored))
      }
    }
  }, [])

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <header className="border-b border-blue-100 bg-white">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/upload" className="flex items-center space-x-2">
              <ArrowLeft className="w-5 h-5 text-gray-600" />
              <span className="text-gray-600 hover:text-blue-600 transition-colors">Back to upload</span>
            </Link>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-white" />
              </div>
                              <span className="text-xl font-semibold text-gray-900">Conmates</span>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Page Header */}
            <div className="mb-8">
              <div className="flex items-center space-x-3 mb-4">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Lease Summary</h1>
                <Badge variant="secondary" className="bg-blue-100 text-blue-700 border-blue-200">
                  Preview
                </Badge>
              </div>
              <p className="text-lg text-gray-600">
                Here's what we found in your lease agreement. Upgrade to see the complete analysis with detailed
                explanations.
              </p>
            </div>

            {/* Summary Sections */}
            <div className="space-y-6">
              {/* Key Terms Section */}
              <Card className="relative overflow-hidden">
                <div className="absolute top-4 right-4 opacity-20 text-6xl font-bold text-gray-400 pointer-events-none select-none">
                  PREVIEW
                </div>
                <Collapsible open={openSections.keyTerms} onOpenChange={() => toggleSection("keyTerms")}>
                  <CollapsibleTrigger asChild>
                    <CardHeader className="cursor-pointer hover:bg-gray-50 transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                            <Key className="w-5 h-5 text-blue-600" />
                          </div>
                          <CardTitle className="text-xl">Key Terms</CardTitle>
                        </div>
                        {openSections.keyTerms ? (
                          <ChevronUp className="w-5 h-5 text-gray-500" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-gray-500" />
                        )}
                      </div>
                    </CardHeader>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <CardContent className="pt-0">
                      <div className="space-y-4">
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="p-4 bg-gray-50 rounded-lg">
                            <h4 className="font-semibold text-gray-900 mb-2">Monthly Rent</h4>
                            <p className="text-2xl font-bold text-blue-600">{analysis?.summary?.rent || '$2,400'}</p>
                            <p className="text-sm text-gray-600">Due on the 1st of each month</p>
                          </div>
                          <div className="p-4 bg-gray-50 rounded-lg">
                            <h4 className="font-semibold text-gray-900 mb-2">Security Deposit</h4>
                            <p className="text-2xl font-bold text-green-600">{analysis?.summary?.deposit || '$2,400'}</p>
                            <p className="text-sm text-gray-600">Refundable upon move-out</p>
                          </div>
                        </div>

                        <div className="space-y-3">
                          <div className="flex justify-between items-center py-2 border-b border-gray-200">
                            <span className="font-medium text-gray-900">Lease Term</span>
                            <span className="text-gray-600">{analysis?.summary?.term || '12 months (Jan 1, 2024 - Dec 31, 2024)'}</span>
                          </div>
                          <div className="flex justify-between items-center py-2 border-b border-gray-200">
                            <span className="font-medium text-gray-900">Late Fee</span>
                            <span className="text-gray-600">$75 after 5-day grace period</span>
                          </div>
                          <div className="flex justify-between items-center py-2">
                            <span className="font-medium text-gray-900">Pet Policy</span>
                            <span className="text-gray-600">No pets allowed</span>
                          </div>
                        </div>

                        {/* Preview Blur Overlay */}
                        <div className="relative">
                          <div className="blur-sm opacity-60">
                            <div className="flex justify-between items-center py-2 border-b border-gray-200">
                              <span className="font-medium text-gray-900">Utilities Included</span>
                              <span className="text-gray-600">Water, trash, sewer</span>
                            </div>
                            <div className="flex justify-between items-center py-2">
                              <span className="font-medium text-gray-900">Parking</span>
                              <span className="text-gray-600">1 assigned space included</span>
                            </div>
                          </div>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <Badge className="bg-blue-600 text-white">Upgrade to see more</Badge>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </CollapsibleContent>
                </Collapsible>
              </Card>

              {/* Key Clauses Section */}
              {analysis?.summary?.keyClauses && (
                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle className="text-lg">Key Clauses</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc pl-5 space-y-1">
                      {analysis.summary.keyClauses.map((clause: string, idx: number) => (
                        <li key={idx} className="text-gray-700">{clause}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}

              {/* Red Flags Section */}
              {analysis?.summary?.redFlags && (
                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle className="text-lg text-red-700">Red Flags</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc pl-5 space-y-1">
                      {analysis.summary.redFlags.map((flag: string, idx: number) => (
                        <li key={idx} className="text-red-700">{flag}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}

              {/* Recommendations Section */}
              {analysis?.summary?.recommendations && (
                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle className="text-lg text-green-700">Recommendations</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc pl-5 space-y-1">
                      {analysis.summary.recommendations.map((rec: string, idx: number) => (
                        <li key={idx} className="text-green-700">{rec}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}

              {/* Your Rights Section */}
              <Card className="relative overflow-hidden">
                <div className="absolute top-4 right-4 opacity-20 text-6xl font-bold text-gray-400 pointer-events-none select-none">
                  PREVIEW
                </div>
                <Collapsible open={openSections.rights} onOpenChange={() => toggleSection("rights")}>
                  <CollapsibleTrigger asChild>
                    <CardHeader className="cursor-pointer hover:bg-gray-50 transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                            <Shield className="w-5 h-5 text-green-600" />
                          </div>
                          <CardTitle className="text-xl">Your Rights</CardTitle>
                        </div>
                        {openSections.rights ? (
                          <ChevronUp className="w-5 h-5 text-gray-500" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-gray-500" />
                        )}
                      </div>
                    </CardHeader>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <CardContent className="pt-0">
                      <div className="space-y-4">
                        <div className="space-y-3">
                          <div className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg">
                            <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                            <div>
                              <h4 className="font-medium text-gray-900">Quiet Enjoyment</h4>
                              <p className="text-sm text-gray-600">
                                You have the right to peaceful use of your rental without interference from the
                                landlord.
                              </p>
                            </div>
                          </div>

                          <div className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg">
                            <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                            <div>
                              <h4 className="font-medium text-gray-900">24-Hour Notice</h4>
                              <p className="text-sm text-gray-600">
                                Landlord must give 24 hours written notice before entering your unit (except
                                emergencies).
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Preview Blur Overlay */}
                        <div className="relative">
                          <div className="blur-sm opacity-60 space-y-3">
                            <div className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg">
                              <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                              <div>
                                <h4 className="font-medium text-gray-900">Security Deposit Return</h4>
                                <p className="text-sm text-gray-600">
                                  You're entitled to your full deposit back if there's no damage beyond normal wear and
                                  tear.
                                </p>
                              </div>
                            </div>
                            <div className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg">
                              <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                              <div>
                                <h4 className="font-medium text-gray-900">Habitability</h4>
                                <p className="text-sm text-gray-600">
                                  Your landlord must maintain the property in livable condition with working utilities.
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <Badge className="bg-blue-600 text-white">Upgrade to see all rights</Badge>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </CollapsibleContent>
                </Collapsible>
              </Card>

              {/* Potential Concerns Section */}
              <Card className="relative overflow-hidden">
                <div className="absolute top-4 right-4 opacity-20 text-6xl font-bold text-gray-400 pointer-events-none select-none">
                  PREVIEW
                </div>
                <Collapsible open={openSections.concerns} onOpenChange={() => toggleSection("concerns")}>
                  <CollapsibleTrigger asChild>
                    <CardHeader className="cursor-pointer hover:bg-gray-50 transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                            <AlertTriangle className="w-5 h-5 text-amber-600" />
                          </div>
                          <CardTitle className="text-xl">Potential Concerns</CardTitle>
                        </div>
                        {openSections.concerns ? (
                          <ChevronUp className="w-5 h-5 text-gray-500" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-gray-500" />
                        )}
                      </div>
                    </CardHeader>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <CardContent className="pt-0">
                      <div className="space-y-4">
                        <div className="space-y-3">
                          <div className="flex items-start space-x-3 p-3 bg-amber-50 rounded-lg border border-amber-200">
                            <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                            <div>
                              <h4 className="font-medium text-gray-900">High Late Fee</h4>
                              <p className="text-sm text-gray-600">
                                The $75 late fee is relatively high. Make sure to pay rent on time to avoid this charge.
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Preview Blur Overlay */}
                        <div className="relative">
                          <div className="blur-sm opacity-60 space-y-3">
                            <div className="flex items-start space-x-3 p-3 bg-amber-50 rounded-lg border border-amber-200">
                              <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                              <div>
                                <h4 className="font-medium text-gray-900">Strict Pet Policy</h4>
                                <p className="text-sm text-gray-600">
                                  No pets are allowed, which could be problematic if your situation changes.
                                </p>
                              </div>
                            </div>
                            <div className="flex items-start space-x-3 p-3 bg-amber-50 rounded-lg border border-amber-200">
                              <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                              <div>
                                <h4 className="font-medium text-gray-900">Limited Subletting Rights</h4>
                                <p className="text-sm text-gray-600">
                                  The lease restricts your ability to sublet without written permission.
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <Badge className="bg-blue-600 text-white">Upgrade to see all concerns</Badge>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </CollapsibleContent>
                </Collapsible>
              </Card>
            </div>

            {/* Main CTA */}
            <div className="mt-8 text-center">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg">
                <Unlock className="w-5 h-5 mr-2" />
                Unlock Full Breakdown
              </Button>
              <p className="text-sm text-gray-500 mt-2">
                Get complete analysis with detailed explanations and legal insights
              </p>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <Card className="border-2 border-blue-200 bg-gradient-to-b from-blue-50 to-white">
                <CardHeader className="text-center pb-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Crown className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-xl text-gray-900">Upgrade to Pro</CardTitle>
                  <div className="text-3xl font-bold text-blue-600">
                    $10<span className="text-lg font-normal text-gray-600">/month</span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                      <span className="text-sm text-gray-700">Unlimited lease analyses</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                      <span className="text-sm text-gray-700">Complete breakdowns with legal insights</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                      <span className="text-sm text-gray-700">Red flag detection</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                      <span className="text-sm text-gray-700">Clause-by-clause explanations</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                      <span className="text-sm text-gray-700">Download PDF reports</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                      <span className="text-sm text-gray-700">Priority support</span>
                    </div>
                  </div>

                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">Start Free Trial</Button>

                  <p className="text-xs text-gray-500 text-center">7-day free trial • Cancel anytime</p>
                </CardContent>
              </Card>

              {/* Security Notice */}
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2 flex items-center">
                  <Shield className="w-4 h-4 mr-2 text-green-600" />
                  Your Privacy Matters
                </h4>
                <p className="text-sm text-gray-600">
                  Your lease documents are processed securely and automatically deleted after analysis. We never store
                  your personal information.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
