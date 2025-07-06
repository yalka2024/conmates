"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  FileText, 
  Upload, 
  CheckCircle, 
  AlertTriangle, 
  Clock, 
  DollarSign,
  Shield,
  BookOpen,
  ArrowRight,
  Download,
  Eye
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function DocumentReviewPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [analysis, setAnalysis] = useState<any>(null);
  const [documentType, setDocumentType] = useState("");
  const router = useRouter();

  const documentTypes = [
    { id: "pet-agreement", name: "Pet Agreement", description: "Pet policies and fees" },
    { id: "utility-agreement", name: "Utility Agreement", description: "Utility responsibilities and billing" },
    { id: "parking-agreement", name: "Parking Agreement", description: "Parking spaces and fees" },
    { id: "addendum", name: "Lease Addendum", description: "Additional lease terms" },
    { id: "maintenance", name: "Maintenance Policy", description: "Repair and maintenance procedures" },
    { id: "other", name: "Other Document", description: "Other lease-related documents" }
  ];

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === "application/pdf") {
      setSelectedFile(file);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile || !documentType) return;

    setIsUploading(true);
    
    // Simulate AI analysis
    setTimeout(() => {
      const mockAnalysis = {
        documentType: documentTypes.find(d => d.id === documentType)?.name,
        summary: "This document outlines the terms and conditions for pet ownership in the rental property.",
        keyPoints: [
          "Pet deposit required: $500",
          "Maximum 2 pets allowed",
          "Pet rent: $25/month per pet",
          "Breed restrictions apply",
          "Pet must be registered with management"
        ],
        risks: [
          "High pet deposit may be negotiable",
          "Breed restrictions could be discriminatory",
          "No clear policy on pet damage repairs"
        ],
        recommendations: [
          "Negotiate lower pet deposit",
          "Request clarification on breed restrictions",
          "Ask about pet damage repair policies",
          "Get pet policies in writing"
        ],
        compliance: [
          "✅ Pet deposit within legal limits",
          "⚠️ Breed restrictions need verification",
          "✅ Pet rent is reasonable",
          "✅ Registration requirement is standard"
        ],
        redFlags: [
          "Vague language about pet damage",
          "No clear process for deposit return"
        ]
      };
      
      setAnalysis(mockAnalysis);
      setIsUploading(false);
    }, 3000);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Document Review Service
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Get AI-powered analysis of additional lease documents. Understand the implications and identify potential issues.
        </p>
      </div>

      {/* Pricing Card */}
      <Card className="mb-8 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center">
            <DollarSign className="w-6 h-6 mr-2 text-blue-600" />
            $19.99 per Document
          </CardTitle>
          <CardDescription>
            Professional AI review with legal insights and recommendations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4 text-center">
            <div className="p-4 bg-white rounded-lg">
              <Clock className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <h4 className="font-semibold">Fast Analysis</h4>
              <p className="text-sm text-gray-600">Results in under 5 minutes</p>
            </div>
            <div className="p-4 bg-white rounded-lg">
              <Shield className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <h4 className="font-semibold">Legal Insights</h4>
              <p className="text-sm text-gray-600">Compliance and risk assessment</p>
            </div>
            <div className="p-4 bg-white rounded-lg">
              <BookOpen className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <h4 className="font-semibold">Expert Guidance</h4>
              <p className="text-sm text-gray-600">Actionable recommendations</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Document Upload */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Upload className="w-5 h-5 mr-2" />
            Upload Document for Review
          </CardTitle>
          <CardDescription>
            Select the document type and upload your PDF for AI analysis
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Document Type Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Document Type
            </label>
            <div className="grid md:grid-cols-2 gap-3">
              {documentTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setDocumentType(type.id)}
                  className={`p-4 border rounded-lg text-left transition-colors ${
                    documentType === type.id
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <h4 className="font-medium text-gray-900">{type.name}</h4>
                  <p className="text-sm text-gray-600">{type.description}</p>
                </button>
              ))}
            </div>
          </div>

          {/* File Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Upload PDF Document
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <input
                type="file"
                accept=".pdf"
                onChange={handleFileSelect}
                className="hidden"
                id="file-upload"
              />
              <label htmlFor="file-upload" className="cursor-pointer">
                <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-600">
                  {selectedFile ? selectedFile.name : "Click to select PDF file"}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  Maximum file size: 10MB
                </p>
              </label>
            </div>
          </div>

          {/* Upload Button */}
          <Button
            onClick={handleUpload}
            disabled={!selectedFile || !documentType || isUploading}
            className="w-full"
            size="lg"
          >
            {isUploading ? (
              <>
                <Clock className="w-4 h-4 mr-2 animate-spin" />
                Analyzing Document...
              </>
            ) : (
              <>
                <Eye className="w-4 h-4 mr-2" />
                Review Document ($19.99)
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Analysis Results */}
      {analysis && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="w-5 h-5 mr-2" />
                Document Analysis: {analysis.documentType}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Summary */}
              <div>
                <h4 className="font-semibold mb-3">Document Summary</h4>
                <p className="text-gray-700 bg-gray-50 p-4 rounded-lg">
                  {analysis.summary}
                </p>
              </div>

              {/* Key Points */}
              <div>
                <h4 className="font-semibold mb-3 flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  Key Points
                </h4>
                <div className="grid md:grid-cols-2 gap-3">
                  {analysis.keyPoints.map((point: string, index: number) => (
                    <div key={index} className="p-3 bg-green-50 border border-green-200 rounded-lg text-sm">
                      {point}
                    </div>
                  ))}
                </div>
              </div>

              {/* Compliance Check */}
              <div>
                <h4 className="font-semibold mb-3">Compliance Analysis</h4>
                <div className="space-y-2">
                  {analysis.compliance.map((item: string, index: number) => (
                    <div key={index} className="flex items-center p-2 bg-gray-50 rounded">
                      <span className="text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Risks */}
              <div>
                <h4 className="font-semibold mb-3 flex items-center">
                  <AlertTriangle className="w-4 h-4 text-orange-500 mr-2" />
                  Potential Risks
                </h4>
                <div className="grid md:grid-cols-2 gap-3">
                  {analysis.risks.map((risk: string, index: number) => (
                    <div key={index} className="p-3 bg-orange-50 border border-orange-200 rounded-lg text-sm">
                      {risk}
                    </div>
                  ))}
                </div>
              </div>

              {/* Red Flags */}
              {analysis.redFlags.length > 0 && (
                <div>
                  <h4 className="font-semibold mb-3 flex items-center text-red-600">
                    <AlertTriangle className="w-4 h-4 mr-2" />
                    Red Flags
                  </h4>
                  <div className="grid md:grid-cols-2 gap-3">
                    {analysis.redFlags.map((flag: string, index: number) => (
                      <div key={index} className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
                        {flag}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Recommendations */}
              <div>
                <h4 className="font-semibold mb-3">Recommendations</h4>
                <ul className="space-y-2">
                  {analysis.recommendations.map((rec: string, index: number) => (
                    <li key={index} className="flex items-start text-sm">
                      <ArrowRight className="w-3 h-3 text-blue-500 mr-2 mt-1 flex-shrink-0" />
                      {rec}
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 justify-center">
            <Button 
              onClick={() => router.push('/upload')}
              variant="outline"
              className="flex items-center"
            >
              <Upload className="w-4 h-4 mr-2" />
              Review Another Document
            </Button>
            
            <Button 
              onClick={() => router.push('/legal-consultation')}
              className="flex items-center"
            >
              <Shield className="w-4 h-4 mr-2" />
              Get Legal Help
            </Button>
            
            <Button 
              variant="outline"
              className="flex items-center"
            >
              <Download className="w-4 h-4 mr-2" />
              Download Report
            </Button>
          </div>
        </div>
      )}

      {/* Additional Services */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold text-center mb-6">Other Services</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="w-5 h-5 mr-2" />
                Premium Lease Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900 mb-2">$9.99</div>
              <p className="text-sm text-gray-600 mb-4">
                In-depth analysis of your main lease agreement with legal insights.
              </p>
              <Button onClick={() => router.push('/upload')} className="w-full">
                Get Started
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="w-5 h-5 mr-2" />
                Legal Consultation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900 mb-2">$29.99</div>
              <p className="text-sm text-gray-600 mb-4">
                AI-powered legal analysis with resource referrals and guidance.
              </p>
              <Button onClick={() => router.push('/legal-consultation')} className="w-full">
                Learn More
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BookOpen className="w-5 h-5 mr-2" />
                Tenant Education
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900 mb-2">$49.99</div>
              <p className="text-sm text-gray-600 mb-4">
                Comprehensive tenant rights courses and legal guides.
              </p>
              <Button onClick={() => router.push('/learn')} className="w-full">
                View Courses
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Disclaimer */}
      <Alert className="mt-8">
        <AlertTriangle className="w-4 h-4" />
        <AlertDescription>
          <strong>Legal Disclaimer:</strong> This document review is for educational purposes only and does not constitute legal advice. 
          For specific legal advice, please consult with a qualified attorney in your jurisdiction. 
          The analysis provided is for informational purposes and does not create an attorney-client relationship.
        </AlertDescription>
      </Alert>

      {/* Compliance Notice */}
      <Alert className="mt-4 bg-yellow-50 border-yellow-200">
        <AlertTriangle className="w-4 h-4 text-yellow-600" />
        <AlertDescription className="text-yellow-800">
          <strong>Important Compliance Notice:</strong> 
          <ul className="mt-2 space-y-1 text-sm">
            <li>• This service provides educational analysis, not legal advice</li>
            <li>• We are not attorneys and cannot provide legal representation</li>
            <li>• Document analysis is based on general legal principles</li>
            <li>• State-specific laws may vary - consult local legal resources</li>
            <li>• For legal disputes, consult with a licensed attorney</li>
            <li>• Analysis may not be current or applicable to your situation</li>
          </ul>
        </AlertDescription>
      </Alert>

      {/* Service Limitations */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="text-lg">Service Limitations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm">
            <div className="flex items-start">
              <AlertTriangle className="w-4 h-4 text-orange-500 mr-2 mt-0.5 flex-shrink-0" />
              <div>
                <strong>Not Legal Advice:</strong> Our analysis is educational and informational only
              </div>
            </div>
            <div className="flex items-start">
              <AlertTriangle className="w-4 h-4 text-orange-500 mr-2 mt-0.5 flex-shrink-0" />
              <div>
                <strong>State Variations:</strong> Laws vary by state - verify with local resources
              </div>
            </div>
            <div className="flex items-start">
              <AlertTriangle className="w-4 h-4 text-orange-500 mr-2 mt-0.5 flex-shrink-0" />
              <div>
                <strong>No Attorney-Client Relationship:</strong> We are not your legal counsel
              </div>
            </div>
            <div className="flex items-start">
              <AlertTriangle className="w-4 h-4 text-orange-500 mr-2 mt-0.5 flex-shrink-0" />
              <div>
                <strong>Timeliness:</strong> Legal information may not reflect current laws
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 