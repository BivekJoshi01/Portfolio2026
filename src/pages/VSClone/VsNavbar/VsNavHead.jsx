import React, { useState } from "react";
import { Search, Minus, Square, X } from "lucide-react";
import { useVs } from "../useVs";

const MENUS = [
  "File",
  "Edit",
  "Selection",
  "View",
  "Go",
  "Run",
  "Terminal",
  "Help",
];

const VsNavHead = () => {
  const { activeFile } = useVs();
  const [menuOpen, setMenuOpen] = useState(null);

  const triggerCommandPalette = () => {
    const ev = new KeyboardEvent("keydown", {
      key: "k",
      ctrlKey: true,
      bubbles: true,
    });
    window.dispatchEvent(ev);
  };

  return (
    <div className="flex items-center h-full text-[#cccccc] text-[12px]">
      {/* Logo */}
      <div className="flex items-center px-2">
        <div className="w-5 h-5 rounded-sm flex items-center justify-center text-white text-[10px] font-bold"
          style={{ background: "linear-gradient(135deg,#0078d4,#005a9e)" }}>
          VS
        </div>
      </div>

      {/* Menu bar */}
      <div className="flex items-center h-full">
        {MENUS.map((m) => (
          <button
            key={m}
            type="button"
            onMouseEnter={() => menuOpen && setMenuOpen(m)}
            onClick={() => setMenuOpen(menuOpen === m ? null : m)}
            className={`px-2 h-full hover:bg-[rgba(255,255,255,0.1)] ${
              menuOpen === m ? "bg-[rgba(255,255,255,0.15)]" : ""
            }`}
          >
            {m}
          </button>
        ))}
      </div>

      {/* Center search box */}
      <div className="flex-1 flex justify-center px-4">
        <button
          type="button"
          onClick={triggerCommandPalette}
          className="flex items-center gap-2 bg-[#3c3c3c] hover:bg-[#4c4c4c] border border-[#3c3c3c] rounded px-2 py-0.5 text-[12px] text-[#cccccc] w-full max-w-md"
          title="Open command palette (Ctrl+K)"
        >
          <Search size={12} className="text-[#9ca3af]" />
          <span className="text-[#9ca3af] truncate">
            {activeFile ? activeFile.name : "portfolio2026"}
          </span>
          <kbd className="ml-auto text-[10px] bg-[#252526] px-1 rounded">
            Ctrl+K
          </kbd>
        </button>
      </div>

      {/* Window controls (visual only) */}
      <div className="flex items-center h-full">
        <button className="px-3 h-full hover:bg-[rgba(255,255,255,0.1)]">
          <Minus size={12} />
        </button>
        <button className="px-3 h-full hover:bg-[rgba(255,255,255,0.1)]">
          <Square size={10} />
        </button>
        <button className="px-3 h-full hover:bg-[#e81123]">
          <X size={12} />
        </button>
      </div>

    </div>
  );
};

export default VsNavHead;
