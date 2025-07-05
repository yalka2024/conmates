"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  MessageCircle,
  Users,
  Calendar,
  Bell,
  BookOpen,
  Smartphone,
  CheckCircle2,
  Clock,
  DollarSign,
  Heart,
  TrendingUp,
} from "lucide-react"

export default function AdditionalFeatures() {
  const [selectedFeature, setSelectedFeature] = useState("community")

  const additionalFeatures = [
    {
      id: "community",
      title: "Community Support Hub",
      icon: Users,
      description: "Connect with other renters and share experiences",
      priority: "High",
      impact: "Reduces isolation and builds collective knowledge",
      features: [
        "Anonymous Q&A forum for lease questions",
        "Local renter groups by city/neighborhood",
        "Success stories and tips sharing",
        "Peer review of lease red flags",
        "Community-driven FAQ updates",
      ],
    },
    {
      id: "legal",
      title: "Legal Resource Library",
      icon: BookOpen,
      description: "State-specific tenant rights and legal resources",
      priority: "High",
      impact: "Empowers users with knowledge of their rights",
      features: [
        "State-by-state tenant rights guides",
        "Local housing authority contacts",
        "Legal aid organization directory",
        "Template letters for common issues",
        "Know Your Rights quick reference cards",
      ],
    },
    {
      id: "alerts",
      title: "Smart Lease Alerts",
      icon: Bell,
      description: "Proactive notifications for important lease dates",
      priority: "Medium",
      impact: "Prevents missed deadlines and fees",
      features: [
        "Rent due date reminders",
        "Lease renewal deadline alerts",
        "Security deposit return timeline",
        "Maintenance request follow-ups",
        "Local rent control law updates",
      ],
    },
    {
      id: "comparison",
      title: "Lease Comparison Tool",
      icon: TrendingUp,
      description: "Compare multiple lease offers side-by-side",
      priority: "Medium",
      impact: "Helps users make informed decisions",
      features: [
        "Side-by-side lease comparison",
        "Red flag severity scoring",
        "Cost analysis over lease term",
        "Neighborhood safety ratings",
        "Commute time calculations",
      ],
    },
    {
      id: "accessibility",
      title: "Enhanced Accessibility",
      icon: Heart,
      description: "Support for users with disabilities and language barriers",
      priority: "High",
      impact: "Makes platform accessible to all users",
      features: [
        "Multi-language support (Spanish, Chinese, etc.)",
        "Audio lease summaries for visually impaired",
        "Simple language mode for learning disabilities",
        "Voice-to-text for questions and feedback",
        "High contrast and large text options",
      ],
    },
    {
      id: "mobile",
      title: "Mobile-First Features",
      icon: Smartphone,
      description: "Optimized for smartphone users",
      priority: "High",
      impact: "Serves users who primarily use mobile devices",
      features: [
        "Camera-based document scanning",
        "Offline mode for viewing saved analyses",
        "SMS notifications for important updates",
        "Progressive Web App (PWA) installation",
        "Voice navigation for hands-free use",
      ],
    },
    {
      id: "support",
      title: "Human Support Network",
      icon: MessageCircle,
      description: "Access to real human help when needed",
      priority: "Medium",
      impact: "Provides safety net for complex situations",
      features: [
        "Live chat with housing counselors",
        "Scheduled phone consultations",
        "Emergency hotline for urgent issues",
        "Volunteer mentor matching program",
        "Local housing advocate referrals",
      ],
    },
    {
      id: "financial",
      title: "Financial Assistance Tools",
      icon: DollarSign,
      description: "Help users manage lease-related finances",
      priority: "Medium",
      impact: "Addresses financial barriers to housing",
      features: [
        "Rent affordability calculator",
        "Security deposit assistance program finder",
        "Payment plan options for platform fees",
        "Integration with rental assistance programs",
        "Budget planning tools for renters",
      ],
    },
  ]

  const implementationPhases = [
    {
      phase: "Phase 1: Core Platform",
      timeline: "Months 1-3",
      features: ["Basic upload and analysis", "Payment system", "PDF generation"],
      status: "Complete",
    },
    {
      phase: "Phase 2: Enhanced UX",
      timeline: "Months 4-6",
      features: ["Multi-language support", "Mobile optimization", "Legal resource library"],
      status: "In Progress",
    },
    {
      phase: "Phase 3: Community Features",
      timeline: "Months 7-9",
      features: ["Community hub", "Comparison tools", "Smart alerts"],
      status: "Planned",
    },
    {
      phase: "Phase 4: Advanced Support",
      timeline: "Months 10-12",
      features: ["Human support network", "Financial tools", "AI improvements"],
      status: "Future",
    },
  ]

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      <div className="text-center mb-8">
                  <h1 className="text-3xl font-bold text-gray-900 mb-4">Conmates: Additional Features & Roadmap</h1>
        <p className="text-lg text-gray-600">
          Expanding beyond basic lease analysis to create a comprehensive support ecosystem for renters
        </p>
      </div>

      <Tabs value={selectedFeature} onValueChange={setSelectedFeature} className="space-y-6">
        <TabsList className="grid grid-cols-4 lg:grid-cols-8 bg-blue-50 p-1">
          {additionalFeatures.slice(0, 8).map((feature) => (
            <TabsTrigger key={feature.id} value={feature.id} className="data-[state=active]:bg-white text-xs p-2">
              <feature.icon className="w-4 h-4" />
            </TabsTrigger>
          ))}
        </TabsList>

        {additionalFeatures.map((feature) => (
          <TabsContent key={feature.id} value={feature.id}>
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <feature.icon className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <CardTitle className="text-xl">{feature.title}</CardTitle>
                      <p className="text-gray-600">{feature.description}</p>
                    </div>
                  </div>
                  <Badge
                    variant={feature.priority === "High" ? "destructive" : "default"}
                    className={
                      feature.priority === "High"
                        ? "bg-red-100 text-red-700"
                        : feature.priority === "Medium"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-green-100 text-green-700"
                    }
                  >
                    {feature.priority} Priority
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-medium text-blue-900 mb-2">Impact on Users:</h4>
                  <p className="text-blue-800">{feature.impact}</p>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Key Features:</h4>
                  <ul className="space-y-2">
                    {feature.features.map((item, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>

      {/* Implementation Roadmap */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calendar className="w-5 h-5 text-blue-600" />
            <span>Implementation Roadmap</span>
          </CardTitle>
          <p className="text-gray-600">Phased approach to building a comprehensive renter support platform</p>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {implementationPhases.map((phase, index) => (
              <div key={index} className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      phase.status === "Complete"
                        ? "bg-green-100 text-green-600"
                        : phase.status === "In Progress"
                          ? "bg-blue-100 text-blue-600"
                          : phase.status === "Planned"
                            ? "bg-yellow-100 text-yellow-600"
                            : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {phase.status === "Complete" ? (
                      <CheckCircle2 className="w-5 h-5" />
                    ) : phase.status === "In Progress" ? (
                      <Clock className="w-5 h-5" />
                    ) : (
                      <Calendar className="w-5 h-5" />
                    )}
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{phase.phase}</h3>
                    <Badge
                      variant={
                        phase.status === "Complete"
                          ? "default"
                          : phase.status === "In Progress"
                            ? "default"
                            : "secondary"
                      }
                      className={
                        phase.status === "Complete"
                          ? "bg-green-100 text-green-700"
                          : phase.status === "In Progress"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-gray-100 text-gray-700"
                      }
                    >
                      {phase.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{phase.timeline}</p>
                  <ul className="text-sm text-gray-700">
                    {phase.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center space-x-2">
                        <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Success Metrics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="w-5 h-5 text-blue-600" />
            <span>Success Metrics & KPIs</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg text-center">
              <div className="text-2xl font-bold text-blue-600 mb-1">85%</div>
              <div className="text-sm text-blue-800">User Satisfaction</div>
            </div>
            <div className="p-4 bg-green-50 rounded-lg text-center">
              <div className="text-2xl font-bold text-green-600 mb-1">60%</div>
              <div className="text-sm text-green-800">Conversion Rate</div>
            </div>
            <div className="p-4 bg-yellow-50 rounded-lg text-center">
              <div className="text-2xl font-bold text-yellow-600 mb-1">72hrs</div>
              <div className="text-sm text-yellow-800">Avg. Support Response</div>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg text-center">
              <div className="text-2xl font-bold text-purple-600 mb-1">40%</div>
              <div className="text-sm text-purple-800">Monthly Retention</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Technical Considerations */}
      <Card>
        <CardHeader>
          <CardTitle>Technical Implementation Notes</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-gray-900 mb-3">Backend Requirements</h4>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Scalable document processing pipeline</li>
                <li>• Multi-language AI model support</li>
                <li>• Real-time notification system</li>
                <li>• Community moderation tools</li>
                <li>• Analytics and reporting dashboard</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-3">Security & Privacy</h4>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• End-to-end document encryption</li>
                <li>• GDPR/CCPA compliance</li>
                <li>• Anonymous community features</li>
                <li>• Secure payment processing</li>
                <li>• Data retention policies</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
