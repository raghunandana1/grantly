import React, { useState } from 'react';
import { useGrantly } from '../context/GrantlyContext';
import { sanitizeInput } from '../services/securityService';
import {
  Search,
  Filter,
  CheckCircle2,
  Clock,
  Award,
  ArrowRight,
  Sparkles,
  SlidersHorizontal,
  ChevronRight,
  RotateCcw,
  BookOpen,
  DollarSign,
  Layers,
  Check,
} from 'lucide-react';

export function DiscoverPage() {
  const {
    filteredScholarships,
    scholarships,
    searchQuery,
    setSearchQuery,
    onlyEligible,
    setOnlyEligible,
    onlyRenewable,
    setOnlyRenewable,
    selectedCategory,
    setSelectedCategory,
    minAmount,
    setMinAmount,
    setInspectedScholarshipId,
    checkEligibility,
    profile,
    applications,
    addApplication,
  } = useGrantly();

  const [isFilterBarOpen, setIsFilterBarOpen] = useState(false);

  const categories = [
    'All',
    'STEM',
    'First-Gen',
    'Need-Based',
    'Merit',
    'Leadership',
    'Arts & Media',
  ];

  return (
    <div className="space-y-8 select-none">
      {/* ───────────────────────────────────────────────────────────── */}
      {/* HERO SECTION: Clear, Direct, Human Value Proposition         */}
      {/* ───────────────────────────────────────────────────────────── */}
      <div className="relative pt-4 pb-2">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-[#c9b8a0]/30 text-[#c9b8a0] text-xs font-sans font-medium mb-3">
              <span>Personalized Matching Active</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#c9b8a0]" />
              <span className="text-white">{profile.major} · {profile.gpa.toFixed(2)} GPA</span>
            </div>
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-[1.1]">
              Find your funding.{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#f5e6c8] to-[#c9b8a0]">
                Eliminate the maze.
              </span>
            </h1>
            <p className="text-sm sm:text-base text-[#a0a4b0] max-w-2xl mt-2 font-sans">
              Grantly pairs your verified academic record against high-yield educational endowments,
              revealing exact eligibility criteria and calculating your real net tuition offset.
            </p>
          </div>

          {/* Quick Profile Summary Badge */}
          <div className="hidden lg:flex items-center gap-4 p-3 rounded-2xl bg-[#141418] border border-white/10 shrink-0">
            <div className="text-right">
              <div className="text-[11px] font-sans font-medium uppercase tracking-wider text-[#8c91a0]">
                Logged in as
              </div>
              <div className="text-xs font-sans font-semibold text-white">{profile.name}</div>
              <div className="text-[10px] text-[#c9b8a0]">{profile.university}</div>
            </div>
            <img
              src={profile.avatar}
              alt={profile.name}
              className="w-10 h-10 rounded-full object-cover border border-[#c9b8a0]/40"
            />
          </div>
        </div>
      </div>

      {/* ───────────────────────────────────────────────────────────── */}
      {/* SEARCH & REFINED FILTER CONTROLS BAR                         */}
      {/* ───────────────────────────────────────────────────────────── */}
      <div className="p-4 rounded-3xl bg-[#121317] border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.4)] space-y-4">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          {/* Search Input Bar */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-[#8c91a0] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(sanitizeInput(e.target.value))}
              placeholder="Search by scholarship name, sponsor, keyword, or field of study..."
              className="w-full pl-10 pr-4 py-2.5 rounded-full bg-[#181920] border border-white/10 text-xs sm:text-sm text-white placeholder-[#6b7182] focus:outline-none focus:border-[#c9b8a0]/60 transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-[#8c91a0] hover:text-white"
              >
                Clear
              </button>
            )}
          </div>

          {/* Core Problem-Statement Toggles (from Grantly.md spec) */}
          <div className="flex items-center gap-2 shrink-0">
            {/* "Eligible for me" Instant Filter Toggle */}
            <button
              onClick={() => setOnlyEligible(!onlyEligible)}
              className={`px-4 py-2.5 rounded-full text-xs font-sans font-semibold transition-all flex items-center gap-2 border ${
                onlyEligible
                  ? 'bg-gradient-to-r from-white via-[#f5e6c8] to-[#c9b8a0] text-black border-transparent shadow-[0_2px_12px_rgba(201,184,160,0.3)]'
                  : 'bg-[#181920] text-[#a0a4b0] hover:text-white border-white/10 hover:border-white/20'
              }`}
            >
              <div
                className={`w-3.5 h-3.5 rounded flex items-center justify-center border ${
                  onlyEligible ? 'bg-black border-black text-white' : 'border-white/30'
                }`}
              >
                {onlyEligible && <Check className="w-3 h-3 text-[#f5e6c8]" />}
              </div>
              <span>Eligible for me</span>
            </button>

            {/* "Renewable only" Filter Toggle */}
            <button
              onClick={() => setOnlyRenewable(!onlyRenewable)}
              className={`px-4 py-2.5 rounded-full text-xs font-sans font-semibold transition-all flex items-center gap-2 border ${
                onlyRenewable
                  ? 'bg-gradient-to-r from-white via-[#f5e6c8] to-[#c9b8a0] text-black border-transparent shadow-[0_2px_12px_rgba(201,184,160,0.3)]'
                  : 'bg-[#181920] text-[#a0a4b0] hover:text-white border-white/10 hover:border-white/20'
              }`}
            >
              <div
                className={`w-3.5 h-3.5 rounded flex items-center justify-center border ${
                  onlyRenewable ? 'bg-black border-black text-white' : 'border-white/30'
                }`}
              >
                {onlyRenewable && <Check className="w-3 h-3 text-[#f5e6c8]" />}
              </div>
              <span>Renewable only</span>
            </button>

            {/* More Filters Toggle */}
            <button
              onClick={() => setIsFilterBarOpen(!isFilterBarOpen)}
              className={`p-2.5 rounded-full border transition-all ${
                isFilterBarOpen
                  ? 'bg-[#c9b8a0]/20 text-[#f5e6c8] border-[#c9b8a0]/40'
                  : 'bg-[#181920] text-[#8c91a0] hover:text-white border-white/10'
              }`}
              title="Toggle Advanced Parameters"
            >
              <SlidersHorizontal className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Category Pills Bar */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded-full text-xs font-sans font-medium whitespace-nowrap transition-colors ${
                  isSelected
                    ? 'bg-[#c9b8a0]/20 text-[#f5e6c8] border border-[#c9b8a0]/35 font-semibold'
                    : 'text-[#8c91a0] hover:text-white hover:bg-white/[0.04]'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Expandable Advanced Filter Drawer */}
        {isFilterBarOpen && (
          <div className="pt-3 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs animate-in fade-in duration-150">
            <div className="w-full sm:w-72 space-y-1.5">
              <div className="flex justify-between text-[#8c91a0]">
                <span>Minimum Award Amount:</span>
                <span className="font-bold text-[#f5e6c8] tabular-nums">
                  ${minAmount.toLocaleString()}
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="20000"
                step="1000"
                value={minAmount}
                onChange={(e) => setMinAmount(Number(e.target.value))}
                className="w-full accent-[#c9b8a0] bg-[#181920] h-1.5 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            <div className="flex items-center gap-3 text-xs text-[#a0a4b0]">
              <span>Active student GPA: <strong className="text-white">{profile.gpa.toFixed(2)}</strong></span>
              <span>·</span>
              <span>Household income: <strong className="text-white">${profile.householdIncome.toLocaleString()}</strong></span>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setOnlyEligible(false);
                  setOnlyRenewable(false);
                  setSelectedCategory('All');
                  setMinAmount(0);
                }}
                className="px-2.5 py-1 rounded-md bg-white/5 hover:bg-white/10 text-[#8c91a0] hover:text-white transition-colors"
              >
                Reset All
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ───────────────────────────────────────────────────────────── */}
      {/* SCHOLARSHIP OPPORTUNITY CARDS GRID (Apple Cupertino Staging) */}
      {/* ───────────────────────────────────────────────────────────── */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="text-xs font-sans font-medium uppercase tracking-wider text-[#8c91a0]">
            Verified Opportunities ({filteredScholarships.length} of {scholarships.length})
          </div>
          {onlyEligible && (
            <div className="text-xs text-[#c9b8a0]">
              Filtered to scholarships matching Aisha's criteria
            </div>
          )}
        </div>

        {filteredScholarships.length === 0 ? (
          <div className="p-12 text-center rounded-3xl bg-[#121317] border border-white/10 max-w-lg mx-auto">
            <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-3 text-[#c9b8a0]">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="font-display text-lg font-bold text-white">No scholarships match these filters</h3>
            <p className="text-xs text-[#8c91a0] mt-1 max-w-xs mx-auto">
              Try toggling off 'Eligible for me' or lowering the minimum award threshold.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setOnlyEligible(false);
                setOnlyRenewable(false);
                setSelectedCategory('All');
                setMinAmount(0);
              }}
              className="mt-4 px-4 py-2 rounded-full bg-[#181920] border border-white/15 text-xs text-white hover:border-[#c9b8a0]/40 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredScholarships.map((sch) => {
              const { isEligible, score } = checkEligibility(sch, profile);
              const app = applications.find((a) => a.scholarshipId === sch.id);
              const totalValue = sch.renewable ? sch.amount * sch.renewableYears : sch.amount;

              return (
                <div
                  key={sch.id}
                  onClick={() => setInspectedScholarshipId(sch.id)}
                  className="group relative rounded-3xl p-6 bg-[#121317]/90 border border-white/10 hover:border-[#c9b8a0]/40 hover:shadow-[0_16px_40px_-10px_rgba(167,139,113,0.18)] transition-all duration-200 cursor-pointer flex flex-col justify-between"
                >
                  {/* Top Badges */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[10px] font-sans font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/[0.05] text-[#a0a4b0] border border-white/10">
                        {sch.category}
                      </span>
                      {sch.renewable && (
                        <span className="text-[10px] font-sans font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#c9b8a0]/15 text-[#f5e6c8] border border-[#c9b8a0]/30">
                          Renewable {sch.renewableYears} Yrs
                        </span>
                      )}
                    </div>

                    {/* Title & Sponsor */}
                    <div>
                      <h3 className="font-display text-lg font-bold text-white group-hover:text-[#f5e6c8] transition-colors leading-snug">
                        {sch.title}
                      </h3>
                      <p className="text-xs text-[#8c91a0] mt-1 line-clamp-1">{sch.sponsor}</p>
                    </div>

                    {/* Award Staging */}
                    <div className="p-3.5 rounded-2xl bg-[#181920] border border-white/5 flex items-baseline justify-between">
                      <div>
                        <div className="text-[10px] font-sans font-medium uppercase tracking-wider text-[#8c91a0]">
                          Award Amount
                        </div>
                        <div className="text-2xl font-display font-bold text-[#f5e6c8] tabular-nums mt-0.5">
                          ${sch.amount.toLocaleString()}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-[10px] text-[#8c91a0] uppercase tracking-wider">
                          4-Yr Value
                        </div>
                        <div className="text-xs font-sans font-semibold text-[#c9b8a0] tabular-nums mt-0.5">
                          ${totalValue.toLocaleString()}
                        </div>
                      </div>
                    </div>

                    {/* Excerpt Description */}
                    <p className="text-xs text-[#9da1ad] line-clamp-2 leading-relaxed">
                      {sch.description}
                    </p>
                  </div>

                  {/* Card Footer: Deadline, Eligibility Score, and CTA */}
                  <div className="pt-4 mt-4 border-t border-white/10 space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-1.5 text-[#8c91a0]">
                        <Clock className="w-3.5 h-3.5 text-[#c9b8a0]" />
                        <span>Due {sch.deadline}</span>
                      </div>
                      <span
                        className={`text-[11px] font-sans font-semibold px-2 py-0.5 rounded-full ${
                          isEligible
                            ? 'bg-[#c9b8a0]/20 text-[#f5e6c8] border border-[#c9b8a0]/30'
                            : 'bg-white/5 text-[#8c91a0]'
                        }`}
                      >
                        {isEligible ? `${score}% Match` : 'Check Req'}
                      </span>
                    </div>

                    {/* Status / CTA Pill */}
                    {app ? (
                      <div className="w-full py-2 px-3 rounded-xl bg-white/[0.04] border border-[#c9b8a0]/30 flex items-center justify-between text-xs font-semibold text-[#f5e6c8]">
                        <span className="capitalize">{app.status} in Tracker</span>
                        <ChevronRight className="w-3.5 h-3.5 text-[#c9b8a0]" />
                      </div>
                    ) : (
                      <div className="w-full py-2 px-3 rounded-xl bg-[#181920] hover:bg-white/10 border border-white/10 group-hover:border-[#c9b8a0]/40 flex items-center justify-between text-xs font-medium text-[#d4d6dc] group-hover:text-white transition-all">
                        <span>Inspect & Apply</span>
                        <ArrowRight className="w-3.5 h-3.5 text-[#c9b8a0] group-hover:translate-x-0.5 transition-transform" />
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default DiscoverPage;
