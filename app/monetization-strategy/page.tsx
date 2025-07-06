import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  DollarSign, 
  TrendingUp, 
  Users, 
  Target,
  Zap,
  Crown,
  FileText,
  GraduationCap,
  Shield,
  ArrowRight,
  CheckCircle,
  Star
} from "lucide-react";
import Link from "next/link";

export default function MonetizationStrategyPage() {
  const revenueStreams = [
    {
      name: "Premium Analysis",
      description: "Advanced AI lease analysis with legal insights",
      price: "$19.99/month",
      potential: "$2,000-8,000/month",
      features: [
        "Unlimited lease analysis",
        "Legal risk assessment",
        "Negotiation recommendations",
        "Priority support",
        "PDF reports"
      ],
      implementation: "Month 2-3"
    },
    {
      name: "Document Review Service",
      description: "Professional document review and legal consultation",
      price: "$49.99/lease",
      potential: "$1,500-4,000/month",
      features: [
        "Comprehensive legal review",
        "State-specific compliance",
        "Attorney consultation",
        "Negotiation support",
        "Legal document templates"
      ],
      implementation: "Month 3-4"
    },
    {
      name: "Educational Courses",
      description: "Tenant rights and lease negotiation courses",
      price: "$99/course",
      potential: "$1,000-3,000/month",
      features: [
        "Video courses",
        "Interactive quizzes",
        "Certificate of completion",
        "Live Q&A sessions",
        "Downloadable resources"
      ],
      implementation: "Month 2-3"
    },
    {
      name: "Legal Consultation",
      description: "Connect tenants with qualified attorneys",
      price: "$150-300/hour",
      potential: "$2,000-5,000/month",
      features: [
        "Attorney matching",
        "Initial consultation",
        "Legal document review",
        "Court representation",
        "Payment processing"
      ],
      implementation: "Month 4-5"
    },
    {
      name: "Landlord Tools",
      description: "Tools and services for landlords",
      price: "$29.99/month",
      potential: "$1,000-3,000/month",
      features: [
        "Lease template generator",
        "Tenant screening",
        "Rent collection",
        "Legal compliance tools",
        "Property management"
      ],
      implementation: "Month 5-6"
    },
    {
      name: "Affiliate Partnerships",
      description: "Commission from legal services and insurance",
      price: "15-30% commission",
      potential: "$500-2,000/month",
      features: [
        "Legal insurance referrals",
        "Attorney referrals",
        "Property management tools",
        "Tenant screening services",
        "Legal document services"
      ],
      implementation: "Month 3-4"
    }
  ];

  const revenueTimeline = [
    {
      phase: "Phase 1",
      duration: "Month 1-2",
      model: "Free Only",
      revenue: "$0",
      users: "100-500",
      focus: "Build user base and validate market"
    },
    {
      phase: "Phase 2",
      duration: "Month 2-3",
      model: "Freemium",
      revenue: "$1,000-5,000",
      users: "500-2,000",
      focus: "Introduce premium features"
    },
    {
      phase: "Phase 3",
      duration: "Month 3-6",
      model: "Multiple Streams",
      revenue: "$5,000-15,000",
      users: "2,000-10,000",
      focus: "Scale all revenue streams"
    },
    {
      phase: "Phase 4",
      duration: "Month 6+",
      model: "Full Platform",
      revenue: "$15,000-50,000",
      users: "10,000+",
      focus: "Market leadership and expansion"
    }
  ];

  const userConversionRates = [
    {
      metric: "Free to Premium",
      rate: "5-15%",
      description: "Users who upgrade to paid plan"
    },
    {
      metric: "Premium Retention",
      rate: "70-85%",
      description: "Monthly retention rate"
    },
    {
      metric: "Course Sales",
      rate: "2-8%",
      description: "Users who buy educational courses"
    },
    {
      metric: "Document Review",
      rate: "1-5%",
      description: "Users who need legal review"
    },
    {
      metric: "Legal Consultation",
      rate: "0.5-2%",
      description: "Users who need attorney help"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">
            <DollarSign className="w-4 h-4 mr-2" />
            Revenue Strategy
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            How to Generate Income
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Even starting free, you can build a $50,000+ monthly revenue business. 
            Here's your complete monetization roadmap.
          </p>
        </div>

        {/* Revenue Timeline */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Revenue Timeline</h2>
            <p className="text-xl text-gray-600">From $0 to $50,000+ monthly revenue</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {revenueTimeline.map((phase, index) => (
              <Card key={index} className={`border-0 shadow-lg ${index === 0 ? 'border-2 border-green-500' : ''}`}>
                {index === 0 && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-green-600 text-white">Current</Badge>
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="text-xl">{phase.phase}</CardTitle>
                  <CardDescription>{phase.duration}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600 mb-1">
                        {phase.revenue}
                      </div>
                      <div className="text-sm text-gray-600">Monthly Revenue</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-semibold text-blue-600 mb-1">
                        {phase.users}
                      </div>
                      <div className="text-sm text-gray-600">Active Users</div>
                    </div>
                    <div className="text-sm text-gray-600">
                      <strong>Focus:</strong> {phase.focus}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Revenue Streams */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Revenue Streams</h2>
            <p className="text-xl text-gray-600">Multiple ways to generate income</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {revenueStreams.map((stream, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <CardTitle className="text-xl">{stream.name}</CardTitle>
                    <Badge variant="outline">{stream.implementation}</Badge>
                  </div>
                  <CardDescription>{stream.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <span className="font-semibold">Price:</span>
                      <span className="text-green-600 font-bold">{stream.price}</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                      <span className="font-semibold">Potential:</span>
                      <span className="text-blue-600 font-bold">{stream.potential}</span>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Features:</h4>
                      <ul className="space-y-1">
                        {stream.features.map((feature, idx) => (
                          <li key={idx} className="flex items-center text-sm">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Conversion Rates */}
        <section className="mb-16">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Target className="w-5 h-5 mr-2" />
                Expected Conversion Rates
              </CardTitle>
              <CardDescription>
                Realistic expectations for user conversion
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {userConversionRates.map((rate, index) => (
                  <div key={index} className="p-4 bg-gray-50 rounded-lg">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600 mb-1">
                        {rate.rate}
                      </div>
                      <div className="font-semibold mb-1">{rate.metric}</div>
                      <div className="text-sm text-gray-600">{rate.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Income Projections */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Income Projections</h2>
            <p className="text-xl text-gray-600">Realistic revenue forecasts</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2" />
                  Conservative Projection
                </CardTitle>
                <CardDescription>Based on lower conversion rates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                    <span>Month 3:</span>
                    <span className="font-bold text-orange-600">$1,500</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                    <span>Month 6:</span>
                    <span className="font-bold text-orange-600">$5,000</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                    <span>Month 12:</span>
                    <span className="font-bold text-orange-600">$15,000</span>
                  </div>
                  <div className="text-sm text-gray-600">
                    Assumes 3% free-to-paid conversion, 70% retention
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Star className="w-5 h-5 mr-2" />
                  Optimistic Projection
                </CardTitle>
                <CardDescription>Based on higher conversion rates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <span>Month 3:</span>
                    <span className="font-bold text-green-600">$5,000</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <span>Month 6:</span>
                    <span className="font-bold text-green-600">$15,000</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <span>Month 12:</span>
                    <span className="font-bold text-green-600">$50,000</span>
                  </div>
                  <div className="text-sm text-gray-600">
                    Assumes 8% free-to-paid conversion, 85% retention
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Quick Wins */}
        <section className="mb-16">
          <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Zap className="w-5 h-5 mr-2" />
                Quick Revenue Wins
              </CardTitle>
              <CardDescription className="text-blue-100">
                Start generating income immediately
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Crown className="w-6 h-6" />
                  </div>
                  <h4 className="font-semibold mb-2">Premium Analysis</h4>
                  <p className="text-sm text-blue-100">
                    Add $19.99/month premium tier with advanced features
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <GraduationCap className="w-6 h-6" />
                  </div>
                  <h4 className="font-semibold mb-2">Educational Courses</h4>
                  <p className="text-sm text-blue-100">
                    Sell $99 courses on tenant rights and lease negotiation
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Shield className="w-6 h-6" />
                  </div>
                  <h4 className="font-semibold mb-2">Document Review</h4>
                  <p className="text-sm text-blue-100">
                    Offer $49.99 professional lease review service
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* CTA Section */}
        <section className="text-center">
          <Card className="bg-gradient-to-r from-green-600 to-blue-600 text-white">
            <CardContent className="pt-8">
              <h2 className="text-3xl font-bold mb-4">Ready to Start Earning?</h2>
              <p className="text-xl mb-8 opacity-90">
                Launch your platform today and start building your revenue streams
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" variant="secondary">
                  <Link href="/launch-strategy">
                    Launch Strategy
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-green-600">
                  <Link href="/upload">
                    Test Platform
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