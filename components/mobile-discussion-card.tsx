import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  MessageCircle, 
  Clock, 
  User, 
  Eye, 
  ThumbsUp,
  Reply,
  Bookmark,
  Share2,
  Shield,
  TrendingUp,
  HelpCircle,
  Lightbulb,
  AlertTriangle
} from "lucide-react";
import Link from "next/link";

interface MobileDiscussionCardProps {
  discussion: {
    id: number;
    title: string;
    author: string;
    category: string;
    replies: number;
    views: number;
    likes: number;
    timeAgo: string;
    isSticky: boolean;
    isSolved: boolean;
  };
}

export default function MobileDiscussionCard({ discussion }: MobileDiscussionCardProps) {
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "legal-help":
        return Shield;
      case "lease-negotiation":
        return TrendingUp;
      case "repairs-maintenance":
        return HelpCircle;
      case "tips-advice":
        return Lightbulb;
      case "emergency":
        return AlertTriangle;
      default:
        return MessageCircle;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "legal-help":
        return "green";
      case "lease-negotiation":
        return "purple";
      case "repairs-maintenance":
        return "orange";
      case "tips-advice":
        return "yellow";
      case "emergency":
        return "red";
      default:
        return "blue";
    }
  };

  const IconComponent = getCategoryIcon(discussion.category);
  const categoryColor = getCategoryColor(discussion.category);

  return (
    <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="space-y-3">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-2">
              <div className={`w-8 h-8 bg-${categoryColor}-100 rounded-lg flex items-center justify-center`}>
                <IconComponent className={`w-4 h-4 text-${categoryColor}-600`} />
              </div>
              <div className="flex flex-wrap items-center gap-1">
                {discussion.isSticky && (
                  <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 text-xs">
                    Sticky
                  </Badge>
                )}
                {discussion.isSolved && (
                  <Badge variant="secondary" className="bg-green-100 text-green-800 text-xs">
                    Solved
                  </Badge>
                )}
                <Badge variant="outline" className="text-xs">
                  {discussion.category.replace("-", " ")}
                </Badge>
              </div>
            </div>
            <div className="flex items-center space-x-1">
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <Bookmark className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <Share2 className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Title */}
          <div>
            <Link href={`/community/discussion/${discussion.id}`}>
              <h3 className="font-semibold text-gray-900 hover:text-blue-600 transition-colors line-clamp-2">
                {discussion.title}
              </h3>
            </Link>
          </div>

          {/* Stats */}
          <div className="flex items-center justify-between text-xs text-gray-600">
            <div className="flex items-center space-x-3">
              <span className="flex items-center">
                <User className="w-3 h-3 mr-1" />
                {discussion.author}
              </span>
              <span className="flex items-center">
                <Clock className="w-3 h-3 mr-1" />
                {discussion.timeAgo}
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <span className="flex items-center">
                <Reply className="w-3 h-3 mr-1" />
                {discussion.replies}
              </span>
              <span className="flex items-center">
                <Eye className="w-3 h-3 mr-1" />
                {discussion.views}
              </span>
              <span className="flex items-center">
                <ThumbsUp className="w-3 h-3 mr-1" />
                {discussion.likes}
              </span>
            </div>
          </div>

          {/* Action Button */}
          <Button asChild variant="outline" size="sm" className="w-full">
            <Link href={`/community/discussion/${discussion.id}`}>
              <MessageCircle className="w-4 h-4 mr-2" />
              View Discussion
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

// Sample discussion data for testing
export const sampleDiscussions = [
  {
    id: 1,
    title: "Landlord refusing to fix broken heater - what are my rights?",
    author: "Sarah M.",
    category: "repairs-maintenance",
    replies: 12,
    views: 156,
    likes: 8,
    timeAgo: "2 hours ago",
    isSticky: false,
    isSolved: false
  },
  {
    id: 2,
    title: "Successfully negotiated $200 rent reduction - here's how",
    author: "Mike C.",
    category: "lease-negotiation",
    replies: 23,
    views: 342,
    likes: 45,
    timeAgo: "4 hours ago",
    isSticky: true,
    isSolved: true
  },
  {
    id: 3,
    title: "Security deposit dispute - landlord claiming $500 in damages",
    author: "Jennifer L.",
    category: "legal-help",
    replies: 18,
    views: 267,
    likes: 12,
    timeAgo: "6 hours ago",
    isSticky: false,
    isSolved: false
  }
]; 