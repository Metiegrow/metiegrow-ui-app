import React, { useState } from "react";
import axios from "axios";
import { baseUrl } from "constants/defaultValues";
import { useLocation, useHistory } from "react-router-dom";
import { Colxx } from "components/common/CustomBootstrap";
import Rating from "components/common/Rating";
// import { NotificationManager } from 'components/common/react-notifications';
import { Card, CardBody, Col, Row, CardTitle, Button } from "reactstrap";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "react-quill/dist/quill.bubble.css";
import ToasterComponent from "../notifications/ToasterComponent";

const AddReview = () => {
  const [rating, setRating] = useState(0);
  const [feedBack, setFeedBack] = useState("");
  const location = useLocation();
  const { lawyerId } = location.state || {};
  const { lawyerName } = location.state || {};
  const [post, setPost] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();

  const handleRate = (ratingVal) => {
    setRating(ratingVal.rating);
  };

  const handleBackToLawyerJobsClick = () => {
    history.push("/app/lawyerjobslist");
  };

  const Reviewurl = `${baseUrl}/api/law/rating`;

  function getTokenRes() {
    return localStorage.getItem("tokenRes");
  }
  const token = getTokenRes();

  const ReviewsPost = async () => {
    setIsLoading(true);
    try {
      await axios.post(
        Reviewurl,
        {
          rating,
          feedBack,
          revieweeId: lawyerId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // console.log(response.data);
      setIsLoading(false);
      setPost(!post);
    } catch (error) {
      setIsLoading(false);
      if (
        error.response &&
        error.response.data &&
        error.response.data.statuses
      ) {
        ToasterComponent("error", error.response.data.statuses);
      } else {
        console.error("Error submitting review", error);
      }
    }
  };

  return (
    <div>
      {post ? (
        <Colxx sm="12" md="12" lg="8" className="mx-auto">
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
                  <Rating total={5} rating={rating} onRate={handleRate} />
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
              <div className="text-center">
                <Button
                  color="primary"
                  size="lg"
                  className={`col-12 col-md-3 btn-shadow btn-multiple-state ${
                    isLoading ? "show-spinner" : ""
                  }`}
                  onClick={ReviewsPost}
                >
                  {" "}
                  <span className="spinner d-inline-block">
                    <span className="bounce1" />
                    <span className="bounce2" />
                    <span className="bounce3" />
                  </span>
                  <span className="label">Submit</span>
                </Button>
              </div>
            </CardBody>
          </Card>
        </Colxx>
      ) : (
        <div className="mt-2">
          <Card className="mx-auto">
            <CardBody className="text-center">
              <CardTitle className="h4">
                Thank you for your valuable feedback
              </CardTitle>
              <p className="lead">Your review submitted successfully!</p>
              <Button
                color="primary"
                size="lg"
                className="mt-4"
                onClick={handleBackToLawyerJobsClick}
              >
                Back to lawyer jobs
              </Button>
            </CardBody>
          </Card>
        </div>
      )}
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
};

export default AddReview;
