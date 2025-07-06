import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BarChart3, 
  Users, 
  FileText, 
  DollarSign, 
  TrendingUp, 
  Activity,
  Calendar,
  MapPin,
  Clock,
  CheckCircle,
  AlertTriangle,
  Download
} from "lucide-react";

export default function AnalyticsPage() {
  // Mock data for demonstration
  const analyticsData = {
    totalUsers: 1247,
    totalAnalyses: 2156,
    totalRevenue: 43250,
    conversionRate: 23.4,
    averageSessionTime: "4m 32s",
    topStates: [
      { state: "California", analyses: 342 },
      { state: "Texas", analyses: 298 },
      { state: "New York", analyses: 267 },
      { state: "Florida", analyses: 234 },
      { state: "Illinois", analyses: 189 }
    ],
    recentActivity: [
      { type: "analysis", user: "User 1234", time: "2 minutes ago", status: "completed" },
      { type: "payment", user: "User 5678", time: "5 minutes ago", status: "completed" },
      { type: "analysis", user: "User 9012", time: "8 minutes ago", status: "processing" },
      { type: "payment", user: "User 3456", time: "12 minutes ago", status: "completed" },
      { type: "analysis", user: "User 7890", time: "15 minutes ago", status: "completed" }
    ],
    monthlyStats: {
      jan: 156,
      feb: 189,
      mar: 234,
      apr: 298,
      may: 342,
      jun: 389
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Analytics Dashboard</h1>
          <p className="text-gray-600">Monitor platform performance and user activity</p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analyticsData.totalUsers.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">+12%</span> from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Analyses</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analyticsData.totalAnalyses.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">+18%</span> from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${analyticsData.totalRevenue.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">+24%</span> from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analyticsData.conversionRate}%</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">+2.1%</span> from last month
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Analytics */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="activity">Recent Activity</TabsTrigger>
            <TabsTrigger value="geography">Geography</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Monthly Trends */}
              <Card>
                <CardHeader>
                  <CardTitle>Monthly Analysis Trends</CardTitle>
                  <CardDescription>Number of lease analyses per month</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {Object.entries(analyticsData.monthlyStats).map(([month, count]) => (
                      <div key={month} className="flex items-center justify-between">
                        <span className="text-sm font-medium capitalize">{month}</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-32 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-blue-600 h-2 rounded-full" 
                              style={{ width: `${(count / 400) * 100}%` }}
                            />
                          </div>
                          <span className="text-sm text-gray-600">{count}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Platform Stats */}
              <Card>
                <CardHeader>
                  <CardTitle>Platform Statistics</CardTitle>
                  <CardDescription>Key performance indicators</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Average Session Time</span>
                      <Badge variant="secondary">{analyticsData.averageSessionTime}</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Success Rate</span>
                      <Badge variant="secondary" className="bg-green-100 text-green-800">99.2%</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Active Users Today</span>
                      <Badge variant="secondary">247</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Premium Subscriptions</span>
                      <Badge variant="secondary">156</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="activity" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Live platform activity feed</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analyticsData.recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        activity.type === 'analysis' ? 'bg-blue-100' : 'bg-green-100'
                      }`}>
                        {activity.type === 'analysis' ? (
                          <FileText className="w-4 h-4 text-blue-600" />
                        ) : (
                          <DollarSign className="w-4 h-4 text-green-600" />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">
                          {activity.type === 'analysis' ? 'Lease Analysis' : 'Payment'} by {activity.user}
                        </p>
                        <p className="text-xs text-gray-500">{activity.time}</p>
                      </div>
                      <Badge variant={activity.status === 'completed' ? 'default' : 'secondary'}>
                        {activity.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="geography" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Geographic Distribution</CardTitle>
                <CardDescription>Lease analyses by state</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analyticsData.topStates.map((state, index) => (
                    <div key={state.state} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <span className="text-sm font-medium text-gray-500">#{index + 1}</span>
                        <MapPin className="w-4 h-4 text-gray-400" />
                        <span className="font-medium">{state.state}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full" 
                            style={{ width: `${(state.analyses / 400) * 100}%` }}
                          />
                        </div>
                        <span className="text-sm text-gray-600">{state.analyses}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="performance" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* System Performance */}
              <Card>
                <CardHeader>
                  <CardTitle>System Performance</CardTitle>
                  <CardDescription>Platform health and response times</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">API Response Time</span>
                      <Badge variant="secondary" className="bg-green-100 text-green-800">2.3s avg</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Uptime</span>
                      <Badge variant="secondary" className="bg-green-100 text-green-800">99.9%</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Error Rate</span>
                      <Badge variant="secondary" className="bg-green-100 text-green-800">0.1%</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Active Connections</span>
                      <Badge variant="secondary">1,247</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* User Engagement */}
              <Card>
                <CardHeader>
                  <CardTitle>User Engagement</CardTitle>
                  <CardDescription>How users interact with the platform</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Pages per Session</span>
                      <Badge variant="secondary">4.2</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Bounce Rate</span>
                      <Badge variant="secondary" className="bg-green-100 text-green-800">23%</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Return Users</span>
                      <Badge variant="secondary">67%</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Mobile Usage</span>
                      <Badge variant="secondary">58%</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Export Section */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Export Data</CardTitle>
            <CardDescription>Download analytics reports and data</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4">
              <Button variant="outline" className="flex items-center space-x-2">
                <Download className="w-4 h-4" />
                <span>Export CSV</span>
              </Button>
              <Button variant="outline" className="flex items-center space-x-2">
                <Download className="w-4 h-4" />
                <span>Export PDF Report</span>
              </Button>
              <Button variant="outline" className="flex items-center space-x-2">
                <Download className="w-4 h-4" />
                <span>Export JSON Data</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 