import type { NextApiRequest, NextApiResponse } from 'next';
import type { NextRequest } from 'next/server';
import axios from 'axios';
import { detectWordPressPlugins } from '@/utils/detectWordPressPlugins';

interface Plugin {
  name: string;
  version?: string;
  rating?: string;
  lastUpdated?: string;
  link?: string;
}

export async function GET(req: NextRequest) {
  const url = req.nextUrl.searchParams.get('url');

  if (!url || typeof url !== 'string') {
    return new Response(JSON.stringify({ stage: 'checking', error: 'Invalid URL' }), { status: 400 });
  }


  try {
    const response = await axios.get(url);
    const html = response.data;

    const plugins: Plugin[] = await detectWordPressPlugins(html);
    return new Response(JSON.stringify(plugins), { status: 200 });
  } catch (error) {
    console.error('Error fetching or processing URL:', error);
    return new Response(JSON.stringify({ stage: 'checking', error: 'Failed to detect technologies' }), { status: 500 });
  }
}
