/**
 * GRANTLY Scholarship Evaluation & Query Service
 * Handles multi-criteria verification, relevance scoring, and query filtration.
 */

export function checkEligibility(scholarship, studentProfile) {
  if (!scholarship || !studentProfile) {
    return { isEligible: false, reasons: ['Profile or scholarship data missing'], score: 0 };
  }

  const reasons = [];
  let isEligible = true;

  // 1. GPA Verification
  const studentGpa = Number(studentProfile.gpa) || 0;
  const minGpa = Number(scholarship.minGpa) || 0;
  if (studentGpa < minGpa) {
    isEligible = false;
    reasons.push(`Minimum GPA requires ${minGpa.toFixed(2)} (Current: ${studentGpa.toFixed(2)})`);
  } else {
    reasons.push(`GPA ${studentGpa.toFixed(2)} meets threshold (${minGpa.toFixed(2)}+)`);
  }

  // 2. Household Income Verification
  if (scholarship.maxHouseholdIncome !== null && scholarship.maxHouseholdIncome !== undefined) {
    const studentIncome = Number(studentProfile.householdIncome) || 0;
    if (studentIncome > scholarship.maxHouseholdIncome) {
      isEligible = false;
      reasons.push(
        `Income cap is $${scholarship.maxHouseholdIncome.toLocaleString()} (Current: $${studentIncome.toLocaleString()})`
      );
    } else {
      reasons.push('Household income meets need threshold');
    }
  }

  // 3. Academic Major Verification
  const allowedMajors = Array.isArray(scholarship.targetMajors) ? scholarship.targetMajors : [];
  const majorMatch =
    allowedMajors.includes('All Majors') ||
    allowedMajors.includes(studentProfile.major);

  if (!majorMatch) {
    isEligible = false;
    reasons.push(`Major requirement: ${allowedMajors.join(', ')}`);
  } else {
    reasons.push(`Major (${studentProfile.major}) matches criteria`);
  }

  // 4. Academic Year Verification
  const allowedYears = Array.isArray(scholarship.allowedYears) ? scholarship.allowedYears : [];
  const yearMatch = allowedYears.length === 0 || allowedYears.includes(studentProfile.year);
  if (!yearMatch) {
    isEligible = false;
    reasons.push(`Restricted to ${allowedYears.join(', ')} (Current: ${studentProfile.year})`);
  }

  // 5. Computed Fit Score
  let score = 50;
  if (isEligible) {
    score = Math.min(99, Math.round(85 + (studentGpa - minGpa) * 25));
  } else {
    score = Math.max(15, Math.round(65 - reasons.filter((r) => r.includes('requires') || r.includes('Restricted') || r.includes('cap')).length * 15));
  }

  return {
    isEligible,
    reasons,
    score,
  };
}

export function filterScholarships(scholarships = [], criteria = {}, studentProfile = {}) {
  const {
    query = '',
    onlyEligible = false,
    onlyRenewable = false,
    category = 'All',
    minAmount = 0,
  } = criteria;

  return scholarships.filter((s) => {
    // Text search
    if (query.trim()) {
      const q = query.toLowerCase();
      const matches =
        s.title.toLowerCase().includes(q) ||
        s.sponsor.toLowerCase().includes(q) ||
        s.category.toLowerCase().includes(q) ||
        s.description.toLowerCase().includes(q);
      if (!matches) return false;
    }

    // Eligibility check
    if (onlyEligible) {
      const { isEligible } = checkEligibility(s, studentProfile);
      if (!isEligible) return false;
    }

    // Renewable check
    if (onlyRenewable && !s.renewable) {
      return false;
    }

    // Category filter
    if (category !== 'All' && s.category !== category) {
      return false;
    }

    // Min Amount
    if (s.amount < minAmount) {
      return false;
    }

    return true;
  });
}
