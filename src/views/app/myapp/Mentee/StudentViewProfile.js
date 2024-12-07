import axios from "axios";
import ThumbnailLetters from "components/cards/ThumbnailLetters";
import { Colxx } from "components/common/CustomBootstrap";
import { adminRoot, baseUrl } from "constants/defaultValues";
import { useCallback, useEffect, useRef, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Button, Row } from "reactstrap";

const StudentViewProfile = () => {
  const [studentProfileDetails, setStudentProfileDetails] = useState("");
  const [education, setEducation] = useState("");
  const [loading, setLoading] = useState(true);
  const { sid } = useParams();

  const history = useHistory();
  const url = `${baseUrl}/api/userprofile/profile/${sid}`;

  useEffect(() => {
    const StudentProfileDetails = async () => {
      try {
        const response = await axios.get(url);
        setStudentProfileDetails(response.data);
        setEducation(response.data.education);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    StudentProfileDetails();
  }, []);

  const [showAll, setShowAll] = useState(false);
  const skillsSectionRef = useRef(null);

  useEffect(() => {
    if (showAll && skillsSectionRef.current) {
      skillsSectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [showAll]);

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

  const remainingSkillsCount = studentProfileDetails.skills
    ? studentProfileDetails.skills.length - 3
    : 0;

  const chatUserId = studentProfileDetails.username;

  const handleChatClick = () => {
    history.push(`${adminRoot}/chat/${chatUserId}`);
  };

  return (
    <div>
      {loading ? (
        <div className="loading" />
      ) : (
        <div>
          <Colxx sm="12" md="12" lg="12" xxs="12" className="">
            <div className="">
              <Row className="h-100">
                <div className="w-100 py-3 position-relative bg-primary d-flex justify-content-between align-items-center">
                  <div className="d-flex align-items-center ">
                    {studentProfileDetails.userPhotoUrl == null ? (
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
                          text={studentProfileDetails.firstName}
                          className="w-100 h-100"
                        />
                      </div>
                    ) : (
                      <img
                        src={`${baseUrl}/${studentProfileDetails.userPhotoUrl}`}
                        className="mx-2 rounded-circle img-thumbnail border"
                        alt=""
                        style={{
                          width: "110px",
                          height: "110px",
                          objectFit: "cover",
                        }}
                      />
                    )}
                  </div>
                </div>
                <div className="col-sm-5 mt-4 ">
                  <h1 className="font-weight-semibold text-large">
                    {studentProfileDetails.firstName}{" "}
                    {studentProfileDetails.lastName}
                  </h1>
                  {education &&
                    education.map((edc) => {
                      return (
                        <div key={edc}>
                          <h2>
                            {edc.department} | {edc.year}
                          </h2>
                          <h5>{edc.college}</h5>
                        </div>
                      );
                    })}

                  <h5 className="font-weight-medium">
                    <i className="simple-icon-location-pin text-primary" />
                    <span className="ml-2">
                      {studentProfileDetails.location}
                    </span>
                  </h5>
                  <div className=" my-2">
                    <Button
                      color="primary"
                      className=""
                      onClick={handleChatClick}
                    >
                      Chat
                    </Button>
                  </div>
                </div>
                <div className="col-sm-7 mt-4">
                  <h2 className="mx-2 ">Skills</h2>

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
                    {/* <h2 className="mx-2">Skills</h2> */}
                    <div className="d-flex">
                      {studentProfileDetails.skills &&
                        studentProfileDetails.skills
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
                    {studentProfileDetails.skills &&
                      studentProfileDetails.skills.length > 3 && (
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
                </div>
              </Row>
              <hr />
              <Colxx className='sm="12" md="12" lg="12" xxs="12" mt-5'>
                <Row>
                  <div className="w-100 ">
                    <h1 className="font-weight-semibold text-large">About</h1>

                    <p className="text-one font-weight-medium ">
                      {studentProfileDetails.bio}
                    </p>
                  </div>
                </Row>
                <hr />
              </Colxx>
              <div id="skillsSection">
                <Colxx lg={7} className="my-4" ref={skillsSectionRef}>
                  <Row>
                    <h1 className="font-weight-semibold text-large">Skills </h1>
                  </Row>
                  <Row>
                    <div className="d-flex flex-wrap ">
                      {studentProfileDetails.skills &&
                        studentProfileDetails.skills.map((skill) => (
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
              </div>
            </div>
          </Colxx>
        </div>
      )}
    </div>
  );
};

export default StudentViewProfile;
