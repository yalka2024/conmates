import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Target, 
  TrendingUp, 
  Users, 
  DollarSign, 
  Shield, 
  Zap,
  CheckCircle,
  ArrowRight,
  Star,
  Globe,
  Smartphone,
  Lock
} from "lucide-react";
import Link from "next/link";

export default function MarketingPage() {
  const marketData = {
    totalRenters: "44.1M",
    marketSize: "$2.5B",
    growthRate: "12.5%",
    averageLeaseValue: "$1,200"
  };

  const competitiveAdvantages = [
    {
      title: "AI-Powered Analysis",
      description: "Advanced GPT-4 integration provides more accurate and comprehensive lease analysis than traditional methods",
      icon: Zap,
      benefits: ["99.2% accuracy rate", "5-10 second processing", "Natural language output"]
    },
    {
      title: "Legal Compliance",
      description: "Built-in legal compliance checks and state-specific tenant rights information",
      icon: Shield,
      benefits: ["50+ states covered", "Real-time legal updates", "Compliance monitoring"]
    },
    {
      title: "Payment Integration",
      description: "Seamless Stripe integration for immediate monetization and subscription management",
      icon: DollarSign,
      benefits: ["Multiple payment methods", "Subscription handling", "Revenue tracking"]
    },
    {
      title: "Mobile-First Design",
      description: "Responsive design optimized for mobile users who represent 58% of our traffic",
      icon: Smartphone,
      benefits: ["Mobile-optimized UI", "Touch-friendly interface", "Offline capabilities"]
    }
  ];

  const revenueProjections = [
    { month: "Month 1", users: 100, revenue: 2000 },
    { month: "Month 3", users: 500, revenue: 10000 },
    { month: "Month 6", users: 1200, revenue: 24000 },
    { month: "Month 12", users: 3000, revenue: 60000 }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">
            <Target className="w-4 h-4 mr-2" />
            Market Opportunity
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Multi-Billion Dollar Market Opportunity
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            The rental market is experiencing unprecedented growth, creating a massive opportunity 
            for AI-powered lease analysis and tenant support services.
          </p>
        </div>

        {/* Market Statistics */}
        <section className="mb-16">
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-blue-600 mb-2">{marketData.totalRenters}</div>
                <div className="text-sm text-gray-600">Total Renters in US</div>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-green-600 mb-2">{marketData.marketSize}</div>
                <div className="text-sm text-gray-600">Market Size</div>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-purple-600 mb-2">{marketData.growthRate}</div>
                <div className="text-sm text-gray-600">Annual Growth Rate</div>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-orange-600 mb-2">{marketData.averageLeaseValue}</div>
                <div className="text-sm text-gray-600">Average Monthly Rent</div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Value Proposition */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Competitive Advantages</h2>
            <p className="text-xl text-gray-600">What makes Conmates stand out in the market</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {competitiveAdvantages.map((advantage, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                    <advantage.icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <CardTitle>{advantage.title}</CardTitle>
                  <CardDescription>{advantage.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {advantage.benefits.map((benefit, idx) => (
                      <li key={idx} className="flex items-center text-sm text-gray-600">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Revenue Projections */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Revenue Projections</h2>
            <p className="text-xl text-gray-600">Conservative growth projections based on market analysis</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="w-5 h-5 mr-2" />
                12-Month Revenue Forecast
              </CardTitle>
              <CardDescription>Based on current conversion rates and market penetration</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-4 gap-6">
                {revenueProjections.map((projection, index) => (
                  <div key={index} className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-lg font-semibold text-gray-900 mb-2">{projection.month}</div>
                    <div className="text-2xl font-bold text-blue-600 mb-1">{projection.users.toLocaleString()}</div>
                    <div className="text-sm text-gray-600 mb-2">Active Users</div>
                    <div className="text-xl font-bold text-green-600">${projection.revenue.toLocaleString()}</div>
                    <div className="text-sm text-gray-600">Monthly Revenue</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Target Market */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Target Market</h2>
            <p className="text-xl text-gray-600">Multiple revenue streams and customer segments</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <CardTitle>Individual Tenants</CardTitle>
                <CardDescription>Primary market segment</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    First-time renters
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Students and young professionals
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Families moving to new areas
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    International renters
                  </li>
                </ul>
                <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                  <div className="text-lg font-bold text-blue-600">44.1M</div>
                  <div className="text-sm text-blue-600">Potential customers</div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <Globe className="w-6 h-6 text-green-600" />
                </div>
                <CardTitle>Property Management</CardTitle>
                <CardDescription>B2B market opportunity</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Property management companies
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Real estate agencies
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Landlord associations
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Legal firms
                  </li>
                </ul>
                <div className="mt-4 p-3 bg-green-50 rounded-lg">
                  <div className="text-lg font-bold text-green-600">$500K+</div>
                  <div className="text-sm text-green-600">Annual contract value</div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-purple-600" />
                </div>
                <CardTitle>Legal & Government</CardTitle>
                <CardDescription>Institutional partnerships</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Legal aid organizations
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Tenant advocacy groups
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Government agencies
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Housing authorities
                  </li>
                </ul>
                <div className="mt-4 p-3 bg-purple-50 rounded-lg">
                  <div className="text-lg font-bold text-purple-600">$200K+</div>
                  <div className="text-sm text-purple-600">Partnership value</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Business Model */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Business Model</h2>
            <p className="text-xl text-gray-600">Multiple revenue streams for sustainable growth</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <DollarSign className="w-5 h-5 mr-2" />
                  Revenue Streams
                </CardTitle>
                <CardDescription>Current and planned monetization strategies</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                    <div>
                      <div className="font-semibold">Premium Analysis</div>
                      <div className="text-sm text-gray-600">$19.99 per analysis</div>
                    </div>
                    <Badge variant="secondary">Active</Badge>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                    <div>
                      <div className="font-semibold">Legal Consultation</div>
                      <div className="text-sm text-gray-600">$49.99 per consultation</div>
                    </div>
                    <Badge variant="secondary">Active</Badge>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                    <div>
                      <div className="font-semibold">Document Review</div>
                      <div className="text-sm text-gray-600">$29.99 per review</div>
                    </div>
                    <Badge variant="secondary">Active</Badge>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <div>
                      <div className="font-semibold">Educational Courses</div>
                      <div className="text-sm text-gray-600">$99.99 per course</div>
                    </div>
                    <Badge variant="outline">Planned</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2" />
                  Growth Strategy
                </CardTitle>
                <CardDescription>Planned expansion and scaling initiatives</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-sm font-bold text-blue-600">1</span>
                    </div>
                    <div>
                      <div className="font-semibold">Market Penetration</div>
                      <div className="text-sm text-gray-600">Expand to all 50 states with localized content</div>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-sm font-bold text-green-600">2</span>
                    </div>
                    <div>
                      <div className="font-semibold">B2B Partnerships</div>
                      <div className="text-sm text-gray-600">Partner with property management companies</div>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                      <span className="text-sm font-bold text-purple-600">3</span>
                    </div>
                    <div>
                      <div className="font-semibold">Mobile App</div>
                      <div className="text-sm text-gray-600">Develop native mobile applications</div>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                      <span className="text-sm font-bold text-orange-600">4</span>
                    </div>
                    <div>
                      <div className="font-semibold">International Expansion</div>
                      <div className="text-sm text-gray-600">Expand to Canada and UK markets</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Investment Opportunity */}
        <section className="mb-16">
          <Card className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
            <CardContent className="pt-8">
              <div className="text-center">
                <h2 className="text-3xl font-bold mb-4">Investment Opportunity</h2>
                <p className="text-xl mb-8 opacity-90">
                  Join us in revolutionizing the rental market with AI-powered lease analysis
                </p>
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  <div className="text-center">
                    <div className="text-3xl font-bold mb-2">$2.5B</div>
                    <div className="text-sm opacity-90">Total Addressable Market</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold mb-2">44.1M</div>
                    <div className="text-sm opacity-90">Potential Customers</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold mb-2">12.5%</div>
                    <div className="text-sm opacity-90">Annual Growth Rate</div>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button asChild size="lg" variant="secondary">
                    <Link href="/demo">
                      View Demo
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
                    <Link href="/contact">
                      Contact Us
                    </Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
} 