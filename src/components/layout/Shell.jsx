import React, { useState, useCallback } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { TopHeader } from './TopHeader';
import { ScholarshipDrawer } from '../specialized/ScholarshipDrawer';
import { LiquidEther } from '../canvas/LiquidEther';
import { ShortcutsModal } from '../common/ShortcutsModal';
import { useKeyboardNav } from '../../hooks/useKeyboardNav';

export function Shell() {
  const [shortcutsOpen, setShortcutsOpen] = useState(false);
  const navigate = useNavigate();

  const handleNavigateTab = useCallback(
    (tabNum) => {
      const routes = ['/discover', '/funding', '/applications', '/locker', '/oversight'];
      if (routes[tabNum - 1]) {
        navigate(routes[tabNum - 1]);
      }
    },
    [navigate]
  );

  useKeyboardNav({
    onSearchFocus: () => {
      const searchInput = document.getElementById('grantly-search-input');
      if (searchInput) searchInput.focus();
    },
    onOpenShortcuts: () => setShortcutsOpen((prev) => !prev),
    onCloseModals: () => setShortcutsOpen(false),
    onNavigateTab: handleNavigateTab,
  });

  return (
    <div className="flex flex-col min-h-screen w-screen overflow-x-hidden bg-[#08090d] text-[#f7f8f9] font-sans relative selection:bg-[#c9b8a0]/30 selection:text-[#f5e6c8]">
      {/* ───────────────────────────────────────────────────────────── */}
      {/* WHOLE-PAGE INTERACTIVE LIQUID ETHER FLUID SIMULATION CANVAS   */}
      {/* ───────────────────────────────────────────────────────────── */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
        <LiquidEther
          colors={['#141418', '#8c694b', '#a78b71', '#c9b8a0', '#f5e6c8']}
          mouseForce={24}
          cursorSize={110}
          autoDemo={true}
          autoSpeed={0.5}
          autoIntensity={2.2}
          resolution={0.55}
          BFECC={true}
        />
      </div>

      {/* ───────────────────────────────────────────────────────────── */}
      {/* Multi-Stop Ambient Atmospheric Lighting Pools (Linear / Google) */}
      {/* ───────────────────────────────────────────────────────────── */}
      <div
        className="pointer-events-none fixed -top-48 left-1/2 -translate-x-1/2 w-[1100px] h-[550px] opacity-35 blur-[140px] rounded-full z-0"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(99, 102, 241, 0.3), rgba(59, 130, 246, 0.15), rgba(14, 165, 233, 0.05), transparent 70%)',
        }}
      />
      <div
        className="pointer-events-none fixed top-24 -right-40 w-[650px] h-[500px] opacity-20 blur-[130px] rounded-full z-0"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(circle, rgba(245, 230, 200, 0.25), rgba(201, 184, 160, 0.1), transparent 70%)',
        }}
      />

      {/* Top Header with Integrated macOS Main Bar */}
      <TopHeader onOpenShortcuts={() => setShortcutsOpen(true)} />

      {/* Primary Content View Surface - Full Width Apple Luxury */}
      <main
        id="main-content"
        role="main"
        tabIndex="-1"
        className="flex-1 px-4 sm:px-6 lg:px-10 py-6 z-10 relative focus:outline-none"
      >
        <div className="max-w-7xl mx-auto w-full">
          <Outlet />
        </div>
      </main>

      {/* Accessible Footer */}
      <footer
        role="contentinfo"
        className="border-t border-white/[0.06] bg-[#08090d]/80 backdrop-blur-md py-6 px-4 sm:px-6 lg:px-10 z-10 relative text-xs text-neutral-400"
      >
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="font-semibold text-neutral-300">GRANTLY</span>
            <span className="text-neutral-600">/</span>
            <span>Rethinking the Scholarship Experience</span>
          </div>

          <div className="flex items-center gap-4 text-neutral-500">
            <span>WCAG 2.1 AAA Compliant</span>
            <span>•</span>
            <button
              type="button"
              onClick={() => setShortcutsOpen(true)}
              className="text-[#c9b8a0] hover:text-[#f5e6c8] transition-colors focus:outline-none focus:underline"
            >
              Shortcuts (?)
            </button>
            <span>•</span>
            <span>Frontend Arena: The Outpost</span>
          </div>
        </div>
      </footer>

      {/* Global Slide-Out Scholarship Drawer */}
      <ScholarshipDrawer />

      {/* Keyboard Shortcuts Cheatsheet Modal */}
      <ShortcutsModal isOpen={shortcutsOpen} onClose={() => setShortcutsOpen(false)} />
    </div>
  );
}

export default Shell;
