"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, CheckCircle2 } from "lucide-react";

export default function ContactModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
    const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
    const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("loading");

        try {
            // 1. Log to PostgreSQL via Backend
            await fetch("http://localhost:8000/api/contact/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            // 2. Success state
            setStatus("success");

            // Clear form
            setFormData({ name: "", email: "", subject: "", message: "" });

        } catch (error) {
            console.error("Failed to send message", error);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="relative w-full max-w-lg glass rounded-3xl border border-white/10 p-8 shadow-2xl"
                    >
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 p-2 hover:bg-white/5 rounded-full text-white/40 transition-colors"
                        >
                            <X size={20} />
                        </button>

                        <div className="space-y-6">
                            <div>
                                <h3 className="text-2xl font-bold tracking-tight">Direct Connection</h3>
                                <p className="text-sm text-white/40 font-mono italic">// Your message will be logged in Karan&apos;s system.</p>
                            </div>

                            {status === "success" ? (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="py-12 flex flex-col items-center justify-center space-y-4 text-center"
                                >
                                    <div className="w-16 h-16 bg-cyan-500/20 rounded-full flex items-center justify-center text-cyan-400">
                                        <CheckCircle2 size={32} />
                                    </div>
                                    <div className="space-y-2">
                                        <h4 className="text-xl font-semibold">Message Sent!</h4>
                                        <p className="text-sm text-white/40">Karan has been notified. Expect a response soon.</p>
                                    </div>
                                </motion.div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-1.5">
                                            <label className="text-[10px] uppercase tracking-widest text-white/40 font-mono">Name</label>
                                            <input
                                                required
                                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm focus:border-cyan-500/50 outline-none transition-colors"
                                                placeholder="John Doe"
                                                value={formData.name}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            />
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-[10px] uppercase tracking-widest text-white/40 font-mono">Email</label>
                                            <input
                                                required
                                                type="email"
                                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm focus:border-cyan-500/50 outline-none transition-colors"
                                                placeholder="john@example.com"
                                                value={formData.email}
                                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-[10px] uppercase tracking-widest text-white/40 font-mono">Subject</label>
                                        <input
                                            required
                                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm focus:border-cyan-500/50 outline-none transition-colors"
                                            placeholder="Project Opportunity"
                                            value={formData.subject}
                                            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-[10px] uppercase tracking-widest text-white/40 font-mono">Message</label>
                                        <textarea
                                            required
                                            rows={4}
                                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm focus:border-cyan-500/50 outline-none transition-colors resize-none"
                                            placeholder="Tell me about your project..."
                                            value={formData.message}
                                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                        />
                                    </div>
                                    <button
                                        disabled={status === "loading"}
                                        className="w-full py-3 bg-cyan-500 hover:bg-cyan-400 text-black font-semibold rounded-xl flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                                    >
                                        {status === "loading" ? "Recording..." : <><Send size={18} /> Send Message</>}
                                    </button>
                                </form>
                            )}
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
