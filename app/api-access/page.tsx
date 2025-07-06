"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { FileText, ArrowLeft, Code, Key, Zap, Shield, Users, BarChart3, Copy } from "lucide-react"
import Link from "next/link"

interface APIEndpoint {
  method: "GET" | "POST" | "PUT" | "DELETE"
  path: string
  description: string
  parameters?: { name: string; type: string; required: boolean; description: string }[]
  response: string
  example: string
}

interface APIKey {
  id: string
  name: string
  key: string
  permissions: string[]
  createdAt: Date
  lastUsed?: Date
  requestCount: number
  isActive: boolean
}

export default function APIAccessPage() {
  const [apiKeys, setApiKeys] = useState<APIKey[]>([
    {
      id: "1",
      name: "Legal Aid Society - Main",
      key: "leas_live_sk_1234567890abcdef",
      permissions: ["lease:analyze", "alerts:create", "resources:read"],
      createdAt: new Date("2024-01-15"),
      lastUsed: new Date("2024-01-20"),
      requestCount: 1247,
      isActive: true,
    },
  ])

  const [isCreatingKey, setIsCreatingKey] = useState(false)
  const [newKeyForm, setNewKeyForm] = useState({
    name: "",
    description: "",
    permissions: [] as string[],
  })

  const endpoints: APIEndpoint[] = [
    {
      method: "POST",
      path: "/api/v1/lease/analyze",
      description: "Analyze a lease document and return summary with red flags",
      parameters: [
        { name: "file", type: "file", required: true, description: "PDF lease document" },
        { name: "language", type: "string", required: false, description: "Response language (en, es, zh, ar)" },
      ],
      response: "LeaseAnalysis object with summary, red flags, and recommendations",
      example: `{
  "summary": {
    "monthlyRent": 2400,
    "securityDeposit": 2400,
    "leaseTerm": 12,
    "keyTerms": ["No pets allowed", "Late fee: $75 after 5 days"]
  },
  "redFlags": [
    {
      "severity": "high",
      "title": "No subletting allowed",
      "description": "Tenant cannot sublet under any circumstances"
    }
  ],
  "score": 75
}`,
    },
    {
      method: "POST",
      path: "/api/v1/alerts/create",
      description: "Create a smart alert for a tenant",
      parameters: [
        { name: "tenantId", type: "string", required: true, description: "Unique tenant identifier" },
        { name: "type", type: "string", required: true, description: "Alert type (rent, lease, maintenance, legal)" },
        { name: "title", type: "string", required: true, description: "Alert title" },
        { name: "dueDate", type: "date", required: true, description: "When the alert should trigger" },
        { name: "priority", type: "string", required: false, description: "Priority level (low, medium, high)" },
      ],
      response: "Created alert object with ID and confirmation",
      example: `{
  "id": "alert_123456",
  "status": "created",
  "scheduledFor": "2024-02-01T09:00:00Z",
  "notificationChannels": ["email", "sms"]
}`,
    },
    {
      method: "GET",
      path: "/api/v1/resources/tenant-rights",
      description: "Get tenant rights information by state",
      parameters: [
        { name: "state", type: "string", required: true, description: "US state code (e.g., CA, NY, TX)" },
        {
          name: "category",
          type: "string",
          required: false,
          description: "Specific category (deposits, eviction, repairs)",
        },
      ],
      response: "Tenant rights information and legal resources",
      example: `{
  "state": "CA",
  "rights": [
    {
      "category": "security_deposits",
      "description": "Maximum 2 months rent for unfurnished units",
      "law": "California Civil Code Section 1950.5"
    }
  ],
  "legalAid": [
    {
      "name": "California Tenant Law",
      "phone": "1-800-TENANT",
      "website": "https://caltenantlaw.org"
    }
  ]
}`,
    },
    {
      method: "GET",
      path: "/api/v1/comparison/analyze",
      description: "Compare multiple lease documents",
      parameters: [
        { name: "leaseIds", type: "array", required: true, description: "Array of lease document IDs to compare" },
      ],
      response: "Comparison analysis with recommendations",
      example: `{
  "comparison": {
    "bestOption": "lease_456",
    "factors": {
      "cost": { "winner": "lease_123", "savings": 200 },
      "terms": { "winner": "lease_456", "score": 85 }
    }
  },
  "recommendation": "Lease 456 offers better tenant protections despite higher cost"
}`,
    },
  ]

  const availablePermissions = [
    { id: "lease:analyze", name: "Lease Analysis", description: "Analyze lease documents" },
    { id: "lease:compare", name: "Lease Comparison", description: "Compare multiple leases" },
    { id: "alerts:create", name: "Create Alerts", description: "Create smart alerts for tenants" },
    { id: "alerts:read", name: "Read Alerts", description: "View existing alerts" },
    { id: "resources:read", name: "Access Resources", description: "Access legal resources and guides" },
    { id: "community:read", name: "Community Access", description: "Access community Q&A data" },
    { id: "analytics:read", name: "Analytics", description: "Access usage analytics" },
  ]

  const createAPIKey = () => {
    if (!newKeyForm.name || newKeyForm.permissions.length === 0) return

    const newKey: APIKey = {
      id: Date.now().toString(),
      name: newKeyForm.name,
      key: `leas_live_sk_${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`,
      permissions: newKeyForm.permissions,
      createdAt: new Date(),
      requestCount: 0,
      isActive: true,
    }

    setApiKeys((prev) => [newKey, ...prev])
    setNewKeyForm({ name: "", description: "", permissions: [] })
    setIsCreatingKey(false)
  }

  const togglePermission = (permission: string) => {
    setNewKeyForm((prev) => ({
      ...prev,
      permissions: prev.permissions.includes(permission)
        ? prev.permissions.filter((p) => p !== permission)
        : [...prev.permissions, permission],
    }))
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
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
                <Code className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-semibold text-gray-900">API Access</span>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Conmates API</h1>
            <p className="text-lg text-gray-600 mb-6">
                              Integrate Conmates&apos;s powerful lease analysis and tenant support tools into your organization&apos;s workflow.
            </p>
            <div className="flex items-center justify-center space-x-6 text-sm text-gray-600">
              <div className="flex items-center space-x-1">
                <Shield className="w-4 h-4" />
                <span>Secure & Compliant</span>
              </div>
              <div className="flex items-center space-x-1">
                <Zap className="w-4 h-4" />
                <span>Real-time Analysis</span>
              </div>
              <div className="flex items-center space-x-1">
                <Users className="w-4 h-4" />
                <span>Built for Legal Orgs</span>
              </div>
            </div>
          </div>

          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4 bg-blue-50 p-1">
              <TabsTrigger value="overview" className="data-[state=active]:bg-white">
                <BarChart3 className="w-4 h-4 mr-2" />
                Overview
              </TabsTrigger>
              <TabsTrigger value="documentation" className="data-[state=active]:bg-white">
                <FileText className="w-4 h-4 mr-2" />
                Documentation
              </TabsTrigger>
              <TabsTrigger value="keys" className="data-[state=active]:bg-white">
                <Key className="w-4 h-4 mr-2" />
                API Keys
              </TabsTrigger>
              <TabsTrigger value="usage" className="data-[state=active]:bg-white">
                <BarChart3 className="w-4 h-4 mr-2" />
                Usage
              </TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              <div className="grid md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <FileText className="w-5 h-5 text-blue-600" />
                      <span>Lease Analysis API</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">
                      Programmatically analyze lease documents and get structured data about terms, red flags, and
                      recommendations.
                    </p>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• PDF document processing</li>
                      <li>• Multi-language support</li>
                      <li>• Red flag detection</li>
                      <li>• Structured JSON responses</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Zap className="w-5 h-5 text-green-600" />
                      <span>Smart Alerts API</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">
                      Create and manage automated alerts for your clients&apos; important lease dates and deadlines.
                    </p>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Automated notifications</li>
                      <li>• Multiple channels (email, SMS)</li>
                      <li>• Custom scheduling</li>
                      <li>• Bulk operations</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Users className="w-5 h-5 text-purple-600" />
                      <span>Resources API</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">
                      Access our comprehensive database of tenant rights, legal resources, and state-specific
                      information.
                    </p>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• State-specific tenant rights</li>
                      <li>• Legal aid directory</li>
                      <li>• Template documents</li>
                      <li>• Regular updates</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>

              {/* Getting Started */}
              <Card>
                <CardHeader>
                  <CardTitle>Getting Started</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                        <span className="text-blue-600 font-bold">1</span>
                      </div>
                      <h3 className="font-medium text-gray-900 mb-2">Request Access</h3>
                      <p className="text-sm text-gray-600">
                        Contact us to verify your organization and get approved for API access.
                      </p>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                        <span className="text-blue-600 font-bold">2</span>
                      </div>
                      <h3 className="font-medium text-gray-900 mb-2">Generate API Key</h3>
                      <p className="text-sm text-gray-600">
                        Create API keys with specific permissions for your use case.
                      </p>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                        <span className="text-blue-600 font-bold">3</span>
                      </div>
                      <h3 className="font-medium text-gray-900 mb-2">Start Integrating</h3>
                      <p className="text-sm text-gray-600">
                        Use our REST API to integrate Conmates into your workflow.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Documentation Tab */}
            <TabsContent value="documentation" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>API Endpoints</CardTitle>
                  <p className="text-gray-600">Base URL: https://api.conmates.com</p>
                </CardHeader>
                <CardContent className="space-y-6">
                  {endpoints.map((endpoint, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex items-center space-x-3 mb-3">
                        <Badge
                          className={`${
                            endpoint.method === "GET"
                              ? "bg-green-100 text-green-700"
                              : endpoint.method === "POST"
                                ? "bg-blue-100 text-blue-700"
                                : endpoint.method === "PUT"
                                  ? "bg-yellow-100 text-yellow-700"
                                  : "bg-red-100 text-red-700"
                          }`}
                        >
                          {endpoint.method}
                        </Badge>
                        <code className="text-sm bg-gray-100 px-2 py-1 rounded">{endpoint.path}</code>
                      </div>
                      <p className="text-gray-700 mb-4">{endpoint.description}</p>

                      {endpoint.parameters && (
                        <div className="mb-4">
                          <h4 className="font-medium text-gray-900 mb-2">Parameters:</h4>
                          <div className="space-y-2">
                            {endpoint.parameters.map((param, paramIndex) => (
                              <div key={paramIndex} className="flex items-start space-x-3 text-sm">
                                <code className="bg-gray-100 px-2 py-1 rounded">{param.name}</code>
                                <Badge variant="outline" className="text-xs">
                                  {param.type}
                                </Badge>
                                {param.required && <Badge className="bg-red-100 text-red-700 text-xs">required</Badge>}
                                <span className="text-gray-600">{param.description}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="mb-4">
                        <h4 className="font-medium text-gray-900 mb-2">Response:</h4>
                        <p className="text-sm text-gray-600 mb-2">{endpoint.response}</p>
                        <pre className="bg-gray-50 p-3 rounded text-xs overflow-x-auto">
                          <code>{endpoint.example}</code>
                        </pre>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Authentication */}
              <Card>
                <CardHeader>
                  <CardTitle>Authentication</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    All API requests must include your API key in the Authorization header:
                  </p>
                  <pre className="bg-gray-50 p-4 rounded text-sm">
                    <code>{`curl -H "Authorization: Bearer YOUR_API_KEY" \\
     -H "Content-Type: application/json" \\
                     https://api.conmates.com/v1/lease/analyze`}</code>
                  </pre>
                </CardContent>
              </Card>
            </TabsContent>

            {/* API Keys Tab */}
            <TabsContent value="keys" className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">API Keys</h2>
                  <p className="text-gray-600">Manage your API keys and permissions</p>
                </div>
                <Dialog open={isCreatingKey} onOpenChange={setIsCreatingKey}>
                  <DialogTrigger asChild>
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                      <Key className="w-4 h-4 mr-2" />
                      Create API Key
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Create New API Key</DialogTitle>
                      <DialogDescription>
                        Generate a new API key with specific permissions for your organization.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Key Name *</label>
                        <Input
                          placeholder="e.g., Legal Aid Society - Production"
                          value={newKeyForm.name}
                          onChange={(e) => setNewKeyForm((prev) => ({ ...prev, name: e.target.value }))}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Description</label>
                        <Textarea
                          placeholder="Describe how this key will be used..."
                          value={newKeyForm.description}
                          onChange={(e) => setNewKeyForm((prev) => ({ ...prev, description: e.target.value }))}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Permissions *</label>
                        <div className="grid grid-cols-2 gap-3">
                          {availablePermissions.map((permission) => (
                            <div key={permission.id} className="flex items-start space-x-3">
                              <input
                                type="checkbox"
                                id={permission.id}
                                checked={newKeyForm.permissions.includes(permission.id)}
                                onChange={() => togglePermission(permission.id)}
                                className="mt-1"
                              />
                              <div>
                                <label htmlFor={permission.id} className="text-sm font-medium cursor-pointer">
                                  {permission.name}
                                </label>
                                <p className="text-xs text-gray-600">{permission.description}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="flex justify-end space-x-3">
                        <Button variant="outline" onClick={() => setIsCreatingKey(false)}>
                          Cancel
                        </Button>
                        <Button
                          onClick={createAPIKey}
                          disabled={!newKeyForm.name || newKeyForm.permissions.length === 0}
                          className="bg-blue-600 hover:bg-blue-700 text-white"
                        >
                          Create Key
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              <div className="space-y-4">
                {apiKeys.map((key) => (
                  <Card key={key.id}>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="font-medium text-gray-900 mb-1">{key.name}</h3>
                          <div className="flex items-center space-x-4 text-sm text-gray-600">
                            <span>Created {key.createdAt.toLocaleDateString()}</span>
                            {key.lastUsed && <span>Last used {key.lastUsed.toLocaleDateString()}</span>}
                            <span>{key.requestCount.toLocaleString()} requests</span>
                          </div>
                        </div>
                        <Badge className={key.isActive ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}>
                          {key.isActive ? "Active" : "Inactive"}
                        </Badge>
                      </div>

                      <div className="mb-4">
                        <label className="text-sm font-medium text-gray-700 mb-2 block">API Key</label>
                        <div className="flex items-center space-x-2">
                          <code className="flex-1 bg-gray-50 p-2 rounded text-sm font-mono">
                            {key.key.substring(0, 20)}...
                          </code>
                          <Button size="sm" variant="outline" onClick={() => copyToClipboard(key.key)}>
                            <Copy className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>

                      <div>
                        <label className="text-sm font-medium text-gray-700 mb-2 block">Permissions</label>
                        <div className="flex flex-wrap gap-2">
                          {key.permissions.map((permission) => (
                            <Badge key={permission} variant="outline" className="text-xs">
                              {permission}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Usage Tab */}
            <TabsContent value="usage" className="space-y-6">
              <div className="grid md:grid-cols-4 gap-6">
                <Card>
                  <CardContent className="p-6 text-center">
                    <div className="text-2xl font-bold text-blue-600 mb-1">1,247</div>
                    <div className="text-sm text-gray-600">Total Requests</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6 text-center">
                    <div className="text-2xl font-bold text-green-600 mb-1">98.5%</div>
                    <div className="text-sm text-gray-600">Success Rate</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6 text-center">
                    <div className="text-2xl font-bold text-purple-600 mb-1">245ms</div>
                    <div className="text-sm text-gray-600">Avg Response Time</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6 text-center">
                    <div className="text-2xl font-bold text-orange-600 mb-1">156</div>
                    <div className="text-sm text-gray-600">This Month</div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Request Usage by Endpoint</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { endpoint: "/api/v1/lease/analyze", requests: 892, percentage: 71.5 },
                      { endpoint: "/api/v1/alerts/create", requests: 234, percentage: 18.8 },
                      { endpoint: "/api/v1/resources/tenant-rights", requests: 89, percentage: 7.1 },
                      { endpoint: "/api/v1/comparison/analyze", requests: 32, percentage: 2.6 },
                    ].map((item, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex-1">
                          <code className="text-sm">{item.endpoint}</code>
                          <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                            <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${item.percentage}%` }} />
                          </div>
                        </div>
                        <div className="ml-4 text-right">
                          <div className="text-sm font-medium">{item.requests}</div>
                          <div className="text-xs text-gray-600">{item.percentage}%</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
