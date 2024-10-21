import { useState } from 'react';
import { ImSpinner2 } from 'react-icons/im';

interface FormProps {
  onSubmit: (url: string) => void;
  onDetectTheme: (url: string) => void;
  onDetectPlugins: (url: string) => void;
  isWordPress: boolean;
  loading: boolean;
}

export default function Form({ onSubmit, onDetectTheme, onDetectPlugins, isWordPress, loading }: FormProps) {
  const [url, setUrl] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(url);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md">
      <label htmlFor="url" className="block font-medium text-xs uppercase text-white mb-2">Website URL</label>
      <input
        type="url"
        id="url"
        name="url"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        className="w-full p-2 text-xs font-medium uppercase border border-themeBlue600 bg-transparent rounded-md mb-4"
        placeholder="https://example.com"
        required
      />
      <button
        type="submit"
        className="px-4 py-2 bg-[#FFAA33] text-white text-xs font-medium uppercase rounded-3xl"
        disabled={loading}
      >
        {loading ? <ImSpinner2 className="animate-spin inline-block mr-2" /> : 'Detect Technologies'}
      </button>

      {isWordPress && (
        <div className="mt-4 space-y-2">
          <button
            type="button"
            onClick={() => onDetectTheme(url)}
            className="w-full px-4 py-2 bg-[#688dc9] text-white rounded-lg flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading}
          >
            {loading ? <ImSpinner2 className="animate-spin mr-2" /> : null}
            Detect WordPress Theme
          </button>
          <button
            type="button"
            onClick={() => onDetectPlugins(url)}
            className="w-full px-4 py-2 bg-[#688dc9] text-white rounded-lg flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading}
          >
            {loading ? <ImSpinner2 className="animate-spin mr-2" /> : null}
            Detect WordPress Plugins
          </button>
        </div>
      )}
    </form>
  );
}
