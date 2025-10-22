/**
 * Hooks Barrel Export
 * Feature-based organization for better scalability
 */

// Feature: QnA (Questions & Answers)
export * from './qna';

// Feature: Auth (Authentication)
export * from './auth';

// Feature: User (Profile & Settings)
export * from './user';

// Feature: Mentors
export * from './mentors';

// Feature: Alumni
export * from './alumni';

// Feature: Lawyers
export * from './lawyers';

// Feature: Sessions
export * from './sessions';

// Feature: Stay (Rooms & Roommates)
export * from './stay';

// Feature: Students
export * from './students';

// Feature: Calendar
export * from './calendar';

// Utility hooks (not feature-specific)
export { useIsMobile } from './useMobile';
export { usePagination } from './usePagination';
export { usePostRequirementModals } from './usePostRequirementModals';
