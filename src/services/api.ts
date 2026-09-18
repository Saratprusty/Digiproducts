import { ToolItem, UserProfile, ProjectItem, HistoryItem, SavedContentItem, DownloadItem, AEOAnalysisResult, YouTubeTranscriptResult, LeadItem } from '../types';

const API_BASE = '/api';

export async function checkStatus(): Promise<{ liveAI: boolean; provider: string; message: string }> {
  try {
    const res = await fetch(`${API_BASE}/status`);
    if (!res.ok) throw new Error('Status endpoint error');
    return await res.json();
  } catch (err) {
    return {
      liveAI: false,
      provider: 'Demo Mode (Simulated AI)',
      message: 'Running in high-fidelity Demo Mode.',
    };
  }
}

export async function checkHealth(): Promise<{ geminiLive: boolean; aiProvider: string }> {
  try {
    const res = await fetch(`${API_BASE}/health`);
    if (res.ok) {
      const data = await res.json();
      return {
        geminiLive: data.geminiLive ?? false,
        aiProvider: data.aiProvider || 'High-Fidelity AI Demo Engine',
      };
    }
  } catch {}
  return {
    geminiLive: false,
    aiProvider: 'High-Fidelity AI Demo Engine',
  };
}

export async function loginUser(email: string, password?: string): Promise<{ user: UserProfile; token: string }> {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  const json = await res.json();
  if (!json.success) throw new Error(json.error?.message || 'Login failed');
  return json.data;
}

export async function registerUser(name: string, email: string, password?: string): Promise<{ user: UserProfile; token: string }> {
  const res = await fetch(`${API_BASE}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password }),
  });
  const json = await res.json();
  if (!json.success) throw new Error(json.error?.message || 'Registration failed');
  return json.data;
}

export async function getCurrentUser(): Promise<UserProfile> {
  return fetchUserProfile();
}

export async function fetchDashboardData(): Promise<{
  user?: UserProfile;
  projects: ProjectItem[];
  history: HistoryItem[];
  savedContent: SavedContentItem[];
  downloads: DownloadItem[];
}> {
  try {
    const res = await fetch(`${API_BASE}/dashboard`);
    if (res.ok) {
      const json = await res.json();
      if (json.success && json.data) {
        return json.data;
      }
    }
  } catch {}

  // Fallback to parallel sub-requests
  const [user, projects, history, savedContent, downloads] = await Promise.all([
    fetchUserProfile(),
    fetchProjects(),
    fetchHistory(),
    fetchSavedContent(),
    fetchDownloads(),
  ]);

  return {
    user,
    projects,
    history,
    savedContent,
    downloads,
  };
}

export async function fetchTools(): Promise<ToolItem[]> {
  try {
    const res = await fetch(`${API_BASE}/tools`);
    const json = await res.json();
    return json.data || [];
  } catch (err) {
    console.warn('Using fallback tools data', err);
    return [];
  }
}

export async function runTool(toolId: string, inputs: Record<string, any>): Promise<{
  result: string;
  provider: string;
  isDemo: boolean;
  tokens?: number;
}> {
  const res = await fetch(`${API_BASE}/tools/${toolId}/run`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ inputs }),
  });
  const json = await res.json();
  if (!json.success) {
    throw new Error(json.error?.message || 'Tool execution failed');
  }
  return json.data;
}

export async function runAEOAnalysis(data: {
  websiteUrl: string;
  brandName: string;
  industry: string;
  competitors?: string;
}): Promise<AEOAnalysisResult> {
  const res = await fetch(`${API_BASE}/aeo/analyze`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  const json = await res.json();
  if (!json.success) {
    throw new Error(json.error?.message || 'AEO analysis failed');
  }
  return json.data;
}

export async function fetchYouTubeTranscript(url: string, format: string): Promise<YouTubeTranscriptResult> {
  const res = await fetch(`${API_BASE}/youtube/transcript`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ url, format }),
  });
  const json = await res.json();
  if (!json.success) {
    throw new Error(json.error?.message || 'Transcript extraction failed');
  }
  return json.data;
}

export async function generateLeads(data: {
  industry: string;
  geography: string;
  targetTitle: string;
  companySize: string;
  qualificationCriteria: string;
}): Promise<{ totalFound: number; returnedLeads: LeadItem[] }> {
  const res = await fetch(`${API_BASE}/leads/generate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  const json = await res.json();
  if (!json.success) {
    throw new Error(json.error?.message || 'Lead generation failed');
  }
  return json.data;
}

export async function fetchUserProfile(): Promise<UserProfile> {
  try {
    const res = await fetch(`${API_BASE}/auth/me`);
    const json = await res.json();
    return json.data;
  } catch {
    return {
      id: 'usr_demo_101',
      name: 'Sarah Chen',
      email: 'sarah.chen@enterprise.io',
      role: 'admin',
      plan: 'Professional',
      tokensUsed: 14200,
      tokensLimit: 50000,
      generationsCount: 38,
      createdAt: '2026-08-10T09:00:00.000Z',
    };
  }
}

export async function fetchProjects(): Promise<ProjectItem[]> {
  try {
    const res = await fetch(`${API_BASE}/projects`);
    const json = await res.json();
    return json.data || [];
  } catch {
    return [];
  }
}

export async function createProject(name: string, category: string): Promise<ProjectItem> {
  const res = await fetch(`${API_BASE}/projects`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, category }),
  });
  const json = await res.json();
  return json.data;
}

export async function deleteProject(id: string): Promise<void> {
  await fetch(`${API_BASE}/projects/${id}`, { method: 'DELETE' });
}

export async function fetchHistory(): Promise<HistoryItem[]> {
  try {
    const res = await fetch(`${API_BASE}/history`);
    const json = await res.json();
    return json.data || [];
  } catch {
    return [];
  }
}

export async function deleteHistory(id: string): Promise<void> {
  await fetch(`${API_BASE}/history/${id}`, { method: 'DELETE' });
}

export async function fetchSavedContent(): Promise<SavedContentItem[]> {
  try {
    const res = await fetch(`${API_BASE}/saved`);
    const json = await res.json();
    return json.data || [];
  } catch {
    return [];
  }
}

export async function saveContent(data: { title: string; folder: string; tool: string; snippet: string }): Promise<SavedContentItem> {
  const res = await fetch(`${API_BASE}/saved`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  const json = await res.json();
  return json.data;
}

export async function deleteSavedContent(id: string): Promise<void> {
  await fetch(`${API_BASE}/saved/${id}`, { method: 'DELETE' });
}

export async function fetchDownloads(): Promise<DownloadItem[]> {
  try {
    const res = await fetch(`${API_BASE}/downloads`);
    const json = await res.json();
    return json.data || [];
  } catch {
    return [];
  }
}

export async function recordDownload(data: { fileName: string; tool: string; format: string; size: string }): Promise<DownloadItem> {
  const res = await fetch(`${API_BASE}/downloads`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  const json = await res.json();
  return json.data;
}

export async function upgradePlan(plan: string): Promise<{ newPlan: string; message: string }> {
  const res = await fetch(`${API_BASE}/billing/checkout`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ plan }),
  });
  const json = await res.json();
  return json.data;
}

export async function sendContactInquiry(data: { name: string; email: string; subject: string; message: string }): Promise<string> {
  const res = await fetch(`${API_BASE}/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  const json = await res.json();
  if (!json.success) throw new Error(json.error?.message || 'Failed to submit message.');
  return json.message;
}
