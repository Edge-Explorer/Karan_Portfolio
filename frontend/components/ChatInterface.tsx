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
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[200] bg-background/95 backdrop-blur-3xl flex flex-col"
                >
                    {/* Header */}
                    <div className="p-6 md:p-10 flex justify-between items-center border-b border-white/5 bg-background/50">
                        <div className="flex items-center gap-5">
                            <div className="p-3 bg-indigo-500 rounded-2xl glow-indigo text-white animate-pulse">
                                <Cpu size={24} />
                            </div>
                            <div>
                                <h2 className="text-2xl font-black tracking-tighter uppercase italic">KRS-Neural-Link</h2>
                                <p className="text-[10px] font-mono text-indigo-400 uppercase tracking-widest">Active Multi-Agent Gateway v4.0</p>
                            </div>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-4 hover:bg-white/5 rounded-full text-white/40 hover:text-white transition-all"
                        >
                            <X size={32} />
                        </button>
                    </div>

                    {/* Messages Area */}
                    <div ref={scrollRef} className="flex-1 overflow-y-auto px-6 md:px-24 space-y-12 py-10 scroll-smooth">
                        {messages.length === 0 && (
                            <div className="h-full flex flex-col items-center justify-center text-center space-y-10">
                                <div className="relative">
                                    <div className="absolute -inset-10 bg-indigo-500/20 blur-[60px] rounded-full animate-pulse" />
                                    <div className="relative w-24 h-24 bg-white/5 rounded-full flex items-center justify-center text-indigo-400 border border-white/10">
                                        <Sparkles size={48} />
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <h3 className="text-4xl font-black tracking-tighter">Initializing Neural Interface...</h3>
                                    <p className="text-white/40 max-w-lg mx-auto font-medium">I am Karan&apos;s digital proxy. Access his technical DNA, project architectures, and professional roadmap below.</p>
                                </div>
                                <div className="flex flex-wrap justify-center gap-3 max-w-2xl px-4">
                                    {starterChips.map((chip) => (
                                        <button
                                            key={chip}
                                            onClick={() => handleSubmit(undefined, chip)}
                                            className="px-6 py-3 bg-white/5 hover:bg-indigo-500/10 border border-white/10 hover:border-indigo-500/40 rounded-2xl text-xs font-bold text-white/50 hover:text-white transition-all active:scale-95"
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
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className={`flex gap-6 ${m.role === "user" ? "flex-row-reverse" : ""}`}
                            >
                                <div className={`p-4 rounded-3xl h-fit border ${m.role === "user" ? "bg-purple-500 border-purple-400/50 shadow-2xl" : "bg-white/5 border-white/10 shadow-lg"}`}>
                                    {m.role === "user" ? <User size={20} className="text-white" /> : <Bot size={20} className="text-indigo-400" />}
                                </div>
                                <div className={`max-w-[75%] p-8 rounded-[2.5rem] shadow-2xl ${m.role === "user"
                                    ? "bg-white/5 border border-white/10"
                                    : "bg-indigo-500/5 border border-indigo-500/20 text-white/90"
                                    }`}>
                                    <p className="text-lg leading-relaxed whitespace-pre-wrap font-medium">{m.content}</p>
                                </div>
                            </motion.div>
                        ))}

                        {isLoading && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-6">
                                <div className="p-4 rounded-3xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 animate-spin">
                                    <Loader2 size={20} />
                                </div>
                                <div className="max-w-[70%] p-8 rounded-[2.5rem] bg-indigo-500/5 border border-indigo-500/10 italic text-indigo-400/60 font-mono text-sm tracking-widest">
                                    Conducting neural scan...
                                </div>
                            </motion.div>
                        )}
                    </div>

                    {/* Input Area */}
                    <div className="p-10 md:px-24 border-t border-white/5 bg-background">
                        <form onSubmit={handleSubmit} className="relative max-w-5xl mx-auto group">
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-[2rem] opacity-10 group-focus-within:opacity-40 blur transition duration-500" />
                            <input
                                autoFocus
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Query the neural network..."
                                className="relative w-full bg-background border border-white/10 rounded-[2rem] px-10 py-7 text-xl focus:border-indigo-500/50 outline-none transition-all shadow-2xl"
                            />
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="absolute right-4 top-1/2 -translate-y-1/2 p-5 bg-indigo-500 hover:bg-indigo-400 text-white rounded-2xl transition-all shadow-2xl active:scale-90 disabled:opacity-50"
                            >
                                <Send size={24} />
                            </button>
                        </form>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
