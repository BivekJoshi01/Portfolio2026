import React, { useState } from "react";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";

const initialFiles = [
  {
    name: "About_Me.jsx",
    active: false,
    path: "/vs-profile/my-infovs",
    type: "react",
  },
  {
    name: "Education.jsx",
    active: false,
    path: "/vs-profile/my-educationvs",
    type: "react",
  },
  {
    name: "Projects.jsx",
    active: true,
    path: "/vs-profile/my-projectsvs",
    type: "react",
  },
  {
    name: "Experience.json",
    active: false,
    path: "/vs-profile/my-experiencevs",
    type: "node",
  },
  {
    name: "Contact.jsx",
    active: false,
    path: "/vs-profile/my-contactvs",
    type: "react",
  },
];

const VsNavContent = () => {
  const [files, setFiles] = useState(initialFiles);
  const navigate = useNavigate();

  const handleTabClick = (idx) => {
    setFiles((prev) => prev.map((f, i) => ({ ...f, active: i === idx })));
    navigate(files[idx].path); // Navigate to the clicked file's path
  };

  return (
    <div className="flex items-center h-full text-sm text-gray-300">
      {files.map((file, idx) => (
        <div
          key={idx}
          onClick={() => handleTabClick(idx)}
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
