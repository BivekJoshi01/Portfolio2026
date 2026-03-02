import React from "react";
import documentwatch from "../../../assets/documentwatch.mp4";

const InitalDocLoad = () => {
  return (
    <div
      className="hidden lg:flex lg:w-2/3 relative items-center justify-center 
                    border border-slate-700 rounded-3xl overflow-hidden h-[30vh]
                    "
    >
      {/* Background Video */}
      <video
        src={documentwatch}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-90"
      />

      {/* Glass Overlay */}
      <div className="absolute inset-0 backdrop-blur-md bg-black/40" />

      {/* Center Content */}
      <div className="relative z-10 text-center px-10 animate-fadeIn">
        <h1 className="text-3xl font-bold text-white mb-4">
          Secure Document Vault
        </h1>

        <p className="text-slate-300 text-lg">
          Select a document from the below to preview.
        </p>

        <div className="mt-8">
          <div
            className="w-14 h-14 border-4 border-slate-400 border-t-transparent 
                          rounded-full animate-spin mx-auto"
          ></div>
        </div>
      </div>
    </div>
  );
};

export default InitalDocLoad;
