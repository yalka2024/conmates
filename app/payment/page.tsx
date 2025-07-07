"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Shield, CreditCard, Loader2, Star, Crown, Users, ArrowRight } from "lucide-react"
import { useLanguage } from "@/components/language-provider"
import { useSearchParams } from "next/navigation"
import { useRouter } from "next/navigation"
import { toast } from "@/components/ui/use-toast"

const plans = [
  {
    id: "basic-analysis",
    name: "Basic Analysis",
    price: "Free",
    description: "Quick lease overview and basic insights",
    features: [
      "Basic lease summary",
      "Key terms extraction", 
      "Red flag detection",
      "General recommendations"
    ],
    popular: false,
    icon: Shield
  },
  {
    id: "premium-analysis", 
    name: "Premium Analysis",
    price: "$9.99",
    description: "Comprehensive legal analysis and personalized insights",
    features: [
      "Everything in Basic",
      "In-depth legal analysis",
      "State-specific law review",
      "Negotiation suggestions",
      "Custom Q&A with AI",
      "Priority support"
    ],
    popular: true,
    icon: Crown
  },
  {
    id: "lawyer-consultation",
    name: "Real Lawyer Consultation",
    price: "$150", 
    description: "30-minute consultation with licensed tenant rights attorney",
    features: [
      "Video or phone consultation",
      "Document review and analysis",
      "Legal advice and strategy",
      "Follow-up email summary",
      "Attorney-client privilege",
      "Licensed attorney in your state"
    ],
    popular: false,
    icon: Users
  }
]

