// src/app/page.tsx
'use client'; // Ensure this file is treated as a client component

import { useState } from 'react';
import axios from 'axios';
import { IoLogoWordpress, IoStar } from 'react-icons/io5';
import { FaTag, FaLink } from 'react-icons/fa';
import { ImSpinner2 } from 'react-icons/im';

interface Theme {
  name: string;
  version?: string;
  author?: string;
  description?: string;
  screenshot?: string;
  link?: string;
}

interface Plugin {
  name: string;
  version?: string;
  rating?: string;
  lastUpdated?: string;
  link?: string;
}

interface DetectResponse {
  isWordPress: boolean;
  technologies: string[];
  theme?: Theme;
  plugins?: Plugin[];
}

export default function Home() {
  const [url, setUrl] = useState('');
  const [result, setResult] = useState<DetectResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [stage, setStage] = useState<number>(0); // 0: Initial, 1: Theme, 2: Plugins

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResult(null);
    setStage(0);

    try {
      const response = await axios.get('/api/detect', { params: { url } });
      const data = response.data;

      setResult(data);

      if (data.isWordPress) {
        setStage(1);
        // Wait for a moment to simulate loading theme details
        setTimeout(() => {
          setStage(2);
        }, 1000);
      } else {
        setStage(0);
      }
    } catch (err) {
      console.error('Error detecting technologies:', err);
      setError('Error detecting technologies');
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const renderThemeCard = (theme: Theme) => (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h3 className="text-2xl font-bold mb-4 flex items-center">
        <IoLogoWordpress className="text-blue-500 mr-2" />
        WordPress Theme
      </h3>
      <div className="flex items-start space-x-4">
        {theme.screenshot && (
          <img src={theme.screenshot} alt={`${theme.name} screenshot`} className="w-48 h-48 object-cover rounded-md" />
        )}
        <div className="flex-1">
          <h4 className="text-xl font-semibold">
            <a href={theme.link} target="_blank" rel="noopener noreferrer" className="hover:underline">{theme.name}</a>
          </h4>
          <p className="text-gray-600">
            <FaTag className="inline-block mr-1" /> Version: {theme.version || 'Unknown'}
          </p>
          <p className="text-gray-600">
            <FaTag className="inline-block mr-1" /> Author: {theme.author || 'Unknown'}
          </p>
          <p className="text-gray-600 mt-2">
            {theme.description || 'No description available'}
          </p>
        </div>
      </div>
    </div>
  );

  const renderPluginCards = (plugins: Plugin[]) => {
    const uniquePlugins = Array.from(new Set(plugins.map(p => p.name)))
      .map(name => plugins.find(p => p.name === name) as Plugin);

    return (
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-2xl font-bold mb-4 flex items-center">
          <IoLogoWordpress className="text-blue-500 mr-2" />
          WordPress Plugins
        </h3>
        <div className="space-y-4">
          {uniquePlugins.map((plugin) => (
            <div key={plugin.name} className="flex items-start space-x-4 border border-gray-200 rounded-md p-4">
              <div className="flex-1">
                <h4 className="text-xl font-semibold">
                  <a href={plugin.link} target="_blank" rel="noopener noreferrer" className="hover:underline">{plugin.name}</a>
                </h4>
                <p className="text-gray-600">
                  <FaTag className="inline-block mr-1" /> Version: {plugin.version || 'Unknown'}
                </p>
                <p className="text-gray-600">
                  <IoStar className="inline-block mr-1 text-yellow-500" /> Rating: {plugin.rating || 'Not rated'}
                </p>
                <p className="text-gray-600">
                  <FaTag className="inline-block mr-1" /> Last Updated: {plugin.lastUpdated || 'Unknown'}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <section className="flex flex-col items-center justify-center min-h-screen px-4 py-6">
      <h2 className="text-4xl font-bold mb-4">Website Technology Detector</h2>
      <p className="text-lg text-gray-600 mb-6">
        Enter a website URL to detect its technologies.
      </p>
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
        <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-2">Website URL</label>
        <input
          type="url"
          id="url"
          name="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md mb-4"
          placeholder="https://example.com"
          required
        />
        <button
          type="submit"
          className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          disabled={loading}
        >
          {loading ? <ImSpinner2 className="animate-spin inline-block mr-2" /> : 'Detect Technologies'}
        </button>
      </form>

      {error && (
        <div className="mt-6 text-red-600">
          <p>{error}</p>
        </div>
      )}

      {result && (
        <div className="mt-6 space-y-6 w-full max-w-3xl">
          {stage === 0 && result.isWordPress && (
            <div className="text-blue-500">
              <p>Detecting WordPress theme...</p>
              <ImSpinner2 className="animate-spin inline-block mr-2" />
            </div>
          )}

          {stage >= 1 && result.isWordPress && result.theme && renderThemeCard(result.theme)}

          {stage === 2 && result.plugins && result.plugins.length > 0 && renderPluginCards(result.plugins)}
        </div>
      )}
    </section>
  );
}
