import AppLayout from "layout/AppLayout";
import React, { Suspense } from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch, withRouter } from "react-router-dom";

// import MyApplications from './myapp/my-applications/my-applications';
// import MyDetails from './myapp/my-details/my-details';
// import MyDocuments from './myapp/my-documents/my-documents';
// import { MyProfile } from './myapp/my-profile/MyProfile';

const ViewMyApp = React.lazy(() =>
  import(/* webpackChunkName: "views-app" */ "./myapp")
);
const ViewMyApplications = React.lazy(() =>
  import(
    /* webpackChunkName: "views-app" */ "./myapp/my-applications/my-applications"
  )
);
const ViewDashBoard = React.lazy(() =>
  import(/* webpackChunkName: "views-app" */ "./myapp/DashBoard/DashBoard")
);
const ViewMyDetails = React.lazy(() =>
  import(/* webpackChunkName: "views-app" */ "./myapp/my-details/my-details")
);
const ViewMyDocuments = React.lazy(() =>
  import(
    /* webpackChunkName: "views-app" */ "./myapp/my-documents/my-documents"
  )
);

// const JobPage = React.lazy(() =>
//   import(/* webpackChunkName: "viwes-blank-page" */ './jobs')
// );
const ProfilePage = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ "./profiles")
);
// const Mentorship = React.lazy(() =>
//   import(/* webpackChunkName: "viwes-blank-page" */ './myapp/mentorship')
// );
// Mentorship Cards
const MentorCard = React.lazy(() =>
  import(/* webpackChunkName: "views-app" */ "./myapp/mentorship/mentorcard")
);
// Mentors profile page
const MentorProfile = React.lazy(() =>
  import(/* webpackChunkName: "views-app" */ "./myapp/mentorship/MentorProfile")
);
const MentorAnswers = React.lazy(() =>
  import(/* webpackChunkName: "views-app" */ "./myapp/mentorship/MentorAnswers")
);
const MentorConsult = React.lazy(() =>
  import(/* webpackChunkName: "views-app" */ "./myapp/mentorship/MentorConsult")
);
const MentorCreatedSlots = React.lazy(() =>
  import(
    /* webpackChunkName: "views-app" */ "./myapp/mentorship/MentorCreatedSlot"
  )
);
const FilterQuestions = React.lazy(() =>
  import(
    /* webpackChunkName: "views-app" */ "./myapp/mentorship/FilterQuestions"
  )
);
const ViewMyChat = React.lazy(() =>
  import(/* webpackChunkName: "views-app" */ "./myapp/Chat/Chat")
);

const AskQuestion = React.lazy(() =>
  import(/* webpackChunkName: "views-app" */ "./myapp/mentorship/AskQuestion")
);
const ViewActivities = React.lazy(() =>
  import(/* webpackChunkName: "views-app" */ "./myapp/mentorship/myQandA")
);

const Month = React.lazy(() =>
  import(/* webpackChunkName: "views-app" */ "./myapp/BigCalendar/Month")
);
const MentorSessionList = React.lazy(() =>
  import(
    /* webpackChunkName: "views-app" */ "./myapp/BigCalendar/MentorSessionList"
  )
);
const MentorListSessions = React.lazy(() =>
  import(
    /* webpackChunkName: "views-app" */ "./myapp/mentorship/MentorSessionUpcoming"
  )
);
// const CalendarGoogle = React.lazy(() =>
//   import(
//     /* webpackChunkName: "views-app" */ './myapp/mentorship/CalendarGoogle'
//   )
// );
// const CreateJobPage = React.lazy(() =>
//   import(/* webpackChunkName: "viwes-blank-page" */ './create-jobs')
// );
// const EditJobPage = React.lazy(() =>
//   import(/* webpackChunkName: "viwes-blank-page" */ './edit-jobs')
// );
const ViewMylogin = React.lazy(() =>
  import(/* webpackChunkName: "views-app" */ "./myapp/my-login/ApplyMentor")
);
const ViewLawyerlogin = React.lazy(() =>
  import(
    /* webpackChunkName: "views-app" */ "./myapp/lawyer-login/ApplyAsLawyer"
  )
);
const ViewAlumnilogin = React.lazy(() =>
  import(
    /* webpackChunkName: "views-app" */ "./myapp/AlumniRegister/ApplyAlumni"
  )
);

