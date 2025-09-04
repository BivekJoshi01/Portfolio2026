import React from "react";
import { X } from "lucide-react";

const files = [
  { name: "AppRoutes.jsx", active: false, type: "react" },
  { name: "MyDetailInfo.jsx", active: false, type: "react" },
  { name: "VSLayout.jsx", active: true, type: "react" },
  { name: "package.json", active: false, type: "node" },
  { name: "VsFooter.jsx", active: false, type: "react" },
];

const VsNavContent = () => {
  return (
    <div className="flex items-center h-full text-sm text-gray-300">
      {files.map((file, idx) => (
        <div
          key={idx}
          className={`flex items-center gap-2 px-3 h-full cursor-pointer border-r border-gray-700
          ${
            file.active
              ? "bg-[#1E1E1E] text-white border-t-2 border-t-blue-500"
              : "hover:bg-[#2a2d2e]"
          }`}
        >
          {/* File icon substitute */}
          <span className="text-cyan-400 text-xs">◎</span>
          <span>{file.name}</span>
          <X size={14} className="ml-1 hover:text-white" />
        </div>
      ))}
    </div>
  );
};

export default VsNavContent;
