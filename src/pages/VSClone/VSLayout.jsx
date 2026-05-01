import React from "react";
import { Outlet } from "react-router-dom";
import VsSideShowBar from "./VSSideBar/VsSideShowBar";
import VsNavHead from "./VsNavbar/VsNavHead";
import VsNavContent from "./VsNavbar/VsNavContent";
import VsSidePanel from "./VSSideBar/VsSidePanel";
import VsTerminal from "./VsFooter/VsTerminal";
import VsFooter from "./VsFooter/VsFooter";
import VsBreadcrumb from "./VsNavbar/VsBreadcrumb";
import VsOutlinePanel from "./VSSideBar/VsOutlinePanel";
import { VsProvider } from "./vsContext";
import { useVs } from "./useVs";
import "./VSLayout.css";

const VSLayoutInner = () => {
  const { terminalOpen, rightPanelOpen } = useVs();

  return (
    <div className="w-full h-screen text-white bg-[#1E1E1E] flex flex-col overflow-hidden">
      {/* Title bar */}
      <div className="h-9 shrink-0 border-b border-[#1c1c1c] bg-[#3c3c3c]">
        <VsNavHead />
      </div>

      {/* Body */}
      <div className="flex flex-1 min-h-0">
        {/* Activity bar */}
        <div className="w-12 shrink-0 border-r border-[#1c1c1c] bg-[#333333]">
          <VsSideShowBar />
        </div>

        {/* Side panel (Explorer / Search / etc) */}
        <div className="w-64 shrink-0 border-r border-[#1c1c1c] bg-[#252526]">
          <VsSidePanel />
        </div>

        {/* Editor stack */}
        <div className="flex-1 flex flex-col min-w-0 min-h-0">
          {/* Tabs */}
          <div className="h-9 shrink-0 border-b border-[#1c1c1c] bg-[#2d2d2d]">
            <VsNavContent />
          </div>

          {/* Breadcrumb */}
          <VsBreadcrumb />

          <div className="flex flex-1 min-h-0">
            {/* Editor content (Outlet) */}
            <div className="flex-1 overflow-auto bg-[#1E1E1E] min-w-0">
              <Outlet />
            </div>

            {/* Outline / right panel */}
            {rightPanelOpen && (
              <div className="w-60 shrink-0 border-l border-[#1c1c1c] bg-[#252526] hidden lg:block">
                <VsOutlinePanel />
              </div>
            )}
          </div>

          {/* Terminal */}
          {terminalOpen && (
            <div className="h-56 shrink-0 border-t border-[#1c1c1c] bg-[#1E1E1E]">
              <VsTerminal />
            </div>
          )}
        </div>
      </div>

      {/* Status bar */}
      <div className="h-6 shrink-0 border-t border-[#1c1c1c] bg-[#007acc] text-white">
        <VsFooter />
      </div>
    </div>
  );
};

const VSLayout = () => (
  <VsProvider>
    <VSLayoutInner />
  </VsProvider>
);

export default VSLayout;
