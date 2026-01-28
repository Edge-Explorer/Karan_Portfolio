"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  Github, Linkedin, Mail, ExternalLink, Code2, Cpu, Globe, Rocket, Sparkles,
  Terminal, Database, Layout, Smartphone, Cloud, Layers, Cpu as AiIcon,
  Binary, GitBranch, Box, FileCode, Search, Server, Monitor, GraduationCap, BookOpen,
  Activity, Zap, Instagram
} from "lucide-react";
import ChatInterface from "@/components/ChatInterface";
import ContactModal from "@/components/ContactModal";
import { useState } from "react";

const skills = [
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
      { name: "Expo", info: "Accelerated development for React Native.", local: "/skills/expo.png", color: "#000020" },
      { name: "Android", info: "Native mobile development for Android devices.", icon: "android", color: "#3ddc84" }
    ]
  },
  {
    group: "Backend & Cloud",
    items: [
      { name: "FastAPI", info: "High-performance Python API development.", icon: "fastapi", color: "#05998b" },
      { name: "PostgreSQL", info: "Robust, open-source relational database.", icon: "postgresql", color: "#4169e1" },
      { name: "Docker", info: "Containerization for consistent deployments.", icon: "docker", color: "#2496ed" },
      { name: "Flask", info: "Micro web framework for agile Python apps.", icon: "flask", color: "#ffffff" },
      { name: "Render", info: "Fast, simple cloud platform for web apps.", local: "/skills/render.jpg", color: "#46e3b7" },
      { name: "Alembic", info: "Database migration tool for SQLAlchemy.", lucide: Database, color: "#ed2124" }
    ]
  },
  {
    group: "Generative AI",
    items: [
      { name: "LangChain", info: "Framework for building LLM-powered apps.", local: "/skills/langchain.png", color: "#1c3c3c" },
      { name: "Google Gemini", info: "Multimodal AI models for generative tasks.", local: "/skills/gemini.png", color: "#8e75ff" },
      { name: "OpenAI", info: "Cutting-edge models like GPT-4 and DALL-E.", local: "/skills/openai.png", color: "#74aa9c" },
      { name: "Hugging Face", info: "Hub for modern transformers and public models.", local: "/skills/huggingface.png", color: "#ffbd45" },
      { name: "Ollama", info: "Running large language models locally.", local: "/skills/ollama.png", color: "#ffffff" },
      { name: "Keras", info: "Deep learning API for fast experimentation.", local: "/skills/keras.png", color: "#d00000" }
    ]
  },
  {
    group: "ML & Data Science",
    items: [
      { name: "TensorFlow", info: "Open-source platform for end-to-end ML.", icon: "tensorflow", color: "#ff6f00" },
      { name: "PyTorch", info: "Flexible deep learning for research and prod.", icon: "pytorch", color: "#ee4c2c" },
      { name: "Scikit Learn", info: "Simple and efficient tools for predictive data.", local: "/skills/scikitlearn.jpg", color: "#f7931e" },
      { name: "Pandas", info: "Powerful data manipulation and analysis.", icon: "pandas", color: "#150458" },
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
    title: "NEEL",
    description: "Mobile Life Coach with real-time feedback loop and emotional intelligence.",
    tech: ["React Native", "Flask", "Docker", "TensorFlow"],
    color: "from-orange-500 to-red-500",
  },
  {
    title: "Documind-AI",
    description: "Enterprise-grade document query system using RAG and vector embeddings.",
    tech: ["PostgreSQL", "FastAPI", "OpenAI", "LangChain"],
    color: "from-purple-500 to-pink-500",
  },
  {
    title: "AI Tutor",
    description: "Personalized learning paths generated by Gemini 1.5 Pro with real-time feedback.",
    tech: ["Python", "React", "Gemini", "FastAPI"],
    color: "from-blue-500 to-cyan-500",
  }
];

