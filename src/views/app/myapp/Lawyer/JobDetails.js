import React, { useEffect, useState } from 'react';
import { Colxx } from 'components/common/CustomBootstrap';
// import DropzoneExample from 'containers/forms/DropzoneExample';

import { baseUrl } from 'constants/defaultValues';
import { Button, Card,CardBody, Col,  Form, FormGroup, Input, Label, Row } from 'reactstrap';
import Select from 'react-select';
import CustomSelectInput from 'components/common/CustomSelectInput';
import axios from 'axios';
import {useParams,useHistory,useLocation } from "react-router-dom";

import LawyerJobNotes from "../Notes/LawyerJobNotes"
import DropzoneExample from './UploadDropZone';
import ToasterComponent from '../notifications/ToasterComponent';



const selectData = [
  { label: 'Yet to start', value: 'yet to start', key: 1 },
  { label: 'In progress', value: 'Inprogress', key: 2 },
  { label: 'Completed', value: 'completed', key: 4 },
];
const doneByData=[
  { label: 'Client', value: true, key: 0 },
  { label: 'Lawyer', value: false, key: 1 },
]
const jobStatusData=[
  {label:'Yet to start',value:'YET_TO_START',key:1},
  {label:'InProgress',value:'IN_PROGRESS',key:2},
  {label:'Completed',value:'LAWYER_COMPLETED',key:4}
]

