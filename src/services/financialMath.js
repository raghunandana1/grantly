/**
 * GRANTLY Financial Mathematics & Modeling Service
 * Strict Invariants:
 * 1. Pending aid is quarantined in a distinct pool and NEVER subtracted from out-of-pocket deficit until awarded.
 * 2. Deficit clamps safely at $0 when institutional and awarded aid cover full costs (no negative debt).
 * 3. 4-Year Debt Horizon projects cumulative financial liability using compound tuition inflation.
 */

export function formatCurrency(amount) {
  const num = Number(amount) || 0;
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(num);
}

export function formatDaysRemaining(deadlineIso, now = new Date()) {
  const diffTime = new Date(deadlineIso).getTime() - new Date(now).getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  const isPast = diffDays <= 0;
  let text = '';

  if (isPast) {
    text = 'Deadline closed';
  } else if (diffDays === 1) {
    text = '1 day left';
  } else if (diffDays <= 7) {
    text = `${diffDays} days left`;
  } else if (diffDays <= 30) {
    text = `${diffDays} days left`;
  } else {
    text = `${Math.round(diffDays / 7)} weeks left`;
  }

  return {
    text,
    label: text,
    days: diffDays,
    isPast,
    urgent: diffDays > 0 && diffDays <= 7,
  };
}

/**
 * Strict Out-of-Pocket Net Tuition Gap
 * Formula: Gap = max(0, YearlyCost - (OtherAid + WonScholarships))
 */
export function calculateNetGap({ yearlyCost = 0, otherAid = 0, wonTotal = 0 }) {
  const cost = Math.max(0, Number(yearlyCost) || 0);
  const guaranteedAid = Math.max(0, (Number(otherAid) || 0) + (Number(wonTotal) || 0));
  const netGap = Math.max(0, cost - guaranteedAid);
  const fundedPercentage = cost > 0 ? Math.min(100, Math.round((guaranteedAid / cost) * 100)) : 100;

  return {
    yearlyCost: cost,
    guaranteedAid,
    netGap,
    fundedPercentage,
    isFullyFunded: netGap === 0,
  };
}

/**
 * "What If All Pending Win?" Hypothetical Simulator
 * Formula: SimulatedGap = max(0, YearlyCost - (OtherAid + WonScholarships + PendingScholarships))
 */
export function calculateSimulatedGap({ yearlyCost = 0, otherAid = 0, wonTotal = 0, pendingTotal = 0 }) {
  const cost = Math.max(0, Number(yearlyCost) || 0);
  const guaranteedAid = Math.max(0, (Number(otherAid) || 0) + (Number(wonTotal) || 0));
  const pending = Math.max(0, Number(pendingTotal) || 0);
  const totalSimulatedAid = guaranteedAid + pending;

  const simulatedGap = Math.max(0, cost - totalSimulatedAid);
  const surplus = Math.max(0, totalSimulatedAid - cost);
  const simulatedFundedPercentage = cost > 0 ? Math.min(100, Math.round((totalSimulatedAid / cost) * 100)) : 100;

  return {
    totalSimulatedAid,
    simulatedGap,
    surplus,
    simulatedFundedPercentage,
    willBeDebtFree: simulatedGap === 0,
  };
}

/**
 * 4-Year Debt Horizon Spline Calculation
 * Simulates cumulative debt accumulation over 4 undergraduate years
 * with compound tuition inflation (default: 3.5% per annum)
 */
export function calculateFourYearDebtProjection({
  yearlyCost = 0,
  otherAid = 0,
  wonTotal = 0,
  pendingTotal = 0,
  inflationRate = 0.035,
}) {
  const years = [
    { year: 1, label: 'Freshman' },
    { year: 2, label: 'Sophomore' },
    { year: 3, label: 'Junior' },
    { year: 4, label: 'Senior' },
  ];

  let cumulativeWithoutAid = 0;
  let cumulativeWithWon = 0;
  let cumulativeWithPending = 0;

  return years.map(({ year, label }, index) => {
    const inflationMultiplier = Math.pow(1 + inflationRate, index);
    const inflatedCost = Math.round(yearlyCost * inflationMultiplier);
    const guaranteedAnnualAid = otherAid + wonTotal;
    const potentialAnnualAid = guaranteedAnnualAid + pendingTotal;

    const annualDeficitNoAid = inflatedCost;
    const annualDeficitWithWon = Math.max(0, inflatedCost - guaranteedAnnualAid);
    const annualDeficitWithPending = Math.max(0, inflatedCost - potentialAnnualAid);

    cumulativeWithoutAid += annualDeficitNoAid;
    cumulativeWithWon += annualDeficitWithWon;
    cumulativeWithPending += annualDeficitWithPending;

    return {
      year,
      label,
      inflatedCost,
      annualDeficitWithWon,
      annualDeficitWithPending,
      cumulativeWithoutAid,
      cumulativeWithWon,
      cumulativeWithPending,
      cumulativeSavingsWon: cumulativeWithoutAid - cumulativeWithWon,
      cumulativeSavingsIfAllPending: cumulativeWithoutAid - cumulativeWithPending,
    };
  });
}

/**
 * Essay Word Limit Counter and Completion Ratio
 */
export function calculateEssayProgress(text = '', targetLimit = 500) {
  const clean = text.trim();
  const wordCount = clean ? clean.split(/\s+/).filter(Boolean).length : 0;
  const ratio = targetLimit > 0 ? Math.min(1, wordCount / targetLimit) : 1;
  const percentage = Math.min(100, Math.round(ratio * 100));
  const isOverLimit = wordCount > targetLimit;

  return {
    wordCount,
    targetLimit,
    percentage,
    isOverLimit,
    wordsRemaining: Math.max(0, targetLimit - wordCount),
  };
}
