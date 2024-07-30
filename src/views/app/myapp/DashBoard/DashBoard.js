import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  // CardImg,
  CardText,
  CardTitle,
  Col,
  NavLink,
  Row,
} from "reactstrap";
import { Colxx } from "components/common/CustomBootstrap";
import PerfectScrollbar from "react-perfect-scrollbar";
import "@glidejs/glide/dist/css/glide.core.min.css";
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import Rating from "components/common/Rating";
import ThumbnailLetters from "components/cards/ThumbnailLetters";
import { adminRoot, baseUrl } from "constants/defaultValues";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { alumniData } from "./Data";
import TimestampConverter from "../Calculation/TimestampConverter";
import language from "../my-login/Languages";

const DashBoard = () => {
  const [currentSessionIndex, setCurrentSessionIndex] = useState(0);
  const [currentMentorIndex, setCurrentMentorIndex] = useState(0);
  const [currentLawyerIndex, setCurrentLawyerIndex] = useState(0);
  const [currentAlumniIndex, setCurrentAlumniIndex] = useState(0);

  const [walletBalance, setWalletBalance] = useState(0);
  const [profileStatus, setProfileStatus] = useState(0);
  const [recentSessions, setRecentSessions] = useState([]);
  const [mentors, setMentors] = useState([{
    imageUrl: "",
    company: "",
    price: 0,
    firstName: "",
    lastName: "",
    jobTitle: "",
    experience: 0
  }]);
  const [lawyers, setLawyers] = useState([{
    imageUrl: "",
    firstName: "",
    price: 0,
    lastName: "",
    services: [],
    languages: []
  }]);
  const [alumni, setAlumni] = useState(alumniData);
  const [newSession, setNewSession] = useState(	[
      {
        id: 0,
        chatStatus: "",
        fromTimeStamp: 0,
        toTimeStamp: 0,
        mentorUserId: 0,
        mode: "",
        name: "",
        imageUrl: ""
      }
    ]);
  const [recentChats, setRecentChats] = useState([]);


  const walletUrl = `${baseUrl}/api/wallet/balance`;
  const profileStatusUrl = `${baseUrl}/api/userProfile/dashboard/status/profile-completion`;
  const mentorsUrl = `${baseUrl}/api/mentor/cards?page=0&size=10`;
  const sessionsUrl = `${baseUrl}/api/calendar/dashboard/appointment/session-history`;
  const lawyersUrl = `${baseUrl}/api/lawyer/lawyercards?page=0&size=10`;
  const alumniUrl = `${baseUrl}/api/dashboard/alumni`;
  const newSessionUrl = `${baseUrl}/api/calendar/dashboard/appointment/upcoming-bookedslots`;
  const recentChatsDataUrl = `${baseUrl}/api/chat/recent-contact`;

  // console.log("mentors",mentors)

  useEffect(() => {
    const fetchProfileStatus = async () => {
      try {
        const response = await axios.get(profileStatusUrl);
        setProfileStatus(response.data);
      } catch (error) {
        console.error('Error Fetching profile status:', error);
      }
    };

    fetchProfileStatus();
  }, []); 

  useEffect(() => {
    const fetchWalletBalance = async () => {
      try {
        const response = await axios.get(walletUrl);
        setWalletBalance(response.data.balance);
      } catch (error) {
        console.error('Error Fetching Balance:', error);
      }
    };

    fetchWalletBalance();
  }, []); 

  useEffect(() => {
    const fetchRecentSessions = async () => {
      try {
        const response = await axios.get(sessionsUrl);
        setRecentSessions(response.data);
      } catch (error) {
        console.error('Error Fetching RecentSessions:', error);
      }
    };

    fetchRecentSessions();
  }, []); 

  useEffect(() => {
    const fetchMentors = async () => {
      try {
        const response = await axios.get(mentorsUrl);
        setMentors(response.data.data);
      } catch (error) {
        console.error('Error Fetching Mentors:', error);
      }
    };

    fetchMentors();
  }, []); 

  useEffect(() => {
    const fetchLawyers = async () => {
      try {
        const response = await axios.get(lawyersUrl);
        setLawyers(response.data.data);
      } catch (error) {
        console.error('Error Fetching Lawyers:', error);
      }
    };

    fetchLawyers();
  }, []); 

  useEffect(() => {
    const fetchAlumni = async () => {
      try {
        const response = await axios.get(alumniUrl);
        setAlumni(response.data);
      } catch (error) {
        console.error('Error Fetching Alumni:', error);
      }
    };

    fetchAlumni();
  }, []); 

  useEffect(() => {
    const fetchNewsession = async () => {
      try {
        const response = await axios.get(newSessionUrl);
        setNewSession(response.data);
      } catch (error) {
        console.error('Error Fetching Newsession:', error);
      }
    };

    fetchNewsession();
  }, []); 

  useEffect(() => {
    const fetchRecentChats = async () => {
      try {
        const response = await axios.get(recentChatsDataUrl);
        setRecentChats(response.data);
      } catch (error) {
        console.error('Error Fetching RecentChats:', error);
      }
    };

    fetchRecentChats();
  }, []); 
  
  

  const renderDots = () => {
    // const total = React.Children.count(props.children);
    const total = newSession.length;
    const dots = [];
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < total; i++) {
      dots.push(
        <button
          type="button"
          className={`glide__bullet slider-dot ${i === currentSessionIndex ? 'bg-primary' : 'bg-light'}`}
          key={i}
          data-glide-dir={`=${i}`}
          onClick={() => setCurrentSessionIndex(i)}
        />
      );
    }
    return dots;
  };
  const renderMentorsDots = () => {
    // const total = React.Children.count(props.children);
    const total = mentors.length;
    const dots = [];
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < total; i++) {
      dots.push(
        <button
          type="button"
          className={`glide__bullet slider-dot ${i === currentMentorIndex ? 'bg-primary' : 'bg-light'}`}
          key={i}
          data-glide-dir={`=${i}`}
          onClick={() => setCurrentMentorIndex(i)}
        />
      );
    }
    return dots;
  };
  const renderLawyerDots = () => {
    // const total = React.Children.count(props.children);
    const total = lawyers.length;
    const dots = [];
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < total; i++) {
      dots.push(
        <button
          type="button"
          className={`glide__bullet slider-dot ${i === currentLawyerIndex ? 'bg-primary' : 'bg-light'}`}
          key={i}
          data-glide-dir={`=${i}`}
          onClick={() => setCurrentLawyerIndex(i)}
        />
      );
    }
    return dots;
  };
  const renderAlumniDots = () => {
    // const total = React.Children.count(props.children);
    const total = alumni.length;
    const dots = [];
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < total; i++) {
      dots.push(
        <button
          type="button"
          className={`glide__bullet slider-dot ${i === currentAlumniIndex ? 'bg-primary' : 'bg-light'}`}
          key={i}
          data-glide-dir={`=${i}`}
          onClick={() => setCurrentAlumniIndex(i)}
        />
      );
    }
    return dots;
  };
  // const renderDots = () => {
  //   const total = newSession.length;
  //   const dots = [];
  //   // eslint-disable-next-line no-plusplus
  //   for (let i = 0; i < total; i++) {
  //     dots.push(
  //       <button
  //         type="button"
  //         className={` btn-xs primary glide__bullet slider-dot p-0 mx-1 ${i === currentSessionIndex ? 'bg-primary' : 'bg-light'}`}
  //         key={i}
  //         onClick={() => setCurrentSessionIndex(i)}
  //         style={{ width: '10px', height: '10px' }}
  //       />
  //     );
  //   }
  //   return dots;
  // };
  const handlePrevious = () => {
    setCurrentSessionIndex((prevIndex) => 
      prevIndex > 0 ? prevIndex - 1 : newSession.length - 1
    );
  };

  const handleNext = () => {
    setCurrentSessionIndex((prevIndex) => 
      prevIndex < newSession.length - 1 ? prevIndex + 1 : 0
    );
  };


  const handleMentorPrevious = () => {
    setCurrentMentorIndex((prevIndex) => 
      prevIndex > 0 ? prevIndex - 1 : mentors.length - 1
    );
  };

  const handleMentorNext = () => {
    setCurrentMentorIndex((prevIndex) => 
      prevIndex < mentors.length - 1 ? prevIndex + 1 : 0
    );
  };


  const handleLawyerPrevious = () => {
    setCurrentLawyerIndex((prevIndex) => 
      prevIndex > 0 ? prevIndex - 1 : lawyers.length - 1
    );
  };

  const handleLawyerNext = () => {
    setCurrentLawyerIndex((prevIndex) => 
      prevIndex < lawyers.length - 1 ? prevIndex + 1 : 0
    );
  };


  const handleAlumniPrevious = () => {
    setCurrentAlumniIndex((prevIndex) => 
      prevIndex > 0 ? prevIndex - 1 : alumni.length - 1
    );
  };

  const handleAlumniNext = () => {
    setCurrentAlumniIndex((prevIndex) => 
      prevIndex < alumni.length - 1 ? prevIndex + 1 : 0
    );
  };


  const currentSession = newSession[currentSessionIndex];
  const currentMentor = mentors[currentMentorIndex];
  // const currentMentor = mentors && currentMentorIndex >= 0 && currentMentorIndex < mentors.length ? mentors[currentMentorIndex] : null;
  const currentLawyer = lawyers[currentLawyerIndex];
  // const currentLawyer = lawyers && currentLawyerIndex >= 0 && currentLawyerIndex < lawyers.length ? lawyers[currentLawyerIndex] : null;
  
  const currentAlumni = alumni[currentAlumniIndex];

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setCurrentSessionIndex(prevIndex => (prevIndex + 1) % newSession.length);
  //     setCurrentMentorIndex(prevIndex => (prevIndex + 1) % mentors.length);
  //     setCurrentLawyerIndex(prevIndex => (prevIndex + 1) % lawyers.length);
  //     setCurrentAlumniIndex(prevIndex => (prevIndex + 1) % alumni.length);
  //   }, 3000);
  //   return () => clearInterval(interval);
  // }, [newSession.length, mentors.length, lawyers.length, alumni.length]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSessionIndex((prevIndex) => 
        prevIndex < newSession.length - 1 ? prevIndex + 1 : 0
      );
    }, 3300);
    return () => clearInterval(interval);
  }, []);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMentorIndex((prevIndex) => 
        prevIndex < mentors.length - 1 ? prevIndex + 1 : 0
      );
    }, 3000);
    return () => clearInterval(interval);
  }, [mentors]);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentLawyerIndex((prevIndex) => 
        prevIndex < lawyers.length - 1 ? prevIndex + 1 : 0
      );
    }, 3600);
    return () => clearInterval(interval);
  }, [lawyers]);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAlumniIndex((prevIndex) => 
        prevIndex < alumni.length - 1 ? prevIndex + 1 : 0
      );
    }, 3800);
    return () => clearInterval(interval);
  }, [alumni]);
  const history = useHistory();

  const handleViewMentors = () => history.push("/app/mentor/list");
  const handleViewLawyers = () => history.push("/app/lawyer/list");
  const handleWalletClick = () => history.push("/app/mywallet");
  const handleProfileClick = () => history.push("/app/user/myprofile");
  const handleNewSessionClick = () => history.push("/app/sessionlists")

  return (
    <>
      <Row className="mx-auto" style={{ maxWidth: "1000px" }}>
        <Col xs={12} lg={3} className="mb-3 mb-lg-0">
          <Card
            className="h-100"
            style={{
              background: "linear-gradient(to right, #7B42C5, #AA5D93)",
              color: "white",
            }}
          >
            <div className="p-3 d-flex flex-column h-100">
            <Row className="d-flex align-items-center justify-content-between">
              <Col>
                <h3 className="mb-2 fw-bold">Profile Status</h3>
              </Col>
              <Col className="col-auto" xs="auto">
              <button 
              type="button"
              className="icon-button" 
              color="light" 
              onClick={handleProfileClick}
              style={{
                  padding: '0.05rem 0.15rem', 
                  fontSize: '0.4rem', 
                  borderRadius: '50%', 
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '1.5rem',
                  height: '1.5rem',
                  minWidth: '1.5rem', 
                  minHeight: '1.5rem',
                  border: 'none', 
                  outline: 'none'
              }}
            >
              <i className="simple-icon-pencil text-primary" style={{ fontSize: '0.6rem' }} />
              </button>
              </Col>
            </Row>
              <div className="mt-auto">
                <h1 className="mb-0 fw-bold display-6">{profileStatus.percentage} </h1>
                <span> % completed</span>
              </div>
            </div>
          </Card>
        </Col>
        <Col xs={12} lg={3} className="mb-3 mb-lg-0">
          <Card
            className="h-100"
            style={{
              background: "linear-gradient(to right, #7B42C5, #AA5D93)",
              color: "white",
            }}
          >
            <div className="p-3 d-flex flex-column h-100">
              <Row className="d-flex align-items-center justify-content-between">
                <Col>
              <h3 className="mb-2 fw-bold">Wallet Balance</h3>
              </Col>
              <Col className="col-auto" xs="auto">
              <button 
              type="button"
              className="icon-button" 
              color="light" 
              onClick={handleWalletClick}
              style={{
                  padding: '0.05rem 0.15rem', 
                  fontSize: '0.4rem', 
                  borderRadius: '50%', 
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '1.5rem',
                  height: '1.5rem',
                  minWidth: '1.5rem', 
                  minHeight: '1.5rem',
                  border: 'none', 
                  outline: 'none'
              }}
            >
              {/* <i className="iconsminds-add text-primary" style={{ fontSize: '0.8rem' }} /> */}
              <span className="text-primary" style={{ fontSize: '0.9rem' }}><strong>+</strong></span>
          </button>
              </Col>
            </Row>
              <div className="mt-auto">
                <h1 className="mb-0 fw-bold display-6">₹{walletBalance} </h1>
              </div>
            </div>
          </Card>
        </Col>
        <Col xs={12} lg={6} className="mb-3 mb-lg-0">
          <Card className="h-100">
            <div className="p-3 d-flex flex-column h-100">
              <Row className="">
                <Col>
                  {" "}
                  <h3 className="mb-3 fw-bold">New Session</h3>
                </Col>
                {currentSession && currentSession.length > 1 && (
                <Col className="d-flex justify-content-end">
                  <button
                  onClick={handlePrevious}
                    type="button"
                    className=" left-arrow btn btn-link btn-xs"
                    style={{ textDecoration: 'none',padding: "5px"  }}
                    // data-glide-dir="<"
                  >
                    <i className="simple-icon-arrow-left" />
                  </button>
                  <button
                  onClick={handleNext}
                    type="button"
                    className="glide__arrow glide__arrow--right right-arrow btn btn-link btn-xs"
                    data-glide-dir=">"
                    style={{ textDecoration: 'none', padding: "5px" }}
                  >
                    <i className="simple-icon-arrow-right" />
                  </button>
                </Col>
                )}
              </Row>
              {currentSession ? (
              <TransitionGroup>
                <CSSTransition
                  classNames="card"
                  timeout={500}
                >
              <div className="d-flex flex-row mt-auto glide-item card-transition">
                <img
                  className="rounded-circle me-3"
                  alt="Profile"
                  src={`${baseUrl}/${currentSession.imageUrl}`}
                  style={{ width: "40px", height: "40px", objectFit: "cover" }}
                />
                <div className="d-flex flex-grow-1 min-width-zero">
                  <div className="pl-0 align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero">
                    <div className="min-width-zero ml-2">
                      <h4 className="mb-1">{currentSession.name}</h4>
                      <h5 className="text-muted text-small mb-0">
                        {currentSession.chatStatus}
                      </h5>
                    </div>
                  </div>
                </div>
                <Col xs="auto">
                  <Button onClick={() => handleNewSessionClick()} color="primary" size="xs" outline>
                    <span><TimestampConverter timeStamp={currentSession.fromTimeStamp} format="datetime" /></span>
                  </Button>
                </Col>
              </div>
              </CSSTransition>
              </TransitionGroup>
              ) : ( 
                <div className="d-flex justify-content-center">
                  There is no new sessions
                  </div>
              )}
              <div className="d-flex justify-content-center">
                <div
                  className="glide__bullets slider-dot-container"
                  data-glide-el="controls[nav]"
                >
                  {renderDots()}
                </div>
              </div>
            </div>
          </Card>
        </Col>
      </Row>
      <Row className="mx-auto my-4 " style={{ maxWidth: "1000px" }}>
        <Colxx md="6" sm="6" lg="4" xxs="12">
          <Card className="mb-2">
            {currentMentor && (
            <CardBody>
              <Row className="mb-3 align-items-center">
                <Col>
                  <h3 className="mb-0 fw-bold">
                    <strong>Mentors</strong>
                  </h3>
                </Col>
                <Col xs="auto">
                  <Button size="xs" color="primary" onClick={handleViewMentors}>
                    <span>View all</span>
                  </Button>
                </Col>
              </Row>
              <div className="text-center">
                <Row>
                  <Col className="d-flex align-items-center">
                <button
                  onClick={handleMentorPrevious}
                    type="button"
                    className="glide__arrow glide__arrow--left left-arrow btn btn-link btn-xs"
                    data-glide-dir="<"
                    style={{ textDecoration: 'none' }}
                  >
                    <i className="simple-icon-arrow-left" />
                  </button>
                  </Col>
                  <Col className="d-flex justify-content-center align-items-center">
                {/* <CardImg
                  top
                  src={`${baseUrl}/${currentMentor.imageUrl}`}
                  alt="Card image cap"
                  className="img-thumbnail border-0 rounded-circle mb-2 list-thumbnail"
                /> */}
                {!currentMentor.imageUrl ? (
                <ThumbnailLetters
                    // small
                    rounded
                    text={currentMentor.firstName}
                    className="mx-2 mb-3"
                    color="secondary"
                  /> ) : (
                <img
                    src={`${baseUrl}/${currentMentor.imageUrl}`}
                    className=" rounded-circle mb-2"
                    style={{ width: "90px", height: "90px", objectFit: "cover", overflow: "hidden"  }}
                    alt="img"
                  /> )}
                </Col>
                <Col className="d-flex align-items-center justify-content-end">
                <button
                  onClick={handleMentorNext}
                    type="button"
                    className="glide__arrow glide__arrow--right right-arrow btn btn-link btn-xs"
                    data-glide-dir=">"
                    style={{ textDecoration: 'none' }}
                  >
                    <i className="simple-icon-arrow-right" />
                  </button>
                  </Col>
                </Row>
                <NavLink to="#">
                  <h3 className="mb-0">
                    <strong>{currentMentor.firstName} {" "} {currentMentor.lastName}</strong>
                  </h3>
                </NavLink>
                <CardText className="text-muted text-small mb-2">
                  {currentMentor.jobTitle} | {currentMentor.company}
                </CardText>
                <span>
                    {currentMentor.experience === undefined || currentMentor.experience === 0
                      ? "No experience"
                      : `${currentMentor.experience} years of experience`}
                  </span>

                <div className="separator mb-2 mt-2" />
                <h3 className="mb-0 fw-bold">
                  <strong>₹{currentMentor.price}/hr</strong>
                </h3>
              </div>
              <div className="d-flex justify-content-center">
                <div
                  className="glide__bullets slider-dot-container"
                  data-glide-el="controls[nav]"
                >
                  {renderMentorsDots()}
                </div>
              </div>
            </CardBody>
            )}
          </Card>
        </Colxx>
        <Colxx md="6" sm="6" lg="4" xxs="12">
          <Card className="mb-2">
            <CardBody>
              <Row className="mb-3 align-items-center">
                <Col>
                  <h3 className="mb-0 fw-bold">
                    <strong>Lawyers</strong>
                  </h3>
                </Col>
                <Col xs="auto">
                  <Button size="xs" color="primary" onClick={handleViewLawyers}>
                    <span>View all</span>
                  </Button>
                </Col>
              </Row>
              <div className="text-center">
              <Row>
                  <Col className="d-flex align-items-center">
                <button
                  onClick={handleLawyerPrevious}
                    type="button"
                    className="glide__arrow glide__arrow--left left-arrow btn btn-link btn-xs"
                    data-glide-dir="<"
                    style={{ textDecoration: 'none' }}
                  >
                    <i className="simple-icon-arrow-left" />
                  </button>
                  </Col>
                  <Col className="d-flex justify-content-center align-items-center">
                {/* <CardImg
                  top
                  src={currentLawyer.imageUrl}
                  alt="Card image cap"
                  className="img-thumbnail border-0 rounded-circle mb-2 list-thumbnail"
                /> */}
                {!currentLawyer.imageUrl ? (
                <ThumbnailLetters
                    // small
                    rounded
                    text={currentLawyer.firstName}
                    className="mx-2 mb-3"
                    color="secondary"
                  /> ) : (
                <img
                    src={`${baseUrl}/${currentLawyer.imageUrl}`}
                    className=" rounded-circle mb-2"
                    style={{ width: "90px", height: "90px", objectFit: "cover", overflow: "hidden"  }}
                    alt="img"
                  />)}
                </Col>
                <Col className="d-flex align-items-center justify-content-end">
                <button
                  onClick={handleLawyerNext}
                    type="button"
                    className="glide__arrow glide__arrow--right right-arrow btn btn-link btn-xs"
                    data-glide-dir=">"
                    style={{ textDecoration: 'none' }}
                  >
                    <i className="simple-icon-arrow-right" />
                  </button>
                  </Col>
                </Row>
                <NavLink to="#">
                  <h3 className="mb-0">
                    <strong>{currentLawyer.firstName}{" "}{currentLawyer.lastName}</strong>
                  </h3>
                </NavLink>
                {!currentLawyer === null ? (
                <CardText className="text-muted text-small mb-2 text-truncate">
                { currentLawyer.services.map((s, index) => (
                  <>
                    <span key={s}>{s}</span>
                    {index < currentLawyer.services.length - 1 && ' | '}
                  </>
                ))}
                </CardText>) : (
                <CardText className="text-muted text-small mb-2 text-truncate">
                  No services
                </CardText>

                )}
                <span className="text-truncate">{currentLawyer.languages.map((lang, index) => (
                  <>
                    <span key={lang}>{language.find((l) => l.iso_code === lang)?.name}</span>
                    {index < currentLawyer.languages.length - 1 && ' | '}
                  </>
                ))}</span>
                <div className="separator mb-2 mt-2" />
                <h3 className="mb-0 fw-bold">
                  <strong>₹{currentLawyer.price}/mo</strong>
                </h3>
              </div>
              <div className="d-flex justify-content-center">
                <div
                  className="glide__bullets slider-dot-container"
                  data-glide-el="controls[nav]"
                >
                  {renderLawyerDots()}
                </div>
              </div>
            </CardBody>
          </Card>
        </Colxx>
        <Colxx md="6" sm="6" lg="4" xxs="12">
          <Card className="mb-2">
            <CardBody>
              <Row className="mb-3 align-items-center">
                <Col>
                  <h3 className="mb-0 fw-bold">
                    <strong>Alumni</strong>
                  </h3>
                </Col>
                <Col xs="auto">
                  <Button size="xs" color="primary">
                    <span>View all</span>
                  </Button>
                </Col>
              </Row>
              <div className="text-center">
              <Row>
                  <Col className="d-flex align-items-center">
                <button
                  onClick={handleAlumniPrevious}
                    type="button"
                    className="glide__arrow glide__arrow--left left-arrow btn btn-link btn-xs"
                    data-glide-dir="<"
                    style={{ textDecoration: 'none' }}
                  >
                    <i className="simple-icon-arrow-left" />
                  </button>
                  </Col>
                  <Col className="d-flex justify-content-center align-items-center">
                {/* <CardImg
                  top
                  src={currentAlumni.imageUrl}
                  alt="Card image cap"
                  className="img-thumbnail border-0 rounded-circle mb-2 list-thumbnail"
                /> */}
                {!currentAlumni.imageUrl ? (
                <ThumbnailLetters
                    // small
                    rounded
                    text={currentAlumni.name}
                    className="mx-2 mb-3"
                    color="secondary"
                  /> ) : (
                <img
                    src={currentAlumni.imageUrl}
                    className=" rounded-circle mb-2"
                    style={{ width: "90px", height: "90px", objectFit: "cover", overflow: "hidden"  }}
                    alt="img"
                  /> )}
                </Col>
                <Col className="d-flex align-items-center justify-content-end">
                <button
                  onClick={handleAlumniNext}
                    type="button"
                    className="glide__arrow glide__arrow--right right-arrow btn btn-link btn-xs"
                    data-glide-dir=">"
                    style={{ textDecoration: 'none' }}
                  >
                    <i className="simple-icon-arrow-right" />
                  </button>
                  </Col>
                </Row>
                <NavLink to="#">
                  <h3 className="mb-0">
                    <strong>{currentAlumni.name}</strong>
                  </h3>
                </NavLink>
                <CardText className="text-muted text-small mb-2">
                  {currentAlumni.jobTitle} | {currentAlumni.company}
                </CardText>
                <span>{currentAlumni.experience} years of experience</span>
                <div className="separator mb-2 mt-2" />
                <h3 className="mb-0 fw-bold">
                  <strong>₹{currentAlumni.price}/mo</strong>
                </h3>
              </div>
              <div className="d-flex justify-content-center">
                <div
                  className="glide__bullets slider-dot-container"
                  data-glide-el="controls[nav]"
                >
                  {renderAlumniDots()}
                </div>
              </div>
            </CardBody>
          </Card>
        </Colxx>
      </Row>
      <Row className="mx-auto  " style={{ maxWidth: "1000px" }}>
        <Colxx lg="7" md="6" className="mb-2">
          {/* <Col lg={7}> */}
          <Card>
            <CardBody>
              <CardTitle>
                <strong>Recent Sessions</strong>
              </CardTitle>
              <div className="dashboard-list-with-user">
                <PerfectScrollbar
                  options={{ suppressScrollX: true, wheelPropagation: false }}
                >
                  {recentSessions.length > 0 ? (
                  <>
                  {recentSessions && recentSessions.map((sessions, index) => {
                    return (
                      <div
                        // eslint-disable-next-line react/no-array-index-key
                        key={index}
                        className="d-flex flex-row mb-2 pb-2 border-bottom"
                      >
                        <NavLink to="">
                          <img
                            src={sessions.imageUrl}
                            alt={sessions.name}
                            className="img-thumbnail border-0 rounded-circle list-thumbnail align-self-center xsmall"
                          />
                        </NavLink>
                        <Row className=" w-100">
                          <Col>
                            {/* <div className="pl-2 pr-2"> */}
                            <NavLink to="#">
                              <p className="font-weight-medium mb-0 ">
                                {sessions.name}
                              </p>
                              <p className="text-muted mb-0 text-small">
                                {sessions.chatStatus}
                              </p>
                            </NavLink>
                            {/* </div> */}
                          </Col>
                          <Col className="mt-3 mt-3 d-flex flex-column align-items-center">
                            {/* <div className="mt-3 pr-2 ml-4"> */}
                            <p className="text-muted mb-0 text-small">
                              <TimestampConverter timeStamp={sessions.fromTimeStamp} format="date" />
                            </p>
                            <p className="text-muted mb-0 text-small">
                            <TimestampConverter timeStamp={sessions.fromTimeStamp} format="time" /> - <TimestampConverter timeStamp={sessions.toTimeStamp} format="time" />
                            </p>
                            {/* </div> */}
                          </Col>
                          <Col className="mt-3">
                            {/* <div className="d-flex justify-end ml-4 mr-2 pr-2 mt-3"> */}
                            <Rating total={5} rating={sessions.star} interactive={false} />
                            {/* </div> */}
                          </Col>
                        </Row>
                      </div>
                    );
                  })}
                  </>
                  ) : (
                    <div className="d-flex justify-content-center">
                    There is no recent sessions
                  </div>
                  )}
                </PerfectScrollbar>
              </div>
            </CardBody>
          </Card>
          {/* </Col> */}
        </Colxx>
        <Colxx lg="5" md="6" className="mb-2">
          {/* <Col lg={5}> */}
          <Card>
            <CardBody>
              <CardTitle>
                <strong>Recent Chats</strong>
              </CardTitle>
              <div className="dashboard-list-with-user">
                <PerfectScrollbar
                  options={{ suppressScrollX: true, wheelPropagation: false }}
                >
                  {recentChats.length > 0 ? (
                  <>
                  {recentChats && recentChats.map((chats, index) => {
                    return (
                      <div
                        // eslint-disable-next-line react/no-array-index-key
                        key={index}
                        className="d-flex flex-row mb-2 pb-2 border-bottom"
                      >
                        <NavLink href={`${adminRoot}/chat/${chats.username}`} >
                          <img
                            src={`${baseUrl}/${chats.imageUrl}`}
                            alt={chats.name}
                            // className="img-thumbnail border-0 rounded-circle list-thumbnail align-self-center xsmall"
                             className=" rounded-circle img-thumbnail border"
                            style={{ width: "50px", height: "50px", objectFit: "cover", overflow: "hidden"  }}
                            
                          />
                        </NavLink>

                        <div className="pl-3 pr-2 mt-2">
                          <NavLink href={`${adminRoot}/chat/${chats.username}`}>
                            <p className="font-weight-medium mb-0 ">
                              {chats.name}
                            </p>
                            <p className="text-muted mb-0 text-small">
                              {chats.chatStatus}
                            </p>
                          </NavLink>
                        </div>
                      </div>
                    );
                  })}
                  </>
                  ) : (
                    <div className="d-flex justify-content-center">
                    There is no recent chats
                  </div>
                  )}
                </PerfectScrollbar>
              </div>
            </CardBody>
          </Card>
          {/* </Col> */}
        </Colxx>
      </Row>
    </>
  );
};

export default DashBoard;
