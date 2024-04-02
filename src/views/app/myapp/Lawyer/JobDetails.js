import { Colxx } from 'components/common/CustomBootstrap';
import DropzoneExample from 'containers/forms/DropzoneExample';
import React, { useState } from 'react';
import { Card,CardBody, Col,  Form, FormGroup, Label, Row } from 'reactstrap';
import Select from 'react-select';
import CustomSelectInput from 'components/common/CustomSelectInput';

const selectData = [
  { label: 'Yet to start', value: 'yet to start', key: 0 },
  { label: 'In progress', value: 'Inprogress', key: 1 },
  { label: 'Completed', value: 'completed', key: 2 },
];

const JobDetails = () => {
  const [selectedOption, setSelectedOption] = useState('');
  return (
    <div>
      <h1>Job Name</h1>
      <Row>
      <Colxx lg={4}>
      <Card>
        <CardBody>
        <div className='d-flex align-items-center'>
          <div> 
          <h1>1</h1>
          </div>
          <div className='ml-3'>
          <h3>Name</h3>
            <h6>Description</h6>
            <h6>Done by <strong>Lawyer</strong></h6>
          </div>
        </div>
        
    
        </CardBody>
      </Card>
      </Colxx>
      <Colxx>
      <Card>
      <CardBody>
   
      <Form>
      <h2 className='text-primary text-center'>Step 1</h2>
       <FormGroup >

       <Col sm={2}>
       <Label className='text-one'>Name</Label>
       </Col>
        <Col>
        <h3>Appointment</h3>
        </Col>
        
       </FormGroup>
       <FormGroup >
       <Col sm={2}>
       <Label className='text-one'>Description</Label>
       </Col>
        <Col>
        <h3>Description details Lorem ipsum dolor sit 
         amet consectetur adipisicing elit. Reiciendis, at!</h3>
        </Col>
        
       </FormGroup>
       <FormGroup >
       <Col sm={2}>
       <Label className='text-one'>Done by</Label>
       </Col>
        <Col>
        <h3>Lawyer/User</h3>
        </Col>
        
       </FormGroup>
       <FormGroup >
       <Col sm={2}>
       <Label className='text-one'>Documents</Label>
       </Col>
        <Col>
        <DropzoneExample/>
        <div className='mt-4'>
          {/* <CustomInput
            type="radio"
            id="exCustomRadio"
            name="customRadio"
            label="PAN Card"
          />
          <CustomInput
            type="radio"
            id="exCustomRadio2"
            name="customRadio"
            label="Appointment"
          /> */}
           <h5>PAN Card<span className='ml-2 text-primary '><i className='iconsminds-download-1 font-weight-bold'/></span></h5>
           <h5>Appointment<span className='ml-2 text-primary '><i className='iconsminds-download-1 font-weight-bold'/></span></h5>
        </div>
        </Col>
        
       </FormGroup>
      <FormGroup>
        <Col sm={2}>
          <Label>
            Status
          </Label>
        </Col>
        <Col>
        <Select
          components={{ Input: CustomSelectInput }}
          className="react-select"
          classNamePrefix="react-select"
          name="form-field-name"
          value={selectedOption}
          onChange={setSelectedOption}
          options={selectData}
        />
        </Col>
      </FormGroup>
 
       </Form>
      </CardBody>
      
      </Card>
       
      </Colxx>
      </Row>

      
    </div>
  );
}

export default JobDetails;
