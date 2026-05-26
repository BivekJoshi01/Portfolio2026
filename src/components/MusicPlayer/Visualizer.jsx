import React, { useEffect, useRef } from "react";

const Visualizer = ({ analyserRef, isPlaying, accent = "#7c3aed" }) => {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    let prevData = null;

    const draw = () => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      ctx.clearRect(0, 0, w, h);

      const analyser = analyserRef?.current;
      let data;
      if (analyser && isPlaying) {
        const arr = new Uint8Array(analyser.frequencyBinCount);
        analyser.getByteFrequencyData(arr);
        data = arr;
        prevData = arr;
      } else if (prevData) {
        // gracefully fade out the previous values
        data = prevData.map((v) => Math.max(0, v - 4));
        prevData = data;
      } else {
        data = new Uint8Array(32);
      }

      const bars = Math.min(48, data.length);
      const gap = 2;
      const barW = (w - gap * (bars - 1)) / bars;
      ctx.fillStyle = accent;

      for (let i = 0; i < bars; i++) {
        const v = data[i] / 255;
        const eased = Math.pow(v, 1.4);
        const barH = Math.max(2, eased * h * 0.95);
        const x = i * (barW + gap);
        const y = h - barH;
        ctx.globalAlpha = 0.85;
        ctx.fillRect(x, y, barW, barH);
      }

      // Mirror reflection
      ctx.globalAlpha = 0.18;
      for (let i = 0; i < bars; i++) {
        const v = data[i] / 255;
        const barH = Math.max(2, Math.pow(v, 1.4) * h * 0.45);
        const x = i * (barW + gap);
        ctx.fillRect(x, h - 1, barW, barH);
      }
      ctx.globalAlpha = 1;

      rafRef.current = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      window.removeEventListener("resize", resize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [analyserRef, isPlaying, accent]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="w-full h-full block"
      style={{ width: "100%", height: "100%" }}
    />
  );
};

export default Visualizer;
