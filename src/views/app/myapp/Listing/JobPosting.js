import { Colxx } from "components/common/CustomBootstrap";
import { useState } from "react";
import ReactQuill from "react-quill";
import {
  Button,
  Card,
  Col,
  Form,
  FormGroup,
  Input,
  InputGroup,
  Label,
  Row,
} from "reactstrap";

import axios from "axios";
import { baseUrl } from "constants/defaultValues";
import { Field, Formik } from "formik";
import "react-quill/dist/quill.bubble.css";
import "react-quill/dist/quill.snow.css";
import TagsInput from "react-tagsinput";
import "react-tagsinput/react-tagsinput.css";
import indentityStatusList from "../CommonCardList/IdentityStatusList";
import ToasterComponent from "../notifications/ToasterComponent";
import { EmploymentTypeData, WorkPlaceTypeData } from "./ListingData";

const quillModules = {
  toolbar: [
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    // ["link", "image"],
    // ["clean"],
  ],
};
const quillFormats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
];

// const WorkPlaceTypeData = [
//   { label: "Onsite", value: 0 },
//   { label: "Hybrid", value: 1 },
//   { label: "Remote", value: 2 },
// ];

// const EmploymentTypeData = [
//   { label: "Full time", value: 0 },
//   { label: "Part time", value: 1 },
//   { label: "Temporary", value: 2 },
//   { label: "Volunteer", value: 3 },
//   { label: "Internship", value: 4 },
//   { label: "Contract", value: 5 },
// ];

// const validateJobTitle = (value) => {
//   let error;
//   if (!value) {
//      error = 'Job title is required';
//   }
//   return error;
//  };

// const validateDescription = (value) => {
//   let error;
//   if (!value) {
//     error = "Description is required";
//   }
//   return error;
// };

