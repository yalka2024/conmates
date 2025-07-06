"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Scale, 
  FileText, 
  Users, 
  MapPin, 
  Phone, 
  Globe, 
  BookOpen,
  CheckCircle,
  AlertTriangle,
  ArrowRight,
  ExternalLink
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function LegalConsultationPage() {
  const [selectedState, setSelectedState] = useState("");
  const [legalAnalysis, setLegalAnalysis] = useState<any>(null);
  const router = useRouter();

  const states = [
    { code: "CA", name: "California" },
    { code: "NY", name: "New York" },
    { code: "TX", name: "Texas" },
    { code: "FL", name: "Florida" },
    { code: "IL", name: "Illinois" },
    { code: "WA", name: "Washington" },
    { code: "OR", name: "Oregon" },
    { code: "CO", name: "Colorado" }
  ];

  const legalResources = {
    CA: {
      legalAid: [
        { name: "Legal Aid Foundation of Los Angeles", phone: "(800) 399-4529", website: "https://lafla.org" },
        { name: "Bay Area Legal Aid", phone: "(800) 551-5554", website: "https://baylegal.org" },
        { name: "California Rural Legal Assistance", phone: "(800) 675-2252", website: "https://crla.org" }
      ],
      barAssociation: "California Bar Association",
      tenantRights: "https://landlordtenant.dre.ca.gov/",
      housingCounseling: "https://www.hud.gov/states/california/renting"
    },
    NY: {
      legalAid: [
        { name: "Legal Aid Society NYC", phone: "(212) 577-3300", website: "https://legalaidnyc.org" },
        { name: "Legal Services NYC", phone: "(917) 661-4500", website: "https://legalservicesnyc.org" }
      ],
      barAssociation: "New York State Bar Association",
      tenantRights: "https://rentguidelinesboard.cityofnewyork.us/",
      housingCounseling: "https://www.hud.gov/states/new_york/renting"
    },
    TX: {
      legalAid: [
        { name: "Lone Star Legal Aid", phone: "(800) 733-8394", website: "https://lonestarlegal.org" },
        { name: "Texas RioGrande Legal Aid", phone: "(888) 988-9996", website: "https://trla.org" }
      ],
      barAssociation: "State Bar of Texas",
      tenantRights: "https://statutes.capitol.texas.gov/Docs/PR/htm/PR.92.htm",
      housingCounseling: "https://www.hud.gov/states/texas/renting"
    }
  };

  const handleStateSelect = (stateCode: string) => {
    setSelectedState(stateCode);
    // Simulate AI legal analysis for the selected state
    const analysis = {
      state: stateCode,
      tenantRights: [
        "Right to habitable housing",
        "Right to privacy (24-hour notice for entry)",
        "Right to security deposit return",
        "Right to quiet enjoyment",
        "Protection from retaliation"
      ],
      commonIssues: [
        "Security deposit disputes",
        "Repair and maintenance issues",
        "Illegal eviction attempts",
        "Rent increase regulations",
        "Utility billing disputes"
      ],
      legalRemedies: [
        "Withholding rent for repairs",
        "Small claims court",
        "Housing code enforcement",
        "Legal aid assistance",
        "Tenant union support"
      ],
      recommendations: [
        "Document all communications with landlord",
        "Keep copies of rent payments and receipts",
        "Take photos of property condition",
        "Know your state's tenant rights",
        "Contact legal aid if facing eviction"
      ]
    };
    setLegalAnalysis(analysis);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          AI-Powered Legal Analysis & Resources
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Get comprehensive AI analysis of your lease, personalized legal resource referrals, and the option to upgrade to real lawyer consultation.
        </p>
      </div>

      {/* Service Options */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <Card className="border-2 border-green-200">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Scale className="w-5 h-5 mr-2" />
              AI Legal Analysis Package
            </CardTitle>
            <CardDescription>
              Comprehensive AI-powered analysis and resource referrals
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600 mb-2">$29.99</div>
            <ul className="space-y-2 text-sm mb-4">
              <li className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                AI lease analysis
              </li>
              <li className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                State-specific legal information
              </li>
              <li className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                Legal resource referrals
              </li>
              <li className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                Document templates
              </li>
            </ul>
            <Button className="w-full bg-green-600 hover:bg-green-700">
              Get AI Analysis
            </Button>
          </CardContent>
        </Card>

        <Card className="border-2 border-blue-200">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="w-5 h-5 mr-2" />
              Real Lawyer Consultation
            </CardTitle>
            <CardDescription>
              30-minute consultation with licensed tenant rights attorney
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600 mb-2">$150</div>
            <ul className="space-y-2 text-sm mb-4">
              <li className="flex items-center">
                <CheckCircle className="w-4 h-4 text-blue-500 mr-2" />
                Video or phone consultation
              </li>
              <li className="flex items-center">
                <CheckCircle className="w-4 h-4 text-blue-500 mr-2" />
                Document review
              </li>
              <li className="flex items-center">
                <CheckCircle className="w-4 h-4 text-blue-500 mr-2" />
                Legal advice and strategy
              </li>
              <li className="flex items-center">
                <CheckCircle className="w-4 h-4 text-blue-500 mr-2" />
                Follow-up email summary
              </li>
            </ul>
            <Button variant="outline" className="w-full border-blue-300 text-blue-700 hover:bg-blue-50">
              Book Consultation
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* State Selection */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center">
            <MapPin className="w-5 h-5 mr-2" />
            Select Your State for Legal Resources
          </CardTitle>
          <CardDescription>
            Choose your state to get personalized legal information and local resource referrals
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {states.map((state) => (
              <Button
                key={state.code}
                variant={selectedState === state.code ? "default" : "outline"}
                onClick={() => handleStateSelect(state.code)}
                className="h-12"
              >
                {state.name}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {selectedState && legalAnalysis && (
        <div className="space-y-6">
          {/* AI Legal Analysis */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Scale className="w-5 h-5 mr-2" />
                AI Legal Analysis for {states.find(s => s.code === selectedState)?.name}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Tenant Rights */}
              <div>
                <h4 className="font-semibold mb-3 flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  Your Tenant Rights
                </h4>
                <div className="grid md:grid-cols-2 gap-3">
                  {legalAnalysis.tenantRights.map((right: string, index: number) => (
                    <div key={index} className="p-3 bg-green-50 border border-green-200 rounded-lg text-sm">
                      {right}
                    </div>
                  ))}
                </div>
              </div>

              {/* Common Issues */}
              <div>
                <h4 className="font-semibold mb-3 flex items-center">
                  <AlertTriangle className="w-4 h-4 text-orange-500 mr-2" />
                  Common Legal Issues
                </h4>
                <div className="grid md:grid-cols-2 gap-3">
                  {legalAnalysis.commonIssues.map((issue: string, index: number) => (
                    <div key={index} className="p-3 bg-orange-50 border border-orange-200 rounded-lg text-sm">
                      {issue}
                    </div>
                  ))}
                </div>
              </div>

              {/* Legal Remedies */}
              <div>
                <h4 className="font-semibold mb-3 flex items-center">
                  <BookOpen className="w-4 h-4 text-blue-500 mr-2" />
                  Available Legal Remedies
                </h4>
                <div className="grid md:grid-cols-2 gap-3">
                  {legalAnalysis.legalRemedies.map((remedy: string, index: number) => (
                    <div key={index} className="p-3 bg-blue-50 border border-blue-200 rounded-lg text-sm">
                      {remedy}
                    </div>
                  ))}
                </div>
              </div>

              {/* Recommendations */}
              <div>
                <h4 className="font-semibold mb-3">Legal Recommendations</h4>
                <ul className="space-y-2">
                  {legalAnalysis.recommendations.map((rec: string, index: number) => (
                    <li key={index} className="flex items-start text-sm">
                      <ArrowRight className="w-3 h-3 text-blue-500 mr-2 mt-1 flex-shrink-0" />
                      {rec}
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Legal Resources */}
          {legalResources[selectedState as keyof typeof legalResources] && (
            <div className="grid md:grid-cols-2 gap-6">
              {/* Legal Aid Organizations */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Users className="w-5 h-5 mr-2" />
                    Legal Aid Organizations
                  </CardTitle>
                  <CardDescription>
                    Free or low-cost legal assistance
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {legalResources[selectedState as keyof typeof legalResources].legalAid.map((org, index) => (
                    <div key={index} className="p-3 border rounded-lg">
                      <h4 className="font-medium text-gray-900">{org.name}</h4>
                      <div className="flex items-center space-x-4 mt-2 text-sm">
                        <a href={`tel:${org.phone}`} className="flex items-center text-blue-600 hover:text-blue-800">
                          <Phone className="w-3 h-3 mr-1" />
                          {org.phone}
                        </a>
                        <a href={org.website} target="_blank" rel="noopener noreferrer" className="flex items-center text-blue-600 hover:text-blue-800">
                          <Globe className="w-3 h-3 mr-1" />
                          Website
                          <ExternalLink className="w-3 h-3 ml-1" />
                        </a>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Additional Resources */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <FileText className="w-5 h-5 mr-2" />
                    Additional Resources
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-3 border rounded-lg">
                    <h4 className="font-medium text-gray-900">State Bar Association</h4>
                    <p className="text-sm text-gray-600 mt-1">
                      {legalResources[selectedState as keyof typeof legalResources].barAssociation}
                    </p>
                    <Button variant="outline" size="sm" className="mt-2">
                      Find a Lawyer
                    </Button>
                  </div>
                  
                  <div className="p-3 border rounded-lg">
                    <h4 className="font-medium text-gray-900">Tenant Rights Guide</h4>
                    <p className="text-sm text-gray-600 mt-1">
                      Official state tenant rights information
                    </p>
                    <a 
                      href={legalResources[selectedState as keyof typeof legalResources].tenantRights} 
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      <Button variant="outline" size="sm" className="mt-2">
                        View Guide
                        <ExternalLink className="w-3 h-3 ml-1" />
                      </Button>
                    </a>
                  </div>
                  
                  <div className="p-3 border rounded-lg">
                    <h4 className="font-medium text-gray-900">HUD Housing Counseling</h4>
                    <p className="text-sm text-gray-600 mt-1">
                      Free housing counseling services
                    </p>
                    <a 
                      href={legalResources[selectedState as keyof typeof legalResources].housingCounseling} 
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      <Button variant="outline" size="sm" className="mt-2">
                        Find Services
                        <ExternalLink className="w-3 h-3 ml-1" />
                      </Button>
                    </a>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 justify-center">
            <Button 
              onClick={() => router.push('/upload')}
              variant="outline"
              className="flex items-center"
            >
              <FileText className="w-4 h-4 mr-2" />
              Analyze Another Lease
            </Button>
            
            <Button 
              onClick={() => router.push('/resources')}
              variant="outline"
              className="flex items-center"
            >
              <BookOpen className="w-4 h-4 mr-2" />
              View All Resources
            </Button>
            
            <Button 
              onClick={() => router.push('/support')}
              className="flex items-center"
            >
              <Users className="w-4 h-4 mr-2" />
              Get Help
            </Button>
          </div>
        </div>
      )}

      {/* Disclaimer */}
      <Alert className="mt-8">
        <AlertTriangle className="w-4 h-4" />
        <AlertDescription>
          <strong>Legal Disclaimer:</strong> This information is for educational purposes only and does not constitute legal advice. 
          For specific legal advice, please consult with a qualified attorney in your jurisdiction. 
          The legal resources provided are for informational purposes and do not create an attorney-client relationship.
        </AlertDescription>
      </Alert>

      {/* Compliance Notice */}
      <Alert className="mt-4 bg-yellow-50 border-yellow-200">
        <AlertTriangle className="w-4 h-4 text-yellow-600" />
        <AlertDescription className="text-yellow-800">
          <strong>Important Compliance Notice:</strong> 
          <ul className="mt-2 space-y-1 text-sm">
            <li>• This platform provides educational information, not legal advice</li>
            <li>• State laws vary significantly - verify information with local legal resources</li>
            <li>• We are not attorneys and cannot provide legal representation</li>
            <li>• For legal disputes, consult with a licensed attorney in your state</li>
            <li>• Information may not be current or applicable to your specific situation</li>
          </ul>
        </AlertDescription>
      </Alert>

      {/* State-Specific Compliance */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="text-lg">State Compliance Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <h4 className="font-semibold mb-2">California</h4>
              <p className="text-gray-600">Security deposit limited to 2 months rent. Rent control applies in certain cities.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">New York</h4>
              <p className="text-gray-600">Rent stabilization in NYC. 24-hour notice required for entry.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Texas</h4>
              <p className="text-gray-600">No rent control. Security deposits not limited by state law.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Florida</h4>
              <p className="text-gray-600">No rent control. 12-hour notice required for entry.</p>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-4">
            <strong>Note:</strong> Laws change frequently. Always verify current information with official state resources or legal counsel.
          </p>
        </CardContent>
      </Card>
    </div>
  );
} 