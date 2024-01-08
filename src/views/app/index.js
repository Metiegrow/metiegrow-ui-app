import React, { Suspense } from 'react';
import { Route, withRouter, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import AppLayout from 'layout/AppLayout';
// import MentorCard from './myapp/mentorship/mentorcard';

// import MyApplications from './myapp/my-applications/my-applications';
// import MyDetails from './myapp/my-details/my-details';
// import MyDocuments from './myapp/my-documents/my-documents';

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
const Mentorship = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './myapp/mentorship')
);
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

// const CreateJobPage = React.lazy(() =>
//   import(/* webpackChunkName: "viwes-blank-page" */ './create-jobs')
// );
// const EditJobPage = React.lazy(() =>
//   import(/* webpackChunkName: "viwes-blank-page" */ './edit-jobs')
// );
//

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
              path={`${match.url}/mentor`}
              render={(props) => <MentorCard {...props} />}
            />
             <Route
              path={`${match.url}/mentorship`}
              render={(props) => <Mentorship {...props} />}
            />
             <Route
              path={`${match.url}/mentorprofile`}
              render={(props) => <MentorProfile {...props} />}
            />
              <Route
              path={`${match.url}/mentoranswers`}
              render={(props) => <MentorAnswers {...props} />}
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
