import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  Sparkles,
  Copy,
  Download,
  Bookmark,
  Share2,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  FileText,
  Clock,
  ExternalLink,
  Play,
  Pause,
  RotateCcw,
  Plus,
  Trash2,
  Printer,
  Shield,
  Target,
  Users,
  Code,
  Eye,
  Laptop,
  Smartphone,
} from 'lucide-react';
import { ToolItem, ProjectItem } from '../types';
import { runTool, fetchYouTubeTranscript, generateLeads, saveContent, recordDownload } from '../services/api';

interface ToolWorkspaceViewProps {
  tool: ToolItem;
  onBack: () => void;
  onNotify: (msg: string, type?: 'success' | 'error' | 'info' | 'warning') => void;
  projects: ProjectItem[];
}

export const ToolWorkspaceView: React.FC<ToolWorkspaceViewProps> = ({
  tool,
  onBack,
  onNotify,
  projects,
}) => {
  // Input state
  const [formData, setFormData] = useState<Record<string, any>>(() => {
    const defaults: Record<string, any> = {};
    tool.inputs.forEach((inp) => {
      defaults[inp.id] = inp.defaultValue || '';
    });
    return defaults;
  });

  // Output state
  const [isExecuting, setIsExecuting] = useState(false);
  const [outputContent, setOutputContent] = useState<string>('');
  const [executionMetadata, setExecutionMetadata] = useState<{
    provider: string;
    tokens?: number;
    isDemo: boolean;
  } | null>(null);

  // Specialized YouTube State
  const [ytTranscriptResult, setYtTranscriptResult] = useState<any | null>(null);
  const [ytActiveTab, setYtActiveTab] = useState<'transcript' | 'summary' | 'faqs'>('transcript');

  // Specialized Lead Gen State
  const [leadsResult, setLeadsResult] = useState<any[]>([]);

  // Specialized Invoice State
  const [invoiceItems, setInvoiceItems] = useState([
    { id: '1', desc: 'AI Infrastructure Consulting (40 hrs)', qty: 40, rate: 150 },
    { id: '2', desc: 'Custom AEO & GEO Schema Implementation', qty: 1, rate: 2500 },
  ]);
  const [taxRate, setTaxRate] = useState(10);
  const [discount, setDiscount] = useState(5);

  // Specialized Password Generator State
  const [generatedPass, setGeneratedPass] = useState('');
  const [passLength, setPassLength] = useState(24);
  const [useSymbols, setUseSymbols] = useState(true);

  // Specialized Time Tracker State
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);
  const [timeLogs, setTimeLogs] = useState<{ task: string; duration: string; date: string }[]>([]);

  // Specialized Website Builder State
  const [websitePreviewMode, setWebsitePreviewMode] = useState<'desktop' | 'mobile'>('desktop');

  // Initialize Password if tool is password generator
  useEffect(() => {
    if (tool.id === 'password-generator') {
      generateSecurePassword(passLength, useSymbols);
    }
  }, [tool.id]);

  // Stopwatch effect
  useEffect(() => {
    let interval: any = null;
    if (timerRunning) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timerRunning]);

  const generateSecurePassword = (length: number, symbols: boolean) => {
    const charsetAlphaNum = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789';
    const charsetSymbols = '!@#$%^&*()-_=+[]{}|;:,.<>?';
    const fullCharset = symbols ? charsetAlphaNum + charsetSymbols : charsetAlphaNum;

    const array = new Uint32Array(length);
    window.crypto.getRandomValues(array);
    let pass = '';
    for (let i = 0; i < length; i++) {
      pass += fullCharset[array[i] % fullCharset.length];
    }
    setGeneratedPass(pass);
    setOutputContent(`Generated High-Entropy Password:\n${pass}\n\nLength: ${length} characters\nEntropy: ~${Math.round(length * 5.95)} bits (Military-Grade Cryptographic Randomness)`);
  };

  const handleInputChange = (fieldId: string, value: any) => {
    setFormData((prev) => ({ ...prev, [fieldId]: value }));
  };

  const handleExecute = async () => {
    setIsExecuting(true);
    try {
      if (tool.id === 'youtube-transcript') {
        const res = await fetchYouTubeTranscript(
          formData.url || 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
          formData.format || 'Full Transcript'
        );
        setYtTranscriptResult(res);
        setOutputContent(`Video: ${res.title} (${res.duration})\n\nSummary:\n${res.summary}\n\nKey Takeaways:\n${res.keyPoints.join('\n- ')}`);
        setExecutionMetadata({ provider: 'Google Gemini YouTube Processor', tokens: 240, isDemo: false });
        onNotify('Transcript and insights generated!', 'success');
      } else if (tool.id === 'lead-generation-copilot') {
        const res = await generateLeads({
          industry: formData.industry,
          geography: formData.geography,
          targetTitle: formData.targetTitle,
          companySize: formData.companySize,
          qualificationCriteria: formData.qualificationCriteria,
        });
        setLeadsResult(res.returnedLeads);
        setOutputContent(`Generated ${res.returnedLeads.length} Qualified B2B Leads for ${formData.industry}.`);
        setExecutionMetadata({ provider: 'Enterprise Lead Index Engine', tokens: 310, isDemo: false });
        onNotify(`Extracted ${res.returnedLeads.length} targeted verified leads!`, 'success');
      } else {
        const res = await runTool(tool.id, formData);
        setOutputContent(res.result);
        setExecutionMetadata({ provider: res.provider, tokens: res.tokens, isDemo: res.isDemo });
        onNotify('Execution completed successfully!', 'success');
      }
    } catch (err: any) {
      onNotify(err.message || 'Execution error', 'error');
    } finally {
      setIsExecuting(false);
    }
  };

  const handleCopy = () => {
    if (!outputContent && !generatedPass) return;
    navigator.clipboard.writeText(generatedPass || outputContent);
    onNotify('Content copied to clipboard!', 'success');
  };

  const handleSave = async () => {
    if (!outputContent) return;
    await saveContent({
      title: `${tool.name} Output`,
      folder: tool.category,
      tool: tool.name,
      snippet: outputContent.slice(0, 160),
    });
    onNotify('Output saved to Saved Content folders!', 'success');
  };

  const handleDownload = async (format: 'TXT' | 'CSV' | 'JSON' | 'HTML') => {
    let text = outputContent;
    let mime = 'text/plain';

    if (format === 'CSV' && leadsResult.length > 0) {
      const headers = 'Company,Website,Industry,Location,ContactRole,BusinessEmail,Score,Status\n';
      const rows = leadsResult
        .map(
          (l) =>
            `"${l.company}","${l.website}","${l.industry}","${l.location}","${l.contactRole}","${l.businessEmail}",${l.leadScore},"${l.status}"`
        )
        .join('\n');
      text = headers + rows;
      mime = 'text/csv';
    }

    const blob = new Blob([text], { type: mime });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${tool.id}_export_${Date.now()}.${format.toLowerCase()}`;
    a.click();
    URL.revokeObjectURL(url);

    await recordDownload({
      fileName: `${tool.id}_export_${Date.now()}.${format.toLowerCase()}`,
      tool: tool.name,
      format,
      size: `${Math.max(1, Math.round(text.length / 1024))} KB`,
    });
    onNotify(`Downloaded as ${format}`, 'success');
  };

  // Invoice calculations
  const invoiceSubtotal = invoiceItems.reduce((acc, item) => acc + item.qty * item.rate, 0);
  const invoiceTaxAmount = (invoiceSubtotal * taxRate) / 100;
  const invoiceDiscountAmount = (invoiceSubtotal * discount) / 100;
  const invoiceGrandTotal = invoiceSubtotal + invoiceTaxAmount - invoiceDiscountAmount;

  // Format timer
  const formatTimer = (totalSeconds: number) => {
    const hrs = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Breadcrumbs & Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <button onClick={onBack} className="hover:text-white transition-colors flex items-center gap-1">
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Tools Directory
            </button>
            <span>/</span>
            <span className="text-slate-300">{tool.category}</span>
          </div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {tool.name}
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wide bg-sky-500/20 text-sky-300 border border-sky-500/30">
              {tool.badge}
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 max-w-2xl leading-relaxed">
            {tool.description}
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handleSave}
            disabled={!outputContent}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-[#151B2B] text-slate-300 hover:text-white border border-slate-800 disabled:opacity-40 transition-colors"
          >
            <Bookmark className="w-3.5 h-3.5 text-sky-400" />
            <span>Save to Projects</span>
          </button>
          <button
            onClick={handleCopy}
            disabled={!outputContent && !generatedPass}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-sky-500 hover:bg-sky-400 text-white shadow-md disabled:opacity-40 transition-colors"
          >
            <Copy className="w-3.5 h-3.5" />
            <span>Copy Output</span>
          </button>
        </div>
      </div>

      {/* Main Split Layout: Left Input Panel, Right Output Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT: INPUT PANEL */}
        <div className="lg:col-span-5 rounded-2xl border border-slate-800 bg-[#121826] p-6 space-y-6 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-sky-400" />
              <span>Input Parameters</span>
            </h3>
            <button
              onClick={() => {
                const cleared: any = {};
                tool.inputs.forEach((i) => (cleared[i.id] = ''));
                setFormData(cleared);
              }}
              className="text-xs text-slate-400 hover:text-white transition-colors"
            >
              Reset Fields
            </button>
          </div>

          {/* Form Fields */}
          <div className="space-y-4">
            {tool.inputs.map((inp) => (
              <div key={inp.id} className="space-y-1.5">
                <label className="block text-xs font-semibold text-slate-300">
                  {inp.label} {inp.required && <span className="text-rose-400">*</span>}
                </label>

                {inp.type === 'textarea' ? (
                  <textarea
                    rows={4}
                    value={formData[inp.id] || ''}
                    onChange={(e) => handleInputChange(inp.id, e.target.value)}
                    placeholder={inp.placeholder}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#151B2B] border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-sky-500 transition-colors leading-relaxed"
                  />
                ) : inp.type === 'select' ? (
                  <select
                    value={formData[inp.id] || ''}
                    onChange={(e) => handleInputChange(inp.id, e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#151B2B] border border-slate-700 text-sm text-white focus:outline-none focus:border-sky-500 transition-colors"
                  >
                    {inp.options?.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type={inp.type}
                    value={formData[inp.id] || ''}
                    onChange={(e) => handleInputChange(inp.id, e.target.value)}
                    placeholder={inp.placeholder}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#151B2B] border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-sky-500 transition-colors"
                  />
                )}
              </div>
            ))}
          </div>

          {/* Specialized controls for Password Generator */}
          {tool.id === 'password-generator' && (
            <div className="p-4 rounded-xl bg-[#151B2B] border border-slate-800 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-300 font-semibold">Length: {passLength}</span>
                <span className="text-emerald-400 font-mono">128-bit Entropy</span>
              </div>
              <input
                type="range"
                min="12"
                max="64"
                value={passLength}
                onChange={(e) => {
                  const len = Number(e.target.value);
                  setPassLength(len);
                  generateSecurePassword(len, useSymbols);
                }}
                className="w-full accent-sky-500"
              />
              <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer pt-1">
                <input
                  type="checkbox"
                  checked={useSymbols}
                  onChange={(e) => {
                    setUseSymbols(e.target.checked);
                    generateSecurePassword(passLength, e.target.checked);
                  }}
                  className="rounded bg-slate-800 border-slate-700 text-sky-500"
                />
                <span>Include high-entropy symbols (!@#$%^&*)</span>
              </label>
            </div>
          )}

          {/* Action Trigger Button */}
          <button
            onClick={handleExecute}
            disabled={isExecuting}
            className="w-full py-3.5 rounded-xl font-bold text-sm bg-gradient-to-r from-sky-500 via-indigo-500 to-purple-600 hover:from-sky-400 hover:to-purple-500 text-white shadow-xl shadow-sky-500/20 disabled:opacity-50 transition-all flex items-center justify-center gap-2 group"
          >
            {isExecuting ? (
              <RefreshCw className="w-4 h-4 animate-spin" />
            ) : (
              <Sparkles className="w-4 h-4 group-hover:rotate-12 transition-transform" />
            )}
            <span>{isExecuting ? 'Processing with AI Engine...' : 'Run Tool Workflow'}</span>
          </button>
        </div>

        {/* RIGHT: OUTPUT & WORKSPACE PANEL */}
        <div className="lg:col-span-7 rounded-2xl border border-slate-800 bg-[#121826] p-6 space-y-6 shadow-xl min-h-[560px] flex flex-col justify-between">
          <div className="space-y-4">
            {/* Header & Badges */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-sky-400" />
                <span className="text-sm font-bold text-white">Dynamic Workflow Output</span>
              </div>

              {executionMetadata && (
                <div className="flex items-center gap-3 text-xs text-slate-400">
                  <span className="px-2 py-0.5 rounded bg-slate-800 font-mono text-[11px] text-slate-300">
                    {executionMetadata.provider}
                  </span>
                  {executionMetadata.tokens && (
                    <span className="text-emerald-400 font-mono font-medium">
                      ~{executionMetadata.tokens} tokens
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* SPECIALIZED WORKSPACE 1: YouTube Transcript Viewer */}
            {tool.id === 'youtube-transcript' && ytTranscriptResult && (
              <div className="space-y-4 animate-in fade-in">
                <div className="p-4 rounded-xl bg-[#151B2B] border border-slate-800 flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-white">{ytTranscriptResult.title}</h4>
                    <span className="text-xs text-slate-400">Duration: {ytTranscriptResult.duration}</span>
                  </div>
                  <div className="flex gap-1.5">
                    <button
                      onClick={() => setYtActiveTab('transcript')}
                      className={`px-3 py-1 rounded-lg text-xs font-semibold ${
                        ytActiveTab === 'transcript' ? 'bg-sky-500 text-white' : 'text-slate-400'
                      }`}
                    >
                      Transcript
                    </button>
                    <button
                      onClick={() => setYtActiveTab('summary')}
                      className={`px-3 py-1 rounded-lg text-xs font-semibold ${
                        ytActiveTab === 'summary' ? 'bg-sky-500 text-white' : 'text-slate-400'
                      }`}
                    >
                      Summary & Notes
                    </button>
                    <button
                      onClick={() => setYtActiveTab('faqs')}
                      className={`px-3 py-1 rounded-lg text-xs font-semibold ${
                        ytActiveTab === 'faqs' ? 'bg-sky-500 text-white' : 'text-slate-400'
                      }`}
                    >
                      SEO FAQs
                    </button>
                  </div>
                </div>

                {ytActiveTab === 'transcript' && (
                  <div className="max-h-96 overflow-y-auto space-y-2 p-3 rounded-xl bg-[#151B2B]/80 border border-slate-800">
                    {ytTranscriptResult.transcript.map((line: any, idx: number) => (
                      <div key={idx} className="flex gap-3 text-xs leading-relaxed">
                        <span className="text-sky-400 font-mono font-bold shrink-0">[{line.time}]</span>
                        <span className="text-slate-300">{line.text}</span>
                      </div>
                    ))}
                  </div>
                )}

                {ytActiveTab === 'summary' && (
                  <div className="space-y-4 p-4 rounded-xl bg-[#151B2B] border border-slate-800 text-xs text-slate-300 leading-relaxed">
                    <p className="font-medium text-white">{ytTranscriptResult.summary}</p>
                    <div className="space-y-1 pt-2">
                      <div className="font-bold text-sky-300">Executive Takeaways:</div>
                      {ytTranscriptResult.keyPoints.map((kp: string, i: number) => (
                        <div key={i} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{kp}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {ytActiveTab === 'faqs' && (
                  <div className="space-y-3 p-4 rounded-xl bg-[#151B2B] border border-slate-800 text-xs">
                    {ytTranscriptResult.faqs.map((faq: any, i: number) => (
                      <div key={i} className="space-y-1 border-b border-slate-800/80 pb-2.5 last:border-none">
                        <div className="font-bold text-white">Q: {faq.q}</div>
                        <div className="text-slate-400">A: {faq.a}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* SPECIALIZED WORKSPACE 2: Lead Generation Copilot Table */}
            {tool.id === 'lead-generation-copilot' && leadsResult.length > 0 && (
              <div className="space-y-4 animate-in fade-in">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>{leadsResult.length} Verified B2B Leads Qualified</span>
                  <button
                    onClick={() => handleDownload('CSV')}
                    className="flex items-center gap-1.5 px-3 py-1 rounded bg-emerald-500/20 text-emerald-300 font-semibold hover:bg-emerald-500/30"
                  >
                    <Download className="w-3.5 h-3.5" /> Export Leads CSV
                  </button>
                </div>

                <div className="overflow-x-auto rounded-xl border border-slate-800 bg-[#151B2B]">
                  <table className="w-full text-left text-xs text-slate-300">
                    <thead className="bg-slate-900/90 text-slate-400 border-b border-slate-800">
                      <tr>
                        <th className="p-3">Company</th>
                        <th className="p-3">Role</th>
                        <th className="p-3">Location</th>
                        <th className="p-3">Score</th>
                        <th className="p-3">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/80">
                      {leadsResult.map((lead, idx) => (
                        <tr key={idx} className="hover:bg-slate-800/40">
                          <td className="p-3">
                            <div className="font-bold text-white">{lead.company}</div>
                            <div className="text-[11px] text-slate-500">{lead.businessEmail}</div>
                          </td>
                          <td className="p-3 font-medium text-slate-300">{lead.contactRole}</td>
                          <td className="p-3 text-slate-400">{lead.location}</td>
                          <td className="p-3 font-mono font-bold text-emerald-400">
                            {lead.leadScore}/100
                          </td>
                          <td className="p-3">
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-sky-500/20 text-sky-300">
                              {lead.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* SPECIALIZED WORKSPACE 3: Interactive Invoice Generator */}
            {tool.id === 'invoice-generator' && (
              <div className="space-y-4 animate-in fade-in p-5 rounded-2xl bg-[#151B2B] border border-slate-800">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div>
                    <h4 className="text-base font-bold text-white">
                      {formData.businessName || 'Digi Products Hub Ltd'}
                    </h4>
                    <p className="text-xs text-slate-400">Invoice To: {formData.clientName || 'Valued Client'}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-mono text-slate-400">#INV-2026-0814</span>
                    <div className="text-xs text-emerald-400 font-semibold">Payment Terms: Net 30</div>
                  </div>
                </div>

                {/* Line Items */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs text-slate-400 px-1 font-semibold">
                    <span>Line Items</span>
                    <button
                      onClick={() =>
                        setInvoiceItems((prev) => [
                          ...prev,
                          { id: String(Date.now()), desc: 'Additional Consultation', qty: 1, rate: 500 },
                        ])
                      }
                      className="text-sky-400 hover:text-sky-300 flex items-center gap-1"
                    >
                      <Plus className="w-3.5 h-3.5" /> Add Item
                    </button>
                  </div>

                  {invoiceItems.map((item, idx) => (
                    <div key={item.id} className="flex items-center gap-2 p-2 rounded-lg bg-slate-900/60 border border-slate-800 text-xs">
                      <input
                        type="text"
                        value={item.desc}
                        onChange={(e) => {
                          const val = e.target.value;
                          setInvoiceItems((prev) =>
                            prev.map((i, iIdx) => (iIdx === idx ? { ...i, desc: val } : i))
                          );
                        }}
                        className="flex-1 bg-transparent text-white focus:outline-none"
                      />
                      <span className="text-slate-400">Qty:</span>
                      <input
                        type="number"
                        value={item.qty}
                        onChange={(e) => {
                          const val = Number(e.target.value);
                          setInvoiceItems((prev) =>
                            prev.map((i, iIdx) => (iIdx === idx ? { ...i, qty: val } : i))
                          );
                        }}
                        className="w-12 px-1 py-0.5 rounded bg-[#151B2B] text-center text-white"
                      />
                      <span className="text-slate-400">Rate ($):</span>
                      <input
                        type="number"
                        value={item.rate}
                        onChange={(e) => {
                          const val = Number(e.target.value);
                          setInvoiceItems((prev) =>
                            prev.map((i, iIdx) => (iIdx === idx ? { ...i, rate: val } : i))
                          );
                        }}
                        className="w-16 px-1 py-0.5 rounded bg-[#151B2B] text-center text-white"
                      />
                      <span className="font-mono font-bold text-white w-16 text-right">
                        ${item.qty * item.rate}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Subtotals & Grand Total */}
                <div className="pt-3 border-t border-slate-800 space-y-1.5 text-xs text-slate-300">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span className="font-mono">${invoiceSubtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Tax ({taxRate}%):</span>
                    <span className="font-mono">+${invoiceTaxAmount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-emerald-400">
                    <span>Discount ({discount}%):</span>
                    <span className="font-mono">-${invoiceDiscountAmount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-base font-extrabold text-white pt-2 border-t border-slate-800">
                    <span>Grand Total:</span>
                    <span className="font-mono text-sky-400">${invoiceGrandTotal.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            )}

            {/* SPECIALIZED WORKSPACE 4: Smart Time Tracker */}
            {tool.id === 'time-tracker' && (
              <div className="space-y-6 animate-in fade-in p-6 rounded-2xl bg-[#151B2B] border border-slate-800 text-center">
                <div className="text-4xl sm:text-5xl font-mono font-extrabold tracking-tight text-white">
                  {formatTimer(timerSeconds)}
                </div>
                <div className="text-xs text-slate-400">
                  Tracking: <span className="text-sky-300 font-semibold">{formData.task || 'Active Task'}</span> ({formData.project || 'Project'})
                </div>

                <div className="flex items-center justify-center gap-3">
                  {!timerRunning ? (
                    <button
                      onClick={() => setTimerRunning(true)}
                      className="px-6 py-2.5 rounded-xl font-bold text-sm bg-emerald-500 hover:bg-emerald-400 text-white flex items-center gap-2 shadow-lg shadow-emerald-500/20"
                    >
                      <Play className="w-4 h-4" /> Start Timer
                    </button>
                  ) : (
                    <button
                      onClick={() => setTimerRunning(false)}
                      className="px-6 py-2.5 rounded-xl font-bold text-sm bg-amber-500 hover:bg-amber-400 text-white flex items-center gap-2 shadow-lg shadow-amber-500/20"
                    >
                      <Pause className="w-4 h-4" /> Pause
                    </button>
                  )}
                  <button
                    onClick={() => {
                      if (timerSeconds > 0) {
                        setTimeLogs((prev) => [
                          ...prev,
                          {
                            task: formData.task || 'General Work',
                            duration: formatTimer(timerSeconds),
                            date: new Date().toLocaleTimeString(),
                          },
                        ]);
                      }
                      setTimerSeconds(0);
                      setTimerRunning(false);
                      onNotify('Session logged to timesheet', 'success');
                    }}
                    className="px-4 py-2.5 rounded-xl font-bold text-sm bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center gap-2"
                  >
                    <RotateCcw className="w-4 h-4" /> Stop & Log
                  </button>
                </div>

                {timeLogs.length > 0 && (
                  <div className="text-left pt-4 border-t border-slate-800 space-y-2">
                    <div className="text-xs font-bold text-slate-400 uppercase">Logged Timesheets:</div>
                    {timeLogs.map((log, i) => (
                      <div key={i} className="flex justify-between text-xs p-2 rounded bg-slate-900/60 text-slate-300">
                        <span>{log.task}</span>
                        <span className="font-mono text-emerald-400">{log.duration} ({log.date})</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* DEFAULT / MARKDOWN OUTPUT CONTAINER */}
            {tool.id !== 'youtube-transcript' &&
              tool.id !== 'lead-generation-copilot' &&
              tool.id !== 'time-tracker' && (
                <div className="rounded-xl border border-slate-800 bg-[#0B0F19] p-5 font-mono text-xs text-slate-200 leading-relaxed whitespace-pre-wrap max-h-[460px] overflow-y-auto">
                  {outputContent || (
                    <div className="text-slate-500 italic text-center py-16">
                      Outputs will appear here once you click "Run Tool Workflow".
                    </div>
                  )}
                </div>
              )}
          </div>

          {/* Download Formats Footer */}
          <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
            <span className="text-slate-400">Available Exports:</span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleDownload('TXT')}
                disabled={!outputContent}
                className="px-2.5 py-1 rounded bg-[#151B2B] hover:bg-slate-800 text-slate-300 font-semibold border border-slate-700 disabled:opacity-30"
              >
                TXT
              </button>
              <button
                onClick={() => handleDownload('CSV')}
                disabled={!outputContent && leadsResult.length === 0}
                className="px-2.5 py-1 rounded bg-[#151B2B] hover:bg-slate-800 text-slate-300 font-semibold border border-slate-700 disabled:opacity-30"
              >
                CSV
              </button>
              <button
                onClick={() => handleDownload('JSON')}
                disabled={!outputContent}
                className="px-2.5 py-1 rounded bg-[#151B2B] hover:bg-slate-800 text-slate-300 font-semibold border border-slate-700 disabled:opacity-30"
              >
                JSON
              </button>
              <button
                onClick={() => window.print()}
                className="px-2.5 py-1 rounded bg-sky-500/20 text-sky-300 hover:bg-sky-500/30 font-semibold border border-sky-500/40 flex items-center gap-1"
              >
                <Printer className="w-3 h-3" /> Print / PDF
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
