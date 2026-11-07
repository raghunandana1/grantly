import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

/**
 * Enterprise Error Boundary Component
 * Catches unhandled client-side render exceptions and presents a graceful recovery UI.
 */
export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('[ErrorBoundary caught exception]:', error, errorInfo);
    this.setState({ errorInfo });
  }

  handleReload = () => {
    window.location.reload();
  };

  handleReset = () => {
    localStorage.clear();
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      return (
        <div
          role="alert"
          aria-live="assertive"
          className="min-h-screen w-full flex items-center justify-center p-6 bg-[#08090d] text-white"
        >
          <div className="max-w-md w-full bg-[#12131a]/90 backdrop-blur-2xl border border-[#c9b8a0]/20 rounded-2xl p-8 shadow-2xl text-center space-y-6">
            <div className="w-14 h-14 mx-auto rounded-full bg-[#f5e6c8]/10 border border-[#c9b8a0]/30 flex items-center justify-center text-[#f5e6c8]">
              <AlertTriangle className="w-7 h-7" aria-hidden="true" />
            </div>

            <div className="space-y-2">
              <h1 className="text-xl font-semibold tracking-tight text-[#f5e6c8]">
                Application Interruption
              </h1>
              <p className="text-sm text-neutral-400 leading-relaxed">
                An unexpected condition was safely intercepted by the Grantly Error Boundary.
              </p>
            </div>

            {this.state.error && (
              <div className="p-3 bg-black/40 rounded-lg text-left text-xs font-mono text-neutral-400 overflow-x-auto max-h-32 border border-white/5">
                {this.state.error.toString()}
              </div>
            )}

            <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
              <button
                type="button"
                onClick={this.handleReload}
                className="w-full sm:w-1/2 min-h-[44px] flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#c9b8a0] to-[#f5e6c8] text-[#08090d] font-semibold text-sm hover:opacity-95 transition-opacity focus:outline-none focus:ring-2 focus:ring-[#f5e6c8]"
              >
                <RefreshCw className="w-4 h-4" aria-hidden="true" />
                Reload View
              </button>
              <button
                type="button"
                onClick={this.handleReset}
                className="w-full sm:w-1/2 min-h-[44px] flex items-center justify-center px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-300 font-medium text-sm transition-colors border border-white/10 focus:outline-none focus:ring-2 focus:ring-white/20"
              >
                Reset Session
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
