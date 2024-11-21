import "@glidejs/glide/dist/css/glide.core.min.css";
import axios from "axios";
import ThumbnailLetters from "components/cards/ThumbnailLetters";
import GlideComponent from "components/carousel/GlideComponent";
import { Colxx } from "components/common/CustomBootstrap";
import CustomSelectInput from "components/common/CustomSelectInput";
import Rating from "components/common/Rating";
import { adminRoot, baseUrl } from "constants/defaultValues";
import React, { useEffect, useState } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import { useHistory } from "react-router-dom";
import Select from "react-select";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import {
  Button,
  Card,
  CardBody,
  CardImg,
  CardText,
  CardTitle,
  Col,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  NavLink,
  Row,
} from "reactstrap";
import TimestampConverter from "../Calculation/TimestampConverter";
import language from "../my-login/Languages";

// import { alumniData } from "./Data";

const DashBoard = () => {
  const [modalBasic, setModalBasic] = useState(false);
  const [currentSessionIndex, setCurrentSessionIndex] = useState(0);
  const [currentMentorIndex, setCurrentMentorIndex] = useState(0);
  const [currentLawyerIndex, setCurrentLawyerIndex] = useState(0);
  const [currentAlumniIndex, setCurrentAlumniIndex] = useState(0);
  const [currentJobIndex, setCurrentJobIndex] = useState(0);
  const [currentStayIndex, setCurrentStayIndex] = useState(0);
  const [currentBatchMateIndex, setCurrentBatchMateIndex] = useState(0);
  const history = useHistory();

  const [walletBalance, setWalletBalance] = useState(0);
  const [profileStatus, setProfileStatus] = useState(0);
  const [recentSessions, setRecentSessions] = useState([]);
  const [mentors, setMentors] = useState([
    {
      imageUrl: "",
      company: "",
      price: 0,
      firstName: "",
      lastName: "",
      jobTitle: "",
      experience: 0,
    },
  ]);
  const [lawyers, setLawyers] = useState([
    {
      imageUrl: "",
      firstName: "",
      price: 0,
      lastName: "",
      services: [],
      languages: [],
    },
  ]);
  // const [alumni, setAlumni] = useState(alumniData);
  const [alumni, setAlumni] = useState([
    {
      imageUrl: "",
      company: "",
      price: 0,
      firstName: "",
      lastName: "",
      jobTitle: "",
      experienceYears: 0,
    },
  ]);
  const [newSession, setNewSession] = useState([
    {
      id: 0,
      chatStatus: "",
      fromTimeStamp: 0,
      toTimeStamp: 0,
      mentorUserId: 0,
      mode: "",
      name: "",
      imageUrl: "",
    },
  ]);
  const [recentChats, setRecentChats] = useState([]);
  const [dashboardQuestions, setDashboardQuestions] = useState([]);
  const [jobList, setJobList] = useState("");
  const [stayList, setStaylist] = useState("");
  const [batchMates, setBatchMates] = useState("");
  const [inputkey, setInputKey] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const SelectedCategoryOptions = [
    { label: "IT", value: "IT", key: 0 },
    {
      label: "MANUFACTURING_MECHANICAL",
      value: "MANUFACTURING_MECHANICAL",
      key: 1,
    },
    { label: "CIVIL", value: "CIVIL", key: 2 },
    { label: "INTERVIEW_PREPARATION", value: "INTERVIEW_PREPARATION", key: 3 },
    { label: "UNIV_ADMISSIONS", value: "UNIV_ADMISSIONS", key: 4 },
    { label: "RESUMES_WRITTING", value: "RESUMES_WRITTING", key: 5 },
    { label: "VISA_ASSITANCE", value: "VISA_ASSITANCE", key: 6 },
  ];

  // useEffect(() => {
  //   if (selectedCategory?.value === "VISA_ASSITANCE") {
  //     history.push("/app/lawyer/list");
  //   }
  // }, [selectedCategory]);

  useEffect(() => {
    if (selectedCategory?.value === "VISA_ASSITANCE") {
      history.push("/app/lawyer/list");
    } else if (selectedCategory) {
      history.push({
        pathname: "/app/mentor/list",
        state: { category: selectedCategory },
      });
    }
  }, [selectedCategory, history]);
  console.log("selected", selectedCategory);

  const walletUrl = `${baseUrl}/api/wallet/balance`;
  const profileStatusUrl = `${baseUrl}/api/userprofile/dashboard/status/profile-completion`;
  const mentorsUrl = `${baseUrl}/api/mentor/cards?page=0&size=10`;
  const sessionsUrl = `${baseUrl}/api/calendar/dashboard/appointment/session-history`;
  const lawyersUrl = `${baseUrl}/api/lawyer/lawyercards?page=0&size=10`;
  // const alumniUrl = `${baseUrl}/api/dashboard/alumni`;
  const batchUrl = `${baseUrl}/api/userprofile/dashboard/batchmates`;
  const alumniUrl = `${baseUrl}/api/alumni/cards?page=0&size=10`;
  const newSessionUrl = `${baseUrl}/api/calendar/dashboard/appointment/upcoming-bookedslots`;
  const recentChatsDataUrl = `${baseUrl}/api/chat/recent-contact`;
  const questionsUrl = `${baseUrl}/api/dashboard/latest`;
  const joblistUrl = `${baseUrl}/api/posts/job-post/dashboard`;
  const staylistUrl = `${baseUrl}/api/posts/stay-post/dashboard`;

  // console.log("mentors",mentors)

  const fetchProfileStatus = async () => {
    try {
      const response = await axios.get(profileStatusUrl);
      setProfileStatus(response.data);
    } catch (error) {
      console.error("Error Fetching profile status:", error);
    }
  };
  const fetchWalletBalance = async () => {
    try {
      const response = await axios.get(walletUrl);
      setWalletBalance(response.data.balance);
    } catch (error) {
      console.error("Error Fetching Balance:", error);
    }
  };
  const fetchRecentSessions = async () => {
    try {
      const response = await axios.get(sessionsUrl);
      setRecentSessions(response.data);
    } catch (error) {
      console.error("Error Fetching RecentSessions:", error);
    }
  };

  const fetchMentors = async () => {
    try {
      const response = await axios.get(mentorsUrl);
      setMentors(response.data.data);
    } catch (error) {
      console.error("Error Fetching Mentors:", error);
    }
  };

  const fetchBatchMates = async () => {
    try {
      const response = await axios.get(batchUrl);
      setBatchMates(response.data);
    } catch (error) {
      console.error("Error Fetching Mentors:", error);
    }
  };

  const fetchLawyers = async () => {
    try {
      const response = await axios.get(lawyersUrl);
      setLawyers(response.data.data);
    } catch (error) {
      console.error("Error Fetching Lawyers:", error);
    }
  };

  const fetchAlumni = async () => {
    try {
      const response = await axios.get(alumniUrl);
      setAlumni(response.data.data);
    } catch (error) {
      console.error("Error Fetching Alumni:", error);
    }
  };

  const fetchNewsession = async () => {
    try {
      const response = await axios.get(newSessionUrl);
      setNewSession(response.data);
    } catch (error) {
      console.error("Error Fetching Newsession:", error);
    }
  };

  const fetchRecentChats = async () => {
    try {
      const response = await axios.get(recentChatsDataUrl);
      setRecentChats(response.data);
    } catch (error) {
      console.error("Error Fetching RecentChats:", error);
    }
  };

  const fetchLatestQuestions = async () => {
    try {
      const response = await axios.get(questionsUrl);
      setDashboardQuestions(response.data);
    } catch (error) {
      console.error("Error Fetching questions and answers", error);
    }
  };

  const fetchJobList = async () => {
    try {
      const response = await axios.get(joblistUrl);
      setJobList(response.data);
    } catch (error) {
      console.error("Error Fetching joblist status:", error);
    }
  };

  const fetchStayList = async () => {
    try {
      const response = await axios.get(staylistUrl);
      setStaylist(response.data);
    } catch (error) {
      console.error("Error Fetching Staylist status:", error);
    }
  };

  useEffect(() => {
    fetchProfileStatus();
    fetchWalletBalance();
    fetchRecentSessions();
    fetchMentors();
    fetchLawyers();
    fetchAlumni();
    fetchNewsession();
    fetchRecentChats();
    fetchLatestQuestions();
    fetchJobList();
    fetchStayList();
    fetchBatchMates();
  }, [dashboardQuestions]);

  const renderDots = () => {
    // const total = React.Children.count(props.children);
    const total = newSession.length;
    const dots = [];
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < total; i++) {
      dots.push(
        <button
          type="button"
          className={`glide__bullet slider-dot ${
            i === currentSessionIndex ? "bg-primary" : "bg-light"
          }`}
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
          className={`glide__bullet slider-dot ${
            i === currentMentorIndex ? "bg-primary" : "bg-light"
          }`}
          key={i}
          data-glide-dir={`=${i}`}
          onClick={() => setCurrentMentorIndex(i)}
        />
      );
    }
    return dots;
  };
  const renderBatchMateDots = () => {
    // const total = React.Children.count(props.children);
    const total = batchMates.length;
    const dots = [];
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < total; i++) {
      dots.push(
        <button
          type="button"
          className={`glide__bullet slider-dot ${
            i === currentBatchMateIndex ? "bg-primary" : "bg-light"
          }`}
          key={i}
          data-glide-dir={`=${i}`}
          onClick={() => setCurrentBatchMateIndex(i)}
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
          className={`glide__bullet slider-dot ${
            i === currentLawyerIndex ? "bg-primary" : "bg-light"
          }`}
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
          className={`glide__bullet slider-dot ${
            i === currentAlumniIndex ? "bg-primary" : "bg-light"
          }`}
          key={i}
          data-glide-dir={`=${i}`}
          onClick={() => setCurrentAlumniIndex(i)}
        />
      );
    }
    return dots;
  };

  const renderJobListDots = () => {
    // const total = React.Children.count(props.children);
    const total = jobList.length;
    const dots = [];
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < total; i++) {
      dots.push(
        <button
          type="button"
          className={`glide__bullet slider-dot ${
            i === currentJobIndex ? "bg-primary" : "bg-light"
          }`}
          key={i}
          data-glide-dir={`=${i}`}
          onClick={() => setCurrentJobIndex(i)}
        />
      );
    }
    return dots;
  };

  const renderStayListDots = () => {
    // const total = React.Children.count(props.children);
    const total = stayList.length;
    const dots = [];
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < total; i++) {
      dots.push(
        <button
          type="button"
          className={`glide__bullet slider-dot ${
            i === currentStayIndex ? "bg-primary" : "bg-light"
          }`}
          key={i}
          data-glide-dir={`=${i}`}
          onClick={() => setCurrentStayIndex(i)}
        />
      );
    }
    return dots;
  };

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

  const handleBatchMatePrevious = () => {
    setCurrentBatchMateIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : batchMates.length - 1
    );
  };

  const handleBatchMateNext = () => {
    setCurrentBatchMateIndex((prevIndex) =>
      prevIndex < batchMates.length - 1 ? prevIndex + 1 : 0
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

  // const handleJobPrevious = () => {
  //   setCurrentJobIndex((prevIndex) =>
  //     prevIndex > 0 ? prevIndex - 1 : jobList.length - 1
  //   );
  // };

  // const handleJobNext = () => {
  //   setCurrentJobIndex((prevIndex) =>
  //     prevIndex < alumni.length - 1 ? prevIndex + 1 : 0
  //   );
  // };

  const currentSession = newSession[currentSessionIndex];
  const currentMentor = mentors[currentMentorIndex];
  // const currentMentor = mentors && currentMentorIndex >= 0 && currentMentorIndex < mentors.length ? mentors[currentMentorIndex] : null;
  const currentLawyer = lawyers[currentLawyerIndex];
  // const currentLawyer = lawyers && currentLawyerIndex >= 0 && currentLawyerIndex < lawyers.length ? lawyers[currentLawyerIndex] : null;

  const currentAlumni = alumni[currentAlumniIndex];
  const currentJobList = jobList[currentJobIndex];
  const currentStayList = stayList[currentStayIndex];
  const currentBatchMate = batchMates[currentBatchMateIndex];

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
    }, 3600);
    return () => clearInterval(interval);
  }, [mentors]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBatchMateIndex((prevIndex) =>
        prevIndex < batchMates.length - 1 ? prevIndex + 1 : 0
      );
    }, 3000);
    return () => clearInterval(interval);
  }, [batchMates]);

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

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentJobIndex((prevIndex) =>
        prevIndex < jobList.length - 1 ? prevIndex + 1 : 0
      );
    }, 3800);
    return () => clearInterval(interval);
  }, [jobList]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStayIndex((prevIndex) =>
        prevIndex < stayList.length - 1 ? prevIndex + 1 : 0
      );
    }, 3800);
    return () => clearInterval(interval);
  }, [stayList]);

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return `${String(date.getDate()).padStart(2, "0")}-${String(
      date.getMonth() + 1
    ).padStart(2, "0")}-${date.getFullYear()}`;
  };

  const handleViewMentors = () => history.push("/app/mentor/list");
  const handleViewLawyers = () => history.push("/app/lawyer/list");
  const handleViewAlumnis = () => history.push("/app/alumni/alumnilists");
  const handleWalletClick = () => history.push("/app/mywallet");
  const handleProfileClick = () => history.push("/app/user/myprofile");
  const handleNewSessionClick = () => history.push("/app/sessionlists");
  const handleViewBatchmates = () => history.push("/app/student/list");

  console.log("Current Mentor:", currentMentor);

  return (
    <>
      <Row className="mx-auto" style={{ maxWidth: "1000px" }}>
        <Col xs={12} lg={12} className="mb-3 mb-lg-0">
          <div className="form-group">
            <div className="input-group">
              <div
                style={{ position: "relative" }}
                className="col-12 col-lg-12 col-md-12"
              >
                <i
                  className="simple-icon-magnifier mr-3"
                  style={{
                    position: "absolute",
                    top: "50%",
                    right: "15px",
                    transform: "translateY(-50%)",
                    zIndex: 2,
                    color: "#aaa",
                  }}
                />
                <input
                  type="text"
                  className="form-control rounded p-2"
                  placeholder="Search by Category"
                  value={inputkey}
                  onChange={(e) => setInputKey(e.target.value)}
                  // style={{ paddingRight: "2.5rem" }}
                  onClick={() => setModalBasic(true)}
                />

                <Modal
                  isOpen={modalBasic}
                  toggle={() => setModalBasic(!modalBasic)}
                >
                  <ModalHeader>
                    <h1>Category</h1>
                  </ModalHeader>
                  <ModalBody>
                    <Label>Category</Label>
                    <Select
                      components={{ Input: CustomSelectInput }}
                      className="react-select"
                      classNamePrefix="react-select"
                      name="form-field-name"
                      value={selectedCategory}
                      onChange={setSelectedCategory}
                      options={SelectedCategoryOptions}
                    />
                  </ModalBody>
                  <ModalFooter>
                    <Button
                      color="primary"
                      outline
                      onClick={() => setModalBasic(false)}
                    >
                      Cancel
                    </Button>
                  </ModalFooter>
                </Modal>
              </div>
            </div>
          </div>
        </Col>
      </Row>

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
                      padding: "0.05rem 0.15rem",
                      fontSize: "0.4rem",
                      borderRadius: "50%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      width: "1.5rem",
                      height: "1.5rem",
                      minWidth: "1.5rem",
                      minHeight: "1.5rem",
                      border: "none",
                      outline: "none",
                    }}
                  >
                    <i
                      className="simple-icon-pencil text-primary"
                      style={{ fontSize: "0.6rem" }}
                    />
                  </button>
                </Col>
              </Row>
              <div className="mt-auto">
                <h1 className="mb-0 fw-bold display-6">
                  {profileStatus.percentage}{" "}
                </h1>
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
                      padding: "0.05rem 0.15rem",
                      fontSize: "0.4rem",
                      borderRadius: "50%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      width: "1.5rem",
                      height: "1.5rem",
                      minWidth: "1.5rem",
                      minHeight: "1.5rem",
                      border: "none",
                      outline: "none",
                    }}
                  >
                    {/* <i className="iconsminds-add text-primary" style={{ fontSize: '0.8rem' }} /> */}
                    <span
                      className="text-primary"
                      style={{ fontSize: "0.9rem" }}
                    >
                      <strong>+</strong>
                    </span>
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
                      style={{ textDecoration: "none", padding: "5px" }}
                      // data-glide-dir="<"
                    >
                      <i className="simple-icon-arrow-left" />
                    </button>
                    <button
                      onClick={handleNext}
                      type="button"
                      className="glide__arrow glide__arrow--right right-arrow btn btn-link btn-xs"
                      data-glide-dir=">"
                      style={{ textDecoration: "none", padding: "5px" }}
                    >
                      <i className="simple-icon-arrow-right" />
                    </button>
                  </Col>
                )}
              </Row>
              {currentSession ? (
                <TransitionGroup>
                  <CSSTransition classNames="card" timeout={500}>
                    <div className="d-flex flex-row mt-auto glide-item card-transition">
                      <img
                        className="rounded-circle me-3"
                        alt="Profile"
                        src={`${baseUrl}/${currentSession.imageUrl}`}
                        style={{
                          width: "40px",
                          height: "40px",
                          objectFit: "cover",
                        }}
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
                        <Button
                          onClick={() => handleNewSessionClick()}
                          color="primary"
                          size="xs"
                          outline
                        >
                          <span>
                            <TimestampConverter
                              timeStamp={currentSession.fromTimeStamp}
                              format="datetime"
                            />
                          </span>
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
                    <Button
                      size="xs"
                      color="primary"
                      onClick={handleViewMentors}
                    >
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
                        style={{ textDecoration: "none" }}
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
                        />
                      ) : (
                        <img
                          src={`${baseUrl}/${currentMentor.imageUrl}`}
                          className=" rounded-circle mb-2"
                          style={{
                            width: "90px",
                            height: "90px",
                            objectFit: "cover",
                            overflow: "hidden",
                          }}
                          alt="img"
                        />
                      )}
                    </Col>
                    <Col className="d-flex align-items-center justify-content-end">
                      <button
                        onClick={handleMentorNext}
                        type="button"
                        className="glide__arrow glide__arrow--right right-arrow btn btn-link btn-xs"
                        data-glide-dir=">"
                        style={{ textDecoration: "none" }}
                      >
                        <i className="simple-icon-arrow-right" />
                      </button>
                    </Col>
                  </Row>
                  <NavLink to="#">
                    <h3 className="mb-0">
                      <strong>
                        {currentMentor.firstName} {currentMentor.lastName}
                      </strong>
                    </h3>
                  </NavLink>
                  <CardText className="text-muted text-small mb-2">
                    {currentMentor.jobTitle} | {currentMentor.company}
                  </CardText>
                  <span>
                    {currentMentor.experience === undefined ||
                    currentMentor.experience === 0
                      ? "No experience"
                      : `${currentMentor.experience} years of experience`}
                  </span>

                  <div className="separator mb-2 mt-2" />
                  <h3 className="mb-0 fw-bold">
                    <strong>
                      ₹{Math.floor(currentMentor.price).toLocaleString()}/hr
                    </strong>
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
            <CardBody style={{ height: "310px" }}>
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
                      style={{ textDecoration: "none" }}
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
                      />
                    ) : (
                      <img
                        src={`${baseUrl}/${currentLawyer.imageUrl}`}
                        className=" rounded-circle mb-2"
                        style={{
                          width: "90px",
                          height: "90px",
                          objectFit: "cover",
                          overflow: "hidden",
                        }}
                        alt="img"
                      />
                    )}
                  </Col>
                  <Col className="d-flex align-items-center justify-content-end">
                    <button
                      onClick={handleLawyerNext}
                      type="button"
                      className="glide__arrow glide__arrow--right right-arrow btn btn-link btn-xs"
                      data-glide-dir=">"
                      style={{ textDecoration: "none" }}
                    >
                      <i className="simple-icon-arrow-right" />
                    </button>
                  </Col>
                </Row>
                <NavLink to="#">
                  <h3 className="mb-0">
                    <strong>
                      {currentLawyer.firstName} {currentLawyer.lastName}
                    </strong>
                  </h3>
                </NavLink>
                {!currentLawyer === null ? (
                  <CardText className="text-muted text-small mb-2 text-truncate">
                    {currentLawyer.services.map((s, index) => (
                      <>
                        <span key={s}>{s}</span>
                        {index < currentLawyer.services.length - 1 && " | "}
                      </>
                    ))}
                  </CardText>
                ) : (
                  <CardText className="text-muted text-small mb-2 text-truncate">
                    No services
                  </CardText>
                )}
                <span className="text-truncate">
                  {currentLawyer.languages.length > 0 ? (
                    currentLawyer.languages.map((lang, index) => (
                      <React.Fragment key={lang}>
                        <span>
                          {language.find((l) => l.iso_code === lang)?.name}
                        </span>
                        {index < currentLawyer.languages.length - 1 && " | "}
                      </React.Fragment>
                    ))
                  ) : (
                    <span>-</span>
                  )}
                </span>
                <div className="separator mb-2 mt-2" />
                <h3 className="mb-0 fw-bold">
                  <strong>
                    ₹{Math.floor(currentLawyer.price).toLocaleString()}/mo
                  </strong>
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
                  <Button size="xs" color="primary" onClick={handleViewAlumnis}>
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
                      style={{ textDecoration: "none" }}
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
                        text={currentAlumni.firstName}
                        className="mx-2 mb-3"
                        color="secondary"
                      />
                    ) : (
                      <img
                        // src={currentAlumni.imageUrl}
                        src={`${baseUrl}/${currentAlumni.imageUrl}`}
                        className=" rounded-circle mb-2"
                        style={{
                          width: "90px",
                          height: "90px",
                          objectFit: "cover",
                          overflow: "hidden",
                        }}
                        alt="img"
                      />
                    )}
                  </Col>
                  <Col className="d-flex align-items-center justify-content-end">
                    <button
                      onClick={handleAlumniNext}
                      type="button"
                      className="glide__arrow glide__arrow--right right-arrow btn btn-link btn-xs"
                      data-glide-dir=">"
                      style={{ textDecoration: "none" }}
                    >
                      <i className="simple-icon-arrow-right" />
                    </button>
                  </Col>
                </Row>
                <NavLink to="#">
                  <h3 className="mb-0">
                    <strong>{currentAlumni.firstName}</strong>
                  </h3>
                </NavLink>
                <CardText className="text-muted text-small mb-2">
                  {currentAlumni.jobTitle} | {currentAlumni.company}
                </CardText>
                <span>{currentAlumni.experienceYears} years of experience</span>
                <div className="separator mb-2 mt-2" />
                <h3 className="mb-0 fw-bold">
                  <strong>
                    ₹{Math.floor(currentAlumni.price).toLocaleString()}/mo
                  </strong>
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
      {/* job and stay listing starts */}
      <Row className="mx-auto  " style={{ maxWidth: "1000px" }}>
        <Colxx lg="6" md="12" sm="12">
          <Card className="mb-2" style={{ height: "500px" }}>
            {currentStayList ? (
              <CardBody>
                <div className="p-4 position-relative">
                  <Button
                    className="rounded-circle px-2 py-0   text-one bg-white position-absolute "
                    style={{
                      border: "3px solid #a16390",
                      top: "30px",
                      right: "30px",
                      cursor: "pointer",
                      zIndex: 10,
                    }}
                    // onClick={toggleOwnerInfo}
                  >
                    <i
                      className="fa-solid fa-user"
                      color="secondary"
                      style={{ color: "#a16390" }}
                    />
                  </Button>
                  <CardImg
                    top
                    // src="/assets/img/cards/thumb-1.jpg"
                    // src="https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg"
                    src={
                      currentStayList.images.length > 0
                        ? `${baseUrl}/${currentStayList.images[0].imageUrl}` // Use the first image URL
                        : "https://via.placeholder.com/300x200?text=No+Image" // Fallback image
                    }
                    alt="Card image cap"
                    className="mb-2"
                    style={{ height: "250px", objectFit: "cover" }}
                    // style={{
                    //   opacity: isOwnerInfoVisible ? 0.1 : 1, // Reduce opacity when info is visible
                    //   transition: "opacity 0.3s ease-in-out", // Add a transition effect
                    // }}
                  />

                  {/* <span
                style={{
                  position: "absolute",
                  top: "100px",
                  right: "80px",

                  padding: "10px",
                  borderRadius: "5px",
                  
                }}
                className="font-weight-bold"
              >
                <h2 className="text-large">Owner: Prakash Raj</h2>
                <h4 className="">
                  
                  <i className="fa-solid fa-phone mr-2" />
                  9876543210
                </h4>
                <h4
                  className="d-inline-flex align-items-center"
                  style={{ display: "inline-flex" }}
                >
               
                  <i className="fa-solid fa-envelope mr-2" /> prakash@gmail.com
                </h4>
              </span> */}

                  <Row>
                    <Col xs="12" sm="12" className="d-flex align-items-center">
                      <h3 className="font-weight-bold mt-2 text-one ">
                        Rent: <span className="text-primary">₹</span>
                        <span data-toggle="tooltip" title="Expected Rent">
                          {currentStayList.expectedRent}
                        </span>
                      </h3>
                      <Button
                        color="light"
                        className=" font-weight-semibold mx-2"
                        size="xs"
                      >
                        {currentStayList.apartmentType}
                      </Button>
                    </Col>
                  </Row>

                  {/* icons tstart */}
                  <Row className="my-2">
                    <Col className="d-flex flex-wrap">
                      <Button
                        color="light"
                        className="font-weight-bold mr-1 my-1"
                        size="sm"
                      >
                        <i className="fas fa-bed " />{" "}
                        {currentStayList.bhkTypeValue}
                      </Button>
                      <Button
                        color="light"
                        className="font-weight-bold m-1"
                        size="sm"
                      >
                        <i className="fa-solid fa-shower" />{" "}
                        {currentStayList.bhkTypeValue}
                      </Button>
                      <Button
                        color="light"
                        className="font-weight-bold m-1"
                        size="sm"
                      >
                        <i className="fa-solid fa-car" />{" "}
                        {currentStayList.parkingValue}
                      </Button>
                    </Col>
                  </Row>
                  {/* icons end */}

                  <Row className="mt-2">
                    <Col className="text-start text-sm-left" xs={12} sm={6}>
                      <div className="text-muted mt-2">
                        {/* {data.interestedCount} liked this property */}{" "}
                        {currentStayList.interestedCount} liked this property
                      </div>
                    </Col>
                    <Col
                      className="text-sm-right texr-start mt-sm-0 mt-2"
                      xs={12}
                      sm={6}
                    >
                      <Button
                        // onClick={() => handleInterestedButtonClick(data.id)}
                        outline
                        color="primary"
                        size="xs"
                        // active={data.loggedInUserInterested}
                      >
                        I&apos;m interested
                      </Button>
                    </Col>
                  </Row>
                </div>
                <div className="d-flex justify-content-center">
                  <div
                    className="glide__bullets slider-dot-container"
                    data-glide-el="controls[nav]"
                  >
                    {renderStayListDots()}
                  </div>
                </div>
              </CardBody>
            ) : (
              <CardBody className="h-100 d-flex justify-content-center align-items-center">
                <h1 className="text-center mx-auto">There is no stay list</h1>
              </CardBody>
            )}
          </Card>
        </Colxx>
        {/* <Colxx lg="6" md="6">
          <Card className=" my-2">
            <CardBody className="p-3">
              <CardImg
                top
                
                src="https://images.pexels.com/photos/269077/pexels-photo-269077.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
                alt="Card image cap"
                style={{ height: "250px" }}
              />

              <Row>
                <Col>
                  <h3 className="font-weight-bold mt-2 text-large">
                    developer
                  </h3>
                  <h6>TCS</h6>
                </Col>
              </Row>

              <Row>
                <Col>
                  <Button
                    color="light"
                    className="mb-2 font-weight-semibold"
                    size="xs"
                  >
                    job
                  </Button>
                  <Button
                    color="light"
                    className="mb-2 font-weight-semibold mx-1"
                    size="xs"
                  >
                    fresher
                  </Button>
                  <Button
                    color="light"
                    className="mb-2 font-weight-semibold mx-1"
                    size="xs"
                  >
                    fffffff
                  </Button>
                  <Button
                    color="light"
                    className="mb-2 font-weight-semibold mx-1"
                    size="xs"
                  >
                    chennai
                  </Button>
                </Col>
              </Row>

              <Row className="mt-2 text-one">
                <Col className="" xs={12} sm={8}>
                  <span className="text-muted ">
                    Posted on
                    <TimestampConverter
                                timeStamp={data.postedOn}
                                format="datetime"
                              />
                  </span>
                </Col>
                <Col
                  // className="text-sm-right text-start mt-sm-0 mt-2"
                  className="d-flex justify-content-sm-end justify-content-start align-items-center mt-sm-0 mt-2"
                  xs={12}
                  sm={4}
                >
                  <Button
                    outline
                    // className="d-none d-lg-block"
                    color="primary"
                    size="xs"
                  >
                    I&apos;m interested
                  </Button>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Colxx> */}
        <Colxx lg="6" md="12" sm="12">
          <Card className="mb-2" style={{ height: "500px" }}>
            {currentJobList ? (
              <CardBody>
                <div className="text-center d-flex justify-content-center align-items-center">
                  <Row>
                    {/* <Col className="text-center d-flex align-items-center">
                      <button
                        onClick={handleJobPrevious}
                        type="button"
                        className="glide__arrow glide__arrow--left left-arrow btn btn-link btn-xs"
                        data-glide-dir="<"
                        style={{ textDecoration: "none" }}
                      >
                        <i className="simple-icon-arrow-left" />
                      </button>
                    </Col> */}
                    <Col md={12}>
                      <div className="">
                        <CardImg
                          top
                          // src="/assets/img/cards/thumb-1.jpg"
                          // src="https://images.pexels.com/photos/269077/pexels-photo-269077.jpeg"
                          src={
                            currentJobList.image !== null
                              ? `${baseUrl}/${currentJobList.imageUrl}` // Use the first image URL
                              : "https://via.placeholder.com/300x200?text=No+Image" // Fallback image
                          }
                          alt="Card image cap"
                          style={{ height: "250px", objectFit: "cover" }}
                        />

                        <Row>
                          <Col>
                            <h3 className="font-weight-bold mt-2 text-large">
                              {currentJobList.jobTitle}
                            </h3>
                            <h6>{currentJobList.company}</h6>
                          </Col>
                        </Row>

                        <Row>
                          <Col>
                            <Button
                              color="light"
                              className="mb-2 font-weight-semibold"
                              size="xs"
                            >
                              {currentJobList.jobTitle}
                            </Button>
                            <Button
                              color="light"
                              className="mb-2 font-weight-semibold mx-1"
                              size="xs"
                            >
                              {currentJobList.workPlaceType}
                            </Button>
                            <Button
                              color="light"
                              className="mb-2 font-weight-semibold mx-1"
                              size="xs"
                            >
                              {currentJobList.employmentType}
                            </Button>
                            <Button
                              color="light"
                              className="mb-2 font-weight-semibold mx-1"
                              size="xs"
                            >
                              {currentJobList.jobLocation}
                            </Button>
                          </Col>
                        </Row>

                        <Row className="mt-2 ">
                          <Col className="" xs={12} sm={8}>
                            <span className="text-muted ">
                              Posted on
                              <TimestampConverter
                                timeStamp={currentJobList.postedOn}
                                format="datetime"
                              />
                            </span>
                          </Col>
                          <Col
                            // className="text-sm-right text-start mt-sm-0 mt-2"
                            className="d-flex justify-content-sm-end justify-content-start align-items-center mt-sm-0 mt-2"
                            xs={12}
                            sm={4}
                          >
                            <Button
                              outline
                              // className="d-none d-lg-block"
                              color="primary"
                              size="xs"
                            >
                              I&apos;m interested
                            </Button>
                          </Col>
                        </Row>
                      </div>
                    </Col>
                    {/* <Col className="text-center d-flex align-items-center">
                      <button
                        onClick={handleJobNext}
                        type="button"
                        className="glide__arrow glide__arrow--right right-arrow btn btn-link btn-xs"
                        data-glide-dir=">"
                        style={{ textDecoration: "none" }}
                      >
                        <i className="simple-icon-arrow-right" />
                      </button>
                    </Col> */}
                  </Row>
                </div>
                <div className="d-flex justify-content-center">
                  <div
                    className="glide__bullets slider-dot-container"
                    data-glide-el="controls[nav]"
                  >
                    {renderJobListDots()}
                  </div>
                </div>
              </CardBody>
            ) : (
              <CardBody className="h-100 d-flex justify-content-center align-items-center">
                <h1 className="text-center mx-auto">There is no job list</h1>
              </CardBody>
            )}
          </Card>
        </Colxx>
      </Row>

      {/* job and stay listing ends */}
      {/* Q and A starts */}
      <Row className="mx-auto  mt-4" style={{ maxWidth: "1000px" }}>
        <Colxx lg="8" md="7" className="mb-2">
          {/* <Col lg={7}> */}
          {/* <Card>
            <CardBody>
              <CardTitle>
                <strong>Q&A</strong>
              </CardTitle>
              <div>
                <div className="d-flex align-items-center justify-content-between ">
                  <h4>Self improvement</h4>
                  <p className="text-muted">A week ago</p>
                </div>

                <p>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Provident ut porro odit exercitationem, nesciunt quae aperiam
                  vero! Eveniet libero tenetur fugiat quas. Amet fuga dicta
                  sequi eius labore ducimus animi nihil, sapiente ullam magni
                  natus quisquam dolorem dolorum dolor ipsam tenetur. Sed
                  voluptatibus delectus enim quod non repellendus ratione eum?
                </p>
              </div>
              <hr />
              <div className="d-flex align-items-center justify-content-between my-2">
                <span className="text-one">36 views</span>
                <span className="text-one">
                  <i className="simple-icon-envelope " color="primary" />
                </span>
              </div>
              <div className="w-full d-flex ">
                <Button
                  className="text-center mx-auto"
                  color="primary"
                  size="sm"
                >
                  View all answers
                </Button>
              </div>
            </CardBody>
          </Card> */}
          <Col lg={12} md={12}>
            <Card className="my-2">
              <CardBody>
                <GlideComponent
                  settings={{
                    gap: 5,
                    perView: 1,
                    type: "carousel",
                  }}
                >
                  {dashboardQuestions &&
                    dashboardQuestions.map((item) => {
                      return (
                        <div key={item.id}>
                          <Card>
                            <div>
                              <CardTitle>
                                <strong className="text-large">Q&A</strong>
                              </CardTitle>
                              <div>
                                <div className="d-flex align-items-center justify-content-between ">
                                  <h2 className="font-weight-semi-bold text-large py-1">
                                    {item.questionHeading}
                                  </h2>
                                  <p className="text-muted">
                                    {formatDate(item.time)}
                                  </p>
                                </div>

                                <p className="text-one font-weight-semibold text-muted py-1">
                                  {item.questionHeadingBrief}
                                </p>
                              </div>
                              <hr />
                              <div className="d-flex align-items-center justify-content-between my-2">
                                <span className="text-one">
                                  {item.views} views
                                </span>
                                <span className="text-one">
                                  <i
                                    className="simple-icon-envelope "
                                    color="primary"
                                  />
                                </span>
                              </div>
                              <div className="w-full d-flex ">
                                <Button
                                  className="text-center mx-auto"
                                  color="primary"
                                  size="sm"
                                  style={{ cursor: "pointer" }}
                                  onClick={() =>
                                    history.push(`/app/questions/${item.id}`)
                                  }
                                >
                                  View all answers
                                </Button>
                              </div>
                            </div>
                          </Card>
                        </div>
                      );
                    })}
                </GlideComponent>
              </CardBody>
            </Card>
          </Col>

          {/* </Col> */}
        </Colxx>
        <Colxx lg="4" md="5" className="mb-2">
          {/* <Col lg={5}> */}
          <Card className="mb-2">
            {currentBatchMate && (
              <CardBody>
                <Row className="mb-3 align-items-center">
                  <Col>
                    <h3 className="mb-0 fw-bold">
                      <strong>Batch Mates</strong>
                    </h3>
                  </Col>
                  <Col xs="auto">
                    <Button
                      size="xs"
                      color="primary"
                      onClick={handleViewBatchmates}
                    >
                      <span>View all</span>
                    </Button>
                  </Col>
                </Row>
                <div className="text-center">
                  <Row>
                    <Col className="d-flex align-items-center">
                      <button
                        onClick={handleBatchMatePrevious}
                        type="button"
                        className="glide__arrow glide__arrow--left left-arrow btn btn-link btn-xs"
                        data-glide-dir="<"
                        style={{ textDecoration: "none" }}
                      >
                        <i className="simple-icon-arrow-left" />
                      </button>
                    </Col>
                    <Col className="d-flex justify-content-center align-items-center">
                      {!currentBatchMate.imageUrl ? (
                        <ThumbnailLetters
                          // small
                          rounded
                          text={currentBatchMate.firstName}
                          className="mx-2 mb-3"
                          color="secondary"
                        />
                      ) : (
                        <img
                          src={`${baseUrl}/${currentBatchMate.imageUrl}`}
                          className=" rounded-circle mb-2"
                          style={{
                            width: "90px",
                            height: "90px",
                            objectFit: "cover",
                            overflow: "hidden",
                          }}
                          alt="img"
                        />
                      )}
                    </Col>
                    <Col className="d-flex align-items-center justify-content-end">
                      <button
                        onClick={handleBatchMateNext}
                        type="button"
                        className="glide__arrow glide__arrow--right right-arrow btn btn-link btn-xs"
                        data-glide-dir=">"
                        style={{ textDecoration: "none" }}
                      >
                        <i className="simple-icon-arrow-right" />
                      </button>
                    </Col>
                  </Row>
                  <NavLink to="#">
                    <h3 className="mb-0">
                      <strong>
                        {currentBatchMate.firstName} {currentBatchMate.lastName}
                      </strong>
                    </h3>
                  </NavLink>
                  <CardText className="text-muted text-small mb-2">
                    {currentBatchMate.jobTitle} | {currentBatchMate.company}
                  </CardText>
                  {/* <span>
                    {currentBatchMate.experience === undefined ||
                    currentBatchMate.experience === 0
                      ? "No experience"
                      : `${currentBatchMate.experience} years of experience`}
                  </span> */}

                  <div className="separator mb-2 mt-2" />
                  {/* <h3 className="mb-0 fw-bold">
                    <strong>
                      ₹{Math.floor(currentBatchMate.price).toLocaleString()}/hr
                    </strong>
                  </h3> */}
                </div>
                <div className="d-flex justify-content-center">
                  <div
                    className="glide__bullets slider-dot-container"
                    data-glide-el="controls[nav]"
                  >
                    {renderBatchMateDots()}
                  </div>
                </div>
              </CardBody>
            )}
          </Card>
          {/* </Col> */}
        </Colxx>
      </Row>
      {/* Q and A ends */}

      {/* recent chats and recent sessions start */}
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
                      {recentSessions &&
                        recentSessions.map((sessions, index) => {
                          return (
                            <div
                              // eslint-disable-next-line react/no-array-index-key
                              key={index}
                              className="d-flex flex-row mb-2 pb-2 border-bottom"
                            >
                              <Row className="w-100">
                                <NavLink href="#">
                                  <img
                                    src={`${baseUrl}/${sessions.imageUrl}`}
                                    alt={sessions.name}
                                    className=" rounded-circle img-thumbnail border"
                                    style={{
                                      width: "50px",
                                      height: "50px",
                                      objectFit: "cover",
                                      overflow: "hidden",
                                    }}
                                  />
                                </NavLink>
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
                                <Col className="mt-3  d-flex flex-column align-items-center">
                                  {/* <div className="mt-3 pr-2 ml-4"> */}
                                  <p className="text-muted mb-0 text-small">
                                    <TimestampConverter
                                      timeStamp={sessions.fromTimeStamp}
                                      format="date"
                                    />
                                  </p>
                                  <p className="text-muted mb-0 text-small">
                                    <TimestampConverter
                                      timeStamp={sessions.fromTimeStamp}
                                      format="time"
                                    />{" "}
                                    -{" "}
                                    <TimestampConverter
                                      timeStamp={sessions.toTimeStamp}
                                      format="time"
                                    />
                                  </p>
                                  {/* </div> */}
                                </Col>
                                <Col className="mt-3">
                                  {/* <div className="d-flex justify-end ml-4 mr-2 pr-2 mt-3"> */}
                                  <Rating
                                    total={5}
                                    rating={sessions.star}
                                    interactive={false}
                                  />
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
                      {recentChats &&
                        recentChats.map((chats, index) => {
                          return (
                            <div
                              // eslint-disable-next-line react/no-array-index-key
                              key={index}
                              className="d-flex flex-row mb-2 pb-2 border-bottom"
                            >
                              <NavLink
                                href={`${adminRoot}/chat/${chats.username}`}
                              >
                                <img
                                  src={`${baseUrl}/${chats.imageUrl}`}
                                  alt={chats.name}
                                  // className="img-thumbnail border-0 rounded-circle list-thumbnail align-self-center xsmall"
                                  className=" rounded-circle img-thumbnail border"
                                  style={{
                                    width: "50px",
                                    height: "50px",
                                    objectFit: "cover",
                                    overflow: "hidden",
                                  }}
                                />
                              </NavLink>

                              <div className="pl-3 pr-2 mt-2">
                                <NavLink
                                  href={`${adminRoot}/chat/${chats.username}`}
                                >
                                  <p className="font-weight-medium mb-0 ">
                                    {chats.name}
                                  </p>
                                  <p
                                    className="text-muted mb-0 text-small w-100 text-truncate"
                                    style={{ maxWidth: "170px" }}
                                  >
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
      {/* recent chats and recent sessions end */}
    </>
  );
};

export default DashBoard;
