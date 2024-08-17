import { Colxx } from "components/common/CustomBootstrap";
import React, { useState, useEffect } from "react";
import { Button, Row } from "reactstrap";
import { baseUrl } from "constants/defaultValues";
import axios from "axios";
import { useParams } from "react-router-dom";
import ThumbnailLetters from "components/cards/ThumbnailLetters";
import ReviewsComponent from "../Reviews/ReviewsComponent";

const AlumniProfile = () => {
  const { mid } = useParams();

  //  To change url to backend please uncomment the below line
  //  const url1=`${baseUrl}/api/alumni/${mid}`
  const url1 = `${baseUrl}/alumniProfile/${mid}`;
  const ratingUrl = `${baseUrl}/api/alumni/rating/meta/${mid}`;

  const [alumniprofiledetails, setAlumniProfileDetails] = useState([]);
  const [reviews, setReviews] = useState("");

  // const history = useHistory();

  const [showAll, setShowAll] = useState(false);
  const toggleShowAll = () => {
    setShowAll(!showAll);
  };

  //   const handleConnectClick = () => {

  //     const mentorId = alumniprofiledetails.id;
  //     const mentorName = `${alumniprofiledetails.firstName} ${alumniprofiledetails.lastName}`;
  //     const url2 = `/app/calendar?mentorId=${mentorId}&mentorName=${mentorName}`;

  //     history.push(url2);
  // };

  useEffect(() => {
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
      try {
        const response = await axios.get(url1);
        setAlumniProfileDetails(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    mentorProfile();
  }, []);

  useEffect(() => {
    if (showAll) {
      document.getElementById("skillsSection").scrollIntoView();
    }
  }, [showAll]);

  const remainingSkillsCount = alumniprofiledetails.skills
    ? alumniprofiledetails.skills.length - 3
    : 0;
  const handleLinkedInClick = () => {
    const linkedInUrl = alumniprofiledetails.linkedinUrl;

    window.open(linkedInUrl, "_blank");
  };

  return (
    <div className="mentor-profile">
      <Colxx sm="12" md="12" lg="12" xxs="12">
        <Row
          style={{
            border: "1px soild rgba(0, 0, 0, 0.15)",
          }}
        >
          <div
            className="w-100 py-3 d-flex justify-content-between align-items-center position-relative"
            style={{
              backgroundImage: "linear-gradient(to right, #145388 , #922c88)",
              borderTopLeftRadius: "0.75rem",
              borderTopRightRadius: "0.75rem",
              height: "115px",
            }}
          >
            <div className="position-absolute d-block">
              {alumniprofiledetails.imageUrl === null ? (
                <div>
                  <ThumbnailLetters
                    rounded
                    small
                    text={alumniprofiledetails.firstName}
                    className="border border-1 mx-2"
                  />
                </div>
              ) : (
                <img
                  src={`${baseUrl}/${alumniprofiledetails.imageUrl}`}
                  className="mx-2 rounded-circle img-thumbnail border"
                  style={{ width: "110px", height: "110px" }}
                  alt=""
                />
              )}
              {/* <Button
                color="light"
                className=" font-weight-semibold mx-2"
                size="large"
              >
                <span className="font-weight-semibold text-one">
                  <i className="iconsminds-thunder text-primary" />
                  {alumniprofiledetails.achievement}
                </span>
              </Button> */}
            </div>
            {/* 
            <div>
              <Button
                color="light"
                className=" font-weight-semibold mx-2 "
                size="large"
                onClick={handleLinkedInClick}
              >
                <i className="simple-icon-social-linkedin text-primary font-weight-semibold text-one  " />
              </Button>
            </div> */}
          </div>
          <div
            className="col bg-white"
            style={{
              borderBottomLeftRadius: "0.75rem",
              borderBottomRightRadius: "0.75rem",
            }}
          >
            <h1 className="font-weight-semibold text-xlarge">
              {alumniprofiledetails.firstName} {alumniprofiledetails.lastName}
            </h1>

            <h3 className="text-large  text-muted  ">
              {alumniprofiledetails.jobTitle}
            </h3>
            <h2 className="text-one  text-primary">
              {alumniprofiledetails.company}
            </h2>
            <p className="text-one font-weight-medium text-primary">
              {alumniprofiledetails.bio}
            </p>

            <h5 className="font-weight-medium">
              <i className="simple-icon-location-pin text-primary" />
              <span className="ml-2">{alumniprofiledetails.location}</span>
            </h5>

            <h6 className="">
              <i className="simple-icon-star text-primary " />
              <span className="ml-2">
                {reviews.averageStar} ({reviews.totalRatings} reviews)
              </span>
            </h6>
          </div>

          {/* <div className="col-7 mt-4">
            <h2 className="mx-2">Skills</h2>

            <div className="d-flex align-items-center">
              <div className="d-flex">
                {alumniprofiledetails.skills &&
                  alumniprofiledetails.skills.slice(0, 3).map((skill) => (
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
              {alumniprofiledetails.skills &&
                alumniprofiledetails.skills.length > 3 && (
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
            </div> */}

          {/* <MentorTabCard  handleConnectClick={handleConnectClick}/> */}
          {/* </div> */}
        </Row>
        <Row>
          <Colxx className='sm="12" md="12" lg="12" xxs="12" mt-3'>
            <Row className="bg-white mb-3" style={{ borderRadius: "0.75rem" }}>
              <div className="p-3">
                <h1 className="font-weight-semibold text-large">About</h1>

                <p className="text-one font-weight-medium ">
                  {alumniprofiledetails.bio}
                </p>
              </div>
            </Row>

            <Row className="bg-white mb-3" style={{ borderRadius: "0.75rem" }}>
              <Colxx lg={12} id="skillsSection" className="p-3">
                <h1 className="font-weight-semibold text-large">Skills </h1>
                <div className="d-flex flex-wrap ">
                  {alumniprofiledetails.skills &&
                    alumniprofiledetails.skills.map((skill) => (
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
              </Colxx>
            </Row>
            <Row className="bg-white mb-3" style={{ borderRadius: "0.75rem" }}>
              <ReviewsComponent category="alumni" revieweeId={mid} />
            </Row>
          </Colxx>
        </Row>
      </Colxx>
    </div>
  );
};

export default AlumniProfile;
