import { NextResponse } from 'next/server';
import { unifiedContentService } from '@/lib/unifiedContentService';

export function GET() {
  try {
    const areas = unifiedContentService.getAreas();
    return NextResponse.json(areas);
  } catch (error) {
    console.error('Error fetching areas:', error);
    return NextResponse.json({ error: 'Failed to fetch areas' }, { status: 500 });
  }
}
