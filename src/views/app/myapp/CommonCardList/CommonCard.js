import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { baseUrl } from 'constants/defaultValues';
import { Colxx } from 'components/common/CustomBootstrap';
import { Button, Card, CardBody, CardText, Row } from 'reactstrap';
import Rating from 'components/common/Rating';
import ThumbnailLetters from 'components/cards/ThumbnailLetters';
import '../Lawyer/ThumbnailImage.css'
import { useHistory } from 'react-router-dom';



const CommonCard = ({type,showPrice,noneText}) => {
    const [cardlist,setCardList]=useState('');
    const history=useHistory();


    const truncateBio = (bio, lineCount) => {
   
        const words = bio.split(' ');
       
        const truncatedBio = words.slice(0, lineCount).join(' '); 
       
        if (words.length > lineCount) {
          return `${truncatedBio}...`;
        }
        return truncatedBio;
      };
    
    const url =`${baseUrl}/api/${type}`
  useEffect(()=>{

    const UserList = async () => {
      try {
        const response = await axios.get(url);
        setCardList(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    UserList();
  },[])


 

  return (
    <div>
       {cardlist.length===0?(
          <Colxx  sm="12" md="12" lg="8" xxs="12" className='mx-auto '>
      <Card>
          <CardBody>
            <h2 className='text-center text-large '>No {noneText}</h2>
          </CardBody>
         </Card>
      </Colxx>
        ):(
          cardlist.map((mentors)=>{
    return (
      <Colxx xxs="12" key={mentors.id}>
      <Row>
      
      <Colxx  sm="12" md="12" lg="8" xxs="12" className='mx-auto '>
            <Card className=" flex-row listing-card-container my-3 p-3 flex-wrap flex-sm-nowrap flex-md-nowrap flex-lg-nowrap flex-xl-nowrap" >
           
              <div className='d-flex justify-content-between flex-column  w-100'>
            
               {mentors.imageUrl==null?(
                <div className='card-img-left bg-primary 
                 d-flex align-items-center justify-content-center'
                 style={{ minWidth: '150px', minHeight: '300px' }}
                 >
                <ThumbnailLetters
                     rounded
                     text={mentors.firstName}
                     className='text-xlarge border border-1'
                     style={{textAlign:"center"}}

                   />
                   </div>
               ):(
                <img
                    className="card-img-left"
                    
                    src={`${baseUrl}/${mentors.imageUrl}`}
                   
                    alt="Card"
                    style={{ minWidth: '150px', minHeight: '300px' }}
                  />
               )
               }
                    
                   {showPrice?
                    <div className='my-5  '>
                        <CardText className='text-primary '>
                            <span className='text-xlarge font-weight-semibold'>₹{mentors.price}</span>/month
                        </CardText>
                    
                    </div> 
                    :null}
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
                   
                     {truncateBio(mentors.bio, 20)}
                    </CardText>
                   <CardText className='d-flex'>
                  
                 
            {mentors.skills && mentors.skills.slice(0, 3).map((skill,index) => (
          <div key={skill} className={index !== 0 ? 'm-2' : `my-2 mr-2`} id='btn.rounded'>
          
              <Button color="light" className="mb-2 font-weight-semibold" size='xs'>
                {skill}
              </Button>

            
          </div>
              
        ))}
                   </CardText>
                  </div>
                 
                    <div className=''>
                  
              <Button color="primary " onClick={()=>history.push(`/app/alumni/profile/${mentors.id}`)} className="default w-80 py-2  rounded" >
                        View Profile
              </Button>
              
                    </div>
                </CardBody>
     
              </div>
         
    
            </Card>
    
           
          </Colxx>
        
      </Row>
      
        
        
      </Colxx>
      
    )
    
   }))
        }
    </div>
  );
}

export default CommonCard;
