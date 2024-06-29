import React, { useState } from 'react';
import axios from 'axios';
import { baseUrl } from 'constants/defaultValues';
import { useLocation,useHistory } from 'react-router-dom';
import { Colxx } from 'components/common/CustomBootstrap';
import Rating from 'components/common/Rating';
import { NotificationManager } from 'components/common/react-notifications';
import { Card, CardBody, Col, Row ,CardTitle, Button} from 'reactstrap';
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "react-quill/dist/quill.bubble.css";





const AddReview = () => {
    const [rating,setRating]=useState(0);
    const [feedBack,setFeedBack]=useState('');
    const location = useLocation();
    const { lawyerId } = location.state || {};
    const {lawyerName}= location.state || {};
    const [post,setPost]=useState(true);
    const history=useHistory();

    const handleRate = (ratingVal) => {
        setRating(ratingVal.rating);
      };

      const handleHomeClick = () => {
        history.push("/app/profile");
      };

      const Reviewurl = `${baseUrl}/api/law/rating`;

      function getTokenRes() {
        return localStorage.getItem("tokenRes");
      }
      const token = getTokenRes();
      

    const ReviewsPost=()=>{
       
        axios.post(Reviewurl,{
            rating,
            feedBack,
            revieweeId:lawyerId,
        },
        {
            headers: {
                Authorization: `Bearer ${token}`,
              },
        }
    )
    .then((response)=>{
        console.log(response.data);
        setPost(!post)
        
    })
    .catch((error)=>{
        console.error("Error submitting data:", error);
        const er = error.response.data.error.message;
        //   console.log(error.response.data.error.message);
        NotificationManager.warning(er, 'Error submitting review', 3000, null, null, '');
    })
    }
  return (
    <div>
    {post?(
      <Colxx sm='12' md="12" lg="8" className="mx-auto">
    <Card>
        <CardBody>
        <Row>
      <Col>
        <h4 className="mt-2 text-left ml-4">
        {" "}
        Please rate your experience with {lawyerName}
         </h4>
     </Col>
     <Col className="mt-2">
         {" "}
         <Rating
          total={5}
         rating={rating}
           onRate={handleRate}
         />
    </Col>
     </Row>
     <hr className="my-4" />
     <div className="">
    <CardBody>
        <CardTitle className="text-left">
        Please write about your experience with {lawyerName}
        </CardTitle>
        <ReactQuill
        theme="bubble"
          value={feedBack}
          onChange={(val) => setFeedBack(val)}
        />
    </CardBody>
    
    </div>
    <div className='text-center'>
    <Button color="primary" size='lg' onClick={ReviewsPost}>Submit</Button>
    </div>
    
    </CardBody>
      </Card>
    </Colxx>
    ):(
      <div className="mt-2">
      <Card className='mx-auto'>
      <CardBody className='text-center'>
        <CardTitle className="h4">
          Thank you for your valuable feedback
        </CardTitle>
        <p className="lead">
          Your review submitted successfully!
        </p>
        <Button  color="primary"
        size="lg"
        className="mt-4"
        onClick={handleHomeClick}>Home</Button>
      </CardBody>
      </Card>
      
    </div>)
    
    
    }
    {/* <Colxx sm='12' md="12" lg="8" className="mx-auto">
    <Card>
        <CardBody>
        <Row>
      <Col>
        <h4 className="mt-2 text-left ml-4">
        {" "}
        Please rate your experience with {lawyerName}
         </h4>
     </Col>
     <Col className="mt-2">
         {" "}
         <Rating
          total={5}
         rating={rating}
           onRate={handleRate}
         />
    </Col>
     </Row>
     <hr className="my-4" />
     <div className="">
    <CardBody>
        <CardTitle className="text-left">
        Please write about your experience with {lawyerName}
        </CardTitle>
        <ReactQuill
        theme="bubble"
          value={feedBack}
          onChange={(val) => setFeedBack(val)}
        />
    </CardBody>
    
    </div>
    <div className='text-center'>
    <Button color="primary" size='lg' onClick={ReviewsPost}>Submit</Button>
    </div>
    
    </CardBody>
      </Card>
    </Colxx> */}
  
     
    </div>
  );
}

export default AddReview;