const JobPosting = ({ closeModal, initialData, onEdit }) => {
  const [id] = useState(initialData?.id || 0);
  const [title] = useState(initialData?.title || "");
  const [jobTitle] = useState(initialData?.jobTitle || "");
  const [company] = useState(initialData?.company || "");
  const [workPlaceType] = useState(initialData?.workPlaceTypeValue || null);
  const [jobLocation] = useState(initialData?.jobLocation || "");
  const [employmentType] = useState(initialData?.employmentTypeValue || null);
  const [identityStatus] = useState(initialData?.identityStatus || null);
  const [description] = useState(initialData?.description || "");
  const [skillsTag] = useState(initialData?.skills || []);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFile2, setSelectedFile2] = useState(null);

  const url = `${baseUrl}/api/posts/job-post/`;

  function getTokenRes() {
    return localStorage.getItem("tokenRes");
  }
  const token = getTokenRes();

  const handleFileChange2 = (event) => {
    // const file = event.target.files[0];
    // setSelectedFile2(file);
    const file = event.target.files[0];

    if (!file) return; // No file selected

    // if (!(file.type === "application/pdf")) {
    //   // alert("Please select a valid PDF file.");
    //   setImageError1(true);
    //   setImageErrorMessage1("Please upload a PDF file.");
    //   return;
    // }
    if (file) {
      setSelectedFile2(file);
    }
    // const fileSizeMB = file.size / (1024 * 1024); // Convert bytes to MB

    // if (fileSizeMB > 2) {
    //   // alert("File size exceeds 2MB limit.");
    //   setImageError1(true);
    //   setImageErrorMessage1("File size must be less than  2MB");

    //   return;
    // }

    setSelectedFile2(file);
    // setImageError1(false);
    // setImageErrorMessage1("");
  };

  // const handleSubmit = async () => {
  //   setIsLoading(true);
  //   try {
  //     const data = {
  //       id,
  //       title,
  //       jobTitle,
  //       company,
  //       workPlaceType,
  //       jobLocation,
  //       employmentType,
  //       description,
  //       skills: skillsTag,
  //     };
  //     if (initialData) {
  //       await onEdit(data);
  //     } else {
  //       const response = await axios.post(url, data, {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       });
  //       ToasterComponent("success", response.data.statuses);
  //     }
  //     closeModal();
  //     setIsLoading(false);
  //   } catch (error) {
  //     setIsLoading(false);
  //     if (
  //       error.response &&
  //       error.response.data &&
  //       error.response.data.statuses
  //     ) {
  //       ToasterComponent("error", error.response.data.statuses);
  //     } else {
  //       console.error("Error posting/editing job:", error);
  //     }
  //   }
  // };

  // const handleTagsChange = (newSkills) => {
  //   // setSkillError(false);
  //   setSkillsTag(newSkills);
  // };

  return (
    <div>
      <Card className="mx-auto my-4 p-3" style={{ maxWidth: "900px" }}>
        {/* <h1 className="font-weight-semibold">Create a job post</h1> */}
        <Colxx sm="12" md="12" lg="12" xxs="12" className="mx-auto ">
          <Formik
            initialValues={{
              title: title || "",
              jobTitle: jobTitle || "",
              company: company || "",
              workPlaceType: workPlaceType || "",
              jobLocation: jobLocation || "",
              employmentType: employmentType || "",
              identityStatus: identityStatus || "",
              description: description || "",
              skills: skillsTag || [],
            }}
            validate={(values) => {
              const errors = {};
              if (!values.title.trim()) {
                errors.title = "Title is required";
              }
              if (!values.jobTitle.trim()) {
                errors.jobTitle = "Job title is required";
              }

              if (!values.jobLocation.trim()) {
                errors.jobLocation = "Job location is required";
              }
              if (!values.company.trim()) {
                errors.company = "Company is required";
              }
              if (!values.employmentType.trim()) {
                errors.employmentType = "employment type is required";
              }
              if (!values.identityStatus.trim()) {
                errors.employmentType = "identity status is required";
              }
              if (!values.workPlaceType.trim()) {
                errors.workPlaceType = "workplace type is required";
              }

              if (!values.description.trim()) {
                errors.description = "Description is required";
              }
              if (values.skills.length === 0) {
                errors.skills = "At least one skill is required";
              }
              return errors;
            }}
            onSubmit={async (values, { setSubmitting }) => {
              setIsLoading(true);

              try {
                const data = {
                  id,
                  title: values.title,
                  jobTitle: values.jobTitle,
                  company: values.company,
                  workPlaceType: values.workPlaceType,
                  jobLocation: values.jobLocation,
                  employmentType: values.employmentType,
                  identityStatus: values.identityStatus,
                  description: values.description,
                  skills: values.skills,
                };
                const formData = new FormData();
                // formData.append("jobListing", JSON.stringify(data));
                formData.append(
                  "jobListing",
                  new Blob([JSON.stringify(data)], {
                    type: "application/json",
                  })
                );
                if (selectedFile2) {
                  formData.append("images", selectedFile2);
                }

                if (initialData) {
                  await onEdit(data);
                } else {
                  const response = await axios.post(url, formData, {
                    headers: {
                      Authorization: `Bearer ${token}`,
                    },
                  });
                  ToasterComponent("success", response.data.statuses);
                  // if (selectedFile2) {
                  //   const formData = new FormData();
                  //   formData.append("image", selectedFile2);

                  //   const imageUploadUrl = `${baseUrl}/api/posts/job-post/image`;
                  //   await axios.post(imageUploadUrl, formData, {
                  //     headers: {
                  //       Authorization: `Bearer ${token}`,
                  //       // "Content-Type": "multipart/form-data",
                  //     },
                  //   });

                  //   ToasterComponent("success", "Image uploaded successfully");
                  // }
                }
                closeModal();
                setIsLoading(false);
              } catch (error) {
                setIsLoading(false);
                if (
                  error.response &&
                  error.response.data &&
                  error.response.data.statuses
                ) {
                  ToasterComponent("error", error.response.data.statuses);
                } else {
                  console.error("Error posting/editing job:", error);
                }
              }
              setSubmitting(false);
            }}
          >
            {({
              isValid,
              errors,
              touched,
              setFieldValue,
              handleSubmit,
              setFieldTouched,
              values,
            }) => (
              <Form className="av-tooltip tooltip-label-right">
                <Row>
                  <Col md={12}>
                    <FormGroup className="error-l-75">
                      <Label>Title*</Label>
                      <Field
                        className="form-control"
                        name="title"
                        onChange={({ target: { value } }) => {
                          const alphabeticValue = value.replace(
                            /[^a-zA-Z ]/g,
                            ""
                          );
                          setFieldValue("title", alphabeticValue);
                        }}
                        value={values.title}
                        required
                      />
                      {errors.title && touched.title && (
                        <div className="invalid-feedback d-block">
                          {errors.title}
                        </div>
                      )}
                    </FormGroup>
                  </Col>
                </Row>

                <Row>
                  <Col md={6}>
                    <FormGroup className="error-l-75">
                      <Label>Job Title*</Label>
                      <Field
                        className="form-control"
                        name="jobTitle"
                        onChange={(e) =>
                          setFieldValue("jobTitle", e.target.value)
                        }
                        value={values.jobTitle}
                        required
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
                        name="company"
                        onChange={(e) =>
                          setFieldValue("company", e.target.value)
                        }
                        value={values.company}
                        required
                      />
                      {errors.company && touched.company && (
                        <div className="invalid-feedback d-block">
                          {errors.company}
                        </div>
                      )}
                    </FormGroup>
                  </Col>
                </Row>

                <Row>
                  <Col md={6}>
                    <FormGroup className="error-l-75">
                      <Label>Workplace Type*</Label>
                      <Field
                        as="select"
                        name="workPlaceType"
                        onChange={(e) =>
                          setFieldValue("workPlaceType", e.target.value)
                        }
                        className="form-control"
                        value={values.workPlaceType}
                      >
                        <option value="" disabled>
                          Select Workplace Type
                        </option>
                        {WorkPlaceTypeData &&
                          WorkPlaceTypeData.map((option) => (
                            <option key={option} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                      </Field>
                      {errors.workPlaceType && touched.workPlaceType && (
                        <div className="invalid-feedback d-block">
                          {errors.workPlaceType}
                        </div>
                      )}
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup className="error-l-75">
                      <Label>Job Location*</Label>
                      <Field
                        className="form-control"
                        name="jobLocation"
                        onChange={(e) =>
                          setFieldValue("jobLocation", e.target.value)
                        }
                        value={values.jobLocation}
                        required
                      />
                      {errors.jobLocation && touched.jobLocation && (
                        <div className="invalid-feedback d-block">
                          {errors.jobLocation}
                        </div>
                      )}
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <FormGroup className="error-l-75">
                      <Label>Employment Type*</Label>
                      <Field
                        as="select"
                        name="employmentType"
                        onChange={(e) =>
                          setFieldValue("employmentType", e.target.value)
                        }
                        className="form-control"
                        value={values.employmentType}
                      >
                        <option value="" disabled>
                          Select Employment Type
                        </option>
                        {EmploymentTypeData &&
                          EmploymentTypeData.map((option) => (
                            <option key={option} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                      </Field>
                      {errors.employmentType && touched.employmentType && (
                        <div className="invalid-feedback d-block">
                          {errors.employmentType}
                        </div>
                      )}
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <Label>Employment Category*</Label>
                    <Field
                      as="select"
                      name="identityStatus"
                      // validate={validateIdentityStatus}
                      onChange={(e) =>
                        setFieldValue("identityStatus", e.target.value)
                      }
                      className="form-control"
                      value={values.identityStatus}
                    >
                      <option disabled value="">
                        Select Employment Category
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
                <Row>
                  <Col md={6}>
                    <FormGroup className="error-l-75">
                      <Label>Skills*</Label>
                      <TagsInput
                        value={values.skills}
                        onChange={(tags) => setFieldValue("skills", tags)}
                        addOnBlur
                        addKeys={[13, 188]}
                      />
                      {errors.skills && touched.skills && (
                        <div className="invalid-feedback d-block">
                          {errors.skills}
                        </div>
                      )}
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <Label>Image</Label>
                    {/* {imageError1 && (
                          <div className="invalid-feedback d-block">
                            {imageErrorMessage1}
                          </div>
                        )} */}

                    <InputGroup className="">
                      <div className="">
                        <Button
                          className="default"
                          color="primary"
                          onClick={() =>
                            document
                              .getElementById("file-upload-resume")
                              .click()
                          }
                        >
                          Upload Photo <i className="iconsminds-upload ml-2" />
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
                    <div
                      className="  my-2 "
                      // style={{
                      //   border: "1px solid #ccc",
                      //   minWidth: "200px",
                      // }}
                    >
                      {/* {selectedFile2 ? selectedFile2.name : ""} */}
                      {selectedFile2
                        ? `selected file is ${selectedFile2.name}`
                        : ""}
                    </div>
                  </Col>
                </Row>

                <FormGroup className="error-l-75">
                  <Label>Description*</Label>
                  <ReactQuill
                    theme="snow"
                    value={values.description}
                    onChange={(val) => setFieldValue("description", val)}
                    onBlur={() => setFieldTouched("description", true)}
                    modules={quillModules}
                    formats={quillFormats}
                  />
                  {errors.description && touched.description && (
                    <div className="invalid-feedback d-block">
                      {errors.description}
                    </div>
                  )}
                </FormGroup>

                <div className="mt-3 d-flex justify-content-end">
                  <Button
                    color="primary"
                    className={`col-12 col-md-3 btn-shadow btn-multiple-state ${
                      isLoading ? "show-spinner" : ""
                    }`}
                    onClick={handleSubmit}
                    type="submit"
                    disabled={!isValid} // Disable the button if the form is invalid
                  >
                    <span className="spinner d-inline-block">
                      <span className="bounce1" />
                      <span className="bounce2" />
                      <span className="bounce3" />
                    </span>
                    <span className="label">
                      {initialData ? "Submit" : "Post a job"}
                    </span>
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </Colxx>
      </Card>
    </div>
  );
};

export default JobPosting;
