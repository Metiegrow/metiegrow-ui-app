import { Colxx } from 'components/common/CustomBootstrap';
import React ,{useState,useEffect} from 'react';
import {  Button, NavLink, Row,Card,CardBody,CardSubtitle,CardImg} from 'reactstrap';
import { baseUrl } from 'constants/defaultValues';
import axios from 'axios';
import {useParams,useHistory} from "react-router-dom";


const MentorProfile = () => {
  const {mid}=useParams();
  console.log('Mentor Profile ID:', mid);
  // const url=`${baseUrl}/mentor/profile`;
  // const url1=`${baseUrl}/mentor/cards/${mid}`;
  const url=`${baseUrl}/mentorDetails/${mid}`;
 const url1=`${baseUrl}/mentorProfile/${mid}`;
  const[mentorprofiledetails,setMentorProfileDetails]=useState([]);
  const[mentorprofiledetails1,setMentorProfileDetails1]=useState([]);

  const history = useHistory();

  // const handleConnectClick = () => {
  //   // Construct the URL with mentor's name as query parameter
  //   const mentorName = `${mentorprofiledetails.firstName} ${mentorprofiledetails.lastName}`;
  //   const url2 = `/app/calendar?mentorName=${mentorName}`;

  //   // Navigate to the Month component with the mentor's name as a query parameter
  //   history.push(url2);
  // };
  const handleConnectClick = () => {
    // Construct the URL with mentor's ID and name as query parameters
    const mentorId = mentorprofiledetails.id;
    const mentorName = `${mentorprofiledetails.firstName} ${mentorprofiledetails.lastName}`;
    const url2 = `/app/calendar?mentorId=${mentorId}&mentorName=${mentorName}`;

    // Navigate to the Month component with the mentor's ID and name as query parameters
    history.push(url2);
};
  
  useEffect(()=>{
    const mentorProfileDetails = async () => {
      
      try {
        const response = await axios.get(url);
        setMentorProfileDetails(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    mentorProfileDetails();

    const mentorProfile = async () => {
      
      try {
        const response = await axios.get(url1);
        setMentorProfileDetails1(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    mentorProfile();
  },[])



  return (
    <div  className='mentor-profile'>
      <div className=''>
     
        <Colxx sm="12" md="12" lg="12" xxs="12" className=''>
          <div className=''>
           {/* <Colxx className='bg-secondary '>
           <Row >
            <div className='col-2'>
            <h1>image</h1>
            <img src="/assets/img/profiles/2.jpg" alt="" className='rounded-circle img-thumbnail  '/>
            </div>
             
            </Row>
          </Colxx> */}
          <Row className='h-100'>
          <div className='w-100 py-3 position-relative bg-primary d-flex justify-content-between align-items-center'>
          <div className=' '>
            {/* <img src="/assets/img/profiles/2.jpg" className=' col-2 mx-2 w-60
             rounded-circle img-thumbnail border    ' alt="" /> */}
             <img src={mentorprofiledetails.image} className=' col-2 mx-2 w-60
             rounded-circle img-thumbnail border    ' alt="" />
            <Button color="light" className=" font-weight-semibold mx-2" size='large'>
                <span className='font-weight-semibold text-one'><i className='iconsminds-thunder text-primary'/>  Quick Responder</span>
              </Button>
            </div>
            <div>
            <NavLink  onClick={handleConnectClick}>
              <Button color="light" className=" font-weight-semibold mx-2 " size='large'>
                <span className='font-weight-semibold text-primary text-one'>Connect</span>
                {/* <i className='simple-icon-social-linkedin text-primary font-weight-semibold text-one  '/> */}
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
          <h1 className='font-weight-semibold text-xlarge'>{mentorprofiledetails.firstName} {mentorprofiledetails.lastName}</h1>
          <h3 className='text-large  text-muted  '>{mentorprofiledetails.jobTitle}</h3>
            <h2 className='text-one  text-primary'>{mentorprofiledetails.company}</h2>
            <p  className='text-one font-weight-medium text-primary'>{mentorprofiledetails.bio}</p>
            
            <h5 className='font-weight-medium'><i className='simple-icon-location-pin text-primary'/><span className='ml-2'>India</span></h5>
            <h6 className=''><i className='simple-icon-star text-primary '/><span className='ml-2'>{mentorprofiledetails.star} ({mentorprofiledetails.ratings} reviews)</span></h6>
           <h6 className=''><i className='simple-icon-clock text-primary'/><span className='ml-2'>Last Seen</span></h6>
          </div>
           
        
          <div className='col-7 mt-4'>
            <h2 className='mx-2'>Skills</h2>
           
            <div className='d-flex'>
              {mentorprofiledetails.skills&&mentorprofiledetails.skills.map((skill)=>{
               
                
               return (
               

                <div  key={skill}>
                <Button color="light" className="mb-2 font-weight-semibold mx-2" size='xs'>
                {skill}
              </Button>
                </div>
               )
              })}
            </div>
            <div className='mt-2'>
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
            </div>
          </div>
          </Row>
          <hr/>
          <Colxx className='sm="12" md="12" lg="12" xxs="12" mt-5'>
            <Row>
            <div className=''>
            <h1 className='font-weight-semibold text-large'>About</h1>
            <p className='text-one font-weight-medium w-40'>{mentorprofiledetails1.about}</p>
            </div>
             
            </Row>
            <hr/>
            <Colxx className='sm="12" md="12" lg="12" xxs="12" mt-5 '>
              <Row>
              <div className=''>
          <h1>Get to know arun prasad</h1>
          </div>
                {/* <h3 className='font-weight-semibold text-large'>Get to Know Arun Prasad</h3> */}
              </Row>
            </Colxx>
            <Colxx xxs="12">
           
        <Row>
          <Colxx xxs="12" xs="6" lg="4">
          <NavLink href='www.google.com'>
         
        
         
          <Card className="mb-4 w-80">
           
           <div className="position-relative">
             <CardImg
               top
               src="/assets/img/profiles/2.jpg"
               alt="Card image cap"
             />
            
           </div>
           <CardBody>
          
             <h4 className='color-theme-2'>LINK</h4>
             <h4 className='font-weight-semibold text-one'>JOB TITLES DONT MATTER!</h4>
             <CardSubtitle className="mb-4 text-one text-muted">
             Yeah, you read that right. Titles are not something which should
              drive your decision to join a new company.
             </CardSubtitle>
 
          
         
           </CardBody>
         </Card>
         
           
            </NavLink>
          </Colxx>
          <Colxx xxs="12" xs="6" lg="4">
          <NavLink href='www.youtube.com'>
       
            <Card className="mb-4 w-80">
          
              <div className="position-relative">
                <CardImg
                  top
                  src="/assets/img/profiles/2.jpg"
                  alt="Card image cap"
                  className=''
                />
               
              </div>
              <CardBody>
             
                <h4 className='color-theme-2'>VIDEO</h4>
                <h4 className='font-weight-semibold text-one'>Concatenating Strings
                 Mock Interview (Senior MAANG Engineer)
                </h4>
                <CardSubtitle className="mb-4 text-one text-muted">
                Dont leave your software engineering career to chance. 
                Sign up for Exponents SWE interview course today:Concatenating strings is …
                </CardSubtitle>
    
             
            
              </CardBody>
            </Card>
            </NavLink>
            <div id='more'>
             <h1>Full Skills Here</h1> 
            </div>
          </Colxx>
          {/* <Colxx xxs="12" xs="6" lg="4">
            <Card className="mb-4">
              <CardBody>
                <CardSubtitle className="mb-4">
                  Homemade Cheesecake with Fresh Berries and Mint
                </CardSubtitle>
                <CardText className="text-muted text-small mb-0 font-weight-light">
                  09.04.2018
                </CardText>
              </CardBody>
              <div className="position-relative">
                <CardImg
                  bottom
                  src="/assets/img/cards/thumb-1.jpg"
                  alt="Card image cap"
                />
                <Badge
                  color="primary"
                  pill
                  className="position-absolute badge-top-left"
                >
                  NEW
                </Badge>
                <Badge
                  color="secondary"
                  pill
                  className="position-absolute badge-top-left-2"
                >
                  TRENDING
                </Badge>
              </div>
            </Card>
          </Colxx> */}
        </Row>
      </Colxx>
          </Colxx>
          </div>
        </Colxx>
      </div>
    </div>
  );
}

export default MentorProfile;
