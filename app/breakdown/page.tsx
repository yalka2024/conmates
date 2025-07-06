"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import {
  FileText,
  ArrowLeft,
  MessageSquare,
  ChevronDown,
  ChevronUp,
  AlertTriangle,
  CheckCircle2,
  Lightbulb,
  Calendar,
  DollarSign,
  Home,
  Star,
  Send,
} from "lucide-react"
import Link from "next/link"
import dynamic from "next/dynamic"

import StateSelector from "@/components/state-selector"
import { getStateRule } from "@/lib/state-rules"
import { useLanguage } from "@/components/language-provider"
import { useStateContext } from "@/components/state-provider"

const PDFDownloadButton = dynamic(() => import("../../components/pdf-download-button"), { ssr: false })

export default function BreakdownPage() {
  const { t } = useLanguage()
  const { selectedState, setSelectedState } = useStateContext()
  const [activeTab, setActiveTab] = useState("clauses")
  const [openClauses, setOpenClauses] = useState<{ [key: string]: boolean }>({
    rent: true,
    deposit: false,
    term: false,
    maintenance: false,
    pets: false,
    subletting: false,
  })
  const [feedback, setFeedback] = useState({
    rating: 0,
    comment: "",
    email: "",
  })
  const [isSubmittingFeedback, setIsSubmittingFeedback] = useState(false)

  const toggleClause = (clauseId: string) => {
    setOpenClauses((prev) => ({
      ...prev,
      [clauseId]: !prev[clauseId],
    }))
  }

  const handleFeedbackSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmittingFeedback(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setIsSubmittingFeedback(false)
    setFeedback({ rating: 0, comment: "", email: "" })
    // Show success message
  }

  const clauses = [
    {
      id: "rent",
      title: t('breakdown.clause.rent.title'),
      section: t('breakdown.clause.rent.section'),
      originalText: t('breakdown.clause.rent.originalText'),
      explanation: t('breakdown.clause.rent.explanation'),
      impact: "medium",
      tips: [
        t('breakdown.clause.rent.tip1'),
        t('breakdown.clause.rent.tip2'),
        t('breakdown.clause.rent.tip3'),
      ],
    },
    {
      id: "deposit",
      title: t('breakdown.clause.deposit.title'),
      section: t('breakdown.clause.deposit.section'),
      originalText: t('breakdown.clause.deposit.originalText'),
      explanation: t('breakdown.clause.deposit.explanation'),
      impact: "low",
      tips: [
        t('breakdown.clause.deposit.tip1'),
        t('breakdown.clause.deposit.tip2'),
        t('breakdown.clause.deposit.tip3'),
      ],
    },
    {
      id: "term",
      title: t('breakdown.clause.term.title'),
      section: t('breakdown.clause.term.section'),
      originalText: t('breakdown.clause.term.originalText'),
      explanation: t('breakdown.clause.term.explanation'),
      impact: "medium",
      tips: [
        t('breakdown.clause.term.tip1'),
        t('breakdown.clause.term.tip2'),
        t('breakdown.clause.term.tip3'),
      ],
    },
    {
      id: "maintenance",
      title: t('breakdown.clause.maintenance.title'),
      section: t('breakdown.clause.maintenance.section'),
      originalText: t('breakdown.clause.maintenance.originalText'),
      explanation: t('breakdown.clause.maintenance.explanation'),
      impact: "medium",
      tips: [
        t('breakdown.clause.maintenance.tip1'),
        t('breakdown.clause.maintenance.tip2'),
        t('breakdown.clause.maintenance.tip3'),
      ],
    },
    {
      id: "pets",
      title: t('breakdown.clause.pets.title'),
      section: t('breakdown.clause.pets.section'),
      originalText: t('breakdown.clause.pets.originalText'),
      explanation: t('breakdown.clause.pets.explanation'),
      impact: "high",
      tips: [
        t('breakdown.clause.pets.tip1'),
        t('breakdown.clause.pets.tip2'),
        t('breakdown.clause.pets.tip3'),
      ],
    },
    {
      id: "subletting",
      title: t('breakdown.clause.subletting.title'),
      section: t('breakdown.clause.subletting.section'),
      originalText: t('breakdown.clause.subletting.originalText'),
      explanation: t('breakdown.clause.subletting.explanation'),
      impact: "high",
      tips: [
        t('breakdown.clause.subletting.tip1'),
        t('breakdown.clause.subletting.tip2'),
        t('breakdown.clause.subletting.tip3'),
      ],
    },
  ]

  const redFlags = [
    {
      severity: "high",
      title: t('breakdown.redflag.noPetPolicy.title'),
      description: t('breakdown.redflag.noPetPolicy.description'),
      impact: t('breakdown.redflag.noPetPolicy.impact'),
      action: t('breakdown.redflag.noPetPolicy.action'),
    },
    {
      severity: "high",
      title: t('breakdown.redflag.noSubletting.title'),
      description: t('breakdown.redflag.noSubletting.description'),
      impact: t('breakdown.redflag.noSubletting.impact'),
      action: t('breakdown.redflag.noSubletting.action'),
    },
    {
      severity: "medium",
      title: t('breakdown.redflag.highLateFee.title'),
      description: t('breakdown.redflag.highLateFee.description'),
      impact: t('breakdown.redflag.highLateFee.impact'),
      action: t('breakdown.redflag.highLateFee.action'),
    },
    {
      severity: "medium",
      title: t('breakdown.redflag.tenantRepairs.title'),
      description: t('breakdown.redflag.tenantRepairs.description'),
      impact: t('breakdown.redflag.tenantRepairs.impact'),
      action: t('breakdown.redflag.tenantRepairs.action'),
    },
  ]

  const actionableTips = [
    {
      category: t('breakdown.tips.beforeSign.category'),
      icon: CheckCircle2,
      tips: [
        t('breakdown.tips.beforeSign.tip1'),
        t('breakdown.tips.beforeSign.tip2'),
        t('breakdown.tips.beforeSign.tip3'),
        t('breakdown.tips.beforeSign.tip4'),
        t('breakdown.tips.beforeSign.tip5'),
      ],
    },
    {
      category: t('breakdown.tips.financialProtection.category'),
      icon: DollarSign,
      tips: [
        t('breakdown.tips.financialProtection.tip1'),
        t('breakdown.tips.financialProtection.tip2'),
        t('breakdown.tips.financialProtection.tip3'),
        t('breakdown.tips.financialProtection.tip4'),
        t('breakdown.tips.financialProtection.tip5'),
      ],
    },
    {
      category: t('breakdown.tips.duringLease.category'),
      icon: Home,
      tips: [
        t('breakdown.tips.duringLease.tip1'),
        t('breakdown.tips.duringLease.tip2'),
        t('breakdown.tips.duringLease.tip3'),
        t('breakdown.tips.duringLease.tip4'),
        t('breakdown.tips.duringLease.tip5'),
      ],
    },
    {
      category: t('breakdown.tips.planningExit.category'),
      icon: Calendar,
      tips: [
        t('breakdown.tips.planningExit.tip1'),
        t('breakdown.tips.planningExit.tip2'),
        t('breakdown.tips.planningExit.tip3'),
        t('breakdown.tips.planningExit.tip4'),
        t('breakdown.tips.planningExit.tip5'),
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* State Selector */}
      <div className="container mx-auto px-4 pt-6">
        <StateSelector value={selectedState} onChange={setSelectedState} />
        {selectedState && (
          <>
            <div className="mb-4 text-blue-700 font-semibold">{t('breakdown.analysisTailored')} {selectedState}</div>
            {(() => {
              const rule = getStateRule(selectedState)
              if (!rule) return null
              return (
                <div className="mb-6 p-4 bg-blue-50 border-l-4 border-blue-400 rounded">
                  <div className="font-bold mb-2">{t('breakdown.stateSpecificRules')}:</div>
                  <ul className="list-disc pl-5 space-y-1">
                    {rule.securityDepositLimit && <li><b>{t('breakdown.securityDepositLimit')}:</b> {rule.securityDepositLimit}</li>}
                    {rule.lateFeeLimit && <li><b>{t('breakdown.lateFeeLimit')}:</b> {rule.lateFeeLimit}</li>}
                    {rule.noticePeriod && <li><b>{t('breakdown.noticePeriod')}:</b> {rule.noticePeriod}</li>}
                    {rule.requiredDisclosures && rule.requiredDisclosures.length > 0 && (
                      <li><b>{t('breakdown.requiredDisclosures')}:</b> {rule.requiredDisclosures.join(", ")}</li>
                    )}
                    {rule.tips && rule.tips.map((tip, i) => <li key={i}><b>{t('breakdown.tip')}:</b> {tip}</li>)}
                  </ul>
                </div>
              )
            })()}
          </>
        )}
      </div>
      {/* Header */}
      <header className="border-b border-blue-100 bg-white sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/summary" className="flex items-center space-x-2">
              <ArrowLeft className="w-5 h-5 text-gray-600" />
              <span className="text-gray-600 hover:text-blue-600 transition-colors">{t('breakdown.backToSummary')}</span>
            </Link>
            <div className="flex items-center space-x-4">
              <PDFDownloadButton clauses={clauses} redFlags={redFlags} actionableTips={actionableTips} />
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                  <FileText className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-semibold text-gray-900">{t('breakdown.conmates')}</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{t('breakdown.completeLeaseBreakdown')}</h1>
            <p className="text-lg text-gray-600">
              {t('breakdown.leaseExplained')} We&apos;ve analyzed every clause to help you understand your rights and
              responsibilities.
            </p>
          </div>

          {/* Main Content Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-3 bg-blue-50 p-1">
              <TabsTrigger value="clauses" className="data-[state=active]:bg-white">
                <FileText className="w-4 h-4 mr-2" />
                {t('breakdown.clauseByClause')}
              </TabsTrigger>
              <TabsTrigger value="redflags" className="data-[state=active]:bg-white">
                <AlertTriangle className="w-4 h-4 mr-2" />
                {t('breakdown.redFlags')}
              </TabsTrigger>
              <TabsTrigger value="tips" className="data-[state=active]:bg-white">
                <Lightbulb className="w-4 h-4 mr-2" />
                {t('breakdown.actionableTips')}
              </TabsTrigger>
            </TabsList>

            {/* Clause-by-Clause Tab */}
            <TabsContent value="clauses" className="space-y-4">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">{t('breakdown.understandingYourLease')}</h2>
                <p className="text-gray-600">
                  We&apos;ve broken down the most important parts of your lease into plain English. Click on each section to
                  see the original text and our explanation.
                </p>
              </div>

              {clauses.map((clause) => (
                <Card key={clause.id} className="overflow-hidden">
                  <Collapsible open={openClauses[clause.id]} onOpenChange={() => toggleClause(clause.id)}>
                    <CollapsibleTrigger asChild>
                      <CardHeader className="cursor-pointer hover:bg-gray-50 transition-colors">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <Badge
                              variant={
                                clause.impact === "high"
                                  ? "destructive"
                                  : clause.impact === "medium"
                                    ? "default"
                                    : "secondary"
                              }
                              className={
                                clause.impact === "high"
                                  ? "bg-red-100 text-red-700"
                                  : clause.impact === "medium"
                                    ? "bg-yellow-100 text-yellow-700"
                                    : "bg-green-100 text-green-700"
                              }
                            >
                              {clause.impact} impact
                            </Badge>
                            <div>
                              <CardTitle className="text-lg">{clause.title}</CardTitle>
                              <p className="text-sm text-gray-500">{clause.section}</p>
                            </div>
                          </div>
                          {openClauses[clause.id] ? (
                            <ChevronUp className="w-5 h-5 text-gray-500" />
                          ) : (
                            <ChevronDown className="w-5 h-5 text-gray-500" />
                          )}
                        </div>
                      </CardHeader>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <CardContent className="pt-0 space-y-4">
                        {/* Original Text */}
                        <div className="p-4 bg-gray-50 rounded-lg border-l-4 border-gray-300">
                          <h4 className="font-medium text-gray-900 mb-2">{t('breakdown.originalLeaseText')}:</h4>
                          <p className="text-sm text-gray-700 italic">&quot;{clause.originalText}&quot;</p>
                        </div>

                        {/* Plain English Explanation */}
                        <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-400">
                          <h4 className="font-medium text-blue-900 mb-2">{t('breakdown.whatThisMeans')}:</h4>
                          <p className="text-blue-800">{clause.explanation}</p>
                        </div>

                        {/* Tips */}
                        <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-400">
                          <h4 className="font-medium text-green-900 mb-2">{t('breakdown.proTips')}:</h4>
                          <ul className="space-y-1">
                            {clause.tips.map((tip, index) => (
                              <li key={index} className="text-sm text-green-800 flex items-start">
                                <span className="mr-2">•</span>
                                <span>{tip}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </CardContent>
                    </CollapsibleContent>
                  </Collapsible>
                </Card>
              ))}
            </TabsContent>

            {/* Red Flags Tab */}
            <TabsContent value="redflags" className="space-y-4">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">{t('breakdown.potentialRedFlags')}</h2>
                <p className="text-gray-600">
                  We&apos;ve identified some clauses that might work against your interests. Here&apos;s what to watch out for and
                  how to protect yourself.
                </p>
              </div>

              {redFlags.map((flag, index) => (
                <Card key={index} className="border-l-4 border-red-400">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            flag.severity === "high" ? "bg-red-100" : "bg-yellow-100"
                          }`}
                        >
                          <AlertTriangle
                            className={`w-5 h-5 ${flag.severity === "high" ? "text-red-600" : "text-yellow-600"}`}
                          />
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">{flag.title}</h3>
                          <Badge
                            variant={flag.severity === "high" ? "destructive" : "default"}
                            className={
                              flag.severity === "high" ? "bg-red-100 text-red-700" : "bg-yellow-100 text-yellow-700"
                            }
                          >
                            {flag.severity} risk
                          </Badge>
                        </div>
                        <p className="text-gray-700 mb-3">{flag.description}</p>
                        <div className="p-3 bg-gray-50 rounded-lg mb-3">
                          <h4 className="font-medium text-gray-900 mb-1">{t('breakdown.impactOnYou')}:</h4>
                          <p className="text-sm text-gray-700">{flag.impact}</p>
                        </div>
                        <div className="p-3 bg-blue-50 rounded-lg">
                          <h4 className="font-medium text-blue-900 mb-1">{t('breakdown.whatYouCanDo')}:</h4>
                          <p className="text-sm text-blue-800">{flag.action}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            {/* Actionable Tips Tab */}
            <TabsContent value="tips" className="space-y-6">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">{t('breakdown.yourActionPlan')}</h2>
                <p className="text-gray-600">
                  Practical steps to protect yourself and make the most of your lease. Follow these tips to avoid common
                  pitfalls and maintain a good relationship with your landlord.
                </p>
              </div>

              {actionableTips.map((category, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <category.icon className="w-5 h-5 text-blue-600" />
                      </div>
                      <span>{category.category}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {category.tips.map((tip, tipIndex) => (
                        <li key={tipIndex} className="flex items-start space-x-3">
                          <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
          </Tabs>

          {/* Feedback Section */}
          <Card className="mt-12">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MessageSquare className="w-5 h-5 text-blue-600" />
                <span>{t('breakdown.shareYourFeedback')}</span>
              </CardTitle>
              <p className="text-gray-600">
                {t('breakdown.howHelpful')} us improve Conmates! Your feedback helps us provide better analysis for everyone.
              </p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleFeedbackSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label>{t('breakdown.howHelpful')}</Label>
                  <div className="flex space-x-2">
                    {[1, 2, 3, 4, 5].map((rating) => (
                      <button
                        key={rating}
                        type="button"
                        onClick={() => setFeedback((prev) => ({ ...prev, rating }))}
                        className={`p-1 rounded ${
                          feedback.rating >= rating ? "text-yellow-500" : "text-gray-300"
                        } hover:text-yellow-400 transition-colors`}
                      >
                        <Star className="w-6 h-6 fill-current" />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="comment">{t('breakdown.commentsOptional')}</Label>
                  <Textarea
                    id="comment"
                    placeholder={t('breakdown.whatDidYouFindMostHelpful')}
                    value={feedback.comment}
                    onChange={(e) => setFeedback((prev) => ({ ...prev, comment: e.target.value }))}
                    className="min-h-[100px]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">{t('breakdown.emailOptional')}</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder={t('breakdown.yourEmail')}
                    value={feedback.email}
                    onChange={(e) => setFeedback((prev) => ({ ...prev, email: e.target.value }))}
                  />
                  <p className="text-xs text-gray-500">{t('breakdown.emailPrivacy')}</p>
                </div>

                <Button
                  type="submit"
                  disabled={feedback.rating === 0 || isSubmittingFeedback}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  {isSubmittingFeedback ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>{t('breakdown.sending')}</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <Send className="w-4 h-4" />
                      <span>{t('breakdown.sendFeedback')}</span>
                    </div>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
