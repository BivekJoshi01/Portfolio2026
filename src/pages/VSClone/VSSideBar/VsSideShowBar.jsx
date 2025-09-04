import React from "react";
import {
  Files,
  Search,
  GitBranch,
  PlayCircle,
  // Extensions,
  Bug,
  // SourceControl,
  GitPullRequest,
  Settings,
  User,
} from "lucide-react";

const VsSideShowBar = () => {
  return (
    <div className="flex flex-col justify-between items-center h-full w-full bg-[#252526] text-gray-400 py-2">
      {/* Top section */}
      <div className="flex flex-col items-center gap-4">
        <button className="p-2 hover:text-white hover:bg-gray-700 rounded">
          <Files size={20} />
        </button>
        <button className="p-2 hover:text-white hover:bg-gray-700 rounded">
          <Search size={20} />
        </button>
        <button className="relative p-2 hover:text-white hover:bg-gray-700 rounded">
          <GitBranch size={20} />
          {/* Notification badge */}
          <span className="absolute top-1 right-1 bg-blue-500 text-white text-[10px] rounded-full px-1">
            2
          </span>
        </button>
        <button className="p-2 hover:text-white hover:bg-gray-700 rounded">
          <PlayCircle size={20} />
        </button>
        <button className="relative p-2 hover:text-white hover:bg-gray-700 rounded">
          {/* <Extensions size={20} /> */}
          <span className="absolute top-1 right-1 bg-blue-500 text-white text-[10px] rounded-full px-1">
            1
          </span>
        </button>
        <button className="p-2 hover:text-white hover:bg-gray-700 rounded">
          <Bug size={20} />
        </button>
        <button className="p-2 hover:text-white hover:bg-gray-700 rounded">
          {/* <SourceControl size={20} /> */}
        </button>
        <button className="p-2 hover:text-white hover:bg-gray-700 rounded">
          <GitPullRequest size={20} />
        </button>
      </div>

      {/* Bottom section */}
      <div className="flex flex-col items-center gap-4">
        <button className="p-2 hover:text-white hover:bg-gray-700 rounded">
          <User size={20} />
        </button>
        <button className="relative p-2 hover:text-white hover:bg-gray-700 rounded">
          <Settings size={20} />
          <span className="absolute top-1 right-1 bg-blue-500 text-white text-[10px] rounded-full px-1">
            1
          </span>
        </button>
      </div>
    </div>
  );
};

export default VsSideShowBar;
