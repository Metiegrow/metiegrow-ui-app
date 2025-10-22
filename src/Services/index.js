/**
 * Services Barrel Export
 * All API service functions (no React hooks)
 */

// Export axios instance
export { default as axiosInstance } from './config/axios.config';

// Export all API services
export { authApi } from './auth.service';
export { qnaApi, QUESTION_TYPES } from './qna.service';
export { userApi } from './user.service';
export { locationApi } from './location.service';
export { jobApi } from './job.service';
export { mentorApi } from './mentor.service';
export { lawyerApi } from './lawyer.service';
export { calendarApi } from './calendar.service';
export { personalizationApi } from './personalization.service';
export { stayApi } from './stay.service';
