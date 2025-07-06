import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft,
  MessageCircle,
  Shield,
  TrendingUp,
  HelpCircle,
  Lightbulb,
  AlertTriangle,
  Plus,
  X
} from "lucide-react";
import Link from "next/link";

export default function NewDiscussionPage() {
  const categories = [
    {
      id: "general",
      title: "General Discussion",
      description: "General tenant topics and questions",
      icon: MessageCircle,
      color: "blue"
    },
    {
      id: "legal-help",
      title: "Legal Help",
      description: "Get help with legal issues and questions",
      icon: Shield,
      color: "green"
    },
    {
      id: "lease-negotiation",
      title: "Lease Negotiation",
      description: "Tips and strategies for negotiating leases",
      icon: TrendingUp,
      color: "purple"
    },
    {
      id: "repairs-maintenance",
      title: "Repairs & Maintenance",
      description: "Dealing with repairs and maintenance issues",
      icon: HelpCircle,
      color: "orange"
    },
    {
      id: "tips-advice",
      title: "Tips & Advice",
      description: "Share and discover tenant tips",
      icon: Lightbulb,
      color: "yellow"
    },
    {
      id: "emergency",
      title: "Emergency Help",
      description: "Urgent situations and immediate assistance",
      icon: AlertTriangle,
      color: "red"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Button asChild variant="outline" className="mb-4">
            <Link href="/community">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Community
            </Link>
          </Button>
          
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Start a New Discussion</h1>
            <p className="text-lg text-gray-600">
              Share your question, experience, or tip with the community. Be specific to get the best responses.
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Discussion Details</CardTitle>
              </CardHeader>
              <CardContent>
                <form className="space-y-6">
                  {/* Title */}
                  <div className="space-y-2">
                    <label htmlFor="title" className="text-sm font-medium">
                      Discussion Title *
                    </label>
                    <Input
                      id="title"
                      placeholder="e.g., Landlord refusing to fix broken heater - what are my rights?"
                      className="text-lg"
                    />
                    <p className="text-sm text-gray-600">
                      Be specific and descriptive to help others understand your situation
                    </p>
                  </div>

                  {/* Category Selection */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Category *</label>
                    <div className="grid grid-cols-2 gap-3">
                      {categories.map((category) => {
                        const IconComponent = category.icon;
                        return (
                          <div
                            key={category.id}
                            className={`p-4 border-2 rounded-lg cursor-pointer transition-colors hover:border-${category.color}-300`}
                          >
                            <div className="flex items-center space-x-3">
                              <div className={`w-8 h-8 bg-${category.color}-100 rounded-lg flex items-center justify-center`}>
                                <IconComponent className={`w-4 h-4 text-${category.color}-600`} />
                              </div>
                              <div>
                                <h4 className="font-medium">{category.title}</h4>
                                <p className="text-sm text-gray-600">{category.description}</p>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="space-y-2">
                    <label htmlFor="content" className="text-sm font-medium">
                      Discussion Content *
                    </label>
                    <Textarea
                      id="content"
                      placeholder="Provide detailed information about your situation, question, or topic. Include relevant details like your location, timeline, and what you've already tried..."
                      className="min-h-[200px]"
                    />
                    <p className="text-sm text-gray-600">
                      The more details you provide, the better help you'll receive from the community
                    </p>
                  </div>

                  {/* Tags */}
                  <div className="space-y-2">
                    <label htmlFor="tags" className="text-sm font-medium">
                      Tags (Optional)
                    </label>
                    <Input
                      id="tags"
                      placeholder="e.g., rent-control, eviction, repairs, security-deposit"
                    />
                    <p className="text-sm text-gray-600">
                      Add relevant tags separated by commas to help others find your discussion
                    </p>
                  </div>

                  {/* Options */}
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="urgent"
                        className="rounded border-gray-300"
                      />
                      <label htmlFor="urgent" className="text-sm">
                        This is urgent (eviction notice, emergency repair, etc.)
                      </label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="anonymous"
                        className="rounded border-gray-300"
                      />
                      <label htmlFor="anonymous" className="text-sm">
                        Post anonymously
                      </label>
                    </div>
                  </div>

                  {/* Submit */}
                  <div className="flex justify-end space-x-3 pt-4">
                    <Button variant="outline" asChild>
                      <Link href="/community">
                        Cancel
                      </Link>
                    </Button>
                    <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                      <Plus className="w-4 h-4 mr-2" />
                      Post Discussion
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Guidelines */}
            <Card>
              <CardHeader>
                <CardTitle>Posting Guidelines</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start space-x-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
                    <div>
                      <strong>Be specific:</strong> Include relevant details about your situation
                    </div>
                  </div>
                  <div className="flex items-start space-x-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
                    <div>
                      <strong>Be respectful:</strong> Treat others with kindness and respect
                    </div>
                  </div>
                  <div className="flex items-start space-x-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
                    <div>
                      <strong>Stay on topic:</strong> Keep discussions related to tenant issues
                    </div>
                  </div>
                  <div className="flex items-start space-x-2">
                    <span className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></span>
                    <div>
                      <strong>No personal info:</strong> Don't share addresses, phone numbers, or full names
                    </div>
                  </div>
                  <div className="flex items-start space-x-2">
                    <span className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></span>
                    <div>
                      <strong>No legal advice:</strong> We provide information, not legal counsel
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tips for Better Posts */}
            <Card>
              <CardHeader>
                <CardTitle>Tips for Better Responses</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                    Include your state/location for relevant advice
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                    Mention what you've already tried
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                    Provide timeline of events
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                    Share relevant documents (anonymized)
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                    Ask specific questions
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Community Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Community Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span>Active members today</span>
                    <span className="font-medium">247</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Discussions this week</span>
                    <span className="font-medium">89</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Average response time</span>
                    <span className="font-medium">2.3 hours</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Questions resolved</span>
                    <span className="font-medium">92%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
} 