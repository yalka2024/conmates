import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Play, 
  Clock, 
  Users, 
  Star, 
  BookOpen,
  ArrowRight,
  Shield,
  TrendingUp,
  Scale
} from "lucide-react";
import Link from "next/link";

interface MobileCourseCardProps {
  course: {
    id: string;
    title: string;
    description: string;
    price: number;
    duration: string;
    lessons: number;
    students: number;
    rating: number;
    level: string;
    instructor: string;
    icon: any;
    color: string;
  };
}

export default function MobileCourseCard({ course }: MobileCourseCardProps) {
  const IconComponent = course.icon;

  return (
    <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-start space-x-3">
          {/* Course Icon */}
          <div className={`w-12 h-12 bg-${course.color}-100 rounded-lg flex items-center justify-center flex-shrink-0`}>
            <IconComponent className={`w-6 h-6 text-${course.color}-600`} />
          </div>

          {/* Course Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-900 truncate">{course.title}</h3>
                <p className="text-sm text-gray-600 line-clamp-2 mt-1">{course.description}</p>
              </div>
              <div className="text-right ml-2">
                <div className="text-lg font-bold text-green-600">${course.price}</div>
                <Badge variant="outline" className="text-xs mt-1">{course.level}</Badge>
              </div>
            </div>

            {/* Course Stats */}
            <div className="flex items-center space-x-4 text-xs text-gray-500 mb-3">
              <div className="flex items-center">
                <Clock className="w-3 h-3 mr-1" />
                {course.duration}
              </div>
              <div className="flex items-center">
                <BookOpen className="w-3 h-3 mr-1" />
                {course.lessons} lessons
              </div>
              <div className="flex items-center">
                <Users className="w-3 h-3 mr-1" />
                {course.students}
              </div>
              <div className="flex items-center">
                <Star className="w-3 h-3 mr-1 text-yellow-500" />
                {course.rating}
              </div>
            </div>

            {/* Instructor */}
            <div className="text-xs text-gray-600 mb-3">
              Instructor: {course.instructor}
            </div>

            {/* Action Button */}
            <Button asChild className="w-full" size="sm">
              <Link href={`/courses/${course.id}`}>
                <Play className="w-4 h-4 mr-2" />
                View Course
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Course data for testing
export const sampleCourses = [
  {
    id: "tenant-rights-101",
    title: "Tenant Rights 101",
    description: "Master the fundamentals of tenant rights and learn how to protect yourself in any rental situation.",
    price: 99,
    duration: "2 hours",
    lessons: 12,
    students: 1250,
    rating: 4.8,
    level: "Beginner",
    instructor: "Sarah Johnson, Esq.",
    icon: Shield,
    color: "blue"
  },
  {
    id: "lease-negotiation",
    title: "Lease Negotiation Mastery",
    description: "Learn proven strategies to negotiate better lease terms and save money on your rental agreement.",
    price: 149,
    duration: "3 hours",
    lessons: 18,
    students: 890,
    rating: 4.9,
    level: "Intermediate",
    instructor: "Michael Chen, Esq.",
    icon: TrendingUp,
    color: "green"
  },
  {
    id: "legal-compliance",
    title: "Legal Compliance for Tenants",
    description: "Understand state-specific laws and compliance requirements to protect your rights and avoid legal issues.",
    price: 129,
    duration: "2.5 hours",
    lessons: 15,
    students: 650,
    rating: 4.7,
    level: "Advanced",
    instructor: "Jennifer Rodriguez, Esq.",
    icon: Scale,
    color: "purple"
  }
]; 