import React, { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { FILE_TREE, getFileIcon, findFileById } from "../vsFiles";
import { useVs } from "../useVs";

const FileIcon = ({ ext }) => {
  const { color, glyph } = getFileIcon(ext);
  return (
    <span
      className="inline-flex items-center justify-center w-4 h-4 text-[10px] font-bold shrink-0"
      style={{ color }}
      aria-hidden
    >
      {glyph}
    </span>
  );
};

const TreeNode = ({ node, depth = 0 }) => {
  const [open, setOpen] = useState(node.open ?? false);
  const { openFile, activeFile } = useVs();
  const navigate = useNavigate();

  if (node.type === "file") {
    const target = node.fileId ? findFileById(node.fileId) : null;
    const isActive = target && activeFile?.id === target.id;
    const ext = target?.ext || node.ext || "txt";

    const handleClick = () => {
      if (target) {
        openFile(target.id);
      } else {
        // Virtual file with no real route — navigate to a 404 path within /vs-profile
        const slug = encodeURIComponent(node.name);
        navigate(`/vs-profile/${slug}`);
      }
    };

    return (
      <button
        type="button"
        onClick={handleClick}
        className={`w-full flex items-center gap-2 py-0.75 text-left text-[13px] transition-colors cursor-pointer ${
          isActive
            ? "bg-[#37373d] text-white"
            : target
              ? "text-[#cccccc] hover:bg-[#2a2d2e]"
              : "text-[#9ca3af] hover:bg-[#2a2d2e]"
        }`}
        style={{ paddingLeft: 8 + depth * 12 }}
        title={target ? `Open ${node.name}` : `${node.name} (preview not available)`}
      >
        <span className="w-3 shrink-0" />
        <FileIcon ext={ext} />
        <span className="truncate">{node.name}</span>
      </button>
    );
  }

  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center gap-1 py-0.75 text-left text-[13px] text-[#cccccc] hover:bg-[#2a2d2e]"
        style={{ paddingLeft: 4 + depth * 12 }}
      >
        {open ? (
          <ChevronDown size={14} className="shrink-0" />
        ) : (
          <ChevronRight size={14} className="shrink-0" />
        )}
        <span
          className="text-[#dcb67a]"
          style={{ filter: open ? "none" : "saturate(0.6)" }}
        >
          {open ? "📂" : "📁"}
        </span>
        <span className="truncate">{node.name}</span>
      </button>
      {open &&
        node.children?.map((child, i) => (
          <TreeNode key={`${child.name}-${i}`} node={child} depth={depth + 1} />
        ))}
    </div>
  );
};

const VsExplorerPanel = () => {
  const [openProject, setOpenProject] = useState(true);

  return (
    <div className="py-1">
      <button
        type="button"
        onClick={() => setOpenProject((o) => !o)}
        className="w-full flex items-center gap-1 px-2 py-1 text-[11px] uppercase font-semibold text-[#9ca3af] hover:bg-[#2a2d2e]"
      >
        {openProject ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
        <span>portfolio-2026</span>
      </button>
      {openProject && (
        <div>
          {FILE_TREE.map((node, i) => (
            <TreeNode key={`${node.name}-${i}`} node={node} />
          ))}
        </div>
      )}
    </div>
  );
};

export default VsExplorerPanel;
