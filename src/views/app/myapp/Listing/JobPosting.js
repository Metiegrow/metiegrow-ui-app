import { Colxx } from "components/common/CustomBootstrap";
import { useState } from "react";
import ReactQuill from "react-quill";
import {
  Button,
  Card,
  Col,
  Form,
  FormGroup,
  FormText,
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

const validateDescription = (value) => {
  let error;
  if (!value) {
    error = "Description is required";
  }
  return error;
};

const JobPosting = ({ closeModal }) => {
  const [title, setTitle] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [company, setCompany] = useState("");
  const [workPlaceType, setWorkPlaceType] = useState(null);
  const [jobLocation, setJobLocation] = useState("");
  const [employmentType, setEmploymentType] = useState(null);
  const [description, setDescription] = useState("");
  const [skillsTag, setSkillsTag] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const url = `${baseUrl}/api/posts/job-post/`;

  function getTokenRes() {
    return localStorage.getItem("tokenRes");
  }
  const token = getTokenRes();

  const handleSubmit = async () => {
    setIsLoading(true);
    // console.log("jobpostsubmit")
    try {
      const data = {
        title,
        jobTitle,
        company,
        workPlaceType,
        jobLocation,
        employmentType,
        description,
        skills: skillsTag,
      };
      await axios.post(url, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      closeModal();
      // console.log("job posted successfully");
      setIsLoading(false);
    } catch (error) {
      console.error("Error posting job:", error);
      setIsLoading(false);
    }
  };

  const handleTagsChange = (newSkills) => {
    // setSkillError(false);
    setSkillsTag(newSkills);
  };

  return (
    <div>
      <Card className="mx-auto my-4 p-3" style={{ maxWidth: "900px" }}>
        {/* <h1 className="font-weight-semibold">Create a job post</h1> */}
        <Colxx sm="12" md="12" lg="12" xxs="12" className="mx-auto ">
          <Formik
            initialValues={{
              title: "",
              jobTitle: "",
              company: "",
              workPlaceType: "",
              jobLocation: "",
              employmentType: "",
              description: "",
              skills: [],
            }}
            //  validate={(values) => {
            //     const errors = {};
            //     const jobTitleError = validateJobTitle(values.jobTitle);
            //     if (jobTitleError) {
            //       errors.jobTitle = jobTitleError;
            //     }
            //     const descriptionError = validateDescription(values.description);
            //     if (descriptionError) {
            //       errors.description = descriptionError;
            //     }
            //     return errors;
            //  }}
            //  onSubmit={(values) => {
            //     handleSubmit(values);
            //     closeModal();
            //   }}
          >
            {({ isValid, errors, touched }) => (
              <Form className="av-tooltip tooltip-label-right ">
                <Row>
                  <Col md={12}>
                    <FormGroup className="error-l-75">
                      <Label>Title*</Label>
                      <Field
                        className="form-control"
                        name="title"
                        onChange={(e) => setTitle(e.target.value)}
                        // validate={validateJobTitle}
                        value={title}
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
                      <Label>Job title*</Label>
                      <Field
                        className="form-control"
                        name="jobTitle"
                        onChange={(e) => setJobTitle(e.target.value)}
                        // validate={validateJobTitle}
                        value={jobTitle}
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
                      <Label>Company</Label>
                      <Field
                        className="form-control"
                        name="company"
                        onChange={(e) => setCompany(e.target.value)}
                        //   validate={}
                        value={company}
                      />
                      {/* {errors.company && touched.company && (
                              <div className="invalid-feedback d-block">
                                {errors.company}
                              </div>
                            )} */}
                    </FormGroup>
                  </Col>
                </Row>

                <Row>
                  <Col md={6}>
                    <FormGroup className="error-l-75">
                      <Label>Workplace type</Label>
                      <Field
                        as="select"
                        name="workPlaceType"
                        onChange={(e) => setWorkPlaceType(e.target.value)}
                        //   validate={}
                        className="form-control"
                        value={workPlaceType || ""}
                      >
                        <option key="" value="" disabled>
                          Select Work place Type
                        </option>
                        {WorkPlaceTypeData.map((option, index) => (
                          // eslint-disable-next-line react/no-array-index-key
                          <option key={index} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </Field>
                      {/* {errors.workPlaceType && touched.workPlaceType && (
                          <div className="invalid-feedback d-block">
                            {errors.workPlaceType}
                          </div>
                        )} */}
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup className="error-l-75">
                      <Label>Job location</Label>
                      <Field
                        className="form-control"
                        name="jobLocation"
                        onChange={(e) => setJobLocation(e.target.value)}
                        //   validate={}
                        value={jobLocation}
                      />
                      {/* {errors.jobLocation && touched.jobLocation && (
                              <div className="invalid-feedback d-block">
                                {errors.jobLocation}
                              </div>
                            )} */}
                    </FormGroup>
                  </Col>
                </Row>
                <FormGroup className="error-l-75">
                  <Label>Employment type</Label>
                  <Field
                    as="select"
                    name="employmentType"
                    onChange={(e) => setEmploymentType(e.target.value)}
                    //   validate={}
                    className="form-control"
                    value={employmentType || ""}
                  >
                    <option key="" value="" disabled>
                      Select Employment type
                    </option>
                    {EmploymentTypeData.map((option, index) => (
                      // eslint-disable-next-line react/no-array-index-key
                      <option key={index} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </Field>
                  {/* {errors.employmentType && touched.employmentType && (
                          <div className="invalid-feedback d-block">
                            {errors.employmentType}
                          </div>
                        )} */}
                </FormGroup>
                <div className="mt-4">
                  <h6 className="font-weight-semibold">Add a description*</h6>
                  {/* <p className='text-muted'>Include all the information would need to answer your question</p> */}
                  <Row className="mb-4">
                    <Colxx xxs="12">
                      <ReactQuill
                        theme="snow"
                        value={description}
                        onChange={(val) => setDescription(val)}
                        modules={quillModules}
                        formats={quillFormats}
                        validate={validateDescription}
                      />
                      {errors.description && touched.description && (
                        <div className="invalid-feedback d-block">
                          {errors.description}
                        </div>
                      )}
                    </Colxx>
                  </Row>
                </div>
                {/* <div className="mt-2">
                <h6 className="font-weight-semibold">Add Skills</h6>
                
                <input
                  type="text"
                  className="form-control shadow-none border-none  text-one font-weight-medium my-3"
                  placeholder=""
                  //   value={inputkey1}
                  onChange={(e) => setSkills(e.target.value)}
                />
              </div> */}
                {/* <FormGroup>
                <Label for="skills">Skills</Label>
                <Field
                  type="text"
                  name="skills"
                  id="skills"
                  className="form-control"
                  placeholder="Enter skills (comma-separated)"
                  // validate={validateSkills}
                  value={skills}
                  onChange={(e) => {
                    const skillArray = e.target.value
                      .split(",")
                      .map((skill) => skill.trim());
                    setSkills("skills", skillArray);
                  }}
                />
                
              </FormGroup> */}
                <FormGroup>
                  <Label for="skills">Skills</Label>
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
                    addOnBlur
                    addKeys={[13, 188]}
                  />
                  {/* <TagsInput
                    value={skillsTag}
                    onChange={handleTagsChange}
                    renderInput={({ addTag, ...inputProps }) => {
                      const { onChange, value, ...other } = inputProps;
                      return (
                        <input
                          {...other}
                          value={inputValue}
                          onChange={(e) => handleChangeInput(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              handleAddTag();
                              e.preventDefault();
                            }
                          }}
                          placeholder="Add skills"
                        />
                      );
                    }}
                  /> */}
                  {/* {skillError && (
                      <div className="invalid-feedback d-block">
                        {skillErrorMessage}
                      </div>
                    )} */}
                  <FormText>Add skill and press Enter or comma </FormText>
                </FormGroup>
                <div className="mt-3 d-flex justify-content-end">
                  <Button
                    color="primary "
                    className={`col-12 col-md-3 btn-shadow btn-multiple-state ${
                      isLoading ? "show-spinner" : ""
                    }`}
                    onClick={() => {
                      handleSubmit();
                    }}
                    // type="submit"
                    disabled={!isValid}
                  >
                    <span className="spinner d-inline-block">
                      <span className="bounce1" />
                      <span className="bounce2" />
                      <span className="bounce3" />
                    </span>
                    <span className="label">Post a job</span>
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
