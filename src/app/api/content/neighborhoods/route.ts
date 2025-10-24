import { NextResponse } from 'next/server';
import { unifiedContentService } from '@/lib/unifiedContentService';

export function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const areaId = searchParams.get('area');
    
    const neighborhoods = unifiedContentService.getNeighborhoods(areaId || undefined);
    return NextResponse.json(neighborhoods);
  } catch (error) {
    console.error('Error fetching neighborhoods:', error);
    return NextResponse.json({ error: 'Failed to fetch neighborhoods' }, { status: 500 });
  }
}
