import React, { useState } from 'react';
import { Mail, Send, CheckCircle2, MessageSquare, Building2, Phone } from 'lucide-react';
import { sendContactInquiry } from '../services/api';

interface ContactViewProps {
  onNotify: (msg: string, type?: 'success' | 'error' | 'info' | 'warning') => void;
}

export const ContactView: React.FC<ContactViewProps> = ({ onNotify }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [subject, setSubject] = useState('Enterprise Plan & API Inquiries');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !message) {
      onNotify('Please fill in email and message', 'warning');
      return;
    }

    setIsSubmitting(true);
    try {
      await sendContactInquiry({ name, email, subject, message });
      setIsSubmitted(true);
      onNotify('Inquiry submitted successfully!', 'success');
    } catch (err: any) {
      onNotify(err.message || 'Submission failed', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-sky-500/10 text-sky-400 border border-sky-500/20 uppercase tracking-wider">
          Enterprise Engagement
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Connect with Our Team
        </h1>
        <p className="text-sm sm:text-base text-slate-300">
          Have custom requirements, agency pricing requests, or questions about the AEO/GEO engine?
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 max-w-5xl mx-auto items-start">
        {/* Contact Info */}
        <div className="lg:col-span-5 rounded-2xl border border-slate-800 bg-[#121826] p-6 sm:p-8 space-y-6">
          <h3 className="text-lg font-bold text-white">Direct Enterprise Channels</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Our solution architects respond within 4 business hours for enterprise evaluations and custom SLA agreements.
          </p>

          <div className="space-y-4 text-xs text-slate-300">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-[#151B2B] border border-slate-800">
              <Mail className="w-4 h-4 text-sky-400 shrink-0" />
              <div>
                <div className="font-bold text-white">General & Support</div>
                <div className="text-slate-400">support@digiproductshub.example.com</div>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-xl bg-[#151B2B] border border-slate-800">
              <Building2 className="w-4 h-4 text-purple-400 shrink-0" />
              <div>
                <div className="font-bold text-white">Enterprise Accounts</div>
                <div className="text-slate-400">enterprise@digiproductshub.example.com</div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-7 rounded-2xl border border-slate-800 bg-[#121826] p-6 sm:p-8 shadow-xl">
          {isSubmitted ? (
            <div className="text-center py-12 space-y-4">
              <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Message Received!</h3>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                Thank you for reaching out. A senior product specialist will review your request and reach out at {email}.
              </p>
              <button
                onClick={() => {
                  setIsSubmitted(false);
                  setMessage('');
                }}
                className="px-4 py-2 rounded-lg bg-slate-800 text-xs text-white font-semibold hover:bg-slate-700"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Sarah Chen"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#151B2B] border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-sky-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Work Email</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@company.com"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#151B2B] border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-sky-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Company / Organization</label>
                <input
                  type="text"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="Acme Technologies Inc"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#151B2B] border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-sky-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Subject</label>
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#151B2B] border border-slate-700 text-sm text-white focus:outline-none focus:border-sky-500"
                >
                  <option value="Enterprise Plan & API Inquiries">Enterprise Plan & API Inquiries</option>
                  <option value="AEO / GEO Audit Consultation">AEO / GEO Audit Consultation</option>
                  <option value="Custom Tool Integration Request">Custom Tool Integration Request</option>
                  <option value="General Billing or Partnership">General Billing or Partnership</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Message Details</label>
                <textarea
                  rows={4}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Describe your workflow goals or questions..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#151B2B] border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-sky-500 leading-relaxed"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 rounded-xl font-bold text-sm bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white shadow-lg shadow-sky-500/20 transition-all flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <span>Sending Message...</span>
                ) : (
                  <>
                    <span>Submit Inquiry</span>
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
