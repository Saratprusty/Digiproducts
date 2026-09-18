import React, { useState } from 'react';
import {
  LayoutDashboard,
  FolderKanban,
  History,
  Bookmark,
  Download,
  Activity,
  CreditCard,
  Plus,
  Trash2,
  ExternalLink,
  Sparkles,
  Search,
  CheckCircle2,
  AlertCircle,
  Copy,
  TrendingUp,
} from 'lucide-react';
import { UserProfile, ProjectItem, HistoryItem, SavedContentItem, DownloadItem } from '../types';
import { createProject, deleteProject, deleteHistory, deleteSavedContent, upgradePlan } from '../services/api';

interface DashboardViewProps {
  user: UserProfile;
  projects: ProjectItem[];
  history: HistoryItem[];
  savedContent: SavedContentItem[];
  downloads: DownloadItem[];
  onRefreshData: () => void;
  onNotify: (msg: string, type?: 'success' | 'error' | 'info' | 'warning') => void;
  onSelectTool: (toolId: string) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  user,
  projects,
  history,
  savedContent,
  downloads,
  onRefreshData,
  onNotify,
  onSelectTool,
}) => {
  const [activeTab, setActiveTab] = useState<
    'overview' | 'projects' | 'history' | 'saved' | 'downloads' | 'usage' | 'billing'
  >('overview');

  // New project modal state
  const [showNewProjectModal, setShowNewProjectModal] = useState(false);
  const [newProjectName, setNewProjectName] = useState('');
  const [newProjectCategory, setNewProjectCategory] = useState('Marketing & SEO');

  const handleCreateProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProjectName.trim()) return;

    try {
      await createProject(newProjectName, newProjectCategory);
      setShowNewProjectModal(false);
      setNewProjectName('');
      onRefreshData();
      onNotify('Project created successfully!', 'success');
    } catch (err: any) {
      onNotify('Failed to create project', 'error');
    }
  };

  const handleDeleteProject = async (id: string) => {
    await deleteProject(id);
    onRefreshData();
    onNotify('Project deleted', 'info');
  };

  const handleDeleteHistory = async (id: string) => {
    await deleteHistory(id);
    onRefreshData();
    onNotify('History item removed', 'info');
  };

  const handleDeleteSaved = async (id: string) => {
    await deleteSavedContent(id);
    onRefreshData();
    onNotify('Saved item removed', 'info');
  };

  const handleUpgrade = async (planName: string) => {
    try {
      const res = await upgradePlan(planName);
      onRefreshData();
      onNotify(res.message || `Upgraded to ${planName}!`, 'success');
    } catch {
      onNotify('Upgrade checkout failed', 'error');
    }
  };

  const usagePercent = Math.min(100, Math.round((user.tokensUsed / user.tokensLimit) * 100));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            User Workspace Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
            Manage projects, generation history, saved assets, and plan allowances.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-3 py-1.5 rounded-xl bg-[#151B2B] border border-slate-800 text-xs text-slate-300">
            Active Plan: <span className="font-bold text-sky-400">{user.plan}</span>
          </div>
          <button
            onClick={() => setShowNewProjectModal(true)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-sky-500 hover:bg-sky-400 text-white shadow-md shadow-sky-500/20 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Create Project</span>
          </button>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 border-b border-slate-800">
        {[
          { id: 'overview', label: 'Overview', icon: LayoutDashboard },
          { id: 'projects', label: `My Projects (${projects.length})`, icon: FolderKanban },
          { id: 'history', label: `Tool History (${history.length})`, icon: History },
          { id: 'saved', label: `Saved Content (${savedContent.length})`, icon: Bookmark },
          { id: 'downloads', label: `Download Center (${downloads.length})`, icon: Download },
          { id: 'usage', label: 'API & Quota Usage', icon: Activity },
          { id: 'billing', label: 'Subscription & Billing', icon: CreditCard },
        ].map((tab) => {
          const IconComp = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-sky-500/15 text-sky-300 border border-sky-500/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
              }`}
            >
              <IconComp className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: OVERVIEW */}
      {activeTab === 'overview' && (
        <div className="space-y-8 animate-in fade-in">
          {/* Metrics Bento */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl border border-slate-800 bg-[#151B2B] shadow-lg">
              <div className="text-xs text-slate-400">Total Generations</div>
              <div className="text-2xl sm:text-3xl font-extrabold text-white mt-2">
                {user.generationsCount}
              </div>
              <div className="text-[11px] text-emerald-400 mt-1">Across 22+ AI workflows</div>
            </div>

            <div className="p-5 rounded-2xl border border-slate-800 bg-[#151B2B] shadow-lg">
              <div className="text-xs text-slate-400">Active Projects</div>
              <div className="text-2xl sm:text-3xl font-extrabold text-sky-400 mt-2">
                {projects.length}
              </div>
              <div className="text-[11px] text-slate-400 mt-1">Organized workspaces</div>
            </div>

            <div className="p-5 rounded-2xl border border-slate-800 bg-[#151B2B] shadow-lg">
              <div className="text-xs text-slate-400">Saved Artifacts</div>
              <div className="text-2xl sm:text-3xl font-extrabold text-purple-400 mt-2">
                {savedContent.length}
              </div>
              <div className="text-[11px] text-slate-400 mt-1">Ready for export</div>
            </div>

            <div className="p-5 rounded-2xl border border-slate-800 bg-[#151B2B] shadow-lg">
              <div className="text-xs text-slate-400">Monthly AI Tokens</div>
              <div className="text-2xl sm:text-3xl font-extrabold text-white mt-2">
                {user.tokensUsed.toLocaleString()} <span className="text-xs font-normal text-slate-500">/ {user.tokensLimit.toLocaleString()}</span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-slate-800 mt-2 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-sky-500 to-indigo-500 rounded-full"
                  style={{ width: `${usagePercent}%` }}
                />
              </div>
            </div>
          </div>

          {/* Quick Launch & Recent Runs */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-7 rounded-2xl border border-slate-800 bg-[#121826] p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h3 className="text-sm font-bold text-white">Recent Tool Activity</h3>
                <button
                  onClick={() => setActiveTab('history')}
                  className="text-xs text-sky-400 hover:underline"
                >
                  View All
                </button>
              </div>

              {history.length === 0 ? (
                <div className="text-center py-10 text-xs text-slate-500">
                  No tool activity yet. Run your first tool from the directory!
                </div>
              ) : (
                <div className="space-y-3">
                  {history.slice(0, 4).map((h) => (
                    <div
                      key={h.id}
                      className="p-3.5 rounded-xl border border-slate-800 bg-[#151B2B] flex items-center justify-between gap-4 text-xs"
                    >
                      <div className="space-y-0.5">
                        <div className="font-bold text-white">{h.toolName}</div>
                        <div className="text-slate-400">{h.inputSummary}</div>
                      </div>
                      <div className="text-right shrink-0">
                        <span className="font-mono text-emerald-400 font-medium">~{h.tokens} tok</span>
                        <div className="text-[10px] text-slate-500">
                          {new Date(h.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="lg:col-span-5 rounded-2xl border border-slate-800 bg-[#121826] p-6 space-y-4">
              <h3 className="text-sm font-bold text-white border-b border-slate-800 pb-3">
                Recommended Workflows
              </h3>
              <div className="space-y-2.5">
                {[
                  { id: 'aeo-geo-analyzer', name: 'AEO / GEO Search Visibility', desc: 'Audit citations across ChatGPT & Claude' },
                  { id: 'ai-blog-writer', name: 'AI Blog & Article Writer', desc: 'Rank on generative search engines' },
                  { id: 'lead-generation-copilot', name: 'Niche Lead Gen Copilot', desc: 'Qualified decision-maker lists' },
                  { id: 'youtube-transcript', name: 'Free YouTube Transcript', desc: 'Notes and summaries in seconds' },
                ].map((item) => (
                  <div
                    key={item.id}
                    onClick={() => onSelectTool(item.id)}
                    className="p-3 rounded-xl border border-slate-800 bg-[#151B2B] hover:border-sky-500/40 hover:bg-slate-800/60 cursor-pointer transition-all flex items-center justify-between group"
                  >
                    <div>
                      <div className="text-xs font-bold text-white group-hover:text-sky-300">
                        {item.name}
                      </div>
                      <div className="text-[11px] text-slate-400">{item.desc}</div>
                    </div>
                    <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-white" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: MY PROJECTS */}
      {activeTab === 'projects' && (
        <div className="space-y-6 animate-in fade-in">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400">Total Projects: {projects.length}</span>
            <button
              onClick={() => setShowNewProjectModal(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-sky-500 hover:bg-sky-400 text-white"
            >
              <Plus className="w-3.5 h-3.5" /> New Project
            </button>
          </div>

          {projects.length === 0 ? (
            <div className="text-center py-16 rounded-2xl border border-slate-800 bg-[#121826] space-y-3">
              <FolderKanban className="w-12 h-12 text-slate-500 mx-auto" />
              <h3 className="text-base font-bold text-white">No projects created yet</h3>
              <p className="text-xs text-slate-400">Group your generations, prompts, and lead lists into projects.</p>
              <button
                onClick={() => setShowNewProjectModal(true)}
                className="px-4 py-2 rounded-lg bg-sky-500 text-white text-xs font-semibold"
              >
                Create First Project
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {projects.map((proj) => (
                <div
                  key={proj.id}
                  className="rounded-2xl border border-slate-800 bg-[#151B2B] p-5 space-y-4 hover:border-slate-700 transition-all flex flex-col justify-between"
                >
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-800 text-sky-400">
                      {proj.category}
                    </span>
                    <h3 className="text-base font-bold text-white pt-1">{proj.name}</h3>
                    <p className="text-xs text-slate-400">Contains {proj.itemsCount} saved items</p>
                  </div>

                  <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs">
                    <span className="text-[11px] text-slate-500">
                      Updated {new Date(proj.updatedAt).toLocaleDateString()}
                    </span>
                    <button
                      onClick={() => handleDeleteProject(proj.id)}
                      className="p-1 text-slate-500 hover:text-rose-400 transition-colors"
                      title="Delete project"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 3: TOOL HISTORY */}
      {activeTab === 'history' && (
        <div className="rounded-2xl border border-slate-800 bg-[#121826] p-6 space-y-4 animate-in fade-in">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-sm font-bold text-white">Execution Audit Log</h3>
            <span className="text-xs text-slate-400">{history.length} records</span>
          </div>

          {history.length === 0 ? (
            <div className="text-center py-12 text-xs text-slate-500">No tool activity logged.</div>
          ) : (
            <div className="divide-y divide-slate-800/80">
              {history.map((item) => (
                <div
                  key={item.id}
                  className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                >
                  <div className="space-y-1">
                    <div className="font-bold text-white flex items-center gap-2">
                      <span>{item.toolName}</span>
                      <span className="px-1.5 py-0.2 rounded bg-emerald-500/10 text-emerald-400 text-[10px]">
                        {item.status}
                      </span>
                    </div>
                    <div className="text-slate-400">{item.inputSummary}</div>
                    <div className="text-slate-500 italic text-[11px] line-clamp-1">
                      {item.outputSnippet}
                    </div>
                  </div>
                  <div className="flex items-center gap-4 shrink-0">
                    <div className="text-right">
                      <span className="font-mono text-emerald-400">{item.tokens} tokens</span>
                      <div className="text-[10px] text-slate-500">
                        {new Date(item.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                    <button
                      onClick={() => handleDeleteHistory(item.id)}
                      className="p-1.5 text-slate-500 hover:text-rose-400 rounded-lg hover:bg-slate-800"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 4: SAVED CONTENT */}
      {activeTab === 'saved' && (
        <div className="rounded-2xl border border-slate-800 bg-[#121826] p-6 space-y-4 animate-in fade-in">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-sm font-bold text-white">Saved Artifacts & Folders</h3>
            <span className="text-xs text-slate-400">{savedContent.length} items</span>
          </div>

          {savedContent.length === 0 ? (
            <div className="text-center py-12 text-xs text-slate-500">
              No saved content yet. Save outputs directly from any tool workspace.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {savedContent.map((item) => (
                <div
                  key={item.id}
                  className="p-4 rounded-xl border border-slate-800 bg-[#151B2B] space-y-2 relative"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-800 text-purple-300">
                      {item.folder}
                    </span>
                    <button
                      onClick={() => handleDeleteSaved(item.id)}
                      className="text-slate-500 hover:text-rose-400 p-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <h4 className="text-sm font-bold text-white">{item.title}</h4>
                  <p className="text-xs text-slate-400 line-clamp-2">{item.snippet}</p>
                  <div className="pt-2 flex items-center justify-between text-[11px] text-slate-500 border-t border-slate-800/80">
                    <span>Generated by {item.tool}</span>
                    <span>{new Date(item.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 5: DOWNLOAD CENTER */}
      {activeTab === 'downloads' && (
        <div className="rounded-2xl border border-slate-800 bg-[#121826] p-6 space-y-4 animate-in fade-in">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-sm font-bold text-white">Download Center & Exports</h3>
            <span className="text-xs text-slate-400">{downloads.length} generated files</span>
          </div>

          <div className="divide-y divide-slate-800/80">
            {downloads.map((d) => (
              <div key={d.id} className="py-3 flex items-center justify-between text-xs">
                <div>
                  <div className="font-bold text-white">{d.fileName}</div>
                  <div className="text-slate-400">
                    {d.tool} • {d.format} • {d.size}
                  </div>
                </div>
                <span className="text-slate-500 text-[11px]">
                  {new Date(d.createdAt).toLocaleDateString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 6: API & QUOTA USAGE */}
      {activeTab === 'usage' && (
        <div className="rounded-2xl border border-slate-800 bg-[#121826] p-6 space-y-6 animate-in fade-in">
          <div>
            <h3 className="text-base font-bold text-white">API Quota & Token Meter</h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Current monthly cycle resets on October 1, 2026.
            </p>
          </div>

          <div className="p-5 rounded-xl border border-slate-800 bg-[#151B2B] space-y-3">
            <div className="flex items-center justify-between text-xs font-semibold">
              <span className="text-slate-300">Monthly AI Tokens</span>
              <span className="text-sky-400 font-mono">
                {user.tokensUsed.toLocaleString()} / {user.tokensLimit.toLocaleString()} ({usagePercent}%)
              </span>
            </div>
            <div className="w-full h-3 rounded-full bg-slate-800 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-sky-500 to-indigo-500 rounded-full transition-all"
                style={{ width: `${usagePercent}%` }}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded-xl border border-slate-800 bg-[#151B2B] space-y-1">
              <div className="text-slate-400">Active Rate Limit</div>
              <div className="text-base font-bold text-white">60 req / min</div>
            </div>
            <div className="p-4 rounded-xl border border-slate-800 bg-[#151B2B] space-y-1">
              <div className="text-slate-400">Concurrent Jobs</div>
              <div className="text-base font-bold text-white">4 instances</div>
            </div>
            <div className="p-4 rounded-xl border border-slate-800 bg-[#151B2B] space-y-1">
              <div className="text-slate-400">Export Allowance</div>
              <div className="text-base font-bold text-emerald-400">Unlimited</div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 7: SUBSCRIPTION & BILLING */}
      {activeTab === 'billing' && (
        <div className="space-y-6 animate-in fade-in">
          <div className="p-6 rounded-2xl border border-slate-800 bg-[#121826] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-sky-400">Active Tier</span>
              <h3 className="text-2xl font-extrabold text-white mt-0.5">{user.plan} Plan</h3>
              <p className="text-xs text-slate-400 mt-1">
                Next billing date: October 10, 2026 via Stripe Customer Portal.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => handleUpgrade('Business')}
                className="px-4 py-2.5 rounded-xl font-bold text-xs bg-gradient-to-r from-sky-500 to-indigo-600 text-white hover:from-sky-400 transition-all"
              >
                Upgrade to Business ($199/mo)
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create Project Modal */}
      {showNewProjectModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-[#0F1422] p-6 text-slate-100 shadow-2xl space-y-4">
            <h3 className="text-lg font-bold text-white">Create New Workspace Project</h3>
            <form onSubmit={handleCreateProject} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Project Name</label>
                <input
                  type="text"
                  required
                  value={newProjectName}
                  onChange={(e) => setNewProjectName(e.target.value)}
                  placeholder="e.g. Q4 Growth Initiatives"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#151B2B] border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-sky-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Category</label>
                <select
                  value={newProjectCategory}
                  onChange={(e) => setNewProjectCategory(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#151B2B] border border-slate-700 text-sm text-white focus:outline-none focus:border-sky-500"
                >
                  <option value="Marketing & SEO">Marketing & SEO</option>
                  <option value="Sales Development">Sales Development</option>
                  <option value="Product Ops">Product Ops</option>
                  <option value="HR & Hiring">HR & Hiring</option>
                  <option value="General">General</option>
                </select>
              </div>
              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowNewProjectModal(false)}
                  className="px-4 py-2 rounded-lg text-xs font-semibold text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg text-xs font-bold bg-sky-500 hover:bg-sky-400 text-white"
                >
                  Save Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
