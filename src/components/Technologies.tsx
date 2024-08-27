import { IoLogoWordpress } from "react-icons/io5";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

interface TechnologiesProps {
  url: string;
  currentStage: string;
  technologies: string[] | undefined;
  isWordPress: boolean;
  loading: boolean;
}

const Technologies: React.FC<TechnologiesProps> = ({ url, loading, currentStage, technologies, isWordPress }) => {
  // if (!technologies || technologies.length === 0) {
  //   return null; // or return a fallback UI, like a message "No technologies found"
  // }

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h3 className="text-2xl font-bold mb-4">Technologies Used</h3>
      
      { loading && currentStage === "checking" ? (
        <Skeleton className="" height={40}/>
      ) : (
        isWordPress && (
          <h3 className="text-2xl font-bold mb-4 flex items-center">
            {url} is Built using &nbsp;
           <IoLogoWordpress className="text-blue-500 mr-2" />
           Wordpress
          </h3>
         )
      )

      }
        
        {/* {technologies.map((tech, index) => (
          <li key={index} className="text-gray-600">{tech}</li>
        ))} */}
      
    </div>
  );
};

export default Technologies;
