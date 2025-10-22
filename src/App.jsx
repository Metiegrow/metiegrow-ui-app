import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  NotFoundRoute,
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from '@tanstack/react-router';
import './App.css';
import MainLayout from './Components/MainLayout';
import Landing from './Components/Landing/Landing';
import Answers from './Components/MyQandA/Answers';
import AskQuestions from './Components/MyQandA/AskQuestions';

import './index.css';
import NeedRoomForm from './Components/Stay/NeedRoom/NeedRoomForm';
import RoommateHousing from './Components/Stay/NeedRoom/RoommateHousing';
import RoommateProfile from './Components/Stay/NeedRoom/RoommateProfile';
import RoomProfile from './Components/Stay/NeedRoomate/RoomProfile';
import StayRoomDetails from './Components/Stay/StayRoomDetails';

import NeedRoommateForm from './Components/Stay/NeedRoomate/NeedRoommateForm';
import RoomHousingList from './Components/Stay/NeedRoomate/RoomHousingList';
import PropertiesList from './Components/Stay/NeedRoomate/PropertiesList';
import RoommateHousingList from './Components/Stay/NeedRoom/RoommateHousingList';
import RoommatePropertiesList from './Components/Stay/NeedRoom/RoommatePropertiesList';
import ProfileUpdate from './Components/Profile/ProfileUpdate';
import StudentDashboard from './Components/Dashboard/components/StudentDashboard';
import Login from './Components/Login/Login';
import UpcomingSession from './Components/Sessions/UpcomingSession';
import MentorRecommendation from './Components/Mentors/MentorRecommendation';
import VerifyOTP from './Components/ForgotPassword/VerifyOTP';
import ForgotPassword from './Components/ForgotPassword/ForgotPassword';
import ResetPassword from './Components/ForgotPassword/ResetPassword';
import StayListDetail from './Components/StayListDetail';
import RoomHousingPage from './Components/Stay/NeedRoomate/Roomhousing';
import BatchMate from './Components/Batchmates/Batchmate';
import JobsListing from './Components/Jobs/Job';
import MentorshipProfileUI from './Components/Mentors/MentorsProfile';
import JobListingUI from './Components/Jobs/JobsViewPage';
import JobApplicationForm from './Components/Jobs/ApplyJobForm';
import CompanyProfile from './Components/Jobs/CompanyDetails';
import NotificationsUI from './Components/Notifications/Notifications';
import JobPosting from './Components/Jobs/JobsDetails';
import Register1 from './Components/Signup/Register';
import MobileSettingsUI from './Components/Settings/Account/AccountSettings';
import PersonalisationSettings from './Components/Settings/Personalisation/Personalisation';
import SettingsHub from './Components/Settings/Settings';
import NotificationSetting from './Components/Settings/NotificationSetting';
import PaymentSettings from './Components/Settings/PaymentSettings';
import IdentityVerification from './Components/Settings/IdentityVerification';
import PrivacySettings from './Components/Settings/PrivacySettings';
import ResumeCVWriting from './Components/Dashboard/Toolkit/ResumeCVWriting';
import MessagesPage from './Components/Messages/MessagesPage';
import SOPLORWriting from './Components/Dashboard/Toolkit/SOPLORWriting';
import AdmissionGuidance from './Components/Dashboard/Toolkit/AdmissionGuidance';
import InderviewPreparation from './Components/Dashboard/Toolkit/InterviewPreparation';
import HouseHunt from './Components/Dashboard/Toolkit/Househunt';
import Alumni from './Components/Alumni/Alumni';
import Lawyer from './Components/Lawyer/Lawyer';

