import {
  Cog8ToothIcon,
  MagnifyingGlassIcon,
  ChatBubbleBottomCenterIcon,
  BellIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-white p-4 shadow-md flex items-center justify-between sticky top-0 z-10">
      {/* Search bar */}
      <div className="flex space-x-1 text-gray-400">
        <MagnifyingGlassIcon className="h-6 w-6 cursor-pointer" />
        <input
          type="text"
          placeholder="Type to search..."
          className="outline-none bg-transparent border-none"
        />
      </div>

      {/* Navbar options */}
      <div className="text-gray-500 flex items-center space-x-5">
        <Link to="/profile">
          <Cog8ToothIcon className="h-6 w-6 cursor-pointer" />
        </Link>
        <ChatBubbleBottomCenterIcon className="h-6 w-6 cursor-pointer" />
        <BellIcon className="h-6 w-6 cursor-pointer" />
        <div className="flex items-center space-x-2">
          <div className="text-center text-sm">
            <p className="text-black font-semibold">Thomas Brown</p>
            <p>Developer</p>
          </div>
          <img
            className="h-12 w-12 rounded-full"
            src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8&w=1000&q=80"
            alt=""
          />
          <ChevronDownIcon className="h-4 w-4 font-bold cursor-pointer" />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
