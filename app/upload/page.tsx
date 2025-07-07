"use client"

import type React from "react"
import { useState, useCallback, useRef, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Upload, FileText, AlertCircle, CheckCircle2, Loader2, ArrowLeft, Shield, Zap, Crown, AlertTriangle, Star, CheckCircle, Info } from "lucide-react"
import Link from "next/link"
import { useLanguage } from "@/components/language-provider"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

import { useRouter } from "next/navigation"

type UploadState = "idle" | "dragover" | "uploading" | "success" | "error"

interface FileError {
  type: "size" | "format" | "upload" | "network"
  message: string
}

export default function UploadPage() {
  const { t } = useLanguage()
  const [uploadState, setUploadState] = useState<UploadState>("idle")
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [error, setError] = useState<FileError | null>(null)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [showPremium, setShowPremium] = useState(false)
  const [analysisType, setAnalysisType] = useState<'free' | 'premium'>('free')
  const router = useRouter()

  // Wrap acceptedTypes in useMemo to stabilize it
  const acceptedTypes = useMemo(() => ["application/pdf"], [])
  const maxFileSize = 10 * 1024 * 1024 // 10MB

  const handleFileSelect = useCallback(
    (file: File) => {
      // Define functions inside useCallback
      const validateFile = (file: File): FileError | null => {
        if (!acceptedTypes.includes(file.type)) {
          return {
            type: "format",
            message: t("upload.formatError"),
          }
        }
        if (file.size > maxFileSize) {
          return {
            type: "size",
            message: t("upload.fileSizeError"),
          }
        }
        return null
      }

      const uploadFile = async (file: File) => {
        setUploadState("uploading")
        setUploadProgress(0)

        const progressInterval = setInterval(() => {
          setUploadProgress((prev) => {
            if (prev >= 90) {
              clearInterval(progressInterval)
              return 90
            }
            return prev + Math.random() * 15
          })
        }, 200)

        try {
          const formData = new FormData()
          formData.append("file", file)
          formData.append("tier", analysisType)

          const response = await fetch("/api/upload", {
            method: "POST",
            body: formData,
          })

          clearInterval(progressInterval)
          setUploadProgress(100)

          if (!response.ok) {
            throw new Error("Upload failed")
          }

          const result = await response.json()
          setTimeout(() => {
            setUploadState("success")
            localStorage.setItem("leaseAnalysis", JSON.stringify(result))
          }, 500)
        } catch {
          clearInterval(progressInterval)
          setError({
            type: "upload",
            message: t("upload.uploadError"),
          })
          setUploadState("error")
        }
      }

      const fileError = validateFile(file)

      if (fileError) {
        setError(fileError)
        setUploadState("error")
        return
      }

      setSelectedFile(file)
      setError(null)
      uploadFile(file)
    },
    [acceptedTypes, maxFileSize, t, analysisType] // Dependencies updated
  )

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setUploadState("idle")

      const files = Array.from(e.dataTransfer.files)
      if (files.length > 0) {
        handleFileSelect(files[0])
      }
    },
    [handleFileSelect]
  )

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setUploadState("dragover")
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setUploadState("idle")
  }, [])

  const handleBrowseClick = (e?: React.MouseEvent) => {
    // Prevent event bubbling to avoid double triggers
    if (e) {
      e.preventDefault()
      e.stopPropagation()
    }
    
    if (uploadState !== "uploading") {
      // Use a simple approach - create input and trigger it
      const input = document.createElement('input')
      input.type = 'file'
      input.accept = '.pdf'
      input.style.display = 'none'
      
      const handleFileChange = (e: Event) => {
        const target = e.target as HTMLInputElement
        if (target.files && target.files.length > 0) {
          console.log('File selected:', target.files[0].name)
          handleFileSelect(target.files[0])
        }
        // Clean up
        input.removeEventListener('change', handleFileChange)
        if (document.body.contains(input)) {
          document.body.removeChild(input)
        }
      }
      
      input.addEventListener('change', handleFileChange)
      document.body.appendChild(input)
      input.click()
    }
  }

  const handleRetry = () => {
    setUploadState("idle")
    setSelectedFile(null)
    setError(null)
    setUploadProgress(0)
  }

  const getUploadZoneStyles = () => {
    const baseStyles =
      "relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200 cursor-pointer"

    switch (uploadState) {
      case "dragover":
        return `${baseStyles} border-blue-400 bg-blue-50`
      case "uploading":
        return `${baseStyles} border-blue-300 bg-blue-25 cursor-not-allowed`
      case "error":
        return `${baseStyles} border-red-300 bg-red-50`
      case "success":
        return `${baseStyles} border-green-300 bg-green-50`
      default:
        return `${baseStyles} border-gray-300 hover:border-blue-400 hover:bg-blue-25`
    }
  }

  const handlePremiumUpgrade = () => {
    router.push('/payment?plan=premium-analysis')
  }

  const handleAskLawyer = () => {
    router.push('/payment?plan=lawyer-consultation')
  }

  const handleUpload = async () => {
    if (!selectedFile) return;

    setUploadState("uploading");
    setUploadProgress(0);

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("tier", analysisType);

    try {
      // Simulate progress
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 200);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      clearInterval(progressInterval);
      setUploadProgress(100);

      if (response.ok) {
        const result = await response.json();
        
        if (analysisType === 'premium') {
          // For premium analysis, redirect to payment
          const paymentResponse = await fetch("/api/create-checkout-session", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              tier: "premium",
              analysisId: Date.now().toString(), // Simple ID for demo
            }),
          });

          if (paymentResponse.ok) {
            const { url } = await paymentResponse.json();
            window.location.href = url;
          } else {
            throw new Error("Payment setup failed");
          }
        } else {
          // For free analysis, store and redirect to summary
          localStorage.setItem("leaseAnalysis", JSON.stringify(result));
          window.location.href = "/summary";
        }
      } else {
        throw new Error("Upload failed");
      }
    } catch (error) {
      console.error("Upload error:", error);
    } finally {
      setUploadState("error");
      setUploadProgress(0);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <header className="border-b border-blue-100 bg-white">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <ArrowLeft className="w-5 h-5 text-gray-600" />
              <span className="text-gray-600 hover:text-blue-600 transition-colors">{t("upload.backToHome")}</span>
            </Link>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-semibold text-gray-900">{t("upload.leaseEasy")}</span>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 md:py-16">
        <div className="max-w-2xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{t("upload.uploadYourLease")}</h1>
            <p className="text-lg text-gray-600 leading-relaxed">
              {t("upload.uploadInstructions")} {/* Removed replace() - rely on translation fix */}
            </p>
          </div>

          <Card className="shadow-lg border-0">
            <CardContent className="p-6 md:p-8">
              {uploadState === "success" ? (
                /* Success State */
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-8 h-8 text-green-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">{t("upload.analysisComplete")}</h2>
                  <p className="text-gray-600 mb-6">{t("upload.analysisSuccess")}</p>
                  <Link href="/summary">
                    <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
                      {t("upload.viewLeaseSummary")}
                    </Button>
                  </Link>
                </div>
              ) : (
                <>
                  {/* Upload Zone */}
                  <div
                    className={getUploadZoneStyles()}
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onClick={uploadState === "uploading" ? undefined : handleBrowseClick}
                    role="button"
                    tabIndex={0}
                    aria-label="Upload lease document"
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault()
                        if (uploadState !== "uploading") handleBrowseClick()
                      }
                    }}
                  >
                    {/* File input is created dynamically */}

                    {uploadState === "uploading" ? (
                      /* Loading State */
                      <div className="space-y-4">
                        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                          <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold text-gray-900 mb-2">Analyzing your lease...</h3>
                          <p className="text-gray-600 mb-4">
                            Our AI is reading through your document and identifying key terms.
                          </p>
                          <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                            <div
                              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${uploadProgress}%` }}
                            />
                          </div>
                          <p className="text-sm text-gray-500">{Math.round(uploadProgress)}% complete</p>
                        </div>
                      </div>
                    ) : uploadState === "error" && error ? (
                      /* Error State */
                      <div className="space-y-4">
                        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto">
                          <AlertCircle className="w-8 h-8 text-red-600" />
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold text-gray-900 mb-2">Oops! Something went wrong</h3>
                          <p className="text-red-600 mb-4">{error.message}</p>
                          <Button
                            onClick={handleRetry}
                            variant="outline"
                            className="border-red-300 text-red-600 hover:bg-red-50 bg-transparent"
                          >
                            Try Again
                          </Button>
                        </div>
                      </div>
                    ) : (
                      /* Default Upload State */
                      <div className="space-y-6">
                        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                          <Upload className="w-8 h-8 text-blue-600" />
                        </div>

                        <div>
                          <h3 className="text-xl font-semibold text-gray-900 mb-2">
                            {uploadState === "dragover" ? "Drop your file here" : "Drag and drop your lease"}
                          </h3>
                          <p className="text-gray-600 mb-6" id="upload-description">
                            {t("upload.uploadInstructions")} {/* Rely on fixed translation */}
                          </p>

                          <Button
                            onClick={(e) => handleBrowseClick(e)}
                            size="lg"
                            className="bg-blue-600 hover:bg-blue-700 text-white mb-4"
                          >
                            Browse Files
                          </Button>
                        </div>

                        {/* Supported Formats */}
                        <div className="flex items-center justify-center text-sm text-gray-500">
                          <div className="flex items-center space-x-2">
                            <FileText className="w-4 h-4" />
                            <span>PDF files only</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Help Text */}
                  <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-2">Tips for best results:</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Make sure all text is clearly visible and readable</li>
                      <li>• Include all pages of your lease agreement</li>
                      <li>• File size should be under 10MB</li>
                    </ul>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {/* Security Notice */}
          <div className="text-center mt-6">
            <p className="text-sm text-gray-500">
              🔒 Your documents are encrypted and processed securely. We never store or share your personal information.
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}