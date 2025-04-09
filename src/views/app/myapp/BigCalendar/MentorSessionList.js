import axios from "axios";
import ThumbnailLetters from "components/cards/ThumbnailLetters";
import { Colxx } from "components/common/CustomBootstrap";
import Pagination from "containers/pages/Pagination";
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

const MentorSessionList = () => {
  // const { sessions } = location.state || {}; // Retrieve sessions from location state
  const [session, setSession] = useState("");
  const [upcomingsession, setUpcomingSession] = useState("");
  const [sessionPagination, setSessionPagination] = useState("");
  const [showSuccessCard, setShowSuccessCard] = useState(false);
  const [mentorName, setMentorName] = useState("");

  
  const upcomingSessionsUrl = `${baseUrl}/api/calendar/user/upcoming-bookedslots`;
  const sessionHistoryUrl = `${baseUrl}/api/calendar/user/session-history`;

  const [currentPage, setCurrentPage] = useState(1);
  const [currentPage1, setCurrentPage1] = useState(1);
  const [pagination, setPagination] = useState("");

  
  const location = useLocation();

  const history = useHistory();

  const handleJoinCall = (userId, id) => {
    const fullUrl = `/app/videocall/${userId}/${id}`;
    history.push(fullUrl);
  };

  useEffect(() => {
    const SessionHistroy = async () => {
      try {
         const response = await axios.get(`${sessionHistoryUrl}?page=${currentPage1 -1}&size=10&role=MENTOR`);
         setSession(response.data.data);
         setSessionPagination(response.data.paginationMeta);
      

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    
    const SessionUpcomingHistroy = async () => {
      try {
        const response = await axios.get(`${upcomingSessionsUrl}?page=${currentPage -1}&size=10&role=MENTOR`);
        setUpcomingSession(response.data.data );
        setPagination(response.data.paginationMeta );
      
        const queryParams = new URLSearchParams(location.search);
        const appointment = queryParams.get("appointment");
        // setShowSuccessCard(appointment === 'true');
        if (
          appointment === "true" &&
          response.data.data.upcomingSessions.length > 0
        ) {
          setMentorName(response.data.data.upcomingSessions[0].name);
          setShowSuccessCard(true);
        } else {
          setShowSuccessCard(false);
        }
        console.log("Upcoming Session Data:", response);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    SessionHistroy();
    SessionUpcomingHistroy();
  }, [currentPage, currentPage1, location.search]);


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
        <Colxx sm="12" md="12" lg="7" xxs="12" className="mx-auto ">
          {/* <Card className='my-2' >
          <CardBody className='text-center'>
          <span className='text-xlarge text-primary'><i className='simple-icon-check'/></span>
           <h3 className='text-center'>You have successfully scheduled appointment with mentorName</h3>
          </CardBody>
        </Card> */}
          {showSuccessCard && (
            <Card className="my-2">
              <CardBody className="text-center">
                <span className="text-xlarge text-primary">
                  <i className="simple-icon-check" />
                </span>
                <h3 className="text-center">
                  You have successfully scheduled appointment with {mentorName}
                </h3>
              </CardBody>
            </Card>
          )}
          <div className="my-3">
            <h2 className="font-weight-medium">Upcoming sessions</h2>

            <div>
              {/* <div  className=''>
       {upcomingsession.upcomingSessions&&upcomingsession.upcomingSessions.map((up)=>{
        const date=new Date(up.fromtimestamp);
            const fromtime = new Date(up.fromtimestamp);
            const totime=new Date(up.totimestamp);
            const updateformat = `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`;
            const timeOptions = { hour: '2-digit', minute: '2-digit' };
          
          return (
            <div key={up.mentorId}>
            <Card className='my-4'>
        <Badge
                  color="primary"
                  pill
                  className="position-absolute badge-top-right"
                >
                  NEW
                </Badge>
          
          <CardBody className='d-flex justify-content-between' >
                <div className='d-flex justify-content-between flex-column'>
                <NavLink href={`/app/mentorprofile/${up.mentorId}`}>
                <h4 className='text-large text-primary'>{up.name}</h4>
                </NavLink>
                <div className='d-flex'>
                <Label className='text-one '>Date:</Label>
                 <h4 className='ml-2  font-weight-bold'>{updateformat}</h4>
                  </div>
              
                </div>
                <div className='d-flex justify-content-around flex-column '>
          
                  <div className='d-flex justify-content-between'>
                  <h4 className='mr-2'>From:</h4>
                  <h4 className='mr-2 font-weight-bold'> {fromtime.toLocaleTimeString([], timeOptions)}</h4>
                  <h4>to</h4>
                  <h4 className=' font-weight-bold mx-2'>  {totime.toLocaleTimeString([],timeOptions)}</h4>
                  </div>
                  <div className='d-flex'>
                  <Label className='text-one mr-2 '>Mode:</Label>
                  <h4 className='font-weight-bold'>{up.mode}</h4>
                  </div>
                
                      <Button outline color='primary' className='mt-2 text-one' onClick={() => handleJoinCall(up.name)}>Join Call</Button> 
              
                 
                </div>
              </CardBody>
        </Card>
            </div>
          )
          
        })
        }
        
       </div> */}

              <div className="">
                {
                upcomingsession.length > 0 ? (
                  upcomingsession.map((up) => {
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
                      <div key={up.mentorId}>
                        <Card className="my-4 ">
                          <Badge
                            color="primary"
                            pill
                            className="position-absolute badge-top-right"
                          >
                            NEW
                          </Badge>

                          <CardBody className="d-flex justify-content-between flex-wrap">
                            {/* <div className='d-flex justify-content-between flex-column'>
                
              <NavLink href={`/app/mentorprofile/${up.mentorId}`} className='d-flex align-items-center'>
              <ThumbnailImage
                rounded
                small
                src="/assets/img/profiles/l-1.jpg"
                alt="profile"
                className="text-start"
              />
              <h4 className='text-large text-primary ml-2'>{up.name}</h4>
            </NavLink>
            <div className='d-flex align-items-center'>
              <Label className='text-one mr-2'>Date:</Label>
              <h4 className='font-weight-bold'>{updateformat}</h4>
            </div>
              </div> */}
                            <Row className="">
                              <Col className="d-flex">
                                <NavLink
                                  href={`/app/mentorprofile/${up.mentorId}`}
                                  className="d-flex align-items-center"
                                >
                                  {/* <ThumbnailImage
                  rounded
                  // src="/assets/img/profiles/l-1.jpg"
                  // src={`${baseUrl}/api/public/images/${up.mentorId}/profile-pic`}
                
                  src={`${baseUrl}/${up.imageUrl}`}
                  alt="Card image cap"
                  className="m-4"
                /> */}{" "}
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
                                  {/* <img
                                    style={{ height: "140px", width: "140px" }}
                                    src={`${baseUrl}/${up.imageUrl}`}
                                    alt="Card  cap"
                                    className="m-4 rounded-circle"
                                  /> */}
                                  <h4 className="text-large text-primary ml-2">
                                    {up.name}
                                  </h4>
                                </NavLink>
                              </Col>
                            </Row>

                            <div className="d-flex justify-content-around flex-column ">
                              <div className="d-flex ">
                                <Label className="text-one mr-2">Date:</Label>
                                <h4 className="font-weight-bold ">
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
                                  handleJoinCall(up.mentorId, up.id)
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
          <Pagination
            currentPage={currentPage}
            totalPage={pagination.totalPage}
            onChangePage={(i) => setCurrentPage(i)}
            lastIsActive={pagination.last}
            firstIsActive={pagination.first}
          />
          <div className="my-3 mt-4">
            <h2 className="font-weight-medium">Session history</h2>
            {/* <div>
           {session.history&&session.history.map((sh)=>{
            const date=new Date(sh.fromtimestamp);
            const fromtime = new Date(sh.fromtimestamp);
            const totime=new Date(sh.totimestamp);
            const timeOptions = { hour: '2-digit', minute: '2-digit' };
            const shdateformat = `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`;
            return(
              
              <Card className='my-2 ' key={sh.mentorId}>
              <CardBody className='d-flex justify-content-between' >
                <div className='d-flex justify-content-between flex-column'>
                <NavLink href={`/app/mentorprofile/${sh.mentorId}`}>
                <h4 className='text-large text-primary'>{sh.name}</h4>
                </NavLink>
                 
                
                  <div className='d-flex'>
                  <Label className='text-one'>Date:</Label>
                  <h4 className='ml-2 font-weight-bold'>{shdateformat}</h4>
                  </div>
                 
                </div>
                <div className='d-flex justify-content-around flex-column '>
                <div className='d-flex'>
                  <Label className='text-one mr-2'>Duration:</Label>
                  <h4 className='font-weight-bold'>{sh.duration}</h4>
                </div>
                 
                  <div className='d-flex justify-content-between'>
                  <div className='d-flex'>
                  <h4 className=' mr-2'>From:</h4>
                  <h4 className='font-weight-bold'>{fromtime.toLocaleTimeString([], timeOptions)}</h4>
                  <h4 className='mx-2'>to</h4>
                  <h4 className='font-weight-bold'>{totime.toLocaleTimeString([],timeOptions)}</h4>
                </div>
                 
                  </div>
                  <div className='d-flex'>
                  <Label className='mr-2 text-one'>Mode:</Label>
                  <h4 className='font-weight-bold '>{sh.mode}</h4>
                  </div>
          
                </div>
              </CardBody>
            </Card>
            )
           })}
           
          </div> */}
            <div>
              {session && session.length > 0 ? (
                session.map((sh) => {
                  const date = new Date(sh.fromTimeStamp);
                  const fromtime = new Date(sh.fromTimeStamp);
                  const totime = new Date(sh.toTimeStamp);
                  const timeOptions = { hour: "2-digit", minute: "2-digit" };
                  const shdateformat = `${date.getDate()}/${
                    date.getMonth() + 1
                  }/${date.getFullYear()}`;

                  // Calculate duration in minutes
                  /* const durationInMs = totime.getTime() - fromtime.getTime(); */
                  /* const durationInMinutes = Math.floor(durationInMs / (1000 * 60));  */
                  const formatDuration = (durationInMs) => {
                    const durationInMinutes = durationInMs / (1000 * 60);
                    return durationInMinutes.toFixed(2); // Formats the number to two decimal places
                  };

                  return (
                    <Card className="my-2" key={sh.mentorId}>
                      {/* <CardBody className='d-flex justify-content-between'>
            <div className='d-flex justify-content-between flex-column'>
              <NavLink href={`/app/mentorprofile/${sh.mentorId}`}>
                <h4 className='text-large text-primary'>{sh.name}</h4>
              </NavLink>

              <div className='d-flex'>
                <Label className='text-one'>Date:</Label>
                <h4 className='ml-2 font-weight-bold'>{shdateformat}</h4>
              </div>
            </div>

            <div className='d-flex justify-content-around flex-column '>
              <div className='d-flex'>
                <Label className='text-one mr-2'>Duration:</Label>
                <h4 className='font-weight-bold'>{sh.duration/60000} minutes</h4>
                <h4 className='font-weight-bold'>{durationInMinutes}</h4>
                <h4 className='font-weight-bold'>{formatDuration(sh.duration)} minutes</h4>
              </div>

              <div className='d-flex justify-content-between'>
                <div className='d-flex'>
                  <h4 className=' mr-2'>From:</h4>
                  <h4 className='font-weight-bold'>{fromtime.toLocaleTimeString([], timeOptions)}</h4>
                  <h4 className='mx-2'>to</h4>
                  <h4 className='font-weight-bold'>{totime.toLocaleTimeString([], timeOptions)}</h4>
                </div>
              </div>

              <div className='d-flex'>
                <Label className='mr-2 text-one'>Mode:</Label>
                <h4 className='font-weight-bold '>{sh.mode}</h4>
              </div>
            </div>
          </CardBody> */}

                      <CardBody className="d-flex justify-content-between flex-wrap">
                        <Row className="">
                          <Col className="d-flex">
                            <NavLink
                              href={`/app/mentorprofile/${sh.mentorId}`}
                              className="d-flex align-items-center"
                            >
                              {/* <ThumbnailImage
                                rounded
                                // src="/assets/img/profiles/l-1.jpg"
                                // src={`${baseUrl}/api/public/images/${sh.mentorId}/profile-pic`}
                                // src={sh.imageUrl}
                                src={`${baseUrl}/${sh.imageUrl}`}
                                alt="Card image cap"
                                className="m-4"
                              /> */}
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
                          <div className="d-flex ">
                            <Label className="text-one mr-2">Date:</Label>
                            <h4 className="font-weight-bold ">
                              {shdateformat}
                            </h4>
                          </div>
                          <div className="d-flex">
                            <Label className="text-one mr-2">Duration:</Label>

                            <h4 className="font-weight-bold">
                              {formatDuration(sh.duration)} minutes
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
                            <h4 className="font-weight-bold">{sh.mode}</h4>
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
      <Pagination
        currentPage={currentPage1}
        totalPage={sessionPagination.totalPage}
        onChangePage={(i) => setCurrentPage1(i)}
        lastIsActive={sessionPagination.last}
        firstIsActive={sessionPagination.first}
      />
    </div>
  );
};

export default MentorSessionList;
