import { describe, it, expect } from 'vitest';
import { checkEligibility, filterScholarships } from '../services/scholarshipService';
import { SCHOLARSHIPS_DATA, INITIAL_STUDENT_PROFILE } from '../data/scholarshipData';

describe('GRANTLY Eligibility Matching & Verification Engine', () => {
  it('1. Accurately qualifies eligible STEM student against criteria rules', () => {
    const scholarship = SCHOLARSHIPS_DATA.find((s) => s.id === 'SCH-TURING-2026'); // Turing Fellowship (min GPA 3.6, CS)
    const result = checkEligibility(scholarship, INITIAL_STUDENT_PROFILE);

    expect(result.isEligible).toBe(true);
    expect(result.score).toBeGreaterThanOrEqual(85);
  });

  it('2. Flags unmet GPA criterion when student GPA is below minimum threshold', () => {
    const scholarship = SCHOLARSHIPS_DATA.find((s) => s.id === 'SCH-TURING-2026');
    const lowGpaProfile = { ...INITIAL_STUDENT_PROFILE, gpa: 3.2 };

    const result = checkEligibility(scholarship, lowGpaProfile);
    expect(result.isEligible).toBe(false);
    expect(result.reasons.some((r) => r.includes('Minimum GPA requires'))).toBe(true);
  });

  it('3. Flags income cap violation when household income exceeds need-based threshold', () => {
    const needScholarship = SCHOLARSHIPS_DATA.find((s) => s.id === 'SCH-FIRSTGEN-2026'); // NextGen First-Gen (max $65k)
    const wealthyProfile = { ...INITIAL_STUDENT_PROFILE, householdIncome: 120000 };

    const result = checkEligibility(needScholarship, wealthyProfile);
    expect(result.isEligible).toBe(false);
    expect(result.reasons.some((r) => r.includes('Income cap is'))).toBe(true);
  });

  it('4. Filters catalog by search query and category correctly', () => {
    const filtered = filterScholarships(
      SCHOLARSHIPS_DATA,
      { query: 'Turing', category: 'All' },
      INITIAL_STUDENT_PROFILE
    );

    expect(filtered.length).toBeGreaterThan(0);
    expect(filtered[0].title).toContain('Turing');
  });

  it('5. Filters catalog strictly for renewable awards', () => {
    const renewableOnly = filterScholarships(
      SCHOLARSHIPS_DATA,
      { onlyRenewable: true },
      INITIAL_STUDENT_PROFILE
    );

    expect(renewableOnly.every((s) => s.renewable === true)).toBe(true);
  });
});
