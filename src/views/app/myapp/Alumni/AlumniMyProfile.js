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
  const [isEditingEducationSecond, setIsEditingEducationSecond] =
    useState(false);
  // const [editedCollegeIndex, setEditedCollegeIndex] = useState(-1);
  const [expId, setExpId] = useState("");
  const [collegeId, setCollegeId] = useState("");
  const [isEditingExpSecond, setIsEditingExpSecond] = useState(false);
  // const [isAddingEducation, setIsAddingEducation] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);

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

  // update experience
  const handleEditExperience = (index) => {
    setIsEditingExpSecond(true);
    setExpId(experience[index].id);
    setEditingIndex(index);
  };
  console.log(expId);

  const handleDeleteExperience = async (index) => {
    try {
      const experienceToDelete = experience[index]; // Get the selected experience

      if (!experienceToDelete.id) {
        ToasterComponent("error", [{ message: "Experience ID not found." }]);
        return;
      }

      const response = await axios.delete(
        `${baseUrl}/api/alumni/experience/${experienceToDelete.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Ensure you are passing the correct token
          },
        }
      );

      // Remove the experience from the state after deletion
      setExperience((prevExperience) =>
        prevExperience.filter((_, i) => i !== index)
      );

      ToasterComponent("success", response.data.statuses); // Show success message
      setIsProfileUpdated(!isProfileUpdated); // Trigger profile update state
    } catch (error) {
      console.error("Error deleting experience", error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.statuses
      ) {
        ToasterComponent("error", error.response.data.statuses);
      } else {
        console.error("Error updating profile", error);
      }
    }
  };

  // const experienceUrl = `${baseUrl}/api/alumni/experience/${expId}`;
  const addExperienceUrl = `${baseUrl}/api/alumni/experience`;
  // const updateExperience = async () => {
  //   try {
  //     if (experience.length > 0) {
  //       const updatedData = {
  //         company: experience[editingIndex].company,
  //         jobTitle: experience[editingIndex].jobTitle,
  //         employmentType: experience[editingIndex].employmentType,
  //         jobLocation: experience[editingIndex].jobLocation,
  //         startYear: experience[editingIndex].startYear,
  //         endYear: experience[editingIndex].endYear,
  //       };

  //       console.log("Updated Data:", updatedData); // Log updated data to verify

  //       const response = await axios.put(experienceUrl, updatedData, {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       });

  //       setIsProfileUpdated(!isProfileUpdated);
  //       ToasterComponent("success", response.data.statuses);
  //     } else {
  //       ToasterComponent("warning", [
  //         { message: "No experience data available" },
  //       ]);
  //     }
  //   } catch (error) {
  //     console.error("Error updating profile", error);
  //     if (error.response && error.response.data.statuses[0]) {
  //       ToasterComponent("warning", error.response.data.statuses);
  //     } else {
  //       ToasterComponent("error", [
  //         { message: "An unexpected error occurred" },
  //       ]);
  //     }
  //   }
  // };

  const updateExperience = async () => {
    try {
      const currentExperience = experience[editingIndex]; // Get current experience entry

      const experienceData = {
        company: currentExperience.company,
        jobTitle: currentExperience.jobTitle,
        employmentType: currentExperience.employmentType,
        jobLocation: currentExperience.jobLocation,
        startYear: currentExperience.startYear,
        endYear: currentExperience.endYear,
      };

      let response;

      if (currentExperience.id) {
        // Construct the update URL by appending the experience ID for PUT request
        const updateUrl = `${addExperienceUrl}/${currentExperience.id}`;
        response = await axios.put(updateUrl, experienceData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        ToasterComponent("success", response.data.statuses);
      } else {
        // If the experience entry has no id, create a new one using POST
        response = await axios.post(addExperienceUrl, experienceData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        ToasterComponent("success", response.data.statuses); // Use message from response
      }

      // Refresh the profile after adding/updating experience
      setIsProfileUpdated(!isProfileUpdated);
    } catch (error) {
      console.error("Error saving experience", error);

      // Improved error handling and logging
      if (error.response && error.response.data.statuses[0]) {
        ToasterComponent("warning", error.response.data.statuses);
      } else {
        ToasterComponent("error", [
          { message: "An unexpected error occurred" },
        ]);
      }
    }
  };
  const handleAddWork = () => {
    const newExperience = {
      // id: null, // Generate an ID or set it later from API response if needed
      company: "",
      jobTitle: "",
      employmentType: "",
      jobLocation: "",
      startYear: "",
      endYear: "",
    };

    // Add new experience to the array
    setExperience([...experience, newExperience]);

    // Set the new entry as editable
    setEditingIndex(experience.length); // Set the index of the new experience
    setIsEditingExpSecond(true); // Switch to the form to edit the new experience
  };

  const handleSaveExp = () => {
    setIsEditingExp(false);
    // updateMEntorProfile();
    updateExperience();
  };

  const handleCancelEditExp = () => {
    setIsEditingExp(false);
    setIsEditingExpSecond(false);
  };
  const handleInputChange = (index, field, value) => {
    const updatedExperience = [...experience];
    updatedExperience[index][field] = value;
    setExperience(updatedExperience);
  };
  // update education

  // const educationUpdateUrl = `${baseUrl}/api/alumni/college/${collegeId}`;
  console.log(collegeId);

  const addEducationUrl = `${baseUrl}/api/alumni/college`;

  const updateEducation = async () => {
    try {
      const currentCollege = college[editingIndex]; // Access the current college being edited
      const updatedData = {
        collegeName: currentCollege.collegeName,
        degree: currentCollege.degree,
        department: currentCollege.department,
        year: Number(currentCollege.year), // Ensure the year is treated as a number
      };

      if (currentCollege.id) {
        // PUT request to update existing education entry
        const educationUpdateUrl = `${baseUrl}/api/alumni/college/${currentCollege.id}`;
        const response = await axios.put(educationUpdateUrl, updatedData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        ToasterComponent("success", response.data.statuses);
      } else {
        // POST request to add new education entry
        const response = await axios.post(addEducationUrl, updatedData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Extract the collegeId from the POST response and update the state
        const newCollegeId = collegeId; // Ensure the API returns this field
        setCollege((prevCollege) =>
          prevCollege.map((entry, index) =>
            index === editingIndex ? { ...entry, id: newCollegeId } : entry
          )
        );
        ToasterComponent("success", response.data.statuses);
      }

      // Toggle the profile update state
      setIsProfileUpdated(!isProfileUpdated);
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

  const handleAddEducation = () => {
    // Create a new college entry with empty values
    const newCollegeEntry = {
      collegeName: "",
      degree: "",
      department: "",
      year: "",
    };

    // Add the new entry to the college state
    setCollege((prevCollege) => [...prevCollege, newCollegeEntry]);
    // Set editing index to the new college entry to allow for immediate editing
    setEditingIndex(college.length); // Set index to the last entry (new one)
    setIsEditingEducationSecond(true); // Open the editing modal
  };

  const handleInputEducationChange = (index, field, value) => {
    const updatedCollege = [...college];
    updatedCollege[index][field] = value;
    setCollege(updatedCollege);
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

  const handleSaveEducation = () => {
    setIsEditingEducation(false);
    // updateMEntorProfile();
    updateEducation();
  };

  const handleCancelEditEducation = () => {
    setIsEditingEducation(false);
    setIsEditingEducationSecond(false);
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

  const handleEditEducation = (index) => {
    setIsEditingEducationSecond(true);
    setCollegeId(college[index].id);
    setEditingIndex(index); // Set the index of the college to edit
  };

  const deleteEducationUrl = (id) => `${baseUrl}/api/alumni/college/${id}`;

  // Function to handle deleting a college
  const handleDeleteEducation = async (index) => {
    try {
      const collegeToDelete = college[index]; // Get the selected college

      if (!collegeToDelete.id) {
        ToasterComponent("error", [{ message: "College ID not found." }]);
        return;
      }

      const response = await axios.delete(
        deleteEducationUrl(collegeToDelete.id),
        {
          headers: {
            Authorization: `Bearer ${token}`, // Ensure you are passing the correct token
          },
        }
      );

      // Remove the college from the state after deletion
      setCollege((prevCollege) => prevCollege.filter((_, i) => i !== index));

      ToasterComponent("success", response.data.statuses);
      setIsProfileUpdated(!isProfileUpdated); // Trigger profile update state
    } catch (error) {
      console.error("Error deleting education", error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.statuses
      ) {
        ToasterComponent("error", error.response.data.statuses);
      } else {
        console.error("Error updating profile", error);
      }
    }
  };

  console.log("Editing experience index:", editingIndex);

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
                  {/* <ModalHeader>
                    <Row>
                      <Col md={8}>
                        <h2 className="font-weight-bold">Experience</h2>
                      </Col>
                      <Col md={4}>
                        <Button
                          color="primary"
                          outline
                          className="icon-button"
                          style={{ border: "none" }}
                          size="sm"
                          // onClick={handleAddWork}
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
                  </ModalHeader> */}
                  <ModalBody>
                    <Row className="align-items-center mb-3 ">
                      <Col>
                        <h2 className="font-weight-bold">Edit Experience</h2>
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

                    {isEditingExpSecond ? (
                      <div className="col-lg-12 col-12">
                        {/* <Label for="experience" className="text-dark">
                          <h4>Experience</h4>
                        </Label> */}
                        {experience[editingIndex] && (
                          <>
                            <Row>
                              <Col md={6}>
                                <FormGroup className="error-l-75">
                                  <Label
                                    for={`experience[${editingIndex}].company`}
                                  >
                                    Company Name*
                                  </Label>
                                  <Input
                                    className="form-control"
                                    name={`experience[${editingIndex}].company`}
                                    value={
                                      experience[editingIndex]?.company || ""
                                    }
                                    onChange={(e) =>
                                      handleInputChange(
                                        editingIndex,
                                        "company",
                                        e.target.value
                                      )
                                    }
                                  />
                                </FormGroup>
                              </Col>
                              <Col md={6}>
                                <FormGroup>
                                  <Label
                                    for={`experience[${editingIndex}].jobTitle`}
                                  >
                                    Job title*
                                  </Label>
                                  <Input
                                    name={`experience[${editingIndex}].jobTitle`}
                                    id={`experience[${editingIndex}].jobTitle`}
                                    className="form-control"
                                    value={
                                      experience[editingIndex]?.jobTitle || ""
                                    }
                                    onChange={(e) =>
                                      handleInputChange(
                                        editingIndex,
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
                                    for={`experience[${editingIndex}].employmentType`}
                                  >
                                    Employment type*
                                  </Label>
                                  <Input
                                    type="select"
                                    name={`experience[${editingIndex}].employmentType`}
                                    id={`experience[${editingIndex}].employmentType`}
                                    className="form-control"
                                    value={
                                      experience[editingIndex]
                                        ?.employmentType || ""
                                    }
                                    onChange={(e) =>
                                      handleInputChange(
                                        editingIndex,
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
                                  <Label
                                    for={`experience[${editingIndex}].jobLocation`}
                                  >
                                    Job location*
                                  </Label>
                                  <Input
                                    type="text"
                                    name={`experience[${editingIndex}].jobLocation`}
                                    id={`experience[${editingIndex}].jobLocation`}
                                    className="form-control"
                                    value={
                                      experience[editingIndex]?.jobLocation ||
                                      ""
                                    }
                                    onChange={(e) =>
                                      handleInputChange(
                                        editingIndex,
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
                                  <Label
                                    for={`experience[${editingIndex}].startYear`}
                                  >
                                    Start year
                                  </Label>
                                  <Input
                                    type="select"
                                    name={`experience[${editingIndex}].startYear`}
                                    id={`experience[${editingIndex}].startYear`}
                                    className="form-control"
                                    value={
                                      experience[editingIndex]?.startYear || ""
                                    }
                                    onChange={(e) =>
                                      handleInputChange(
                                        editingIndex,
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
                                  <Label
                                    for={`experience[${editingIndex}].endYear`}
                                  >
                                    End year
                                  </Label>
                                  <Input
                                    type="select"
                                    name={`experience[${editingIndex}].endYear`}
                                    id={`experience[${editingIndex}].endYear`}
                                    className="form-control"
                                    value={
                                      experience[editingIndex]?.endYear || ""
                                    }
                                    onChange={(e) =>
                                      handleInputChange(
                                        editingIndex,
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
                            </Row>
                          </>
                        )}
                      </div>
                    ) : (
                      <div>
                        {experience?.map((value, index) => (
                          <Row
                            key={value.id}
                            className="d-flex align-items-center justify-content-between "
                          >
                            <Col>
                              <div>
                                <p className="text-one font-weight-medium ">
                                  {value.jobTitle} <br /> {value.company} |{" "}
                                  {value.startYear} - {value.endYear}
                                </p>
                              </div>
                            </Col>

                            <Col xs="auto">
                              <Button
                                color="primary"
                                outline
                                className="icon-button mr-1"
                                size="sm"
                                onClick={() => handleEditExperience(index)}
                                style={{ border: "none" }}
                              >
                                <i className="simple-icon-pencil" />
                              </Button>
                              <Button
                                color="primary"
                                outline
                                className="icon-button"
                                size="sm"
                                onClick={() => handleDeleteExperience(index)}
                                style={{ border: "none" }}
                              >
                                <i className="simple-icon-trash" />
                              </Button>
                            </Col>
                          </Row>
                        ))}
                      </div>
                    )}
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
                    <Col key={colleges} md={12} className="mb-3">
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
                  <ModalBody>
                    <div className="col-lg-12 col-12">
                      <Row className="align-items-center mb-3">
                        <Col>
                          <h2 className="font-weight-bold">Edit Education</h2>
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

                      <div className="">
                        {college.map((colleges, index) => (
                          <Row key={colleges} className="mt-2">
                            <Col className="">
                              <h3 className="font-weight-semibold">
                                {colleges.degree}
                              </h3>
                              <h3 className="text-muted">
                                {colleges.collegeName} | {colleges.year}
                              </h3>
                            </Col>
                            <Col xs="auto">
                              <Button
                                color="primary"
                                outline
                                className="icon-button mr-1"
                                size="sm"
                                onClick={() => handleEditEducation(index)} // Call edit handler with index
                                style={{ border: "none" }}
                              >
                                <i className="simple-icon-pencil" />
                              </Button>

                              <Button
                                color="primary"
                                outline
                                className="icon-button"
                                size="sm"
                                onClick={() => handleDeleteEducation(index)} // Call edit handler with index
                                style={{ border: "none" }}
                              >
                                <i className="simple-icon-trash" />
                              </Button>
                            </Col>
                          </Row>
                        ))}
                      </div>
                      {isEditingEducationSecond ? (
                        <>
                          {/* {college.map((colleges, index) => (
                            <Row key={colleges}>
                              <Col className="bg-primary">
                                <h3 className="font-weight-semibold">
                                  {colleges.degree}
                                </h3>
                                <h3 className="text-muted">
                                  {colleges.collegeName} | {colleges.year}
                                </h3>
                              </Col>
                              <Col xs="auto">
                                <Button
                                  color="primary"
                                  outline
                                  className="icon-button"
                                  size="sm"
                                  onClick={() => handleEditEducation(index)} // Call edit handler with index
                                  style={{ border: "none" }}
                                >
                                  <i className="simple-icon-pencil" />
                                </Button>
                              </Col>
                            </Row>
                          ))} */}

                          <Row>
                            <Col md={6}>
                              {/* Render only for the selected college */}
                              {college[editingIndex] && (
                                <>
                                  <FormGroup className="error-l-75">
                                    <Label>College Name*</Label>
                                    <Input
                                      className="form-control"
                                      name={`education[${editingIndex}].collegeName`}
                                      id={`education[${editingIndex}].collegeName`}
                                      value={college[editingIndex].collegeName}
                                      onChange={(e) =>
                                        handleInputEducationChange(
                                          editingIndex,
                                          "collegeName",
                                          e.target.value
                                        )
                                      }
                                    />
                                  </FormGroup>
                                </>
                              )}
                            </Col>
                            <Col md={6}>
                              {college[editingIndex] && (
                                <FormGroup>
                                  <Label
                                    for={`education[${editingIndex}].degree`}
                                  >
                                    Degree*
                                  </Label>
                                  <Input
                                    name={`education[${editingIndex}].degree`}
                                    id={`education[${editingIndex}].degree`}
                                    className="form-control"
                                    value={college[editingIndex].degree}
                                    onChange={(e) =>
                                      handleInputEducationChange(
                                        editingIndex,
                                        "degree",
                                        e.target.value
                                      )
                                    }
                                  />
                                </FormGroup>
                              )}
                            </Col>

                            <Col md={6}>
                              {college[editingIndex] && (
                                <FormGroup>
                                  <Label
                                    for={`education[${editingIndex}].department`}
                                  >
                                    Department*
                                  </Label>
                                  <Input
                                    name={`education[${editingIndex}].department`}
                                    id={`education[${editingIndex}].department`}
                                    className="form-control"
                                    value={college[editingIndex].department}
                                    onChange={(e) =>
                                      handleInputEducationChange(
                                        editingIndex,
                                        "department",
                                        e.target.value
                                      )
                                    }
                                  />
                                </FormGroup>
                              )}
                            </Col>
                            <Col md={6}>
                              {college[editingIndex] && (
                                <FormGroup>
                                  <Label
                                    for={`education[${editingIndex}].degree`}
                                  >
                                    Year*
                                  </Label>
                                  <Input
                                    name={`education[${editingIndex}].year`}
                                    id={`education[${editingIndex}].year`}
                                    className="form-control"
                                    value={college[editingIndex].year}
                                    onChange={(e) =>
                                      handleInputEducationChange(
                                        editingIndex,
                                        "year",
                                        e.target.value
                                      )
                                    }
                                  />
                                </FormGroup>
                              )}
                            </Col>
                          </Row>
                        </>
                      ) : (
                        ""
                      )}
                    </div>
                  </ModalBody>
                  <ModalFooter>
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
