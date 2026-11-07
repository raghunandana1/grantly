import React, { useState } from 'react';
import { useGrantly } from '../context/GrantlyContext';
import {
  FileText,
  Copy,
  Check,
  ShieldCheck,
  Upload,
  UserCheck,
  Sparkles,
  BookOpen,
  Edit3,
  ExternalLink,
  Save,
} from 'lucide-react';

export function LockerEssaysPage() {
  const { documents, essays, updateEssay } = useGrantly();

  const [selectedEssayId, setSelectedEssayId] = useState(essays[0]?.id || '');
  const [copiedId, setCopiedId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const activeEssay = essays.find((e) => e.id === selectedEssayId) || essays[0];

  const handleCopy = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  return (
    <div className="space-y-8 select-none">
      {/* ───────────────────────────────────────────────────────────── */}
      {/* HEADER: Document Locker & Essay Studio                        */}
      {/* ───────────────────────────────────────────────────────────── */}
      <div className="pt-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-[#c9b8a0]/30 text-[#c9b8a0] text-xs font-sans font-medium mb-3">
          <span>Central Document Vault</span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#c9b8a0]" />
          <span>Reusable Credentials & Essay Studio</span>
        </div>
        <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
          Write once.{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#f5e6c8] to-[#c9b8a0]">
            Deploy anywhere.
          </span>
        </h1>
        <p className="text-sm sm:text-base text-[#a0a4b0] max-w-2xl mt-2 font-sans">
          Never hunt through email attachments or rewrite the same personal statement. Store verified
          transcripts, FAFSA SAI confirmations, and polish reusable essays.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* ───────────────────────────────────────────────────────────── */}
        {/* LEFT COLUMN: Verified Credentials Locker                      */}
        {/* ───────────────────────────────────────────────────────────── */}
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-[#121317] border border-white/10 space-y-4 shadow-[0_10px_30px_rgba(0,0,0,0.3)]">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h2 className="font-display text-lg font-bold text-white">
                Verified Credentials
              </h2>
              <span className="text-[10px] font-sans font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#c9b8a0]/20 text-[#f5e6c8]">
                Locker Active
              </span>
            </div>

            <div className="space-y-3">
              {documents.map((doc) => (
                <div
                  key={doc.id}
                  className="p-4 rounded-2xl bg-[#181920] border border-white/5 space-y-2 group hover:border-[#c9b8a0]/30 transition-all"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-[#c9b8a0]" />
                      <span className="font-sans font-bold text-xs text-white">
                        {doc.title}
                      </span>
                    </div>
                    {doc.verified && (
                      <ShieldCheck className="w-4 h-4 text-[#c9b8a0] shrink-0" title="Verified by Registrar" />
                    )}
                  </div>
                  <p className="text-[11px] text-[#8c91a0] leading-relaxed">
                    {doc.details}
                  </p>
                  <div className="flex items-center justify-between text-[10px] text-[#6b7182] pt-1">
                    <span>{doc.type} · {doc.fileSize}</span>
                    <span>Updated {doc.updatedDate}</span>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => alert('Credential upload interface: Drop verified PDF or connect National Student Clearinghouse.')}
              className="w-full py-2.5 px-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-sans font-medium text-white transition-all flex items-center justify-center gap-2"
            >
              <Upload className="w-3.5 h-3.5 text-[#c9b8a0]" />
              <span>Upload New Verification Document</span>
            </button>
          </div>

          {/* Recommendation Request Tracker */}
          <div className="p-6 rounded-3xl bg-[#121317] border border-white/10 space-y-4 shadow-[0_10px_30px_rgba(0,0,0,0.3)]">
            <h3 className="font-display text-base font-bold text-white">
              Faculty Recommenders
            </h3>

            <div className="space-y-2.5 text-xs">
              <div className="p-3 rounded-xl bg-[#181920] border border-white/5 flex items-center justify-between">
                <div>
                  <div className="font-semibold text-white">Dr. Elizabeth Thorne</div>
                  <div className="text-[10px] text-[#8c91a0]">Professor · Distributed Systems</div>
                </div>
                <span className="text-[10px] font-semibold text-[#c9b8a0] px-2 py-0.5 rounded bg-[#c9b8a0]/15">
                  Confirmed Ready
                </span>
              </div>

              <div className="p-3 rounded-xl bg-[#181920] border border-white/5 flex items-center justify-between">
                <div>
                  <div className="font-semibold text-white">Prof. Rajiv Sharma</div>
                  <div className="text-[10px] text-[#8c91a0]">Faculty Advisor · AI Ethics Lab</div>
                </div>
                <span className="text-[10px] font-semibold text-[#a0a4b0] px-2 py-0.5 rounded bg-white/10">
                  Requested
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ───────────────────────────────────────────────────────────── */}
        {/* RIGHT 2 COLUMNS: Reusable Essay Studio                        */}
        {/* ───────────────────────────────────────────────────────────── */}
        <div className="lg:col-span-2 space-y-4">
          <div className="p-6 sm:p-8 rounded-3xl bg-[#121317] border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.3)] space-y-6">
            {/* Studio Navigation & Selector */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/10">
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
                {essays.map((essay) => {
                  const isSelected = essay.id === selectedEssayId;
                  return (
                    <button
                      key={essay.id}
                      onClick={() => {
                        setSelectedEssayId(essay.id);
                        setIsEditing(false);
                      }}
                      className={`px-3.5 py-1.5 rounded-full text-xs font-sans transition-all whitespace-nowrap ${
                        isSelected
                          ? 'bg-[#c9b8a0]/20 text-[#f5e6c8] border border-[#c9b8a0]/40 font-bold'
                          : 'text-[#8c91a0] hover:text-white hover:bg-white/5'
                      }`}
                    >
                      {essay.title.split(' ')[0]} Statement
                    </button>
                  );
                })}
              </div>

              {/* Action Buttons: Copy & Edit */}
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className={`px-3 py-1.5 rounded-full text-xs font-sans font-medium border transition-colors flex items-center gap-1.5 ${
                    isEditing
                      ? 'bg-[#c9b8a0] text-black border-transparent font-bold'
                      : 'bg-[#181920] text-[#a0a4b0] hover:text-white border-white/10'
                  }`}
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>{isEditing ? 'Editing Mode' : 'Edit Essay'}</span>
                </button>

                <button
                  onClick={() => handleCopy(activeEssay.fullText, activeEssay.id)}
                  className="px-3.5 py-1.5 rounded-full text-xs font-sans font-semibold bg-white/[0.08] hover:bg-white/[0.15] border border-white/15 text-white transition-all flex items-center gap-1.5"
                >
                  {copiedId === activeEssay.id ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-[#f5e6c8]" />
                      <span className="text-[#f5e6c8]">Copied to Clipboard!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-[#c9b8a0]" />
                      <span>Copy for Application</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Essay Details & Word Meter */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-[11px] font-sans font-medium uppercase tracking-wider text-[#c9b8a0]">
                  {activeEssay.topic}
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-[#8c91a0]">Word Count:</span>
                  <span
                    className={`font-bold tabular-nums ${
                      activeEssay.currentWordCount <= activeEssay.targetWordCount
                        ? 'text-[#f5e6c8]'
                        : 'text-[#f43f5e]'
                    }`}
                  >
                    {activeEssay.currentWordCount} / {activeEssay.targetWordCount} words
                  </span>
                </div>
              </div>
              <h3 className="font-display text-2xl font-bold text-white">
                {activeEssay.title}
              </h3>
            </div>

            {/* Word Meter Progress Bar */}
            <div className="w-full h-1.5 rounded-full bg-white/5 overflow-hidden">
              <div
                style={{
                  width: `${Math.min(
                    100,
                    (activeEssay.currentWordCount / activeEssay.targetWordCount) * 100
                  )}%`,
                }}
                className={`h-full transition-all duration-200 ${
                  activeEssay.currentWordCount > activeEssay.targetWordCount
                    ? 'bg-[#f43f5e]'
                    : 'bg-gradient-to-r from-[#c9b8a0] to-[#f5e6c8]'
                }`}
              />
            </div>

            {/* Essay Text Area (Editable or Read View) */}
            {isEditing ? (
              <div className="space-y-3">
                <textarea
                  value={activeEssay.fullText}
                  onChange={(e) => updateEssay(activeEssay.id, e.target.value)}
                  rows={14}
                  className="w-full p-4 rounded-2xl bg-[#181920] border border-[#c9b8a0]/40 text-sm text-[#f7f8f9] leading-relaxed focus:outline-none focus:ring-1 focus:ring-[#c9b8a0] font-sans resize-y"
                />
                <div className="flex justify-between items-center text-xs text-[#8c91a0]">
                  <span>Changes auto-save instantly to localStorage.</span>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-medium"
                  >
                    Done Editing
                  </button>
                </div>
              </div>
            ) : (
              <div className="p-6 rounded-2xl bg-[#181920]/80 border border-white/5 text-sm sm:text-base text-[#e2e4ea] leading-relaxed whitespace-pre-wrap font-sans selection:bg-[#c9b8a0]/30">
                {activeEssay.fullText}
              </div>
            )}

            {/* Footer Metadata */}
            <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-[#8c91a0]">
              <span>Last polished: {activeEssay.lastPolished}</span>
              <span>Ready for: Common App, Turing Fellowship, Lovelace Foundation</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LockerEssaysPage;
