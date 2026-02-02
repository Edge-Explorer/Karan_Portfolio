"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";

interface ScrambleTextProps {
    text: string;
    className?: string;
    delay?: number;
}

const chars = "!@#$%^&*()_+~`{}|:<>?0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";

export default function ScrambleText({ text, className, delay = 0 }: ScrambleTextProps) {
    const [displayText, setDisplayText] = useState(text);
    const [isScrambling, setIsScrambling] = useState(false);

    const scramble = useCallback(() => {
        let iteration = 0;
        const interval = setInterval(() => {
            setDisplayText((prev) =>
                text
                    .split("")
                    .map((char, index) => {
                        if (index < iteration) {
                            return text[index];
                        }
                        return chars[Math.floor(Math.random() * chars.length)];
                    })
                    .join("")
            );

            if (iteration >= text.length) {
                clearInterval(interval);
                setIsScrambling(false);
            }

            iteration += 1 / 3;
        }, 30);

        return () => clearInterval(interval);
    }, [text]);

    return (
        <motion.span
            onViewportEnter={() => {
                if (!isScrambling) {
                    setIsScrambling(true);
                    setTimeout(scramble, delay * 1000);
                }
            }}
            className={className}
        >
            {displayText}
        </motion.span>
    );
}
