"use client";

import React from 'react';

const SpaceBackground: React.FC = () => {
    return (
        <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none bg-slate-50">
            {/* Light overlay for white theme */}
            <div className="absolute inset-0 bg-white/30 z-10" />

            <video
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover opacity-40 grayscale-[0.5] contrast-[0.8] brightness-[1.2]"
            >
                {/* User can put their space video link here */}
                <source src="/background.mp4" type="video/mp4" />
                {/* Fallback image or simple dark space feel */}
            </video>

            {/* Ambient Nebula Glows - Adjusted for light theme */}
            <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-indigo-500/10 blur-[120px] rounded-full animate-float opacity-50" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-purple-500/10 blur-[120px] rounded-full animate-float delay-700 opacity-50" />
        </div>
    );
};

export default SpaceBackground;
