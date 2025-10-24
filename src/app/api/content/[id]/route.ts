import { NextResponse } from 'next/server';
import { unifiedContentService } from '@/lib/unifiedContentService';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const content = unifiedContentService.getContentById(id);
    
    if (!content) {
      return NextResponse.json({ error: 'Content not found' }, { status: 404 });
    }
    
    return NextResponse.json(content);
  } catch (error) {
    console.error('Error fetching content by ID:', error);
    return NextResponse.json({ error: 'Failed to fetch content' }, { status: 500 });
  }
}
