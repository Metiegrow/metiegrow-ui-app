/* eslint-disable no-param-reassign */

import React, { createRef, useEffect, useState } from "react";
import {
  Card,
  CardBody,
  FormGroup,
  Label,
  NavLink,
  Button,
  Row,
  Col,
  Alert,
  Input,
  InputGroup,
  FormText,
  Jumbotron,
  Spinner,
} from "reactstrap";
import { injectIntl } from "react-intl";
import { Colxx } from "components/common/CustomBootstrap";
import Select from "react-select";
import { Formik, Form, Field } from "formik";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { NotificationManager } from "components/common/react-notifications";
import { SliderTooltip } from "components/common/SliderTooltips";
// import { FormikTagsInput } from "containers/form-validations/FormikFields";
import TagsInput from "react-tagsinput";
import "react-tagsinput/react-tagsinput.css";
import { adminRoot, baseUrl } from "constants/defaultValues";
import {
  validateCategory,
  validateLocation,
  validateCompany,
  validateJobTitle,
  validateSkills,
  validateBio,
  // validateLinkedinUrl,
  validateReasonForMentor,
  validateAchievement,
  // validateFile,
} from "./validation";

import country from "./Country";
import CategoryData from "./CategoryData";
import language from "./Languages";
import ToasterComponent from "../notifications/ToasterComponent";