import HelpSupport from './Components/Settings/HelpSupport';
import AlumniBookingPlatform from './Components/Alumni/AlumniDetails';
import LawyerBookingPlatform from './Components/Lawyer/LawyerDetails';
import MentorHome from './Components/Mentor/MentorHome';
import Gigs from './Components/Mentor/Gigs/Gigs';
import Compliance from './Components/Mentor/Compliance/Compliance';
import SessionUI from './Components/Sessions/SessionsList';
import TransactionsPage from './Components/Common/Dropdown/TransactionsPage';
import AvailabilityForm from './Components/Availability/Availability';
import TimeZonePage from './Components/Availability/TimeZonePage';
import MyCases from './Components/Lawyer/MyCases';
import QAInterface from './Components/QuestionsAndAnswer/QuestionsCardLists';
import RegisterForm from './Components/Signup/Register';
import RecruiterMenu from './Components/Recruiter/RecruiterMenu';
import JobPostForm from './Components/Recruiter/JobPostForm';
import AboutCompanyForm from './Components/Recruiter/AboutCompanyForm'; //testing
import CompliancePage from './Components/Recruiter/CompliancePage';
import RecruiterProfile from './Components/Recruiter/RecruiterProfile';
import LawyerDashboard from './Components/Dashboard/components/LawyerDashboard';
import PersonalInfo from './Components/Profile/PersonalInfo';
import MentorDashboard from './Components/Dashboard/components/MentorDashboard';
import AlumniDashboard from './Components/Dashboard/components/AlumniDashboard';
import PgOwnerDashboard from './Components/Dashboard/components/PgOwnerDashboar';
import RecruiterDashboard from './Components/Dashboard/components/RecruiterDashboard';
import BatchmateDetails from './Components/Students/BatchmateDetails';
import MyPlan from './Components/Landlord/LandlordMyPost/LandlordMyPost';
import LandlordMyPost from './Components/Landlord/LandlordMyPost/LandlordMyPost';
import LandlordPostDetail from './Components/Landlord/LandlordPostDetail';

const rootRoute = createRootRoute({
  component: () => <Outlet />,
});

const landingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Landing,
});

const mainLayoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: 'app',
  component: MainLayout,
});

// // Define child routes
// const dashboardRoute = createRoute({
//   getParentRoute: () => mainLayoutRoute,
//   path: 'dashboard',
//   component: Dashboard,
// })

export const roomNeedFormRoute = createRoute({
  getParentRoute: () => mainLayoutRoute,
  path: 'room-form',
  component: NeedRoomForm,
});

const roommateHousingRoute = createRoute({
  getParentRoute: () => mainLayoutRoute,
  path: 'roommate-housing',
  component: RoommateHousing,
});

const roommateProfileRoute = createRoute({
  getParentRoute: () => mainLayoutRoute,
  path: 'roommate/$roommateId',
  component: RoommateProfile,
});

const roommateHousingListRoute = createRoute({
  getParentRoute: () => mainLayoutRoute,
  path: 'roommate-housing-list',
  component: RoommateHousingList,
});

const roommatePropertiesListRoute = createRoute({
  getParentRoute: () => mainLayoutRoute,
  path: 'roommate-properties-list',
  component: RoommatePropertiesList,
});

const roommateNeedFormRoute = createRoute({
  getParentRoute: () => mainLayoutRoute,
  path: 'roommate-form',
  component: NeedRoommateForm,
});

const roomHousingRoute = createRoute({
  getParentRoute: () => mainLayoutRoute,
  path: 'room-housing',
  component: RoomHousingPage,
});

const roomHousingListRoute = createRoute({
  getParentRoute: () => mainLayoutRoute,
  path: 'room-housing-list',
  component: RoomHousingList,
});

const propertiesListRoute = createRoute({
  getParentRoute: () => mainLayoutRoute,
  path: 'properties-list',
  component: PropertiesList,
});

const roomProfileRoute = createRoute({
  getParentRoute: () => mainLayoutRoute,
  path: 'room-profile/$id',
  component: RoomProfile,
});

const updateProfileRoute = createRoute({
  getParentRoute: () => mainLayoutRoute,
  path: 'profile',
  component: ProfileUpdate,
});

const studentDashboardRoute = createRoute({
  getParentRoute: () => mainLayoutRoute,
  path: 'student-dashboard',
  component: StudentDashboard,
});

const ProfileRoute = createRoute({
  getParentRoute: () => mainLayoutRoute,
  path: 'personal-info',
  component: PersonalInfo,
});

