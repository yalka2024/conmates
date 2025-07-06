import { NextResponse } from 'next/server';
import { logInfo, logError } from '@/lib/auto-debug';

export async function GET() {
  try {
    logInfo('api-chat-test', 'Testing chat API configuration');
    
    // Check environment variables
    const hasOpenAISecretKey = !!process.env.OPENAI_SECRET_KEY;
    const hasOpenAIAPIKey = !!process.env.OPENAI_API_KEY;
    
    logInfo('api-chat-test', 'Environment check', {
      hasOpenAISecretKey,
      hasOpenAIAPIKey,
      openAISecretKeyLength: process.env.OPENAI_SECRET_KEY?.length || 0,
      openAIAPIKeyLength: process.env.OPENAI_API_KEY?.length || 0
    });

    // Test if we can import the AI SDK
    let aiSDKStatus = 'unknown';
    try {
      const { openai } = await import('@ai-sdk/openai');
      aiSDKStatus = 'success';
    } catch (error) {
      aiSDKStatus = 'failed';
      logError(error as Error, { component: 'api-chat-test', issue: 'ai-sdk-import' });
    }

    return NextResponse.json({
      status: 'ok',
      environment: {
        hasOpenAISecretKey,
        hasOpenAIAPIKey,
        openAISecretKeyLength: process.env.OPENAI_SECRET_KEY?.length || 0,
        openAIAPIKeyLength: process.env.OPENAI_API_KEY?.length || 0
      },
      aiSDK: {
        status: aiSDKStatus
      },
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    logError(error as Error, { component: 'api-chat-test' });
    return NextResponse.json(
      { error: 'Test failed', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
} 