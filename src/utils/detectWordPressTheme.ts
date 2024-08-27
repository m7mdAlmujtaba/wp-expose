// src/utils/detectWordPressTheme.ts
import axios from 'axios';

export async function detectWordPressTheme(siteUrl: string) {
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
