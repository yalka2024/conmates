"use client"

import { useEffect, useState, useCallback } from "react"

interface PerformanceMetrics {
  pageLoadTime: number
  renderTime: number
  memoryUsage: number
  connectionType: string
  isOnline: boolean
}

interface PerformanceHook {
  metrics: PerformanceMetrics
  measureFunction: <T>(fn: () => T, label: string) => T
  measureAsync: <T>(fn: () => Promise<T>, label: string) => Promise<T>
  logMetric: (name: string, value: number, unit?: string) => void
}

export function usePerformance(): PerformanceHook {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    pageLoadTime: 0,
    renderTime: 0,
    memoryUsage: 0,
    connectionType: "unknown",
    isOnline: true,
  })

  useEffect(() => {
    // Measure page load time
    const measurePageLoad = () => {
      if (typeof window !== "undefined" && window.performance) {
        const navigation = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming
        if (navigation) {
          const loadTime = navigation.loadEventEnd - navigation.fetchStart
          setMetrics((prev) => ({ ...prev, pageLoadTime: loadTime }))
        }
      }
    }

    // Measure memory usage
    const measureMemory = () => {
      if (typeof window !== "undefined" && (performance as any).memory) {
        const memory = (performance as any).memory
        const memoryUsage = memory.usedJSHeapSize / 1024 / 1024 // Convert to MB
        setMetrics((prev) => ({ ...prev, memoryUsage }))
      }
    }

    // Get connection info
    const getConnectionInfo = () => {
      if (typeof navigator !== "undefined") {
        const connection =
          (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection
        if (connection) {
          setMetrics((prev) => ({
            ...prev,
            connectionType: connection.effectiveType || "unknown",
            isOnline: navigator.onLine,
          }))
        }
      }
    }

    measurePageLoad()
    measureMemory()
    getConnectionInfo()

    // Set up periodic monitoring
    const interval = setInterval(() => {
      measureMemory()
      getConnectionInfo()
    }, 5000)

    // Listen for online/offline events
    const handleOnline = () => setMetrics((prev) => ({ ...prev, isOnline: true }))
    const handleOffline = () => setMetrics((prev) => ({ ...prev, isOnline: false }))

    if (typeof window !== "undefined") {
      window.addEventListener("online", handleOnline)
      window.addEventListener("offline", handleOffline)
    }

    return () => {
      clearInterval(interval)
      if (typeof window !== "undefined") {
        window.removeEventListener("online", handleOnline)
        window.removeEventListener("offline", handleOffline)
      }
    }
  }, [])

  const measureFunction = useCallback(<T,>(fn: () => T, label: string): T => {
    const start = performance.now()
    const result = fn()
    const end = performance.now()
    const duration = end - start

    console.log(`Performance [${label}]: ${duration.toFixed(2)}ms`)

    // Log to performance monitoring service in production
    if (process.env.NODE_ENV === "production") {
      logMetric(label, duration, "ms")
    }

    return result
  }, [])

  const measureAsync = useCallback(async <T,>(fn: () => Promise<T>, label: string): Promise<T> => {
    const start = performance.now()
    const result = await fn()
    const end = performance.now()
    const duration = end - start

    console.log(`Performance [${label}]: ${duration.toFixed(2)}ms`)

    // Log to performance monitoring service in production
    if (process.env.NODE_ENV === "production") {
      logMetric(label, duration, "ms")
    }

    return result
  }, [])

  const logMetric = useCallback((name: string, value: number, unit = "ms") => {
    const metric = {
      name,
      value,
      unit,
      timestamp: Date.now(),
      url: typeof window !== "undefined" ? window.location.pathname : "unknown",
    }

    // Store locally for debugging
    try {
      const existingMetrics = JSON.parse(localStorage.getItem("performance_metrics") || "[]")
      existingMetrics.push(metric)
      localStorage.setItem("performance_metrics", JSON.stringify(existingMetrics.slice(-100))) // Keep last 100 metrics
    } catch (e) {
      console.error("Failed to store performance metric:", e)
    }

    // In production, send to monitoring service
    if (process.env.NODE_ENV === "production") {
      // Example: send to analytics service
      console.log("Metric logged:", metric)
    }
  }, [])

  return {
    metrics,
    measureFunction,
    measureAsync,
    logMetric,
  }
}
