import axios from 'axios';
import { Colxx } from 'components/common/CustomBootstrap';
// import IntlMessages from 'helpers/IntlMessages';
import { baseUrl } from 'constants/defaultValues';
import React, { useState ,useEffect} from 'react';
import {  Button, Card, CardBody, CardText,    NavLink, Row } from 'reactstrap'
// import RatingExamples from './RatingExamples';
import Rating from 'components/common/Rating';
import MentorDropDown from './MentorDropDown';

// import SearchBar from './SearchBar';


const MentorCard = () => {
  const url=`${baseUrl}/mentor/cards`;
  const[mentordetails,setMentorDetails]=useState([]);
  const [inputkey,setInputKey]=useState('')
  

  useEffect(()=>{
    const mentorCardDetails = async () => {
      try {
        const response = await axios.get(url);
        setMentorDetails(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    mentorCardDetails();
  },[])

 
  return (
    <div >
  {/* <Button onClick={mentorCardDetails}>
    Get
  </Button> */}
  {/* {mentordetails.map((mentors) => (
        <div key={mentors.id}>
          <p>Name: {mentors.firstName} {mentors.lastName}</p>
          <p>Star: {mentors.star}</p>
          
        </div>
      ))} */}
      {/* <SearchBar/> */}
      {/* <Nav pills>
                <NavItem>
                  <NavLink href="/app/mentorprofile" active>
                    <IntlMessages id="nav.link" />
                  </NavLink>
                </NavItem>
</Nav> */}

      {/* searchbar starts */}
     
      <Colxx  sm="12" md="12" lg="8" xxs="12" className='mx-auto '>
      <div>
      {/* <div className="search input-group">
       
       <Input
         name="searchKeyword"
         id="searchKeyword"
         placeholder="Search"
     
       />
       <span
         className="search-icon btn-primary">
         <i className="simple-icon-magnifier" />
       </span>
     </div> */}
       <div className="">
        <div className="form-group">
       <div className='input-group'>
       <input
            type="text"
            className="form-control rounded col-12 col-lg-8 col-md-8 py-2"
            placeholder='Search by skill or job title'
            value={inputkey}
            onChange={(e) =>setInputKey(e.target.value)}
          />
          {/* <i className="simple-icon-magnifier" /> */}
         
     
       </div>
        
  
       {/* <div className="container">
   
    <div className="input-group">
        <input className="form-control  col-12 col-lg-8 col-md-8 py-3" 
         placeholder='Search by skill or job title'
         value={inputkey}
            onChange={(e) =>setInputKey(e.target.value)}
         />
        <span className="input-group-append bg-white border-left-0">
            <span className="input-group-text bg-transparent">
            <i className="simple-icon-magnifier" />
            </span>
        </span>
    </div>
    </div> */}
          
          <MentorDropDown/>
        </div>
    
        </div>
        </div>
      </Colxx>
  
      {/* searchbar ends */}
      
      
   {mentordetails.filter((mentors)=>{
  
        if (
    inputkey === "" ||
    mentors.jobTitle.toLowerCase().includes(inputkey.toLowerCase()) ||
    mentors.skills.some((skill) => skill.toLowerCase().includes(inputkey.toLowerCase()))
  ) {
    return true;
  }
        return false;
   }).map((mentors)=>{
    return (
      <Colxx xxs="12" key={mentors.id}>
      <Row>
      <Colxx  sm="12" md="12" lg="8" xxs="12" className='mx-auto '>
            <Card className=" flex-row listing-card-container my-3 p-3 flex-wrap flex-sm-nowrap flex-md-nowrap flex-lg-nowrap flex-xl-nowrap" >
           
              <div className='d-flex justify-content-between flex-column  w-100'>
            
                <img
                      className="card-img-left"
                      src={mentors.image}
                      alt="Card"
                    />
                    <div className='my-5  '>
                        <CardText className='text-primary '>
                            <span className='text-xlarge font-weight-semibold'>${mentors.price}</span>/month
                        </CardText>
                    
                    </div> 
              </div>
             
              <div className=" d-flex align-items-center">
              <CardBody className=" " >
                  <div className="min-width-zero">
                    
                    <CardText className=" font-weight-semibold text-xlarge mb-4">
                     {mentors.firstName} {mentors.lastName}
                    </CardText>
                    <CardText className=" text-large  text-muted mb-3">
                    {mentors.jobTitle}
                    </CardText>
                    <CardText className=" text-one mb-2 text-primary">
                     {mentors.company}
                    </CardText>
                    <CardText className=" text-one mb-2 d-flex align-items-center">
                    <span className='font-weight-semibold '><Rating total={5} rating={mentors.star} interactive={false} /></span>
                    <span className='font-weight-semibold'>{mentors.star}</span> 
                    <span> ({mentors.ratings} reviews)</span> 
                    
                    </CardText>
                    <CardText className=" text-one mb-2">
                     {mentors.bio}
                    </CardText>
                   <CardText className='d-flex'>
                  
                   {/* {mentordetails.skills&&mentordetails.skills.map((skill) => (
              <span key={skill} className="">{skill}</span>
            ))} */}
            {mentors.skills && mentors.skills.map((skill) => (
          <div key={skill} className='m-2 ' id='btn.rounded'>
          
              <Button color="light" className="mb-2 font-weight-semibold" size='xs'>
                {skill}
              </Button>

            
          </div>
              
        ))}
                   </CardText>
                  </div>
                  {/* <div className='d-flex align-items-center justify-content-between my-3  '>
                        <CardText className='text-primary '>
                            <span className='text-large font-weight-semibold'>${mentors.price}</span>/month
                        </CardText>
                        <Button color="primary " className="default  ">
                        View Profile
              </Button>
                    </div> */}
                    <div className=''>
                     <NavLink href={`/app/mentorprofile/${mentors.id}`}>
                       <Button color="primary " className="default w-80 py-2  rounded" >
                        View Profile
              </Button>
              </NavLink>
              
                    </div>
                </CardBody>
     
              </div>
         
    
            </Card>
    
           
          </Colxx>
        
      </Row>
      
        
        
      </Colxx>
      
    )
    
   })}
      {/* <Colxx xxs="12">
      <Row>
      <Colxx  sm="12" md="12" lg="8" xxs="12" className='mx-auto'>
            <Card className=" flex-row listing-card-container  ">
           
              <div className=' postion-relative'>
            
                <img
                      className="card-img-left"
                      src='/assets/img/cards/thumb-1.jpg'
                      alt="Card"
                    />
                    
              </div>
             
              <div className=" d-flex align-items-center">
              <CardBody className=" " >
                  <div className="min-width-zero">
                 
                    <CardText className=" font-weight-semibold text-large mb-2">
                     Suresh Kumar
                    </CardText>
                    <CardText className=" text-one mb-2">
                     FrontEnd developer IN
                    </CardText>
                    <CardText className=" text-one mb-2 text-primary">
                     Aaga technologies
                    </CardText>
                    <CardText className="text-small text-small mb-2">
                     4.5(100 reviews)
                    </CardText>
                    <CardText className=" text-one mb-2">
                    I started programming at an age of 14 because I wanted to help people, 
                    specifically my mother who is an artist and who I made a website for. 
                    Since then I simply got addicted to creating cool and hopefully helpful apps.
                     Peculiarly, it turned out that freelancing as a software …
                    </CardText>
                  
                  </div>
                  <div className='d-flex align-items-center justify-content-between my-5'>
                        <CardText className='text-primary'>
                            <span className='text-large font-weight-semibold'>$290</span>/month
                        </CardText>
                        <Button color="primary " className="default  ">
                        View Profile
              </Button>
                    </div>
                </CardBody>
                
              </div>
             
            </Card>
            
           
          </Colxx>
        
      </Row>
      </Colxx> */}
    

     
 
    </div>
  );
}

export default MentorCard;
