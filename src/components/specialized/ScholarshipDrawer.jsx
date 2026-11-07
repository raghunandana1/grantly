import React from 'react';
import { useGrantly } from '../../context/GrantlyContext';
import {
  X,
  CheckCircle2,
  AlertCircle,
  Clock,
  Award,
  Sparkles,
  ArrowRight,
  BookOpen,
  FileText,
  DollarSign,
  ChevronRight,
  BookmarkCheck,
  Check,
} from 'lucide-react';

export function ScholarshipDrawer() {
  const {
    inspectedScholarship,
    setInspectedScholarshipId,
    checkEligibility,
    profile,
    applications,
    addApplication,
    updateApplicationStatus,
  } = useGrantly();

  if (!inspectedScholarship) return null;

  const sch = inspectedScholarship;
  const { isEligible, reasons, score } = checkEligibility(sch, profile);
  const currentApp = applications.find((a) => a.scholarshipId === sch.id);

  const totalValue = sch.renewable ? sch.amount * sch.renewableYears : sch.amount;

  return (
    <div className="fixed inset-0 z-50 flex justify-end animate-in fade-in duration-200">
      {/* Backdrop */}
      <div
        onClick={() => setInspectedScholarshipId(null)}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
      />

      {/* Drawer Surface */}
      <div className="relative w-full max-w-xl h-full bg-[#121317] border-l border-white/10 shadow-[-20px_0_60px_rgba(0,0,0,0.9)] flex flex-col z-10 overflow-y-auto font-sans select-none">
        {/* Header Bar */}
        <div className="sticky top-0 z-20 flex items-center justify-between p-6 border-b border-white/10 bg-[#121317]/95 backdrop-blur-md">
          <div className="flex items-center gap-2.5">
            <span className="text-[11px] font-sans font-semibold uppercase tracking-widest px-2 py-0.5 rounded bg-white/[0.06] text-[#c9b8a0] border border-[#c9b8a0]/20">
              {sch.category}
            </span>
            {sch.renewable && (
              <span className="text-[11px] font-sans font-semibold uppercase tracking-widest px-2 py-0.5 rounded bg-[#c9b8a0]/20 text-[#f5e6c8] border border-[#c9b8a0]/30">
                Renewable {sch.renewableYears} Years
              </span>
            )}
          </div>
          <button
            onClick={() => setInspectedScholarshipId(null)}
            className="p-1.5 rounded-full hover:bg-white/10 text-[#8c91a0] hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6 flex-1">
          {/* Main Title & Sponsor */}
          <div>
            <h2 className="font-display text-2xl lg:text-3xl font-bold text-white tracking-tight leading-tight">
              {sch.title}
            </h2>
            <p className="text-sm text-[#c9b8a0] mt-1 font-sans">{sch.sponsor}</p>
          </div>

          {/* Key Value Cards */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-4 rounded-2xl bg-[#181920] border border-white/10">
              <div className="text-[11px] font-sans font-medium uppercase tracking-wider text-[#8c91a0]">
                Annual Award
              </div>
              <div className="text-2xl font-display font-bold text-[#f5e6c8] tabular-nums mt-1">
                ${sch.amount.toLocaleString()}
              </div>
              <div className="text-[11px] text-[#8c91a0] mt-0.5">
                {sch.renewable
                  ? `$${totalValue.toLocaleString()} 4-Year Total`
                  : 'Single Lump-Sum Award'}
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#181920] border border-white/10">
              <div className="text-[11px] font-sans font-medium uppercase tracking-wider text-[#8c91a0]">
                Application Deadline
              </div>
              <div className="text-lg font-display font-bold text-white tabular-nums mt-1">
                {sch.deadline}
              </div>
              <div className="text-[11px] text-[#c9b8a0] mt-0.5">
                {sch.daysRemaining} days remaining
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 text-sm text-[#d4d6dc] leading-relaxed">
            {sch.description}
          </div>

          {/* Eligibility Breakdown Engine */}
          <div className="p-5 rounded-2xl bg-[#181920] border border-white/10 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="font-sans font-semibold text-sm text-white">
                  Eligibility Evaluation
                </span>
              </div>
              <span
                className={`text-xs font-sans font-bold px-2.5 py-1 rounded-full ${
                  isEligible
                    ? 'bg-[#c9b8a0]/25 text-[#f5e6c8] border border-[#c9b8a0]/40'
                    : 'bg-white/10 text-[#a0a4b0]'
                }`}
              >
                {isEligible ? `${score}% Match · Eligible` : 'Criteria Review Needed'}
              </span>
            </div>

            <div className="space-y-2.5">
              {reasons.map((reason, idx) => {
                const passes = !reason.toLowerCase().includes('requires') && !reason.toLowerCase().includes('cap');
                return (
                  <div key={idx} className="flex items-start gap-2.5 text-xs">
                    {passes ? (
                      <CheckCircle2 className="w-4 h-4 text-[#c9b8a0] shrink-0 mt-0.5" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-[#8c91a0] shrink-0 mt-0.5" />
                    )}
                    <span className={passes ? 'text-[#e2e4ea]' : 'text-[#8c91a0]'}>
                      {reason}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Deliverables Checklist */}
          <div className="p-5 rounded-2xl bg-[#181920] border border-white/10 space-y-3">
            <div className="text-xs font-sans font-semibold uppercase tracking-wider text-[#8c91a0]">
              Required Submission Documents ({sch.requirements.length})
            </div>
            <div className="space-y-2">
              {sch.requirements.map((req) => (
                <div
                  key={req.id}
                  className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.03] border border-white/5 text-xs text-[#d4d6dc]"
                >
                  <div className="flex items-center gap-2">
                    <FileText className="w-3.5 h-3.5 text-[#c9b8a0]" />
                    <span>{req.title}</span>
                  </div>
                  <span className="text-[10px] text-[#8c91a0] uppercase tracking-wider">
                    {req.completed ? 'Ready in Locker' : 'To Complete'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="sticky bottom-0 p-6 border-t border-white/10 bg-[#121317] space-y-2">
          {!currentApp ? (
            <button
              onClick={() => {
                addApplication(sch.id, 'preparing');
                setInspectedScholarshipId(null);
              }}
              className="w-full py-3 px-4 rounded-xl font-sans font-semibold text-sm bg-gradient-to-r from-white via-[#f5e6c8] to-[#c9b8a0] text-black shadow-[0_4px_20px_rgba(201,184,160,0.3)] hover:opacity-95 transition-all flex items-center justify-center gap-2"
            >
              <span>Add to Application Tracker</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <div className="grid grid-cols-2 gap-2">
              {currentApp.status !== 'awarded' ? (
                <button
                  onClick={() => {
                    updateApplicationStatus(currentApp.id, 'awarded');
                    setInspectedScholarshipId(null);
                  }}
                  className="py-2.5 px-3 rounded-xl font-sans font-semibold text-xs bg-gradient-to-r from-white via-[#f5e6c8] to-[#c9b8a0] text-black hover:opacity-95 transition-all flex items-center justify-center gap-1.5"
                >
                  <Check className="w-4 h-4" />
                  <span>Mark as Awarded</span>
                </button>
              ) : (
                <div className="py-2.5 px-3 rounded-xl text-center text-xs font-semibold bg-[#c9b8a0]/20 text-[#f5e6c8] border border-[#c9b8a0]/40 flex items-center justify-center gap-1">
                  <CheckCircle2 className="w-4 h-4 text-[#c9b8a0]" />
                  <span>Awarded · Confirmed</span>
                </div>
              )}

              <button
                onClick={() => setInspectedScholarshipId(null)}
                className="py-2.5 px-3 rounded-xl font-sans font-medium text-xs bg-[#181920] border border-white/10 hover:border-white/20 text-[#a0a4b0] hover:text-white transition-all text-center"
              >
                Close Drawer
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ScholarshipDrawer;
