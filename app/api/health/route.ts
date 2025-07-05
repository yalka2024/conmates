import { NextResponse } from "next/server"

interface HealthCheck {
  status: "healthy" | "degraded" | "unhealthy"
  timestamp: string
  version: string
  environment: string
  services: {
    database: "up" | "down"
    ai: "up" | "down"
    storage: "up" | "down"
  }
  metrics: {
    uptime: number
    memoryUsage: number
    responseTime: number
  }
}

export async function GET() {
  const startTime = Date.now()

  try {
    // Check database connection
    const databaseStatus = await checkDatabase()

    // Check AI service
    const aiStatus = await checkAIService()

    // Check storage service
    const storageStatus = await checkStorage()

    const responseTime = Date.now() - startTime

    const healthCheck: HealthCheck = {
      status: "healthy",
      timestamp: new Date().toISOString(),
      version: "1.0.0",
      environment: process.env.NODE_ENV || "development",
      services: {
        database: databaseStatus,
        ai: aiStatus,
        storage: storageStatus,
      },
      metrics: {
        uptime: process.uptime(),
        memoryUsage: process.memoryUsage().heapUsed / 1024 / 1024, // MB
        responseTime,
      },
    }

    // Determine overall status
    const allServicesUp = Object.values(healthCheck.services).every((status) => status === "up")
    if (!allServicesUp) {
      healthCheck.status = "degraded"
    }

    return NextResponse.json(healthCheck, {
      status: healthCheck.status === "healthy" ? 200 : 503,
    })
  } catch (error) {
    console.error("Health check failed:", error)

    const healthCheck: HealthCheck = {
      status: "unhealthy",
      timestamp: new Date().toISOString(),
      version: "1.0.0",
      environment: process.env.NODE_ENV || "development",
      services: {
        database: "down",
        ai: "down",
        storage: "down",
      },
      metrics: {
        uptime: process.uptime(),
        memoryUsage: process.memoryUsage().heapUsed / 1024 / 1024,
        responseTime: Date.now() - startTime,
      },
    }

    return NextResponse.json(healthCheck, { status: 503 })
  }
}

async function checkDatabase(): Promise<"up" | "down"> {
  try {
    // Simulate database check
    await new Promise((resolve) => setTimeout(resolve, 50))
    return "up"
  } catch {
    return "down"
  }
}

async function checkAIService(): Promise<"up" | "down"> {
  try {
    // Check if OpenAI API key is configured
    if (!process.env.OPENAI_API_KEY) {
      return "down"
    }
    return "up"
  } catch {
    return "down"
  }
}

async function checkStorage(): Promise<"up" | "down"> {
  try {
    // Simulate storage check
    await new Promise((resolve) => setTimeout(resolve, 30))
    return "up"
  } catch {
    return "down"
  }
}
