import axios from "axios";
import ThumbnailLetters from "components/cards/ThumbnailLetters";
import { Colxx } from "components/common/CustomBootstrap";
import { NotificationManager } from "components/common/react-notifications";
import { baseUrl } from "constants/defaultValues";
import { useEffect, useState } from "react";
import Select from "react-select";
import { ReactSortable } from "react-sortablejs";

import {
  Button,
  ButtonDropdown,
  Card,
  CardBody,
  Col,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  FormGroup,
  Input,
  InputGroup,
  InputGroupAddon,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  // NavLink,
  Row,
} from "reactstrap";
import country from "../my-login/Country";
import language from "../my-login/Languages";
import ToasterComponent from "../notifications/ToasterComponent";

const LawyerMyProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingAbout, setIsEditingAbout] = useState(false);
  // const [isEditingButton, setIsEditingButton] = useState(false);
  // const [newInputLanguages, setNewInputLanguages] = useState("");
  const [newInputTopics, setNewInputTopics] = useState("");
  const [imageUrl, setImageUrl] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [resumeFileName, setResumeFileName] = useState("");
  const [resumeFileId, setResumeFileId] = useState("");
  const [location, setLocation] = useState("");
  const [languages, setLanguages] = useState([]);
  const [topic, setTopic] = useState([]);
  const [ratings, setRatings] = useState("");
  const [bio, setBio] = useState("");
  const [star, setStar] = useState("");
  const [about, setAbout] = useState("");
  const [packages, setPackages] = useState([]);
  // const [profileLoading, setProfileLoading] = useState(true);
  const [setProfileLoading] = useState(true);
  const [topicValidationMessage, setTopicValidationMessage] = useState("");
  const [isPosted, setIsPosted] = useState(false);
  // const [file1] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageEditModal, setImageEditModal] = useState(false);
  const [selectedFileBase64, setSelectedFileBase64] = useState(null);
  const [isEditingLanguages, setIsEditingLanguages] = useState(false);
  const [isEditingTopics, setIsEditingTopics] = useState(false);
  const [isEditingPackages, setIsEditingPackages] = useState(false);
  const [isAddPackage, setIsAddPackage] = useState(false);
  const [pid, setPid] = useState(null);
  const [editPackage, setEditPackage] = useState({
    serviceName: "",
    description: "",
    amount: "",
  });

  const [newPackage, setNewPackage] = useState([]);

  const token = localStorage.getItem("tokenRes");

  const endUrl = `${baseUrl}/api/lawyer/myprofile`;
  const imageEditUrl = `${baseUrl}/api/lawyer/profile-image`;
  const packageURL = `${baseUrl}/api/lawyer/${pid}/package`;

  const mentorProfileDetails = async () => {
    try {
      const response = await axios.get(endUrl);
      const userData = response.data;
      if (userData) {
        setImageUrl(userData.imageUrl);
        setFirstName(userData.firstName);
        setLastName(userData.lastName);
        setLocation(userData.location);
        setResumeFileName(userData.documentName);
        setResumeFileId(userData.documentId);
        // setLanguages(userData.languages);
        setLanguages(userData.languages.map((lang) => lang.language));
        setBio(userData.bio);
        setRatings(userData.ratings);
        // setTopic(topicData);
        // Store the id from the response
        setPid(userData.id);

        setTopic(userData.topic.map((t) => t.topicName));
        setStar(userData.star);
        setAbout(userData.about);
        setProfileLoading(false);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const LawyerPackage = async () => {
    console.log(pid);
    try {
      const response = await axios.get(packageURL);
      const fetchedPackages = response.data;
      setPackages(fetchedPackages);

      // if (fetchedPackages.length > 0) {
      //   setActiveFirstTab(fetchedPackages[0].id);
      // }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    mentorProfileDetails();
  }, [isPosted]);

  useEffect(() => {
    if (pid) {
      LawyerPackage();
    }
  }, [pid]);

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

      // console.log(`resres ${response.status}`);
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
        NotificationManager.success(
          status.message,
          "Great!",
          3000,
          null,
          null,
          ""
        );
      });
      setIsPosted(!isPosted);
      // console.log("Profile updated successfully");
    } catch (error) {
      console.error("Error updating profile", error);
    }
  };

  const handleAddLanguages = (newLanguages) => {
    setLanguages([...languages, newLanguages]);
  };

  // const handleEditAboutClick = () => {
  //   setIsEditingAbout(true);
  // };

  const handleSaveAbout = () => {
    setIsEditingAbout(false);
    updateMEntorProfile();
  };

  // const handleCancelEditAbout = () => {
  //   setIsEditingAbout(false);
  // };

  // const handleEditButton = () => {
  //   setIsEditingButton(true);
  const handleLanguagesSave = () => {
    if (languages.length === 0) {
      setTopicValidationMessage("At least one language is required.");
    } else {
      setIsEditingLanguages(false);
      updateMEntorProfile();
    }
  };
  const handleLanguagesCancel = () => {
    setIsEditingLanguages(false);
  };

  const handleSaveTopics = () => {
    if (topic.length === 0) {
      setTopicValidationMessage("At least one topic is required.");
    } else {
      setIsEditingTopics(false);
      updateMEntorProfile();
    }
  };
  const handleTopicCancel = () => {
    if (topic.length === 0) {
      setTopicValidationMessage("At least one topic is required.");
    } else {
      setIsEditingTopics(false);
    }
  };
  // };
  // const handleSaveButton = () => {
  //   if (topic.length === 0) {
  //     setTopicValidationMessage("At least one topic is required.");
  //   } else {
  //     setIsEditingButton(false);
  //     updateMEntorProfile();
  //   }
  // };

  // const handleCancelButton = () => {
  //   if (topic.length === 0) {
  //     setTopicValidationMessage("At least one topic is required.");
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
    if (selectedFile) {
      postImageData();
    }
  };

  // const handleCancel = () => {
  //   setIsEditing(false);
  // };

  const handleRemoveLanguages = (index) => {
    setLanguages(languages.filter((_, i) => i !== index));
  };

  const handleAddTopics = (newTopics) => {
    if (!newTopics.trim()) {
      setTopicValidationMessage("Topic cannot be empty");
    } else {
      setTopicValidationMessage("");
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

  // const handleFileChange = (event) => {
  //   setFile(event.target.files[0]);
  // };
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
  const handlePackageEditClick = (pack) => {
    setEditPackage(pack); // Set the selected package details for editing
    setIsEditingPackages(true); // Open the modal
  };
  // const handleAddPackageEditClick = () => {
  //   setIsAddPackage(true);
  // };
  const [currentPackage, setCurrentPackage] = useState({
    serviceName: "",
    amount: "",
    description: "",
    headline: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentPackage((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePackageSave = async () => {
    try {
      // Add the current package to the newPackage array
      setNewPackage((prevPackages) => [...prevPackages, currentPackage]);

      const response = await axios.post(
        `${baseUrl}/api/lawyer/package`,
        [...newPackage, currentPackage] // Send the array including the new package
      );

      response.data.statuses.forEach((status) => {
        NotificationManager.success(
          status.message, // Use the status message from the response
          "Package Added Successfully", // Title for the notification
          3000 // Duration of the toaster
        );
      });
      // Optionally, refresh the package list or update the state here
      LawyerPackage();
      setIsAddPackage(false); // Close the modal

      // Reset the current package fields after saving
      setCurrentPackage({
        serviceName: "",
        amount: "",
        description: "",
        headline: "",
      });
    } catch (error) {
      NotificationManager.error(
        "Error adding package", // Message for the error
        "Error", // Title for the error notification
        3000 // Duration of the toaster
      );
      console.error("Error saving package:", error);
    }
  };

  const handleSavePackage = async () => {
    try {
      const updateURL = `${baseUrl}/api/lawyer/package/mypackage/${editPackage.id}`;
      const response = await axios.put(updateURL, editPackage); // Assuming a PUT request to update the package
      response.data.statuses.forEach((status) => {
        NotificationManager.success(
          status.message, // Use the status message from the response
          "Package Updated Successfully", // Title for the notification
          3000 // Duration of the toaster
        );
      });
      LawyerPackage(); // Refresh the packages list
      setIsEditingPackages(false); // Close the modal
    } catch (error) {
      NotificationManager.error(
        "Error updating package", // Message for the error
        "Error", // Title for the error notification
        3000 // Duration of the toaster
      );
      console.error("Error updating package:", error);
    }
  };

  const handlePackageDeleteClick = async (pack) => {
    try {
      const deleteURL = `${baseUrl}/api/lawyer/package/mypackage/${pack.id}`; // Construct delete URL
      const response = await axios.delete(deleteURL); // Perform the DELETE request

      response.data.statuses.forEach((status) => {
        NotificationManager.success(
          status.message, // Use the status message from the response
          "Package Deleted Successfully", // Title for the notification
          3000 // Duration of the toaster
        );
      });
      setIsEditingPackages(false);
      LawyerPackage(); // Refresh the packages list, similar to how you update after saving
    } catch (error) {
      NotificationManager.error(
        "Error deleting package", // Message for the error
        "Error", // Title for the error notification
        3000 // Duration of the toaster
      );
      console.error("Error deleting package:", error);
    }
  };

  const handlePackageCancelEdit = () => {
    setIsEditingPackages(false); // Close the modal without saving
  };
  const handleAddPackageCancel = () => {
    setIsAddPackage(false);
  };

  const [fileError, setFileError] = useState("");

  const handleFileChange1 = async (e) => {
    const file = e.target.files[0];

    if (file) {
      const fileType = file.type;
      const fileSize = file.size;

      // Check if the file is a PDF
      if (fileType !== "application/pdf") {
        setFileError("Please upload a PDF file.");
        setResumeFileName(""); // Clear the file name if invalid
        return;
      }

      // Check if the file size is more than 2MB
      if (fileSize > 2 * 1024 * 1024) {
        setFileError("File size should be less than 2MB.");
        setResumeFileName(""); // Clear the file name if invalid
        return;
      }

      // If valid, clear the error and set the file name
      setFileError("");
      setResumeFileName(file.name);

      const formData = new FormData();
      formData.append("resume", file);

      // Post the file to the given URL
      const uploadUrl = `${baseUrl}/api/resume?role=LAWYER`;

      try {
        const response = await axios.post(uploadUrl, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });

        // Handle successful response
        if (response.status === 200) {
          ToasterComponent("success", response.data.statuses);
          console.log("Resume uploaded successfully", response.data);
          setResumeFileId(response.data.documentId);
        } else {
          ToasterComponent("error", "Failed to upload resume");
          console.error("Failed to upload resume", response.data);
        }
      } catch (error) {
        // Handle errors
        if (error.response) {
          ToasterComponent(
            "error",
            error.response.data.message || "Upload failed"
          );
          console.error("Error uploading resume:", error.response);
        } else {
          ToasterComponent("error", "An error occurred while uploading");
          console.error("Error uploading resume:", error);
        }
      }
    }
  };

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const handleView = async (fileId) => {
    const viewUrl = `${baseUrl}/api/resume/${fileId}`; // Replace with your actual API endpoint

    try {
      const response = await axios.get(viewUrl, {
        // This is important for downloading binary files
        headers: {
          Authorization: `Bearer ${token}`, // Include authorization if required
        },
      });
      // const response = await axios.get(viewUrl);

      if (response.status === 200) {
        // Create a URL for the binary response
        // const fileUrl = window.URL.createObjectURL(new Blob([response.data]));
        // const blobUrl = window.URL.createObjectURL(new Blob([response.data]));

        // Open the file in a new tab
        window.open(viewUrl, "_blank");
      } else {
        ToasterComponent("error", "Failed to view resume");
        console.error("Failed to view resume");
      }
    } catch (error) {
      if (error.response) {
        ToasterComponent("error", error.response.data.message || "View failed");
        console.error("Error viewing resume:", error.response);
      } else {
        ToasterComponent("error", "An error occurred while viewing");
        console.error("Error viewing resume:", error);
      }
    }
  };

  const handleDelete = async (fileId) => {
    const deleteUrl = `${baseUrl}/api/resume/${fileId}?role=LAWYER`; // Replace with your actual delete API endpoint

    try {
      const response = await axios.delete(deleteUrl);

      if (response.status === 200) {
        // Assuming the deletion is successful
        ToasterComponent("success", response.data.statuses);
        console.log("File deleted successfully");
        // Add any other logic here like updating the state or UI
        setResumeFileName("");
      } else {
        console.error("Failed to delete the file", "Error");
      }
    } catch (error) {
      // Handle the error here
      if (error?.response?.data?.statuses) {
        ToasterComponent("error", error.response.data.statuses);
      } else {
        console.error("Error deleting the file:", error);
      }
    }
  };

  return (
    <div className="mentor-profile">
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
                        style={{
                          width: "110px",
                          height: "110px",
                          objectFit: "cover",
                        }}
                        alt="img"
                      />
                    )}
                  </button>
                  {/* image modal starts */}
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
                        src={selectedFileBase64 || `${baseUrl}/${imageUrl}`}
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
                  {/* image modal ends */}
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
                    <div className="">
                      <div>
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
                          {country.map((option) => (
                            <option
                              // eslint-disable-next-line react/no-array-index-key
                              key={option}
                              value={option.iso_code}
                            >
                              {option.name}
                            </option>
                          ))}
                        </Input>
                        <br />

                        <br />

                        <Row>
                          <Col md={6}>
                            <>
                              <Label
                                for="resume"
                                className="font-weight-medium"
                              >
                                <h4>CV</h4>
                              </Label>
                              <div
                                className=" p-2 my-2 d-flex text-one align-items-center justify-content-between"
                                style={{
                                  border: "1px solid #ccc",
                                  minWidth: "200px",
                                }}
                              >
                                {resumeFileName || "no file selected"}
                                <ButtonDropdown
                                  isOpen={dropdownOpen}
                                  toggle={toggleDropdown}
                                >
                                  <DropdownToggle
                                    caret
                                    style={{
                                      backgroundColor: "transparent",
                                      border: "none",
                                      padding: 0,
                                    }}
                                  >
                                    <i
                                      className="fa-solid fa-ellipsis"
                                      style={{
                                        color: "#333",
                                        cursor: "pointer",
                                      }}
                                    />
                                  </DropdownToggle>

                                  <DropdownMenu>
                                    <DropdownItem
                                      onClick={() => handleView(resumeFileId)}
                                    >
                                      view
                                    </DropdownItem>
                                    <DropdownItem
                                      onClick={() => handleDelete(resumeFileId)}
                                    >
                                      delete
                                    </DropdownItem>
                                  </DropdownMenu>
                                </ButtonDropdown>
                              </div>
                              <InputGroup className="">
                                <div className="">
                                  <button
                                    type="button"
                                    style={{
                                      cursor: "pointer",

                                      background: "none",
                                      border: "none",
                                    }}
                                    onClick={() =>
                                      document
                                        .getElementById("file-upload")
                                        .click()
                                    }
                                  >
                                    <h5>+ Add your Resume</h5>
                                  </button>
                                  {/* <Form> */}
                                  <Input
                                    id="file-upload"
                                    type="file"
                                    className="d-none"
                                    // onChange={handleFileChange1}
                                    // validate={validateFile}
                                    onChange={(e) => handleFileChange1(e)}
                                  />
                                </div>
                              </InputGroup>
                              <br />
                              {fileError && (
                                <p style={{ color: "red" }}>{fileError}</p>
                              )}
                            </>
                          </Col>
                        </Row>
                      </div>
                    </div>
                    <br />
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

                    <h5 className="font-weight-medium">
                      <i className="simple-icon-location-pin text-primary" />

                      <span className="ml-2">{countryName}</span>
                    </h5>
                    <h6 className="">
                      <i className="simple-icon-star text-primary " />
                      <span className="ml-2">{`${star} (${ratings} ratings)`}</span>
                    </h6>
                    <h6 className="text-muted">{resumeFileName}</h6>
                  </div>
                </div>
              </CardBody>
            </Card>
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
                  <p className="text-muted">{about}</p>
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

                    <>
                      <Label for="about" className="text-muted">
                        <h4>About Me</h4>
                      </Label>
                      <Input
                        type="textarea"
                        id="about"
                        value={about}
                        onChange={(e) => setAbout(e.target.value)}
                        className=" text-one"
                      />
                      <br />
                    </>
                    <>
                      <Label for="about" className="text-muted">
                        <h4>Bio</h4>
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

        {/* language section starts */}
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
                      {languages.map((lang) => (
                        <li
                          // eslint-disable-next-line react/no-array-index-key
                          key={lang}
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
                          key={lang}
                          outline
                          color="primary"
                          className="mt-2 font-weight-semibold mr-2"
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
        {/* langauge section ends */}
        {/* topic section starts */}
        <Row className="my-4">
          <Col>
            <Card>
              <CardBody>
                <Row>
                  <Col className="d-flex justify-content-between">
                    <h2 className="font-weight-bold">Consulting areas</h2>
                    <Button
                      color="primary"
                      outline
                      className="icon-button"
                      size="sm"
                      onClick={() => setIsEditingTopics(true)}
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
                  {topic.map((newTopics, index) => (
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

            <Modal
              isOpen={isEditingTopics}
              toggle={() => setIsEditingTopics(!isEditingTopics)}
              className=""
              size="lg"
              style={{ borderRadius: "10px", overflow: "hidden" }}
            >
              <ModalHeader>
                <h2 className="font-weight-bold">Consulting areas</h2>
              </ModalHeader>
              <ModalBody>
                <div className="mt-3">
                  <h5>Consulting areas </h5>
                  <ReactSortable
                    list={topic}
                    setList={setTopic}
                    options={{ handle: ".handle" }}
                    className="row ml-1"
                  >
                    {topic.map((newTopics, index) => (
                      <Button
                        // eslint-disable-next-line react/no-array-index-key
                        key={newTopics}
                        color={index < 3 ? "primary" : "light"}
                        // className=" mb-2 font-weight-semibold "
                        className=" my-2 font-weight-semibold mr-2 d-flex align-items-center "
                        size="sm"
                        onClick={() => handleRemoveTopics(index)}
                      >
                        {newTopics} <i className="iconsminds-close" />
                      </Button>
                    ))}
                  </ReactSortable>
                  <p className="text-muted ml-2">
                    Drag consulting areas to set top 3 (the top 3 Consulting
                    areas will be displayed on lawyer cards)
                  </p>
                  <InputGroup className="mb-3">
                    <Input
                      type="text"
                      placeholder="New Consulting area"
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
                        Add Consulting areas
                      </Button>
                    </InputGroupAddon>
                  </InputGroup>
                  {topicValidationMessage && (
                    <div className="invalid-feedback d-block">
                      {topicValidationMessage}
                    </div>
                  )}
                </div>
              </ModalBody>
              <ModalFooter>
                <Button
                  color="primary"
                  onClick={handleSaveTopics}
                  className="mr-2"
                >
                  Save
                </Button>
                <Button
                  color="primary"
                  outline
                  onClick={handleTopicCancel}
                  className="ml-2"
                >
                  Cancel
                </Button>
              </ModalFooter>
            </Modal>
          </Col>
        </Row>
        {/* topic section ends */}

        {/* package section starts  */}
        <Row className="my-4">
          <Col>
            <Card>
              <CardBody>
                <Row>
                  <Col className="d-flex justify-content-between">
                    <h2 className="font-weight-bold">Packages</h2>
                  </Col>
                </Row>

                <Row>
                  {packages?.map((pack) => (
                    <Col lg={6} key={pack.id} className="my-2">
                      <Card className="pt-2 pb-2 d-flex">
                        <CardBody className="pt-2 pb-2">
                          <div className="price-top-part d-flex justify-content-between align-items-center">
                            <div>
                              <i className="" />
                              <h2 className="mb-0 font-weight-semibold text-primary text-large mb-4">
                                {pack.serviceName}
                              </h2>
                              {/* <p className=''>{pack.headline}</p> */}
                              <p className="text-large mb-2 text-default">
                                ₹{Math.floor(pack.amount).toLocaleString()}
                              </p>
                              <p className="text-muted text-small">
                                {pack.description}
                              </p>
                            </div>
                            <Button
                              color="primary"
                              outline
                              className="icon-button text-end ml-5"
                              size="sm"
                              onClick={() => handlePackageEditClick(pack)}
                              style={{ border: "none" }}
                            >
                              <i className="simple-icon-pencil" />
                            </Button>
                          </div>
                        </CardBody>
                      </Card>
                    </Col>
                  ))}
                </Row>
                <Row>
                  <Col lg={12}>
                    <Card
                      onClick={() => setIsAddPackage(true)}
                      className="p-3 text-center my-5"
                      style={{ cursor: "pointer" }}
                    >
                      <h3 className="font-weight-bold text-primary">
                        + Add more packages
                      </h3>
                    </Card>
                    {/* Modal for adding new package */}
                    <Modal
                      isOpen={isAddPackage}
                      toggle={() => setIsAddPackage(!isAddPackage)}
                      className=""
                      size="lg"
                      style={{ borderRadius: "10px", overflow: "hidden" }}
                    >
                      <ModalHeader>
                        <h2 className="font-weight-bold">Add New Package</h2>
                      </ModalHeader>
                      <ModalBody>
                        <div className="mt-3">
                          <Row className="my-4">
                            <Col md="6">
                              <Label for="serviceName">
                                <h4>Service Name</h4>
                              </Label>
                              <Input
                                type="text"
                                name="serviceName"
                                id="serviceName"
                                value={newPackage.serviceName}
                                onChange={handleInputChange}
                              />
                            </Col>
                            {/* <Col md="6">
                              <Label for="headline">
                                <h4>Headline</h4>
                              </Label>
                              <Input
                                type="text"
                                name="headline"
                                id="headline"
                                value={newPackage.headline}
                                onChange={handleInputChange}
                              />
                            </Col> */}
                          </Row>

                          <Row>
                            <Col>
                              <Label for="description">
                                <h4>Description</h4>
                              </Label>
                              <Input
                                type="textarea"
                                name="description"
                                id="description"
                                value={newPackage.description}
                                onChange={handleInputChange}
                              />
                            </Col>
                          </Row>
                          <Row className="my-2">
                            <Col md="6">
                              <Label for="amount">
                                <h4>Amount</h4>
                              </Label>
                              <Input
                                type="number"
                                name="amount"
                                id="amount"
                                value={newPackage.amount}
                                onChange={handleInputChange}
                                className="text-one"
                              />
                            </Col>
                          </Row>
                        </div>
                      </ModalBody>
                      <ModalFooter>
                        <Button
                          color="primary"
                          onClick={handlePackageSave}
                          className="mr-2"
                        >
                          Save
                        </Button>
                        <Button
                          color="primary"
                          outline
                          onClick={handleAddPackageCancel}
                          className="ml-2"
                        >
                          Cancel
                        </Button>
                      </ModalFooter>
                    </Modal>
                  </Col>
                </Row>
              </CardBody>
            </Card>

            <Modal
              isOpen={isEditingPackages}
              toggle={() => setIsEditingPackages(!isEditingPackages)}
              className=""
              size="lg"
              style={{ borderRadius: "10px", overflow: "hidden" }}
            >
              <ModalHeader>
                <h2 className="font-weight-bold">Packages</h2>
              </ModalHeader>
              <ModalBody>
                <div className="mt-3">
                  {/* <h5>Packages</h5> */}
                  <Row className="">
                    <Col md={12} className="d-flex justify-content-end">
                      <Button
                        color="primary"
                        outline
                        className="icon-button "
                        size="sm"
                        onClick={() => handlePackageDeleteClick(editPackage)}
                        style={{ border: "none" }}
                      >
                        <i className="simple-icon-trash" />
                      </Button>
                    </Col>
                  </Row>
                  <Row className="my-4">
                    <Col md="6">
                      <Label for="serviceName">
                        <h4>Service Name</h4>
                      </Label>
                      <Input
                        type="text"
                        id="serviceName"
                        value={editPackage.serviceName}
                        onChange={(e) =>
                          setEditPackage({
                            ...editPackage,
                            serviceName: e.target.value,
                          })
                        }
                      />
                    </Col>
                    <Col md="6">
                      <Label for="description">
                        <h4>Description</h4>
                      </Label>
                      <Input
                        type="text"
                        id="description"
                        value={editPackage.description}
                        onChange={(e) =>
                          setEditPackage({
                            ...editPackage,
                            description: e.target.value,
                          })
                        }
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Label for="amount" className="text-muted">
                        <h4>Amount</h4>
                      </Label>
                      <Input
                        type="number"
                        id="amount"
                        value={editPackage.amount}
                        onChange={(e) =>
                          setEditPackage({
                            ...editPackage,
                            amount: e.target.value,
                          })
                        }
                        className=" text-one"
                      />
                    </Col>
                  </Row>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button
                  color="primary"
                  onClick={handleSavePackage}
                  className="mr-2"
                >
                  Save
                </Button>
                <Button
                  color="primary"
                  outline
                  onClick={handlePackageCancelEdit}
                  className="ml-2"
                >
                  Cancel
                </Button>
              </ModalFooter>
            </Modal>
          </Col>
        </Row>

        {/* package section ends */}
        {/* new design cocde ends */}
      </Colxx>
    </div>
  );
};

export default LawyerMyProfile;
