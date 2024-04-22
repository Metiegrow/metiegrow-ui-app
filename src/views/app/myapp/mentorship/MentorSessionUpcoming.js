import axios from 'axios';
import { Colxx } from 'components/common/CustomBootstrap';
import { baseUrl } from 'constants/defaultValues';
import React, { useEffect, useState } from 'react';
import { Badge, Button, Card, CardBody,  Label,  Row } from 'reactstrap';
import { useLocation, useHistory } from 'react-router-dom';






const MentorSessionUpcoming = () => {
  // const { sessions } = location.state || {}; // Retrieve sessions from location state
const [session,setSession]=useState('');
const [upcomingsession,setUpcomingSession]=useState('');
const [showSuccessCard, setShowSuccessCard] = useState(false);
const location = useLocation();

// const url1=`${baseUrl}/mentorSessionUpcomingHistory`;


// if you want to change the url to backend uncomment the below line
const url1=`${baseUrl}/api/calendar/mentor/upcoming-bookedslots-session-history`;



//  const deployType = 'dev'; // 'dev' or 'production'

// const urls = {
//     dev: {
//         "baseUrl":'localhost:3001',
//         "mentorApp": "mentorSessionUpcomingHistory"
        
//     },
//     production: {
//         "baseUrl": "localhost:9091",
//         "mentorApp": "/api/calendar/mentor/upcoming-bookedslots-session-history"

//     }
// };

// const { baseUrl, mentorApp } = urls[deployType];
// const getURL = (urlSlug) => {
//   return urls[deployType][urlSlug]

// };
// const urlnew=`${baseUrl}` / getURL("mentorApp");
const history = useHistory();

const handleJoinCall = (id) => {
  const fullUrl = `/app/videocall/${id}`;
  history.push(fullUrl);
};
useEffect(()=>{
//   console.log("Deploy Type:", deployType);
// console.log("Base URL:", urls[deployType].baseUrl);
// console.log("Mentor App URL:", urls[deployType].mentorApp);


  const SessionHistroy=async()=>{
    try {
        const response = await axios.get(url1);
        setSession(response.data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
}
SessionHistroy();
  const SessionUpcomingHistroy=async()=>{
    try {
        const response = await axios.get(url1) || [];
        setUpcomingSession(response.data.data);
        const queryParams = new URLSearchParams(location.search);
        const appointment = queryParams.get('appointment');
        setShowSuccessCard(appointment === 'true');
        console.log("Upcoming Session Data:", response);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
}
SessionUpcomingHistroy();
},[])

  return (
    <div>
   
  
    <Row>
    <Colxx  sm="12" md="12" lg="8" xxs="12" className='mx-auto '>
      
        {showSuccessCard && (
            <Card className='my-2'>
              <CardBody className='text-center'>
                <span className='text-xlarge text-primary'><i className='simple-icon-check'/></span>
                <h3 className='text-center'>You have successfully scheduled appointment with mentorName</h3>
              </CardBody>
            </Card>
          )}
        <div className='my-3'>
        
        <h2 className='font-weight-medium'>Upcoming sessions</h2>
       
        <div>
      
       <div className=''>
  {upcomingsession.upcomingSessions && upcomingsession.upcomingSessions.length > 0 ? (
    upcomingsession.upcomingSessions.map((up) => {
      const date = new Date(up.fromTimeStamp);
      const fromtime = new Date(up.fromTimeStamp);
      const totime = new Date(up.toTimeStamp);
      const updateformat = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
      const timeOptions = { hour: '2-digit', minute: '2-digit' };

      return (
        <div key={up.menteeId}>
          <Card className='my-4'>
            <Badge color="primary" pill className="position-absolute badge-top-right">
              NEW
            </Badge>

            <CardBody className='d-flex justify-content-between'>
              <div className='d-flex justify-content-between flex-column'>
                {/* <NavLink href={`/app/mentorprofile/${up.mentorId}`}>
                  <h4 className='text-large text-primary'>{up.name}</h4>
                </NavLink> */}
                <h4 className='text-large text-primary'>{up.name}</h4>
                <div className='d-flex'>
                  <Label className='text-one'>Date:</Label>
                  <h4 className='ml-2 font-weight-bold'>{updateformat}</h4>
                </div>
              </div>
              <div className='d-flex justify-content-around flex-column '>
                <div className='d-flex justify-content-between'>
                  <h4 className='mr-2'>From:</h4>
                  <h4 className='mr-2 font-weight-bold'>{fromtime.toLocaleTimeString([], timeOptions)}</h4>
                  <h4>to</h4>
                  <h4 className='font-weight-bold mx-2'>{totime.toLocaleTimeString([], timeOptions)}</h4>
                </div>
                <div className='d-flex'>
                  <Label className='text-one mr-2'>Mode:</Label>
                  <h4 className='font-weight-bold'>{up.mode}</h4>
                </div>
                <Button outline color='primary' className='mt-2 text-one' onClick={() => handleJoinCall(up.id)}>Join Call</Button> 
              </div>
            </CardBody>
          </Card>
        </div>
      );
    })
  ) : (
    <p>No upcoming sessions</p>
  )}
</div>
       
        </div>
        </div>
        <div className='my-3 mt-4'>
          <h2 className='font-weight-medium'>Session history</h2>
        
          <div>
  {session.history && session.history.length > 0 ? (
    session.history.map((sh) => {
      const date = new Date(sh.fromTimeStamp);
      const fromtime = new Date(sh.fromTimeStamp);
      const totime = new Date(sh.toTimeStamp);
      const timeOptions = { hour: '2-digit', minute: '2-digit' };
      const shdateformat = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;

      return (
        <Card className='my-2' key={sh.menteeId}>
          <CardBody className='d-flex justify-content-between'>
            <div className='d-flex justify-content-between flex-column'>
              {/* <NavLink href={`/app/mentorprofile/${sh.mentorId}`}>
                <h4 className='text-large text-primary'>{sh.name}</h4>
              </NavLink> */}
              <h4 className='text-large text-primary'>{sh.name}</h4>
              <div className='d-flex'>
                <Label className='text-one'>Date:</Label>
                <h4 className='ml-2 font-weight-bold'>{shdateformat}</h4>
              </div>
            </div>

            <div className='d-flex justify-content-around flex-column '>
              <div className='d-flex'>
                <Label className='text-one mr-2'>Duration:</Label>
                <h4 className='font-weight-bold'>{sh.duration/60000} minutes</h4>
              </div>

              <div className='d-flex justify-content-between'>
                <div className='d-flex'>
                  <h4 className=' mr-2'>From:</h4>
                  <h4 className='font-weight-bold'>{fromtime.toLocaleTimeString([], timeOptions)}</h4>
                  <h4 className='mx-2'>to</h4>
                  <h4 className='font-weight-bold'>{totime.toLocaleTimeString([], timeOptions)}</h4>
                </div>
              </div>

              <div className='d-flex'>
                <Label className='mr-2 text-one'>Mode:</Label>
                <h4 className='font-weight-bold '>{sh.mode}</h4>
              </div>
            </div>
          </CardBody>
        </Card>
      );
    })
  ) : (
    <p>No session history</p>
  )}
</div>

        </div>
   
        
       </Colxx>
    </Row>
       
    </div>
  );
}

export default MentorSessionUpcoming;