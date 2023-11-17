import React from 'react'; //  ,{ useRef }

import { Row } from 'reactstrap';
import AllUserApplications from './show-allUser-application';
import SelectCollegeModal from './select-college-modal';
import applicationInformationData from './applications-data';

const payload = applicationInformationData;

const MyApplications = () => {
  const selectedApp = 10;
  const selectedElement = document.getElementById(`10`);
  // setTimeout(() => {
  //   document.getElementById(10).scrollIntoView();
  // }, 3000);
  // const myRef = useRef(selectedApp);
  // console.log(myRef);
  // const executeScroll = () => myRef.current.scrollIntoView();
  // executeScroll();
  if (selectedElement) {
    selectedElement.scrollIntoView();
  }
  return (
    <div>
      <Row className=" ml-3 mr-3 mb-3 justify-content-between">
        <h1>MyApplications</h1>
        <SelectCollegeModal />
      </Row>
      {payload.map((item) => {
        return (
          <div id="10" key={item.id}>
            <AllUserApplications
              expand={selectedApp === item.id}
              currentItem={item}
            />
          </div>
        );
      })}
      {/* <AllUserApplications /> */}
    </div>
  );
};

export default MyApplications;
