'use client';

import { useState } from 'react';
import Form from '@/components/Form';
import Technologies from '@/components/Technologies';
import ThemeCard from '@/components/ThemeCard';
import PluginCards from '@/components/PluginCards';
import axios from 'axios';
import Navbar from '@/components/Navbar';
import BlogGrid from '@/components/BlogGrid';

export default function HomePage() {
  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState(''); // State to store the URL
  const [stage, setStage] = useState({ checking: 0, theme: 0, plugins: 0 });
  const [currentStage, setCurrentStage] = useState('')
  const [technologies, setTechnologies] = useState<string[]>([]);
  const [theme, setTheme] = useState(null);
  const [plugins, setPlugins] = useState([]);
  const [isWordPress, setIsWordPress] = useState(false);

  const handleDetectTechnologies = async (url: string) => {
    setLoading(true);
    setUrl(url);
    setStage({ ...stage, checking: 1 });
    setCurrentStage('checking');
    try {
      const response = await axios.get('/api/detect-technologies', { params: { url } });
      const data = response.data;

      setTechnologies(data.technologies);
      setIsWordPress(data.isWordPress);
    } catch (error) {
      console.error('Error detecting technologies:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDetectTheme = async (url: string) => {
    setLoading(true);
    setStage({ ...stage, theme: 1 });
    setCurrentStage('theme');
    try {
      const response = await axios.get('/api/detect-theme', { params: { url } });
      const data = response.data;
      setTheme(data);
    } catch (error) {
      console.error('Error detecting WordPress theme:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDetectPlugins = async (url: string) => {
    setLoading(true);
    setStage({ ...stage, plugins: 1 });
    setCurrentStage('plugins');
    try {
      const response = await axios.get('/api/detect-plugins', { params: { url } });
      const data = response.data;
      setPlugins(data);
    } catch (error) {
      console.error('Error detecting WordPress plugins:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="">
      <div className="container bg-white mx-auto">
        <div className="flex flex-row">

          <div className='basis-1/10 h-[75vh] flex flex-column overflow-hidden'>

            <div className=" flex text-center font-bold items-center justify-center overflow-hidden">
              <div className="text-xs uppercase transform rotate-90 whitespace-nowrap text-ellipsis">
                <span className='bg-themeYellowOrange p-1'>WP-EXPOSE </span> &nbsp; - DETECT WORDPRESS THEMES
              </div>
            </div>
          </div>


          <div className="basis-2/7 pr-3">
            <Form
              onSubmit={handleDetectTechnologies}
              onDetectTheme={handleDetectTheme}
              onDetectPlugins={handleDetectPlugins}
              isWordPress={isWordPress}
              loading={loading}
            />
          </div>
          <div className="basis-4/7 p-3">

            <Navbar />

            <div className="mx-auto pt-20">
              <div className='bg-white/20 backdrop-blur-md'>
                <h2 className='uppercase text-sm font-black text-black mb-3'>
                  Discover Hidden WordPress Insights
                </h2>
              </div>


              Uncover the secrets behind any WordPress site with WP-EXPOSE.
              Our tool dives deep into the structure of websites, revealing
              the themes and plugins powering their performance.
              Whether you're a developer looking to learn from others
              or just curious about the tech behind your favorite sites,
              WP-EXPOSE delivers the details you need.
            </div>
            <div className="mb-3">
              {stage["checking"] === 1 && (
                <Technologies
                  url={url}
                  technologies={technologies}
                  isWordPress={isWordPress}
                  loading={loading}
                  currentStage={currentStage}
                />

              )}
            </div>
            <div className="my-3">
              {stage["theme"] === 1 && (
                <ThemeCard
                  currentStage={currentStage}
                  loading={loading}
                  theme={theme}
                />
              )
              }

            </div>

            <div className="my-3">
              {stage["plugins"] === 1 && (
                <PluginCards
                  stage={stage}
                  loading={loading}
                  plugins={plugins}
                />
              )
              }

            </div>




          </div>
        </div>

        <div>
          <BlogGrid />
        </div>
      </div>
    </div>
  );
}
