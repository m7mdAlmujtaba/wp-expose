import { IoLogoWordpress, IoStar } from 'react-icons/io5';
import { FaTag } from 'react-icons/fa';

interface Plugin {
  name: string;
  version?: string;
  rating?: string;
  lastUpdated?: string;
  link?: string;
}

interface PluginCardsProps {
  plugins: Plugin[];
}

export default function PluginCards({ plugins }: PluginCardsProps) {
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
}
