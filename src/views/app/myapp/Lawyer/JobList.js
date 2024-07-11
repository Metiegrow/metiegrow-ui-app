import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Colxx } from 'components/common/CustomBootstrap';
import { baseUrl } from 'constants/defaultValues';
import {  Card,CardBody } from 'reactstrap';
import { useHistory } from 'react-router-dom';
import ThumbnailLetters from 'components/cards/ThumbnailLetters';
import ToasterComponent from '../notifications/ToasterComponent';



const JobList = () => {
    const [joblist,setJobList]=useState('');
    // const url=`${baseUrl}/api/lawyer/job/client`;

    // Backend url 
    const url=`${baseUrl}/api/lawyer/job/client`;
    const history = useHistory();
  // this file is logged by client
    useEffect(()=>{
        const LawyerJobsList=async()=>{
            try {
                const response = await axios.get(url);
                setJobList(response.data);
                
              } catch (error) {
                if(error.response){
                  ToasterComponent('error', error.response.data.statuses);
                } else{
                  console.error('Error fetching data:', error);
                }
                
              }
        }
        LawyerJobsList();
       
    
    },[url])
    console.log('Job list state:', joblist);


    const handleKeyPress = (event, path) => {
      if (event.key === 'Enter' || event.key === ' ') {
        history.push(path);
      }
    };
  return (
    <div>
      
      {/* <Colxx  sm="12" md="12" lg="8" xxs="12" className='mx-auto '> */}
      {/* <h1>My Jobs</h1> */}
      
       {/* {joblist&&joblist.map((j)=>{
      
    const createdAtDate = new Date(j.createdAt);
  
    const formattedDate = `${createdAtDate.toLocaleDateString()} ${createdAtDate.toLocaleTimeString()}`;

    
    const modifiedAtDate = new Date(j.modifiedAt);
    
    const formattedModifiedAt = `${modifiedAtDate.toLocaleDateString()} ${modifiedAtDate.toLocaleTimeString()}`;
        return(
            <Card key={j.id} className='my-2'>
        <NavLink href={`/app/jobsdetails/${j.id}`}>
        <CardBody className=''>
        <div className='d-flex justify-content-between'>
        <h2 className='text-primary'>{j.lawyerName}</h2>
            <h4 className=''>Job Name: <span className='font-weight-bold'>{j.jobName}</span></h4>
        </div>
        <div className='d-flex justify-content-between'>
        
        <h4> Created at: <span className='font-weight-bold'>{formattedDate}</span></h4>
            <h4>Modified at: <span className='font-weight-bold'>{formattedModifiedAt}</span></h4>
        </div>
            
        </CardBody>
        </NavLink>
       
       </Card>
        )
      
      })
       } */}

       {/* {joblist&&joblist.length > 0 ? (
        joblist.map((j)=>{
      
      const createdAtDate = new Date(j.createdAt);
    
      const formattedDate = `${createdAtDate.toLocaleDateString()} ${createdAtDate.toLocaleTimeString()}`;
  
      
      const modifiedAtDate = new Date(j.modifiedAt);
      
      const formattedModifiedAt = `${modifiedAtDate.toLocaleDateString()} ${modifiedAtDate.toLocaleTimeString()}`;
          return(
              <Card key={j.id} className='my-2' style={{cursor:"pointer"}}
              onClick={() => history.push(`/app/jobsdetails/${j.id}`, { lawyerName: j.lawyerName ,lawyerId:j.lawyerId})}
              >
          
          
          
          <CardBody className=''>
          <div className='d-flex justify-content-between'>
          <h2 className='text-primary'>{j.lawyerName}</h2>
              <h4 className=''>Job Name: <span className='font-weight-bold'>{j.jobName}</span></h4>
          </div>
          <div className='d-flex justify-content-between'>
          
          <h4> Created at: <span className='font-weight-bold'>{formattedDate}</span></h4>
              <h4>Modified at: <span className='font-weight-bold'>{formattedModifiedAt}</span></h4>
          </div>
              
          </CardBody>
         
         
         </Card>
          )
        
        })
         
       ):(
        <div>
        <Card>
          <CardBody>
          <h1>There is no joblists</h1>
          </CardBody>
        </Card>
       
        
        </div>
       
       )
       } */}
     
      {/* </Colxx> */}

      <Colxx sm="12" md="12" lg="8" xxs="12" className='mx-auto'> 

<h1 className='font-weight-bold'>In Progress Jobs</h1>
{joblist && joblist.inProgress && joblist.inProgress.length > 0 ? (
  joblist.inProgress.map((j) => {
    const createdAtDate = new Date(j.createdAt);
    const formattedDate = `${createdAtDate.toLocaleDateString()} ${createdAtDate.toLocaleTimeString()}`;

    const modifiedAtDate = new Date(j.modifiedAt);
    const formattedModifiedAt = `${modifiedAtDate.toLocaleDateString()} ${modifiedAtDate.toLocaleTimeString()}`;

    return (
      <Card key={j.id} className='my-2'  style={{cursor:"pointer"}}   
      onClick={() => history.push(`/app/jobsdetails/${j.id}`, { lawyerName: j.lawyerName ,lawyerId:j.lawyerId})}>
      <CardBody>
      <div className='d-flex justify-content-between flex-wrap'>
      <div className='d-flex flex-column flex-wrap'>
      <div className='d-flex align-items-center flex-wrap'>
        <div className=''>
       <ThumbnailLetters
        rounded
        text={j.lawyerName}
        className="border border-1 mr-3 " 
        />
       </div> 
       <div className='d-flex flex-column '>
        <div  role="button"
       tabIndex={0}
       onClick={() => history.push(`/app/lawyerprofile/${j.lawyerId}`, { lawyerId: j.lawyerId })}
       onKeyPress={(event) => handleKeyPress(event, `/app/lawyerprofile/${j.lawyerId}`)}
      style={{ cursor: 'pointer' }}>
         <h2 className='text-primary'>{j.lawyerName}</h2>
        </div>
      
       <h4>Job Name:<span className='font-weight-semibold'> {j.jobName}</span></h4>
       </div>
        </div>

    
      
      
      </div>
       
        <div className='d-flex flex-column mt-sm-2'>
        <h4 >Status:<span className='font-weight-semibold'> {j.status}</span> </h4>
        <h4>Created At:<span className='text-muted'> {formattedDate}</span> </h4>
        <h4>Modified At:<span className='text-muted'> {formattedModifiedAt}</span></h4>
        </div>
      </div>
      
        
      </CardBody>
         
      </Card>
    );
  })
) : (
  <div>
    <Card>
      <CardBody>
        <h2 className='text-center'>No In Progress Jobs</h2>
      </CardBody>
    </Card>
  </div>
)}
</Colxx>



<Colxx sm="12" md="12" lg="8" xxs="12" className='mx-auto'>
  <h1 className='font-weight-bold my-2'>Completed Jobs</h1>
  {joblist && joblist.completed && joblist.completed.length > 0 ? (
    joblist.completed.map((j) => {
      const createdAtDate = new Date(j.createdAt);
      const formattedDate = `${createdAtDate.toLocaleDateString()} ${createdAtDate.toLocaleTimeString()}`;

      const modifiedAtDate = new Date(j.modifiedAt);
      const formattedModifiedAt = `${modifiedAtDate.toLocaleDateString()} ${modifiedAtDate.toLocaleTimeString()}`;

      return (
        <Card key={j.id} className='my-2'  style={{cursor:"pointer"}}   
      onClick={() => history.push(`/app/jobsdetails/${j.id}`, { lawyerName: j.lawyerName ,lawyerId:j.lawyerId})}>
      <CardBody>
      <div className='d-flex justify-content-between flex-wrap'>
      <div className='d-flex align-items-center flex-wrap'>
        <div className=''>
       <ThumbnailLetters
        rounded
        text={j.lawyerName}
        className="border border-1 mr-3 " 
        />
       </div> 
       <div className='d-flex flex-column '>
       
       <h2 className='text-primary'>{j.lawyerName}</h2>
       <h4>Job Name:<span className='font-weight-semibold'> {j.jobName}</span></h4>
       </div>
        </div>
      
       
        <div className='d-flex flex-column mt-sm-2'>
        <h4 >Status:<span className='font-weight-semibold'> {j.status}</span> </h4>
        <h4>Created At:<span className='text-muted'> {formattedDate}</span> </h4>
        <h4>Modified At:<span className='text-muted'> {formattedModifiedAt}</span></h4>
        </div>
      </div>
      
        
      </CardBody>
         
      </Card>
      );
    })
  ) : (
    <div>
    <Card>
      <CardBody>
        <h2 className='text-center'>No Completed Jobs</h2>
      </CardBody>
    </Card>
    </div>
  )}
</Colxx>
    </div>
  );
}

export default JobList;
