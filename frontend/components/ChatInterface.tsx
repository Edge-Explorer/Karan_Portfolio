"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, User, Bot, Loader2, X, Sparkles, Zap, Cpu } from "lucide-react";

export default function ChatInterface({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
    const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    const starterChips = [
        "Tell me about NEEL's Multi-Agent architecture.",
        "What's his experience with LangGraph?",
        "Explain his transition from IT to GenAI.",
        "What did he build for LifeAlly?"
    ];

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isLoading]);

    const handleSubmit = async (e?: React.FormEvent, customMessage?: string) => {
        if (e) e.preventDefault();
        const userMessage = customMessage || input.trim();
        if (!userMessage || isLoading) return;

        setInput("");
        setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
        setIsLoading(true);

        try {
            const response = await fetch("http://localhost:8000/api/chat/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: userMessage, history: messages }),
            });
            const data = await response.json();
            setMessages((prev) => [...prev, { role: "ai", content: data.response }]);
        } catch (error) {
            setMessages((prev) => [
                ...prev,
                { role: "ai", content: "Sync interrupted. Please ensure the neural gateway is active." },
            ]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                    className="fixed bottom-32 right-4 md:right-10 z-[200] w-[calc(100vw-2rem)] md:w-[400px] h-fit max-h-[75vh] md:h-[580px] bg-background/90 backdrop-blur-3xl rounded-[2.5rem] border border-black/5 shadow-[0_20px_80px_rgba(0,0,0,0.1)] flex flex-col overflow-hidden text-foreground"
                >
                    {/* Header: Humanized Branding */}
                    <div className="p-4 md:p-5 flex justify-between items-center border-b border-white/5 bg-white/5">
                        <div className="flex items-center gap-4">
                            <div className="relative">
                                <div className="w-12 h-12 rounded-2xl overflow-hidden border-2 border-indigo-500/50 shadow-lg shadow-indigo-500/20">
                                    <img src="/karan_image.png" alt="Karan" className="w-full h-full object-cover object-top" />
                                </div>
                                <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-green-500 border-2 border-background rounded-full" />
                            </div>
                            <div>
                                <h2 className="text-base md:text-lg font-black tracking-tighter uppercase italic leading-none text-slate-900">Karan&apos;s AI Assistant</h2>
                                <p className="text-[9px] font-bold text-indigo-600 uppercase tracking-widest mt-1.5 line-clamp-1">Self-Learning Digital Twin</p>
                            </div>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-white/10 rounded-full text-white/40 hover:text-white transition-all"
                        >
                            <X size={22} />
                        </button>
                    </div>

                    {/* Messages Area: Humanized Flow */}
                    <div ref={scrollRef} className="flex-1 overflow-y-auto px-5 py-6 space-y-8 scroll-smooth scrollbar-hide">
                        {messages.length === 0 && (
                            <div className="h-full flex flex-col items-center justify-center text-center space-y-6 px-4">
                                <div className="relative">
                                    <div className="absolute -inset-6 bg-indigo-500/10 blur-[40px] rounded-full animate-pulse" />
                                    <div className="relative w-16 h-16 bg-white/5 rounded-full flex items-center justify-center text-indigo-400 border border-white/10 shadow-inner">
                                        <Sparkles size={32} />
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <h3 className="text-2xl font-black tracking-tighter text-slate-900">Hey! I&apos;m Karan&apos;s AI Twin.</h3>
                                    <p className="text-xs text-slate-500 font-medium leading-relaxed">
                                        I&apos;m here to dive into my projects, engineering logic, and my journey into GenAI with you.
                                        What&apos;s on your mind?
                                    </p>
                                </div>
                                <div className="flex flex-wrap justify-center gap-2 pb-4">
                                    {starterChips.map((chip) => (
                                        <button
                                            key={chip}
                                            onClick={() => handleSubmit(undefined, chip)}
                                            className="px-4 py-2 bg-white/5 hover:bg-indigo-500/10 border border-white/5 hover:border-indigo-500/40 rounded-xl text-[10px] font-bold text-white/60 hover:text-white transition-all active:scale-95 shadow-sm"
                                        >
                                            {chip}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {messages.map((m, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: m.role === "user" ? 10 : -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                className={`flex gap-3 ${m.role === "user" ? "flex-row-reverse" : ""}`}
                            >
                                <div className={`p-2.5 rounded-2xl h-fit border ${m.role === "user" ? "bg-purple-500 border-purple-400/50" : "bg-white/5 border-white/10"}`}>
                                    {m.role === "user" ? <User size={16} className="text-slate-900" /> : <Bot size={16} className="text-indigo-400" />}
                                </div>
                                <div
                                    className={`px-6 py-4 rounded-[2rem] text-sm font-medium leading-relaxed shadow-sm transition-all ${m.role === "user"
                                        ? "bg-indigo-600 text-white rounded-br-none"
                                        : "bg-slate-100 text-slate-800 rounded-bl-none border border-slate-200"
                                        }`}
                                >
                                    {m.content}
                                </div>
                            </motion.div>
                        ))}

                        {isLoading && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-3">
                                <div className="p-2.5 rounded-2xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 animate-spin">
                                    <Loader2 size={16} />
                                </div>
                                <div className="bg-indigo-500/5 border border-indigo-500/10 px-5 py-4 rounded-3xl italic text-indigo-400/60 font-mono text-[10px] tracking-widest">
                                    Scanning...
                                </div>
                            </motion.div>
                        )}
                    </div>

                    {/* Input Area: Re-engineered Flow */}
                    <div className="p-6 bg-background/50 border-t border-white/5">
                        <form onSubmit={handleSubmit} className="relative group">
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl opacity-10 group-focus-within:opacity-40 blur transition duration-500" />
                            <input
                                autoFocus
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Query neural network..."
                                className="relative w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm focus:border-indigo-500/50 outline-none transition-all pr-16"
                            />
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="absolute right-2 top-1/2 -translate-y-1/2 p-2.5 bg-indigo-500 hover:bg-indigo-400 text-white rounded-xl transition-all shadow-lg active:scale-90 disabled:opacity-50"
                            >
                                <Send size={18} />
                            </button>
                        </form>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
