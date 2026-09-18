import React, { useState } from 'react';
import { Check, Sparkles, ArrowRight, ShieldCheck, HelpCircle } from 'lucide-react';
import { upgradePlan } from '../services/api';

interface PricingViewProps {
  currentPlan: string;
  onNotify: (msg: string, type?: 'success' | 'error' | 'info' | 'warning') => void;
  onRefreshData: () => void;
}

export const PricingView: React.FC<PricingViewProps> = ({
  currentPlan,
  onNotify,
  onRefreshData,
}) => {
  const [annualBilling, setAnnualBilling] = useState(true);

  const plans = [
    {
      id: 'Free',
      name: 'Free Starter',
      badge: 'Zero Commitment',
      priceMonthly: 0,
      priceAnnual: 0,
      description: 'Ideal for trying out business utilities, YouTube transcript parsing, and basic document tools.',
      features: [
        '10,000 monthly AI tokens',
        'Standard tools access (Transcripts, Passwords)',
        '3 active projects',
        'Standard TXT/CSV downloads',
        'Community support',
      ],
      cta: 'Current Plan',
      isCurrent: currentPlan === 'Free',
    },
    {
      id: 'Starter',
      name: 'Creator & Solo',
      badge: 'Popular for Creators',
      priceMonthly: 29,
      priceAnnual: 24,
      description: 'For solo founders, content creators, and growth specialists needing automated blogs and images.',
      features: [
        '50,000 monthly AI tokens',
        'AI Blog Writer & Image Studio',
        '10 active projects',
        'All export formats (DOCX, PDF, HTML)',
        'Priority queue execution',
        'Email customer support',
      ],
      cta: 'Upgrade to Starter',
      isCurrent: currentPlan === 'Starter',
    },
    {
      id: 'Professional',
      name: 'Professional Pro',
      badge: 'Most Popular',
      featured: true,
      priceMonthly: 79,
      priceAnnual: 64,
      description: 'Full access to the Flagship AEO / GEO AI Search Visibility Platform and Lead Gen Copilot.',
      features: [
        '150,000 monthly AI tokens',
        'Flagship AEO/GEO Platform (Full Audit)',
        'Niche Lead Gen Copilot (CSV exports)',
        'Subscription Rescue & Dunning Engine',
        'Unlimited active projects',
        'Full document automation suite',
        'Priority 4-hour SLA support',
      ],
      cta: 'Upgrade to Pro',
      isCurrent: currentPlan === 'Professional',
    },
    {
      id: 'Business',
      name: 'Business Enterprise',
      badge: 'Teams & Agencies',
      priceMonthly: 199,
      priceAnnual: 159,
      description: 'Maximum limits, multi-engine AEO tracking, custom model configurations, and dedicated API.',
      features: [
        '500,000 monthly AI tokens',
        'Multi-domain AEO prompt tracking',
        'Team workspace collaboration',
        'Custom API integration & webhooks',
        'Custom invoice & branding templates',
        'Dedicated account strategist',
      ],
      cta: 'Upgrade to Business',
      isCurrent: currentPlan === 'Business',
    },
  ];

  const handleCheckout = async (planId: string) => {
    try {
      const res = await upgradePlan(planId);
      onRefreshData();
      onNotify(`Stripe checkout simulated: ${res.message}`, 'success');
    } catch {
      onNotify('Checkout could not be initialized', 'error');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-sky-500/10 text-sky-400 border border-sky-500/20 uppercase tracking-wider">
          Transparent Scalable Pricing
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Invest in High-Impact AI Automation
        </h1>
        <p className="text-sm sm:text-base text-slate-300">
          Scale your workflows without hidden token markups. Cancel or upgrade anytime with instant proration.
        </p>

        {/* Monthly vs Annual Toggle */}
        <div className="pt-4 flex items-center justify-center gap-3">
          <span className={`text-xs font-semibold ${!annualBilling ? 'text-white' : 'text-slate-400'}`}>
            Monthly Billing
          </span>
          <button
            onClick={() => setAnnualBilling(!annualBilling)}
            className="w-12 h-6 rounded-full bg-[#151B2B] border border-slate-700 p-0.5 relative transition-colors"
          >
            <div
              className={`w-5 h-5 rounded-full bg-sky-500 transition-transform ${
                annualBilling ? 'translate-x-6' : 'translate-x-0'
              }`}
            />
          </button>
          <span className={`text-xs font-semibold flex items-center gap-1.5 ${annualBilling ? 'text-white' : 'text-slate-400'}`}>
            <span>Annual Billing</span>
            <span className="px-1.5 py-0.5 text-[10px] font-bold rounded bg-emerald-500/20 text-emerald-300">
              Save 20%
            </span>
          </span>
        </div>
      </div>

      {/* Pricing Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
        {plans.map((p) => {
          const price = annualBilling ? p.priceAnnual : p.priceMonthly;

          return (
            <div
              key={p.id}
              className={`rounded-2xl p-6 flex flex-col justify-between transition-all relative ${
                p.featured
                  ? 'border-2 border-sky-500 bg-gradient-to-b from-[#162035] to-[#121826] shadow-2xl shadow-sky-500/10 scale-105 z-10'
                  : 'border border-slate-800 bg-[#151B2B] hover:border-slate-700'
              }`}
            >
              {p.featured && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-gradient-to-r from-sky-500 to-indigo-500 text-white shadow-md">
                  Most Popular
                </span>
              )}

              <div className="space-y-4">
                <div>
                  <h3 className="text-base font-bold text-white">{p.name}</h3>
                  <p className="text-xs text-slate-400 mt-1">{p.description}</p>
                </div>

                <div className="pt-2">
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-extrabold text-white">${price}</span>
                    <span className="text-xs text-slate-400">/ month</span>
                  </div>
                  {annualBilling && p.priceAnnual > 0 && (
                    <span className="text-[10px] text-emerald-400 font-medium">Billed annually (${price * 12}/yr)</span>
                  )}
                </div>

                <div className="space-y-2.5 pt-4 border-t border-slate-800 text-xs text-slate-300">
                  {p.features.map((f, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6">
                <button
                  onClick={() => handleCheckout(p.id)}
                  disabled={p.isCurrent}
                  className={`w-full py-2.5 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-2 ${
                    p.isCurrent
                      ? 'bg-slate-800 text-slate-400 cursor-default'
                      : p.featured
                      ? 'bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white shadow-lg shadow-sky-500/25'
                      : 'bg-[#121826] hover:bg-slate-800 text-white border border-slate-700'
                  }`}
                >
                  <span>{p.isCurrent ? 'Current Active Tier' : p.cta}</span>
                  {!p.isCurrent && <ArrowRight className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
