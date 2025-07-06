import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft,
  Star,
  Users,
  Clock,
  BookOpen,
  CheckCircle,
  Gift,
  Shield,
  TrendingUp,
  Scale,
  Zap,
  Award
} from "lucide-react";
import Link from "next/link";

export default function CourseBundlePage() {
  const bundleData = {
    title: "Complete Tenant Education Bundle",
    description: "Master everything you need to know about tenant rights, lease negotiation, and legal compliance. Save 40% when you buy all courses together!",
    originalPrice: 377,
    bundlePrice: 227,
    savings: 150,
    courses: [
      {
        title: "Tenant Rights 101",
        description: "Master the fundamentals of tenant rights and learn how to protect yourself in any rental situation.",
        price: 99,
        duration: "2 hours",
        lessons: 12,
        students: 1250,
        rating: 4.8,
        instructor: "Sarah Johnson, Esq.",
        icon: Shield,
        color: "blue"
      },
      {
        title: "Lease Negotiation Mastery",
        description: "Learn proven strategies to negotiate better lease terms and save money on your rental agreement.",
        price: 149,
        duration: "3 hours",
        lessons: 18,
        students: 890,
        rating: 4.9,
        instructor: "Michael Chen, Esq.",
        icon: TrendingUp,
        color: "green"
      },
      {
        title: "Legal Compliance for Tenants",
        description: "Understand state-specific laws and compliance requirements to protect your rights and avoid legal issues.",
        price: 129,
        duration: "2.5 hours",
        lessons: 15,
        students: 650,
        rating: 4.7,
        instructor: "Jennifer Rodriguez, Esq.",
        icon: Scale,
        color: "purple"
      }
    ],
    bonuses: [
      {
        title: "AI-Powered Legal Analysis",
        description: "Comprehensive AI analysis of your lease with personalized recommendations",
        value: 150
      },
      {
        title: "Document Templates Library",
        description: "Access to 50+ legal document templates",
        value: 99
      },
      {
        title: "Priority Support",
        description: "Direct access to our legal support team",
        value: 75
      },
      {
        title: "Monthly Legal Updates",
        description: "Stay current with changing tenant laws",
        value: 50
      }
    ],
    totalValue: 850,
    features: [
      "Lifetime access to all courses",
      "Downloadable resources and templates",
      "Certificate of completion",
      "Mobile-friendly learning",
      "Community forum access",
      "30-day money-back guarantee"
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Button asChild variant="outline" className="mb-4">
            <Link href="/courses">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Courses
            </Link>
          </Button>
          
          <div className="text-center mb-8">
            <Badge variant="secondary" className="mb-4">BEST VALUE</Badge>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{bundleData.title}</h1>
            <p className="text-xl text-gray-600 mb-6 max-w-3xl mx-auto">{bundleData.description}</p>
            
            <div className="flex items-center justify-center space-x-6 text-sm text-gray-600 mb-8">
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                7.5 hours total
              </div>
              <div className="flex items-center">
                <BookOpen className="w-4 h-4 mr-2" />
                45 lessons
              </div>
              <div className="flex items-center">
                <Users className="w-4 h-4 mr-2" />
                2,790 students
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Pricing Card */}
            <Card className="border-2 border-green-200 bg-green-50">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Bundle Pricing</span>
                  <Badge className="bg-green-600 text-white">Save ${bundleData.savings}</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center space-y-4">
                  <div className="flex items-center justify-center space-x-4">
                    <span className="text-3xl line-through text-gray-500">${bundleData.originalPrice}</span>
                    <span className="text-5xl font-bold text-green-600">${bundleData.bundlePrice}</span>
                  </div>
                  <p className="text-sm text-gray-600">One-time payment • Lifetime access</p>
                  <Button size="lg" className="w-full bg-green-600 hover:bg-green-700">
                    <Zap className="w-5 h-5 mr-2" />
                    Get Complete Bundle
                  </Button>
                  <p className="text-xs text-gray-500">30-day money-back guarantee</p>
                </div>
              </CardContent>
            </Card>

            {/* Included Courses */}
            <Card>
              <CardHeader>
                <CardTitle>Included Courses</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {bundleData.courses.map((course, index) => {
                    const IconComponent = course.icon;
                    return (
                      <div key={index} className="flex items-start space-x-4 p-4 border rounded-lg">
                        <div className={`w-12 h-12 bg-${course.color}-100 rounded-lg flex items-center justify-center`}>
                          <IconComponent className={`w-6 h-6 text-${course.color}-600`} />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="font-semibold text-lg">{course.title}</h3>
                              <p className="text-gray-600 mb-2">{course.description}</p>
                              <div className="flex items-center space-x-4 text-sm text-gray-500">
                                <span className="flex items-center">
                                  <Clock className="w-4 h-4 mr-1" />
                                  {course.duration}
                                </span>
                                <span className="flex items-center">
                                  <BookOpen className="w-4 h-4 mr-1" />
                                  {course.lessons} lessons
                                </span>
                                <span className="flex items-center">
                                  <Star className="w-4 h-4 mr-1" />
                                  {course.rating}
                                </span>
                                <span className="flex items-center">
                                  <Users className="w-4 h-4 mr-1" />
                                  {course.students} students
                                </span>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-lg font-semibold text-green-600">Included</div>
                              <div className="text-sm text-gray-500 line-through">${course.price}</div>
                            </div>
                          </div>
                          <div className="mt-2 text-sm text-gray-600">
                            Instructor: {course.instructor}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Exclusive Bonuses */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Gift className="w-5 h-5 mr-2 text-purple-600" />
                  Exclusive Bonuses (${bundleData.totalValue - bundleData.originalPrice} Value)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {bundleData.bonuses.map((bonus, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Award className="w-5 h-5 text-purple-600" />
                        <div>
                          <h4 className="font-medium">{bonus.title}</h4>
                          <p className="text-sm text-gray-600">{bonus.description}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-semibold text-purple-600">FREE</div>
                        <div className="text-xs text-gray-500">${bonus.value} value</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Bundle Features */}
            <Card>
              <CardHeader>
                <CardTitle>Bundle Features</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {bundleData.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Value Proposition */}
            <Card className="bg-gradient-to-br from-green-50 to-blue-50">
              <CardHeader>
                <CardTitle className="text-center">Total Value</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="text-4xl font-bold text-green-600 mb-2">${bundleData.totalValue}</div>
                <p className="text-sm text-gray-600 mb-4">worth of education and resources</p>
                <div className="text-2xl font-bold text-green-600">${bundleData.bundlePrice}</div>
                <p className="text-sm text-gray-600">your price (73% savings)</p>
              </CardContent>
            </Card>

            {/* What You'll Learn */}
            <Card>
              <CardHeader>
                <CardTitle>What You'll Master</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" />
                    Complete understanding of tenant rights
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" />
                    Advanced negotiation strategies
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" />
                    Legal compliance knowledge
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" />
                    Document preparation skills
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" />
                    Conflict resolution techniques
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" />
                    Professional legal consultation
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Testimonials */}
            <Card>
              <CardHeader>
                <CardTitle>Student Success Stories</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center mb-2">
                      <Star className="w-4 h-4 text-yellow-500" />
                      <Star className="w-4 h-4 text-yellow-500" />
                      <Star className="w-4 h-4 text-yellow-500" />
                      <Star className="w-4 h-4 text-yellow-500" />
                      <Star className="w-4 h-4 text-yellow-500" />
                    </div>
                    <p className="text-sm text-gray-600 mb-2">
                      "This bundle saved me thousands in legal fees. I negotiated a $200/month rent reduction!"
                    </p>
                    <p className="text-xs text-gray-500">- Maria S., California</p>
                  </div>
                  
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center mb-2">
                      <Star className="w-4 h-4 text-yellow-500" />
                      <Star className="w-4 h-4 text-yellow-500" />
                      <Star className="w-4 h-4 text-yellow-500" />
                      <Star className="w-4 h-4 text-yellow-500" />
                      <Star className="w-4 h-4 text-yellow-500" />
                    </div>
                    <p className="text-sm text-gray-600 mb-2">
                      "The legal compliance course helped me win a discrimination case against my landlord."
                    </p>
                    <p className="text-xs text-gray-500">- James T., Texas</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Guarantee */}
            <Card className="border-green-200 bg-green-50">
              <CardHeader>
                <CardTitle className="text-center text-green-800">30-Day Guarantee</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <Shield className="w-12 h-12 text-green-600 mx-auto mb-3" />
                <p className="text-sm text-green-800">
                  Not satisfied? Get a full refund within 30 days. No questions asked.
                </p>
              </CardContent>
            </Card>

            {/* Real Lawyer Consultation Upgrade */}
            <Card className="border-blue-200 bg-blue-50">
              <CardHeader>
                <CardTitle className="text-center text-blue-800">Upgrade to Real Lawyer</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <Scale className="w-12 h-12 text-blue-600 mx-auto mb-3" />
                <div className="text-2xl font-bold text-blue-600 mb-2">+$150</div>
                <p className="text-sm text-blue-800 mb-3">
                  Add a 30-minute consultation with a licensed tenant rights attorney
                </p>
                <Button variant="outline" className="w-full border-blue-300 text-blue-700 hover:bg-blue-100">
                  Add Lawyer Consultation
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
} 