import axios from "axios";
import ThumbnailLetters from "components/cards/ThumbnailLetters";
import { Colxx } from "components/common/CustomBootstrap";
import { baseUrl } from "constants/defaultValues";
import { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import {
  Badge,
  Button,
  Card,
  CardBody,
  Col,
  Label,
  NavLink,
  Row,
} from "reactstrap";

// This is mentor view for the upcoming sessions
const MentorSessionUpcoming = () => {
  // const { sessions } = location.state || {}; // Retrieve sessions from location state
  const [session, setSession] = useState("");
  const [upcomingsession, setUpcomingSession] = useState("");
  const [showSuccessCard, setShowSuccessCard] = useState(false);
  const location = useLocation();

  // const url1=`${baseUrl}/mentorSessionUpcomingHistory`;

  // if you want to change the url to backend uncomment the below line
  const url1 = `${baseUrl}/api/calendar/mentor/upcoming-bookedslots-session-history`;

  //  const deployType = 'dev'; // 'dev' or 'production'

  // const urls = {
  //     dev: {
  //         "baseUrl":'localhost:3001',
  //         "mentorApp": "mentorSessionUpcomingHistory"

  //     },
  //     production: {
  //         "baseUrl": "localhost:9091",
  //         "mentorApp": "/api/calendar/mentor/upcoming-bookedslots-session-history"

  //     }
  // };

  // const { baseUrl, mentorApp } = urls[deployType];
  // const getURL = (urlSlug) => {
  //   return urls[deployType][urlSlug]

  // };
  // const urlnew=`${baseUrl}` / getURL("mentorApp");
  const history = useHistory();

  const handleJoinCall = (userId, id) => {
    const fullUrl = `/app/videocall/${userId}/${id}`;
    history.push(fullUrl);
  };
  useEffect(() => {
    //   console.log("Deploy Type:", deployType);
    // console.log("Base URL:", urls[deployType].baseUrl);
    // console.log("Mentor App URL:", urls[deployType].mentorApp);

    const SessionHistroy = async () => {
      try {
        const response = await axios.get(url1);
        setSession(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    SessionHistroy();
    const SessionUpcomingHistroy = async () => {
      try {
        const response = (await axios.get(url1)) || [];
        setUpcomingSession(response.data.data);
        const queryParams = new URLSearchParams(location.search);
        const appointment = queryParams.get("appointment");
        setShowSuccessCard(appointment === "true");
        console.log("Upcoming Session Data:", response);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    SessionUpcomingHistroy();
  }, []);

  // const [currentTime, setCurrentTime] = useState(new Date())
  // useEffect(() => {
  //   const intervalId = setInterval(() => {
  //     setCurrentTime(new Date());
  //   }, 30000);

  //   return () => clearInterval(intervalId);
  // }, []);

  return (
    <div>
      <Row>
        <Colxx sm="12" md="12" lg="8" xxs="12" className="mx-auto ">
          {showSuccessCard && (
            <Card className="my-2">
              <CardBody className="text-center">
                <span className="text-xlarge text-primary">
                  <i className="simple-icon-check" />
                </span>
                <h3 className="text-center">
                  You have successfully scheduled appointment with mentorName
                </h3>
              </CardBody>
            </Card>
          )}
          <div className="my-3">
            <h2 className="font-weight-medium">Upcoming sessions</h2>

            <div>
              <div className="">
                {upcomingsession.upcomingSessions &&
                upcomingsession.upcomingSessions.length > 0 ? (
                  upcomingsession.upcomingSessions.map((up) => {
                    const date = new Date(up.fromTimeStamp);
                    const fromtime = new Date(up.fromTimeStamp);
                    const totime = new Date(up.toTimeStamp);
                    const updateformat = `${date.getDate()}/${
                      date.getMonth() + 1
                    }/${date.getFullYear()}`;
                    const timeOptions = { hour: "2-digit", minute: "2-digit" };

                    // const isWithinFiveMinutes = (fromTimeStamp) => {
                    //   const fiveMinutesInMs = 5 * 60 * 1000;
                    //   // const currentTime = new Date().getTime();
                    //   const fromTime = new Date(fromTimeStamp).getTime();
                    //   const timeDiff = fromTime - currentTime;

                    //   return timeDiff >= 0 && timeDiff <= fiveMinutesInMs;
                    // };

                    return (
                      <div key={up.menteeId}>
                        <Card className="my-4">
                          <Badge
                            color="primary"
                            pill
                            className="position-absolute badge-top-right"
                          >
                            NEW
                          </Badge>

                          <CardBody className="d-flex justify-content-between flex-wrap">
                            {/* <div className='d-flex justify-content-between flex-column'>
              
                <h4 className='text-large text-primary'>{up.name}</h4>
                
              </div> */}
                            <Row className="">
                              <Col className="d-flex">
                                <NavLink
                                  href={`/app/user/profile/${up.menteeId}`}
                                  className="d-flex align-items-center"
                                >
                                  {up.imageUrl === null ? (
                                    <ThumbnailLetters
                                      rounded
                                      text={up.name}
                                      alt="Card image cap"
                                      className="m-4"
                                    />
                                  ) : (
                                    <img
                                      style={{
                                        height: "140px",
                                        width: "140px",
                                      }}
                                      src={`${baseUrl}/${up.imageUrl}`}
                                      alt="Card  cap"
                                      className="m-4 rounded-circle"
                                    />
                                  )}

                                  <h4 className="text-large text-primary ml-2">
                                    {up.name}
                                  </h4>
                                </NavLink>
                              </Col>
                            </Row>
                            <div className="d-flex justify-content-around flex-column ">
                              <div className="d-flex">
                                <Label className="text-one">Date:</Label>
                                <h4 className="ml-2 font-weight-bold">
                                  {updateformat}
                                </h4>
                              </div>
                              <div className="d-flex justify-content-between">
                                <h4 className="mr-2">From:</h4>
                                <h4 className="mr-2 font-weight-bold">
                                  {fromtime.toLocaleTimeString([], timeOptions)}
                                </h4>
                                <h4>to</h4>
                                <h4 className="font-weight-bold mx-2">
                                  {totime.toLocaleTimeString([], timeOptions)}
                                </h4>
                              </div>
                              <div className="d-flex">
                                <Label className="text-one mr-2">Mode:</Label>
                                <h4 className="font-weight-bold">{up.mode}</h4>
                              </div>
                              <Button
                                outline
                                color="primary"
                                className="mt-2 text-one "
                                onClick={() =>
                                  handleJoinCall(up.menteeId, up.id)
                                }
                              >
                                Join Call
                              </Button>
                            </div>
                          </CardBody>
                        </Card>
                      </div>
                    );
                  })
                ) : (
                  <Card>
                    <CardBody>
                      <h3>No upcoming sessions</h3>
                    </CardBody>
                  </Card>
                )}
              </div>
            </div>
          </div>
          <div className="my-3 mt-4">
            <h2 className="font-weight-medium">Session history</h2>

            <div>
              {session.history && session.history.length > 0 ? (
                session.history.map((sh) => {
                  const date = new Date(sh.fromTimeStamp);
                  const fromtime = new Date(sh.fromTimeStamp);
                  const totime = new Date(sh.toTimeStamp);
                  const timeOptions = { hour: "2-digit", minute: "2-digit" };
                  const shdateformat = `${date.getDate()}/${
                    date.getMonth() + 1
                  }/${date.getFullYear()}`;
                  const formatDuration = (durationInMs) => {
                    const durationInMinutes = durationInMs / (1000 * 60);
                    return durationInMinutes.toFixed(2); // Formats the number to two decimal places
                  };

                  return (
                    <Card className="my-2" key={sh.menteeId}>
                      <CardBody className="d-flex justify-content-between flex-wrap">
                        {/* <div className='d-flex justify-content-between flex-column'> */}
                        {/* <NavLink href={`/app/mentorprofile/${sh.mentorId}`}>
                <h4 className='text-large text-primary'>{sh.name}</h4>
              </NavLink> */}
                        {/* <h4 className='text-large text-primary'>{sh.name}</h4> */}

                        {/* </div> */}

                        <Row className="">
                          <Col className="d-flex">
                            <NavLink
                              href={`/app/user/profile/${sh.menteeId}`}
                              className="d-flex align-items-center"
                            >
                              {sh.imageUrl === null ? (
                                <ThumbnailLetters
                                  rounded
                                  text={sh.name}
                                  alt="Card image cap"
                                  className="m-4"
                                />
                              ) : (
                                <img
                                  style={{ height: "140px", width: "140px" }}
                                  src={`${baseUrl}/${sh.imageUrl}`}
                                  alt="Card  cap"
                                  className="m-4 rounded-circle"
                                />
                              )}

                              <h4 className="text-large text-primary ml-2">
                                {sh.name}
                              </h4>
                            </NavLink>
                          </Col>
                        </Row>

                        <div className="d-flex justify-content-around flex-column ">
                          <div className="d-flex">
                            <Label className="text-one">Date:</Label>
                            <h4 className="ml-2 font-weight-bold">
                              {shdateformat}
                            </h4>
                          </div>
                          <div className="d-flex">
                            <Label className="text-one mr-2">Duration:</Label>
                            {/* <h4 className='font-weight-bold'>{sh.duration/60000} minutes</h4> */}
                            <h4 className="font-weight-bold">
                              {formatDuration(sh.duration)} minutes
                            </h4>
                          </div>

                          <div className="d-flex justify-content-between">
                            <div className="d-flex">
                              <h4 className=" mr-2">From:</h4>
                              <h4 className="font-weight-bold">
                                {fromtime.toLocaleTimeString([], timeOptions)}
                              </h4>
                              <h4 className="mx-2">to</h4>
                              <h4 className="font-weight-bold">
                                {totime.toLocaleTimeString([], timeOptions)}
                              </h4>
                            </div>
                          </div>

                          <div className="d-flex">
                            <Label className="mr-2 text-one">Mode:</Label>
                            <h4 className="font-weight-bold ">{sh.mode}</h4>
                          </div>
                        </div>
                      </CardBody>
                    </Card>
                  );
                })
              ) : (
                <Card>
                  <CardBody>
                    <h3>No session history</h3>
                  </CardBody>
                </Card>
              )}
            </div>
          </div>
        </Colxx>
      </Row>
    </div>
  );
};

export default MentorSessionUpcoming;
