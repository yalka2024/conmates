"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  CheckCircle,
  Calendar,
  Clock,
  Video,
  Phone,
  FileText,
  ArrowRight,
  Home
} from "lucide-react";
import Link from "next/link";

export default function ConsultationConfirmationPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Success Message */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Consultation Booked Successfully!
          </h1>
          <p className="text-lg text-gray-600">
            Your lawyer consultation has been scheduled. You'll receive a confirmation email shortly.
          </p>
        </div>

        {/* Consultation Details */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Consultation Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Date:</span>
                <span className="font-medium">January 15, 2025</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Time:</span>
                <span className="font-medium">2:00 PM EST</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Type:</span>
                <div className="flex items-center">
                  <Video className="w-4 h-4 mr-2" />
                  <span className="font-medium">Video Consultation</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Duration:</span>
                <span className="font-medium">30 minutes</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Attorney:</span>
                <span className="font-medium">Licensed Tenant Rights Attorney</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Next Steps */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>What Happens Next</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-sm font-medium text-blue-600">1</span>
                </div>
                <div>
                  <h4 className="font-medium">Confirmation Email</h4>
                  <p className="text-sm text-gray-600">
                    You'll receive a detailed confirmation email with Zoom link and preparation instructions.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-sm font-medium text-blue-600">2</span>
                </div>
                <div>
                  <h4 className="font-medium">Document Upload</h4>
                  <p className="text-sm text-gray-600">
                    Upload your lease agreement and any relevant documents for the attorney to review.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-sm font-medium text-blue-600">3</span>
                </div>
                <div>
                  <h4 className="font-medium">Consultation</h4>
                  <p className="text-sm text-gray-600">
                    Join the video call at your scheduled time for your 30-minute consultation.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-sm font-medium text-blue-600">4</span>
                </div>
                <div>
                  <h4 className="font-medium">Follow-up</h4>
                  <p className="text-sm text-gray-600">
                    Receive a summary email with key points discussed and next steps.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Button asChild className="flex-1">
            <Link href="/upload">
              <FileText className="w-4 h-4 mr-2" />
              Upload Documents
            </Link>
          </Button>
          <Button asChild variant="outline" className="flex-1">
            <Link href="/">
              <Home className="w-4 h-4 mr-2" />
              Return Home
            </Link>
          </Button>
        </div>

        {/* Additional Services */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>While You Wait</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 border rounded-lg">
                <h4 className="font-medium mb-2">AI Lease Analysis</h4>
                <p className="text-sm text-gray-600 mb-3">
                  Get instant analysis of your lease while waiting for your consultation.
                </p>
                <Button asChild size="sm">
                  <Link href="/upload">
                    Analyze Lease
                    <ArrowRight className="w-3 h-3 ml-1" />
                  </Link>
                </Button>
              </div>
              <div className="p-4 border rounded-lg">
                <h4 className="font-medium mb-2">Educational Courses</h4>
                <p className="text-sm text-gray-600 mb-3">
                  Learn about tenant rights and prepare for your consultation.
                </p>
                <Button asChild size="sm">
                  <Link href="/courses">
                    Browse Courses
                    <ArrowRight className="w-3 h-3 ml-1" />
                  </Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 