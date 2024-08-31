import axios from "axios";
import { NotificationManager } from "components/common/react-notifications";
import { baseUrl } from "constants/defaultValues";
import { Field, Form, Formik } from "formik";
import { createRef, useState } from "react";
import Select from "react-select";
import "react-tagsinput/react-tagsinput.css";
import {
  Alert,
  Button,
  Col,
  FormGroup,
  FormText,
  Input,
  InputGroup,
  Label,
  Row,
} from "reactstrap";
import { validateBio, validateLocation } from "./validation";

import ToasterComponent from "../notifications/ToasterComponent";
import country from "./Country";
import language from "./Languages";

const ApplyAsAlumniAbout = ({ currentStep, setCurrentStep }) => {
  const forms = [createRef(null), createRef(null), createRef(null)];
  const [file1, setFile1] = useState(null);
  const [imageError, setImageError] = useState(false);
  const [imageErrorMessage, setImageErrorMessage] = useState(null);
  const [languages, setLanguages] = useState([]);
  const [aboutLoading, setAboutLoading] = useState(false);
  const [aboutField, setAboutField] = useState({
    image: "",
  });
  const [selectedFile, setSelectedFile] = useState(null);

  const [fields] = useState({
    image: "",
    linkedinUrl: "",
    twitterHandle: "",
    bio: "",
  });

  const languageOptions = language.map((option) => ({
    value: option.iso_code,
    label: option.name,
  }));

  const handleNextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFile1(file);

    if (file) {
      const reader = new FileReader();
      setImageError(false);
      reader.onloadend = () => {
        const base64Image = reader.result;
        setSelectedFile(base64Image);
        setAboutField({ ...aboutField, image: base64Image });
      };

      reader.readAsDataURL(file);
    }
  };

  const mentorAboutUrl = `${baseUrl}/api/alumni/alumnidetails/about`;

  function getTokenRes() {
    return localStorage.getItem("tokenRes");
  }
  const token = getTokenRes();

  const postDataAbout = async (data) => {
    setAboutLoading(true);
    const formData = new FormData();
    formData.append("image", file1);

    const alumniProfile = {
      linkedinUrl: data.linkedinUrl,
      twitterHandle: data.twitterHandle,
      language: data.language,
      bio: data.bio,
    };
    formData.append(
      "alumniProfile",
      new Blob([JSON.stringify(alumniProfile)], { type: "application/json" })
    );

    try {
      const response = await axios.post(mentorAboutUrl, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
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

  // file upload validation

  const validateFile = (file) => {
    // const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
    const maxSize = 2 * 1024 * 1024; // 5MB
    if (!file) {
      setImageError(true);
      setImageErrorMessage("A profile picture is required");
      return false;
    }
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

  return (
    <>
      <Formik
        innerRef={forms[0]}
        initialValues={{
          linkedinUrl: fields.linkedinUrl,
          twitterHandle: fields.twitterHandle,
          bio: fields.bio,
        }}
        validateOnMount
        onSubmit={(values) => {
          if (validateFile(file1)) {
            postDataAbout({ ...values, language: languages });
          }
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
              don&apos;t need jargon and polished cover letters here! <br />
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
                    src={selectedFile || "/assets/img/profiles/l-1.jpg"}
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
                        Upload profile pic <i className="iconsminds-upload " />
                      </Button>
                      <Input
                        id="file-upload"
                        type="file"
                        className="form-control d-none"
                        onChange={handleFileChange}
                      />
                      {file1 && (
                        <p className="mt-2">Selected file: {file1.name}</p>
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
                  <Label for="twitterHandle">Twitter Handle (optional)</Label>
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
                <div className="invalid-feedback d-block">{errors.bio}</div>
              )}
              <FormText color="muted">
                Tell us (and your mentees) a little bit about yourself. Talk
                about yourself in the first person, as if you&apos;d directly
                talk to a mentee. This will be public.
              </FormText>
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
    </>
  );
};

export default ApplyAsAlumniAbout;
