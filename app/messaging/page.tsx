"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { FileText, ArrowLeft, Send, MessageSquare, Shield, Plus, Paperclip, Eye, Lock } from "lucide-react"
import Link from "next/link"

interface Message {
  id: string
  senderId: string
  senderName: string
  senderType: "tenant" | "landlord" | "moderator"
  content: string
  timestamp: Date
  isRead: boolean
  attachments?: string[]
  isEncrypted: boolean
  priority: "low" | "medium" | "high"
}

interface Conversation {
  id: string
  participants: {
    tenant: { id: string; name: string }
    landlord: { id: string; name: string }
  }
  property: string
  subject: string
  status: "active" | "resolved" | "escalated" | "archived"
  lastMessage: Date
  unreadCount: number
  messages: Message[]
  isModerated: boolean
  tags: string[]
}

export default function MessagingPage() {
  const [conversations, setConversations] = useState<Conversation[]>([
    {
      id: "1",
      participants: {
        tenant: { id: "t1", name: "You" },
        landlord: { id: "l1", name: "Property Manager" },
      },
      property: "123 Main St, Apt 2B",
      subject: "Maintenance Request - Leaky Faucet",
      status: "active",
      lastMessage: new Date(Date.now() - 2 * 60 * 60 * 1000),
      unreadCount: 2,
      isModerated: true,
      tags: ["maintenance", "urgent"],
      messages: [
        {
          id: "m1",
          senderId: "t1",
          senderName: "You",
          senderType: "tenant",
          content:
            "Hi, I have a leaky faucet in the kitchen that's been dripping for 3 days. It's getting worse and I'm concerned about water damage. Can someone come take a look?",
          timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
          isRead: true,
          isEncrypted: true,
          priority: "medium",
        },
        {
          id: "m2",
          senderId: "l1",
          senderName: "Property Manager",
          senderType: "landlord",
          content:
            "Thank you for reporting this. I'll schedule a plumber to come out tomorrow between 10 AM and 2 PM. Please make sure someone is available to let them in.",
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
          isRead: false,
          isEncrypted: true,
          priority: "medium",
        },
      ],
    },
    {
      id: "2",
      participants: {
        tenant: { id: "t1", name: "You" },
        landlord: { id: "l1", name: "Property Manager" },
      },
      property: "123 Main St, Apt 2B",
      subject: "Lease Renewal Discussion",
      status: "active",
      lastMessage: new Date(Date.now() - 24 * 60 * 60 * 1000),
      unreadCount: 0,
      isModerated: true,
      tags: ["lease", "renewal"],
      messages: [
        {
          id: "m3",
          senderId: "l1",
          senderName: "Property Manager",
          senderType: "landlord",
          content:
            "Hi! Your lease is coming up for renewal in 60 days. We'd like to discuss terms for the next year. Are you interested in renewing?",
          timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
          isRead: true,
          isEncrypted: true,
          priority: "medium",
        },
      ],
    },
  ])

  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(conversations[0])
  const [newMessage, setNewMessage] = useState("")
  const [isStartingConversation, setIsStartingConversation] = useState(false)
  const [newConversation, setNewConversation] = useState({
    subject: "",
    content: "",
    priority: "medium" as const,
    tags: "",
  })

  const sendMessage = () => {
    if (!newMessage.trim() || !selectedConversation) return

    const message: Message = {
      id: Date.now().toString(),
      senderId: "t1",
      senderName: "You",
      senderType: "tenant",
      content: newMessage,
      timestamp: new Date(),
      isRead: true,
      isEncrypted: true,
      priority: "medium",
    }

    const updatedConversation = {
      ...selectedConversation,
      messages: [...selectedConversation.messages, message],
      lastMessage: new Date(),
    }

    setConversations((prev) => prev.map((c) => (c.id === selectedConversation.id ? updatedConversation : c)))
    setSelectedConversation(updatedConversation)
    setNewMessage("")
  }

  const startNewConversation = () => {
    if (!newConversation.subject || !newConversation.content) return

    const conversation: Conversation = {
      id: Date.now().toString(),
      participants: {
        tenant: { id: "t1", name: "You" },
        landlord: { id: "l1", name: "Property Manager" },
      },
      property: "123 Main St, Apt 2B",
      subject: newConversation.subject,
      status: "active",
      lastMessage: new Date(),
      unreadCount: 0,
      isModerated: true,
      tags: newConversation.tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      messages: [
        {
          id: "1",
          senderId: "t1",
          senderName: "You",
          senderType: "tenant",
          content: newConversation.content,
          timestamp: new Date(),
          isRead: true,
          isEncrypted: true,
          priority: newConversation.priority,
        },
      ],
    }

    setConversations((prev) => [conversation, ...prev])
    setSelectedConversation(conversation)
    setNewConversation({ subject: "", content: "", priority: "medium", tags: "" })
    setIsStartingConversation(false)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-700"
      case "resolved":
        return "bg-blue-100 text-blue-700"
      case "escalated":
        return "bg-red-100 text-red-700"
      case "archived":
        return "bg-gray-100 text-gray-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "text-red-600"
      case "medium":
        return "text-yellow-600"
      case "low":
        return "text-green-600"
      default:
        return "text-gray-600"
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
                <MessageSquare className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-semibold text-gray-900">Secure Messaging</span>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Tenant-Landlord Messaging</h1>
            <p className="text-lg text-gray-600 mb-4">
              Secure, encrypted communication channel with built-in moderation and documentation.
            </p>
            <div className="flex items-center justify-center space-x-4 text-sm text-gray-600">
              <div className="flex items-center space-x-1">
                <Lock className="w-4 h-4" />
                <span>End-to-end encrypted</span>
              </div>
              <div className="flex items-center space-x-1">
                <Shield className="w-4 h-4" />
                <span>Moderated for safety</span>
              </div>
              <div className="flex items-center space-x-1">
                <FileText className="w-4 h-4" />
                <span>Legally documented</span>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-6 h-[calc(100vh-300px)]">
            {/* Conversations List */}
            <div className="lg:col-span-1 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">Conversations</h2>
                <Dialog open={isStartingConversation} onOpenChange={setIsStartingConversation}>
                  <DialogTrigger asChild>
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                      <Plus className="w-4 h-4 mr-1" />
                      New
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Start New Conversation</DialogTitle>
                      <DialogDescription>Send a secure message to your landlord or property manager.</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Subject *</label>
                        <Input
                          placeholder="e.g., Maintenance Request, Lease Question"
                          value={newConversation.subject}
                          onChange={(e) => setNewConversation((prev) => ({ ...prev, subject: e.target.value }))}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Message *</label>
                        <Textarea
                          placeholder="Describe your request or question in detail..."
                          className="min-h-[100px]"
                          value={newConversation.content}
                          onChange={(e) => setNewConversation((prev) => ({ ...prev, content: e.target.value }))}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Priority</label>
                          <select
                            value={newConversation.priority}
                            onChange={(e) =>
                              setNewConversation((prev) => ({ ...prev, priority: e.target.value as typeof prev.priority }))
                            }
                            className="w-full p-2 border border-gray-300 rounded-md"
                          >
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                          </select>
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Tags</label>
                          <Input
                            placeholder="maintenance, lease, etc."
                            value={newConversation.tags}
                            onChange={(e) => setNewConversation((prev) => ({ ...prev, tags: e.target.value }))}
                          />
                        </div>
                      </div>
                      <div className="flex justify-end space-x-3">
                        <Button variant="outline" onClick={() => setIsStartingConversation(false)}>
                          Cancel
                        </Button>
                        <Button
                          onClick={startNewConversation}
                          disabled={!newConversation.subject || !newConversation.content}
                          className="bg-blue-600 hover:bg-blue-700 text-white"
                        >
                          Send Message
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              <div className="space-y-2 max-h-96 overflow-y-auto">
                {conversations.map((conversation) => (
                  <button
                    key={conversation.id}
                    onClick={() => setSelectedConversation(conversation)}
                    className={`w-full text-left p-4 rounded-lg border transition-colors ${
                      selectedConversation?.id === conversation.id
                        ? "bg-blue-50 border-blue-200"
                        : "hover:bg-gray-50 border-gray-200"
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-medium text-sm truncate pr-2">{conversation.subject}</h3>
                      {conversation.unreadCount > 0 && (
                        <Badge className="bg-red-100 text-red-700 text-xs">{conversation.unreadCount}</Badge>
                      )}
                    </div>
                    <p className="text-xs text-gray-600 mb-2">{conversation.property}</p>
                    <div className="flex items-center justify-between">
                      <Badge className={getStatusColor(conversation.status)} variant="secondary">
                        {conversation.status}
                      </Badge>
                      <span className="text-xs text-gray-500">{conversation.lastMessage.toLocaleDateString()}</span>
                    </div>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {conversation.tags.map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Chat Area */}
            <div className="lg:col-span-2">
              <Card className="h-full flex flex-col">
                {selectedConversation ? (
                  <>
                    {/* Chat Header */}
                    <CardHeader className="border-b">
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="text-lg">{selectedConversation.subject}</CardTitle>
                          <p className="text-sm text-gray-600">{selectedConversation.property}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge className={getStatusColor(selectedConversation.status)}>
                            {selectedConversation.status}
                          </Badge>
                          {selectedConversation.isModerated && (
                            <Badge variant="outline" className="text-xs">
                              <Shield className="w-3 h-3 mr-1" />
                              Moderated
                            </Badge>
                          )}
                        </div>
                      </div>
                    </CardHeader>

                    {/* Messages */}
                    <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
                      {selectedConversation.messages.map((message) => (
                        <div
                          key={message.id}
                          className={`flex ${message.senderType === "tenant" ? "justify-end" : "justify-start"}`}
                        >
                          <div className={`max-w-[80%] ${message.senderType === "tenant" ? "order-2" : "order-1"}`}>
                            <div
                              className={`p-3 rounded-lg ${
                                message.senderType === "tenant"
                                  ? "bg-blue-600 text-white"
                                  : message.senderType === "landlord"
                                    ? "bg-gray-100 text-gray-900"
                                    : "bg-yellow-100 text-yellow-900"
                              }`}
                            >
                              <p className="text-sm">{message.content}</p>
                              {message.attachments && message.attachments.length > 0 && (
                                <div className="mt-2 space-y-1">
                                  {message.attachments.map((attachment, index) => (
                                    <div key={index} className="flex items-center space-x-2 text-xs">
                                      <Paperclip className="w-3 h-3" />
                                      <span>{attachment}</span>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                            <div
                              className={`flex items-center space-x-2 mt-1 text-xs text-gray-500 ${
                                message.senderType === "tenant" ? "justify-end" : "justify-start"
                              }`}
                            >
                              <span>{message.senderName}</span>
                              <span>•</span>
                              <span>{message.timestamp.toLocaleTimeString()}</span>
                              {message.isEncrypted && <Lock className="w-3 h-3" />}
                              {message.isRead && message.senderType === "tenant" && <Eye className="w-3 h-3" />}
                            </div>
                          </div>
                        </div>
                      ))}
                    </CardContent>

                    {/* Input Area */}
                    <div className="border-t p-4">
                      <div className="flex space-x-2">
                        <Textarea
                          value={newMessage}
                          onChange={(e) => setNewMessage(e.target.value)}
                          placeholder="Type your message..."
                          className="flex-1 min-h-[60px] max-h-32"
                          onKeyPress={(e) => {
                            if (e.key === "Enter" && !e.shiftKey) {
                              e.preventDefault()
                              sendMessage()
                            }
                          }}
                        />
                        <div className="flex flex-col space-y-2">
                          <Button variant="outline" size="sm">
                            <Paperclip className="w-4 h-4" />
                          </Button>
                          <Button
                            onClick={sendMessage}
                            disabled={!newMessage.trim()}
                            className="bg-blue-600 hover:bg-blue-700 text-white"
                          >
                            <Send className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                      <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
                        <span>Messages are encrypted and moderated for safety</span>
                        <span>Press Enter to send, Shift+Enter for new line</span>
                      </div>
                    </div>
                  </>
                ) : (
                  <CardContent className="flex-1 flex items-center justify-center">
                    <div className="text-center">
                      <MessageSquare className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">Select a Conversation</h3>
                      <p className="text-gray-600">Choose a conversation from the list to start messaging.</p>
                    </div>
                  </CardContent>
                )}
              </Card>
            </div>
          </div>

          {/* Safety Features */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="w-5 h-5 text-green-600" />
                <span>Safety & Security Features</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Lock className="w-6 h-6 text-blue-600" />
                  </div>
                  <h4 className="font-medium text-gray-900 mb-2">End-to-End Encryption</h4>
                  <p className="text-sm text-gray-600">
                    All messages are encrypted and can only be read by you and your landlord.
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Shield className="w-6 h-6 text-green-600" />
                  </div>
                  <h4 className="font-medium text-gray-900 mb-2">AI Moderation</h4>
                  <p className="text-sm text-gray-600">
                    Messages are automatically screened for inappropriate content and harassment.
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <FileText className="w-6 h-6 text-purple-600" />
                  </div>
                  <h4 className="font-medium text-gray-900 mb-2">Legal Documentation</h4>
                  <p className="text-sm text-gray-600">
                    All conversations are timestamped and can be used as legal documentation.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
