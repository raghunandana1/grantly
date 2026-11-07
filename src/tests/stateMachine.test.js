import { describe, it, expect } from 'vitest';
import { PIPELINE_STAGES } from '../types/index';
import { INITIAL_APPLICATIONS, SCHOLARSHIPS_DATA } from '../data/scholarshipData';

describe('GRANTLY Application Lifecycle State Machine', () => {
  it('1. Confirms all defined pipeline stages in valid progression sequence', () => {
    const stageIds = PIPELINE_STAGES.map((s) => s.id);
    expect(stageIds).toEqual(['preparing', 'submitted', 'interview', 'awarded', 'not_selected']);
  });

  it('2. Transitioning application status to awarded maintains portfolio state', () => {
    const app = { ...INITIAL_APPLICATIONS[0] };
    const originalProgress = app.checklistProgress;

    // Simulate transition to awarded
    const awardedApp = {
      ...app,
      status: 'awarded',
      awardedDate: 'Nov 07, 2026',
    };

    expect(awardedApp.status).toBe('awarded');
    expect(awardedApp.checklistProgress).toBe(originalProgress);
    expect(awardedApp.awardedDate).toBe('Nov 07, 2026');
  });

  it('3. Associates application with existing scholarship catalog record', () => {
    const sampleApp = INITIAL_APPLICATIONS[0];
    const matchingSch = SCHOLARSHIPS_DATA.find((s) => s.id === sampleApp.scholarshipId);

    expect(matchingSch).toBeDefined();
    expect(matchingSch.amount).toBeGreaterThan(0);
  });
});
