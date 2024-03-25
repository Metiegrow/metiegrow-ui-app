import axios from 'axios';
import { Colxx } from 'components/common/CustomBootstrap';
import { baseUrl } from 'constants/defaultValues';
import React, { useEffect, useState } from 'react';
import { Badge, Button, Card, CardBody,  Label, NavLink, Row } from 'reactstrap';
import { useLocation } from 'react-router-dom';



const MentorSessionList = () => {
  // const { sessions } = location.state || {}; // Retrieve sessions from location state
const [session,setSession]=useState('');
const [upcomingsession,setUpcomingSession]=useState('');
const [showSuccessCard, setShowSuccessCard] = useState(false);
const location = useLocation();
// const url=`${baseUrl}/mentor/session`;
const url1=`${baseUrl}/sessionUpcomingHistroy`;
useEffect(()=>{
  // const SessionHistroy=async()=>{
  //     try {
  //         const response = await axios.get(url);
  //         setSession(response.data);
  //       } catch (error) {
  //         console.error('Error fetching data:', error);
  //       }
  // }
  // SessionHistroy();
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
        {/* <Card className='my-2' >
          <CardBody className='text-center'>
          <span className='text-xlarge text-primary'><i className='simple-icon-check'/></span>
           <h3 className='text-center'>You have successfully scheduled appointment with mentorName</h3>
          </CardBody>
        </Card> */}
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
       <div  className=''>
       {upcomingsession.upcomingSessions&&upcomingsession.upcomingSessions.map((up)=>{
        const date=new Date(up.fromtimestamp);
            const fromtime = new Date(up.fromtimestamp);
            const totime=new Date(up.totimestamp);
            const updateformat = `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`;
            const timeOptions = { hour: '2-digit', minute: '2-digit' };
          
          return (
            <div key={up.mentorId}>
            <Card className='my-4'>
        <Badge
                  color="primary"
                  pill
                  className="position-absolute badge-top-right"
                >
                  NEW
                </Badge>
          {/* <CardBody>
          <NavLink href={`/app/mentorprofile/${up.mentorId}`}>
          <h2 className='text-primary text-large'>{up.name}</h2>
          <Label className='text-primary text-large'>{up.name}</Label>
          </NavLink>
           
            <h4>Date:{updateformat}</h4>
            <h4>Time:{ fromtime.toLocaleTimeString([], timeOptions)}</h4>
            <h4>Mode:{up.mode}</h4>
            
            <Label className='text-one'>Date</Label>
               <h4>{updateformat}</h4>
            <Label className='text-one'>Time</Label>
            <h4>{ fromtime.toLocaleTimeString([], timeOptions)}</h4>
            <h4>to</h4>
            <h4>{ totime.toLocaleTimeString([], timeOptions)}</h4>
            <Label className='text-one'>Mode</Label>
            <h4>{up.mode}</h4>
          </CardBody> */}
          <CardBody className='d-flex justify-content-between' >
                <div className='d-flex justify-content-between flex-column'>
                <NavLink href={`/app/mentorprofile/${up.mentorId}`}>
                <h4 className='text-large text-primary'>{up.name}</h4>
                </NavLink>
                <div className='d-flex'>
                <Label className='text-one '>Date:</Label>
                 <h4 className='ml-2  font-weight-bold'>{updateformat}</h4>
                  </div>
              
                </div>
                <div className='d-flex justify-content-around flex-column '>
                  {/* <h4 className=''>Duration: {up.duration}</h4> */}
                  <div className='d-flex justify-content-between'>
                  <h4 className='mr-2'>From:</h4>
                  <h4 className='mr-2 font-weight-bold'> {fromtime.toLocaleTimeString([], timeOptions)}</h4>
                  <h4>to</h4>
                  <h4 className=' font-weight-bold mx-2'>  {totime.toLocaleTimeString([],timeOptions)}</h4>
                  </div>
                  <div className='d-flex'>
                  <Label className='text-one mr-2 '>Mode:</Label>
                  <h4 className='font-weight-bold'>{up.mode}</h4>
                  </div>
                 <Button outline color='primary' className='mt-2 text-one'>Join Call</Button>
                 
                </div>
              </CardBody>
        </Card>
            </div>
          )
        })}
       </div>
        {/* <Card className='my-2'>
        <Badge
                  color="primary"
                  pill
                  className="position-absolute badge-top-right"
                >
                  NEW
                </Badge>
          <CardBody>
            <h4>Mentor Name:</h4>
            <h4>Date:</h4>
            <h4>Time:</h4>
            <h4>Mode:</h4>
          </CardBody>
        </Card> */}
        </div>
        </div>
        <div className='my-3 mt-4'>
          <h2 className='font-weight-medium'>Session history</h2>
          <div>
           {session.history&&session.history.map((sh)=>{
            const date=new Date(sh.fromtimestamp);
            const fromtime = new Date(sh.fromtimestamp);
            const totime=new Date(sh.totimestamp);
            const timeOptions = { hour: '2-digit', minute: '2-digit' };
            const shdateformat = `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`;
            return(
              
              <Card className='my-2 ' key={sh.mentorId}>
              <CardBody className='d-flex justify-content-between' >
                <div className='d-flex justify-content-between flex-column'>
                <NavLink href={`/app/mentorprofile/${sh.mentorId}`}>
                <h4 className='text-large text-primary'>{sh.name}</h4>
                </NavLink>
                 
                  {/* <h4>Date: {shdateformat}</h4> */}
                  <div className='d-flex'>
                  <Label className='text-one'>Date:</Label>
                  <h4 className='ml-2 font-weight-bold'>{shdateformat}</h4>
                  </div>
                 
                </div>
                <div className='d-flex justify-content-around flex-column '>
                <div className='d-flex'>
                  <Label className='text-one mr-2'>Duration:</Label>
                  <h4 className='font-weight-bold'>{sh.duration}</h4>
                </div>
                  {/* <h4 className=''>Duration: {sh.duration}</h4> */}
                  <div className='d-flex justify-content-between'>
                  <div className='d-flex'>
                  <h4 className=' mr-2'>From:</h4>
                  <h4 className='font-weight-bold'>{fromtime.toLocaleTimeString([], timeOptions)}</h4>
                  <h4 className='mx-2'>to</h4>
                  <h4 className='font-weight-bold'>{totime.toLocaleTimeString([],timeOptions)}</h4>
                </div>
                  {/* <h4 className='mr-2'>From  </h4>
                  <h4 className=''>to  {totime.toLocaleTimeString([],timeOptions)}</h4> */}
                  </div>
                  <div className='d-flex'>
                  <Label className='mr-2 text-one'>Mode:</Label>
                  <h4 className='font-weight-bold '>{sh.mode}</h4>
                  </div>
                  
                  {/* <h4 className=''>Mode: {sh.mode}</h4> */}
                </div>
              </CardBody>
            </Card>
            )
           })}
           
          </div>
         
        </div>
        
       </Colxx>
    </Row>
       
    </div>
  );
}

export default MentorSessionList;