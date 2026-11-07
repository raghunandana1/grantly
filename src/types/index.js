/**
 * GRANTLY System Architecture Type Definitions & Data Contracts
 * @module types
 */

/**
 * @typedef {'freshman' | 'sophomore' | 'junior' | 'senior' | 'graduate'} AcademicYear
 */

/**
 * @typedef {'preparing' | 'submitted' | 'interview' | 'awarded' | 'not_selected'} ApplicationStatus
 */

/**
 * @typedef {Object} Scholarship
 * @property {string} id - Unique scholarship identifier
 * @property {string} title - Human-readable scholarship title
 * @property {string} sponsor - Sponsoring institution or foundation
 * @property {number} amount - Dollar award value
 * @property {string} category - Classification category
 * @property {string} deadline - ISO deadline date
 * @property {number} minGpa - Minimum GPA threshold
 * @property {number|null} maxHouseholdIncome - Income eligibility cap (null for merit-only)
 * @property {boolean} renewable - Whether award renews annually
 * @property {string[]} targetMajors - Array of eligible academic majors
 * @property {string[]} allowedYears - Array of eligible class standings
 * @property {string[]} requirements - Checklist of required documentation
 * @property {string} description - Editorial description of award mission
 */

/**
 * @typedef {Object} StudentProfile
 * @property {string} name - Student full name
 * @property {string} email - Student email
 * @property {string} major - Current declared academic major
 * @property {string} year - Current class standing
 * @property {number} gpa - Cumulative Grade Point Average
 * @property {number} householdIncome - Annual household income
 * @property {number} yearlyCostOfAttendance - Target institution COA
 * @property {number} otherAid - Guaranteed institutional aid and grants
 * @property {string} citizenship - Residency / citizenship status
 * @property {boolean} firstGen - First-generation college student status
 */

/**
 * @typedef {Object} Application
 * @property {string} id - Application identifier
 * @property {string} scholarshipId - Associated scholarship ID
 * @property {ApplicationStatus} status - Lifecycle pipeline status
 * @property {string} appliedDate - Submission or initiation date
 * @property {string} [awardedDate] - Award confirmation date
 * @property {string} notes - User strategy notes
 * @property {number} checklistProgress - Count of completed checklist items
 * @property {number} checklistTotal - Total required checklist items
 */

/**
 * @typedef {Object} FinancialBreakdown
 * @property {number} yearlyCost - Yearly Cost of Attendance
 * @property {number} otherAid - Institutional grants and savings
 * @property {number} wonTotal - Confirmed awarded scholarships
 * @property {number} pendingTotal - In-flight pending applications
 * @property {number} currentGap - Strict out-of-pocket tuition shortfall
 * @property {number} simulatedGap - Hypothetical gap if all pending applications win
 * @property {number} surplus - Surplus funding if total aid exceeds costs
 * @property {boolean} isFullyFunded - Whether confirmed gap is $0
 * @property {number} awardedCount - Count of won scholarships
 * @property {number} pendingCount - Count of pending applications
 */

export const PIPELINE_STAGES = [
  { id: 'preparing', label: 'Preparing', step: 1 },
  { id: 'submitted', label: 'Submitted', step: 2 },
  { id: 'interview', label: 'Interview', step: 3 },
  { id: 'awarded', label: 'Awarded', step: 4 },
  { id: 'not_selected', label: 'Not Selected', step: 5 },
];
