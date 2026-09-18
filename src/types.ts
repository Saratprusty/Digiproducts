export type NavigationTab =
  | 'home'
  | 'tools'
  | 'tool-workspace'
  | 'aeo-platform'
  | 'dashboard'
  | 'pricing'
  | 'blog'
  | 'contact'
  | 'about'
  | 'legal';

export type ToolCategory =
  | 'All'
  | 'AI Search & AEO'
  | 'Business Utilities'
  | 'Content & Creator Ops'
  | 'HR & Recruiting'
  | 'Document Automation'
  | 'Sales & Lead Generation';

export interface ToolInputConfig {
  id: string;
  label: string;
  type: 'text' | 'textarea' | 'select' | 'number' | 'file';
  placeholder?: string;
  defaultValue?: any;
  options?: string[];
  required?: boolean;
}

export interface ToolItem {
  id: string;
  name: string;
  category: string;
  description: string;
  badge: 'Free' | 'Premium' | 'Pro' | 'Flagship' | 'Popular';
  icon: string;
  popular?: boolean;
  featured?: boolean;
  inputs: ToolInputConfig[];
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: string;
  plan: 'Free' | 'Starter' | 'Professional' | 'Business';
  tokensUsed: number;
  tokensLimit: number;
  generationsCount: number;
  createdAt: string;
}

export interface ProjectItem {
  id: string;
  userId: string;
  name: string;
  category: string;
  itemsCount: number;
  updatedAt: string;
}

export interface HistoryItem {
  id: string;
  userId: string;
  toolId: string;
  toolName: string;
  inputSummary: string;
  outputSnippet: string;
  tokens: number;
  status: 'completed' | 'failed' | 'in-progress';
  createdAt: string;
}

export interface SavedContentItem {
  id: string;
  userId: string;
  title: string;
  folder: string;
  tool: string;
  snippet: string;
  createdAt: string;
}

export interface DownloadItem {
  id: string;
  userId: string;
  fileName: string;
  tool: string;
  format: string;
  size: string;
  createdAt: string;
}

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  message: string;
}

export interface AEOAnalysisResult {
  target: {
    websiteUrl: string;
    brandName: string;
    industry: string;
    competitors?: string;
  };
  metrics: {
    visibilityScore: number;
    mentionRate: string;
    citationRate: string;
    competitorMentions: string;
    shareOfVoice: string;
  };
  engines: {
    name: string;
    visibility: number;
    citations: number;
    sentiment: string;
  }[];
  promptCoverage: {
    prompt: string;
    brandRank: string;
    shareOfVoice: string;
    status: string;
  }[];
  actions: {
    id: string;
    title: string;
    impact: string;
    type: string;
    status: string;
  }[];
  analyzedAt: string;
}

export interface YouTubeTranscriptResult {
  videoId: string;
  title: string;
  duration: string;
  transcript: { time: string; text: string }[];
  summary: string;
  keyPoints: string[];
  faqs: { q: string; a: string }[];
  formatSelected: string;
}

export interface LeadItem {
  company: string;
  website: string;
  industry: string;
  location: string;
  contactRole: string;
  businessEmail: string;
  source: string;
  qualification: string;
  leadScore: number;
  reason: string;
  status: string;
}
