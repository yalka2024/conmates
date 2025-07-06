import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  GraduationCap, 
  Play, 
  Clock, 
  Users, 
  Star,
  CheckCircle,
  ArrowRight,
  BookOpen,
  Shield,
  Target,
  Gift,
  Zap
} from "lucide-react";
import Link from "next/link";

export default function CoursesPage() {
  const courses = [
    {
      id: "tenant-rights-101",
      title: "Tenant Rights 101",
      description: "Learn your fundamental rights as a tenant and how to protect them",
      price: 99,
      duration: "2 hours",
      lessons: 12,
      students: 1250,
      rating: 4.8,
      features: [
        "Understanding lease agreements",
        "Security deposit rights",
        "Repair and maintenance obligations",
        "Eviction protection",
        "Rent increase regulations",
        "Privacy rights"
      ],
      level: "Beginner",
      achievement: true
    },
    {
      id: "lease-negotiation",
      title: "Lease Negotiation Mastery",
      description: "Master the art of negotiating better lease terms and conditions",
      price: 149,
      duration: "3 hours",
      lessons: 18,
      students: 890,
      rating: 4.9,
      features: [
        "Negotiation strategies",
        "Common lease terms to modify",
        "Rent negotiation tactics",
        "Pet policy negotiations",
        "Utility responsibility discussions",
        "Lease renewal strategies"
      ],
      level: "Intermediate",
      achievement: true
    },
    {
      id: "legal-compliance",
      title: "Legal Compliance for Tenants",
      description: "Understand state-specific laws and compliance requirements",
      price: 129,
      duration: "2.5 hours",
      lessons: 15,
      students: 650,
      rating: 4.7,
      features: [
        "State-specific tenant laws",
        "Fair housing regulations",
        "Habitability standards",
        "Retaliation protection",
        "Legal documentation",
        "When to seek legal help"
      ],
      level: "Advanced",
      achievement: true
    }
  ];

  const bundles = [
    {
      id: "complete-bundle",
      title: "Complete Tenant Education Bundle",
      description: "All three courses plus bonus materials and live Q&A sessions",
      price: 227,
      originalPrice: 377,
      savings: 150,
      features: [
        "All 3 courses included",
        "1-on-1 legal consultation",
        "Document templates library",
        "Priority support access",
        "Monthly legal updates",
        "Lifetime access"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">
            <GraduationCap className="w-4 h-4 mr-2" />
            Educational Courses
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Master Your Tenant Rights
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Learn from expert-curated courses designed to help you understand your rights, 
            negotiate better leases, and protect yourself as a tenant.
          </p>
        </div>

        {/* Course Bundle - Featured */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-green-600 text-white">
              <Gift className="w-4 h-4 mr-2" />
              BEST VALUE
            </Badge>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Complete Bundle</h2>
            <p className="text-xl text-gray-600">Get everything at a massive discount</p>
          </div>

          <div className="max-w-4xl mx-auto">
            {bundles.map((bundle) => (
              <Card key={bundle.id} className="border-0 shadow-lg bg-gradient-to-r from-green-600 to-blue-600 text-white">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-2xl mb-2">{bundle.title}</CardTitle>
                      <p className="text-green-100">{bundle.description}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-4xl font-bold">${bundle.price}</div>
                      <div className="text-green-200 line-through">${bundle.originalPrice}</div>
                      <Badge className="bg-green-500 text-white mt-2">Save ${bundle.savings}</Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-3">Bundle includes:</h4>
                      <ul className="space-y-2">
                        {bundle.features.map((feature, index) => (
                          <li key={index} className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-300 mr-2" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="text-center">
                      <Button asChild size="lg" className="w-full bg-white text-green-600 hover:bg-gray-100">
                        <Link href="/courses/bundle">
                          <Zap className="w-5 h-5 mr-2" />
                          Get Complete Bundle
                        </Link>
                      </Button>
                      <p className="text-sm text-green-200 mt-2">30-day money-back guarantee</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Individual Courses */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Individual Courses</h2>
            <p className="text-xl text-gray-600">Choose the course that fits your needs</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course) => (
              <Card key={course.id} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline">{course.level}</Badge>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-500 mr-1" />
                      <span className="text-sm font-medium">{course.rating}</span>
                    </div>
                  </div>
                  <CardTitle className="text-xl">{course.title}</CardTitle>
                  <p className="text-gray-600">{course.description}</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="text-3xl font-bold text-green-600">${course.price}</div>
                      <div className="text-right">
                        <div className="text-sm text-gray-500">Duration</div>
                        <div className="font-medium">{course.duration}</div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <div className="flex items-center">
                        <Play className="w-4 h-4 mr-1" />
                        {course.lessons} lessons
                      </div>
                      <div className="flex items-center">
                        <Users className="w-4 h-4 mr-1" />
                        {course.students} students
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2">What you'll learn:</h4>
                      <ul className="space-y-1 text-sm">
                        {course.features.slice(0, 3).map((feature, index) => (
                          <li key={index} className="flex items-center">
                            <CheckCircle className="w-3 h-3 text-green-500 mr-2" />
                            {feature}
                          </li>
                        ))}
                        {course.features.length > 3 && (
                          <li className="text-blue-600 text-sm">
                            +{course.features.length - 3} more topics
                          </li>
                        )}
                      </ul>
                    </div>

                    <Button asChild className="w-full">
                      <Link href={`/courses/${course.id}`}>
                        View Course
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Why Choose Our Courses */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Our Courses?</h2>
            <p className="text-xl text-gray-600">Expert-led education designed for real results</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center border-0 shadow-lg">
              <CardContent className="pt-6">
                <Shield className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Expert Instructors</h3>
                <p className="text-gray-600">
                  Learn from experienced attorneys and tenant rights specialists who have helped thousands of tenants.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-0 shadow-lg">
              <CardContent className="pt-6">
                <Target className="w-12 h-12 text-green-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Practical Knowledge</h3>
                <p className="text-gray-600">
                  Get actionable strategies and real-world examples you can apply immediately to your situation.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-0 shadow-lg">
              <CardContent className="pt-6">
                <BookOpen className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Comprehensive Resources</h3>
                <p className="text-gray-600">
                  Access downloadable templates, checklists, and legal resources to support your learning.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center">
          <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white">
            <CardContent className="pt-8 pb-8">
              <h2 className="text-3xl font-bold mb-4">Ready to Protect Your Rights?</h2>
              <p className="text-xl text-blue-100 mb-6">
                Join thousands of tenants who have already learned how to protect themselves and save money.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                  <Link href="/courses/bundle">
                    Get Complete Bundle
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
                  <Link href="/courses">
                    Browse Individual Courses
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