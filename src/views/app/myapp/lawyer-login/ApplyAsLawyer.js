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
//   Tooltip,
//   PopoverBody,
} from "reactstrap";
import { injectIntl } from "react-intl";
import { Colxx } from "components/common/CustomBootstrap";
import Select from "react-select";
import { Formik, Form, Field } from "formik";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { SliderTooltip } from "components/common/SliderTooltips";
import TagsInput from "react-tagsinput";
import "react-tagsinput/react-tagsinput.css";
import { adminRoot, baseUrl } from "constants/defaultValues";
import {
    validateLanguages,
    validateLocation,
    validatePackageTopic,
    validatePackageDescription,
    validateAbout,
    validateBio,
    validateServiceName,
    validateFile,
  } from "./ValidationsPart";

import country from "../my-login/Country";
import language from "../my-login/Languages";
import ToasterComponent from "../notifications/ToasterComponent";

const ApplyAsLawyer = () => {
  const forms = [createRef(null), createRef(null), createRef(null)];
  const steps = ["About you", "profile", "Services"];
  const [currentStep, setCurrentStep] = useState(0);
  const [file1, setFile1] = useState(null);
  const [topicsTag, setTopicsTag] = useState([]);
  const [loading, setLoading] = useState(false);
  const [AboutLoading, setAboutLoading] = useState(false);
  const [profileLoading, setProfileLoading] = useState(false);
  const [servicesLoading, setServicesLoading] = useState(false);

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
      } else {
        setCurrentStep(0);
      }
    }
  }, []);

  const [fields] = useState({
    image: "",
    headline: "",
    topics: [],
    serviceName: "",
    title: "",
    description: "",
    location: "",
    bio: "",
    languages: [],
    about: "",
  });

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

      reader.onloadend = () => {
        const base64Image = reader.result;
        setSelectedFile(base64Image);
        setAboutField({ ...aboutField, image: base64Image });
      };

      reader.readAsDataURL(file);
    }
  };
  const [services, setServices] = useState([
    { serviceName: "", headline: "", description: "", amount: 1000 },
  ]);

  const addService = () => {
    setServices([
      ...services,
      { serviceName: "", headline: "", description: "", amount: 1000 },
    ]);
  };

  const lawyerAboutUrl = `${baseUrl}/api/lawyer/about`;
  const lawyerProfileUrl = `${baseUrl}/api/lawyer/profile`;
  const packageUrl = `${baseUrl}/api/lawyer/services`;
  const lawyerImagePostUrl = `${baseUrl}/api/lawyer/lawyer-profile-images`;

  function getTokenRes() {
    return localStorage.getItem("tokenRes");
  }
  const token = getTokenRes();

  const postImageData = async () => {
    try {
      const formData = new FormData();
      formData.append("image", file1);

      await axios.post(lawyerImagePostUrl, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // console.log(`resres ${response.status}`);
    } catch (error) {
      console.error(error);
    }
  };

  const postDataAbout = async (data) => {
    setAboutLoading(true);
    try {
      const response = await axios.post(lawyerAboutUrl, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAboutLoading(false);
      ToasterComponent('success', response.data.statuses);
      handleNextStep();
      localStorage.setItem('status', "1");
      // console.log(`resres ${response.status}`);
    } catch (error) {
      setAboutLoading(false);
      if (error.response) {
        ToasterComponent("error", error.response.data.statuses);
      }
      console.error(error);
    }
  };

  const postDataProfile = async (data) => {
    setProfileLoading(true);
    try {
      const response = await axios.post(lawyerProfileUrl, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProfileLoading(false);
      ToasterComponent('success', response.data.statuses);
      handleNextStep();
      localStorage.setItem('status', "3");
      // console.log(`resres ${response.status}`);
    } catch (error) {
      setProfileLoading(false);
      if (error.response) {
        ToasterComponent("error", error.response.data.statuses);
      }
      console.error(error);
    }
  };

  const handleTopicsTagsChange = (newTopics) => {
    setTopicsTag(newTopics);
  };

  const removeService = (index) => {
    const newServices = [...services];
    newServices.splice(index, 1);
    setServices(newServices);
  };

  const handleInputChange = (index, field, value) => {
    setServices((prevServices) =>
      prevServices.map((service, i) =>
        i === index ? { ...service, [field]: value } : service
      )
    );
  };
  const postServices = async (services1) => {
    setServicesLoading(true);
    try {
      const response = await axios.post(packageUrl, services1, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setServicesLoading(false);
      ToasterComponent('success', response.data.statuses);
      handleNextStep();
      localStorage.setItem('status', "7");
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 3000);
      // console.log(response.data);
    } catch (error) {
      setServicesLoading(false)
      if (error.response) {
        ToasterComponent("error", error.response.data.statuses);
      }
      console.error(error);
    }
  };
  const history = useHistory();

  const handleJobsListClick = () => history.push(`${adminRoot}/jobslist`);
//   const [tooltipOpen, setTooltipOpen] = useState(false);

  return (
    <Card className="mx-auto my-4 " style={{ maxWidth: "900px" }}>
      <CardBody className="wizard wizard-default">
        <h1 className="mt-4 font-weight-bold">Apply as a Lawyer</h1>
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
                // firstName: fields.firstName,
                // lastName: fields.lastName,
                location: fields.location,
                languages: fields.languages,
              }}
              validateOnMount
              onSubmit={(values) => {
                postDataAbout(values);
                postImageData();

                // console.log(aboutField.image);
              }}
            >
              {({ setFieldValue, errors, touched }) => (
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
                          {errors.image && touched.image && (
                            <div className="invalid-feedback d-block">
                              {errors.image}
                            </div>
                          )}
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
                              validate={validateFile}
                            />
                            {/* </Form> */}
                            {file1 && (
                              <p className="mt-2">
                                Selected file: {file1.name}
                              </p>
                            )}
                            {errors.image && touched.image && (
                              <div className="invalid-feedback d-block">
                                {errors.image}
                              </div>
                            )}
                          </div>
                        </InputGroup>
                      </Col>
                    </Row>
                  </FormGroup>
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
                  <FormGroup className="error-l-75">
                    <Label>Languages known*</Label>
                    <Select
                      placeholder="Select Languages"
                      name="languages"
                      isMulti
                      options={languageOptions}
                      validate={validateLanguages}
                      className="react-select"
                      classNamePrefix="react-select"
                      onChange={(selectedOptions) => {
                        const languagesArray = selectedOptions
                          ? selectedOptions.map((option) => option.value)
                          : [];
                        setFieldValue("languages", languagesArray);
                      }}
                    />
                    {errors.languages && touched.languages && (
                      <div className="invalid-feedback d-block">
                        {errors.languages}
                      </div>
                    )}
                  </FormGroup>
                  <Row>
                    <Col className="text-center">
                      <Button color="primary" type="submit" className={`btn-shadow btn-multiple-state ${
                      AboutLoading ? "show-spinner" : ""
                    }`}>
                      <span className="spinner d-inline-block">
                      <span className="bounce1" />
                      <span className="bounce2" />
                      <span className="bounce3" />
                    </span>
                    <span className="label">
                      Next
                    </span>
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
                bio: fields.bio,
                about: fields.about,
              }}
              onSubmit={(values) => {
                const profileData = { ...values, topics: topicsTag };
                postDataProfile(profileData);
              }}
              validateOnMount
            >
              {({ errors, touched }) => (
                <Form className="av-tooltip tooltip-label-right">
                  <FormGroup>
                    <Label for="topics">Topics*</Label>

                    <TagsInput
                      value={topicsTag}
                      onChange={handleTopicsTagsChange}
                      inputProps={{ placeholder: "Add topics " }}
                    />
                    {errors.topics && touched.topics && (
                      <div className="invalid-feedback d-block">
                        {errors.topics}
                      </div>
                    )}
                    <FormText color="muted">
                      Describe your expertise to connect with mentees who have
                      similar interests.
                      <br />
                      Comma-separated list of your skills (keep it below 10).
                      Mentees will use this to find you.
                    </FormText>
                  </FormGroup>
                  <FormGroup>
                    <Label for="bio">Bio*</Label>
                    <Field
                      name="bio"
                      id="bio"
                      className="form-control"
                      validate={validateBio}
                    />
                    {errors.bio && touched.bio && (
                      <div className="invalid-feedback d-block">
                        {errors.bio}
                      </div>
                    )}
                  </FormGroup>
                  <FormGroup>
                    <Label for="about">About*</Label>
                    <Field
                      as="textarea"
                      name="about"
                      id="about"
                      className="form-control"
                      validate={validateAbout}
                    />
                    {errors.about && touched.about && (
                      <div className="invalid-feedback d-block">
                        {errors.about}
                      </div>
                    )}
                    <FormText color="muted">
                      Tell us (and your mentees) a little bit about yourself.
                      Talk about yourself in the first person, as if you&apos;d
                      directly talk to a mentee. This will be public.
                    </FormText>
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
                      <Button color="primary" type="submit" className={`btn-shadow btn-multiple-state ${
                      profileLoading ? "show-spinner" : ""
                    }`}>
                      <span className="spinner d-inline-block">
                      <span className="bounce1" />
                      <span className="bounce2" />
                      <span className="bounce3" />
                    </span>
                    <span className="label">
                      Next
                    </span>
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
                services: [
                  {
                    serviceName: "",
                    headline: "",
                    description: "",
                    amount: 1000,
                  },
                ],
              }}
              onSubmit={() => {
                postServices(services);
                // console.log("my services", services);
                // console.log("values", values);
              }}
              validateOnMount
            >
              {({ errors, touched }) => (
                <Form className="av-tooltip tooltip-label-right my-4">
                  <Alert color="primary">
                    <strong>Almost there!</strong> <br /> You&apos;re just one
                    last step away from being a lawyer and connecting with
                    mentees all over the world! In this step, show off your
                    accomplishments and how you can help others.
                    <br />
                    <br /> Many of these fields are optional, but will help us
                    get better insights into your work - and therefore
                    exponentially increase your chances. They also give you a
                    jumpstart once you&apos;re a lawyer.
                  </Alert>

                  {services.map((service, index) => (
                    // eslint-disable-next-line react/no-array-index-key
                    <div key={index}>
                      <div className="text-right">
                        {/* <Button outline className="icon-button" onClick={() => removeService(index)}>
                        <i className="simple-icon-close" />
                      </Button> */}
                    {services.length > 1 && (
                        <span>
                          <Button
                            id="closeButton"
                            color="primary"
                            outline
                            className="icon-button"
                            onClick={() => removeService(index)}
                          >
                            <i className="iconsminds-close" />
                          </Button>
                          {/* <Tooltip
                            placement="left"
                            isOpen={tooltipOpen}
                            target="closeButton"
                            toggle={() => setTooltipOpen(!tooltipOpen)}
                          >
                            <PopoverBody> Remove service</PopoverBody>
                          </Tooltip> */}
                        </span>
                        )}
                      </div>
                      <Row>
                        <Col md={12}>
                          <FormGroup className="error-l-75">
                            <Label>Service Name*</Label>
                            <Input
                              className="form-control"
                              name={`services[${index}].serviceName`}
                              value={service.serviceName}
                              onChange={(e) =>
                                handleInputChange(
                                  index,
                                  "serviceName",
                                  e.target.value
                                )
                              }
                                validate={validateServiceName}
                            />
                            {errors.services?.[index]?.serviceName &&
                              touched.services?.[index]?.serviceName && (
                                <div className="invalid-feedback d-block">
                                  {errors.services[index].serviceName}
                                </div>
                              )}
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col md={12}>
                          <FormGroup>
                            <Label for={`services[${index}].headline`}>
                              Headline*
                            </Label>
                            <Input
                              name={`services[${index}].headline`}
                              id={`services[${index}].headline`}
                              className="form-control"
                              value={service.headline}
                              onChange={(e) =>
                                handleInputChange(
                                  index,
                                  "headline",
                                  e.target.value
                                )
                              }
                                validate={validatePackageTopic}
                            />
                            {errors.services?.[index]?.headline &&
                              touched.services?.[index]?.headline && (
                                <div className="invalid-feedback d-block">
                                  {errors.services[index].headline}
                                </div>
                              )}
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col md={12}>
                          <FormGroup>
                            <Label for={`services[${index}].description`}>
                              Description*
                            </Label>
                            <Input
                              type="textarea"
                              name={`services[${index}].description`}
                              id={`services[${index}].description`}
                              className="form-control"
                              value={service.description}
                              onChange={(e) =>
                                handleInputChange(
                                  index,
                                  "description",
                                  e.target.value
                                )
                              }
                                validate={validatePackageDescription}
                            />
                            {errors.services?.[index]?.description &&
                              touched.services?.[index]?.description && (
                                <div className="invalid-feedback d-block">
                                  {errors.services[index].description}
                                </div>
                              )}
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col md={12}>
                          <FormGroup className="error-l-75">
                            <Label>Amount*</Label>
                            <SliderTooltip
                              min={0}
                              max={500000}
                              defaultValue={service.amount}
                              className="mb-5"
                              step={500}
                              value={service.amount}
                              onChange={(value) =>
                                handleInputChange(index, "amount", value)
                              }
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        {/* <Col md={12}>
                      <Button color="primary" className="my-3" onClick={() => removeService(index)}>
                        Remove Service
                      </Button>
                    </Col> */}
                      </Row>
                      <hr />
                    </div>
                  ))}

                  {/* <Button color="primary" className="my-5" onClick={addService}>
                    Add more services
                  </Button> */}
                  <Card onClick={addService} className="p-3 text-center my-5" style={{ cursor: "pointer" }}>
                        <h3 className="font-weight-bold text-primary">+ Add more services</h3> 
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
                      <Button color="primary" type="submit" className={`btn-shadow btn-multiple-state ${
                      servicesLoading ? "show-spinner" : ""
                    }`}>
                      <span className="spinner d-inline-block">
                      <span className="bounce1" />
                      <span className="bounce2" />
                      <span className="bounce3" />
                    </span>
                    <span className="label">
                      Submit
                    </span>
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
                            <Button color="primary" size="lg" onClick={() => handleJobsListClick()}>
                            My jobs list
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

export default injectIntl(ApplyAsLawyer);
