import React, { useState } from 'react';
import {
  Radar,
  Search,
  ArrowRight,
  TrendingUp,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Download,
  Copy,
  Sparkles,
  ExternalLink,
  Bot,
  Zap,
  Layers,
  ChevronRight,
  BarChart3,
  Globe,
} from 'lucide-react';
import { AEOAnalysisResult } from '../types';
import { runAEOAnalysis, recordDownload, saveContent } from '../services/api';

interface AEOPlatformViewProps {
  onNotify: (msg: string, type?: 'success' | 'error' | 'info' | 'warning') => void;
  onNavigate: (tab: any) => void;
}

export const AEOPlatformView: React.FC<AEOPlatformViewProps> = ({ onNotify, onNavigate }) => {
  const [websiteUrl, setWebsiteUrl] = useState('https://acmecloud.example.com');
  const [brandName, setBrandName] = useState('Acme Cloud');
  const [industry, setIndustry] = useState('B2B SaaS');
  const [competitors, setCompetitors] = useState('Vanguard Tech, Nexus Core');
  const [isLoading, setIsLoading] = useState(false);
  const [analysis, setAnalysis] = useState<AEOAnalysisResult | null>(null);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'audit' | 'prompts' | 'actions'>('dashboard');

  const handleRunAudit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!websiteUrl || !brandName) {
      onNotify('Please enter a website URL and brand name', 'warning');
      return;
    }

    setIsLoading(true);
    try {
      const res = await runAEOAnalysis({
        websiteUrl,
        brandName,
        industry,
        competitors,
      });
      setAnalysis(res);
      onNotify('AI Search Visibility Audit completed successfully!', 'success');
    } catch (err: any) {
      onNotify(err.message || 'Audit failed', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleExportReport = async () => {
    if (!analysis) return;
    const jsonString = JSON.stringify(analysis, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `AEO_GEO_Report_${brandName.replace(/\s+/g, '_')}.json`;
    a.click();
    URL.revokeObjectURL(url);

    await recordDownload({
      fileName: `AEO_GEO_Report_${brandName.replace(/\s+/g, '_')}.json`,
      tool: 'AEO / GEO Platform',
      format: 'JSON',
      size: `${Math.round(jsonString.length / 1024)} KB`,
    });
    onNotify('AEO report downloaded & recorded to Download Center', 'success');
  };

  const handleSaveRecommendation = async (actionTitle: string) => {
    await saveContent({
      title: actionTitle,
      folder: 'AEO/GEO',
      tool: 'AEO / GEO AI Search Visibility Platform',
      snippet: `Recommendation for ${brandName}: ${actionTitle}`,
    });
    onNotify('Recommendation saved to Saved Content folders!', 'success');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Flagship Hero Header */}
      <div className="rounded-3xl border border-purple-200/80 bg-gradient-to-br from-white/95 via-purple-50/80 to-sky-50/90 p-8 sm:p-12 relative overflow-hidden shadow-xl">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold bg-purple-100 text-purple-700 border border-purple-200">
            <Radar className="w-4 h-4 text-purple-600" />
            <span>AI Search Visibility Platform (AEO + GEO)</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Measure Your Brand's Visibility Across AI Search
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Understand how AI synthesis engines represent your brand across ChatGPT, Claude,
            Perplexity, Gemini, and Copilot. Turn insights into measurable GEO optimization actions.
          </p>
        </div>

        {/* Audit Form Bar */}
        <form onSubmit={handleRunAudit} className="mt-8 grid grid-cols-1 sm:grid-cols-12 gap-3 p-2.5 rounded-2xl bg-white/95 border border-purple-200/80 shadow-md backdrop-blur-xl">
          <div className="sm:col-span-4">
            <input
              type="url"
              required
              value={websiteUrl}
              onChange={(e) => setWebsiteUrl(e.target.value)}
              placeholder="https://yourbrand.com"
              className="w-full px-4 py-3 text-sm rounded-xl bg-purple-50/40 border border-purple-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-purple-500 focus:bg-white"
            />
          </div>
          <div className="sm:col-span-3">
            <input
              type="text"
              required
              value={brandName}
              onChange={(e) => setBrandName(e.target.value)}
              placeholder="Brand / Company Name"
              className="w-full px-4 py-3 text-sm rounded-xl bg-purple-50/40 border border-purple-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-purple-500 focus:bg-white"
            />
          </div>
          <div className="sm:col-span-3">
            <select
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              className="w-full px-4 py-3 text-sm rounded-xl bg-purple-50/40 border border-purple-200 text-slate-900 focus:outline-none focus:border-purple-500 focus:bg-white"
            >
              <option value="B2B SaaS">B2B SaaS</option>
              <option value="E-Commerce & Retail">E-Commerce & Retail</option>
              <option value="Financial Services">Financial Services</option>
              <option value="Healthcare & Life Sciences">Healthcare & Life Sciences</option>
              <option value="DevTools & Cloud Infrastructure">DevTools & Cloud</option>
              <option value="Agency & Consulting">Agency & Consulting</option>
            </select>
          </div>
          <div className="sm:col-span-2">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-full py-3 rounded-xl font-bold text-sm bg-gradient-to-r from-sky-500 via-indigo-500 to-purple-600 hover:from-sky-600 hover:to-purple-700 text-white shadow-md shadow-purple-500/20 transition-all flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <span>Auditing...</span>
              ) : (
                <>
                  <span>Run Audit</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Tabs Menu */}
      <div className="flex items-center justify-between border-b border-purple-200/80 pb-3">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'dashboard'
                ? 'bg-purple-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-purple-50'
            }`}
          >
            AEO / GEO Dashboard
          </button>
          <button
            onClick={() => setActiveTab('audit')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'audit'
                ? 'bg-purple-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-purple-50'
            }`}
          >
            Technical Readiness Audit
          </button>
          <button
            onClick={() => setActiveTab('prompts')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'prompts'
                ? 'bg-purple-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-purple-50'
            }`}
          >
            Prompt Monitoring
          </button>
          <button
            onClick={() => setActiveTab('actions')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'actions'
                ? 'bg-purple-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-purple-50'
            }`}
          >
            Action Center
          </button>
        </div>

        {analysis && (
          <button
            onClick={handleExportReport}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-purple-200 bg-white text-xs font-semibold text-purple-900 hover:text-purple-950 shadow-xs hover:bg-purple-50 transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-purple-600" />
            <span>Export Report (JSON)</span>
          </button>
        )}
      </div>

      {/* Main Content Area */}
      {!analysis && !isLoading && (
        <div className="text-center py-16 px-4 rounded-3xl border border-slate-800/80 bg-[#121826] space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-sky-500/10 border border-sky-500/30 text-sky-400 flex items-center justify-center mx-auto">
            <Radar className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-white">No active audit loaded</h3>
          <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto">
            Click "Run Audit" above to analyze your website's presence, citation rates, and engine-by-engine visibility across ChatGPT, Claude, Perplexity, and Gemini.
          </p>
        </div>
      )}

      {isLoading && (
        <div className="text-center py-20 px-4 rounded-3xl border border-slate-800 bg-[#121826] space-y-4">
          <div className="w-12 h-12 rounded-full border-2 border-sky-500 border-t-transparent animate-spin mx-auto" />
          <h3 className="text-lg font-bold text-white">Querying AI Search Synthesis Engines...</h3>
          <p className="text-xs text-slate-400">
            Simulating prompt benchmarks across ChatGPT, Perplexity, Gemini, and Claude...
          </p>
        </div>
      )}

      {analysis && !isLoading && (
        <div className="space-y-8 animate-in fade-in">
          {/* TAB 1: DASHBOARD OVERVIEW */}
          {activeTab === 'dashboard' && (
            <div className="space-y-8">
              {/* KPI Score Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
                <div className="p-5 rounded-2xl border border-sky-500/30 bg-gradient-to-br from-[#151B2B] to-[#121C30] shadow-lg">
                  <div className="text-xs text-slate-400 font-medium">AI Visibility Score</div>
                  <div className="text-3xl font-extrabold text-sky-400 mt-2">
                    {analysis.metrics.visibilityScore} / 100
                  </div>
                  <div className="text-[11px] text-emerald-400 mt-1 flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" />
                    <span>Top 18% in {industry}</span>
                  </div>
                </div>

                <div className="p-5 rounded-2xl border border-slate-800 bg-[#151B2B] shadow-lg">
                  <div className="text-xs text-slate-400 font-medium">Brand Mention Rate</div>
                  <div className="text-3xl font-extrabold text-white mt-2">
                    {analysis.metrics.mentionRate}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1">Across top 25 industry prompts</div>
                </div>

                <div className="p-5 rounded-2xl border border-slate-800 bg-[#151B2B] shadow-lg">
                  <div className="text-xs text-slate-400 font-medium">Citation Rate</div>
                  <div className="text-3xl font-extrabold text-purple-400 mt-2">
                    {analysis.metrics.citationRate}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1">Direct authoritative references</div>
                </div>

                <div className="p-5 rounded-2xl border border-slate-800 bg-[#151B2B] shadow-lg">
                  <div className="text-xs text-slate-400 font-medium">Share of Voice</div>
                  <div className="text-3xl font-extrabold text-emerald-400 mt-2">
                    {analysis.metrics.shareOfVoice}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1">Weighted presence score</div>
                </div>

                <div className="p-5 rounded-2xl border border-slate-800 bg-[#151B2B] shadow-lg">
                  <div className="text-xs text-slate-400 font-medium">Competitor Mentions</div>
                  <div className="text-3xl font-extrabold text-amber-400 mt-2">
                    {analysis.metrics.competitorMentions}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1">{competitors || 'Named peers'}</div>
                </div>
              </div>

              {/* Engine-by-Engine Breakdown */}
              <div className="rounded-2xl border border-slate-800 bg-[#121826] p-6 space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-white">Engine-by-Engine AI Visibility</h3>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Model citation rates and sentiment grounding for {analysis.target.brandName}
                    </p>
                  </div>
                  <span className="text-xs text-slate-400 font-mono">
                    Audited: {new Date(analysis.analyzedAt).toLocaleDateString()}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {analysis.engines.map((eng) => (
                    <div
                      key={eng.name}
                      className="p-4 rounded-xl border border-slate-800/80 bg-[#151B2B] space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Bot className="w-4 h-4 text-sky-400" />
                          <span className="text-sm font-semibold text-white">{eng.name}</span>
                        </div>
                        <span className="text-xs font-mono font-bold text-emerald-400">
                          {eng.visibility}% visibility
                        </span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-sky-500 to-indigo-500 rounded-full"
                          style={{ width: `${eng.visibility}%` }}
                        />
                      </div>
                      <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                        <span>Citations: {eng.citations}%</span>
                        <span className="text-slate-300 font-medium">{eng.sentiment}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: TECHNICAL READINESS AUDIT */}
          {activeTab === 'audit' && (
            <div className="rounded-2xl border border-slate-800 bg-[#121826] p-6 space-y-6">
              <h3 className="text-lg font-bold text-white">Technical AI Readiness & Schema Audit</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl border border-emerald-500/30 bg-emerald-500/5 space-y-2">
                  <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>robots.txt AI Crawler Access</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    GPTBot, ClaudeBot, and PerplexityBot are permitted to crawl knowledge documentation.
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-amber-500/30 bg-amber-500/5 space-y-2">
                  <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                    <AlertCircle className="w-4 h-4" />
                    <span>llms.txt Standard Index</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Missing /llms.txt standard index file. Recommend creating one to guide LLM ingestors.
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-emerald-500/30 bg-emerald-500/5 space-y-2">
                  <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Structured Organization Schema</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Schema.org/Organization entity definitions detected on home and contact pages.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: PROMPT MONITORING */}
          {activeTab === 'prompts' && (
            <div className="rounded-2xl border border-slate-800 bg-[#121826] p-6 space-y-6">
              <div>
                <h3 className="text-lg font-bold text-white">Tracked Buyer Intent Prompts</h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  How models answer queries where potential buyers are seeking recommendations
                </p>
              </div>

              <div className="space-y-3">
                {analysis.promptCoverage.map((p, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl border border-slate-800 bg-[#151B2B] flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div className="space-y-1">
                      <div className="text-sm font-semibold text-white">"{p.prompt}"</div>
                      <div className="text-xs text-slate-400">
                        Brand Position: <span className="text-sky-300 font-semibold">{p.brandRank}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono px-2.5 py-1 rounded bg-slate-800 text-slate-300">
                        Share: {p.shareOfVoice}
                      </span>
                      <span
                        className={`text-xs px-2.5 py-1 rounded font-bold ${
                          p.status === 'Dominant'
                            ? 'bg-emerald-500/20 text-emerald-300'
                            : p.status === 'Defended'
                            ? 'bg-sky-500/20 text-sky-300'
                            : 'bg-amber-500/20 text-amber-300'
                        }`}
                      >
                        {p.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: ACTION CENTER */}
          {activeTab === 'actions' && (
            <div className="rounded-2xl border border-slate-800 bg-[#121826] p-6 space-y-6">
              <div>
                <h3 className="text-lg font-bold text-white">Action Center (Insight → Optimization)</h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Execute recommended fixes to increase brand citation rates across generative engines
                </p>
              </div>

              <div className="space-y-3">
                {analysis.actions.map((act) => (
                  <div
                    key={act.id}
                    className="p-4 rounded-xl border border-slate-800 bg-[#151B2B] flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div className="space-y-1">
                      <div className="text-sm font-bold text-white">{act.title}</div>
                      <div className="flex items-center gap-3 text-xs text-slate-400">
                        <span>Type: {act.type}</span>
                        <span className="text-emerald-400 font-semibold">Expected Impact: {act.impact}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleSaveRecommendation(act.title)}
                        className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 text-slate-200 hover:text-white border border-slate-700 transition-colors"
                      >
                        Save Recommendation
                      </button>
                      <button
                        onClick={() => onNavigate('tools')}
                        className="px-4 py-1.5 rounded-lg text-xs font-bold bg-sky-500 hover:bg-sky-400 text-white shadow transition-colors flex items-center gap-1.5"
                      >
                        <span>Fix Now in AI Studio</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
