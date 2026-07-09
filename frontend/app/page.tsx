"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  Github, Linkedin, Mail, ExternalLink, Code2, Cpu, Globe, Rocket, Sparkles,
  Terminal, Database, Layout, Smartphone, Cloud, Layers, Cpu as AiIcon,
  Binary, GitBranch, Box, FileCode, Search, Server, Monitor, GraduationCap, BookOpen,
  Activity, Zap, Instagram, X, Download, Brain
} from "lucide-react";
import ChatInterface from "@/components/ChatInterface";
import ContactModal from "@/components/ContactModal";
import NeuralBackground from "@/components/NeuralBackground";
import SpaceBackground from "@/components/SpaceBackground";
import Navigation from "@/components/Navigation";
import NeuralReveal from "@/components/NeuralReveal";
import PortraitReveal from "@/components/PortraitReveal";
import { useState, useEffect, useRef } from "react";
import { useMotionValue, useTransform, useSpring as useFramerSpring } from "framer-motion";

function Tilt({ children, className }: { children: React.ReactNode, className?: string }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-100, 100], [10, -10]);
  const rotateY = useTransform(x, [-100, 100], [-10, 10]);

  const springConfig = { damping: 20, stiffness: 300 };
  const springX = useFramerSpring(rotateX, springConfig);
  const springY = useFramerSpring(rotateY, springConfig);

  function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(event.clientX - centerX);
    y.set(event.clientY - centerY);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: springX,
        rotateY: springY,
        transformStyle: "preserve-3d",
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface Skill {
  name: string;
  info: string;
  color: string;
  icon?: string;
  local?: string;
  lucide?: any;
}

interface SkillGroup {
  group: string;
  items: Skill[];
}

const skills: SkillGroup[] = [
  {
    group: "Core",
    items: [
      { name: "Python", info: "High-level programming for AI & Data Science.", icon: "python", color: "#3776ab" },
      { name: "JavaScript", info: "Dynamic web logic and interactive UI.", icon: "javascript", color: "#f7df1e" },
      { name: "TypeScript", info: "Scaling JS with robust static typing.", icon: "typescript", color: "#3178c6" },
      { name: "SQL", info: "Relational data management and complex queries.", icon: "mysql", color: "#4479a1" }
    ]
  },
  {
    group: "Frontend & Mobile",
    items: [
      { name: "React", info: "Building component-based immersive interfaces.", icon: "react", color: "#61dafb" },
      { name: "Next.js", info: "Modern fullstack framework with SSR/SSG.", icon: "nextjs", color: "#ffffff" },
      { name: "Tailwind CSS", info: "Rapid styling with utility-first CSS.", icon: "tailwindcss", color: "#06b6d4" },
      { name: "React Native", info: "Cross-platform native mobile applications.", icon: "react", color: "#61dafb" },
      { name: "Expo", info: "Accelerated development for React Native.", local: "/skills/expo.png", color: "#00E0FF" },
      { name: "Android", info: "Native mobile development for Android devices.", icon: "android", color: "#3ddc84" }
    ]
  },
  {
    group: "Backend & Cloud",
    items: [
      { name: "FastAPI", info: "High-performance Python API development.", icon: "fastapi", color: "#05998b" },
      { name: "PostgreSQL", info: "Robust, open-source relational database (Supabase).", icon: "postgresql", color: "#4169e1" },
      { name: "Docker", info: "Containerization for consistent deployments.", icon: "docker", color: "#2496ed" },
      { name: "Google Cloud", info: "Scalable cloud infrastructure and AI hosting.", icon: "googlecloud", color: "#4285f4" },
      { name: "Supabase", info: "The open source Firebase alternative for DB & Auth.", icon: "supabase", color: "#3ECF8E" },
      { name: "Vercel", info: "Fast, simple cloud platform for web apps.", icon: "vercel", color: "#ffffff" },
      { name: "Alembic", info: "Database migration tool for SQLAlchemy.", lucide: Database, color: "#ed2124" }
    ]
  },
  {
    group: "Generative AI",
    items: [
      { name: "LangChain", info: "Framework for building LLM-powered apps.", local: "/skills/langchain.png", color: "#00F5A0" },
      { name: "LangGraph", info: "Orchestrating complex multi-agent workflows.", local: "/skills/langgraph-logo.png", color: "#ffffff" },
      { name: "Google Gemini", info: "Multimodal AI models for generative tasks.", local: "/skills/gemini.png", color: "#8e75ff" },
      { name: "OpenAI", info: "Cutting-edge models like GPT-4 and DALL-E.", local: "/skills/openai.png", color: "#74aa9c" },
      { name: "Hugging Face", info: "Hub for modern transformers and public models.", local: "/skills/huggingface.png", color: "#ffbd45" },
      { name: "Ollama", info: "Running large language models locally.", local: "/skills/ollama.png", color: "#ffffff" }
    ]
  },
  {
    group: "ML & Data Science",
    items: [
      { name: "TensorFlow", info: "Open-source platform for end-to-end ML.", icon: "tensorflow", color: "#ff6f00" },
      { name: "PyTorch", info: "Flexible deep learning for research and prod.", icon: "pytorch", color: "#ee4c2c" },
      { name: "Scikit Learn", info: "Simple and efficient tools for predictive data.", local: "/skills/scikitlearn.jpg", color: "#f7931e" },
      { name: "Pandas", info: "Powerful data manipulation and analysis.", icon: "pandas", color: "#FF007A" },
      { name: "NumPy", info: "Fundamental package for scientific computing.", icon: "numpy", color: "#4d77cf" },
      { name: "Matplotlib", info: "Comprehensive library for static/animated plots.", local: "/skills/matplotlib.png", color: "#ffffff" }
    ]
  },
  {
    group: "Tools",
    items: [
      { name: "Git", info: "Version control for tracking code changes.", icon: "git", color: "#f05032" },
      { name: "Postman", info: "Platform for building and using APIs.", local: "/skills/postman.jpg", color: "#ff6c37" },
      { name: "VS Code", info: "Extensible code editor for modern development.", icon: "vscode", color: "#007acc" },
      { name: "Jupyter", info: "Interactive computing across all languages.", icon: "jupyter", color: "#f37626" }
    ]
  }
];

