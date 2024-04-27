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
    // const [isFixed, setIsFixed] = useState(false);
    const toggleShowAll = () => {
      setShowAll(!showAll);
    };
    const url=`${baseUrl}/lawyerProfile/${pid}`;

    // backend lawyerprofile url 
   
    // const url=`${baseUrl}/api/lawyer/${pid}`;

    const reviewURL=`${baseUrl}/lawyerReviews`;
    // backend  url
    // const reviewURL=`${baseUrl}/api/law/rating/${pid}`;

    const packageURL=`${baseUrl}/lawyerPackages`;
    // backend url 

    // const packageURL=`${baseUrl}/api/lawyer/${pid}/package`
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
              // const lawyerReviews = response.data.filter(review => review.lawyerId === parseInt(pid, 10)); // Specify radix 10
              setReviews(response.data);
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


//     useEffect(() => {
//       const handleScroll = () => {
//           const fixedPositionStart = 100; // The scroll position (in pixels) to fix the tab
//           setIsFixed(window.scrollY > fixedPositionStart);
//       };

//       window.addEventListener('scroll', handleScroll);
//       return () => {
//           window.removeEventListener('scroll', handleScroll);
//       };
//   }, []);

//   const fixedTabCardStyle = {
//     position: 'fixed',
//     top: '20%',  // Adjust this value based on your needs
//     right: '20px', // Adjust the distance from the right edge
//     width: '500px', // Adjust the width as needed
//     zIndex: 1000 // Ensure it sits above other content
// };

    const remainingSkillsCount = lawyerprofile.services ? lawyerprofile.services.length - 3 : 0;

  return (
    <div>
    


      <div>
      <div className='w-100 py-3 position-relative bg-primary d-flex justify-content-between align-items-center'>
          <div className=' '>
            {/* <img src="/assets/img/profiles/2.jpg" className=' col-2 mx-2 w-60
             rounded-circle img-thumbnail border    ' alt="" /> */}
             {/* <img src={lawyerprofile.image} className=' col-2 mx-2 w-60
             rounded-circle img-thumbnail border    ' alt="" /> */}
             <img 
              src={lawyerprofile.image} 
              className='col-2 col-sm-4 col-xs-4  mx-2 mx-sm-2 w-100 col-lg-2 col-xl-2 rounded-circle img-thumbnail border' 
              alt="" 
            />
       
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
      </div>
     <Row>
      <Colxx>
   
          <div className=' mt-4'>
          <h1 className='font-weight-semibold text-xlarge'>{lawyerprofile.firstName} {lawyerprofile.lastName}</h1>
          {/* <h1 className='font-weight-semibold text-xlarge'>{mentorprofiledetails1.firstName} {mentorprofiledetails1.lastName}</h1> */}
          <h3 className='text-large  text-muted  '>{lawyerprofile.jobTitle}</h3>
            <h2 className='text-one  text-primary'>{lawyerprofile.company}</h2>
            <p  className='text-one font-weight-medium text-primary'>{lawyerprofile.bio}</p>
            
            <h5 className='font-weight-medium'><i className='simple-icon-location-pin text-primary'/><span className='ml-2'>{lawyerprofile.location}</span></h5>
            <h6 className=''><i className='simple-icon-star text-primary '/><span className='ml-2'>{lawyerprofile.star} ({lawyerprofile.ratings} reviews)</span></h6>
           <h6 className=''><i className='simple-icon-clock text-primary'/><span className='ml-2'>Last Seen</span></h6>
          </div>
         
          <div className=' mt-4'>
            <h2 className='mx-2'>Topics</h2>
           
           
            <div className='d-flex align-items-center flex-wrap'>
            <div className='d-flex'>
            {lawyerprofile.services && lawyerprofile.services.slice(0, 3).map((skill) => (
            <div key={skill}>
              <Button color="light" className="mb-2 font-weight-semibold mx-2" size='xs'>
                {skill.serviceName}
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
          <div   className='mt-2 d-md-block d-sm-block d-lg-none d-xl-none  ' >
        <LawyerTabCard  />
    </div>
        
          <div className='mt-4' >
                    <h2 className='text-large'>About</h2>
                    <p className='text-one'>{lawyerprofile.about}</p>
                </div>
                <Colxx lg={10}   className="my-4" id="skillsSection">
       
            <h1>Full Topics</h1>
            <div className='d-flex flex-wrap '>
              {lawyerprofile.services && lawyerprofile.services.map((skill) => (
                <div key={skill}>
                  <Button color="light" className="mb-2 font-weight-semibold mx-2" size='sm'>
                    {skill.serviceName}
                  </Button>
                </div>
              ))}
            </div>
          </Colxx>
          
         <Colxx lg={12} xl={12}  className='mt-4'>
         <hr/>
  <h5 className='font-weight-bold'>Compare Packages</h5>
  <Row className='d-flex'>
    {packages && packages.map((pack) => (
      <Col lg={6}  key={pack.id} className='my-2'>
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
    {/* <Col lg={6}  key={packages.id} className='my-2'>
        <Card className='pt-5 pb-5 d-flex'>
          <CardBody className='pt-5 pb-5'>
            <div className='price-top-part'>
              <i className='' />
              <h2 className='mb-0 font-weight-semibold text-primary text-large mb-4'>
                {packages.title}
              </h2>
              <p className='text-large mb-2 text-default'>₹ {packages.amount}</p>
              <p className='text-muted text-small'>{packages.description}</p>
              <div className=''>
                <NavLink>
                  <Button color='primary'>Purchase</Button>
                </NavLink>
              </div>
            </div>
          </CardBody>
        </Card>
      </Col> */}
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
                  text={rv.name}
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
              <p>{rv.feedBack}</p>
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
               {/* <div className='d-flex  justify-content-start my-4' key={reviews.reviewerId}>
               
               <div>
             
               <NavLink  className="">
                   <ThumbnailLetters
                     rounded
                     small
                     text={reviews.imgText}
                     className=""
                   />
                   {reviews && <ThumbnailLetters rounded small text={reviews.name} />}

                 </NavLink>
               </div>
                <div className='ml-2'>
                <h6 className='font-weight-bold'>{reviews.name}</h6>
                 <h6>{reviews.country}</h6>
                 
                 <div className='d-flex align-items-center my-2'>
                 <Rating total={5} rating={reviews.star} interactive={false} />
                 <p className="text-small  mb-0 d-inline-block ml-2">{reviews.star}</p>
                 </div>
                 <p>{reviews.feedBack}</p>
                 <div className='d-flex font-weight-medium' >
                       <p>Helpful?</p>
                       <div className='d-flex '>
                       <span className=' ml-2'><i className='simple-icon-like mr-2'/>yes</span>
                        <span className=' ml-2'><i className='simple-icon-dislike mr-2'/>no</span>
                       </div>
                       <hr />
                       </div>
                </div>
                
              
             
               </div> */}
           
          </div>
            
            </Colxx>
      </Colxx>
      <Colxx className='mt-4' lg={6} xl={6} md={12}> 
      {/* {isFixed ? (
    <div style={fixedTabCardStyle}>
        <LawyerTabCard />
    </div>
) : (
    <div style={{width:'500px',position:'fixed',top:'40%',right:'20px'}}>
        <LawyerTabCard />
    </div>
)} */}
<div  style={{width:"40%",position:'fixed',top:'40%',right:'20px'}} className='mt-2 d-lg-block d-xl-block d-none'>
        <LawyerTabCard pid={pid}/>
    </div>
    {/* <div    className='mt-2 d-md-block d-sm-block d-lg-none d-xl-none bg-primary'>
        <LawyerTabCard />
    </div> */}
      </Colxx>
     </Row>
    </div>
  );
}

export default LawyerProfile;