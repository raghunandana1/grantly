import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import confetti from 'canvas-confetti';
import {
  INITIAL_STUDENT_PROFILE,
  SCHOLARSHIPS_DATA,
  INITIAL_APPLICATIONS,
  REUSABLE_DOCUMENTS,
  REUSABLE_ESSAYS,
  PERSONAS,
} from '../data/scholarshipData';
import { checkEligibility, filterScholarships } from '../services/scholarshipService';
import { calculateNetGap, calculateSimulatedGap } from '../services/financialMath';
import { soundService } from '../services/soundService';
import { storageService } from '../services/storageService';
import { sanitizeInput } from '../services/securityService';

const GrantlyContext = createContext(null);

export function GrantlyProvider({ children }) {
  // ─────────────────────────────────────────────────────────────
  // Active Persona
  // ─────────────────────────────────────────────────────────────
  const [activeRole, setActiveRole] = useState(() => {
    return localStorage.getItem('grantly_role') || 'Student';
  });

  const currentPersona = useMemo(() => {
    return PERSONAS.find((p) => p.role === activeRole) || PERSONAS[0];
  }, [activeRole]);

  const switchRole = (role) => {
    setActiveRole(role);
    storageService.set('grantly_role', role);
    soundService.playChime(659.25, 0.15);
  };

  // ─────────────────────────────────────────────────────────────
  // Student Profile State (Editable)
  // ─────────────────────────────────────────────────────────────
  const [profile, setProfile] = useState(() => {
    try {
      const saved = localStorage.getItem('grantly_profile');
      return saved ? JSON.parse(saved) : INITIAL_STUDENT_PROFILE;
    } catch {
      return INITIAL_STUDENT_PROFILE;
    }
  });

  useEffect(() => {
    localStorage.setItem('grantly_profile', JSON.stringify(profile));
  }, [profile]);

  const updateProfile = (fields) => {
    setProfile((prev) => ({ ...prev, ...fields }));
  };

  // ─────────────────────────────────────────────────────────────
  // Scholarships & Applications State
  // ─────────────────────────────────────────────────────────────
  const [scholarships] = useState(SCHOLARSHIPS_DATA);
  const [applications, setApplications] = useState(() => {
    try {
      const saved = localStorage.getItem('grantly_applications');
      return saved ? JSON.parse(saved) : INITIAL_APPLICATIONS;
    } catch {
      return INITIAL_APPLICATIONS;
    }
  });

  useEffect(() => {
    localStorage.setItem('grantly_applications', JSON.stringify(applications));
  }, [applications]);

  // Drawer / Inspection
  const [inspectedScholarshipId, setInspectedScholarshipId] = useState(null);
  const inspectedScholarship = useMemo(() => {
    return scholarships.find((s) => s.id === inspectedScholarshipId) || null;
  }, [scholarships, inspectedScholarshipId]);

  // ─────────────────────────────────────────────────────────────
  // Discovery Filters
  // ─────────────────────────────────────────────────────────────
  const [searchQuery, setSearchQuery] = useState('');
  const [onlyEligible, setOnlyEligible] = useState(false);
  const [onlyRenewable, setOnlyRenewable] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [minAmount, setMinAmount] = useState(0);

  // Eligibility evaluation helper (delegates to scholarshipService)
  const evalEligibility = useCallback(
    (scholarship, studentProfile = profile) => {
      return checkEligibility(scholarship, studentProfile);
    },
    [profile]
  );

  // Filtered Scholarships list (delegates to scholarshipService)
  const filteredScholarships = useMemo(() => {
    return filterScholarships(
      scholarships,
      {
        query: searchQuery,
        onlyEligible,
        onlyRenewable,
        category: selectedCategory,
        minAmount,
      },
      profile
    );
  }, [scholarships, searchQuery, onlyEligible, onlyRenewable, selectedCategory, minAmount, profile]);

  // ─────────────────────────────────────────────────────────────
  // Applications Actions
  // ─────────────────────────────────────────────────────────────
  const addApplication = (scholarshipId, initialStatus = 'preparing') => {
    const existing = applications.find((a) => a.scholarshipId === scholarshipId);
    if (existing) {
      // Update status if already exists
      setApplications((prev) =>
        prev.map((a) => (a.scholarshipId === scholarshipId ? { ...a, status: initialStatus } : a))
      );
      return;
    }

    const sch = scholarships.find((s) => s.id === scholarshipId);
    const newApp = {
      id: `APP-2026-${String(applications.length + 1).padStart(2, '0')}`,
      scholarshipId,
      status: initialStatus,
      appliedDate: 'Nov 07, 2026',
      notes: `Started application packet for ${sch?.title || 'Scholarship'}.`,
      checklistProgress: 1,
      checklistTotal: sch?.requirements?.length || 3,
    };

    setApplications((prev) => [newApp, ...prev]);
  };

  const updateApplicationStatus = (appId, newStatus) => {
    setApplications((prev) =>
      prev.map((a) => {
        if (a.id === appId) {
          const updated = { ...a, status: newStatus };
          if (newStatus === 'awarded') {
            updated.awardedDate = 'Nov 07, 2026';
            // Sound and confetti celebration
            soundService.playAwardChord();
            try {
              confetti({
                particleCount: 80,
                spread: 70,
                origin: { y: 0.6 },
                colors: ['#c9b8a0', '#f5e6c8', '#ffffff', '#a78b71'],
              });
            } catch {
              // noop
            }
          }
          return updated;
        }
        return a;
      })
    );
  };

  const removeApplication = (appId) => {
    setApplications((prev) => prev.filter((a) => a.id !== appId));
  };

  // ─────────────────────────────────────────────────────────────
  // Net Tuition Gap & Scenario Simulator
  // ─────────────────────────────────────────────────────────────
  const [simulateAllPendingWin, setSimulateAllPendingWin] = useState(false);

  const financials = useMemo(() => {
    const yearlyCost = Number(profile.yearlyCostOfAttendance) || 0;
    const otherAid = Number(profile.otherAid) || 0;

    // Scholarships won
    const awardedApps = applications.filter((a) => a.status === 'awarded');
    const wonTotal = awardedApps.reduce((acc, app) => {
      const sch = scholarships.find((s) => s.id === scholarshipId(app));
      return acc + (sch ? sch.amount : 0);
    }, 0);

    // Scholarships pending (preparing or submitted)
    const pendingApps = applications.filter((a) => a.status === 'preparing' || a.status === 'submitted');
    const pendingTotal = pendingApps.reduce((acc, app) => {
      const sch = scholarships.find((s) => s.id === scholarshipId(app));
      return acc + (sch ? sch.amount : 0);
    }, 0);

    // Actual Current Net Tuition Gap
    const currentCovered = otherAid + wonTotal;
    const currentGap = Math.max(0, yearlyCost - currentCovered);

    // Simulated Gap if all pending win
    const simulatedCovered = otherAid + wonTotal + pendingTotal;
    const simulatedGap = Math.max(0, yearlyCost - simulatedCovered);
    const surplus = Math.max(0, simulatedCovered - yearlyCost);

    return {
      yearlyCost,
      otherAid,
      wonTotal,
      pendingTotal,
      currentGap,
      simulatedGap,
      surplus,
      isFullyFunded: currentGap === 0,
      awardedCount: awardedApps.length,
      pendingCount: pendingApps.length,
    };
  }, [profile.yearlyCostOfAttendance, profile.otherAid, applications, scholarships]);

  function scholarshipId(app) {
    return app.scholarshipId;
  }

  // ─────────────────────────────────────────────────────────────
  // Reusable Documents & Essays Locker State
  // ─────────────────────────────────────────────────────────────
  const [documents, setDocuments] = useState(REUSABLE_DOCUMENTS);
  const [essays, setEssays] = useState(REUSABLE_ESSAYS);

  const updateEssay = (id, newText) => {
    const cleanText = sanitizeInput(newText);
    setEssays((prev) =>
      prev.map((e) => {
        if (e.id === id) {
          const wordCount = cleanText.trim().split(/\s+/).filter(Boolean).length;
          return {
            ...e,
            fullText: cleanText,
            currentWordCount: wordCount,
            lastPolished: 'Nov 07, 2026',
          };
        }
        return e;
      })
    );
  };

  return (
    <GrantlyContext.Provider
      value={{
        activeRole,
        currentPersona,
        switchRole,
        profile,
        updateProfile,
        scholarships,
        filteredScholarships,
        applications,
        addApplication,
        updateApplicationStatus,
        removeApplication,
        inspectedScholarship,
        setInspectedScholarshipId,
        checkEligibility: evalEligibility,
        // Filters
        searchQuery,
        setSearchQuery,
        onlyEligible,
        setOnlyEligible,
        onlyRenewable,
        setOnlyRenewable,
        selectedCategory,
        setSelectedCategory,
        minAmount,
        setMinAmount,
        // Net Tuition Gap & Simulator
        financials,
        simulateAllPendingWin,
        setSimulateAllPendingWin,
        // Documents & Essays
        documents,
        essays,
        updateEssay,
      }}
    >
      {children}
    </GrantlyContext.Provider>
  );
}

export function useGrantly() {
  const context = useContext(GrantlyContext);
  if (!context) {
    throw new Error('useGrantly must be used within a GrantlyProvider');
  }
  return context;
}
