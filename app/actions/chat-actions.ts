"use server"

import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

interface ChatContext {
  userId?: string
  sessionId: string
  category: string
  previousMessages: Array<{
    role: "user" | "assistant"
    content: string
    timestamp: Date
  }>
}

export async function generateChatSuggestions(context: ChatContext) {
  try {
    const { text } = await generateText({
      model: openai("gpt-4o"),
      system: `You are an AI assistant that generates helpful follow-up questions and suggestions for a lease and tenant rights chat system. 

Based on the conversation context, generate 3-4 short, relevant follow-up questions or suggestions that would help the user continue the conversation productively.

Category: ${context.category}
Recent conversation context: ${context.previousMessages
        .slice(-3)
        .map((m) => `${m.role}: ${m.content}`)
        .join("\n")}

Return only the suggestions as a JSON array of strings, nothing else.`,
      prompt: "Generate helpful follow-up suggestions based on the conversation context.",
      temperature: 0.8,
      maxTokens: 200,
    })

    try {
      return JSON.parse(text)
    } catch {
      // Fallback suggestions if JSON parsing fails
      return getDefaultSuggestions(context.category)
    }
  } catch (error) {
    console.error("Error generating suggestions:", error)
    return getDefaultSuggestions(context.category)
  }
}

function getDefaultSuggestions(category: string): string[] {
  const suggestions = {
    "lease-help": [
      "Explain this clause in simple terms",
      "What should I watch out for?",
      "Is this standard in most leases?",
      "What are my options here?",
    ],
    "platform-help": [
      "Show me how to do this step by step",
      "What other features might help?",
      "Can you walk me through the process?",
      "Where can I find more information?",
    ],
    "legal-advice": [
      "What does the law say about this?",
      "When should I contact a lawyer?",
      "Are there any exceptions to this rule?",
      "What resources can help me?",
    ],
    general: [
      "Tell me more about this",
      "What should I do next?",
      "Are there other options?",
      "Where can I get more help?",
    ],
  }

  return suggestions[category as keyof typeof suggestions] || suggestions.general
}

export async function analyzeLeaseClauses(leaseText: string) {
  try {
    const { text } = await generateText({
      model: openai("gpt-4o"),
      system: `You are a lease analysis expert. Analyze the provided lease text and identify:
1. Key clauses and their implications
2. Potential red flags or concerning terms
3. Missing standard protections
4. Tenant rights and responsibilities
5. Important dates and deadlines

Provide your analysis in a clear, structured format that's easy for renters to understand.`,
      prompt: `Please analyze this lease text and provide insights:\n\n${leaseText}`,
      temperature: 0.3,
      maxTokens: 1500,
    })

    return text
  } catch (error) {
    console.error("Error analyzing lease:", error)
    throw new Error("Failed to analyze lease")
  }
}
