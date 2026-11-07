import React, { useState } from 'react';
import { useGrantly } from '../context/GrantlyContext';
import { AnimatedNumber } from '../components/common/AnimatedNumber';
import {
  DollarSign,
  TrendingDown,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  ArrowRight,
  ShieldCheck,
  Zap,
  Info,
} from 'lucide-react';

export function FundingPlannerPage() {
  const {
    profile,
    updateProfile,
    financials,
    simulateAllPendingWin,
    setSimulateAllPendingWin,
    applications,
    scholarships,
  } = useGrantly();

  const [activeTab, setActiveTab] = useState('equation'); // equation | projection

  // Calculations for simulated state
  const effectiveGap = simulateAllPendingWin
    ? financials.simulatedGap
    : financials.currentGap;

  const effectiveCovered = simulateAllPendingWin
    ? financials.otherAid + financials.wonTotal + financials.pendingTotal
    : financials.otherAid + financials.wonTotal;

  const percentCovered = Math.min(
    100,
    Math.round((effectiveCovered / (financials.yearlyCost || 1)) * 100)
  );

  return (
    <div className="space-y-8 select-none">
      {/* ───────────────────────────────────────────────────────────── */}
      {/* HEADER: Net Tuition Gap Philosophy                            */}
      {/* ───────────────────────────────────────────────────────────── */}
      <div className="pt-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-[#c9b8a0]/30 text-[#c9b8a0] text-xs font-sans font-medium mb-3">
          <span>Net Tuition Cockpit</span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#c9b8a0]" />
          <span>Real-time Financial Independence Engine</span>
        </div>
        <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
          Track every dollar.{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#f5e6c8] to-[#c9b8a0]">
            Graduate debt-free.
          </span>
        </h1>
        <p className="text-sm sm:text-base text-[#a0a4b0] max-w-2xl mt-2 font-sans">
          Scholarships are meaningless in a vacuum. Grantly balances your full cost of attendance
          against existing aid and active applications to reveal your real out-of-pocket tuition gap.
        </p>
      </div>

      {/* ───────────────────────────────────────────────────────────── */}
      {/* THE NET TUITION GAP EQUATION COCKPIT (Core Spec from Grantly.md) */}
      {/* ───────────────────────────────────────────────────────────── */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#121317] border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.6)] relative overflow-hidden">
        {/* Specular Top Rim */}
        <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-[#c9b8a0]/50 to-transparent pointer-events-none" />

        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-6 pb-6 border-b border-white/10">
          <div>
            <div className="text-xs font-sans font-medium uppercase tracking-wider text-[#8c91a0]">
              {simulateAllPendingWin ? 'Simulated Remaining Gap' : 'Current Net Tuition Gap'}
            </div>
            <div className="flex items-baseline gap-3 mt-1">
              <span className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#f5e6c8] tabular-nums">
                <AnimatedNumber value={effectiveGap} />
              </span>
              <span className="text-xs sm:text-sm text-[#8c91a0] font-sans">/ Academic Year</span>
            </div>
            <p className="text-xs text-[#a0a4b0] mt-1 font-sans">
              {effectiveGap === 0 ? (
                <span className="text-[#c9b8a0] font-semibold">
                  100% Fully Funded · You have eliminated your out-of-pocket tuition burden!
                </span>
              ) : (
                `Currently ${percentCovered}% of total annual college expenses are covered.`
              )}
            </p>
          </div>

          {/* ───────────────────────────────────────────────────────────── */}
          {/* THE "WHAT IF ALL PENDING WIN" SIMULATOR TOGGLE                */}
          {/* ───────────────────────────────────────────────────────────── */}
          <div className="p-4 rounded-2xl bg-[#181920] border border-[#c9b8a0]/30 shadow-inner flex flex-col justify-center">
            <div className="flex items-center justify-between gap-4">
              <div>
                <div className="text-xs font-sans font-bold text-white flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#c9b8a0]" />
                  <span>What if all pending win?</span>
                </div>
                <div className="text-[11px] text-[#8c91a0] mt-0.5">
                  Simulate {financials.pendingCount} active applications (${financials.pendingTotal.toLocaleString()} pipeline)
                </div>
              </div>

              {/* iOS / macOS Tactile Switch */}
              <button
                onClick={() => setSimulateAllPendingWin(!simulateAllPendingWin)}
                className={`relative w-12 h-6 rounded-full transition-colors duration-200 focus:outline-none ${
                  simulateAllPendingWin ? 'bg-[#c9b8a0]' : 'bg-white/20'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full bg-white shadow-md transform transition-transform duration-200 ${
                    simulateAllPendingWin ? 'translate-x-6' : 'translate-x-0.5'
                  }`}
                />
              </button>
            </div>

            {simulateAllPendingWin && (
              <div className="mt-3 pt-3 border-t border-white/10 text-[11px] text-[#f5e6c8] flex items-center justify-between">
                <span>Pending applications impact:</span>
                <span className="font-bold tabular-nums">-${financials.pendingTotal.toLocaleString()}</span>
              </div>
            )}
          </div>
        </div>

        {/* ───────────────────────────────────────────────────────────── */}
        {/* THE 4 PILLARS OF THE EQUATION (Cost, Won, Other Aid, Pending) */}
        {/* ───────────────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-6">
          {/* Pillar 1: Cost of Attendance */}
          <div className="p-4 rounded-2xl bg-[#181920] border border-white/5 space-y-2">
            <div className="text-[11px] font-sans font-medium uppercase tracking-wider text-[#8c91a0]">
              1. Total Cost of Attendance
            </div>
            <div className="text-2xl font-display font-bold text-white tabular-nums">
              ${financials.yearlyCost.toLocaleString()}
            </div>
            <div className="text-[11px] text-[#8c91a0]">
              Tuition, housing, meal plan & books
            </div>
          </div>

          {/* Pillar 2: Confirmed Other Aid */}
          <div className="p-4 rounded-2xl bg-[#181920] border border-white/5 space-y-2">
            <div className="text-[11px] font-sans font-medium uppercase tracking-wider text-[#8c91a0]">
              2. Confirmed Aid & Grants
            </div>
            <div className="text-2xl font-display font-bold text-[#c9b8a0] tabular-nums">
              -${financials.otherAid.toLocaleString()}
            </div>
            <div className="text-[11px] text-[#8c91a0]">
              Federal Pell Grant + Institutional
            </div>
          </div>

          {/* Pillar 3: Scholarships Won */}
          <div className="p-4 rounded-2xl bg-[#181920] border border-white/5 space-y-2">
            <div className="text-[11px] font-sans font-medium uppercase tracking-wider text-[#8c91a0]">
              3. Scholarships Won
            </div>
            <div className="text-2xl font-display font-bold text-[#f5e6c8] tabular-nums">
              -${financials.wonTotal.toLocaleString()}
            </div>
            <div className="text-[11px] text-[#8c91a0]">
              {financials.awardedCount} award confirmed
            </div>
          </div>

          {/* Pillar 4: Pending in Pipeline */}
          <div className="p-4 rounded-2xl bg-[#181920] border border-[#c9b8a0]/20 space-y-2">
            <div className="text-[11px] font-sans font-medium uppercase tracking-wider text-[#c9b8a0]">
              4. Pending Applications
            </div>
            <div className="text-2xl font-display font-bold text-white tabular-nums">
              ${financials.pendingTotal.toLocaleString()}
            </div>
            <div className="text-[11px] text-[#8c91a0]">
              {financials.pendingCount} active submissions
            </div>
          </div>
        </div>

        {/* Progress Bar Gauge (Apple macOS Storage Inspector Style) */}
        <div className="mt-6 pt-6 border-t border-white/10 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-[#a0a4b0]">Coverage Distribution:</span>
            <span className="font-bold text-white tabular-nums">{percentCovered}% Funded</span>
          </div>

          <div className="w-full h-3 rounded-full bg-[#181920] overflow-hidden flex border border-white/5">
            {/* Other Aid Slice */}
            <div
              style={{
                width: `${Math.min(100, (financials.otherAid / financials.yearlyCost) * 100)}%`,
              }}
              className="h-full bg-[#8c694b] transition-all duration-300"
              title="Other Aid"
            />
            {/* Won Scholarships Slice */}
            <div
              style={{
                width: `${Math.min(100, (financials.wonTotal / financials.yearlyCost) * 100)}%`,
              }}
              className="h-full bg-[#c9b8a0] transition-all duration-300"
              title="Scholarships Won"
            />
            {/* Simulated Pending Slice */}
            {simulateAllPendingWin && (
              <div
                style={{
                  width: `${Math.min(
                    100,
                    (financials.pendingTotal / financials.yearlyCost) * 100
                  )}%`,
                }}
                className="h-full bg-[#f5e6c8] transition-all duration-300"
                title="Pending Awards"
              />
            )}
          </div>

          {/* Legend */}
          <div className="flex flex-wrap items-center gap-4 text-[11px] text-[#8c91a0] pt-1">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-sm bg-[#8c694b]" />
              <span>Federal & Institutional Aid (${financials.otherAid.toLocaleString()})</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-sm bg-[#c9b8a0]" />
              <span>Grantly Won Awards (${financials.wonTotal.toLocaleString()})</span>
            </div>
            {simulateAllPendingWin && (
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-sm bg-[#f5e6c8]" />
                <span>Simulated Pending Win (${financials.pendingTotal.toLocaleString()})</span>
              </div>
            )}
            <div className="flex items-center gap-1.5 ml-auto">
              <span className="w-2.5 h-2.5 rounded-sm bg-[#181920] border border-white/20" />
              <span>Out-of-Pocket Gap (${effectiveGap.toLocaleString()})</span>
            </div>
          </div>
        </div>
      </div>

      {/* ───────────────────────────────────────────────────────────── */}
      {/* 4-YEAR GRADUATION DEBT PROJECTION (Apple Spline Curve)        */}
      {/* ───────────────────────────────────────────────────────────── */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#121317] border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.3)] space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="font-display text-xl sm:text-2xl font-bold text-white tracking-tight">
              4-Year Cumulative Debt Trajectory
            </h2>
            <p className="text-xs text-[#8c91a0] mt-0.5">
              Comparing standard private loan borrowing vs. Grantly-optimized renewable grant strategy.
            </p>
          </div>
          <div className="text-right">
            <div className="text-[10px] font-sans font-medium uppercase tracking-wider text-[#8c91a0]">
              Projected 4-Year Debt Savings
            </div>
            <div className="text-xl font-display font-bold text-[#f5e6c8] tabular-nums">
              $79,200 Saved
            </div>
          </div>
        </div>

        {/* Apple Spline Curve SVG Visualizer (Zero Jagged Polyline) */}
        <div className="relative w-full h-64 rounded-2xl bg-[#181920] border border-white/5 p-4 flex flex-col justify-between overflow-hidden">
          {/* Ambient Gold Glow underneath the spline */}
          <div className="absolute inset-0 pointer-events-none opacity-30 bg-gradient-to-t from-[#c9b8a0]/15 via-transparent to-transparent" />

          {/* SVG Canvas */}
          <svg className="w-full h-44 overflow-visible" viewBox="0 0 800 200" preserveAspectRatio="none">
            <defs>
              <linearGradient id="baselineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgba(255,255,255,0.2)" />
                <stop offset="100%" stopColor="rgba(255,255,255,0.4)" />
              </linearGradient>
              <linearGradient id="grantlyGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#c9b8a0" />
                <stop offset="100%" stopColor="#f5e6c8" />
              </linearGradient>
            </defs>

            {/* Horizontal Gridlines */}
            <line x1="0" y1="40" x2="800" y2="40" stroke="rgba(255,255,255,0.05)" strokeDasharray="4 4" />
            <line x1="0" y1="100" x2="800" y2="100" stroke="rgba(255,255,255,0.05)" strokeDasharray="4 4" />
            <line x1="0" y1="160" x2="800" y2="160" stroke="rgba(255,255,255,0.05)" strokeDasharray="4 4" />

            {/* Baseline Debt Curve (Rising steeply to $79,200) */}
            <path
              d="M 50 160 C 250 130, 500 70, 750 30"
              fill="none"
              stroke="url(#baselineGradient)"
              strokeWidth="2.5"
              strokeDasharray="6 6"
            />

            {/* Grantly Plan Curve (Steeply flattening down to $0 at graduation) */}
            <path
              d="M 50 150 C 250 135, 500 170, 750 185"
              fill="none"
              stroke="url(#grantlyGradient)"
              strokeWidth="3.5"
            />

            {/* Key Milestone Nodes */}
            {/* Year 1 Node */}
            <circle cx="50" cy="150" r="4.5" fill="#c9b8a0" stroke="#121317" strokeWidth="2" />
            {/* Year 2 Node */}
            <circle cx="280" cy="140" r="4.5" fill="#c9b8a0" stroke="#121317" strokeWidth="2" />
            {/* Year 3 Node */}
            <circle cx="510" cy="165" r="4.5" fill="#c9b8a0" stroke="#121317" strokeWidth="2" />
            {/* Year 4 (Graduation) Node: $0 Debt Free */}
            <circle cx="750" cy="185" r="6" fill="#f5e6c8" stroke="#121317" strokeWidth="2" />
          </svg>

          {/* Timeline Milestones Row */}
          <div className="flex items-center justify-between text-xs text-[#8c91a0] pt-2 border-t border-white/5">
            <div>
              <span className="font-semibold text-white">Year 1 (Freshman)</span>
              <span className="block text-[10px] text-[#c9b8a0]">$12k Won</span>
            </div>
            <div>
              <span className="font-semibold text-white">Year 2 (Sophomore)</span>
              <span className="block text-[10px] text-[#c9b8a0]">Renewable unlocked</span>
            </div>
            <div>
              <span className="font-semibold text-white">Year 3 (Junior - Current)</span>
              <span className="block text-[10px] text-[#c9b8a0]">$19.8k Gap targeted</span>
            </div>
            <div className="text-right">
              <span className="font-semibold text-[#f5e6c8]">Year 4 (Graduation)</span>
              <span className="block text-[10px] font-bold text-white">$0 Debt Free</span>
            </div>
          </div>
        </div>
      </div>

      {/* ───────────────────────────────────────────────────────────── */}
      {/* REAL-TIME COST & AID ADJUSTER SLIDERS                         */}
      {/* ───────────────────────────────────────────────────────────── */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#121317] border border-white/10 space-y-6">
        <div>
          <h2 className="font-display text-xl font-bold text-white">
            Customize Financial Variables
          </h2>
          <p className="text-xs text-[#8c91a0] mt-0.5">
            Adjust your annual cost of attendance or expected external aid to test different university funding scenarios.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Yearly Cost Slider */}
          <div className="p-5 rounded-2xl bg-[#181920] border border-white/5 space-y-3">
            <div className="flex justify-between items-center text-xs">
              <span className="font-semibold text-white">Yearly Cost of Attendance</span>
              <span className="font-bold text-[#f5e6c8] text-base tabular-nums">
                ${Number(profile.yearlyCostOfAttendance).toLocaleString()}
              </span>
            </div>
            <input
              type="range"
              min="10000"
              max="80000"
              step="1000"
              value={profile.yearlyCostOfAttendance}
              onChange={(e) => updateProfile({ yearlyCostOfAttendance: Number(e.target.value) })}
              className="w-full accent-[#c9b8a0] bg-[#121317] h-2 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-[#8c91a0]">
              <span>In-State Public ($18k)</span>
              <span>Stanford / Private ($45k)</span>
              <span>Full Out-of-State ($80k)</span>
            </div>
          </div>

          {/* Other Confirmed Aid Slider */}
          <div className="p-5 rounded-2xl bg-[#181920] border border-white/5 space-y-3">
            <div className="flex justify-between items-center text-xs">
              <span className="font-semibold text-white">Other Confirmed Aid & Grants</span>
              <span className="font-bold text-[#c9b8a0] text-base tabular-nums">
                ${Number(profile.otherAid).toLocaleString()}
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="50000"
              step="500"
              value={profile.otherAid}
              onChange={(e) => updateProfile({ otherAid: Number(e.target.value) })}
              className="w-full accent-[#c9b8a0] bg-[#121317] h-2 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-[#8c91a0]">
              <span>No Aid ($0)</span>
              <span>Federal Pell + Grants ($17.5k)</span>
              <span>Full Need Package ($50k)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FundingPlannerPage;
