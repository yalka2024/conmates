import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_SECRET_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const { question, lesson, context, userId } = await request.json();

    // Create a comprehensive prompt for tenant education
    const systemPrompt = `You are an expert tenant rights educator and legal advisor. You help tenants understand their rights, navigate complex legal situations, and make informed decisions about their housing.

Key principles:
- Always prioritize tenant safety and legal protection
- Provide practical, actionable advice
- Explain complex legal concepts in simple terms
- Reference specific laws when relevant
- Encourage tenants to seek legal help for serious issues
- Be supportive and empowering

Current lesson context: ${lesson || 'General tenant rights'}

Respond in a helpful, educational tone. If the question involves legal advice, remind users that you're providing educational information and they should consult with a qualified attorney for their specific situation.`;

    const userPrompt = `Question: ${question}

Please provide a comprehensive, educational response that:
1. Directly answers the question
2. Explains the relevant legal principles
3. Provides practical steps the tenant can take
4. Mentions any important limitations or considerations
5. Suggests additional resources if helpful

Keep the response educational and actionable.`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt }
      ],
      max_tokens: 500,
      temperature: 0.7,
    });

    const response = completion.choices[0]?.message?.content || 'I apologize, but I cannot provide a response at this time. Please try again later.';

    // Log the interaction for learning analytics
    console.log('AI Learning Interaction:', {
      userId,
      lesson,
      question,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json({
      answer: response,
      sources: [
        'Fair Housing Act',
        'State-specific tenant laws',
        'HUD guidelines',
        'Legal aid resources'
      ],
      disclaimer: 'This information is for educational purposes only and should not be considered legal advice. For specific legal matters, please consult with a qualified attorney.',
    });

  } catch (error) {
    console.error('AI Learning API Error:', error);
    return NextResponse.json(
      { error: 'Failed to process your question. Please try again.' },
      { status: 500 }
    );
  }
} 