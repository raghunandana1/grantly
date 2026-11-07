import { useEffect } from 'react';

/**
 * Global Keyboard Navigation Hook
 * Power shortcuts:
 * - '/' : Focus discovery search omnibar
 * - '?' : Open shortcuts cheat sheet
 * - 'Escape' : Dismiss active drawers / modals
 * - '1' - '5' : Fast switch navigation tabs
 */
export function useKeyboardNav({
  onSearchFocus,
  onOpenShortcuts,
  onCloseModals,
  onNavigateTab,
}) {
  useEffect(() => {
    function handleKeyDown(e) {
      // Ignore if user is currently typing in an input or textarea
      const target = e.target;
      const isInput =
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.isContentEditable;

      if (e.key === 'Escape') {
        if (onCloseModals) onCloseModals();
        return;
      }

      if (isInput) return;

      if (e.key === '/') {
        e.preventDefault();
        if (onSearchFocus) onSearchFocus();
      } else if (e.key === '?') {
        e.preventDefault();
        if (onOpenShortcuts) onOpenShortcuts();
      } else if (['1', '2', '3', '4', '5'].includes(e.key) && onNavigateTab) {
        onNavigateTab(parseInt(e.key, 10));
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onSearchFocus, onOpenShortcuts, onCloseModals, onNavigateTab]);
}
