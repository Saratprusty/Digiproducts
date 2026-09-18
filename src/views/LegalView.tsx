import React, { useState } from 'react';
import { Shield, FileText, Lock } from 'lucide-react';

export const LegalView: React.FC = () => {
  const [legalTab, setLegalTab] = useState<'privacy' | 'terms' | 'cookies'>('privacy');

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-extrabold text-white tracking-tight">Legal & Privacy Center</h1>
        <p className="text-xs sm:text-sm text-slate-400">
          Transparency and enterprise compliance for Digi Products Hub operations.
        </p>
      </div>

      <div className="flex items-center justify-center gap-2 border-b border-slate-800 pb-3">
        <button
          onClick={() => setLegalTab('privacy')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold ${
            legalTab === 'privacy' ? 'bg-sky-500/20 text-sky-300 border border-sky-500/30' : 'text-slate-400'
          }`}
        >
          Privacy Policy
        </button>
        <button
          onClick={() => setLegalTab('terms')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold ${
            legalTab === 'terms' ? 'bg-sky-500/20 text-sky-300 border border-sky-500/30' : 'text-slate-400'
          }`}
        >
          Terms & Conditions
        </button>
        <button
          onClick={() => setLegalTab('cookies')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold ${
            legalTab === 'cookies' ? 'bg-sky-500/20 text-sky-300 border border-sky-500/30' : 'text-slate-400'
          }`}
        >
          Cookie Policy
        </button>
      </div>

      <div className="rounded-2xl border border-slate-800 bg-[#121826] p-6 sm:p-8 text-xs sm:text-sm text-slate-300 leading-relaxed space-y-4">
        {legalTab === 'privacy' && (
          <div className="space-y-4">
            <h3 className="text-base font-bold text-white">Privacy Policy</h3>
            <p>
              Digi Products Hub takes your privacy and data security seriously. We adhere to enterprise-standard
              data isolation principles. We do not sell your personal data or generated content to third parties.
            </p>
            <h4 className="font-bold text-white pt-2">1. Data Ingestion & LLM Processing</h4>
            <p>
              Content processed through our AI tools is transmitted via TLS 1.3 encrypted pipelines. When querying
              foundation model providers, data is sent purely for inference and not retained for public foundation
              model training.
            </p>
            <h4 className="font-bold text-white pt-2">2. User Account Isolation</h4>
            <p>
              All projects, leads, invoices, and saved outputs are strictly tagged by your authenticated user ID and
              isolated from other tenant accounts.
            </p>
          </div>
        )}

        {legalTab === 'terms' && (
          <div className="space-y-4">
            <h3 className="text-base font-bold text-white">Terms of Service</h3>
            <p>
              By accessing Digi Products Hub, you agree to use the platform in compliance with all applicable laws
              and regulations.
            </p>
            <h4 className="font-bold text-white pt-2">1. Acceptable Use</h4>
            <p>
              Users may not utilize our tools to generate unlawful, deceptive, or abusive content. Scraping that
              violates third-party terms is strictly disallowed.
            </p>
            <h4 className="font-bold text-white pt-2">2. Subscription & Tokens</h4>
            <p>
              Subscribed plans renew automatically on a monthly or annual cadence. Unused monthly tokens do not roll
              over unless explicitly specified in enterprise agreements.
            </p>
          </div>
        )}

        {legalTab === 'cookies' && (
          <div className="space-y-4">
            <h3 className="text-base font-bold text-white">Cookie & Session Policy</h3>
            <p>
              We utilize essential HTTP cookies and local browser storage purely to maintain your authenticated
              workspace session and preserve active preferences. We do not use intrusive third-party advertising
              tracking cookies.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
