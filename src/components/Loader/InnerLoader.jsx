import React from "react";

// Lightweight Suspense fallback shown while a page chunk downloads.
const InnerLoader = () => {
  return (
    <div
      role="status"
      aria-live="polite"
      className="w-full min-h-[60vh] flex flex-col items-center justify-center gap-4"
    >
      <div className="relative w-12 h-12">
        <span className="absolute inset-0 rounded-full border-2 border-transparent border-t-(--primary) border-l-(--secondary) animate-spin" />
        <span className="absolute inset-3 rounded-full bg-(--primary) opacity-40 animate-ping" />
      </div>
      <span className="font-mono text-[10px] tracking-[0.3em] uppercase opacity-60">
        Loading
      </span>
    </div>
  );
};

export default InnerLoader;