const JobDetails = () => {
  // const [selectedOption, setSelectedOption] = useState('');
  const [selectedStep, setSelectedStep] = useState(null);
  const [jobdetails,setJobDetails]=useState('');
  const {jid}=useParams();
  const [editMode, setEditMode] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isHovered1, setIsHovered1] = useState(false);
  const [jobeditmode,setJobEditMode]=useState(false);
  const [isNewStep, setIsNewStep] = useState(false);
  const [jobstatuseditmode,setJobStatusEditMode]=useState(false)

   const [userstep,setUserStep]=useState(true);
   const [jobstatuschange,setJobStatusChange]=useState(true);
 

   
 
  const [editData, setEditData] = useState({ stepName: '', description: '', doneBy:'', upload:true
});



  // const url=`${baseUrl}/lawyerJobsDetails/${jid}`;

  const handleUserStepChange = (val) => {
    console.log('Selected Option:', val);
    setUserStep(val.value); 
  
  };


  // Backedn url 
  const url=`${baseUrl}/api/lawyer/job/${jid}`
  const LawyerJobsDetails=async()=>{
    try {
        const response = await axios.get(url);
        setJobDetails(response.data);
        console.log("checking response",response.data);

  
if (response.data.steps && response.data.steps.length > 0) {
  // jobdetails.steps = jobdetails.steps.sort((a, b) => a.stepNumber - b.stepNumber);
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


    const isFormFilled = () => {
      return (
        editData.stepName.trim() !== '' &&
        editData.description.trim() !== '' &&
        userstep !== ''
      );
    };
  

    const handleAddStepCard = () => {
       
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
          // steps: updatedSteps,
        };
        setJobDetails(updatedJobDetails);
        setIsNewStep(true);
        setEditMode(true);
        setSelectedStep(newCard);
        setEditData({
          stepName: '',
          description: '',
          doneBy: '',
          upload: true,
        });
    
      
      }
    };

    
  //   function getTokenRes() {
  //     return localStorage.getItem('tokenRes');
  // }
 
  function getRoleRes() {
    return localStorage.getItem('roleRes');
  }
  const roleRes = getRoleRes();
  const showEdit = () => {

    

    if (!isNewStep && roleRes.includes("LAWYER")) {
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

  // const token = getTokenRes();
  const history = useHistory();

  
    const handleStepClick = (step) => {
      setSelectedStep(step);
      setEditMode(false);
      setEditData({
        stepName: step.stepName,
        description: step.description,
        doneBy: step.doneBy,
        upload: true,
      });   
    };
  
    
    const handleEditChange = (e) => {
      const { name, value } = e.target;
      setEditData(prev => ({ ...prev, [name]: value }));
    };
    
   
    const handleJobNameClick = () => {
      setJobEditMode(true);
     
    };
    const handleJobStatusClick=()=>{
      setJobStatusEditMode(true);
    }
  
   
  const showClientNoJob=()=>{
    
    if(roleRes.includes("USER")){
      return(
        <div>
           <Card className='text-center'>
        <CardBody>
          <h3>Your lawyer is working on your job<span className='mx-2'>
          <i className='iconsminds-information'/></span></h3>
        </CardBody>
      </Card>
        </div>
       
      );
     
    }
  
     return  <div>
     <Card className='text-center'>
  <CardBody>
    <h3>You didnt created step yet <span className='mx-2'>
    <i className='iconsminds-information'/></span></h3>
    <Button color='primary' onClick={handleAddStepCard}>Create your first step </Button>
  </CardBody>
</Card>
  </div>;
  };

  const ApproveJobStatusByClient=async()=>{
    const approveUrl=`${baseUrl}/api/lawyer/job/${jid}/status/client`
    try{
      const response= await axios.put(approveUrl,{status:"COMPLETED"});
      if(response.status===200){
        LawyerJobsDetails();
      }
    }
    catch(error){
      console.error('Failed to update job status:', error);
    }
  }
  const RejectJobStatusByClient=async()=>{
    const approveUrl=`${baseUrl}/api/lawyer/job/${jid}/status/client`
    try{
      const response= await axios.put(approveUrl,{status:"IN_DISPUTE"});
      if(response.status===200){
        LawyerJobsDetails();
      }
    }
    catch(error){
      console.error('Failed to update job status:', error);
    }
  }
  
  const clientJobApproveInfo=()=>{
    if(roleRes.includes("USER")&&jobdetails.jobStatus==="LAWYER_COMPLETED"){
      return(
          <Row>
          <Col  className='text-center my-2'  style={{ position: 'relative', top: '50%', bottom:'-50%'  }}>
          <Card className='mx-auto '>
          <CardBody>
            <h3>Your lawyer has marked the job as completed</h3>
            <p>Do you agree ?</p>
            <Button className='mr-2' color='primary' onClick={ApproveJobStatusByClient}>Accept</Button>
            <Button className='' outline onClick={RejectJobStatusByClient}>Raise a dispute</Button>
          </CardBody>
         
          </Card>
        </Col>
        </Row> 
      )
    }
    return null;
  }
  

 
    const handleCancelClick = () => {
      setJobEditMode(false);
    };
    const handleCancelStatusClick = () => {
      setJobStatusEditMode(false);
    };
   
   
    
  
    const saveEdits = async () => {
      // const updateUrl = `${url}/steps/${selectedStep.id}`;
      const updateUrl = `${url}/jobDetail/${selectedStep.stepNumber} `;
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


            // Reassign step numbers to be sequential
      // const updatedSteps = reassignStepNumbers(jobdetails.steps);

      // const updatedJobDetails = {
      //   ...jobdetails,
      //   steps: updatedSteps,
      // };

      // setJobDetails(updatedJobDetails);
      // Reassign step numbers to be sequential
    
      
      
          
        }
      } catch (error) {
        console.error('Failed to update step:', error);
      }
    };
    // const saveEdits1 = async () => {
    //   // const newStepNumber = jobdetails && jobdetails.steps ? jobdetails.steps.length + 1 : 1;
    //   const updateUrl = `${baseUrl}/api/lawyer/job/${jid}/jobDetail/step/${selectedStep.stepNumber} `;
    //   const dataToSend = {
    //     ...editData,
    //      doneBy:userstep, 
        
    //   };
    //   console.log('Payload to send:', dataToSend); 
     
    //   try {
    //     const response = await axios.post(updateUrl,dataToSend);
         
    //     if (response.status === 200) {
    //       LawyerJobsDetails();
    //       setEditMode(false);


    //       // Reassign step numbers to be sequential
    //   // const updatedSteps = reassignStepNumbers(jobdetails.steps);

    //   // const updatedJobDetails = {
    //   //   ...jobdetails,
    //   //   steps: updatedSteps,
    //   // };

    //   // setJobDetails(updatedJobDetails);
      
    //   // setIsNewStep(false); // Reset the new step flag after creation


      
          
    //     }
    //   } catch (error) {
    //     console.error('Failed to update step:', error);
    //   }
    // };
    const saveEdits1 = async () => {
      const updateUrl = `${baseUrl}/api/lawyer/job/${jid}/jobDetail/step/${selectedStep.stepNumber} `;
      const dataToSend = {
        ...editData,
        doneBy: userstep,
      };
    
      console.log('Payload to send:', dataToSend); 
    
      try {
         
        const response = await axios.get(`${baseUrl}/api/lawyer/job/${jid}`);
        const existingSteps = response.data.steps;
        const existingStepNumbers = existingSteps.map(step => step.stepNumber);
    
        const selectedStepNumber = selectedStep.stepNumber;
    
        // Check if all steps up to selectedStepNumber - 1 are in existingStepNumbers
        const allPreviousStepsOccupied = [...Array(selectedStepNumber - 1).keys()].every(stepNumber => existingStepNumbers.includes(stepNumber + 1));
    
        if (allPreviousStepsOccupied) {
          // Post the current step
          const postResponse = await axios.post(updateUrl, dataToSend);
    
          ToasterComponent('success', postResponse.data.statuses);
          if (postResponse.status === 200) {
            LawyerJobsDetails();
            setEditMode(false);
          }
        } else {
          alert('Please fill out all previous steps before creating or updating this step.');
        }
      } catch (error) {
        console.error('Failed to update step:', error);
      }
    };
    
    
    
    
   
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
    
    // const handleSaveJobStatus=()=>{
    //   setJobStatusEditMode(false);
    // }
   
    
    const saveStatus=async( selectedKey)=>{
     
      const updateStatusUrl=`${baseUrl}/api/lawyer/job/${jid}/jobdetail-status/${selectedStep.stepNumber}`
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

    const saveJobStatus=async(selectedKey)=>{
      const updateJobStatusUrl=`${baseUrl}/api/lawyer/job/${jid}/status/lawyer`
      try{
        const response= await axios.put(updateJobStatusUrl,{status:selectedKey});
        if (response.status === 200) {
          LawyerJobsDetails();
          setJobStatusEditMode(false);
          
         
        }
      }
      catch(error){
        console.error('Failed to update job status:', error);
      }
    }


   

    // const handleSave = () => {
    //   if (isNewStep) {
        
    //     saveEdits1();
    //   } else {
        
    //     saveEdits();
    //   }
    // };
    const handleSave = () => {
      if (isNewStep) {
        if (isFormFilled()) {
          saveEdits1();
        } else {
          console.warn('Please fill all required fields.');
        }
      } else {
        saveEdits();
      }
    };
    

    const showPlusCard = () => {
      if (roleRes.includes("LAWYER")) {
        return (
          null
        );
      }
    
      if (roleRes.includes("USER")) {
        return (
          <Card className='d-none'>
            {/* <CardBody className='my-2' style={{cursor: "pointer"}} onClick={handleAddCard}> */}
            <CardBody className='my-2' style={{cursor: "pointer"}} onClick={handleAddStepCard}>
              <h1 className='text-center mx-auto w-100' style={{fontSize: "60px", cursor: "pointer"}}>
                +
              </h1>
            </CardBody>
          </Card>
        );
      }
    
      return null; 
    };
    const showJobEditIcon = () => {

      // if (!jobdetails || !jobdetails.jobName) {
      //   return <h1 className='ml-1'>Loading job name...</h1>;  // Provide a loading or default placeholder
      // }
      if (roleRes.includes("LAWYER")) {
        return (
          <div
            className='font-weight-semibold text-large '
            style={{ cursor: 'pointer' }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={() => setJobEditMode(true)}
            onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === 'Space') {
                handleJobNameClick();
                event.preventDefault();
              }
            }}
            role="button"
            tabIndex={0}
          >
            <h1 className=''>{jobdetails.jobName}</h1>
            
            {isHovered && (
              <span className='ml-2 text-primary text-one'>
                <i 
                  className='simple-icon-pencil' 
                  style={{ cursor: 'pointer' }} 
                  size='sm'
                />
              </span>
            )}
          </div>
        );
      }
      
      return <h1 className=''>{jobdetails.jobName} </h1>;
    };
    
   const showJobStatusEditIcon=()=>{
    if (roleRes.includes("LAWYER")) {
      return (
        <div
          className='font-weight-semibold text-large d-flex'
          style={{ cursor: 'pointer' }}
          onMouseEnter={() => setIsHovered1(true)}
          onMouseLeave={() => setIsHovered1(false)}
          onClick={() => setJobStatusEditMode(true)}
          onKeyDown={(event) => {
            if (event.key === 'Enter' || event.key === 'Space') {
              handleJobStatusClick();
              event.preventDefault();
            }
          }}
          role="button"
          tabIndex={0}
        >
          <h6 className='text-muted'>job status : {jobdetails.jobStatus}</h6>
          
          {isHovered1 && (
            <span className='ml-2 text-primary text-one'>
              <i 
                className='simple-icon-pencil' 
                style={{ cursor: 'pointer' }} 
                size='sm'
              />
            </span>
          )}
        </div>
      );
    }
    
    return <h6 className='text-muted'>job status : {jobdetails.jobStatus}</h6>;
   }
    
    const showAddStepCard = () => {
      if (roleRes.includes("LAWYER")) {
        return (
          <>
          
            <Card>
              <CardBody className='my-2' style={{cursor: "pointer"}} onClick={handleAddStepCard}>
                <h1 className='text-center mx-auto w-100' style={{fontSize: "60px", cursor: "pointer"}}>
                  +
                </h1>
              </CardBody>
            </Card>
          </>
        );
      }
    
      if (roleRes.includes("USER")) {
        return (
          <>
          
            <Card className='d-none'>
              <CardBody className='my-2' style={{cursor: "pointer"}} onClick={handleAddStepCard}>
                <h1 className='text-center mx-auto w-100' style={{fontSize: "60px", cursor: "pointer"}}>
                  +
                </h1>
              </CardBody>
            </Card>
          </>
        );
      }
    
      return null; 
    };
    
    const downloadDocument = async (documentId) => {
      
      const updateUrl1 = `${baseUrl}/api/lawyer/job/document/${documentId}`;
      try {
        const response = await axios.get(updateUrl1); 
        console.log("document response",response);
        
        if (response.status === 200) {
          // const documentUrl = updateUrl1;
          window.open(updateUrl1, '_blank');
    

     
          // if (documentUrl) {
          //   window.open(documentUrl, '_blank');
          // } else {
          //   console.error('Document URL is missing in the response');
          // }
        } else {
          console.error('Failed to fetch the document');
        }
      }
      
      catch (error) {
        console.error('Failed to update job name:', error);
      }
    };

    const deleteDocument = async (documentId) => {
      const deleteUrl = `${baseUrl}/api/lawyer/job/document/${documentId}`;
      try {
        const response = await axios.delete(deleteUrl);
        if (response.status === 200) {
          window.location.reload();
          
          
        } else {
          console.error('Failed to delete the document');
        }
      } catch (error) {
        console.error('Failed to delete the document:', error);
      }
    };
    const handleKeyDown = (event, action, documentId) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        action(documentId);
      }
    };

    const location = useLocation();
  const { lawyerName,clientName,lawyerId ,clientId} = location.state || {};
  const isLawyer = roleRes.includes("LAWYER");

  const navigateToProfile = () => {
    history.push(`/app/lawyerprofile/${lawyerId}`);
  };
  
    

  return (
    <div>
 
        <Row>

        {/* <Col md={12} lg={12} sm={12} className='my-2'>
        {jobdetails.steps&&jobdetails.steps.length>0?(
         null
        ):(
          showClientNoJob()
        )}
        </Col> */}
        <Col md={12} lg={4}>
        
        
      
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
           

          showJobEditIcon()
          
          
       
          )
        }
        <Row>
        <Col>
        <div>
         
         {/* <NavLink href={`/app/lawyerprofile/${lawyerId}`}>
          <h6 className='text-muted'>Lawyer: {lawyerName}</h6>
          </NavLink> */}
     
        {lawyerName ? (
         
          
      <div role='button' tabIndex={0}  onClick={navigateToProfile} 
       onKeyPress={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          navigateToProfile();
        }
      }}
      style={{ cursor: 'pointer' }}>
      <h6 className='text-muted'>Lawyer: {lawyerName}</h6>
    </div>
          
       
      ) : (
         <h6 className='text-muted'>Client: {clientName}</h6>
      )}
        </div>
        </Col>
         
        </Row>
        <Row>
        <Col>
            
            {jobstatuseditmode ? (
          <Row className='d-flex align-items-center'>
           
            <Col md={6}>
            <div className=''>
           <Select
          components={{ Input: CustomSelectInput }}
          className="react-select"
          classNamePrefix="react-select"
          name="form-field-name"
          
          // value={selectedOption}
          value={jobstatuschange}
          
          onChange={(val) => {
         console.log(val);  
          // setSelectedOption(val);
          setJobStatusChange(val);
          // handleJobStatusChange
          // setSelectedStep(val);
          // saveJobStatus(val.key);
          saveJobStatus(val.value);
      }}
          
            options={jobStatusData}
          
        />
           
          </div>
            </Col>
            <Col md={6}> 
            <div className='my-3'>
              {/* <Button color="primary" onClick={handleSaveJobStatus}>Save</Button> */}
              <Button color="secondary" className="ml-2" onClick={handleCancelStatusClick}>Cancel</Button>
            </div></Col>
            
          </Row>
          
            
          ) : (
           

          showJobStatusEditIcon()
          
          
       
          )
        }
          </Col>
        </Row>
       


          {clientJobApproveInfo()}
      
        </Col>
        {/* <Col className=''>
        <LawyerJobNotes jobId={jid}/></Col> */}
       

        <Col className=''>
        <div className='d-flex justify-content-end align-items-center '>
        <div className=''>
        {roleRes.includes("USER") ? (
          <Button 
            className='mr-2'  
            outline 
            color='primary' 
            onClick={() => history.push({
              pathname: '/app/lawyer/reviews',
              state: { lawyerName, clientId, clientName, lawyerId } 
            })}
          >
            Add Reviews
          </Button>
        ) : null}
        
        
  
        </div>
        <div className=''>
        <LawyerJobNotes jobId={jid} />
        </div>
        </div>
        
       
       </Col>

       


        </Row>
        
        <Row>
        <Col md={12} lg={12} sm={12} className='my-2'>

        
        
        {jobdetails.steps&&jobdetails.steps.length>0?(
         null
        ):(
          showClientNoJob()
        )}
        </Col>
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
           
         
          showAddStepCard()
          ):( 
          showPlusCard() 
          )}
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
                <h2 className='text-primary '>Step {selectedStep.stepNumber} 
                {editMode ? ` : ${editData.stepName}` : ""}
                </h2>
              
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
                  // value={doneByData.find(option => option.value === userstep)}
            
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
                     

       {isNewStep ? null : (
            <>
              <FormGroup className='py-2'>
                <Col sm={2}>
                  <Label>Documents</Label>
                </Col>
                <Col>
                <DropzoneExample   jobId={`${jid}`} stepNo={`${selectedStep.stepNumber}`}/>
                  <div className='mt-4'>
                  {selectedStep.documentList && selectedStep.documentList.map((document) => (
                                  <h5 key={document.id}>{document.name}
                                  <span className='ml-2 text-primary' role="button"
                                 tabIndex="0" 
                               onKeyDown={(e) => handleKeyDown(e, downloadDocument, document.id)}
                               onClick={() => downloadDocument(document.id)}>

                                <i className='iconsminds-download-1 mx-1 '  
                                  style={{cursor:"pointer"}}/>
                               </span>
                                  <span  tabIndex="0" role='button'
                               onKeyDown={(e) => handleKeyDown(e, deleteDocument, document.id)}
                               onClick={() => deleteDocument(document.id)}>
                                  
                                  
                                  
                                  <i className='simple-icon-trash mx-1 ' style={{cursor:"pointer"}}/>
                                  </span></h5>
                                ))}
                  </div>
                </Col>
              </FormGroup>
            </>
          )}

        
      <FormGroup>
      <Col>   
      {/* {isNewStep ? (
        
        <Button color="primary" onClick={handleSave}>Create</Button>
      ) : (
        // Save button for editing an existing step
        <Button color="primary" onClick={handleSave}>Save</Button>
      )} */}
      {isNewStep ? (
        <Button 
          color="primary" 
          onClick={handleSave}
          disabled={!isFormFilled()} 
        >
          Create
        </Button>
      ) : (
        <Button color="primary" onClick={handleSave}>Save</Button>
      )}
     </Col>
     </FormGroup>
    
   
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
                  {(selectedStep.doneBy === 'CLIENT' || (selectedStep.doneBy === 'LAWYER' && isLawyer)) && (
                    <Col sm={2}>
                  <Label className='text-one'>Documents</Label>
                  </Col>
                  )}
                 
                  <Col>
                  {(selectedStep.doneBy === 'CLIENT' || (selectedStep.doneBy === 'LAWYER' && isLawyer)) && (
                    <DropzoneExample jobId={`${jid}`} stepNo={`${selectedStep.stepNumber}`} />
                  )}
                  {/* <DropzoneExample   jobId={`${jid}`} stepNo={`${selectedStep.stepNumber}`}/> */}
                 

                  <div className='mt-4'>
                      {selectedStep.documentList && selectedStep.documentList.map((document) => (
                        <h5 key={document.id}>{document.name}
                        <span className='ml-2 text-primary' role="button"
                        tabIndex="0" 
                      onKeyDown={(e) => handleKeyDown(e, downloadDocument, document.id)}
                      onClick={() => downloadDocument(document.id)}>
                      <i className='iconsminds-download-1 mx-1 '  
                        style={{cursor:"pointer"}}/>
                        </span>
                        <span  tabIndex="0" role='button'
                      onKeyDown={(e) => handleKeyDown(e, deleteDocument, document.id)}
                      onClick={() => deleteDocument(document.id)}>
                        
                        
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
                    
                    {/* <h3>{selectedStep.status}</h3> */}
                    {/* <Select
                    components={{ Input: CustomSelectInput }}
                    className="react-select"
                    classNamePrefix="react-select"
                    name="form-field-name"
                    
                    value={selectedStep.status}
                    
                    onChange={(val) => {
                  console.log(val);  
                    setSelectedOption(val);
                    setSelectedStep(val);
                    saveStatus(val.key);
                }}
                    
                      options={selectData}
                    
                  /> */}

                  {(selectedStep.doneBy === 'LAWYER' && isLawyer) || selectedStep.doneBy === 'CLIENT' ? (
                  <Select
                    components={{ Input: CustomSelectInput }}
                    className="react-select"
                    classNamePrefix="react-select"
                    name="form-field-name"
                    value={selectData.find(option => option.value === selectedStep.status)}
                    placeholder={selectedStep.status ? selectedStep.status : 'Select status'}
                    onChange={(val) => {
                      console.log(val);
                      setSelectedStep({ ...selectedStep, status: val.value });
                      saveStatus(val.key);
                    }}
                    options={selectData}
                  />
                ) : (
                  <h3>{selectedStep.status}</h3>
                )}


                  {/* <Select
                    components={{ Input: CustomSelectInput }}
                    className="react-select"
                    classNamePrefix="react-select"
                    name="form-field-name"
                    value={selectData.find(option => option.value === selectedStep.status)}
                    placeholder={selectedStep.status ? selectedStep.status : 'Select status'}
                    onChange={(val) => {
                      console.log(val);
                      setSelectedStep({ ...selectedStep, status: val.value });
                      saveStatus(val.key);
                    }}
                    options={selectData}
                  /> */}
                    

                    
                    
                    </Col>

                    </FormGroup>  



                    {/* <FormGroup className='py-2'>
                    <Col sm={2}>
                      <Label>Status</Label>
                    </Col>
                    <Col>
                    <Select
                  components={{ Input: CustomSelectInput }}
                  className="react-select"
                  classNamePrefix="react-select"
                  name="form-field-name"
                  
                  value={selectedStep.status}
                  
                  onChange={(val) => {
                console.log(val);  
                setSelectedOption(val);
                setSelectedStep(val);
                saveStatus(val.key);
            }}
                
                  options={selectData}
                
              />
              
              </Col>
            </FormGroup> */}
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
