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
        </div>

        {/* Scrollable grid area */}
        <div className="relative overflow-x-auto pb-4 scrollbar-hide">
          <div className="flex gap-[4px] min-w-[980px] select-none">
            
            {/* Day Labels Column */}
            <div className="flex flex-col justify-between text-[10px] text-white/40 font-mono h-[122px] pr-2 pt-6 pb-1 select-none">
              <span>Mon</span>
              <span>Wed</span>
              <span>Fri</span>
            </div>

            {/* Grid container with months at the top */}
            <div className="flex flex-col gap-1.5 flex-1 relative">
              {/* Months Row */}
              <div className="relative h-5 text-[10px] text-white/40 font-mono select-none">
                {monthLabels.map((label, idx) => (
                  <span
                    key={idx}
                    className="absolute"
                    style={{ left: `${label.colIndex * 18}px` }}
                  >
                    {label.text}
                  </span>
                ))}
              </div>

              {/* Heatmap days */}
              <div className="flex gap-[4px]">
                {weeks.map((week, wIdx) => (
                  <div key={wIdx} className="flex flex-col gap-[4px]">
                    {week.map((day, dIdx) => (
                      <div
                        key={dIdx}
                        className="w-[14px] h-[14px] rounded-[2px] transition-all hover:scale-125 cursor-pointer"
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
          <div className="flex items-center gap-1.5">
            <span>Less</span>
            <div className="w-[14px] h-[14px] bg-[#161b22] rounded-[2px]" />
            <div className="w-[14px] h-[14px] bg-[#0e4429] rounded-[2px]" />
            <div className="w-[14px] h-[14px] bg-[#006d32] rounded-[2px]" />
            <div className="w-[14px] h-[14px] bg-[#26a641] rounded-[2px]" />
            <div className="w-[14px] h-[14px] bg-[#39d353] rounded-[2px]" />
            <span>More</span>
          </div>
        </div>

      </div>
    </div>
  );
}
