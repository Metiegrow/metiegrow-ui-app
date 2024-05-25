import axios from 'axios';
import { Colxx } from 'components/common/CustomBootstrap';
// import Rating from 'components/common/Rating';
import { adminRoot, baseUrl } from 'constants/defaultValues';
import React, { useEffect, useState } from 'react';
import { Button,   Card,   CardBody,    Col,   NavLink,Row } from 'reactstrap';
import {useParams,useHistory} from "react-router-dom";
// import data from 'data/profileStatuses';
import ThumbnailLetters from 'components/cards/ThumbnailLetters';
import LawyerTabCard from './LawyerTabCard';
import ReviewsComponent from '../Reviews/ReviewsComponent';



const LawyerProfile = () => {
  const {pid}=useParams();
  const history = useHistory();
    const[lawyerprofile,setLawyerProfile]=useState('');
    // const[reviews,setReviews]=useState('');
    const [packages,setPackages]=useState('');
    const [showAll, setShowAll] = useState(false);
    // const [isFixed, setIsFixed] = useState(false);
    const toggleShowAll = () => {
      setShowAll(!showAll);
    };


    const handlePurchase = (pack) => {
      history.push(`/app/lawyer/payment`, {
        firstName: lawyerprofile.firstName,
        lastName: lawyerprofile.lastName,
        serviceName: pack.serviceName,
        amount:pack.amount,
        packageId:pack.id,
        lawyerId:lawyerprofile.id
      });
    };

    // const url=`${baseUrl}/lawyerProfile/${pid}`;

    // backend lawyerprofile url 
   
    const url=`${baseUrl}/api/lawyer/${pid}`;

    // const reviewURL=`${baseUrl}/lawyerReviews`;
    // backend  url
    // const reviewURL=`${baseUrl}/api/law/rating/${pid}`;

    // const packageURL=`${baseUrl}/lawyerPackages`;
    // backend url 

    const packageURL=`${baseUrl}/api/lawyer/${pid}/package`
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




    const remainingSkillsCount = lawyerprofile.topic ? lawyerprofile.topic.length - 3 : 0;

const handleChatClick = () =>{
  history.push(`${adminRoot}/chat/${lawyerprofile.chatUserName}`)
}
  return (
    <div>
    


      <div>
      <div className='w-100 py-3 position-relative bg-primary d-flex justify-content-between align-items-center'>
          <div className=' '>
            {/* <img src="/assets/img/profiles/2.jpg" className=' col-2 mx-2 w-60
             rounded-circle img-thumbnail border    ' alt="" /> */}
             {/* <img src={lawyerprofile.image} className=' col-2 mx-2 w-60
             rounded-circle img-thumbnail border    ' alt="" /> */}
            
              {lawyerprofile.imageUrl === null ? (
                  <div className="">
                  <ThumbnailLetters
                     rounded
                      small
                     text={lawyerprofile.firstName}
                     className="border border-1 mx-2" 
                   />
                  
                     
                  </div>
                  
                 ) : (
                  <img 
              // src={lawyerprofile.image} 
              src={`${baseUrl}/${lawyerprofile.imageUrl}`} 
              className='col-2 col-sm-4 col-xs-4  mx-2 mx-sm-2 w-100 col-lg-2 col-xl-2 rounded-circle img-thumbnail border' 
              alt="" 
            />
                 )}
       
            </div>
            <div>
            <NavLink  >
              <Button onClick={handleChatClick} color="light" className=" font-weight-semibold mx-2 " size='large'>
                <span className='font-weight-semibold text-primary text-one'>Contact</span>
                
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
            <h2 className=''>Topics</h2>
           
           
            <div className='d-flex align-items-center flex-wrap'>
            <div className='d-flex'>
            {lawyerprofile.topic && lawyerprofile.topic.slice(0, 3).map((skill) => (
            <div key={skill.id}>
              <Button color="light" className="mb-2 font-weight-semibold mx-2" size='xs'>
                {skill.topicName}
              </Button>
            </div>
          ))}
        </div>
        {lawyerprofile.topic && lawyerprofile.topic.length > 3 && (
          <div className=''>
            <Button color="link" className='text-one font-weight-bold ' style={{textDecoration:"underline"}} onClick={toggleShowAll}>
              + {remainingSkillsCount}more
           
            </Button>
          </div>
        )}
            </div>
            
         
           
          </div>
          <div   className='mt-2 d-md-block d-sm-block d-lg-none d-xl-none  ' >
        <LawyerTabCard pid={pid} handlePurchase={handlePurchase} userId={lawyerprofile.chatUserName}/>
    </div>
        
          <div className='mt-4' >
                    <h2 className=''>About</h2>
                    <p className='text-one'>{lawyerprofile.about}</p>
                </div>
                <div>
                
                <div   className="my-4 " id="skillsSection">
                <h2 className='text-start mr-2'>All Topics</h2>
                <div className='d-flex flex-wrap '>
              {lawyerprofile.topic && lawyerprofile.topic.map((skill) => (
                <div key={skill}>
                  <Button color="light" className="mb-2 font-weight-semibold mx-2" size='sm'>
                    {skill.topicName}
                  </Button>
                </div>
              ))}
            </div>
            
          </div>
                </div>
                </Colxx>
          
         <Colxx lg={12} xl={12}  className='mt-4'>
         <hr/>
  <h2 className=''>Compare Packages</h2>
  <Row className='d-flex'>
    {packages && packages.map((pack) => (
      <Col lg={6}  key={pack.id} className='my-2'>
        <Card className='pt-5 pb-5 d-flex'>
          <CardBody className='pt-5 pb-5'>
            <div className='price-top-part'>
              <i className='' />
              <h2 className='mb-0 font-weight-semibold text-primary text-large mb-4'>
                {pack.serviceName}
              </h2>
              {/* <p className=''>{pack.headline}</p> */}
              <p className='text-large mb-2 text-default'>₹ {pack.amount}</p>
              <p className='text-muted text-small'>{pack.description}</p>
              <div className=''>
                <NavLink href='/app/lawyer/payment'>
                  <Button color='primary  text-one' onClick={() => handlePurchase(pack)}>Purchase</Button>
                </NavLink>
              </div>
            </div>
          </CardBody>
        </Card>
      </Col>
    ))}
  
  </Row>
</Colxx>
      
             
          
            <Colxx className="mt-4" lg={12}>
            <hr/>
            
          
            
            </Colxx>
      
      <Colxx className='mt-4' lg={6} xl={6} md={12}> 
  
<div  style={{width:"40%",position:'fixed',top:'40%',right:'20px'}} className='mt-2 d-lg-block d-xl-block d-none'>
        <LawyerTabCard pid={pid} handlePurchase={handlePurchase}/>
    </div>
    {/* <div    className='mt-2 d-md-block d-sm-block d-lg-none d-xl-none bg-primary'>
        <LawyerTabCard />
    </div> */}
      </Colxx>
     </Row>
     <ReviewsComponent  category="law"
             revieweeId ={pid}/>
    </div>
  );
}

export default LawyerProfile;