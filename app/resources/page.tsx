"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  FileText,
  ArrowLeft,
  Search,
  BookOpen,
  Phone,
  MapPin,
  Download,
  ExternalLink,
  Scale,
  AlertTriangle,
  Users,
} from "lucide-react"
import Link from "next/link"
import { useLanguage } from "@/components/language-provider"

export default function ResourcesPage() {
  const { t } = useLanguage()
  const [selectedState, setSelectedState] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("rights")

  const states = [
    { value: "all", label: t('resources.allStates') },
    { value: "CA", label: t('resources.california') },
    { value: "NY", label: t('resources.newYork') },
    { value: "TX", label: t('resources.texas') },
    { value: "FL", label: t('resources.florida') },
    { value: "IL", label: t('resources.illinois') },
  ]

  const tenantRights = [
    {
      state: "CA",
      title: t('resources.tenantRightsCA.title'),
      description: t('resources.tenantRightsCA'),
      topics: [t('resources.tenantRightsCA.topic1'), t('resources.tenantRightsCA.topic2'), t('resources.tenantRightsCA.topic3'), t('resources.tenantRightsCA.topic4')],
      lastUpdated: "2024-01-15",
      type: "guide",
    },
    {
      state: "NY",
      title: t('resources.rentStabilizationNY.title'),
      description: t('resources.rentStabilizationNY'),
      topics: [t('resources.rentStabilizationNY.topic1'), t('resources.rentStabilizationNY.topic2'), t('resources.rentStabilizationNY.topic3'), t('resources.rentStabilizationNY.topic4')],
      lastUpdated: "2024-01-10",
      type: "guide",
    },
    {
      state: "TX",
      title: t('resources.tenantRightsTX.title'),
      description: t('resources.tenantRightsTX'),
      topics: [t('resources.tenantRightsTX.topic1'), t('resources.tenantRightsTX.topic2'), t('resources.tenantRightsTX.topic3'), t('resources.tenantRightsTX.topic4')],
      lastUpdated: "2023-12-20",
      type: "legal",
    },
  ]

  const legalAidOrgs = [
    {
      name: t('resources.lafla.name'),
      state: "CA",
      city: t('resources.lafla.city'),
      phone: "(213) 640-3200",
      website: "https://lafla.org",
      services: [t('resources.lafla.service1'), t('resources.lafla.service2'), t('resources.lafla.service3')],
      languages: [t('resources.language.english'), t('resources.language.spanish')],
      eligibility: t('resources.lafla.eligibility'),
    },
    {
      name: t('resources.lasnyc.name'),
      state: "NY",
      city: t('resources.lasnyc.city'),
      phone: "(212) 577-3300",
      website: "https://legalaidnyc.org",
      services: [t('resources.lasnyc.service1'), t('resources.lasnyc.service2'), t('resources.lasnyc.service3')],
      languages: [t('resources.language.english'), t('resources.language.spanish'), t('resources.language.chinese'), t('resources.language.arabic')],
      eligibility: t('resources.lasnyc.eligibility'),
    },
    {
      name: t('resources.lonestar.name'),
      state: "TX",
      city: t('resources.lonestar.city'),
      phone: "(713) 652-0077",
      website: "https://lonestarlegal.org",
      services: [t('resources.lonestar.service1'), t('resources.lonestar.service2'), t('resources.lonestar.service3')],
      languages: [t('resources.language.english'), t('resources.language.spanish')],
      eligibility: t('resources.lonestar.eligibility'),
    },
  ]

  const templateLetters = [
    {
      title: t('resources.template.repairRequest.title'),
      description: t('resources.repairRequestTemplate'),
      category: "maintenance",
      downloadUrl: "/templates/repair-request.pdf",
    },
    {
      title: t('resources.template.depositDemand.title'),
      description: t('resources.securityDepositTemplate'),
      category: "deposits",
      downloadUrl: "/templates/deposit-demand.pdf",
    },
    {
      title: t('resources.template.rentChallenge.title'),
      description: t('resources.template.rentChallenge.description'),
      category: "rent",
      downloadUrl: "/templates/rent-challenge.pdf",
    },
    {
      title: t('resources.template.habitabilityComplaint.title'),
      description: t('resources.template.habitabilityComplaint.description'),
      category: "habitability",
      downloadUrl: "/templates/habitability-complaint.pdf",
    },
  ]

  const quickReference = [
    {
      title: t('resources.quickref.rights.title'),
      items: [
        t('resources.quickref.rights.item1'),
        t('resources.quickref.rights.item2'),
        t('resources.quickref.rights.item3'),
        t('resources.quickref.rights.item4'),
        t('resources.quickref.rights.item5'),
      ],
    },
    {
      title: t('resources.quickref.redflags.title'),
      items: [
        t('resources.quickref.redflags.item1'),
        t('resources.quickref.redflags.item2'),
        t('resources.quickref.redflags.item3'),
        t('resources.quickref.redflags.item4'),
        t('resources.quickref.redflags.item5'),
      ],
    },
    {
      title: t('resources.quickref.emergency.title'),
      items: [
        t('resources.quickref.emergency.item1'),
        t('resources.quickref.emergency.item2'),
        t('resources.quickref.emergency.item3'),
        t('resources.quickref.emergency.item4'),
        t('resources.quickref.emergency.item5'),
      ],
    },
  ]

  const filteredRights = tenantRights.filter((item) => {
    const matchesState = selectedState === "all" || item.state === selectedState
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.topics.some((topic) => topic.toLowerCase().includes(searchQuery.toLowerCase()))
    return matchesState && matchesSearch
  })

  const filteredOrgs = legalAidOrgs.filter((org) => {
    const matchesState = selectedState === "all" || org.state === selectedState
    const matchesSearch =
      org.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      org.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      org.services.some((service) => service.toLowerCase().includes(searchQuery.toLowerCase()))
    return matchesState && matchesSearch
  })

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <header className="border-b border-blue-100 bg-white">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <ArrowLeft className="w-5 h-5 text-gray-600" />
              <span className="text-gray-600 hover:text-blue-600 transition-colors">{t('resources.backToHome')}</span>
            </Link>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-semibold text-gray-900">{t('resources.legalResources')}</span>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Legal Resource Library</h1>
            <p className="text-lg text-gray-600">
              Access state-specific tenant rights guides, legal aid organizations, and template letters to protect your
              rights.
            </p>
          </div>

          {/* Search and Filters */}
          <Card className="mb-8">
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      placeholder={t("resources.searchPlaceholder")}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <Select value={selectedState} onValueChange={setSelectedState}>
                  <SelectTrigger className="w-[180px]">
                    <MapPin className="w-4 h-4 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {states.map((state) => (
                      <SelectItem key={state.value} value={state.value}>
                        {state.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Main Content Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-4 bg-blue-50 p-1">
              <TabsTrigger value="rights" className="data-[state=active]:bg-white">
                <Scale className="w-4 h-4 mr-2" />
                Tenant Rights
              </TabsTrigger>
              <TabsTrigger value="legal-aid" className="data-[state=active]:bg-white">
                <Users className="w-4 h-4 mr-2" />
                Legal Aid
              </TabsTrigger>
              <TabsTrigger value="templates" className="data-[state=active]:bg-white">
                <FileText className="w-4 h-4 mr-2" />
                Templates
              </TabsTrigger>
              <TabsTrigger value="quick-ref" className="data-[state=active]:bg-white">
                <BookOpen className="w-4 h-4 mr-2" />
                Quick Reference
              </TabsTrigger>
            </TabsList>

            {/* Tenant Rights Tab */}
            <TabsContent value="rights" className="space-y-4">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">State-Specific Tenant Rights</h2>
                <p className="text-gray-600">
                  Comprehensive guides to your rights as a tenant, organized by state and regularly updated.
                </p>
              </div>

              {filteredRights.map((guide, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <Badge variant="outline">{guide.state}</Badge>
                          <Badge variant={guide.type === "legal" ? "default" : "secondary"}>
                            {guide.type === "legal" ? "Legal Document" : "Guide"}
                          </Badge>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">{guide.title}</h3>
                        <p className="text-gray-600 mb-3">{guide.description}</p>
                        <div className="flex flex-wrap gap-1 mb-3">
                          {guide.topics.map((topic, topicIndex) => (
                            <Badge key={topicIndex} variant="secondary" className="text-xs bg-blue-50 text-blue-700">
                              {topic}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">
                        Last updated: {new Date(guide.lastUpdated).toLocaleDateString()}
                      </span>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          View Online
                        </Button>
                        <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                          <Download className="w-4 h-4 mr-2" />
                          Download PDF
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            {/* Legal Aid Tab */}
            <TabsContent value="legal-aid" className="space-y-4">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Legal Aid Organizations</h2>
                <p className="text-gray-600">
                  Find free or low-cost legal assistance in your area for housing-related issues.
                </p>
              </div>

              {filteredOrgs.map((org, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <Badge variant="outline">{org.state}</Badge>
                          <Badge variant="secondary">{org.city}</Badge>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">{org.name}</h3>
                        <div className="space-y-2 mb-4">
                          <div className="flex items-center space-x-2">
                            <Phone className="w-4 h-4 text-gray-500" />
                            <span className="text-gray-700">{org.phone}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <ExternalLink className="w-4 h-4 text-gray-500" />
                            <a
                              href={org.website}
                              className="text-blue-600 hover:text-blue-800"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {org.website}
                            </a>
                          </div>
                        </div>
                        <div className="mb-3">
                          <h4 className="font-medium text-gray-900 mb-1">Services:</h4>
                          <div className="flex flex-wrap gap-1">
                            {org.services.map((service, serviceIndex) => (
                              <Badge
                                key={serviceIndex}
                                variant="secondary"
                                className="text-xs bg-green-50 text-green-700"
                              >
                                {service}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div className="mb-3">
                          <h4 className="font-medium text-gray-900 mb-1">Languages:</h4>
                          <span className="text-sm text-gray-600">{org.languages.join(", ")}</span>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900 mb-1">Eligibility:</h4>
                          <span className="text-sm text-gray-600">{org.eligibility}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Phone className="w-4 h-4 mr-2" />
                        Call Now
                      </Button>
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Visit Website
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            {/* Templates Tab */}
            <TabsContent value="templates" className="space-y-4">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Template Letters</h2>
                <p className="text-gray-600">
                  Download professionally written letter templates for common tenant situations.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {templateLetters.map((template, index) => (
                  <Card key={index}>
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          <FileText className="w-5 h-5 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 mb-2">{template.title}</h3>
                          <p className="text-sm text-gray-600 mb-3">{template.description}</p>
                          <div className="flex items-center justify-between">
                            <Badge variant="outline" className="text-xs">
                              {template.category}
                            </Badge>
                            <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                              <Download className="w-4 h-4 mr-2" />
                              Download
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Quick Reference Tab */}
            <TabsContent value="quick-ref" className="space-y-6">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Quick Reference Cards</h2>
                <p className="text-gray-600">
                  Essential information every renter should know, organized for quick access.
                </p>
              </div>

              {quickReference.map((section, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      {index === 0 && <Scale className="w-5 h-5 text-blue-600" />}
                      {index === 1 && <AlertTriangle className="w-5 h-5 text-red-600" />}
                      {index === 2 && <Phone className="w-5 h-5 text-green-600" />}
                      <span>{section.title}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {section.items.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-start space-x-3">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-gray-700">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
          </Tabs>

          {/* Emergency Resources */}
          <Card className="mt-8 border-red-200 bg-red-50">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-red-800">
                <AlertTriangle className="w-5 h-5" />
                <span>Emergency Resources</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-red-800 mb-2">Facing Eviction?</h4>
                  <p className="text-sm text-red-700 mb-2">
                    Don't wait - get help immediately. Many evictions can be prevented with quick action.
                  </p>
                  <Button size="sm" className="bg-red-600 hover:bg-red-700 text-white">
                    <Phone className="w-4 h-4 mr-2" />
                    Emergency Hotline
                  </Button>
                </div>
                <div>
                  <h4 className="font-medium text-red-800 mb-2">Unsafe Living Conditions?</h4>
                  <p className="text-sm text-red-700 mb-2">
                    Report health and safety violations to your local housing authority immediately.
                  </p>
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-red-300 text-red-700 hover:bg-red-100 bg-transparent"
                  >
                    <AlertTriangle className="w-4 h-4 mr-2" />
                    Report Violations
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
