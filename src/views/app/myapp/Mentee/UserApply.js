import React, { useState } from "react";
import { Formik, Form, Field } from "formik";

import {
  Row,
  Card,
  CardBody,
  FormGroup,
  Label,
  Button,
  Input,
  Col,
  InputGroup,
  FormText,
  Jumbotron,
  Alert,
} from "reactstrap";
import axios from "axios";
// import { NotificationManager } from "components/common/react-notifications";
import { Colxx } from "components/common/CustomBootstrap";
import { baseUrl } from "constants/defaultValues";
import country from "../my-login/Country";
import {
  validateJobTitle,
  validateLinkedinUrl,
  validateLocation,
} from "../my-login/validation";
import ToasterComponent from "../notifications/ToasterComponent";

const UserApply = () => {
  const [file1, setFile1] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const url = `${baseUrl}/api/mentee/profile`;
  const token = localStorage.getItem("tokenRes");

  const onSubmit = async (values) => {
    setIsLoading(true);

    const formData = new FormData();
    formData.append("image", file1);

    const menteeProfile = {
      jobTitle: values.jobTitle,
      location: values.location,
      linkedIn: values.linkedinUrl,
      twitterHandle: values.twitterHandle || "",
    };
    formData.append("menteeProfile",new Blob([JSON.stringify(menteeProfile)], { type: "application/json" }));

    try {
      const response = await axios.post(url, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          // "Content-Type": "application/json",
        },
      });
      ToasterComponent('success', response.data.statuses);
      setSubmitted(true);
    } catch (error) {
      if(error.response){
        ToasterComponent('error', error.response.data.statuses);
      } else{
      console.error("There was an error while submitting ", error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  // const onSubmit = async (values) => {
  //   setIsLoading(true);
  //   // const menteeData = { ...values, image: selectedFile };
  //   // console.log(menteeData);

  //   try {
  //     const response = await axios.post(url, values, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });
  //     console.log(response.data);
  //     setSubmitted(true);
  //   } catch (error) {
  //     console.error("There was an error while submitting ", error.statuses);
  //     NotificationManager.error(
  //       "Error submitting",
  //       "Oops!",
  //       3000,
  //       null,
  //       null,
  //       ""
  //     );
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFile1(file);

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        const base64Image = reader.result;
        setSelectedFile(base64Image);
      };

      reader.readAsDataURL(file);
    }
  };

  return !submitted ? (
    <>
      <Row className="mb-4">
        <Colxx xxs="12">
          <Card className="mx-auto my-4 " style={{ maxWidth: "900px" }}>
            <CardBody>
              <h1 className="mt-4 font-weight-bold">User profile</h1>
              <Formik
                initialValues={{
                  jobTitle: "",
                  location: "",
                  linkedinUrl: "",
                  twitterHandle: "",
                }}
                onSubmit={onSubmit}
              >
                {({ errors, touched }) => (
                  <Form className="av-tooltip tooltip-label-right">
                    <Alert color="primary">
                      <strong>Tips</strong><br />
                      <ul>
                     <li>Adding your photo and social media profiles helps mentors
                      feel confident that you’re a real person (e.g. not a bot).</li> 
                     <li>Your profile is only visible to mentors that you send
                      applications to. It is not indexed on search engines like
                      Google.</li> 
                      </ul>
                     
                    </Alert>
                    <FormGroup>
                      <Label for="image">Image*</Label>
                      <Row>
                        <Col md={2} className="">
                          <img
                            src={selectedFile || "/assets/img/profiles/l-1.jpg"}
                            className="mx-2 rounded-circle img-thumbnail border"
                            style={{ width: "70px", height: "70px", objectFit: "cover"  }}
                            alt=""
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
                              <Input
                                id="file-upload"
                                type="file"
                                className="form-control d-none"
                                onChange={handleFileChange}
                                // validate={validateFile}
                                required
                              />
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
                            validate={validateLinkedinUrl}
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
                        </Col>
                      </Row>
                    </FormGroup>

                    <div className="d-flex justify-content-end">
                      <Button
                        color="primary"
                        type="submit"
                        className={`col-12 col-md-2 btn-shadow btn-multiple-state ${
                          isLoading ? "show-spinner" : ""
                        }`}
                      >
                        <span className="spinner d-inline-block">
                          <span className="bounce1" />
                          <span className="bounce2" />
                          <span className="bounce3" />
                        </span>
                        <span className="label">Submit</span>
                      </Button>
                    </div>
                  </Form>
                )}
              </Formik>
            </CardBody>
          </Card>
        </Colxx>
      </Row>
    </>
  ) : (
    <>
      <Row>
        <Colxx xxs="12" className="mb-4">
          <Card className="mx-auto my-4 " style={{ maxWidth: "900px" }}>
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
                  <Button color="primary" size="lg">
                    Check status
                  </Button>
                </p>
              </Jumbotron>
            </CardBody>
          </Card>
        </Colxx>
      </Row>
    </>
  );
};

export default UserApply;
