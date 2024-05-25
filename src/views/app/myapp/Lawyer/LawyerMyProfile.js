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
} from "reactstrap";
import axios from "axios";
import { baseUrl } from "constants/defaultValues";

import { Colxx } from "components/common/CustomBootstrap";
import ThumbnailLetters from "components/cards/ThumbnailLetters";

const LawyerMyProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingAbout, setIsEditingAbout] = useState(false);
  const [isEditingButton, setIsEditingButton] = useState(false);
  const [newInputLanguages, setNewInputLanguages] = useState("");
  const [newInputTopics, setNewInputTopics] = useState("");
  const [imageUrl, setImageUrl] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [location, setLocation] = useState("");
  const [languages, setLanguages] = useState([]);
  const [topic, setTopic] = useState([]);
  const [ratings, setRatings] = useState("");
  const [bio, setBio] = useState("");
  const [star, setStar] = useState("");
  const [about, setAbout] = useState("");

  // console.log("topic", imageUrl);

  const endUrl = `${baseUrl}/api/lawyer/myprofile`;
  // const updateUrl = `${baseUrl}/api/lawyer/updateProfile`;

  //   const inputUrl = `${baseUrl}/inputs`

  useEffect(() => {
    const mentorProfileDetails = async () => {
      try {
        const response = await axios.get(endUrl);
        const userData = response.data;
        // const topicData = response.data.topic
        // console.log("topic", topicData)

        console.log("userData:", userData.topic.data);
        if (userData) {
          setImageUrl(userData.imageUrl);
          setFirstName(userData.firstName);
          setLastName(userData.lastName);
          setLocation(userData.location);
          // setLanguages(userData.languages);
          setLanguages(userData.languages.map((lang) => lang.language));
          setBio(userData.bio);
          setRatings(userData.ratings);
          // setTopic(topicData);
          setTopic(userData.topic.map((t) => t.topicName));
          setStar(userData.star);
          setAbout(userData.about);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    mentorProfileDetails();
  }, []);

  function getTokenRes() {
    return localStorage.getItem("tokenRes");
  }
  const token = getTokenRes();
  // console.log(token);

  const updateMEntorProfile = async () => {
    try {
      const updatedData = {
        // imageUrl,
        firstName,
        lastName,
        location,
        bio,
        topic,
        languages,
        about,
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

  const handleAddLanguages = (newLanguages) => {
    setLanguages([...languages, newLanguages]);
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

  const handleRemoveLanguages = (index) => {
    setLanguages(languages.filter((_, i) => i !== index));
  };

  const handleAddTopics = (newTopics) => {
    setTopic([...topic, newTopics]);
  };
  const handleRemoveTopics = (index) => {
    setTopic(topic.filter((_, i) => i !== index));
  };

  //   const handleLinkedInClick = () => {
  //     if (linkedinUrl) {
  //       window.open(linkedinUrl, "_blank");
  //     }
  //   };

  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  return (
    <div className="mentor-profile">
      {/* <div className=""> */}

      <Colxx sm="12" md="12" lg="12" xxs="12" className="">
        <div className="">
          {/* <div className="h-100"> */}
          {/* <div className="w-100 py-3 position-relative bg-primary d-flex justify-content-between align-items-center">
            <div className=" ">
              <div>
                <img
                  src={`${baseUrl}/${imageUrl}`}
                  // "/assets/img/profiles/2.jpg"
                  className=" col-2 mx-2 w-60 rounded-circle img-thumbnail border"
                  alt=""
                />
              </div> */}

          {/* <Button
                color="light"
                className=" font-weight-semibold mx-2"
                size="large"
              >
                <span className="font-weight-semibold text-one">
                  <i className="iconsminds-thunder text-primary" />
                </span>
              </Button> */}
          {/* </div>
            <div>
              <NavLink>
                <Button
                  color="light"
                  className="font-weight-semibold mx-2"
                  size="large"
                  //   onClick={handleLinkedInClick}
                >
                  <i className="simple-icon-social-linkedin text-primary font-weight-semibold text-one" />
                </Button>
              </NavLink>
            </div>
          </div> */}
          
          <Card style={{ height: "160px", width: "100%", overflow: "hidden" }} className="bg-primary">
  <div className="d-flex align-items-center justify-content-between" style={{ height: "100%" }}>
    <div className="d-flex align-items-center mt-4 ml-4 mb-4">
      {imageUrl === null ? (
        <ThumbnailLetters
          // small
          rounded
          text={firstName}
          className="mx-2"
          color="secondary"
        />
      ) : (
        <img
          src={`${baseUrl}/${imageUrl}`}
          // src="/assets/img/profiles/2.jpg"
          className="mx-2 rounded-circle img-thumbnail border"
          style={{ width: "110px", height: "110px" }}
          alt=""
        />
      )}
      <div className="ml-4 mt-2">
        <h1 className="font-weight-semibold text-large">
          {firstName} {lastName}
        </h1>
      </div>
    </div>
    <div className="mr-4">
      <NavLink className="d-none d-md-inline-block">
        <Button
          color="light"
          className="font-weight-semibold"
          size="large"
          // onClick={handleLinkedInClick}
        >
          <i className="simple-icon-social-linkedin text-primary font-weight-semibold text-one" />
        </Button>
      </NavLink>
    </div>
  </div>
</Card>


          {isEditing && (
            <div className="mt-2">
              <Button
                className="default"
                color="light"
                onClick={() => document.getElementById("file-upload").click()}
              >
                Change profile pic{" "}
                <i className="iconsminds-upload text-primary" />
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
          )}
          <Row lg={10} md={8}>
            <Col lg="5" md="12" className="mt-4 ml-4" >
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
                      <Label for="location" className="font-weight-medium">
                        <h4>Location</h4>
                      </Label>
                      <Input
                        type="text"
                        id="location"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                      />
                      <br />
                    </>
                  </div>
                ) : (
                  <>
                    {/* <h1 className="font-weight-semibold text-large">
                      Name: {firstName} {lastName}
                    </h1> */}

                    <h5 className="font-weight-medium">
                      <i className="simple-icon-location-pin text-primary" />

                      <span className="ml-2">{location}</span>
                    </h5>
                    <h6 className="">
                      <i className="simple-icon-star text-primary " />
                      <span className="ml-2">{`${star} (${ratings} ratings)`}</span>
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

            <Col lg="5" md="12" className="mt-4 ml-4">
              <h2 className="mx-2">Languages</h2>
              {isEditingButton ? (
                <>
                  {languages.map((language, index) => (
                    <Button
                      key={language}
                      color="light"
                      className="mb-2 font-weight-semibold mx-2"
                      size="xs"
                      onClick={() => handleRemoveLanguages(index)}
                    >
                      {language} <i className="iconsminds-close" />
                    </Button>
                  ))}

                  <InputGroup className="mb-3">
                    <Input
                      type="text"
                      placeholder="New language"
                      value={newInputLanguages}
                      onChange={(e) => setNewInputLanguages(e.target.value)}
                      onKeyDown={(event) => {
                        if (event.key === "Enter") {
                          handleAddLanguages(newInputLanguages);
                          setNewInputLanguages("");
                        }
                      }}
                    />
                    <InputGroupAddon addonType="append">
                      <Button
                        outline
                        color="primary"
                        onClick={() => {
                          handleAddLanguages(newInputLanguages);
                          setNewInputLanguages("");
                        }}
                      >
                        Add Language
                      </Button>
                    </InputGroupAddon>
                  </InputGroup>
                </>
              ) : (
                languages.map((language) => (
                  <Button
                    key={language}
                    color="light"
                    className="mb-2 font-weight-semibold mx-2"
                    size="xs"
                    // onClick={() => handleRemoveSkill(index)}
                  >
                    {language}
                  </Button>
                ))
              )}

              <div className="mt-2">
                <h2 className="mx-2">Topics</h2>

                {isEditingButton ? (
                  <>
                    {topic.map((newTopics, index) => (
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
                  topic.map((newTopics) => (
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
            <Col lg="12" md="12" className="ml-4">
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
                      value={about}
                      onChange={(e) => setAbout(e.target.value)}
                      className="form-control"
                      rows="5"
                    />
                    <Label for="about" className="font-weight-medium mt-2">
                      <h4>Bio</h4>
                    </Label>
                    <Input
                      type="textarea"
                      id="bio"
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      className="form-control"
                      rows="5"
                    />
                    {/* <br />
                    <Label for="linkedin" className="font-weight-medium">
                      <h4>LinkedIn URL</h4>
                    </Label>
                    <Input
                      type="url"
                      id="linkedinUrl"
                      value={linkedinUrl}
                      onChange={(e) => setLinkedinUrl(e.target.value)}
                      className="form-control"
                    /> */}
                    {/* <br />
                    <Label for="twitter" className="font-weight-medium">
                      <h4>Twitter URL</h4>
                    </Label>
                    <Input
                      type="url"
                      id="twitter"
                      value={twitterHandle}
                      onChange={(e) => setTwitterHandle(e.target.value)}
                    />
                    <br /> */}
                    {/* <Label for="personalWebsite" className="font-weight-medium">
                      <h4>Personal Website URL</h4>
                    </Label>
                    <Input
                      type="url"
                      id="personalWebsite"
                      value={website}
                      onChange={(e) => setWebsite(e.target.value)}
                    /> */}
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

export default LawyerMyProfile;
