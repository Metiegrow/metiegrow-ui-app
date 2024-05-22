import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Colxx } from 'components/common/CustomBootstrap';
import ThumbnailLetters from "components/cards/ThumbnailLetters";
import { Button, Card, CardBody, CardText, Col, NavLink, Row } from 'reactstrap';
import { baseUrl } from 'constants/defaultValues';
import Rating from 'components/common/Rating';
import MentorDropDown from '../mentorship/MentorDropDown';



const UserCard = () => {
  const [userdetails,setUserDetails]=useState('')
  const [inputkey,setInputKey]=useState('');
  // const url=`${baseUrl}/user/cards`

  // Backend url below 
  const url =`${baseUrl}/api/lawyer`
  useEffect(()=>{

    const UserList = async () => {
      try {
        const response = await axios.get(url);
        setUserDetails(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    UserList();
  },[])
  
  return (
    <div>
       <Colxx  sm="12" md="12" lg="8" xxs="12" className='mx-auto '>
      <div>

     
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
          
      
          <Button className='ml-3 ' color='primary' >Search</Button>
        
        
          
           
       </div>
        
  
      
          <MentorDropDown/>
        </div>
    
        </div>
        </div>
      </Colxx>
      {userdetails&&userdetails.map((users)=>{
    return (
      <Colxx xxs="12" key={users.id}>
      <Row>
      <Colxx  sm="12" md="12" lg="8" xxs="12" className='mx-auto '>
            <Card className=" flex-row listing-card-container my-3 p-3 flex-wrap flex-sm-nowrap flex-md-nowrap flex-lg-nowrap flex-xl-nowrap" >
              <Col md={5} lg={5}>
              <div className='d-flex justify-content-between flex-column  w-100'>
             
             {/* <img
                   className="card-img-left"
                   
                   src={`${baseUrl}/${users.imageUrl}`} 
                   alt="Card"
                 /> */}
                 {users.imageUrl === null ? (
                  <div className=" w-full h-full mx-auto my-5" style={{height:"100%"}}>
                  <ThumbnailLetters
                     rounded
                     text={users.firstName}
                     className='text-xlarge my-auto '
                     style={{height:"100%",width:"100%"}}

                   />
                  </div>
                   
                 ) : (
                   <img
                     className="card-img-left"
                     src={`${baseUrl}/${users.imageUrl}`} 
                     alt="Card"
                   />
                 )}
                 {/* <img src="/assets/img/profiles/1.jpg" alt='card' className='card-img-left'/> */}

                 <div className='my-5  '>
                     <CardText className='text-primary '>
                         <span className='text-xlarge font-weight-semibold'>₹{users.price}</span>
                     </CardText>
                 
                 </div> 
           </div>
              </Col>
            
             <Col md={6} lg={6}>
             <div className=" d-flex align-items-center">
              <CardBody className=" " >
                  <div className="min-width-zero">
                    
                    <CardText className=" font-weight-semibold text-xlarge mb-4">
                     {users.firstName} {users.lastName}
                    </CardText>
                    <CardText className=" text-large  text-muted mb-3">
                    {users.jobTitle}
                    </CardText>
                    {/* <CardText className=" text-one mb-2 text-primary">
                     {users.company}
                    </CardText> */}
                    <CardText className=" text-one mb-2 d-flex align-items-center">
                    <span className='font-weight-semibold '><Rating total={5} rating={users.star} interactive={false} /></span>
                    <span className='font-weight-semibold'>{users.star}</span> 
                    <span> ({users.ratings} reviews)</span> 
                    
                    </CardText>
                    <CardText className=" text-one mb-2">
                     {users.bio}
                    </CardText>
                   <CardText className='d-flex'>
                  
              
            {users.services && users.services.slice(0,3).map((skill) => (
          <div key={skill} className='m-2 ' id='btn.rounded'>
          
              <Button color="light" className="mb-2 font-weight-semibold" size='xs'>
                {skill}
              </Button>

            
          </div>
              
        ))}
        
                   </CardText>
                  </div>
                 
                    <div className=''>
                     {/* <NavLink href={`/app/mentorprofile/${users.id}`}>
                       <Button color="primary " className="default w-80 py-2  rounded" >
                        View Profile
              </Button>
              </NavLink> */}
              <NavLink href={`/app/lawyerprofile/${users.id}`}>
              <Button color="primary " className="default w-80 py-2  rounded" >
                        View Profile
              </Button>
              </NavLink>
              
              
                    </div>
                </CardBody>
     
              </div>
             </Col>
              
         
    
            </Card>
       
           
          </Colxx>
        
      </Row>
      
        
        
      </Colxx>
      
    )
    
   })}
   
    </div>
  );
}

export default UserCard;
