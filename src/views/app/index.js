import React, { Suspense } from 'react';
import { Route, withRouter, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import AppLayout from 'layout/AppLayout';


// import MyApplications from './myapp/my-applications/my-applications';
// import MyDetails from './myapp/my-details/my-details';
// import MyDocuments from './myapp/my-documents/my-documents';
// import { MyProfile } from './myapp/my-profile/MyProfile';

const ViewMyApp = React.lazy(() =>
  import(/* webpackChunkName: "views-app" */ './myapp')
);
const ViewMyApplications = React.lazy(() =>
  import(
    /* webpackChunkName: "views-app" */ './myapp/my-applications/my-applications'
  )
);
const ViewMyDetails = React.lazy(() =>
  import(/* webpackChunkName: "views-app" */ './myapp/my-details/my-details')
);
const ViewMyDocuments = React.lazy(() =>
  import(
    /* webpackChunkName: "views-app" */ './myapp/my-documents/my-documents'
  )
);

// const JobPage = React.lazy(() =>
//   import(/* webpackChunkName: "viwes-blank-page" */ './jobs')
// );
const ProfilePage = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './profiles')
);
// const Mentorship = React.lazy(() =>
//   import(/* webpackChunkName: "viwes-blank-page" */ './myapp/mentorship')
// );
// Mentorship Cards
const MentorCard = React.lazy(() =>
  import(
    /* webpackChunkName: "views-app" */ './myapp/mentorship/mentorcard'
  )
);
// Mentors profile page
const MentorProfile = React.lazy(() =>
  import(
    /* webpackChunkName: "views-app" */ './myapp/mentorship/MentorProfile'
  )
);
const MentorAnswers = React.lazy(() =>
  import(
    /* webpackChunkName: "views-app" */ './myapp/mentorship/MentorAnswers'
  )
);
const MentorConsult = React.lazy(() =>
  import(
    /* webpackChunkName: "views-app" */ './myapp/mentorship/MentorConsult'
  )
);
const FilterQuestions = React.lazy(() =>
  import(
    /* webpackChunkName: "views-app" */ './myapp/mentorship/FilterQuestions'
  )
);
const ViewMyChat = React.lazy(() =>
  import(
    /* webpackChunkName: "views-app" */ './myapp/Chat/Chat'
  )
);

const AskQuestion = React.lazy(() =>
  import(
    /* webpackChunkName: "views-app" */ './myapp/mentorship/AskQuestion'
  )
);
const ViewActivities=React.lazy(()=>
import(
  /* webpackChunkName: "views-app" */ './myapp/mentorship/myQandA'
))

const Month = React.lazy(() =>
  import(
    /* webpackChunkName: "views-app" */ './myapp/BigCalendar/Month'
  )
);
const MentorSessionList = React.lazy(() =>
  import(
    /* webpackChunkName: "views-app" */ './myapp/BigCalendar/MentorSessionList'
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
  import(
    /* webpackChunkName: "views-app" */ './myapp/my-login/Mylogin'
  )
);
const ViewMyProfile = React.lazy(() =>
  import(
    /* webpackChunkName: "views-app" */ './myapp/my-profile/MyProfile'
  )
);

const ViewMyWallet = React.lazy(() =>
  import(
    /* webpackChunkName: "views-app" */ './myapp/my-wallet/MyWallet'
  )
);
// const ViewVideoCall = React.lazy(() =>
//   import(
//     /* webpackChunkName: "views-app" */ './myapp/VideoCall/VideoCall'
//   )
// );
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
const ViewListing = React.lazy(() =>
  import(
    /* webpackChunkName: "views-app" */ './myapp/Listing/Listing'
  )
);
const ViewLawyer=React.lazy(()=>
import(
  /* webpackChunkName: "views-app" */ './myapp/Lawyer/LawQuestionAnswer'
))
const ViewUserCard=React.lazy(()=>
import(
  /* webpackChunkName: "views-app" */ './myapp/Lawyer/UserCard'
))

const App = ({ match }) => {
  return (
    <AppLayout>
      <div className="dashboard-wrapper">
        <Suspense fallback={<div className="loading" />}>
          <Switch>
            <Redirect
              exact
              from={`${match.url}/`}
              to={`${match.url}/profile`}
            />
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
              path={`${match.url}/mentor`}
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
              path={`${match.url}/chat`}
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
              path={`${match.url}/myprofile`}
              render={(props) => <ViewMyProfile {...props} />}
            />
               <Route
              path={`${match.url}/chat`}
              render={(props) => <ViewMyChat {...props} />}
            />
               <Route
              path={`${match.url}/mywallet`}
              render={(props) => <ViewMyWallet {...props} />}
            />
               {/* <Route
              path={`${match.url}/videocall`}
              render={(props) => <ViewVideoCall {...props} />}
            /> */}
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
               <Route
              path={`${match.url}/listing`}
              render={(props) => <ViewListing {...props} />}
            />
           
           <Route
              path={`${match.url}/lawyer`}
              render={(props) => <ViewLawyer {...props} />}
            />
            <Route
              path={`${match.url}/usercard`}
              render={(props) => <ViewUserCard {...props} />}
            />
            
          
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
