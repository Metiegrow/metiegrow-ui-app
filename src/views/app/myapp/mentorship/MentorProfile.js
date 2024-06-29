import { Colxx } from 'components/common/CustomBootstrap';
import React ,{useState,useEffect} from 'react';
import {  Button,Row} from 'reactstrap';
import { baseUrl } from 'constants/defaultValues';
import axios from 'axios';
import {useParams,useHistory} from "react-router-dom";
import MentorTabCard from './MentorTabCard';
import ReviewsComponent from '../Reviews/ReviewsComponent';

const MentorProfile = () => {
  const {mid}=useParams();
  // console.log('Mentor Profile ID:', mid);
  // const url=`${baseUrl}/mentor/profile`;
  // const url1=`${baseUrl}/mentor/cards/${mid}`;
  // const url=`${baseUrl}/mentorDetails/${mid}`;
//  const url1=`${baseUrl}/mentorProfile/${mid}`;

//  To change url to backend please uncomment the below line
 const url1=`${baseUrl}/api/mentor/${mid}`
 const ratingUrl=`${baseUrl}/api/mentorship/rating/meta/${mid}`


//  const url1=`${baseUrl}/mentor/myprofile`;
  // const[mentorprofiledetails,setMentorProfileDetails]=useState([]);
  const[mentorprofiledetails1,setMentorProfileDetails1]=useState([]);
  const[reviews,setReviews]=useState('');

  const history = useHistory();

  const [showAll, setShowAll] = useState(false);
  const toggleShowAll = () => {
    setShowAll(!showAll);
  };
 

  // const handleConnectClick = () => {
  //   // Construct the URL with mentor's name as query parameter
  //   const mentorName = `${mentorprofiledetails.firstName} ${mentorprofiledetails.lastName}`;
  //   const url2 = `/app/calendar?mentorName=${mentorName}`;

  //   // Navigate to the Month component with the mentor's name as a query parameter
  //   history.push(url2);
  // };
  const handleConnectClick = () => {
    // Construct the URL with mentor's ID and name as query parameters
    const mentorId = mentorprofiledetails1.id;
    const mentorName = `${mentorprofiledetails1.firstName} ${mentorprofiledetails1.lastName}`;
    const url2 = `/app/calendar?mentorId=${mentorId}&mentorName=${mentorName}`;

    // Navigate to the Month component with the mentor's ID and name as query parameters
    history.push(url2);
};
  
  useEffect(()=>{
    // const mentorProfileDetails = async () => {
      
    //   try {
    //     const response = await axios.get(url);
    //     setMentorProfileDetails(response.data);
    //   } catch (error) {
    //     console.error('Error fetching data:', error);
    //   }
    // };
    // mentorProfileDetails();
    const mentorReviews = async () => {
      
      try {
        const response = await axios.get(ratingUrl);
        setReviews(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    mentorReviews();

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

  useEffect(() => {
    if (showAll) {
      // Scroll to the skills section when showAll becomes true
      document.getElementById('skillsSection').scrollIntoView();
    }
  }, [showAll]);

  const remainingSkillsCount = mentorprofiledetails1.skills ?  mentorprofiledetails1.skills.length - 3 : 0;
  const handleLinkedInClick = () => {
    // Assuming mentorprofiledetails1 contains the LinkedIn URL of the mentor
    const linkedInUrl = mentorprofiledetails1.linkedinUrl;

    // Open the mentor's LinkedIn profile in a new tab/window
    window.open(linkedInUrl, '_blank');
  };

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
             {/* <img src={`${baseUrl}/${mentorprofiledetails1.imageUrl}`}  className=' col-2 mx-2 w-60 rounded-circle
              img-thumbnail border    ' alt="" /> */}
             <img src={`${baseUrl}/${mentorprofiledetails1.imageUrl}`} 
              className="mx-2 rounded-circle img-thumbnail border"
              style={{ width: "110px", height: "110px" }} alt="" />
              {/* <img  src={`${baseUrl}/api/public/images/${mid}/profile-pic`} className=' col-2 mx-2 w-60 rounded-circle
              img-thumbnail border    ' alt="" /> */}
            <Button color="light" className=" font-weight-semibold mx-2" size='large'>
                <span className='font-weight-semibold text-one'><i className='iconsminds-thunder text-primary'/>{mentorprofiledetails1.achievement}</span>
              </Button>
            </div>
            {/* <div>
            <NavLink  onClick={handleConnectClick}>
              <Button color="light" className=" font-weight-semibold mx-2 " size='large'>
                <span className='font-weight-semibold text-primary text-one'>Connect</span>
             
              </Button>
              </NavLink>
            </div> */}
            <div>
             
              <Button color="light" className=" font-weight-semibold mx-2 " size='large' onClick={handleLinkedInClick}>
             
                <i className='simple-icon-social-linkedin text-primary font-weight-semibold text-one  '/>
              </Button>

            </div>
          </div>
          <div className='col-5 mt-4'>
          <h1 className='font-weight-semibold text-xlarge'>{mentorprofiledetails1.firstName} {mentorprofiledetails1.lastName}</h1>
          {/* <h1 className='font-weight-semibold text-xlarge'>{mentorprofiledetails1.firstName} {mentorprofiledetails1.lastName}</h1> */}
          <h3 className='text-large  text-muted  '>{mentorprofiledetails1.jobTitle}</h3>
            <h2 className='text-one  text-primary'>{mentorprofiledetails1.company}</h2>
            <p  className='text-one font-weight-medium text-primary'>{mentorprofiledetails1.bio}</p>
            
            <h5 className='font-weight-medium'><i className='simple-icon-location-pin text-primary'/><span className='ml-2'>{mentorprofiledetails1.location}</span></h5>
            {/* <h6 className=''><i className='simple-icon-star text-primary '/><span className='ml-2'>{mentorprofiledetails1.star} ({mentorprofiledetails1.ratings} reviews)</span></h6> */}
            <h6 className=''><i className='simple-icon-star text-primary '/><span className='ml-2'>{reviews.averageStar} ({reviews.totalRatings} reviews)</span></h6>
           {/* <h6 className=''><i className='simple-icon-clock text-primary'/><span className='ml-2'>Last Seen</span></h6> */}
          </div>
         
          <div className='col-7 mt-4'>
            <h2 className='mx-2'>Skills</h2>
           
            {/* <div className='d-flex'>
              {mentorprofiledetails.skills&&mentorprofiledetails.skills.map((skill)=>{
               
                
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
            {mentorprofiledetails1.skills && mentorprofiledetails1.skills.slice(0, 3).map((skill) => (
            <div key={skill}>
              <Button color="light" className="mb-2 font-weight-semibold mx-2" size='xs'>
                {skill}
              </Button>
            </div>
          ))}
        </div>
        {mentorprofiledetails1.skills && mentorprofiledetails1.skills.length > 3 && (
          <div className=''>
            <Button color="link" className='text-one font-weight-bold ' style={{textDecoration:"underline"}} onClick={toggleShowAll}>
              + {remainingSkillsCount}more
           
            </Button>
          </div>
        )}
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
            {/* <div className='mt-2 '>
            <NavLink className=''  onClick={handleConnectClick}>
              <Button outline color="primary" className=" font-weight-semibold mx-2 " size='large'>
                <span className='font-weight-semibold  text-one'>Connect</span>
                <i className='simple-icon-social-linkedin text-primary font-weight-semibold text-one  '/>
              </Button>
              </NavLink>
            </div> */}
            <MentorTabCard  handleConnectClick={handleConnectClick}/>
          </div>
          </Row>
          <hr/>
          <Colxx className='sm="12" md="12" lg="12" xxs="12" mt-5'>
            <Row>
            <div className='w-40 '>
            <h1 className='font-weight-semibold text-large'>About</h1>
          
            <p className='text-one font-weight-medium '>{mentorprofiledetails1.bio}</p>
            </div>
             
            </Row>
            <hr/>
          
            <Row>
        <Colxx  lg={7} className="my-4" id="skillsSection">
        <Row>
        <h1 className='font-weight-semibold text-large'>Skills </h1>
        </Row>
        <Row>
      
            <div className='d-flex flex-wrap '>
              {mentorprofiledetails1.skills && mentorprofiledetails1.skills.map((skill) => (
                <div key={skill}>
              <Button color="light" className="mb-2 font-weight-semibold mr-2" size='md'>
                {skill}
              </Button>
            </div>
              ))}
            </div>
        </Row>
            
          </Colxx>
        </Row>
          </Colxx>
          </div>
        </Colxx>
        <ReviewsComponent
        category="mentorship"  // for lawyer profile "law"
        revieweeId ={mid}
        />
      </div>
    </div>
  );
}

export default MentorProfile;
