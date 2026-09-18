import React, { useState, useEffect } from 'react';
import { NavigationTab, ToolItem, UserProfile, ProjectItem, HistoryItem, SavedContentItem, DownloadItem } from './types';
import { TOOLS_DATA } from './data/tools';
import {
  fetchTools,
  getCurrentUser,
  fetchDashboardData,
  checkHealth,
  loginUser,
  registerUser,
} from './services/api';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { AuthModal } from './components/AuthModal';
import { ToastContainer, ToastMessage } from './components/Toast';

// Views
import { HomeView } from './views/HomeView';
import { ToolsDirectoryView } from './views/ToolsDirectoryView';
import { ToolWorkspaceView } from './views/ToolWorkspaceView';
import { AEOPlatformView } from './views/AEOPlatformView';
import { DashboardView } from './views/DashboardView';
import { PricingView } from './views/PricingView';
import { BlogView } from './views/BlogView';
import { ContactView } from './views/ContactView';
import { AboutView } from './views/AboutView';
import { LegalView } from './views/LegalView';

export default function App() {
  const [currentTab, setCurrentTab] = useState<NavigationTab>('home');
  const [selectedToolId, setSelectedToolId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Loaded data
  const [tools, setTools] = useState<ToolItem[]>(TOOLS_DATA);
  const [user, setUser] = useState<UserProfile>({
    id: 'usr_demo_1',
    name: 'Alex Vance',
    email: 'alex@enterprise.example.com',
    plan: 'Professional',
    tokensUsed: 42350,
    tokensLimit: 150000,
    generationsCount: 84,
  });
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [savedContent, setSavedContent] = useState<SavedContentItem[]>([]);
  const [downloads, setDownloads] = useState<DownloadItem[]>([]);
  const [favorites, setFavorites] = useState<string[]>(['aeo-geo-analyzer', 'ai-blog-writer', 'youtube-transcript']);

  // Global UI state
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [providerStatus, setProviderStatus] = useState<{ liveAI: boolean; provider: string }>({
    liveAI: false,
    provider: 'High-Fidelity AI Demo Engine',
  });

  // Notification helper
  const addToast = (text: string, type: 'success' | 'error' | 'info' | 'warning' = 'info') => {
    const newToast: ToastMessage = {
      id: `${Date.now()}_${Math.random()}`,
      message: text,
      type,
    };
    setToasts((prev) => [...prev, newToast]);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Fetch initial data
  const loadData = async () => {
    try {
      // Health check
      const health = await checkHealth();
      setProviderStatus({
        liveAI: health.geminiLive,
        provider: health.aiProvider,
      });

      // User session
      const u = await getCurrentUser();
      if (u) setUser(u);

      // Tools registry
      const serverTools = await fetchTools();
      if (serverTools && serverTools.length > 0) {
        setTools(serverTools);
      }

      // Dashboard datasets
      const dash = await fetchDashboardData();
      if (dash) {
        setProjects(dash.projects || []);
        setHistory(dash.history || []);
        setSavedContent(dash.savedContent || []);
        setDownloads(dash.downloads || []);
        if (dash.user) setUser(dash.user);
      }
    } catch (err) {
      console.warn('Initial data load completed with local fallbacks:', err);
    }
  };

  useEffect(() => {
    loadData();
    // Scroll to top on tab change
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentTab]);

  // Handlers
  const handleSelectTool = (toolId: string) => {
    setSelectedToolId(toolId);
    setCurrentTab('tool-workspace');
  };

  const handleSelectCategory = (category: string) => {
    setSelectedCategory(category);
    setCurrentTab('tools');
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentTab('tools');
  };

  const handleToggleFavorite = (toolId: string) => {
    setFavorites((prev) =>
      prev.includes(toolId) ? prev.filter((id) => id !== toolId) : [...prev, toolId]
    );
    addToast(favorites.includes(toolId) ? 'Removed from favorites' : 'Added to favorites', 'info');
  };

  const handleLogin = async (email: string, pass: string) => {
    try {
      const res = await loginUser(email, pass);
      setUser(res.user);
      setAuthModalOpen(false);
      addToast(`Welcome back, ${res.user.name}!`, 'success');
      loadData();
    } catch (err: any) {
      addToast(err.message || 'Login failed', 'error');
    }
  };

  const handleRegister = async (name: string, email: string, pass: string) => {
    try {
      const res = await registerUser(name, email, pass);
      setUser(res.user);
      setAuthModalOpen(false);
      addToast(`Account created for ${res.user.name}!`, 'success');
      loadData();
    } catch (err: any) {
      addToast(err.message || 'Registration failed', 'error');
    }
  };

  const handleLogout = () => {
    setUser({
      id: 'guest',
      name: 'Guest User',
      email: 'guest@example.com',
      plan: 'Free',
      tokensUsed: 0,
      tokensLimit: 10000,
      generationsCount: 0,
    });
    addToast('Logged out of session', 'info');
  };

  // Find active tool for workspace
  const activeTool = tools.find((t) => t.id === selectedToolId) || tools[0];

  return (
    <div className="min-h-screen bg-transparent text-slate-800 flex flex-col font-sans selection:bg-purple-500/20 selection:text-purple-900 relative overflow-x-hidden">
      {/* Ambient background light blue and purple radiant glows */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-sky-300/40 rounded-full blur-3xl" />
        <div className="absolute top-1/4 -right-24 w-96 h-96 bg-purple-300/40 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 left-1/3 w-[500px] h-[500px] bg-indigo-200/40 rounded-full blur-3xl" />
        <div className="absolute top-2/3 -left-20 w-80 h-80 bg-sky-200/30 rounded-full blur-3xl" />
      </div>

      {/* Persistent App Header */}
      <div className="relative z-40">
        <Header
          currentTab={currentTab}
          onNavigate={(tab) => {
            setCurrentTab(tab);
            if (tab !== 'tool-workspace') setSelectedToolId(null);
          }}
          providerStatus={providerStatus}
          onOpenAuth={() => setAuthModalOpen(true)}
          user={user}
          onLogout={handleLogout}
          onSearch={handleSearch}
        />
      </div>

      {/* Main Dynamic View Content */}
      <main className="flex-1 relative z-10">
        {currentTab === 'home' && (
          <HomeView
            onSelectTool={handleSelectTool}
            onSelectCategory={handleSelectCategory}
            onNavigate={(tab) => setCurrentTab(tab)}
          />
        )}

        {currentTab === 'tools' && (
          <ToolsDirectoryView
            tools={tools}
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
            onSelectTool={handleSelectTool}
            initialCategory={selectedCategory}
            initialSearch={searchQuery}
          />
        )}

        {currentTab === 'tool-workspace' && activeTool && (
          <ToolWorkspaceView
            tool={activeTool}
            onBack={() => setCurrentTab('tools')}
            onNotify={addToast}
            projects={projects}
          />
        )}

        {currentTab === 'aeo-platform' && (
          <AEOPlatformView
            onNotify={addToast}
            onNavigate={(tab) => setCurrentTab(tab)}
          />
        )}

        {currentTab === 'dashboard' && (
          <DashboardView
            user={user}
            projects={projects}
            history={history}
            savedContent={savedContent}
            downloads={downloads}
            onRefreshData={loadData}
            onNotify={addToast}
            onSelectTool={handleSelectTool}
          />
        )}

        {currentTab === 'pricing' && (
          <PricingView
            currentPlan={user.plan}
            onNotify={addToast}
            onRefreshData={loadData}
          />
        )}

        {currentTab === 'blog' && <BlogView />}

        {currentTab === 'contact' && <ContactView onNotify={addToast} />}

        {currentTab === 'about' && <AboutView />}

        {currentTab === 'legal' && <LegalView />}
      </main>

      {/* Persistent Footer */}
      <Footer
        onNavigate={(tab) => {
          setCurrentTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onSelectCategory={handleSelectCategory}
      />

      {/* Auth Modal (Login / Register) */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        onLogin={handleLogin}
        onRegister={handleRegister}
      />

      {/* Global Toast Notification System */}
      <ToastContainer toasts={toasts} onDismiss={removeToast} />
    </div>
  );
}
