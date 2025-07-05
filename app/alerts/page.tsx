"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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
  Bell,
  DollarSign,
  Home,
  AlertTriangle,
  CheckCircle2,
  Plus,
  Settings,
  Smartphone,
  Mail,
  Clock,
} from "lucide-react"
import Link from "next/link"

interface Alert {
  id: string
  title: string
  description: string
  type: "rent" | "lease" | "maintenance" | "legal" | "general"
  priority: "high" | "medium" | "low"
  dueDate: Date
  isCompleted: boolean
  isEnabled: boolean
}

interface NotificationSettings {
  email: boolean
  sms: boolean
  push: boolean
  reminderDays: number
}

type AlertType = "rent" | "lease" | "maintenance" | "legal" | "general"
type AlertPriority = "low" | "medium" | "high"

interface NewAlert {
  title: string
  description: string
  type: AlertType
  priority: AlertPriority
  dueDate: string
}

export default function AlertsPage() {
  const [alerts, setAlerts] = useState<Alert[]>([
    {
      id: "1",
      title: "Rent Due Tomorrow",
      description: "Your rent payment of $2,400 is due on January 1st",
      type: "rent",
      priority: "high",
      dueDate: new Date(Date.now() + 24 * 60 * 60 * 1000),
      isCompleted: false,
      isEnabled: true,
    },
    {
      id: "2",
      title: "Lease Renewal Decision Due",
      description: "You need to notify your landlord about lease renewal by November 1st",
      type: "lease",
      priority: "high",
      dueDate: new Date("2024-11-01"),
      isCompleted: false,
      isEnabled: true,
    },
    {
      id: "3",
      title: "Security Deposit Return Expected",
      description: "Your landlord has 30 days to return your security deposit (due by February 15th)",
      type: "legal",
      priority: "medium",
      dueDate: new Date("2024-02-15"),
      isCompleted: false,
      isEnabled: true,
    },
    {
      id: "4",
      title: "Annual HVAC Filter Change",
      description: "Replace HVAC filter to maintain good air quality and avoid maintenance issues",
      type: "maintenance",
      priority: "low",
      dueDate: new Date("2024-03-01"),
      isCompleted: false,
      isEnabled: true,
    },
  ])

  const [notificationSettings, setNotificationSettings] = useState<NotificationSettings>({
    email: true,
    sms: false,
    push: true,
    reminderDays: 7,
  })

  const [newAlert, setNewAlert] = useState<NewAlert>({
    title: "",
    description: "",
    type: "general",
    priority: "medium",
    dueDate: "",
  })

  const [isAddingAlert, setIsAddingAlert] = useState(false)

  const toggleAlert = (id: string) => {
    setAlerts((prev) => prev.map((alert) => (alert.id === id ? { ...alert, isCompleted: !alert.isCompleted } : alert)))
  }

  const toggleAlertEnabled = (id: string) => {
    setAlerts((prev) => prev.map((alert) => (alert.id === id ? { ...alert, isEnabled: !alert.isEnabled } : alert)))
  }

  const addAlert = () => {
    if (!newAlert.title || !newAlert.dueDate) return

    const alert: Alert = {
      id: Date.now().toString(),
      title: newAlert.title,
      description: newAlert.description,
      type: newAlert.type,
      priority: newAlert.priority,
      dueDate: new Date(newAlert.dueDate),
      isCompleted: false,
      isEnabled: true,
    }

    setAlerts((prev) => [alert, ...prev])
    setNewAlert({
      title: "",
      description: "",
      type: "general",
      priority: "medium",
      dueDate: "",
    })
    setIsAddingAlert(false)
  }

  const getAlertIcon = (type: string) => {
    switch (type) {
      case "rent":
        return DollarSign
      case "lease":
        return FileText
      case "maintenance":
        return Home
      case "legal":
        return AlertTriangle
      default:
        return Bell
    }
  }

  const getAlertColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "text-red-600 bg-red-100"
      case "medium":
        return "text-yellow-600 bg-yellow-100"
      case "low":
        return "text-green-600 bg-green-100"
      default:
        return "text-gray-600 bg-gray-100"
    }
  }

  const getDaysUntilDue = (dueDate: Date) => {
    const now = new Date()
    const diffTime = dueDate.getTime() - now.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  const upcomingAlerts = alerts.filter((alert) => !alert.isCompleted && alert.isEnabled)
  const completedAlerts = alerts.filter((alert) => alert.isCompleted)

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
                <Bell className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-semibold text-gray-900">Smart Alerts</span>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Smart Lease Alerts</h1>
            <p className="text-lg text-gray-600">
              Never miss important lease deadlines. Get proactive notifications for rent, renewals, and more.
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-red-600 mb-1">
                  {upcomingAlerts.filter((a) => a.priority === "high").length}
                </div>
                <div className="text-sm text-gray-600">High Priority</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-yellow-600 mb-1">
                  {upcomingAlerts.filter((a) => getDaysUntilDue(a.dueDate) <= 7).length}
                </div>
                <div className="text-sm text-gray-600">Due This Week</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-blue-600 mb-1">{upcomingAlerts.length}</div>
                <div className="text-sm text-gray-600">Active Alerts</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-green-600 mb-1">{completedAlerts.length}</div>
                <div className="text-sm text-gray-600">Completed</div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <Tabs defaultValue="alerts" className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <TabsList className="bg-blue-50 p-1">
                <TabsTrigger value="alerts" className="data-[state=active]:bg-white">
                  <Bell className="w-4 h-4 mr-2" />
                  My Alerts
                </TabsTrigger>
                <TabsTrigger value="settings" className="data-[state=active]:bg-white">
                  <Settings className="w-4 h-4 mr-2" />
                  Settings
                </TabsTrigger>
              </TabsList>

              <Dialog open={isAddingAlert} onOpenChange={setIsAddingAlert}>
                <DialogTrigger asChild>
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Alert
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Create New Alert</DialogTitle>
                    <DialogDescription>Set up a custom reminder for important lease-related dates.</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">Alert Title *</Label>
                      <Input
                        id="title"
                        placeholder="e.g., Lease renewal deadline"
                        value={newAlert.title}
                        onChange={(e) => setNewAlert((prev) => ({ ...prev, title: e.target.value }))}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description">Description</Label>
                      <Input
                        id="description"
                        placeholder="Additional details about this alert"
                        value={newAlert.description}
                        onChange={(e) => setNewAlert((prev) => ({ ...prev, description: e.target.value }))}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Type</Label>
                        <select
                          value={newAlert.type}
                          onChange={(e) => setNewAlert((prev) => ({ ...prev, type: e.target.value as AlertType }))}
                          className="w-full p-2 border border-gray-300 rounded-md"
                        >
                          <option value="general">General</option>
                          <option value="rent">Rent</option>
                          <option value="lease">Lease</option>
                          <option value="maintenance">Maintenance</option>
                          <option value="legal">Legal</option>
                        </select>
                      </div>

                      <div className="space-y-2">
                        <Label>Priority</Label>
                        <select
                          value={newAlert.priority}
                          onChange={(e) => setNewAlert((prev) => ({ ...prev, priority: e.target.value as AlertPriority }))}
                          className="w-full p-2 border border-gray-300 rounded-md"
                        >
                          <option value="low">Low</option>
                          <option value="medium">Medium</option>
                          <option value="high">High</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="dueDate">Due Date *</Label>
                      <Input
                        id="dueDate"
                        type="date"
                        value={newAlert.dueDate}
                        onChange={(e) => setNewAlert((prev) => ({ ...prev, dueDate: e.target.value }))}
                      />
                    </div>

                    <div className="flex justify-end space-x-3">
                      <Button variant="outline" onClick={() => setIsAddingAlert(false)}>
                        Cancel
                      </Button>
                      <Button
                        onClick={addAlert}
                        disabled={!newAlert.title || !newAlert.dueDate}
                        className="bg-blue-600 hover:bg-blue-700 text-white"
                      >
                        Create Alert
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            {/* Alerts Tab */}
            <TabsContent value="alerts" className="space-y-6">
              {/* Upcoming Alerts */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Clock className="w-5 h-5 text-blue-600" />
                    <span>Upcoming Alerts</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {upcomingAlerts.length === 0 ? (
                    <div className="text-center py-8">
                      <Bell className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">No upcoming alerts</h3>
                      <p className="text-gray-600">
                        You're all caught up! Create a new alert to stay on top of important dates.
                      </p>
                    </div>
                  ) : (
                    upcomingAlerts.map((alert) => {
                      const Icon = getAlertIcon(alert.type)
                      const daysUntil = getDaysUntilDue(alert.dueDate)

                      return (
                        <div
                          key={alert.id}
                          className="flex items-start space-x-4 p-4 border rounded-lg hover:bg-gray-50"
                        >
                          <div
                            className={`w-10 h-10 rounded-lg flex items-center justify-center ${getAlertColor(alert.priority)}`}
                          >
                            <Icon className="w-5 h-5" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <h3 className="font-medium text-gray-900">{alert.title}</h3>
                              <Badge
                                variant={
                                  alert.priority === "high"
                                    ? "destructive"
                                    : alert.priority === "medium"
                                      ? "default"
                                      : "secondary"
                                }
                              >
                                {alert.priority}
                              </Badge>
                              {daysUntil <= 3 && (
                                <Badge variant="destructive" className="bg-red-100 text-red-700">
                                  {daysUntil === 0
                                    ? "Due Today"
                                    : daysUntil === 1
                                      ? "Due Tomorrow"
                                      : `${daysUntil} days left`}
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-gray-600 mb-2">{alert.description}</p>
                            <div className="flex items-center space-x-4 text-xs text-gray-500">
                              <span>Due: {alert.dueDate.toLocaleDateString()}</span>
                              <span>•</span>
                              <span className="capitalize">{alert.type}</span>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Switch checked={alert.isEnabled} onCheckedChange={() => toggleAlertEnabled(alert.id)} />
                            <Button size="sm" variant="outline" onClick={() => toggleAlert(alert.id)}>
                              <CheckCircle2 className="w-4 h-4 mr-1" />
                              Complete
                            </Button>
                          </div>
                        </div>
                      )
                    })
                  )}
                </CardContent>
              </Card>

              {/* Completed Alerts */}
              {completedAlerts.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <CheckCircle2 className="w-5 h-5 text-green-600" />
                      <span>Completed Alerts</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {completedAlerts.map((alert) => {
                      const Icon = getAlertIcon(alert.type)

                      return (
                        <div
                          key={alert.id}
                          className="flex items-center space-x-4 p-3 bg-green-50 border border-green-200 rounded-lg"
                        >
                          <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                            <Icon className="w-4 h-4 text-green-600" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-medium text-gray-900 line-through">{alert.title}</h3>
                            <p className="text-sm text-gray-600">{alert.description}</p>
                          </div>
                          <CheckCircle2 className="w-5 h-5 text-green-600" />
                        </div>
                      )
                    })}
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            {/* Settings Tab */}
            <TabsContent value="settings" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Notification Preferences</CardTitle>
                  <p className="text-gray-600">Choose how you want to receive alert notifications.</p>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Mail className="w-5 h-5 text-gray-500" />
                        <div>
                          <h4 className="font-medium text-gray-900">Email Notifications</h4>
                          <p className="text-sm text-gray-600">Receive alerts via email</p>
                        </div>
                      </div>
                      <Switch
                        checked={notificationSettings.email}
                        onCheckedChange={(checked) => setNotificationSettings((prev) => ({ ...prev, email: checked }))}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Smartphone className="w-5 h-5 text-gray-500" />
                        <div>
                          <h4 className="font-medium text-gray-900">SMS Notifications</h4>
                          <p className="text-sm text-gray-600">Receive alerts via text message</p>
                        </div>
                      </div>
                      <Switch
                        checked={notificationSettings.sms}
                        onCheckedChange={(checked) => setNotificationSettings((prev) => ({ ...prev, sms: checked }))}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Bell className="w-5 h-5 text-gray-500" />
                        <div>
                          <h4 className="font-medium text-gray-900">Push Notifications</h4>
                          <p className="text-sm text-gray-600">Receive alerts in your browser</p>
                        </div>
                      </div>
                      <Switch
                        checked={notificationSettings.push}
                        onCheckedChange={(checked) => setNotificationSettings((prev) => ({ ...prev, push: checked }))}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="reminderDays">Reminder Days in Advance</Label>
                    <select
                      id="reminderDays"
                      value={notificationSettings.reminderDays}
                      onChange={(e) =>
                        setNotificationSettings((prev) => ({ ...prev, reminderDays: Number.parseInt(e.target.value) }))
                      }
                      className="w-full p-2 border border-gray-300 rounded-md"
                    >
                      <option value={1}>1 day</option>
                      <option value={3}>3 days</option>
                      <option value={7}>7 days</option>
                      <option value={14}>14 days</option>
                      <option value={30}>30 days</option>
                    </select>
                    <p className="text-sm text-gray-600">How many days before the due date should we remind you?</p>
                  </div>

                  <Button className="bg-blue-600 hover:bg-blue-700 text-white">Save Settings</Button>
                </CardContent>
              </Card>

              {/* Auto-Generated Alerts */}
              <Card>
                <CardHeader>
                  <CardTitle>Auto-Generated Alerts</CardTitle>
                  <p className="text-gray-600">We can automatically create alerts based on your lease information.</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-medium text-gray-900 mb-2">Rent Due Reminders</h4>
                      <p className="text-sm text-gray-600 mb-3">Automatic monthly reminders for rent payments</p>
                      <Switch defaultChecked />
                    </div>
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-medium text-gray-900 mb-2">Lease Renewal Alerts</h4>
                      <p className="text-sm text-gray-600 mb-3">Reminders to make renewal decisions</p>
                      <Switch defaultChecked />
                    </div>
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-medium text-gray-900 mb-2">Security Deposit Tracking</h4>
                      <p className="text-sm text-gray-600 mb-3">Track when deposits should be returned</p>
                      <Switch defaultChecked />
                    </div>
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-medium text-gray-900 mb-2">Maintenance Reminders</h4>
                      <p className="text-sm text-gray-600 mb-3">Regular maintenance task reminders</p>
                      <Switch />
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
