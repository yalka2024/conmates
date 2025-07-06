"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  FileText,
  ArrowLeft,
  MessageSquare,
  ThumbsUp,
  Search,
  Filter,
  Plus,
  Users,
  CheckCircle2,
  AlertTriangle,
  Heart,
  Eye,
  MessageCircle,
  TrendingUp,
  Clock,
  Reply,
  Bookmark,
  Share2,
  User,
  Shield,
  HelpCircle,
  Lightbulb,
} from "lucide-react"
import Link from "next/link"
import { useLanguage } from "@/components/language-provider"

interface Question {
  id: string
  title: string
  content: string
  category: string
  location: string
  tags: string[]
  author: string
  timestamp: Date
  upvotes: number
  downvotes: number
  answers: Answer[]
  views: number
  isResolved: boolean
  isUrgent: boolean
}

interface Answer {
  id: string
  content: string
  author: string
  timestamp: Date
  upvotes: number
  downvotes: number
  isExpert: boolean
  isBestAnswer: boolean
}

export default function CommunityPage() {
  const [activeTab, setActiveTab] = useState("browse")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedLocation, setSelectedLocation] = useState("all")
  const [sortBy, setSortBy] = useState("recent")
  const [isAskingQuestion, setIsAskingQuestion] = useState(false)
  const [newQuestion, setNewQuestion] = useState({
    title: "",
    content: "",
    category: "",
    location: "",
    tags: "",
    isUrgent: false,
  })

  const { t } = useLanguage()

  // Mock data for questions
  const [questions, setQuestions] = useState<Question[]>([
    {
      id: "1",
      title: "Landlord wants to increase rent by 40% - is this legal?",
      content:
        "My landlord just gave me 30 days notice that they&apos;re increasing my rent from $1,200 to $1,680. This seems excessive. I&apos;m in California and have been a good tenant for 2 years. Is there anything I can do?",
      category: "rent-increases",
      location: "California",
      tags: ["rent-control", "california", "tenant-rights"],
      author: "Anonymous Renter",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      upvotes: 15,
      downvotes: 1,
      views: 234,
      isResolved: false,
      isUrgent: true,
      answers: [
        {
          id: "a1",
          content:
            "In California, there are rent control laws that limit increases. For tenants who have lived in a place for more than 12 months, the maximum increase is 5% plus inflation (capped at 10% total). Your increase of 40% is likely illegal. Contact your local rent board immediately.",
          author: "Housing Advocate",
          timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000),
          upvotes: 23,
          downvotes: 0,
          isExpert: true,
          isBestAnswer: true,
        },
        {
          id: "a2",
          content:
            "I had a similar situation last year. Document everything - the notice, your payment history, any communications. The California Tenant Protection Act of 2019 should protect you. You can also call the tenant hotline for free advice.",
          author: "Experienced Renter",
          timestamp: new Date(Date.now() - 30 * 60 * 1000),
          upvotes: 8,
          downvotes: 0,
          isExpert: false,
          isBestAnswer: false,
        },
      ],
    },
    {
      id: "2",
      title: "Security deposit not returned after 60 days - what are my options?",
      content:
        "I moved out of my apartment 2 months ago and still haven&apos;t received my $1,500 security deposit back. The landlord isn&apos;t responding to my calls or emails. The place was in good condition when I left. What legal options do I have?",
      category: "security-deposits",
      location: "Texas",
      tags: ["security-deposit", "texas", "landlord-communication"],
      author: "Frustrated Tenant",
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
      upvotes: 12,
      downvotes: 0,
      views: 156,
      isResolved: true,
      isUrgent: false,
      answers: [
        {
          id: "a3",
          content:
            "In Texas, landlords have 30 days to return deposits or provide an itemized list of deductions. Since it's been 60 days, you may be entitled to 3x the deposit amount plus $100. Send a certified letter demanding return, then consider small claims court.",
          author: "Legal Aid Volunteer",
          timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
          upvotes: 18,
          downvotes: 1,
          isExpert: true,
          isBestAnswer: true,
        },
      ],
    },
    {
      id: "3",
      title: "Neighbor&apos;s loud music every night - landlord won&apos;t help",
      content:
        "My upstairs neighbor plays loud music until 2-3 AM every night. I&apos;ve complained to the landlord multiple times but they say it&apos;s not their problem. I can&apos;t sleep and it&apos;s affecting my work. What can I do?",
      category: "neighbor-issues",
      location: "New York",
      tags: ["noise", "neighbors", "quiet-enjoyment"],
      author: "Sleepless in NYC",
      timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000),
      upvotes: 8,
      downvotes: 0,
      views: 89,
      isResolved: false,
      isUrgent: false,
      answers: [
        {
          id: "a4",
          content:
            "You have a right to &apos;quiet enjoyment&apos; of your rental. Document the noise with recordings and timestamps. File complaints with your local noise control board and consider withholding rent if the landlord continues to ignore the issue (but check local laws first).",
          author: "Tenant Rights Expert",
          timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000),
          upvotes: 6,
          downvotes: 0,
          isExpert: true,
          isBestAnswer: false,
        },
      ],
    },
  ])

  const categories = [
    {
      id: "general",
      title: "General Discussion",
      description: "General tenant topics and questions",
      icon: MessageCircle,
      color: "blue",
      topics: 156,
      posts: 892
    },
    {
      id: "legal-help",
      title: "Legal Help",
      description: "Get help with legal issues and questions",
      icon: Shield,
      color: "green",
      topics: 89,
      posts: 445
    },
    {
      id: "lease-negotiation",
      title: "Lease Negotiation",
      description: "Tips and strategies for negotiating leases",
      icon: TrendingUp,
      color: "purple",
      topics: 67,
      posts: 234
    },
    {
      id: "repairs-maintenance",
      title: "Repairs & Maintenance",
      description: "Dealing with repairs and maintenance issues",
      icon: HelpCircle,
      color: "orange",
      topics: 123,
      posts: 567
    },
    {
      id: "tips-advice",
      title: "Tips & Advice",
      description: "Share and discover tenant tips",
      icon: Lightbulb,
      color: "yellow",
      topics: 234,
      posts: 789
    },
    {
      id: "emergency",
      title: "Emergency Help",
      description: "Urgent situations and immediate assistance",
      icon: AlertTriangle,
      color: "red",
      topics: 23,
      posts: 89
    }
  ]

  const locations = [
    { value: "all", label: t('community.location.all') },
    { value: "California", label: t('community.location.california') },
    { value: "Texas", label: t('community.location.texas') },
    { value: "New York", label: t('community.location.newYork') },
    { value: "Florida", label: t('community.location.florida') },
    { value: "Illinois", label: t('community.location.illinois') },
  ]

  const handleAskQuestion = () => {
    if (!newQuestion.title || !newQuestion.content || !newQuestion.category) {
      return
    }

    const question: Question = {
      id: Date.now().toString(),
      title: newQuestion.title,
      content: newQuestion.content,
      category: newQuestion.category,
      location: newQuestion.location || "Not specified",
      tags: newQuestion.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
      author: "Anonymous Renter",
      timestamp: new Date(),
      upvotes: 0,
      downvotes: 0,
      views: 0,
      isResolved: false,
      isUrgent: newQuestion.isUrgent,
      answers: [],
    }

    setQuestions((prev) => [question, ...prev])
    setNewQuestion({
      title: "",
      content: "",
      category: "",
      location: "",
      tags: "",
      isUrgent: false,
    })
    setIsAskingQuestion(false)
    setActiveTab("browse")
  }

  const filteredQuestions = questions.filter((question) => {
    const matchesSearch =
      question.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      question.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      question.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesCategory = selectedCategory === "all" || question.category === selectedCategory
    const matchesLocation = selectedLocation === "all" || question.location === selectedLocation

    return matchesSearch && matchesCategory && matchesLocation
  })

  const sortedQuestions = [...filteredQuestions].sort((a, b) => {
    switch (sortBy) {
      case "recent":
        return b.timestamp.getTime() - a.timestamp.getTime()
      case "popular":
        return b.upvotes - b.downvotes - (a.upvotes - a.downvotes)
      case "unanswered":
        return a.answers.length - b.answers.length
      case "urgent":
        return Number(b.isUrgent) - Number(a.isUrgent)
      default:
        return 0
    }
  })

  const getTimeAgo = (date: Date) => {
    const now = new Date()
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))

    if (diffInMinutes < 60) {
      return `${diffInMinutes}m ago`
    } else if (diffInMinutes < 1440) {
      return `${Math.floor(diffInMinutes / 60)}h ago`
    } else {
      return `${Math.floor(diffInMinutes / 1440)}d ago`
    }
  }

  const recentDiscussions = [
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
    },
    {
      id: 4,
      title: "Best time to negotiate lease renewal?",
      author: "David R.",
      category: "tips-advice",
      replies: 31,
      views: 189,
      likes: 22,
      timeAgo: "8 hours ago",
      isSticky: false,
      isSolved: false
    },
    {
      id: 5,
      title: "Landlord entered without notice - legal recourse?",
      author: "Amanda K.",
      category: "legal-help",
      replies: 15,
      views: 203,
      likes: 9,
      timeAgo: "12 hours ago",
      isSticky: false,
      isSolved: false
    }
  ]

  const topContributors = [
    { name: "Sarah M.", posts: 156, helpful: 89, avatar: "SM" },
    { name: "Mike C.", posts: 134, helpful: 67, avatar: "MC" },
    { name: "Jennifer L.", posts: 98, helpful: 45, avatar: "JL" },
    { name: "David R.", posts: 87, helpful: 34, avatar: "DR" },
    { name: "Amanda K.", posts: 76, helpful: 28, avatar: "AK" }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Tenant Community</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Connect with fellow tenants, share experiences, and get help from the community. 
            Ask questions, share tips, and learn from others who have been in your shoes.
          </p>
        </div>

        {/* Search and Actions */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              placeholder="Search discussions, topics, or users..."
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
            <Button asChild>
              <Link href="/community/new-discussion">
                <Plus className="w-4 h-4 mr-2" />
                New Discussion
              </Link>
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Recent Discussions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Recent Discussions</span>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <span>Sort by:</span>
                    <Button variant="ghost" size="sm">Latest</Button>
                    <Button variant="ghost" size="sm">Popular</Button>
                    <Button variant="ghost" size="sm">Unanswered</Button>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentDiscussions.map((discussion) => (
                    <div key={discussion.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            {discussion.isSticky && (
                              <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                                Sticky
                              </Badge>
                            )}
                            {discussion.isSolved && (
                              <Badge variant="secondary" className="bg-green-100 text-green-800">
                                Solved
                              </Badge>
                            )}
                            <Badge variant="outline" className="text-xs">
                              {categories.find(c => c.id === discussion.category)?.title}
                            </Badge>
                          </div>
                          <h3 className="font-semibold text-lg mb-2 hover:text-blue-600 cursor-pointer">
                            <Link href={`/community/discussion/${discussion.id}`}>
                              {discussion.title}
                            </Link>
                          </h3>
                          <div className="flex items-center space-x-4 text-sm text-gray-600">
                            <span className="flex items-center">
                              <User className="w-4 h-4 mr-1" />
                              {discussion.author}
                            </span>
                            <span className="flex items-center">
                              <Clock className="w-4 h-4 mr-1" />
                              {discussion.timeAgo}
                            </span>
                            <span className="flex items-center">
                              <Reply className="w-4 h-4 mr-1" />
                              {discussion.replies} replies
                            </span>
                            <span className="flex items-center">
                              <Eye className="w-4 h-4 mr-1" />
                              {discussion.views} views
                            </span>
                            <span className="flex items-center">
                              <ThumbsUp className="w-4 h-4 mr-1" />
                              {discussion.likes} likes
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2 ml-4">
                          <Button variant="ghost" size="sm">
                            <Bookmark className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Share2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 text-center">
                  <Button variant="outline">
                    Load More Discussions
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Categories */}
            <Card>
              <CardHeader>
                <CardTitle>Categories</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {categories.map((category) => {
                    const IconComponent = category.icon;
                    return (
                      <Link key={category.id} href={`/community/category/${category.id}`}>
                        <div className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                          <div className="flex items-center space-x-3">
                            <div className={`w-8 h-8 bg-${category.color}-100 rounded-lg flex items-center justify-center`}>
                              <IconComponent className={`w-4 h-4 text-${category.color}-600`} />
                            </div>
                            <div>
                              <h4 className="font-medium">{category.title}</h4>
                              <p className="text-sm text-gray-600">{category.description}</p>
                            </div>
                          </div>
                          <div className="text-right text-sm text-gray-500">
                            <div>{category.topics} topics</div>
                            <div>{category.posts} posts</div>
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Top Contributors */}
            <Card>
              <CardHeader>
                <CardTitle>Top Contributors</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {topContributors.map((contributor, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-sm font-medium text-blue-600">
                          {contributor.avatar}
                        </div>
                        <div>
                          <div className="font-medium">{contributor.name}</div>
                          <div className="text-sm text-gray-600">{contributor.posts} posts</div>
                        </div>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {contributor.helpful} helpful
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Community Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Community Stats</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Total Members</span>
                    <span className="font-semibold">2,847</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Total Discussions</span>
                    <span className="font-semibold">689</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Total Posts</span>
                    <span className="font-semibold">2,015</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Questions Answered</span>
                    <span className="font-semibold">1,234</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Community Guidelines */}
            <Card className="border-blue-200 bg-blue-50">
              <CardHeader>
                <CardTitle className="text-blue-800">Community Guidelines</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-blue-800">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                    Be respectful and helpful to others
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                    Share accurate information and experiences
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                    No personal attacks or harassment
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                    Keep discussions on-topic
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
