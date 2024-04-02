import axios from 'axios';
import { Colxx } from 'components/common/CustomBootstrap';
import { baseUrl } from 'constants/defaultValues';
import React, { useEffect, useState } from 'react';
import { Card,CardBody } from 'reactstrap';

const JobList = () => {
    const [joblist,setJobList]=useState("");
    const url=`${baseUrl}/api/lawyer/jobslist`;
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
      <h1>Joblists</h1>
      <Colxx  sm="12" md="12" lg="8" xxs="12" className='mx-auto '>
      {joblist&&joblist.map((j)=>{
        return(
            <Card key={j.jobId} className='my-2'>
        <CardBody>
            <h2>{j.jobName}</h2>
        </CardBody>
       </Card>
        )
      
      })}
      </Colxx>
    </div>
  );
}

export default JobList;
