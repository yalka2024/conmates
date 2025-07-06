import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Mock analytics data - in a real implementation, this would come from a database
    const analyticsData = {
      totalUsers: 1247,
      totalAnalyses: 2156,
      totalRevenue: 43250,
      conversionRate: 23.4,
      averageSessionTime: "4m 32s",
      topStates: [
        { state: "California", analyses: 342 },
        { state: "Texas", analyses: 298 },
        { state: "New York", analyses: 267 },
        { state: "Florida", analyses: 234 },
        { state: "Illinois", analyses: 189 }
      ],
      recentActivity: [
        { type: "analysis", user: "User 1234", time: "2 minutes ago", status: "completed" },
        { type: "payment", user: "User 5678", time: "5 minutes ago", status: "completed" },
        { type: "analysis", user: "User 9012", time: "8 minutes ago", status: "processing" },
        { type: "payment", user: "User 3456", time: "12 minutes ago", status: "completed" },
        { type: "analysis", user: "User 7890", time: "15 minutes ago", status: "completed" }
      ],
      monthlyStats: {
        jan: 156,
        feb: 189,
        mar: 234,
        apr: 298,
        may: 342,
        jun: 389
      },
      systemPerformance: {
        apiResponseTime: "2.3s",
        uptime: "99.9%",
        errorRate: "0.1%",
        activeConnections: 1247
      },
      userEngagement: {
        pagesPerSession: 4.2,
        bounceRate: "23%",
        returnUsers: "67%",
        mobileUsage: "58%"
      }
    };

    return NextResponse.json({
      success: true,
      data: analyticsData,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Analytics API error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch analytics data' 
      },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { event, data } = body;

    // In a real implementation, this would log analytics events to a database
    console.log('Analytics event:', { event, data, timestamp: new Date().toISOString() });

    return NextResponse.json({
      success: true,
      message: 'Analytics event logged successfully'
    });
  } catch (error) {
    console.error('Analytics logging error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to log analytics event' 
      },
      { status: 500 }
    );
  }
} 