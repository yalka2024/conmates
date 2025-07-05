"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  FileText,
  ArrowLeft,
  ThumbsUp,
  ThumbsDown,
  MessageCircle,
  Flag,
  Share2,
  CheckCircle2,
  AlertTriangle,
  Eye,
  Heart,
  Send,
} from "lucide-react"
import Link from "next/link"

export default function QuestionDetailPage() {
  const [newAnswer, setNewAnswer] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Mock question data (in real app, this would come from params and API)
  const question = {
    id: "1",
    title: "Landlord wants to increase rent by 40% - is this legal?",
    content:
      "My landlord just gave me 30 days notice that they're increasing my rent from $1,200 to $1,680. This seems excessive. I'm in California and have been a good tenant for 2 years. Is there anything I can do?\n\nI've never been late on rent, I keep the place clean, and I haven't caused any problems. The building hasn't been renovated or improved in any way. I'm really stressed about this because I can't afford the new rent but I also can't afford to move right now.\n\nAny advice would be really appreciated. Thank you!",
    category: "rent-increases",
    location: "California",
    tags: ["rent-control", "california", "tenant-rights"],
    author: "Anonymous Renter",
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    upvotes: 15,
    downvotes: 1,
    views: 234,
    isResolved: false,
    isUrgent: true,
    answers: [
      {
        id: "a1",
        content:
          "In California, there are rent control laws that limit increases. For tenants who have lived in a place for more than 12 months, the maximum increase is 5% plus inflation (capped at 10% total). Your increase of 40% is likely illegal.\n\nHere's what you should do:\n\n1. **Document everything** - Keep the notice, your lease, payment records\n2. **Check if your building is covered** - Most buildings built before 1995 are covered by rent control\n3. **Contact your local rent board immediately** - They can help you file a complaint\n4. **Don't move out** - Stay put while you fight this\n\nThe California Tenant Protection Act of 2019 (AB 1482) specifically prohibits this kind of increase. You may also be entitled to damages if the landlord violated the law.\n\nI'd recommend calling the California Tenant Hotline at 1-800-XXX-XXXX for free legal advice specific to your situation.",
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
          "I had a similar situation last year in Oakland. My landlord tried to increase my rent by 35% and I was terrified. But after I contacted the rent board and showed them the notice, they helped me file a complaint.\n\nTurns out my building was covered by rent control and the increase was completely illegal. Not only did I not have to pay the increase, but I got some of my previous rent back because they had been overcharging me.\n\nDocument everything - the notice, your payment history, any communications. The California Tenant Protection Act of 2019 should protect you. You can also call the tenant hotline for free advice.\n\nDon't give up! These landlords count on tenants not knowing their rights.",
        author: "Experienced Renter",
        timestamp: new Date(Date.now() - 30 * 60 * 1000),
        upvotes: 8,
        downvotes: 0,
        isExpert: false,
        isBestAnswer: false,
      },
      {
        id: "a3",
        content:
          "Just wanted to add that you should also check if your city has additional rent control ordinances. San Francisco, Los Angeles, Oakland, and several other California cities have their own rent control laws that may be even more protective than the state law.\n\nAlso, if your landlord is retaliating against you for any reason (like if you've complained about repairs or asked questions about your rights), that's also illegal and you should mention that when you contact the rent board.",
        author: "Legal Aid Volunteer",
        timestamp: new Date(Date.now() - 15 * 60 * 1000),
        upvotes: 5,
        downvotes: 0,
        isExpert: true,
        isBestAnswer: false,
      },
    ],
  }

  const handleSubmitAnswer = async () => {
    if (!newAnswer.trim()) return

    setIsSubmitting(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // In real app, would add answer to question
    setNewAnswer("")
    setIsSubmitting(false)
  }

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
            <Link href="/community" className="flex items-center space-x-2">
              <ArrowLeft className="w-5 h-5 text-gray-600" />
              <span className="text-gray-600 hover:text-blue-600 transition-colors">Back to community</span>
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
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Question Card */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2 mb-4">
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
                <Badge variant="outline">Rent Increases</Badge>
                <Badge variant="outline">{question.location}</Badge>
              </div>

              <h1 className="text-2xl font-bold text-gray-900 mb-4">{question.title}</h1>

              <div className="prose max-w-none mb-6">
                <p className="text-gray-700 whitespace-pre-line">{question.content}</p>
              </div>

              <div className="flex flex-wrap gap-1 mb-4">
                {question.tags.map((tag, index) => (
                  <Badge key={index} variant="secondary" className="text-xs bg-blue-50 text-blue-700">
                    #{tag}
                  </Badge>
                ))}
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-6">
                  <button className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors">
                    <ThumbsUp className="w-4 h-4" />
                    <span>{question.upvotes}</span>
                  </button>
                  <button className="flex items-center space-x-2 text-gray-600 hover:text-red-600 transition-colors">
                    <ThumbsDown className="w-4 h-4" />
                    <span>{question.downvotes}</span>
                  </button>
                  <span className="flex items-center space-x-1 text-gray-500">
                    <Eye className="w-4 h-4" />
                    <span>{question.views} views</span>
                  </span>
                  <button className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors">
                    <Share2 className="w-4 h-4" />
                    <span>Share</span>
                  </button>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <span>Asked by {question.author}</span>
                  <span>•</span>
                  <span>{getTimeAgo(question.timestamp)}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Answers Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MessageCircle className="w-5 h-5 text-blue-600" />
                <span>{question.answers.length} Answers</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {question.answers.map((answer, index) => (
                <div key={answer.id} className={`${index > 0 ? "border-t pt-6" : ""}`}>
                  <div
                    className={`p-4 rounded-lg ${answer.isBestAnswer ? "bg-green-50 border-2 border-green-200" : "bg-gray-50"}`}
                  >
                    {answer.isBestAnswer && (
                      <div className="flex items-center space-x-2 mb-3">
                        <CheckCircle2 className="w-5 h-5 text-green-600" />
                        <span className="font-medium text-green-800">Best Answer</span>
                      </div>
                    )}

                    <div className="flex items-start space-x-3 mb-3">
                      <Avatar className="w-8 h-8">
                        <AvatarFallback className="bg-blue-100 text-blue-600 text-sm">
                          {answer.author.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="font-medium text-gray-900">{answer.author}</span>
                          {answer.isExpert && <Badge className="bg-blue-100 text-blue-700 text-xs">Expert</Badge>}
                          <span className="text-sm text-gray-500">•</span>
                          <span className="text-sm text-gray-500">{getTimeAgo(answer.timestamp)}</span>
                        </div>
                        <div className="prose max-w-none">
                          <p className="text-gray-700 whitespace-pre-line">{answer.content}</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <button className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors">
                          <ThumbsUp className="w-4 h-4" />
                          <span>{answer.upvotes}</span>
                        </button>
                        <button className="flex items-center space-x-2 text-gray-600 hover:text-red-600 transition-colors">
                          <ThumbsDown className="w-4 h-4" />
                          <span>{answer.downvotes}</span>
                        </button>
                        <button className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors">
                          <Heart className="w-4 h-4" />
                          <span>Thank</span>
                        </button>
                      </div>
                      <button className="flex items-center space-x-2 text-gray-500 hover:text-red-600 transition-colors">
                        <Flag className="w-4 h-4" />
                        <span className="text-sm">Report</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Add Answer Section */}
          <Card>
            <CardHeader>
              <CardTitle>Your Answer</CardTitle>
              <p className="text-gray-600">
                Help this community member by sharing your knowledge or experience. Be respectful and constructive.
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Textarea
                  placeholder="Share your advice, experience, or resources that might help..."
                  value={newAnswer}
                  onChange={(e) => setNewAnswer(e.target.value)}
                  className="min-h-[120px]"
                />
                <div className="flex justify-between items-center">
                  <p className="text-sm text-gray-500">
                    Your answer will be posted anonymously. Please follow our community guidelines.
                  </p>
                  <Button
                    onClick={handleSubmitAnswer}
                    disabled={!newAnswer.trim() || isSubmitting}
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Posting...</span>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2">
                        <Send className="w-4 h-4" />
                        <span>Post Answer</span>
                      </div>
                    )}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Related Questions */}
          <Card>
            <CardHeader>
              <CardTitle>Related Questions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  "Can landlord increase rent during lease term?",
                  "What is considered a reasonable rent increase in California?",
                  "How to fight an illegal rent increase?",
                  "Rent control laws by city in California",
                ].map((title, index) => (
                  <div key={index} className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded cursor-pointer">
                    <MessageCircle className="w-4 h-4 text-gray-400" />
                    <span className="text-blue-600 hover:text-blue-800">{title}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
