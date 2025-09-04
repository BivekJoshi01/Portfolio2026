import React from "react";
import {
  ChevronLeft,
  ChevronRight,
  Search,
  Users,
  RefreshCcw,
  Bell,
  Clock,
  EllipsisVertical,
} from "lucide-react";

const VsNavHead = () => {
  return (
    <div className="flex items-center justify-between px-2 bg-[#252526] text-gray-300 text-sm h-full">
      {/* Left section */}
      <div className="w-5 h-5 bg-blue-500 flex items-center justify-center text-white text-xs font-bold rounded-sm">
        V
      </div>
      <div className="flex items-center gap-2">
        {/* VS logo placeholder (can replace with actual logo) */}

        {/* Navigation arrows */}
        <button className="p-1 hover:bg-gray-700 rounded">
          <ChevronLeft size={16} />
        </button>
        <button className="p-1 hover:bg-gray-700 rounded">
          <ChevronRight size={16} />
        </button>

        {/* Search / path input */}
        <div className="flex items-center bg-[#1E1E1E] border border-gray-700 rounded px-2 py-0.5 w-64">
          <Search size={14} className="mr-1 text-gray-400" />
          <input
            type="text"
            value="Bivek Prasad Joshi"
            // readOnly
            className="bg-transparent text-gray-300 text-xs outline-none flex-1"
          />
        </div>
      </div>

      {/* Right section */}
      <div className="flex items-center gap-2">
        <button className="p-1 hover:bg-gray-700 rounded">
          <Users size={16} />
        </button>
        <button className="p-1 hover:bg-gray-700 rounded">
          <RefreshCcw size={16} />
        </button>
        <button className="p-1 hover:bg-gray-700 rounded">
          <Bell size={16} />
        </button>
        <button className="p-1 hover:bg-gray-700 rounded">
          <Clock size={16} />
        </button>
        <button className="p-1 hover:bg-gray-700 rounded">
          <EllipsisVertical size={16} />
        </button>
      </div>
    </div>
  );
};

export default VsNavHead;
