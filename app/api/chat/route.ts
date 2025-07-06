import { streamText } from "ai"
import { openai } from "@ai-sdk/openai"
import type { NextRequest } from "next/server"
import { logError, logInfo } from '@/lib/auto-debug'

export async function POST(req: NextRequest) {
  try {
    logInfo('api-chat', 'Chat API called');
    
    const { messages, category = "general" } = await req.json()

    if (!messages || !Array.isArray(messages)) {
      logError(new Error('Invalid messages format'), { component: 'api-chat' });
      return new Response("Invalid messages format", { status: 400 })
    }


    // Category-specific system prompts
    const systemPrompts = {
      lease: `You are a helpful AI assistant specializing in lease agreements and rental law. 
      Help users understand their lease terms, identify potential issues, and explain their rights as tenants. 
      Always provide accurate, helpful information while recommending they consult with legal professionals for complex issues.
      
      IMPORTANT: Always include the legal disclaimer at the end of your responses when discussing legal matters, rights, or obligations.`,

      platform: `You are a helpful AI assistant for the Conmates platform. 
      Help users navigate the platform features, understand how to use different tools, and get the most out of their experience. 
      Be friendly and guide them through the platform's capabilities.`,

      legal: `You are a helpful AI assistant with knowledge of tenant rights and rental law. 
      Provide general information about tenant rights, fair housing laws, and rental regulations. 
      
      CRITICAL REQUIREMENT: You MUST include the following legal disclaimer at the end of EVERY response:
      
      "⚠️ IMPORTANT LEGAL DISCLAIMER: This information is provided for educational purposes only and should not be considered as legal advice. Laws vary by state, city, and individual circumstances. For specific legal advice regarding your situation, please consult with a qualified attorney or legal professional. Conmates is not a law firm and does not provide legal representation or advice."
      
      Always remind users that this is general information and they should consult with qualified legal professionals for specific legal advice.`,

      general: `You are a helpful AI assistant for Conmates, a platform that helps renters understand their lease agreements. 
      You can help with lease questions, platform navigation, and general tenant rights information. 
      Be helpful, friendly, and always recommend professional legal advice for complex situations.
      
      If the user asks about legal matters, tenant rights, or lease obligations, include the legal disclaimer at the end of your response.`,
    }

    const systemPrompt = systemPrompts[category as keyof typeof systemPrompts] || systemPrompts.general

    logInfo('api-chat', 'Calling OpenAI API', { category, messageCount: messages.length });

    // Ensure OpenAI API key is available
    if (!process.env.OPENAI_API_KEY && process.env.OPENAI_SECRET_KEY) {
      process.env.OPENAI_API_KEY = process.env.OPENAI_SECRET_KEY;
      logInfo('api-chat', 'Set OPENAI_API_KEY from OPENAI_SECRET_KEY');
    }

    if (!process.env.OPENAI_API_KEY) {
      throw new Error('OpenAI API key is missing. Please set OPENAI_API_KEY or OPENAI_SECRET_KEY environment variable.');
    }

    const result = await streamText({
      model: openai("gpt-4o"),
      system: systemPrompt,
      messages,
      maxTokens: 1000,
      temperature: 0.7,
    })

    logInfo('api-chat', 'OpenAI API call successful');
    return result.toDataStreamResponse()
  } catch (error) {
    // Use auto-debug system to handle and potentially fix the error
    await logError(error as Error, { component: 'api-chat' });
    console.error("Chat API error:", error)
    return new Response("Internal Server Error", { status: 500 })
  }
}
