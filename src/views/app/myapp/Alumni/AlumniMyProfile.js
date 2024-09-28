import axios from "axios";
import ThumbnailLetters from "components/cards/ThumbnailLetters";
import { Colxx } from "components/common/CustomBootstrap";
import { baseUrl } from "constants/defaultValues";
import { useEffect, useState } from "react";
import Select from "react-select";
import { ReactSortable } from "react-sortablejs";
import {
  Button,
  Card,
  CardBody,
  Col,
  FormGroup,
  Input,
  InputGroup,
  InputGroupAddon,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  NavLink,
  Row,
} from "reactstrap";
import { EmploymentTypeData } from "../Listing/ListingData";
import country from "../my-login/Country";
import language from "../my-login/Languages";
import ToasterComponent from "../notifications/ToasterComponent";

const AlumniMyProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingAbout, setIsEditingAbout] = useState(false);
  // const [isEditingButton, setIsEditingButton] = useState(false);
  const [isEditingExp, setIsEditingExp] = useState(false);
  const [image, setImage] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [experience, setExperience] = useState([]);
  // const [experience, setExperience] = useState("");

  const [location, setLocation] = useState("");
  const [newInputSkill, setNewInputSkill] = useState("");
  const [skills, setSkills] = useState([]);
  const [price, setPrice] = useState("");
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
  const [totalRatings, setTotalRatings] = useState(0);
  const [averageStar, setAverageStar] = useState(0);
  // const [profileLoading, setProfileLoading] = useState(true);
  const [languages, setLanguages] = useState([]);
  const [college, setCollege] = useState([]);
  const [skillValidationMessage, setSkillValidationMessage] = useState("");
  const [isProfileUpdated, setIsProfileUpdated] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageEditModal, setImageEditModal] = useState(false);
  const [selectedFileBase64, setSelectedFileBase64] = useState(null);
  const [isEditingLanguages, setIsEditingLanguages] = useState(false);
  const [isEditingSkills, setIsEditingSkills] = useState(false);
  const [isEditingPrice, setIsEditingPrice] = useState(false);
  const [isEditingEducation, setIsEditingEducation] = useState(false);
  const [expId, setExpId] = useState("");
  const [collegeId, setCollegeId] = useState("");

  const endUrl = `${baseUrl}/api/alumni/myprofile`;
  const inputUrl = `${baseUrl}/inputs`;
  const imageEditUrl = `${baseUrl}/api/alumni/profile-image`;

  const mentorProfileDetails = async () => {
    try {
      const response = await axios.get(endUrl);
      const userData = response.data;
      console.log(userData);
      if (userData) {
        setImage(userData.imageUrl);
        setFirstName(userData.firstName);
        setJobTitle(userData.jobTitle);
        setCompany(userData.company);
        setLocation(userData.location);
        setSkills(userData.skills);
        setPrice(userData.price);
        setUserId(userData.id);
        setLastName(userData.lastName);
        setEmail(userData.email);
        setCategory(userData.category);
        setBio(userData.bio);
        setLinkedinUrl(userData.linkedinUrl);
        setTwitterHandle(userData.twitterHandle);
        setWebsite(userData.website);
        setIntroVideo(userData.introVideo);
        setFeaturedArticle(userData.featuredArticle);
        setReasonForMentor(userData.reasonForMentor);
        setAchievement(userData.achievement);
        // setProfileLoading(false);
        setLanguages(userData.languages);
        setExperience(userData.experience);
        setCollege(userData.colleges);
        if (userData.experience && userData.experience.length > 0) {
          setExpId(userData.experience[0].id);
        }
        if (userData.colleges && userData.colleges.length > 0) {
          setCollegeId(userData.colleges[0].id);
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    mentorProfileDetails();
  }, [isProfileUpdated]);
  const currentYear = new Date().getFullYear();
  const years = [];
  for (let year = currentYear; year >= 2005; year -= 1) {
    years.push(year);
  }

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
        if (inputData) {
          setExperience(inputData.experience);
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
        // experience,
        price,
      };

      const response = await axios.put(endUrl, updatedData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setIsProfileUpdated(!isProfileUpdated);
      ToasterComponent("success", response.data.statuses);
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

  const experienceUrl = `${baseUrl}/api/alumni/experience/${expId}`;
  const updateExperience = async () => {
    try {
      if (experience.length > 0) {
        const updatedData = {
          company: experience[0].company,
          jobTitle: experience[0].jobTitle,
          employmentType: experience[0].employmentType,
          jobLocation: experience[0].jobLocation,
          startYear: experience[0].startYear,
          endYear: experience[0].endYear,
        };

        console.log("Updated Data:", updatedData); // Log updated data to verify

        const response = await axios.put(experienceUrl, updatedData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setIsProfileUpdated(!isProfileUpdated);
        ToasterComponent("success", response.data.statuses);
      } else {
        ToasterComponent("warning", [
          { message: "No experience data available" },
        ]);
      }
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

  // update education

  const educationUpdateUrl = `${baseUrl}/api/alumni/college/${collegeId}`;
  const updateEducation = async () => {
    try {
      if (college.length > 0) {
        const updatedData = {
          collegeName: college[0].collegeName,
          degree: college[0].degree,
          department: college[0].department, // Assuming you have this field in your state
          year: Number(college[0].year), // Ensure year is a number
        };

        console.log("Updated Data:", updatedData); // Log updated data to verify

        const response = await axios.put(educationUpdateUrl, updatedData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setIsProfileUpdated(!isProfileUpdated);
        ToasterComponent("success", response.data.statuses);
      } else {
        ToasterComponent("warning", [
          { message: "No experience data available" },
        ]);
      }
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
      if (response.status === 200) {
        await mentorProfileDetails();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddSkill = (newSkill) => {
    if (!newSkill.trim()) {
      setSkillValidationMessage("Skill cannot be empty");
    } else {
      setSkillValidationMessage("");
      setSkills([...skills, newSkill]);
    }
  };

  const handleRemoveSkill = (index) => {
    setSkills(skills.filter((_, i) => i !== index));
  };
  const handleRemoveLanguages = (index) => {
    setLanguages(languages.filter((_, i) => i !== index));
  };
  // const handleEditAboutClick = () => {
  //   setIsEditingAbout(true);
  // };

  // const handleEditExpClick = () => {
  //   setIsEditingExp(true);
  // };
  const handleSavePrice = () => {
    setIsEditingPrice(false);
    updateMEntorProfile();
  };
  const handleSaveExp = () => {
    setIsEditingExp(false);
    // updateMEntorProfile();
    updateExperience();
  };
  const handleSaveEducation = () => {
    setIsEditingEducation(false);
    // updateMEntorProfile();
    updateEducation();
  };
  const handleCancelEditEducation = () => {
    setIsEditingEducation(false);
  };
  const handleCancelEditExp = () => {
    setIsEditingExp(false);
  };

  const handleSaveAbout = () => {
    setIsEditingAbout(false);
    updateMEntorProfile();
  };

  // const handleCancelEditAbout = () => {
  //   setIsEditingAbout(false);
  // };

  // const handleEditButton = () => {
  //   setIsEditingButton(true);
  // };
  const handleLanguagesSave = () => {
    if (languages.length === 0) {
      setSkillValidationMessage("At least one language is required.");
    } else {
      setIsEditingLanguages(false);
      updateMEntorProfile();
    }
  };
  const handleLanguagesCancel = () => {
    setIsEditingLanguages(false);
  };

  const handleSaveSkill = () => {
    if (skills.length === 0) {
      setSkillValidationMessage("At least one skill is required.");
    } else {
      setIsEditingSkills(false);
      updateMEntorProfile();
    }
  };
  const handleSkillCancel = () => {
    setIsEditingSkills(false);
  };
  // const handleSaveButton = () => {
  //   if (skills.length === 0) {
  //     setSkillValidationMessage("At least one skill is required.");
  //   } else {
  //     setIsEditingButton(false);
  //     updateMEntorProfile();
  //   }
  // };

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

  const handleLinkedInClick = () => {
    if (linkedinUrl) {
      window.open(linkedinUrl, "_blank");
    }
  };

  const handleTwitterClick = () => {
    if (twitterHandle) {
      const twitterUrl = `https://x.com/${twitterHandle}`;
      window.open(twitterUrl, "_blank");
    }
  };
  const handlePersonalWebsiteClick = () => {
    if (website) {
      let url = website;
      if (!url.startsWith("https://")) {
        url = `https://${url}`;
      }
      window.open(url, "_blank");
    }
  };

  const handleAddLanguages = (newLanguages) => {
    setLanguages([...languages, newLanguages]);
  };

  // const handleRemoveLanguages = (index) => {
  //   setLanguages(languages.filter((_, i) => i !== index));
  // };

  const languageOptions = language.map((option) => ({
    value: option.iso_code,
    label: option.name,
  }));

  const [selectedLanguages, setSelectedLanguages] = useState([]);

  const handleChange = (selectedOptions) => {
    const languagesArray = selectedOptions
      ? selectedOptions.map((option) => option.value)
      : [];
    handleAddLanguages(languagesArray[0]);
    setSelectedLanguages([]);
  };

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

  const handleInputChange = (index, field, value) => {
    const updatedExperience = [...experience];
    updatedExperience[index][field] = value;
    setExperience(updatedExperience);
  };
  const handleInputEducationChange = (index, field, value) => {
    const updatedCollege = [...college];
    updatedCollege[index][field] = value;
    setCollege(updatedCollege);
  };

  return (
    <div className="aluni-profile">
      <Colxx sm="12" md="12" lg="12" xxs="12" className="">
        {/* new design code starts */}
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
                  className="position-relative "
                  style={{ position: "relative", top: "70px" }}
                >
                  <div className="d-flex justify-content-between align-items-center">
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
                    <div
                      className="mr-4 d-flex mb-4"
                      style={{ display: "none ", visibility: "hidden" }}
                    >
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
              </CardBody>
              <CardBody>
                <div>
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
                  <div className="mt-4">
                    <h2 className="font-weight-bold">
                      {firstName} {lastName}
                    </h2>
                    <h3 className="font-weight-semibold">
                      {college[0]?.degree} {college[0]?.department} @
                      {college[0]?.college}
                    </h3>

                    {countryName && (
                      <h5 className="font-weight-medium">
                        <i className="simple-icon-location-pin text-primary" />

                        <span className="ml-2">{countryName}</span>
                      </h5>
                    )}
                    <h6 className="">
                      <i className="simple-icon-star text-primary " />
                      <span className="ml-2">{`${averageStar} (${totalRatings} reviews)`}</span>
                    </h6>
                  </div>
                </div>
              </CardBody>
            </Card>
            {/* profile update modal starts */}
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
                  {/* <>
                    <Label for="jobtitle">
                      <h4>Job Title</h4>
                    </Label>
                    <Input
                      type="text"
                      id="jobtitle"
                      value={jobTitle}
                      onChange={(e) => setJobTitle(e.target.value)}
                    />
                    <br />
                  </> */}
                  {/* <>
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
                  </> */}

                  <>
                    <Label for="location" className="font-weight-medium">
                      <h4>Country</h4>
                    </Label>

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
                  {/* <>
                    <Label for="location" className="font-weight-medium">
                      <h4>category</h4>
                    </Label>

                    <Input
                      type="select"
                      name="category"
                      value={category}
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
                  </> */}
                </div>
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
            {/* profile update modal ends */}
          </Col>
        </Row>
        {/* profile section ends */}
        {/* about section starts */}
        <Row className="my-4">
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
                {/* about modal starts */}
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

                    <div className="">
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
                      <Label
                        for="personalWebsite"
                        className="font-weight-medium"
                      >
                        <h4>Personal Website URL</h4>
                      </Label>
                      <Input
                        type="url"
                        id="personalWebsite"
                        value={website}
                        onChange={(e) => setWebsite(e.target.value)}
                      />
                      <p className="text-muted">e.g. http://www.google.com</p>
                      <br />
                    </div>
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
                {/* about modal ends */}
              </CardBody>
            </Card>
          </Col>
        </Row>
        {/* about section ends */}
        {/* Experience section starts */}
        <Row className="my-4">
          <Col>
            <Card>
              <CardBody>
                <Row className="align-items-center">
                  <Col className="d-flex justify-content-between">
                    <h2 className="font-weight-bold">Experience</h2>

                    <Button
                      color="primary"
                      outline
                      className="icon-button"
                      size="sm"
                      onClick={() => setIsEditingExp(true)}
                      style={{ border: "none" }}
                    >
                      <i className="simple-icon-pencil" />
                    </Button>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    {experience?.map((value) => (
                      <p
                        className="text-one font-weight-medium "
                        key={value.id}
                      >
                        {value.jobtitle} <br /> {value.company} |{" "}
                        {value.startYear} - {value.endYear}
                      </p>
                    ))}
                  </Col>
                </Row>
                {/* Exp modal starts */}
                <Modal
                  isOpen={isEditingExp}
                  toggle={() => setIsEditingExp(!isEditingExp)}
                  className=""
                  size="lg"
                  style={{ borderRadius: "10px", overflow: "hidden" }}
                >
                  <ModalHeader>
                    <h2 className="font-weight-bold">Experience</h2>
                  </ModalHeader>
                  <ModalBody>
                    <div className="col-lg-12 col-12">
                      <Label for="experience" className=" text-dark">
                        <h4>Experience</h4>
                      </Label>
                      {experience.map((works, index) => (
                        <>
                          <Row>
                            <Col md={6}>
                              <FormGroup className="error-l-75">
                                <Label>Company Name*</Label>
                                <Input
                                  className="form-control"
                                  name="education company"
                                  value={works.company}
                                  onChange={(e) =>
                                    handleInputChange(
                                      index,
                                      "company",
                                      e.target.value
                                    )
                                  }
                                />
                              </FormGroup>
                            </Col>
                            <Col md={6}>
                              <FormGroup>
                                <Label for={`education[${index}].jobTitle`}>
                                  Job title*
                                </Label>
                                <Input
                                  name={`education[${index}].jobTitle`}
                                  id={`education[${index}].jobTitle`}
                                  className="form-control"
                                  value={works.jobTitle}
                                  onChange={(e) =>
                                    handleInputChange(
                                      index,
                                      "jobTitle",
                                      e.target.value
                                    )
                                  }
                                />
                              </FormGroup>
                            </Col>
                          </Row>
                          <Row>
                            <Col md={6}>
                              <FormGroup>
                                <Label
                                  for={`education[${index}].employmentType`}
                                >
                                  Employment type*
                                </Label>
                                <Input
                                  type="select"
                                  name={`education[${index}].employmentType`}
                                  id={`education[${index}].employmentType`}
                                  className="form-control"
                                  value={works.employmentType}
                                  onChange={(e) =>
                                    handleInputChange(
                                      index,
                                      "employmentType",
                                      e.target.value
                                    )
                                  }
                                >
                                  <option key="" value="" disabled>
                                    Select Employment type
                                  </option>
                                  {EmploymentTypeData.map((option) => (
                                    <option key={option} value={option.label}>
                                      {option.label}
                                    </option>
                                  ))}
                                </Input>
                              </FormGroup>
                            </Col>

                            <Col md={6}>
                              <FormGroup>
                                <Label for={`education[${index}].jobLocation`}>
                                  Job location*
                                </Label>
                                <Input
                                  type="text"
                                  name={`education[${index}].jobLocation`}
                                  id={`education[${index}].jobLocation`}
                                  className="form-control"
                                  value={works.jobLocation}
                                  onChange={(e) =>
                                    handleInputChange(
                                      index,
                                      "jobLocation",
                                      e.target.value
                                    )
                                  }
                                />
                              </FormGroup>
                            </Col>
                          </Row>
                          <Row>
                            <Col>
                              <FormGroup>
                                <Label for={`education[${index}].startYear`}>
                                  Start year
                                </Label>
                                <Input
                                  type="select"
                                  name={`education[${index}].startYear`}
                                  id={`education[${index}].startYear`}
                                  className="form-control"
                                  value={works.startYear}
                                  // onChange={(e) =>
                                  //   handleInputChange(
                                  //     index,
                                  //     "startYear",
                                  //     e.target.value
                                  //   )
                                  // }
                                  onChange={(e) =>
                                    handleInputChange(
                                      index,
                                      "startYear",
                                      parseInt(e.target.value, 10)
                                    )
                                  }
                                >
                                  <option disabled value="">
                                    Select year
                                  </option>
                                  {years.map((yr) => (
                                    <option key={yr} value={yr}>
                                      {yr}
                                    </option>
                                  ))}
                                </Input>
                              </FormGroup>
                            </Col>
                            <Col>
                              <FormGroup>
                                <Label for={`education[${index}].endYear`}>
                                  End year
                                </Label>
                                <Input
                                  type="select"
                                  name={`education[${index}].endYear`}
                                  id={`education[${index}].endYear`}
                                  className="form-control"
                                  value={works.endYear}
                                  // onChange={(e) =>
                                  //   handleInputChange(
                                  //     index,
                                  //     "endYear",
                                  //     e.target.value
                                  //   )
                                  // }
                                  onChange={(e) =>
                                    handleInputChange(
                                      index,
                                      "endYear",
                                      parseInt(e.target.value, 10)
                                    )
                                  }
                                >
                                  <option disabled value="">
                                    Select year
                                  </option>
                                  {years.map((yr) => (
                                    <option key={yr} value={yr}>
                                      {yr === currentYear ? "Present" : yr}
                                    </option>
                                  ))}
                                </Input>
                              </FormGroup>
                            </Col>
                            {/* <Row>
                              <Col>
                                <FormGroup className="error-l-75">
                                  <Label>Price</Label>
                                  <Input
                                    className="form-control"
                                    name={`education[${index}].company`}
                                    value={works.price}
                                    onChange={(e) =>
                                      handleInputChange(
                                        index,
                                        "price",
                                        e.target.value
                                      )
                                    }
                                    type="number"
                                  />
                                </FormGroup>
                              </Col>
                            </Row> */}
                          </Row>
                        </>
                      ))}
                    </div>
                  </ModalBody>
                  <ModalFooter>
                    <>
                      <Button
                        color="primary"
                        onClick={handleSaveExp}
                        className="mr-2"
                      >
                        Save
                      </Button>
                      <Button
                        color="primary"
                        outline
                        onClick={handleCancelEditExp}
                        className="ml-2"
                      >
                        Cancel
                      </Button>
                    </>
                  </ModalFooter>
                </Modal>
                {/* Exp modal ends */}
              </CardBody>
            </Card>
          </Col>
        </Row>
        {/* Experience section ends */}
        {/* Eduction section starts */}
        <Row className="my-4">
          <Col>
            <Card>
              <CardBody>
                <Row className="align-items-center">
                  <Col className="d-flex justify-content-between">
                    <h2 className="font-weight-bold">Education</h2>

                    <Button
                      color="primary"
                      outline
                      className="icon-button"
                      size="sm"
                      onClick={() => setIsEditingEducation(true)}
                      style={{ border: "none" }}
                    >
                      <i className="simple-icon-pencil" />
                    </Button>
                  </Col>
                </Row>
                <Row>
                  {college.map((colleges) => (
                    <Col key={colleges}>
                      {" "}
                      {/* Use index as a key, but consider using a unique identifier if available */}
                      <h3 className="font-weight-semibold">
                        {colleges.degree}
                      </h3>
                      <h3 className="text-muted">
                        {colleges.collegeName} | {colleges.year}
                      </h3>
                    </Col>
                  ))}
                </Row>

                {/* Education modal starts */}
                <Modal
                  isOpen={isEditingEducation}
                  toggle={() => setIsEditingEducation(!isEditingEducation)}
                  className=""
                  size="lg"
                  style={{ borderRadius: "10px", overflow: "hidden" }}
                >
                  <ModalHeader>
                    <h2 className="font-weight-bold">Education</h2>
                  </ModalHeader>
                  <ModalBody>
                    <div className="col-lg-12 col-12">
                      <Label for="experience" className=" text-dark">
                        <h4>Education</h4>
                      </Label>
                      {college.map((works, index) => (
                        <>
                          <Row>
                            <Col md={6}>
                              <FormGroup className="error-l-75">
                                <Label>College Name*</Label>
                                <Input
                                  className="form-control"
                                  name={`education[${index}].collegeName`}
                                  id={`education[${index}].collegeNaame`}
                                  value={works.collegeName}
                                  onChange={(e) =>
                                    handleInputEducationChange(
                                      index,
                                      "collegeName",
                                      e.target.value
                                    )
                                  }
                                />
                              </FormGroup>
                            </Col>
                            <Col md={6}>
                              <FormGroup>
                                <Label for={`education[${index}].degree`}>
                                  Degree*
                                </Label>
                                <Input
                                  name={`education[${index}].degree`}
                                  id={`education[${index}].degree`}
                                  className="form-control"
                                  value={works.degree}
                                  onChange={(e) =>
                                    handleInputEducationChange(
                                      index,
                                      "degree",
                                      e.target.value
                                    )
                                  }
                                />
                              </FormGroup>
                            </Col>
                          </Row>
                          <Row>
                            <Col md={6}>
                              <FormGroup>
                                <Label for={`education[${index}].year`}>
                                  Year*
                                </Label>
                                <Input
                                  name={`education[${index}].year`}
                                  id={`education[${index}].year`}
                                  className="form-control"
                                  value={works.year}
                                  onChange={(e) =>
                                    handleInputEducationChange(
                                      index,
                                      "year",
                                      e.target.value
                                    )
                                  }
                                />
                              </FormGroup>
                            </Col>
                          </Row>
                        </>
                      ))}
                    </div>
                  </ModalBody>
                  <ModalFooter>
                    <>
                      <Button
                        color="primary"
                        onClick={handleSaveEducation}
                        className="mr-2"
                      >
                        Save
                      </Button>
                      <Button
                        color="primary"
                        outline
                        onClick={handleCancelEditEducation}
                        className="ml-2"
                      >
                        Cancel
                      </Button>
                    </>
                  </ModalFooter>
                </Modal>
                {/* Education modal ends */}
              </CardBody>
            </Card>
          </Col>
        </Row>
        {/* Eduction section ends */}
        {/* language section starts */}{" "}
        <Row className="my-4">
          <Col>
            <Card>
              <CardBody>
                <Row>
                  <Col className="d-flex justify-content-between">
                    <h2 className="font-weight-bold">Languages known</h2>
                    <Button
                      color="primary"
                      outline
                      className="icon-button"
                      size="sm"
                      onClick={() => setIsEditingLanguages(true)}
                      style={{ border: "none" }}
                    >
                      <i className="simple-icon-pencil" />
                    </Button>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <ul
                      className="text-one text-muted font-weight-bold d-flex flex-wrap p-0 mr-3 text-start"
                      style={{
                        gap: "30px",
                        listStyle: "none",
                        paddingLeft: 0,
                      }}
                    >
                      {languages.map((lang, index) => (
                        <li
                          // eslint-disable-next-line react/no-array-index-key
                          key={index}
                          style={{
                            position: "relative",
                            paddingLeft: "20px",
                          }}
                        >
                          <span
                            style={{
                              content: '""',
                              position: "absolute",
                              left: 0,
                              top: "50%",
                              transform: "translateY(-50%) rotate(45deg)",
                              width: "7px",
                              height: "7px",
                              backgroundColor: "currentColor",
                            }}
                          />
                          {language.find((l) => l.iso_code === lang)?.name}{" "}
                        </li>
                      ))}
                    </ul>
                  </Col>
                </Row>
                <Modal
                  isOpen={isEditingLanguages}
                  toggle={() => setIsEditingLanguages(!isEditingLanguages)}
                  className=""
                  size="lg"
                  style={{ borderRadius: "10px", overflow: "hidden" }}
                >
                  <ModalHeader>
                    <h2 className="font-weight-bold">Languages</h2>
                  </ModalHeader>
                  <ModalBody>
                    <h5>Languages</h5>
                    <>
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
                      {languages.map((lang, index) => (
                        <Button
                          // eslint-disable-next-line react/no-array-index-key
                          key={index}
                          outline
                          color="primary"
                          className="mt-2 font-weight-semibold mx-2"
                          size="sm"
                          onClick={() => handleRemoveLanguages(index)}
                        >
                          {language.find((l) => l.iso_code === lang)?.name}{" "}
                          <i className="iconsminds-close" />
                        </Button>
                      ))}
                    </>
                  </ModalBody>
                  <ModalFooter>
                    <Button
                      color="primary"
                      onClick={handleLanguagesSave}
                      className="mr-2"
                    >
                      Save
                    </Button>
                    <Button
                      color="primary"
                      outline
                      onClick={handleLanguagesCancel}
                      className="ml-2"
                    >
                      Cancel
                    </Button>
                  </ModalFooter>
                </Modal>
              </CardBody>
            </Card>
          </Col>
        </Row>
        {/* language section ends */}
        {/* skill section starts */}
        <Row className="my-4">
          <Col>
            <Card>
              <CardBody>
                <Row>
                  <Col className="d-flex justify-content-between">
                    <h2 className="font-weight-bold">Skills</h2>
                    <Button
                      color="primary"
                      outline
                      className="icon-button"
                      size="sm"
                      onClick={() => setIsEditingSkills(true)}
                      style={{ border: "none" }}
                    >
                      <i className="simple-icon-pencil" />
                    </Button>
                  </Col>
                </Row>

                <div
                  className="d-flex flex-wrap"
                  style={{ gap: "10px", marginTop: "10px" }}
                >
                  {skills.map((newTopics, index) => (
                    <Button
                      // eslint-disable-next-line react/no-array-index-key
                      key={index}
                      color={index < 3 ? "primary" : "light"}
                      className="mb-2 font-weight-semibold mr-2"
                      size="sm"
                    >
                      {newTopics}
                    </Button>
                  ))}
                </div>
              </CardBody>
            </Card>
          </Col>
          <Modal
            isOpen={isEditingSkills}
            s
            toggle={() => setIsEditingSkills(!isEditingSkills)}
            className=""
            size="lg"
            style={{ borderRadius: "10px", overflow: "hidden" }}
          >
            <ModalHeader>
              <h2 className="font-weight-bold">Skills</h2>
            </ModalHeader>
            <ModalBody>
              <div className="mt-4">
                <h5>Skills</h5>

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
                <Row className="">
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
                        color={index < 3 ? "primary" : "light"}
                        className=" mb-2 font-weight-semibold ml-2 mx-2 d-flex align-items-center"
                        size="sm"
                        onClick={() => handleRemoveSkill(index)}
                      >
                        {skill} <i className="iconsminds-close ml-1" />
                      </Button>
                    ))}
                  </ReactSortable>
                </Row>

                <p className="text-muted ml-2">
                  Drag topic to set top 3 (the top 3 topics will be displayed on
                  alumni cards)
                </p>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button
                color="primary"
                onClick={handleSaveSkill}
                className="mr-2"
              >
                Save
              </Button>
              <Button
                color="primary"
                outline
                onClick={handleSkillCancel}
                className="ml-2"
              >
                Cancel
              </Button>
            </ModalFooter>
          </Modal>
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
        {/* new design code ends */}
      </Colxx>
    </div>
  );
};

export default AlumniMyProfile;
