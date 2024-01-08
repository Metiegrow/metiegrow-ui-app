import React from 'react';

import ShowNotifications from './notifications/show-notifications';
import MyApplications from './my-applications/my-applications';
import MyDocuments from './my-documents/my-documents';
import MyDetails from './my-details/my-details';

const MyApp = () => {
  return (
    <div>
      <ShowNotifications />
      <hr />
      <hr />
      <MyApplications />
      <hr />
      <hr />
      <MyDetails />
      <hr />
      <hr />
      <MyDocuments />
      
    </div>
  );
};

export default MyApp;
