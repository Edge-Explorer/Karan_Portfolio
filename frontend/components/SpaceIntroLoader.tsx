"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ASCIIText from "@/components/ASCIIText";

export default function SpaceIntroLoader({ onComplete }: { onComplete?: () => void }) {
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Starfield Canvas Animation
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    // Generate stars
    const starCount = Math.min(180, Math.floor((width * height) / 6000));
    const stars: Array<{
      x: number;
      y: number;
      radius: number;
      baseAlpha: number;
      alpha: number;
      speed: number;
      twinkleSpeed: number;
      phase: number;
    }> = [];

    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.5 + 0.5,
        baseAlpha: Math.random() * 0.7 + 0.3,
        alpha: Math.random() * 0.7 + 0.3,
        speed: Math.random() * 0.2 + 0.05,
        twinkleSpeed: Math.random() * 0.03 + 0.01,
        phase: Math.random() * Math.PI * 2,
      });
    }

    // Shooting stars
    const shootingStars: Array<{
      x: number;
      y: number;
      length: number;
      speed: number;
      angle: number;
      opacity: number;
      active: boolean;
    }> = [];

    const createShootingStar = () => {
      if (Math.random() < 0.03 && shootingStars.length < 2) {
        shootingStars.push({
          x: Math.random() * width * 0.8,
          y: Math.random() * height * 0.4,
          length: Math.random() * 80 + 50,
          speed: Math.random() * 8 + 6,
          angle: Math.PI / 4 + (Math.random() - 0.5) * 0.2,
          opacity: 1,
          active: true,
        });
      }
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Render stars
      stars.forEach((star) => {
        star.phase += star.twinkleSpeed;
        star.alpha = star.baseAlpha + Math.sin(star.phase) * 0.3;
        star.y -= star.speed;
        if (star.y < 0) {
          star.y = height;
          star.x = Math.random() * width;
        }

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${Math.max(0, Math.min(1, star.alpha))})`;
        ctx.shadowBlur = star.radius > 1.2 ? 6 : 0;
        ctx.shadowColor = "rgba(165, 180, 252, 0.8)";
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // Render shooting stars
      createShootingStar();
      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const s = shootingStars[i];
        if (!s.active) {
          shootingStars.splice(i, 1);
          continue;
        }

        s.x += Math.cos(s.angle) * s.speed;
        s.y += Math.sin(s.angle) * s.speed;
        s.opacity -= 0.02;

        if (s.opacity <= 0 || s.x > width || s.y > height) {
          s.active = false;
        } else {
          ctx.beginPath();
          const grad = ctx.createLinearGradient(
            s.x,
            s.y,
            s.x - Math.cos(s.angle) * s.length,
            s.y - Math.sin(s.angle) * s.length
          );
          grad.addColorStop(0, `rgba(255, 255, 255, ${s.opacity})`);
          grad.addColorStop(0.4, `rgba(165, 180, 252, ${s.opacity * 0.6})`);
          grad.addColorStop(1, "rgba(99, 102, 241, 0)");

          ctx.strokeStyle = grad;
          ctx.lineWidth = 1.5;
          ctx.moveTo(s.x, s.y);
          ctx.lineTo(
            s.x - Math.cos(s.angle) * s.length,
            s.y - Math.sin(s.angle) * s.length
          );
          ctx.stroke();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Loading progress & exit timer
  useEffect(() => {
    const startTime = Date.now();
    const duration = 4200; // 4.2 seconds cinematic loading sequence

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(100, Math.floor((elapsed / duration) * 100));
      setProgress(pct);

      if (elapsed >= duration) {
        clearInterval(interval);
        setTimeout(() => {
          setIsVisible(false);
          if (onComplete) onComplete();
        }, 300);
      }
    }, 20);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.06,
            filter: "blur(16px)",
            transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] }
          }}
          className="fixed inset-0 z-[99999] bg-[#020617] flex flex-col items-center justify-center overflow-hidden select-none cursor-default"
        >
          {/* Starfield Canvas */}
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full pointer-events-none z-0"
          />

          {/* Ambient Cosmic Nebula Spotlights */}
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-600/15 blur-[140px] rounded-full pointer-events-none z-0" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] bg-purple-600/15 blur-[120px] rounded-full pointer-events-none z-0" />

          {/* Main Content Box */}
          <div className="relative z-10 flex flex-col items-center text-center px-6 space-y-5 max-w-4xl w-full">
            {/* 3D ASCII Wave Shader Name Reveal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full h-44 sm:h-56 md:h-64 flex items-center justify-center pointer-events-auto"
            >
              <ASCIIText
                text="Karan Shelar"
                enableWaves={true}
                asciiFontSize={7}
                textFontSize={170}
                textColor="#fdf9f3"
                planeBaseHeight={8}
              />
            </motion.div>

            {/* Subtitle / Role Tag with Premium Typography */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-xs sm:text-sm md:text-base font-extrabold tracking-[0.35em] uppercase text-transparent bg-clip-text bg-gradient-to-r from-slate-200 via-indigo-200 to-purple-300 drop-shadow-[0_0_15px_rgba(99,102,241,0.3)] max-w-xl font-sans"
            >
              AI Engineer & Full-Stack Architect
            </motion.p>

            {/* Futuristic Progress Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.7 }}
              className="w-64 sm:w-80 pt-4 flex flex-col items-center gap-3"
            >
              {/* Glass Capsule Track */}
              <div className="w-full h-2 rounded-full p-[2px] bg-white/[0.05] border border-white/10 shadow-inner backdrop-blur-xl relative overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-indigo-500 to-purple-500 shadow-[0_0_16px_rgba(99,102,241,0.9)] transition-all duration-100 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>

              {/* Progress Text */}
              <div className="w-full flex justify-between items-center text-[10px] sm:text-xs font-mono text-white/50 tracking-[0.2em] font-semibold uppercase">
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_6px_#22d3ee]" />
                  INITIALIZING
                </span>
                <span className="text-indigo-300 font-bold">{progress}%</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
