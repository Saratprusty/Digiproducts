import React from 'react';
import { Sparkles, ShieldCheck, Target, Zap, Globe, Users } from 'lucide-react';

export const AboutView: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-sky-500/10 text-sky-400 border border-sky-500/20 uppercase tracking-wider">
          Our Philosophy
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Crafting the AI Operating System for High-Growth Teams
        </h1>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          Digi Products Hub was founded on a simple conviction: modern teams shouldn't have to juggle
          twenty disjointed subscriptions to write blogs, parse transcripts, recover failed payments,
          and rank inside AI search engines.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="p-6 rounded-2xl border border-slate-800 bg-[#151B2B] space-y-3">
          <div className="w-10 h-10 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center">
            <Target className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-white">Unified Execution</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            One single account, unified API billing, and shared project folders across 22+ specialized tools.
          </p>
        </div>

        <div className="p-6 rounded-2xl border border-slate-800 bg-[#151B2B] space-y-3">
          <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center">
            <Globe className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-white">The AEO/GEO Frontier</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Pioneering Answer Engine Optimization to ensure modern brands are cited in ChatGPT, Perplexity, and Gemini.
          </p>
        </div>

        <div className="p-6 rounded-2xl border border-slate-800 bg-[#151B2B] space-y-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-white">Zero Data Compromise</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Your proprietary content, transcripts, and financial documents are never sold or used for public AI training.
          </p>
        </div>
      </div>
    </div>
  );
};
