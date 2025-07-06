import { NextResponse } from 'next/server';
import { getSystemHealth } from '@/lib/auto-debug';

export async function GET() {
  try {
    const healthData = await getSystemHealth();
    return NextResponse.json(healthData);
  } catch (error) {
    console.error('Failed to get system health:', error);
    return NextResponse.json(
      { error: 'Failed to get system health' },
      { status: 500 }
    );
  }
} 