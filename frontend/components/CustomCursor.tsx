"use client";

import { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";

export default function CustomCursor() {
    const [isPointer, setIsPointer] = useState(false);
    const [isHidden, setIsHidden] = useState(true);

    const mouseX = useSpring(0, { damping: 30, stiffness: 200 });
    const mouseY = useSpring(0, { damping: 30, stiffness: 200 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
            setIsHidden(false);

            const target = e.target as HTMLElement;
            setIsPointer(
                window.getComputedStyle(target).cursor === "pointer" ||
                target.tagName === "BUTTON" ||
                target.tagName === "A"
            );
        };

        const handleMouseLeave = () => setIsHidden(true);
        const handleMouseEnter = () => setIsHidden(false);

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseleave", handleMouseLeave);
        window.addEventListener("mouseenter", handleMouseEnter);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseleave", handleMouseLeave);
            window.removeEventListener("mouseenter", handleMouseEnter);
        };
    }, [mouseX, mouseY]);

    return (
        <>
            {/* Outer Ring */}
            <motion.div
                className="fixed top-0 left-0 w-8 h-8 rounded-full border border-indigo-500/50 pointer-events-none z-[9999] mix-blend-difference hidden md:block"
                style={{
                    x: mouseX,
                    y: mouseY,
                    translateX: "-50%",
                    translateY: "-50%",
                }}
                animate={{
                    scale: isHidden ? 0 : isPointer ? 2.5 : 1,
                    opacity: isHidden ? 0 : 1,
                    borderWidth: isPointer ? "1px" : "1.5px",
                }}
            />
            {/* Inner Dot */}
            <motion.div
                className="fixed top-0 left-0 w-1.5 h-1.5 bg-indigo-500 rounded-full pointer-events-none z-[9999] mix-blend-difference hidden md:block"
                style={{
                    x: mouseX,
                    y: mouseY,
                    translateX: "-50%",
                    translateY: "-50%",
                }}
                animate={{
                    scale: isHidden ? 0 : isPointer ? 0 : 1,
                    opacity: isHidden ? 0 : 0.8,
                }}
            />

            {/* Background Glow (Flashlight Effect) */}
            <motion.div
                className="fixed top-0 left-0 w-[600px] h-[600px] rounded-full pointer-events-none z-[2] opacity-20 hidden md:block blur-[100px]"
                style={{
                    x: mouseX,
                    y: mouseY,
                    translateX: "-50%",
                    translateY: "-50%",
                    background: "radial-gradient(circle, rgba(99, 102, 241, 0.4) 0%, transparent 70%)"
                }}
            />
        </>
    );
}
