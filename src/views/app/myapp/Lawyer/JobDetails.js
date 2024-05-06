import { Colxx } from 'components/common/CustomBootstrap';
import DropzoneExample from 'containers/forms/DropzoneExample';
import React, { useEffect, useState } from 'react';
import { baseUrl } from 'constants/defaultValues';
import { Button, Card,CardBody, Col,  Form, FormGroup, Input, Label, Row } from 'reactstrap';
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
  const [editMode, setEditMode] = useState(false);
   const [editData, setEditData] = useState({ stepName: '', description: '', doneBy: '' });
 
  
 

  // const url=`${baseUrl}/lawyerJobsDetails/${jid}`;


  // Backedn url 
  const url=`${baseUrl}/api/lawyer/job/${jid}`
  const LawyerJobsDetails=async()=>{
    try {
        const response = await axios.get(url);
        setJobDetails(response.data);
        console.log("checking response",response.data);

  
if (response.data.steps && response.data.steps.length > 0) {
  setSelectedStep(response.data.steps[0]);
  setEditData({
    stepName: response.data.steps[0].stepName,
    description: response.data.steps[0].description,
    doneBy: response.data.steps[0].doneBy
  });
}
        
      } catch (error) {
        console.error('Error fetching data:', error);
      }
}

    useEffect(()=>{
       
        LawyerJobsDetails();
       
    
    },[url])
  

    const handleStepClick = (step) => {
      setSelectedStep(step);
      setEditMode(false);
      setEditData({
        stepName: step.stepName,
        description: step.description,
        doneBy: step.doneBy,
      });   
    };
  
    
    const handleEditChange = (e) => {
      const { name, value } = e.target;
      setEditData(prev => ({ ...prev, [name]: value }));
    };
   
    
    
   
  
    const saveEdits = async () => {
      // Assuming API accepts PATCH request to update steps
      const updateUrl = `${url}/steps/${selectedStep.id}`;
      try {
        const response = await axios.patch(updateUrl, editData);
        if (response.status === 200) {
          LawyerJobsDetails();
          setEditMode(false);
        }
      } catch (error) {
        console.error('Failed to update step:', error);
      }
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
            <h6 className='text-muted'>{s.description}</h6>
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
     


      <Colxx>
          {/* {selectedStep && (
           
            <Card key={selectedStep.id} className='mb-2'>
      <CardBody>
   
      <Form>
      <h2 className='text-primary text-center'>Step {selectedStep.stepNumber}</h2>
      <Button outline color="primary" >
                <i className='simple-icon-pencil'/>
                </Button>

       <FormGroup className='py-2'>

       <Col sm={2}>
       <Label className='text-one'>Name</Label>
       </Col>
        <Col>
        <h3>{selectedStep.stepName}</h3>
      
        </Col>
     
        
       </FormGroup>
       <FormGroup  className='py-2'>
       <Col sm={2}>
       <Label className='text-one'>Description</Label>
       </Col>
        <Col>
        <h3 className='text-muted'>{selectedStep.description}</h3>
        </Col>
        
       </FormGroup>
       <FormGroup className='py-2' >
       <Col sm={2}>
       <Label className='text-one'>Done by</Label>
       </Col>
        <Col>
        <h3>{selectedStep.doneBy}</h3>
        </Col>
        
       </FormGroup>
       <FormGroup  className='py-2'>
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
          <Label className='text-one'>
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
      <FormGroup>
      <Col>
      <Button  color="primary" >
                save
                </Button>
      </Col>
     
      </FormGroup>
      
 
       </Form>
      </CardBody>
      
      </Card>
            
          )} */}
          <Col>
          {selectedStep && (
            <Card className='mb-2'>
              <CardBody>
                <Form>
                <FormGroup>
                  <Col>
                  <div className='d-flex justify-content-between'>
                <h2 className='text-primary '>Step {selectedStep.stepNumber}</h2>
                  <Button outline color="primary" onClick={() => setEditMode(!editMode)}>
                  {editMode ? <i className='simple-icon-close' /> : <i className='simple-icon-pencil' />}

                  </Button>
                </div>
                  </Col>
                </FormGroup>
                
                 
                  {editMode ? (
                    <>
                      <FormGroup className='py-2'>
                      <Col sm={2}>
                      <Label>Name</Label>
                      </Col>
                        <Col>
                        <Input type="text" value={editData.stepName} onChange={handleEditChange} name="stepName" />
                        </Col>
                      </FormGroup>
                      <FormGroup className='py-2'>
                      <Col sm={2}>
                      <Label>Description</Label>
                      </Col>
                        <Col>
                        <Input type="text" value={editData.description} onChange={handleEditChange} name="description" />

                        </Col>
                      </FormGroup>
                      <FormGroup className='py-2'>
                      <Col sm={2}>
                      <Label>Done by</Label>
                      </Col>
                        <Col>
                        <Input type="text" value={editData.doneBy} onChange={handleEditChange} name="doneBy" />

                        </Col>
                      </FormGroup>
                      <FormGroup  className='py-2'>
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
          <Label className='text-one'>
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
      
                      <Button color="primary" onClick={saveEdits}>Save</Button>
                    </>
                  ) : (
                    <>
                            <FormGroup className='py-2'>

                      <Col sm={2}>
                      <Label className='text-one'>Name</Label>
                      </Col>
                      <Col>
                      <h3>{selectedStep.stepName}</h3>

                      </Col>

                          
                          </FormGroup>
                  <FormGroup  className='py-2'>
                  <Col sm={2}>
                  <Label className='text-one'>Description</Label>
                  </Col>
                  <Col>
                  <h3 className='text-muted'>{selectedStep.description}</h3>
                  </Col>
                  
                  </FormGroup>
                  <FormGroup className='py-2' >
                  <Col sm={2}>
                  <Label className='text-one'>Done by</Label>
                  </Col>
                  <Col>
                  <h3>{selectedStep.doneBy}</h3>
                  </Col>
                  
                  </FormGroup>
                  <FormGroup  className='py-2'>
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
                      <Label className='text-one'>
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
                    </>
                  )}
                </Form>
              </CardBody>
            </Card>
          )}
        </Col>
        </Colxx>
      </Row>

      
    </div>
  );
}

export default JobDetails;
