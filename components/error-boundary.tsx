"use client"

import React from "react"
import { Button } from "@/components/ui/button"

type Props = {
  children: React.ReactNode
}

type State = {
  hasError: boolean
  error?: Error
}

class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // TODO: send to logging service here if desired
    // console.error("ErrorBoundary caught an error:", error, errorInfo)
  }

  handleReset = () => {
    this.setState({ hasError: false, error: undefined })
    // try soft reload; fallback to hard reload
    if (typeof window !== "undefined") {
      window.location.reload()
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen flex-col items-center justify-center gap-4 p-6 text-center">
          <h1 className="text-2xl font-semibold text-destructive">Something went wrong</h1>
          <p className="max-w-md text-muted-foreground">
            {this.state.error?.message ?? "An unexpected error occurred."}
          </p>
          <Button onClick={this.handleReset}>Reload page</Button>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary // default export
export { ErrorBoundary } // named export (optional)
