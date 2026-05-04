import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiHome, FiArrowLeft, FiAlertCircle } from 'react-icons/fi';

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="max-w-2xl w-full text-center">
        {/* Large Visual Element */}
        <div className="relative mb-8">
          <h1 className="text-[12rem] md:text-[16rem] font-black text-slate-100 leading-none select-none">
            404
          </h1>
          <div className="absolute inset-0 flex flex-col items-center justify-center pt-10">
            <div className="w-20 h-20 bg-blue-600 rounded-[2rem] flex items-center justify-center text-white text-4xl shadow-2xl shadow-blue-200 animate-bounce">
              <FiAlertCircle />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-4">
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
            Lost in the Cloud?
          </h2>
          <p className="text-slate-500 max-w-md mx-auto leading-relaxed">
            The page you are looking for might have been removed, had its name changed, 
            or is temporarily unavailable in the <b>HSclassroom</b> database.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button 
            onClick={() => navigate(-1)}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white border border-slate-200 text-slate-600 font-bold hover:bg-slate-50 transition-all flex items-center justify-center gap-2"
          >
            <FiArrowLeft /> Go Back
          </button>
          
          <button 
            onClick={() => navigate('/')}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-slate-900 text-white font-bold hover:bg-blue-600 transition-all shadow-lg shadow-slate-200 flex items-center justify-center gap-2"
          >
            <FiHome /> Back to Dashboard
          </button>
        </div>

        {/* Decorative Footer */}
        <div className="mt-20 pt-8 border-t border-slate-200/60 max-w-xs mx-auto">
          <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em]">
            HSclassroom Learning Engine
          </p>
        </div>
      </div>
    </div>
  );
}

export default NotFound;