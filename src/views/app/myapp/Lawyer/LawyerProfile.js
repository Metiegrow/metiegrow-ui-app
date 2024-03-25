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
            {/* <Button color="light" className=" font-weight-semibold mx-2" size='large'>
                <span className='font-weight-semibold text-one'><i className='iconsminds-thunder text-primary'/>{mentorprofiledetails1.achievement}</span>
              </Button> */}
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
           
            {/* <div className='d-flex'>
            {lawyerprofile.services&&lawyerprofile.services.map((skill)=>{
               
                
               return (
               

                <div  key={skill}>
                <Button color="light" className="mb-2 font-weight-semibold mx-2" size='xs'>
                {skill}
              </Button>
                </div>
                
               )
              })}
            </div> */}
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
            
         
            {/* <div className='mt-2'>
            <h2 className='mx-2'>Topics</h2>
              <Button color="light" className="mb-2 font-weight-semibold mx-2" size='xs'>
                Change jobs
              </Button>
              <Button color="light" className="mb-2 font-weight-semibold mx-2" size='xs'>
                Learn a new Skill
              </Button>
              <Button color="light" className="mb-2 font-weight-semibold mx-2" size='xs'>
                Grow your career
              </Button>
            </div> */}
            {/* <div className='mt-2 '>
            <NavLink className=''  >
              <Button outline color="primary" className=" font-weight-semibold  " size='large'>
                <span className='font-weight-semibold  text-one '>Connect</span>
              
               
              </Button>
              </NavLink>
            </div> */}
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
               {/* <div className=''>
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
          
             
             </div>
             
             
                </div>
                <p className='mt-4 text-one'>{lawyerprofile.bio}</p>
               </div> */}
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



      
          
      {/* <Colxx lg={12} className='mt-4'>
      <hr/>
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
             
            <Button color="primary">Purchase</Button>
              
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
             
            <Button color="primary">Purchase</Button>
              
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
            
           <Button color="primary">Purchase</Button>
             
             
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
            
           <Button color="primary">Purchase</Button>
             
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
            

             <Button color="primary">Purchase</Button>
             
           </NavLink>
         </div>
       </div>
     
     </CardBody>
   </Card>
         </Col>
        </Row>
 
      
      </Colxx> */}
      {/* {showAll && (
          <Colxx lg={5}  className="my-4" id="skillsSection">
            <h1>Full Topics</h1>
            <div className='d-flex flex-wrap justify-content-around'>
              {lawyerprofile.services && lawyerprofile.services.map((skill) => (
                <div key={skill}>
                  <Button color="light" className="mb-2 font-weight-semibold mx-2" size='sm'>
                    {skill}
                  </Button>
                </div>
              ))}
            </div>
          </Colxx>
        )} */}
      
     
            <Colxx className='mt-4' lg={12}>
              <h3 className='font-weight-bold'>Reviews</h3>
              <div>
              <h5 className='font-weight-bold'>133 reviews for this gig</h5>
              <div className='d-flex align-items-center'>
              <Rating total={5} rating={4.93} interactive={false} />
         <p className="text-small text-muted mb-0 d-inline-block ml-2">4.93</p>
              </div>
            
        
              </div>
              {/* <Row>
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
                
              </Row> */}
              
              
              

            </Colxx>
          
            <Colxx className="mt-4" lg={12}>
            <hr/>
            {/* <div>
            
            <Card className="d-flex flex-row mb-4">
             
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
              <h2 className='font-weight-bold '>Sathish</h2>
             
                    
                  </div>
                 
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
          </div> */}
          <div className=''>
          {/* <div>
          <NavLink  className="d-flex">
                <ThumbnailLetters
                  rounded
                  small
                  text="Sathish kumar"
                  className="m-4"
                />
              </NavLink>
          </div> */}
          
            {/* <div className='d-flex  justify-content-start'>
            <div>
            <NavLink  className="">
                <ThumbnailLetters
                  rounded
                  small
                  text="Mukesh Kumar"
                  className=""
                />
              </NavLink>
            </div>
             <div className='ml-2'>
             <h6 className='font-weight-bold'>Mukesh Kumar</h6>
              <h6>India</h6>
              
              <div className='d-flex align-items-center my-2'>
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
            </div> */}
           
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
