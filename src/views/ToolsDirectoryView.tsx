import React, { useState } from 'react';
import {
  Search,
  Star,
  Sparkles,
  ArrowRight,
  Filter,
  Check,
  Radar,
  FileText,
  Youtube,
  Target,
  RefreshCw,
  Layout,
  Image as ImageIcon,
  Users,
  Receipt,
  FileCheck,
  Briefcase,
  UserPlus,
  CheckSquare,
  ScanLine,
  FileCode,
  Key,
  Clock,
  Calendar,
  DownloadCloud,
  PackageCheck,
  Mic,
} from 'lucide-react';
import { ToolItem, ToolCategory } from '../types';

interface ToolsDirectoryViewProps {
  tools: ToolItem[];
  onSelectTool: (toolId: string) => void;
  favorites: string[];
  onToggleFavorite: (toolId: string) => void;
}

const ICON_MAP: Record<string, any> = {
  Radar,
  FileText,
  Youtube,
  Target,
  RefreshCw,
  Layout,
  Image: ImageIcon,
  Users,
  Receipt,
  FileCheck,
  Briefcase,
  UserPlus,
  CheckSquare,
  ScanLine,
  FileCode,
  Key,
  Clock,
  Calendar,
  DownloadCloud,
  PackageCheck,
  Mic,
};

