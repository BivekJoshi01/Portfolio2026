import React, { useRef, useEffect } from "react";

const GridAnimation = ({ mode }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animationFrameId;

    let width, height;
    const gridSize = 20;
    let particles = [];

    const init = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      particles = [];
      const particleCount = 35;
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    };

    class Particle {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.floor(Math.random() * (width / gridSize)) * gridSize;
        this.y = Math.floor(Math.random() * (height / gridSize)) * gridSize;
        this.speed = 1.5;
        this.dir = Math.floor(Math.random() * 4);
        this.color = Math.random() > 0.5 ? "#c491f7" : "#b0b3fc";
        
        // This array stores the path to create the "fading" tail
        this.history = []; 
        // 600 segments = ~10 seconds at 60fps
        this.maxHistory = 600; 
      }

      draw() {
        const oldX = this.x;
        const oldY = this.y;

        // --- Movement Logic ---
        if (this.dir === 0) this.y -= this.speed;
        else if (this.dir === 1) this.x += this.speed;
        else if (this.dir === 2) this.y += this.speed;
        else if (this.dir === 3) this.x -= this.speed;

        // Store this movement segment in history for the watermark
        this.history.push({ x1: oldX, y1: oldY, x2: this.x, y2: this.y });

        // IMPORTANT: This removes the oldest data so it vanishes after 5 seconds
        if (this.history.length > this.maxHistory) {
          this.history.shift();
        }

        // --- Grid Logic ---
        if (Math.abs(this.x % gridSize) < 1 && Math.abs(this.y % gridSize) < 1) {
          this.x = Math.round(this.x / gridSize) * gridSize;
          this.y = Math.round(this.y / gridSize) * gridSize;
          if (Math.random() > 0.6) this.dir = Math.floor(Math.random() * 4);
        }

        // --- 1. DRAW THE WATERMARK (Thin & Fading) ---
        ctx.lineCap = "round";
        ctx.lineWidth = 1; // Keep the tail thin

        this.history.forEach((seg, i) => {
          // Fade alpha from 0 to 0.4 based on age
          const alpha = i / this.history.length;
          ctx.globalAlpha = alpha * 0.4; 
          ctx.strokeStyle = this.color;
          
          ctx.beginPath();
          ctx.moveTo(seg.x1, seg.y1);
          ctx.lineTo(seg.x2, seg.y2);
          ctx.stroke();
        });

        // --- 2. DRAW THE "FAT HEAD" (Thick & Glowing) ---
        ctx.globalAlpha = 1.0;
        ctx.strokeStyle = this.color;
        
        // FAT HEAD SETTINGS
        ctx.lineWidth = 1.5;   // Increased thickness for the head
        ctx.shadowBlur = 2;     // More glow for the head
        ctx.shadowColor = this.color;

        ctx.beginPath();
        ctx.moveTo(oldX, oldY);
        ctx.lineTo(this.x, this.y);
        ctx.stroke();
        
        // Clean up shadow for next frame performance
        ctx.shadowBlur = 0;

        // Reset if offscreen
        if (this.x < 0 || this.x > width || this.y < 0 || this.y > height) {
          this.reset();
        }
      }
    }

    const animate = () => {
      // clearRect ensures the 5-second old lines are physically deleted
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => p.draw());
      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener("resize", init);
    init();
    animate();

    return () => {
      window.removeEventListener("resize", init);
      cancelAnimationFrame(animationFrameId);
    };
  }, [mode]);

  return (
    <canvas
      ref={canvasRef}
      className=""
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        background: mode === "dark" ? "#0a0a0c" : "#ffffff",
      }}
    />
  );
};

export default GridAnimation;