const lawyerDashboardRoute = createRoute({
  getParentRoute: () => mainLayoutRoute,
  path: 'lawyer-dashboard',
  component: LawyerDashboard,
});

const HelpandSupportRoute = createRoute({
  getParentRoute: () => mainLayoutRoute,
  path: 'support',
  component: HelpSupport,
}); //added

const batchmatesRoute = createRoute({
  getParentRoute: () => mainLayoutRoute,
  path: 'batchmates',
  component: BatchMate,
});

const batchmateDetailsRoute = createRoute({
  getParentRoute: () => mainLayoutRoute,
  path: 'batchmate-details/$id',
  component: BatchmateDetails,
});

const settingsHubRoute = createRoute({
  getParentRoute: () => mainLayoutRoute,
  path: 'settings',
  component: SettingsHub,
});

const accountSettingsRoute = createRoute({
  getParentRoute: () => mainLayoutRoute,
  path: 'settings/account',
  component: MobileSettingsUI,
});

const notificationsSettingsRoute = createRoute({
  getParentRoute: () => mainLayoutRoute,
  path: 'settings/notifications',
  component: MobileSettingsUI,
});

const paymentSettingsRoute = createRoute({
  getParentRoute: () => mainLayoutRoute,
  path: 'settings/payment',
  component: MobileSettingsUI,
});

const personalisationSettingsRoute = createRoute({
  getParentRoute: () => mainLayoutRoute,
  path: 'settings/personalisation',
  component: MobileSettingsUI,
});

const identitySettingsRoute = createRoute({
  getParentRoute: () => mainLayoutRoute,
  path: 'settings/identity',
  component: MobileSettingsUI,
});

const privacySettingsRoute = createRoute({
  getParentRoute: () => mainLayoutRoute,
  path: 'settings/privacy',
  component: MobileSettingsUI,
});

const PersonalizationSettingsRoute = createRoute({
  getParentRoute: () => mainLayoutRoute,
  path: 'personalisation-settings',
  component: PersonalisationSettings,
});

const jobsRoute = createRoute({
  getParentRoute: () => mainLayoutRoute,
  path: 'jobs',
  component: JobsListing,
});

const jobsListingRoute = createRoute({
  getParentRoute: () => mainLayoutRoute,
  path: 'jobs-listing',
  component: JobListingUI,
});

const applyJobRoute = createRoute({
  getParentRoute: () => mainLayoutRoute,
  path: 'jobs-form',
  component: JobApplicationForm,
});
const productDesigner = createRoute({
  getParentRoute: () => mainLayoutRoute,
  path: 'jobs-posting',
  component: JobPosting,
});
const companyDetailsRoute = createRoute({
  getParentRoute: () => mainLayoutRoute,
  path: 'company-details',
  component: CompanyProfile,
});

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: 'login',
  component: Login,
});

const forgotPasswordRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/forgot-password',
  component: ForgotPassword,
});

const verifyOtpRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/verify-otp',
  component: VerifyOTP,
});

const resetPasswordRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/reset-password',
  component: ResetPassword,
});

const upcomingSessionRoute = createRoute({
  getParentRoute: () => mainLayoutRoute,
  path: 'sessions',
  component: UpcomingSession,
});

//recruiter route
const RecruiterRoute = createRoute({
  getParentRoute: () => mainLayoutRoute,
  path: 'recruiter',
  component: RegisterForm,
});

//recruiter route
const recruiterDashboardRoute = createRoute({
  getParentRoute: () => mainLayoutRoute,
  path: 'recruiter-dashboard',
  component: RecruiterDashboard,
});
//recruiter route
const RecruiterMenuRoute = createRoute({
  getParentRoute: () => mainLayoutRoute,
  path: 'recruiter-menu',
  component: RecruiterMenu,
});
//recruiter route
const JobsPostFormRoute = createRoute({
  getParentRoute: () => mainLayoutRoute,
  path: 'jobs-post-form',
  component: JobPostForm,
});

