"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  FileText,
  ArrowLeft,
  BarChart3,
  TrendingUp,
  Users,
  AlertTriangle,
  Download,
  Filter,
  Calendar,
  MapPin,
  DollarSign,
  Home,
  Scale,
  Eye,
} from "lucide-react"
import Link from "next/link"

interface PolicyInsight {
  id: string
  title: string
  description: string
  impact: "high" | "medium" | "low"
  category: "rent-control" | "eviction" | "deposits" | "maintenance" | "discrimination"
  affectedTenants: number
  states: string[]
  trend: "increasing" | "decreasing" | "stable"
  recommendation: string
}

interface DataPoint {
  label: string
  value: number
  change: number
  trend: "up" | "down" | "stable"
}

export default function PolicyDashboardPage() {
  const [selectedTimeframe, setSelectedTimeframe] = useState("6months")
  const [selectedState, setSelectedState] = useState("all")
  const [selectedCategory, setSelectedCategory] = useState("all")

  const keyMetrics: DataPoint[] = [
    { label: "Total Lease Analyses", value: 45672, change: 12.3, trend: "up" },
    { label: "Red Flags Identified", value: 18934, change: 8.7, trend: "up" },
    { label: "Tenant Rights Violations", value: 3421, change: -5.2, trend: "down" },
    { label: "Average Rent Increase", value: 8.4, change: 2.1, trend: "up" },
  ]

  const policyInsights: PolicyInsight[] = [
    {
      id: "1",
      title: "Excessive Security Deposits Trending Upward",
      description:
        "Analysis shows 34% of leases require security deposits exceeding state limits, particularly in urban areas.",
      impact: "high",
      category: "deposits",
      affectedTenants: 15678,
      states: ["CA", "NY", "TX", "FL"],
      trend: "increasing",
      recommendation:
        "Advocate for stricter enforcement of existing security deposit laws and standardized limits across states.",
    },
    {
      id: "2",
      title: "No-Pet Policies Disproportionately Affect Vulnerable Populations",
      description:
        "78% of analyzed leases prohibit pets entirely, creating barriers for emotional support animal owners.",
      impact: "medium",
      category: "discrimination",
      affectedTenants: 8934,
      states: ["All"],
      trend: "stable",
      recommendation:
        "Push for clearer guidelines distinguishing between pets and assistance animals in lease agreements.",
    },
    {
      id: "3",
      title: "Maintenance Responsibility Shifting to Tenants",
      description:
        "Increasing trend of leases making tenants responsible for repairs traditionally handled by landlords.",
      impact: "high",
      category: "maintenance",
      affectedTenants: 12456,
      states: ["TX", "FL", "AZ", "GA"],
      trend: "increasing",
      recommendation: "Develop model legislation clearly defining landlord vs. tenant maintenance responsibilities.",
    },
    {
      id: "4",
      title: "Eviction Clause Complexity Increasing",
      description:
        "Average eviction clause length has increased 40% in the past year, making tenant rights less clear.",
      impact: "high",
      category: "eviction",
      affectedTenants: 23789,
      states: ["All"],
      trend: "increasing",
      recommendation: "Advocate for plain language requirements in eviction-related lease clauses.",
    },
  ]

  const stateData = [
    { state: "California", analyses: 8934, avgRent: 2850, violations: 23.4 },
    { state: "New York", analyses: 7234, avgRent: 3200, violations: 19.8 },
    { state: "Texas", analyses: 6789, avgRent: 1650, violations: 31.2 },
    { state: "Florida", analyses: 5432, avgRent: 1890, violations: 28.7 },
    { state: "Illinois", analyses: 3456, avgRent: 2100, violations: 22.1 },
  ]

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "high":
        return "bg-red-100 text-red-700"
      case "medium":
        return "bg-yellow-100 text-yellow-700"
      case "low":
        return "bg-green-100 text-green-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="w-4 h-4 text-green-600" />
      case "down":
        return <TrendingUp className="w-4 h-4 text-red-600 rotate-180" />
      default:
        return <div className="w-4 h-4 bg-gray-400 rounded-full" />
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "rent-control":
        return <DollarSign className="w-4 h-4" />
      case "eviction":
        return <Home className="w-4 h-4" />
      case "deposits":
        return <BarChart3 className="w-4 h-4" />
      case "maintenance":
        return <AlertTriangle className="w-4 h-4" />
      case "discrimination":
        return <Scale className="w-4 h-4" />
      default:
        return <FileText className="w-4 h-4" />
    }
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
              <span className="text-xl font-semibold text-gray-900">Policy Dashboard</span>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Housing Policy Analytics</h1>
            <p className="text-lg text-gray-600 mb-6">
              Aggregated, anonymized data insights to drive evidence-based housing policy advocacy.
            </p>
            <div className="flex items-center justify-center space-x-6 text-sm text-gray-600">
              <div className="flex items-center space-x-1">
                <Eye className="w-4 h-4" />
                <span>Anonymized Data</span>
              </div>
              <div className="flex items-center space-x-1">
                <BarChart3 className="w-4 h-4" />
                <span>Real-time Analytics</span>
              </div>
              <div className="flex items-center space-x-1">
                <Scale className="w-4 h-4" />
                <span>Policy Impact</span>
              </div>
            </div>
          </div>

          {/* Filters */}
          <Card className="mb-8">
            <CardContent className="p-4">
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
                    <SelectTrigger className="w-[140px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1month">Last Month</SelectItem>
                      <SelectItem value="3months">Last 3 Months</SelectItem>
                      <SelectItem value="6months">Last 6 Months</SelectItem>
                      <SelectItem value="1year">Last Year</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-gray-500" />
                  <Select value={selectedState} onValueChange={setSelectedState}>
                    <SelectTrigger className="w-[140px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All States</SelectItem>
                      <SelectItem value="CA">California</SelectItem>
                      <SelectItem value="NY">New York</SelectItem>
                      <SelectItem value="TX">Texas</SelectItem>
                      <SelectItem value="FL">Florida</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center space-x-2">
                  <Filter className="w-4 h-4 text-gray-500" />
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="w-[140px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="rent-control">Rent Control</SelectItem>
                      <SelectItem value="eviction">Eviction</SelectItem>
                      <SelectItem value="deposits">Deposits</SelectItem>
                      <SelectItem value="maintenance">Maintenance</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button variant="outline" className="ml-auto bg-transparent">
                  <Download className="w-4 h-4 mr-2" />
                  Export Report
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Key Metrics */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            {keyMetrics.map((metric, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">{metric.label}</span>
                    {getTrendIcon(metric.trend)}
                  </div>
                  <div className="text-2xl font-bold text-gray-900 mb-1">
                    {metric.label.includes("Average") ? `${metric.value}%` : metric.value.toLocaleString()}
                  </div>
                  <div className={`text-sm ${metric.change > 0 ? "text-green-600" : "text-red-600"}`}>
                    {metric.change > 0 ? "+" : ""}
                    {metric.change}% from last period
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Tabs defaultValue="insights" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4 bg-blue-50 p-1">
              <TabsTrigger value="insights" className="data-[state=active]:bg-white">
                <AlertTriangle className="w-4 h-4 mr-2" />
                Policy Insights
              </TabsTrigger>
              <TabsTrigger value="trends" className="data-[state=active]:bg-white">
                <TrendingUp className="w-4 h-4 mr-2" />
                Trends
              </TabsTrigger>
              <TabsTrigger value="geographic" className="data-[state=active]:bg-white">
                <MapPin className="w-4 h-4 mr-2" />
                Geographic
              </TabsTrigger>
              <TabsTrigger value="impact" className="data-[state=active]:bg-white">
                <Users className="w-4 h-4 mr-2" />
                Impact Analysis
              </TabsTrigger>
            </TabsList>

            {/* Policy Insights Tab */}
            <TabsContent value="insights" className="space-y-6">
              <div className="space-y-4">
                {policyInsights.map((insight) => (
                  <Card key={insight.id}>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-start space-x-3">
                          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                            {getCategoryIcon(insight.category)}
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900 mb-2">{insight.title}</h3>
                            <p className="text-gray-600 mb-3">{insight.description}</p>
                            <div className="flex items-center space-x-4 text-sm text-gray-600">
                              <span>{insight.affectedTenants.toLocaleString()} tenants affected</span>
                              <span>•</span>
                              <span>States: {insight.states.join(", ")}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col items-end space-y-2">
                          <Badge className={getImpactColor(insight.impact)}>{insight.impact} impact</Badge>
                          <Badge
                            variant="outline"
                            className={`text-xs ${
                              insight.trend === "increasing"
                                ? "text-red-600"
                                : insight.trend === "decreasing"
                                  ? "text-green-600"
                                  : "text-gray-600"
                            }`}
                          >
                            {insight.trend}
                          </Badge>
                        </div>
                      </div>
                      <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-400">
                        <h4 className="font-medium text-blue-900 mb-2">Policy Recommendation:</h4>
                        <p className="text-blue-800 text-sm">{insight.recommendation}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Trends Tab */}
            <TabsContent value="trends" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Red Flag Trends Over Time</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        { category: "Excessive Security Deposits", current: 34, previous: 28, change: 6 },
                        { category: "No-Pet Policies", current: 78, previous: 76, change: 2 },
                        { category: "Tenant Maintenance Burden", current: 45, previous: 38, change: 7 },
                        { category: "Complex Eviction Clauses", current: 67, previous: 52, change: 15 },
                      ].map((item, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-sm font-medium">{item.category}</span>
                              <span className="text-sm text-gray-600">{item.current}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${item.current}%` }} />
                            </div>
                          </div>
                          <div className={`ml-4 text-sm ${item.change > 0 ? "text-red-600" : "text-green-600"}`}>
                            {item.change > 0 ? "+" : ""}
                            {item.change}%
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Rent Increase Patterns</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        { range: "0-5%", percentage: 32, count: 14567 },
                        { range: "5-10%", percentage: 28, count: 12789 },
                        { range: "10-15%", percentage: 23, count: 10456 },
                        { range: "15%+", percentage: 17, count: 7890 },
                      ].map((item, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-sm font-medium">{item.range} increase</span>
                              <span className="text-sm text-gray-600">{item.count.toLocaleString()} leases</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div
                                className={`h-2 rounded-full ${
                                  index === 0
                                    ? "bg-green-500"
                                    : index === 1
                                      ? "bg-yellow-500"
                                      : index === 2
                                        ? "bg-orange-500"
                                        : "bg-red-500"
                                }`}
                                style={{ width: `${item.percentage}%` }}
                              />
                            </div>
                          </div>
                          <div className="ml-4 text-sm text-gray-600">{item.percentage}%</div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Geographic Tab */}
            <TabsContent value="geographic" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>State-by-State Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-3">State</th>
                          <th className="text-right py-3">Analyses</th>
                          <th className="text-right py-3">Avg Rent</th>
                          <th className="text-right py-3">Violation Rate</th>
                          <th className="text-center py-3">Trend</th>
                        </tr>
                      </thead>
                      <tbody>
                        {stateData.map((state, index) => (
                          <tr key={index} className="border-b">
                            <td className="py-3 font-medium">{state.state}</td>
                            <td className="text-right py-3">{state.analyses.toLocaleString()}</td>
                            <td className="text-right py-3">${state.avgRent.toLocaleString()}</td>
                            <td className="text-right py-3">
                              <span
                                className={`${
                                  state.violations > 25
                                    ? "text-red-600"
                                    : state.violations > 20
                                      ? "text-yellow-600"
                                      : "text-green-600"
                                }`}
                              >
                                {state.violations}%
                              </span>
                            </td>
                            <td className="text-center py-3">{getTrendIcon(Math.random() > 0.5 ? "up" : "down")}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Impact Analysis Tab */}
            <TabsContent value="impact" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Vulnerable Population Impact</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        { group: "Low-income households", affected: 67, total: 28934 },
                        { group: "First-time renters", affected: 45, total: 15678 },
                        { group: "Elderly tenants", affected: 52, total: 8934 },
                        { group: "Families with children", affected: 38, total: 19456 },
                      ].map((item, index) => (
                        <div key={index}>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium">{item.group}</span>
                            <span className="text-sm text-gray-600">{item.affected}% affected</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div className="bg-red-500 h-2 rounded-full" style={{ width: `${item.affected}%` }} />
                          </div>
                          <div className="text-xs text-gray-500 mt-1">
                            {Math.round((item.total * item.affected) / 100).toLocaleString()} of{" "}
                            {item.total.toLocaleString()} analyzed
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Policy Intervention Opportunities</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        {
                          intervention: "Security Deposit Caps",
                          impact: "High",
                          feasibility: "Medium",
                          affected: 15678,
                        },
                        {
                          intervention: "Plain Language Requirements",
                          impact: "Medium",
                          feasibility: "High",
                          affected: 23789,
                        },
                        {
                          intervention: "Maintenance Responsibility Standards",
                          impact: "High",
                          feasibility: "Low",
                          affected: 12456,
                        },
                        {
                          intervention: "Pet Policy Protections",
                          impact: "Medium",
                          feasibility: "Medium",
                          affected: 8934,
                        },
                      ].map((item, index) => (
                        <div key={index} className="p-4 border rounded-lg">
                          <h4 className="font-medium text-gray-900 mb-2">{item.intervention}</h4>
                          <div className="flex items-center space-x-4 text-sm">
                            <div className="flex items-center space-x-1">
                              <span className="text-gray-600">Impact:</span>
                              <Badge
                                className={
                                  item.impact === "High"
                                    ? "bg-red-100 text-red-700"
                                    : item.impact === "Medium"
                                      ? "bg-yellow-100 text-yellow-700"
                                      : "bg-green-100 text-green-700"
                                }
                              >
                                {item.impact}
                              </Badge>
                            </div>
                            <div className="flex items-center space-x-1">
                              <span className="text-gray-600">Feasibility:</span>
                              <Badge
                                className={
                                  item.feasibility === "High"
                                    ? "bg-green-100 text-green-700"
                                    : item.feasibility === "Medium"
                                      ? "bg-yellow-100 text-yellow-700"
                                      : "bg-red-100 text-red-700"
                                }
                              >
                                {item.feasibility}
                              </Badge>
                            </div>
                          </div>
                          <div className="text-xs text-gray-500 mt-2">
                            Could help {item.affected.toLocaleString()} tenants
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>

          {/* Call to Action */}
          <Card className="mt-8 bg-blue-50 border-blue-200">
            <CardContent className="p-8 text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Drive Policy Change with Data</h2>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                Use these insights to advocate for evidence-based housing policy reforms. Our anonymized data helps
                build compelling cases for tenant protection legislation.
              </p>
              <div className="flex justify-center space-x-4">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  <Download className="w-4 h-4 mr-2" />
                  Download Full Report
                </Button>
                <Button variant="outline">
                  <Users className="w-4 h-4 mr-2" />
                  Share with Advocates
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
