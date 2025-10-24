import { NextResponse } from 'next/server';
import { unifiedContentService } from '@/lib/unifiedContentService';

export function GET() {
  try {
    const healthStatus = unifiedContentService.getHealthStatus();
    return NextResponse.json(healthStatus);
  } catch (error) {
    console.error('Error fetching health status:', error);
    return NextResponse.json({ error: 'Failed to fetch health status' }, { status: 500 });
  }
}
