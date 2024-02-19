import { Colxx } from 'components/common/CustomBootstrap';
import React from 'react';
import { Badge, Card, CardBody, Row } from 'reactstrap';


const MentorSessionList = () => {
  return (
    <div>
   
  
    <Row>
    <Colxx  sm="12" md="12" lg="10" xxs="12" className='mx-auto '>
        <Card className='my-2'>
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
            <Card className='my-2 '>
              <CardBody className='d-flex justify-content-between'>
                <div className='d-flex justify-content-between flex-column'>
                  <h4>Mentor Name</h4>
                  <h4>Date</h4>
                </div>
                <div className='d-flex justify-content-around flex-column '>
                  <h4 className=''>Duration</h4>
                  <h4 className=''>Time</h4>
                  <h4 className=''>Mode</h4>
                </div>
              </CardBody>
            </Card>
          </div>
        </div>
        
       </Colxx>
    </Row>
       
    </div>
  );
}

export default MentorSessionList;
