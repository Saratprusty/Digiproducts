import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';
import { executeAI } from './server/providers/aiProvider.ts';
import { TOOLS_REGISTRY } from './server/data/toolsData.ts';

dotenv.config();

// In-memory data store for SaaS state
const db = {
  users: [
    {
      id: 'usr_demo_101',
      name: 'Sarah Chen',
      email: 'sarah.chen@enterprise.io',
      role: 'admin',
      plan: 'Professional',
      tokensUsed: 14200,
      tokensLimit: 50000,
      generationsCount: 38,
      createdAt: '2026-08-10T09:00:00.000Z',
    },
  ],
  projects: [
    {
      id: 'proj_01',
      userId: 'usr_demo_101',
      name: 'Q4 Enterprise AEO & Content Hub',
      category: 'Marketing & SEO',
      itemsCount: 14,
      updatedAt: '2026-09-15T14:30:00.000Z',
    },
    {
      id: 'proj_02',
      userId: 'usr_demo_101',
      name: 'B2B Fintech Lead Pipeline 2026',
      category: 'Sales Development',
      itemsCount: 8,
      updatedAt: '2026-09-14T10:15:00.000Z',
    },
    {
      id: 'proj_03',
      userId: 'usr_demo_101',
      name: 'Autonomous Operations Documentation',
      category: 'Product Ops',
      itemsCount: 5,
      updatedAt: '2026-09-12T16:45:00.000Z',
    },
  ],
  history: [
    {
      id: 'hist_01',
      userId: 'usr_demo_101',
      toolId: 'aeo-geo-analyzer',
      toolName: 'AEO / GEO AI Search Visibility Platform',
      inputSummary: 'Brand: Acme Cloud (B2B SaaS)',
      outputSnippet: 'AI Visibility Score: 78/100 across ChatGPT, Claude & Perplexity.',
      tokens: 340,
      status: 'completed',
      createdAt: '2026-09-15T12:20:00.000Z',
    },
    {
      id: 'hist_02',
      userId: 'usr_demo_101',
      toolId: 'ai-blog-writer',
      toolName: 'AI Blog & Article Writer',
      inputSummary: 'Topic: Autonomous Supply Chains',
      outputSnippet: '# Comprehensive Guide: Driving Scalable Growth in AI Supply...',
      tokens: 580,
      status: 'completed',
      createdAt: '2026-09-14T09:40:00.000Z',
    },
    {
      id: 'hist_03',
      userId: 'usr_demo_101',
      toolId: 'youtube-transcript',
      toolName: 'Free YouTube Transcript & Insights',
      inputSummary: 'URL: https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      outputSnippet: 'Extracted 14 key takeaways, executive summary, and 5 action points.',
      tokens: 210,
      status: 'completed',
      createdAt: '2026-09-13T16:10:00.000Z',
    },
  ],
  savedContent: [
    {
      id: 'saved_01',
      userId: 'usr_demo_101',
      title: 'Q4 AEO Search Optimization Brief',
      folder: 'AEO/GEO',
      tool: 'AEO / GEO AI Search Visibility Platform',
      snippet: 'Key optimizations for ChatGPT & Perplexity citation ranking with schema implementations.',
      createdAt: '2026-09-15T12:25:00.000Z',
    },
    {
      id: 'saved_02',
      userId: 'usr_demo_101',
      title: 'Autonomous Supply Chain Blog Draft',
      folder: 'Blog',
      tool: 'AI Blog & Article Writer',
      snippet: 'Full 1,800 word draft with H1-H3 headers, meta tags, and FAQ schema.',
      createdAt: '2026-09-14T09:50:00.000Z',
    },
  ],
  downloads: [
    {
      id: 'down_01',
      userId: 'usr_demo_101',
      fileName: 'AEO_Audit_Report_AcmeCloud.json',
      tool: 'AEO / GEO Analyzer',
      format: 'JSON',
      size: '24 KB',
      createdAt: '2026-09-15T12:25:00.000Z',
    },
    {
      id: 'down_02',
      userId: 'usr_demo_101',
      fileName: 'Fintech_Qualified_Leads_Batch1.csv',
      tool: 'Lead Generation Copilot',
      format: 'CSV',
      size: '86 KB',
      createdAt: '2026-09-14T15:10:00.000Z',
    },
  ],
};

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '15mb' }));
  app.use(express.urlencoded({ extended: true, limit: '15mb' }));

  // 1. Health & AI Provider Status
  app.get('/api/health', (req, res) => {
    res.json({
      status: 'ok',
      service: 'Digi Products Hub API',
      timestamp: new Date().toISOString(),
    });
  });

  app.get('/api/status', (req, res) => {
    const hasKey = Boolean(process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== 'MY_GEMINI_API_KEY');
    res.json({
      liveAI: hasKey,
      provider: hasKey ? 'Google Gemini (gemini-3.8-flash)' : 'Demo Mode (Simulated AI)',
      message: hasKey
        ? 'Connected to real-time Google Gemini API'
        : 'Running in high-fidelity Demo Mode. Add GEMINI_API_KEY in settings to enable live AI model generation.',
    });
  });

  // 2. Auth Endpoints
  app.post('/api/auth/login', (req, res) => {
    const { email } = req.body;
    const user = db.users[0];
    res.json({
      success: true,
      data: {
        user: {
          ...user,
          email: email || user.email,
        },
        token: 'jwt_mock_session_' + Date.now(),
      },
    });
  });

  app.post('/api/auth/register', (req, res) => {
    const { name, email } = req.body;
    const newUser = {
      id: 'usr_' + Math.random().toString(36).substr(2, 9),
      name: name || 'New User',
      email: email || 'user@example.com',
      role: 'member',
      plan: 'Starter',
      tokensUsed: 200,
      tokensLimit: 25000,
      generationsCount: 1,
      createdAt: new Date().toISOString(),
    };
    db.users.push(newUser);
    res.json({
      success: true,
      data: {
        user: newUser,
        token: 'jwt_mock_session_' + Date.now(),
      },
    });
  });

  app.get('/api/auth/me', (req, res) => {
    res.json({
      success: true,
      data: db.users[0],
    });
  });

  // 3. Tools Registry & Runner
  app.get('/api/tools', (req, res) => {
    res.json({
      success: true,
      data: TOOLS_REGISTRY,
    });
  });

  app.post('/api/tools/:toolId/run', async (req, res) => {
    const { toolId } = req.params;
    const inputs = req.body.inputs || {};
    const tool = TOOLS_REGISTRY.find((t) => t.id === toolId);

    if (!tool) {
      return res.status(404).json({
        success: false,
        error: { code: 'TOOL_NOT_FOUND', message: `Tool '${toolId}' is not recognized.` },
      });
    }

    try {
      const prompt = `Tool: ${tool.name}\nCategory: ${tool.category}\nInput Data: ${JSON.stringify(inputs, null, 2)}\n\nPlease process this request professionally and output the structured result formatted clearly in Markdown.`;
      const systemInstruction = `You are the executive AI engine for "${tool.name}" on the Digi Products Hub SaaS platform. Generate high-utility, structured, professional outputs without unnecessary chit-chat. Use markdown headings, bullet points, and code or tables where appropriate.`;

      const aiResponse = await executeAI(prompt, systemInstruction);

      // Record in history
      const histItem = {
        id: 'hist_' + Date.now(),
        userId: db.users[0].id,
        toolId: tool.id,
        toolName: tool.name,
        inputSummary: Object.entries(inputs)
          .map(([k, v]) => `${k}: ${String(v).slice(0, 30)}`)
          .join(', ')
          .slice(0, 100),
        outputSnippet: aiResponse.content.slice(0, 140) + '...',
        tokens: aiResponse.tokensUsed || 250,
        status: 'completed',
        createdAt: new Date().toISOString(),
      };
      db.history.unshift(histItem);
      db.users[0].tokensUsed += histItem.tokens;
      db.users[0].generationsCount += 1;

      res.json({
        success: true,
        data: {
          result: aiResponse.content,
          provider: aiResponse.provider,
          isDemo: aiResponse.isDemo,
          tokens: aiResponse.tokensUsed,
          historyId: histItem.id,
        },
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        error: { code: 'EXECUTION_FAILED', message: error.message || 'Failed to process AI tool request.' },
      });
    }
  });

  // 4. Specialized AEO / GEO Search Visibility Endpoint
  app.post('/api/aeo/analyze', async (req, res) => {
    const { websiteUrl, brandName, industry, competitors } = req.body;

    if (!websiteUrl || !brandName) {
      return res.status(400).json({
        success: false,
        error: { code: 'VALIDATION_ERROR', message: 'Website URL and Brand Name are required.' },
      });
    }

    // Dynamic analysis generation
    const visibilityScore = Math.floor(72 + Math.random() * 18);
    const mentionRate = Math.floor(65 + Math.random() * 20);
    const citationRate = Math.floor(55 + Math.random() * 25);
    const competitorMentions = Math.floor(30 + Math.random() * 25);

    const engines = [
      { name: 'ChatGPT (OpenAI Search)', visibility: Math.floor(70 + Math.random() * 25), citations: 84, sentiment: 'Highly Authoritative' },
      { name: 'Perplexity AI', visibility: Math.floor(75 + Math.random() * 20), citations: 92, sentiment: 'Top 3 Cited Source' },
      { name: 'Google Gemini', visibility: Math.floor(68 + Math.random() * 26), citations: 78, sentiment: 'Entity Associated' },
      { name: 'Claude (Anthropic)', visibility: Math.floor(74 + Math.random() * 20), citations: 88, sentiment: 'Strong Technical Trust' },
      { name: 'Microsoft Copilot', visibility: Math.floor(65 + Math.random() * 25), citations: 72, sentiment: 'Enterprise Grounded' },
    ];

    const promptCoverage = [
      { prompt: `What are the best ${industry || 'software'} solutions?`, brandRank: '#2 Cited', shareOfVoice: '28%', status: 'Dominant' },
      { prompt: `Compare ${brandName} vs alternatives`, brandRank: '#1 Direct Answer', shareOfVoice: '44%', status: 'Defended' },
      { prompt: `How does ${brandName} handle security compliance?`, brandRank: 'Cited in Overview', shareOfVoice: '35%', status: 'Optimized' },
      { prompt: `Top enterprise tools for high-growth teams in 2026`, brandRank: '#4 Mention', shareOfVoice: '16%', status: 'Opportunity' },
    ];

    const actions = [
      {
        id: 'act_01',
        title: 'Publish Direct Answer FAQ Schema for Core Product Definitions',
        impact: 'High (+12% Citation Rate)',
        type: 'Schema & Technical',
        status: 'Actionable',
      },
      {
        id: 'act_02',
        title: 'Synthesize Comparison Landing Page Against Top 2 Named Competitors',
        impact: 'Very High (+18% ChatGPT Share)',
        type: 'GEO Content',
        status: 'Actionable',
      },
      {
        id: 'act_03',
        title: 'Optimize robots.txt and add llms.txt standard index file',
        impact: 'Medium (+8% Crawler Coverage)',
        type: 'Crawler Directives',
        status: 'Actionable',
      },
    ];

    res.json({
      success: true,
      data: {
        target: { websiteUrl, brandName, industry, competitors },
        metrics: {
          visibilityScore,
          mentionRate: `${mentionRate}%`,
          citationRate: `${citationRate}%`,
          competitorMentions: `${competitorMentions}%`,
          shareOfVoice: `${Math.round((mentionRate + citationRate) / 2)}%`,
        },
        engines,
        promptCoverage,
        actions,
        analyzedAt: new Date().toISOString(),
      },
    });
  });

  // 5. Specialized YouTube Transcript Endpoint
  app.post('/api/youtube/transcript', async (req, res) => {
    const { url, format } = req.body;
    if (!url) {
      return res.status(400).json({
        success: false,
        error: { code: 'INVALID_URL', message: 'A valid YouTube URL is required.' },
      });
    }

    // Extract video ID
    const match = url.match(/(?:v=|youtu\.be\/|embed\/)([a-zA-Z0-9_-]{11})/);
    const videoId = match ? match[1] : 'sample_vid_id';

    const transcriptLines = [
      { time: '00:00', text: 'Welcome to this in-depth guide on deploying next-generation intelligent agents.' },
      { time: '00:45', text: 'Today we are focusing on solving the two largest bottlenecks: real-time latency and validation safety.' },
      { time: '02:10', text: 'Notice how separating the ingestion layer from the execution runtime prevents queuing choke points.' },
      { time: '04:30', text: 'Now let us examine the benchmark results across standard enterprise workloads.' },
      { time: '06:15', text: 'By implementing deterministic guardrails, hallucination rates drop by over 88%.' },
      { time: '08:40', text: 'In conclusion, prioritize modular tool registries and strict schema validations.' },
    ];

    const summary = 'This video provides a deep technical breakdown of deploying production-grade AI agents, focusing on decoupled runtime ingestion and deterministic safety guardrails that reduce errors by 88%.';

    const keyPoints = [
      'Separation of ingestion from execution prevents concurrency bottlenecks.',
      'Deterministic output schemas provide auditability in regulated environments.',
      'Latency optimizations reduce roundtrip inference by up to 35%.',
      'Continuous monitoring ensures high-availability agent operations.',
    ];

    const faqs = [
      { q: 'What is the main advantage of decoupled agent architectures?', a: 'It isolates network ingestion from LLM reasoning, allowing independent scaling and zero dropped events.' },
      { q: 'How do deterministic guardrails stop hallucinations?', a: 'By validating JSON schemas and strict typing before passing outputs to downstream services.' },
    ];

    res.json({
      success: true,
      data: {
        videoId,
        title: 'Mastering AI Agent Workflows & System Architecture',
        duration: '10:24',
        transcript: transcriptLines,
        summary,
        keyPoints,
        faqs,
        formatSelected: format || 'Full Transcript',
      },
    });
  });

  // 6. Specialized Lead Generation Copilot Endpoint
  app.post('/api/leads/generate', async (req, res) => {
    const { industry, geography, targetTitle, companySize, qualificationCriteria } = req.body;

    const leads = [
      {
        company: 'Vanguard Payments Inc',
        website: 'https://vanguardpay.example.com',
        industry: industry || 'Fintech',
        location: geography || 'San Francisco, CA',
        contactRole: targetTitle || 'VP of Engineering',
        businessEmail: 'lead.contact@vanguardpay.example.com',
        source: 'Verified Entity Index',
        qualification: 'Exceeds Criteria (Active Cloud Migration)',
        leadScore: 94,
        reason: 'Currently scaling transaction infrastructure with open budget allocations.',
        status: 'Verified Hot Lead',
      },
      {
        company: 'Aetheria Health Systems',
        website: 'https://aetheriahealth.example.com',
        industry: industry || 'Healthtech',
        location: geography || 'Boston, MA',
        contactRole: targetTitle || 'Chief Technology Officer',
        businessEmail: 'tech.exec@aetheriahealth.example.com',
        source: 'Corporate Filings',
        qualification: 'High Match (SOC-2 Compliant)',
        leadScore: 89,
        reason: 'Evaluating automated workflow tools for clinical operations.',
        status: 'Qualified',
      },
      {
        company: 'Apex Logistics Global',
        website: 'https://apexlogistics.example.com',
        industry: industry || 'Logistics & Supply Chain',
        location: geography || 'Chicago, IL',
        contactRole: targetTitle || 'Director of Digital Transformation',
        businessEmail: 'transform@apexlogistics.example.com',
        source: 'Industry Directory',
        qualification: 'Standard Match',
        leadScore: 82,
        reason: 'Multi-facility operations seeking route optimization platforms.',
        status: 'Engaged',
      },
      {
        company: 'CipherShield Defense',
        website: 'https://ciphershield.example.com',
        industry: industry || 'Cybersecurity',
        location: geography || 'Austin, TX',
        contactRole: targetTitle || 'Head of SecOps',
        businessEmail: 'secops@ciphershield.example.com',
        source: 'Enterprise Graph',
        qualification: 'Strong Fit',
        leadScore: 86,
        reason: 'Upgrading internal threat intelligence analysis stack.',
        status: 'Qualified',
      },
    ];

    res.json({
      success: true,
      data: {
        criteria: { industry, geography, targetTitle, companySize, qualificationCriteria },
        totalFound: 42,
        returnedLeads: leads,
        generatedAt: new Date().toISOString(),
      },
    });
  });

  // 7. Projects Endpoints
  app.get('/api/projects', (req, res) => {
    res.json({ success: true, data: db.projects });
  });

  app.post('/api/projects', (req, res) => {
    const { name, category } = req.body;
    const newProj = {
      id: 'proj_' + Date.now(),
      userId: db.users[0].id,
      name: name || 'Untitled Project',
      category: category || 'General',
      itemsCount: 0,
      updatedAt: new Date().toISOString(),
    };
    db.projects.unshift(newProj);
    res.json({ success: true, data: newProj });
  });

  app.delete('/api/projects/:id', (req, res) => {
    db.projects = db.projects.filter((p) => p.id !== req.params.id);
    res.json({ success: true });
  });

  // 8. History Endpoints
  app.get('/api/history', (req, res) => {
    res.json({ success: true, data: db.history });
  });

  app.delete('/api/history/:id', (req, res) => {
    db.history = db.history.filter((h) => h.id !== req.params.id);
    res.json({ success: true });
  });

  // 9. Saved Content Endpoints
  app.get('/api/saved', (req, res) => {
    res.json({ success: true, data: db.savedContent });
  });

  app.post('/api/saved', (req, res) => {
    const { title, folder, tool, snippet } = req.body;
    const item = {
      id: 'saved_' + Date.now(),
      userId: db.users[0].id,
      title: title || 'Saved Output',
      folder: folder || 'General',
      tool: tool || 'AI Tool',
      snippet: snippet || '',
      createdAt: new Date().toISOString(),
    };
    db.savedContent.unshift(item);
    res.json({ success: true, data: item });
  });

  app.delete('/api/saved/:id', (req, res) => {
    db.savedContent = db.savedContent.filter((s) => s.id !== req.params.id);
    res.json({ success: true });
  });

  // 10. Downloads Center
  app.get('/api/downloads', (req, res) => {
    res.json({ success: true, data: db.downloads });
  });

  app.post('/api/downloads', (req, res) => {
    const { fileName, tool, format, size } = req.body;
    const record = {
      id: 'down_' + Date.now(),
      userId: db.users[0].id,
      fileName,
      tool,
      format,
      size: size || '12 KB',
      createdAt: new Date().toISOString(),
    };
    db.downloads.unshift(record);
    res.json({ success: true, data: record });
  });

  // 11. Usage & Billing Endpoints
  app.get('/api/usage', (req, res) => {
    const user = db.users[0];
    res.json({
      success: true,
      data: {
        tokensUsed: user.tokensUsed,
        tokensLimit: user.tokensLimit,
        percentage: Math.min(100, Math.round((user.tokensUsed / user.tokensLimit) * 100)),
        generationsCount: user.generationsCount,
        plan: user.plan,
        resetDate: 'October 1, 2026',
      },
    });
  });

  app.post('/api/billing/checkout', (req, res) => {
    const { plan } = req.body;
    db.users[0].plan = plan || 'Professional';
    if (plan === 'Business') {
      db.users[0].tokensLimit = 250000;
    } else if (plan === 'Professional') {
      db.users[0].tokensLimit = 100000;
    } else {
      db.users[0].tokensLimit = 50000;
    }
    res.json({
      success: true,
      data: {
        checkoutUrl: '#success',
        status: 'active',
        newPlan: db.users[0].plan,
        message: `Upgraded subscription to ${db.users[0].plan} tier. Limits expanded.`,
      },
    });
  });

  // 12. Contact Inquiries Endpoint
  app.post('/api/contact', (req, res) => {
    const { name, email, subject, message } = req.body;
    if (!email || !message) {
      return res.status(400).json({
        success: false,
        error: { code: 'VALIDATION_ERROR', message: 'Email and message are required.' },
      });
    }
    res.json({
      success: true,
      message: 'Inquiry received. Our enterprise support team will respond within 4 business hours.',
    });
  });

  // Central Error Handler
  app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error('Server error:', err);
    res.status(500).json({
      success: false,
      error: { code: 'INTERNAL_SERVER_ERROR', message: err.message || 'An unexpected error occurred.' },
    });
  });

  // Vite middleware for development vs static build in production
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Digi Products Hub server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
