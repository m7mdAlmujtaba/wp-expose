// src/utils/detectWordPressPlugins.ts
import axios from 'axios';

export async function detectWordPressPlugins(html: string) {
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
