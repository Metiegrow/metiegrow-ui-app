import axios from "axios";
import { Colxx } from "components/common/CustomBootstrap";
import { baseUrl } from "constants/defaultValues";
import { useCallback, useEffect, useRef, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Button, Card, CardBody, CardImg, NavLink, Row } from "reactstrap";
import ThumbnailLetters from "../Chat/ThumbnailLetters";
import ReviewsComponent from "../Reviews/ReviewsComponent";
import country from "../my-login/Country";
import MentorTabCard from "./MentorTabCard";

const MentorProfile = () => {
  const { mid } = useParams();
  // console.log('Mentor Profile ID:', mid);
  // const url=`${baseUrl}/mentor/profile`;
  // const url1=`${baseUrl}/mentor/cards/${mid}`;
  // const url=`${baseUrl}/mentorDetails/${mid}`;
  //  const url1=`${baseUrl}/mentorProfile/${mid}`;

  //  To change url to backend please uncomment the below line
  const url1 = `${baseUrl}/api/mentor/${mid}`;
  const ratingUrl = `${baseUrl}/api/mentorship/rating/meta/${mid}`;

  //  const url1=`${baseUrl}/mentor/myprofile`;
  // const[mentorprofiledetails,setMentorProfileDetails]=useState([]);
  const [mentorprofiledetails1, setMentorProfileDetails1] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState("");
  const skillsSectionRef = useRef(null);

  const history = useHistory();

  const [showAll, setShowAll] = useState(false);

  const scrollToSkills = useCallback(() => {
    const yOffset = -60;

    if (skillsSectionRef.current) {
      const y =
        skillsSectionRef.current.getBoundingClientRect().top +
        window.pageYOffset +
        yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
      return;
    }

    const element = document.getElementById("skillsSection");
    if (element) {
      const y =
        element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    } else {
      console.error("unable to scroll");
    }
  }, []);

  const toggleShowAll = useCallback(() => {
    setShowAll((prevShowAll) => !prevShowAll);

    setTimeout(scrollToSkills, 100);
  }, [scrollToSkills]);

  // const handleConnectClick = () => {
  //   // Construct the URL with mentor's name as query parameter
  //   const mentorName = `${mentorprofiledetails.firstName} ${mentorprofiledetails.lastName}`;
  //   const url2 = `/app/calendar?mentorName=${mentorName}`;

  //   // Navigate to the Month component with the mentor's name as a query parameter
  //   history.push(url2);
  // };
  // const handleConnectClick = () => {
  //   // Construct the URL with mentor's ID and name as query parameters
  //   const mentorId = mentorprofiledetails1.id;
  //   const mentorName = `${mentorprofiledetails1.firstName} ${mentorprofiledetails1.lastName}`;
  //   const role = mentorprofiledetails1.role;
  //   const url2 = `/app/calendar?mentorId=${mentorId}&mentorName=${mentorName}&role=${role}`;

  //   // Navigate to the Month component with the mentor's ID and name as query parameters
  //   history.push(url2);
  // };
  const handleConnectClick = () => {
    // Destructure the properties from mentorprofiledetails1
    const { id: mentorId, firstName, lastName, role } = mentorprofiledetails1;
    console.log("Role:", role);

    // Construct the mentorName using destructured values
    const mentorName = `${firstName} ${lastName}`;

    // Construct the URL with mentor's ID and name as query parameters
    const url2 = `/app/calendar?mentorId=${mentorId}&mentorName=${mentorName}&role=${role}`;

    // Navigate to the Month component with the mentor's ID and name as query parameters
    history.push(url2);
  };

  useEffect(() => {
    // const mentorProfileDetails = async () => {

    //   try {
    //     const response = await axios.get(url);
    //     setMentorProfileDetails(response.data);
    //   } catch (error) {
    //     console.error('Error fetching data:', error);
    //   }
    // };
    // mentorProfileDetails();
    const mentorReviews = async () => {
      try {
        const response = await axios.get(ratingUrl);
        setReviews(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    mentorReviews();

    const mentorProfile = async () => {
      setLoading(true);
      try {
        const response = await axios.get(url1);
        setMentorProfileDetails1(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    mentorProfile();
  }, []);

  useEffect(() => {
    if (showAll && skillsSectionRef.current) {
      skillsSectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [showAll]);

  const remainingSkillsCount = mentorprofiledetails1.skills
    ? mentorprofiledetails1.skills.length - 3
    : 0;
  // const handleLinkedInClick = () => {
  //   // Assuming mentorprofiledetails1 contains the LinkedIn URL of the mentor
  //   const linkedInUrl = mentorprofiledetails1.linkedinUrl;

  //   // Open the mentor's LinkedIn profile in a new tab/window
  //   window.open(linkedInUrl, "_blank");
  // };
  const countryName = country.find(
    (c) => c.iso_code === mentorprofiledetails1.location
  )?.name;
  const chatUserId = mentorprofiledetails1.username;
  const videoUrl = mentorprofiledetails1.introVideo;
  let thumbnailUrl = "";
  if (videoUrl) {
    const regex =
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]{11})/;
    const match = videoUrl.match(regex);
    if (match && match[1]) {
      const videoID = match[1];
      thumbnailUrl = `https://img.youtube.com/vi/${videoID}/0.jpg`;
    }
  }
  return (
    <div className="mentor-profile">
      {loading ? (
        <div className="loading" />
      ) : (
        <div className="">
          <Colxx sm="12" md="12" lg="12" xxs="12" className="">
            <div className="">
              <Row className="h-100">
                <div className="w-100 py-3 position-relative bg-primary d-flex justify-content-between align-items-center">
                  <div className="d-flex align-items-center ">
                    {mentorprofiledetails1.imageUrl == null ? (
                      <div
                        style={{
                          width: "110px",
                          height: "110px",
                          objectFit: "cover",
                        }}
                        className="mx-2 rounded-circle border img-thumbnail"
                      >
                        <ThumbnailLetters
                          rounded
                          small
                          text={mentorprofiledetails1.firstName}
                          // className="border border-1 mx-2"
                          className="w-100 h-100"
                        />
                      </div>
                    ) : (
                      <img
                        src={`${baseUrl}/${mentorprofiledetails1.imageUrl}`}
                        // className=' col-2 mx-2 w-60 rounded-circle img-thumbnail border'
                        className="mx-2 rounded-circle img-thumbnail border"
                        alt=""
                        style={{
                          width: "110px",
                          height: "110px",
                          objectFit: "cover",
                        }}
                      />
                    )}

                    <Button
                      color="light"
                      className=" font-weight-semibold mx-2"
                      size="large"
                      style={{ cursor: "default" }}
                    >
                      <span
                        className="font-weight-semibold text-one"
                        style={{ cursor: "default" }}
                      >
                        <i className="iconsminds-thunder text-primary" />
                        {mentorprofiledetails1.achievement}
                      </span>
                    </Button>

                    {/* <img  src={`${baseUrl}/api/public/images/${mid}/profile-pic`} className=' col-2 mx-2 w-60 rounded-circle
              img-thumbnail border    ' alt="" /> */}
                  </div>
                </div>
                <div className="col-sm-5 mt-4 ">
                  <h1 className="font-weight-semibold text-xlarge">
                    {mentorprofiledetails1.firstName}{" "}
                    {mentorprofiledetails1.lastName}
                  </h1>
                  {/* <h1 className='font-weight-semibold text-xlarge'>{mentorprofiledetails1.firstName} {mentorprofiledetails1.lastName}</h1> */}
                  <h3 className="text-large  text-muted  ">
                    {mentorprofiledetails1.jobTitle}
                  </h3>
                  <h2 className="text-one  text-primary">
                    {mentorprofiledetails1.company}
                  </h2>
                  <p className="text-one font-weight-medium text-primary">
                    {mentorprofiledetails1.bio}
                  </p>

                  <h5 className="font-weight-medium">
                    <i className="simple-icon-location-pin text-primary" />
                    <span className="ml-2">{countryName}</span>
                  </h5>
                  {/* <h6 className=''><i className='simple-icon-star text-primary '/><span className='ml-2'>{mentorprofiledetails1.star} ({mentorprofiledetails1.ratings} reviews)</span></h6> */}
                  <h6 className="">
                    <i className="simple-icon-star text-primary " />
                    <span className="ml-2">
                      {reviews.averageStar} ({reviews.totalRatings} reviews)
                    </span>
                  </h6>
                  {/* <h6 className=''><i className='simple-icon-clock text-primary'/><span className='ml-2'>Last Seen</span></h6> */}
                </div>

                <div className="col-sm-7 mt-4">
                  <h2 className="mx-2">Skills</h2>

                  {/* <div className='d-flex'>
              {mentorprofiledetails.skills&&mentorprofiledetails.skills.map((skill)=>{
               
                
               return (
               

                <div  key={skill}>
                <Button color="light" className="mb-2 font-weight-semibold mx-2" size='xs'>
                {skill}
              </Button>
                </div>
               )
              })}
            </div> */}
                  <div className="d-flex align-items-center">
                    <div className="d-flex">
                      {mentorprofiledetails1.skills &&
                        mentorprofiledetails1.skills
                          .slice(0, 3)
                          .map((skill) => (
                            <div key={skill}>
                              <Button
                                color="light"
                                className="mb-2 font-weight-semibold mx-2"
                                size="xs"
                              >
                                {skill}
                              </Button>
                            </div>
                          ))}
                    </div>
                    {mentorprofiledetails1.skills &&
                      mentorprofiledetails1.skills.length > 3 && (
                        <div className="">
                          <Button
                            color="link"
                            className="text-one font-weight-bold "
                            style={{ textDecoration: "underline" }}
                            onClick={toggleShowAll}
                          >
                            + {remainingSkillsCount}more
                          </Button>
                        </div>
                      )}
                  </div>
                  {/* <div className='mt-2'>
            <h2 className='mx-2'>Topics</h2>
              <Button color="light" className="mb-2 font-weight-semibold mx-2" size='xs'>
                Change jobs
              </Button>
              <Button color="light" className="mb-2 font-weight-semibold mx-2" size='xs'>
                Learn a new Skill
              </Button>
              <Button color="light" className="mb-2 font-weight-semibold mx-2" size='xs'>
                Grow your career
              </Button>
            </div> */}
                  {/* <div className='mt-2 '>
            <NavLink className=''  onClick={handleConnectClick}>
              <Button outline color="primary" className=" font-weight-semibold mx-2 " size='large'>
                <span className='font-weight-semibold  text-one'>Connect</span>
                <i className='simple-icon-social-linkedin text-primary font-weight-semibold text-one  '/>
              </Button>
              </NavLink>
            </div> */}
                  <MentorTabCard
                    handleConnectClick={handleConnectClick}
                    chatUserId={chatUserId}
                    price={mentorprofiledetails1.price}
                  />
                </div>
              </Row>
              <hr />
              <Colxx className='sm="12" md="12" lg="12" xxs="12" mt-5'>
                <Row>
                  <div className="w-100 ">
                    <h1 className="font-weight-semibold text-large">About</h1>

                    <p className="text-one font-weight-medium ">
                      {mentorprofiledetails1.bio}
                    </p>
                  </div>
                </Row>
                <hr />
                {(mentorprofiledetails1.featuredArticle ||
                  mentorprofiledetails1.introVideo) && (
                  // <Colxx className='sm="12" md="12" lg="12" xxs="12" mt-5'>
                  <Row>
                    <div>
                      <h1>
                        Get to know {mentorprofiledetails1.firstName}{" "}
                        {mentorprofiledetails1.lastName}
                      </h1>
                    </div>
                    {/* <h3 className='font-weight-semibold text-large'>Get to Know Arun Prasad</h3> */}
                  </Row>
                )}
                {/* </Colxx> */}
                {/* <Colxx xxs="12"> */}

                <Row>
                  {mentorprofiledetails1 &&
                    mentorprofiledetails1.featuredArticle && (
                      <Colxx xxs="12" xs="12" lg="4" md="6">
                        <NavLink href={mentorprofiledetails1.featuredArticle}>
                          <Card className="mb-4 ">
                            {/* <div className="position-relative">
             <CardImg
               top
               src="/assets/img/profiles/2.jpg"
               alt="Card image cap"
             />
            
           </div> */}
                            <CardBody>
                              <h4 className="font-weight-semibold text-one text-center">
                                Featured Article
                              </h4>
                              <h4 className="color-theme-2 mt-4 text-center">
                                LINK
                              </h4>
                              {/* <CardSubtitle className="mb-4 text-one text-muted">
             Yeah, you read that right. Titles are not something which should
              drive your decision to join a new company.
             </CardSubtitle> */}
                            </CardBody>
                          </Card>
                        </NavLink>
                      </Colxx>
                    )}
                  {mentorprofiledetails1 &&
                    mentorprofiledetails1.introVideo && (
                      <Colxx xxs="12" xs="12" lg="4" md="6">
                        <NavLink href={mentorprofiledetails1.introVideo}>
                          <Card className="mb-4 w-80">
                            {thumbnailUrl && (
                              <div className="position-relative">
                                <CardImg
                                  top
                                  src={thumbnailUrl}
                                  alt="Card image cap"
                                  className=""
                                />
                              </div>
                            )}
                            <CardBody>
                              {!thumbnailUrl && (
                                <h4 className="font-weight-semibold text-one text-center mb-4">
                                  Intro video
                                </h4>
                              )}
                              <h4 className="color-theme-2  text-center">
                                VIDEO
                              </h4>
                              {/* <h4 className='font-weight-semibold text-one'>Concatenating Strings
                 Mock Interview (Senior MAANG Engineer)
                </h4>
                <CardSubtitle className="mb-4 text-one text-muted">
                Dont leave your software engineering career to chance. 
                Sign up for Exponents SWE interview course today:Concatenating strings is …
                </CardSubtitle> */}
                            </CardBody>
                          </Card>
                        </NavLink>
                      </Colxx>
                    )}
                  {/* <Colxx xxs="12" xs="6" lg="4">
            <Card className="mb-4">
              <CardBody>
                <CardSubtitle className="mb-4">
                  Homemade Cheesecake with Fresh Berries and Mint
                </CardSubtitle>
                <CardText className="text-muted text-small mb-0 font-weight-light">
                  09.04.2018
                </CardText>
              </CardBody>
              <div className="position-relative">
                <CardImg
                  bottom
                  src="/assets/img/cards/thumb-1.jpg"
                  alt="Card image cap"
                />
                <Badge
                  color="primary"
                  pill
                  className="position-absolute badge-top-left"
                >
                  NEW
                </Badge>
                <Badge
                  color="secondary"
                  pill
                  className="position-absolute badge-top-left-2"
                >
                  TRENDING
                </Badge>
              </div>
            </Card>
          </Colxx> */}
                  {/* {showAll && (
          <Colxx  lg={7} className="my-4" id="skillsSection">
            <h1>Skills</h1>
            <div className='d-flex flex-wrap '>
              {mentorprofiledetails.skills && mentorprofiledetails.skills.map((skill) => (
                <div key={skill}>
              <Button color="light" className="mb-2 font-weight-semibold mx-2" size='md'>
                {skill}
              </Button>
            </div>
              ))}
            </div>
          </Colxx>
        )} */}
                  <div id="skillsSection" />
                  <Colxx lg={7} className="my-4" ref={skillsSectionRef}>
                    <Row>
                      <h1 className="font-weight-semibold text-large">
                        Skills{" "}
                      </h1>
                    </Row>
                    <Row>
                      <div className="d-flex flex-wrap ">
                        {mentorprofiledetails1.skills &&
                          mentorprofiledetails1.skills.map((skill) => (
                            <div key={skill}>
                              <Button
                                color="light"
                                className="mb-2 font-weight-semibold mr-2"
                                size="md"
                              >
                                {skill}
                              </Button>
                            </div>
                          ))}
                      </div>
                    </Row>
                  </Colxx>
                </Row>
                {/* </Colxx> */}
              </Colxx>
            </div>
          </Colxx>

          <ReviewsComponent
            category="mentorship" // for lawyer profile "law"
            revieweeId={mid}
          />
        </div>
      )}
    </div>
  );
};

export default MentorProfile;
