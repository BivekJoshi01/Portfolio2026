import React from "react";
import VsSideShowBar from "./VSSideBar/VsSideShowBar";
import VsNavHead from "./VsNavbar/VsNavHead";
import VsNavContent from "./VsNavbar/VsNavContent";
import VsSideMenuBar from "./VSSideBar/VsSideMenuBar";
import VsTerminal from "./VsFooter/VsTerminal";
import VsFooter from "./VsFooter/VsFooter";

const VSLayout = ({ children }) => {
  return (
    <div className="w-full h-screen bg-[#1E1E1E] text-white">
      <div style={{ height: "3%" }} className="border-b border-gray-800">
        <VsNavHead />
      </div>
      <div className="w-full flex" style={{ height: "94%" }}>
        {/* Left Sidebar */}
        <div className="w-14 border-r border-gray-800 h-full">
          <VsSideShowBar />
        </div>

        {/* Secondary Menu / File Explorer */}
        <div className="w-80 border-r border-gray-800 h-full p-2">
          <VsSideMenuBar/>
        </div>

        {/* Main Area */}
        <div className="flex-1 flex flex-col h-full">
          {/* Navbar / Top header */}
          <div className="h-12 border-b border-gray-800 px-4 flex items-center">
            <VsNavContent/>
          </div>

          {/* Content + Right Sidebar */}
          <div className="flex flex-1 overflow-hidden">
            {/* Editor / Main content */}
            <div className="flex-1 overflow-auto p-4">
              {children || (
                <div className="flex items-center justify-center h-full text-gray-400">
                  VS Clone Content Area
                </div>
              )}
            </div>

            {/* Right Sidebar / Info panel */}
            <div className="w-50 border-l border-gray-800 p-2 overflow-auto">
              Right Panel
            </div>
          </div>

          {/* Footer / Terminal */}
          <div className="h-32 border-t border-gray-800 p-2 overflow-auto bg-[#252526]">
            <VsTerminal/>
          </div>
        </div>
      </div>
      <div style={{ height: "3%" }} className="border-t border-gray-800">
        <VsFooter/>
      </div>
    </div>
  );
};

export default VSLayout;
