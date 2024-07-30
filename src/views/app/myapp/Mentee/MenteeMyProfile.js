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
  InputGroup,
  InputGroupAddon,
} from "reactstrap";
import axios from "axios";
import { baseUrl } from "constants/defaultValues";
import Select from "react-select";
import { ReactSortable } from "react-sortablejs";
import { Colxx } from "components/common/CustomBootstrap";
import ThumbnailLetters from "components/cards/ThumbnailLetters";
import country from "../my-login/Country";
import language from "../my-login/Languages";


const currentYear = new Date().getFullYear();
  const years = [];

  for (let year = currentYear; year >= 2005; year -= 1) {
    years.push(year);
  }


const MyProfile = () => {
  const [image, setImage] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("");
  const [lastName, setLastName] = useState("");
  const [linkedInUrl, setLinkedInUrl] = useState("");
  const [twitterHandle, setTwitterHandle] = useState("");
  const [personalWebsite, setPersonalWebsite] = useState("");
  const [education, setEducation] = useState([]);
  const [work, setWork] = useState([]);
  const [goal, setGoal] = useState("");
  const [certifications, setCertifications] = useState([]);
  const [seekingFor, setSeekingFor] = useState("");
  const [newInputSkill, setNewInputSkill] = useState("");
  const [skillValidationMessage,setSkillValidationMessage] = useState("");

// console.log("work",work)
  const endUrl = `${baseUrl}/api/userProfile/myprofile`;

  const [loading, setLoading] = useState(true);
  const [profileData, setProfileData] = useState(false);
  const [modalEditProfile, setModalEditProfile] = useState(false);
  const [modalEditExperience, setModalEditExperience] = useState(false);
  const [modalEditSkills, setModalEditSkills] = useState(false);
  const [modalEditLanguage, setModalEditLanguage] = useState(false);
  const [modalEditEducation, setModalEditEducation] = useState(false);
  const [imageEditModal, setImageEditModal] = useState(false);
  const [modalAbout, setModalAbout] = useState(false);
  const [profileUpdate, setProfileUpdate] = useState(false);
  // const [educationEdit, setEducationEdit] = useState(false);

  const [experienceEditOpen, setExperienceEditOpen] = useState(false);
  const [educationEditOpen, setEducationEditOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [selectedWorkIndex, setSelectedWorkIndex] = useState(null);

  const [skills, setSkills] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [bio, setBio] = useState("")
// console.log("index",selectedIndex);
// console.log("educationEdit",educationEdit);
// console.log("selectedWorkIndex",selectedWorkIndex);
// const [currentEducation, setCurrentEducation] = useState(null);
// const [currentWork, setCurrentWork] = useState(null);
const [newWork, setNewWork] = useState({});

    const [newEducation, setNewEducation] = useState({});

const token = localStorage.getItem("tokenRes");
// const newUpdatedWork = [...work, newWork]

// check ok 


const updateMentorProfile = async (updatedEducation = education, updatedWork = work) => {
  try {
    const updatedData = {
      firstName,
      lastName,
      linkedInUrl,
      twitterHandle,
      languages,
      personalWebsite,
      education: updatedEducation,
      work: updatedWork,
      skills,
      bio,
      certifications,
      goal,
      seekingFor
    };

    await axios.put(endUrl, updatedData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setProfileUpdate(!profileUpdate);

  } catch (error) {
    console.error("Error updating profile", error);
  }
};

// const handleSaveEducation = () => {
//   setEducation(prevEducation => {
//     const updatedEducation = [...prevEducation];
    
//     if (currentEducation.id) {
//       const index = updatedEducation.findIndex(edu => edu.id === currentEducation.id);
//       if (index !== -1) {
//         updatedEducation[index] = currentEducation;
//       }
//     } else {
//       updatedEducation.push(currentEducation);
//     }
    
//     return updatedEducation;
//   });

//   setEducationEditOpen(false);
//   setCurrentEducation(null);
//   updateMentorProfile(); 
// };

const handleEditEducation = (index) => {
  setNewEducation(education[index]);
  setSelectedIndex(index);
  // setCurrentEducation({...educationItem});
  setEducationEditOpen(true);
  // setEducationEdit(true);
};

const handleAddWork = () => {
  setNewWork({
    company: '',
    jobTitle: '',
    employmentType: '',
    jobLocation: '',
    startDate: 0,
    endDate: 0
  });
  setSelectedWorkIndex(null);
  setExperienceEditOpen(true);
};

const handleAddEducation = () => {
  // setCurrentEducation({
  //   college: '',
  //   degree: '',
  //   department: '',
  //   year: 0
  // });
  setEducationEditOpen(true);
};

// const handleAddWork = () => {
//   setCurrentWork({
//     company: '',
//     jobTitle: '',
//     employmentType: '',
//     jobLocation: '',
//     startDate: 0,
//     endDate: 0
//   });
//   setExperienceEditOpen(true);
// };

const handleSaveWork = () => {
  setWork(prevWork => {
    let updatedWork;
    if (selectedWorkIndex !== null) {
      updatedWork = prevWork.filter((_, index) => index !== selectedWorkIndex);
    } else {
      updatedWork = prevWork;
    }
    const newWorkArray = [...updatedWork, newWork];
    
    setTimeout(() => updateMentorProfile(education, newWorkArray), 0);
    
    return newWorkArray;
  });
  
  setExperienceEditOpen(false);
  setNewWork({
    company: '',
    jobTitle: '',
    employmentType: '',
    jobLocation: '',
    startDate: 0,
    endDate: 0
  });
  setSelectedWorkIndex(null);
};

// const handleSaveWork = () => {
//   setWork(prevWork => {
//     const updatedWork = prevWork.filter((_, index) => index !== selectedWorkIndex);
//     const newWorkArray = [...updatedWork, newWork];
    
//     setTimeout(() => updateMentorProfile(), 0);
    
//     return newWorkArray;
//   });
  
//   setExperienceEditOpen(false);
//   setNewWork({
//     company: '',
//     jobTitle: '',
//     employmentType: '',
//     jobLocation: '',
//     startDate: 0,
//     endDate: 0
//   });
// };

// const handleSaveEducation = () => {

//   setEducation(prevEducation => [...prevEducation, newEducation]);
//   // console.log("work added");
//   updateMentorProfile(); 
//   setEducationEditOpen(false);
//   setNewEducation({
//     college: '',
//       degree: '',
//       department: '',
//       year: 0
//   });
// };

// const handleRemoveEducation = (indexToRemove) => {
//   console.log("deleteIndex",indexToRemove)
//   setEducation(prevEducation => {
//     const updatedEducation = prevEducation.filter((_, index) => index !== indexToRemove);
//     setTimeout(() => updateMentorProfile(), 2000);
//     return updatedEducation;
//   });
// };

const handleSaveEducation = () => {
  setEducation(prevEducation => {
    const updatedEducation = prevEducation.filter((_, index) => index !== selectedIndex);
    const newEducationArray = [...updatedEducation, newEducation];
    
    setTimeout(() => updateMentorProfile(newEducationArray), 0);
    
    return newEducationArray;
  });
  setSelectedIndex(null);
  setEducationEditOpen(false);
  setNewEducation({
    college: '',
    degree: '',
    department: '',
    year: 0
  });
};



const handleEditWork = (index) => {
  setNewWork(work[index]);
  setSelectedWorkIndex(index)
  // setCurrentWork({...workItem});
  setExperienceEditOpen(true);
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
          setFirstName(userData.firstName);
          setLastName(userData.lastName);
          setJobTitle(userData.jobTitle);
          setLocation(userData.location);
          setEducation(userData.education);
          setLinkedInUrl(userData.linkedInUrl);
          setLanguages(userData.languages);
          setWork(userData.work)
          setTwitterHandle(userData.twitterHandle);
          setPersonalWebsite(userData.personalWebsite);
          setSkills(userData.skills);
          setSeekingFor(userData.seekingFor);
          setGoal(userData.goal);
          setCertifications(userData.certifications);
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
  }, [profileUpdate]);

  // const updateMentorProfile = async () => {
  //   try {
  //     const updatedData = {
  //       firstName,
  //       lastName,
  //       jobTitle,
  //       location,
  //       linkedInUrl,
  //       personalWebsite,
  //       twitterHandle,
  //       education,
  //       work,
  //       skills,
  //       bio,
  //     };

  //     await axios.put(endUrl, updatedData, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });
  //   } catch (error) {
  //     console.error("Error updating profile", error);
  //   }
  // };

  // const countryName = country.find((c) => c.iso_code === location)?.name;
  // const userName = localStorage.getItem("userName");

  // const handleEditEducation = () => {
  //   setEducationEditOpen(true);
  // };
  // const handleEditExperience = () => {
  //   setExperienceEditOpen(true);
  // };

  const handleImageClick = () => setImageEditModal(true);
  const handleEditProfileSave = () => {
    setModalEditProfile(false);
    updateMentorProfile();
  };

  const handleAboutSave = () => {
    setModalAbout(false);
    updateMentorProfile();
  };

  const handleSkillsSave = () => {
    setModalEditSkills(false);
    updateMentorProfile();
  };

  const handleLanguageSave = () => {
    setModalEditLanguage(false);
    updateMentorProfile();
  }

  const handleAddSkill = (newSkill) => {
    if (!newSkill.trim()) {
      setSkillValidationMessage("Skill cannot be empty");
  } else {
    setSkillValidationMessage("")
    setSkills([...skills, newSkill]);
  }
  };

  const handleRemoveSkill = (index) => {
    setSkills(skills.filter((_, i) => i !== index));
  };

  const handleEducationCancel = () => {
   setEducationEditOpen(false);
   setSelectedIndex(null);

  }

  return (
    <div className="d-flex justify-content-center align-items-center">
      <Colxx sm="12" md="10" lg="10" xxs="12" className="">
        <div className="">
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
                            <h2 className="font-weight-bold">{firstName} {" "} {lastName}</h2>
                            <h3 className="text-one">
                              {work.length > 0 && work[0].jobTitle} |{" "}
                              {work.length > 0 && work[0].company}
                            </h3>
                            <div>
                              <h6 className="text-muted">Location</h6>
                              <h6>{work.length > 0 && work[0].jobLocation}</h6>
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
                              <Label for="linkedInUrl" className="text-muted">
                                <h4>LinkedIn</h4>
                              </Label>
                              <Input
                                type="text"
                                id="linkedInUrl"
                                value={linkedInUrl}
                                onChange={(e) => setLinkedInUrl(e.target.value)}
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
                                value={personalWebsite}
                                onChange={(e) =>
                                  setPersonalWebsite(e.target.value)
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
                              onClick={() => handleAboutSave()}
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
                          {work.map((w, index) => (
                            // eslint-disable-next-line react/no-array-index-key
                            <div key={index}>
                              <h6>{w.jobTitle}</h6>
                              <h6 className="text-muted">
                                {w.company} | {w.startDate} - {w.endDate === currentYear ? "Present" : w.endDate} 
                                {/* - 1 month */}
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
                                  onClick={handleAddWork}
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
                                      value={newWork.jobTitle} 
                                      onChange={(e) => {
                                        const { name, value } = e.target;
                                        setNewWork(prevState => ({
                                          ...prevState, 
                                          [name]: value 
                                        }));
                                      }}
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
                                    value={newWork.employmentType}
                                    // className="form-control"
                                      onChange={(e) => {
                                        const { name, value } = e.target;
                                        setNewWork(prevState => ({
                                          ...prevState, 
                                          [name]: value 
                                        }));
                                      }}
                                  />
                                </FormGroup>
                                <FormGroup className="error-l-125">
                                  <Label for="twitterHandle">
                                    Company name
                                  </Label>
                                  <Input
                                    type="text"
                                    name="company"
                                    id="company"
                                    value={newWork.company}
                                    // className="form-control"
                                    onChange={(e) => {
                                      const { name, value } = e.target;
                                      setNewWork(prevState => ({
                                        ...prevState, 
                                        [name]: value 
                                      }));
                                    }}
                                  />
                                </FormGroup>
                                <FormGroup>
                                  <Label
                                    for="location"
                                    className="font-weight-medium"
                                  >
                                    Location
                                  </Label>
                                  {/* <Input
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
                                  </Input> */}
                                   <Input
                                    type="text"
                                    name="jobLocation"
                                    id="jobLocation"
                                    value={newWork.jobLocation}
                                    // className="form-control"
                                    onChange={(e) => {
                                      const { name, value } = e.target;
                                      setNewWork(prevState => ({
                                        ...prevState, 
                                        [name]: value 
                                      }));
                                    }}
                                  />
                                </FormGroup>
                                <Row>
                                  <Col>
                                <FormGroup>
                                <Label for="startDate">
                                Start year
                              </Label>

                              <Input
                                type="select"
                                name="startDate"
                                value={newWork.startDate}
                                onChange={(e) => {
                                  const { name, value } = e.target;
                                  setNewWork(prevState => ({
                                    ...prevState, 
                                    [name]: value 
                                  }));
                                }}
                                className="form-control font-weight-bold text-one"
                              >
                                <option disabled value="">
                                  Select year
                                </option>
                                {years.map((yr) => (
                                  <option
                                    key={yr}
                                    value={yr}
                                  >
                                    {yr}
                                  </option>
                                ))}
                              </Input>
                                </FormGroup>
                                </Col>
                                <Col>
                                <FormGroup>
                                <Label for="endDate" >
                                End year
                              </Label>

                              <Input
                                type="select"
                                name="endDate"
                                value={newWork.endDate}
                                onChange={(e) => {
                                  const { name, value } = e.target;
                                  setNewWork(prevState => ({
                                    ...prevState, 
                                    [name]: value 
                                  }));
                                }}
                                className="form-control font-weight-bold text-one"
                              >
                                <option disabled value="">
                                  Select year
                                </option>
                                {years.map((yr) => (
                                  <option
                                    key={yr}
                                    value={yr}
                                  >
                                    {currentYear === yr ? "Present" : yr}
                                  </option>
                                ))}
                              </Input>
                                </FormGroup>
                                </Col>
                                </Row>

                                <ModalFooter
                                  style={{ borderTop: "none" }}
                                  className="d-flex align-items-center justify-content-center"
                                >
                                  <Button
                                    color="primary"
                                    onClick={() => handleSaveWork()}
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
                                {work.map((w, index) => (
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
                                          {w.endDate === currentYear ? "Present" : w.endDate} 
                                          {/* - 1 month */}
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
                                        onClick={() => handleEditWork(index)}
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
                                {/* <Button color="primary" outline size="sm">
                                  CSS
                                </Button> */}
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
                              </Col>
                              {skillValidationMessage && (
                      <div className="invalid-feedback d-block">
                        {skillValidationMessage}
                      </div>
                    )}
                              {/* <Col md={2}>
                                <Button color="primary" className="w-100">
                                  Add skill
                                </Button>
                              </Col> */}
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
                                    onClick={() => handleRemoveSkill(index)}
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
                              onClick={() => handleSkillsSave()}
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
                          {education.map((e, index) => (
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
                                    name="college"
                                    id="college"
                                    value={newEducation.college} 
                                      onChange={(e) => {
                                        const { name, value } = e.target;
                                        setNewEducation(prevState => ({
                                          ...prevState, 
                                          [name]: value 
                                        }));
                                      }}
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
                                    value={newEducation.degree} 
                                      onChange={(e) => {
                                        const { name, value } = e.target;
                                        setNewEducation(prevState => ({
                                          ...prevState, 
                                          [name]: value 
                                        }));
                                      }}
                                  />
                                </FormGroup>
                                <FormGroup className="error-l-125">
                                  <Label for="twitterHandle">Field study</Label>
                                  <Input
                                    type="text"
                                    name="department"
                                    id="department"
                                    // className="form-control"
                                    value={newEducation.department} 
                                      onChange={(e) => {
                                        const { name, value } = e.target;
                                        setNewEducation(prevState => ({
                                          ...prevState, 
                                          [name]: value 
                                        }));
                                      }}
                                  />
                                </FormGroup>
                                <FormGroup>
                                <Label for="location" className="text-muted">
                                <h4>End year</h4>
                              </Label>

                              <Input
                                type="select"
                                name="year"
                                value={newEducation.year}
                                onChange={(e) => {
                                  const { name, value } = e.target;
                                  setNewEducation(prevState => ({
                                    ...prevState, 
                                    [name]: value 
                                  }));
                                }}
                                className="form-control font-weight-bold text-one"
                              >
                                {/* <option disabled value="">
                                  Select Location
                                </option> */}
                                {years.map((yr) => (
                                  <option
                                    key={yr}
                                    value={yr}
                                  >
                                    {yr}
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
                                    onClick={handleSaveEducation}
                                  >
                                    Save
                                  </Button>{" "}
                                  <Button
                                    color="primary"
                                    outline
                                    onClick={() => handleEducationCancel()}
                                    className=""
                                  >
                                    Cancel
                                  </Button>
                                </ModalFooter>
                              </>
                            ) : (
                              <>
                                {education.map((e, index) => (
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
                                        onClick={() => handleEditEducation(index)}
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
                              onClick={() => handleLanguageSave()}
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
