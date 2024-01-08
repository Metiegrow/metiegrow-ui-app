import { Colxx } from 'components/common/CustomBootstrap';
import React ,{useState,useEffect} from 'react';
import {  Button, NavLink, Row,Card,CardBody,CardSubtitle,CardImg} from 'reactstrap';
import { baseUrl } from 'constants/defaultValues';
import axios from 'axios';


const MentorProfile = () => {
  const url=`${baseUrl}/mentor/profile`;
  const[mentorprofiledetails,setMentorProfileDetails]=useState([]);
  // const [inputkey,setInputKey]=useState('')
 

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
  },[])

  return (
    <div  className='mentor-profile'>
      <div className=''>
   
      {mentorprofiledetails.map((val)=>{
        return(
          <div key={val.id}>
          <h1>{val.category}</h1><br/>
          <h1>{val.twitterHandle}</h1>
          </div>
        )
      })}
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
            <img src="/assets/img/profiles/2.jpg" className=' col-2 mx-2 w-60
             rounded-circle img-thumbnail border    ' alt="" />
            <Button color="light" className=" font-weight-semibold mx-2" size='large'>
                <span className='font-weight-semibold text-one'><i className='iconsminds-thunder text-primary'/>  Quick Responder</span>
              </Button>
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
          <h1 className='font-weight-semibold text-large'>Arun Prasad</h1>
            <h3 className='font-weight-semibold '>UX Designer - Tcs</h3>
            <p  className='text-one font-weight-medium text-primary'>UX Designer for the past 15+ years.
             Teaching UI UX Design for the past 7+ years to more than 100K+ students worldwide.</p>
            <h5 className='font-weight-medium'><i className='simple-icon-location-pin text-primary'/><span className='ml-2'>India</span></h5>
            <h6 className=''><i className='simple-icon-star text-primary '/><span className='ml-2'>5.0 (100reviews)</span></h6>
           <h6 className=''><i className='simple-icon-clock text-primary'/><span className='ml-2'>Last Seen</span></h6>
          </div>
           
        
          <div className='col-7 mt-4'>
            <h2 className='mx-2'>Skills</h2>
            <div>
              <Button color="light" className="mb-2 font-weight-semibold mx-2" size='xs'>
                Skill 1
              </Button>
              <Button color="light" className="mb-2 font-weight-semibold mx-2" size='xs'>
                Skill 2
              </Button>
              <Button color="light" className="mb-2 font-weight-semibold mx-2" size='xs'>
                Skill 3
              </Button>
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
            <p className='text-one font-weight-medium w-40'>I have more than a decade experience in Software Engineering (and related practices including DevOps) 
              and I have been lucky enough to have worked with a bunch of great minds in the big tech giants. 
            I have got a couple of MAANG companies in my kitty and after attending (and cracking) interviews for the</p>
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
