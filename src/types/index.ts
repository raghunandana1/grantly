/**
 * GRANTLY Enterprise TypeScript Definitions
 * FQE v3.1 Strict Typing Standards
 */

export type AcademicYear = 'Freshman' | 'Sophomore' | 'Junior' | 'Senior' | 'Graduate';

export type PipelineStageId = 'preparing' | 'submitted' | 'interview' | 'awarded' | 'not_selected';

export type InstitutionalRole = 'Student' | 'Financial Aid Advisor' | 'Scholarship Donor';

export interface ChecklistRequirement {
  id: string;
  title: string;
  completed: boolean;
}

export interface Scholarship {
  id: string;
  title: string;
  sponsor: string;
  amount: number;
  renewable: boolean;
  renewableYears?: number;
  deadline: string;
  daysRemaining: number;
  category: 'STEM' | 'Need-Based' | 'Merit' | 'First-Gen' | 'Public Service' | 'Arts & Design';
  minGpa: number;
  maxHouseholdIncome: number | null;
  targetMajors: string[];
  allowedYears: string[];
  acceptanceRate: string;
  description: string;
  requirements: ChecklistRequirement[];
  tags: string[];
  disbursementMethod: string;
}

export interface StudentProfile {
  id: string;
  name: string;
  avatar: string;
  email: string;
  university: string;
  degree: string;
  major: string;
  year: AcademicYear;
  gpa: number;
  householdIncome: number;
  firstGen: boolean;
  citizenship: string;
  yearlyCostOfAttendance: number;
  otherAid: number;
}

export interface Persona {
  role: InstitutionalRole;
  name: string;
  avatar: string;
  title: string;
  organization: string;
  focus: string;
  stats: {
    label: string;
    value: string;
  }[];
}

export interface Application {
  id: string;
  scholarshipId: string;
  status: PipelineStageId;
  appliedDate: string;
  awardedDate?: string;
  notes: string;
  checklistProgress: number;
  checklistTotal: number;
}

export interface FinancialBreakdown {
  yearlyCost: number;
  otherAid: number;
  wonTotal: number;
  pendingTotal: number;
  currentGap: number;
  simulatedGap: number;
  surplus: number;
  isFullyFunded: boolean;
  awardedCount: number;
  pendingCount: number;
}

export interface EligibilityResult {
  isEligible: boolean;
  reasons: string[];
  score: number;
}

export interface PipelineStage {
  id: PipelineStageId;
  label: string;
  step: number;
}
