// src/app/api/detect/route.ts
import type { NextRequest } from 'next/server';
import axios from 'axios';

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
    let details: DetectResponse = {
      stage: 'theme',
      isWordPress,
    };

    if (isWordPress) {
      const theme = await detectWordPressTheme(url);
      details = { ...details, theme, stage: 'plugins' };

      // Delay plugin detection to make it look staged
      const plugins = await detectWordPressPlugins(html);
      details = { ...details, plugins, stage: 'completed' };
    }

    return new Response(JSON.stringify(details), { status: 200 });
  } catch (error) {
    console.error('Error fetching or processing URL:', error);
    return new Response(JSON.stringify({ stage: 'checking', error: 'Failed to detect technologies' }), { status: 500 });
  }
}

async function detectWordPressTheme(siteUrl: string) {
  const themeNameMatch = await fetchThemeName(siteUrl);
  if (!themeNameMatch) return undefined;

  const themeName = themeNameMatch[1];
  const themeCssUrl = `${siteUrl}/wp-content/themes/${themeName}/style.css`;

  try {
    const cssResponse = await axios.get(themeCssUrl);
    const cssData = cssResponse.data;

    // Parse CSS content to get theme details
    const version = extractCssProperty(cssData, 'Version');
    const author = extractCssProperty(cssData, 'Author');
    const description = extractCssProperty(cssData, 'Description');
    const screenshot = `${siteUrl}/wp-content/themes/${themeName}/screenshot.png`; // Common location for screenshot

    return {
      name: themeName,
      version,
      author,
      description,
      screenshot,
      link: themeCssUrl
    };
  } catch (error) {
    console.error('Error fetching theme CSS:', error);
    return {
      name: themeName,
      version: 'Unknown',
      author: 'Unknown',
      description: 'No description available',
      screenshot: '',
      link: ''
    };
  }
}

function extractCssProperty(cssData: string, property: string): string {
  const match = cssData.match(new RegExp(`^${property}:\\s*(.*)$`, 'm'));
  return match ? match[1].trim() : 'Unknown';
}

async function fetchThemeName(siteUrl: string): Promise<RegExpMatchArray | null> {
  try {
    const response = await axios.get(siteUrl);
    const html = response.data;
    const themeNameMatch = html.match(/wp-content\/themes\/([^\/]+)/);
    return themeNameMatch;
  } catch (error) {
    console.error('Error fetching theme name:', error);
    return null;
  }
}

async function detectWordPressPlugins(html: string) {
  const plugins: {
    name: string;
    version?: string;
    rating?: string;
    lastUpdated?: string;
    link?: string;
  }[] = [];
  const matches = html.match(/wp-content\/plugins\/([^\/]+)/g);
  if (matches) {
    for (const match of matches) {
      const pluginName = match.split('/')[2];
      const pluginDetails = await fetchPluginDetails(pluginName);

      // Avoid duplicates
      if (!plugins.find(plugin => plugin.name === pluginName)) {
        plugins.push({
          name: pluginName,
          ...pluginDetails
        });
      }
    }
  }
  return plugins;
}

async function fetchPluginDetails(pluginName: string) {
  try {
    const response = await axios.get(`https://api.wordpress.org/plugins/info/1.0/${pluginName}.json`);
    const data = response.data;

    // Handle cases where rating or other fields may be undefined
    const rating = data.rating
      ? `${data.rating} (${data.rating_count ? data.rating_count + ' votes' : 'No votes'})`
      : 'Not rated';

    return {
      version: data.version || 'Unknown',
      rating,
      lastUpdated: data.last_updated || 'Unknown',
      link: data.homepage || ''
    };
  } catch (error) {
    console.error(`Error fetching details for plugin ${pluginName}:`, error);
    return {
      version: 'Unknown',
      rating: 'Not rated',
      lastUpdated: 'Unknown',
      link: ''
    };
  }
}
