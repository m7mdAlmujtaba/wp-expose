import { ImSpinner2 } from 'react-icons/im';

export default function LoadingSpinner() {
  return (
    <div className="text-blue-500 mt-10">
      <p>Detecting Technology...</p>
      <ImSpinner2 className="animate-spin inline-block mr-2" />
    </div>
  );
}
