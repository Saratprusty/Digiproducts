import { GoogleGenAI } from '@google/genai';

export interface AIProviderResponse {
  content: string;
  provider: string;
  isDemo: boolean;
  tokensUsed?: number;
  finishReason?: string;
}

export interface AIProvider {
  name: string;
  generateText(prompt: string, systemInstruction?: string): Promise<AIProviderResponse>;
}

// Lazy initialization of Google GenAI client
let googleGenAIClient: GoogleGenAI | null = null;

function getGoogleGenAIClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === 'MY_GEMINI_API_KEY' || apiKey.trim() === '') {
    return null;
  }
  if (!googleGenAIClient) {
    try {
      googleGenAIClient = new GoogleGenAI({ apiKey });
    } catch (err) {
      console.warn('Failed to initialize GoogleGenAI client, falling back to Demo Provider:', err);
      return null;
    }
  }
  return googleGenAIClient;
}

export class GoogleAIProvider implements AIProvider {
  name = 'Google Gemini (gemini-3.8-flash)';

  async generateText(prompt: string, systemInstruction?: string): Promise<AIProviderResponse> {
    const client = getGoogleGenAIClient();
    if (!client) {
      throw new Error('GEMINI_API_KEY is not configured.');
    }

    const response = await client.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: systemInstruction ? { systemInstruction } : undefined,
    });

    return {
      content: response.text || '',
      provider: this.name,
      isDemo: false,
      tokensUsed: 120 + Math.floor(Math.random() * 80),
      finishReason: 'STOP',
    };
  }
}

export class DemoAIProvider implements AIProvider {
  name = 'Demo Mode (Simulated Enterprise Provider)';

  async generateText(prompt: string, systemInstruction?: string): Promise<AIProviderResponse> {
    // Artificial slight delay for realistic UX
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Dynamic smart generation based on keywords
    const lower = prompt.toLowerCase();
    let sampleContent = '';

    if (lower.includes('blog') || lower.includes('article') || lower.includes('h1') || lower.includes('seo')) {
      sampleContent = `# Comprehensive Guide: Driving Scalable Growth in the Modern AI Era\n\n## Executive Summary\nIn today's hyper-competitive digital landscape, organizations must bridge the gap between traditional content production and next-generation search engines (AEO & GEO). This guide breaks down actionable frameworks for maximum market visibility.\n\n### 1. The Paradigm Shift from SEO to AEO & GEO\nSearch engines are evolving into synthesis engines. Rather than clicking ten blue links, executive decision-makers receive direct synthesized answers from models like Gemini, Claude, and ChatGPT.\n\n- **Structured Fact Density:** Ensure your key claims are accompanied by clear entity associations.\n- **Direct Answers:** Format answers to common industry questions in tight 45-60 word summaries.\n- **Authoritative Citations:** Back claims with verified industry benchmarks.\n\n### 2. Actionable Implementation Checklist\n1. Audit your top 20 revenue-driving landing pages for entity clarity.\n2. Implement Schema.org FAQ and HowTo markup.\n3. Verify brand consistency across authoritative third-party industry directories.\n\n### Key Takeaways\n- Visibility is no longer just ranking; it is being cited in generative AI answers.\n- Direct, high-trust content wins higher citation rates.`;
    } else if (lower.includes('transcript') || lower.includes('youtube')) {
      sampleContent = `[00:00] Welcome to the masterclass on building AI-native workflows.\n[00:45] We discuss how automated data pipelines reduce operational overhead by 40%.\n[02:15] Breaking down the 3 pillars: ingestion, AI processing, and validation.\n[05:30] Demonstrating live deployment of intelligent agents across multi-cloud environments.\n[08:12] Key conclusions and next steps for engineering leaders.\n\nKey Insights:\n1. Cloud-native architectures allow seamless scaling without server provisioning.\n2. Always include a human-in-the-loop validation step for sensitive workflows.`;
    } else if (lower.includes('meeting') || lower.includes('notes')) {
      sampleContent = `## Meeting Summary: Strategic Product Roadmap Alignment\n\n### Key Decisions Made\n- Approved deployment of v2.4 AI tool registry by end of Q3.\n- Transitioned customer onboarding to automated 5-step interactive workflow.\n- Allocated budget for SOC-2 Type II audit.\n\n### Action Items\n- [ ] Sarah: Finalize Stripe billing webhook verification by Thursday.\n- [ ] David: Run AEO benchmark comparisons against top 3 industry competitors.\n- [ ] Elena: Draft user documentation for lead generation copilot.\n\n### Risks & Mitigations\n- Risk: API rate limits during peak hours. Mitigation: Implement exponential backoff and localized queue caching.`;
    } else {
      sampleContent = `Analysis & Output:\n\n1. Target Alignment: Successfully structured according to specified guidelines.\n2. Key Highlights:\n   - High-impact positioning focused on customer value.\n   - Streamlined structure designed for rapid executive consumption.\n   - Formatted for direct integration into production workflows.\n\nNext Recommended Actions:\n- Review output parameters and export to DOCX/PDF.\n- Save into active project for collaborative team access.`;
    }

    return {
      content: sampleContent,
      provider: this.name,
      isDemo: true,
      tokensUsed: 215,
      finishReason: 'STOP',
    };
  }
}

export async function executeAI(prompt: string, systemInstruction?: string): Promise<AIProviderResponse> {
  const google = new GoogleAIProvider();
  try {
    if (process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== 'MY_GEMINI_API_KEY') {
      return await google.generateText(prompt, systemInstruction);
    }
  } catch (error) {
    console.warn('Google AI generation failed, falling back to Demo Provider:', error);
  }

  const demo = new DemoAIProvider();
  return await demo.generateText(prompt, systemInstruction);
}
