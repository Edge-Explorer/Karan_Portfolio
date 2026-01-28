"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, User, Bot, Loader2, X, Sparkles, Zap } from "lucide-react";

export default function ChatInterface({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
    const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isLoading]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMessage = input.trim();
        setInput("");
        setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
        setIsLoading(true);

        try {
            const response = await fetch("http://localhost:8000/api/chat/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: userMessage, history: [] }),
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
                    className="fixed inset-0 z-[200] bg-background/95 backdrop-blur-2xl flex flex-col"
                >
                    {/* Header */}
                    <div className="p-6 md:p-10 flex justify-between items-center bg-gradient-to-b from-background to-transparent">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-indigo-500 rounded-2xl glow-indigo text-white">
                                <Zap size={24} />
                            </div>
                            <div>
                                <h2 className="text-2xl font-black tracking-tight uppercase">Neural Interface</h2>
                                <p className="text-xs font-mono text-indigo-400">Connected to Generator v2.0</p>
                            </div>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-4 hover:bg-white/5 rounded-full text-white/40 transition-colors"
                        >
                            <X size={32} />
                        </button>
                    </div>

                    {/* Messages Area */}
                    <div ref={scrollRef} className="flex-1 overflow-y-auto px-6 md:px-24 space-y-12 py-10">
                        {messages.length === 0 && (
                            <div className="h-full flex flex-col items-center justify-center text-center space-y-6">
                                <div className="w-24 h-24 bg-indigo-500/10 rounded-full flex items-center justify-center text-indigo-400 animate-pulse">
                                    <Sparkles size={48} />
                                </div>
                                <div className="space-y-2">
                                    <h3 className="text-3xl font-bold">How can I assist you today?</h3>
                                    <p className="text-white/40 max-w-md mx-auto">Ask me about Karan&apos;s GenAI projects, technical stack, or professional journey.</p>
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
                                <div className={`p-3 rounded-2xl h-fit ${m.role === "user" ? "bg-purple-500 shadow-purple-500/20" : "bg-indigo-500 shadow-indigo-500/20 shadow-lg"}`}>
                                    {m.role === "user" ? <User size={20} /> : <Bot size={20} />}
                                </div>
                                <div className={`max-w-[70%] p-6 rounded-3xl ${m.role === "user"
                                        ? "bg-white/5 border border-white/10"
                                        : "bg-indigo-500/10 border border-indigo-500/20 text-indigo-50 shadow-inner"
                                    }`}>
                                    <p className="text-lg leading-relaxed whitespace-pre-wrap">{m.content}</p>
                                </div>
                            </motion.div>
                        ))}

                        {isLoading && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-6">
                                <div className="p-3 rounded-2xl bg-indigo-500/20 text-indigo-400 animate-spin">
                                    <Loader2 size={20} />
                                </div>
                                <div className="max-w-[70%] p-6 rounded-3xl bg-white/5 border border-white/10 italic text-white/40">
                                    Processing sequence...
                                </div>
                            </motion.div>
                        )}
                    </div>

                    {/* Input Area */}
                    <div className="p-10 md:px-24 bg-gradient-to-t from-background to-transparent">
                        <form onSubmit={handleSubmit} className="relative max-w-5xl mx-auto">
                            <input
                                autoFocus
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Initialize neural query..."
                                className="w-full bg-white/5 border border-white/10 rounded-3xl px-8 py-6 text-xl focus:border-indigo-500/50 outline-none transition-all shadow-2xl glass-vibrant"
                            />
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="absolute right-4 top-1/2 -translate-y-1/2 p-4 bg-indigo-500 hover:bg-indigo-400 rounded-2xl transition-all glow-indigo disabled:opacity-50"
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
