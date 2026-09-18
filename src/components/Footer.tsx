import React from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Github, Twitter, Linkedin, Heart } from 'lucide-react';
import { NavigationTab } from '../types';

interface FooterProps {
  onNavigate: (tab: NavigationTab) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="border-t border-purple-200/70 bg-white/60 backdrop-blur-md text-slate-600 relative overflow-hidden">
      {/* Decorative ambient glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-64 bg-gradient-to-t from-purple-500/10 via-sky-400/5 to-transparent blur-3xl pointer-events-none" />

      {/* Top CTA Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 border-b border-purple-100">
        <div className="rounded-2xl p-8 sm:p-12 bg-gradient-to-br from-white/95 via-purple-50/80 to-sky-50/90 border border-purple-200/80 shadow-xl relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-2xl text-center lg:text-left">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-purple-100 text-purple-700 border border-purple-200">
              <Sparkles className="w-3.5 h-3.5 text-purple-600" /> All-in-One Enterprise AI Engine
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Build More. Create Faster. Grow Smarter.
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Transform your business workflows with our AI tools, document automation, sales copilot, and flagship AEO/GEO search visibility platform.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0">
            <button
              onClick={() => onNavigate('tools')}
              className="px-6 py-3.5 rounded-xl font-bold text-white bg-gradient-to-r from-sky-500 via-indigo-500 to-purple-600 hover:from-sky-600 hover:to-purple-700 shadow-lg shadow-purple-500/25 transition-all flex items-center gap-2 group"
            >
              <span>Start Creating with Digi Products Hub</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => onNavigate('aeo-platform')}
              className="px-5 py-3.5 rounded-xl font-semibold text-purple-900 hover:text-purple-950 bg-white hover:bg-purple-50 border border-purple-200 shadow-xs transition-colors"
            >
              Run AI Visibility Audit
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer Directory Columns */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-2 md:grid-cols-5 gap-8 lg:gap-12">
        {/* Brand Summary */}
        <div className="col-span-2 space-y-4">
          <div
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2.5 cursor-pointer"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-sky-500 via-indigo-500 to-purple-600 p-[1.5px] shadow-xs">
              <div className="w-full h-full bg-white rounded-[6px] flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-purple-600" />
              </div>
            </div>
            <span className="font-extrabold text-lg text-slate-900 tracking-tight">Digi Products Hub</span>
          </div>
          <p className="text-sm text-slate-600 leading-relaxed max-w-sm">
            One AI Platform. Unlimited Possibilities. The unified ecosystem for creators, marketers, agencies, and enterprise builders.
          </p>
          <div className="flex items-center gap-2 text-xs text-slate-500 pt-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Enterprise-Grade Security • Isolated Workspace Data</span>
          </div>
        </div>

        {/* Product Column */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">Product</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <button onClick={() => onNavigate('tools')} className="hover:text-purple-700 transition-colors">
                AI Tools Directory
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('aeo-platform')} className="hover:text-purple-700 transition-colors flex items-center gap-1.5">
                <span>AEO & GEO Platform</span>
                <span className="px-1 text-[10px] bg-purple-100 text-purple-700 rounded font-bold">NEW</span>
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('pricing')} className="hover:text-purple-700 transition-colors">
                Pricing Plans
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('dashboard')} className="hover:text-purple-700 transition-colors">
                API & Usage Center
              </button>
            </li>
          </ul>
        </div>

        {/* Resources Column */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">Resources</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <button onClick={() => onNavigate('blog')} className="hover:text-purple-700 transition-colors">
                AI & AEO Blog
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('home')} className="hover:text-purple-700 transition-colors">
                Knowledge Guides
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('home')} className="hover:text-purple-700 transition-colors">
                Platform FAQs
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('tools')} className="hover:text-purple-700 transition-colors">
                Workflow Templates
              </button>
            </li>
          </ul>
        </div>

        {/* Company & Legal */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">Company & Legal</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <button onClick={() => onNavigate('about')} className="hover:text-purple-700 transition-colors">
                About Us
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('contact')} className="hover:text-purple-700 transition-colors">
                Contact Enterprise
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('legal')} className="hover:text-purple-700 transition-colors">
                Privacy Policy
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('legal')} className="hover:text-purple-700 transition-colors">
                Terms & Conditions
              </button>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-purple-100 bg-white/70 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} Digi Products Hub Ltd. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <span>SOC-2 Ready</span>
            <span>GDPR Compliant</span>
            <span>Zero Data Selling</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
