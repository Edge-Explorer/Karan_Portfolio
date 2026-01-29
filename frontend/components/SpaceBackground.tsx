"use client";

import React from 'react';

const SpaceBackground: React.FC = () => {
    return (
        <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
            {/* Dark overlay to ensure text readability */}
            <div className="absolute inset-0 bg-[#030303]/60 z-10" />

            {/* If video exists, it will play here. For now, we provide a placeholder gradient/stars feel */}
            <video
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover opacity-30"
            >
                {/* User can put their space video link here */}
                <source src="/background.mp4" type="video/mp4" />
                {/* Fallback image or simple dark space feel */}
            </video>

            {/* Ambient Nebula Glows */}
            <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-500/10 blur-[120px] rounded-full animate-pulse" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-500/10 blur-[120px] rounded-full animate-pulse delay-700" />
        </div>
    );
};

export default SpaceBackground;
