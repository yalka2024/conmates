import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Rocket, 
  Shield, 
  DollarSign, 
  TrendingUp, 
  CheckCircle,
  AlertTriangle,
  ArrowRight,
  Users,
  FileText,
  Zap
} from "lucide-react";
import Link from "next/link";

export default function LaunchStrategyPage() {
  const launchPhases = [
    {
      phase: "Phase 1",
      title: "MVP Launch",
      duration: "Immediate",
      cost: "$0-500",
      risk: "Low",
      features: [
        "Basic lease analysis (free tier only)",
        "Educational resources",
        "Basic disclaimers",
        "Limited to 1-2 states initially"
      ],
      legalRequirements: [
        "Basic terms of service",
        "Privacy policy",
        "AI disclaimer",
        "No legal advice disclaimer"
      ]
    },
    {
      phase: "Phase 2",
      title: "Revenue Launch",
      duration: "Month 2-3",
      cost: "$1,000-2,000",
      risk: "Medium",
      features: [
        "Premium analysis ($19.99)",
        "Payment processing",
        "Expanded state coverage",
        "Basic analytics"
      ],
      legalRequirements: [
        "Enhanced terms of service",
        "Payment terms",
        "Refund policy",
        "State-specific disclaimers"
      ]
    },
    {
      phase: "Phase 3",
      title: "Full Platform",
      duration: "Month 4-6",
      cost: "$3,000-5,000",
      risk: "Medium-High",
      features: [
        "Legal consultation service",
        "Document review",
        "All 50 states",
        "Advanced features"
      ],
      legalRequirements: [
        "Full legal compliance review",
        "Professional liability insurance",
        "State-specific legal review",
        "Attorney consultation"
      ]
    }
  ];

  const immediateActions = [
    {
      title: "Add Strong Disclaimers",
      description: "Protect yourself with comprehensive legal disclaimers",
      action: "Update all pages with clear disclaimers",
      priority: "Critical"
    },
    {
      title: "Limit Scope",
      description: "Start with basic analysis only, no legal advice",
      action: "Disable premium features temporarily",
      priority: "High"
    },
    {
      title: "State Limitation",
      description: "Focus on 1-2 states initially",
      action: "Limit resources to California and Texas",
      priority: "High"
    },
    {
      title: "Free-Only Model",
      description: "Remove payment processing initially",
      action: "Make all features free for now",
      priority: "Medium"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">
            <Rocket className="w-4 h-4 mr-2" />
            Launch Strategy
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Launch Your Platform Today
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            You don't need $10,000 to launch. Start small, validate your market, 
            and scale safely with our phased approach.
          </p>
        </div>

        {/* Launch Phases */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Phased Launch Strategy</h2>
            <p className="text-xl text-gray-600">Start safely, grow responsibly</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {launchPhases.map((phase, index) => (
              <Card key={index} className={`border-0 shadow-lg ${index === 0 ? 'border-2 border-green-500' : ''}`}>
                {index === 0 && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-green-600 text-white">Launch Now</Badge>
                  </div>
                )}
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <CardTitle className="text-xl">{phase.phase}</CardTitle>
                    <Badge variant={index === 0 ? "default" : "secondary"}>
                      {phase.risk} Risk
                    </Badge>
                  </div>
                  <CardTitle className="text-2xl">{phase.title}</CardTitle>
                  <CardDescription>
                    <div className="flex items-center space-x-2">
                      <span>Duration: {phase.duration}</span>
                      <span>•</span>
                      <span>Cost: {phase.cost}</span>
                    </div>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">Features</h4>
                      <ul className="space-y-1 text-sm">
                        {phase.features.map((feature, idx) => (
                          <li key={idx} className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Legal Requirements</h4>
                      <ul className="space-y-1 text-sm">
                        {phase.legalRequirements.map((req, idx) => (
                          <li key={idx} className="flex items-center">
                            <Shield className="w-4 h-4 text-blue-500 mr-2" />
                            {req}
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

        {/* Immediate Actions */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Immediate Actions (Today)</h2>
            <p className="text-xl text-gray-600">What you need to do right now to launch safely</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {immediateActions.map((action, index) => (
              <Card key={index} className="border-0 shadow-lg">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center">
                      {action.priority === "Critical" && <AlertTriangle className="w-5 h-5 text-red-500 mr-2" />}
                      {action.priority === "High" && <Shield className="w-5 h-5 text-orange-500 mr-2" />}
                      {action.priority === "Medium" && <CheckCircle className="w-5 h-5 text-green-500 mr-2" />}
                      {action.title}
                    </CardTitle>
                    <Badge variant={action.priority === "Critical" ? "destructive" : action.priority === "High" ? "secondary" : "outline"}>
                      {action.priority}
                    </Badge>
                  </div>
                  <CardDescription>{action.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm font-medium text-gray-700">{action.action}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Risk Mitigation */}
        <section className="mb-16">
          <Card className="border-0 shadow-lg bg-gradient-to-r from-red-50 to-orange-50">
            <CardHeader>
              <CardTitle className="flex items-center text-red-800">
                <Shield className="w-5 h-5 mr-2" />
                Risk Mitigation Strategy
              </CardTitle>
              <CardDescription className="text-red-700">
                How to minimize legal risk while launching
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3">Legal Protection</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      Clear "not legal advice" disclaimers
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      Terms of service and privacy policy
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      User agreement to disclaimers
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      Limited scope of services
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-3">Business Protection</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      Start with free model only
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      Limited geographic scope
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      Clear user expectations
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      Easy shutdown if needed
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Launch Checklist */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Launch Checklist</h2>
            <p className="text-xl text-gray-600">Complete these steps to launch safely</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="w-5 h-5 mr-2" />
                  Legal Documents
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm">Terms of Service</span>
                    <Badge variant="outline">Required</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm">Privacy Policy</span>
                    <Badge variant="outline">Required</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm">AI Disclaimer</span>
                    <Badge variant="outline">Required</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm">Legal Advice Disclaimer</span>
                    <Badge variant="outline">Required</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Zap className="w-5 h-5 mr-2" />
                  Technical Setup
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm">Disable Premium Features</span>
                    <Badge variant="outline">Required</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm">Add Disclaimers to Pages</span>
                    <Badge variant="outline">Required</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm">Limit State Coverage</span>
                    <Badge variant="outline">Required</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm">Test All Features</span>
                    <Badge variant="outline">Required</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Revenue Timeline */}
        <section className="mb-16">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="w-5 h-5 mr-2" />
                Revenue Timeline
              </CardTitle>
              <CardDescription>
                How to start generating revenue safely
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex items-center space-x-4 p-4 bg-blue-50 rounded-lg">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-bold">1</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold">Month 1-2: Free Launch</h4>
                    <p className="text-sm text-gray-600">Build user base, validate demand, gather feedback</p>
                  </div>
                  <Badge variant="outline">$0 Revenue</Badge>
                </div>
                <div className="flex items-center space-x-4 p-4 bg-green-50 rounded-lg">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-green-600 font-bold">2</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold">Month 3: Premium Launch</h4>
                    <p className="text-sm text-gray-600">Add $19.99 premium analysis with basic legal review</p>
                  </div>
                  <Badge variant="secondary">$1K-5K Revenue</Badge>
                </div>
                <div className="flex items-center space-x-4 p-4 bg-purple-50 rounded-lg">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                    <span className="text-purple-600 font-bold">3</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold">Month 6: Full Platform</h4>
                    <p className="text-sm text-gray-600">Complete legal compliance, all features enabled</p>
                  </div>
                  <Badge variant="default">$10K+ Revenue</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* CTA Section */}
        <section className="text-center">
          <Card className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
            <CardContent className="pt-8">
              <h2 className="text-3xl font-bold mb-4">Ready to Launch?</h2>
              <p className="text-xl mb-8 opacity-90">
                Start your platform today with minimal risk and maximum potential
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" variant="secondary">
                  <Link href="/upload">
                    Launch Now
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
                  <Link href="/contact">
                    Get Support
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