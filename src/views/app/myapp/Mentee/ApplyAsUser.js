/* eslint-disable no-param-reassign */

import axios from "axios";
import { Colxx } from "components/common/CustomBootstrap";
import { NotificationManager } from "components/common/react-notifications";
import { Field, Form, Formik } from "formik";
import { createRef, useEffect, useState } from "react";
import { injectIntl } from "react-intl";
import { useHistory } from "react-router-dom";
import Select from "react-select";
import TagsInput from "react-tagsinput";
import {
  Alert,
  Button,
  Card,
  CardBody,
  Col,
  FormGroup,
  FormText,
  Input,
  InputGroup,
  Jumbotron,
  Label,
  NavLink,
  Row,
  Spinner,
} from "reactstrap";
// import { SliderTooltip } from "components/common/SliderTooltips";
// import { FormikTagsInput } from "containers/form-validations/FormikFields";
// import TagsInput from "react-tagsinput";
import { adminRoot, baseUrl } from "constants/defaultValues";
import "react-tagsinput/react-tagsinput.css";
import {
  // validateReasonForMentor,
  validateAchievement,
  // validateCategory,
  // validateLocation,
  // validateCompany,
  // validateJobTitle,
  // validateSkills,
  // validateBio,
  validateLinkedinUrl,
} from "../my-login/validation";

// import country from "./Country";
import { EmploymentTypeData } from "../Listing/ListingData";
import language from "../my-login/Languages";
import ToasterComponent from "../notifications/ToasterComponent";

