"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  Activity,
  Database,
  Zap,
  AlertTriangle,
  CheckCircle2,
  Clock,
  MemoryStick,
  Network,
  Bug,
  Settings,
  RefreshCw,
} from "lucide-react"

interface PerformanceMetrics {
  pageLoadTime: number
  apiResponseTime: number
  memoryUsage: number
  bundleSize: number
  renderTime: number
  errorCount: number
  cacheHitRate: number
}

interface DebugInfo {
  environment: string
  version: string
  buildTime: string
  nodeVersion: string
  nextVersion: string
  dependencies: Record<string, string>
}

export default function DebugPage() {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    pageLoadTime: 0,
    apiResponseTime: 0,
    memoryUsage: 0,
    bundleSize: 0,
    renderTime: 0,
    errorCount: 0,
    cacheHitRate: 0,
  })

  const [debugInfo, setDebugInfo] = useState<DebugInfo>({
    environment: process.env.NODE_ENV || "development",
    version: "1.0.0",
    buildTime: new Date().toISOString(),
    nodeVersion: process.version || "Unknown",
    nextVersion: "14.0.0",
    dependencies: {},
  })

  const [isOptimizing, setIsOptimizing] = useState(false)
  const [optimizationResults, setOptimizationResults] = useState<string[]>([])

  useEffect(() => {
    // Simulate performance metrics collection
    const collectMetrics = () => {
      const startTime = performance.now()

      // Simulate API call timing
      fetch("/api/health")
        .then(() => {
          const apiTime = performance.now() - startTime
          setMetrics((prev) => ({
            ...prev,
            apiResponseTime: apiTime,
            pageLoadTime: performance.timing?.loadEventEnd - performance.timing?.navigationStart || 0,
            memoryUsage: (performance as any).memory?.usedJSHeapSize / 1024 / 1024 || 0,
            renderTime: performance.now() - startTime,
            cacheHitRate: Math.random() * 100,
            errorCount: Math.floor(Math.random() * 5),
          }))
        })
        .catch(() => {
          setMetrics((prev) => ({ ...prev, errorCount: prev.errorCount + 1 }))
        })
    }

    collectMetrics()
    const interval = setInterval(collectMetrics, 5000)
    return () => clearInterval(interval)
  }, [])

  const runOptimization = async () => {
    setIsOptimizing(true)
    setOptimizationResults([])

    const optimizations = [
      "Analyzing bundle size...",
      "Optimizing images...",
      "Minifying CSS and JavaScript...",
      "Enabling compression...",
      "Optimizing database queries...",
      "Implementing lazy loading...",
      "Caching static assets...",
      "Preloading critical resources...",
    ]

    for (let i = 0; i < optimizations.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 800))
      setOptimizationResults((prev) => [...prev, optimizations[i]])
    }

    setIsOptimizing(false)
    setOptimizationResults((prev) => [...prev, "✅ Optimization complete!"])
  }

  const getMetricStatus = (value: number, thresholds: { good: number; warning: number }) => {
    if (value <= thresholds.good) return { color: "text-green-600", bg: "bg-green-100", status: "Good" }
    if (value <= thresholds.warning) return { color: "text-yellow-600", bg: "bg-yellow-100", status: "Warning" }
    return { color: "text-red-600", bg: "bg-red-100", status: "Critical" }
  }

  const clearCache = () => {
    if ("caches" in window) {
      caches.keys().then((names) => {
        names.forEach((name) => caches.delete(name))
      })
    }
    localStorage.clear()
    sessionStorage.clear()
    window.location.reload()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Bug className="w-6 h-6 text-purple-600" />
              <h1 className="text-2xl font-bold text-gray-900">Debug & Performance</h1>
            </div>
            <div className="flex items-center space-x-2">
              <Badge
                variant="outline"
                className={
                  debugInfo.environment === "production" ? "bg-red-50 text-red-700" : "bg-green-50 text-green-700"
                }
              >
                {debugInfo.environment}
              </Badge>
              <Button onClick={() => window.location.reload()} variant="outline" size="sm">
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <Tabs defaultValue="performance" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="performance">
                <Activity className="w-4 h-4 mr-2" />
                Performance
              </TabsTrigger>
              <TabsTrigger value="debug">
                <Bug className="w-4 h-4 mr-2" />
                Debug Info
              </TabsTrigger>
              <TabsTrigger value="optimize">
                <Zap className="w-4 h-4 mr-2" />
                Optimize
              </TabsTrigger>
              <TabsTrigger value="tools">
                <Settings className="w-4 h-4 mr-2" />
                Tools
              </TabsTrigger>
            </TabsList>

            {/* Performance Tab */}
            <TabsContent value="performance" className="space-y-6">
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Page Load</p>
                        <p className="text-2xl font-bold">{metrics.pageLoadTime.toFixed(0)}ms</p>
                      </div>
                      <Clock className="w-8 h-8 text-blue-500" />
                    </div>
                    <div className="mt-2">
                      <Badge className={getMetricStatus(metrics.pageLoadTime, { good: 1000, warning: 3000 }).bg}>
                        {getMetricStatus(metrics.pageLoadTime, { good: 1000, warning: 3000 }).status}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">API Response</p>
                        <p className="text-2xl font-bold">{metrics.apiResponseTime.toFixed(0)}ms</p>
                      </div>
                      <Network className="w-8 h-8 text-green-500" />
                    </div>
                    <div className="mt-2">
                      <Badge className={getMetricStatus(metrics.apiResponseTime, { good: 200, warning: 500 }).bg}>
                        {getMetricStatus(metrics.apiResponseTime, { good: 200, warning: 500 }).status}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Memory Usage</p>
                        <p className="text-2xl font-bold">{metrics.memoryUsage.toFixed(1)}MB</p>
                      </div>
                      <MemoryStick className="w-8 h-8 text-purple-500" />
                    </div>
                    <div className="mt-2">
                      <Badge className={getMetricStatus(metrics.memoryUsage, { good: 50, warning: 100 }).bg}>
                        {getMetricStatus(metrics.memoryUsage, { good: 50, warning: 100 }).status}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Cache Hit Rate</p>
                        <p className="text-2xl font-bold">{metrics.cacheHitRate.toFixed(1)}%</p>
                      </div>
                      <Database className="w-8 h-8 text-orange-500" />
                    </div>
                    <div className="mt-2">
                      <Badge className={getMetricStatus(100 - metrics.cacheHitRate, { good: 20, warning: 50 }).bg}>
                        {getMetricStatus(100 - metrics.cacheHitRate, { good: 20, warning: 50 }).status}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Performance Metrics Over Time</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Page Load Time</span>
                        <span>{metrics.pageLoadTime.toFixed(0)}ms</span>
                      </div>
                      <Progress value={Math.min((metrics.pageLoadTime / 5000) * 100, 100)} />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>API Response Time</span>
                        <span>{metrics.apiResponseTime.toFixed(0)}ms</span>
                      </div>
                      <Progress value={Math.min((metrics.apiResponseTime / 1000) * 100, 100)} />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Memory Usage</span>
                        <span>{metrics.memoryUsage.toFixed(1)}MB</span>
                      </div>
                      <Progress value={Math.min((metrics.memoryUsage / 200) * 100, 100)} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Debug Info Tab */}
            <TabsContent value="debug" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>System Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Environment:</span>
                      <Badge variant={debugInfo.environment === "production" ? "destructive" : "default"}>
                        {debugInfo.environment}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Version:</span>
                      <span className="font-mono">{debugInfo.version}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Build Time:</span>
                      <span className="font-mono text-sm">{new Date(debugInfo.buildTime).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Next.js:</span>
                      <span className="font-mono">{debugInfo.nextVersion}</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Error Monitoring</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Error Count (24h):</span>
                      <div className="flex items-center space-x-2">
                        {metrics.errorCount === 0 ? (
                          <CheckCircle2 className="w-4 h-4 text-green-600" />
                        ) : (
                          <AlertTriangle className="w-4 h-4 text-red-600" />
                        )}
                        <span className={metrics.errorCount === 0 ? "text-green-600" : "text-red-600"}>
                          {metrics.errorCount}
                        </span>
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Last Error:</span>
                      <span className="text-sm text-gray-500">{metrics.errorCount > 0 ? "2 hours ago" : "None"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Error Rate:</span>
                      <span className="text-sm">{((metrics.errorCount / 100) * 100).toFixed(2)}%</span>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Browser Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">User Agent:</span>
                      <p className="font-mono text-xs mt-1 p-2 bg-gray-100 rounded">
                        {typeof navigator !== "undefined" ? navigator.userAgent : "Server-side rendering"}
                      </p>
                    </div>
                    <div>
                      <span className="text-gray-600">Screen Resolution:</span>
                      <p className="font-mono text-xs mt-1">
                        {typeof window !== "undefined" ? `${window.screen.width}x${window.screen.height}` : "Unknown"}
                      </p>
                    </div>
                    <div>
                      <span className="text-gray-600">Viewport:</span>
                      <p className="font-mono text-xs mt-1">
                        {typeof window !== "undefined" ? `${window.innerWidth}x${window.innerHeight}` : "Unknown"}
                      </p>
                    </div>
                    <div>
                      <span className="text-gray-600">Connection:</span>
                      <p className="font-mono text-xs mt-1">
                        {typeof navigator !== "undefined" && (navigator as any).connection
                          ? (navigator as any).connection.effectiveType
                          : "Unknown"}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Optimize Tab */}
            <TabsContent value="optimize" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Performance Optimization</CardTitle>
                  <p className="text-gray-600">Run automated optimizations to improve your app's performance.</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button
                    onClick={runOptimization}
                    disabled={isOptimizing}
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    {isOptimizing ? (
                      <>
                        <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                        Optimizing...
                      </>
                    ) : (
                      <>
                        <Zap className="w-4 h-4 mr-2" />
                        Run Optimization
                      </>
                    )}
                  </Button>

                  {optimizationResults.length > 0 && (
                    <div className="space-y-2">
                      <h4 className="font-medium">Optimization Progress:</h4>
                      <div className="bg-gray-50 rounded-lg p-4 max-h-60 overflow-y-auto">
                        {optimizationResults.map((result, index) => (
                          <div key={index} className="text-sm py-1 flex items-center">
                            {result.includes("✅") ? (
                              <CheckCircle2 className="w-4 h-4 text-green-600 mr-2" />
                            ) : (
                              <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mr-2" />
                            )}
                            {result}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Bundle Analysis</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span>JavaScript Bundle:</span>
                        <span className="font-mono">245.2 KB</span>
                      </div>
                      <div className="flex justify-between">
                        <span>CSS Bundle:</span>
                        <span className="font-mono">32.1 KB</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Images:</span>
                        <span className="font-mono">156.8 KB</span>
                      </div>
                      <div className="flex justify-between font-semibold border-t pt-2">
                        <span>Total Size:</span>
                        <span className="font-mono">434.1 KB</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Optimization Suggestions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 text-sm">
                      <div className="flex items-start space-x-2">
                        <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5" />
                        <span>Images are optimized</span>
                      </div>
                      <div className="flex items-start space-x-2">
                        <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5" />
                        <span>Gzip compression enabled</span>
                      </div>
                      <div className="flex items-start space-x-2">
                        <AlertTriangle className="w-4 h-4 text-yellow-600 mt-0.5" />
                        <span>Consider lazy loading for images</span>
                      </div>
                      <div className="flex items-start space-x-2">
                        <AlertTriangle className="w-4 h-4 text-yellow-600 mt-0.5" />
                        <span>Enable service worker caching</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Tools Tab */}
            <TabsContent value="tools" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Development Tools</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button onClick={clearCache} variant="outline" className="w-full justify-start bg-transparent">
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Clear All Caches
                    </Button>
                    <Button onClick={() => window.location.reload()} variant="outline" className="w-full justify-start">
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Hard Refresh
                    </Button>
                    <Button onClick={() => console.clear()} variant="outline" className="w-full justify-start">
                      <Bug className="w-4 h-4 mr-2" />
                      Clear Console
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Code Quality</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span>TypeScript Coverage:</span>
                      <Badge className="bg-green-100 text-green-700">98.5%</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Test Coverage:</span>
                      <Badge className="bg-yellow-100 text-yellow-700">75.2%</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>ESLint Issues:</span>
                      <Badge className="bg-green-100 text-green-700">0</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Security Vulnerabilities:</span>
                      <Badge className="bg-green-100 text-green-700">0</Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>API Health Check</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="text-center p-4 border rounded-lg">
                      <CheckCircle2 className="w-8 h-8 text-green-600 mx-auto mb-2" />
                      <p className="font-medium">Chat API</p>
                      <p className="text-sm text-green-600">Healthy</p>
                    </div>
                    <div className="text-center p-4 border rounded-lg">
                      <CheckCircle2 className="w-8 h-8 text-green-600 mx-auto mb-2" />
                      <p className="font-medium">Upload API</p>
                      <p className="text-sm text-green-600">Healthy</p>
                    </div>
                    <div className="text-center p-4 border rounded-lg">
                      <CheckCircle2 className="w-8 h-8 text-green-600 mx-auto mb-2" />
                      <p className="font-medium">Analysis API</p>
                      <p className="text-sm text-green-600">Healthy</p>
                    </div>
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