function SkillLogo({ skill }: { skill: any }) {
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
  const [activeSkill, setActiveSkill] = useState<any | null>(null);

  return (
    <main className="min-h-screen bg-background text-white selection:bg-indigo-500/30 overflow-x-hidden bg-gradient-mesh pb-20">
      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
      <ChatInterface isOpen={isAIChatOpen} onClose={() => setIsAIChatOpen(false)} />

      <div className="relative max-w-7xl mx-auto px-6 py-12 lg:py-32 flex flex-col items-center">

        <motion.button
          onClick={() => setIsAIChatOpen(true)}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          whileHover={{ scale: 1.1, rotate: 5 }}
          className="fixed bottom-10 right-10 z-[150] group"
        >
          <div className="absolute -inset-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full blur-xl opacity-40 group-hover:opacity-100 transition duration-500 animate-pulse" />
          <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-white/20 glass shadow-2xl">
            <img src="/karan_image.png" alt="AI Agent" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-indigo-500/20 group-hover:bg-transparent transition-colors" />
            <div className="absolute bottom-1 right-1 w-6 h-6 bg-green-500 border-2 border-white rounded-full" />
          </div>
        </motion.button>

        <section className="w-full text-center lg:text-left space-y-16 mb-10 px-6">
          <div className="flex flex-col lg:flex-row items-center justify-center lg:justify-between max-w-7xl mx-auto gap-12 lg:gap-16">
            {/* Identity Column */}
            <div className="flex flex-col items-center lg:items-start space-y-10 order-2 lg:order-1">
              <div className="space-y-4">
                <motion.h1
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-4xl md:text-6xl lg:text-7xl xl:text-[5rem] font-black tracking-tighter leading-none bg-gradient-to-b from-white to-white/40 bg-clip-text text-transparent lg:whitespace-nowrap"
                >
                  Karan Rohidas Shelar
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-xl md:text-2xl lg:text-3xl text-indigo-400 font-bold tracking-[0.3em] uppercase leading-none"
                >
                  Generative AI Developer
                </motion.p>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-wrap justify-center lg:justify-start items-center gap-4 md:gap-6"
              >
                <motion.button
                  onClick={() => setIsContactOpen(true)}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative px-10 py-5 bg-white text-black font-black uppercase tracking-widest text-[10px] rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(255,255,255,0.1)] transition-all active:scale-95"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-indigo-500/10 to-transparent -translate-x-full animate-shimmer" />
                  <div className="relative z-10 flex items-center gap-3">
                    <Mail size={16} className="group-hover:rotate-12 transition-transform" />
                    <span>Connect Now</span>
                  </div>
                </motion.button>

                <div className="flex flex-wrap items-center gap-3">
                  <SocialLink icon={<Github size={20} />} href="https://github.com/Edge-Explorer" label="GitHub" />
                  <SocialLink icon={<Linkedin size={20} />} href="https://linkedin.com/in/karan-shelar-779381343" label="LinkedIn" />
                  <SocialLink icon={<Instagram size={20} />} href="https://instagram.com/karan.shelar.2004" label="Instagram" />
                  <SocialLink icon={<ExternalLink size={20} />} href="https://drive.google.com/file/d/1QhYwPLs4nQjjvCFuEEjYx0Q8Gbcc7GMb/view?usp=drive_link" label="Resume" />
                </div>
              </motion.div>
            </div>

            {/* Portrait Anchor - Brought Inside */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative group shrink-0 order-1 lg:order-2"
            >
              <div className="absolute -inset-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full blur-[30px] opacity-20 group-hover:opacity-100 transition duration-1000 animate-pulse"></div>
              <div className="relative w-52 h-52 md:w-64 md:h-64 lg:w-[21rem] lg:h-[21rem] rounded-full overflow-hidden border-2 border-white/10 shadow-[0_10px_60px_rgba(99,102,241,0.2)] bg-background">
                <img
                  src="/karan_image.png"
                  alt="Karan"
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
              </div>
            </motion.div>
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
        <section className="w-full max-w-7xl space-y-20 pt-12 pb-24 px-4">
          <div className="space-y-6 text-left max-w-3xl">
            <h2 className="text-sm font-black text-indigo-400 uppercase tracking-[0.5em]">Introduction</h2>
            <h3 className="text-6xl md:text-8xl font-black tracking-tighter text-white leading-none">Overview</h3>
            <p className="text-xl md:text-2xl text-white/60 font-medium leading-relaxed">
              I am a specialized Generative AI Developer focused on building the next generation of intelligent systems,
              scalable architectures, and immersive digital experiences.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: "Generative AI", desc: "Crafting advanced LLM solutions & neural agents.", img: "/overview/generative_ai.png", color: "from-blue-500/20 to-indigo-500/20", borderColor: "border-blue-500/30", textColor: "text-blue-400" },
              { title: "Data Scientist", desc: "Extracting insights from complex neural datasets.", img: "/overview/data_science.png", color: "from-purple-500/20 to-pink-500/20", borderColor: "border-purple-500/30", textColor: "text-purple-400" },
              { title: "Fullstack Eng", desc: "Architecting robust web & backend systems.", img: "/overview/fullstack.png", color: "from-green-500/20 to-emerald-500/20", borderColor: "border-green-500/30", textColor: "text-green-400" },
              { title: "Problem Solver", desc: "Solving bottlenecks with optimized logic.", img: "/overview/problem_solving.jpg", color: "from-orange-500/20 to-red-500/20", borderColor: "border-orange-500/30", textColor: "text-orange-400" },
            ].map((card, i) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -10 }}
                className={`group p-10 rounded-[3rem] glass border ${card.borderColor} bg-gradient-to-br ${card.color} hover:shadow-2xl transition-all duration-500 relative overflow-hidden`}
              >
                <div className="absolute -inset-10 bg-white/5 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="space-y-8 relative z-10">
                  <div className="w-16 h-16 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
                    <img src={card.img} alt={card.title} className="w-full h-full object-contain filter drop-shadow-2xl" />
                  </div>
                  <div className="space-y-2">
                    <h4 className={`text-xl font-black uppercase tracking-widest ${card.textColor}`}>{card.title}</h4>
                    <p className="text-sm text-white/50 font-medium leading-snug">{card.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ACADEMIC FOUNDATION SECTION */}
        <section className="w-full max-w-7xl space-y-20 py-24 px-4 overflow-hidden">
          <div className="flex flex-col items-center text-center space-y-6">
            <h2 className="text-sm font-black text-indigo-400 uppercase tracking-[0.5em] animate-pulse">Academic_Foundation</h2>
            <h3 className="text-6xl md:text-[8rem] font-black tracking-tighter text-white">Learning Path</h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {[
              {
                degree: "MCA Data Science",
                school: "Amity University Online",
                period: "2024 — Present",
                coursework: ["Machine Learning", "NLP", "Deep Learning", "Feature Engineering", "Model Evaluation", "SQL", "Database Systems"],
                icon: <GraduationCap className="text-blue-400" size={32} />,
                accent: "from-blue-500/10 to-indigo-500/10",
                borderColor: "border-blue-500/20"
              },
              {
                degree: "B.Sc. Information Technology",
                school: "Sanpada College of Commerce and Technology",
                period: "Graduated",
                details: "GPA: 8.88 / 10.0",
                coursework: ["Foundational IT", "Programming", "System Architecture", "Web Technologies", "Software Management"],
                icon: <BookOpen className="text-purple-400" size={32} />,
                accent: "from-purple-500/10 to-pink-500/10",
                borderColor: "border-purple-500/20"
              }
            ].map((edu, idx) => (
              <motion.div
                key={edu.degree}
                initial={{ opacity: 0, x: idx === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "circOut" }}
                className={`p-10 md:p-14 rounded-[4rem] glass border ${edu.borderColor} bg-gradient-to-br ${edu.accent} hover:border-indigo-500/40 transition-all duration-700 group relative`}
              >
                <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-500/5 blur-[80px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="space-y-10 relative z-10">
                  <div className="flex justify-between items-center">
                    <div className="p-5 rounded-3xl bg-white/5 border border-white/10 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500 shadow-2xl">
                      {edu.icon}
                    </div>
                    <div className="px-4 py-1.5 rounded-xl bg-white/5 border border-white/10 text-[10px] font-black text-white/30 uppercase tracking-[0.2em]">
                      {edu.period}
                    </div>
                  </div>

                  <div className="space-y-4 text-left">
                    <h4 className="text-4xl md:text-5xl font-black tracking-tight text-white leading-[1.1]">
                      {edu.degree}
                    </h4>
                    <p className="text-indigo-400 font-bold text-xl tracking-tight">{edu.school}</p>

                    {edu.details && (
                      <div className="inline-flex items-center gap-3 px-6 py-2 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 font-black text-[10px] uppercase tracking-widest">
                        <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
                        {edu.details}
                      </div>
                    )}
                  </div>

                  <div className="space-y-6 text-left pt-10 border-t border-white/5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-[1px] bg-white/10" />
                      <p className="text-[10px] font-black text-white/30 uppercase tracking-[0.3em]">Specialized Knowledge</p>
                    </div>
                    <div className="flex flex-wrap gap-2.5">
                      {edu.coursework.map(course => (
                        <span key={course} className="px-4 py-2 rounded-xl bg-white/5 border border-white/5 text-[10px] font-bold text-white/60 hover:text-white hover:border-indigo-500/40 hover:bg-indigo-500/10 transition-all cursor-default">
                          {course}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Unified Skillset Section */}
        <section className="w-full max-w-7xl space-y-24 py-32 border-y border-white/5">
          <div className="flex flex-col items-center text-center space-y-8">
            <h2 className="text-sm font-black text-indigo-400 uppercase tracking-[0.5em] animate-pulse">Neural_Capabilities</h2>
            <h3 className="text-7xl md:text-9xl font-black tracking-tighter text-white">Skillset</h3>
          </div>

          <div className="flex flex-wrap justify-center gap-x-12 gap-y-16 px-4">
            {skills.flatMap(group => group.items).map((skill, i) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.02 }}
                onMouseEnter={() => setActiveSkill(skill)}
                onMouseLeave={() => setActiveSkill(null)}
                className="flex flex-col items-center gap-6 group relative w-24 md:w-32"
              >
                {/* Improved Hover Glow */}
                <div className="absolute inset-0 bg-indigo-500/5 blur-[40px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Logo Container */}
                <div className="relative w-20 h-20 md:w-24 md:h-24 flex items-center justify-center transition-all duration-500 group-hover:-translate-y-3 cursor-help">
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
                      className="absolute bottom-full mb-6 z-[200] w-56 p-5 glass rounded-3xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] pointer-events-none"
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
        </section>

        <section className="w-full max-w-6xl space-y-24 py-32">
          <div className="flex flex-col items-center text-center space-y-6">
            <h2 className="text-6xl md:text-8xl font-black tracking-tighter leading-none">Selected <br /> <span className="text-indigo-500">Creations</span></h2>
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
                    <div className={`inline-block p-4 rounded-3xl bg-gradient-to-br ${project.color} text-white shadow-2xl`}>
                      {idx === 0 ? <Cpu size={40} /> : idx === 1 ? <Globe size={40} /> : <Rocket size={40} />}
                    </div>
                    <h3 className="text-5xl md:text-7xl font-black tracking-tighter">{project.title}</h3>
                  </div>
                  <p className="text-2xl text-white/60 font-light leading-snug">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {project.tech.map(t => (
                      <span key={t} className="text-xs font-bold px-4 py-2 rounded-xl bg-white/5 border border-white/5 text-indigo-400 uppercase">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex-1 w-full aspect-[4/3] rounded-[4rem] overflow-hidden relative group">
                  <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-20`} />
                  <div className="absolute inset-0 glass-vibrant" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-[12px] font-bold text-white font-black uppercase tracking-[0.5em] opacity-30">Render_Matrix</div>
                  </div>
                </div>
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
                Hungry for more? From neural architectures to full-stack pipelines, explore my complete digital laboratory.
              </p>
              <div className="flex items-center gap-4 px-10 py-5 rounded-full glass border border-white/5 group-hover:border-indigo-500/50 group-hover:bg-indigo-500/10 transition-all duration-500 shadow-2xl">
                <span className="text-xs font-black uppercase tracking-[0.3em] text-white/60 group-hover:text-white transition-colors">Neural Repository</span>
                <Github size={18} className="group-hover:rotate-12 transition-transform opacity-60 group-hover:opacity-100" />
              </div>
            </a>
          </motion.div>
        </section>

        <footer className="w-full py-20 border-t border-white/5 mt-32 text-center space-y-4">
          <p className="text-6xl font-black tracking-tighter opacity-10 uppercase">KRS 2026</p>
          <p className="text-[10px] font-bold text-white/20 uppercase tracking-[1em]">Karan Rohidas Shelar</p>
        </footer>

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
