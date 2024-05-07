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
import { NotificationManager } from 'components/common/react-notifications';
import { useParams, useHistory } from "react-router-dom";
import { Colxx } from "components/common/CustomBootstrap";
import ReactQuill from "react-quill";
import Rating from "components/common/Rating";

import "react-quill/dist/quill.snow.css";
import "react-quill/dist/quill.bubble.css";
import { baseUrl } from "constants/defaultValues";

const VideoCallCompletedPage = () => {
  const [feedBack, setFeedBack] = useState("");
  const [rating, setRating] = useState(0);
  const [submissionStatus, setSubmissionStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
  const [fromTime, setFromTime] = useState(0);
  const [toTime, setToTime] = useState(0);
  const [mode, setMode] = useState("");
  const [duration, setDuration] = useState(0)
  const [post, setPost] = useState(true)
  const { id, sid } = useParams();
  const history = useHistory();
  function getRoleRes() {
    return localStorage.getItem("roleRes");
  }
  const roleRes = getRoleRes();

  let getUrl;

if (roleRes === "MENTEE") {
  getUrl = `${baseUrl}/api/call-info-mentee/${sid}`;
} else  {
  getUrl = `${baseUrl}/api/call-info-mentor/${sid}`;
} 


  // console.log("id end:", id);

  useEffect(() => {
    const callEndDetails = async () => {
      try {
        const response = await axios.get(getUrl);
        const reviewData = response.data;
        // console.log("review data:", reviewData);
        if (reviewData) {
          setName(reviewData.name);
          setFromTime(reviewData.fromTime);
          setToTime(reviewData.toTime);
          setMode(reviewData.mode);
          setDuration(reviewData.duration)
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    callEndDetails();
  }, []);

  // const location = useLocation();
  // const searchParams = new URLSearchParams(location.search);
  // const name = searchParams.get("name");
  // const fromeTime = searchParams.get("fromeTime");
  // const totime = searchParams.get("totime");
  // const mode = searchParams.get("mode");
  // //   const dateString = "Thu Feb 21 56222 17:30:00 GMT 0530 (India Standard Time)";
  // const dateParts = fromeTime.split(" ");
  // const timeParts = dateParts[4].split(":");
  // const hours = timeParts[0];
  // const minutes = timeParts[1];
  // const seconds = timeParts[2];

  // const extractedfromeTime = `${hours}:${minutes}:${seconds}`;
  // console.log(extractedfromeTime);
  // const dateParts2 = totime.split(" ");
  // const timeParts2 = dateParts2[4].split(":");
  // const hours2 = timeParts2[0];
  // const minutes2 = timeParts2[1];
  // const seconds2 = timeParts2[2];

  // const extractedToTime = `${hours2}:${minutes2}:${seconds2}`;
  // console.log(extractedToTime);

  // const revieweeId = 2;
  // const url = `${baseUrl}/api/rating`;
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
    setSubmissionStatus("success");
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
      .then((response) => {
        console.log(response.data);
        setSubmissionStatus("success");
        setTimeout(() => {
          setIsLoading(false);
        }, 3000);
      })
      .catch((error) => {
        console.error("Error submitting data:", error);
        console.log(error.response.data.error.message);
        const er = error.response.data.error.message;
        NotificationManager.warning(er, 'Error submitting review', 3000, null, null, '');

        setSubmissionStatus("success");
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

  const handleHomeClick = () => {
    history.push("/app/profile");
  };
  

  const FromDate = new Date(parseInt(fromTime, 10));
  const ToDate = new Date(parseInt(toTime, 10));

  const fromHours = FromDate.getHours() % 12 || 12;
  const fromMinutes = String(FromDate.getMinutes()).padStart(2, "0");
  const fromPeriod = FromDate.getHours() < 12 ? "AM" : "PM";

  const toHours = ToDate.getHours() % 12 || 12;
  const toMinutes = String(ToDate.getMinutes()).padStart(2, "0");
  const toPeriod = ToDate.getHours() < 12 ? "AM" : "PM";

  const fromTime1 = `${fromHours}:${fromMinutes} ${fromPeriod}`;
  const toTime1 = `${toHours}:${toMinutes} ${toPeriod}`;

  const msToMin = duration / 60000;
  const dur = msToMin.toFixed(2);

  return (
    <>
      <Row>
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
                      <h4 className="mr-2">Start time: {fromTime1}</h4>
                    </Col>
                    <Col>
                      <h4>End time: {toTime1}</h4>
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

                <p className="lead mb-0 ">
                  <Row className="mb-4">
                    {roleRes.includes("MENTOR") ? (
                       <Col className="text-center">
                       <Button
                         color="primary"
                         size="lg"
                         className="mt-4"
                         onClick={handleHomeClick}
                       >
                         Home
                       </Button>
                     </Col>
                     ) : (
                      <Colxx xxs="12">
                        {submissionStatus !== "success" ? (
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
                              onClick={handleHomeClick}
                            >
                              Home
                            </Button>
                          </>
                        )}
                      </Colxx>
                    )}
                    
                  </Row>
                </p>
              </Jumbotron>
            </CardBody>
          </Card>
        </Colxx>
      </Row>
    </>
  );
};

export default VideoCallCompletedPage;
