"use client"

import { useState } from "react"
import { useChat } from "ai/react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Bot, User, Send, FileText, HelpCircle, Scale, MessageSquare, Loader2, Sparkles, AlertTriangle } from "lucide-react"
import Link from "next/link"

export default function ChatPage() {
  const [category, setCategory] = useState("general")
  const [showDisclaimer, setShowDisclaimer] = useState(true)

  const { messages, input, handleInputChange, handleSubmit, isLoading, error } = useChat({
    api: "/api/chat",
    body: { category },
    initialMessages: [
      {
        id: "welcome",
        role: "assistant",
        content: `Hi! I'm your AI assistant powered by GPT-4. I'm here to help you with:

• **Lease Questions** - Understanding terms, clauses, and your rights
• **Platform Help** - Navigating Conmates features and tools  
• **Legal Information** - General tenant rights and housing law
• **General Support** - Any other questions about renting

**Important:** I provide general information only. For specific legal advice, please consult with a qualified attorney or legal professional.

What would you like to know?`,
      },
    ],
  })

  const suggestions = [
    { text: "What should I look for in a lease agreement?", category: "lease" },
    { text: "How do I use the lease analysis tool?", category: "platform" },
    { text: "What are my rights as a tenant?", category: "legal" },
    { text: "Can you explain security deposit laws?", category: "legal" },
  ]

  const handleSuggestionClick = (suggestion: { text: string; category: string }) => {
    setCategory(suggestion.category)
    handleInputChange({ target: { value: suggestion.text } } as any)
  }

  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case "lease":
        return <FileText className="w-4 h-4" />
      case "platform":
        return <HelpCircle className="w-4 h-4" />
      case "legal":
        return <Scale className="w-4 h-4" />
      default:
        return <MessageSquare className="w-4 h-4" />
    }
  }

  // Function to detect and format legal disclaimers in messages
  const formatMessageContent = (content: string) => {
    // Check if the message contains a legal disclaimer
    const hasDisclaimer = content.includes("⚠️ IMPORTANT LEGAL DISCLAIMER") || 
                         content.includes("Legal Disclaimer") ||
                         content.includes("This information is provided for educational purposes only")
    
    if (hasDisclaimer) {
      // Split the content into main content and disclaimer
      const disclaimerIndex = content.indexOf("⚠️ IMPORTANT LEGAL DISCLAIMER")
      if (disclaimerIndex !== -1) {
        const mainContent = content.substring(0, disclaimerIndex).trim()
        const disclaimer = content.substring(disclaimerIndex)
        
        return (
          <div>
            <div className="whitespace-pre-wrap text-sm leading-relaxed">{mainContent}</div>
            <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-start space-x-2">
                <AlertTriangle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                <div className="text-xs text-red-800 font-medium">
                  <div className="whitespace-pre-wrap">{disclaimer}</div>
                </div>
              </div>
            </div>
          </div>
        )
      }
    }
    
    return <div className="whitespace-pre-wrap text-sm leading-relaxed">{content}</div>
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                  <FileText className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-semibold text-gray-900">Conmates</span>
              </Link>
              <div className="flex items-center space-x-2">
                <Bot className="w-5 h-5 text-purple-600" />
                <span className="text-lg font-medium text-gray-900">AI Assistant</span>
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                  <Sparkles className="w-3 h-3 mr-1" />
                  GPT-4 Powered
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Category Selection */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-lg">Choose Your Topic</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs value={category} onValueChange={setCategory}>
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="general" className="flex items-center space-x-2">
                    <MessageSquare className="w-4 h-4" />
                    <span>General</span>
                  </TabsTrigger>
                  <TabsTrigger value="lease" className="flex items-center space-x-2">
                    <FileText className="w-4 h-4" />
                    <span>Lease Help</span>
                  </TabsTrigger>
                  <TabsTrigger value="platform" className="flex items-center space-x-2">
                    <HelpCircle className="w-4 h-4" />
                    <span>Platform</span>
                  </TabsTrigger>
                  <TabsTrigger value="legal" className="flex items-center space-x-2">
                    <Scale className="w-4 h-4" />
                    <span>Legal Info</span>
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </CardContent>
          </Card>

          {/* Chat Interface */}
          <Card className="h-[600px] flex flex-col">
            <CardHeader className="flex-shrink-0">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center space-x-2">
                  {getCategoryIcon(category)}
                  <span>
                    {category === "general" && "General Chat"}
                    {category === "lease" && "Lease Questions"}
                    {category === "platform" && "Platform Help"}
                    {category === "legal" && "Legal Information"}
                  </span>
                </CardTitle>
                {isLoading && (
                  <div className="flex items-center space-x-2 text-blue-600">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span className="text-sm">AI is thinking...</span>
                  </div>
                )}
              </div>
              
              {/* Prominent Legal Disclaimer */}
              {showDisclaimer && messages.length > 1 && (
                <div className="mt-3 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                  <div className="flex items-start space-x-2">
                    <AlertTriangle className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="text-xs text-amber-800 font-medium">
                        <strong>Legal Disclaimer:</strong> This AI assistant provides general information only and should not be considered as legal advice. Laws vary by location and circumstances. For specific legal matters, please consult with a qualified attorney or legal professional.
                      </p>
                      <button 
                        onClick={() => setShowDisclaimer(false)}
                        className="text-xs text-amber-600 hover:text-amber-800 mt-1 underline"
                      >
                        Dismiss
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </CardHeader>

            {/* Messages */}
            <CardContent className="flex-1 flex flex-col relative pb-20">
              <ScrollArea className="flex-1 pr-4">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex items-start space-x-3 ${
                        message.role === "user" ? "flex-row-reverse space-x-reverse" : ""
                      }`}
                    >
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                          message.role === "user" ? "bg-blue-500" : "bg-purple-500"
                        }`}
                      >
                        {message.role === "user" ? (
                          <User className="w-4 h-4 text-white" />
                        ) : (
                          <Bot className="w-4 h-4 text-white" />
                        )}
                      </div>
                      <div
                        className={`max-w-[80%] rounded-lg p-3 ${
                          message.role === "user" ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-900"
                        }`}
                      >
                        {formatMessageContent(message.content)}
                      </div>
                    </div>
                  ))}

                  {error && (
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center flex-shrink-0">
                        <Bot className="w-4 h-4 text-white" />
                      </div>
                      <div className="max-w-[80%] rounded-lg p-3 bg-red-50 border border-red-200">
                        <div className="text-sm text-red-700">Sorry, I encountered an error. Please try again.</div>
                      </div>
                    </div>
                  )}
                </div>
              </ScrollArea>

              {/* Sticky Disclaimer Bar */}
              <div className="sticky bottom-0 left-0 w-full z-10 mt-4">
                <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg flex items-start space-x-2 shadow-md">
                  <AlertTriangle className="w-4 h-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                  <div className="text-xs text-yellow-800 font-medium">
                    <strong>Disclaimer:</strong> This AI assistant provides general information and educational content only. This is not legal advice. For specific legal matters, consult a qualified attorney. Conmates is not a law firm and does not provide legal representation.
                  </div>
                </div>
              </div>

              {/* Suggestions */}
              {messages.length <= 1 && (
                <div className="mt-4 mb-4">
                  <p className="text-sm text-gray-600 mb-2">Try asking:</p>
                  <div className="flex flex-wrap gap-2">
                    {suggestions.map((suggestion, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        onClick={() => handleSuggestionClick(suggestion)}
                        className="text-xs"
                      >
                        {suggestion.text}
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              {/* Input Form */}
              <form onSubmit={handleSubmit} className="flex space-x-2 mt-4">
                <Input
                  value={input}
                  onChange={handleInputChange}
                  placeholder="Ask me anything about leases, tenant rights, or the platform..."
                  disabled={isLoading}
                  className="flex-1"
                />
                <Button type="submit" disabled={isLoading || !input.trim()}>
                  {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Enhanced Disclaimer */}
          <div className="mt-4 p-4 bg-gradient-to-r from-yellow-50 to-amber-50 border border-yellow-200 rounded-lg">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-yellow-800 mb-1">Important Legal Notice</h4>
                <p className="text-sm text-yellow-800 leading-relaxed">
                  <strong>Disclaimer:</strong> This AI assistant provides general information and educational content only. 
                  The information provided should not be considered as legal advice, and laws vary significantly by state, 
                  city, and individual circumstances. For specific legal advice regarding your situation, please consult 
                  with a qualified attorney or legal professional. Conmates is not a law firm and does not provide legal 
                  representation or advice.
                </p>
                <p className="text-xs text-yellow-700 mt-2">
                  By using this chat, you acknowledge that you understand this disclaimer and agree to use the information 
                  provided for educational purposes only.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