export const ToolsDirectoryView: React.FC<ToolsDirectoryViewProps> = ({
  tools,
  onSelectTool,
  favorites,
  onToggleFavorite,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [badgeFilter, setBadgeFilter] = useState<'all' | 'free' | 'pro'>('all');
  const [onlyFavorites, setOnlyFavorites] = useState(false);

  const categories: string[] = [
    'All',
    'AI Search & AEO',
    'Business Utilities',
    'Content & Creator Ops',
    'HR & Recruiting',
    'Document Automation',
    'Sales & Lead Generation',
  ];

  const filteredTools = tools.filter((tool) => {
    const matchesSearch =
      tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.category.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = selectedCategory === 'All' || tool.category === selectedCategory;

    const matchesBadge =
      badgeFilter === 'all' ||
      (badgeFilter === 'free' && tool.badge === 'Free') ||
      (badgeFilter === 'pro' && (tool.badge === 'Pro' || tool.badge === 'Flagship' || tool.badge === 'Popular'));

    const matchesFav = !onlyFavorites || favorites.includes(tool.id);

    return matchesSearch && matchesCategory && matchesBadge && matchesFav;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header Banner */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-purple-100 text-purple-700 border border-purple-200 uppercase tracking-wider">
          Enterprise Tool Registry
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
          AI Tools Built to Get More Done
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          One workspace for content creation, marketing, productivity, sales, documents, recruiting,
          and AI search visibility optimization.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="space-y-4 rounded-2xl border border-purple-100 bg-white/90 p-4 sm:p-6 shadow-sm">
        <div className="flex flex-col md:flex-row items-center gap-3">
          {/* Search Input */}
          <div className="relative w-full md:flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search tools by name, workflow, or keyword (e.g. transcript, invoice, AEO)..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-purple-50/40 border border-purple-200 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-purple-500 focus:bg-white transition-colors"
            />
          </div>

          {/* Quick Badges Filter & Favorites Toggle */}
          <div className="flex items-center gap-2 w-full md:w-auto shrink-0 justify-between md:justify-start">
            <div className="inline-flex rounded-xl bg-purple-50/60 border border-purple-200/80 p-1">
              <button
                onClick={() => setBadgeFilter('all')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  badgeFilter === 'all' ? 'bg-purple-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                All Tools
              </button>
              <button
                onClick={() => setBadgeFilter('free')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  badgeFilter === 'free' ? 'bg-purple-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Free
              </button>
              <button
                onClick={() => setBadgeFilter('pro')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  badgeFilter === 'pro' ? 'bg-purple-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Pro & Flagship
              </button>
            </div>

            <button
              onClick={() => setOnlyFavorites(!onlyFavorites)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border transition-colors ${
                onlyFavorites
                  ? 'bg-amber-50 border-amber-300 text-amber-800'
                  : 'bg-white border-purple-200 text-slate-700 hover:text-slate-900 shadow-xs'
              }`}
            >
              <Star className={`w-3.5 h-3.5 ${onlyFavorites ? 'fill-amber-500 text-amber-500' : 'text-slate-400'}`} />
              <span>Favorites ({favorites.length})</span>
            </button>
          </div>
        </div>

        {/* Category Pills Bar */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none pt-1">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                  isSelected
                    ? 'bg-gradient-to-r from-sky-500 via-indigo-500 to-purple-600 text-white shadow-xs font-bold'
                    : 'bg-white text-slate-600 hover:text-slate-900 hover:bg-purple-50/80 border border-purple-100 shadow-xs'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Tools Cards Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs text-slate-500 px-1">
          <span>Showing {filteredTools.length} tools</span>
          {selectedCategory !== 'All' && <span className="font-medium text-purple-700">Category: {selectedCategory}</span>}
        </div>

        {filteredTools.length === 0 ? (
          <div className="text-center py-16 px-4 rounded-2xl border border-purple-100 bg-white/90 space-y-3 shadow-xs">
            <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mx-auto">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">No matching tools found</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Try adjusting your search query or reset your category and filter selections.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
                setBadgeFilter('all');
                setOnlyFavorites(false);
              }}
              className="px-4 py-2 rounded-lg bg-purple-600 text-white text-xs font-semibold hover:bg-purple-700 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTools.map((tool) => {
              const IconComp = ICON_MAP[tool.icon] || Sparkles;
              const isFav = favorites.includes(tool.id);

              let badgeStyle = 'bg-slate-100 text-slate-700 border-slate-200';
              if (tool.badge === 'Flagship') badgeStyle = 'bg-gradient-to-r from-sky-500 to-indigo-600 text-white border-transparent shadow-xs';
              else if (tool.badge === 'Free') badgeStyle = 'bg-emerald-50 text-emerald-700 border-emerald-200';
              else if (tool.badge === 'Pro') badgeStyle = 'bg-purple-50 text-purple-700 border-purple-200';
              else if (tool.badge === 'Popular') badgeStyle = 'bg-sky-50 text-sky-700 border-sky-200';

              return (
                <div
                  key={tool.id}
                  className="rounded-2xl border border-purple-100 bg-white/95 p-6 hover:border-purple-300 hover:shadow-md transition-all flex flex-col justify-between group shadow-xs relative"
                >
                  <div className="space-y-4">
                    {/* Header line */}
                    <div className="flex items-start justify-between">
                      <div className="w-10 h-10 rounded-xl bg-purple-50 border border-purple-200/80 p-2 flex items-center justify-center group-hover:border-purple-400 transition-colors">
                        <IconComp className="w-5 h-5 text-purple-600 group-hover:scale-110 transition-transform" />
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span
                          className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${badgeStyle}`}
                        >
                          {tool.badge}
                        </span>
                        <button
                          onClick={() => onToggleFavorite(tool.id)}
                          className="p-1 rounded-lg text-slate-400 hover:text-amber-500 transition-colors"
                          aria-label="Toggle favorite"
                        >
                          <Star
                            className={`w-4 h-4 ${
                              isFav ? 'fill-amber-400 text-amber-400' : 'text-slate-300'
                            }`}
                          />
                        </button>
                      </div>
                    </div>

                    {/* Tool details */}
                    <div>
                      <span className="text-[11px] font-semibold text-purple-700 uppercase tracking-wider">
                        {tool.category}
                      </span>
                      <h3 className="text-base font-bold text-slate-900 group-hover:text-purple-700 transition-colors mt-0.5">
                        {tool.name}
                      </h3>
                      <p className="text-xs text-slate-600 line-clamp-3 mt-1.5 leading-relaxed">
                        {tool.description}
                      </p>
                    </div>
                  </div>

                  {/* Bottom Action */}
                  <div className="pt-5 border-t border-purple-100 mt-4 flex items-center justify-between">
                    <span className="text-[11px] text-slate-500">
                      {tool.inputs.length} configurable fields
                    </span>
                    <button
                      onClick={() => onSelectTool(tool.id)}
                      className="px-3.5 py-1.5 rounded-lg text-xs font-bold text-purple-700 bg-purple-50 hover:bg-gradient-to-r hover:from-sky-500 hover:to-purple-600 hover:text-white transition-all flex items-center gap-1.5 border border-purple-200/80 hover:border-transparent"
                    >
                      <span>Try Tool</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
