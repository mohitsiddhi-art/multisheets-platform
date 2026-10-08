import { NextResponse } from 'next/server';
import { searchDirectories } from '@/lib/dataService';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get('q');

  if (!q || q.length < 2) return NextResponse.json([]);

  const results = await searchDirectories(q);
  return NextResponse.json(results);
}
