import { IoLogoWordpress } from 'react-icons/io5';
import { FaTag } from 'react-icons/fa';
import Skeleton from 'react-loading-skeleton';
import "react-loading-skeleton/dist/skeleton.css";

interface Theme {
  name: string;
  version?: string;
  author?: string;
  description?: string;
  screenshot?: string;
  link?: string;
}

interface ThemeCardProps {
  loading: boolean;
  currentStage: string;
  theme: Theme;
}

export default function ThemeCard({ currentStage, loading, theme }: ThemeCardProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h3 className="text-2xl font-bold mb-4 flex items-center">
        <IoLogoWordpress className="text-blue-500 mr-2" />
        WordPress Theme
      </h3>
      { loading && currentStage === "theme" ? (
         <div className="flex items-start space-x-4">
         <Skeleton width={150} height={150}/>
         <div className="flex-1">
           <h4 className="text-xl font-semibold">
             <a href="#" target="_blank" rel="noopener noreferrer" className="hover:underline">
              <Skeleton width={200}/>
             </a>
           </h4>
           <p className="text-gray-600">
             <FaTag className="inline-block mr-1" /> Version: <Skeleton width={200}/>
           </p>
           <p className="text-gray-600">
             <FaTag className="inline-block mr-1" /> Author: <Skeleton width={200}/>
           </p>
           <p className="text-gray-600 mt-2">
           <Skeleton height={100}/>
           </p>
         </div>
       </div>
      ) : (
        theme && (
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
        )
      )

      }
    

    </div>
  );
}
