"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { 
  Activity, 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  RefreshCw, 
  FileText, 
  Settings,
  Zap,
  Shield
} from "lucide-react"

interface HealthCheck {
  component: string;
  status: 'healthy' | 'degraded' | 'unhealthy';
  lastCheck: string;
  issues: string[];
  autoFixes: string[];
}

interface DebugLog {
  timestamp: string;
  level: 'info' | 'warning' | 'error' | 'critical';
  component: string;
  message: string;
  details?: unknown;
  stack?: string;
  autoFixed?: boolean;
}

export default function DebugPage() {
  const [healthData, setHealthData] = useState<HealthCheck[]>([])
  const [logs, setLogs] = useState<DebugLog[]>([])
  const [loading, setLoading] = useState(true)
  const [lastRefresh, setLastRefresh] = useState<Date>(new Date())

  const fetchData = async () => {
    try {
      setLoading(true)
      
      // Fetch health data
      const healthResponse = await fetch('/api/debug/health')
      const health = await healthResponse.json()
      setHealthData(health)

      // Fetch recent logs
      const logsResponse = await fetch('/api/debug/logs')
      const logsData = await logsResponse.json()
      setLogs(logsData)

      setLastRefresh(new Date())
    } catch (error) {
      console.error('Failed to fetch debug data:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
    
    // Auto-refresh every 30 seconds
    const interval = setInterval(fetchData, 30000)
    return () => clearInterval(interval)
  }, [])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'healthy':
        return <CheckCircle className="w-5 h-5 text-green-500" />
      case 'degraded':
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />
      case 'unhealthy':
        return <XCircle className="w-5 h-5 text-red-500" />
      default:
        return <Activity className="w-5 h-5 text-gray-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy':
        return 'bg-green-100 text-green-800'
      case 'degraded':
        return 'bg-yellow-100 text-yellow-800'
      case 'unhealthy':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getLogLevelColor = (level: string) => {
    switch (level) {
      case 'critical':
        return 'bg-red-100 text-red-800'
      case 'error':
        return 'bg-red-50 text-red-700'
      case 'warning':
        return 'bg-yellow-100 text-yellow-800'
      case 'info':
        return 'bg-blue-100 text-blue-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleString()
  }

  const healthyComponents = healthData.filter(h => h.status === 'healthy').length
  const totalComponents = healthData.length
  const systemHealth = totalComponents > 0 ? (healthyComponents / totalComponents) * 100 : 0

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">System Debug Dashboard</h1>
            <p className="text-gray-600">Monitor system health and auto-debug features</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="text-sm text-gray-500">Last updated</p>
              <p className="text-sm font-medium">{formatTimestamp(lastRefresh.toISOString())}</p>
            </div>
            <Button onClick={fetchData} disabled={loading}>
              <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
          </div>
        </div>

        {/* System Overview */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Activity className="w-5 h-5 mr-2" />
              System Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-white rounded-lg border">
                <div className="text-2xl font-bold text-blue-600">{Math.round(systemHealth)}%</div>
                <div className="text-sm text-gray-600">System Health</div>
              </div>
              <div className="text-center p-4 bg-white rounded-lg border">
                <div className="text-2xl font-bold text-green-600">{healthyComponents}</div>
                <div className="text-sm text-gray-600">Healthy Components</div>
              </div>
              <div className="text-center p-4 bg-white rounded-lg border">
                <div className="text-2xl font-bold text-yellow-600">
                  {healthData.filter(h => h.status === 'degraded').length}
                </div>
                <div className="text-sm text-gray-600">Degraded</div>
              </div>
              <div className="text-center p-4 bg-white rounded-lg border">
                <div className="text-2xl font-bold text-red-600">
                  {healthData.filter(h => h.status === 'unhealthy').length}
                </div>
                <div className="text-sm text-gray-600">Unhealthy</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="health" className="space-y-6">
          <TabsList>
            <TabsTrigger value="health">Health Status</TabsTrigger>
            <TabsTrigger value="logs">System Logs</TabsTrigger>
            <TabsTrigger value="auto-fixes">Auto-Fixes</TabsTrigger>
          </TabsList>

          <TabsContent value="health" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {healthData.map((health) => (
                <Card key={health.component}>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span className="capitalize">{health.component.replace('-', ' ')}</span>
                      {getStatusIcon(health.status)}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Status:</span>
                        <Badge className={getStatusColor(health.status)}>
                          {health.status}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Last Check:</span>
                        <span className="text-sm">{formatTimestamp(health.lastCheck)}</span>
                      </div>
                      {health.issues.length > 0 && (
                        <div>
                          <span className="text-sm text-gray-600">Issues:</span>
                          <ul className="mt-1 space-y-1">
                            {health.issues.map((issue, index) => (
                              <li key={index} className="text-sm text-red-600">• {issue}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {health.autoFixes.length > 0 && (
                        <div>
                          <span className="text-sm text-gray-600">Auto-Fixes Applied:</span>
                          <ul className="mt-1 space-y-1">
                            {health.autoFixes.map((fix, index) => (
                              <li key={index} className="text-sm text-green-600">• {fix}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="logs" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="w-5 h-5 mr-2" />
                  Recent System Logs
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {logs.map((log, index) => (
                    <div key={index} className="p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <Badge className={getLogLevelColor(log.level)}>
                            {log.level.toUpperCase()}
                          </Badge>
                          <span className="text-sm font-medium">{log.component}</span>
                          {log.autoFixed && (
                            <Badge className="bg-green-100 text-green-800">
                              <Zap className="w-3 h-3 mr-1" />
                              Auto-Fixed
                            </Badge>
                          )}
                        </div>
                        <span className="text-xs text-gray-500">
                          {formatTimestamp(log.timestamp)}
                        </span>
                      </div>
                      <p className="text-sm text-gray-700">{log.message}</p>
                      {log.details && (
                        <details className="mt-2">
                          <summary className="text-xs text-gray-500 cursor-pointer">
                            View Details
                          </summary>
                          <pre className="mt-1 text-xs bg-gray-100 p-2 rounded overflow-x-auto">
                            {JSON.stringify(log.details, null, 2)}
                          </pre>
                        </details>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="auto-fixes" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="w-5 h-5 mr-2" />
                  Auto-Fix System
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Alert>
                    <Settings className="h-4 w-4" />
                    <AlertDescription>
                      The auto-debug system automatically detects and fixes common issues. 
                      No manual intervention required for most problems.
                    </AlertDescription>
                  </Alert>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <h4 className="font-medium text-blue-900 mb-2">Active Auto-Fixes</h4>
                      <ul className="text-sm text-blue-800 space-y-1">
                        <li>• OpenAI API key configuration</li>
                        <li>• Missing upload directories</li>
                        <li>• Memory usage optimization</li>
                        <li>• File input double-trigger prevention</li>
                        <li>• Cache corruption detection</li>
                      </ul>
                    </div>
                    
                    <div className="p-4 bg-green-50 rounded-lg">
                      <h4 className="font-medium text-green-900 mb-2">Monitoring</h4>
                      <ul className="text-sm text-green-800 space-y-1">
                        <li>• Real-time health checks</li>
                        <li>• Memory usage tracking</li>
                        <li>• Error pattern detection</li>
                        <li>• Automatic log rotation</li>
                        <li>• Performance monitoring</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
