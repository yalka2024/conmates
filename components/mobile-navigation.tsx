"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import { Menu, Bot, Users, BookOpen, Bell, Phone, FileText, CreditCard } from "lucide-react"
import Link from "next/link"

export function MobileNavigation() {
  const [open, setOpen] = useState(false)

  const navigationItems = [
    {
      href: "/chat",
      label: "AI Assistant",
      icon: Bot,
      badge: "GPT-4",
    },
    {
      href: "/community",
      label: "Community",
      icon: Users,
    },
    {
      href: "/resources",
      label: "Resources",
      icon: BookOpen,
    },
    {
      href: "/payment",
      label: "Payment",
      icon: CreditCard,
    },
    {
      href: "/alerts",
      label: "Alerts",
      icon: Bell,
    },
    {
      href: "/support",
      label: "Support",
      icon: Phone,
    },
  ]

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="sm" className="md:hidden">
          <Menu className="w-5 h-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[300px] sm:w-[400px]">
        <div className="flex flex-col space-y-4 mt-8">
          <div className="flex items-center space-x-2 mb-6">
            <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-white" />
            </div>
                            <span className="text-xl font-semibold text-gray-900">Conmates</span>
          </div>

          {navigationItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <item.icon className="w-5 h-5 text-gray-600" />
              <span className="text-gray-900 font-medium">{item.label}</span>
              {item.badge && (
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 text-xs ml-auto">
                  {item.badge}
                </Badge>
              )}
            </Link>
          ))}

          <div className="border-t pt-4 mt-6">
            <Link href="/upload" onClick={() => setOpen(false)} className="block w-full">
              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">Upload Lease</Button>
            </Link>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