const ApplyAsMentor = () => {
  const forms = [createRef(null), createRef(null), createRef(null)];
  const steps = ["Profile", "Experience", "Others"];
  const [currentStep, setCurrentStep] = useState(0);
  const [file1, setFile1] = useState(null);
  // const [amount, setAmount] = useState(500);
  const [loading, setLoading] = useState(false);
  const [skillsTag, setSkillsTag] = useState([]);
  const [certificationsTag, setCertificationsTag] = useState([]);
  const history = useHistory();

  // const [skillsTag, setSkillsTag] = useState([]);
  // const [toolsTag, setToolsTag] = useState([]);
  const [imageError, setImageError] = useState(false);
  // const [skillError,setSkillError] = useState(false);
  const [imageErrorMessage, setImageErrorMessage] = useState(null);
  // const [skillErrorMessage,setSkillErrorMessage] = useState(null);
  const [languages, setLanguages] = useState([]);
  const [aboutLoading, setAboutLoading] = useState(false);
  const [profileLoading, setProfileLoading] = useState(false);
  const [experienceLoading, setExperienceLoading] = useState(false);
  const [aboutField, setAboutField] = useState({
    image: "",
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [certificateInputValue, setCertificateInputValue] = useState("");

  useEffect(() => {
    const status = localStorage.getItem("status");
    // console.log("status", status);
    if (status) {
      if (status === "0") {
        setCurrentStep(0);
      } else if (status === "1") {
        setCurrentStep(1);
      } else if (status === "3") {
        setCurrentStep(2);
      } else if (status === "7") {
        setCurrentStep(3);
      } else {
        setCurrentStep(0);
      }
    }
  }, []);

  // const [fields] = useState({
  //   image: "",

  //   jobTitle: "",
  //   company: "",
  //   location: "",
  //   category: "",
  //   skills: [],
  //   bio: "",
  //   linkedinUrl: "",
  //   twitterHandle: "",
  //   website: "",
  //   introVideo: "",
  //   featuredArticle: "",
  //   reasonForMentor: "",
  //   achievement: "",
  // });

  const currentYear = new Date().getFullYear();
  const years = [];

  for (let year = currentYear; year >= 2005; year -= 1) {
    years.push(year);
  }

  const languageOptions = language.map((option) => ({
    value: option.iso_code,
    label: option.name,
  }));

  const handleNextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const handlePrevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  // file upload validation

  const validateFile = (file) => {
    // const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
    const maxSize = 2 * 1024 * 1024; // 5MB
    // if (!file) {
    //   setImageError(true);
    //   setImageErrorMessage("A profile picture is required");
    //   return false;
    // }
    // if (!allowedTypes.includes(file.type)) {
    //   setImageError(true);
    //   setImageErrorMessage(
    //     "Please upload a valid image file (JPEG, PNG, or GIF)"
    //   );
    //   return false;
    // }
    if (file.size > maxSize) {
      setImageError(true);
      setImageErrorMessage("File size must be less than 2MB");
      return false;
    }

    setImageError(false);
    setImageErrorMessage("");
    return true;
  };
  // file upload validation end

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFile1(file);

    if (file) {
      const reader = new FileReader();
      setImageError(false);
      reader.onloadend = () => {
        const base64Image = reader.result;
        // .split(",")[1];
        setSelectedFile(base64Image);
        // setFieldValue("image", base64Image);
        setAboutField({ ...aboutField, image: base64Image });
        // console.log(base64Image)
        validateFile(file);
      };

      reader.readAsDataURL(file);
    }
  };
  //   const mentorAboutUrl=`${baseUrl}/api/mentor/details/about`;
  //   const mentorAboutUrl="http://localhost:3001/acheckabout";
  const userProfileUrl = `${baseUrl}/api/userprofile/profile`;
  const ImageUrl = `${baseUrl}/api/userprofile/profile-image`;
  const mentorExperienceUrl = `${baseUrl}/api/userprofile/experience`;
  const userAboutUrl = `${baseUrl}/api/userprofile/about`;

  const token = localStorage.getItem("tokenRes");

  // const postDataUserProfile = async (data) => {
  //   // handleNextStep();

  //   setAboutLoading(true);
  //   const formData = new FormData();
  //   formData.append("image", file1);

  //   const userProfile = {
  //     languages,
  //     linkedInUrl: data.linkedinUrl,
  //     twitterHandle: data.twitterHandle,
  //     personalWebsite: data.personalWebsite,
  //   };
  //   formData.append(
  //     "userProfile",
  //     new Blob([JSON.stringify(userProfile)], { type: "application/json" })
  //   );

  //   try {
  //     const response = await axios.post(userProfileUrl, formData, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });
  //     // setNextStep(true)
  //     setAboutLoading(false);
  //     //   console.log(`resres ${response.status}`);
  //     ToasterComponent("success", response.data.statuses);
  //     handleNextStep();
  //     localStorage.setItem("status", "1");
  //   } catch (error) {
  //     setImageError(false);
  //     // console.error(error);
  //     setAboutLoading(false);
  //     if (error.response) {
  //       error.response.data.statuses.forEach((status) => {
  //         NotificationManager.error(
  //           status.message,
  //           "Oops!",
  //           3000,
  //           null,
  //           null,
  //           ""
  //         );
  //         if (status.code === 40327) {
  //           setImageErrorMessage(status.message);
  //           setImageError(true);
  //         }
  //       });
  //     } else {
  //       NotificationManager.error(
  //         "something went wrong",
  //         "Oops!",
  //         3000,
  //         null,
  //         null,
  //         ""
  //       );
  //     }
  //   }
  // };

  const postDataUserProfile = async (data) => {
    setAboutLoading(true);

    const userProfile = {
      languages,
      linkedInUrl: data.linkedinUrl,
      twitterHandle: data.twitterHandle,
      personalWebsite: data.personalWebsite,
    };

    try {
      // Step 1: Post user profile data
      const response = await axios.post(userProfileUrl, userProfile, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      // Step 2: Conditionally upload image if it exists
      if (file1) {
        const formData = new FormData();
        formData.append("image", file1);

        await axios.post(ImageUrl, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }

      setAboutLoading(false);
      ToasterComponent("success", response.data.statuses);
      handleNextStep();
      localStorage.setItem("status", "1");
    } catch (error) {
      setImageError(false);
      setAboutLoading(false);

      if (error.response) {
        error.response.data.statuses.forEach((status) => {
          NotificationManager.error(
            status.message,
            "Oops!",
            3000,
            null,
            null,
            ""
          );
          if (status.code === 40327) {
            setImageErrorMessage(status.message);
            setImageError(true);
          }
        });
      } else {
        NotificationManager.error(
          "Something went wrong",
          "Oops!",
          3000,
          null,
          null,
          ""
        );
      }
    }
  };

  const postExperience = async (data) => {
    // handleNextStep();

    setProfileLoading(true);
    try {
      const response = await axios.post(mentorExperienceUrl, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // setNextStep(true)
      setProfileLoading(false);
      //   console.log(`resres ${response.status}`);
      ToasterComponent("success", response.data.statuses);
      handleNextStep();
      localStorage.setItem("status", "3");
    } catch (error) {
      // setSkillError(false);
      setProfileLoading(false);
      if (
        error.response &&
        error.response.data &&
        error.response.data.statuses
      ) {
        error.response.data.statuses.forEach((status) => {
          NotificationManager.error(
            status.message,
            "Oops!",
            3000,
            null,
            null,
            ""
          );
        });
      } else {
        NotificationManager.error(
          "something went wrong",
          "Oops!",
          3000,
          null,
          null,
          ""
        );
      }
    }
  };

  const postAboutData = async (data) => {
    // handleNextStep();
    setExperienceLoading(true);
    const postDataExp = { ...data };
    try {
      const response = await axios.post(userAboutUrl, postDataExp, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // setNextStep(true)
      // console.log(response);
      setExperienceLoading(false);
      ToasterComponent("success", response.data.statuses);
      handleNextStep();
      localStorage.setItem("status", "7");
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 3000);
    } catch (error) {
      setExperienceLoading(false);
      if (
        error.response &&
        error.response.data &&
        error.response.data.statuses
      ) {
        error.response.data.statuses.forEach((status) => {
          NotificationManager.error(
            status.message,
            "Oops!",
            3000,
            null,
            null,
            ""
          );
        });
      } else {
        NotificationManager.error(
          "something went wrong",
          "Oops!",
          3000,
          null,
          null,
          ""
        );
      }
    }
  };

  // const handleSliderChange = (value) => {
  //   setAmount(value);
  // };

  // useEffect(() => {
  //   axios.get(mentorAboutUrl).then((response) => {
  //     console.log("reslog", response.data);
  //     // setLoading(false);
  //   });
  // }, [currentStep]);

  // const handleTagsChange = (newSkills) => {
  //   setSkillError(false);
  //   setSkillsTag(newSkills);
  // };
  // const handleToolsTagsChange = (newTools) => {
  //   setSkillError(false);
  //   setToolsTag(newTools);
  // };
  const [education, setEducation] = useState([
    { college: "", degree: "", department: "", year: "" },
  ]);

  const [work, setWork] = useState([
    {
      company: "",
      jobTitle: "",
      employmentType: "",
      jobLocation: "",
      startDate: "",
      endDate: "",
    },
  ]);

  const removeEducation = (index) => {
    const newEducation = [...education];
    newEducation.splice(index, 1);
    setEducation(newEducation);
  };
  const removeWorkExperience = (index) => {
    const newWorkExperience = [...work];
    newWorkExperience.splice(index, 1);
    setWork(newWorkExperience);
  };

  const addEducation = () => {
    setEducation([
      ...education,
      { college: "", degree: "", department: "", year: 0 },
    ]);
  };
  const addWorkExperience = () => {
    setWork([
      ...work,
      {
        company: "",
        jobTitle: "",
        employmentType: "",
        jobLocation: "",
        startDate: "",
        endDate: "",
      },
    ]);
  };

  const handleInputChange = (index, field, value) => {
    setEducation((previousEducation) =>
      previousEducation.map((edu, i) =>
        i === index ? { ...edu, [field]: value } : edu
      )
    );
  };
  const handleWorkInputChange = (index, field, value) => {
    setWork((previousWorkExperience) =>
      previousWorkExperience.map((works, i) =>
        i === index ? { ...works, [field]: value } : works
      )
    );
  };

  const handleTagsChange = (newSkills) => {
    // setSkillError(false);
    setSkillsTag(newSkills);
  };

  const handleCertificationsChange = (newCertifications) => {
    // setSkillError(false);
    setCertificationsTag(newCertifications);
  };

  const handleCertificateChangeInput = (value) => {
    if (value.endsWith(",")) {
      const newTag = value.slice(0, -1).trim();
      if (newTag && !certificationsTag.includes(newTag)) {
        setCertificationsTag([...certificationsTag, newTag]);
      }
      setCertificateInputValue("");
    } else {
      setCertificateInputValue(value);
    }
  };

  const handleAddCertificateTag = () => {
    if (
      certificateInputValue.trim() &&
      !certificationsTag.includes(certificateInputValue.trim())
    ) {
      setCertificationsTag([
        ...certificationsTag,
        certificateInputValue.trim(),
      ]);
      setCertificateInputValue("");
    }
  };

  const handleDashboardClick = () => {
    history.push(`${adminRoot}/dashboard`);
  };

  return (
    <Card className="mx-auto my-4 " style={{ maxWidth: "900px" }}>
      <CardBody className="wizard wizard-default">
        <h1 className="mt-4 font-weight-bold">Apply as a student</h1>
        <ul className="nav nav-tabs justify-content-center">
          {steps.map((stepItem, index) => (
            // <li key={`topNavStep_${index}`} className={`nav-item ${index === currentStep ? 'step-doing' : ''}`}>
            <li
              // eslint-disable-next-line
              key={`topNavStep_${index}`}
              className={`nav-item ${
                // eslint-disable-next-line
                index === currentStep
                  ? "step-doing"
                  : index < currentStep
                  ? "step-done"
                  : ""
              }`}
            >
              <NavLink to="#" location={{}} className="nav-link">
                <span>{stepItem}</span>
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="wizard-basic-step">
          {currentStep === 0 && (
            <Formik
              initialValues={{
                personalWebsite: "",
                languages: "",
                linkedinUrl: "",
                twitterHandle: "",
              }}
              // onSubmit={postDataUserProfile}
              onSubmit={(values) => {
                console.log("test");
                postDataUserProfile({ ...values });
                // if (validateFile(file1)) {

                // }
              }}
            >
              {({ errors, touched }) => (
                <Form className="av-tooltip tooltip-label-right">
                  <Alert color="primary">
                    <strong>Tips</strong>
                    <br />
                    <ul>
                      <li>
                        Adding your photo and social media profiles helps
                        mentors feel confident that you’re a real person (e.g.
                        not a bot).
                      </li>
                      <li>
                        Your profile is only visible to mentors that you send
                        applications to. It is not indexed on search engines
                        like Google.
                      </li>
                    </ul>
                  </Alert>
                  <FormGroup>
                    <Label for="image">Image</Label>
                    {imageError && (
                      <div className="invalid-feedback d-block">
                        {imageErrorMessage}
                      </div>
                    )}
                    <Row>
                      <Col md={2} className="">
                        <img
                          src={selectedFile || "/assets/img/profiles/l-1.jpg"}
                          className="mx-2 rounded-circle img-thumbnail border"
                          style={{
                            width: "70px",
                            height: "70px",
                            objectFit: "cover",
                          }}
                          alt=""
                        />
                      </Col>
                      <Col md={5} className="mt-3 ">
                        <InputGroup className="mb-3">
                          <div className="mt-2">
                            <Button
                              className="default"
                              color="primary"
                              onClick={() =>
                                document.getElementById("file-upload").click()
                              }
                            >
                              Upload profile pic{" "}
                              <i className="iconsminds-upload " />
                            </Button>
                            <Input
                              id="file-upload"
                              type="file"
                              className="form-control d-none"
                              onChange={handleFileChange}
                              // validate={validateFile}
                            />
                            {file1 && (
                              <p className="mt-2">
                                Selected file: {file1.name}
                              </p>
                            )}
                          </div>
                        </InputGroup>
                      </Col>
                    </Row>
                  </FormGroup>
                  <FormGroup className="error-l-75">
                    <Row>
                      <Col md={6}>
                        <Label for="languages">Languages known*</Label>
                        <Select
                          placeholder="Select Languages"
                          name="languages"
                          isMulti
                          options={languageOptions}
                          // validate={validateLanguages}
                          className="react-select"
                          classNamePrefix="react-select"
                          onChange={(selectedOptions) => {
                            const languagesArray = selectedOptions
                              ? selectedOptions.map((option) => option.value)
                              : [];
                            setLanguages(languagesArray);
                          }}
                        />
                      </Col>
                      <Col md={6}>
                        <Label for="linkedinUrl">
                          Portfolio/personal website (optional)
                        </Label>
                        <Field
                          className="form-control"
                          name="personalWebsite"
                          type="url"
                          autoComplete="off"
                        />
                        {/* {errors.personalWebsite && touched.personalWebsite && (
                          <div className="invalid-feedback d-block">
                            {errors.personalWebsite}
                          </div>
                        )} */}
                      </Col>
                    </Row>
                  </FormGroup>
                  <FormGroup className="error-l-125">
                    <Row>
                      <Col md={6}>
                        <Label for="linkedinUrl">LinkedIn URL*</Label>
                        <Field
                          className="form-control"
                          name="linkedinUrl"
                          type="url"
                          validate={validateLinkedinUrl}
                          autoComplete="off"
                        />
                        <FormText color="muted" className="">
                          e.g. https://www.linkedin.com/in/username/
                        </FormText>
                        {errors.linkedinUrl && touched.linkedinUrl && (
                          <div className="invalid-feedback d-block">
                            {errors.linkedinUrl}
                          </div>
                        )}
                      </Col>
                      <Col md={6}>
                        <Label for="twitterHandle">
                          Twitter Handle (optional)
                        </Label>
                        <Field
                          type="text"
                          name="twitterHandle"
                          id="twitterHandle"
                          className="form-control"
                          autoComplete="off"
                        />
                        <FormText color="muted">
                          Omit the &ldquo;@&rdquo; -e.g. &ldquo;dqmonn&rdquo;
                        </FormText>
                      </Col>
                    </Row>
                  </FormGroup>

                  <div className="d-flex justify-content-end">
                    <Button
                      color="primary"
                      type="submit"
                      className={`col-12 col-md-2 btn-shadow btn-multiple-state ${
                        aboutLoading ? "show-spinner" : ""
                      }`}
                    >
                      <span className="spinner d-inline-block">
                        <span className="bounce1" />
                        <span className="bounce2" />
                        <span className="bounce3" />
                      </span>
                      <span className="label">Next</span>
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
          )}
          {currentStep === 1 && (
            <Formik
              innerRef={forms[2]}
              initialValues={{
                education: [
                  {
                    college: "",
                    department: "",
                    degree: "",
                    year: "",
                  },
                ],
                work: [
                  {
                    company: "",
                    jobTitle: "",
                    employmentType: "",
                    jobLocation: "",
                    startDate: "",
                    endDate: "",
                  },
                ],
              }}
              onSubmit={() => {
                const experience = { education, work };
                // const datas = {experience}
                postExperience(experience);
                // console.log("my education", education);
                // console.log("values", values);
              }}
              validateOnMount
            >
              {({ errors, touched }) => (
                <Form className="av-tooltip tooltip-label-right my-4">
                  {/* <Alert color="primary">
                  <strong>Almost there!</strong> <br /> You&apos;re just one
                  last step away from being a user and connecting with
                  mentors,lawyers,alumni all over the world! In this step, show off your
                  accomplishments and how you can help others.
                  <br />
                  <br /> Many of these fields are optional, but will help us
                  get better insights into your work - and therefore
                  exponentially increase your chances. They also give you a
                  jumpstart once you&apos;re a user.
                </Alert> */}

                  {education.map((service, index) => (
                    // eslint-disable-next-line react/no-array-index-key
                    <div key={index}>
                      <div className="text-right">
                        {/* <Button outline className="icon-button" onClick={() => removeService(index)}>
                      <i className="simple-icon-close" />
                    </Button> */}
                        {education.length > 1 && (
                          <span>
                            <Button
                              id="closeButton"
                              color="primary"
                              outline
                              className="icon-button"
                              onClick={() => removeEducation(index)}
                            >
                              {/* <i className="iconsminds-close" /> */}
                              <span className="text-primary">
                                <strong>x</strong>
                              </span>
                            </Button>
                          </span>
                        )}
                      </div>
                      <Row>
                        <Col md={6}>
                          <FormGroup className="error-l-75">
                            <Label>College Name*</Label>
                            <Input
                              className="form-control"
                              required
                              name={`education[${index}].college`}
                              value={service.college}
                              onChange={(e) =>
                                handleInputChange(
                                  index,
                                  "college",
                                  e.target.value
                                )
                              }
                              // validate={validateServiceName}
                            />
                            {errors.education?.[index]?.college &&
                              touched.education?.[index]?.college && (
                                <div className="invalid-feedback d-block">
                                  {errors.education[index].college}
                                </div>
                              )}
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
                              value={service.degree}
                              required
                              onChange={(e) =>
                                handleInputChange(
                                  index,
                                  "degree",
                                  e.target.value
                                )
                              }
                              // validate={validatePackageTopic}
                            />
                            {errors.education?.[index]?.degree &&
                              touched.education?.[index]?.degree && (
                                <div className="invalid-feedback d-block">
                                  {errors.education[index].degree}
                                </div>
                              )}
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col md={6}>
                          <FormGroup>
                            <Label for={`education[${index}].department`}>
                              Department*
                            </Label>
                            <Input
                              type="text"
                              name={`education[${index}].department`}
                              id={`education[${index}].department`}
                              className="form-control"
                              value={service.department}
                              required
                              onChange={(e) =>
                                handleInputChange(
                                  index,
                                  "department",
                                  e.target.value
                                )
                              }
                              // validate={validatePackageDescription}
                            />
                            {errors.education?.[index]?.department &&
                              touched.education?.[index]?.department && (
                                <div className="invalid-feedback d-block">
                                  {errors.education[index].department}
                                </div>
                              )}
                          </FormGroup>
                        </Col>

                        <Col md={6}>
                          <FormGroup>
                            <Label for={`education[${index}].department`}>
                              Year of passing*
                            </Label>
                            <Input
                              type="select"
                              name={`education[${index}].year`}
                              id={`education[${index}].year`}
                              className="form-control"
                              value={service.year}
                              required
                              onChange={(e) =>
                                handleInputChange(
                                  index,
                                  "year",
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
                            {errors.education?.[index]?.department &&
                              touched.education?.[index]?.department && (
                                <div className="invalid-feedback d-block">
                                  {errors.education[index].department}
                                </div>
                              )}
                          </FormGroup>
                        </Col>
                      </Row>

                      <hr />
                    </div>
                  ))}

                  <Card
                    onClick={addEducation}
                    className="p-3 text-center my-5"
                    style={{ cursor: "pointer" }}
                  >
                    <h3 className="font-weight-bold text-primary">
                      + Add more education
                    </h3>
                  </Card>
                  {work.map((works, index) => (
                    // eslint-disable-next-line react/no-array-index-key
                    <div key={index}>
                      <div className="text-right">
                        {/* <Button outline className="icon-button" onClick={() => removework(index)}>
                      <i className="simple-icon-close" />
                    </Button> */}
                        {work.length > 1 && (
                          <span>
                            <Button
                              id="closeButton"
                              color="primary"
                              outline
                              className="icon-button"
                              onClick={() => removeWorkExperience(index)}
                            >
                              {/* <i className="iconsminds-close" /> */}
                              <span className="text-primary">
                                <strong>x</strong>
                              </span>
                            </Button>
                          </span>
                        )}
                      </div>
                      <Row>
                        <Col md={6}>
                          <FormGroup className="error-l-75">
                            <Label>Company Name*</Label>
                            <Input
                              className="form-control"
                              required
                              name={`education[${index}].company`}
                              value={works.company}
                              onChange={(e) =>
                                handleWorkInputChange(
                                  index,
                                  "company",
                                  e.target.value
                                )
                              }
                              // validate={validateworkName}
                            />
                            {errors.education?.[index]?.company &&
                              touched.education?.[index]?.company && (
                                <div className="invalid-feedback d-block">
                                  {errors.education[index].company}
                                </div>
                              )}
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
                              required
                              className="form-control"
                              value={works.jobTitle}
                              onChange={(e) =>
                                handleWorkInputChange(
                                  index,
                                  "jobTitle",
                                  e.target.value
                                )
                              }
                              // validate={validatePackageTopic}
                            />
                            {errors.education?.[index]?.jobTitle &&
                              touched.education?.[index]?.jobTitle && (
                                <div className="invalid-feedback d-block">
                                  {errors.education[index].jobTitle}
                                </div>
                              )}
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col md={6}>
                          <FormGroup>
                            <Label for={`education[${index}].employmentType`}>
                              Employment type*
                            </Label>
                            <Input
                              type="select"
                              name={`education[${index}].employmentType`}
                              id={`education[${index}].employmentType`}
                              className="form-control"
                              value={works.employmentType}
                              required
                              onChange={(e) =>
                                handleWorkInputChange(
                                  index,
                                  "employmentType",
                                  e.target.value
                                )
                              }
                            >
                              <option key="" value="" disabled>
                                Select Employment type
                              </option>
                              {EmploymentTypeData.map((option, i) => (
                                // eslint-disable-next-line react/no-array-index-key
                                <option key={i} value={option.label}>
                                  {option.label}
                                </option>
                              ))}
                            </Input>

                            {errors.education?.[index]?.employmentType &&
                              touched.education?.[index]?.employmentType && (
                                <div className="invalid-feedback d-block">
                                  {errors.education[index].employmentType}
                                </div>
                              )}
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
                              required
                              value={works.jobLocation}
                              onChange={(e) =>
                                handleWorkInputChange(
                                  index,
                                  "jobLocation",
                                  e.target.value
                                )
                              }
                              // validate={validatePackageDescription}
                            />
                            {errors.education?.[index]?.jobLocation &&
                              touched.education?.[index]?.jobLocation && (
                                <div className="invalid-feedback d-block">
                                  {errors.education[index].jobLocation}
                                </div>
                              )}
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <FormGroup>
                            <Label for={`education[${index}].startDate`}>
                              Start year
                            </Label>
                            {/* <Input
                            type="number"
                            name={`education[${index}].startDate`}
                            id={`education[${index}].startDate`}
                            className="form-control"
                            value={works.startDate}
                            onChange={(e) =>
                              handleWorkInputChange(
                                index,
                                "startDate",
                                e.target.value
                              )
                            }
                              // validate={validatePackageDescription}
                          /> */}
                            <Input
                              type="select"
                              name={`education[${index}].startDate`}
                              id={`education[${index}].startDate`}
                              className="form-control"
                              value={works.startDate}
                              required
                              onChange={(e) =>
                                handleWorkInputChange(
                                  index,
                                  "startDate",
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

                            {errors.education?.[index]?.startDate &&
                              touched.education?.[index]?.startDate && (
                                <div className="invalid-feedback d-block">
                                  {errors.education[index].startDate}
                                </div>
                              )}
                          </FormGroup>
                        </Col>
                        <Col>
                          <FormGroup>
                            <Label for={`education[${index}].endDate`}>
                              End year
                            </Label>
                            <Input
                              type="select"
                              name={`education[${index}].endDate`}
                              id={`education[${index}].endDate`}
                              className="form-control"
                              value={works.endDate}
                              required
                              onChange={(e) =>
                                handleWorkInputChange(
                                  index,
                                  "endDate",
                                  parseInt(e.target.value, 10)
                                )
                              }
                              // validate={validatePackageDescription}
                            >
                              <option disabled value="">
                                Select year
                              </option>
                              {years.map((yr) => (
                                <option key={yr} value={yr}>
                                  {currentYear === yr ? "Present" : yr}
                                </option>
                              ))}
                            </Input>
                            {errors.education?.[index]?.endDate &&
                              touched.education?.[index]?.endDate && (
                                <div className="invalid-feedback d-block">
                                  {errors.education[index].endDate}
                                </div>
                              )}
                          </FormGroup>
                        </Col>
                      </Row>

                      <hr />
                    </div>
                  ))}

                  <Card
                    onClick={addWorkExperience}
                    className="p-3 text-center my-5"
                    style={{ cursor: "pointer" }}
                  >
                    <h3 className="font-weight-bold text-primary">
                      + Add more work experience
                    </h3>
                  </Card>
                  <Row>
                    {" "}
                    <Col>
                      {" "}
                      <Button color="primary" onClick={handlePrevStep}>
                        Previous
                      </Button>
                    </Col>
                    <Col className="text-right">
                      <Button
                        color="primary"
                        type="submit"
                        className={`btn-shadow btn-multiple-state ${
                          profileLoading ? "show-spinner" : ""
                        }`}
                      >
                        <span className="spinner d-inline-block">
                          <span className="bounce1" />
                          <span className="bounce2" />
                          <span className="bounce3" />
                        </span>
                        <span className="label">Next</span>
                      </Button>
                    </Col>
                  </Row>
                </Form>
              )}
            </Formik>
          )}
          {currentStep === 2 && (
            <Formik
              innerRef={forms[2]}
              initialValues={{
                // skills: [],
                bio: "",
                seekingFor: "",
                // certifications: [],
                goal: "",
              }}
              onSubmit={(values) => {
                const data = {
                  ...values,
                  skills: skillsTag,
                  certifications: certificationsTag,
                };
                postAboutData(data);
              }}
              validateOnMount
            >
              {({ errors, touched }) => (
                <Form className="av-tooltip tooltip-label-right">
                  <Alert color="primary">
                    <strong>Almost there!</strong> <br /> You&apos;re just one
                    last step away from being a user and connecting with
                    mentors,lawyers,alumni all over the world! in this step,
                    shows off your accomplishments and how you can help others.
                    <br />
                    <br /> Many of these fields are optional, but will help us
                    get better insights into your work - and therefore
                    exponentially increase your chances. They also give you a
                    jumpstart once you&apos;re a user.
                  </Alert>
                  <FormGroup>
                    <Row>
                      <Col md={12}>
                        <FormGroup>
                          <Label for="skills">Skills*</Label>

                          <TagsInput
                            required
                            value={skillsTag}
                            onChange={handleTagsChange}
                            inputProps={{ placeholder: "Add skills " }}
                            addOnBlur
                            addKeys={[13, 188]}
                          />

                          <FormText>
                            Add skill and press Enter or Comma{" "}
                          </FormText>
                          <FormText color="muted">
                            Describe your expertise to connect with mentors who
                            have similar interests.
                            <br />
                            {/* Comma-separated list of your skills  */}
                            (keep it below 10). Mentors will use this to find
                            you.
                          </FormText>
                        </FormGroup>
                      </Col>
                    </Row>
                  </FormGroup>
                  <FormGroup>
                    <Row>
                      <Col md={6}>
                        <Label for="introVideo">Bio*</Label>
                        <Field
                          required
                          type="textarea"
                          name="bio"
                          id="bio"
                          className="form-control"
                        />
                      </Col>
                      <Col md={6}>
                        <Label for="featuredArticle">Seeking for*</Label>
                        <Field
                          required
                          type="text"
                          name="seekingFor"
                          id="seekingFor"
                          className="form-control"
                        />
                      </Col>
                    </Row>
                  </FormGroup>
                  <FormGroup>
                    <Label for="skills">Certifications*</Label>

                    {/* <TagsInput
                      value={certificationsTag}
                      onChange={handleCertificationsChange}
                      inputProps={{ placeholder: "Add Certification " }}
                      // validate={validateSkills}
                    /> */}
                    <TagsInput
                      value={certificationsTag}
                      onChange={handleCertificationsChange}
                      renderInput={({ addTag, ...inputProps }) => {
                        const { onChange, value, ...other } = inputProps;
                        return (
                          <input
                            {...other}
                            value={certificateInputValue}
                            onChange={(e) =>
                              handleCertificateChangeInput(e.target.value)
                            }
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                handleAddCertificateTag();
                                e.preventDefault();
                              }
                            }}
                            placeholder="Add Certification"
                          />
                        );
                      }}
                    />
                    <FormText>
                      Add Certification and press Enter or Comma{" "}
                    </FormText>
                  </FormGroup>
                  <FormGroup>
                    <Label>Goal*</Label>
                    <Field
                      as="textarea"
                      name="goal"
                      id="goal"
                      className="form-control"
                      validate={validateAchievement}
                      autoComplete="off"
                    />
                    {errors.goal && touched.goal && (
                      <div className="invalid-feedback d-block">
                        {errors.goal}
                      </div>
                    )}
                  </FormGroup>
                  <Row>
                    {" "}
                    <Col>
                      {" "}
                      <Button color="primary" onClick={handlePrevStep}>
                        Previous
                      </Button>
                    </Col>
                    <Col className="text-right">
                      <Button
                        color="primary"
                        type="submit"
                        className={`btn-shadow btn-multiple-state ${
                          experienceLoading ? "show-spinner" : ""
                        }`}
                      >
                        <span className="spinner d-inline-block">
                          <span className="bounce1" />
                          <span className="bounce2" />
                          <span className="bounce3" />
                        </span>
                        <span className="label">Submit</span>
                      </Button>
                    </Col>
                  </Row>
                </Form>
              )}
            </Formik>
          )}
          {loading ? (
            <div className="wizard-basic-step text-center pt-3">
              <Spinner color="primary" className="mb-1" />
              <p>Submitting</p>
            </div>
          ) : (
            <>
              {currentStep === 3 && (
                <Row>
                  <Colxx xxs="12" className="mb-4">
                    <Card>
                      <CardBody className="text-center">
                        <i
                          alt=""
                          className="glyph-icon iconsminds-yes text-success"
                          style={{ fontSize: "75px" }}
                        />
                        <Jumbotron className="text-center">
                          <h1 className="display-4">Submitted Successfully!</h1>
                          <p className="lead">We will reach you shortly</p>
                          <hr className="my-4" />
                          <p className="lead mb-0">
                            <Button
                              color="primary"
                              size="lg"
                              onClick={handleDashboardClick}
                            >
                              Dashboard
                            </Button>
                          </p>
                        </Jumbotron>
                      </CardBody>
                    </Card>
                  </Colxx>
                </Row>
              )}
            </>
          )}
        </div>
      </CardBody>
    </Card>
  );
};

export default injectIntl(ApplyAsMentor);
