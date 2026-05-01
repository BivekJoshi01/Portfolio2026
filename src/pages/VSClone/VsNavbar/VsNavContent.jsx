import React from "react";
import { X, SplitSquareHorizontal, MoreHorizontal } from "lucide-react";
import { useVs } from "../useVs";
import { getFileIcon } from "../vsFiles";

const VsNavContent = () => {
  const { openFiles, activeFile, openFile, closeFile } = useVs();

  return (
    <div className="flex items-center h-full bg-[#252526] text-[13px] text-[#cccccc]">
      <div className="flex flex-1 h-full overflow-x-auto scrollbar-hide">
        {openFiles.map((file) => {
          const isActive = activeFile?.id === file.id;
          const { color, glyph } = getFileIcon(file.ext);
          return (
            <div
              key={file.id}
              onClick={() => openFile(file.id)}
              className={`group flex items-center gap-2 px-3 h-full cursor-pointer border-r border-[#1c1c1c] select-none ${
                isActive
                  ? "bg-[#1E1E1E] text-white"
                  : "bg-[#2d2d2d] text-[#cccccc] hover:bg-[#383838]"
              }`}
              style={{
                borderTop: isActive
                  ? "1px solid #007acc"
                  : "1px solid transparent",
              }}
              title={file.path}
            >
              <span style={{ color }} className="text-[10px] font-bold w-4 text-center">
                {glyph}
              </span>
              <span className="truncate max-w-37.5">{file.name}</span>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  closeFile(file.id);
                }}
                className={`ml-1 w-4 h-4 flex items-center justify-center rounded hover:bg-[#3c3c3c] ${
                  isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                }`}
                aria-label={`Close ${file.name}`}
              >
                <X size={12} />
              </button>
            </div>
          );
        })}

        {openFiles.length === 0 && (
          <div className="px-3 h-full flex items-center text-[#9ca3af] text-[12px]">
            No file open — click a file in the Explorer
          </div>
        )}
      </div>

      <div className="flex items-center gap-1 px-2 h-full text-[#9ca3af]">
        <button
          type="button"
          title="Split Editor"
          className="p-1 hover:bg-[#37373d] rounded"
        >
          <SplitSquareHorizontal size={16} />
        </button>
        <button
          type="button"
          title="More Actions"
          className="p-1 hover:bg-[#37373d] rounded"
        >
          <MoreHorizontal size={16} />
        </button>
      </div>
    </div>
  );
};

export default VsNavContent;
