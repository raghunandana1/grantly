import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { GrantlyProvider } from './context/GrantlyContext';
import { Shell } from './components/layout/Shell';
import { ErrorBoundary } from './components/common/ErrorBoundary';
import { SkipLink } from './components/common/SkipLink';
import { NotFoundPage } from './pages/NotFoundPage';

// Performance Engine: Code-splitting routes with React.lazy
const LoginPage = lazy(() =>
  import('./pages/auth/LoginPage').then((m) => ({ default: m.LoginPage }))
);
const DiscoverPage = lazy(() =>
  import('./pages/DiscoverPage').then((m) => ({ default: m.DiscoverPage }))
);
const FundingPlannerPage = lazy(() =>
  import('./pages/FundingPlannerPage').then((m) => ({ default: m.FundingPlannerPage }))
);
const ApplicationsPage = lazy(() =>
  import('./pages/ApplicationsPage').then((m) => ({ default: m.ApplicationsPage }))
);
const LockerEssaysPage = lazy(() =>
  import('./pages/LockerEssaysPage').then((m) => ({ default: m.LockerEssaysPage }))
);
const InstitutionalOversightPage = lazy(() =>
  import('./pages/InstitutionalOversightPage').then((m) => ({
    default: m.InstitutionalOversightPage,
  }))
);

function RouteLoadingFallback() {
  return (
    <div
      role="status"
      aria-label="Loading workspace view"
      className="min-h-[50vh] flex flex-col items-center justify-center space-y-4 text-center"
    >
      <div className="w-8 h-8 rounded-full border-2 border-[#c9b8a0]/20 border-t-[#f5e6c8] animate-spin" />
      <span className="text-xs uppercase tracking-widest text-[#c9b8a0]/80 font-medium">
        Loading Horizon...
      </span>
    </div>
  );
}

export function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <GrantlyProvider>
          <SkipLink />
          <Suspense fallback={<RouteLoadingFallback />}>
            <Routes>
              {/* Public Authentication Gateway */}
              <Route path="/" element={<LoginPage />} />
              <Route path="/login" element={<LoginPage />} />

              {/* Authenticated Workspace Shell */}
              <Route element={<Shell />}>
                <Route path="/discover" element={<DiscoverPage />} />
                <Route path="/funding" element={<FundingPlannerPage />} />
                <Route path="/applications" element={<ApplicationsPage />} />
                <Route path="/locker" element={<LockerEssaysPage />} />
                <Route path="/oversight" element={<InstitutionalOversightPage />} />
                <Route path="/404" element={<NotFoundPage />} />
              </Route>

              {/* Catch-all to 404 */}
              <Route path="*" element={<Navigate to="/404" replace />} />
            </Routes>
          </Suspense>
        </GrantlyProvider>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
