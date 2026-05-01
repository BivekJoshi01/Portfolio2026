import React, { useState } from "react";
import { GitBranch, Check, Plus, RefreshCcw, MoreHorizontal } from "lucide-react";
import { getFileIcon, VS_FILES } from "../vsFiles";
import { useVs } from "../useVs";

const CHANGES = [
  { id: "about", status: "M", color: "#f7c873" },
  { id: "projects", status: "M", color: "#f7c873" },
  { id: "experience", status: "U", color: "#74e87a" },
];

const VsSourceControlPanel = () => {
  const [message, setMessage] = useState("");
  const { openFile } = useVs();

  return (
    <div className="px-3 py-2 text-[13px]">
      <div className="flex items-center gap-2 mb-2">
        <GitBranch size={14} className="text-[#9ca3af]" />
        <span className="font-semibold">main</span>
        <span className="ml-auto flex gap-1">
          <button title="Commit" className="p-1 hover:bg-[#2a2d2e] rounded">
            <Check size={14} />
          </button>
          <button title="Refresh" className="p-1 hover:bg-[#2a2d2e] rounded">
            <RefreshCcw size={14} />
          </button>
          <button title="Stage all" className="p-1 hover:bg-[#2a2d2e] rounded">
            <Plus size={14} />
          </button>
          <button className="p-1 hover:bg-[#2a2d2e] rounded">
            <MoreHorizontal size={14} />
          </button>
        </span>
      </div>

      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Message (Ctrl+Enter to commit)"
        className="w-full bg-[#3c3c3c] focus:bg-[#3c3c3c] border border-[#3c3c3c] focus:border-[#007acc] rounded px-2 py-1 outline-none text-[#cccccc] placeholder:text-[#7c7c7c] text-[13px] resize-none"
        rows={2}
      />
      <button
        type="button"
        disabled={!message.trim()}
        className="mt-2 w-full bg-[#0e639c] hover:bg-[#1177bb] disabled:opacity-50 text-white text-[12px] py-1 rounded"
        onClick={() => setMessage("")}
      >
        ✓ Commit
      </button>

      <div className="mt-4 text-[11px] uppercase tracking-wider text-[#9ca3af]">
        Changes ({CHANGES.length})
      </div>
      <div className="mt-1">
        {CHANGES.map((c) => {
          const file = VS_FILES.find((f) => f.id === c.id);
          if (!file) return null;
          const { color, glyph } = getFileIcon(file.ext);
          return (
            <button
              key={c.id}
              type="button"
              onClick={() => openFile(c.id)}
              className="w-full flex items-center gap-2 px-1 py-0.5 text-[13px] hover:bg-[#2a2d2e] rounded"
            >
              <span style={{ color }} className="text-[10px] font-bold w-4 text-center">
                {glyph}
              </span>
              <span className="truncate flex-1 text-left">{file.name}</span>
              <span className="text-[12px] font-bold" style={{ color: c.color }}>
                {c.status}
              </span>
            </button>
          );
        })}
      </div>

      <div className="mt-4 text-[11px] uppercase tracking-wider text-[#9ca3af]">
        Recent Commits
      </div>
      <div className="mt-1 text-[12px] text-[#cccccc] space-y-1">
        <div className="px-1">
          <div className="font-medium">feat: command palette + scroll progress</div>
          <div className="text-[#9ca3af]">2 minutes ago · Bivek</div>
        </div>
        <div className="px-1">
          <div className="font-medium">refactor: VS Code clone realism</div>
          <div className="text-[#9ca3af]">just now · Bivek</div>
        </div>
      </div>
    </div>
  );
};

export default VsSourceControlPanel;
