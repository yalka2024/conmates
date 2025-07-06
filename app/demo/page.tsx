import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Play, 
  Download, 
  FileText, 
  Shield, 
  Zap, 
  Users, 
  CheckCircle,
  ArrowRight,
  Star,
  Clock,
  DollarSign,
  BarChart3
} from "lucide-react";
import Link from "next/link";

export default function DemoPage() {
  const demoFeatures = [
    {
      title: "AI-Powered Analysis",
      description: "Advanced GPT-4 integration for comprehensive lease analysis",
      icon: Zap,
      features: ["Natural language processing", "Risk assessment", "Legal compliance check"]
    },
    {
      title: "Payment Integration",
      description: "Seamless Stripe payment processing for premium services",
      icon: DollarSign,
      features: ["Secure transactions", "Multiple payment methods", "Subscription management"]
    },
    {
      title: "Legal Resources",
      description: "State-specific tenant rights and legal aid information",
      icon: Shield,
      features: ["50+ states covered", "Legal aid referrals", "Educational materials"]
    },
    {
      title: "Analytics Dashboard",
      description: "Comprehensive analytics and user activity tracking",
      icon: BarChart3,
      features: ["User metrics", "Revenue tracking", "Performance monitoring"]
    }
  ];

  const demoResults = {
    basicAnalysis: {
      rent: "$1,200/month",
      deposit: "$2,400",
      term: "12 months",
      keyClauses: [
        "Monthly rent: $1,200",
        "Security deposit: $2,400",
        "Lease term: 12 months",
        "Utilities: Tenant responsibility",
        "Pets: Not allowed",
        "Late fees: $50 after 5 days"
      ],
      redFlags: [
        "Pets not allowed: This may be a concern for tenants with pets",
        "Late fees: $50 after 5 days: Tenants should be cautious about potential late fees"
      ],
      recommendations: [
        "Review the lease terms carefully before signing",
        "Consider negotiating specific terms if needed",
        "Ensure compliance with all lease terms throughout the tenancy"
      ]
    },
    premiumAnalysis: {
      legalAnalysis: "This lease appears to be a standard residential lease agreement with typical terms and conditions. The rent amount and security deposit are reasonable for the market. However, there are some areas that could be negotiated.",
      riskAssessment: "Medium risk - Standard lease terms with some negotiable clauses",
      complianceCheck: "Compliant with state laws - All terms appear to be within legal limits",
      detailedRecommendations: [
        "Consider negotiating the pet policy if you have pets",
        "Request clarification on utility responsibilities",
        "Ask about late fee grace periods",
        "Inquire about maintenance request procedures"
      ]
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">
            <Play className="w-4 h-4 mr-2" />
            Platform Demo
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            See Conmates in Action
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore the full capabilities of our AI-powered lease analysis platform. 
            See how it transforms complex legal documents into clear, actionable insights.
          </p>
        </div>

        {/* Demo Navigation */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <Button asChild variant="outline">
            <Link href="#features">Platform Features</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="#analysis">Analysis Demo</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="#analytics">Analytics Demo</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="#pricing">Pricing Structure</Link>
          </Button>
        </div>

        {/* Platform Features */}
        <section id="features" className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Platform Features</h2>
            <p className="text-xl text-gray-600">Comprehensive tools for lease analysis and tenant support</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {demoFeatures.map((feature, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <CardTitle>{feature.title}</CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {feature.features.map((item, idx) => (
                      <li key={idx} className="flex items-center text-sm text-gray-600">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Analysis Demo */}
        <section id="analysis" className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Analysis Demo</h2>
            <p className="text-xl text-gray-600">See how our AI analyzes lease documents</p>
          </div>

          <Tabs defaultValue="basic" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="basic">Basic Analysis</TabsTrigger>
              <TabsTrigger value="premium">Premium Analysis</TabsTrigger>
            </TabsList>

            <TabsContent value="basic" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <FileText className="w-5 h-5 mr-2" />
                    Basic Lease Analysis Results
                  </CardTitle>
                  <CardDescription>Sample analysis of a residential lease agreement</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-blue-900">Rent</h4>
                      <p className="text-2xl font-bold text-blue-600">{demoResults.basicAnalysis.rent}</p>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-green-900">Deposit</h4>
                      <p className="text-2xl font-bold text-green-600">{demoResults.basicAnalysis.deposit}</p>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-purple-900">Term</h4>
                      <p className="text-2xl font-bold text-purple-600">{demoResults.basicAnalysis.term}</p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-3">Key Clauses</h4>
                      <ul className="space-y-2">
                        {demoResults.basicAnalysis.keyClauses.map((clause, index) => (
                          <li key={index} className="flex items-start text-sm">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" />
                            {clause}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-3">Red Flags</h4>
                      <ul className="space-y-2">
                        {demoResults.basicAnalysis.redFlags.map((flag, index) => (
                          <li key={index} className="flex items-start text-sm">
                            <div className="w-4 h-4 bg-red-500 rounded-full mr-2 mt-0.5" />
                            {flag}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3">Recommendations</h4>
                    <ul className="space-y-2">
                      {demoResults.basicAnalysis.recommendations.map((rec, index) => (
                        <li key={index} className="flex items-start text-sm">
                          <ArrowRight className="w-4 h-4 text-blue-500 mr-2 mt-0.5" />
                          {rec}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="premium" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Star className="w-5 h-5 mr-2" />
                    Premium Analysis Results
                  </CardTitle>
                  <CardDescription>Advanced legal analysis and risk assessment</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-blue-900">Legal Analysis</h4>
                      <p className="text-sm text-blue-700">{demoResults.premiumAnalysis.legalAnalysis}</p>
                    </div>
                    <div className="bg-yellow-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-yellow-900">Risk Assessment</h4>
                      <p className="text-sm text-yellow-700">{demoResults.premiumAnalysis.riskAssessment}</p>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-green-900">Compliance Check</h4>
                      <p className="text-sm text-green-700">{demoResults.premiumAnalysis.complianceCheck}</p>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3">Detailed Recommendations</h4>
                    <ul className="space-y-2">
                      {demoResults.premiumAnalysis.detailedRecommendations.map((rec, index) => (
                        <li key={index} className="flex items-start text-sm">
                          <ArrowRight className="w-4 h-4 text-blue-500 mr-2 mt-0.5" />
                          {rec}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </section>

        {/* Analytics Demo */}
        <section id="analytics" className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Analytics Dashboard</h2>
            <p className="text-xl text-gray-600">Comprehensive platform analytics and insights</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart3 className="w-5 h-5 mr-2" />
                Platform Analytics Overview
              </CardTitle>
              <CardDescription>Real-time metrics and performance data</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-4 gap-6 mb-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">1,247</div>
                  <div className="text-sm text-gray-600">Total Users</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">2,156</div>
                  <div className="text-sm text-gray-600">Analyses Completed</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600">$43,250</div>
                  <div className="text-sm text-gray-600">Total Revenue</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-600">23.4%</div>
                  <div className="text-sm text-gray-600">Conversion Rate</div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3">Top States</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>California</span>
                      <span className="font-semibold">342 analyses</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Texas</span>
                      <span className="font-semibold">298 analyses</span>
                    </div>
                    <div className="flex justify-between">
                      <span>New York</span>
                      <span className="font-semibold">267 analyses</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-3">Performance Metrics</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>API Response Time</span>
                      <span className="font-semibold text-green-600">2.3s avg</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Uptime</span>
                      <span className="font-semibold text-green-600">99.9%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Success Rate</span>
                      <span className="font-semibold text-green-600">99.2%</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Pricing Structure */}
        <section id="pricing" className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Pricing Structure</h2>
            <p className="text-xl text-gray-600">Flexible pricing options for different user needs</p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            <Card className="border-2 border-gray-200">
              <CardHeader className="text-center">
                <CardTitle>Basic Analysis</CardTitle>
                <div className="text-3xl font-bold text-blue-600">Free</div>
                <CardDescription>Perfect for quick lease overview</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Key terms extraction
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Basic recommendations
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Standard processing
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-2 border-blue-500 relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-blue-600 text-white">Most Popular</Badge>
              </div>
              <CardHeader className="text-center">
                <CardTitle>Premium Analysis</CardTitle>
                <div className="text-3xl font-bold text-blue-600">$19.99</div>
                <CardDescription>Comprehensive lease analysis</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Detailed legal analysis
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Risk assessment
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Personalized recommendations
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Priority processing
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-2 border-gray-200">
              <CardHeader className="text-center">
                <CardTitle>Legal Consultation</CardTitle>
                <div className="text-3xl font-bold text-blue-600">$49.99</div>
                <CardDescription>AI-powered legal guidance</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Advanced legal analysis
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    State-specific guidance
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Legal resource referrals
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Document review service
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-2 border-gray-200">
              <CardHeader className="text-center">
                <CardTitle>Document Review</CardTitle>
                <div className="text-3xl font-bold text-blue-600">$29.99</div>
                <CardDescription>Professional document analysis</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Professional review
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Detailed feedback
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Actionable recommendations
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Follow-up support
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center">
          <Card className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
            <CardContent className="pt-8">
              <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
              <p className="text-xl mb-8 opacity-90">
                Experience the full power of our AI-powered lease analysis platform
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" variant="secondary">
                  <Link href="/upload">
                    Try It Now
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
                  <Link href="/payment">
                    View Pricing
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
} 