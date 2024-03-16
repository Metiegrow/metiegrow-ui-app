import axios from 'axios';
import { Colxx } from 'components/common/CustomBootstrap';
import Rating from 'components/common/Rating';
import { baseUrl } from 'constants/defaultValues';
import React, { useEffect, useState } from 'react';
import { Button,   Card,   CardBody,    Col,   NavLink,   Progress,   Row } from 'reactstrap';
import {useParams} from "react-router-dom";
import data from 'data/profileStatuses';
import ThumbnailLetters from 'components/cards/ThumbnailLetters';
import LawyerTabCard from './LawyerTabCard';





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
    const status=5;
  return (
    <div>
      <Colxx>
        <Row>
        <Colxx lg={6} key={lawyerprofile.id}>
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
              {/* <div>
                
              </div> */}
            </Colxx>
            <Colxx lg={6}>
            <div className='mx-auto  h-100'>
            <LawyerTabCard className='text-center mx-auto'/>
            </div>
        
            </Colxx>
      <Colxx lg={12} className='mt-4'>
        <h5 className='font-weight-bold'>Compare Packages</h5>
        <Row>
          <Col lg={4} className='my-2'>
         
          <Card >
      <CardBody className="pt-5 pb-5 d-flex flex-lg-column flex-md-row flex-sm-row flex-column">
        <div className="price-top-part">
          <i className='' />
          <h2 className="mb-0 font-weight-semibold text-primary text-large mb-4">
            Basic
          </h2>
         
          <p className="text-large mb-2 text-default">₹4500</p>
          <p className="text-muted text-small">
          Number of end products 1
          Free updates
          Forum support
          </p>
          <div className=" ">
            <NavLink >
             
              <h3 className='color-theme-1'>Purchase</h3>
              
            </NavLink>
          </div>
        </div>
        <div className="pl-3 pr-3 pt-3 pb-0 d-flex price-feature-list flex-column flex-grow-1">
          {/* <ul className="list-unstyled">
            {data.features.map((feature, index) => {
              return (
                <li key={index}>
                  <p className="mb-0">{feature}</p>
                </li>
              );
            })}
            ggg
          </ul> */}
          {/* <div className="text-center d-flex">
            <NavLink className='d-flex align-items-center'>
             
              <h5 className='color-theme-1'>Purchase</h5>
         
            </NavLink>
          </div> */}
        
        </div>
      </CardBody>
    </Card>
          </Col>
          <Col lg={4} className='my-2'>
         
          <Card >
      <CardBody className="pt-5 pb-5 d-flex flex-lg-column flex-md-row flex-sm-row flex-column">
        <div className="price-top-part">
          <i className='' />
          <h2 className="mb-0 font-weight-semibold text-primary text-large mb-4">
            Standard
          </h2>
         
          <p className="text-large mb-2 text-default">₹8500</p>
          <p className="text-muted text-small">
          24/5 support
          Number of end products 1
          Two factor authentication
          Free updates
          Forum support


          </p>
          <div className=" ">
            <NavLink >
             
              <h3 className='color-theme-1'>Purchase</h3>
              
            </NavLink>
          </div>
        </div>
        
      </CardBody>
    </Card>
          </Col>
          <Col lg={4} className='my-2'>
         
         <Card >
     <CardBody className="pt-5 pb-5 d-flex flex-lg-column flex-md-row flex-sm-row flex-column">
       <div className="price-top-part">
         <i className='' />
         <h2 className="mb-0 font-weight-semibold text-primary text-large mb-4">
           Premium
         </h2>
        
         <p className="text-large mb-2 text-default">₹12500</p>
         <p className="text-muted text-small">
         24/7 support

          Number of end products 1

          Two factor authentication

          Free updates
          Forum support
         </p>
         <div className=" ">
           <NavLink >
            
             <h3 className='color-theme-1'>Purchase</h3>
             
             
           </NavLink>
         </div>
       </div>
     
     </CardBody>
   </Card>
         </Col>
         <Col lg={4} className='my-2'>
         
         <Card >
     <CardBody className="pt-5 pb-5 d-flex flex-lg-column flex-md-row flex-sm-row flex-column">
       <div className="price-top-part">
         <i className='' />
         <h2 className="mb-0 font-weight-semibold text-primary text-large mb-4">
           Basic
         </h2>
        
         <p className="text-large mb-2 text-default">₹4500</p>
         <p className="text-muted text-small">
         Number of end products 1
         Free updates
         Forum support
         </p>
         <div className=" ">
           <NavLink >
            
             <h3 className='color-theme-1'>Purchase</h3>
             
           </NavLink>
         </div>
       </div>
       <div className="pl-3 pr-3 pt-3 pb-0 d-flex price-feature-list flex-column flex-grow-1">
         {/* <ul className="list-unstyled">
           {data.features.map((feature, index) => {
             return (
               <li key={index}>
                 <p className="mb-0">{feature}</p>
               </li>
             );
           })}
           ggg
         </ul> */}
         {/* <div className="text-center d-flex">
           <NavLink className='d-flex align-items-center'>
            
             <h5 className='color-theme-1'>Purchase</h5>
        
           </NavLink>
         </div> */}
       
       </div>
     </CardBody>
   </Card>
         </Col>
         <Col lg={4} className='my-2'>
         
         <Card >
     <CardBody className="pt-5 pb-5 d-flex flex-lg-column flex-md-row flex-sm-row flex-column">
       <div className="price-top-part">
         <i className='' />
         <h2 className="mb-0 font-weight-semibold text-primary text-large mb-4">
           Basic
         </h2>
        
         <p className="text-large mb-2 text-default">₹4500</p>
         <p className="text-muted text-small">
         Number of end products 1
         Free updates
         Forum support
         </p>
         <div className=" ">
           <NavLink >
            
             <h3 className='color-theme-1'>Purchase</h3>
             
           </NavLink>
         </div>
       </div>
       <div className="pl-3 pr-3 pt-3 pb-0 d-flex price-feature-list flex-column flex-grow-1">
         {/* <ul className="list-unstyled">
           {data.features.map((feature, index) => {
             return (
               <li key={index}>
                 <p className="mb-0">{feature}</p>
               </li>
             );
           })}
           ggg
         </ul> */}
         {/* <div className="text-center d-flex">
           <NavLink className='d-flex align-items-center'>
            
             <h5 className='color-theme-1'>Purchase</h5>
        
           </NavLink>
         </div> */}
       
       </div>
     </CardBody>
   </Card>
         </Col>
        </Row>
 
      
      </Colxx>
            <Colxx className='mt-4' lg={12}>
              <h3 className='font-weight-bold'>Reviews</h3>
              <div>
              <h5 className='font-weight-bold'>133 reviews for this gig</h5>
              <div className='d-flex align-items-center'>
              <Rating total={5} rating={4.93} interactive={false} />
         <p className="text-small text-muted mb-0 d-inline-block ml-2">4.93</p>
              </div>
            
        
              </div>
              <Row>
                <Col  lg={5} className='mt-4'>
                <Card >
      <CardBody>
        
        {data.map((s) => {
          return (
            <div key={s.total} className="mb-4">
              <p className="mb-2">
                {s.title}
                <span className="float-right text-muted">
                  {s.status}/{s.total}
                </span>
              </p>
              <Progress value={(s.status / s.total) * 100} />
            </div>
          );
        })}
        <div  className="mb-4">
              
              <p className="mb-2">
                title
                <span className="float-right text-muted">
                 5stars
                </span>
              </p>
              <Progress value={(status / 5) * 100} />
              
            </div>
      </CardBody>
    </Card>
                </Col>
                
              </Row>
              
              
              

            </Colxx>
         
            <Colxx className="mt-4" lg={5}>
            
            <div>
            
            <Card className="d-flex flex-row mb-4">
              {/* <NavLink  className="d-flex">
                <ThumbnailLetters
                  rounded
                  small
                  text="Sarah Kortney"
                  className="m-4"
                />
              </NavLink> */}
              <div className="">
                <CardBody className=" ">
                  <div className="">
                  <div className='d-flex align-items-center justify-content-between '>
                  <NavLink  className="d-flex">
                <ThumbnailLetters
                  rounded
                  small
                  text="Sarah Kortney"
                  className="m-4"
                />
              </NavLink>
              <h2 className='fomt-weight-bold '>Sathish</h2>
             
                    
                  </div>
                  {/* old */}
                    {/* <h2 className='fomt-weight-bold '>Sathish</h2> */}
                    <h5>India</h5>
                    <div className='d-flex align-items-center'>
                    <Rating total={5} rating={4} interactive={false} />
                    <p className="text-small  mb-0 d-inline-block ml-2">4</p>
                    </div>
                
                    <p>Great service as usual</p>
                    <div className='d-flex font-weight-medium'>
                    <p>Helpful?</p>
                    <div className='d-flex '>
                    <span className=' ml-2'><i className='simple-icon-like mr-2'/>yes</span>
                     <span className=' ml-2'><i className='simple-icon-dislike mr-2'/>no</span>
                    </div>
                   
                    </div>
                 
                  </div>
                </CardBody>
              </div>
            </Card>
          </div>
            </Colxx>
         
        </Row>
      </Colxx>
    </div>
  );
}

export default LawyerProfile;
