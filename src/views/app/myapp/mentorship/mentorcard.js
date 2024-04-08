import axios from 'axios';
import { Colxx } from 'components/common/CustomBootstrap';
import {useParams,useLocation} from "react-router-dom";
// import IntlMessages from 'helpers/IntlMessages';
import { baseUrl } from 'constants/defaultValues';
import React, { useState ,useEffect} from 'react';
import {  Button, Card, CardBody, CardText,    NavLink, Row } from 'reactstrap'
// import RatingExamples from './RatingExamples';
import Rating from 'components/common/Rating';
import MentorDropDown from './MentorDropDown';

// import SearchBar from './SearchBar';


const MentorCard = () => {
  // const url1=`${baseUrl}/mentorDetails`
  const url1=`${baseUrl}/api/mentor`
  // To change to backend api url uncomment the below line
  // const url1=`${baseUrl}/api/mentor`

  const {category}=useParams();
  const location = useLocation();
const firstNameParam = new URLSearchParams(location.search).get('firstName');
const jobTitleParam = new URLSearchParams(location.search).get('jobTitle');
 // Using useLocation hook
  // const age = new URLSearchParams(location.search);

  // let filteredUrl = `${url}?`;
  // if (firstNameParam) filteredUrl += `firstName=${firstNameParam}&`;
  // if (jobTitleParam) filteredUrl += `jobTitle=${jobTitleParam}&`;
  // Add more conditions for other parameters
  // const age = searchParams.get('age');
  console.log('Category:', category);
  // const url=`${baseUrl}/mentor/cards`;
  // const url=`${baseUrl}/mentorDetails/?${firstNameParam}&jobTitle=${jobTitleParam}`;
  // const url1=`${baseUrl}/mentorDetails/${category}`;
  // const url='http://localhost:9091/api/mentor/cards?page=0&size=3 ';
  const[mentordetails,setMentorDetails]=useState([]);
  // const[mentorfilter,setMentorFilter]=useState([]);
  const [inputkey,setInputKey]=useState('')


 

  // const setFirstName = (newFirstName) => {
  //   const searchParams = new URLSearchParams(location.search);
  //   searchParams.set('firstName', newFirstName);
  //   const newSearch = searchParams.toString();
  //   const newPath = `${location.pathname}?${newSearch}`;
  //   window.history.replaceState(null, '', newPath);
  //   setInputKey(newFirstName); // Optionally, you can update the state with the new value
  // };

  

  // useEffect(()=>{
  //   const mentorCardDetails = async () => {
  //     try {
  //       const response = await axios.get(url);
  //       setMentorDetails(response.data);
  //     } catch (error) {
  //       console.error('Error fetching data:', error);
  //     }
  //   };
  //   mentorCardDetails();
  // },[location.search])   
  useEffect(()=>{
    const mentorCardDetails = async () => {
      try {
        let url = url1;
        if (firstNameParam || jobTitleParam) {
          url += `?firstName=${firstNameParam || ''}&jobTitle=${jobTitleParam || ''}`;
        }
        const response = await axios.get(url);
        setMentorDetails(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    mentorCardDetails();
  },[location.search])  
 
  // useEffect(() => {
  //   const mentorCardDetails = async () => {
  //     try {
  //       const queryParams = new URLSearchParams(location.search);
  //       const firstNameParam = queryParams.get('firstName');
  //       const jobTitleParam = queryParams.get('jobTitle');
  //       // Add more parameters as needed

  //       let filteredUrl = `${url}?`;
  //       if (firstNameParam) filteredUrl += `firstName=${firstNameParam}&`;
  //       if (jobTitleParam) filteredUrl += `jobTitle=${jobTitleParam}&`;
  //       // Add more conditions for other parameters

  //       const response = await axios.get(filteredUrl);
  //       setMentorDetails(response.data);
  //     } catch (error) {
  //       console.error('Error fetching data:', error);
  //     }
  //   };
  //   mentorCardDetails();
  // }, [location.search]);

  // const mentorFilterSearch = async () => {
  //   try {
  //     const response = await axios.get(url1);
  //     setMentorFilter(response.data);
  //   } catch (error) {
  //     console.error('Error fetching data:', error);
  //   }
  // };
  // const handleInputChange = (e) => {
  //   setInputKey(e.target.value);
  //   mentorFilterSearch(); // Call the search function when input changes
  // };
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
     {/* <h3>Age is {age} </h3>
   <h3>City is {city}</h3> */}
   <div>
    {/* Your other components */}
    {/* <h3>firstName is {firstNameParam}</h3>
    <h3>jobTitle is {jobTitleParam}</h3> */}
    {/* <Button onClick={()=>setFirstName('defaultname')}>set firstName</Button> */}
    {/* <input
            type="text"
            className="form-control rounded col-12 col-lg-8 col-md-8 py-2"
            placeholder='query'
            value={inputkey}
            onChange={(e) =>setFirstName(e.target.value)}
            // onChange={handleInputChange}
          /> */}
  </div>

     
       <div className="">
        <div className="form-group">
       <div className='input-group'>
       <input
            type="text"
            className="form-control rounded col-12 col-lg-8 col-md-8 py-2"
            placeholder='Search by skill or job title'
            value={inputkey}
            onChange={(e) =>setInputKey(e.target.value)}
            // onChange={handleInputChange}
          />
          {/* <i className="simple-icon-magnifier" /> */}
      
          <Button className='ml-3 ' color='primary' >Search</Button>
        
        
          
           
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

      
      
   {mentordetails.map((mentors)=>{
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
                      style={{minWidth:'150px',minHeight:"300px"}}
                    />
                    <div className='my-5  '>
                        <CardText className='text-primary '>
                            <span className='text-xlarge font-weight-semibold'>${mentors.price}</span>/month
                        </CardText>
                    
                    </div> 
              </div>
             
              <div className=" d-flex align-items-center col-9">
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
            {mentors.skills && mentors.skills.slice(0, 3).map((skill) => (
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