//sample route for testing recuriter
const AboutCompanyFormRoute = createRoute({
  getParentRoute: () => mainLayoutRoute,
  path: 'about-company',
  component: AboutCompanyForm,
});
//sample  route for testing compliance recuriter
const RecruiterComplianceRoute = createRoute({
  getParentRoute: () => mainLayoutRoute,
  path: 'recruiter-compliance',
  component: CompliancePage,
});

//sample route for testing profile recuriter
const RecruiterProfileRoute = createRoute({
  getParentRoute: () => mainLayoutRoute,
  path: 'recruiter-profile',
  component: RecruiterProfile,
});

const mentorRoute = createRoute({
  getParentRoute: () => mainLayoutRoute,
  path: 'mentor',
  component: MentorRecommendation,
});
const mentorDashboardRoute = createRoute({
  getParentRoute: () => mainLayoutRoute,
  path: 'mentor-dashboard',
  component: MentorDashboard,
});
const mentorProfileRoute = createRoute({
  getParentRoute: () => mainLayoutRoute,
  path: 'mentor-profile',
  component: MentorshipProfileUI,
});

const transactionsRoute = createRoute({
  getParentRoute: () => mainLayoutRoute,
  path: 'transactions',
  component: TransactionsPage,
});

const alumniRoute = createRoute({
  getParentRoute: () => mainLayoutRoute,
  path: 'alumni',
  component: Alumni,
});
const alumniDetailsRoute = createRoute({
  getParentRoute: () => mainLayoutRoute,
  path: 'alumni-details',
  component: AlumniBookingPlatform,
});

const alumniDashboardRoute = createRoute({
  getParentRoute: () => mainLayoutRoute,
  path: 'alumni-dashboard',
  component: AlumniDashboard,
});

const pgownerDashboardRoute = createRoute({
  getParentRoute: () => mainLayoutRoute,
  path: 'landlord-dashboard',
  component: PgOwnerDashboard,
});

const landlordMyPostRoute = createRoute({
  getParentRoute: () => mainLayoutRoute,
  path: 'landlord-my-post',
  component: LandlordMyPost,
});

const landlordPostDetailRoute = createRoute({
  getParentRoute: () => mainLayoutRoute,
  path: 'landlord-post/$id',
  component: LandlordPostDetail,
});

const lawyerRoute = createRoute({
  getParentRoute: () => mainLayoutRoute,
  path: 'lawyer',
  component: Lawyer,
});

const lawyerDetailRoute = createRoute({
  getParentRoute: () => mainLayoutRoute,
  path: 'lawyer-Profile',
  component: LawyerBookingPlatform,
});

const myCasesRoute = createRoute({
  getParentRoute: () => mainLayoutRoute,
  path: 'my-cases',
  component: MyCases,
});

const studentSignRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: 'signup',
  component: Register1,
});

const askQuestionRoute = createRoute({
  getParentRoute: () => mainLayoutRoute,
  path: 'ask-question',
  component: AskQuestions,
});
const answeredRoute = createRoute({
  getParentRoute: () => mainLayoutRoute,
  path: 'answers',
  component: Answers,
});
const stayListingDetailRoute = createRoute({
  getParentRoute: () => mainLayoutRoute,
  path: 'stay-listing-detail',
  component: StayListDetail,
});

const stayRoomDetailsRoute = createRoute({
  getParentRoute: () => mainLayoutRoute,
  path: 'stay-room-details/$id',
  component: StayRoomDetails,
});

const notificationsRoute = createRoute({
  getParentRoute: () => mainLayoutRoute,
  path: 'notifications',
  component: NotificationsUI,
});

const househuntRoute = createRoute({
  getParentRoute: () => mainLayoutRoute,
  path: 'househunt',
  component: HouseHunt,
});
const resumeCVWritingRoute = createRoute({
  getParentRoute: () => mainLayoutRoute,
  path: 'resume',
  component: ResumeCVWriting,
});

const sOPLORWritingRoute = createRoute({
  getParentRoute: () => mainLayoutRoute,
  path: 'soplorwriting',
  component: SOPLORWriting,
});

const inderviewPreparationRoute = createRoute({
  getParentRoute: () => mainLayoutRoute,
  path: 'interviewpreparation',
  component: InderviewPreparation,
});

