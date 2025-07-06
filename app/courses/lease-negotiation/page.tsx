import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import VideoPlaceholder from "@/components/video-placeholder";
import { 
  Play, 
  CheckCircle, 
  Clock, 
  BookOpen, 
  Download,
  ArrowLeft,
  ArrowRight,
  Lock,
  Star,
  Users,
  FileText,
  Shield,
  AlertTriangle,
  Target,
  Video,
  FileText as FileTextIcon,
  TrendingUp,
  DollarSign
} from "lucide-react";
import Link from "next/link";

export default function LeaseNegotiationPage() {
  const courseData = {
    title: "Lease Negotiation Mastery",
    description: "Learn proven strategies to negotiate better lease terms and save money on your rental agreement.",
    price: 149,
    duration: "3 hours",
    lessons: 15,
    students: 890,
    rating: 4.9,
    instructor: "Michael Chen, Esq.",
    instructorTitle: "Real Estate Attorney & Negotiation Expert",
    instructorBio: "Michael specializes in lease negotiations and has helped tenants save thousands of dollars through strategic bargaining.",
  };

  const lessons = [
    {
      id: 1,
      title: "Preparing for Negotiation",
      duration: "18:45",
      videoUrl: "/videos/negotiation-prep.mp4",
      description: "Essential preparation steps before entering lease negotiations.",
      materials: [
        "Negotiation Preparation Checklist",
        "Market Research Template",
        "Personal Budget Worksheet"
      ]
    },
    {
      id: 2,
      title: "Understanding Market Conditions",
      duration: "20:30",
      videoUrl: "/videos/market-conditions.mp4",
      description: "How to research local rental markets and use data to your advantage.",
      materials: [
        "Market Analysis Template",
        "Comparable Properties Tracker",
        "Seasonal Pricing Guide"
      ]
    },
    {
      id: 3,
      title: "Key Negotiable Terms",
      duration: "25:15",
      videoUrl: "/videos/negotiable-terms.mp4",
      description: "Identify which lease terms are most negotiable and how to approach them.",
      materials: [
        "Negotiable Terms Checklist",
        "Term Priority Matrix",
        "Compromise Strategy Guide"
      ]
    },
    {
      id: 4,
      title: "Effective Communication Strategies",
      duration: "22:40",
      videoUrl: "/videos/communication-strategies.mp4",
      description: "Professional communication techniques for successful negotiations.",
      materials: [
        "Communication Scripts",
        "Email Templates",
        "Follow-up Schedule"
      ]
    },
    {
      id: 5,
      title: "Handling Counteroffers",
      duration: "19:20",
      videoUrl: "/videos/counteroffers.mp4",
      description: "How to respond to landlord counteroffers and maintain your position.",
      materials: [
        "Counteroffer Response Templates",
        "Decision Matrix",
        "Walk-away Criteria"
      ]
    },
    {
      id: 6,
      title: "Closing the Deal",
      duration: "16:55",
      videoUrl: "/videos/closing-deal.mp4",
      description: "Finalizing your agreement and ensuring all terms are properly documented.",
      materials: [
        "Final Review Checklist",
        "Documentation Tracker",
        "Move-in Preparation Guide"
      ]
    }
  ];

  const completedLessons = 2;
  const totalLessons = courseData.lessons;
  const progress = (completedLessons / totalLessons) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Button asChild variant="outline" className="mb-4">
            <Link href="/courses">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Courses
            </Link>
          </Button>
          
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-2">
                <Badge variant="secondary">Intermediate</Badge>
                <div className="flex items-center">
                  <Star className="w-4 h-4 text-yellow-500 mr-1" />
                  <span className="text-sm font-medium">{courseData.rating}</span>
                </div>
                <span className="text-sm text-gray-500">({courseData.students} students)</span>
              </div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">{courseData.title}</h1>
              <p className="text-xl text-gray-600 mb-6">{courseData.description}</p>
              
              <div className="flex items-center space-x-6 text-sm text-gray-600">
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-2" />
                  {courseData.duration}
                </div>
                <div className="flex items-center">
                  <BookOpen className="w-4 h-4 mr-2" />
                  {courseData.lessons} lessons
                </div>
                <div className="flex items-center">
                  <Users className="w-4 h-4 mr-2" />
                  {courseData.students} enrolled
                </div>
              </div>
            </div>
            
            <div className="text-right">
              <div className="text-3xl font-bold text-green-600">${courseData.price}</div>
              <Button size="lg" className="mt-2">
                Enroll Now
              </Button>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Course Progress */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2" />
                  Your Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Course Progress</span>
                    <span className="text-sm text-gray-600">{completedLessons}/{totalLessons} lessons</span>
                  </div>
                  <Progress value={progress} className="w-full" />
                  <div className="text-sm text-gray-600">
                    {Math.round(progress)}% complete
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Course Modules */}
            <Card>
              <CardHeader>
                <CardTitle>Course Content</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {lessons.map((lesson) => (
                    <div key={lesson.id} className="border rounded-lg">
                      <div className="p-4 bg-gray-50 border-b">
                        <h3 className="font-semibold">{lesson.title}</h3>
                        <p className="text-sm text-gray-600">{lesson.duration}</p>
                      </div>
                      <div className="p-4">
                        <VideoPlaceholder
                          title={lesson.title}
                          duration={lesson.duration}
                          description={lesson.description}
                          materials={lesson.materials}
                          lessonNumber={lesson.id}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Instructor */}
            <Card>
              <CardHeader>
                <CardTitle>Instructor</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <TrendingUp className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="font-semibold">{courseData.instructor}</h3>
                  <p className="text-sm text-gray-600 mb-2">{courseData.instructorTitle}</p>
                  <p className="text-sm text-gray-600">{courseData.instructorBio}</p>
                </div>
              </CardContent>
            </Card>

            {/* Course Resources */}
            <Card>
              <CardHeader>
                <CardTitle>Course Resources</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {/* Add course resources here */}
                </div>
              </CardContent>
            </Card>

            {/* Course Features */}
            <Card>
              <CardHeader>
                <CardTitle>What You'll Learn</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" />
                    Master negotiation fundamentals and psychology
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" />
                    Negotiate lower rent and better terms
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" />
                    Reduce security deposits and fees
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" />
                    Negotiate pet policies and deposits
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" />
                    Handle utility and maintenance negotiations
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" />
                    Use advanced negotiation tactics
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Navigation */}
            <Card>
              <CardHeader>
                <CardTitle>Course Navigation</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button asChild className="w-full" variant="outline">
                    <Link href="/courses/legal-compliance">
                      <ArrowRight className="w-4 h-4 mr-2" />
                      Next Course: Legal Compliance
                    </Link>
                  </Button>
                  <Button asChild className="w-full" variant="outline">
                    <Link href="/courses">
                      View All Courses
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
} 