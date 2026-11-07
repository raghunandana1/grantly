import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, ArrowLeft } from 'lucide-react';

export function NotFoundPage() {
  return (
    <div
      role="region"
      aria-label="Page Not Found"
      className="min-h-[70vh] flex flex-col items-center justify-center text-center p-6 space-y-6"
    >
      <div className="w-16 h-16 rounded-2xl bg-[#c9b8a0]/10 border border-[#c9b8a0]/25 flex items-center justify-center text-[#f5e6c8] shadow-2xl">
        <Compass className="w-8 h-8 animate-spin-slow" aria-hidden="true" />
      </div>

      <div className="space-y-2 max-w-md">
        <span className="text-xs uppercase tracking-widest text-[#c9b8a0] font-semibold">
          Error 404 • Destination Uncharted
        </span>
        <h1 className="text-3xl font-bold tracking-tight text-white font-display">
          Route Not Found
        </h1>
        <p className="text-sm text-neutral-400 leading-relaxed">
          The educational opportunity or horizon coordinates you requested do not exist in the Grantly registry.
        </p>
      </div>

      <Link
        to="/discover"
        className="min-h-[44px] inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#c9b8a0] to-[#f5e6c8] text-[#08090d] font-semibold text-sm shadow-xl hover:opacity-95 transition-opacity focus:outline-none focus:ring-2 focus:ring-[#f5e6c8]"
      >
        <ArrowLeft className="w-4 h-4" aria-hidden="true" />
        Return to Opportunity Catalog
      </Link>
    </div>
  );
}
