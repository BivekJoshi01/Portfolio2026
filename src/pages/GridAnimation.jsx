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
      const particleCount = 25; // Increase count for a fuller look
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
        this.speed = 2.5; // Faster looks smoother for tails
        this.dir = Math.floor(Math.random() * 4);
        this.color = Math.random() > 0.5 ? "#c491f7" : "#b0b3fc";
        this.life = 0;
        this.maxLife = Math.random() * 300 + 150;
      }

      draw() {
        ctx.beginPath();
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 1; // Thicker lines
        ctx.lineCap = "round";

        // Add a slight glow to the "head" of the tail
        ctx.shadowBlur = 1;
        ctx.shadowColor = this.color;

        const oldX = this.x;
        const oldY = this.y;

        // Move
        if (this.dir === 0) this.y -= this.speed;
        else if (this.dir === 1) this.x += this.speed;
        else if (this.dir === 2) this.y += this.speed;
        else if (this.dir === 3) this.x -= this.speed;

        ctx.moveTo(oldX, oldY);
        ctx.lineTo(this.x, this.y);
        ctx.stroke();

        // Reset Shadow so it doesn't lag the browser
        ctx.shadowBlur = 0;

        // Intersection Logic
        if (
          Math.abs(this.x % gridSize) < 1 &&
          Math.abs(this.y % gridSize) < 1
        ) {
          this.x = Math.round(this.x / gridSize) * gridSize;
          this.y = Math.round(this.y / gridSize) * gridSize;
          if (Math.random() > 0.6) this.dir = Math.floor(Math.random() * 4);
        }

        this.life++;
        if (
          this.life > this.maxLife ||
          this.x < 0 ||
          this.x > width ||
          this.y < 0 ||
          this.y > height
        ) {
          this.reset();
        }
      }
    }

    const animate = () => {
      // THE SECRET TO LONG TAILS:
      // Decrease the alpha (0.05). Lower = Longer tails.
      const fadeColor =
        mode === "dark"
          ? "rgba(10, 10, 12, 0.03)"
          : "rgba(255, 255, 255, 0.05)";
      ctx.fillStyle = fadeColor;
      ctx.fillRect(0, 0, width, height);

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
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
      }}
    />
  );
};

export default GridAnimation;
