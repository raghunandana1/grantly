import { describe, it, expect } from 'vitest';
import {
  formatCurrency,
  formatDaysRemaining,
  calculateNetGap,
  calculateSimulatedGap,
  calculateFourYearDebtProjection,
  calculateEssayProgress,
} from '../services/financialMath';

describe('GRANTLY Financial Mathematics & Integrity Suite', () => {
  it('1. Formats integer currency values cleanly with USD formatting', () => {
    expect(formatCurrency(45000)).toBe('$45,000');
    expect(formatCurrency(0)).toBe('$0');
    expect(formatCurrency(1250000)).toBe('$1,250,000');
    expect(formatCurrency(25500)).toBe('$25,500');
  });

  it('2. Evaluates deadline countdowns and flags urgent deadlines accurately', () => {
    const fixedNow = new Date('2026-11-07T12:00:00Z');
    const futureNear = new Date('2026-11-10T12:00:00Z').toISOString();
    const futureFar = new Date('2026-12-25T12:00:00Z').toISOString();
    const pastDate = new Date('2026-11-01T12:00:00Z').toISOString();

    const nearRes = formatDaysRemaining(futureNear, fixedNow);
    expect(nearRes.isPast).toBe(false);
    expect(nearRes.urgent).toBe(true);

    const farRes = formatDaysRemaining(futureFar, fixedNow);
    expect(farRes.isPast).toBe(false);
    expect(farRes.urgent).toBe(false);

    const pastRes = formatDaysRemaining(pastDate, fixedNow);
    expect(pastRes.isPast).toBe(true);
    expect(pastRes.label).toBe('Deadline closed');
  });

  it('3. Strict Financial Accountability: Pending aid is strictly quarantined and NOT subtracted from net gap', () => {
    const targetTuition = 50000;
    const institutionalAid = 12000;
    const wonScholarship = 12500;

    const res = calculateNetGap({
      yearlyCost: targetTuition,
      otherAid: institutionalAid,
      wonTotal: wonScholarship,
    });

    // Guaranteed Aid = 12,000 + 12,500 = 24,500
    // Net Gap = 50,000 - 24,500 = 25,500
    expect(res.guaranteedAid).toBe(24500);
    expect(res.netGap).toBe(25500);
    expect(res.fundedPercentage).toBe(49);
    expect(res.isFullyFunded).toBe(false);
  });

  it('4. Out-of-pocket deficit clamps safely at $0 when institutional and won aid exceed cost', () => {
    const res = calculateNetGap({
      yearlyCost: 30000,
      otherAid: 20000,
      wonTotal: 15000,
    });

    expect(res.netGap).toBe(0);
    expect(res.fundedPercentage).toBe(100);
    expect(res.isFullyFunded).toBe(true);
  });

  it('5. "What if all pending win?" simulator calculates hypothetical debt relief and surplus', () => {
    const simRes = calculateSimulatedGap({
      yearlyCost: 45000,
      otherAid: 15000,
      wonTotal: 10000,
      pendingTotal: 25000,
    });

    // Total Simulated Aid = 15,000 + 10,000 + 25,000 = 50,000
    // Simulated Gap = 0
    // Surplus = 50,000 - 45,000 = 5,000
    expect(simRes.totalSimulatedAid).toBe(50000);
    expect(simRes.simulatedGap).toBe(0);
    expect(simRes.surplus).toBe(5000);
    expect(simRes.willBeDebtFree).toBe(true);
  });

  it('6. 4-Year Debt Horizon Spline projects cumulative inflation and debt divergence', () => {
    const projection = calculateFourYearDebtProjection({
      yearlyCost: 40000,
      otherAid: 10000,
      wonTotal: 10000,
      pendingTotal: 15000,
      inflationRate: 0.035,
    });

    expect(projection.length).toBe(4);
    expect(projection[0].label).toBe('Freshman');
    expect(projection[3].label).toBe('Senior');

    // Senior year cost reflects 3.5% inflation per annum over 3 years
    expect(projection[3].inflatedCost).toBeGreaterThan(40000);

    // Cumulative debt without aid is higher than cumulative debt with won scholarships
    expect(projection[3].cumulativeWithoutAid).toBeGreaterThan(projection[3].cumulativeWithWon);
  });

  it('7. Essay word limit counter calculates progress and over-limit conditions', () => {
    const draftText = 'Education empowers students to unlock transformative technological breakthroughs for global good.';
    const progress = calculateEssayProgress(draftText, 20);

    expect(progress.wordCount).toBe(11);
    expect(progress.isOverLimit).toBe(false);
    expect(progress.wordsRemaining).toBe(9);
    expect(progress.percentage).toBe(55);
  });
});
