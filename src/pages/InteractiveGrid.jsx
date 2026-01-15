import React, { useEffect, useRef } from "react";

const InteractiveGrid = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const gridSize = 25;
    let mouse = { x: -100, y: -100 };

    const drawGrid = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let x = 0; x < canvas.width; x += gridSize) {
        for (let y = 0; y < canvas.height; y += gridSize) {
          const dx = x - mouse.x;
          const dy = y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const alpha = Math.min(0.5, 100 / (dist + 50)); // fade effect
          const size = Math.min(4, 25 / (dist + 20)); // small particle size

          // gradient color effect
          const color = `hsl(${(x + y + performance.now() * 0.02) % 360}, 80%, 60%)`;
          ctx.fillStyle = `rgba(${parseInt(Math.sin(dist/50)*128+128)}, ${parseInt(Math.cos(dist/50)*128+128)}, 255, ${alpha})`;
          ctx.beginPath();
          ctx.arc(x, y, size, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      requestAnimationFrame(drawGrid);
    };

    drawGrid();

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1,
        pointerEvents: "none",
        backgroundColor: "#0a0a0a", // dark background
      }}
    />
  );
};

export default InteractiveGrid;
