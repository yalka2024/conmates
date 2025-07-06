interface ChatMessage {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

interface ChatSession {
  id: string
  title: string
  category: string
  messages: ChatMessage[]
  lastActivity: Date
}

export class ChatStorage {
  private static STORAGE_KEY = "leaseasy-chat-sessions"

  static saveSessions(sessions: ChatSession[]): void {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(sessions))
    } catch (error) {
      console.error("Failed to save chat sessions:", error)
    }
  }

  static loadSessions(): ChatSession[] {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY)
      if (!stored) return []

      const sessions = JSON.parse(stored)
      // Convert date strings back to Date objects
      return sessions.map((session: ChatSession) => ({
        ...session,
        lastActivity: new Date(session.lastActivity),
        messages: session.messages.map((msg: ChatMessage) => ({
          ...msg,
          timestamp: new Date(msg.timestamp),
        })),
      }))
    } catch (error) {
      console.error("Failed to load chat sessions:", error)
      return []
    }
  }

  static saveSession(session: ChatSession): void {
    const sessions = this.loadSessions()
    const existingIndex = sessions.findIndex((s) => s.id === session.id)

    if (existingIndex >= 0) {
      sessions[existingIndex] = session
    } else {
      sessions.unshift(session)
    }

    // Keep only the last 50 sessions
    const trimmedSessions = sessions.slice(0, 50)
    this.saveSessions(trimmedSessions)
  }

  static deleteSession(sessionId: string): void {
    const sessions = this.loadSessions()
    const filteredSessions = sessions.filter((s) => s.id !== sessionId)
    this.saveSessions(filteredSessions)
  }

  static clearAllSessions(): void {
    try {
      localStorage.removeItem(this.STORAGE_KEY)
    } catch (error) {
      console.error("Failed to clear chat sessions:", error)
    }
  }
}