const admissionGuidanceRoute = createRoute({
  getParentRoute: () => mainLayoutRoute,
  path: 'admission-guidance',
  component: AdmissionGuidance,
});
const messageRoute = createRoute({
  getParentRoute: () => mainLayoutRoute,
  path: 'message',
  component: MessagesPage,
});

const mentorHomeRoute = createRoute({
  getParentRoute: () => mainLayoutRoute,
  path: 'mentor-home',
  component: MentorHome,
});

const sessionRoute = createRoute({
  getParentRoute: () => mainLayoutRoute,
  path: 'session-list',
  component: SessionUI,
});

const UpcomingRoute = createRoute({
  getParentRoute: () => mainLayoutRoute,
  path: 'upcoming-session',
  component: UpcomingSession,
});

const availabilityRoute = createRoute({
  getParentRoute: () => mainLayoutRoute,
  path: 'availability',
  component: AvailabilityForm,
});
const gigsRoute = createRoute({
  getParentRoute: () => mainLayoutRoute,
  path: 'gigs',
  component: Gigs,
});

const complianceRoute = createRoute({
  getParentRoute: () => mainLayoutRoute,
  path: 'compliance',
  component: Compliance,
});

const TimezoneRoute = createRoute({
  getParentRoute: () => mainLayoutRoute,
  path: 'TimeZone',
  component: TimeZonePage,
});

const QuestinslistRoute = createRoute({
  getParentRoute: () => mainLayoutRoute,
  path: 'questions-list',
  component: QAInterface,
});

const routeTree = rootRoute.addChildren([
  landingRoute,
  mainLayoutRoute.addChildren([
    studentSignRoute,
    loginRoute,
    // dashboardRoute,
    forgotPasswordRoute,
    verifyOtpRoute,
    resetPasswordRoute,
    stayListingDetailRoute,
    stayRoomDetailsRoute,
    roomNeedFormRoute,
    roommateHousingRoute,
    roommateProfileRoute,
    roommateHousingListRoute,
    roommatePropertiesListRoute,
    batchmatesRoute,
    batchmateDetailsRoute,
    ProfileRoute,
    settingsHubRoute,
    accountSettingsRoute,
    notificationsSettingsRoute,
    paymentSettingsRoute,
    personalisationSettingsRoute,
    identitySettingsRoute,
    privacySettingsRoute,
    sessionRoute,
    UpcomingRoute,
    RecruiterRoute,
    recruiterDashboardRoute,
    RecruiterMenuRoute,
    JobsPostFormRoute,
    AboutCompanyFormRoute,
    RecruiterComplianceRoute,
    RecruiterProfileRoute,

    roommateNeedFormRoute,
    roomHousingRoute,
    roomHousingListRoute,
    propertiesListRoute,
    roomProfileRoute,

    // START PG-OWNER or Landlord
    pgownerDashboardRoute,
    landlordMyPostRoute,
    landlordPostDetailRoute,
    // END PG-OWNER or Landlord

    updateProfileRoute,
    studentDashboardRoute,
    lawyerDashboardRoute,
    HelpandSupportRoute,
    askQuestionRoute,
    answeredRoute,
    upcomingSessionRoute,
    mentorRoute,
    mentorDashboardRoute,
    mentorProfileRoute,
    gigsRoute,
    complianceRoute,
    transactionsRoute,
    alumniRoute,
    alumniDetailsRoute,
    lawyerRoute,
    lawyerDetailRoute,
    myCasesRoute,
    jobsRoute,
    jobsListingRoute,
    applyJobRoute,
    productDesigner,
    companyDetailsRoute,
    notificationsRoute,
    househuntRoute,
    resumeCVWritingRoute,
    sOPLORWritingRoute,
    inderviewPreparationRoute,
    admissionGuidanceRoute,
    messageRoute,
    mentorHomeRoute,
    availabilityRoute,
    TimezoneRoute,
    PersonalizationSettingsRoute,
    QuestinslistRoute,
    alumniDashboardRoute,
  ]),
]);

const router = createRouter({
  routeTree,
  defaultPreload: 'intent',
});

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
