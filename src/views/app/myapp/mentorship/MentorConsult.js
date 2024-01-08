import { Colxx } from 'components/common/CustomBootstrap';
import React,{useState} from 'react';
import {Button, Card, CardBody } from 'reactstrap';

const MentorConsult = () => {
    const [inputkey,setInputKey]=useState('')
    const [inputkey1,setInputKey1]=useState('')
  return (
    <div>
        <Colxx  sm="12" md="12" lg="8" xxs="12" className='mx-auto '>
         <Card>
            <CardBody>
             <h1 className='font-weight-semibold'>Chat with the mentor</h1>
             <Card className='my-3 w-50'>
                <CardBody>
                    <h3>Mentor Name</h3>
                    <h4>Mentor qualification</h4>
                    <h4>Mentor role</h4>
                    <h4>Mentor experience</h4>
                </CardBody>
             </Card>
             <div>
             <h3>Student Name</h3>
             <div className='input-group my-3'>
       <input
            type="text"
            className="form-control  py-3"
            placeholder ='Enter student name'
            value={inputkey}
            onChange={(e) =>setInputKey(e.target.value)}
          />
         
       </div>
       <h3>Mobile Number</h3>
             <div className='input-group my-3'>
       <input
            type="text"
            className="form-control   py-3"
            placeholder ='Enter mobile number'
            value={inputkey1}
            onChange={(e) =>setInputKey1(e.target.value)}
          />
         
       </div>
       <p className='text-muted'>A verification code will be sent to this number</p>
             </div>
             <Button color="primary" outline size='lg' className=" default">
              Continue
              </Button>
            </CardBody>
         </Card>
        </Colxx>
    </div>
  );
}

export default MentorConsult;