const projects = [
  {
    title: "QuantIQ",
    description: "A real-time AI stock intelligence platform that aggregates live stock prices, runs an on-device ONNX ML prediction model, executes a Gemini ReAct analysis agent, and streams data over GraphQL WebSockets.",
    tech: ["FastAPI", "React (Vite)", "Redpanda (Kafka)", "ONNX Runtime", "Strawberry GraphQL", "Gemini API", "Prometheus", "Grafana Cloud", "Neon DB"],
    color: "from-blue-600 to-cyan-500",
    image: "/projects/quantiq-logo.png",
    links: {
      github: "https://github.com/Edge-Explorer/QuantIQ",
      live: "https://quant-iq-pi.vercel.app/"
    },
    highlights: ["ONNX Local Inference", "ReAct AI Agent", "Redpanda (Kafka)", "GraphQL Subscriptions"]
  },
  {
    title: "AgentBond AI",
    description: "A production-grade, full-stack multi-agent system that decomposes open-ended problems into hypotheses, investigates them against live web data, and verifies findings for hallucination and context drift.",
    tech: ["FastAPI", "React (Vite)", "Celery", "Upstash Redis", "PostgreSQL", "Gemini API", "Prometheus", "Grafana Cloud", "Docker"],
    color: "from-emerald-600 to-teal-500",
    image: "/projects/agentbond-logo.png",
    links: {
      github: "https://github.com/Edge-Explorer/AgentBond-AI",
      live: "https://agent-bond-ai.vercel.app"
    },
    highlights: ["Orchestration Engine", "Verifier Agent", "Shared Context Store", "Prometheus & Grafana"]
  },
  {
    title: "NEEL",
    description: "Architected a 3-tier multi-agent productivity system (Supervisor → Reasoning → Reflection) with reflection-based validation and NLP activity extraction.",
    tech: ["LangChain", "LangGraph", "FastAPI", "React Native", "Supabase", "Vercel", "Gemini API"],
    color: "from-indigo-600 to-blue-500",
    image: "/projects/neel-logo.png",
    links: {
      github: "https://github.com/Edge-Explorer/NEEL",
      drive: "https://drive.google.com/file/d/1S-STasJHdxNbDluiPOVuIbMDho2QOHMy/view?usp=drive_link"
    },
    highlights: ["Multi-Agent AI", "Persistent Memory", "Auto-Logging", "Behavioral Analytics"]
  },
  {
    title: "DevGuardian",
    description: "An AI-powered autonomous engineering MCP server using a heavy 3-agent orchestration pipeline to build, test, and refactor features securely.",
    tech: ["Python", "LangGraph", "MCP SDK", "Pytest", "Docker"],
    color: "from-cyan-600 to-blue-600",
    image: "/projects/devguardian-logo.png",
    links: {
      github: "https://github.com/Edge-Explorer/DevGuardian"
    },
    highlights: ["Agent Swarm Orchestration", "TDD Auto-Pilot", "God-Mode Refactoring", "Pre-Push Security Filter"]
  },
  {
    title: "ReviewStar.AI",
    description: "Advanced Reputation Intelligence ecosystem using Gemini 2.0 for sentiment analysis, automated drafting, and real-time feedback monitoring.",
    tech: ["FastAPI", "React", "Gemini 2.0", "WebSockets", "PostgreSQL", "Pandas"],
    color: "from-orange-600 to-yellow-500",
    image: "/projects/reviewstar-logo.png",
    links: {
      github: "https://github.com/Edge-Explorer/ReviewStar.AI"
    },
    highlights: ["AI Response Engine", "Live Feedback Pulse", "Deep Intel Reports", "Multi-Business Scaling"]
  }
];

