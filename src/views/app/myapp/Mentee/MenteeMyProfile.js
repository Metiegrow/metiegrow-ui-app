import React, { useState, useEffect } from "react";
import {
  Button,
  // NavLink,
  Row,
  Input,
  Label,
  Col,
  // Form,
  Card,
  CardBody,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  FormGroup,
} from "reactstrap";
import axios from "axios";
import { baseUrl } from "constants/defaultValues";
import Select from "react-select";
import { ReactSortable } from "react-sortablejs";
import { Colxx } from "components/common/CustomBootstrap";
import ThumbnailLetters from "components/cards/ThumbnailLetters";
import country from "../my-login/Country";
import language from "../my-login/Languages";

const MyProfile = () => {
  // const [isEditing, setIsEditing] = useState(false);
  const [image, setImage] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [company, setCompany] = useState("Metaverse");
  const [location, setLocation] = useState("");
  const [lastName, setLastName] = useState("");
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [twitterHandle, setTwitterHandle] = useState("");
  const [personalWebsiteUrl, setPersonalWebsiteUrl] = useState("");
  // const [about, setAbout] = useState("");
  const [experience, setExperience] = useState([]);

  // const userId = localStorage.getItem("userId");
  const endUrl = "http://localhost:3001/userprofile";
  // const endUrl = `${baseUrl}/api/userProfile/myprofile`;

  const [loading, setLoading] = useState(true);
  const [profileData, setProfileData] = useState(false);
  const [modalEditProfile, setModalEditProfile] = useState(false);
  const [modalEditExperience, setModalEditExperience] = useState(false);
  const [modalEditSkills, setModalEditSkills] = useState(false);
  const [modalEditLanguage, setModalEditLanguage] = useState(false);
  const [modalEditEducation, setModalEditEducation] = useState(false);
  const [imageEditModal, setImageEditModal] = useState(false);
  const [modalAbout, setModalAbout] = useState(false);

  const [experienceEditOpen, setExperienceEditOpen] = useState(false);
  const [educationEditOpen, setEducationEditOpen] = useState(false);

  const [skills, setSkills] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [bio, setBio] = useState("")

const [currentEducation, setCurrentEducation] = useState(null);

const handleAddEducation = () => {
  setCurrentEducation({
    id: Date.now(), 
    college: '',
    degree: '',
    department: '',
    year: ''
  });
  setEducationEditOpen(true);
};

// const handleSaveEducation = () => {
//   setExperience(prevExperience => {
//     const updatedEducation = prevExperience.education 
//       ? prevExperience.education.map(edu => 
//           edu.id === currentEducation.id ? currentEducation : edu
//         )
//       : [];

//     if (!updatedEducation.some(edu => edu.id === currentEducation.id)) {
//       updatedEducation.push(currentEducation);
//     }

//     return {
//       ...prevExperience,
//       education: updatedEducation
//     };
//   });

//   setEducationEditOpen(false);
//   setCurrentEducation(null);
// };

const handleSaveEducation = async () => {
  try {
    setExperience(prevExperience => {
      const updatedEducation = prevExperience.education 
        ? prevExperience.education.map(edu => 
            edu.id === currentEducation.id ? currentEducation : edu
          )
        : [];

      if (!updatedEducation.some(edu => edu.id === currentEducation.id)) {
        updatedEducation.push(currentEducation);
      }

      const updatedExperience = {
        // ...prevExperience,
        education: updatedEducation,
        firstName,
        lastName,
        jobTitle,
        location,
        linkedinUrl,
        twitterHandle,
        experience,
        skills,
      };

      axios.put('http://localhost:3001/userprofileupdate', {
        // ...prevExperience,
        experience: updatedExperience
      })
      .then(response => {
        console.log('Profile updated successfully:', response.data);
      })
      .catch(error => {
        console.error('Error updating profile:', error);
      });

      return updatedExperience;
    });

    setEducationEditOpen(false);
    setCurrentEducation(null);
  } catch (error) {
    console.error('Error in handleSaveEducation:', error);
  }
};

const handleEditEducation = (education) => {
  setCurrentEducation({...education});
  setEducationEditOpen(true);
};

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

  useEffect(() => {
    const mentorProfileDetails = async () => {
      try {
        const response = await axios.get(endUrl);
        const userData = response.data;
        if (userData) {
          setImage(userData.userPhotoUrl);
          // setFirstName(userData.firstName);
          // setLastName(userData.lastName);
          setJobTitle(userData.jobTitle);
          setLocation(userData.location);
          setExperience(userData.experience);
          setLinkedinUrl(userData.linkedInUrl);
          setLanguages(userData.languages);
          setTwitterHandle(userData.twitterHandle);
          setPersonalWebsiteUrl(userData.personalWebsite);
          setSkills(userData.skills);
          setBio(userData.bio);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(true);
        setTimeout(() => {
          setLoading(false);
        }, 4000);
        setProfileData(true);
      }
    };

    mentorProfileDetails();
  }, []);

  const token = localStorage.getItem("tokenRes");
  // console.log(token);

  const updateMEntorProfile = async () => {
    try {
      const updatedData = {
        firstName,
        lastName,
        jobTitle,
        location,
        linkedinUrl,
        twitterHandle,
        experience,
        skills,
      };

      await axios.put(endUrl, updatedData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.error("Error updating profile", error);
    }
  };

  // const handleEditClick = () => {
  //   setIsEditing(true);
  // };

  // const handleSave = () => {
  //   setIsEditing(false);
  //   updateMEntorProfile();
  // };

  // const handleCancel = () => {
  //   setIsEditing(false);
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

  // const [file, setFile] = useState(null);

  // const handleFileChange = (event) => {
  //   setFile(event.target.files[0]);
  // };

  // const countryName = country.find((c) => c.iso_code === location)?.name;
  const userName = localStorage.getItem("userName");

  // const handleEditEducation = () => {
  //   setEducationEditOpen(true);
  // };
  const handleEditExperience = () => {
    setExperienceEditOpen(true);
  };

  const handleImageClick = () => setImageEditModal(true);
  const handleEditProfileSave = () => {
    setModalEditProfile(false);
    updateMEntorProfile();
  };

  return (
    <div className="d-flex justify-content-center align-items-center">
      {/* <div className=""> */}

      <Colxx sm="12" md="10" lg="10" xxs="12" className="">
        <div className="">
          {/* <Card
            style={{ height: "160px", width: "100%", overflow: "hidden" }}
            className="bg-primary"
          >
            <div
              className="d-flex align-items-center justify-content-between"
              style={{ height: "100%" }}
            >
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
                    style={{ width: "110px", height: "110px", objectFit: "cover", cursor: "pointer" }}
                    alt="img"
                  />
                )}
                <div className="ml-4 mt-2">
                  <h1 className="font-weight-semibold text-large">
                    {firstName} {lastName}
                    {userName}
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
              </div>
            </div>
          </Card> */}
          {loading ? (
            <div className="loading" />
          ) : (
            <>
              {profileData ? (
                <div className="text-center mt-4">
                  <i className="simple-icon-exclamation display-4" />
                  <h4 className="mt-4">
                    Failed to fetch profile data from server{" "}
                  </h4>
                </div>
              ) : (
                <>
                  {/* {isEditing && (
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
                  )} */}
                  {/* <Row>
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
                                    onChange={(e) =>
                                      setFirstName(e.target.value)
                                    }
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
                                    onChange={(e) =>
                                      setLastName(e.target.value)
                                    }
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
                                onChange={(e) => setJobTitle(e.target.value)}
                              />
                              <br />
                            </>

                            <>
                              <Label
                                for="location"
                                className="font-weight-medium"
                              >
                                <h4>Location</h4>
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
                                  <option
                                    key={option.iso_code}
                                    value={option.iso_code}
                                  >
                                    {option.name}
                                  </option>
                                ))}
                              </Input>
                              <br />
                            </>
                            <>
                              <Label for="email" className="font-weight-medium">
                                <h4>LinkedIn</h4>
                              </Label>
                              <Input
                                type="text"
                                id="linkedinUrl"
                                value={linkedinUrl}
                                onChange={(e) => setLinkedinUrl(e.target.value)}
                              />
                              <br />
                            </>
                            <>
                              <Label for="email" className="font-weight-medium">
                                <h4>Twitter</h4>
                              </Label>
                              <Input
                                type="text"
                                id="twitterHandle"
                                value={twitterHandle}
                                onChange={(e) =>
                                  setTwitterHandle(e.target.value)
                                }
                              />
                              <p className="text-muted">
                                Omit the &ldquo;@&rdquo; -e.g.
                                &ldquo;dqmonn&rdquo;
                              </p>
                              <br />
                            </>
                          </div>
                        ) : (
                          <div className="ml-3">
                            <h3 className="font-weight-semibold">
                              <i className="simple-icon-briefcase text-primary" />
                              <span className="ml-2">{jobTitle}</span>
                            </h3>
                            <h5 className="font-weight-medium">
                              <i className="simple-icon-location-pin text-primary" />
                              <span className="ml-2 font-weight-medium">{countryName}</span>
                            </h5>
                          </div>
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
                  </Row> */}
                  <Row>
                    <Col>
                      <Card>
                        <CardBody
                          style={{
                            background:
                              "linear-gradient(to right, #7B42C5, #AA5D93)",
                            color: "white",
                            borderRadius: "9px 9px 0 0",
                          }}
                        >
                          <div
                            className="text-end w-100  
                         m-0 d-flex justify-content-end "
                          >
                            <Button
                              color="light"
                              className="icon-button"
                              size="sm"
                            >
                              <i className="simple-icon-pencil text-primary font-weight-bold" />
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
                              onClick={() => handleImageClick()}
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
                                  // src="/assets/img/profiles/2.jpg"
                                  src={`${baseUrl}/${image}`}
                                  className="rounded-circle img-thumbnail border border-3"
                                  style={{
                                    width: "130px",
                                    height: "130px",
                                    objectFit: "cover",
                                  }}
                                  alt="Profile"
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
                                <h2 className="font-weight-bold">
                                  Profile photo
                                </h2>
                              </ModalHeader>
                              <ModalBody className="d-flex justify-content-center align-items-center">
                                <img
                                  // src="/assets/img/profiles/2.jpg"
                                  src={`${baseUrl}/${image}`}
                                  className="rounded-circle img-thumbnail border border-3"
                                  style={{
                                    width: "130px",
                                    height: "130px",
                                    objectFit: "cover",
                                  }}
                                  alt="img"
                                />
                              </ModalBody>

                              <ModalFooter
                                // style={{ borderTop: 'none' }}
                                className="d-flex align-items-center justify-content-center"
                              >
                                <Button
                                  outline
                                  color="primary"
                                  onClick={() => setModalAbout(false)}
                                  className="icon-button"
                                  style={{ border: "none" }}
                                >
                                  <i className="simple-icon-pencil" />
                                </Button>{" "}
                                <Button
                                  color="primary"
                                  outline
                                  onClick={() => setModalAbout(false)}
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
                          <div className="text-end w-100  d-flex justify-content-end">
                            <Button
                              color="primary"
                              outline
                              className="icon-button"
                              style={{ border: "none" }}
                              size="sm"
                              onClick={() => setModalEditProfile(true)}
                            >
                              <i className="simple-icon-pencil" />
                            </Button>
                          </div>
                          <div className="mt-4">
                            <h2 className="font-weight-bold">{userName}</h2>
                            <h3 className="text-one">
                              {experience.work[0].jobTitle} |{" "}
                              {experience.work[0].company}
                            </h3>
                            <div>
                              <h6 className="text-muted">Location</h6>
                              <h6>{experience.work[0].jobLocation}</h6>
                            </div>
                          </div>
                        </CardBody>
                        <Modal
                          isOpen={modalEditProfile}
                          toggle={() => setModalEditProfile(!modalEditProfile)}
                          className=""
                          size="lg"
                          style={{ borderRadius: "10px", overflow: "hidden" }}
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
                                  className="font-weight-bold text-one"
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
                                  className="font-weight-bold text-one"
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
                                className="font-weight-bold text-one"
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
                                className="font-weight-bold text-one"
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
                                className="form-control font-weight-bold text-one"
                              >
                                <option disabled value="">
                                  Select Location
                                </option>
                                {country.map((option) => (
                                  <option
                                    key={option.iso_code}
                                    value={option.iso_code}
                                  >
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
                            <Button
                              color="primary"
                              onClick={() => handleEditProfileSave()}
                            >
                              Save
                            </Button>{" "}
                            <Button
                              color="primary"
                              outline
                              onClick={() => setModalEditProfile(false)}
                              className=""
                            >
                              Cancel
                            </Button>
                          </ModalFooter>
                        </Modal>
                      </Card>
                    </Col>
                  </Row>
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
                                onClick={() => setModalAbout(true)}
                                style={{ border: "none" }}
                              >
                                <i className="simple-icon-pencil" />
                              </Button>
                            </Col>
                          </Row>
                          <div>
                            <p className="text-muted">
                              {bio}
                              {/* Lorem ipsum dolor sit amet consectetur adipisicing */}
                              {/* elit. Sequi, at? */}
                            </p>
                          </div>
                        </CardBody>
                        <Modal
                          isOpen={modalAbout}
                          toggle={() => setModalAbout(!modalAbout)}
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
                                className="font-weight-bold text-one"
                              />
                              <br />
                            </>

                            <>
                              <Label for="linkedinUrl" className="text-muted">
                                <h4>LinkedIn</h4>
                              </Label>
                              <Input
                                type="text"
                                id="linkedinUrl"
                                value={linkedinUrl}
                                onChange={(e) => setLinkedinUrl(e.target.value)}
                                className="font-weight-bold text-one"
                              />
                              <br />
                            </>
                            <>
                              <Label for="email" className="text-muted">
                                <h4>Twitter</h4>
                              </Label>
                              <Input
                                type="text"
                                id="twitterHandle"
                                value={twitterHandle}
                                onChange={(e) =>
                                  setTwitterHandle(e.target.value)
                                }
                                className="font-weight-bold text-one"
                              />
                              <p className="text-muted mt-1">
                                Omit the &ldquo;@&rdquo; -e.g.
                                &ldquo;dqmonn&rdquo;
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
                                value={personalWebsiteUrl}
                                onChange={(e) =>
                                  setPersonalWebsiteUrl(e.target.value)
                                }
                                className="font-weight-bold text-one"
                              />
                              <br />
                            </>
                          </ModalBody>
                          <ModalFooter
                            style={{ borderTop: "none" }}
                            className="d-flex align-items-center justify-content-center"
                          >
                            <Button
                              color="primary"
                              onClick={() => setModalAbout(false)}
                            >
                              Save
                            </Button>{" "}
                            <Button
                              color="primary"
                              outline
                              onClick={() => setModalAbout(false)}
                              className=""
                            >
                              Cancel
                            </Button>
                          </ModalFooter>
                        </Modal>
                      </Card>
                    </Col>
                  </Row>
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
                                style={{ border: "none" }}
                                size="sm"
                                onClick={() => setModalEditExperience(true)}
                              >
                                <i className="simple-icon-pencil" />
                              </Button>
                            </Col>
                          </Row>
                          {experience.work.map((w, index) => (
                            // eslint-disable-next-line react/no-array-index-key
                            <div key={index}>
                              <h6>{w.jobTitle}</h6>
                              <h6 className="text-muted">
                                {w.company} | {w.startDate} - {w.endDate} - 1
                                month
                              </h6>
                            </div>
                          ))}
                          {/* <div>
                        <h6>Web Developer(internship)</h6>
                        <h6 className="text-muted">Metaverse | 15th Jun - present - 1 month</h6>
                        </div> */}
                        </CardBody>
                        <Modal
                          isOpen={modalEditExperience}
                          toggle={() =>
                            setModalEditExperience(!modalEditExperience)
                          }
                          className=""
                          size="lg"
                          style={{ borderRadius: "10px", overflow: "hidden" }}
                        >
                          {/* <ModalHeader style={{ borderBottom: 'none' }}>
                    <h2 className="font-weight-bold">Experience</h2>
                  </ModalHeader> */}
                          <ModalBody>
                            <Row className="align-items-center mb-3 ">
                              <Col>
                                <h2 className="font-weight-bold">
                                  Edit Experience
                                </h2>
                              </Col>
                              <Col xs="auto" className="ml-auto">
                                <Button
                                  color="primary"
                                  outline
                                  className="icon-button"
                                  style={{ border: "none" }}
                                  size="sm"
                                  onClick={() => handleEditExperience()}
                                >
                                  <span
                                    className="text-primary"
                                    style={{ fontSize: "24px" }}
                                  >
                                    +
                                  </span>
                                </Button>
                              </Col>
                            </Row>
                            {/* <p>No education added</p> */}
                            {experienceEditOpen ? (
                              <>
                                <FormGroup className="error-l-125">
                                  <Label for="twitterHandle">Job Title</Label>
                                  <Input
                                    type="text"
                                    name="jobTitle"
                                    id="jobTitle"
                                    // className="form-control"
                                  />
                                </FormGroup>
                                <FormGroup className="error-l-125">
                                  <Label for="twitterHandle">
                                    Employment type
                                  </Label>
                                  <Input
                                    type="text"
                                    name="employmentType"
                                    id="employmentType"
                                    // className="form-control"
                                  />
                                </FormGroup>
                                <FormGroup className="error-l-125">
                                  <Label for="twitterHandle">
                                    Company name
                                  </Label>
                                  <Input
                                    type="text"
                                    name="companyName"
                                    id="companyName"
                                    // className="form-control"
                                  />
                                </FormGroup>
                                <FormGroup>
                                  <Label
                                    for="location"
                                    className="font-weight-medium"
                                  >
                                    Location
                                  </Label>
                                  <Input
                                    type="select"
                                    name="location"
                                    value={location}
                                    // validate={validateLocation}
                                    onChange={(e) =>
                                      setLocation(e.target.value)
                                    }
                                    className="form-control"
                                  >
                                    <option disabled value="">
                                      Select Location
                                    </option>
                                    {country.map((option) => (
                                      <option
                                        key={option.iso_code}
                                        value={option.iso_code}
                                      >
                                        {option.name}
                                      </option>
                                    ))}
                                  </Input>
                                </FormGroup>

                                <ModalFooter
                                  style={{ borderTop: "none" }}
                                  className="d-flex align-items-center justify-content-center"
                                >
                                  <Button
                                    color="primary"
                                    onClick={() => setExperienceEditOpen(false)}
                                  >
                                    Save
                                  </Button>{" "}
                                  <Button
                                    color="primary"
                                    outline
                                    onClick={() => setExperienceEditOpen(false)}
                                    className=""
                                  >
                                    Cancel
                                  </Button>
                                </ModalFooter>
                              </>
                            ) : (
                              <>
                                {experience.work.map((w, index) => (
                                  // eslint-disable-next-line react/no-array-index-key
                                  <Row key={index}>
                                    <Col>
                                      {/* <h2>Dev Ops</h2>
                      <h4>Web Development</h4> */}
                                      {/* eslint-disable-next-line react/no-array-index-key */}
                                      <div key={index}>
                                        <h6>{w.jobTitle}</h6>
                                        <h6 className="text-muted">
                                          {w.company} | {w.startDate}-{" "}
                                          {w.endDate} - 1 month
                                        </h6>
                                      </div>
                                    </Col>
                                    <Col className="d-flex justify-content-end align-items-center">
                                      <Button
                                        color="primary"
                                        outline
                                        className="icon-button"
                                        style={{ border: "none" }}
                                        size="sm"
                                        onClick={() => handleEditExperience()}
                                      >
                                        <i className="simple-icon-pencil" />
                                      </Button>
                                    </Col>
                                  </Row>
                                ))}
                              </>
                            )}
                          </ModalBody>
                        </Modal>
                      </Card>
                    </Col>
                  </Row>
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
                                onClick={() => setModalEditSkills(true)}
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
                                    color="primary"
                                    outline
                                    size="sm"
                                  >
                                    {skill}
                                  </Button>
                                ))}
                                <Button color="primary" outline size="sm">
                                  CSS
                                </Button>
                              </div>
                            </Col>
                          </Row>
                        </CardBody>

                        <Modal
                          isOpen={modalEditSkills}
                          toggle={() => setModalEditSkills(!modalEditSkills)}
                          className=""
                          size="lg"
                          style={{ borderRadius: "10px", overflow: "hidden" }}
                        >
                          <ModalHeader style={{ borderBottom: "none" }}>
                            <h2 className="font-weight-bold">Skills</h2>
                          </ModalHeader>
                          <ModalBody>
                            <Row className="w-100 mb-3">
                              <Col md={10}>
                                <Input placeholder="Add skills" />
                              </Col>
                              <Col md={2}>
                                <Button color="primary" className="w-100">
                                  Add skill
                                </Button>
                              </Col>
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
                                    color="primary"
                                    // color={index < 3 ? 'primary' : 'light'}
                                    className="ml-2 font-weight-semibold mx-2 d-flex align-items-center"
                                    size="sm"
                                    // onClick={() => handleRemoveSkill(index)}
                                  >
                                    {skill}
                                    <i className="iconsminds-close ml-2" />
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
                            <Button
                              color="primary"
                              onClick={() => setModalEditSkills(false)}
                            >
                              Save
                            </Button>{" "}
                            <Button
                              color="primary"
                              outline
                              onClick={() => setModalEditSkills(false)}
                              className=""
                            >
                              Cancel
                            </Button>
                          </ModalFooter>
                        </Modal>
                      </Card>
                    </Col>
                  </Row>
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
                                style={{ border: "none" }}
                                size="sm"
                                onClick={() => setModalEditEducation(true)}
                              >
                                <i className="simple-icon-pencil" />
                              </Button>
                            </Col>
                          </Row>
                          {experience.education && experience.education.map((e, index) => (
                            // eslint-disable-next-line react/no-array-index-key
                            <div key={index}>
                              <div className="my-3">
                                <h6>{e.college}</h6>
                                <h6 className="text-muted">
                                  {e.degree} | {e.department} | {e.year}
                                </h6>
                              </div>
                              {/* <div className="my-3">
                          <h6>MRS College</h6>
                          <h6 className="text-muted">B.sc Computer Application | 2022-2023</h6>
                        </div>
                        <div className="my-3">
                          <h6>HHS School</h6>
                          <h6 className="text-muted">Higher Secondary | 2016-2018</h6>
                        </div> */}
                            </div>
                          ))}
                        </CardBody>
                        <Modal
                          isOpen={modalEditEducation}
                          toggle={() =>
                            setModalEditEducation(!modalEditEducation)
                          }
                          className=""
                          size="lg"
                          style={{ borderRadius: "10px", overflow: "hidden" }}
                        >
                          {/* <ModalHeader className="" style={{ borderBottom: 'none' }}> */}

                          {/* </ModalHeader> */}

                          <ModalBody>
                            <Row className="align-items-center mb-3 ">
                              <Col>
                                <h2 className="font-weight-bold">Education</h2>
                              </Col>
                              <Col xs="auto" className="ml-auto">
                                <Button
                                  color="primary"
                                  outline
                                  className="icon-button"
                                  style={{ border: "none" }}
                                  size="sm"
                                  onClick={handleAddEducation}
                                >
                                  <span
                                    className="text-primary"
                                    style={{ fontSize: "24px" }}
                                  >
                                    +
                                  </span>
                                </Button>
                              </Col>
                            </Row>
                            {/* <p>No education added</p> */}
                            {educationEditOpen ? (
                              <>
                                <FormGroup className="error-l-125">
                                  <Label for="twitterHandle">School</Label>
                                  <Input
                                    type="text"
                                    name="school"
                                    id="school"
                                    value={currentEducation ? currentEducation.college : ''}
                                    onChange={(e) => setCurrentEducation({...currentEducation, college: e.target.value})}
                                    // className="form-control"
                                  />
                                </FormGroup>
                                <FormGroup className="error-l-125">
                                  <Label for="twitterHandle">Degree</Label>
                                  <Input
                                    type="text"
                                    name="degree"
                                    id="degree"
                                    // className="form-control"
                                    value={currentEducation ? currentEducation.degree : ''}
                                    onChange={(e) => setCurrentEducation({...currentEducation, degree: e.target.value})}
                                  />
                                </FormGroup>
                                <FormGroup className="error-l-125">
                                  <Label for="twitterHandle">Field study</Label>
                                  <Input
                                    type="text"
                                    name="fieldStudy"
                                    id="fieldStudy"
                                    // className="form-control"
                                    value={currentEducation ? currentEducation.department : ''}
                                    onChange={(e) => setCurrentEducation({...currentEducation, department: e.target.value})}
                                  />
                                </FormGroup>
                                <FormGroup className="error-l-125">
                                  <Label for="year">Year</Label> 
                                  <Input
                                    type="text"
                                    name="year"
                                    id="year"
                                    value={currentEducation ? currentEducation.year : ''}
                                    onChange={(e) => setCurrentEducation({...currentEducation, year: e.target.value})}
                                  />
                                </FormGroup>

                                <ModalFooter
                                  style={{ borderTop: "none" }}
                                  className="d-flex align-items-center justify-content-center"
                                >
                                  <Button
                                    color="primary"
                                    onClick={handleSaveEducation}
                                  >
                                    Save
                                  </Button>{" "}
                                  <Button
                                    color="primary"
                                    outline
                                    onClick={() => setEducationEditOpen(false)}
                                    className=""
                                  >
                                    Cancel
                                  </Button>
                                </ModalFooter>
                              </>
                            ) : (
                              <>
                                {experience.education.map((e, index) => (
                                  // eslint-disable-next-line react/no-array-index-key
                                  <Row key={index}>
                                    <Col>
                                      <div className="my-3">
                                        <h6>{e.college}</h6>
                                        <h6 className="text-muted">
                                          {e.degree} | {e.department} | {e.year}
                                        </h6>
                                      </div>
                                    </Col>
                                    <Col className="d-flex justify-content-end align-items-center">
                                      <Button
                                        color="primary"
                                        outline
                                        className="icon-button"
                                        style={{ border: "none" }}
                                        size="sm"
                                        onClick={() => handleEditEducation(e)}
                                      >
                                        <i className="simple-icon-pencil" />
                                      </Button>
                                    </Col>
                                  </Row>
                                ))}
                              </>
                            )}
                          </ModalBody>
                        </Modal>
                      </Card>
                    </Col>
                  </Row>
                  <Row className="my-4">
                    <Col>
                      <Card>
                        <CardBody>
                          <Row className="align-items-center">
                            <Col className="d-flex justify-content-between">
                              <h2 className="font-weight-bold">Languages</h2>
                              <Button
                                color="primary"
                                outline
                                className="icon-button"
                                style={{ border: "none" }}
                                size="sm"
                                onClick={() => setModalEditLanguage(true)}
                              >
                                <i className="simple-icon-pencil" />
                              </Button>
                            </Col>
                          </Row>
                          <div className="">
                            <div className="">
                              {/* <ul className="text-one text-muted font-weight-bold d-flex flex-wrap p-0 mx-3 text-start" 
                            style={{gap:"30px"}}>
                            {languages.map((lang,index) => (
                                // eslint-disable-next-line react/no-array-index-key
                              <li key={index} className="">
                              {language.find((l) => l.iso_code === lang)?.name}{" "}
                              </li>
                          ))}
                            </ul> */}
                              <ul
                                className="text-one text-muted font-weight-bold d-flex flex-wrap p-0 mx-3 text-start"
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
                                        transform:
                                          "translateY(-50%) rotate(45deg)",
                                        width: "7px",
                                        height: "7px",
                                        backgroundColor: "currentColor",
                                      }}
                                    />
                                    {
                                      language.find((l) => l.iso_code === lang)
                                        ?.name
                                    }{" "}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </CardBody>
                        <Modal
                          isOpen={modalEditLanguage}
                          toggle={() =>
                            setModalEditLanguage(!modalEditLanguage)
                          }
                          className=""
                          size="lg"
                          style={{ borderRadius: "10px", overflow: "hidden" }}
                        >
                          <ModalHeader style={{ borderBottom: "none" }}>
                            <h2 className="font-weight-bold">Languages</h2>
                          </ModalHeader>
                          <ModalBody>
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
                                  {
                                    language.find((l) => l.iso_code === lang)
                                      ?.name
                                  }{" "}
                                  <i className="iconsminds-close" />
                                </Button>
                              ))}
                            </>
                          </ModalBody>
                          <ModalFooter
                            style={{ borderTop: "none" }}
                            className="d-flex align-items-center justify-content-center"
                          >
                            <Button
                              color="primary"
                              onClick={() => setModalEditLanguage(false)}
                            >
                              Save
                            </Button>{" "}
                            <Button
                              color="primary"
                              outline
                              onClick={() => setModalEditLanguage(false)}
                              className=""
                            >
                              Cancel
                            </Button>
                          </ModalFooter>
                        </Modal>
                      </Card>
                    </Col>
                  </Row>
                </>
              )}
            </>
          )}
        </div>
      </Colxx>
    </div>

    // </div>
  );
};

export default MyProfile;