const ViewHrlogin = React.lazy(() =>
  import(
    /* webpackChunkName: "views-app" */ "./myapp/HumanResource/HRRegistration/ApplyHR"
  )
);

const ViewMyProfile = React.lazy(() =>
  import(/* webpackChunkName: "views-app" */ "./myapp/my-profile/MyProfile")
);

const ViewMyWallet = React.lazy(() =>
  import(/* webpackChunkName: "views-app" */ "./myapp/my-wallet/MyWallet")
);
const ViewMyListing = React.lazy(() =>
  import(/* webpackChunkName: "views-app" */ "./myapp/Listing/MyListing")
);
const ViewVideoCall = React.lazy(() =>
  import(
    /* webpackChunkName: "views-app" */ "./myapp/VideoCall/RTCVideoCall/VideoCall"
  )
);
// const ViewJobPosting = React.lazy(() =>
//   import(
//     /* webpackChunkName: "views-app" */ './myapp/Listing/JobPosting'
//   )
// );
// const ViewStayPosting = React.lazy(() =>
//   import(
//     /* webpackChunkName: "views-app" */ './myapp/Listing/StayPosting'
//   )
// );
// const ViewOtherPosting = React.lazy(() =>
//   import(
//     /* webpackChunkName: "views-app" */ './myapp/Listing/OtherPosting'
//   )
// );
// const ViewJobListing = React.lazy(() =>
//   import(
//     /* webpackChunkName: "views-app" */ './myapp/Listing/JobListing'
//   )
// );
// const ViewStayListing = React.lazy(() =>
//   import(
//     /* webpackChunkName: "views-app" */ './myapp/Listing/StayListing'
//   )
// );
// const ViewOtherListing = React.lazy(() =>
//   import(
//     /* webpackChunkName: "views-app" */ './myapp/Listing/OtherListing'
//   )
// );
// const ViewListing = React.lazy(() =>
//   import(
//     /* webpackChunkName: "views-app" */ './myapp/Listing/Listing'
//   )
// );
const ViewListingTab = React.lazy(() =>
  import(/* webpackChunkName: "views-app" */ "./myapp/Listing/Listing")
);
const ViewStayListingTab = React.lazy(() =>
  import(/* webpackChunkName: "views-app" */ "./myapp/Listing/Listing")
);
const ViewJobListingTab = React.lazy(() =>
  import(/* webpackChunkName: "views-app" */ "./myapp/Listing/Listing")
);
const ViewOtherListingTab = React.lazy(() =>
  import(/* webpackChunkName: "views-app" */ "./myapp/Listing/Listing")
);
const ViewOtherListing = React.lazy(() =>
  import(/* webpackChunkName: "views-app" */ "./myapp/Listing/ViewOtherListing")
);
const ViewJobListing = React.lazy(() =>
  import(/* webpackChunkName: "views-app" */ "./myapp/Listing/ViewJobListing")
);
const ViewStayListing = React.lazy(() =>
  import(/* webpackChunkName: "views-app" */ "./myapp/Listing/ViewStayListing")
);
// const ViewNotification = React.lazy(() =>
//   import(
//     /* webpackChunkName: "views-app" */ './myapp/notifications/DesktopNotifications'
//   )
// );
const ViewLawyer = React.lazy(() =>
  import(/* webpackChunkName: "views-app" */ "./myapp/Lawyer/LawQuestionAnswer")
);
const ViewUserCard = React.lazy(() =>
  import(/* webpackChunkName: "views-app" */ "./myapp/Lawyer/UserCard")
);
const ViewLawyerProfile = React.lazy(() =>
  import(/* webpackChunkName: "views-app" */ "./myapp/Lawyer/LawyerProfile")
);
const ViewLawyerPayment = React.lazy(() =>
  import(/* webpackChunkName: "views-app" */ "./myapp/Lawyer/PaymentWizard")
);
function getStatusRes() {
  return localStorage.getItem("status");
}
function getRoleRes() {
  return localStorage.getItem("roleRes");
}

