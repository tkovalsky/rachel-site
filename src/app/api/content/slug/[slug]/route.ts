import { NextResponse } from 'next/server';
import { unifiedContentService } from '@/lib/unifiedContentService';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');
    
    const content = unifiedContentService.getContentBySlug(slug, type || undefined);
    
    if (!content) {
      return NextResponse.json({ error: 'Content not found' }, { status: 404 });
    }
    
    return NextResponse.json(content);
  } catch (error) {
    console.error('Error fetching content by slug:', error);
    return NextResponse.json({ error: 'Failed to fetch content' }, { status: 500 });
  }
}
