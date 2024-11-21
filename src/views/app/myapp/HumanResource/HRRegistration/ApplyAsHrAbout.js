import axios from "axios";
import { NotificationManager } from "components/common/react-notifications";
import { baseUrl } from "constants/defaultValues";
import { Field, Form, Formik } from "formik";
import { createRef, useState } from "react";
import Select from "react-select";
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
import language from "../../AlumniRegister/Languages";
import {
  validateIdentityStatus,
  validateLocation,
} from "../../AlumniRegister/validation";
import indentityStatusList from "../../CommonCardList/IdentityStatusList";
import country from "../../my-login/Country";
import ToasterComponent from "../../notifications/ToasterComponent";

const ApplyAsHrAbout = ({ currentStep, setCurrentStep }) => {
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
  const [imageError1, setImageError1] = useState(false);
  const [imageErrorMessage1, setImageErrorMessage1] = useState(null);

  const hrAboutUrl = `${baseUrl}/api/humanresource/profile`;
  const imageUploadUrl = `${baseUrl}/api/humanresource/profile-image`;
  const hrResumePostUrl = ` ${baseUrl}/api/resume?role=HR`;

  function getTokenRes() {
    return localStorage.getItem("tokenRes");
  }
  const token = getTokenRes();

  const [fields] = useState({
    image: "",
    twitterHandle: "",
    residentType: "",
    country: "",
    jobType: "",
    jobTitle: "",
    company: "",
  });

  const languageOptions = language.map((option) => ({
    value: option.iso_code,
    label: option.name,
  }));

  const handleNextStep = () => {
    setCurrentStep(currentStep + 1);
  };

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
    const HRAbout = {
      twitterHandle: data.twitterHandle,
      languages: data.language,
      country: data.country,
      jobType: data.jobType,
      jobTitle: data.jobTitle,
      company: data.company,
      residentType: data.residentType,
    };

    try {
      const response = await axios.post(hrAboutUrl, HRAbout, {
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
        twitterHandle: values.twitterHandle,
        language: languages,
        residentType: values.residentType,
        country: values.country,
        jobType: values.jobType,
        jobTitle: values.jobTitle,
        company: values.company,
      });
    } catch (error) {
      setAboutLoading(false); // Stop loading in case of error
    }
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

  const validateFile = (file) => {
    const maxSize = 2 * 1024 * 1024; // 5MB

    if (file && file.size > maxSize) {
      setImageError(true);
      setImageErrorMessage("File size must be less than 2MB");
      return false;
    }

    setImageError(false);
    setImageErrorMessage("");
    return true;
  };

  const postResumeData = async () => {
    try {
      const formData = new FormData();
      formData.append("resume", selectedFile2);

      await axios.post(hrResumePostUrl, formData, {
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
    <Formik
      innerRef={forms[0]}
      initialValues={{
        twitterHandle: fields.twitterHandle,
        residentType: fields.residentType,
        country: fields.country,
        jobTitle: fields.jobTitle,
        jobType: fields.jobType,
        company: fields.company,
      }}
      validateOnMount
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
            ins-and-outs of why you&apos;d like to become a hr. Keep things
            personal and talk directly to us and your mentees. We don&apos;t
            need jargon and polished cover letters here! <br />
            <br />
            You agree to our code of conduct and the mentor agreement by sending
            the form, so be sure to have a look at those.
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
          <FormGroup>
            <Row>
              <Col md={6}>
                <Label for="jobType">Job Type</Label>
                <Field
                  type="text"
                  name="jobType"
                  id="jobType"
                  className="form-control"
                  autoComplete="off"
                />
              </Col>
              <Col md={6}>
                <Label for="jobTitle">Job Title</Label>
                <Field
                  type="text"
                  name="jobTitle"
                  id="jobTitle"
                  className="form-control"
                  autoComplete="off"
                />
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Label for="company">Company</Label>
                <Field
                  type="text"
                  name="company"
                  id="company"
                  className="form-control"
                  autoComplete="off"
                />
              </Col>
            </Row>
          </FormGroup>
          <FormGroup className="error-l-125">
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
          <FormGroup>
            <Row className="mt-3">
              <Col md={6}>
                <Label for="residentType">Resident Type*</Label>
                <Field
                  as="select"
                  name="residentType"
                  validate={validateIdentityStatus}
                  className="form-control"
                >
                  <option disabled value="">
                    Select Resident type
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
              <Col md={6}>
                <Label>Country*</Label>
                <Field
                  as="select"
                  name="country"
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
            </Row>
          </FormGroup>
          <FormGroup>
            <Row>
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
  );
};

export default ApplyAsHrAbout;
