import React, { useState } from 'react';
import {
  Sparkles,
  ArrowRight,
  Radar,
  FileText,
  Youtube,
  Target,
  Image as ImageIcon,
  Layout,
  Briefcase,
  Layers,
  ChevronDown,
  ShieldCheck,
  Zap,
  Globe,
  CheckCircle2,
  TrendingUp,
  Search,
  Bot,
  ExternalLink,
} from 'lucide-react';
import { NavigationTab, ToolItem } from '../types';

interface HomeViewProps {
  onNavigate: (tab: NavigationTab) => void;
  onSelectTool: (toolId: string) => void;
  tools: ToolItem[];
}

export const HomeView: React.FC<HomeViewProps> = ({ onNavigate, onSelectTool, tools }) => {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [activeUseCase, setActiveUseCase] = useState<string>('ai-search');
  const [demoBrandInput, setDemoBrandInput] = useState('Acme Cloud');

  const floatingTools = [
    { id: 'aeo-geo-analyzer', name: 'AEO / GEO Analyzer', icon: Radar, color: 'from-sky-500 to-blue-600', badge: 'Flagship' },
    { id: 'ai-blog-writer', name: 'AI Blog Writer', icon: FileText, color: 'from-purple-500 to-indigo-600', badge: 'Popular' },
    { id: 'youtube-transcript', name: 'YouTube Transcript', icon: Youtube, color: 'from-red-500 to-rose-600', badge: 'Free' },
    { id: 'lead-generation-copilot', name: 'Lead Gen Copilot', icon: Target, color: 'from-emerald-500 to-teal-600', badge: 'Pro' },
    { id: 'ai-website-builder', name: 'Website Builder', icon: Layout, color: 'from-amber-500 to-orange-600', badge: 'Pro' },
    { id: 'ai-image-studio', name: 'Image Studio', icon: ImageIcon, color: 'from-pink-500 to-rose-500', badge: 'Pro' },
    { id: 'resume-builder', name: 'Resume Builder', icon: Briefcase, color: 'from-cyan-500 to-blue-500', badge: 'Free' },
    { id: 'subscription-rescue', name: 'Subscription Rescue', icon: TrendingUp, color: 'from-violet-500 to-purple-600', badge: 'Pro' },
  ];

  const trustLogos = [
    'VORTEX DYNAMICS',
    'NEXUS SCALE',
    'SYNTHESIS LABS',
    'CLOUD VECTOR',
    'HORIZON AI',
    'APEX PARTNERS',
  ];

  const faqs = [
    {
      q: 'What is Digi Products Hub?',
      a: 'Digi Products Hub is a unified AI productivity, content, sales, document, and search visibility platform. Instead of subscribing to 10 separate point solutions, you access 22+ professional enterprise AI tools under one single account.',
    },
    {
      q: 'What is AEO and GEO (AI Search Visibility)?',
      a: 'AEO (Answer Engine Optimization) and GEO (Generative Engine Optimization) track and optimize how your brand is cited and recommended inside ChatGPT, Claude, Perplexity, Google Gemini, and Microsoft Copilot, ensuring you are recommended when decision-makers query AI for vendor recommendations.',
    },
    {
      q: 'Can I export documents to Word, PDF, CSV, and HTML?',
      a: 'Yes. Every compatible tool supports instantaneous one-click exports to standard production formats including TXT, CSV, DOCX, PDF, JSON, and clean sanitized HTML/CSS ZIP files.',
    },
    {
      q: 'Is there a free plan available?',
      a: 'Yes, our Free plan includes access to standard tools like Free YouTube Transcript, Password Generator, Time Tracker, and Onboarding Checklist with a monthly allowance of 10,000 tokens.',
    },
    {
      q: 'How does Digi Products Hub protect my business data?',
      a: 'We operate under strict zero-retention policies for training, isolate workspace projects per user account, and support zero-knowledge cryptographic client generations for sensitive tasks.',
    },
  ];

  return (
    <div className="space-y-24 pb-20">
      {/* 1. HERO SECTION */}
      <section className="relative pt-12 sm:pt-20 lg:pt-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
        {/* Glow backgrounds */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-sky-400/20 via-purple-500/20 to-transparent blur-[100px] pointer-events-none" />

        <div className="text-center space-y-6 max-w-4xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-purple-200/80 bg-white/80 text-xs font-semibold text-purple-700 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-purple-600 animate-spin-slow" />
            <span>Next-Generation SaaS Architecture • 22+ Production AI Tools</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 leading-[1.08]">
            One AI Platform.{' '}
            <span className="bg-gradient-to-r from-sky-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Unlimited Possibilities.
            </span>
          </h1>

          <p className="text-base sm:text-xl text-slate-600 max-w-3xl mx-auto font-normal leading-relaxed">
            Create content, build websites, generate images, optimize for AI search, edit videos,
            automate Instagram, create sales funnels, and much more — all from one powerful AI platform.
          </p>

          {/* Action CTAs */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => onNavigate('tools')}
              id="hero-cta-explore-tools"
              className="w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-white bg-gradient-to-r from-sky-500 via-indigo-500 to-purple-600 hover:from-sky-600 hover:to-purple-700 shadow-xl shadow-purple-500/25 hover:shadow-purple-500/35 transition-all flex items-center justify-center gap-2.5 group text-base"
            >
              <span>Explore AI Tools</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => onNavigate('aeo-platform')}
              id="hero-cta-aeo-audit"
              className="w-full sm:w-auto px-7 py-4 rounded-xl font-semibold text-purple-900 hover:text-purple-950 bg-white/90 hover:bg-white border border-purple-200/80 shadow-xs hover:shadow-sm transition-all flex items-center justify-center gap-2 text-base"
            >
              <Radar className="w-5 h-5 text-purple-600" />
              <span>Try AEO/GEO Visibility Audit</span>
            </button>
          </div>
        </div>

        {/* Animated AI Workspace Visualization with Floating Tool Cards */}
        <div className="mt-16 sm:mt-20 relative max-w-5xl mx-auto">
          <div className="rounded-2xl border border-purple-200/80 bg-white/85 shadow-xl p-6 sm:p-10 backdrop-blur-xl relative overflow-hidden">
            {/* Center Core Engine Badge */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-50 border border-purple-200 text-xs text-purple-800 font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                <span>Unified AI Operating System Active</span>
              </div>
            </div>

            {/* Floating Tool Cards Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 relative z-10">
              {floatingTools.map((tool) => {
                const IconComponent = tool.icon;
                return (
                  <div
                    key={tool.id}
                    onClick={() => onSelectTool(tool.id)}
                    className="p-4 rounded-xl border border-purple-100 bg-white/90 hover:border-purple-300 hover:shadow-md transition-all cursor-pointer group shadow-xs flex flex-col justify-between h-32"
                  >
                    <div className="flex items-center justify-between">
                      <div className={`w-8 h-8 rounded-lg bg-gradient-to-tr ${tool.color} p-[1.5px]`}>
                        <div className="w-full h-full bg-white rounded-[6px] flex items-center justify-center">
                          <IconComponent className="w-4 h-4 text-purple-700" />
                        </div>
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-purple-100 text-purple-700">
                        {tool.badge}
                      </span>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-slate-900 group-hover:text-purple-700 transition-colors">
                        {tool.name}
                      </h4>
                      <div className="flex items-center gap-1 text-[11px] text-slate-500 group-hover:text-purple-700 mt-0.5">
                        <span>Launch Workspace</span>
                        <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 2. TRUST SECTION */}
      <section className="border-y border-purple-100/80 bg-white/50 py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <p className="text-center text-xs font-semibold uppercase tracking-widest text-slate-500 mb-6">
          Trusted by creators, marketers, agencies, entrepreneurs, and growing businesses
        </p>
        <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-16 opacity-70">
          {trustLogos.map((logo, idx) => (
            <div key={idx} className="font-extrabold tracking-widest text-sm text-slate-700">
              {logo}
            </div>
          ))}
        </div>
      </section>

      {/* 3. AEO + GEO FLAGSHIP SPOTLIGHT */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="rounded-3xl border border-purple-200/80 bg-gradient-to-br from-white/95 via-purple-50/80 to-sky-50/90 p-8 sm:p-14 relative overflow-hidden shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6 space-y-6">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-purple-100 text-purple-700 border border-purple-200 uppercase tracking-wider">
                Flagship Breakthrough
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                Measure Your Brand's Visibility Across AI Search
              </h2>
              <p className="text-slate-600 text-base leading-relaxed">
                When potential customers ask ChatGPT, Claude, Perplexity, or Google Gemini for vendor recommendations, is your company cited or erased? Our closed-loop system drives:
              </p>

              {/* Step Process Indicator */}
              <div className="grid grid-cols-3 gap-3 pt-2">
                <div className="p-3 rounded-xl bg-white/90 border border-purple-100 text-center shadow-xs">
                  <div className="text-xs text-sky-600 font-bold uppercase">1. Insight</div>
                  <div className="text-xs text-slate-600 mt-1">Audit AI Citations</div>
                </div>
                <div className="p-3 rounded-xl bg-white/90 border border-purple-100 text-center shadow-xs">
                  <div className="text-xs text-purple-600 font-bold uppercase">2. Action</div>
                  <div className="text-xs text-slate-600 mt-1">Generate GEO Fixes</div>
                </div>
                <div className="p-3 rounded-xl bg-white/90 border border-purple-100 text-center shadow-xs">
                  <div className="text-xs text-emerald-600 font-bold uppercase">3. Measure</div>
                  <div className="text-xs text-slate-600 mt-1">Track Mention Share</div>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => onNavigate('aeo-platform')}
                  className="px-6 py-3.5 rounded-xl font-bold text-white bg-gradient-to-r from-sky-500 via-indigo-500 to-purple-600 hover:from-sky-600 hover:to-purple-700 shadow-md shadow-purple-500/20 transition-all flex items-center gap-2"
                >
                  <span>Launch AI Search Visibility Platform</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Interactive Preview Widget */}
            <div className="lg:col-span-6 rounded-2xl border border-purple-200/80 bg-white/90 p-6 shadow-xl space-y-5">
              <div className="flex items-center justify-between border-b border-purple-100 pb-3">
                <div className="flex items-center gap-2">
                  <Radar className="w-5 h-5 text-purple-600" />
                  <span className="text-sm font-bold text-slate-900">Live AI Visibility Monitor</span>
                </div>
                <span className="text-xs text-emerald-700 font-mono bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  92% Synthetic Confidence
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-xl bg-purple-50/50 border border-purple-100">
                  <div className="text-xs text-slate-500">AI Visibility Score</div>
                  <div className="text-2xl font-extrabold text-slate-900 mt-1">78 / 100</div>
                  <div className="text-[11px] text-emerald-600 font-medium mt-0.5">Top 15% in B2B SaaS</div>
                </div>
                <div className="p-3 rounded-xl bg-purple-50/50 border border-purple-100">
                  <div className="text-xs text-slate-500">Citation Share</div>
                  <div className="text-2xl font-extrabold text-purple-600 mt-1">68.4%</div>
                  <div className="text-[11px] text-slate-600 mt-0.5">Cited across 4 engines</div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="text-xs font-semibold text-slate-600">Model Citation Breakdown:</div>
                <div className="space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-700">Perplexity AI</span>
                    <span className="font-mono text-emerald-600 font-semibold">92% (Top 3 Cited)</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-slate-100 overflow-hidden">
                    <div className="w-[92%] h-full bg-emerald-500 rounded-full" />
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <span className="text-slate-700">Claude (Anthropic)</span>
                    <span className="font-mono text-sky-600 font-semibold">84% (Direct Answer)</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-slate-100 overflow-hidden">
                    <div className="w-[84%] h-full bg-sky-500 rounded-full" />
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <span className="text-slate-700">ChatGPT (SearchGPT)</span>
                    <span className="font-mono text-purple-600 font-semibold">76% (Entity Grounded)</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-slate-100 overflow-hidden">
                    <div className="w-[76%] h-full bg-purple-500 rounded-full" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. HOW IT WORKS */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-widest text-purple-700">Streamlined Architecture</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            How It Works in 4 Simple Steps
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            From raw idea or task to production-ready output, structured data, and exports.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-2xl border border-purple-100 bg-white/90 space-y-3 relative group hover:border-purple-300 hover:shadow-md transition-all shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-sky-100 border border-sky-200 flex items-center justify-center font-mono font-bold text-sky-700 text-base">
              01
            </div>
            <h3 className="text-lg font-bold text-slate-900">Choose a Tool</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Select from 22+ purpose-built workflows spanning AEO, blog writing, lead generation, or document conversion.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-purple-100 bg-white/90 space-y-3 relative group hover:border-purple-300 hover:shadow-md transition-all shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-purple-100 border border-purple-200 flex items-center justify-center font-mono font-bold text-purple-700 text-base">
              02
            </div>
            <h3 className="text-lg font-bold text-slate-900">Describe What You Need</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Enter target parameters, upload documents, or paste URLs into our structured, validated input panels.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-purple-100 bg-white/90 space-y-3 relative group hover:border-purple-300 hover:shadow-md transition-all shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-indigo-100 border border-indigo-200 flex items-center justify-center font-mono font-bold text-indigo-700 text-base">
              03
            </div>
            <h3 className="text-lg font-bold text-slate-900">Let AI Do The Work</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Our decoupled AI provider layer triggers high-speed inference, formatting, entity scoring, and verification.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-purple-100 bg-white/90 space-y-3 relative group hover:border-purple-300 hover:shadow-md transition-all shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 border border-emerald-200 flex items-center justify-center font-mono font-bold text-emerald-700 text-base">
              04
            </div>
            <h3 className="text-lg font-bold text-slate-900">Save, Export or Publish</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Instantly download DOCX, PDF, CSV, or ZIP files, or save to your workspace projects for collaborative team access.
            </p>
          </div>
        </div>
      </section>

      {/* 5. WHY DIGI PRODUCTS HUB (BENTO GRID) */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-widest text-purple-700">Enterprise Standards</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Why Digi Products Hub
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            Engineered with strict zero-slop craftsmanship, resilient error handling, and commercial reliability.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-8 rounded-2xl border border-purple-100 bg-white/90 space-y-3 shadow-xs hover:border-purple-300 transition-all">
            <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Built for Creators & Teams</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Produce YouTube transcripts, podcasts show notes, visual assets, and high-impact social schedules in minutes without context switching.
            </p>
          </div>

          <div className="p-8 rounded-2xl border border-purple-100 bg-white/90 space-y-3 shadow-xs hover:border-purple-300 transition-all">
            <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Enterprise Data Privacy</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Every project, document, and lead list is strictly isolated per user account. Zero public model training on your proprietary corporate data.
            </p>
          </div>

          <div className="p-8 rounded-2xl border border-purple-100 bg-white/90 space-y-3 shadow-xs hover:border-purple-300 transition-all">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <Globe className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">AEO & GEO Pioneer</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Traditional SEO is not enough. Ensure your company dominates answer engine summaries across Perplexity, ChatGPT, Claude, and Gemini.
            </p>
          </div>
        </div>
      </section>

      {/* 6. FAQ ACCORDION SECTION */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-600 text-sm">
            Everything you need to know about the platform, AI models, and subscriptions.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="rounded-xl border border-purple-100 bg-white/90 overflow-hidden transition-all shadow-xs"
            >
              <button
                onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                className="w-full px-6 py-4.5 text-left flex items-center justify-between gap-4 text-slate-900 font-semibold text-sm hover:text-purple-700 transition-colors"
              >
                <span>{faq.q}</span>
                <ChevronDown
                  className={`w-4 h-4 text-slate-500 shrink-0 transition-transform ${
                    activeFaq === index ? 'rotate-180 text-purple-600' : ''
                  }`}
                />
              </button>
              {activeFaq === index && (
                <div className="px-6 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-purple-100 bg-purple-50/40">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 7. FINAL CONVERSION CTA */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="rounded-3xl border border-purple-200/80 bg-gradient-to-tr from-white/95 via-purple-50/90 to-sky-50/90 p-10 sm:p-16 text-center space-y-6 relative overflow-hidden shadow-xl">
          <div className="max-w-2xl mx-auto space-y-4">
            <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
              Your Next Workflow Starts Here.
            </h2>
            <p className="text-slate-600 text-base sm:text-lg">
              Join thousands of forward-thinking operators accelerating content, sales, and AI visibility with Digi Products Hub.
            </p>
          </div>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => onNavigate('tools')}
              className="w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-white bg-gradient-to-r from-sky-500 via-indigo-500 to-purple-600 hover:from-sky-600 hover:to-purple-700 shadow-xl shadow-purple-500/25 transition-all flex items-center justify-center gap-2"
            >
              <span>Explore AI Tools Directory</span>
              <ArrowRight className="w-5 h-5" />
            </button>
            <button
              onClick={() => onNavigate('pricing')}
              className="w-full sm:w-auto px-7 py-4 rounded-xl font-semibold text-purple-900 hover:text-purple-950 bg-white hover:bg-purple-50 border border-purple-200 shadow-xs transition-all"
            >
              View Pricing Plans
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
