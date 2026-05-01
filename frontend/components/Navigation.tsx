"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import {
    User,
    Cpu,
    GraduationCap,
    Rocket,
    Terminal as TerminalIcon
} from "lucide-react";

interface NavItem {
    id: string;
    label: string;
    icon: any;
    href: string;
}

export default function Navigation({ onTerminalClick }: { onTerminalClick: () => void }) {
    const [activeSegment, setActiveSegment] = useState("origin");
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Show nav after a small delay
        const timer = setTimeout(() => setIsVisible(true), 1500);

        const handleScroll = () => {
            const sections = ["origin", "intelligence", "credentials", "ventures"];
            const current = sections.find(section => {
                const el = document.getElementById(section);
                if (el) {
                    const rect = el.getBoundingClientRect();
                    return rect.top <= 200 && rect.bottom >= 200;
                }
                return false;
            });
            if (current) setActiveSegment(current);
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
            clearTimeout(timer);
        };
    }, []);

    const navItems: NavItem[] = [
        { id: "origin", label: "Overview", icon: User, href: "#origin" },
        { id: "intelligence", label: "Skillset", icon: Cpu, href: "#intelligence" },
        { id: "credentials", label: "Coursework", icon: GraduationCap, href: "#credentials" },
        { id: "ventures", label: "Ventures", icon: Rocket, href: "#ventures" },
    ];

    return (
        <motion.div
            initial={{ y: -100, x: "-50%", opacity: 0 }}
            animate={{
                y: isVisible ? 24 : -100,
                x: "-50%",
                opacity: isVisible ? 1 : 0
            }}
            transition={{ type: "spring", damping: 30, stiffness: 200 }}
            className="fixed top-0 left-1/2 z-[500] pointer-events-auto"
        >
            <div className="bg-slate-900/40 backdrop-blur-2xl px-1.5 sm:px-2 py-1.5 sm:py-2 rounded-full border border-white/20 shadow-[0_25px_80px_rgba(0,0,0,0.5)] flex items-center gap-1 sm:gap-1.5 ring-1 ring-white/10">
                {navItems.map((item) => (
                    <a
                        key={item.id}
                        href={item.href}
                        onClick={(e) => {
                            if (item.href.startsWith("#")) {
                                e.preventDefault();
                                document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth" });
                            }
                        }}
                        className="relative group px-1 sm:px-1.5 py-1 sm:py-1.5 rounded-full transition-all duration-500"
                    >
                        {activeSegment === item.id && (
                            <motion.div
                                layoutId="nav-active-bg"
                                className="absolute inset-0 bg-indigo-500/10 border border-indigo-500/30 rounded-full shadow-[inset_0_0_20px_rgba(99,102,241,0.1)]"
                                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                            />
                        )}

                        <div className="relative flex flex-col items-center">
                            <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full overflow-hidden border-2 flex items-center justify-center transition-all duration-500 ease-out ${activeSegment === item.id
                                ? "border-indigo-400/80 scale-110 shadow-[0_0_25px_rgba(99,102,241,0.4)] bg-indigo-500/10"
                                : "border-white/5 group-hover:border-white/20 bg-white/5 group-hover:bg-white/10"
                                }`}>
                                {item.id === "origin" ? (
                                    <img src="/karan_image.png" alt="Origin" className={`w-full h-full object-cover object-top transition-all duration-700 ${activeSegment === item.id ? 'scale-110' : 'grayscale group-hover:grayscale-0'}`} />
                                ) : item.id === "intelligence" ? (
                                    <img src="/skillset-logo.png" alt="Skillset" className={`w-full h-full object-contain p-1.5 sm:p-2 transition-all duration-700 ${activeSegment === item.id ? 'scale-110' : 'grayscale group-hover:grayscale-0'}`} />
                                ) : item.id === "credentials" ? (
                                    <img src="/coursework-logo.jpeg" alt="Coursework" className={`w-full h-full object-contain p-1.5 sm:p-2 transition-all duration-700 ${activeSegment === item.id ? 'scale-110' : 'grayscale group-hover:grayscale-0'}`} />
                                ) : item.id === "ventures" ? (
                                    <img src="/projects-logo.jpg" alt="Ventures" className={`w-full h-full object-contain p-1.5 sm:p-2 transition-all duration-700 ${activeSegment === item.id ? 'scale-110' : 'grayscale group-hover:grayscale-0'}`} />
                                ) : (
                                    <item.icon
                                        size={16}
                                        className={`transition-colors duration-500 ${activeSegment === item.id ? "text-indigo-400" : "text-white/30 group-hover:text-white"
                                            }`}
                                    />
                                )}
                            </div>

                            {/* Enhanced Tooltip */}
                            <div className="absolute top-full mt-5 px-4 py-2 bg-slate-900/80 backdrop-blur-xl rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] text-indigo-400 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0 whitespace-nowrap pointer-events-none border border-white/10 shadow-2xl">
                                {item.label}
                                <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-900 rotate-45 border-l border-t border-white/10" />
                            </div>
                        </div>
                    </a>
                ))}

                {/* Vertical Separator */}
                <div className="w-[1px] h-8 bg-white/10 mx-1" />

                {/* Terminal Button: High-Tech Interaction */}
                <button
                    onClick={onTerminalClick}
                    className="relative group w-10 h-10 rounded-full bg-indigo-600 hover:bg-indigo-500 transition-all duration-500 shadow-[0_10px_30px_rgba(99,102,241,0.4)] flex items-center justify-center shrink-0 active:scale-90"
                >
                    <div className="relative flex flex-col items-center">
                        <TerminalIcon size={18} className="text-white group-hover:rotate-12 transition-transform duration-500" />
                        <div className="absolute top-full mt-7 px-4 py-2 bg-indigo-600/90 backdrop-blur-xl rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] text-white opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0 whitespace-nowrap pointer-events-none border border-white/20 shadow-2xl">
                            Karan's Twin 🤖
                            <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-indigo-600 rotate-45" />
                        </div>
                    </div>
                </button>
            </div>
        </motion.div>
    );
}
