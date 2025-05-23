import axios from "axios";
import { NotificationManager } from "components/common/react-notifications";
import { baseUrl } from "constants/defaultValues";
import { Field, Form, Formik } from "formik";
import { createRef, useState } from "react";
import Select from "react-select";
import TagsInput from "react-tagsinput";
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
import indentityStatusList from "../CommonCardList/IdentityStatusList";
import ToasterComponent from "../notifications/ToasterComponent";
import country from "./Country";
import DomainList from "./DomainList";
import language from "./Languages";
import {
  validateBio,
  validateDomain,
  validateIdentityStatus,
  validateLocation,
} from "./validation";

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
  const [skillsTag, setSkillsTag] = useState([]);
  const [imageError1, setImageError1] = useState(false);
  const [imageErrorMessage1, setImageErrorMessage1] = useState(null);

  const [fields] = useState({
    image: "",
    linkedinUrl: "",
    twitterHandle: "",
    bio: "",
    location: "",
    domain: "",
    identityStatus: "",
  });

  const languageOptions = language.map((option) => ({
    value: option.iso_code,
    label: option.name,
  }));

  // const indentityStatusList = [
  //   { value: "IMMIGRANT", label: "IMMIGRANT" },
  //   { value: "PR_CITIZEN", label: "PR_CITIZEN" },
  // ];

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

  const [selectedFile2, setSelectedFile2] = useState(null);

  const handleFileChange2 = (event) => {
    const file = event.target.files[0];

    if (!file) return; // No file selected

    if (!(file.type === "application/pdf")) {
      // alert("Please select a valid PDF file.");
      setImageError1(true);
      setImageErrorMessage1("Please upload a PDF file.");
      return;
    }

    const fileSizeMB = file.size / (1024 * 1024); // Convert bytes to MB

    if (fileSizeMB > 2) {
      // alert("File size exceeds 2MB limit.");
      setImageError1(true);
      setImageErrorMessage1("File size must be less than  2MB");

      return;
    }

    setSelectedFile2(file);
    setImageError1(false);
    setImageErrorMessage1("");
  };

  const mentorAboutUrl = `${baseUrl}/api/alumni/alumnidetails/about`;
  const imageUploadUrl = `${baseUrl}/api/alumni/profile-image`;
  const alumniResumePostUrl = ` ${baseUrl}/api/resume?role=ALUMNI`;
  function getTokenRes() {
    return localStorage.getItem("tokenRes");
  }
  const token = getTokenRes();

  // const postDataAbout = async (data) => {
  //   setAboutLoading(true);
  //   const formData = new FormData();
  //   formData.append("image", file1);

  //   const alumniProfile = {
  //     linkedinUrl: data.linkedinUrl,
  //     twitterHandle: data.twitterHandle,
  //     languages: data.language,
  //     skills: data.skills,
  //     bio: data.bio,
  //     location: data.location,
  //   };

  //   formData.append(
  //     "alumniProfile",
  //     new Blob([JSON.stringify(alumniProfile)], { type: "application/json" })
  //   );

  //   try {
  //     const response = await axios.post(mentorAboutUrl, formData, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });
  //     setAboutLoading(false);
  //     ToasterComponent("success", response.data.statuses);
  //     handleNextStep();
  //     localStorage.setItem("status", "1");
  //   } catch (error) {
  //     setImageError(false);
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
  const postImage = async (file) => {
    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await axios.post(imageUploadUrl, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data; // Handle success response from backend
    } catch (error) {
      setImageError(true);
      setImageErrorMessage("Failed to upload image. Please try again.");
      throw error;
    }
  };
  const postProfileData = async (data) => {
    const alumniProfile = {
      linkedinUrl: data.linkedinUrl,
      twitterHandle: data.twitterHandle,
      languages: data.language,
      skills: data.skills,
      bio: data.bio,
      location: data.location,
      domain: data.domain,
      identityStatus: data.identityStatus,
    };

    try {
      const response = await axios.post(mentorAboutUrl, alumniProfile, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json", // Set Content-Type to application/json
        },
      });
      setAboutLoading(false);
      ToasterComponent("success", response.data.statuses);
      handleNextStep();
      localStorage.setItem("status", "1");
    } catch (error) {
      setAboutLoading(false);
      NotificationManager.error(
        "Failed to submit profile data",
        "Oops!",
        3000,
        null,
        null,
        ""
      );
      throw error;
    }
  };

  const handleSubmit = async (values) => {
    setAboutLoading(true);

    try {
      // First, check if an image exists and upload it
      if (file1) {
        await postImage(file1); // Upload the image separately
      }

      // After the image upload, submit the rest of the form data (without the image)
      await postProfileData({
        linkedinUrl: values.linkedinUrl,
        twitterHandle: values.twitterHandle,
        language: languages,
        skills: skillsTag,
        bio: values.bio,
        location: values.location,
        domain: values.domain,
        identityStatus: values.identityStatus,
      });
    } catch (error) {
      setAboutLoading(false); // Stop loading in case of error
    }
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
    if (file && file.size > maxSize) {
      setImageError(true);
      setImageErrorMessage("File size must be less than 2MB");
      return false;
    }

    setImageError(false);
    setImageErrorMessage("");
    return true;
  };
  // file upload validation end

  const handleTagsChange = (newSkills) => {
    setSkillsTag(newSkills);
  };

  const postResumeData = async () => {
    try {
      const formData = new FormData();
      formData.append("resume", selectedFile2);

      await axios.post(alumniResumePostUrl, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // console.log(`resres ${response.status}`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Formik
        innerRef={forms[0]}
        initialValues={{
          linkedinUrl: fields.linkedinUrl,
          twitterHandle: fields.twitterHandle,
          bio: fields.bio,
          location: fields.location,
          domain: fields.domain,
          identityStatus: fields.identityStatus,
        }}
        validateOnMount
        // onSubmit={(values) => {
        //   if (!file1 || validateFile(file1)) {
        //     postDataAbout({
        //       ...values,
        //       language: languages,
        //       skills: skillsTag,
        //     });
        //   }
        // }}
        onSubmit={(values) => {
          if (!file1 || validateFile(file1)) {
            handleSubmit(values);
            postResumeData(); // Call the combined submit function
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
                    alt="img"
                  />
                </Col>
                <Col md={5} className="mt-3 ">
                  <InputGroup className="mb-3">
                    <div className="mt-1.5">
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

            {/* <FormGroup className="error-l-75">
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
            </FormGroup> */}
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
              />
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
              <Row>
                <Col md={6}>
                  <Label>Location*</Label>
                  <Field
                    as="select"
                    name="location"
                    validate={validateLocation}
                    className="form-control"
                  >
                    <option disabled value="">
                      Select Country
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
                </Col>
                <Col md={6}>
                  <Label>Domain*</Label>
                  <Field
                    as="select"
                    name="domain"
                    validate={validateDomain}
                    className="form-control"
                  >
                    <option disabled value="">
                      Select Domain
                    </option>
                    {DomainList.map((option) => (
                      <option key={option.name} value={option.name}>
                        {option.name}
                      </option>
                    ))}
                  </Field>
                  {errors.domain && touched.domain && (
                    <div className="invalid-feedback d-block">
                      {errors.domain}
                    </div>
                  )}
                </Col>
              </Row>
              <Row className="my-3">
                <Col md={6}>
                  <Label>Identity Status*</Label>
                  <Field
                    as="select"
                    name="identityStatus"
                    validate={validateIdentityStatus}
                    className="form-control"
                  >
                    <option disabled value="">
                      Select Identity Satus
                    </option>
                    {indentityStatusList.map((option) => (
                      <option key={option.name} value={option.name}>
                        {option.label}
                      </option>
                    ))}
                  </Field>
                  {errors.identityStatus && touched.identityStatus && (
                    <div className="invalid-feedback d-block">
                      {errors.identityStatus}
                    </div>
                  )}
                </Col>
              </Row>
              <Row className="mt-3">
                <Col md={6}>
                  <Label>CV</Label>
                  {imageError1 && (
                    <div className="invalid-feedback d-block">
                      {imageErrorMessage1}
                    </div>
                  )}

                  <InputGroup className="">
                    <div className="">
                      <Button
                        className="default"
                        color="primary"
                        onClick={() =>
                          document.getElementById("file-upload-resume").click()
                        }
                      >
                        Upload Resume <i className="iconsminds-upload ml-2" />
                      </Button>
                      {/* <Form> */}
                      <Input
                        id="file-upload-resume"
                        type="file"
                        className="d-none"
                        onChange={handleFileChange2}
                        // validate={validateFile}
                      />
                    </div>
                  </InputGroup>
                  <div className="  my-2 ">
                    {/* {selectedFile2 ? selectedFile2.name : ""} */}
                    {selectedFile2
                      ? `selected file is ${selectedFile2.name}`
                      : ""}
                  </div>
                </Col>
              </Row>
            </FormGroup>
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

                    <FormText>Add skill and press Enter or Comma </FormText>
                    <FormText color="muted">
                      Describe your expertise to connect with mentors who have
                      similar interests.
                      <br />
                      {/* Comma-separated list of your skills  */}
                      (keep it below 10). Mentors will use this to find you.
                    </FormText>
                  </FormGroup>
                </Col>
              </Row>
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
