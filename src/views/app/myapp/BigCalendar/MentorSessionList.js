import axios from 'axios';
import { Colxx } from 'components/common/CustomBootstrap';
import { baseUrl } from 'constants/defaultValues';
import React, { useEffect, useState } from 'react';
import { Badge, Card, CardBody, NavLink, Row } from 'reactstrap';


const MentorSessionList = () => {
  // const { sessions } = location.state || {}; // Retrieve sessions from location state
const [session,setSession]=useState('');
const url=`${baseUrl}/mentor/session`;
useEffect(()=>{
  const SessionHistroy=async()=>{
      try {
          const response = await axios.get(url);
          setSession(response.data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
  }
  SessionHistroy();
},[])

  return (
    <div>
   
  
    <Row>
    <Colxx  sm="12" md="12" lg="10" xxs="12" className='mx-auto '>
        <Card className='my-2' >
          <CardBody className='text-center'>
          <span className='text-xlarge text-primary'><i className='simple-icon-check'/></span>
           <h3 className='text-center'>You have successfully scheduled appointment with mentorName</h3>
          </CardBody>
        </Card>
        <div className='my-3'>
        
        <h2>Upcoming sessions</h2>
       
        <div>
        <Card className='my-2'>
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
        </Card>
        </div>
        </div>
        <div className='my-3'>
          <h2>Session history</h2>
          <div>
           {session&&session.map((sh)=>{
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
                 
                  <h4>Date: {shdateformat}</h4>
                </div>
                <div className='d-flex justify-content-around flex-column '>
                  <h4 className=''>Duration: {sh.duration}</h4>
                  <div className='d-flex justify-content-between'>
                  <h4 className='mr-2'>From  {fromtime.toLocaleTimeString([], timeOptions)}</h4>
                  <h4 className=''>to  {totime.toLocaleTimeString([],timeOptions)}</h4>
                  </div>
                 
                  <h4 className=''>Mode: {sh.mode}</h4>
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