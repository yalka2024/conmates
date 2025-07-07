"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { Search, Filter, Plus, User, Clock, Reply, Eye, ThumbsUp, Bookmark, Share2 } from "lucide-react"

const categories = [
  {
    id: "general",
    title: "General Discussion",
    description: "General tenant topics and questions",
    icon: User,
    color: "blue",
    topics: 156,
    posts: 892
  },
  // ... other categories ...
]

const topContributors = [
  { name: "Sarah M.", posts: 156, helpful: 89, avatar: "SM" },
  { name: "Mike C.", posts: 134, helpful: 67, avatar: "MC" },
  { name: "Jennifer L.", posts: 98, helpful: 45, avatar: "JL" },
  { name: "David R.", posts: 87, helpful: 34, avatar: "DR" },
  { name: "Amanda K.", posts: 76, helpful: 28, avatar: "AK" }
]

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
  // ... other discussions ...
]

export default function CommunityPage() {
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
