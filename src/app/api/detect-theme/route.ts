import type { NextRequest } from 'next/server';
import { detectWordPressTheme } from '@/utils/detectWordPressTheme';

interface Theme {
  name: string;
  version?: string;
  author?: string;
  description?: string;
  screenshot?: string;
  link?: string;
}

export async function GET(req: NextRequest) {
  const url = req.nextUrl.searchParams.get('url');

  if (!url || typeof url !== 'string') {
    return new Response(JSON.stringify({ stage: 'checking', error: 'Invalid URL' }), { status: 400 });
  }

  try {
    const theme: Theme | undefined = await detectWordPressTheme(url);

    if (!theme) {
      return new Response(JSON.stringify({ stage: 'checking', error: 'No theme detected' }), { status: 404 });
    }

    return new Response(JSON.stringify(theme), { status: 200 });
  } catch (error) {
    console.error('Error fetching or processing URL:', error);
    return new Response(JSON.stringify({ stage: 'checking', error: 'Failed to detect technologies' }), { status: 500 });
  }
}
