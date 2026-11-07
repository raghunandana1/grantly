import React, { useState } from 'react';
import { useGrantly } from '../context/GrantlyContext';
import {
  Clock,
  CheckCircle2,
  AlertCircle,
  Award,
  ChevronRight,
  ArrowRight,
  Trash2,
  Plus,
  ExternalLink,
  Sparkles,
  FileText,
  DollarSign,
  Layers,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function ApplicationsPage() {
  const navigate = useNavigate();
  const {
    applications,
    scholarships,
    updateApplicationStatus,
    removeApplication,
    setInspectedScholarshipId,
    financials,
  } = useGrantly();

  const columns = [
    { id: 'bookmarked', label: 'Bookmarked', description: 'Opportunities saved for review' },
    { id: 'preparing', label: 'Preparing Packet', description: 'Drafting essays & collecting docs' },
    { id: 'submitted', label: 'Submitted & Review', description: 'Awaiting committee decisions' },
    { id: 'awarded', label: 'Awarded & Won', description: 'Confirmed funding towards tuition' },
  ];

  return (
    <div className="space-y-8 select-none">
      {/* ───────────────────────────────────────────────────────────── */}
      {/* HEADER: Applications Mission Control                          */}
      {/* ───────────────────────────────────────────────────────────── */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pt-2">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-[#c9b8a0]/30 text-[#c9b8a0] text-xs font-sans font-medium mb-3">
            <span>Application Kanban & Milestones</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#c9b8a0]" />
            <span>Active Pipeline: ${financials.pendingTotal.toLocaleString()}</span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
            Win the awards.{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#f5e6c8] to-[#c9b8a0]">
              Track every step.
            </span>
          </h1>
          <p className="text-sm sm:text-base text-[#a0a4b0] max-w-2xl mt-2 font-sans">
            Track documents, recommendation letter pings, and milestone deadlines across every scholarship in your portfolio.
          </p>
        </div>

        <button
          onClick={() => navigate('/discover')}
          className="px-4 py-2.5 rounded-full font-sans font-semibold text-xs bg-gradient-to-r from-white via-[#f5e6c8] to-[#c9b8a0] text-black shadow-[0_2px_12px_rgba(201,184,160,0.3)] hover:opacity-95 transition-all flex items-center gap-2 shrink-0 self-start md:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Explore More Opportunities</span>
        </button>
      </div>

      {/* ───────────────────────────────────────────────────────────── */}
      {/* 4-STAGE KANBAN BOARD                                         */}
      {/* ───────────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 items-start">
        {columns.map((col) => {
          const colApps = applications.filter((a) => a.status === col.id);
          const colTotal = colApps.reduce((acc, app) => {
            const sch = scholarships.find((s) => s.id === app.scholarshipId);
            return acc + (sch ? sch.amount : 0);
          }, 0);

          return (
            <div
              key={col.id}
              className="rounded-3xl bg-[#121317] border border-white/10 p-4 space-y-4 shadow-[0_10px_30px_rgba(0,0,0,0.3)] flex flex-col min-h-[500px]"
            >
              {/* Column Header */}
              <div className="pb-3 border-b border-white/10 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-sans font-bold text-sm text-white">
                      {col.label}
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/10 text-[#c9b8a0] font-semibold tabular-nums">
                      {colApps.length}
                    </span>
                  </div>
                  <div className="text-[11px] text-[#8c91a0] mt-0.5">
                    {colTotal > 0 ? `$${colTotal.toLocaleString()} Total` : col.description}
                  </div>
                </div>
              </div>

              {/* Cards in Column */}
              <div className="space-y-3.5 flex-1">
                {colApps.length === 0 ? (
                  <div className="p-8 text-center rounded-2xl bg-white/[0.02] border border-dashed border-white/10 text-xs text-[#8c91a0]">
                    No applications currently in this stage.
                  </div>
                ) : (
                  colApps.map((app) => {
                    const sch = scholarships.find((s) => s.id === app.scholarshipId);
                    if (!sch) return null;

                    return (
                      <div
                        key={app.id}
                        className="rounded-2xl p-4 bg-[#181920] border border-white/10 hover:border-[#c9b8a0]/40 transition-all space-y-3.5 group shadow-[0_4px_16px_rgba(0,0,0,0.4)]"
                      >
                        {/* Title & Amount */}
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <div className="text-[10px] font-sans font-medium uppercase tracking-wider text-[#c9b8a0]">
                              {sch.category}
                            </div>
                            <h4
                              onClick={() => setInspectedScholarshipId(sch.id)}
                              className="font-display font-bold text-sm text-white hover:text-[#f5e6c8] transition-colors cursor-pointer mt-0.5 line-clamp-2"
                            >
                              {sch.title}
                            </h4>
                          </div>
                          <button
                            onClick={() => removeApplication(app.id)}
                            className="p-1 rounded text-[#6b7182] hover:text-[#f43f5e] transition-colors shrink-0"
                            title="Remove from tracker"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {/* Amount & Deadline */}
                        <div className="p-2.5 rounded-xl bg-[#121317] border border-white/5 flex items-center justify-between text-xs">
                          <div>
                            <span className="text-[10px] text-[#8c91a0] block uppercase">Award</span>
                            <span className="font-display font-bold text-[#f5e6c8] tabular-nums text-sm">
                              ${sch.amount.toLocaleString()}
                            </span>
                          </div>
                          <div className="text-right">
                            <span className="text-[10px] text-[#8c91a0] block uppercase">Deadline</span>
                            <span className="font-sans text-white text-[11px]">
                              {sch.deadline}
                            </span>
                          </div>
                        </div>

                        {/* Checklist progress */}
                        {col.id === 'preparing' && (
                          <div className="space-y-1">
                            <div className="flex justify-between text-[11px] text-[#8c91a0]">
                              <span>Document deliverables:</span>
                              <span className="font-bold text-white tabular-nums">
                                {app.checklistProgress} of {app.checklistTotal} done
                              </span>
                            </div>
                            <div className="w-full h-1.5 rounded-full bg-white/5 overflow-hidden">
                              <div
                                style={{
                                  width: `${(app.checklistProgress / app.checklistTotal) * 100}%`,
                                }}
                                className="h-full bg-gradient-to-r from-[#c9b8a0] to-[#f5e6c8]"
                              />
                            </div>
                          </div>
                        )}

                        {/* Notes Preview */}
                        {app.notes && (
                          <p className="text-[11px] text-[#8c91a0] line-clamp-2 italic">
                            "{app.notes}"
                          </p>
                        )}

                        {/* Stage Transition Controls */}
                        <div className="pt-2 border-t border-white/5 flex items-center justify-between gap-1 text-[11px]">
                          {col.id === 'bookmarked' && (
                            <button
                              onClick={() => updateApplicationStatus(app.id, 'preparing')}
                              className="w-full py-1.5 px-2.5 rounded-lg bg-white/5 hover:bg-white/10 text-white font-medium flex items-center justify-center gap-1 transition-colors"
                            >
                              <span>Start Preparing</span>
                              <ChevronRight className="w-3 h-3 text-[#c9b8a0]" />
                            </button>
                          )}

                          {col.id === 'preparing' && (
                            <button
                              onClick={() => updateApplicationStatus(app.id, 'submitted')}
                              className="w-full py-1.5 px-2.5 rounded-lg bg-white/5 hover:bg-white/10 text-white font-medium flex items-center justify-center gap-1 transition-colors"
                            >
                              <span>Mark Submitted</span>
                              <ChevronRight className="w-3 h-3 text-[#c9b8a0]" />
                            </button>
                          )}

                          {col.id === 'submitted' && (
                            <div className="w-full grid grid-cols-2 gap-1.5">
                              <button
                                onClick={() => updateApplicationStatus(app.id, 'awarded')}
                                className="py-1.5 px-2 rounded-lg bg-gradient-to-r from-white via-[#f5e6c8] to-[#c9b8a0] text-black font-bold flex items-center justify-center gap-1 transition-all"
                              >
                                <Award className="w-3 h-3" />
                                <span>Won!</span>
                              </button>
                              <button
                                onClick={() => updateApplicationStatus(app.id, 'preparing')}
                                className="py-1.5 px-2 rounded-lg bg-white/5 hover:bg-white/10 text-[#8c91a0] hover:text-white transition-colors"
                              >
                                Revise
                              </button>
                            </div>
                          )}

                          {col.id === 'awarded' && (
                            <div className="w-full py-1.5 px-2.5 rounded-lg bg-[#c9b8a0]/20 border border-[#c9b8a0]/30 text-[#f5e6c8] font-bold flex items-center justify-center gap-1 text-xs">
                              <CheckCircle2 className="w-3.5 h-3.5 text-[#c9b8a0]" />
                              <span>Funding Confirmed</span>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ApplicationsPage;
