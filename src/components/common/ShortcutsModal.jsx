import React from 'react';
import { X, Command } from 'lucide-react';

export function ShortcutsModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const shortcuts = [
    { key: '/', description: 'Focus opportunity search omnibar' },
    { key: '1', description: 'Navigate to Discover catalog' },
    { key: '2', description: 'Navigate to Funding Gap Planner' },
    { key: '3', description: 'Navigate to Applications Pipeline' },
    { key: '4', description: 'Navigate to Reusable Locker & Essays' },
    { key: '5', description: 'Navigate to Institutional Oversight' },
    { key: '?', description: 'Toggle this keyboard shortcut guide' },
    { key: 'Esc', description: 'Dismiss active drawers and dialogs' },
  ];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="shortcuts-dialog-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md bg-[#0f1016]/95 border border-[#c9b8a0]/25 rounded-2xl p-6 shadow-2xl space-y-5"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#c9b8a0]/15 flex items-center justify-center text-[#f5e6c8]">
              <Command className="w-4 h-4" aria-hidden="true" />
            </div>
            <div>
              <h2 id="shortcuts-dialog-title" className="text-base font-semibold text-[#f5e6c8]">
                Keyboard Shortcuts
              </h2>
              <p className="text-xs text-neutral-400">Power-user hotkeys for swift navigation</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close shortcuts dialog"
            className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-neutral-400 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-[#f5e6c8]"
          >
            <X className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>

        <div className="space-y-2.5">
          {shortcuts.map(({ key, description }) => (
            <div
              key={key}
              className="flex items-center justify-between py-2 px-3 rounded-lg bg-white/[0.03] border border-white/5"
            >
              <span className="text-sm text-neutral-300">{description}</span>
              <kbd className="min-w-[28px] h-7 px-2 flex items-center justify-center rounded-md bg-[#181922] border border-[#c9b8a0]/30 text-xs font-mono font-semibold text-[#f5e6c8] shadow-sm">
                {key}
              </kbd>
            </div>
          ))}
        </div>

        <div className="pt-2 text-center text-xs text-neutral-500">
          Press <kbd className="px-1.5 py-0.5 rounded bg-white/5 text-neutral-300 font-mono">Esc</kbd> anytime to close.
        </div>
      </div>
    </div>
  );
}
