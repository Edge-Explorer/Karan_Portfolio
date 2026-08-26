"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import NeuralReveal from "@/components/NeuralReveal";

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

  // Split the calendar days into columns of 7 days (weeks)
  const weeks: ContributionDay[][] = [];
  for (let i = 0; i < calendar.length; i += 7) {
    weeks.push(calendar.slice(i, i + 7));
  }

  // Calculate month label offsets based on week columns
  const getMonthLabels = () => {
    const labels: { text: string; colIndex: number }[] = [];
    let currentMonth = "";

    weeks.forEach((week, index) => {
      if (week.length > 0) {
        const date = new Date(week[0].date);
        const monthName = date.toLocaleString("en-US", { month: "short" });
        if (monthName !== currentMonth) {
          labels.push({ text: monthName, colIndex: index });
          currentMonth = monthName;
        }
      }
    });

    return labels;
  };

  const monthLabels = getMonthLabels();

  // Custom mapping to force GitHub dark theme colors
  const getGithubColor = (count: number) => {
    if (count === 0) return "#161b22";
    if (count <= 3) return "#0e4429";
    if (count <= 6) return "#006d32";
    if (count <= 9) return "#26a641";
    return "#39d353";
  };

  // Activity ratios
  const totalActions = stats.commits + stats.prs + stats.reviews + stats.issues || 1;
  const commitPct = Math.round((stats.commits / totalActions) * 100);
  const prPct = Math.round((stats.prs / totalActions) * 100);
  const reviewPct = Math.round((stats.reviews / totalActions) * 100);
  const issuePct = Math.round((stats.issues / totalActions) * 100);

  // SVG Radar calculations (Center: 100, 100)
  const maxRadius = 70;
  const commitX = 100 - (stats.commits / totalActions) * maxRadius;
  const prY = 100 + (stats.prs / totalActions) * maxRadius;
  const reviewY = 100 - (stats.reviews / totalActions) * maxRadius;
  const issueX = 100 + (stats.issues / totalActions) * maxRadius;

  const polygonPath = `M 100 ${reviewY} L ${issueX} 100 L 100 ${prY} L ${commitX} 100 Z`;

  const formatDate = (dateStr: string) => {
    const options: Intl.DateTimeFormatOptions = { weekday: "long", year: "numeric", month: "short", day: "numeric" };
    return new Date(dateStr).toLocaleDateString("en-US", options);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-6 py-32 space-y-24">
      <div className="flex flex-col items-center text-center space-y-8">
        <h2 className="text-6xl md:text-8xl font-black tracking-tighter leading-none text-indigo-400">
          <NeuralReveal text="GitHub Contributions" />
        </h2>
      </div>

      {/* Main Glass Card (Matching Featured Ventures & Skillset design) */}
      <div className="glass rounded-[3rem] p-8 md:p-12 border border-white/10 shadow-2xl backdrop-blur-3xl space-y-8">
        
        {/* Header statistics info */}
        <div className="flex justify-between items-center text-xs text-white/50">
          <span className="text-sm font-bold text-white/80">
            {stats.total_contributions.toLocaleString()} contributions in 2026
          </span>
          <span className="cursor-pointer hover:text-indigo-400">Contribution settings ▼</span>
        </div>

        {/* Scrollable grid area */}
        <div className="relative overflow-x-auto pb-4 scrollbar-hide">
          <div className="flex gap-[3px] min-w-[760px] select-none">
            
            {/* Day Labels Column */}
            <div className="flex flex-col justify-between text-[9px] text-white/40 font-mono h-[88px] pr-2 pt-5 select-none">
              <span>Mon</span>
              <span>Wed</span>
              <span>Fri</span>
            </div>

            {/* Grid container with months at the top */}
            <div className="flex flex-col gap-1 flex-1 relative">
              {/* Months Row */}
              <div className="relative h-4 text-[9px] text-white/40 font-mono select-none">
                {monthLabels.map((label, idx) => (
                  <span
                    key={idx}
                    className="absolute"
                    style={{ left: `${label.colIndex * 13}px` }}
                  >
                    {label.text}
                  </span>
                ))}
              </div>

              {/* Heatmap days */}
              <div className="flex gap-[3px]">
                {weeks.map((week, wIdx) => (
                  <div key={wIdx} className="flex flex-col gap-[3px]">
                    {week.map((day, dIdx) => (
                      <div
                        key={dIdx}
                        className="w-[10px] h-[10px] rounded-[2px] transition-all hover:scale-125 cursor-pointer"
                        style={{ backgroundColor: getGithubColor(day.count) }}
                        onMouseEnter={() => setHoveredDay(day)}
                        onMouseLeave={() => setHoveredDay(null)}
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Tooltip Box */}
          {hoveredDay && (
            <div className="absolute top-[-36px] left-1/2 -translate-x-1/2 z-50 bg-[#161b22] border border-white/10 px-3 py-1 rounded-md text-[10px] font-mono text-[#c9d1d9] shadow-2xl pointer-events-none whitespace-nowrap">
              {hoveredDay.count} {hoveredDay.count === 1 ? "contribution" : "contributions"} on {formatDate(hoveredDay.date)}
            </div>
          )}
        </div>

        {/* Bottom bar of calendar */}
        <div className="flex justify-between items-center text-[10px] text-white/40 border-t border-white/10 pt-4">
          <a 
            href="https://docs.github.com/articles/why-are-my-contributions-not-showing-up-on-my-profile" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="hover:text-indigo-400"
          >
            Learn how we count contributions
          </a>
          <div className="flex items-center gap-1">
            <span>Less</span>
            <div className="w-[10px] h-[10px] bg-[#161b22] rounded-[2px]" />
            <div className="w-[10px] h-[10px] bg-[#0e4429] rounded-[2px]" />
            <div className="w-[10px] h-[10px] bg-[#006d32] rounded-[2px]" />
            <div className="w-[10px] h-[10px] bg-[#26a641] rounded-[2px]" />
            <div className="w-[10px] h-[10px] bg-[#39d353] rounded-[2px]" />
            <span>More</span>
          </div>
        </div>

        {/* Organization row inside card */}
        <div className="border-t border-white/10 pt-6 space-y-4">
          <h4 className="text-[10px] font-semibold text-white/40 uppercase tracking-wider">
            Organizations & Affiliations
          </h4>
          {organizations.length > 0 ? (
            <div className="flex flex-wrap gap-2.5">
              {organizations.map((org) => (
                <a
                  key={org.login}
                  href={org.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-4 py-2 bg-white/5 border border-white/10 hover:border-indigo-500/40 rounded-2xl text-white/80 hover:text-white transition-all group"
                >
                  <img src={org.avatar_url} alt={org.login} className="w-5 h-5 rounded bg-white/10" />
                  <span className="text-[11px] font-bold font-mono">@{org.login}</span>
                </a>
              ))}
            </div>
          ) : (
            <div className="flex flex-wrap gap-2.5">
              <div className="flex items-center gap-3 px-4 py-2 bg-white/5 border border-white/10 rounded-2xl text-white/80">
                <div className="w-5 h-5 bg-pink-500/20 rounded flex items-center justify-center text-pink-400 text-[8px]">🦙</div>
                <span className="text-[11px] font-bold font-mono">@run-llama</span>
              </div>
              <div className="flex items-center gap-3 px-4 py-2 bg-white/5 border border-white/10 rounded-2xl text-white/80">
                <div className="w-5 h-5 bg-orange-500/20 rounded flex items-center justify-center text-orange-400 text-[8px]">V</div>
                <span className="text-[11px] font-bold font-mono">@vllm-project</span>
              </div>
              <div className="flex items-center gap-3 px-4 py-2 bg-white/5 border border-white/10 rounded-2xl text-white/80">
                <div className="w-5 h-5 bg-yellow-500/20 rounded flex items-center justify-center text-yellow-400 text-[8px]">🤗</div>
                <span className="text-[11px] font-bold font-mono">@huggingface</span>
              </div>
            </div>
          )}
        </div>

        {/* Split row: Activity overview & Radar chart */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-white/10 pt-6">
          
          {/* Left Column: Repository list */}
          <div className="space-y-4">
            <h4 className="text-[11px] font-semibold text-white/40 uppercase tracking-wider">
              Activity Overview
            </h4>
            <div className="text-sm text-white/70 space-y-2 leading-relaxed">
              <p>
                Contributed to{" "}
                <a href="https://github.com/Edge-Explorer/QuantIQ" target="_blank" rel="noopener" className="text-indigo-400 font-bold hover:underline">Edge-Explorer/QuantIQ</a>,{" "}
                <a href="https://github.com/Edge-Explorer/Interview-Prep" target="_blank" rel="noopener" className="text-indigo-400 font-bold hover:underline">Edge-Explorer/Interview-Prep</a>,{" "}
                <a href="https://github.com/Edge-Explorer/Karan_Portfolio" target="_blank" rel="noopener" className="text-indigo-400 font-bold hover:underline">Edge-Explorer/Karan_Portfolio</a>, and other repositories.
              </p>
            </div>
          </div>

          {/* Right Column: Coordinate graph */}
          <div className="flex justify-center md:justify-end items-center">
            <div className="relative w-48 h-48 bg-slate-900/40 border border-white/10 rounded-3xl p-4 flex items-center justify-center shadow-xl backdrop-blur-2xl">
              <svg width="150" height="150" className="overflow-visible select-none">
                {/* Axes grid lines */}
                <line x1="75" y1="15" x2="75" y2="135" stroke="rgba(255,255,255,0.06)" strokeWidth="1.5" />
                <line x1="15" y1="75" x2="135" y2="75" stroke="rgba(255,255,255,0.06)" strokeWidth="1.5" />
                
                {/* Active axis highlighting */}
                <line x1="75" y1="20" x2="75" y2="130" stroke="rgba(34,197,94,0.2)" strokeWidth="1.5" />
                <line x1="20" y1="75" x2="130" y2="75" stroke="rgba(34,197,94,0.2)" strokeWidth="1.5" />

                {/* Data polygon */}
                <polygon
                  points={`M 75 ${reviewY * 0.75} L ${issueX * 0.75} 75 L 75 ${prY * 0.75} L ${commitX * 0.75} 75 Z`}
                  fill="rgba(34,197,94,0.15)"
                  stroke="#22c55e"
                  strokeWidth="1.5"
                />

                {/* Central point */}
                <circle cx="75" cy="75" r="3" fill="#ffffff" stroke="#22c55e" strokeWidth="1.5" />

                {/* Axis Labels */}
                <text x="75" y="8" textAnchor="middle" fill="rgba(255,255,255,0.4)" className="text-[7px] uppercase tracking-wider font-mono">Code review</text>
                <text x="75" y="146" textAnchor="middle" fill="rgba(255,255,255,0.4)" className="text-[7px] uppercase tracking-wider font-mono">Pull requests</text>
                <text x="8" y="77" textAnchor="end" fill="rgba(255,255,255,0.4)" className="text-[7px] uppercase tracking-wider font-mono">Commits</text>
                <text x="142" y="77" textAnchor="start" fill="rgba(255,255,255,0.4)" className="text-[7px] uppercase tracking-wider font-mono">Issues</text>

                {/* Percentage overlays */}
                <text x={commitX * 0.75 - 10} y="71" textAnchor="middle" fill="#22c55e" className="text-[9px] font-bold font-mono">{commitPct}%</text>
                <text x="75" y={prY * 0.75 + 12} textAnchor="middle" fill="#22c55e" className="text-[9px] font-bold font-mono">{prPct}%</text>
                <text x="75" y={reviewY * 0.75 - 4} textAnchor="middle" fill="#22c55e" className="text-[9px] font-bold font-mono">{reviewPct}%</text>
                <text x={issueX * 0.75 + 10} y="71" textAnchor="middle" fill="#22c55e" className="text-[9px] font-bold font-mono">{issuePct}%</text>
              </svg>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