const ViewJobDetail = React.lazy(() =>
  import(/* webpackChunkName: "views-app" */ "./myapp/Lawyer/JobDetails")
);
const ViewJobList = React.lazy(() =>
  import(/* webpackChunkName: "views-app" */ "./myapp/Lawyer/JobList")
);
const ViewLawyerJobList = React.lazy(() =>
  import(/* webpackChunkName: "views-app" */ "./myapp/Lawyer/LawyerJobList")
);
const ViewLawyerReviews = React.lazy(() =>
  import(/* webpackChunkName: "views-app" */ "./myapp/Lawyer/AddReview")
);
const ViewCallCompleted = React.lazy(() =>
  import(
    /* webpackChunkName: "views-app" */ "./myapp/VideoCall/VideoCallCompletedPage"
  )
);
const ViewClassRoom = React.lazy(() =>
  import(/* webpackChunkName: "views-app" */ "./myapp/Classroom/AgoraClass")
);
const ViewLawyerMyProfile = React.lazy(() =>
  import(/* webpackChunkName: "views-app" */ "./myapp/Lawyer/LawyerMyProfile")
);
const ViewUserMyProfile = React.lazy(() =>
  import(/* webpackChunkName: "views-app" */ "./myapp/Mentee/MenteeMyProfile")
);

const ViewUserProfile = React.lazy(() =>
  import(/* webpackChunkName: "views-app" */ "./myapp/Mentee/MenteeProfile")
);

const ViewStudentList = React.lazy(() =>
  import(/* webpackChunkName: "views-app" */ "./myapp/Mentee/StudentList")
);
const ViewStudentProfile = React.lazy(() =>
  import(
    /* webpackChunkName: "views-app" */ "./myapp/Mentee/StudentViewProfile"
  )
);

const ViewAlumniMyProfile = React.lazy(() =>
  import(/* webpackChunkName: "views-app" */ "./myapp/Alumni/AlumniMyProfile")
);
const ViewAlumniCalendar = React.lazy(() =>
  import(/* webpackChunkName: "views-app" */ "./myapp/Alumni/AlumniCalendar")
);
const ViewMyAlumniSessions = React.lazy(() =>
  import(
    /* webpackChunkName: "views-app" */ "./myapp/Alumni/AlumniSessionLists"
  )
);
const ViewUserApply = React.lazy(() =>
  import(/* webpackChunkName: "views-app" */ "./myapp/Mentee/ApplyAsUser")
);
const ViewSettings = React.lazy(() =>
  import(/* webpackChunkName: "views-app" */ "./myapp/Settings/Settings")
);

const ViewAlumniLists = React.lazy(() =>
  import(/* webpackChunkName: "views-app" */ "./myapp/Alumni/AlumniLists")
);

const ViewAlumniProfile = React.lazy(() =>
  import(/* webpackChunkName: "views-app" */ "./myapp/Alumni/AlumniProfile")
);

const ViewRealEstateAgentApply = React.lazy(() =>
  import(
    /* webpackChunkName: "views-app" */ "./myapp/RealEstateAgent/RealEstateAgentRegistration/RealEstateAgentApply"
  )
);

