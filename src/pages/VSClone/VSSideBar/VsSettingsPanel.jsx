import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTheme } from "../../../redux/Reducer/themeSlice";
import { setLanguage } from "../../../redux/Reducer/languageSlice";
import { useVs } from "../useVs";

const VsSettingsPanel = ({ panel }) => {
  const dispatch = useDispatch();
  const mode = useSelector((s) => s.theme.mode);
  const lang = useSelector((s) => s.lang.lang);
  const { terminalOpen, setTerminalOpen, rightPanelOpen, setRightPanelOpen } =
    useVs();

  if (panel === "account") {
    return (
      <div className="px-3 py-2 text-[13px]">
        <div className="flex items-center gap-3 p-3 rounded bg-[#2a2d2e]">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold"
            style={{ background: "linear-gradient(135deg,#7c3aed,#06b6d4)" }}
          >
            BJ
          </div>
          <div>
            <div className="font-medium">Bivek Joshi</div>
            <div className="text-[11px] text-[#9ca3af]">
              github.com/BivekJoshi01
            </div>
          </div>
        </div>
        <button
          type="button"
          className="mt-3 w-full bg-[#0e639c] hover:bg-[#1177bb] text-white text-[12px] py-1 rounded"
        >
          Sign in to sync settings
        </button>
      </div>
    );
  }

  return (
    <div className="px-3 py-2 text-[13px] space-y-4">
      <div>
        <div className="text-[11px] uppercase tracking-wider text-[#9ca3af] mb-1">
          Color Theme
        </div>
        <div className="flex gap-2">
          {["light", "dark"].map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => dispatch(setTheme(m))}
              className={`flex-1 py-1 rounded text-[12px] capitalize ${
                mode === m
                  ? "bg-[#0e639c] text-white"
                  : "bg-[#3c3c3c] text-[#cccccc] hover:bg-[#4c4c4c]"
              }`}
            >
              {m}
            </button>
          ))}
        </div>
      </div>

      <div>
        <div className="text-[11px] uppercase tracking-wider text-[#9ca3af] mb-1">
          Language
        </div>
        <div className="flex gap-2">
          {[
            { code: "en", label: "English" },
            { code: "np", label: "नेपाली" },
          ].map((l) => (
            <button
              key={l.code}
              type="button"
              onClick={() => dispatch(setLanguage(l.code))}
              className={`flex-1 py-1 rounded text-[12px] ${
                lang === l.code
                  ? "bg-[#0e639c] text-white"
                  : "bg-[#3c3c3c] text-[#cccccc] hover:bg-[#4c4c4c]"
              }`}
            >
              {l.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <div className="text-[11px] uppercase tracking-wider text-[#9ca3af] mb-1">
          Workbench
        </div>
        <label className="flex items-center justify-between py-1 cursor-pointer">
          <span>Show Terminal panel</span>
          <input
            type="checkbox"
            checked={terminalOpen}
            onChange={(e) => setTerminalOpen(e.target.checked)}
            className="accent-[#007acc]"
          />
        </label>
        <label className="flex items-center justify-between py-1 cursor-pointer">
          <span>Show Outline panel</span>
          <input
            type="checkbox"
            checked={rightPanelOpen}
            onChange={(e) => setRightPanelOpen(e.target.checked)}
            className="accent-[#007acc]"
          />
        </label>
      </div>

      <div className="text-[11px] text-[#9ca3af] border-t border-[#3c3c3c] pt-2">
        Settings sync is mocked for this demo. Toggling here also affects the
        rest of the portfolio.
      </div>
    </div>
  );
};

export default VsSettingsPanel;
