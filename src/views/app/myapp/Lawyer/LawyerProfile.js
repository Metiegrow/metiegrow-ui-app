import axios from 'axios';
import { Colxx } from 'components/common/CustomBootstrap';
import Rating from 'components/common/Rating';
import { baseUrl } from 'constants/defaultValues';
import React, { useEffect, useState } from 'react';
import { Button,   Card,   CardBody,    Col,   NavLink,Row } from 'reactstrap';
import {useParams} from "react-router-dom";
// import data from 'data/profileStatuses';
import ThumbnailLetters from 'components/cards/ThumbnailLetters';
import LawyerTabCard from './LawyerTabCard';





const LawyerProfile = () => {
  const {pid}=useParams();
    const[lawyerprofile,setLawyerProfile]=useState('');
    const[reviews,setReviews]=useState('');
    const [packages,setPackages]=useState('');
    const [showAll, setShowAll] = useState(false);
    const toggleShowAll = () => {
      setShowAll(!showAll);
    };
    const url=`${baseUrl}/lawyerProfile/${pid}`;
    const reviewURL=`${baseUrl}/user/reviews`;
    const packageURL=`${baseUrl}/lawyerPackages`;
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
        const UserReviewsToLawyer=async()=>{
          try {
              const response = await axios.get(reviewURL);
              // setReviews(response.data);
              const lawyerReviews = response.data.filter(review => review.lawyerId === parseInt(pid, 10)); // Specify radix 10
              setReviews(lawyerReviews);
            } catch (error) {
              console.error('Error fetching data:', error);
            }
      }
      UserReviewsToLawyer();
      const LawyerPackage=async()=>{
        try {
            const response = await axios.get(packageURL);
            setPackages(response.data);
            
           
          } catch (error) {
            console.error('Error fetching data:', error);
          }
    }
    LawyerPackage();
    },[])


    useEffect(() => {
      if (showAll) {
        // Scroll to the skills section when showAll becomes true
        document.getElementById('skillsSection').scrollIntoView();
      }
    }, [showAll]);
    // const status=5;
    const remainingSkillsCount = lawyerprofile.services ? lawyerprofile.services.length - 3 : 0;

  return (
    <div>
    {/* from mentor profile */}
      <Colxx sm="12" md="12" lg="12" xxs="12" className=''>
        <Row>
        <Row className='h-100'>
          <div className='w-100 py-3 position-relative bg-primary d-flex justify-content-between align-items-center'>
          <div className=' '>
            {/* <img src="/assets/img/profiles/2.jpg" className=' col-2 mx-2 w-60
             rounded-circle img-thumbnail border    ' alt="" /> */}
             <img src={lawyerprofile.image} className=' col-2 mx-2 w-60
             rounded-circle img-thumbnail border    ' alt="" />
       
            </div>
            <div>
            <NavLink  >
              <Button color="light" className=" font-weight-semibold mx-2 " size='large'>
                <span className='font-weight-semibold text-primary text-one'>Connect</span>
                
              </Button>
              </NavLink>
            </div>
            <div>
              <NavLink>
              <Button color="light" className=" font-weight-semibold mx-2 " size='large'>
             
                <i className='simple-icon-social-linkedin text-primary font-weight-semibold text-one  '/>
              </Button>
              </NavLink>
            </div>
          </div>
          <div className='col-5 mt-4'>
          <h1 className='font-weight-semibold text-xlarge'>{lawyerprofile.firstName} {lawyerprofile.lastName}</h1>
          {/* <h1 className='font-weight-semibold text-xlarge'>{mentorprofiledetails1.firstName} {mentorprofiledetails1.lastName}</h1> */}
          <h3 className='text-large  text-muted  '>{lawyerprofile.jobTitle}</h3>
            <h2 className='text-one  text-primary'>{lawyerprofile.company}</h2>
            <p  className='text-one font-weight-medium text-primary'>{lawyerprofile.bio}</p>
            
            <h5 className='font-weight-medium'><i className='simple-icon-location-pin text-primary'/><span className='ml-2'>{lawyerprofile.location}</span></h5>
            <h6 className=''><i className='simple-icon-star text-primary '/><span className='ml-2'>{lawyerprofile.star} ({lawyerprofile.ratings} reviews)</span></h6>
           <h6 className=''><i className='simple-icon-clock text-primary'/><span className='ml-2'>Last Seen</span></h6>
          </div>
         
          <div className='col-7 mt-4'>
            <h2 className='mx-2'>Topics</h2>
           
           
            <div className='d-flex align-items-center'>
            <div className='d-flex'>
            {lawyerprofile.services && lawyerprofile.services.slice(0, 3).map((skill) => (
            <div key={skill}>
              <Button color="light" className="mb-2 font-weight-semibold mx-2" size='xs'>
                {skill}
              </Button>
            </div>
          ))}
        </div>
        {lawyerprofile.services && lawyerprofile.services.length > 3 && (
          <div className=''>
            <Button color="link" className='text-one font-weight-bold ' style={{textDecoration:"underline"}} onClick={toggleShowAll}>
              + {remainingSkillsCount}more
           
            </Button>
          </div>
        )}
            </div>
            
         
           
          </div>
          </Row>
        </Row>
      </Colxx>
      {/* from mentor profile ends */}
      <hr/>
      <Colxx>
        <Row>
         <Row>
         <Colxx lg={5} key={lawyerprofile.id}>
              
                <div className='mt-4' >
                    <h2 className='text-large'>About</h2>
                    <p className='text-one'>{lawyerprofile.about}</p>
                </div>
               
            </Colxx>
          
            <Colxx lg={6} className='ml-2'>
            <div className='mx-auto   h-100'>
            <LawyerTabCard className='text-center mx-auto '/>
            </div>
           
            </Colxx>
           
         </Row>
        
         <Colxx lg={5}  className="my-4" id="skillsSection">
       
            <h1>Full Topics</h1>
            <div className='d-flex flex-wrap '>
              {lawyerprofile.services && lawyerprofile.services.map((skill) => (
                <div key={skill}>
                  <Button color="light" className="mb-2 font-weight-semibold mx-2" size='sm'>
                    {skill}
                  </Button>
                </div>
              ))}
            </div>
          </Colxx>
          
         <Colxx lg={12} className='mt-4'>
         <hr/>
  <h5 className='font-weight-bold'>Compare Packages</h5>
  <Row className='d-flex'>
    {packages && packages.map((pack) => (
      <Col lg={4} key={pack.id} className='my-2'>
        <Card className='pt-5 pb-5 d-flex'>
          <CardBody className='pt-5 pb-5'>
            <div className='price-top-part'>
              <i className='' />
              <h2 className='mb-0 font-weight-semibold text-primary text-large mb-4'>
                {pack.title}
              </h2>
              <p className='text-large mb-2 text-default'>₹ {pack.amount}</p>
              <p className='text-muted text-small'>{pack.description}</p>
              <div className=''>
                <NavLink>
                  <Button color='primary'>Purchase</Button>
                </NavLink>
              </div>
            </div>
          </CardBody>
        </Card>
      </Col>
    ))}
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
             
              
              
              

            </Colxx>
          
            <Colxx className="mt-4" lg={12}>
            <hr/>
            
          <div className=''>
         
           
               {reviews&&reviews.map((rv)=>{
                <hr/>
               return (
                 
                  <div className='d-flex  justify-content-start my-4' key={rv.reviewerId}>
               
            <div>
          
            <NavLink  className="">
                <ThumbnailLetters
                  rounded
                  small
                  text={rv.imgText}
                  className=""
                />
              </NavLink>
            </div>
             <div className='ml-2'>
             <h6 className='font-weight-bold'>{rv.name}</h6>
              <h6>{rv.country}</h6>
              
              <div className='d-flex align-items-center my-2'>
              <Rating total={5} rating={rv.star} interactive={false} />
              <p className="text-small  mb-0 d-inline-block ml-2">{rv.star}</p>
              </div>
              <p>{rv.reviewMsg}</p>
              <div className='d-flex font-weight-medium' >
                    <p>Helpful?</p>
                    <div className='d-flex '>
                    <span className=' ml-2'><i className='simple-icon-like mr-2'/>yes</span>
                     <span className=' ml-2'><i className='simple-icon-dislike mr-2'/>no</span>
                    </div>
                    <hr />
                    </div>
             </div>
             
           
          
            </div>
          
           
               )
               
            
               })}
           
          </div>
            
            </Colxx>
           
        </Row>
      </Colxx>
     
    </div>
  );
}

export default LawyerProfile;