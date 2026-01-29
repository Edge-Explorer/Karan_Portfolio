"use client";

import React from 'react';

const SpaceBackground: React.FC = () => {
    return (
        <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none bg-[#030303]">
            {/* Dark overlay to ensure text readability */}
            <div className="absolute inset-0 bg-black/40 z-10" />

            {/* If video exists, it will play here. For now, we provide a placeholder gradient/stars feel */}
            <video
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover opacity-60"
            >
                {/* User can put their space video link here */}
                <source src="/background.mp4" type="video/mp4" />
                {/* Fallback image or simple dark space feel */}
            </video>

            {/* Ambient Nebula Glows */}
            <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-indigo-500/15 blur-[120px] rounded-full animate-pulse" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-purple-500/15 blur-[120px] rounded-full animate-pulse delay-700" />
        </div>
    );
};

export default SpaceBackground;
