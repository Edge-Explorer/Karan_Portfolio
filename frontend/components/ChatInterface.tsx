"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, User, Bot, Loader2, X } from "lucide-react";

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

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 90000); // 90s timeout

        try {
            const response = await fetch("https://karan-portfolio-zhf8.vercel.app/api/chat/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: userMessage, history: messages }),
                signal: controller.signal
            });

            clearTimeout(timeoutId);

            if (!response.ok) throw new Error("AI synthesis failed");

            const data = await response.json();
            const aiResponse = data.response || "My neural link is currently fluctuating. Could you try that query again?";
            setMessages((prev) => [...prev, { role: "ai", content: aiResponse }]);
        } catch (error: any) {
            clearTimeout(timeoutId);
            const isTimeout = error.name === "AbortError";

            setMessages((prev) => [
                ...prev,
                {
                    role: "ai",
                    content: isTimeout
                        ? "The neural gateway is taking longer than expected. Please try sending your message again!"
                        : "Neural gateway is initializing. Please try again in a moment!"
                },
            ]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 30 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 30 }}
                    transition={{ type: "spring", damping: 25, stiffness: 300 }}
                    className="fixed bottom-20 right-3 left-3 sm:left-auto sm:bottom-24 sm:right-6 md:bottom-32 md:right-10 z-[300] w-auto sm:w-[380px] md:w-[420px] h-[75vh] max-h-[620px] bg-slate-900/90 md:bg-slate-900/60 backdrop-blur-2xl rounded-[2rem] md:rounded-[3rem] border border-white/20 shadow-[0_25px_100px_rgba(0,0,0,0.7)] flex flex-col overflow-hidden"
                >
                    {/* Header: Humanized Branding */}
                    <div className="p-3.5 sm:p-5 flex justify-between items-center border-b border-white/10 bg-white/5 backdrop-blur-md shrink-0">
                        <div className="flex items-center gap-3">
                            <div className="relative">
                                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl overflow-hidden border-2 border-indigo-500/30 shadow-xl">
                                    <img src="/karan_image.png" alt="Karan" className="w-full h-full object-cover object-top" />
                                </div>
                                <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-500 border-2 border-[#0B0F1A] rounded-full shadow-lg" />
                            </div>
                            <div>
                                <h2 className="text-base sm:text-lg font-black tracking-tighter uppercase italic leading-none text-white drop-shadow-md">Karan&apos;s AI Assistant</h2>
                                <p className="text-[9px] sm:text-[10px] font-bold text-indigo-400/90 uppercase tracking-[0.2em] mt-1 line-clamp-1">Neural Cognitive Twin</p>
                            </div>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-white/10 rounded-xl text-white/40 hover:text-white transition-all active:scale-95"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    {/* Messages Area: Humanized Flow */}
                    <div ref={scrollRef} className="flex-1 overflow-y-auto px-3.5 sm:px-6 py-4 space-y-4 sm:space-y-6 scroll-smooth sleek-scrollbar">
                        {messages.length === 0 && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="min-h-[180px] sm:min-h-[260px] flex flex-col items-center justify-center text-center space-y-4 px-3 py-2"
                            >
                                <div className="space-y-2">
                                    <h3 className="text-xl sm:text-2xl font-black tracking-tight text-white leading-tight">Neural Link Established.</h3>
                                    <p className="text-xs sm:text-sm text-white/50 font-medium leading-relaxed max-w-[260px] mx-auto">
                                        Ask me about projects, engineering logic, or the journey into Generative AI.
                                    </p>
                                </div>
                                <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2 pb-2">
                                    {starterChips.map((chip) => (
                                        <button
                                            key={chip}
                                            onClick={() => handleSubmit(undefined, chip)}
                                            className="px-3 py-1.5 sm:px-4 sm:py-2 bg-white/5 hover:bg-indigo-500/20 border border-white/10 hover:border-indigo-500/30 rounded-xl text-[10px] sm:text-[11px] font-bold text-white/70 hover:text-white transition-all active:scale-95 backdrop-blur-md"
                                        >
                                            {chip}
                                        </button>
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        {messages.map((m, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                transition={{ type: "spring", damping: 20, stiffness: 200 }}
                                className={`flex gap-3 sm:gap-4 ${m.role === "user" ? "flex-row-reverse" : ""}`}
                            >
                                <div className={`p-2.5 sm:p-3 rounded-2xl h-fit border shadow-xl backdrop-blur-md shrink-0 ${m.role === "user" ? "bg-purple-600/20 border-purple-500/30" : "bg-white/5 border-white/10"}`}>
                                    {m.role === "user" ? <User size={16} className="text-white" /> : <Bot size={16} className="text-indigo-400" />}
                                </div>
                                <div className={`max-w-[85%] sm:max-w-[80%] p-3.5 sm:p-5 rounded-2xl sm:rounded-[2rem] text-[13px] sm:text-[14px] leading-relaxed relative break-words ${m.role === "user"
                                    ? "bg-white/5 border border-white/10 text-white/80 rounded-tr-sm backdrop-blur-md shadow-xl"
                                    : "bg-indigo-500/10 border border-indigo-500/20 text-white/90 rounded-tl-sm backdrop-blur-md shadow-2xl"
                                    }`}>
                                    <p className="whitespace-pre-wrap font-medium">
                                        {m.content.split(/(https?:\/\/[^\s]+)/g).map((part, index) => {
                                            const urlMatch = part.match(/^(https?:\/\/[^\s,;)]+)([.,;)]+)?$/);
                                            if (urlMatch) {
                                                const url = urlMatch[1];
                                                const punctuation = urlMatch[2] || "";
                                                return (
                                                    <span key={index}>
                                                        <a
                                                            href={url}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="text-indigo-400 hover:text-indigo-300 underline underline-offset-4 decoration-indigo-500/50 hover:decoration-indigo-400 transition-all font-black break-all"
                                                        >
                                                            {url}
                                                        </a>
                                                        {punctuation}
                                                    </span>
                                                );
                                            }
                                            return part;
                                        })}
                                    </p>
                                </div>
                            </motion.div>
                        ))}

                        {isLoading && (
                            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex gap-3 sm:gap-4">
                                <div className="p-2.5 sm:p-3 rounded-2xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 animate-pulse shadow-lg shrink-0">
                                    <Loader2 size={16} className="animate-spin" />
                                </div>
                                <div className="bg-indigo-500/10 border border-indigo-500/20 px-4 py-3 sm:px-6 sm:py-4 rounded-2xl sm:rounded-[2rem] rounded-tl-sm backdrop-blur-md italic text-indigo-400/80 font-mono text-[10px] sm:text-[11px] tracking-widest flex items-center gap-2 shadow-2xl">
                                    <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: "0s" }} />
                                    <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
                                    <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }} />
                                    SYNTHESIZING...
                                </div>
                            </motion.div>
                        )}
                    </div>

                    {/* Input Area: Re-engineered Flow */}
                    <div className="p-3 sm:p-5 bg-slate-900/50 backdrop-blur-3xl border-t border-white/10 shrink-0">
                        <form onSubmit={handleSubmit} className="relative group">
                            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500/50 to-purple-500/50 rounded-[1.5rem] opacity-0 group-focus-within:opacity-100 blur-xl transition duration-500" />
                            <div className="relative">
                                <input
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    placeholder="Query neural network..."
                                    className="w-full bg-white/5 border border-white/20 rounded-[1.2rem] sm:rounded-[1.5rem] px-5 sm:px-6 py-3.5 sm:py-4 text-xs sm:text-sm font-medium text-white placeholder:text-white/20 focus:border-indigo-500/60 focus:bg-white/10 outline-none transition-all pr-14 sm:pr-16 shadow-inner backdrop-blur-md"
                                />
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="absolute right-1.5 top-1/2 -translate-y-1/2 p-2 sm:p-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl transition-all shadow-xl shadow-indigo-600/30 active:scale-90 disabled:opacity-30 disabled:grayscale"
                                >
                                    <Send size={18} />
                                </button>
                            </div>
                        </form>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
