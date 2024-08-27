'use client';

import { useState } from 'react';
import axios from 'axios';
import Form from '../components/Form';
import Technologies from '../components/Technologies';
import ThemeCard from '../components/ThemeCard';
import PluginCards from '../components/PluginCards';
import LoadingSpinner from '../components/LoadingSpinner';

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
  const [result, setResult] = useState<DetectResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [stage, setStage] = useState<number>(0);

  const handleSubmit = async (url: string) => {
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
        setTimeout(() => {
          setStage(2);
        }, 1000);
      } else {
        setStage(0);
      }
    } catch (err) {
      console.error('Error detecting technologies:', err);
      setError('Error detecting technologies');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex flex-col items-center justify-center min-h-screen px-4 py-6">
      <h2 className="text-4xl font-bold mb-4">Website Technology Detector</h2>
      <p className="text-lg text-gray-600 mb-6">Enter a website URL to detect its technologies.</p>
      
      <Form onSubmit={handleSubmit} loading={loading} />
      
      {loading && <LoadingSpinner />}
      
      {error && <p className="text-red-500 mt-4">{error}</p>}
      
      {result && (
        <>
          <Technologies technologies={result.technologies} />
          
          {result.isWordPress && (
            <>
              {result.theme && <ThemeCard theme={result.theme} />}
              {result.plugins && <PluginCards plugins={result.plugins} />}
            </>
          )}
        </>
      )}
    </section>
  );
}