const coursework = [
  {
    title: "Supervised Machine Learning",
    subtitle: "Regression and Classification",
    issuer: "Coursera | DeepLearning.AI",
    image: "/coursework/deeplearning-logo.jpg",
    link: "https://www.coursera.org/account/accomplishments/verify/2W993A8JKMBN",
    status: "Verified",
    id: "01"
  },
  {
    title: "Databases and SQL",
    subtitle: "for Data Science with Python",
    issuer: "Coursera | IBM",
    image: "/coursework/ibm-logo.jpg",
    link: "https://www.coursera.org/account/accomplishments/verify/BGF0B85APX1L",
    status: "Verified",
    id: "02"
  },
  {
    title: "Generative AI",
    subtitle: "for Everyone",
    issuer: "Coursera | DeepLearning.AI",
    image: "/coursework/deeplearning-logo.jpg",
    link: "https://www.coursera.org/account/accomplishments/verify/ZDS3F6R7G0DV",
    status: "Verified",
    id: "03"
  }
];

function SkillLogo({ skill }: { skill: Skill }) {
  if (skill.local) {
    return (
      <img
        src={skill.local}
        className="w-12 h-12 md:w-16 md:h-16 object-contain transition-transform duration-500"
        alt={skill.name}
      />
    );
  }

  if (skill.lucide) {
    const LucideIcon = skill.lucide;
    return <LucideIcon className="w-10 h-10 md:w-14 md:h-14 transition-colors" style={{ color: skill.color }} />;
  }

  return (
    <img
      src={`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${skill.icon}/${skill.icon}-original.svg`}
      onError={(e) => {
        (e.target as any).style.display = 'none';
        (e.target as any).parentElement.innerHTML = `<span class="text-xl font-black opacity-20">${skill.name[0]}</span>`;
      }}
      className="w-12 h-12 md:w-16 md:h-16 object-contain transition-transform duration-500"
      alt={skill.name}
    />
  );
}

