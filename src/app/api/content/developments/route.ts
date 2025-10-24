import { NextResponse } from 'next/server';
import { unifiedContentService } from '@/lib/unifiedContentService';

export function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const areaId = searchParams.get('area');
    const neighborhoodId = searchParams.get('neighborhood');
    
    const developments = unifiedContentService.getDevelopments(areaId || undefined, neighborhoodId || undefined);
    return NextResponse.json(developments);
  } catch (error) {
    console.error('Error fetching developments:', error);
    return NextResponse.json({ error: 'Failed to fetch developments' }, { status: 500 });
  }
}
