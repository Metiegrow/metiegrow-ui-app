import axios from "axios";
import { baseUrl } from "constants/defaultValues";
import { useEffect, useState } from "react";
import { ReactSortable } from "react-sortablejs";
import {
  Button,
  Card,
  CardBody,
  Col,
  // Card,
  // CardBody,
  // CardSubtitle,
  // CardImg,
  Input,
  InputGroup,
  InputGroupAddon,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
} from "reactstrap";
// import { NotificationManager } from 'components/common/react-notifications';
import ThumbnailLetters from "components/cards/ThumbnailLetters";
import { Colxx } from "components/common/CustomBootstrap";
import country from "../my-login/Country";
import ToasterComponent from "../notifications/ToasterComponent";

const MyProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingAbout, setIsEditingAbout] = useState(false);
  const [isEditingButton, setIsEditingButton] = useState(false);
  const [isEditingPrice, setIsEditingPrice] = useState(false);
  const [image, setImage] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  // const [experience, setExperience] = useState("");
  const [setExperience] = useState("");
  const [location, setLocation] = useState("");
  const [newInputSkill, setNewInputSkill] = useState("");
  const [skills, setSkills] = useState([]);
  const [userId, setUserId] = useState(null);
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [category, setCategory] = useState("");
  const [bio, setBio] = useState("");
  const [price, setPrice] = useState("");
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [twitterHandle, setTwitterHandle] = useState("");
  const [website, setWebsite] = useState("");
  const [introVideo, setIntroVideo] = useState("");
  const [featuredArticle, setFeaturedArticle] = useState("");
  const [reasonForMentor, setReasonForMentor] = useState("");
  const [achievement, setAchievement] = useState("");
  const [totalRatings, setTotalRatings] = useState(0);
  const [averageStar, setAverageStar] = useState(0);
  // const [profileLoading, setProfileLoading] = useState(true);
  const [setProfileLoading] = useState(true);
  // const [languages, setLanguages] = useState([]);
  const [languages] = useState([]);
  const [skillValidationMessage, setSkillValidationMessage] = useState("");
  const [isProfileUpdated, setIsProfileUpdated] = useState(false);
  const [imageEditModal, setImageEditModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedFileBase64, setSelectedFileBase64] = useState(null);

  // const Id = 1;

  // const url = `${baseUrl}/user`;
  // const url = `${baseUrl}/api/mentor/11/details/profile`;
  // const url1 = `${baseUrl}/mentor/profile${userId}`;
  // const endUrl = `${baseUrl}/api/mentor/${Id}/details/profile`;
  // const endUrl = `${baseUrl}/myprofile`;
  const endUrl = `${baseUrl}/api/mentor/myprofile`;
  const inputUrl = `${baseUrl}/inputs`;
  const imageEditUrl = `${baseUrl}/api/mentor/profile-image`;
  const mentorProfileDetails = async () => {
    try {
      const response = await axios.get(endUrl);
      const userData = response.data;
      // console.log("userData:", userData);
      if (userData) {
        setImage(userData.imageUrl);
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
        setPrice(userData.price);
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

  useEffect(() => {
    mentorProfileDetails();
  }, [isProfileUpdated]);
  useEffect(() => {
    const mentorReviews = async () => {
      const ratingUrl = `${baseUrl}/api/mentorship/rating/meta/${userId}`;

      try {
        const response = await axios.get(ratingUrl);
        setTotalRatings(response.data.totalRatings);
        setAverageStar(response.data.averageStar);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    mentorReviews();
  }, [userId]);

  useEffect(() => {
    const mentorProfileDetails1 = async () => {
      try {
        const response = await axios.get(inputUrl);
        const inputData = response.data;
        // console.log("inputData:", inputData);
        if (inputData) {
          // setReviews(inputData.reviews)
          // setPrice(inputData.price)
          setExperience(inputData.experience);
          // setTopics(inputData.topics);
          // setStar(inputData.star);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    mentorProfileDetails1();
  }, []);

  function getTokenRes() {
    return localStorage.getItem("tokenRes");
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
        price,
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
      ToasterComponent("success", response.data.statuses);
      // console.log("Profile updated successfully");
    } catch (error) {
      console.error("Error updating profile", error);
      if (error.response && error.response.data.statuses[0]) {
        ToasterComponent("warning", error.response.data.statuses);
      } else {
        ToasterComponent("error", [
          { message: "An unexpected error occurred" },
        ]);
      }
    }
  };

  const postImageData = async () => {
    try {
      const formData = new FormData();
      formData.append("image", selectedFile);

      const response = await axios.post(imageEditUrl, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      ToasterComponent("success", response.data.statuses);
      setTimeout(() => {}, 2000);
      // console.log(`resres ${response.status}`);
      if (response.status === 200) {
        await mentorProfileDetails();
      }
    } catch (error) {
      console.error(error);
    }
  };
  const handleImageClick = () => setImageEditModal(true);

  const handleImagePost = () => {
    postImageData();
    setSelectedFile(null);
    setImageEditModal(false);
  };

  const handleImageDelete = () => {
    // setSelectedFile(image);
    setImageEditModal(false);
  };

  const handleAddSkill = (newSkill) => {
    if (!newSkill.trim()) {
      setSkillValidationMessage("Skill cannot be empty");
    } else {
      setSkillValidationMessage("");
      setSkills([...skills, newSkill]);
    }
  };

  // const handleEditAboutClick = () => {
  //   setIsEditingAbout(true);
  // };

  const handleSaveAbout = () => {
    setIsEditingAbout(false);
    updateMEntorProfile();
  };
  const handleSavePrice = () => {
    setIsEditingPrice(false);
    updateMEntorProfile();
  };

  // const handleCancelEditAbout = () => {
  //   setIsEditingAbout(false);
  // };

  // const handleEditButton = () => {
  //   setIsEditingButton(true);
  // };
  const handleSaveButton = () => {
    if (skills.length === 0) {
      setSkillValidationMessage("At least one skill is required.");
    } else {
      setIsEditingButton(false);
      updateMEntorProfile();
    }
  };

  // const handleCancelButton = () => {
  //   if (skills.length === 0) {
  //     setSkillValidationMessage("At least one skill is required.");
  //   } else {
  //     setIsEditingButton(false);
  //   }
  // };

  // const handleEditClick = () => {
  //   setIsEditing(true);
  // };

  const handleSave = () => {
    setIsEditing(false);
    updateMEntorProfile();
    postImageData();
  };

  // const handleCancel = () => {
  //   setIsEditing(false);
  // };

  const handleRemoveSkill = (index) => {
    setSkills(skills.filter((_, i) => i !== index));
  };

  // const handleAddTopics = (newTopics) => {
  //   setTopics([...topics, newTopics]);
  // };
  // const handleRemoveTopics = (index) => {
  //   setTopics(topics.filter((_, i) => i !== index));
  // };

  // const handleLinkedInClick = () => {
  //   if (linkedinUrl) {
  //     window.open(linkedinUrl, "_blank");
  //   }
  // };

  // const handleTwitterClick = () => {
  //   if (twitterHandle) {
  //     const twitterUrl = `https://x.com/${twitterHandle}`;
  //     window.open(twitterUrl, "_blank");
  //   }
  // };
  // const handlePersonalWebsiteClick = () => {
  //   if (website) {
  //     let url = website;
  //     if (!url.startsWith("https://")) {
  //       url = `https://${url}`;
  //     }
  //     window.open(url, "_blank");
  //   }
  // };

  // const handleAddLanguages = (newLanguages) => {
  //   setLanguages([...languages, newLanguages]);
  // };

  // const handleRemoveLanguages = (index) => {
  //   setLanguages(languages.filter((_, i) => i !== index));
  // };

  // const languageOptions = language.map((option) => ({
  //   value: option.iso_code,
  //   label: option.name,
  // }));

  // const [selectedLanguages, setSelectedLanguages] = useState([]);

  // const handleChange = (selectedOptions) => {
  //   const languagesArray = selectedOptions
  //     ? selectedOptions.map((option) => option.value)
  //     : [];
  //   // console.log("arraychk", languagesArray);
  //   handleAddLanguages(languagesArray[0]);
  //   setSelectedLanguages([]);
  // };

  // const [file1] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        const base64Image = reader.result;
        setSelectedFileBase64(base64Image);

        // setAboutField({ ...aboutField, image: base64Image });
      };

      reader.readAsDataURL(file);
    }
  };

  const countryName = country.find((c) => c.iso_code === location)?.name;

  return (
    <div className="mentor-profile">
      {/* <div className=""> */}

      <Colxx sm="12" md="12" lg="12" xxs="12" className="">
        {/* new design starts */}
        {/* profile section starts */}
        <Row>
          <Col>
            <Card>
              <CardBody
                style={{
                  background: "linear-gradient(to right, #7B42C5, #AA5D93)",
                  color: "white",
                  borderRadius: "9px 9px 0 0",
                }}
              >
                <div
                  className="position-relative"
                  style={{ position: "relative", top: "5px", textAlign: "end" }}
                >
                  <Button
                    color="primary"
                    outline
                    className="icon-button  bg-light"
                    style={{ border: "none" }}
                    size="sm"
                    onClick={() => handleImageClick()}
                  >
                    <i className="simple-icon-pencil" />
                  </Button>
                </div>
                <div
                  className="position-relative"
                  style={{ position: "relative", top: "70px" }}
                >
                  <button
                    type="button"
                    className="btn p-0"
                    style={{ border: "none", background: "none" }}
                    // onClick={() => handleImageClick()}
                    aria-label="Profile image"
                  >
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
                        className="mx-2 rounded-circle img-thumbnail border"
                        style={{
                          width: "110px",
                          height: "110px",
                          objectFit: "cover",
                          overflow: "hidden",
                        }}
                        alt="img"
                      />
                    )}
                  </button>
                  <Modal
                    isOpen={imageEditModal}
                    toggle={() => setImageEditModal(!imageEditModal)}
                    className=""
                    size="lg"
                    style={{
                      borderRadius: "10px",
                      overflow: "hidden",
                    }}
                  >
                    <ModalHeader style={{ borderBottom: "none" }}>
                      <h2 className="font-weight-bold">Profile photo</h2>
                    </ModalHeader>
                    <ModalBody className="d-flex justify-content-center align-items-center">
                      <img
                        src={selectedFileBase64 || `${baseUrl}/${image}`}
                        className="rounded-circle img-thumbnail border border-3"
                        style={{
                          width: "130px",
                          height: "130px",
                          objectFit: "cover",
                        }}
                        alt="img"
                      />
                    </ModalBody>

                    <ModalFooter className="d-flex align-items-center justify-content-center">
                      {selectedFile ? (
                        <Button
                          outline
                          color="primary"
                          onClick={() => handleImagePost()}
                          className="icon-button"
                          style={{ border: "none" }}
                        >
                          <i className="iconsminds-upload " />
                        </Button>
                      ) : (
                        <InputGroup
                          className=""
                          style={{
                            width: "auto",
                            display: "flex",
                            justifyContent: "center",
                          }}
                        >
                          <div className="">
                            <Button
                              outline
                              className="icon-button"
                              color="primary"
                              style={{ border: "none" }}
                              onClick={() =>
                                document.getElementById("file-upload").click()
                              }
                            >
                              <i className="simple-icon-pencil" />
                            </Button>

                            <Input
                              id="file-upload"
                              type="file"
                              className="d-none"
                              onChange={handleFileChange}
                            />
                          </div>
                        </InputGroup>
                      )}

                      <Button
                        color="primary"
                        outline
                        onClick={() => handleImageDelete()}
                        className="icon-button"
                        style={{ border: "none" }}
                      >
                        <i className="simple-icon-trash" />
                      </Button>
                    </ModalFooter>
                  </Modal>
                </div>

                {/* Modal for update profile starts */}
                <Modal
                  isOpen={isEditing}
                  toggle={() => setIsEditing(!isEditing)}
                  className=""
                  size="lg"
                  style={{
                    borderRadius: "10px",
                    overflow: "hidden",
                  }}
                >
                  <ModalHeader style={{ borderBottom: "none" }}>
                    <h2 className="font-weight-bold">Edit Profile</h2>
                  </ModalHeader>
                  <ModalBody>
                    <Row className="">
                      <Col md="6">
                        <Label for="firstName" className="text-muted">
                          <h4>First Name</h4>
                        </Label>
                        <Input
                          type="text"
                          id="firstName"
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          className=" text-one"
                        />
                      </Col>
                      <Col md="6">
                        <Label for="lastName" className="text-muted">
                          <h4>Last Name</h4>
                        </Label>
                        <Input
                          type="text"
                          id="lastName"
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          className=" text-one"
                        />
                      </Col>
                    </Row>
                    <br />

                    <>
                      <Label for="jobtitle" className="text-muted">
                        <h4>Job Title</h4>
                      </Label>
                      <Input
                        type="text"
                        id="jobtitle"
                        value={jobTitle}
                        onChange={(e) => setJobTitle(e.target.value)}
                        className=" text-one"
                      />
                      <br />
                    </>
                    <>
                      <Label for="company" className="text-muted">
                        <h4>Company</h4>
                      </Label>
                      <Input
                        type="text"
                        id="company"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        className=" text-one"
                      />
                      <br />
                    </>

                    <>
                      <Label for="location" className="text-muted">
                        <h4>Location</h4>
                      </Label>

                      <Input
                        type="select"
                        name="location"
                        value={location}
                        // validate={validateLocation}
                        onChange={(e) => setLocation(e.target.value)}
                        className="form-control text-one"
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
                  </ModalBody>
                  <ModalFooter
                    style={{ borderTop: "none" }}
                    className="d-flex align-items-center justify-content-center"
                  >
                    <Button color="primary" onClick={() => handleSave()}>
                      Save
                    </Button>{" "}
                    <Button
                      color="primary"
                      outline
                      onClick={() => setIsEditing(false)}
                      className=""
                    >
                      Cancel
                    </Button>
                  </ModalFooter>
                </Modal>
                {/* Modal for update profile ends */}
              </CardBody>
              <CardBody>
                <div className=" mt-2">
                  <div className="text-end w-100  d-flex justify-content-end">
                    <Button
                      color="primary"
                      outline
                      className="icon-button"
                      style={{ border: "none" }}
                      size="sm"
                      onClick={() => setIsEditing(true)}
                    >
                      <i className="simple-icon-pencil" />
                    </Button>
                  </div>
                  <div className="">
                    {/* {linkedinUrl && (
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
                )} */}

                    <div className="mt-4">
                      <h2 className="font-weight-bold">
                        {firstName} {lastName}
                      </h2>
                      <h3 className="text-one">
                        {jobTitle} | {company}
                      </h3>
                      <h5 className="font-weight-medium">
                        <i className="simple-icon-location-pin text-primary" />

                        <span className="ml-2">{countryName}</span>
                      </h5>
                      <h6 className="">
                        <i className="simple-icon-star text-primary " />
                        <span className="ml-2">{`${averageStar} (${totalRatings} reviews)`}</span>
                      </h6>
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>

        {/* profile section ends */}

        {/* about section starts */}
        <Row className="my-4 ">
          <Col>
            <Card>
              <CardBody>
                <Row className="align-items-center">
                  <Col className="d-flex justify-content-between">
                    <h2 className="font-weight-bold">About</h2>

                    <Button
                      color="primary"
                      outline
                      className="icon-button"
                      size="sm"
                      onClick={() => setIsEditingAbout(true)}
                      style={{ border: "none" }}
                    >
                      <i className="simple-icon-pencil" />
                    </Button>
                  </Col>
                </Row>
                <div>
                  <p className="text-muted">{bio}</p>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
        {/* about modal  */}
        <Modal
          isOpen={isEditingAbout}
          toggle={() => setIsEditingAbout(!isEditingAbout)}
          className=""
          size="lg"
          style={{ borderRadius: "10px", overflow: "hidden" }}
        >
          <ModalHeader style={{ borderBottom: "none" }}>
            <h2 className="font-weight-bold">About</h2>
          </ModalHeader>
          <ModalBody>
            <br />

            <>
              <Label for="about" className="text-muted">
                <h4>About Me</h4>
              </Label>
              <Input
                type="textarea"
                id="about"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className=" text-one"
              />
              <br />
            </>

            <>
              <Label for="linkedInUrl" className="text-muted">
                <h4>LinkedIn URL</h4>
              </Label>
              <Input
                type="text"
                id="linkedInUrl"
                value={linkedinUrl}
                onChange={(e) => setLinkedinUrl(e.target.value)}
                className=" text-one"
              />
              <br />
            </>
            <>
              <Label for="email" className="text-muted">
                <h4>Twitter URL</h4>
              </Label>
              <Input
                type="text"
                id="twitterHandle"
                value={twitterHandle}
                onChange={(e) => setTwitterHandle(e.target.value)}
                className=" text-one"
              />
              <p className="text-muted mt-1">
                Omit the &ldquo;@&rdquo; -e.g. &ldquo;dqmonn&rdquo;
              </p>
              <br />
            </>
            <>
              <Label for="website" className="text-muted">
                <h4>Personal Website URL</h4>
              </Label>
              <Input
                type="text"
                id="website"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                className=" text-one"
              />
              <br />
            </>
          </ModalBody>
          <ModalFooter
            style={{ borderTop: "none" }}
            className="d-flex align-items-center justify-content-center"
          >
            <Button color="primary" onClick={() => handleSaveAbout()}>
              Save
            </Button>{" "}
            <Button
              color="primary"
              outline
              onClick={() => setIsEditingAbout(false)}
              className=""
            >
              Cancel
            </Button>
          </ModalFooter>
        </Modal>

        {/* about section ends */}

        {/* skill section starts */}
        <Row className="my-4">
          <Col>
            <Card>
              <CardBody>
                <Row className="align-items-center">
                  <Col className="d-flex justify-content-between">
                    <h2 className="font-weight-bold">Skills</h2>

                    <Button
                      color="primary"
                      outline
                      className="icon-button"
                      style={{ border: "none" }}
                      size="sm"
                      onClick={() => setIsEditingButton(true)}
                    >
                      <i className="simple-icon-pencil" />
                    </Button>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <div
                      className="d-flex flex-wrap"
                      style={{ gap: "10px", marginTop: "10px" }}
                    >
                      {skills.map((skill, index) => (
                        <Button
                          // eslint-disable-next-line react/no-array-index-key
                          key={index}
                          color={index < 3 ? "primary" : "light"}
                          size="sm"
                        >
                          {skill}
                        </Button>
                      ))}
                    </div>
                  </Col>
                </Row>
              </CardBody>

              <Modal
                isOpen={isEditingButton}
                toggle={() => setIsEditingButton(!isEditingButton)}
                className=""
                size="lg"
                style={{ borderRadius: "10px", overflow: "hidden" }}
              >
                <ModalHeader style={{ borderBottom: "none" }}>
                  <h2 className="font-weight-bold">Skills</h2>
                </ModalHeader>
                <ModalBody>
                  <Row className="w-100 mb-3">
                    <>
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
                  </Row>
                  <Row>
                    <ReactSortable
                      list={skills}
                      setList={setSkills}
                      options={{ handle: ".handle" }}
                      className="d-flex flex-wrap ml-2"
                    >
                      {skills.map((skill, index) => (
                        <Button
                          // eslint-disable-next-line react/no-array-index-key
                          key={index}
                          outline={index >= 3}
                          color="light"
                          // color={index < 3 ? 'primary' : 'light'}
                          className="ml-2 font-weight-semibold mx-2 d-flex align-items-center text-dark"
                          size="sm"
                          onClick={() => handleRemoveSkill(index)}
                        >
                          {skill}
                          <i className="iconsminds-close ml-2 text-dark" />
                        </Button>
                      ))}
                    </ReactSortable>
                    {/* <p className="ml-3 text-muted mt-3">Drag skills to set top 3 (the top 3 skills will be displayed on mentor cards)</p> */}
                  </Row>
                </ModalBody>

                <ModalFooter
                  style={{ borderTop: "none" }}
                  className="d-flex align-items-center justify-content-center"
                >
                  <Button color="primary" onClick={() => handleSaveButton()}>
                    Save
                  </Button>{" "}
                  <Button
                    color="primary"
                    outline
                    onClick={() => setIsEditingButton(false)}
                    className=""
                  >
                    Cancel
                  </Button>
                </ModalFooter>
              </Modal>
            </Card>
          </Col>
        </Row>
        {/* skill section ends */}
        {/* price section starts */}
        <Row className="my-4 ">
          <Col>
            <Card>
              <CardBody>
                <Row className="align-items-center">
                  <Col className="d-flex justify-content-between">
                    <h2 className="font-weight-bold">Price</h2>

                    <Button
                      color="primary"
                      outline
                      className="icon-button"
                      size="sm"
                      onClick={() => setIsEditingPrice(true)}
                      style={{ border: "none" }}
                    >
                      <i className="simple-icon-pencil" />
                    </Button>
                  </Col>
                </Row>
                <div>
                  <h2 className="font-weight-semi-bold ">₹ {price}</h2>
                </div>
              </CardBody>
            </Card>
          </Col>
          {/* price modal starts */}
          <Modal
            isOpen={isEditingPrice}
            toggle={() => setIsEditingPrice(!isEditingPrice)}
            className=""
            size="lg"
            style={{ borderRadius: "10px", overflow: "hidden" }}
          >
            <ModalHeader style={{ borderBottom: "none" }}>
              <h2 className="font-weight-bold">Price</h2>
            </ModalHeader>
            <ModalBody>
              <br />

              <>
                <Label for="about" className="text-muted">
                  <h4>Price</h4>
                </Label>
                <Input
                  type="number"
                  id="about"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className=" text-one"
                />
                <br />
              </>
            </ModalBody>
            <ModalFooter
              style={{ borderTop: "none" }}
              className="d-flex align-items-center justify-content-center"
            >
              <Button color="primary" onClick={() => handleSavePrice()}>
                Save
              </Button>{" "}
              <Button
                color="primary"
                outline
                onClick={() => setIsEditingPrice(false)}
                className=""
              >
                Cancel
              </Button>
            </ModalFooter>
          </Modal>
          {/* price modal ends */}
        </Row>
        {/* price section ends */}
        {/* new design ends */}
      </Colxx>
    </div>
    // </div>
  );
};

export default MyProfile;
