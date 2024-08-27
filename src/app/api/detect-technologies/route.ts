// src/app/api/detect/route.ts
import type { NextRequest } from 'next/server';
import axios from 'axios';
import { detectProgrammingLanguage } from '@/utils/detectProgrammingLanguage';
import { detectWordPressTheme } from '@/utils/detectWordPressTheme';
import { detectWordPressPlugins } from '@/utils/detectWordPressPlugins';

interface DetectResponse {
  stage: 'checking' | 'theme' | 'plugins' | 'completed';
  isWordPress?: boolean;
  theme?: {
    name: string;
    version?: string;
    author?: string;
    description?: string;
    screenshot?: string;
    link?: string;
  };
  plugins?: {
    name: string;
    version?: string;
    rating?: string;
    lastUpdated?: string;
    link?: string;
  }[];
  language?: string;
  error?: string;
}

export async function GET(req: NextRequest) {
  const url = req.nextUrl.searchParams.get('url');

  if (!url || typeof url !== 'string') {
    return new Response(JSON.stringify({ stage: 'checking', error: 'Invalid URL' }), { status: 400 });
  }

  try {
    const response = await axios.get(url);
    const html = response.data;

    const isWordPress = html.includes('wp-content') || html.includes('wp-includes');
    // const language = await detectProgrammingLanguage(html, url);
    
    let details: DetectResponse = {
      stage: 'theme',
      isWordPress,
    };

    // Add programming language details
    // details.language = language;
    
    return new Response(JSON.stringify(details), { status: 200 });
  } catch (error) {
    console.error('Error fetching or processing URL:', error);
    return new Response(JSON.stringify({ stage: 'checking', error: 'Failed to detect technologies' }), { status: 500 });
  }
}
