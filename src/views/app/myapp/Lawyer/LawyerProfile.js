import axios from 'axios';
import { Colxx } from 'components/common/CustomBootstrap';
import Rating from 'components/common/Rating';
import { baseUrl } from 'constants/defaultValues';
import React, { useEffect, useState } from 'react';
import { Button, Row } from 'reactstrap';
import {useParams} from "react-router-dom";


const LawyerProfile = () => {
  const {pid}=useParams();
    const[lawyerprofile,setLawyerProfile]=useState('');
    const url=`${baseUrl}/lawyerProfile/${pid}`;
    useEffect(()=>{
        const ProfileLawyer=async()=>{
            try {
                const response = await axios.get(url);
                setLawyerProfile(response.data);
              } catch (error) {
                console.error('Error fetching data:', error);
              }
        }
        ProfileLawyer();
    },[])
    
  return (
    <div>
      <Colxx>
        <Row>
       
        <Colxx lg={9} key={lawyerprofile.id}>
               <div className=''>
               <div >
                <h1 className='text-large font-weight-semibold'>{lawyerprofile.topic}</h1>
                <div  className='d-flex'>
                <span className='font-weight-semibold '><Rating total={5} rating={lawyerprofile.star} interactive={false} /></span>
                    <span className='font-weight-semibold text-one'>{lawyerprofile.star}</span> 
                    <span className='text-one'> ({lawyerprofile.ratings} reviews)</span> 
                </div>
             
                </div>
                <div className='d-flex mt-4 align-items-center'>
                <img src={lawyerprofile.image} className=' col-3 mx-2 w-100
             rounded-circle img-thumbnail border    ' alt="" />
         
             <div  className='d-flex flex-column ml-2'>
             <h2 className='text-large font-weight-semibold '>{lawyerprofile.firstName} {lawyerprofile.lastName}</h2>
             <div className='d-flex'>
             <h5 className='font-weight-medium'><i className='simple-icon-location-pin text-primary'/><span className='ml-2'>{lawyerprofile.location}</span></h5>
             <h5 className='font-weight-medium'><i className='simple-icon-location-pin text-primary ml-2'/><span className='ml-2'>I speak {lawyerprofile.languages}</span></h5>
             
             </div>
             <div className='d-flex'>
              {lawyerprofile.services&&lawyerprofile.services.map((skill)=>{
               
                
               return (
               

                <div  key={skill}>
                <Button color="light" className="mb-2 font-weight-semibold mx-2" size='xs'>
                {skill}
              </Button>
                </div>
               )
              })}
            </div>
            {/* <div className='d-flex mt-2'>
              
               
        
               

                
                <Button color="light" className="mb-2 font-weight-semibold mx-2" size='xs'>
                 skill 1
              </Button>
              <Button color="light" className="mb-2 font-weight-semibold mx-2" size='xs'>
                 skill 2
              </Button>
          
              
            </div> */}
             
             </div>
             
             
                </div>
                <p className='mt-4 text-one'>{lawyerprofile.bio}</p>
               </div>
                <div className='mt-4' >
                    <h2 className='text-large'>About</h2>
                    <p className='text-one'>{lawyerprofile.about}</p>
                </div>
            </Colxx>
            
        </Row>
      </Colxx>
    </div>
  );
}

export default LawyerProfile;
