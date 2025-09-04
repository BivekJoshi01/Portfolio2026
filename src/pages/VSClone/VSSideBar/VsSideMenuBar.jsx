import React, { useState } from "react";
import { ChevronDown, ChevronRight, File, Folder } from "lucide-react";

const fileTree = [
  {
    name: "node_modules",
    type: "folder",
    children: [],
  },
  {
    name: "public",
    type: "folder",
    children: [],
  },
  {
    name: "src",
    type: "folder",
    children: [
      { name: ".gitignore", type: "file" },
      { name: "eslint.config.js", type: "file" },
      { name: "index.html", type: "file" },
      { name: "package-lock.json", type: "file" },
      { name: "package.json", type: "file" },
      { name: "README.md", type: "file" },
      { name: "vite.config.js", type: "file" },
    ],
  },
];

const FolderItem = ({ item }) => {
  const [open, setOpen] = useState(true);

  if (item.type === "file") {
    return (
      <div className="flex items-center gap-2 pl-8 py-1 text-gray-300 hover:bg-gray-700 cursor-pointer">
        <File size={16} />
        <span>{item.name}</span>
      </div>
    );
  }

  return (
    <div>
      <div
        className="flex items-center gap-2 pl-4 py-1 text-gray-200 font-medium hover:bg-gray-700 cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        {open ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
        <Folder size={16} />
        <span>{item.name}</span>
      </div>
      {open && (
        <div className="ml-2">
          {item.children?.map((child, index) => (
            <FolderItem key={index} item={child} />
          ))}
        </div>
      )}
    </div>
  );
};

const VsSideMenuBar = () => {
  return (
    <div className="h-screen w-full text-sm text-gray-300 overflow-y-auto">
      <div className="p-2 text-gray-400 text-xs font-semibold">EXPLORER</div>
      {fileTree.map((item, idx) => (
        <FolderItem key={idx} item={item} />
      ))}
    </div>
  );
};

export default VsSideMenuBar;
