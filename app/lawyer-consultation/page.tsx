"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Scale, 
  Users, 
  Calendar,
  Clock,
  Phone,
  Video,
  FileText,
  CheckCircle,
  AlertTriangle,
  ArrowLeft
} from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LawyerConsultationPage() {
  const [bookingForm, setBookingForm] = useState({
    name: "",
    email: "",
    phone: "",
    state: "",
    consultationType: "",
    preferredDate: "",
    preferredTime: "",
    issue: "",
    documents: []
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
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

  const consultationTypes = [
    { id: "video", name: "Video Consultation", icon: Video, description: "Face-to-face via Zoom" },
    { id: "phone", name: "Phone Consultation", icon: Phone, description: "Audio-only consultation" }
  ];

  const timeSlots = [
    "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
    "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM"
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate booking process
    setTimeout(() => {
      setIsSubmitting(false);
      // Redirect to confirmation page
      router.push('/lawyer-consultation/confirmation');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Button asChild variant="outline" className="mb-4">
            <Link href="/legal-consultation">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Legal Services
            </Link>
          </Button>
          
          <div className="text-center">
            <Badge variant="secondary" className="mb-4">
              <Scale className="w-4 h-4 mr-2" />
              Licensed Attorney Consultation
            </Badge>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Book Your Lawyer Consultation
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Schedule a 30-minute consultation with a licensed tenant rights attorney in your state.
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Booking Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Consultation Details</CardTitle>
                <CardDescription>
                  Fill out the form below to schedule your consultation
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Personal Information */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        value={bookingForm.name}
                        onChange={(e) => setBookingForm(prev => ({ ...prev, name: e.target.value }))}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={bookingForm.email}
                        onChange={(e) => setBookingForm(prev => ({ ...prev, email: e.target.value }))}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        value={bookingForm.phone}
                        onChange={(e) => setBookingForm(prev => ({ ...prev, phone: e.target.value }))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="state">State *</Label>
                      <Select value={bookingForm.state} onValueChange={(value) => setBookingForm(prev => ({ ...prev, state: value }))}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your state" />
                        </SelectTrigger>
                        <SelectContent>
                          {states.map((state) => (
                            <SelectItem key={state.code} value={state.code}>
                              {state.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Consultation Type */}
                  <div className="space-y-2">
                    <Label>Consultation Type *</Label>
                    <div className="grid md:grid-cols-2 gap-4">
                      {consultationTypes.map((type) => (
                        <div
                          key={type.id}
                          className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                            bookingForm.consultationType === type.id
                              ? 'border-blue-500 bg-blue-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                          onClick={() => setBookingForm(prev => ({ ...prev, consultationType: type.id }))}
                        >
                          <div className="flex items-center space-x-3">
                            <type.icon className="w-5 h-5 text-blue-600" />
                            <div>
                              <h4 className="font-medium">{type.name}</h4>
                              <p className="text-sm text-gray-600">{type.description}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Date and Time */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="date">Preferred Date *</Label>
                      <Input
                        id="date"
                        type="date"
                        value={bookingForm.preferredDate}
                        onChange={(e) => setBookingForm(prev => ({ ...prev, preferredDate: e.target.value }))}
                        min={new Date().toISOString().split('T')[0]}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="time">Preferred Time *</Label>
                      <Select value={bookingForm.preferredTime} onValueChange={(value) => setBookingForm(prev => ({ ...prev, preferredTime: value }))}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select time" />
                        </SelectTrigger>
                        <SelectContent>
                          {timeSlots.map((time) => (
                            <SelectItem key={time} value={time}>
                              {time}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Issue Description */}
                  <div className="space-y-2">
                    <Label htmlFor="issue">Brief Description of Your Issue *</Label>
                    <Textarea
                      id="issue"
                      placeholder="Describe your tenant rights issue, lease problem, or legal question..."
                      value={bookingForm.issue}
                      onChange={(e) => setBookingForm(prev => ({ ...prev, issue: e.target.value }))}
                      rows={4}
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <Clock className="w-4 h-4 mr-2 animate-spin" />
                        Booking Consultation...
                      </>
                    ) : (
                      <>
                        <Calendar className="w-4 h-4 mr-2" />
                        Book Consultation - $150
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* What's Included */}
            <Card>
              <CardHeader>
                <CardTitle>What's Included</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" />
                    <span className="text-sm">30-minute consultation</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" />
                    <span className="text-sm">Document review (up to 3 documents)</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" />
                    <span className="text-sm">Legal advice and strategy</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" />
                    <span className="text-sm">Follow-up email summary</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" />
                    <span className="text-sm">Attorney-client privilege</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Attorney Profile */}
            <Card>
              <CardHeader>
                <CardTitle>Your Attorney</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Scale className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="font-semibold">Licensed Tenant Rights Attorney</h3>
                  <p className="text-sm text-gray-600 mb-2">Specializing in tenant law</p>
                  <p className="text-sm text-gray-600">
                    Experienced attorney licensed in your state with expertise in tenant rights, 
                    lease disputes, and housing law.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Cancellation Policy */}
            <Card>
              <CardHeader>
                <CardTitle>Cancellation Policy</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  Free cancellation up to 24 hours before your scheduled consultation. 
                  No-shows and late cancellations may be charged the full consultation fee.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Disclaimer */}
        <Alert className="mt-8">
          <AlertTriangle className="w-4 h-4" />
          <AlertDescription>
            <strong>Important:</strong> This consultation creates an attorney-client relationship. 
            The attorney will provide legal advice specific to your situation. 
            This service is not available in all states and is subject to attorney availability.
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
} 