import React,{ useEffect, useState } from 'react'
import axios from 'axios';
import { Colxx } from 'components/common/CustomBootstrap';
import { baseUrl } from 'constants/defaultValues';
import { Card,CardBody ,NavLink} from 'reactstrap';

const LawyerJobList = () => {
    const [joblist,setJobList]=useState("");
    const url=`${baseUrl}/api/lawyer/job/client`;

    // Backend url 
    // const url=`${baseUrl}/api/lawyer/job`;
  //  this file is login by lawyer

    useEffect(()=>{
        const LawyerJobsList=async()=>{
            try {
                const response = await axios.get(url);
                setJobList(response.data);
                
              } catch (error) {
                console.error('Error fetching data:', error);
              }
        }
        LawyerJobsList();
       
    
    },[])
  return (
    <div>
      
      <Colxx  sm="12" md="12" lg="8" xxs="12" className='mx-auto '>
      <h1>My Jobs</h1>
      {joblist&&joblist.map((j)=>{
      // Convert timestamp to Date object
    const createdAtDate = new Date(j.createdAt);
    // Format date and time
    const formattedDate = `${createdAtDate.toLocaleDateString()} ${createdAtDate.toLocaleTimeString()}`;

    // Convert modifiedAt timestamp to Date object
    const modifiedAtDate = new Date(j.modifiedAt);
    // Format modifiedAt date and time
    const formattedModifiedAt = `${modifiedAtDate.toLocaleDateString()} ${modifiedAtDate.toLocaleTimeString()}`;
        return(
            <Card key={j.id} className='my-2'>
        <NavLink href={`/app/jobsdetails/${j.id}`}>
        <CardBody className=''>
        <div className='d-flex justify-content-between'>
        <h2 className='text-primary'>{j.clientName}</h2>
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
      
      })}
      </Colxx>
    </div>
  );
}

export default LawyerJobList
