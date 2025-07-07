"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
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
  CheckCircle,
  TrendingUp,
  Scale,
  Target,
  Download,
  Share2,
  Star,
  Zap,
  Info
} from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface LeaseAnalysis {
  rent: string;
  deposit: string;
  term: string;
  keyClauses: string[];
  redFlags: string[];
  recommendations: string[];
  legalAnalysis?: {
    stateCompliance: string;
    unusualTerms: string[];
    negotiationPoints: string[];
  };
  riskAssessment?: {
    overallRisk: string;
    riskFactors: string[];
    mitigationStrategies: string[];
  };
  analysisType: string;
  disclaimer: string;
  limitations: string[];
  timestamp: string;
}

export default function SummaryPage() {
  const [openSections, setOpenSections] = useState({
    keyTerms: true,
    rights: false,
    concerns: false,
  })
  const [analysis, setAnalysis] = useState<LeaseAnalysis | null>(null)
  const [isPremium, setIsPremium] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const storedAnalysis = localStorage.getItem("leaseAnalysis")
    if (storedAnalysis && storedAnalysis !== "undefined") {
      try {
        const parsedAnalysis = JSON.parse(storedAnalysis)
        setAnalysis(parsedAnalysis)
        setIsPremium(parsedAnalysis.analysisType === 'premium')
      } catch (e) {
        setAnalysis(null)
        setIsPremium(false)
      }
    }
  }, [])

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  if (!analysis) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">No Analysis Found</h2>
          <p className="text-gray-600 mb-6">Please upload a lease agreement first.</p>
          <Button asChild>
            <Link href="/upload">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Upload Lease
            </Link>
          </Button>
        </div>
      </div>
    )
  }

  const getRiskColor = (risk: string) => {
    switch (risk.toLowerCase()) {
      case "low": return "bg-green-100 text-green-800"
      case "medium": return "bg-yellow-100 text-yellow-800"
      case "high": return "bg-red-100 text-red-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Badge variant={isPremium ? "default" : "secondary"} className="mr-2">
              {isPremium ? (
                <>
                  <Crown className="w-4 h-4 mr-2" />
                  Premium Analysis
                </>
              ) : (
                <>
                  <FileText className="w-4 h-4 mr-2" />
                  Free Analysis
                </>
              )}
            </Badge>
            <Badge variant="outline">
              {new Date(analysis.timestamp).toLocaleDateString()}
            </Badge>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Lease Analysis Results
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {isPremium 
              ? "Comprehensive analysis with legal insights and risk assessment"
              : "Basic analysis with key terms and recommendations"
            }
          </p>
        </div>

        {/* Legal Disclaimer */}
        <Alert className="mb-8 border-orange-200 bg-orange-50">
          <AlertTriangle className="h-4 w-4 text-orange-600" />
          <AlertDescription className="text-orange-800">
            <strong>Important:</strong> {analysis.disclaimer}
          </AlertDescription>
        </Alert>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Key Information */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Target className="w-5 h-5 mr-2" />
                  Key Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <div className="text-sm text-blue-600 font-medium">Monthly Rent</div>
                    <div className="text-2xl font-bold text-blue-900">{analysis.rent}</div>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg">
                    <div className="text-sm text-green-600 font-medium">Security Deposit</div>
                    <div className="text-2xl font-bold text-green-900">{analysis.deposit}</div>
                  </div>
                  <div className="p-4 bg-purple-50 rounded-lg">
                    <div className="text-sm text-purple-600 font-medium">Lease Term</div>
                    <div className="text-2xl font-bold text-purple-900">{analysis.term}</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Key Clauses */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="w-5 h-5 mr-2" />
                  Key Clauses
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {analysis.keyClauses.map((clause, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                      <span>{clause}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Red Flags */}
            <Card className="border-0 shadow-lg border-red-200 bg-red-50">
              <CardHeader>
                <CardTitle className="flex items-center text-red-800">
                  <AlertTriangle className="w-5 h-5 mr-2" />
                  Red Flags & Concerns
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {analysis.redFlags.map((flag, index) => (
                    <li key={index} className="flex items-start">
                      <AlertTriangle className="w-5 h-5 text-red-600 mr-3 mt-0.5" />
                      <span className="text-red-800">{flag}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Recommendations */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2" />
                  Recommendations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {analysis.recommendations.map((rec, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-blue-500 mr-3 mt-0.5" />
                      <span>{rec}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Premium Features */}
            {isPremium && analysis.legalAnalysis && (
              <>
                {/* Legal Analysis */}
                <Card className="border-0 shadow-lg border-blue-200 bg-blue-50">
                  <CardHeader>
                    <CardTitle className="flex items-center text-blue-800">
                      <Scale className="w-5 h-5 mr-2" />
                      Legal Analysis
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-2">State Compliance</h4>
                        <p className="text-blue-800">{analysis.legalAnalysis.stateCompliance}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Unusual Terms</h4>
                        <ul className="space-y-2">
                          {analysis.legalAnalysis.unusualTerms.map((term, index) => (
                            <li key={index} className="flex items-start">
                              <AlertTriangle className="w-4 h-4 text-orange-500 mr-2 mt-0.5" />
                              <span className="text-blue-800">{term}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Negotiation Points</h4>
                        <ul className="space-y-2">
                          {analysis.legalAnalysis.negotiationPoints.map((point, index) => (
                            <li key={index} className="flex items-start">
                              <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" />
                              <span className="text-blue-800">{point}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Risk Assessment */}
                {analysis.riskAssessment && (
                  <Card className="border-0 shadow-lg border-orange-200 bg-orange-50">
                    <CardHeader>
                      <CardTitle className="flex items-center text-orange-800">
                        <Shield className="w-5 h-5 mr-2" />
                        Risk Assessment
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                          <span className="font-semibold">Overall Risk Level:</span>
                          <Badge variant={
                            analysis.riskAssessment.overallRisk.toLowerCase().includes('low') ? 'default' :
                            analysis.riskAssessment.overallRisk.toLowerCase().includes('medium') ? 'secondary' : 'destructive'
                          }>
                            {analysis.riskAssessment.overallRisk}
                          </Badge>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">Risk Factors</h4>
                          <ul className="space-y-2">
                            {analysis.riskAssessment.riskFactors.map((factor, index) => (
                              <li key={index} className="flex items-start">
                                <AlertTriangle className="w-4 h-4 text-red-500 mr-2 mt-0.5" />
                                <span className="text-orange-800">{factor}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">Mitigation Strategies</h4>
                          <ul className="space-y-2">
                            {analysis.riskAssessment.mitigationStrategies.map((strategy, index) => (
                              <li key={index} className="flex items-start">
                                <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" />
                                <span className="text-orange-800">{strategy}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Analysis Type */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Zap className="w-5 h-5 mr-2" />
                  Analysis Type
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="font-medium">Type:</span>
                    <Badge variant={isPremium ? "default" : "outline"}>
                      {isPremium ? "Premium" : "Free"}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="font-medium">Cost:</span>
                    <span className="font-bold">{isPremium ? "$19.99" : "Free"}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Limitations */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Info className="w-5 h-5 mr-2" />
                  Limitations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  {analysis.limitations.map((limitation, index) => (
                    <li key={index} className="flex items-start">
                      <AlertTriangle className="w-4 h-4 text-orange-500 mr-2 mt-0.5" />
                      <span className="text-gray-600">{limitation}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Upgrade Prompt for Free Users */}
            {!isPremium && (
              <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Crown className="w-5 h-5 mr-2" />
                    Upgrade to Premium
                  </CardTitle>
                  <p className="text-blue-100">
                    Get comprehensive legal analysis
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-2xl font-bold">$19.99</div>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Legal risk assessment
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 mr-2" />
                        State compliance check
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Negotiation recommendations
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 mr-2" />
                        PDF report download
                      </li>
                    </ul>
                    <Button asChild className="w-full" variant="secondary">
                      <Link href="/upload">
                        Upgrade Now
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Actions */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button asChild className="w-full" variant="outline">
                    <Link href="/upload">
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Analyze Another Lease
                    </Link>
                  </Button>
                  {isPremium && (
                    <Button className="w-full" variant="outline">
                      <Download className="w-4 h-4 mr-2" />
                      Download PDF Report
                    </Button>
                  )}
                  <Button asChild className="w-full" variant="outline">
                    <Link href="/resources">
                      View Educational Resources
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
