"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

interface PortraitRevealProps {
    src: string;
    theme: "neural" | "space";
}

export default function PortraitReveal({ src, theme }: PortraitRevealProps) {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    // Generate random stars for the Space theme
    const stars = Array.from({ length: 40 }).map((_, i) => ({
        id: i,
        size: Math.random() * 3 + 1,
        x: Math.random() * 100 - 50,
        y: Math.random() * 100 - 50,
        duration: Math.random() * 2 + 1,
        delay: Math.random() * 1,
    }));

    if (!isMounted) return null;

    return (
        <div className="relative group shrink-0 order-1 lg:order-2">
            {/* Outer Glow - Changes based on theme */}
            <motion.div
                key={`glow-${theme}`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 0.4, scale: 1 }}
                transition={{ duration: 1.5 }}
                className={`absolute -inset-6 rounded-full blur-[40px] animate-pulse ${theme === "neural"
                        ? "bg-indigo-500/30"
                        : "bg-purple-600/30 shadow-[0_0_50px_rgba(168,85,247,0.4)]"
                    }`}
            />

            <div className="relative w-52 h-52 md:w-64 md:h-64 lg:w-[21rem] lg:h-[21rem] rounded-full overflow-hidden border-2 border-white/10 shadow-[0_10px_60px_rgba(0,0,0,0.5)] bg-black/40 backdrop-blur-xl">
                <AnimatePresence mode="wait">
                    {theme === "neural" ? (
                        <motion.div
                            key="neural-reveal"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none"
                        >
                            {/* Neural Network Connection Lines */}
                            <svg className="absolute inset-0 w-full h-full opacity-40" viewBox="0 0 100 100">
                                <motion.path
                                    d="M20,50 Q40,20 80,50 T20,80"
                                    fill="none"
                                    stroke="rgba(99, 102, 241, 0.4)"
                                    strokeWidth="0.5"
                                    initial={{ pathLength: 0 }}
                                    animate={{ pathLength: 1 }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                />
                                <motion.path
                                    d="M10,30 Q50,50 90,30"
                                    fill="none"
                                    stroke="rgba(99, 102, 241, 0.3)"
                                    strokeWidth="0.5"
                                    initial={{ pathLength: 0 }}
                                    animate={{ pathLength: 1 }}
                                    transition={{ duration: 3, delay: 0.5, repeat: Infinity }}
                                />
                            </svg>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="space-reveal"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 z-20 overflow-hidden pointer-events-none"
                        >
                            {/* Twinkling Stars converging */}
                            {stars.map((star) => (
                                <motion.div
                                    key={star.id}
                                    className="absolute left-1/2 top-1/2 bg-white rounded-full blur-[1px]"
                                    style={{
                                        width: star.size,
                                        height: star.size,
                                    }}
                                    initial={{
                                        x: star.x * 5,
                                        y: star.y * 5,
                                        opacity: 0,
                                    }}
                                    animate={{
                                        x: 0,
                                        y: 0,
                                        opacity: [0, 0.8, 0],
                                    }}
                                    transition={{
                                        duration: star.duration,
                                        delay: star.delay,
                                        repeat: Infinity,
                                    }}
                                />
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* The Actual Photo with reveal effect */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={`photo-${theme}`}
                        initial={{ opacity: 0, scale: 1.1, filter: "blur(20px)" }}
                        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                        transition={{
                            duration: 1.2,
                            ease: "easeOut",
                            delay: 0.3
                        }}
                        className="w-full h-full relative"
                    >
                        {/* Background for photo transition */}
                        <div className={`absolute inset-0 ${theme === "neural" ? "bg-indigo-500/10" : "bg-purple-900/10"}`} />

                        <img
                            src={src}
                            alt="Portrait"
                            className="w-full h-full object-cover object-top relative z-10 transition-transform duration-1000 group-hover:scale-105"
                        />

                        {/* Scanning/Formation overlay */}
                        <motion.div
                            initial={{ top: "-100%" }}
                            animate={{ top: "100%" }}
                            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                            className={`absolute left-0 w-full h-20 z-20 opacity-30 blur-xl ${theme === "neural" ? "bg-indigo-400" : "bg-white"
                                }`}
                        />
                    </motion.div>
                </AnimatePresence>

                {/* Cinematic Vignette */}
                <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_40px_rgba(0,0,0,0.6)] z-30" />
            </div>

            {/* Theme Decorative Ornaments */}
            {theme === "space" && (
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute -inset-10 border border-white/5 rounded-full z-0"
                >
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_10px_white]" />
                </motion.div>
            )}
        </div>
    );
}
