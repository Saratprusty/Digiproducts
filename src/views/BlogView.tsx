import React, { useState } from 'react';
import { BookOpen, ArrowRight, Clock, User, Sparkles, Tag, X } from 'lucide-react';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  readTime: string;
  date: string;
  category: string;
  content: string;
}

export const BlogView: React.FC = () => {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  const posts: BlogPost[] = [
    {
      id: 'aeo-geo-guide-2026',
      title: 'The Shift from SEO to AEO & GEO: How to Rank Inside ChatGPT and Perplexity',
      excerpt: 'Generative AI search engines no longer rely strictly on backlinks. Discover how direct answers, entity schema, and authoritative citations dictate generative visibility.',
      author: 'David Vance, Head of AI Search',
      readTime: '6 min read',
      date: 'Sept 14, 2026',
      category: 'AI Search & AEO',
      content: `### Introduction: The Evolution to Answer Engines\n\nFor over twenty-five years, digital discovery was governed by search engines indexing web pages and displaying "ten blue links." Today, executive decision-makers and consumers receive synthesized direct answers from models including ChatGPT (SearchGPT), Claude, Google Gemini, and Perplexity.\n\n### The Three Pillars of Generative Engine Optimization (GEO)\n\n1. **Direct Answer Density:** Models extract answers formatted in tight, unambiguous statements. Ensure your core product definitions answer: What is it? Who is it for? How does it integrate?\n\n2. **Entity Grounding:** Implement Schema.org Organization, SoftwareApplication, and FAQPage markup. Generative synthesizers query knowledge graphs to determine brand authority.\n\n3. **Third-Party Citation Consistency:** When models verify claims, they cross-examine authoritative industry indices. Inconsistent pricing or feature descriptions across directories degrade your visibility score.`,
    },
    {
      id: 'automating-creator-ops',
      title: 'Scaling Creator & Podcast Operations with Decoupled AI Workflows',
      excerpt: 'How top media studios automate YouTube transcripts, chapter timestamps, show notes, and LinkedIn threads within 90 seconds of recording.',
      author: 'Elena Rostova, Lead Automation Architect',
      readTime: '4 min read',
      date: 'Sept 10, 2026',
      category: 'Creator Ops',
      content: `### The Creator Ops Bottleneck\n\nMedia teams spend up to 70% of post-production time on clerical formatting: transcribing audio, extracting guest bios, writing SEO summaries, and resizing thumbnail imagery.\n\n### Building the Modern Workflow Pipeline\n\n- Ingest YouTube audio streams via reliable transcript endpoints.\n- Pass raw text through deterministic schema prompts to generate executive summaries.\n- Automatically trigger social post schedulers with customized platform tone rules.`,
    },
    {
      id: 'subscription-dunning-recovery',
      title: 'Recovering 34% of Lapsed Subscribers with Personalized AI Dunning Sequences',
      excerpt: 'Traditional rigid payment decline emails alienate customers. Learn how contextual messaging based on decline reasons recovers recurring SaaS revenue.',
      author: 'Marcus Brody, Revenue Ops',
      readTime: '5 min read',
      date: 'Sept 04, 2026',
      category: 'Revenue Operations',
      content: `### Why Generic Dunning Emails Fail\n\nWhen a credit card fails, sending "Your payment failed, please update your card" triggers defensive reactions or is dismissed as spam. \n\n### The Context-Aware Recovery Framework\n\n- **Soft Declines (Insufficient funds):** Retrying after 48 hours with an empathetic notice recovers over 40% without user intervention.\n- **Expired Cards:** Directing the user straight to an authenticated billing portal with Apple Pay or Google Pay reduces churn significantly.`,
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-sky-500/10 text-sky-400 border border-sky-500/20 uppercase tracking-wider">
          Thought Leadership & Guides
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          The AI Architecture Blog
        </h1>
        <p className="text-sm sm:text-base text-slate-300">
          In-depth playbooks on AEO search visibility, content automation, and enterprise generative engineering.
        </p>
      </div>

      {/* Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {posts.map((post) => (
          <div
            key={post.id}
            onClick={() => setSelectedPost(post)}
            className="rounded-2xl border border-slate-800 bg-[#151B2B] p-6 hover:border-sky-500/40 transition-all cursor-pointer flex flex-col justify-between group shadow-lg"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="px-2 py-0.5 rounded bg-sky-500/15 text-sky-300 font-semibold">
                  {post.category}
                </span>
                <span className="text-slate-500 flex items-center gap-1">
                  <Clock className="w-3 h-3" /> {post.readTime}
                </span>
              </div>
              <h3 className="text-lg font-bold text-white group-hover:text-sky-300 transition-colors leading-snug">
                {post.title}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed line-clamp-3">{post.excerpt}</p>
            </div>

            <div className="pt-5 border-t border-slate-800/80 mt-4 flex items-center justify-between text-xs text-slate-400">
              <span>{post.author.split(',')[0]}</span>
              <span className="text-sky-400 group-hover:translate-x-1 transition-transform flex items-center gap-1 font-semibold">
                Read Article <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Article Reader Modal */}
      {selectedPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in">
          <div className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-2xl border border-slate-800 bg-[#0F1424] p-6 sm:p-8 text-slate-100 shadow-2xl space-y-6">
            <button
              onClick={() => setSelectedPost(null)}
              className="absolute top-5 right-5 text-slate-400 hover:text-white p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-2">
              <span className="px-2.5 py-0.5 rounded text-xs font-bold bg-sky-500/20 text-sky-300">
                {selectedPost.category}
              </span>
              <h2 className="text-2xl font-bold text-white tracking-tight">{selectedPost.title}</h2>
              <div className="flex items-center gap-4 text-xs text-slate-400 pt-1">
                <span>By {selectedPost.author}</span>
                <span>•</span>
                <span>{selectedPost.date}</span>
                <span>•</span>
                <span>{selectedPost.readTime}</span>
              </div>
            </div>

            <div className="border-t border-slate-800 pt-4 text-sm text-slate-300 leading-relaxed whitespace-pre-wrap font-sans space-y-4">
              {selectedPost.content}
            </div>

            <div className="pt-4 border-t border-slate-800 flex justify-end">
              <button
                onClick={() => setSelectedPost(null)}
                className="px-4 py-2 rounded-lg bg-sky-500 text-white text-xs font-bold"
              >
                Close Article
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
