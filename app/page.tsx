"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Upload, FileText, Unlock, Bot, MessageSquare, Users, BookOpen, Bell, Phone } from "lucide-react"
import { LanguageSelector } from "@/components/language-selector"
import { MobileNavigation } from "@/components/mobile-navigation"
import Link from "next/link"
import { useState } from "react"
import StateSelector from "@/components/state-selector"
import { useLanguage } from "@/components/language-provider"
import { useStateContext } from "@/components/state-provider"

export default function HomePage() {
  const { t } = useLanguage()
  const { selectedState, setSelectedState } = useStateContext()

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-blue-100">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-semibold text-gray-900">{t('home.leaseEasy')}</span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-6">
              <Link
                href="/chat"
                className="text-gray-600 hover:text-blue-600 transition-colors flex items-center space-x-1"
              >
                <Bot className="w-4 h-4" />
                <span>{t('home.aiAssistant')}</span>
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 text-xs ml-1">
                  GPT-4
                </Badge>
              </Link>
              <Link href="/community" className="text-gray-600 hover:text-blue-600 transition-colors">
                {t('home.community')}
              </Link>
              <Link href="/resources" className="text-gray-600 hover:text-blue-600 transition-colors">
                {t('home.resources')}
              </Link>
              <Link href="/payment" className="text-gray-600 hover:text-blue-600 transition-colors">
                {t('home.payment')}
              </Link>
              <Link href="/alerts" className="text-gray-600 hover:text-blue-600 transition-colors">
                {t('home.alerts')}
              </Link>
              <Link href="/support" className="text-gray-600 hover:text-blue-600 transition-colors">
                {t('home.support')}
              </Link>
            </nav>

            <div className="flex items-center space-x-3">
              <LanguageSelector />
              <MobileNavigation />
            </div>
          </div>
        </div>
      </header>

      <main>
        <div className="container mx-auto px-4 pt-6">
          <StateSelector value={selectedState} onChange={setSelectedState} />
          {selectedState && (
            <div className="mb-4 text-blue-700 font-semibold">{t('home.youSelected')}: {selectedState}</div>
          )}
        </div>

        {/* Hero Section */}
        <section className="py-20 lg:py-32 bg-gradient-to-b from-blue-50 to-white">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              {t('home.hero.title')}
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
              {t('home.hero.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/upload">
                <Button
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  <Upload className="w-5 h-5 mr-2" />
                  {t('home.hero.cta')}
                </Button>
              </Link>
              <Link href="/chat">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-purple-200 text-purple-700 hover:bg-purple-50 px-8 py-4 text-lg font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 bg-transparent"
                >
                  <Bot className="w-5 h-5 mr-2" />
                  {t('home.askAIAssistant')}
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* AI Assistant Highlight */}
        <section className="py-16 bg-gradient-to-r from-purple-50 to-indigo-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="flex items-center justify-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center">
                  <Bot className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900">{t('home.meetAIAssistant')}</h2>
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                  {t('home.poweredByGPT4')}
                </Badge>
              </div>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                {t('home.aiAssistantDescription')}
              </p>
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <FileText className="w-8 h-8 text-purple-600 mb-3 mx-auto" />
                  <h3 className="font-semibold text-gray-900 mb-2">{t('home.leaseAnalysis')}</h3>
                  <p className="text-sm text-gray-600">
                    {t('home.leaseAnalysisDesc')}
                  </p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <MessageSquare className="w-8 h-8 text-purple-600 mb-3 mx-auto" />
                  <h3 className="font-semibold text-gray-900 mb-2">{t('home.realTimeChat')}</h3>
                  <p className="text-sm text-gray-600">
                    {t('home.realTimeChatDesc')}
                  </p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <BookOpen className="w-8 h-8 text-purple-600 mb-3 mx-auto" />
                  <h3 className="font-semibold text-gray-900 mb-2">{t('home.legalGuidance')}</h3>
                  <p className="text-sm text-gray-600">
                    {t('home.legalGuidanceDesc')}
                  </p>
                </div>
              </div>
              <Link href="/chat">
                <Button
                  size="lg"
                  className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 text-lg font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  <Bot className="w-5 h-5 mr-2" />
                  {t('home.startChattingNow')}
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-16">{t('how.title')}</h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {/* Step 1 */}
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Upload className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">1. {t('how.step1')}</h3>
                <p className="text-gray-600 leading-relaxed">
                  {t('how.step1.desc')}
                </p>
              </div>

              {/* Step 2 */}
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <FileText className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">2. {t('how.step2')}</h3>
                <p className="text-gray-600 leading-relaxed">
                  {t('how.step2.desc')}
                </p>
              </div>

              {/* Step 3 */}
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Unlock className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">3. {t('how.step3')}</h3>
                <p className="text-gray-600 leading-relaxed">
                  {t('how.step3.desc')}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Complete Ecosystem Section */}
        <section className="py-20 bg-blue-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-16">{t('home.completeSupportEcosystem')}</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              <Link href="/community" className="group">
                <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                    <Users className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-blue-600">{t('home.communitySupport')}</h3>
                  <p className="text-sm text-gray-600">
                    {t('home.communitySupportDesc')}
                  </p>
                </div>
              </Link>

              <Link href="/resources" className="group">
                <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                    <BookOpen className="w-6 h-6 text-purple-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-blue-600">{t('home.legalResources')}</h3>
                  <p className="text-sm text-gray-600">
                    {t('home.legalResourcesDesc')}
                  </p>
                </div>
              </Link>

              <Link href="/alerts" className="group">
                <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
                    <Bell className="w-6 h-6 text-yellow-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-blue-600">{t('home.smartAlerts')}</h3>
                  <p className="text-sm text-gray-600">
                    {t('home.smartAlertsDesc')}
                  </p>
                </div>
              </Link>

              <Link href="/support" className="group">
                <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                    <Phone className="w-6 h-6 text-red-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-blue-600">{t('home.humanSupport')}</h3>
                  <p className="text-sm text-gray-600">{t('home.humanSupportDesc')}</p>
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">{t('home.readyToUnderstand')}</h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              {t('home.readyToUnderstandDesc')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/upload">
                <Button
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  <Upload className="w-5 h-5 mr-2" />
                  {t('home.getStartedNow')}
                </Button>
              </Link>
              <Link href="/chat">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-purple-200 text-purple-700 hover:bg-purple-50 px-8 py-4 text-lg font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 bg-transparent"
                >
                  <Bot className="w-5 h-5 mr-2" />
                  {t('home.tryAIAssistant')}
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-200">
        <div className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                  <FileText className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-semibold text-gray-900">{t('home.leaseEasy')}</span>
              </div>
              <p className="text-gray-600 max-w-md">
                {t('home.footerDesc')}
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">{t('home.platform')}</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/chat" className="text-gray-600 hover:text-blue-600 transition-colors">
                    {t('home.aiAssistant')}
                  </Link>
                </li>
                <li>
                  <Link href="/community" className="text-gray-600 hover:text-blue-600 transition-colors">
                    {t('home.community')}
                  </Link>
                </li>
                <li>
                  <Link href="/resources" className="text-gray-600 hover:text-blue-600 transition-colors">
                    {t('home.resources')}
                  </Link>
                </li>
                <li>
                  <Link href="/support" className="text-gray-600 hover:text-blue-600 transition-colors">
                    {t('home.support')}
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">{t('home.legal')}</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">
                    {t('home.privacyPolicy')}
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">
                    {t('home.termsOfService')}
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">
                    {t('home.about')}
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">
                    {t('home.contact')}
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-200 mt-8 pt-8 text-center">
            <p className="text-gray-500">{t('home.copyright')}</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
