"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import {
    User,
    Cpu,
    GraduationCap,
    Rocket,
    Activity,
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
        { id: "origin", label: "Origin", icon: User, href: "#origin" },
        { id: "intelligence", label: "Intelligence", icon: Cpu, href: "#intelligence" },
        { id: "credentials", label: "Credentials", icon: GraduationCap, href: "#credentials" },
        { id: "ventures", label: "Ventures", icon: Rocket, href: "#ventures" },
        { id: "pulse", label: "Neural Pulse", icon: Activity, href: "#origin" },
    ];

    return (
        <motion.div
            initial={{ y: -100, x: "-50%", opacity: 0 }}
            animate={{
                y: isVisible ? 24 : -100,
                x: "-50%",
                opacity: isVisible ? 1 : 0
            }}
            className="fixed top-0 left-1/2 z-[500] pointer-events-auto"
        >
            <div className="glass px-2 py-2 rounded-full border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.3)] backdrop-blur-3xl flex items-center gap-1">
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
                        className="relative group p-3 rounded-full transition-all duration-300"
                    >
                        {activeSegment === item.id && (
                            <motion.div
                                layoutId="active-pill"
                                className="absolute inset-0 bg-indigo-500/20 border border-indigo-500/50 rounded-full"
                                transition={{ type: "spring", bounce: 0.3, duration: 0.6 }}
                            />
                        )}

                        <div className="relative flex flex-col items-center">
                            {item.id === "origin" ? (
                                <div className={`w-6 h-6 rounded-full overflow-hidden border-2 transition-all duration-300 ${activeSegment === item.id ? "border-indigo-400 scale-125" : "border-white/20 group-hover:border-white"
                                    }`}>
                                    <img src="/karan_image.png" alt="Origin" className="w-full h-full object-cover object-top" />
                                </div>
                            ) : (
                                <item.icon
                                    size={20}
                                    className={`transition-colors duration-300 ${activeSegment === item.id ? "text-indigo-400 scale-110" : "text-white/40 group-hover:text-white"
                                        }`}
                                />
                            )}

                            {/* Tooltip */}
                            <div className="absolute top-full mt-4 px-3 py-1.5 glass rounded-xl text-[10px] font-black uppercase tracking-widest text-white opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 whitespace-nowrap pointer-events-none border border-white/5">
                                {item.label}
                            </div>
                        </div>
                    </a>
                ))}

                {/* Separator */}
                <div className="w-[1px] h-6 bg-white/10 mx-2" />

                {/* Terminal Button */}
                <button
                    onClick={onTerminalClick}
                    className="relative group p-3 rounded-full bg-indigo-500 hover:bg-indigo-400 transition-all duration-300 shadow-[0_0_20px_rgba(99,102,241,0.4)]"
                >
                    <div className="relative flex flex-col items-center">
                        <TerminalIcon size={20} className="text-white" />
                        <div className="absolute top-full mt-4 px-3 py-1.5 glass rounded-xl text-[10px] font-black uppercase tracking-widest text-indigo-400 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 whitespace-nowrap pointer-events-none border border-indigo-500/20">
                            Karan's Twin
                        </div>
                    </div>
                </button>
            </div>
        </motion.div>
    );
}
