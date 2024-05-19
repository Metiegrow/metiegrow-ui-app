import React, { useEffect, useState } from 'react';
import { Colxx } from 'components/common/CustomBootstrap';
// import DropzoneExample from 'containers/forms/DropzoneExample';

import { baseUrl } from 'constants/defaultValues';
import { Button, Card,CardBody, Col,  Form, FormGroup, Input, Label, Row } from 'reactstrap';
import Select from 'react-select';
import CustomSelectInput from 'components/common/CustomSelectInput';
import axios from 'axios';
import {useParams} from "react-router-dom";

import LawyerJobNotes from "../Notes/LawyerJobNotes"
import DropzoneExample from './UploadDropZone';










const selectData = [
  { label: 'Yet to start', value: 'yet to start', key: 1 },
  { label: 'In progress', value: 'Inprogress', key: 2 },
  { label: 'Completed', value: 'completed', key: 4 },
];
const doneByData=[
  { label: 'Client', value: true, key: 0 },
  { label: 'Lawyer', value: false, key: 1 },
]

const JobDetails = () => {
  const [selectedOption, setSelectedOption] = useState('');
  const [selectedStep, setSelectedStep] = useState(null);
  const [jobdetails,setJobDetails]=useState('');
  const {jid}=useParams();
  const [editMode, setEditMode] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [jobeditmode,setJobEditMode]=useState(false);
  const [isNewStep, setIsNewStep] = useState(false);

   const [userstep,setUserStep]=useState(true);
  
  //  const [editData, setEditData] = useState({ stepName: '', description: '', doneBy: '' });
  
  const [editData, setEditData] = useState({ stepName: '', description: '', doneBy:'', upload:true
});

// useEffect(() => {
//   console.log('Updated User Step Value:', userstep);
//   setEditData(prevData => ({
//     ...prevData,
//     doneBy: userstep, // Update the editData object whenever userstep changes
//     userStep: userstep, // Ensure userStep is updated as well
//   }));
// }, [userstep]);

// const dataToSend = {
//   ...editData,
//   doneBy: userstep, // Explicitly set doneBy to ensure it has the correct value
//   userStep: userstep, // Explicitly set userStep to ensure it has the correct value
// };

// console.log('Payload to send:', dataToSend); // Log the payload to check values

  // const url=`${baseUrl}/lawyerJobsDetails/${jid}`;

  const handleUserStepChange = (val) => {
    console.log('Selected Option:', val);
    setUserStep(val.value); 
    // console.log('Updated User old  Step Value:', userstep); 
  };
  

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
    // userStep: response.data.steps[0].doneBy,
    doneBy:userstep,
    upload:true,
    
   
  });
  
}
        
      } catch (error) {
        console.error('Error fetching data:', error);
        
      }
}

    useEffect(()=>{
       
        LawyerJobsDetails();
       
    
    },[url])
  

    const handleAddStepCard = () => {
      // Check if jobdetails is empty or not
      if (jobdetails && jobdetails.steps) {
        const newStepNumber = jobdetails.steps.length + 1;
        const newCard = {
          id: newStepNumber,
          stepNumber: newStepNumber,
          stepName: 'New Step',
          description: 'Description',
          doneBy: 'CLIENT',
          
        };
        const updatedJobDetails = {
          ...jobdetails,
          steps: [...jobdetails.steps, newCard]
        };
        setJobDetails(updatedJobDetails);
        setIsNewStep(true);
        
      
      }
    };
    function getTokenRes() {
      return localStorage.getItem('tokenRes');
  }
  function getRoleRes() {
    return localStorage.getItem('roleRes');
  }
  const roleRes = getRoleRes();
  const showEdit = () => {

    if (roleRes.includes("LAWYER")) {
      return (
         <div>
                <Button className='mr-2' outline color="primary" onClick={() => setEditMode(!editMode)}>
                
                
                 {editMode ? <i className='simple-icon-close' /> : <i className='simple-icon-pencil ' />
                  
                  } 
                

                  </Button>
                  <Button outline color="primary" >
                  <i className='simple-icon-trash ' />
                  </Button>
                </div>
        
      );
    }
    return null; 
  };

  const showClientNoJob=()=>{
    
    if(roleRes.includes("MENTEE")){
      return(
        <div>
           <Card className=''>
        <CardBody>
          <h1>Your job is working on your lawyer</h1>
        </CardBody>
      </Card>
        </div>
       
      );
     
    }
    return null;
  };
  const token = getTokenRes();

    const handleAddCard = async () => {
      
      const newStepNumber = jobdetails && jobdetails.steps ? jobdetails.steps.length + 1 : 1;
    
   
      const newStepData = {
        stepName: "Step name",  
        description: "description",
        upload: true,
        doneBy:false

      };
    
   
      const addJobUrl = `${baseUrl}/api/lawyer/job/${jid}/jobDetail/step/${newStepNumber}`;
    
      try {
        const response = await fetch(addJobUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` 
          },
          body: JSON.stringify(newStepData)
        });
    
        if (response.ok) {
          
          const newCard = await response.json();  
          const updatedJobDetails = {
            ...jobdetails,
            steps: [...(jobdetails.steps || []), newCard]  
          };
          setJobDetails(updatedJobDetails);
          
        } else {
        
          console.error("Failed to add new step:", await response.text());
        }
      } catch (error) {
        console.error("Error adding new step:", error);
      }
    };
    

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
    
    // const handleEditClick = () => {
    //   setEditMode(true);
    // };
    const handleJobNameClick = () => {
      setJobEditMode(true);
     
    };
  
    // const handleJobNameChange = (e) => {
    //   setEditedJobName(e.target.value);
    // };
  
   
    const handleCancelClick = () => {
      setJobEditMode(false);
    };
   
   
 
  
    const saveEdits = async () => {
      // const updateUrl = `${url}/steps/${selectedStep.id}`;
      const updateUrl = `${url}/jobDetail/${selectedStep.id} `;
      const dataToSend = {
        ...editData,
         doneBy:userstep, 
       
      };
      console.log('Payload to send:', dataToSend); 
     
      try {
        const response = await axios.put(updateUrl,dataToSend);
         
        if (response.status === 200) {
          LawyerJobsDetails();
          setEditMode(false);
        }
      } catch (error) {
        console.error('Failed to update step:', error);
      }
    };
    const saveEdits1 = async () => {
      // const newStepNumber = jobdetails && jobdetails.steps ? jobdetails.steps.length + 1 : 1;
      const updateUrl = `${baseUrl}/api/lawyer/job/${jid}/jobDetail/step/${selectedStep.id} `;
      const dataToSend = {
        ...editData,
         doneBy:userstep, 
        
      };
      console.log('Payload to send:', dataToSend); 
     
      try {
        const response = await axios.post(updateUrl,dataToSend);
         
        if (response.status === 200) {
          LawyerJobsDetails();
          setEditMode(false);
        }
      } catch (error) {
        console.error('Failed to update step:', error);
      }
    };
    // const saveEdits = async () => {
    //   let updateUrl;
    //   let method;
    //   const newStepNumber = jobdetails && jobdetails.steps ? jobdetails.steps.length + 1 : 1;
    
    //   if (selectedStep && selectedStep.id) {
    //     // If selectedStep exists and has an id, it means it's an existing step, so update it
    //     updateUrl = `${url}/jobDetail/${selectedStep.id}`;
    //     method = 'put';
    //   } else {
    //     // If selectedStep doesn't exist or doesn't have an id, it means it's a new step, so create it
    //     updateUrl = `${baseUrl}/api/lawyer/job/${jid}/jobDetail/step/${newStepNumber}`;
    //     method = 'post';
    //   }
    
    //   const dataToSend = {
    //     ...editData,
    //     doneBy: userstep,
        
    //   };
    //   console.log('Payload to send:', dataToSend);
    
    //   try {
    //     const response = await axios({
    //        method,
    //       url: updateUrl,
    //       data: dataToSend,
    //     });
    
    //     if (response.status === 200) {
    //       LawyerJobsDetails();
    //       setEditMode(false);
    //     }
    //   } catch (error) {
    //     console.error('Failed to update/create step:', error);
    //   }
    // };
    
   
    const saveJobs = async () => {
      // const updateUrl1 = `${url}/jobDetail/${jid}/step/${selectedStep.id}`;
      const updateUrl1 = `${baseUrl}/api/lawyer/lawyerJob`;
      try {
        const response = await axios.put(updateUrl1, { jobId:`${jid}` , jobName: jobdetails.jobName }); 
        if (response.status === 200) {
          LawyerJobsDetails();
          setEditMode(false);
        }
      } catch (error) {
        console.error('Failed to update job name:', error);
      }
    };
    
    const handleSaveJobName = () => {
      saveJobs();
      setJobEditMode(false);
    };
    const saveStatus=async( selectedKey)=>{
      const updateStatusUrl=`${baseUrl}/api/lawyer/job/${jid}/jobdetail-status/${selectedStep.id}`
      try{
        const response = await axios.put(updateStatusUrl, {status:selectedKey}); 
        if (response.status === 200) {
          LawyerJobsDetails();
          setEditMode(false);
        }
      }
      catch (error) {
        console.error('Failed to update job status:', error);
      }
    }
    const handleSave = () => {
      if (isNewStep) {
        
        saveEdits1();
      } else {
        
        saveEdits();
      }
    };

  return (
    <div>
        <Row>

        <Col md={12} lg={4}>
        {jobdetails.steps&&jobdetails.steps.length>0?(
         null
        ):(
          showClientNoJob()
        )}
        
        {/* <h1 className='font-weight-semibold text-large'>{jobdetails.jobName}</h1> */}
        {jobeditmode ? (
          <Row className='d-flex align-items-center'>
            <Col md={6}>
            <div className=''>
          <Input
              type="text"
              value={jobdetails.jobName}
              // onChange={(e) => setJobName(e.target.value)}
              onChange={(e) => setJobDetails({ ...jobdetails, jobName: e.target.value })}
            />
           
          </div>
            </Col>
            <Col md={6}> 
            <div className='my-3'>
              <Button color="primary" onClick={handleSaveJobName}>Save</Button>
              <Button color="secondary" className="ml-2" onClick={handleCancelClick}>Cancel</Button>
            </div></Col>
          </Row>
         
            
          ) : (
        <div
          className='font-weight-semibold text-large '
          style={{ cursor: 'pointer' }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
         onClick={()=>setJobEditMode(true)}
          onKeyDown={(event) => {
            if (event.key === 'Enter' || event.key === 'Space') {
              // Handle click action here
              handleJobNameClick();
              event.preventDefault();
            }
          }}
          role="button"
          tabIndex={0}
          >
           <h1>{jobdetails.jobName}</h1>  
            {isHovered && (
              <span className='ml-2 text-primary text-one' >
              <i 
                className='simple-icon-pencil' 
                style={{ cursor: 'pointer' }} 
                size='sm'
              />
              </span>
             
              
            )}
          </div>
          )
        }
       
      
        </Col>
        <Col><LawyerJobNotes jobId={jid}/></Col>
        </Row>
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
            <h6>By <span className='text-muted'>{s.doneBy}</span></h6>
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
             

          
          {jobdetails.steps&&jobdetails.steps.length>0?(
           
          <Card>
            <CardBody className='my-2' style={{cursor:"pointer"}} onClick={handleAddStepCard}>
              <h1 className=' text-center mx-auto w-100' 
              style={{fontSize:"60px",cursor:"pointer"}}
              >+</h1>
            </CardBody>
          </Card>
          ):(
            <Card>
            <CardBody className='my-2' style={{cursor:"pointer"}} onClick={handleAddCard}>
              <h1 className=' text-center mx-auto w-100' 
              style={{fontSize:"60px",cursor:"pointer"}}
              >+</h1>
            </CardBody>
          </Card>
           
          )}

          {/* <Card>
            <CardBody className='my-2' style={{cursor:"pointer"}} onClick={handleAddCard}>
              <h1 className=' text-center mx-auto w-100' 
              style={{fontSize:"60px",cursor:"pointer"}}
              >+</h1>
            </CardBody>
          </Card> */}
      </Colxx>
 
     


      <Colxx>
  
          <Col>
          {/* right side step details */}
          {selectedStep && (
            
            <Card className='mb-2  '>
              <CardBody>
                <Form>
                <FormGroup>
                  <Col>
                  <div className='d-flex justify-content-between'>
                <h2 className='text-primary '>Step {selectedStep.stepNumber}</h2>
                {/* <div>
                <Button className='mr-2' outline color="primary" onClick={() => setEditMode(!editMode)}>
                
                
                 {editMode ? <i className='simple-icon-close' /> : <i className='simple-icon-pencil ' />
                  
                  } 
                

                  </Button>
                  <Button outline color="primary" >
                  <i className='simple-icon-trash ' />
                  </Button>
                </div> */}
                 
                  {showEdit()}

                  
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
                      {/* <FormGroup className='py-2'>
                      <Col sm={2}>
                      <Label>Done by</Label>
                      </Col>
                        <Col>
                        <Input type="text" value={editData.doneBy} onChange={handleEditChange} name="doneBy" />

                        </Col>
                      </FormGroup> */}
                      <FormGroup className='py-2'>
                      <Col sm={2}>
                      <Label>Done by</Label>
                      </Col>
                        <Col>
                        <Select
                 components={{ Input: CustomSelectInput }}
                   className="react-select"
                classNamePrefix="react-select"
                  name="userstep"
                  value={doneByData.find(option => option.value === userstep)}
            
                 onChange={handleUserStepChange}
                //  onChange={(val) => {
                // console.log(val);  
                // setUserStep(val);
             
                //   }}
          // onChange={saveStatus} 
            options={doneByData}
          // options={selectData}
        />
                    
                     
                        </Col>
                      </FormGroup>
                      <FormGroup  className='py-2'>
       <Col sm={2}>
       <Label className='text-one'>Documents</Label>
       </Col>
        <Col>
        <DropzoneExample   jobId={`${jid}`} stepNo={`${selectedStep.id}}`}/>
       
     <div className='mt-4'>
   
                      {selectedStep.documentList && selectedStep.documentList.map((document) => (
                        <h5 key={document}>{document.name}<span className='ml-2 text-primary'>
                        <i className='iconsminds-download-1 font-weight-bold mx-1'  style={{cursor:"pointer"}}/>
                        <i className='simple-icon-trash  mx-1' style={{cursor:"pointer"}}/></span></h5>
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
          // defaultValue={selectedOption}
          value={selectedOption}
          // onChange={(val)=>setSelectedOption(val)}
          onChange={(val) => {
         console.log(val);  
        setSelectedOption(val);
        saveStatus(val.key);
      }}
          // onChange={saveStatus} 
            options={selectData}
          // options={selectData}
        />
        
        </Col>
       
      </FormGroup>
      {/* <Button color="primary" onClick={saveEdits}>Save</Button> */}
      {isNewStep ? (
        // Save button for adding a new step
        <Button color="primary" onClick={handleSave}>Save</Button>
      ) : (
        // Save button for editing an existing step
        <Button color="primary" onClick={handleSave}>Save</Button>
      )}
                     
                    
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
                  <h3 className=''>{selectedStep.description}</h3>
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
                  <DropzoneExample   jobId={`${jid}`} stepNo={`${selectedStep.id}}`}/>

                  <div className='mt-4'>
                                {selectedStep.documentList && selectedStep.documentList.map((document) => (
                                  <h5 key={document.id}>{document.name}<span className='ml-2 text-primary'>
                                  <i className='iconsminds-download-1 mx-1 ' style={{cursor:"pointer"}}/>
                                  <i className='simple-icon-trash mx-1 ' style={{cursor:"pointer"}}/>
                                  </span></h5>
                                ))}
                
                              </div>
                  </Col>
                    
                    </FormGroup>
                    {/* <FormGroup>
                    <Col sm={2}>
                    <Label className='text-one'>Comment</Label>
                    </Col>
                    <Col>
                    <Input type="textarea" name="comment" />
                    </Col>
                      
                      </FormGroup> */}
                    <FormGroup>
                    <Col sm={2}>
                      <Label className='text-one'>
                        Status
                      </Label>
                    </Col>
                    <Col>
                    {/* <Select
                      components={{ Input: CustomSelectInput }}
                      className="react-select"
                      classNamePrefix="react-select"
                      name="form-field-name"
                      value={selectedOption}
                      onChange={setSelectedOption}
                      options={selectData}
                    /> */}
                    <h3>{selectedStep.status}</h3>
                    
                    </Col>

                    </FormGroup>
                    {/* <FormGroup>
                      <Label>
                        Status
                      </Label>
                      <Input type="select">
                        
                        <option>{selectedStep.status}</option>
                        <option>In Progress</option>
                        <option>completed</option>
                        
                         
                      </Input>
                    </FormGroup> */}
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
