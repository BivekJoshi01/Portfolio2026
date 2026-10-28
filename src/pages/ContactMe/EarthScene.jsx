import React, { Suspense, useCallback, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { useProgress } from "@react-three/drei";
import { AnimatePresence, motion } from "framer-motion";
import { MousePointerClick } from "lucide-react";
import LandEarth from "./LandEarth";
import GlobeLoader from "./GlobeLoader";

// Isolated so texture-progress updates don't re-render the Canvas.
const TextureProgress = () => {
  const { progress } = useProgress();
  return <GlobeLoader progress={progress} />;
};

const EarthScene = ({ onOpenMap }) => {
  const [ready, setReady] = useState(false);
  const handleReady = useCallback(() => setReady(true), []);

  return (
    <div className="relative w-full h-full">
      <Canvas dpr={[1, 2]}>
        {/* Local boundary: textures loading must not suspend the whole page */}
        <Suspense fallback={null}>
          <LandEarth setOpenMap={onOpenMap} onReady={handleReady} />
        </Suspense>
      </Canvas>

      <AnimatePresence>
        {!ready && <TextureProgress key="globe-loader" />}
      </AnimatePresence>

      <AnimatePresence>
        {ready && (
          <motion.div
            key="globe-hint"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 px-3 py-1.5 rounded-full font-mono text-[10px] tracking-[0.2em] uppercase whitespace-nowrap pointer-events-none backdrop-blur-md"
            style={{
              background: "color-mix(in srgb, var(--card) 70%, transparent)",
              border: "1px solid var(--card-border)",
            }}
          >
            <MousePointerClick size={12} className="animate-pulse" />
            Click the globe to find me
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default EarthScene;