export default function PaymentPage() {
  const { t } = useLanguage()
  const [selectedPlan, setSelectedPlan] = useState<string>("premium-analysis")
  const [formData, setFormData] = useState({
    email: "",
    name: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [paymentAvailable, setPaymentAvailable] = useState(true)
  const searchParams = useSearchParams()
  const router = useRouter()

  useEffect(() => {
    const plan = searchParams.get('plan')
    if (plan) {
      setSelectedPlan(plan)
    }
  }, [searchParams])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handlePurchase = async (planId: string) => {
    if (planId === "lawyer-consultation") {
      // Redirect to lawyer consultation booking page
      router.push('/lawyer-consultation');
      return;
    }
    
    try {
      setIsLoading(true);
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ planId }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        
        // Handle specific Stripe configuration errors
        if (response.status === 503 && errorData.code) {
          setPaymentAvailable(false);
          switch (errorData.code) {
            case 'STRIPE_NOT_CONFIGURED':
            case 'STRIPE_INITIALIZATION_FAILED':
            case 'STRIPE_CONFIGURATION_ERROR':
              toast({
                title: "Payment Processing Unavailable",
                description: "Payment processing is currently unavailable. Please contact support for assistance.",
                variant: "destructive",
              });
              return;
            default:
              break;
          }
        }
        
        throw new Error(errorData.error || 'Failed to create checkout session');
      }

      const { url } = await response.json();
      window.location.href = url;
    } catch (error) {
      console.error('Error creating checkout session:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to create checkout session. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const selectedPlanData = plans.find(p => p.id === selectedPlan)

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {t('payment.completeYourPurchase')}
            </h1>
            <p className="text-lg text-gray-600">
              Choose the plan that works best for you
            </p>
          </div>

          {/* Payment Processing Status */}
          {!paymentAvailable && (
            <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex items-center space-x-3">
                <Shield className="w-5 h-5 text-yellow-600" />
                <div>
                  <h4 className="font-medium text-yellow-900">Payment Processing Temporarily Unavailable</h4>
                  <p className="text-sm text-yellow-800 mt-1">
                    We're currently experiencing issues with our payment system. Please contact support for assistance or try again later.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {plans.map((plan) => {
              const Icon = plan.icon
              return (
                <Card 
                  key={plan.id}
                  className={`relative cursor-pointer transition-all ${
                    selectedPlan === plan.id 
                      ? "border-blue-500 shadow-lg scale-105" 
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                  onClick={() => setSelectedPlan(plan.id)}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-blue-500 text-white px-3 py-1">
                        <Star className="w-3 h-3 mr-1" />
                        Most Popular
                      </Badge>
                    </div>
                  )}
                  
                  <CardHeader className="text-center">
                    <div className="flex justify-center mb-2">
                      <Icon className="w-8 h-8 text-blue-600" />
                    </div>
                    <CardTitle className="text-xl">{plan.name}</CardTitle>
                    <CardDescription>{plan.description}</CardDescription>
                    <div className="text-3xl font-bold text-gray-900 mt-2">
                      {plan.price}
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <ul className="space-y-3">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-center text-sm">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* Selected Plan Details */}
          {selectedPlanData && (
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <ArrowRight className="w-5 h-5 mr-2" />
                  Selected Plan: {selectedPlanData.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-2">What you'll get:</h4>
                    <ul className="space-y-2">
                      {selectedPlanData.features.map((feature, index) => (
                        <li key={index} className="flex items-center text-sm">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Plan Details:</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Plan:</span>
                        <span className="font-medium">{selectedPlanData.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Price:</span>
                        <span className="font-medium">{selectedPlanData.price}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Type:</span>
                        <span className="font-medium">
                          {selectedPlanData.id === "basic-analysis" ? "Free" : "One-time payment"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Payment Form */}
          <Card className="shadow-lg">
            <CardHeader className="text-center">
              <CardTitle>Complete Your Purchase</CardTitle>
              <p className="text-gray-600">
                {selectedPlan === 'one-time' ? 'One-time payment of $10.00' : 'Monthly subscription of $15.00'}
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email"
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                    className="mt-1"
                  />
                </div>

                <Button
                  type="button"
                  onClick={() => handlePurchase(selectedPlan)}
                  disabled={isLoading || selectedPlan === "basic-analysis" || !paymentAvailable}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <div className="flex items-center space-x-2">
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Processing...</span>
                    </div>
                  ) : selectedPlan === "basic-analysis" ? (
                    "Free - No Payment Required"
                  ) : !paymentAvailable ? (
                    <div className="flex items-center space-x-2">
                      <Shield className="w-5 h-5" />
                      <span>Payment Unavailable</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <CreditCard className="w-5 h-5" />
                      <span>
                        {selectedPlan === 'one-time' ? 'Pay $10.00' : 'Subscribe for $15.00/month'}
                      </span>
                    </div>
                  )}
                </Button>
              </div>

              {/* Security Notice */}
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <div className="flex items-start space-x-3">
                  <Shield className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-blue-900">Secure Payment</h4>
                    <p className="text-sm text-blue-800 mt-1">
                      Your payment is secure, and we never store your financial data. All transactions are processed through Stripe&apos;s secure servers.
                    </p>
                  </div>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="mt-6 flex items-center justify-center space-x-4 text-xs text-gray-500">
                <div className="flex items-center space-x-1">
                  <Shield className="w-4 h-4" />
                  <span>SSL Encrypted</span>
                </div>
                <div className="flex items-center space-x-1">
                  <CreditCard className="w-4 h-4" />
                  <span>Powered by Stripe</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Additional Services */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-center mb-6">Additional Services</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Shield className="w-5 h-5 mr-2" />
                    Document Review
                  </CardTitle>
                  <CardDescription>
                    Professional review of additional lease documents
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-gray-900 mb-2">$19.99</div>
                  <p className="text-sm text-gray-600 mb-4">
                    Get expert review of lease addendums, pet agreements, or other related documents.
                  </p>
                  <Button variant="outline" className="w-full">
                    Add to Cart
                  </Button>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Users className="w-5 h-5 mr-2" />
                    Legal Consultation
                  </CardTitle>
                  <CardDescription>
                    Extended consultation with real estate attorney
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-gray-900 mb-2">$49.99</div>
                  <p className="text-sm text-gray-600 mb-4">
                    30-minute consultation for complex lease issues or negotiation support.
                  </p>
                  <Button variant="outline" className="w-full">
                    Add to Cart
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
