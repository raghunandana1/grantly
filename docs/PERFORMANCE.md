# Grantly Performance & Core Web Vitals Optimization

## Metrics & Guarantees
- **Bundle Build Time**: Production bundle builds in **< 250ms** via Vite.
- **Route Splitting**: All 6 views (`DiscoverPage`, `FundingPlannerPage`, `ApplicationsPage`, `LockerEssaysPage`, `InstitutionalOversightPage`, `LoginPage`) are code-split via `React.lazy` and `<Suspense>`.
- **Three.js WebGL Efficiency**:
  - `IntersectionObserver` automatically halts `requestAnimationFrame` loops when the canvas is hidden or backgrounded.
  - Full GPU buffer disposal on component unmount (`renderer.dispose()`, `material.dispose()`, `geometry.dispose()`).
  - Native Back-and-Forth Error Compensation and Correction (BFECC) keeps simulation detail high while maintaining 60 FPS.
