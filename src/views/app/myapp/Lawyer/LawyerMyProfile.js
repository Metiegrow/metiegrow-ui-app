import React, { useState, useEffect } from "react";
import {
  Button,
  // NavLink,
  Row,
  Input,
  Label,
  InputGroup,
  InputGroupAddon,
  Col,
  Form,
  Card,
  FormGroup,
} from "reactstrap";
import axios from "axios";
import { NotificationManager } from "components/common/react-notifications";
import { baseUrl } from "constants/defaultValues";
import { ReactSortable } from "react-sortablejs";
import Select from "react-select";
import { Colxx } from "components/common/CustomBootstrap";
import ThumbnailLetters from "components/cards/ThumbnailLetters";
import country from "../my-login/Country";
import language from "../my-login/Languages";

const LawyerMyProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingAbout, setIsEditingAbout] = useState(false);
  const [isEditingButton, setIsEditingButton] = useState(false);
  // const [newInputLanguages, setNewInputLanguages] = useState("");
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
  const [profileLoading, setProfileLoading] = useState(true);
  const [topicValidationMessage, setTopicValidationMessage] = useState("");
  const [isPosted, setIsPosted] = useState(false)

  const endUrl = `${baseUrl}/api/lawyer/myprofile`;

  useEffect(() => {
    const mentorProfileDetails = async () => {
      try {
        const response = await axios.get(endUrl);
        const userData = response.data;
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
          setProfileLoading(false);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    mentorProfileDetails();
  }, [isPosted]);

  function getTokenRes() {
    return localStorage.getItem("tokenRes");
  }
  const token = getTokenRes();

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

      const response = await axios.put(endUrl, updatedData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      response.data.statuses.forEach((status) => {
         NotificationManager.success(status.message, 'Great!', 3000, null, null, '');
     });
     setIsPosted(!isPosted)
      // console.log("Profile updated successfully");
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
    if (topic.length === 0) {
      setTopicValidationMessage('At least one topic is required.');
    } else {
    setIsEditingButton(false);
    updateMEntorProfile();
    }
  };

  const handleCancelButton = () => {
    if (topic.length === 0) {
      setTopicValidationMessage('At least one topic is required.');
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

  const handleRemoveLanguages = (index) => {
    setLanguages(languages.filter((_, i) => i !== index));
  };

  const handleAddTopics = (newTopics) => {
    if (!newTopics.trim()) {
      setTopicValidationMessage("Topic cannot be empty");
  } else {
    setTopicValidationMessage("")
    setTopic([...topic, newTopics]);
  }
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
  const countryName = country.find((c) => c.iso_code === location)?.name;

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

  return (
    <div className="mentor-profile">
      {/* <div className=""> */}

      <Colxx sm="12" md="12" lg="12" xxs="12" className="">
        <div className="">
          <Card
            style={{ height: "160px", width: "100%", overflow: "hidden" }}
            className="bg-primary"
          >
            <div
              className="d-flex align-items-center justify-content-between"
              style={{ height: "100%" }}
            >
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
                    className="mx-2 rounded-circle img-thumbnail border"
                    style={{ width: "110px", height: "110px", objectFit: "cover"  }}
                    alt="img"
                  />
                )}
                <div className="ml-4 mt-2">
                  <h1 className="font-weight-semibold text-large">
                    {firstName} {lastName}
                  </h1>
                </div>
              </div>
              {/* <div className="mr-4">
              <NavLink className="d-none d-md-inline-block">
                  <Button
                    color="light"
                    className="font-weight-semibold icon-button"
                    size="large"
                    // onClick={handleLinkedInClick}
                  >
                    <i className="simple-icon-social-linkedin text-primary font-weight-semibold text-one" />
                  </Button>
                </NavLink>
              </div> */}
            </div>
          </Card>

          {profileLoading ? (
            <div className="loading" />
          ) : (
            <>
              {isEditing && (
                <div className="mt-2">
                  <Button
                    className="default"
                    color="light"
                    onClick={() =>
                      document.getElementById("file-upload").click()
                    }
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
                <Col lg="5" md="12" className="mt-4 ml-4">
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
                            type="select"
                            name="location"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            className="form-control"
                          >
                            <option disabled value="">
                              Select Location
                            </option>
                            {country.map((option,index) => (
                              <option
                              // eslint-disable-next-line react/no-array-index-key
                                key={index}
                                value={option.iso_code}
                              >
                                {option.name}
                              </option>
                            ))}
                          </Input>
                          <br />
                        </>
                      </div>
                    ) : (
                      <>
                        <h5 className="font-weight-medium">
                          <i className="simple-icon-location-pin text-primary" />

                          <span className="ml-2">{countryName}</span>
                        </h5>
                        <h6 className="">
                          <i className="simple-icon-star text-primary " />
                          <span className="ml-2">{`${star} (${ratings} ratings)`}</span>
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
                      <Button
                        color="primary"
                        onClick={handleSave}
                        className="mr-2"
                      >
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
                {(languages.length > 0 || isEditingButton) && <h2 className="mx-2 font-weight-semibold">Languages known</h2>}
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

                  <div className="mt-2">
                    <h2 className="font-weight-semibold mx-2">Topics</h2>

                    {isEditingButton ? (
                      <>
                        <ReactSortable
                          list={topic}
                          setList={setTopic}
                          options={{ handle: ".handle" }}
                          className="row"
                        >
                          {topic.map((newTopics, index) => (
                            <Button
                            // eslint-disable-next-line react/no-array-index-key
                              key={index}
                              color={index < 3 ? 'primary' : 'light'}
                              className="mb-2 font-weight-semibold mx-2"
                              size="xs"
                              onClick={() => handleRemoveTopics(index)}
                            >
                              {newTopics} <i className="iconsminds-close" />
                            </Button>
                          ))}
                        </ReactSortable>
                        <p className="text-muted">Drag topic to set top 3 (the top 3 topics will be displayed on lawyer cards)</p>
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
                        {topicValidationMessage && (
                      <div className="invalid-feedback d-block">
                        {topicValidationMessage}
                      </div>
                    )}
                      </>
                    ) : (
                      topic.map((newTopics,index) => (
                        <Button
                        // eslint-disable-next-line react/no-array-index-key
                          key={index}
                          color={index < 3 ? 'primary' : 'light'}
                          className="mb-2 font-weight-semibold mx-2"
                          size="xs"
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
                          Cancel
                        </Button>
                      </>
                    )}
                  </div>
                </Col>
              </Row>
              <hr />
              <Row>
                <Col lg="12" md="12" className="ml-4">
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

                        <br />
                      </div>
                    ) : (
                      <div className="col-lg-12 col-12">
                        <p className="text-one font-weight-medium">{about}</p>
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
                        Cancel
                      </Button>
                    </>
                  )}
                </Col>
              </Row>
              <hr />
            </>
          )}
        </div>
      </Colxx>
    </div>
  );
};

export default LawyerMyProfile;
