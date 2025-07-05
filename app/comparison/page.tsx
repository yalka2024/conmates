"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  FileText,
  ArrowLeft,
  Plus,
  TrendingUp,
  DollarSign,
  AlertTriangle,
  CheckCircle2,
  X,
  Upload,
  BarChart3,
} from "lucide-react"
import Link from "next/link"

interface LeaseComparison {
  id: string
  name: string
  address: string
  monthlyRent: number
  securityDeposit: number
  leaseTerm: number
  redFlags: number
  score: number
  uploadDate: Date
  keyTerms: {
    petPolicy: string
    parkingIncluded: boolean
    utilitiesIncluded: string[]
    lateFeeDays: number
    lateFeeAmount: number
  }
}

export default function ComparisonPage() {
  const [leases, setLeases] = useState<LeaseComparison[]>([
    {
      id: "1",
      name: "Downtown Apartment",
      address: "123 Main St, Los Angeles, CA",
      monthlyRent: 2400,
      securityDeposit: 2400,
      leaseTerm: 12,
      redFlags: 2,
      score: 75,
      uploadDate: new Date("2024-01-15"),
      keyTerms: {
        petPolicy: "No pets allowed",
        parkingIncluded: true,
        utilitiesIncluded: ["Water", "Trash"],
        lateFeeDays: 5,
        lateFeeAmount: 75,
      },
    },
    {
      id: "2",
      name: "Suburban House",
      address: "456 Oak Ave, Pasadena, CA",
      monthlyRent: 2800,
      securityDeposit: 2800,
      leaseTerm: 12,
      redFlags: 1,
      score: 85,
      uploadDate: new Date("2024-01-20"),
      keyTerms: {
        petPolicy: "Cats allowed with deposit",
        parkingIncluded: true,
        utilitiesIncluded: ["Water", "Trash", "Gardening"],
        lateFeeDays: 10,
        lateFeeAmount: 50,
      },
    },
  ])

  const [isAddingLease, setIsAddingLease] = useState(false)

  const calculateTotalCost = (lease: LeaseComparison) => {
    return lease.monthlyRent * lease.leaseTerm + lease.securityDeposit
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600 bg-green-100"
    if (score >= 60) return "text-yellow-600 bg-yellow-100"
    return "text-red-600 bg-red-100"
  }

  const getScoreLabel = (score: number) => {
    if (score >= 80) return "Excellent"
    if (score >= 60) return "Good"
    return "Needs Review"
  }

  const removeLease = (id: string) => {
    setLeases((prev) => prev.filter((lease) => lease.id !== id))
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <header className="border-b border-blue-100 bg-white">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <ArrowLeft className="w-5 h-5 text-gray-600" />
              <span className="text-gray-600 hover:text-blue-600 transition-colors">Back to home</span>
            </Link>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-semibold text-gray-900">Lease Comparison</span>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Compare Lease Offers</h1>
            <p className="text-lg text-gray-600">
              Upload multiple lease documents to compare terms, costs, and red flags side-by-side.
            </p>
          </div>

          {/* Add Lease Button */}
          <div className="flex justify-center mb-8">
            <Dialog open={isAddingLease} onOpenChange={setIsAddingLease}>
              <DialogTrigger asChild>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Lease to Compare
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add Lease for Comparison</DialogTitle>
                  <DialogDescription>Upload a new lease document to add to your comparison.</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Upload Lease Document</h3>
                    <p className="text-gray-600 mb-4">Drag and drop your lease PDF or click to browse</p>
                    <Button variant="outline">Browse Files</Button>
                  </div>
                  <div className="flex justify-end space-x-3">
                    <Button variant="outline" onClick={() => setIsAddingLease(false)}>
                      Cancel
                    </Button>
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white">Upload & Analyze</Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {leases.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <BarChart3 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-medium text-gray-900 mb-2">No Leases to Compare</h3>
                <p className="text-gray-600 mb-6">
                  Upload at least two lease documents to start comparing terms and finding the best deal.
                </p>
                <Button onClick={() => setIsAddingLease(true)} className="bg-blue-600 hover:bg-blue-700 text-white">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Your First Lease
                </Button>
              </CardContent>
            </Card>
          ) : (
            <Tabs defaultValue="overview" className="space-y-6">
              <TabsList className="grid w-full grid-cols-3 bg-blue-50 p-1">
                <TabsTrigger value="overview" className="data-[state=active]:bg-white">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Overview
                </TabsTrigger>
                <TabsTrigger value="financial" className="data-[state=active]:bg-white">
                  <DollarSign className="w-4 h-4 mr-2" />
                  Financial
                </TabsTrigger>
                <TabsTrigger value="terms" className="data-[state=active]:bg-white">
                  <FileText className="w-4 h-4 mr-2" />
                  Terms
                </TabsTrigger>
              </TabsList>

              {/* Overview Tab */}
              <TabsContent value="overview" className="space-y-6">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {leases.map((lease) => (
                    <Card key={lease.id} className="relative">
                      <button
                        onClick={() => removeLease(lease.id)}
                        className="absolute top-2 right-2 p-1 text-gray-400 hover:text-red-600 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg">{lease.name}</CardTitle>
                          <Badge className={getScoreColor(lease.score)}>{lease.score}/100</Badge>
                        </div>
                        <p className="text-sm text-gray-600">{lease.address}</p>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-gray-600">Monthly Rent</span>
                            <div className="font-semibold text-lg">${lease.monthlyRent.toLocaleString()}</div>
                          </div>
                          <div>
                            <span className="text-gray-600">Security Deposit</span>
                            <div className="font-semibold text-lg">${lease.securityDeposit.toLocaleString()}</div>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600">Lease Score</span>
                            <span
                              className={`font-medium ${lease.score >= 80 ? "text-green-600" : lease.score >= 60 ? "text-yellow-600" : "text-red-600"}`}
                            >
                              {getScoreLabel(lease.score)}
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full ${lease.score >= 80 ? "bg-green-500" : lease.score >= 60 ? "bg-yellow-500" : "bg-red-500"}`}
                              style={{ width: `${lease.score}%` }}
                            />
                          </div>
                        </div>

                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Red Flags</span>
                          <div className="flex items-center space-x-1">
                            <AlertTriangle className="w-4 h-4 text-red-500" />
                            <span className="font-medium text-red-600">{lease.redFlags}</span>
                          </div>
                        </div>

                        <div className="text-xs text-gray-500">Analyzed on {lease.uploadDate.toLocaleDateString()}</div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Quick Comparison */}
                <Card>
                  <CardHeader>
                    <CardTitle>Quick Comparison</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left py-2">Property</th>
                            <th className="text-right py-2">Monthly Rent</th>
                            <th className="text-right py-2">Total Cost</th>
                            <th className="text-center py-2">Score</th>
                            <th className="text-center py-2">Red Flags</th>
                          </tr>
                        </thead>
                        <tbody>
                          {leases.map((lease) => (
                            <tr key={lease.id} className="border-b">
                              <td className="py-3">
                                <div>
                                  <div className="font-medium">{lease.name}</div>
                                  <div className="text-gray-600 text-xs">{lease.address}</div>
                                </div>
                              </td>
                              <td className="text-right py-3 font-medium">${lease.monthlyRent.toLocaleString()}</td>
                              <td className="text-right py-3 font-medium">
                                ${calculateTotalCost(lease).toLocaleString()}
                              </td>
                              <td className="text-center py-3">
                                <Badge className={getScoreColor(lease.score)}>{lease.score}</Badge>
                              </td>
                              <td className="text-center py-3">
                                <span className="text-red-600 font-medium">{lease.redFlags}</span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Financial Tab */}
              <TabsContent value="financial" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Financial Comparison</CardTitle>
                    <p className="text-gray-600">Compare the total financial impact of each lease option.</p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {leases.map((lease) => (
                        <div key={lease.id} className="p-4 border rounded-lg">
                          <h3 className="font-semibold text-lg mb-4">{lease.name}</h3>
                          <div className="grid md:grid-cols-4 gap-4">
                            <div className="text-center p-3 bg-blue-50 rounded-lg">
                              <div className="text-2xl font-bold text-blue-600">
                                ${lease.monthlyRent.toLocaleString()}
                              </div>
                              <div className="text-sm text-blue-800">Monthly Rent</div>
                            </div>
                            <div className="text-center p-3 bg-green-50 rounded-lg">
                              <div className="text-2xl font-bold text-green-600">
                                ${lease.securityDeposit.toLocaleString()}
                              </div>
                              <div className="text-sm text-green-800">Security Deposit</div>
                            </div>
                            <div className="text-center p-3 bg-purple-50 rounded-lg">
                              <div className="text-2xl font-bold text-purple-600">
                                ${(lease.monthlyRent * lease.leaseTerm).toLocaleString()}
                              </div>
                              <div className="text-sm text-purple-800">Total Rent</div>
                            </div>
                            <div className="text-center p-3 bg-orange-50 rounded-lg">
                              <div className="text-2xl font-bold text-orange-600">
                                ${calculateTotalCost(lease).toLocaleString()}
                              </div>
                              <div className="text-sm text-orange-800">Total Cost</div>
                            </div>
                          </div>
                          <div className="mt-4 grid md:grid-cols-2 gap-4 text-sm">
                            <div>
                              <span className="text-gray-600">Late Fee:</span>
                              <span className="ml-2 font-medium">
                                ${lease.keyTerms.lateFeeAmount} after {lease.keyTerms.lateFeeDays} days
                              </span>
                            </div>
                            <div>
                              <span className="text-gray-600">Lease Term:</span>
                              <span className="ml-2 font-medium">{lease.leaseTerm} months</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Terms Tab */}
              <TabsContent value="terms" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Terms & Conditions Comparison</CardTitle>
                    <p className="text-gray-600">Compare key lease terms and policies across properties.</p>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left py-3">Term</th>
                            {leases.map((lease) => (
                              <th key={lease.id} className="text-center py-3 min-w-[200px]">
                                {lease.name}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b">
                            <td className="py-3 font-medium">Pet Policy</td>
                            {leases.map((lease) => (
                              <td key={lease.id} className="text-center py-3">
                                {lease.keyTerms.petPolicy}
                              </td>
                            ))}
                          </tr>
                          <tr className="border-b">
                            <td className="py-3 font-medium">Parking Included</td>
                            {leases.map((lease) => (
                              <td key={lease.id} className="text-center py-3">
                                {lease.keyTerms.parkingIncluded ? (
                                  <CheckCircle2 className="w-5 h-5 text-green-600 mx-auto" />
                                ) : (
                                  <X className="w-5 h-5 text-red-600 mx-auto" />
                                )}
                              </td>
                            ))}
                          </tr>
                          <tr className="border-b">
                            <td className="py-3 font-medium">Utilities Included</td>
                            {leases.map((lease) => (
                              <td key={lease.id} className="text-center py-3">
                                {lease.keyTerms.utilitiesIncluded.join(", ") || "None"}
                              </td>
                            ))}
                          </tr>
                          <tr className="border-b">
                            <td className="py-3 font-medium">Late Fee Grace Period</td>
                            {leases.map((lease) => (
                              <td key={lease.id} className="text-center py-3">
                                {lease.keyTerms.lateFeeDays} days
                              </td>
                            ))}
                          </tr>
                          <tr className="border-b">
                            <td className="py-3 font-medium">Late Fee Amount</td>
                            {leases.map((lease) => (
                              <td key={lease.id} className="text-center py-3">
                                ${lease.keyTerms.lateFeeAmount}
                              </td>
                            ))}
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>

                {/* Recommendation */}
                <Card className="border-green-200 bg-green-50">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2 text-green-800">
                      <CheckCircle2 className="w-5 h-5" />
                      <span>Our Recommendation</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {leases.length > 0 && (
                      <div className="space-y-3">
                        <p className="text-green-700">
                          Based on our analysis,{" "}
                          <strong>
                            {leases.reduce((best, lease) => (lease.score > best.score ? lease : best)).name}
                          </strong>{" "}
                          appears to be the best option.
                        </p>
                        <ul className="text-sm text-green-700 space-y-1">
                          <li>
                            • Highest overall score (
                            {leases.reduce((best, lease) => (lease.score > best.score ? lease : best)).score}/100)
                          </li>
                          <li>
                            • Fewest red flags (
                            {leases.reduce((best, lease) => (lease.score > best.score ? lease : best)).redFlags})
                          </li>
                          <li>• Better terms and tenant protections</li>
                        </ul>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          )}
        </div>
      </main>
    </div>
  )
}