const App = ({ match }) => {
  const statusRes = getStatusRes();
  const roleRes = getRoleRes();
  // console.log("role res from index", roleRes)
  // const redirectTo =
  // roleRes === "USER" && `${match.url}/mentor` ||
  // roleRes === "LAWYER" && `${match.url}/profile` ||
  // roleRes.some(role => role === "MENTOR" || role === "LAWYER") && `${match.url}/mentor` ||
  //   statusRes === '0' && `${match.url}/mentor/apply` ||
  //   statusRes === '1' && `${match.url}/mentor/apply` ||
  //   statusRes === '3' && `${match.url}/mentor/apply` ||
  //   statusRes === '7' && `${match.url}/calendar/mentor/appointment` ||
  //   `${match.url}/profile`;

  let redirectTo;

  if (roleRes.includes("MENTOR")) {
    if (statusRes === "0") {
      redirectTo = `${match.url}/mentor/apply`;
    } else if (statusRes === "1") {
      redirectTo = `${match.url}/mentor/apply`;
    } else if (statusRes === "3") {
      redirectTo = `${match.url}/mentor/apply`;
    } else if (statusRes === "7") {
      redirectTo = `${match.url}/calendar/mentor/appointment`;
    } else {
      redirectTo = `${match.url}/calendar/mentor/appointment`;
    }
  } else if (roleRes.includes("USER")) {
    // redirectTo = `${match.url}/mentor/list`;
    if (statusRes === "0") {
      redirectTo = `${match.url}/student/apply`;
    } else if (statusRes === "1") {
      redirectTo = `${match.url}/student/apply`;
    } else if (statusRes === "3") {
      redirectTo = `${match.url}/student/apply`;
    } else if (statusRes === "7") {
      redirectTo = `${match.url}/dashboard`;
    } else {
      redirectTo = `${match.url}/dashboard`;
    }
  } else if (roleRes.includes("ALUMNI")) {
    if (statusRes === "0") {
      redirectTo = `${match.url}/alumni/apply`;
    } else if (statusRes === "1") {
      redirectTo = `${match.url}/alumni/apply`;
    } else if (statusRes === "3") {
      redirectTo = `${match.url}/alumni/apply`;
    } else if (statusRes === "7") {
      redirectTo = `${match.url}/jobslist`;
    } else {
      redirectTo = `${match.url}/jobslist`;
    }
  } else if (roleRes.includes("HR")) {
    if (statusRes === "0") {
      console.log("zero status");
      redirectTo = `${match.url}/hr/apply`;
    } else if (statusRes === "1") {
      redirectTo = `${match.url}/hr/apply`;
    } else if (statusRes === "3") {
      redirectTo = `${match.url}/hr/apply`;
    } else if (statusRes === "7") {
      redirectTo = `${match.url}/listing/job`;
    } else {
      redirectTo = `${match.url}/listing/job`;
    }
  } else if (roleRes.includes("REALESTATE")) {
    if (statusRes === "0") {
      console.log("zero status");
      redirectTo = `${match.url}/agent/apply`;
    } else if (statusRes === "1") {
      redirectTo = `${match.url}/agent/apply`;
    } else if (statusRes === "3") {
      redirectTo = `${match.url}/agent/apply`;
    } else if (statusRes === "7") {
      redirectTo = `${match.url}/listing/stay`;
    } else {
      redirectTo = `${match.url}/listing/stay`;
    }
  } else if (roleRes.includes("LAWYER")) {
    if (statusRes === "0") {
      redirectTo = `${match.url}/lawyer/apply`;
    } else if (statusRes === "1") {
      redirectTo = `${match.url}/lawyer/apply`;
    } else if (statusRes === "3") {
      redirectTo = `${match.url}/lawyer/apply`;
    } else if (statusRes === "7") {
      redirectTo = `${match.url}/jobslist`;
    } else {
      redirectTo = `${match.url}/jobslist`;
    }
  } else {
    redirectTo = `${match.url}/lawyer/list`;
  }

  return (
    <AppLayout>
      <div className="dashboard-wrapper">
        <Suspense fallback={<div className="loading" />}>
          <Switch>
            {/* <Redirect
              exact
              from={`${match.url}/`}
              to={`${match.url}/profile`}
            /> */}

            <Redirect exact from={`${match.url}/`} to={redirectTo} />

            <Route
              path={`${match.url}/myapp`}
              exact
              render={(props) => <ViewMyApp {...props} />}
            />
            <Route
              path={`${match.url}/myapplications`}
              exact
              render={(props) => <ViewMyApplications {...props} />}
            />
            <Route
              path={`${match.url}/dashboard`}
              exact
              render={(props) => <ViewDashBoard {...props} />}
            />
            <Route
              path={`${match.url}/mydetails`}
              exact
              render={(props) => <ViewMyDetails {...props} />}
            />
            <Route
              path={`${match.url}/mydocuments`}
              exact
              render={(props) => <ViewMyDocuments {...props} />}
            />

            <Route
              path={`${match.url}/profile`}
              render={(props) => <ProfilePage {...props} />}
            />
            <Route
              path={`${match.url}/mentor/apply`}
              render={(props) => <ViewMylogin {...props} />}
            />
            <Route
              path={`${match.url}/lawyer/apply`}
              render={(props) => <ViewLawyerlogin {...props} />}
            />
            <Route
              path={`${match.url}/alumni/apply`}
              render={(props) => <ViewAlumnilogin {...props} />}
            />
            <Route
              path={`${match.url}/mentor/list`}
              render={(props) => <MentorCard {...props} />}
            />

            {/* <Route
              path={`${match.url}/mentorship`}
              render={(props) => <Mentorship {...props} />}
            /> */}
            <Route
              path={`${match.url}/mentorprofile/:mid`}
              render={(props) => <MentorProfile {...props} />}
            />
            <Route
              path={`${match.url}/questions/:questionId`}
              render={(props) => <MentorAnswers {...props} />}
            />
            {/* <Route
              path={`${match.url}/questions/:questionId/answer/:ansid`}
              render={(props) => <MentorAnswers {...props} />}
            /> */}
            <Route
              path={`${match.url}/mentorconsult`}
              render={(props) => <MentorConsult {...props} />}
            />
            <Route
              path={`${match.url}/calendar/mentor/appointment`}
              render={(props) => <MentorCreatedSlots {...props} />}
            />
            <Route
              path={`${match.url}/sessionmentor`}
              render={(props) => <MentorListSessions {...props} />}
            />
            <Route
              path={`${match.url}/questions`}
              render={(props) => <FilterQuestions {...props} />}
            />
            <Route
              path={`${match.url}/askquestions`}
              render={(props) => <AskQuestion {...props} />}
            />
            <Route
              path={`${match.url}/myactivities`}
              render={(props) => <ViewActivities {...props} />}
            />
            {/* Chat application */}
            <Route
              path={`${match.url}/chat/:pid`}
              render={(props) => <ViewMyChat {...props} />}
            />

            {/* Calendar */}

            <Route
              path={`${match.url}/calendar`}
              render={(props) => <Month {...props} />}
            />
            <Route
              path={`${match.url}/sessionlists`}
              render={(props) => <MentorSessionList {...props} />}
            />

            {/* <Route
              path={`${match.url}/gcalendar`}
              render={(props) => <CalendarGoogle {...props} />}
            /> */}
            <Route
              path={`${match.url}/mentor/myprofile`}
              render={(props) => <ViewMyProfile {...props} />}
            />
            <Route
              path={`${match.url}/chat/:pid`}
              render={(props) => <ViewMyChat {...props} />}
            />
            <Route
              path={`${match.url}/chat`}
              render={(props) => <ViewMyChat {...props} />}
            />
            <Route
              path={`${match.url}/mywallet`}
              render={(props) => <ViewMyWallet {...props} />}
            />
            <Route
              path={`${match.url}/mylisting`}
              render={(props) => <ViewMyListing {...props} />}
            />
            <Route
              exact
              path={`${match.url}/listing`}
              render={(props) => <ViewListingTab {...props} />}
            />
            <Route
              exact
              path={`${match.url}/listing/others`}
              render={(props) => <ViewStayListingTab {...props} />}
            />
            <Route
              exact
              path={`${match.url}/listing/job`}
              render={(props) => <ViewJobListingTab {...props} />}
            />
            <Route
              exact
              path={`${match.url}/listing/stay`}
              render={(props) => <ViewOtherListingTab {...props} />}
            />
            <Route
              path={`${match.url}/listing/others/view/:id`}
              render={(props) => <ViewOtherListing {...props} />}
            />

            <Route
              path={`${match.url}/listing/job/view/:id`}
              render={(props) => <ViewJobListing {...props} />}
            />
            <Route
              path={`${match.url}/listing/stay/view/:id`}
              render={(props) => <ViewStayListing {...props} />}
            />
            <Route
              path={`${match.url}/videocall/:userId/:id`}
              render={(props) => <ViewVideoCall {...props} />}
            />
            {/* <Route
              path={`${match.url}/jobposting`}
              render={(props) => <ViewJobPosting {...props} />}
            />
               <Route
              path={`${match.url}/stayposting`}
              render={(props) => <ViewStayPosting {...props} />}
            />
               <Route
              path={`${match.url}/otherposting`}
              render={(props) => <ViewOtherPosting {...props} />}
            />
               <Route
              path={`${match.url}/job/listing`}
              render={(props) => <ViewJobListing {...props} />}
            />
               <Route
              path={`${match.url}/stay/listing`}
              render={(props) => <ViewStayListing {...props} />}
            />
               <Route
              path={`${match.url}/other/listing`}
              render={(props) => <ViewOtherListing {...props} />}
            /> */}
            {/* <Route
              path={`${match.url}/listing`}
              render={(props) => <ViewListing {...props} />}
            /> */}

            <Route
              path={`${match.url}/lawyerquestions`}
              render={(props) => <ViewLawyer {...props} />}
            />
            {/* <Route
              path={`${match.url}/usercard`}
              render={(props) => <ViewUserCard {...props} />}
            /> */}
            <Route
              path={`${match.url}/lawyer/list`}
              render={(props) => <ViewUserCard {...props} />}
            />
            <Route
              path={`${match.url}/jobsdetails/:jid`}
              render={(props) => <ViewJobDetail {...props} />}
            />
            <Route
              path={`${match.url}/jobslist`}
              render={(props) => <ViewLawyerJobList {...props} />}
            />
            <Route
              path={`${match.url}/lawyerjobslist`}
              render={(props) => <ViewJobList {...props} />}
            />
            <Route
              path={`${match.url}/lawyerprofile/:pid`}
              render={(props) => <ViewLawyerProfile {...props} />}
            />
            <Route
              path={`${match.url}/lawyer/payment`}
              render={(props) => <ViewLawyerPayment {...props} />}
            />
            <Route
              path={`${match.url}/callcompleted/:id/:sid`}
              render={(props) => <ViewCallCompleted {...props} />}
            />
            <Route
              path={`${match.url}/classroom`}
              render={(props) => <ViewClassRoom {...props} />}
            />
            <Route
              path={`${match.url}/lawyer/myprofile`}
              render={(props) => <ViewLawyerMyProfile {...props} />}
            />
            <Route
              path={`${match.url}/lawyer/reviews`}
              render={(props) => <ViewLawyerReviews {...props} />}
            />
            <Route
              path={`${match.url}/student/myprofile`}
              render={(props) => <ViewUserMyProfile {...props} />}
            />
            <Route
              path={`${match.url}/student/profile/:uid`}
              render={(props) => <ViewUserMyProfile {...props} />}
            />
            <Route
              path={`${match.url}/student/apply`}
              render={(props) => <ViewUserApply {...props} />}
            />
            <Route
              path={`${match.url}/student/list`}
              render={(props) => <ViewStudentList {...props} />}
            />
            <Route
              path={`${match.url}/studentprofile/:sid`}
              render={(props) => <ViewStudentProfile {...props} />}
            />

            <Route
              path={`${match.url}/settings`}
              render={(props) => <ViewSettings {...props} />}
            />
            <Route
              path={`${match.url}/student/:uid`}
              render={(props) => <ViewUserProfile {...props} />}
            />

            {/* alumnini networking routes start */}

            <Route
              path={`${match.url}/alumni/alumnilists`}
              render={(props) => <ViewAlumniLists {...props} />}
            />
            <Route
              path={`${match.url}/alumni/profile/:mid`}
              render={(props) => <ViewAlumniProfile {...props} />}
            />
            <Route
              path={`${match.url}/alumni/myprofile`}
              render={(props) => <ViewAlumniMyProfile {...props} />}
            />
            <Route
              path={`${match.url}/calendar/alumni/appointment`}
              render={(props) => <ViewAlumniCalendar {...props} />}
            />
            <Route
              path={`${match.url}/alumni/sessionlists`}
              render={(props) => <ViewMyAlumniSessions {...props} />}
            />

            {/* alumin networking routes ends */}

            {/* HR routes starts */}
            <Route
              path={`${match.url}/hr/apply`}
              render={(props) => <ViewHrlogin {...props} />}
            />

            {/* HR routes sends */}

            {/* real estate agent routes starts */}
            <Route
              path={`${match.url}/agent/apply`}
              render={(props) => <ViewRealEstateAgentApply {...props} />}
            />
            {/* real estate agent routes ends */}

            {/* <Route
              path={`${match.url}/jobs`}
              render={(props) => <JobPage {...props} />}
            />
            <Route
              path={`${match.url}/create-jobs`}
              render={(props) => <CreateJobPage {...props} />}
            />
            <Route
              path={`${match.url}/edit-jobs/:id`}
              render={(props) => <EditJobPage {...props} />}
            /> */}
            <Redirect to="/error" />
          </Switch>
        </Suspense>
      </div>
    </AppLayout>
  );
};

const mapStateToProps = ({ menu }) => {
  const { containerClassnames } = menu;
  return { containerClassnames };
};

export default withRouter(connect(mapStateToProps, {})(App));
