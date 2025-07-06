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
    { value: "all", label: t('community.category.all') },
    { value: "rent-increases", label: t('community.category.rentIncreases') },
    { value: "security-deposits", label: t('community.category.securityDeposits') },
    { value: "repairs-maintenance", label: t('community.category.repairsMaintenance') },
    { value: "neighbor-issues", label: t('community.category.neighborIssues') },
    { value: "lease-terms", label: t('community.category.leaseTerms') },
    { value: "eviction", label: t('community.category.eviction') },
    { value: "discrimination", label: t('community.category.discrimination') },
    { value: "utilities", label: t('community.category.utilities') },
    { value: "moving-out", label: t('community.category.movingOut') },
    { value: "other", label: t('community.category.other') },
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <header className="border-b border-blue-100 bg-white">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <ArrowLeft className="w-5 h-5 text-gray-600" />
              <span className="text-gray-600 hover:text-blue-600 transition-colors">Back to home</span>
            </Link>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-white" />
              </div>
                              <span className="text-xl font-semibold text-gray-900">Conmates Community</span>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Renter Support Community</h1>
            <p className="text-lg text-gray-600 mb-6">
              Get help from fellow renters and housing experts. Ask questions anonymously and share your experiences.
            </p>

            {/* Community Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">1,247</div>
                <div className="text-sm text-gray-600">Questions Asked</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">892</div>
                <div className="text-sm text-gray-600">Questions Resolved</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">3,456</div>
                <div className="text-sm text-gray-600">Community Members</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">24</div>
                <div className="text-sm text-gray-600">Expert Volunteers</div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <TabsList className="bg-blue-50 p-1">
                <TabsTrigger value="browse" className="data-[state=active]:bg-white">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Browse Questions
                </TabsTrigger>
                <TabsTrigger value="experts" className="data-[state=active]:bg-white">
                  <Users className="w-4 h-4 mr-2" />
                  Expert Answers
                </TabsTrigger>
              </TabsList>

              <Dialog open={isAskingQuestion} onOpenChange={setIsAskingQuestion}>
                <DialogTrigger asChild>
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                    <Plus className="w-4 h-4 mr-2" />
                    Ask a Question
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Ask the Community</DialogTitle>
                    <DialogDescription>
                      Your question will be posted anonymously. Be specific to get the best help.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">Question Title *</Label>
                      <Input
                        id="title"
                        placeholder="e.g., Can my landlord increase rent by 30%?"
                        value={newQuestion.title}
                        onChange={(e) => setNewQuestion((prev) => ({ ...prev, title: e.target.value }))}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="content">Detailed Description *</Label>
                      <Textarea
                        id="content"
                        placeholder="Provide as much detail as possible about your situation..."
                        className="min-h-[120px]"
                        value={newQuestion.content}
                        onChange={(e) => setNewQuestion((prev) => ({ ...prev, content: e.target.value }))}
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Category *</Label>
                        <Select
                          value={newQuestion.category}
                          onValueChange={(value) => setNewQuestion((prev) => ({ ...prev, category: value }))}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            {categories.slice(1).map((category) => (
                              <SelectItem key={category.value} value={category.value}>
                                {category.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label>Location (Optional)</Label>
                        <Select
                          value={newQuestion.location}
                          onValueChange={(value) => setNewQuestion((prev) => ({ ...prev, location: value }))}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select state" />
                          </SelectTrigger>
                          <SelectContent>
                            {locations.slice(1).map((location) => (
                              <SelectItem key={location.value} value={location.value}>
                                {location.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="tags">Tags (Optional)</Label>
                      <Input
                        id="tags"
                        placeholder="e.g., rent-control, eviction, repairs (comma-separated)"
                        value={newQuestion.tags}
                        onChange={(e) => setNewQuestion((prev) => ({ ...prev, tags: e.target.value }))}
                      />
                    </div>

                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="urgent"
                        checked={newQuestion.isUrgent}
                        onChange={(e) => setNewQuestion((prev) => ({ ...prev, isUrgent: e.target.checked }))}
                        className="rounded border-gray-300"
                      />
                      <Label htmlFor="urgent" className="text-sm">
                        This is urgent (eviction notice, emergency repair, etc.)
                      </Label>
                    </div>

                    <div className="flex justify-end space-x-3">
                      <Button variant="outline" onClick={() => setIsAskingQuestion(false)}>
                        Cancel
                      </Button>
                      <Button
                        onClick={handleAskQuestion}
                        disabled={!newQuestion.title || !newQuestion.content || !newQuestion.category}
                        className="bg-blue-600 hover:bg-blue-700 text-white"
                      >
                        Post Question
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            {/* Browse Questions Tab */}
            <TabsContent value="browse" className="space-y-6">
              {/* Search and Filters */}
              <Card>
                <CardContent className="p-4">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <Input
                          placeholder="Search questions, tags, or keywords..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="pl-10"
                        />
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                        <SelectTrigger className="w-[180px]">
                          <Filter className="w-4 h-4 mr-2" />
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category.value} value={category.value}>
                              {category.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>

                      <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                        <SelectTrigger className="w-[140px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {locations.map((location) => (
                            <SelectItem key={location.value} value={location.value}>
                              {location.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>

                      <Select value={sortBy} onValueChange={setSortBy}>
                        <SelectTrigger className="w-[140px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="recent">Most Recent</SelectItem>
                          <SelectItem value="popular">Most Popular</SelectItem>
                          <SelectItem value="unanswered">Unanswered</SelectItem>
                          <SelectItem value="urgent">Urgent First</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Questions List */}
              <div className="space-y-4">
                {sortedQuestions.map((question) => (
                  <Card key={question.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            {question.isUrgent && (
                              <Badge variant="destructive" className="bg-red-100 text-red-700">
                                <AlertTriangle className="w-3 h-3 mr-1" />
                                Urgent
                              </Badge>
                            )}
                            {question.isResolved && (
                              <Badge className="bg-green-100 text-green-700">
                                <CheckCircle2 className="w-3 h-3 mr-1" />
                                Resolved
                              </Badge>
                            )}
                            <Badge variant="outline" className="text-xs">
                              {categories.find((c) => c.value === question.category)?.label}
                            </Badge>
                            {question.location !== "Not specified" && (
                              <Badge variant="outline" className="text-xs">
                                {question.location}
                              </Badge>
                            )}
                          </div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-2 hover:text-blue-600 cursor-pointer">
                            {question.title}
                          </h3>
                          <p className="text-gray-600 mb-3 line-clamp-2">{question.content}</p>
                          <div className="flex flex-wrap gap-1 mb-3">
                            {question.tags.map((tag, index) => (
                              <Badge key={index} variant="secondary" className="text-xs bg-blue-50 text-blue-700">
                                #{tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <div className="flex items-center space-x-4">
                          <span className="flex items-center space-x-1">
                            <ThumbsUp className="w-4 h-4" />
                            <span>{question.upvotes}</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <MessageCircle className="w-4 h-4" />
                            <span>{question.answers.length} answers</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <Eye className="w-4 h-4" />
                            <span>{question.views} views</span>
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span>by {question.author}</span>
                          <span>•</span>
                          <span>{getTimeAgo(question.timestamp)}</span>
                        </div>
                      </div>

                      {/* Show best answer preview if available */}
                      {question.answers.some((a) => a.isBestAnswer) && (
                        <div className="mt-4 p-3 bg-green-50 rounded-lg border-l-4 border-green-400">
                          <div className="flex items-center space-x-2 mb-2">
                            <CheckCircle2 className="w-4 h-4 text-green-600" />
                            <span className="text-sm font-medium text-green-800">Best Answer</span>
                            {question.answers.find((a) => a.isBestAnswer)?.isExpert && (
                              <Badge className="bg-blue-100 text-blue-700 text-xs">Expert</Badge>
                            )}
                          </div>
                          <p className="text-sm text-green-700 line-clamp-2">
                            {question.answers.find((a) => a.isBestAnswer)?.content}
                          </p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}

                {sortedQuestions.length === 0 && (
                  <Card>
                    <CardContent className="p-12 text-center">
                      <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">No questions found</h3>
                      <p className="text-gray-600 mb-4">
                        Try adjusting your search or filters, or be the first to ask a question!
                      </p>
                      <Button
                        onClick={() => setIsAskingQuestion(true)}
                        className="bg-blue-600 hover:bg-blue-700 text-white"
                      >
                        Ask a Question
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </div>
            </TabsContent>

            {/* Expert Answers Tab */}
            <TabsContent value="experts" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Users className="w-5 h-5 text-blue-600" />
                    <span>Expert Contributors</span>
                  </CardTitle>
                  <p className="text-gray-600">
                    Our community includes housing advocates, legal aid volunteers, and experienced renters who provide
                    expert guidance.
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[
                      { name: "Housing Advocate", answers: 45, rating: 4.9, specialty: "Rent Control & Tenant Rights" },
                      { name: "Legal Aid Volunteer", answers: 32, rating: 4.8, specialty: "Eviction Defense" },
                      { name: "Tenant Rights Expert", answers: 28, rating: 4.7, specialty: "Security Deposits" },
                      { name: "Community Organizer", answers: 23, rating: 4.9, specialty: "Discrimination Issues" },
                      { name: "Property Manager", answers: 19, rating: 4.6, specialty: "Maintenance & Repairs" },
                      { name: "Experienced Renter", answers: 67, rating: 4.8, specialty: "General Advice" },
                    ].map((expert, index) => (
                      <Card key={index} className="p-4">
                        <div className="flex items-center space-x-3 mb-3">
                          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <Users className="w-5 h-5 text-blue-600" />
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900">{expert.name}</h4>
                            <div className="flex items-center space-x-1">
                              <Heart className="w-3 h-3 text-red-500 fill-current" />
                              <span className="text-xs text-gray-600">{expert.rating} rating</span>
                            </div>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{expert.specialty}</p>
                        <p className="text-xs text-gray-500">{expert.answers} helpful answers</p>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Recent Expert Answers */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Expert Answers</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {questions
                      .filter((q) => q.answers.some((a) => a.isExpert))
                      .slice(0, 3)
                      .map((question) => (
                        <div key={question.id} className="border-l-4 border-blue-400 pl-4">
                          <h4 className="font-medium text-gray-900 mb-2">{question.title}</h4>
                          {question.answers
                            .filter((a) => a.isExpert)
                            .slice(0, 1)
                            .map((answer) => (
                              <div key={answer.id} className="bg-blue-50 p-3 rounded-lg">
                                <div className="flex items-center space-x-2 mb-2">
                                  <Badge className="bg-blue-100 text-blue-700 text-xs">Expert</Badge>
                                  <span className="text-sm text-gray-600">{answer.author}</span>
                                  <span className="text-xs text-gray-500">•</span>
                                  <span className="text-xs text-gray-500">{getTimeAgo(answer.timestamp)}</span>
                                </div>
                                <p className="text-sm text-gray-700">{answer.content}</p>
                              </div>
                            ))}
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Community Guidelines */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Heart className="w-5 h-5 text-red-500" />
                <span>Community Guidelines</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">✅ Do:</h4>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>• Be respectful and supportive</li>
                    <li>• Provide specific details in your questions</li>
                    <li>• Share your location (state) for better advice</li>
                    <li>• Mark questions as resolved when helped</li>
                    <li>• Upvote helpful answers</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">❌ Don&apos;t:</h4>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>• Share personal information (addresses, names)</li>
                    <li>• Give legal advice unless you&apos;re qualified</li>
                    <li>• Post duplicate questions</li>
                    <li>• Use offensive or discriminatory language</li>
                    <li>• Spam or self-promote</li>
                  </ul>
                </div>
              </div>
              <div className="mt-4 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                <p className="text-sm text-yellow-800">
                  <strong>Disclaimer:</strong> This community provides general information and support. For specific
                  legal advice, consult with a qualified attorney or legal aid organization in your area.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
