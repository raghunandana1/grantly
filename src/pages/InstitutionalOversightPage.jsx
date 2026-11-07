import React, { useState } from 'react';
import { useGrantly } from '../context/GrantlyContext';
import {
  Users,
  Award,
  DollarSign,
  TrendingUp,
  CheckCircle2,
  AlertCircle,
  FileText,
  Building,
  Check,
  Send,
  Sparkles,
} from 'lucide-react';

export function InstitutionalOversightPage() {
  const { activeRole, currentPersona, scholarships, financials } = useGrantly();

  const [disbursedIds, setDisbursedIds] = useState([]);
  const [allocationSuccess, setAllocationSuccess] = useState('');

  const handleDisburse = (id) => {
    setDisbursedIds((prev) => [...prev, id]);
    setAllocationSuccess('Award funds successfully approved and scheduled for wire disbursement to the university registrar.');
    setTimeout(() => setAllocationSuccess(''), 4000);
  };

  const studentCohort = [
    {
      id: 'STU-894',
      name: 'Aisha Patel',
      major: 'Computer Science',
      year: 'Junior',
      gpa: 3.84,
      gap: 19800,
      risk: 'Medium',
      verifiedNeed: 'High (Pell Eligible)',
    },
    {
      id: 'STU-902',
      name: 'Devon Vance',
      major: 'Mechanical Engineering',
      year: 'Senior',
      gpa: 3.65,
      gap: 14200,
      risk: 'Low',
      verifiedNeed: 'Moderate',
    },
    {
      id: 'STU-918',
      name: 'Maria Santos',
      major: 'Biomedical Informatics',
      year: 'Sophomore',
      gpa: 3.91,
      gap: 24500,
      risk: 'High (Urgent)',
      verifiedNeed: 'Critical',
    },
  ];

  return (
    <div className="space-y-8 select-none">
      {/* ───────────────────────────────────────────────────────────── */}
      {/* HEADER: Institutional Portal Identity                         */}
      {/* ───────────────────────────────────────────────────────────── */}
      <div className="pt-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-[#c9b8a0]/30 text-[#c9b8a0] text-xs font-sans font-medium mb-3">
          <span>Institutional Oversight Portal</span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#c9b8a0]" />
          <span>Active Role: {activeRole}</span>
        </div>
        <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
          {activeRole === 'Financial Aid Advisor'
            ? 'Department Aid Distribution'
            : 'Endowment Disbursement Desk'}
        </h1>
        <p className="text-sm sm:text-base text-[#a0a4b0] max-w-2xl mt-2 font-sans">
          {activeRole === 'Financial Aid Advisor'
            ? 'Audit student cohort tuition gaps, match university supplemental endowments, and expedite emergency grants.'
            : 'Review shortlisted candidate dossiers, verify academic and financial criteria, and approve scholarship allocations.'}
        </p>
      </div>

      {allocationSuccess && (
        <div className="p-4 rounded-2xl bg-[#c9b8a0]/20 border border-[#c9b8a0]/40 text-[#f5e6c8] text-xs font-sans font-medium flex items-center gap-2 animate-in fade-in duration-200">
          <CheckCircle2 className="w-4 h-4 text-[#c9b8a0] shrink-0" />
          <span>{allocationSuccess}</span>
        </div>
      )}

      {/* ───────────────────────────────────────────────────────────── */}
      {/* ADVISOR VIEW: Student Cohort Tuition Gaps                    */}
      {/* ───────────────────────────────────────────────────────────── */}
      {activeRole === 'Financial Aid Advisor' ? (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-5 rounded-2xl bg-[#121317] border border-white/10">
              <div className="text-[11px] font-sans font-medium uppercase tracking-wider text-[#8c91a0]">
                Active Cohort Size
              </div>
              <div className="text-2xl font-display font-bold text-white tabular-nums mt-1">
                142 Students
              </div>
              <div className="text-[11px] text-[#8c91a0] mt-0.5">School of Engineering</div>
            </div>

            <div className="p-5 rounded-2xl bg-[#121317] border border-white/10">
              <div className="text-[11px] font-sans font-medium uppercase tracking-wider text-[#8c91a0]">
                Total Remaining Cohort Gap
              </div>
              <div className="text-2xl font-display font-bold text-[#f5e6c8] tabular-nums mt-1">
                $1,480,000
              </div>
              <div className="text-[11px] text-[#8c91a0] mt-0.5">Average: $10,422 / student</div>
            </div>

            <div className="p-5 rounded-2xl bg-[#121317] border border-white/10">
              <div className="text-[11px] font-sans font-medium uppercase tracking-wider text-[#8c91a0]">
                Institutional Match Available
              </div>
              <div className="text-2xl font-display font-bold text-[#c9b8a0] tabular-nums mt-1">
                $650,000
              </div>
              <div className="text-[11px] text-[#8c91a0] mt-0.5">Discretionary Provost Fund</div>
            </div>
          </div>

          {/* Student Roster Table */}
          <div className="p-6 rounded-3xl bg-[#121317] border border-white/10 space-y-4 shadow-[0_10px_30px_rgba(0,0,0,0.3)]">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h3 className="font-display text-lg font-bold text-white">
                Undergraduate Need Roster
              </h3>
              <span className="text-xs text-[#8c91a0]">Sorted by unmet financial need</span>
            </div>

            <div className="space-y-3">
              {studentCohort.map((student) => (
                <div
                  key={student.id}
                  className="p-4 rounded-2xl bg-[#181920] border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white text-sm">{student.name}</span>
                      <span className="text-[10px] text-[#c9b8a0] uppercase tracking-wider px-1.5 py-0.2 rounded bg-white/5">
                        {student.id}
                      </span>
                    </div>
                    <div className="text-[#8c91a0]">
                      {student.major} · {student.year} · {student.gpa.toFixed(2)} GPA
                    </div>
                  </div>

                  <div className="flex items-center gap-6">
                    <div>
                      <span className="text-[10px] text-[#8c91a0] block uppercase">Tuition Gap</span>
                      <span className="font-bold text-[#f5e6c8] tabular-nums text-sm">
                        ${student.gap.toLocaleString()}
                      </span>
                    </div>

                    <div>
                      <span className="text-[10px] text-[#8c91a0] block uppercase">Need Status</span>
                      <span className="text-white font-medium">{student.verifiedNeed}</span>
                    </div>

                    <button
                      onClick={() => handleDisburse(student.id)}
                      disabled={disbursedIds.includes(student.id)}
                      className={`px-3.5 py-2 rounded-xl font-sans font-semibold transition-all ${
                        disbursedIds.includes(student.id)
                          ? 'bg-[#c9b8a0]/20 text-[#f5e6c8] border border-[#c9b8a0]/30 cursor-default'
                          : 'bg-gradient-to-r from-white via-[#f5e6c8] to-[#c9b8a0] text-black hover:opacity-95'
                      }`}
                    >
                      {disbursedIds.includes(student.id)
                        ? 'Grant Assigned'
                        : '+ Allocate $5,000 Match'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* ───────────────────────────────────────────────────────────── */
        /* DONOR VIEW: Shortlisted Candidate Portfolios                  */
        /* ───────────────────────────────────────────────────────────── */
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-[#121317] border border-white/10 space-y-4 shadow-[0_10px_30px_rgba(0,0,0,0.3)]">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div>
                <h3 className="font-display text-lg font-bold text-white">
                  Candidate Evaluation: Alan Turing Fellowship ($15,000)
                </h3>
                <p className="text-xs text-[#8c91a0] mt-0.5">
                  Selection committee shortlist awaiting final foundation sign-off.
                </p>
              </div>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#c9b8a0]/20 text-[#f5e6c8]">
                Final Stage Review
              </span>
            </div>

            <div className="p-5 rounded-2xl bg-[#181920] border border-white/10 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80"
                    alt="Aisha Patel"
                    className="w-12 h-12 rounded-full object-cover border border-[#c9b8a0]/40"
                  />
                  <div>
                    <h4 className="font-display font-bold text-base text-white">Aisha Patel</h4>
                    <p className="text-xs text-[#c9b8a0]">
                      Stanford University · Junior Computer Science · 3.84 GPA
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-sans font-bold px-3 py-1 rounded-full bg-[#c9b8a0]/25 text-[#f5e6c8]">
                    Score: 96 / 100
                  </span>
                </div>
              </div>

              {/* Candidate Essay Excerpt */}
              <div className="p-4 rounded-xl bg-[#121317] border border-white/5 space-y-2 text-xs">
                <span className="text-[10px] font-sans font-semibold uppercase tracking-wider text-[#8c91a0]">
                  Submitted Essay Excerpt: Overcoming Algorithmic Inequity in Healthcare
                </span>
                <p className="text-[#d4d6dc] leading-relaxed italic">
                  "Growing up in an under-resourced community, I witnessed how diagnostic tools routinely misclassified patients due to demographic gaps in training data... Receiving this scholarship will alleviate the 20 hours per week I currently spend working retail shifts to meet my tuition gap."
                </p>
              </div>

              {/* Committee Scoring Breakdown */}
              <div className="grid grid-cols-3 gap-3 text-xs text-center">
                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                  <div className="text-[10px] text-[#8c91a0] uppercase">Academic Excellence</div>
                  <div className="text-base font-bold text-white tabular-nums mt-0.5">38 / 40</div>
                </div>
                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                  <div className="text-[10px] text-[#8c91a0] uppercase">Demonstrated Need</div>
                  <div className="text-base font-bold text-white tabular-nums mt-0.5">30 / 30</div>
                </div>
                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                  <div className="text-[10px] text-[#8c91a0] uppercase">Community Impact</div>
                  <div className="text-base font-bold text-white tabular-nums mt-0.5">28 / 30</div>
                </div>
              </div>

              {/* Approval CTA */}
              <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                <span className="text-xs text-[#8c91a0]">
                  Disbursement: $15,000 / year for up to 3 years ($45,000 total)
                </span>
                <button
                  onClick={() => handleDisburse('aisha-patel')}
                  disabled={disbursedIds.includes('aisha-patel')}
                  className={`px-5 py-2.5 rounded-full font-sans font-semibold text-xs transition-all flex items-center gap-1.5 ${
                    disbursedIds.includes('aisha-patel')
                      ? 'bg-[#c9b8a0]/20 text-[#f5e6c8] border border-[#c9b8a0]/30 cursor-default'
                      : 'bg-gradient-to-r from-white via-[#f5e6c8] to-[#c9b8a0] text-black hover:opacity-95 shadow-[0_2px_12px_rgba(201,184,160,0.3)]'
                  }`}
                >
                  <Award className="w-4 h-4" />
                  <span>
                    {disbursedIds.includes('aisha-patel')
                      ? 'Disbursement Approved'
                      : 'Approve & Wire $15,000 Award'}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default InstitutionalOversightPage;
