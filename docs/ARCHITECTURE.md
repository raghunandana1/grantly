# Grantly System Architecture & Design System

## Overview
Grantly is built on React 19, Vite, Three.js, and Tailwind CSS. The system decouples presentation, fluid physics, financial algorithms, and state management into distinct layers.

## Core Architecture Layers
1. **Presentation Layer (`src/components/`)**:
   - `common/`: ErrorBoundary, SkipLink, ShortcutsModal, AnimatedNumber.
   - `layout/`: Shell, TopHeader, Navigation.
   - `canvas/`: LiquidEther WebGL fluid simulation with Navier-Stokes solver.
   - `specialized/`: ScholarshipDrawer, Kanban boards, Scenario sliders.

2. **Services Layer (`src/services/`)**:
   - `financialMath.js`: Pure mathematical functions for Net Tuition Gap, Debt Horizon, and simulations.
   - `scholarshipService.js`: Multi-criteria eligibility verification and fuzzy catalog filtering.
   - `soundService.js`: Web Audio API harmonic oscillator synthesis.
   - `storageService.js`: Resilient localStorage wrapper with error boundaries.

3. **State Management (`src/context/`)**:
   - `GrantlyContext.jsx`: Global provider managing personas, applications, filters, and financial state.
