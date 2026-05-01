import React, { useEffect, useState } from "react";
import {
  GitBranch,
  AlertCircle,
  AlertTriangle,
  Bell,
  Wifi,
  Check,
  Cloud,
} from "lucide-react";
import { useVs } from "../useVs";

const VsFooter = () => {
  const { activeFile, terminalOpen, setTerminalOpen } = useVs();
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const timeStr = now.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  const language = activeFile?.language || "Plain Text";

  const Item = ({ children, onClick, title, accent }) => (
    <button
      type="button"
      onClick={onClick}
      title={title}
      className={`flex items-center gap-1 px-2 h-full text-[11px] hover:bg-[rgba(255,255,255,0.15)] ${
        accent ? "bg-[rgba(255,255,255,0.08)]" : ""
      }`}
    >
      {children}
    </button>
  );

  return (
    <div className="flex items-center justify-between h-full text-white text-[11px] select-none">
      <div className="flex items-center h-full">
        <Item title="Open remote">
          <Cloud size={12} />
        </Item>
        <Item title="Branch: main">
          <GitBranch size={12} />
          <span>main*</span>
          <span className="opacity-80">↑1 ↓0</span>
        </Item>
        <Item title="No errors">
          <Check size={12} />
        </Item>
        <Item title="Problems">
          <AlertCircle size={12} />
          <span>0</span>
          <AlertTriangle size={12} className="ml-1" />
          <span>1</span>
        </Item>
        <Item
          title={terminalOpen ? "Hide terminal" : "Show terminal"}
          onClick={() => setTerminalOpen(!terminalOpen)}
        >
          <span className="font-mono">⏵</span>
          <span>Terminal</span>
        </Item>
      </div>

      <div className="flex items-center h-full">
        <Item title="Cursor position">Ln 1, Col 1</Item>
        <Item title="Indentation">Spaces: 2</Item>
        <Item title="Encoding">UTF-8</Item>
        <Item title="End of line">LF</Item>
        <Item title="Language" accent>
          {language}
        </Item>
        <Item title="Prettier">
          <span>Prettier</span>
        </Item>
        <Item title="Notifications">
          <Bell size={12} />
        </Item>
        <Item title="Network">
          <Wifi size={12} />
          <span>{timeStr}</span>
        </Item>
      </div>
    </div>
  );
};

export default VsFooter;
