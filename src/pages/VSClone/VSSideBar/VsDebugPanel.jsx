import React, { useState } from "react";
import { Play, Square, RotateCcw, Bug } from "lucide-react";

const BREAKPOINTS = [
  { file: "Projects.jsx", line: 42, enabled: true },
  { file: "About_Me.jsx", line: 18, enabled: true },
  { file: "Experience.json", line: 7, enabled: false },
];

const VsDebugPanel = () => {
  const [running, setRunning] = useState(false);

  return (
    <div className="px-3 py-2 text-[13px]">
      <div className="flex items-center gap-2">
        <select className="flex-1 bg-[#3c3c3c] text-[#cccccc] text-[12px] rounded px-2 py-1 outline-none">
          <option>Launch portfolio (vite)</option>
          <option>Attach to Chrome</option>
          <option>Run all tests</option>
        </select>
        <button
          type="button"
          onClick={() => setRunning((r) => !r)}
          title={running ? "Stop" : "Start Debugging"}
          className="p-1 rounded text-[#74e87a] hover:bg-[#2a2d2e]"
        >
          {running ? <Square size={16} /> : <Play size={16} />}
        </button>
        <button type="button" title="Restart" className="p-1 rounded hover:bg-[#2a2d2e]">
          <RotateCcw size={16} />
        </button>
      </div>

      <div className="mt-4 text-[11px] uppercase tracking-wider text-[#9ca3af]">
        Variables
      </div>
      <div className="mt-1 font-mono text-[12px] text-[#cccccc] space-y-0.5">
        <div><span className="text-[#9ca3af]">name:</span> <span className="text-[#ce9178]">"Bivek Joshi"</span></div>
        <div><span className="text-[#9ca3af]">role:</span> <span className="text-[#ce9178]">"Full-Stack Developer"</span></div>
        <div><span className="text-[#9ca3af]">years:</span> <span className="text-[#b5cea8]">4</span></div>
        <div><span className="text-[#9ca3af]">caffeine:</span> <span className="text-[#b5cea8]">Infinity</span></div>
      </div>

      <div className="mt-4 text-[11px] uppercase tracking-wider text-[#9ca3af]">
        Breakpoints
      </div>
      <div className="mt-1 space-y-0.5">
        {BREAKPOINTS.map((b, i) => (
          <div key={i} className="flex items-center gap-2 text-[12px] text-[#cccccc]">
            <Bug
              size={12}
              className={b.enabled ? "text-red-500" : "text-[#555]"}
            />
            <span className="truncate">{b.file}</span>
            <span className="text-[#9ca3af]">:{b.line}</span>
          </div>
        ))}
      </div>

      <div className="mt-4 text-[11px] uppercase tracking-wider text-[#9ca3af]">
        Call Stack
      </div>
      <div className="mt-1 font-mono text-[12px] text-[#cccccc] space-y-0.5">
        <div>render() → Projects.jsx:42</div>
        <div>useEffect() → Home.jsx:18</div>
        <div>App() → App.jsx:24</div>
      </div>
    </div>
  );
};

export default VsDebugPanel;
