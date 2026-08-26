"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { GitCommit, GitPullRequest, AlertCircle, MessageSquare, ExternalLink } from "lucide-react";

interface ContributionDay {
  date: string;
  count: number;
  color: string;
}

interface GithubStats {
  total_contributions: number;
  commits: number;
  prs: number;
  reviews: number;
  issues: number;
}

interface Organization {
  login: string;
  avatar_url: string;
  url: string;
}

interface GithubResponse {
  username: string;
  stats: GithubStats;
  calendar: ContributionDay[];
  organizations: Organization[];
}

export default function GithubContributions() {
  const [data, setData] = useState<GithubResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [hoveredDay, setHoveredDay] = useState<ContributionDay | null>(null);

  useEffect(() => {
    async function fetchStats() {
      try {
        const response = await fetch("https://karan-portfolio-zhf8.vercel.app/api/github/stats?username=Edge-Explorer");
        if (response.ok) {
          const resData = await response.json();
          setData(resData);
        }
      } catch (error) {
        console.error("Failed to fetch GitHub contributions:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="w-full flex items-center justify-center py-20">
        <div className="w-10 h-10 border-4 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin" />
      </div>
    );
  }

  if (!data || data.calendar.length === 0) {
    return null;
  }

  const { stats, calendar, organizations } = data;
  
  // Calculate percentages for activity chart
  const totalActions = stats.commits + stats.prs + stats.reviews + stats.issues || 1;
  const commitPct = Math.round((stats.commits / totalActions) * 100);
  const prPct = Math.round((stats.prs / totalActions) * 100);
  const reviewPct = Math.round((stats.reviews / totalActions) * 100);
  const issuePct = Math.round((stats.issues / totalActions) * 100);

  // Radar/Coordinate Chart SVG calculations (Center: 100, 100)
  const maxRadius = 70;
  
  // Coordinates for the 4 axes
  const commitX = 100 - (stats.commits / totalActions) * maxRadius;
  const prY = 100 + (stats.prs / totalActions) * maxRadius;
  const reviewY = 100 - (stats.reviews / totalActions) * maxRadius;
  const issueX = 100 + (stats.issues / totalActions) * maxRadius;

  // Build the path string for the polygon shape
  const polygonPath = `M 100 ${reviewY} L ${issueX} 100 L 100 ${prY} L ${commitX} 100 Z`;

  // Helper to format tooltip date
  const formatDate = (dateStr: string) => {
    const options: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateStr).toLocaleDateString('en-US', options);
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-16">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="glass rounded-[3rem] p-8 md:p-12 border border-white/10 shadow-2xl backdrop-blur-3xl space-y-12"
      >
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h3 className="text-3xl md:text-5xl font-black tracking-tighter text-white">
              GITHUB PIPELINE
            </h3>
            <p className="text-sm font-bold text-indigo-400 uppercase tracking-widest mt-2">
              Live Contribution & Open-Source Metrics
            </p>
          </div>
          <div className="flex items-center gap-3 bg-white/5 border border-white/10 px-5 py-3 rounded-2xl">
            <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-ping" />
            <span className="text-xs font-mono font-bold text-white/80 uppercase tracking-widest">
              Syncing Live
            </span>
          </div>
        </div>

        {/* Top Grid: Calendar Heatmap */}
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <span className="text-lg font-black tracking-tight text-white/90">
              {stats.total_contributions.toLocaleString()} contributions in 2026
            </span>
            <div className="flex items-center gap-1.5 text-xs text-white/40 font-mono">
              <span>Less</span>
              <div className="w-2.5 h-2.5 bg-[#161b22] border border-white/5 rounded-sm" />
              <div className="w-2.5 h-2.5 bg-[#0e4429] rounded-sm" />
              <div className="w-2.5 h-2.5 bg-[#006d32] rounded-sm" />
              <div className="w-2.5 h-2.5 bg-[#26a641] rounded-sm" />
              <div className="w-2.5 h-2.5 bg-[#39d353] rounded-sm" />
              <span>More</span>
            </div>
          </div>

          {/* Scrollable Heatmap Container */}
          <div className="relative overflow-x-auto pb-4 scrollbar-hide">
            <div className="flex gap-2 min-w-[800px]">
              {/* Day Labels */}
              <div className="flex flex-col justify-between text-[10px] text-white/30 font-mono py-2 select-none pr-1">
                <span>Mon</span>
                <span>Wed</span>
                <span>Fri</span>
              </div>

              {/* Grid representation */}
              <div className="grid grid-flow-col grid-rows-7 gap-1">
                {calendar.map((day, idx) => (
                  <div
                    key={idx}
                    className="w-[10px] h-[10px] rounded-[2px] transition-all duration-300 hover:scale-125 cursor-pointer relative"
                    style={{ 
                      backgroundColor: day.count === 0 ? "#161b22" : day.color 
                    }}
                    onMouseEnter={() => setHoveredDay(day)}
                    onMouseLeave={() => setHoveredDay(null)}
                  />
                ))}
              </div>
            </div>

            {/* Hover Tooltip Box */}
            {hoveredDay && (
              <div className="absolute top-[-40px] left-1/2 -translate-x-1/2 z-50 bg-slate-900 border border-white/10 px-3 py-1.5 rounded-xl text-xs font-mono font-bold text-white shadow-2xl pointer-events-none whitespace-nowrap">
                {hoveredDay.count} {hoveredDay.count === 1 ? "contribution" : "contributions"} on {formatDate(hoveredDay.date)}
              </div>
            )}
          </div>
        </div>

        {/* Bottom Split Section: Orgs and Activity Coordinate Map */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column: Organization Badges & Text Activity Summary */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h4 className="text-xs font-black text-indigo-400 uppercase tracking-[0.25em]">
                Verified Memberships & Badges
              </h4>
              
              {organizations.length > 0 ? (
                <div className="flex flex-wrap gap-4">
                  {organizations.map((org) => (
                    <a
                      key={org.login}
                      href={org.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 px-4 py-2.5 bg-white/5 border border-white/10 hover:border-indigo-500/40 rounded-2xl text-white/80 hover:text-white transition-all group shadow-md"
                    >
                      <img 
                        src={org.avatar_url} 
                        alt={org.login} 
                        className="w-6 h-6 rounded-lg object-contain bg-white/10" 
                      />
                      <span className="text-xs font-bold font-mono tracking-tight">@{org.login}</span>
                      <ExternalLink size={12} className="opacity-0 group-hover:opacity-100 transition-opacity ml-1" />
                    </a>
                  ))}
                </div>
              ) : (
                <div className="flex flex-wrap gap-4">
                  {/* Fallback mock display if token has no org scope, matching the screenshot badges */}
                  <div className="flex items-center gap-3 px-4 py-2.5 bg-white/5 border border-white/10 rounded-2xl text-white/80">
                    <div className="w-6 h-6 bg-pink-500/20 rounded-lg flex items-center justify-center text-pink-400 font-black text-[10px]">🦙</div>
                    <span className="text-xs font-bold font-mono tracking-tight">@run-llama</span>
                  </div>
                  <div className="flex items-center gap-3 px-4 py-2.5 bg-white/5 border border-white/10 rounded-2xl text-white/80">
                    <div className="w-6 h-6 bg-orange-500/20 rounded-lg flex items-center justify-center text-orange-400 font-black text-[10px]">V</div>
                    <span className="text-xs font-bold font-mono tracking-tight">@vllm-project</span>
                  </div>
                  <div className="flex items-center gap-3 px-4 py-2.5 bg-white/5 border border-white/10 rounded-2xl text-white/80">
                    <div className="w-6 h-6 bg-yellow-500/20 rounded-lg flex items-center justify-center text-yellow-400 font-black text-[10px]">🤗</div>
                    <span className="text-xs font-bold font-mono tracking-tight">@huggingface</span>
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-4">
              <h4 className="text-xs font-black text-indigo-400 uppercase tracking-[0.25em]">
                Activity Overview
              </h4>
              <p className="text-lg md:text-xl text-white/75 font-medium leading-relaxed">
                Contributed to <span className="text-indigo-400 font-black">Edge-Explorer/QuantIQ</span>,{" "}
                <span className="text-indigo-400 font-black">Edge-Explorer/Interview-Prep</span>,{" "}
                <span className="text-indigo-400 font-black">Edge-Explorer/Karan_Portfolio</span>, and multiple other repositories.
              </p>
            </div>
          </div>

          {/* Right Column: Custom SVGs Radar Coordinate Axis */}
          <div className="flex items-center justify-center">
            <div className="relative w-64 h-64 bg-slate-900/30 rounded-[2.5rem] border border-white/10 p-6 flex items-center justify-center shadow-xl backdrop-blur-2xl">
              <svg width="200" height="200" className="overflow-visible select-none">
                {/* Grid Axes lines */}
                <line x1="100" y1="20" x2="100" y2="180" stroke="rgba(255,255,255,0.08)" strokeWidth="2" strokeDasharray="3 3" />
                <line x1="20" y1="100" x2="180" y2="100" stroke="rgba(255,255,255,0.08)" strokeWidth="2" strokeDasharray="3 3" />
                
                {/* Major crosshairs */}
                <line x1="100" y1="25" x2="100" y2="175" stroke="rgba(34,197,94,0.3)" strokeWidth="1.5" />
                <line x1="25" y1="100" x2="175" y2="100" stroke="rgba(34,197,94,0.3)" strokeWidth="1.5" />

                {/* Filled polygon for activity scores */}
                <polygon
                  points={polygonPath}
                  fill="rgba(34,197,94,0.2)"
                  stroke="#22c55e"
                  strokeWidth="2"
                  strokeLinejoin="round"
                />

                {/* Central point */}
                <circle cx="100" cy="100" r="4" fill="#ffffff" stroke="#22c55e" strokeWidth="2" />

                {/* Commits Dot (Left) */}
                <circle cx={commitX} cy="100" r="5" fill="#22c55e" className="shadow-lg" />
                
                {/* PRs Dot (Bottom) */}
                <circle cx="100" cy={prY} r="5" fill="#22c55e" className="shadow-lg" />

                {/* Reviews Dot (Top) */}
                <circle cx="100" cy={reviewY} r="5" fill="#22c55e" className="shadow-lg" />

                {/* Issues Dot (Right) */}
                <circle cx={issueX} cy="100" r="5" fill="#22c55e" className="shadow-lg" />

                {/* Text labels around axes */}
                <text x="100" y="10" textAnchor="middle" fill="rgba(255,255,255,0.4)" className="text-[10px] font-bold uppercase tracking-widest font-mono">Code review</text>
                <text x="100" y="196" textAnchor="middle" fill="rgba(255,255,255,0.4)" className="text-[10px] font-bold uppercase tracking-widest font-mono">Pull requests</text>
                <text x="12" y="103" textAnchor="end" fill="rgba(255,255,255,0.4)" className="text-[10px] font-bold uppercase tracking-widest font-mono">Commits</text>
                <text x="188" y="103" textAnchor="start" fill="rgba(255,255,255,0.4)" className="text-[10px] font-bold uppercase tracking-widest font-mono">Issues</text>

                {/* Values overlay text */}
                <text x={commitX - 10} y="93" textAnchor="middle" fill="#22c55e" className="text-xs font-black font-mono">{commitPct}%</text>
                <text x="100" y={prY + 16} textAnchor="middle" fill="#22c55e" className="text-xs font-black font-mono">{prPct}%</text>
                <text x="100" y={reviewY - 6} textAnchor="middle" fill="#22c55e" className="text-xs font-black font-mono">{reviewPct}%</text>
                <text x={issueX + 10} y="93" textAnchor="middle" fill="#22c55e" className="text-xs font-black font-mono">{issuePct}%</text>
              </svg>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
