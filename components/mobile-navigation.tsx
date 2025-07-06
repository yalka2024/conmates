"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import { 
  Menu, 
  Home, 
  Upload, 
  MessageCircle, 
  BookOpen, 
  FileText,
  Settings,
  User,
  Search,
  Bell,
  X
} from "lucide-react"
import Link from "next/link"

export default function MobileNavigation() {
  const [isOpen, setIsOpen] = useState(false)

  const navigationItems = [
    {
      href: "/",
      icon: Home,
      label: "Home",
      badge: null
    },
    {
      href: "/upload",
      icon: Upload,
      label: "Analyze",
      badge: null
    },
    {
      href: "/community",
      icon: MessageCircle,
      label: "Community",
      badge: "New"
    },
    {
      href: "/courses",
      icon: BookOpen,
      label: "Courses",
      badge: null
    },
    {
      href: "/resources",
      icon: FileText,
      label: "Resources",
      badge: null
    }
  ]

  const quickActions = [
    {
      href: "/upload",
      icon: Upload,
      label: "Analyze Lease",
      description: "Upload and analyze your lease agreement"
    },
    {
      href: "/community",
      icon: MessageCircle,
      label: "Ask Community",
      description: "Get help from fellow tenants"
    },
    {
      href: "/courses",
      icon: BookOpen,
      label: "Take Courses",
      description: "Learn about tenant rights"
    },
    {
      href: "/resources",
      icon: FileText,
      label: "Browse Resources",
      description: "Find helpful documents and guides"
    }
  ]

  return (
    <>
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center space-x-3">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm">
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold">Menu</h2>
                  <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)}>
                    <X className="w-4 h-4" />
                  </Button>
                </div>
                
                {/* User Profile */}
                <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <User className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <div className="font-medium">Welcome back!</div>
                      <div className="text-sm text-gray-600">Sign in to save progress</div>
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="mb-6">
                  <h3 className="font-medium mb-3">Quick Actions</h3>
                  <div className="space-y-2">
                    {quickActions.map((action) => {
                      const IconComponent = action.icon
                      return (
                        <Link key={action.href} href={action.href} onClick={() => setIsOpen(false)}>
                          <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                              <IconComponent className="w-4 h-4 text-blue-600" />
                            </div>
                            <div className="flex-1">
                              <div className="font-medium">{action.label}</div>
                              <div className="text-sm text-gray-600">{action.description}</div>
                            </div>
                          </div>
                        </Link>
                      )
                    })}
                  </div>
                </div>

                {/* Navigation */}
                <div className="mb-6">
                  <h3 className="font-medium mb-3">Navigation</h3>
                  <div className="space-y-1">
                    {navigationItems.map((item) => {
                      const IconComponent = item.icon
                      return (
                        <Link key={item.href} href={item.href} onClick={() => setIsOpen(false)}>
                          <div className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors">
                            <div className="flex items-center space-x-3">
                              <IconComponent className="w-5 h-5 text-gray-600" />
                              <span className="font-medium">{item.label}</span>
                            </div>
                            {item.badge && (
                              <Badge variant="secondary" className="text-xs">
                                {item.badge}
                              </Badge>
                            )}
                          </div>
                        </Link>
                      )
                    })}
                  </div>
                </div>

                {/* Settings */}
                <div className="border-t pt-4">
                  <Link href="/settings" onClick={() => setIsOpen(false)}>
                    <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                      <Settings className="w-5 h-5 text-gray-600" />
                      <span className="font-medium">Settings</span>
                    </div>
                  </Link>
                </div>
              </SheetContent>
            </Sheet>
            
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <FileText className="w-4 h-4 text-white" />
              </div>
              <span className="font-semibold text-lg">Conmates</span>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm">
              <Search className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="sm">
              <Bell className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200">
        <div className="flex items-center justify-around py-2">
          {navigationItems.map((item) => {
            const IconComponent = item.icon
            return (
              <Link key={item.href} href={item.href} className="flex-1">
                <div className="flex flex-col items-center py-2 px-1">
                  <div className="relative">
                    <IconComponent className="w-6 h-6 text-gray-600" />
                    {item.badge && (
                      <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 text-xs">
                        {item.badge}
                      </Badge>
                    )}
                  </div>
                  <span className="text-xs mt-1 text-gray-600">{item.label}</span>
                </div>
              </Link>
            )
          })}
        </div>
      </div>

      {/* Spacer for fixed header and bottom nav */}
      <div className="lg:hidden">
        <div className="h-16"></div> {/* Header spacer */}
        <div className="h-16"></div> {/* Bottom nav spacer */}
      </div>
    </>
  )
}

