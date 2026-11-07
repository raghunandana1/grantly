import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useGrantly } from '../../context/GrantlyContext';
import { AnimatedNumber } from '../common/AnimatedNumber';
import {
  ChevronDown,
  Command,
} from 'lucide-react';

export function TopHeader({ onOpenShortcuts }) {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    activeRole,
    currentPersona,
    switchRole,
    financials,
    filteredScholarships,
    applications,
  } = useGrantly();

  const [isPersonaMenuOpen, setIsPersonaMenuOpen] = useState(false);
  const personaMenuRef = useRef(null);

  // Close persona menu on click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (personaMenuRef.current && !personaMenuRef.current.contains(e.target)) {
        setIsPersonaMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Navigation Items (Pure Apple macOS segmented control: Typography + count badge only, ZERO emoji clutter)
  const navTabs = [
    { id: 'discover', label: 'Discover', path: '/discover', count: filteredScholarships.length },
    {
      id: 'funding',
      label: 'Tuition Gap Planner',
      path: '/funding',
      badge: `$${financials.currentGap.toLocaleString()}`,
    },
    { id: 'applications', label: 'Applications', path: '/applications', count: applications.length },
    { id: 'locker', label: 'Locker & Essays', path: '/locker' },
    ...(activeRole !== 'Student'
      ? [{ id: 'oversight', label: `${activeRole} Portal`, path: '/oversight' }]
      : []),
  ];

  const currentTab = navTabs.find((t) => location.pathname.startsWith(t.path))?.id || 'discover';

  return (
    <header
      role="banner"
      className="sticky top-0 z-40 w-full border-b border-white/10 bg-[#08090d]/85 backdrop-blur-xl select-none"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* ───────────────────────────────────────────────────────────── */}
        {/* LEFT: Pure Typographic Grantly Brand Wordmark */}
        {/* ───────────────────────────────────────────────────────────── */}
        <button
          type="button"
          onClick={() => navigate('/discover')}
          className="flex items-center gap-3 group shrink-0 min-h-[44px] focus:outline-none focus:ring-2 focus:ring-[#f5e6c8] rounded-xl px-1"
          aria-label="Grantly Home - Return to Discover Catalog"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#c9b8a0] to-[#8c694b] flex items-center justify-center shadow-[0_0_20px_rgba(201,184,160,0.3)] group-hover:scale-105 transition-transform">
            <span className="font-display font-bold text-black text-sm">G</span>
          </div>
          <div className="text-left">
            <div className="flex items-center gap-2">
              <span className="font-display text-xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-[#f5e6c8] to-[#c9b8a0]">
                Grantly
              </span>
              <span className="text-[10px] font-sans font-medium uppercase tracking-widest px-1.5 py-0.5 rounded bg-white/[0.06] text-[#c9b8a0] border border-[#c9b8a0]/20">
                Outpost
              </span>
            </div>
            <p className="text-[11px] text-[#8c91a0] tracking-wide -mt-0.5 hidden md:block">
              Intelligent Scholarship Experience
            </p>
          </div>
        </button>

        {/* ───────────────────────────────────────────────────────────── */}
        {/* CENTER: Apple macOS Segmented Control Toolbar */}
        {/* ───────────────────────────────────────────────────────────── */}
        <nav
          role="navigation"
          aria-label="Main navigation"
          className="hidden md:flex items-center p-1 rounded-full bg-[#141418] border border-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.06)]"
        >
          {navTabs.map((tab) => {
            const isActive = currentTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => navigate(tab.path)}
                aria-current={isActive ? 'page' : undefined}
                className={`relative min-h-[38px] px-4 py-1.5 rounded-full text-xs font-sans font-semibold transition-all duration-200 flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-[#f5e6c8] ${
                  isActive
                    ? 'bg-gradient-to-b from-[#2a2b34] to-[#1c1d24] text-[#f5e6c8] shadow-[0_2px_8px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.15)] border border-[#c9b8a0]/30'
                    : 'text-[#9da1ad] hover:text-white hover:bg-white/[0.04]'
                }`}
              >
                <span>{tab.label}</span>
                {tab.count !== undefined && (
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full tabular-nums ${
                      isActive
                        ? 'bg-[#c9b8a0]/20 text-[#f5e6c8]'
                        : 'bg-white/10 text-[#8c91a0]'
                    }`}
                  >
                    {tab.count}
                  </span>
                )}
                {tab.badge && (
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full tabular-nums font-semibold ${
                      financials.isFullyFunded
                        ? 'bg-[#c9b8a0] text-black font-bold'
                        : isActive
                        ? 'bg-[#c9b8a0]/25 text-[#f5e6c8]'
                        : 'bg-white/10 text-[#c9b8a0]'
                    }`}
                  >
                    {financials.isFullyFunded ? 'Funded' : tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* ───────────────────────────────────────────────────────────── */}
        {/* RIGHT: Live Net Tuition Gap Capsule, Shortcuts & Persona Switcher */}
        {/* ───────────────────────────────────────────────────────────── */}
        <div className="flex items-center gap-2.5">
          {/* Quick Net Tuition Gap Readout Pill */}
          <button
            type="button"
            onClick={() => navigate('/funding')}
            className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 min-h-[44px] rounded-full bg-[#181920] border border-white/10 hover:border-[#c9b8a0]/40 transition-colors focus:outline-none focus:ring-2 focus:ring-[#f5e6c8]"
            title="Open Tuition Gap Simulator"
            aria-label={`Current Tuition Gap: $${financials.currentGap.toLocaleString()}`}
          >
            <span className="text-[11px] font-sans font-medium uppercase tracking-wider text-[#8c91a0]">
              Tuition Gap:
            </span>
            <span
              className={`text-xs font-sans font-bold tabular-nums ${
                financials.isFullyFunded ? 'text-[#f5e6c8]' : 'text-white'
              }`}
            >
              <AnimatedNumber value={financials.currentGap} />
            </span>
          </button>

          {/* Keyboard Shortcuts Trigger Button */}
          {onOpenShortcuts && (
            <button
              type="button"
              onClick={onOpenShortcuts}
              aria-label="Open keyboard shortcuts cheat sheet (?)"
              className="w-10 h-10 min-h-[44px] min-w-[44px] rounded-full bg-[#181920] border border-white/10 hover:border-[#c9b8a0]/40 text-neutral-400 hover:text-white flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-[#f5e6c8]"
              title="Keyboard Shortcuts (?)"
            >
              <Command className="w-4 h-4" aria-hidden="true" />
            </button>
          )}

          {/* Persona Switcher Dropdown */}
          <div className="relative" ref={personaMenuRef}>
            <button
              type="button"
              onClick={() => setIsPersonaMenuOpen(!isPersonaMenuOpen)}
              aria-haspopup="menu"
              aria-expanded={isPersonaMenuOpen}
              aria-label={`Current user: ${currentPersona.name} (${currentPersona.role}). Click to switch role.`}
              className="flex items-center gap-2.5 pl-2 pr-3 py-1.5 min-h-[44px] rounded-full bg-[#181920] border border-white/10 hover:border-white/20 transition-all text-left focus:outline-none focus:ring-2 focus:ring-[#f5e6c8]"
            >
              <img
                src={currentPersona.avatar}
                alt=""
                className="w-7 h-7 rounded-full object-cover border border-[#c9b8a0]/40"
              />
              <div className="hidden lg:block text-left">
                <div className="text-xs font-sans font-semibold text-white leading-tight">
                  {currentPersona.name}
                </div>
                <div className="text-[10px] font-sans text-[#c9b8a0]/90 leading-tight">
                  {currentPersona.role}
                </div>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-[#8c91a0]" aria-hidden="true" />
            </button>

            {/* Dropdown Menu */}
            {isPersonaMenuOpen && (
              <div
                role="menu"
                aria-label="Stakeholder personas"
                className="absolute right-0 mt-2 w-72 rounded-2xl bg-[#141418] border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.85)] p-2 z-50 animate-in fade-in zoom-in-95 duration-150"
              >
                <div className="px-3 py-2 border-b border-white/10 mb-1">
                  <div className="text-[10px] font-sans font-semibold uppercase tracking-wider text-[#8c91a0]">
                    Select Institutional Role
                  </div>
                  <div className="text-xs text-[#a0a4b0] mt-0.5">
                    Experience Grantly from different stakeholder angles.
                  </div>
                </div>

                <div className="space-y-1">
                  {[
                    {
                      role: 'Student',
                      name: 'Aisha Patel',
                      subtitle: 'Junior · Computer Science (3.84 GPA)',
                    },
                    {
                      role: 'Financial Aid Advisor',
                      name: 'Dr. Marcus Vance',
                      subtitle: 'Dean of Undergraduate Financial Assistance',
                    },
                    {
                      role: 'Scholarship Donor',
                      name: 'Claire Sterling',
                      subtitle: 'Director · Sterling Memorial Trust',
                    },
                  ].map((p) => {
                    const isSelected = activeRole === p.role;
                    return (
                      <button
                        key={p.role}
                        type="button"
                        role="menuitem"
                        onClick={() => {
                          switchRole(p.role);
                          setIsPersonaMenuOpen(false);
                          if (p.role !== 'Student') {
                            navigate('/oversight');
                          } else {
                            navigate('/discover');
                          }
                        }}
                        className={`w-full flex items-start gap-2.5 p-2.5 rounded-xl text-left transition-colors min-h-[44px] focus:outline-none focus:ring-2 focus:ring-[#f5e6c8] ${
                          isSelected
                            ? 'bg-[#c9b8a0]/15 text-[#f5e6c8] border border-[#c9b8a0]/30'
                            : 'hover:bg-white/[0.04] text-[#a0a4b0]'
                        }`}
                      >
                        <div className="mt-0.5 w-4 h-4 rounded-full border border-white/20 flex items-center justify-center shrink-0">
                          {isSelected && <div className="w-2 h-2 rounded-full bg-[#c9b8a0]" />}
                        </div>
                        <div>
                          <div
                            className={`text-xs font-sans font-semibold ${
                              isSelected ? 'text-white' : 'text-[#f7f8f9]'
                            }`}
                          >
                            {p.name}
                          </div>
                          <div className="text-[10px] text-[#8c91a0]">{p.subtitle}</div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Navigation Bar */}
      <nav
        role="navigation"
        aria-label="Mobile navigation"
        className="md:hidden flex items-center justify-around px-2 py-2 border-t border-white/5 bg-[#08090d]"
      >
        {navTabs.map((tab) => {
          const isActive = currentTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => navigate(tab.path)}
              aria-current={isActive ? 'page' : undefined}
              className={`px-3 py-2 min-h-[44px] rounded-full text-xs font-sans font-medium transition-colors flex items-center justify-center ${
                isActive
                  ? 'bg-[#c9b8a0]/20 text-[#f5e6c8] border border-[#c9b8a0]/30'
                  : 'text-[#8c91a0] hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </nav>
    </header>
  );
}

export default TopHeader;