const ApplyAlumni = () => {
  const forms = [createRef(null), createRef(null), createRef(null)];
  const steps = ["About you", "profile", "Experience"];
  const [currentStep, setCurrentStep] = useState(0);
  const [file1, setFile1] = useState(null);
  const [amount, setAmount] = useState(500);
  const [loading, setLoading] = useState(false);
  const [skillsTag, setSkillsTag] = useState([]);
  const [toolsTag, setToolsTag] = useState([]);
  const [imageError, setImageError] = useState(false);
  const [skillError, setSkillError] = useState(false);
  const [imageErrorMessage, setImageErrorMessage] = useState(null);
  const [skillErrorMessage, setSkillErrorMessage] = useState(null);
  const [languages, setLanguages] = useState([]);
  const [aboutLoading, setAboutLoading] = useState(false);
  const [profileLoading, setProfileLoading] = useState(false);
  const [experienceLoading, setExperienceLoading] = useState(false);
  const [aboutField, setAboutField] = useState({
    image: "",
  });
  const [selectedFile, setSelectedFile] = useState(null);
  useEffect(() => {
    const status = localStorage.getItem("status");
    console.log("status", status);
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

  const [fields] = useState({
    image: "",

    jobTitle: "",
    company: "",
    location: "",
    category: "",
    skills: [],
    bio: "",
    linkedinUrl: "",
    twitterHandle: "",
    website: "",
    introVideo: "",
    featuredArticle: "",
    reasonForMentor: "",
    achievement: "",
  });

  // const CategoryData = [
  //   "Select Category",
  //   "Engineering & Data",
  //   "UX & Design",
  //   "Business & Management",
  //   "Product & Marketing",
  // ];
  //   console.log("step", currentStep);
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
      };

      reader.readAsDataURL(file);
    }
  };
  //   const mentorAboutUrl=`${baseUrl}/api/mentor/details/about`;
  //   const mentorAboutUrl="http://localhost:3001/acheckabout";alumni
  const mentorAboutUrl = `${baseUrl}/api/alumni/alumnidetails/about`;
  const mentorProfileUrl = `${baseUrl}/api/alumni/alumnidetails/profile`;
  const experienceUrl = `${baseUrl}/api/alumni/alumnidetails/experience`;
  function getTokenRes() {
    return localStorage.getItem("tokenRes");
  }
  const token = getTokenRes();

  const postDataAbout = async (data) => {
    setAboutLoading(true);
    const formData = new FormData();
    formData.append("image", file1);

    const mentorProfile = {
      jobTitle: data.jobTitle,
      company: data.company,
      location: data.location,
      linkedinUrl: data.linkedinUrl,
      twitterHandle: data.twitterHandle,
      language: data.language,
    };
    formData.append(
      "mentorProfile",
      new Blob([JSON.stringify(mentorProfile)], { type: "application/json" })
    );

    try {
      const response = await axios.post(mentorAboutUrl, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // setNextStep(true)
      setAboutLoading(false);
      //   console.log(`resres ${response.status}`);
      ToasterComponent("success", response.data.statuses);
      handleNextStep();
      localStorage.setItem("status", "1");
    } catch (error) {
      setImageError(false);
      // console.error(error);
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
          "something went wrong",
          "Oops!",
          3000,
          null,
          null,
          ""
        );
      }
      // console.log("er",error.response.data.statuses)
      // NotificationManager.warning(
      //   "Something went wrong",
      //   "Oops!",
      //   3000,
      //   null,
      //   null,
      //   ""
      // );
    }
  };

  const postDataProfile = async (data) => {
    setProfileLoading(true);
    try {
      const response = await axios.post(mentorProfileUrl, data, {
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
      setSkillError(false);
      setProfileLoading(false);
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
          if (status.code === 40110) {
            setSkillErrorMessage(status.message);
            setSkillError(true);
          }
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

  const postDataExperience = async (data) => {
    setExperienceLoading(true);
    const postDataExp = { ...data, price: amount };
    try {
      const response = await axios.post(experienceUrl, postDataExp, {
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

  const handleSliderChange = (value) => {
    setAmount(value);
  };

  // useEffect(() => {
  //   axios.get(mentorAboutUrl).then((response) => {
  //     console.log("reslog", response.data);
  //     // setLoading(false);
  //   });
  // }, [currentStep]);

  const handleTagsChange = (newSkills) => {
    setSkillError(false);
    setSkillsTag(newSkills);
  };
  const handleToolsTagsChange = (newTools) => {
    setSkillError(false);
    setToolsTag(newTools);
  };
  const history = useHistory();
  const handleMySlotsClick = () =>
    history.push(`${adminRoot}/calendar/mentor/appointment`);

  return (
    <Card className="mx-auto my-4 " style={{ maxWidth: "900px" }}>
      <CardBody className="wizard wizard-default">
        <h1 className="mt-4 font-weight-bold">Apply as a mentor</h1>
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
              innerRef={forms[0]}
              initialValues={{
                jobTitle: fields.jobTitle,
                company: fields.company,
                location: fields.location,
                linkedinUrl: fields.linkedinUrl,
                twitterHandle: fields.twitterHandle,
              }}
              validateOnMount
              onSubmit={(values) => {
                // postDataAbout(values,aboutField.image);
                postDataAbout({ ...values, language: languages });

                // console.log(aboutField.image);
              }}
            >
              {({ errors, touched }) => (
                <Form className="av-tooltip tooltip-label-right ">
                  <Alert color="primary">
                    <strong>Lovely to see you!</strong>
                    <br /> Filling out the form only takes a couple of minutes.
                    We&apos;d love to learn more about your background and the
                    ins-and-outs of why you&apos;d like to become a mentor. Keep
                    things personal and talk directly to us and your mentees. We
                    don&apos;t need jargon and polished cover letters here!{" "}
                    <br />
                    <br />
                    You agree to our code of conduct and the mentor agreement by
                    sending the form, so be sure to have a look at those.
                  </Alert>
                  <FormGroup>
                    <Label for="image">Image*</Label>
                    {imageError && (
                      <div className="invalid-feedback d-block">
                        {imageErrorMessage}
                      </div>
                    )}
                    <Row>
                      <Col md={2} className="">
                        <img
                          src={
                            selectedFile || "/assets/img/profiles/l-1.jpg"
                            // "https://gogo-react.coloredstrategies.com/assets/img/profiles/l-1.jpg"
                          }
                          className="mx-2 rounded-circle img-thumbnail border"
                          style={{
                            width: "70px",
                            height: "70px",
                            objectFit: "cover",
                          }}
                          alt="img"
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
                            {/* <Form> */}
                            <Input
                              id="file-upload"
                              type="file"
                              className="form-control d-none"
                              onChange={handleFileChange}
                              // validate={validateFile}
                            />
                            {/* </Form> */}
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

                  <Row>
                    <Col md={6}>
                      <FormGroup className="error-l-75">
                        <Label>Job Title*</Label>
                        <Field
                          className="form-control"
                          type="text"
                          name="jobTitle"
                          validate={validateJobTitle}
                          autoComplete="off"
                        />
                        {errors.jobTitle && touched.jobTitle && (
                          <div className="invalid-feedback d-block">
                            {errors.jobTitle}
                          </div>
                        )}
                      </FormGroup>
                    </Col>
                    <Col md={6}>
                      <FormGroup className="error-l-75">
                        <Label>Company*</Label>
                        <Field
                          className="form-control"
                          type="text"
                          name="company"
                          validate={validateCompany}
                          autoComplete="off"
                        />
                        {errors.company && touched.company && (
                          <div className="invalid-feedback d-block">
                            {errors.company}
                          </div>
                        )}
                      </FormGroup>
                    </Col>
                  </Row>
                  <FormGroup className="error-l-75">
                    <Label>Location*</Label>
                    <Field
                      as="select"
                      name="location"
                      validate={validateLocation}
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
                    </Field>
                    {errors.location && touched.location && (
                      <div className="invalid-feedback d-block">
                        {errors.location}
                      </div>
                    )}
                  </FormGroup>

                  <FormGroup className="error-l-125">
                    <Row>
                      <Col md={6}>
                        <Label for="linkedinUrl">LinkedIn URL*</Label>
                        <Field
                          className="form-control"
                          name="linkedinUrl"
                          type="url"
                          // validate={validateLinkedinUrl}
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
                        <FormText color="muted" className="">
                          Omit the &ldquo;@&rdquo; -e.g. &ldquo;dqmonn&rdquo;
                        </FormText>
                        {/* {errors.twitterHandle && touched.twitterHandle && (
                        <div className="invalid-feedback d-block">
                          {errors.twitterHandle}
                        </div>
                      )} */}
                      </Col>
                    </Row>
                  </FormGroup>
                  <FormGroup className="error-l-75">
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
                    >
                      {/* <option disabled value="">
                              Select Languages
                            </option>
                          {language.map((option) => (
                            <option key={option.iso_code} value={option.iso_code}>
                              {option.name}
                            </option>
                          ))} */}
                    </Select>
                    {/* {errors.languages && touched.languages && (
                          <div className="invalid-feedback d-block">
                            {errors.languages}
                          </div>
                        )} */}
                  </FormGroup>
                  <Row>
                    <Col className="text-center">
                      <Button
                        color="primary"
                        type="submit"
                        className={`btn-shadow btn-multiple-state ${
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
                    </Col>
                  </Row>
                </Form>
              )}
            </Formik>
          )}
          {currentStep === 1 && (
            <Formik
              innerRef={forms[1]}
              initialValues={{
                category: fields.category,
                skills: fields.skills,
                bio: fields.bio,
                // linkedinUrl: fields.linkedinUrl,
                // twitterHandle: fields.twitterHandle,
                website: fields.website,
              }}
              onSubmit={(values) => {
                const profileData = {
                  ...values,
                  skills: skillsTag,
                  tools: toolsTag,
                };
                postDataProfile(profileData);
              }}
              validateOnMount
            >
              {({
                errors,
                touched,
                // values,
                // setFieldValue,
                // setFieldTouched,
              }) => (
                <Form className="av-tooltip tooltip-label-right">
                  <FormGroup className="error-l-75">
                    <Label>Category*</Label>
                    <Field
                      as="select"
                      name="category"
                      validate={validateCategory}
                      className="form-control"
                    >
                      <option disabled value="">
                        Select Category
                      </option>
                      {CategoryData.map((option) => (
                        <option key={option.short} value={option.short}>
                          {option.name}
                        </option>
                      ))}
                    </Field>
                    {errors.category && touched.category && (
                      <div className="invalid-feedback d-block">
                        {errors.category}
                      </div>
                    )}
                  </FormGroup>

                  <FormGroup>
                    <Label for="skills">Skills*</Label>
                    {/* <Field
                      type="text"
                      name="skills"
                      id="skills"
                      className="form-control"
                      placeholder="Enter your skills (comma-separated)"
                      validate={validateSkills}
                      onChange={(e) => {
                        const skillArray = e.target.value
                          .split(",")
                          .map((skill) => skill.trim());
                        setFieldValue("skills", skillArray);
                      }}
                      autoComplete="off"
                    /> */}

                    <TagsInput
                      value={skillsTag}
                      onChange={handleTagsChange}
                      inputProps={{ placeholder: "Add skills " }}
                      validate={validateSkills}
                    />
                    {skillError && (
                      <div className="invalid-feedback d-block">
                        {skillErrorMessage}
                      </div>
                    )}
                    <FormText>Add skill and press Enter </FormText>
                    <FormText color="muted">
                      Describe your expertise to connect with mentees who have
                      similar interests.
                      <br />
                      {/* Comma-separated list of your skills  */}
                      (keep it below 10). Mentees will use this to find you.
                    </FormText>
                  </FormGroup>
                  <FormGroup>
                    <Label for="tools">Tools*</Label>

                    <TagsInput
                      value={toolsTag}
                      onChange={handleToolsTagsChange}
                      inputProps={{ placeholder: "Add Tools " }}
                      // validate={validateSkills}
                    />
                    {skillError && (
                      <div className="invalid-feedback d-block">
                        {/* {skillErrorMessage} */}
                        Required
                      </div>
                    )}
                    <FormText>Add Tools and press Enter </FormText>
                  </FormGroup>

                  <FormGroup>
                    <Label for="bio">Bio*</Label>
                    <Field
                      as="textarea"
                      name="bio"
                      id="bio"
                      className="form-control"
                      validate={validateBio}
                      autoComplete="off"
                    />
                    {errors.bio && touched.bio && (
                      <div className="invalid-feedback d-block">
                        {errors.bio}
                      </div>
                    )}
                    <FormText color="muted">
                      Tell us (and your mentees) a little bit about yourself.
                      Talk about yourself in the first person, as if you&apos;d
                      directly talk to a mentee. This will be public.
                    </FormText>
                  </FormGroup>
                  {/* <FormGroup className="error-l-125">
                    <Row>
                      <Col md={6}>
                        <Label for="linkedinUrl">LinkedIn URL*</Label>
                        <Field
                          className="form-control"
                          name="linkedinUrl"
                          type="url"
                          // validate={validateLinkedinUrl}
                          autoComplete="off"
                        />
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
                        {errors.twitterHandle && touched.twitterHandle && (
                        <div className="invalid-feedback d-block">
                          {errors.twitterHandle}
                        </div>
                      )}
                      </Col>
                    </Row>
                  </FormGroup> */}
                  <FormGroup>
                    <Label for="website">Personal Website (optional)</Label>
                    <Field
                      type="url"
                      name="website"
                      id="website"
                      className="form-control"
                      autoComplete="off"
                    />
                    <FormText color="muted">
                      You can add your blog, GitHub profile or similar here
                    </FormText>
                    {/* {errors.website && touched.website && (
                    <div className="invalid-feedback d-block">
                      {errors.website}
                    </div>
                  )} */}
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
                introVideo: fields.introVideo,
                featuredArticle: fields.featuredArticle,
                reasonForMentor: fields.reasonForMentor,
                achievement: fields.achievement,
              }}
              onSubmit={(values) => {
                postDataExperience(values);
              }}
              validateOnMount
            >
              {({ errors, touched }) => (
                <Form className="av-tooltip tooltip-label-right">
                  <Alert color="primary">
                    <strong>Almost there!</strong> <br /> You&apos;re just one
                    last step away from being a mentor and connecting with
                    mentees all over the world! in this step, shows off your
                    accomplishments and how you can help others.
                    <br />
                    <br /> Many of these fields are optional, but will help us
                    get better insights into your work - and therefore
                    exponentially increase your chances. They also give you a
                    jumpstart once you&apos;re a mentor.
                  </Alert>
                  {/* <FormGroup>
                    <Row>
                      <Col md={12}>
                        <FormGroup className="error-l-75">
                          <Label>6 month price*</Label>

                          <SliderTooltip
                            min={2000}
                            max={100000}
                            defaultValue={500}
                            className="mb-5"
                            step={500}
                            value={amount}
                            onChange={handleSliderChange}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </FormGroup>
                  <FormGroup>
                    <Row>
                      <Col md={12}>
                        <FormGroup className="error-l-75">
                          <Label>3 month price*</Label>

                          <SliderTooltip
                            min={1000}
                            max={100000}
                            defaultValue={500}
                            className="mb-5"
                            step={500}
                            value={amount}
                            onChange={handleSliderChange}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </FormGroup> */}
                  <FormGroup>
                    <Row>
                      <Col md={12}>
                        <FormGroup className="error-l-75">
                          <Label>Amount*</Label>

                          <SliderTooltip
                            min={500}
                            max={100000}
                            defaultValue={500}
                            className="mb-5"
                            step={500}
                            value={amount}
                            onChange={handleSliderChange}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </FormGroup>
                  <FormGroup>
                    <Row>
                      <Col md={6}>
                        <Label for="introVideo">Intro Video (Optional)</Label>
                        <Field
                          type="url"
                          name="introVideo"
                          id="introVideo"
                          className="form-control"
                          autoComplete="off"
                        />
                        <FormText color="muted">
                          Add a youTube video or record a Loom for your future
                          mentees
                        </FormText>
                        {/* {errors.introvideo && touched.introvideo && (
                    <div className="invalid-feedback d-block">
                      {errors.introvideo}
                    </div>
                    )} */}
                      </Col>
                      <Col md={6}>
                        <Label for="featuredArticle">
                          Featured Article (Optional)
                        </Label>
                        <Field
                          type="url"
                          name="featuredArticle"
                          id="featuredArticle"
                          className="form-control"
                          autoComplete="off"
                        />
                        <FormText color="muted">
                          Link an interview / podcast / piece of writing you are
                          proud of or were featured in.
                        </FormText>
                      </Col>
                    </Row>
                  </FormGroup>
                  <FormGroup>
                    <Label>
                      Why do you want to become a mentor?(Not publicly visible)*
                    </Label>
                    <Field
                      as="textarea"
                      name="reasonForMentor"
                      id="reasonForMentor"
                      className="form-control"
                      validate={validateReasonForMentor}
                      autoComplete="off"
                    />
                    {errors.reasonForMentor && touched.reasonForMentor && (
                      <div className="invalid-feedback d-block">
                        {errors.reasonForMentor}
                      </div>
                    )}
                  </FormGroup>
                  <FormGroup>
                    <Label>
                      What, in your opinion, has been your greatest achievement
                      so far?(Not publicly visible)*
                    </Label>
                    <Field
                      as="textarea"
                      name="achievement"
                      id="achievement"
                      className="form-control"
                      validate={validateAchievement}
                      autoComplete="off"
                    />
                    {errors.achievement && touched.achievement && (
                      <div className="invalid-feedback d-block">
                        {errors.achievement}
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
                              onClick={() => handleMySlotsClick()}
                            >
                              My slots
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

export default injectIntl(ApplyAlumni);
