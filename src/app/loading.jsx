import { RiLoader2Fill } from "react-icons/ri";
const Loader = () => {
  return (
    <div className="flex items-center justify-center h-screen w-screen">
      <RiLoader2Fill className="animate-spin h-20 w-20 text-gray-600" />
    </div>
  );
};

export default Loader;
