import React from 'react';

/**
 * Accessible Skip Link
 * Allows keyboard and screen reader users to bypass top-level navigation.
 */
export function SkipLink() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:px-5 focus:py-2.5 focus:rounded-xl focus:bg-gradient-to-r focus:from-[#c9b8a0] focus:to-[#f5e6c8] focus:text-[#08090d] focus:font-semibold focus:text-sm focus:shadow-2xl focus:ring-2 focus:ring-[#f5e6c8] focus:outline-none transition-transform"
    >
      Skip to main content
    </a>
  );
}
