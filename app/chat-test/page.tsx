"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Bot, TestTube, CheckCircle, XCircle, Loader2 } from "lucide-react"

export default function ChatTestPage() {
  const [testResults, setTestResults] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const runTests = async () => {
    setLoading(true)
    setError(null)
    setTestResults(null)

    try {
      // Test 1: Check API configuration
      const configResponse = await fetch('/api/chat/test')
      const configData = await configResponse.json()
      
      // Test 2: Try a simple chat message
      const chatResponse = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [
            { role: 'user', content: 'Hello, this is a test message.' }
          ],
          category: 'general'
        })
      })

      const chatData = await chatResponse.json()
      
      setTestResults({
        config: configData,
        chat: {
          status: chatResponse.status,
          ok: chatResponse.ok,
          data: chatData
        }
      })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error occurred')
    } finally {
      setLoading(false)
    }
  }

  const getStatusIcon = (status: boolean) => {
    return status ? (
      <CheckCircle className="w-4 h-4 text-green-600" />
    ) : (
      <XCircle className="w-4 h-4 text-red-600" />
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center space-x-3 mb-6">
          <TestTube className="w-8 h-8 text-blue-600" />
          <h1 className="text-3xl font-bold text-gray-900">Chat API Test</h1>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Bot className="w-5 h-5" />
              <span>Diagnostic Tests</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Button 
              onClick={runTests} 
              disabled={loading}
              className="w-full"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Running Tests...
                </>
              ) : (
                <>
                  <TestTube className="w-4 h-4 mr-2" />
                  Run Chat API Tests
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {error && (
          <Alert className="mb-6">
            <XCircle className="h-4 w-4" />
            <AlertDescription>
              <strong>Test Error:</strong> {error}
            </AlertDescription>
          </Alert>
        )}

        {testResults && (
          <div className="space-y-6">
            {/* Configuration Test Results */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  {getStatusIcon(testResults.config.status === 'ok')}
                  <span>Configuration Test</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span>Environment Variables:</span>
                    <div className="flex space-x-2">
                      <Badge variant={testResults.config.environment.hasOpenAISecretKey ? "default" : "destructive"}>
                        OPENAI_SECRET_KEY: {testResults.config.environment.hasOpenAISecretKey ? "✓" : "✗"}
                      </Badge>
                      <Badge variant={testResults.config.environment.hasOpenAIAPIKey ? "default" : "destructive"}>
                        OPENAI_API_KEY: {testResults.config.environment.hasOpenAIAPIKey ? "✓" : "✗"}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>AI SDK Import:</span>
                    <Badge variant={testResults.config.aiSDK.status === 'success' ? "default" : "destructive"}>
                      {testResults.config.aiSDK.status}
                    </Badge>
                  </div>
                  <div className="text-sm text-gray-600">
                    <strong>Details:</strong>
                    <pre className="mt-2 p-2 bg-gray-100 rounded text-xs overflow-x-auto">
                      {JSON.stringify(testResults.config, null, 2)}
                    </pre>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Chat API Test Results */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  {getStatusIcon(testResults.chat.ok)}
                  <span>Chat API Test</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span>API Response Status:</span>
                    <Badge variant={testResults.chat.ok ? "default" : "destructive"}>
                      {testResults.chat.status}
                    </Badge>
                  </div>
                  <div className="text-sm text-gray-600">
                    <strong>Response Data:</strong>
                    <pre className="mt-2 p-2 bg-gray-100 rounded text-xs overflow-x-auto">
                      {JSON.stringify(testResults.chat.data, null, 2)}
                    </pre>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recommendations */}
            <Card>
              <CardHeader>
                <CardTitle>Recommendations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  {!testResults.config.environment.hasOpenAISecretKey && (
                    <div className="p-2 bg-red-50 border border-red-200 rounded">
                      <strong>❌ Missing OPENAI_SECRET_KEY:</strong> Add your OpenAI API key to the .env.local file
                    </div>
                  )}
                  {!testResults.config.environment.hasOpenAIAPIKey && testResults.config.environment.hasOpenAISecretKey && (
                    <div className="p-2 bg-yellow-50 border border-yellow-200 rounded">
                      <strong>⚠️ OPENAI_API_KEY not set:</strong> The system should automatically use OPENAI_SECRET_KEY
                    </div>
                  )}
                  {testResults.config.aiSDK.status !== 'success' && (
                    <div className="p-2 bg-red-50 border border-red-200 rounded">
                      <strong>❌ AI SDK Import Failed:</strong> Check your dependencies and try reinstalling packages
                    </div>
                  )}
                  {!testResults.chat.ok && (
                    <div className="p-2 bg-red-50 border border-red-200 rounded">
                      <strong>❌ Chat API Failed:</strong> Check the response data above for specific error details
                    </div>
                  )}
                  {testResults.config.environment.hasOpenAISecretKey && testResults.chat.ok && (
                    <div className="p-2 bg-green-50 border border-green-200 rounded">
                      <strong>✅ All Tests Passed:</strong> Your chat API should be working correctly
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
} 