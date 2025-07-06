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
  Video,
  Star,
  Filter,
  Bookmark,
  Share2,
  Eye,
  Clock,
  Tag,
  ArrowRight,
  CheckCircle,
  Lightbulb,
  Gavel,
  Shield,
  DollarSign,
  FileCheck,
  Calendar,
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
      state: "ALL",
      title: "Universal Tenant Rights Guide",
      description: "Federal protections and rights that apply to all tenants across the United States, including fair housing, habitability standards, and privacy rights.",
      topics: ["Fair Housing", "Habitability Standards", "Privacy Rights", "Discrimination Protection"],
      lastUpdated: "2024-01-20",
      type: "guide",
      downloadUrl: "/templates/all-states-tenant-rights.pdf",
      onlineUrl: "https://www.hud.gov/states/shared/working/r8/mf/topten"
    },
    {
      state: "CA",
      title: t('resources.tenantRightsCA.title'),
      description: t('resources.tenantRightsCA'),
      topics: [t('resources.tenantRightsCA.topic1'), t('resources.tenantRightsCA.topic2'), t('resources.tenantRightsCA.topic3'), t('resources.tenantRightsCA.topic4')],
      lastUpdated: "2024-01-15",
      type: "guide",
      downloadUrl: "/templates/california-tenant-rights.pdf",
      onlineUrl: "https://landlordtenant.dre.ca.gov/pdf/resources/CaliforniaTenantRenterGuide.pdf"
    },
    {
      state: "NY",
      title: t('resources.rentStabilizationNY.title'),
      description: t('resources.rentStabilizationNY'),
      topics: [t('resources.rentStabilizationNY.topic1'), t('resources.rentStabilizationNY.topic2'), t('resources.rentStabilizationNY.topic3'), t('resources.rentStabilizationNY.topic4')],
      lastUpdated: "2024-01-10",
      type: "guide",
      downloadUrl: "/templates/newyork-rent-stabilization.pdf",
      onlineUrl: "https://rentguidelinesboard.cityofnewyork.us/"
    },
    {
      state: "TX",
      title: t('resources.tenantRightsTX.title'),
      description: t('resources.tenantRightsTX'),
      topics: [t('resources.tenantRightsTX.topic1'), t('resources.tenantRightsTX.topic2'), t('resources.tenantRightsTX.topic3'), t('resources.tenantRightsTX.topic4')],
      lastUpdated: "2023-12-20",
      type: "legal",
      downloadUrl: "/templates/texas-tenant-rights.pdf",
      onlineUrl: "https://statutes.capitol.texas.gov/Docs/PR/htm/PR.92.htm"
    },
    {
      state: "FL",
      title: "Florida Tenant Rights Guide",
      description: "Comprehensive guide to tenant rights in Florida, including security deposits, eviction procedures, and habitability standards.",
      topics: ["Security Deposits", "Eviction Process", "Repairs & Maintenance", "Landlord Entry"],
      lastUpdated: "2024-01-05",
      type: "guide",
      downloadUrl: "/templates/florida-tenant-rights.pdf",
      onlineUrl: "https://www.floridabar.org/public/consumer/pamphlet012/"
    },
    {
      state: "IL",
      title: "Illinois Tenant Rights Guide",
      description: "Complete overview of tenant rights in Illinois, including Chicago-specific ordinances and state-wide protections.",
      topics: ["Chicago Rent Control", "Security Deposits", "Eviction Protection", "Repair Rights"],
      lastUpdated: "2024-01-12",
      type: "guide",
      downloadUrl: "/templates/illinois-tenant-rights.pdf",
      onlineUrl: "https://www.isba.org/public/guide/landlordtenant"
    },
  ]

  const legalAidOrgs = [
    {
      name: "National Housing Law Project",
      state: "ALL",
      city: "National",
      phone: "(510) 251-9400",
      website: "https://nhlp.org",
      services: ["Housing Law Advocacy", "Tenant Rights", "Fair Housing", "Policy Development"],
      languages: [t('resources.language.english'), t('resources.language.spanish')],
      eligibility: "Legal professionals and advocates nationwide",
    },
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
    {
      name: "Legal Services of Greater Miami",
      state: "FL",
      city: "Miami",
      phone: "(305) 576-0080",
      website: "https://legalservicesmiami.org",
      services: ["Eviction Defense", "Housing Discrimination", "Tenant Rights", "Fair Housing"],
      languages: [t('resources.language.english'), t('resources.language.spanish'), t('resources.language.creole')],
      eligibility: "Low-income residents of Miami-Dade County",
    },
    {
      name: "Legal Aid Chicago",
      state: "IL",
      city: "Chicago",
      phone: "(312) 341-1070",
      website: "https://legalaidchicago.org",
      services: ["Housing Court Representation", "Eviction Prevention", "Tenant Rights", "Fair Housing"],
      languages: [t('resources.language.english'), t('resources.language.spanish'), t('resources.language.polish')],
      eligibility: "Low-income Chicago residents",
    },
    {
      name: "Bay Area Legal Services",
      state: "FL",
      city: "Tampa",
      phone: "(813) 232-1343",
      website: "https://bals.org",
      services: ["Eviction Defense", "Housing Rights", "Fair Housing", "Tenant Advocacy"],
      languages: [t('resources.language.english'), t('resources.language.spanish')],
      eligibility: "Low-income residents of Hillsborough County",
    },
    {
      name: "Prairie State Legal Services",
      state: "IL",
      city: "Rockford",
      phone: "(815) 965-2134",
      website: "https://pslegal.org",
      services: ["Housing Law", "Eviction Prevention", "Tenant Rights", "Fair Housing"],
      languages: [t('resources.language.english'), t('resources.language.spanish')],
      eligibility: "Low-income residents of northern Illinois",
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

  const handleDownload = (url: string, filename: string) => {
    const link = document.createElement('a')
    link.href = url
    link.download = filename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleCallNow = (phone: string) => {
    window.open(`tel:${phone}`, '_self')
  }

  const handleVisitWebsite = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  const categories = [
    {
      id: 'legal',
      name: 'Legal Resources',
      icon: Gavel,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      count: 24
    },
    {
      id: 'rights',
      name: 'Tenant Rights',
      icon: Shield,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      count: 18
    },
    {
      id: 'financial',
      name: 'Financial Tools',
      icon: DollarSign,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      count: 12
    },
    {
      id: 'templates',
      name: 'Document Templates',
      icon: FileCheck,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      count: 31
    },
    {
      id: 'guides',
      name: 'How-to Guides',
      icon: BookOpen,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      count: 15
    },
    {
      id: 'community',
      name: 'Community Resources',
      icon: Users,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50',
      count: 8
    }
  ];

  const featuredResources = [
    {
      id: 1,
      title: "Complete Tenant Rights Handbook",
      description: "Comprehensive guide covering all aspects of tenant rights across all 50 states.",
      category: "rights",
      type: "PDF",
      size: "2.4 MB",
      downloads: 1247,
      rating: 4.9,
      tags: ["rights", "handbook", "comprehensive"],
      featured: true
    },
    {
      id: 2,
      title: "Security Deposit Dispute Letter Template",
      description: "Professional template for disputing unfair security deposit deductions.",
      category: "templates",
      type: "DOCX",
      size: "45 KB",
      downloads: 892,
      rating: 4.8,
      tags: ["deposit", "dispute", "template"],
      featured: true
    },
    {
      id: 3,
      title: "Rent Negotiation Masterclass",
      description: "Video series teaching proven negotiation strategies to lower your rent.",
      category: "guides",
      type: "Video",
      size: "156 MB",
      downloads: 567,
      rating: 4.7,
      tags: ["negotiation", "rent", "video"],
      featured: true
    }
  ];

  const recentResources = [
    {
      id: 4,
      title: "State-by-State Eviction Laws",
      description: "Updated guide to eviction laws and procedures in all states.",
      category: "legal",
      type: "PDF",
      size: "1.8 MB",
      downloads: 234,
      rating: 4.6,
      tags: ["eviction", "laws", "state"],
      new: true
    },
    {
      id: 5,
      title: "Maintenance Request Tracker",
      description: "Excel spreadsheet to track maintenance requests and landlord responses.",
      category: "financial",
      type: "XLSX",
      size: "28 KB",
      downloads: 189,
      rating: 4.5,
      tags: ["maintenance", "tracker", "excel"],
      new: true
    }
  ];

  const interactiveTools = [
    {
      id: 'calculator',
      title: 'Rent Affordability Calculator',
      description: 'Calculate how much rent you can afford based on your income and expenses.',
      icon: DollarSign,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      link: '/tools/rent-calculator'
    },
    {
      id: 'checklist',
      title: 'Move-in Inspection Checklist',
      description: 'Interactive checklist to document property condition before moving in.',
      icon: FileCheck,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      link: '/tools/inspection-checklist'
    },
    {
      id: 'timeline',
      title: 'Legal Timeline Tracker',
      description: 'Track important dates and deadlines for your rental situation.',
      icon: Calendar,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      link: '/tools/timeline-tracker'
    },
    {
      id: 'locator',
      title: 'Legal Aid Locator',
      description: 'Find free legal assistance in your area.',
      icon: MapPin,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      link: '/tools/legal-aid-locator'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Tenant Education Resources
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Access comprehensive tools, templates, and guides to protect your rights and navigate rental situations with confidence.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Search resources, templates, guides..."
                className="pl-10"
              />
            </div>
            <Button variant="outline" className="flex items-center">
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </Button>
          </div>
        </div>

        {/* Categories */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Resource Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <Card key={category.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardContent className="p-4 text-center">
                    <div className={`w-12 h-12 ${category.bgColor} rounded-full flex items-center justify-center mx-auto mb-3`}>
                      <Icon className={`w-6 h-6 ${category.color}`} />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-1">{category.name}</h3>
                    <p className="text-sm text-gray-600">{category.count} resources</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Featured Resources */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredResources.map((resource) => (
              <Card key={resource.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <Badge variant="secondary" className="text-xs">Featured</Badge>
                        <Badge variant="outline" className="text-xs">{resource.type}</Badge>
                      </div>
                      <CardTitle className="text-lg">{resource.title}</CardTitle>
                    </div>
                    <Star className="w-5 h-5 text-yellow-500" />
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{resource.description}</p>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span className="flex items-center">
                        <Download className="w-4 h-4 mr-1" />
                        {resource.downloads}
                      </span>
                      <span className="flex items-center">
                        <Star className="w-4 h-4 mr-1" />
                        {resource.rating}
                      </span>
                      <span>{resource.size}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex space-x-1">
                      {resource.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <Button size="sm">
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Interactive Tools */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Interactive Tools</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {interactiveTools.map((tool) => {
              const Icon = tool.icon;
              return (
                <Card key={tool.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardContent className="p-6 text-center">
                    <div className={`w-16 h-16 ${tool.bgColor} rounded-full flex items-center justify-center mx-auto mb-4`}>
                      <Icon className={`w-8 h-8 ${tool.color}`} />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">{tool.title}</h3>
                    <p className="text-sm text-gray-600 mb-4">{tool.description}</p>
                    <Button variant="outline" className="w-full">
                      <ArrowRight className="w-4 h-4 mr-2" />
                      Launch Tool
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Recent Resources */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Recently Added</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {recentResources.map((resource) => (
              <Card key={resource.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <Badge variant="destructive" className="text-xs">New</Badge>
                        <Badge variant="outline" className="text-xs">{resource.type}</Badge>
                      </div>
                      <CardTitle className="text-lg">{resource.title}</CardTitle>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{resource.description}</p>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span className="flex items-center">
                        <Download className="w-4 h-4 mr-1" />
                        {resource.downloads}
                      </span>
                      <span className="flex items-center">
                        <Star className="w-4 h-4 mr-1" />
                        {resource.rating}
                      </span>
                      <span>{resource.size}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex space-x-1">
                      {resource.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <Button size="sm">
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* AI-Powered Resource Recommendations */}
        <Card className="bg-gradient-to-r from-purple-50 to-blue-50">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Lightbulb className="w-5 h-5 mr-2 text-purple-600" />
              AI-Powered Recommendations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Based on Your Learning</h4>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 p-3 bg-white rounded-lg">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <div>
                      <p className="font-medium">Security Deposit Guide</p>
                      <p className="text-sm text-gray-600">Since you're studying deposit laws</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-white rounded-lg">
                    <AlertTriangle className="w-5 h-5 text-yellow-600" />
                    <div>
                      <p className="font-medium">Eviction Defense Kit</p>
                      <p className="text-sm text-gray-600">Recommended for your area</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Popular This Week</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                    <div>
                      <p className="font-medium">Rent Increase Calculator</p>
                      <p className="text-sm text-gray-600">1,234 downloads</p>
                    </div>
                    <Button size="sm" variant="outline">
                      <Eye className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                    <div>
                      <p className="font-medium">Lease Review Checklist</p>
                      <p className="text-sm text-gray-600">987 downloads</p>
                    </div>
                    <Button size="sm" variant="outline">
                      <Eye className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
