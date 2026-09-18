import React, { useState } from 'react';
import { Sparkles, Layers, Menu, X, ArrowRight, ShieldCheck, Zap, User } from 'lucide-react';
import { NavigationTab, UserProfile } from '../types';

interface HeaderProps {
  currentTab: NavigationTab;
  onNavigate: (tab: NavigationTab) => void;
  user: UserProfile;
  providerStatus?: { liveAI?: boolean; provider?: string };
  onOpenAuth?: () => void;
  onLogout?: () => void;
  onSearch?: (query: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onNavigate,
  user,
  providerStatus = { liveAI: false, provider: 'High-Fidelity AI Demo Engine' },
  onOpenAuth,
  onLogout,
  onSearch,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks: { id: NavigationTab; label: string; badge?: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'tools', label: 'AI Tools' },
    { id: 'aeo-platform', label: 'AEO / GEO', badge: 'Flagship' },
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'pricing', label: 'Pricing' },
    { id: 'blog', label: 'Blog' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (tab: NavigationTab) => {
    onNavigate(tab);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-purple-200/70 bg-white/80 backdrop-blur-xl transition-all shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Brand Logo */}
        <div
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-3 cursor-pointer group"
          id="header-brand-logo"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-500 via-indigo-500 to-purple-600 p-[1.5px] shadow-md shadow-purple-500/15 group-hover:shadow-purple-500/30 transition-all">
            <div className="w-full h-full bg-white rounded-[10px] flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-purple-600 group-hover:scale-110 transition-transform" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-lg sm:text-xl tracking-tight text-slate-900 flex items-center gap-1.5">
              Digi Products Hub
            </span>
            <span className="text-[11px] font-semibold tracking-wider uppercase text-purple-700/80 -mt-1">
              AI Tools & Visibility Platform
            </span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1.5 lg:gap-2">
          {navLinks.map((link) => {
            const isActive = currentTab === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                id={`nav-link-${link.id}`}
                className={`relative px-3.5 py-2 text-sm font-medium rounded-lg transition-all flex items-center gap-1.5 ${
                  isActive
                    ? 'text-purple-700 bg-purple-100/80 font-semibold shadow-xs'
                    : 'text-slate-600 hover:text-purple-700 hover:bg-purple-50/70'
                }`}
              >
                {link.label}
                {link.badge && (
                  <span className="px-1.5 py-0.5 text-[10px] font-bold tracking-wide uppercase rounded bg-gradient-to-r from-sky-500 to-purple-500 text-white leading-none">
                    {link.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Right CTA / Auth Status */}
        <div className="hidden md:flex items-center gap-3">
          {/* Provider Status Indicator */}
          <div
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-purple-200/80 bg-white/90 text-[11px] font-medium text-slate-700 shadow-xs"
            title={
              providerStatus?.liveAI
                ? 'Connected to real-time Google Gemini 2.5 Flash'
                : 'Demo Mode: High fidelity simulated provider'
            }
          >
            <span
              className={`w-2 h-2 rounded-full ${
                providerStatus?.liveAI ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'
              }`}
            />
            <span>{providerStatus?.liveAI ? 'Live Gemini AI' : 'Demo Mode'}</span>
          </div>

          {/* User Account / Plan */}
          <button
            onClick={() => handleNavClick('dashboard')}
            id="nav-user-profile-btn"
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-purple-200/80 bg-white/90 text-xs font-semibold text-slate-800 hover:border-purple-300 hover:bg-purple-50/40 shadow-xs transition-colors"
          >
            <User className="w-3.5 h-3.5 text-purple-600" />
            <span>{user?.name ? user.name.split(' ')[0] : 'Account'}</span>
            <span className="px-1.5 py-0.5 rounded text-[10px] bg-purple-100 text-purple-700 font-bold">
              {user?.plan || 'Free'}
            </span>
          </button>

          {/* Primary CTA */}
          <button
            onClick={() => handleNavClick('tools')}
            id="header-cta-start-creating"
            className="px-4 py-2 text-sm font-semibold rounded-lg bg-gradient-to-r from-sky-500 via-indigo-500 to-purple-600 hover:from-sky-600 hover:to-purple-700 text-white shadow-md shadow-purple-500/20 hover:shadow-purple-500/30 transition-all flex items-center gap-1.5 group"
          >
            <span>Start Creating</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={() => handleNavClick('tools')}
            className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-purple-600 text-white shadow-xs"
          >
            Start
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-slate-700 hover:text-purple-700 bg-purple-100/60 focus:outline-none"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Slide-Out Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-18 bottom-0 bg-white/98 backdrop-blur-2xl border-b border-purple-200 p-6 flex flex-col justify-between overflow-y-auto animate-in fade-in slide-in-from-top-4 z-50 text-slate-800">
          <div className="space-y-3">
            <div className="pb-3 border-b border-purple-100 flex items-center justify-between">
              <div className="text-xs font-semibold text-slate-600">
                Signed in as {user?.name || 'Guest User'}
              </div>
              <span className="px-2 py-0.5 rounded text-xs bg-purple-100 text-purple-700 font-semibold">
                {user?.plan || 'Free'} Plan
              </span>
            </div>

            <div className="grid gap-1 pt-2">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl text-base font-semibold text-left transition-all ${
                    currentTab === link.id
                      ? 'bg-purple-100 text-purple-800'
                      : 'text-slate-700 hover:bg-purple-50'
                  }`}
                >
                  <span>{link.label}</span>
                  {link.badge && (
                    <span className="text-xs px-2 py-0.5 rounded bg-purple-100 text-purple-700 font-bold">
                      {link.badge}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-6 border-t border-purple-100 space-y-3">
            <button
              onClick={() => handleNavClick('tools')}
              className="w-full py-3.5 rounded-xl font-bold text-center bg-gradient-to-r from-sky-500 via-indigo-500 to-purple-600 text-white shadow-lg shadow-purple-500/20 flex items-center justify-center gap-2"
            >
              <span>Explore All 22+ AI Tools</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <div className="text-center text-xs text-slate-500">
              Digi Products Hub • One AI Platform. Unlimited Possibilities.
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
