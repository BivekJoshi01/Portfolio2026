import React from "react";
import { ChevronRight } from "lucide-react";
import { useVs } from "../useVs";
import { getFileIcon } from "../vsFiles";

const VsBreadcrumb = () => {
  const { activeFile } = useVs();
  if (!activeFile) return null;

  const { color, glyph } = getFileIcon(activeFile.ext);
  const segments = ["portfolio-2026", "src", "profile", activeFile.name];

  return (
    <div className="h-7 shrink-0 px-3 flex items-center gap-1 bg-[#1E1E1E] border-b border-[#1c1c1c] text-[12px] text-[#9ca3af] overflow-x-auto scrollbar-hide">
      {segments.map((seg, i) => {
        const isLast = i === segments.length - 1;
        return (
          <React.Fragment key={i}>
            <span
              className={`flex items-center gap-1 ${
                isLast ? "text-[#cccccc]" : "hover:text-[#cccccc] cursor-pointer"
              }`}
            >
              {isLast && (
                <span style={{ color }} className="text-[10px] font-bold">
                  {glyph}
                </span>
              )}
              <span className="whitespace-nowrap">{seg}</span>
            </span>
            {!isLast && <ChevronRight size={12} className="opacity-60" />}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default VsBreadcrumb;
