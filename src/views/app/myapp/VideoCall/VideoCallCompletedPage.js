import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Row,
  Card,
  Button,
  Jumbotron,
  CardBody,
  CardTitle,
  Col,
} from "reactstrap";
// import { NotificationManager } from 'components/common/react-notifications';
import { useParams, useHistory } from "react-router-dom";
import { Colxx } from "components/common/CustomBootstrap";
import ReactQuill from "react-quill";
import Rating from "components/common/Rating";

import "react-quill/dist/quill.snow.css";
import "react-quill/dist/quill.bubble.css";
import { adminRoot, baseUrl } from "constants/defaultValues";
import TimestampConverter from "../Calculation/TimestampConverter";
import ToasterComponent from "../notifications/ToasterComponent";

const VideoCallCompletedPage = () => {
  const [feedBack, setFeedBack] = useState("");
  const [rating, setRating] = useState(0);
  const [submissionStatus, setSubmissionStatus] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
  const [fromTime, setFromTime] = useState(null);
  const [toTime, setToTime] = useState(0);
  const [mode, setMode] = useState("");
  const [duration, setDuration] = useState(0);
  const [post, setPost] = useState(true);
  const [waitingForData, setWaitingForData] = useState(true);
  const { id, sid } = useParams();
  const history = useHistory();
  function getRoleRes() {
    return localStorage.getItem("roleRes");
  }
  const roleRes = getRoleRes();

  let getUrl;

if (roleRes === "USER") {
  getUrl = `${baseUrl}/api/call-info-mentee/${sid}`;
} else  {
  getUrl = `${baseUrl}/api/call-info-mentor/${sid}`;
} 


  // console.log("id end:", id);
  useEffect(() => {
    let intervalId;
    let attempts = 0;
    const maxAttempts = 10; 
    
    const fetchData = async () => {
      try {
        const response = await axios.get(getUrl);
        const reviewData = response.data;
        if (reviewData) {
          setName(reviewData.name);
          setFromTime(reviewData.fromTime);
          setToTime(reviewData.toTime);
          setMode(reviewData.mode);
          setDuration(reviewData.duration);
          clearInterval(intervalId);
          setWaitingForData(false);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        attempts += 1; 
        if (attempts >= maxAttempts) {
          clearInterval(intervalId);
          setWaitingForData(false);
          console.error("Max attempts reached. Unable to fetch data.");
        }
      }
    };
  
    intervalId = setInterval(() => {
      fetchData();
    }, 3000);
  
    return () => clearInterval(intervalId);
  }, []);

  const url = `${baseUrl}/api/mentorship/rating`;

  function getTokenRes() {
    return localStorage.getItem("tokenRes");
  }
  const token = getTokenRes();

  // console.log("rating", rating);
  // console.log("quill", feedBack);

  const handleRate = (ratingVal) => {
    setRating(ratingVal.rating);
  };

  const handleSubmit = () => {
    // setSubmissionStatus(true);
    setIsLoading(true);
    axios
      .post(
        url,
        {
          rating,
          feedBack,
          revieweeId: id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        // console.log(response.data);
        setTimeout(() => {
          setSubmissionStatus(true);
          setIsLoading(false);
        }, 3000);
      })
      .catch((error) => {
        // console.error("Error submitting data:", error);
        // console.log(error.response.data.error.message);
        // const er = error.response.data.error.message;
          // NotificationManager.warning("Error submitting review", 'Oops!', 3000, null, null, '');
          if(error.response){
            ToasterComponent('error', error.response.data.statuses);
          } else{
          console.error("There was an error while submitting ", error);
          }
        setSubmissionStatus(true);
        setPost(false);
        // setSubmissionStatus("failure");
        setIsLoading(false);

      });
  };

  // const handleSubmit = () => {
  //   setSubmissionStatus("success");
  //   setIsLoading(true);
  //   axios
  //     .post(url, {
  //       rating,
  //       feedBack,
  //       revieweeId,
  //     })
  //     .then((response) => {
  //       console.log(response.data);
  //       setSubmissionStatus("success");
  //       setTimeout(() => {
  //         setIsLoading(false);
  //       }, 3000);
  //     })
  //     .catch((error) => {
  //       console.error("Error submitting data:", error);
  //       setSubmissionStatus("failure");
  //       setIsLoading(false);
  //     });
  // };

  const handleDashboardClick = () => {
    history.push(`${adminRoot}/dashboard`);
  };

  const handleMentorClick = () => history.push(`${adminRoot}/calendar/mentor/appointment`)
  

  // const FromDate = new Date(parseInt(fromTime, 10));
  // const ToDate = new Date(parseInt(toTime, 10));

  // const fromHours = FromDate.getHours() % 12 || 12;
  // const fromMinutes = String(FromDate.getMinutes()).padStart(2, "0");
  // const fromPeriod = FromDate.getHours() < 12 ? "AM" : "PM";

  // const toHours = ToDate.getHours() % 12 || 12;
  // const toMinutes = String(ToDate.getMinutes()).padStart(2, "0");
  // const toPeriod = ToDate.getHours() < 12 ? "AM" : "PM";

  // const fromTime1 = `${fromHours}:${fromMinutes} ${fromPeriod}`;
  // const toTime1 = `${toHours}:${toMinutes} ${toPeriod}`;
  const msToMin = duration / 60000;
  const dur = msToMin.toFixed(2);

  return (
    <>
      <Row>
      {waitingForData ? (
                <div className="loading" />
              ) : (
        <Colxx xxs="12" className="mb-2">
          <Card className="mx-auto my-4 " style={{ maxWidth: "1000px" }}>
            <CardBody className="text-center">
              
              <Jumbotron className="text-center">
                <i
                  alt=""
                  className="glyph-icon iconsminds-yes text-success "
                  style={{ fontSize: "50px" }}
                />
                <br />
                <h1 className="display-5">
                  You have successfully completed a call with {name}
                </h1>
                <div className="d-flex justify-content-around flex-column ">
                  {/* <h4 className=''>Duration: {up.duration}</h4> */}
                  <Row className="mt-2">
                    <Col>
                      {/* <h4 className="mr-2">Start time: {fromTime1}</h4> */}
                      <h4 className="mr-2">Start time: {fromTime ? (<TimestampConverter timeStamp={fromTime} format="time" />) : (null)} </h4>
                    </Col>
                    <Col>
                      <h4>End time: {toTime ? (<TimestampConverter timeStamp={toTime} format="time" />) : (null)}</h4>
                    </Col>
                    <Col>
                      <h4>Duration: {dur} Min</h4>
                    </Col>
                    <Col>
                      <h4>Mode: {mode}</h4>
                    </Col>
                  </Row>
                </div>
                <hr className="my-4" />

                <div className="lead mb-0 ">
                  <Row className="mb-4">
                    {roleRes.includes("MENTOR") ? (
                       <Col className="text-center">
                       <Button
                         color="primary"
                         size="lg"
                         className="mt-4"
                         onClick={handleMentorClick}
                       >
                         My slots
                       </Button>
                     </Col>
                     ) : (
                      <Colxx xxs="12">
                        {!submissionStatus ? (
                          <>
                            <div className="p-2 justify-content-center">
                              <Row>
                                <Col>
                                  <h4 className="mt-2 text-left ml-4">
                                    {" "}
                                    Please rate your experience with {name}
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
                            </div>
                            <div className="">
                              <CardBody>
                                <CardTitle className="text-left">
                                  Please write about your experience with {name}
                                </CardTitle>
                                <ReactQuill
                                  theme="bubble"
                                  value={feedBack}
                                  onChange={(val) => setFeedBack(val)}
                                />
                              </CardBody>
                            </div>
                            <Button
                              color="primary"
                              size="lg"
                              disabled={isLoading}
                              onClick={handleSubmit}
                              className={`mt-2 btn-shadow btn-multiple-state ${
                                isLoading ? "show-spinner" : ""
                              }`}
                            >
                              <span className="spinner d-inline-block">
                                <span className="bounce1" />
                                <span className="bounce2" />
                                <span className="bounce3" />
                              </span>
                              <span className="label">Submit</span>
                            </Button>
                          </>
                        ) : (
                          <>
                          {post ? (
                            <div className="mt-2">
                              <CardBody>
                                <CardTitle className="h4">
                                  Thank you for your valuable feedback
                                </CardTitle>
                                <p className="lead">
                                  Your review submitted successfully!
                                </p>
                              </CardBody>
                            </div>) : (
                            <div className="mt-2">
                              <CardBody>
                                <CardTitle className="h4">
                                  Something went wrong
                                </CardTitle>
                                <p className="lead">
                                  Unable to submit your review 
                                </p>
                              </CardBody>
                            </div>)}
                            <Button
                              color="primary"
                              size="lg"
                              className="mt-4"
                              onClick={handleDashboardClick}
                            >
                              Dashboard
                            </Button>
                          </>
                        )}
                      </Colxx>
                    )}
                    
                  </Row>
                </div>
              </Jumbotron>
              
            </CardBody>
          </Card>
        </Colxx>
        )}
      </Row>
    </>
  );
};

export default VideoCallCompletedPage;
