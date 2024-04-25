import { Colxx } from 'components/common/CustomBootstrap';
import DropzoneExample from 'containers/forms/DropzoneExample';
import React, { useEffect, useState } from 'react';
import { baseUrl } from 'constants/defaultValues';
import { Card,CardBody, Col,  Form, FormGroup, Label, Row } from 'reactstrap';
import Select from 'react-select';
import CustomSelectInput from 'components/common/CustomSelectInput';
import axios from 'axios';
import {useParams} from "react-router-dom";

const selectData = [
  { label: 'Yet to start', value: 'yet to start', key: 0 },
  { label: 'In progress', value: 'Inprogress', key: 1 },
  { label: 'Completed', value: 'completed', key: 2 },
];

const JobDetails = () => {
  const [selectedOption, setSelectedOption] = useState('');
  const [selectedStep, setSelectedStep] = useState(null);
  const [jobdetails,setJobDetails]=useState('');
  const {jid}=useParams();
  const url=`${baseUrl}/lawyerJobsDetails/${jid}`;


  // Backedn url 
  // const url=`${baseUrl}/api/lawyer/job/{jid}`


    useEffect(()=>{
        const LawyerJobsDetails=async()=>{
            try {
                const response = await axios.get(url);
                setJobDetails(response.data);
                console.log("checking response",response.data);

           // Set the selected step to the first step in the jobdetails array
        if (response.data.steps && response.data.steps.length > 0) {
          setSelectedStep(response.data.steps[0]);
        }
                
              } catch (error) {
                console.error('Error fetching data:', error);
              }
        }
        LawyerJobsDetails();
       
    
    },[url])

    const handleStepClick = (step) => {
      setSelectedStep(step);
    };
   
    
 

  return (
    <div>
        <h1 className='font-weight-semibold text-large'>{jobdetails.jobName}</h1>

      <Row>
      <Colxx lg={4}>
      {jobdetails.steps&&jobdetails.steps.map((s)=>{
            return(
              <div key={s.id}>
           
           
      <Card className='mb-2'
      onClick={() => handleStepClick(s)}
        style={{ border: selectedStep === s ? `3px solid var(--theme-color-1)` : 'none' ,cursor:'pointer'}}
      >
        <CardBody className=''>
        <div className='d-flex align-items-center'>
          <div> 

   
          <h1>{s.stepNumber}</h1>
          
         
          </div>
          <div className='d-flex justify-content-between flex-grow-1 align-items-center  '>
          <div className='ml-3'>
          <h3>{s.stepName}</h3>
            <h6>{s.description}</h6>
            <h6>Done by <strong>{s.doneBy}</strong></h6>
          </div>
          <div className='text-end'>
    <span 
        className='text-xlarge text-muted' 
        style={{cursor: 'pointer'}}
        onClick={() => handleStepClick(s)}
        onKeyDown={(event) => {
            if (event.key === 'Enter' || event.key === 'Space') {
                handleStepClick(s);
                event.preventDefault();  
            }
        }}
        role="button"
        tabIndex="0"
        onMouseEnter={(event) => { 
            const { target } = event;
            target.style.fontWeight = 'bold';
        }}
        onMouseLeave={(event) => { 
            const { target } = event;
            target.style.fontWeight = 'normal';
        }}
    >
        <i className='simple-icon-arrow-right' />
    </span>
</div>
          </div>
         
        </div>
     
        
    
        </CardBody>
      </Card>
      
              </div>
             
            )
           
          })}
      </Colxx>
     
      {/* <Colxx lg={4}>
      <Card>
        <CardBody>
        <div className='d-flex align-items-center'>
          <div> 

   
          <h1>{jobdetails.stepNumber}</h1>
         
          </div>
          <div className='ml-3'>
          <h3>{jobdetails.stepName}</h3>
            <h6>{jobdetails.description}</h6>
            <h6>Done by <strong>{jobdetails.doneBy}</strong></h6>
          </div>
        </div>
        
    
        </CardBody>
      </Card>
      </Colxx> */}
      {/* <Colxx lg={4}>
          {jobdetails&&jobdetails.map(job => (
            <Card key={job.jobId} className='mb-2'>
              <CardBody>
                <div className='d-flex align-items-center my-2'>
                  <div> 
                    <h1>{job.stepNumber}</h1>
                  </div>
                  <div className='ml-5'>
                    <h3>{job.jobName}</h3>
                    <h6>{job.description}</h6>
                    <h6>Done by <strong>{job.doneBy}</strong></h6>
                  </div>
                </div>
              </CardBody>
            </Card>
          ))}
        </Colxx> */}
      {/* <Colxx>
      {jobdetails.steps&&jobdetails.steps.map((st)=>{
        return (
          <Card key={st.stepId} className='mb-2'>
      <CardBody>
   
      <Form>
      <h2 className='text-primary text-center'>Step {st.stepNumber}</h2>

       <FormGroup >

       <Col sm={2}>
       <Label className='text-one'>Name</Label>
       </Col>
        <Col>
        <h3>{st.stepName}</h3>
        </Col>
        
       </FormGroup>
       <FormGroup >
       <Col sm={2}>
       <Label className='text-one'>Description</Label>
       </Col>
        <Col>
        <h3>{st.description}</h3>
        </Col>
        
       </FormGroup>
       <FormGroup >
       <Col sm={2}>
       <Label className='text-one'>Done by</Label>
       </Col>
        <Col>
        <h3>{st.doneBy}</h3>
        </Col>
        
       </FormGroup>
       <FormGroup >
       <Col sm={2}>
       <Label className='text-one'>Documents</Label>
       </Col>
        <Col>
        <DropzoneExample/>
       
        <div className='mt-4'>
      {st.documentList && st.documentList.map((document) => (
        <h5 key={document}>{document}<span className='ml-2 text-primary'><i className='iconsminds-download-1 font-weight-bold'/></span></h5>
      ))}
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
        )
      })}

      </Colxx> */}

      <Colxx>
          {selectedStep && (
           
            <Card key={selectedStep.id} className='mb-2'>
      <CardBody>
   
      <Form>
      <h2 className='text-primary text-center'>Step {selectedStep.stepNumber}</h2>

       <FormGroup >

       <Col sm={2}>
       <Label className='text-one'>Name</Label>
       </Col>
        <Col>
        <h3>{selectedStep.stepName}</h3>
        </Col>
        
       </FormGroup>
       <FormGroup >
       <Col sm={2}>
       <Label className='text-one'>Description</Label>
       </Col>
        <Col>
        <h3>{selectedStep.description}</h3>
        </Col>
        
       </FormGroup>
       <FormGroup >
       <Col sm={2}>
       <Label className='text-one'>Done by</Label>
       </Col>
        <Col>
        <h3>{selectedStep.doneBy}</h3>
        </Col>
        
       </FormGroup>
       <FormGroup >
       <Col sm={2}>
       <Label className='text-one'>Documents</Label>
       </Col>
        <Col>
        <DropzoneExample/>
       
     <div className='mt-4'>
                      {selectedStep.documentList && selectedStep.documentList.map((document) => (
                        <h5 key={document}>{document.name}<span className='ml-2 text-primary'><i className='iconsminds-download-1 font-weight-bold'/></span></h5>
                      ))}
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
            
          )}
        </Colxx>
      </Row>

      
    </div>
  );
}

export default JobDetails;
