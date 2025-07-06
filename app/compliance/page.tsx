"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  AlertTriangle, 
  Shield, 
  FileText, 
  MapPin, 
  Clock, 
  Users,
  CheckCircle,
  XCircle,
  Info
} from "lucide-react";

export default function CompliancePage() {
  const stateRegulations = [
    {
      state: "California",
      depositLimit: "2 months rent",
      rentControl: "Yes (certain cities)",
      noticeRequired: "24 hours",
      keyFeatures: ["Strong tenant protections", "Rent control in some areas", "Security deposit limits"],
      restrictions: ["Unauthorized practice of law", "Legal advice without license"]
    },
    {
      state: "New York",
      depositLimit: "1 month rent",
      rentControl: "Yes (NYC)",
      noticeRequired: "24 hours",
      keyFeatures: ["Rent stabilization", "Strong eviction protections", "Housing court system"],
      restrictions: ["Legal services regulation", "Attorney-client relationship rules"]
    },
    {
      state: "Texas",
      depositLimit: "No limit",
      rentControl: "No",
      noticeRequired: "24 hours",
      keyFeatures: ["Landlord-friendly laws", "No rent control", "Quick eviction process"],
      restrictions: ["Unauthorized practice of law", "Legal advice restrictions"]
    },
    {
      state: "Florida",
      depositLimit: "No limit",
      rentControl: "No",
      noticeRequired: "12 hours",
      keyFeatures: ["Landlord-friendly", "No rent control", "Quick eviction"],
      restrictions: ["Legal services regulation", "Attorney-client rules"]
    },
    {
      state: "Illinois",
      depositLimit: "No limit",
      rentControl: "No",
      noticeRequired: "24 hours",
      keyFeatures: ["Tenant rights protections", "Security deposit interest", "Repair and deduct"],
      restrictions: ["Unauthorized practice of law", "Legal advice without license"]
    }
  ];

  const complianceAreas = [
    {
      area: "Legal Services",
      status: "Compliant",
      description: "We provide educational information only, not legal advice",
      requirements: [
        "Clear disclaimers on all pages",
        "No attorney-client relationship",
        "Educational purpose only",
        "Referral to licensed attorneys"
      ]
    },
    {
      area: "Data Privacy",
      status: "Compliant",
      description: "GDPR and CCPA compliant data handling",
      requirements: [
        "Data encryption",
        "User consent",
        "Right to deletion",
        "Privacy policy"
      ]
    },
    {
      area: "Payment Processing",
      status: "Compliant",
      description: "Stripe-powered secure payments",
      requirements: [
        "PCI DSS compliance",
        "Secure payment processing",
        "Refund policies",
        "Terms of service"
      ]
    },
    {
      area: "Consumer Protection",
      status: "Compliant",
      description: "State-specific consumer protection compliance",
      requirements: [
        "Clear pricing",
        "Refund policies",
        "Service descriptions",
        "Contact information"
      ]
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Legal Compliance & Disclaimers
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Important information about our services, legal compliance, and your rights as a user.
        </p>
      </div>

      {/* Critical Legal Notice */}
      <Alert className="mb-8 bg-red-50 border-red-200">
        <AlertTriangle className="w-4 h-4 text-red-600" />
        <AlertDescription className="text-red-800">
          <strong>CRITICAL LEGAL NOTICE:</strong> This platform provides educational information only. 
          We are not attorneys and cannot provide legal advice. For legal matters, consult with a licensed attorney in your jurisdiction.
        </AlertDescription>
      </Alert>

      {/* Service Disclaimers */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Shield className="w-5 h-5 mr-2" />
            Service Disclaimers
          </CardTitle>
          <CardDescription>
            Important limitations and disclaimers for all our services
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3 flex items-center">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                What We Provide
              </h4>
              <ul className="space-y-2 text-sm">
                <li>• Educational information about tenant rights</li>
                <li>• General legal principles and concepts</li>
                <li>• Document analysis for educational purposes</li>
                <li>• Referrals to legal resources</li>
                <li>• Self-help tools and guides</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3 flex items-center">
                <XCircle className="w-4 h-4 text-red-500 mr-2" />
                What We Do NOT Provide
              </h4>
              <ul className="space-y-2 text-sm">
                <li>• Legal advice or legal representation</li>
                <li>• Attorney-client relationship</li>
                <li>• State-specific legal counsel</li>
                <li>• Legal document preparation</li>
                <li>• Court representation</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* State-Specific Regulations */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center">
            <MapPin className="w-5 h-5 mr-2" />
            State-Specific Regulations
          </CardTitle>
          <CardDescription>
            Key tenant rights and restrictions by state
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {stateRegulations.map((state) => (
              <div key={state.state} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold text-lg">{state.state}</h4>
                  <Badge variant="outline">{state.rentControl ? "Rent Control" : "No Rent Control"}</Badge>
                </div>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <h5 className="font-medium mb-2">Key Features:</h5>
                    <ul className="space-y-1 text-gray-600">
                      {state.keyFeatures.map((feature, index) => (
                        <li key={index}>• {feature}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-medium mb-2">Legal Restrictions:</h5>
                    <ul className="space-y-1 text-gray-600">
                      {state.restrictions.map((restriction, index) => (
                        <li key={index}>• {restriction}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="mt-3 pt-3 border-t grid grid-cols-3 gap-4 text-xs">
                  <div>
                    <span className="font-medium">Deposit Limit:</span> {state.depositLimit}
                  </div>
                  <div>
                    <span className="font-medium">Notice Required:</span> {state.noticeRequired}
                  </div>
                  <div>
                    <span className="font-medium">Rent Control:</span> {state.rentControl}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Compliance Areas */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center">
            <CheckCircle className="w-5 h-5 mr-2" />
            Compliance Areas
          </CardTitle>
          <CardDescription>
            How we ensure legal compliance across different areas
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            {complianceAreas.map((area) => (
              <div key={area.area} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold">{area.area}</h4>
                  <Badge className={area.status === "Compliant" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}>
                    {area.status}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600 mb-3">{area.description}</p>
                <h5 className="font-medium mb-2 text-sm">Requirements:</h5>
                <ul className="space-y-1 text-xs text-gray-600">
                  {area.requirements.map((req, index) => (
                    <li key={index}>• {req}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* User Responsibilities */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Users className="w-5 h-5 mr-2" />
            Your Responsibilities
          </CardTitle>
          <CardDescription>
            What you need to do to ensure legal compliance
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3">Before Using Our Services:</h4>
              <ul className="space-y-2 text-sm">
                <li>• Read all disclaimers and terms of service</li>
                <li>• Understand this is educational information only</li>
                <li>• Verify your state's specific laws</li>
                <li>• Consult with attorneys for legal matters</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">When Using Our Services:</h4>
              <ul className="space-y-2 text-sm">
                <li>• Don't rely solely on our information</li>
                <li>• Verify information with official sources</li>
                <li>• Keep information current and updated</li>
                <li>• Seek legal counsel for disputes</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Contact Information */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Info className="w-5 h-5 mr-2" />
            Contact & Support
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3">For Legal Questions:</h4>
              <ul className="space-y-2 text-sm">
                <li>• Contact your state bar association</li>
                <li>• Find local legal aid organizations</li>
                <li>• Consult with licensed attorneys</li>
                <li>• Use state-specific legal resources</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">For Platform Support:</h4>
              <ul className="space-y-2 text-sm">
                <li>• Email: support@conmates.com</li>
                <li>• Technical issues only</li>
                <li>• No legal advice provided</li>
                <li>• Response within 24 hours</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Final Disclaimer */}
      <Alert className="bg-blue-50 border-blue-200">
        <Info className="w-4 h-4 text-blue-600" />
        <AlertDescription className="text-blue-800">
          <strong>Last Updated:</strong> This compliance information was last updated on {new Date().toLocaleDateString()}. 
          Laws and regulations change frequently. Always verify current information with official sources or legal counsel.
        </AlertDescription>
      </Alert>
    </div>
  );
} 