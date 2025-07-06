"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  ArrowLeft,
  MessageCircle,
  Phone,
  Video,
  Calendar,
  Users,
  Heart,
  CheckCircle2,
  AlertTriangle,
  DollarSign,
  BookOpen,
} from "lucide-react"
import Link from "next/link"
import { useLanguage } from "@/components/language-provider"

export default function SupportPage() {
  const { t } = useLanguage()
  const [activeTab, setActiveTab] = useState("chat")
  const [isBookingConsultation, setIsBookingConsultation] = useState(false)
  const [consultationForm, setConsultationForm] = useState({
    name: "",
    email: "",
    phone: "",
    issue: "",
    urgency: "medium",
    preferredTime: "",
  })

  const supportOptions = [
    {
      id: "chat",
      title: t('support.liveChatSupport'),
      description: t('support.getInstantHelp'),
      icon: MessageCircle,
      availability: "24/7",
      responseTime: "< 2 minutes",
      cost: "Free",
      features: ["Instant responses", "Document sharing", "Multi-language support"],
    },
    {
      id: "phone",
      title: t('support.phoneConsultation'),
      description: t('support.speakWithExpert'),
      icon: Phone,
      availability: "Mon-Fri 9AM-6PM",
      responseTime: "Same day",
      cost: "Free",
      features: ["Personal guidance", "Complex issue resolution", "Follow-up support"],
    },
    {
      id: "video",
      title: t('support.videoConsultation'),
      description: t('support.faceToFaceHelp'),
      icon: Video,
      availability: "By appointment",
      responseTime: "Within 24 hours",
      cost: "Free",
      features: ["Document review", "Screen sharing", "Recorded sessions"],
    },
    {
      id: "emergency",
      title: t('support.emergencyHotline'),
      description: t('support.urgentHousingIssues'),
      icon: AlertTriangle,
      availability: "24/7",
      responseTime: "Immediate",
      cost: "Free",
      features: ["Crisis intervention", "Legal referrals", "Emergency resources"],
    },
  ]

  const mentors = [
    {
      name: "Sarah Chen",
      title: "Housing Counselor",
      experience: "8 years",
      specialties: ["First-time renters", "Rent control", "Tenant rights"],
      languages: ["English", "Spanish", "Chinese"],
      rating: 4.9,
      sessions: 156,
    },
    {
      name: "Marcus Johnson",
      title: "Legal Aid Volunteer",
      experience: "12 years",
      specialties: ["Eviction defense", "Discrimination", "Security deposits"],
      languages: ["English"],
      rating: 4.8,
      sessions: 203,
    },
    {
      name: "Elena Rodriguez",
      title: "Community Organizer",
      experience: "6 years",
      specialties: ["Low-income housing", "Rent assistance", "Community resources"],
      languages: ["English", "Spanish"],
      rating: 4.9,
      sessions: 89,
    },
  ]

  const financialPrograms = [
    {
      name: "Emergency Rental Assistance",
      description: "Help with past-due rent and utilities",
      eligibility: "Income below 80% AMI",
      maxAmount: "$5,000",
      applicationTime: "2-3 weeks",
      provider: "Local Housing Authority",
    },
    {
      name: "Security Deposit Assistance",
      description: "Loans and grants for security deposits",
      eligibility: "First-time renters, low income",
      maxAmount: "$2,500",
      applicationTime: "1-2 weeks",
      provider: "Community Development Corp",
    },
    {
      name: "Utility Assistance Program",
      description: "Help with utility deposits and bills",
      eligibility: "Income below 150% poverty level",
      maxAmount: "$1,200",
      applicationTime: "1 week",
      provider: "Salvation Army",
    },
  ]

  const handleBookConsultation = () => {
    // Simulate booking
    console.log("Booking consultation:", consultationForm)
    setIsBookingConsultation(false)
    setConsultationForm({
      name: "",
      email: "",
      phone: "",
      issue: "",
      urgency: "medium",
      preferredTime: "",
    })
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
                <Heart className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-semibold text-gray-900">Human Support</span>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Get Human Support</h1>
            <p className="text-lg text-gray-600">
              Connect with housing experts, counselors, and advocates who understand your situation and can provide
              personalized help.
            </p>
          </div>

          {/* Emergency Banner */}
          <Card className="mb-8 border-red-200 bg-red-50">
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <AlertTriangle className="w-8 h-8 text-red-600 flex-shrink-0 mt-1" />
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-red-800 mb-2">Facing an Emergency?</h3>
                  <p className="text-red-700 mb-4">
                    If you&apos;ve received an eviction notice, have unsafe living conditions, or are facing homelessness,
                    get help immediately.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button className="bg-red-600 hover:bg-red-700 text-white">
                      <Phone className="w-4 h-4 mr-2" />
                      Emergency Hotline: (555) 123-HELP
                    </Button>
                    <Button variant="outline" className="border-red-300 text-red-700 hover:bg-red-100 bg-transparent">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Emergency Chat
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Main Content */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-4 bg-blue-50 p-1">
              <TabsTrigger value="chat" className="data-[state=active]:bg-white">
                <MessageCircle className="w-4 h-4 mr-2" />
                Live Support
              </TabsTrigger>
              <TabsTrigger value="mentors" className="data-[state=active]:bg-white">
                <Users className="w-4 h-4 mr-2" />
                Mentors
              </TabsTrigger>
              <TabsTrigger value="financial" className="data-[state=active]:bg-white">
                <DollarSign className="w-4 h-4 mr-2" />
                Financial Aid
              </TabsTrigger>
              <TabsTrigger value="resources" className="data-[state=active]:bg-white">
                <BookOpen className="w-4 h-4 mr-2" />
                Resources
              </TabsTrigger>
            </TabsList>

            {/* Live Support Tab */}
            <TabsContent value="chat" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                {supportOptions.map((option) => (
                  <Card key={option.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                          <option.icon className="w-6 h-6 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">{option.title}</h3>
                          <p className="text-gray-600 mb-4">{option.description}</p>

                          <div className="space-y-2 mb-4">
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-600">Availability:</span>
                              <span className="font-medium">{option.availability}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-600">Response Time:</span>
                              <span className="font-medium">{option.responseTime}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-600">Cost:</span>
                              <Badge className="bg-green-100 text-green-700">{option.cost}</Badge>
                            </div>
                          </div>

                          <div className="mb-4">
                            <h4 className="text-sm font-medium text-gray-900 mb-2">Features:</h4>
                            <ul className="text-sm text-gray-600 space-y-1">
                              {option.features.map((feature, index) => (
                                <li key={index} className="flex items-center space-x-2">
                                  <CheckCircle2 className="w-3 h-3 text-green-600" />
                                  <span>{feature}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                            {option.id === "chat" && "Start Chat"}
                            {option.id === "phone" && "Request Call"}
                            {option.id === "video" && "Schedule Video Call"}
                            {option.id === "emergency" && "Call Emergency Line"}
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Book Consultation */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Calendar className="w-5 h-5 text-blue-600" />
                    <span>Schedule a Consultation</span>
                  </CardTitle>
                  <p className="text-gray-600">
                    Book a one-on-one session with a housing expert for personalized guidance.
                  </p>
                </CardHeader>
                <CardContent>
                  <Dialog open={isBookingConsultation} onOpenChange={setIsBookingConsultation}>
                    <DialogTrigger asChild>
                      <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                        <Calendar className="w-4 h-4 mr-2" />
                        Book Free Consultation
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-md">
                      <DialogHeader>
                        <DialogTitle>Book Your Consultation</DialogTitle>
                        <DialogDescription>
                          Tell us about your situation and we&apos;ll match you with the right expert.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Full Name *</Label>
                          <Input
                            id="name"
                            value={consultationForm.name}
                            onChange={(e) => setConsultationForm((prev) => ({ ...prev, name: e.target.value }))}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="email">Email *</Label>
                          <Input
                            id="email"
                            type="email"
                            value={consultationForm.email}
                            onChange={(e) => setConsultationForm((prev) => ({ ...prev, email: e.target.value }))}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone Number</Label>
                          <Input
                            id="phone"
                            value={consultationForm.phone}
                            onChange={(e) => setConsultationForm((prev) => ({ ...prev, phone: e.target.value }))}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="issue">What do you need help with? *</Label>
                          <Textarea
                            id="issue"
                            placeholder={t("support.describeSituation")}
                            value={consultationForm.issue}
                            onChange={(e) => setConsultationForm((prev) => ({ ...prev, issue: e.target.value }))}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label>Urgency Level</Label>
                          <Select
                            value={consultationForm.urgency}
                            onValueChange={(value) => setConsultationForm((prev) => ({ ...prev, urgency: value }))}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="low">Low - General questions</SelectItem>
                              <SelectItem value="medium">Medium - Need guidance soon</SelectItem>
                              <SelectItem value="high">High - Urgent issue</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="preferredTime">Preferred Time</Label>
                          <Input
                            id="preferredTime"
                            placeholder="e.g., Weekday evenings, Saturday mornings"
                            value={consultationForm.preferredTime}
                            onChange={(e) =>
                              setConsultationForm((prev) => ({ ...prev, preferredTime: e.target.value }))
                            }
                          />
                        </div>

                        <div className="flex justify-end space-x-3">
                          <Button variant="outline" onClick={() => setIsBookingConsultation(false)}>
                            Cancel
                          </Button>
                          <Button
                            onClick={handleBookConsultation}
                            disabled={!consultationForm.name || !consultationForm.email || !consultationForm.issue}
                            className="bg-blue-600 hover:bg-blue-700 text-white"
                          >
                            Book Consultation
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Mentors Tab */}
            <TabsContent value="mentors" className="space-y-6">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Connect with a Mentor</h2>
                <p className="text-gray-600">
                  Get matched with experienced housing advocates and counselors who can provide ongoing support.
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mentors.map((mentor, index) => (
                  <Card key={index}>
                    <CardContent className="p-6">
                      <div className="text-center mb-4">
                        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                          <Users className="w-8 h-8 text-blue-600" />
                        </div>
                        <h3 className="font-semibold text-lg text-gray-900">{mentor.name}</h3>
                        <p className="text-gray-600">{mentor.title}</p>
                        <div className="flex items-center justify-center space-x-1 mt-2">
                          <Heart className="w-4 h-4 text-red-500 fill-current" />
                          <span className="text-sm text-gray-600">{mentor.rating} rating</span>
                        </div>
                      </div>

                      <div className="space-y-3 mb-4">
                        <div>
                          <h4 className="text-sm font-medium text-gray-900 mb-1">Experience</h4>
                          <p className="text-sm text-gray-600">{mentor.experience}</p>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-gray-900 mb-1">Specialties</h4>
                          <div className="flex flex-wrap gap-1">
                            {mentor.specialties.map((specialty, specIndex) => (
                              <Badge key={specIndex} variant="secondary" className="text-xs">
                                {specialty}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-gray-900 mb-1">Languages</h4>
                          <p className="text-sm text-gray-600">{mentor.languages.join(", ")}</p>
                        </div>
                        <div className="text-xs text-gray-500">{mentor.sessions} successful sessions</div>
                      </div>

                      <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                        Connect with {mentor.name.split(" ")[0]}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Financial Aid Tab */}
            <TabsContent value="financial" className="space-y-6">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Financial Assistance Programs</h2>
                <p className="text-gray-600">
                  Find programs that can help with rent, security deposits, and other housing costs.
                </p>
              </div>

              <div className="space-y-4">
                {financialPrograms.map((program, index) => (
                  <Card key={index}>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">{program.name}</h3>
                          <p className="text-gray-600 mb-3">{program.description}</p>
                          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                            <div>
                              <span className="text-gray-600">Eligibility:</span>
                              <div className="font-medium">{program.eligibility}</div>
                            </div>
                            <div>
                              <span className="text-gray-600">Max Amount:</span>
                              <div className="font-medium text-green-600">{program.maxAmount}</div>
                            </div>
                            <div>
                              <span className="text-gray-600">Processing Time:</span>
                              <div className="font-medium">{program.applicationTime}</div>
                            </div>
                            <div>
                              <span className="text-gray-600">Provider:</span>
                              <div className="font-medium">{program.provider}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex space-x-3">
                        <Button className="bg-blue-600 hover:bg-blue-700 text-white">Apply Now</Button>
                        <Button variant="outline">Learn More</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>


            </TabsContent>

            {/* Resources Tab */}
            <TabsContent value="resources" className="space-y-6">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Additional Resources</h2>
                <p className="text-gray-600">
                  Access a comprehensive library of housing resources and support organizations.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Phone className="w-5 h-5 text-blue-600" />
                      <span>National Hotlines</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="p-3 border rounded-lg">
                      <h4 className="font-medium text-gray-900">National Low Income Housing Coalition</h4>
                      <p className="text-sm text-gray-600 mb-2">Housing advocacy and resources</p>
                      <p className="text-blue-600 font-medium">(202) 662-1530</p>
                    </div>
                    <div className="p-3 border rounded-lg">
                      <h4 className="font-medium text-gray-900">HUD Housing Counseling</h4>
                      <p className="text-sm text-gray-600 mb-2">Free housing counseling services</p>
                      <p className="text-blue-600 font-medium">(800) 569-4287</p>
                    </div>
                    <div className="p-3 border rounded-lg">
                      <h4 className="font-medium text-gray-900">National Domestic Violence Hotline</h4>
                      <p className="text-sm text-gray-600 mb-2">24/7 crisis support and housing help</p>
                      <p className="text-blue-600 font-medium">(800) 799-7233</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <BookOpen className="w-5 h-5 text-blue-600" />
                      <span>Educational Resources</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="p-3 border rounded-lg">
                      <h4 className="font-medium text-gray-900">Renter 101 Online Course</h4>
                      <p className="text-sm text-gray-600 mb-2">Free, self-paced online course for U.S. renters covering budgeting, finding and keeping a home, lease agreements, security deposits, and more.</p>
                      <Button 
                        size="sm" 
                        asChild
                        variant="outline"
                        className="mt-1"
                      >
                        <a href="https://extension.umn.edu/courses-and-events/renter-101-online-course" target="_blank" rel="noopener noreferrer">View Online</a>
                      </Button>
                    </div>
                    <div className="p-3 border rounded-lg">
                      <h4 className="font-medium text-gray-900">California Tenants: A Guide to Residential Tenants' and Landlords' Rights and Responsibilities (2025)</h4>
                      <p className="text-sm text-gray-600 mb-2">The most comprehensive, official guide for California tenants, available in English and Spanish.</p>
                      <Button 
                        size="sm" 
                        asChild
                        variant="outline"
                        className="mt-1"
                      >
                        <a href="https://landlordtenant.dre.ca.gov/pdf/resources/CaliforniaTenantRenterGuide.pdf" target="_blank" rel="noopener noreferrer">View PDF</a>
                      </Button>
                    </div>
                    <div className="p-3 border rounded-lg">
                      <h4 className="font-medium text-gray-900">NYC Rent Guidelines Board: Tenant Resources</h4>
                      <p className="text-sm text-gray-600 mb-2">Official NYC government site with guides, FAQs, and resources for New York tenants.</p>
                      <Button 
                        size="sm" 
                        asChild
                        variant="outline"
                        className="mt-1"
                      >
                        <a href="https://rentguidelinesboard.cityofnewyork.us/resources/" target="_blank" rel="noopener noreferrer">View Online</a>
                      </Button>
                    </div>
                    <div className="p-3 border rounded-lg">
                      <h4 className="font-medium text-gray-900">Texas Property Code: Landlord and Tenant</h4>
                      <p className="text-sm text-gray-600 mb-2">Official Texas statutes for landlord and tenant law, including rights and responsibilities.</p>
                      <Button 
                        size="sm" 
                        asChild
                        variant="outline"
                        className="mt-1"
                      >
                        <a href="https://statutes.capitol.texas.gov/Docs/PR/htm/PR.92.htm" target="_blank" rel="noopener noreferrer">View Online</a>
                      </Button>
                    </div>
                    <div className="p-3 border rounded-lg">
                      <h4 className="font-medium text-gray-900">Illinois Legal Aid: Tenant Rights</h4>
                      <p className="text-sm text-gray-600 mb-2">Comprehensive, plain-language guide to tenant rights in Illinois, including eviction, repairs, and security deposits.</p>
                      <Button 
                        size="sm" 
                        asChild
                        variant="outline"
                        className="mt-1"
                      >
                        <a href="https://www.illinoislegalaid.org/legal-information/tenants-rights" target="_blank" rel="noopener noreferrer">View Online</a>
                      </Button>
                    </div>
                    <div className="p-3 border rounded-lg">
                      <h4 className="font-medium text-gray-900">HUD Fair Housing Training & Complaint Portal</h4>
                      <p className="text-sm text-gray-600 mb-2">Learn about fair housing rights and file a complaint with the U.S. Department of Housing and Urban Development.</p>
                      <Button 
                        size="sm" 
                        asChild
                        variant="outline"
                        className="mt-1"
                      >
                        <a href="https://www.hud.gov/program_offices/fair_housing_equal_opp/online-complaint" target="_blank" rel="noopener noreferrer">View Online</a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