export default function Home() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isAIChatOpen, setIsAIChatOpen] = useState(false);
  const [activeSkill, setActiveSkill] = useState<Skill | null>(null);
  const [theme, setTheme] = useState<"neural" | "space">("neural");

  useEffect(() => {
    // Neural Pre-warming: Prime the Vercel Serverless Function on load
    fetch("https://karan-portfolio-zhf8.vercel.app/").catch(() => { });
  }, []);

  return (
    <main className="min-h-screen bg-transparent text-white selection:bg-indigo-500/30 overflow-x-hidden relative">
      <Navigation onTerminalClick={() => setIsAIChatOpen(true)} />

      {/* Dynamic Background with Cross-fade */}
      <AnimatePresence mode="wait">
        <motion.div
          key={theme}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5 }}
          className="fixed inset-0 z-0"
        >
          {theme === "neural" ? <NeuralBackground /> : <SpaceBackground />}
        </motion.div>
      </AnimatePresence>

      {/* Content Backdrop - Updated for cinematic theme */}
      <div className="fixed inset-0 z-[1] bg-gradient-to-b from-black/20 via-transparent to-black/40 pointer-events-none" />

      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
      <ChatInterface isOpen={isAIChatOpen} onClose={() => setIsAIChatOpen(false)} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 py-12 lg:py-32 flex flex-col items-center">

        <motion.button
          onClick={() => setIsAIChatOpen(!isAIChatOpen)}
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            scale: isAIChatOpen ? 0.95 : 1,
            opacity: 1,
            rotate: 0
          }}
          whileHover={{ scale: 1.05 }}
          className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-[250] group transition-all duration-500"
        >
          {/* Active State Halo */}
          {isAIChatOpen && (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              className="absolute -inset-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full blur-md opacity-100"
            />
          )}

          <div className={`absolute -inset-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full blur-2xl transition-opacity duration-500 ${isAIChatOpen ? 'opacity-80 scale-110' : 'opacity-40'} group-hover:opacity-100 animate-pulse`} />

          <div className={`relative w-24 h-24 rounded-full overflow-hidden border-4 ${isAIChatOpen ? 'border-white/80 shadow-[0_0_20px_rgba(255,255,255,0.3)]' : 'border-white/20'} glass shadow-2xl transition-all duration-500`}>
            <img src="/karan_image.png" alt="AI Agent" className="w-full h-full object-cover object-top" />
            <div className={`absolute inset-0 ${isAIChatOpen ? 'bg-transparent' : 'bg-indigo-500/20'} group-hover:bg-transparent transition-colors`} />
            <div className={`absolute bottom-1 right-1 w-6 h-6 ${isAIChatOpen ? 'bg-indigo-500' : 'bg-green-500'} border-2 border-white rounded-full transition-colors flex items-center justify-center`}>
              {isAIChatOpen && <X size={10} className="text-white" />}
            </div>
          </div>
        </motion.button>

        <section id="hero" className="w-full text-center lg:text-left space-y-16 mb-10 px-6">
          <div className="flex flex-col lg:flex-row items-center justify-center lg:justify-between max-w-7xl mx-auto gap-12 lg:gap-16">
            {/* Identity Column */}
            <div className="flex flex-col items-center lg:items-start space-y-10 order-2 lg:order-1">
              <div className="space-y-4">
                <motion.h1
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[5rem] font-black tracking-tighter leading-[1.1] text-white lg:whitespace-nowrap text-balance"
                >
                  <NeuralReveal text="Karan Rohidas Shelar" trigger="mount" />
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-indigo-400 font-bold tracking-[0.2em] sm:tracking-[0.3em] uppercase leading-none"
                >
                  <NeuralReveal text="Generative AI Developer" delay={0.5} trigger="mount" />
                </motion.p>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-wrap justify-center lg:justify-start items-center gap-3 sm:gap-6"
              >
                <motion.button
                  onClick={() => setIsContactOpen(true)}
                  whileHover={{ y: -5, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center gap-3 px-6 py-3 glass rounded-2xl hover:text-indigo-400 hover:border-indigo-500/50 transition-all duration-300 group relative overflow-hidden shadow-2xl"
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:animate-shimmer"
                  />
                  <span className="text-white/40 transition-colors relative z-10">
                    <svg viewBox="0 0 24 24" width="20" height="20" className="grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300 outline-none border-none"><path fill="#ea4335" d="M24 5.4 12 14.4 0 5.4V18.6h4.8V9.6l7.2 5.4 7.2-5.4v9h4.8V5.4z"/></svg>
                  </span>
                  <span className="text-sm font-bold text-white/60 group-hover:text-white transition-colors uppercase tracking-widest relative z-10">
                    Connect Now
                  </span>
                </motion.button>

                <div className="flex flex-wrap items-center gap-3">
                  <SocialLink 
                    icon={<svg viewBox="0 0 24 24" width="20" height="20" className="grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"><path fill="#ffffff" d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" /></svg>} 
                    href="https://github.com/Edge-Explorer" 
                    label="GitHub" 
                  />
                  <SocialLink 
                    icon={<span className="text-[20px] leading-none grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300">🤗</span>} 
                    href="https://huggingface.co/Karan6124" 
                    label="Hugging Face" 
                  />
                  <SocialLink 
                    icon={<svg viewBox="0 0 24 24" width="20" height="20" className="grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"><path fill="#0A66C2" d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>} 
                    href="https://linkedin.com/in/karan-shelar-779381343" 
                    label="LinkedIn" 
                  />
                  <SocialLink 
                    icon={<svg viewBox="0 0 24 24" width="20" height="20" className="grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"><linearGradient id="ig-grad" x1="0%" y1="100%" x2="100%" y2="0%"><stop offset="0%" stopColor="#fee411"/><stop offset="10%" stopColor="#fedb16"/><stop offset="25%" stopColor="#fec125"/><stop offset="40%" stopColor="#fe983d"/><stop offset="55%" stopColor="#fe5f5e"/><stop offset="70%" stopColor="#e62f71"/><stop offset="85%" stopColor="#c5138b"/><stop offset="100%" stopColor="#8c3aaa"/></linearGradient><path fill="url(#ig-grad)" d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>} 
                    href="https://instagram.com/karan.shelar.2004" 
                    label="Instagram" 
                  />
                  <SocialLink 
                    icon={<svg viewBox="0 0 24 24" width="20" height="20" className="grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"><path fill="#ffffff" d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" points="14 2 14 8 20 8"></polyline><line fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" x1="16" y1="13" x2="8" y2="13"></line><line fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" x1="16" y1="17" x2="8" y2="17"></line><polyline fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" points="10 9 9 9 8 9"></polyline></svg>} 
                    href="https://drive.google.com/file/d/1Xi5XVCEjLsbePaW76ipwh_bSfJHEbwJS/view?usp=drive_link" 
                    label="Resume" 
                  />

                  {/* Theme Toggle Button */}
                  <motion.button
                    onClick={() => setTheme(theme === "neural" ? "space" : "neural")}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-3 px-6 py-3 glass rounded-2xl text-indigo-400 border-indigo-500/50 hover:bg-indigo-500/10 transition-all duration-300 group"
                    title="Switch Background Theme"
                  >
                    {theme === "neural" ? <Globe size={20} className="animate-pulse text-indigo-400" /> : <Cpu size={20} className="text-indigo-400" />}
                    <span className="text-xs font-black uppercase tracking-widest hidden md:inline">
                      {theme === "neural" ? "Switch to Cinematic" : "Switch to Neural"}
                    </span>
                  </motion.button>
                </div>
              </motion.div>
            </div>

            {/* Portrait Anchor - Now Dynamic and Theme-Aware */}
            <PortraitReveal src="/karan_image.png" theme={theme} />
          </div>
        </section>

        {/* Elegant Tech Divider */}
        <div className="w-full max-w-7xl mx-auto px-6 h-20 flex items-center justify-center opacity-20 pointer-events-none">
          <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-indigo-500 to-transparent relative">
            <motion.div
              animate={{ left: ["0%", "100%"] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              className="absolute top-0 w-20 h-[1px] bg-white blur-sm"
            />
          </div>
        </div>

        {/* INTRODUCTION / OVERVIEW SECTION */}
        <motion.section
          id="origin"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full max-w-7xl space-y-20 pt-12 pb-24 px-4"
        >
          <div className="space-y-6 text-left max-w-3xl">
            <h2 className="text-sm font-black text-indigo-400 uppercase tracking-[0.3em] sm:tracking-[0.5em]">Introduction</h2>
            <h3 className="text-5xl md:text-8xl font-black tracking-tighter text-white leading-tight">
              <NeuralReveal text="Overview" />
            </h3>
            <p className="text-lg md:text-2xl text-white/60 font-medium leading-relaxed text-justify">
              I am an emerging Generative AI Developer with a mission to architect the next generation of autonomous systems.
              I specialize in bridging the gap between ambitious AI research and practical execution, as seen in NEEL—a live
              multi-agent productivity environment I built using LangChain, FastAPI, and React Native. I approach every challenge
              with fresh energy and a drive to master agentic workflows, focused on solving real-world problems with neural precision.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Generative AI", desc: "Crafting advanced LLM solutions & neural agents.", img: "/overview/generative_ai.png", color: "from-blue-500/20 to-indigo-500/20", borderColor: "border-blue-500/30", textColor: "text-blue-400" },
              { title: "Data Science", desc: "Extracting insights from complex neural datasets.", img: "/overview/data_science.png", color: "from-purple-500/20 to-pink-500/20", borderColor: "border-purple-500/30", textColor: "text-purple-400" },
              { title: "Fullstack", desc: "Architecting robust web & backend systems.", img: "/overview/fullstack.png", color: "from-green-500/20 to-emerald-500/20", borderColor: "border-green-500/30", textColor: "text-green-400" },
              { title: "Problem Solver", desc: "Solving bottlenecks with optimized logic.", img: "/overview/problem_solving.jpg", color: "from-orange-500/20 to-red-500/20", borderColor: "border-orange-500/30", textColor: "text-orange-400" },
            ].map((card, i) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -10 }}
                className={`group p-8 rounded-[2.5rem] glass border ${card.borderColor} bg-gradient-to-br ${card.color} hover:shadow-2xl transition-all duration-500 relative overflow-hidden`}
              >
                <div className="absolute -inset-10 bg-white/5 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="space-y-6 relative z-10">
                  <div className="w-12 h-12 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6 rounded-2xl overflow-hidden bg-white/5 p-2">
                    <img src={card.img} alt={card.title} className="w-full h-full object-contain filter drop-shadow-2xl" />
                  </div>
                  <div className="space-y-2">
                    <h4 className={`text-lg font-black uppercase tracking-widest ${card.textColor}`}>{card.title}</h4>
                    <p className="text-sm text-white/50 font-medium leading-snug">{card.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Unified Skillset Section */}
        <motion.section
          id="intelligence"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full max-w-7xl space-y-24 py-32 border-y border-slate-200"
        >
          <div className="flex flex-col items-center text-center space-y-8">
            <h3 className="text-6xl md:text-9xl font-black tracking-tighter text-white">
              <NeuralReveal text="Skillset" />
            </h3>
          </div>

          <div className="flex flex-wrap justify-center gap-x-8 gap-y-12 sm:gap-x-12 sm:gap-y-16 px-4">
            {(skills.flatMap(group => group.items) as Skill[]).map((skill, i) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.02 }}
                onMouseEnter={() => setActiveSkill(skill)}
                onMouseLeave={() => setActiveSkill(null)}
                className="flex flex-col items-center gap-4 sm:gap-6 group relative w-20 sm:w-32"
              >
                {/* Improved Hover Glow */}
                <div className="absolute inset-0 bg-indigo-500/5 blur-[40px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Logo Container */}
                <div className="relative w-16 h-16 sm:w-24 sm:h-24 flex items-center justify-center transition-all duration-500 group-hover:-translate-y-3 cursor-help bg-slate-100/50 rounded-2xl shadow-inner p-3 sm:p-4">
                  <SkillLogo skill={skill} />
                </div>

                {/* Styled Badge */}
                <div
                  className="px-4 py-1.5 rounded-xl border backdrop-blur-md shadow-2xl transition-all duration-300"
                  style={{
                    borderColor: `${skill.color}44`,
                    backgroundColor: `${skill.color}22`
                  }}
                >
                  <span
                    className="text-[10px] md:text-xs font-black uppercase tracking-wider transition-colors"
                    style={{ color: skill.color }}
                  >
                    {skill.name}
                  </span>
                </div>

                {/* Tooltip Info */}
                <AnimatePresence>
                  {activeSkill?.name === skill.name && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.9 }}
                      className="absolute bottom-full mb-6 z-[200] w-56 p-5 glass rounded-3xl border border-black/5 shadow-[0_20px_50px_rgba(0,0,0,0.1)] pointer-events-none"
                    >
                      <p className="text-xs font-black text-indigo-400 mb-2 uppercase tracking-widest">{skill.name}</p>
                      <p className="text-[11px] text-white/70 leading-relaxed font-medium">{skill.info}</p>
                      <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 glass border-r border-b border-white/10 rotate-45" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Credentials Section (Certifications) */}
        <motion.section
          id="credentials"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="w-full max-w-7xl mx-auto px-6 py-32 space-y-24"
        >
          <div className="flex flex-col items-center text-center space-y-8">
            <h2 className="text-6xl md:text-8xl font-black tracking-tighter leading-none text-indigo-400">
              <NeuralReveal text="Coursework" />
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {coursework.map((cert, i) => (
              <motion.div
                key={cert.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -12 }}
                className="group relative h-[560px] glass rounded-[3rem] overflow-hidden border border-white/5 hover:border-indigo-500/40 transition-all duration-700 shadow-2xl flex flex-col"
              >
                {/* Top Section: Immersive Certificate Display */}
                <div className="relative h-[50%] w-full overflow-hidden bg-black/40 p-6">
                  {/* Dynamic background glow */}
                  <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/10 via-transparent to-black/60 z-10" />
                  <div className="absolute -inset-20 bg-indigo-500/5 blur-[100px] rounded-full group-hover:opacity-100 opacity-0 transition-opacity duration-1000" />

                  {/* The "Box" - Fixed to be more proportionate */}
                  <div className="relative w-full h-full rounded-2xl overflow-hidden border border-white/10 flex items-center justify-center p-4 bg-black/20 group-hover:bg-black/10 transition-colors duration-700">
                    <motion.img
                      src={cert.image}
                      alt={cert.title}
                      className="w-full h-full object-contain filter drop-shadow-[0_15px_35px_rgba(0,0,0,0.8)] group-hover:scale-105 transition-transform duration-1000 ease-out z-20"
                    />

                    {/* Animated scanning line for "Verified" feel */}
                    <motion.div
                      animate={{ top: ["0%", "100%", "0%"] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                      className="absolute left-0 w-full h-[1px] bg-indigo-500/30 blur-sm z-30 opacity-0 group-hover:opacity-100 transition-opacity"
                    />
                  </div>
                </div>

                {/* Bottom Section: Clean Metadata (No Overlap) */}
                <div className="flex-1 p-8 md:p-10 flex flex-col justify-between relative bg-gradient-to-b from-transparent to-black/20">
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 border border-indigo-500/20 shadow-inner">
                          <GraduationCap size={20} />
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">Credential_{cert.id}</span>
                      </div>
                      <div className="px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-[9px] font-black uppercase tracking-widest shadow-lg">
                        {cert.status}
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h3 className="text-2xl font-black text-white tracking-tighter leading-none group-hover:text-indigo-400 transition-colors">
                        {cert.title}
                      </h3>
                      {cert.subtitle && (
                        <p className="text-xs font-bold text-white/50 uppercase tracking-widest lowercase italic">
                          {cert.subtitle}
                        </p>
                      )}
                      <p className="text-[10px] text-indigo-400/80 font-black uppercase tracking-[0.3em] flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
                        {cert.issuer}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-end pt-6 border-t border-white/5">
                    <a
                      href={cert.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/btn flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white hover:border-white transition-all duration-500"
                    >
                      <span className="text-[10px] font-black uppercase tracking-widest text-white group-hover/btn:text-black">Inspect</span>
                      <ExternalLink size={12} className="text-white group-hover/btn:text-black group-hover/btn:rotate-12 transition-all" />
                    </a>
                  </div>
                </div>

                {/* Ornamental side glow */}
                <div className="absolute top-0 right-0 w-1 h-full bg-gradient-to-b from-transparent via-indigo-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Elegant Tech Divider */}
        <div className="w-full max-w-7xl mx-auto px-6 h-20 flex items-center justify-center opacity-20 pointer-events-none">
          <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-indigo-500 to-transparent relative">
            <motion.div
              animate={{ left: ["0%", "100%"] }}
              transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
              className="absolute top-0 w-20 h-[1px] bg-white blur-sm"
            />
          </div>
        </div>

        {/* Ventures Section (Projects) */}
        <motion.section
          id="ventures"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full max-w-6xl space-y-24 py-32"
        >
          <div className="flex flex-col items-center text-center space-y-6">
            <h2 className="text-6xl md:text-8xl font-black tracking-tighter leading-none">
              <NeuralReveal text="Featured" /> <br />
              <span className="text-indigo-400"><NeuralReveal text="Ventures" delay={0.5} /></span>
            </h2>
          </div>

          <div className="space-y-32">
            {projects.map((project, idx) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                className={`flex flex-col ${idx % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-16 items-center`}
              >
                <div className="flex-1 space-y-8 text-left">
                  <div className="space-y-4">
                    <div className={`inline-block p-1 rounded-3xl bg-black shadow-2xl relative overflow-hidden group/project-icon`}>
                      {project.image ? (
                        <div className="w-16 h-16 rounded-2xl overflow-hidden">
                          <img src={project.image} alt={project.title} className="w-full h-full object-cover scale-[1.1]" />
                        </div>
                      ) : (
                        <div className={`p-4 bg-gradient-to-br ${project.color} text-white`}>
                          {idx === 0 ? <Cpu size={40} /> : idx === 1 ? <Globe size={40} /> : <Rocket size={40} />}
                        </div>
                      )}
                    </div>
                    <h3 className="text-4xl md:text-7xl font-black tracking-tighter text-white">{project.title}</h3>
                  </div>
                  <p className="text-lg md:text-2xl text-white/60 font-light leading-snug">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {project.tech.map(t => (
                      <span key={t} className="text-xs font-bold px-4 py-2 rounded-xl bg-slate-100 border border-slate-200 text-indigo-600 uppercase">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
                <Tilt className="flex-1 w-full aspect-[4/3] rounded-[4rem] overflow-hidden relative group cursor-pointer">
                  <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-20`} />
                  <div className="absolute inset-0 glass-vibrant" />

                  {/* Interactive Hover Window */}
                  {(project.links || project.highlights) && (
                    <div className="absolute inset-0 z-20 opacity-0 group-hover:opacity-100 transition-all duration-700 flex items-center justify-center p-8 lg:p-12 bg-black/60">
                      <div className="w-full h-full glass rounded-[3rem] p-8 flex flex-col justify-between border border-white/20 shadow-2xl backdrop-blur-3xl">
                        <div className="space-y-4">
                          <h4 className="text-sm font-black text-indigo-400 uppercase tracking-[0.3em]">{project.title}</h4>
                          <div className="flex flex-wrap gap-2">
                            {project.highlights?.map(h => (
                              <span key={h} className="text-[10px] font-bold px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/80">
                                {h}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="flex flex-col gap-3">
                          {project.links?.live && (
                            <a
                              href={project.links.live}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center justify-between p-4 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white transition-all group/link shadow-xl shadow-indigo-500/20"
                            >
                              <span className="text-sm font-black uppercase tracking-widest">Live Demo</span>
                              <ExternalLink size={18} className="group-hover:translate-x-0.5 transition-transform" />
                            </a>
                          )}
                          {project.links?.drive && (
                            <a
                              href={project.links.drive}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center justify-between p-4 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white transition-all group/link shadow-xl shadow-indigo-500/20"
                            >
                              <span className="text-sm font-black uppercase tracking-widest">Download APK</span>
                              <Download size={18} className="group-hover:translate-y-0.5 transition-transform" />
                            </a>
                          )}
                          {project.links?.github && (
                            <a
                              href={project.links.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 text-white transition-all group/link"
                            >
                              <span className="text-sm font-black uppercase tracking-widest">Source_Code</span>
                              <Github size={18} className="group-hover:rotate-12 transition-transform opacity-60 group-hover:opacity-100" />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="absolute inset-0 flex items-center justify-center p-12">
                    {project.image ? (
                      <div className="relative w-full h-full rounded-[3rem] overflow-hidden bg-black shadow-2xl border border-white/5">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover scale-[1.05] transition-transform duration-1000 group-hover:scale-125 group-hover:blur-xl"
                        />
                      </div>
                    ) : (
                      <div className="text-[12px] font-bold text-white font-black uppercase tracking-[0.5em] opacity-30 italic">Render_Matrix</div>
                    )}
                  </div>
                </Tilt>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="pt-32 text-center"
          >
            <a
              href="https://github.com/Edge-Explorer"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex flex-col items-center gap-6"
            >
              <p className="text-2xl md:text-3xl font-bold text-white/40 group-hover:text-indigo-400 transition-colors duration-500 max-w-2xl px-4">
                Bridging the gap between innovative vision and high-performance execution through intelligent systems engineering.
              </p>
              <div className="flex items-center gap-4 px-10 py-5 rounded-full glass border border-white/5 group-hover:border-indigo-500/50 group-hover:bg-indigo-500/10 transition-all duration-500 shadow-2xl">
                <span className="text-xs font-black uppercase tracking-[0.3em] text-white/60 group-hover:text-white transition-colors">Neural Repository</span>
                <Github size={18} className="group-hover:rotate-12 transition-transform opacity-60 group-hover:opacity-100 text-white" />
              </div>
            </a>
          </motion.div>
        </motion.section>

        <motion.footer
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="w-full py-20 border-t border-white/5 mt-32 text-center space-y-4"
        >
          <p className="text-[10px] font-bold text-white/20 uppercase tracking-[1em]">Karan Rohidas Shelar</p>
        </motion.footer>

      </div >
    </main >
  );
}

function SocialLink({ icon, href, label }: { icon: React.ReactNode; href: string; label: string }) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ y: -5, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="flex items-center gap-3 px-6 py-3 glass rounded-2xl hover:text-indigo-400 hover:border-indigo-500/50 transition-all duration-300 group relative overflow-hidden"
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:animate-shimmer"
      />
      <span className="text-white/40 group-hover:text-indigo-400 transition-colors relative z-10">{icon}</span>
      <span className="text-sm font-bold text-white/60 group-hover:text-white transition-colors uppercase tracking-widest relative z-10">{label}</span>
    </motion.a>
  );
}