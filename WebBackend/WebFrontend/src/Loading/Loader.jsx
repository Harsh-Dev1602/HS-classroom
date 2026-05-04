import React from 'react'

function Loader() {
    return (
        <div className="flex flex-col items-center justify-center w-full h-screen bg-[#f8fafc]">
            {/* Main Animated Container */}
            <div className="relative flex items-center justify-center">
                
                {/* Outer Ring - Slow Pulse */}
                <div className="absolute w-24 h-24 rounded-full border-4 border-blue-100 animate-ping opacity-20"></div>
                
                {/* Middle Ring - Spinning Gradient */}
                <div className="w-20 h-20 border-4 border-slate-100 border-t-blue-600 rounded-full animate-spin"></div>
                
                {/* Center Core - Brand Icon/Dot */}
                <div className="absolute w-10 h-10 bg-blue-600 rounded-2xl rotate-45 animate-pulse flex items-center justify-center shadow-lg shadow-blue-200">
                    {/* Minimalist "H" or Book icon shape */}
                    <div className="w-4 h-4 border-2 border-white rounded-sm -rotate-45"></div>
                </div>
            </div>

            {/* Loading Text */}
            <div className="mt-8 text-center animate__animated animate__fadeIn animate__infinite animate__slow">
                <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
                    HS<span className="text-blue-600">classroom</span>
                </h2>
                <div className="flex items-center justify-center gap-1 mt-2">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em]">Preparing your journey</span>
                    {/* Animated Dots */}
                    <span className="flex gap-1">
                        <span className="w-1 h-1 bg-blue-600 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                        <span className="w-1 h-1 bg-blue-600 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                        <span className="w-1 h-1 bg-blue-600 rounded-full animate-bounce"></span>
                    </span>
                </div>
            </div>
        </div>
    )
}

export default Loader