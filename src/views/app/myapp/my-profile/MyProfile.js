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
  Form,
  Card,
  FormGroup,
} from "reactstrap";
import { ReactSortable } from 'react-sortablejs';
import axios from "axios";
import { baseUrl } from "constants/defaultValues";
// import { NotificationManager } from 'components/common/react-notifications';
import { Colxx } from "components/common/CustomBootstrap";
import Select from "react-select";
import ThumbnailLetters from "components/cards/ThumbnailLetters";
import country from "../my-login/Country";
import language from "../my-login/Languages";
import CategoryData from "../my-login/CategoryData";
import ToasterComponent from "../notifications/ToasterComponent";


const MyProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingAbout, setIsEditingAbout] = useState(false);
  const [isEditingButton, setIsEditingButton] = useState(false);
  const [image, setImage] = useState(null)
  const [firstName, setFirstName] = useState("");
  const [jobTitle, setJobTitle] = useState("")
  const [experience, setExperience] = useState("");
  const [location, setLocation] = useState("");
  const [newInputSkill, setNewInputSkill] = useState("");
  const [skills, setSkills] = useState([]);
  const [userId, setUserId] = useState(null);
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
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
  const [totalRatings,setTotalRatings] = useState(0);
  const [averageStar, setAverageStar] = useState(0);
  const [profileLoading, setProfileLoading] = useState(true);
  const [languages, setLanguages] = useState([]);
  const [skillValidationMessage,setSkillValidationMessage] = useState("");
  const [isProfileUpdated, setIsProfileUpdated ] = useState(false)


 // const Id = 1;

  // const url = `${baseUrl}/user`;
  // const url = `${baseUrl}/api/mentor/11/details/profile`;
  // const url1 = `${baseUrl}/mentor/profile${userId}`;
 // const endUrl = `${baseUrl}/api/mentor/${Id}/details/profile`;
  // const endUrl = `${baseUrl}/myprofile`;
  const endUrl = `${baseUrl}/api/mentor/myprofile`;
  const inputUrl = `${baseUrl}/inputs`;


  useEffect(() => {
    const mentorProfileDetails = async () => {
      try {
        const response = await axios.get(endUrl);
        const userData = response.data;
        // console.log("userData:", userData);
        if (userData) {
          setImage(userData.imageUrl)
          setFirstName(userData.firstName);
          // setJobRole(userData.jobRole);
          setJobTitle(userData.jobTitle);
          setCompany(userData.company);
          setLocation(userData.location);
          // setAbout(userData.bio);
          setSkills(userData.skills);
          setUserId(userData.id);
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
          setProfileLoading(false);
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
  }, [isProfileUpdated]);
  useEffect(() => {

  const mentorReviews = async () => {
    const ratingUrl=`${baseUrl}/api/mentorship/rating/meta/${userId}`

      
    try {
      const response = await axios.get(ratingUrl);
      setTotalRatings(response.data.totalRatings);
      setAverageStar(response.data.averageStar);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  mentorReviews();
}, [userId]);


  useEffect(() => {
    const mentorProfileDetails = async () => {
      try {
        const response = await axios.get(inputUrl);
        const inputData = response.data;
        console.log("inputData:", inputData);
        if (inputData) {
          // setReviews(inputData.reviews)
          // setPrice(inputData.price)
          setExperience(inputData.experience)
          // setTopics(inputData.topics);
          // setStar(inputData.star);
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
        languages,
        skills,
        bio,
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


      const response = await axios.put(endUrl, updatedData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      // console.log("Response", response.data.statuses[0].message);
    //   response.data.statuses.forEach((status) => {
    //    const responseMessage = status.message;
    //     NotificationManager.success(responseMessage, 'Great!', 3000, null, null, '');
    // });
    setIsProfileUpdated(!isProfileUpdated);
    ToasterComponent('success', response.data.statuses);
      // console.log("Profile updated successfully");
    } catch (error) {
      console.error("Error updating profile", error);
      if (error.response && error.response.data.statuses[0]) {
        ToasterComponent('warning', error.response.data.statuses);
      } else {
        ToasterComponent('error', [{ message: "An unexpected error occurred" }]);
      }
    }
  };

  const handleAddSkill = (newSkill) => {
    if (!newSkill.trim()) {
      setSkillValidationMessage("Skill cannot be empty");
  } else {
    setSkillValidationMessage("")
    setSkills([...skills, newSkill]);
  }
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
    if (skills.length === 0) {
      setSkillValidationMessage('At least one skill is required.');
    } else {
    setIsEditingButton(false);
    updateMEntorProfile();
    }
  };

  const handleCancelButton = () => {
    if (skills.length === 0) {
      setSkillValidationMessage('At least one skill is required.');
    } else {
    setIsEditingButton(false);
    }
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

  // const handleAddTopics = (newTopics) => {
  //   setTopics([...topics, newTopics]);
  // };
  // const handleRemoveTopics = (index) => {
  //   setTopics(topics.filter((_, i) => i !== index));
  // };

  const handleLinkedInClick = () => {
    if (linkedinUrl) {
      window.open(linkedinUrl, "_blank");
    }
  };

  const handleTwitterClick = () => {
    if (twitterHandle) {
      const twitterUrl = `https://x.com/${twitterHandle}`
      window.open(twitterUrl, "_blank");
    }
  }
  const handlePersonalWebsiteClick = () => {
    if (website) {
      let url = website;
      if (!url.startsWith("https://")) {
        url = `https://${url}`;
      }
      window.open(url, "_blank");
    }
  }

  const handleAddLanguages = (newLanguages) => {
    setLanguages([...languages, newLanguages]);
  };

  const handleRemoveLanguages = (index) => {
    setLanguages(languages.filter((_, i) => i !== index));
  };

  const languageOptions = language.map((option) => ({
    value: option.iso_code,
    label: option.name,
  }));

  const [selectedLanguages, setSelectedLanguages] = useState([]);

  const handleChange = (selectedOptions) => {
    const languagesArray = selectedOptions
      ? selectedOptions.map((option) => option.value)
      : [];
    // console.log("arraychk", languagesArray);
    handleAddLanguages(languagesArray[0]);
    setSelectedLanguages([]);
  };
  


  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const countryName = country.find(c => c.iso_code === location)?.name;

  return (
    <div className="mentor-profile">
      {/* <div className=""> */}

      <Colxx sm="12" md="12" lg="12" xxs="12" className="">
        <div className="">
          {/* <div className="h-100"> */}
          {/* <div className="w-100 py-3 position-relative bg-primary d-flex justify-content-between align-items-center">
            <div className=" ">
              <img
                src={`${baseUrl}/${image}`}
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
          </div> */}

          <Card style={{ height: "160px", width: "100%", overflow: "hidden" }} className="bg-primary">
            <div className="d-flex align-items-center justify-content-between" style={{ height: "100%" }}>
              <div className="d-flex align-items-center mt-4 ml-4 mb-4">
                {image === null ? (
                  <ThumbnailLetters
                    // small
                    rounded
                    text={firstName}
                    className="mx-2"
                    color="secondary"
                  />
                ) : (
                  <img
                    src={`${baseUrl}/${image}`}
                    // src="/assets/img/profiles/2.jpg"
                    className="mx-2 rounded-circle img-thumbnail border"
                    style={{ width: "110px", height: "110px", objectFit: "cover", overflow: "hidden"  }}
                    alt="img"
                  />
                )}
                <div className="ml-4 mt-2">
                  <h1 className="font-weight-semibold text-large">
                    {firstName} {lastName}
                  </h1>
                </div>
              </div>
              <div className="mr-4">
                {linkedinUrl && (
                <NavLink className="d-none d-md-inline-block">
                  <Button
                    color="light"
                    className="font-weight-semibold icon-button"
                    size="large"
                    onClick={handleLinkedInClick}
                  >
                    <i className="simple-icon-social-linkedin text-primary font-weight-semibold text-one" />
                  </Button>
                </NavLink>
                )}
                {twitterHandle && (
                <NavLink className="d-none d-md-inline-block">
                  <Button
                    color="light"
                    className="font-weight-semibold icon-button"
                    size="large"
                    onClick={handleTwitterClick}
                  >
                    <i className="simple-icon-social-twitter text-primary font-weight-semibold text-one" />
                  </Button>
                </NavLink>
                )}
                {website && (
                <NavLink className="d-none d-md-inline-block">
                  <Button
                    color="light"
                    className="font-weight-semibold icon-button"
                    size="large"
                    onClick={handlePersonalWebsiteClick}
                  >
                    <i className="simple-icon-globe text-primary font-weight-semibold text-one" />
                  </Button>
                </NavLink>
                )}
              </div>
            </div>
          </Card>
          {profileLoading ? (
            <div className="loading" />
          ) : (
          <>
          {isEditing &&
              <div className="mt-2">
                <Button
                  className="default"
                  color="light"
                  onClick={() => document.getElementById("file-upload").click()}
                >
                  Change profile pic <i className="iconsminds-upload text-primary" />
                </Button>
                <Form>
                  <input
                    id="file-upload"
                    type="file"
                    className="form-control d-none"
                    onChange={handleFileChange}
                  />
                </Form>
                {file && <p>Selected file: {file.name}</p>}
              </div>
              }
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
                      {/* <Input
                        type="text"
                        id="location"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                      /> */}
                      <Input
                      type="select"
                      name="location"
                      value={location}
                      // validate={validateLocation}
                      onChange={(e) => setLocation(e.target.value)}
                      className="form-control"
                    >
                      <option disabled value="">
                        Select Location
                      </option>
                      {country.map((option) => (
                        <option key={option.iso_code} value={option.iso_code}>
                          {option.name}
                        </option>
                      ))}
                    </Input>
                      <br />
                    </>
                    <>
                      <Label for="location" className="font-weight-medium">
                        <h4>category</h4>
                      </Label>
                      {/* <Input
                        type="text"
                        id="location"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                      /> */}
                      <Input
                      type="select"
                      name="category"
                      value={category}
                      // validate={validateLocation}
                      onChange={(e) => setCategory(e.target.value)}
                      className="form-control"
                    >
                      <option disabled value="">
                        Select category
                      </option>
                      {CategoryData.map((option) => (
                        <option key={option.short} value={option.short}>
                          {option.name}
                        </option>
                      ))}
                    </Input>
                      <br />
                    </>
                    {/* <>
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
                    </> */}
                  </div>
                ) : (
                  <>
                    {/* <h1 className="font-weight-semibold text-large">
                      {firstName} {lastName}
                    </h1> */}
                    <h3 className="font-weight-semibold">
                       {jobTitle} @ {" "} {company}
                    </h3>
                    <p className="text-one font-weight-medium ">
                       {experience}
                    </p>
                    <h5 className="font-weight-medium">
                      <i className="simple-icon-location-pin text-primary" />

                      <span className="ml-2">{countryName}</span>
                    </h5>
                    <h6 className="">
                      <i className="simple-icon-star text-primary " />
                      <span className="ml-2">{`${averageStar} (${totalRatings} reviews)`}</span>
                    </h6>
                    {/* <h6 className="">
                      <i className="simple-icon-clock text-primary" />
                      <span className="ml-2">Last seen</span>
                    </h6> */}
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
                  {(languages.length > 0 || isEditingButton) && <h2 className="mx-2">Languages known</h2>}
            {isEditingButton ? (
                    <>
                      {languages.map((lang, index) => (
                        <Button
                          // eslint-disable-next-line react/no-array-index-key
                          key={index}
                          color="light"
                          className="mb-2 font-weight-semibold mx-2"
                          size="xs"
                          onClick={() => handleRemoveLanguages(index)}
                        >
                          {language.find((l) => l.iso_code === lang)?.name}{" "}
                          <i className="iconsminds-close" />
                        </Button>
                      ))}

                      <FormGroup className="error-l-75">
                        <Select
                          placeholder="Select Languages"
                          name="languages"
                          isMulti
                          options={languageOptions}
                          className="react-select"
                          classNamePrefix="react-select"
                          value={selectedLanguages}
                          onChange={(selectedOptions) => {
                            setSelectedLanguages(selectedOptions);
                            handleChange(selectedOptions);
                          }}
                        />
                      </FormGroup>
                    </>
                  ) : (
                    languages.map((lang, index) => (
                      <Button
                        // eslint-disable-next-line react/no-array-index-key
                        key={index}
                        color="light"
                        className="mb-2 font-weight-semibold mx-2"
                        size="xs"
                      >
                        {language.find((l) => l.iso_code === lang)?.name}
                      </Button>
                    ))
                  )}

              <h2 className="mx-2">Skills</h2>
              {isEditingButton ? (
                <>
                <ReactSortable
                    list={skills}
                    setList={setSkills}
                    options={{ handle: '.handle' }}
                    className="row"
                  >
                  {skills.map((skill, index) => (
                    <Button
                     // eslint-disable-next-line react/no-array-index-key
                      key={index}
                      color={index < 3 ? 'primary' : 'light'}
                      className="mb-2 font-weight-semibold mx-2"
                      size="xs"
                      onClick={() => handleRemoveSkill(index)}
                    >
                      {skill} <i className="iconsminds-close" />
                    </Button>
                  ))}
                </ReactSortable>
                <p className="text-muted">Drag skills to set top 3 (the top 3 skills will be displayed on mentor cards)</p>
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
                  {skillValidationMessage && (
                      <div className="invalid-feedback d-block">
                        {skillValidationMessage}
                      </div>
                    )}
                </>
              ) : (
                skills.map((skill, index) => (
                  <Button
                   // eslint-disable-next-line react/no-array-index-key
                    key={index}
                    color={index < 3 ? 'primary' : 'light'}
                    className="mb-2 font-weight-semibold mx-2"
                    size="xs"
                    // onClick={() => handleRemoveSkill(index)}
                  >
                    {skill}
                  </Button>
                ))
              )}

              <div className="mt-2">
                {/* <h2 className="mx-2">Topics</h2> */}

                {/* {isEditingButton ? (
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
                )} */}
                {/* <br /> */}
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
              <h2 className="font-weight-semibold mx-2">About</h2>

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
                      <h4>Twitter handle</h4>
                    </Label>
                    <Input
                      type="url"
                      id="twitter"
                      value={twitterHandle}
                      onChange={(e) => setTwitterHandle(e.target.value)}
                    />
                     <p className="text-muted">
                          Omit the &ldquo;@&rdquo; -e.g. &ldquo;dqmonn&rdquo;
                        </p>
                    {/* <br /> */}
                    <Label for="personalWebsite" className="font-weight-medium">
                      <h4>Personal Website URL</h4>
                    </Label>
                    <Input
                      type="url"
                      id="personalWebsite"
                      value={website}
                      onChange={(e) => setWebsite(e.target.value)}
                    />
                    <p className="text-muted">
                           e.g. www.arun.com
                        </p>
                    <br />
                  </div>
                ) : (
                  <div className="col-lg-12 col-12">
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
                  <i className="simple-icon-pencil" /> Edit 
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
          </>
        )}
        </div>
      </Colxx>
    </div>
    // </div>
  );
};

export default MyProfile;
