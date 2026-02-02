"use client";

import { motion } from "framer-motion";

interface NeuralRevealProps {
    text: string;
    className?: string;
    delay?: number;
    trigger?: "mount" | "view";
}

export default function NeuralReveal({ text, className, delay = 0, trigger = "view" }: NeuralRevealProps) {
    const words = text.split(" ");

    const animationProps = trigger === "mount"
        ? { animate: { opacity: 1, filter: "blur(0px)", y: 0, scale: 1 } }
        : { whileInView: { opacity: 1, filter: "blur(0px)", y: 0, scale: 1 } };

    return (
        <div className={`inline-block ${className}`}>
            {words.map((word, wordIdx) => (
                <span key={wordIdx} className="inline-block whitespace-nowrap">
                    {word.split("").map((char, charIdx) => (
                        <motion.span
                            key={charIdx}
                            initial={{ opacity: 0, filter: "blur(12px)", y: 10, scale: 1.2 }}
                            {...animationProps}
                            viewport={{ once: false, amount: 0.3 }}
                            transition={{
                                duration: 0.8,
                                delay: delay + (wordIdx * 0.1) + (charIdx * 0.03),
                                ease: [0.2, 0.65, 0.3, 0.9],
                            }}
                            className="inline-block origin-bottom"
                        >
                            {char}
                        </motion.span>
                    ))}
                    {/* Add space between words */}
                    {wordIdx < words.length - 1 && (
                        <span className="inline-block">&nbsp;</span>
                    )}
                </span>
            ))}
        </div>
    );
}
