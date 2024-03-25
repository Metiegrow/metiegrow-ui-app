import React, { useState, useEffect } from "react";
import {
  Button,
  NavLink,
  Row,
  // Card,
  // CardBody,
  // CardSubtitle,
  // CardImg,
  Input,
  Label,
  InputGroup,
  InputGroupAddon,
  Col,
} from "reactstrap";
import axios from "axios";
import { baseUrl } from "constants/defaultValues";

import { Colxx } from "components/common/CustomBootstrap";

const MyProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingAbout, setIsEditingAbout] = useState(false);
  const [isEditingButton, setIsEditingButton] = useState(false);
  const [image, setImage] = useState(null)
  const [firstName, setFirstName] = useState("");
  const [jobTitle, setJobTitle] = useState("")
  const [experience, setExperience] = useState("");
  const [location, setLocation] = useState("");
  // const [about, setAbout] = useState(
  //   "I have more than a decade experience in Software Engineering (and related practices including DevOps) and I have been lucky enough to have worked with a bunch of great minds in the big tech giants. I have got a couple of MAANG companies in my kitty and after attending (and cracking) interviews for the"
  // );
  const [newInputSkill, setNewInputSkill] = useState("");
  const [newInputTopics, setNewInputTopics] = useState("");
  const [skills, setSkills] = useState([]);
  const [topics, setTopics] = useState([]);
  // const [userId, setUserId] = useState("");
  const [star, setStar] = useState("");
  // const [lastSceen, setLastseen] = useState("");
  // const [ratings, setRatings] = useState("")
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  const [company, setCompany] = useState("");
  const [category, setCategory] = useState("");
  const [bio, setBio] = useState("");
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [twitterHandle, setTwitterHandle] = useState("");
  const [website, setWebsite] = useState("");
  const [introVideo, setIntroVideo] = useState("");
  const [featuredArticle, setFeaturedArticle] = useState("");
  const [reasonForMentor, setReasonForMentor] = useState("");
  const [achievement, setAchievement] = useState("");
  const [reviews, setReviews] = useState("");
  // const [price, setPrice] =useState("");

  const Id = 1;

  // const url = `${baseUrl}/user`;
  // const url = `${baseUrl}/api/mentor/11/details/profile`;
  // const url1 = `${baseUrl}/mentor/profile${userId}`;
  const endUrl = `${baseUrl}/api/mentor/${Id}/details/profile`;
  // const endUrl = `${baseUrl}/myprofile`;
  // const endUrl = `${baseUrl}/api/mentor/myprofile`;
  const inputUrl = `${baseUrl}/inputs`


  useEffect(() => {
    const mentorProfileDetails = async () => {
      try {
        const response = await axios.get(endUrl);
        const userData = response.data;
        console.log("userData:", userData);
        if (userData) {
          setImage(userData.image)
          setFirstName(userData.firstName);
          // setJobRole(userData.jobRole);
          setJobTitle(userData.jobTitle);
          setCompany(userData.company);
          setLocation(userData.location);
          // setAbout(userData.bio);
          setSkills(userData.skills);
          // setUserId(userData.id);
          // setLastseen(userData.lastSeen);
          // setRatings(userData[0].ratings)
          // console.log(response)
          // console.log("Username:", userData[1].jobRole);
          setLastName(userData.lastName);
          setEmail(userData.email);
          // setPassword(userData.password);
          setCategory(userData.category);
          setBio(userData.bio);
          setLinkedinUrl(userData.linkedinUrl);
          setTwitterHandle(userData.twitterHandle);
          setWebsite(userData.website);
          setIntroVideo(userData.introVideo);
          setFeaturedArticle(userData.featuredArticle);
          setReasonForMentor(userData.reasonForMentor);
          setAchievement(userData.achievement);
          // setReviews(userData.reviews)
          // setPrice(userData.price)
          // setExperience(userData.experience)
          // setTopics(userData.topics);
          // setStar(userData.star);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    mentorProfileDetails();
  }, []);

  useEffect(() => {
    const mentorProfileDetails = async () => {
      try {
        const response = await axios.get(inputUrl);
        const inputData = response.data;
        console.log("inputData:", inputData);
        if (inputData) {
          setReviews(inputData.reviews)
          // setPrice(inputData.price)
          setExperience(inputData.experience)
          setTopics(inputData.topics);
          setStar(inputData.star);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    mentorProfileDetails();
  }, []);

  function getTokenRes() {
    return localStorage.getItem('tokenRes');
}
const token = getTokenRes();
// console.log(token);

  const updateMEntorProfile = async () => {
    try {
      const updatedData = {
        image,
        firstName,
        lastName,
        email,
        jobTitle,
        company,
        location,
        category,
        skills,
        bio,
        // password,
        linkedinUrl,
        twitterHandle,
        website,
        introVideo,
        featuredArticle,
        reasonForMentor,
        achievement,
        // reviews,
        // star,
        // topics,
        // price,
        // experience,
      };

      // console.log("Updated Data:", updatedData);
      // const response =


      await axios.put(endUrl, updatedData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // console.log("Response", response.data);

      console.log("Profile updated successfully");
    } catch (error) {
      console.error("Error updating profile", error);
    }
  };

  const handleAddSkill = (newSkill) => {
    setSkills([...skills, newSkill]);
  };

  const handleEditAboutClick = () => {
    setIsEditingAbout(true);
  };

  const handleSaveAbout = () => {
    setIsEditingAbout(false);
    updateMEntorProfile();
  };

  const handleCancelEditAbout = () => {
    setIsEditingAbout(false);
  };

  const handleEditButton = () => {
    setIsEditingButton(true);
  };
  const handleSaveButton = () => {
    setIsEditingButton(false);
    updateMEntorProfile();
  };

  const handleCancelButton = () => {
    setIsEditingButton(false);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
    updateMEntorProfile();
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleRemoveSkill = (index) => {
    setSkills(skills.filter((_, i) => i !== index));
  };

  const handleAddTopics = (newTopics) => {
    setTopics([...topics, newTopics]);
  };
  const handleRemoveTopics = (index) => {
    setTopics(topics.filter((_, i) => i !== index));
  };

  const handleLinkedInClick = () => {
    if (linkedinUrl) {
      window.open(linkedinUrl, "_blank");
    }
  };

  return (
    <div className="mentor-profile">
      {/* <div className=""> */}

      <Colxx sm="12" md="12" lg="12" xxs="12" className="">
        <div className="">
          {/* <div className="h-100"> */}
          <div className="w-100 py-3 position-relative bg-primary d-flex justify-content-between align-items-center">
            <div className=" ">
              <img
                src={image}
                // "/assets/img/profiles/2.jpg"
                className=" col-2 mx-2 w-60 rounded-circle img-thumbnail border"
                alt=""
              />
              <Button
                color="light"
                className=" font-weight-semibold mx-2"
                size="large"
              >
                <span className="font-weight-semibold text-one">
                  <i className="iconsminds-thunder text-primary" /> Quick
                  Responder
                </span>
              </Button>
            </div>
            <div>
              <NavLink>
                <Button
                  color="light"
                  className="font-weight-semibold mx-2"
                  size="large"
                  onClick={handleLinkedInClick}
                >
                  <i className="simple-icon-social-linkedin text-primary font-weight-semibold text-one" />
                </Button>
              </NavLink>
            </div>
          </div>
          <Row>
            <Col lg="6" md="12" className="mt-4">
              <div>
                {isEditing ? (
                  <div>
                    <>
                      <Row>
                        <Col md="6">
                          <Label for="firstName">
                            <h4>First Name</h4>
                          </Label>
                          <Input
                            type="text"
                            id="firstName"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                          />
                        </Col>
                        <Col md="6">
                          <Label for="lastName">
                            <h4>Last Name</h4>
                          </Label>
                          <Input
                            type="text"
                            id="lastName"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                          />
                        </Col>
                      </Row>
                      <br />
                    </>
                    <>
                      <Label for="jobtitle">
                        <h4>Job Title</h4>
                      </Label>
                      <Input
                        type="text"
                        id="jobtitle"
                        value={jobTitle}
                        onChange={(e) =>setJobTitle(e.target.value)}
                      />
                      <br />
                    </>
                    <>
                      <Label for="company">
                        <h4>Company</h4>
                      </Label>
                      <Input
                        type="text"
                        id="company"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                      />
                      <br />
                    </>
                    <>
                      <Label for="experience" className=" text-dark">
                        <h4>Experience</h4>
                      </Label>
                      <Input
                        type="textarea"
                        id="experience"
                        value={experience}
                        rows="3"
                        onChange={(e) => setExperience(e.target.value)}
                      />
                      <br />
                    </>
                    <>
                      <Label for="location" className="font-weight-medium">
                        <h4>Country</h4>
                      </Label>
                      <Input
                        type="text"
                        id="location"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                      />
                      <br />
                    </>
                    <>
                      <Label for="email" className="font-weight-medium">
                        <h4>Email</h4>
                      </Label>
                      <Input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      <br />
                    </>
                  </div>
                ) : (
                  <>
                    <h1 className="font-weight-semibold text-large">
                      Name: {firstName} {lastName}
                    </h1>
                    <h3 className="font-weight-semibold">
                      Job Title: {jobTitle} - {company}
                    </h3>
                    <p className="text-one font-weight-medium text-primary">
                      Experience: {experience}
                    </p>
                    <h5 className="font-weight-medium">
                      <i className="simple-icon-location-pin text-primary" />

                      <span className="ml-2">{location}</span>
                    </h5>
                    <h6 className="">
                      <i className="simple-icon-star text-primary " />
                      <span className="ml-2">{`${star} (${reviews} reviews)`}</span>
                    </h6>
                    <h6 className="">
                      <i className="simple-icon-clock text-primary" />
                      <span className="ml-2">Last seen</span>
                    </h6>
                  </>
                )}
              </div>
              {!isEditing && (
                <Button
                  color="primary"
                  outline
                  onClick={handleEditClick}
                  className="ml-2"
                >
                  <i className="simple-icon-pencil" /> Edit
                </Button>
              )}
              {isEditing && (
                <>
                  <Button color="primary" onClick={handleSave} className="mr-2">
                    Save
                  </Button>
                  <Button
                    color="primary"
                    outline
                    onClick={handleCancel}
                    className="ml-2"
                  >
                    Cancel
                  </Button>
                </>
              )}
            </Col>

            <Col lg="6" md="12" className="mt-4">
              <h2 className="mx-2">Skills</h2>
              {isEditingButton ? (
                <>
                  {skills.map((skill, index) => (
                    <Button
                      key={skill}
                      color="light"
                      className="mb-2 font-weight-semibold mx-2"
                      size="xs"
                      onClick={() => handleRemoveSkill(index)}
                    >
                      {skill} <i className="iconsminds-close" />
                    </Button>
                  ))}

                  <InputGroup className="mb-3">
                    <Input
                      type="text"
                      placeholder="New skill"
                      value={newInputSkill}
                      onChange={(e) => setNewInputSkill(e.target.value)}
                      onKeyDown={(event) => {
                        if (event.key === "Enter") {
                          handleAddSkill(newInputSkill);
                          setNewInputSkill("");
                        }
                      }}
                    />
                    <InputGroupAddon addonType="append">
                      <Button
                        outline
                        color="primary"
                        onClick={() => {
                          handleAddSkill(newInputSkill);
                          setNewInputSkill("");
                        }}
                      >
                        Add Skill
                      </Button>
                    </InputGroupAddon>
                  </InputGroup>
                </>
              ) : (
                skills.map((skill) => (
                  <Button
                    key={skill}
                    color="light"
                    className="mb-2 font-weight-semibold mx-2"
                    size="xs"
                    // onClick={() => handleRemoveSkill(index)}
                  >
                    {skill}
                  </Button>
                ))
              )}

              <div className="mt-2">
                <h2 className="mx-2">Topics</h2>

                {isEditingButton ? (
                  <>
                    {topics.map((newTopics, index) => (
                      <Button
                        key={newTopics}
                        color="light"
                        className="mb-2 font-weight-semibold mx-2"
                        size="xs"
                        onClick={() => handleRemoveTopics(index)}
                      >
                        {newTopics} <i className="iconsminds-close" />
                      </Button>
                    ))}
                    <InputGroup className="mb-3">
                      <Input
                        type="text"
                        placeholder="New topic"
                        value={newInputTopics}
                        onChange={(e) => setNewInputTopics(e.target.value)}
                        onKeyDown={(event) => {
                          if (event.key === "Enter") {
                            handleAddTopics(newInputTopics);
                            setNewInputTopics("");
                          }
                        }}
                      />
                      <InputGroupAddon addonType="append">
                        <Button
                          outline
                          color="primary"
                          onClick={() => {
                            handleAddTopics(newInputTopics);
                            setNewInputTopics("");
                          }}
                        >
                          Add topics
                        </Button>
                      </InputGroupAddon>
                    </InputGroup>
                  </>
                ) : (
                  topics.map((newTopics) => (
                    <Button
                      key={newTopics}
                      color="light"
                      className="mb-2 font-weight-semibold mx-2"
                      size="xs"
                      // onClick={() => handleRemoveSkill(index)}
                    >
                      {newTopics}
                    </Button>
                  ))
                )}
                <br />
                {!isEditingButton && (
                  <Button
                    color="primary"
                    outline
                    onClick={handleEditButton}
                    className="ml-2"
                  >
                    <i className="simple-icon-pencil" /> Edit
                  </Button>
                )}
                {isEditingButton && (
                  <>
                    <Button
                      color="primary"
                      onClick={handleSaveButton}
                      className="mr-2"
                    >
                      Save
                    </Button>
                    <Button
                      color="primary"
                      outline
                      onClick={handleCancelButton}
                      className="ml-2"
                    >
                      {/* <i className="simple-icon-close" />  */}
                      Cancel
                    </Button>
                  </>
                )}
              </div>
            </Col>
          </Row>
          {/* </div> */}
          <hr />
          {/* <Colxx sm="12" md="12" lg="12" xxs="12" className="mt-5"> */}
          <Row>
            <Col lg="12" md="12">
              <h1 className="font-weight-semibold text-large">About</h1>

              <div>
                {isEditingAbout ? (
                  <div className="col-lg-6 col-12">
                    <Label for="about" className="font-weight-medium">
                      <h4>About Me</h4>
                    </Label>
                    <Input
                      type="textarea"
                      id="about"
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      className="form-control"
                      rows="5"
                    />
                    <br />
                    <Label for="linkedin" className="font-weight-medium">
                      <h4>LinkedIn URL</h4>
                    </Label>
                    <Input
                      type="url"
                      id="linkedinUrl"
                      value={linkedinUrl}
                      onChange={(e) => setLinkedinUrl(e.target.value)}
                      className="form-control"
                    />
                    <br />
                    <Label for="twitter" className="font-weight-medium">
                      <h4>Twitter URL</h4>
                    </Label>
                    <Input
                      type="url"
                      id="twitter"
                      value={twitterHandle}
                      onChange={(e) => setTwitterHandle(e.target.value)}
                    />
                    <br />
                    <Label for="personalWebsite" className="font-weight-medium">
                      <h4>Personal Website URL</h4>
                    </Label>
                    <Input
                      type="url"
                      id="personalWebsite"
                      value={website}
                      onChange={(e) => setWebsite(e.target.value)}
                    />
                    <br />
                  </div>
                ) : (
                  <div className="col-lg-6 col-12">
                    <p className="text-one font-weight-medium">{bio}</p>
                  </div>
                )}
              </div>

              {!isEditingAbout && (
                <Button
                  color="primary"
                  outline
                  onClick={handleEditAboutClick}
                  className="ml-2"
                >
                  <i className="simple-icon-pencil" /> Edit about
                </Button>
              )}

              {isEditingAbout && (
                <>
                  <Button
                    color="primary"
                    onClick={handleSaveAbout}
                    className="mr-2"
                  >
                    Save
                  </Button>
                  <Button
                    color="primary"
                    outline
                    onClick={handleCancelEditAbout}
                    className="ml-2"
                  >
                    {/* <i className="simple-icon-close" /> */}
                    Cancel
                  </Button>
                </>
              )}
            </Col>
          </Row>
          <hr />
          {/* </Colxx> */}
        </div>
      </Colxx>
    </div>
    // </div>
  );
};

export default MyProfile;
