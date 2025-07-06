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
  Scale,
  Gavel
} from "lucide-react";
import Link from "next/link";

export default function LegalCompliancePage() {
  const courseData = {
    title: "Legal Compliance for Tenants",
    description: "Navigate complex legal requirements and ensure your rental activities comply with all applicable laws.",
    price: 129,
    duration: "2.5 hours",
    lessons: 14,
    students: 650,
    rating: 4.7,
    instructor: "Jennifer Martinez, Esq.",
    instructorTitle: "Housing Law Specialist",
    instructorBio: "Jennifer specializes in housing law and has helped thousands of tenants understand their legal obligations and rights.",
  };

  const lessons = [
    {
      id: 1,
      title: "Understanding Landlord-Tenant Law",
      duration: "21:15",
      videoUrl: "/videos/landlord-tenant-law.mp4",
      description: "Overview of federal and state laws that protect tenant rights.",
      materials: [
        "Federal Laws Summary",
        "State-Specific Law Guide",
        "Legal Rights Checklist"
      ]
    },
    {
      id: 2,
      title: "Fair Housing Act Compliance",
      duration: "24:30",
      videoUrl: "/videos/fair-housing-act.mp4",
      description: "Understanding protected classes and recognizing housing discrimination.",
      materials: [
        "Protected Classes Guide",
        "Discrimination Complaint Form",
        "Fair Housing Resources"
      ]
    },
    {
      id: 3,
      title: "Security Deposit Laws",
      duration: "19:45",
      videoUrl: "/videos/security-deposit-laws.mp4",
      description: "Legal requirements for security deposits and how to protect your money.",
      materials: [
        "Deposit Law Summary",
        "Move-in Inspection Checklist",
        "Deposit Dispute Letter"
      ]
    },
    {
      id: 4,
      title: "Habitable Housing Standards",
      duration: "22:20",
      videoUrl: "/videos/habitable-housing.mp4",
      description: "Minimum housing standards and your rights to habitable living conditions.",
      materials: [
        "Habitability Standards",
        "Repair Request Templates",
        "Code Violation Report"
      ]
    },
    {
      id: 5,
      title: "Eviction Laws and Procedures",
      duration: "26:10",
      videoUrl: "/videos/eviction-laws.mp4",
      description: "Understanding eviction laws, proper procedures, and your legal defenses.",
      materials: [
        "Eviction Process Guide",
        "Legal Defense Checklist",
        "Court Preparation Guide"
      ]
    },
    {
      id: 6,
      title: "Legal Remedies and Enforcement",
      duration: "20:35",
      videoUrl: "/videos/legal-remedies.mp4",
      description: "How to enforce your rights and seek legal remedies when laws are violated.",
      materials: [
        "Legal Action Guide",
        "Small Claims Court Guide",
        "Attorney Referral List"
      ]
    }
  ];

  const completedLessons = 2;
  const totalLessons = courseData.lessons;
  const progress = (completedLessons / totalLessons) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50">
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
                <Badge variant="secondary">Advanced</Badge>
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
                  <Scale className="w-5 h-5 mr-2" />
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
                    <div key={lesson.id} className="bg-white rounded-lg border border-gray-200 p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                              <span className="text-purple-600 font-semibold text-sm">{lesson.id}</span>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900">{lesson.title}</h3>
                            <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                              {lesson.duration}
                            </span>
                          </div>
                          <p className="text-gray-600 mb-4">{lesson.description}</p>
                          
                          {/* Video Player */}
                          <div className="mb-4">
                            <div className="relative bg-gray-100 rounded-lg overflow-hidden">
                              <video 
                                className="w-full h-64 object-cover"
                                controls
                                preload="metadata"
                              >
                                <source src={lesson.videoUrl} type="video/mp4" />
                                Your browser does not support the video tag.
                              </video>
                              <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
                                <div className="bg-white bg-opacity-90 rounded-full p-3">
                                  <Play className="w-6 h-6 text-purple-600" />
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Downloadable Materials */}
                          <div className="space-y-2">
                            <h4 className="font-medium text-gray-900">Downloadable Materials:</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                              {lesson.materials.map((material, index) => (
                                <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
                                  <FileText className="w-4 h-4" />
                                  <span>{material}</span>
                                  <button className="ml-auto text-purple-600 hover:text-purple-800 text-xs">
                                    Download
                                  </button>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
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
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Scale className="w-8 h-8 text-purple-600" />
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
                  {/* Add course features here */}
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
                    <Link href="/courses">
                      <ArrowRight className="w-4 h-4 mr-2" />
                      Back to All Courses
                    </Link>
                  </Button>
                  <Button asChild className="w-full" variant="outline">
                    <Link href="/courses">
                      View Course Bundle
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