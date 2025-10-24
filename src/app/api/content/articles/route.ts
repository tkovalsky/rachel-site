import { NextResponse } from 'next/server';
import { unifiedContentService } from '@/lib/unifiedContentService';

export function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const areaId = searchParams.get('area');
    
    const articles = unifiedContentService.getArticles(areaId || undefined);
    return NextResponse.json(articles);
  } catch (error) {
    console.error('Error fetching articles:', error);
    return NextResponse.json({ error: 'Failed to fetch articles' }, { status: 500 });
  }
}
