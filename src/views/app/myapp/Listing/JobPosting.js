import React, { useState } from "react";
import { Colxx } from "components/common/CustomBootstrap";
import { Row, Card, Button, FormGroup, Label, Col, Form } from "reactstrap";
import ReactQuill from "react-quill";

import "react-quill/dist/quill.snow.css";
import "react-quill/dist/quill.bubble.css";
import { Field, Formik } from "formik";
import { baseUrl } from "constants/defaultValues";
import axios from "axios";

const quillModules = {
  toolbar: [
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image"],
    ["clean"],
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

const WorkPlaceTypeData = ["Onsite", "Hybrid", "Remote"];
const EmploymentTypeData = [
  "Full time",
  "Part time",
  "Temporary",
  "Volunteer",
  "Internship",
  "Contract",
];

const JobPosting = () => {
  const [jobTitle, setJobTitle] = useState("");
  const [company, setCompany] = useState("");
  const [workPlaceType, setWorkPlaceType] = useState("");
  const [jobLocation, setJobLocation] = useState("");
  const [employmentType, setEmploymentType] = useState("");
  const [description, setDescription] = useState("");
  const [skills, setSkills] = useState([]);

  const url = `${baseUrl}/api/posts/job-post`;

  function getTokenRes() {
    return localStorage.getItem("tokenRes");
  }
  const token = getTokenRes();

  const handleSubmit = async () => {
    try {
      const Data = {
        jobTitle,
        company,
        workPlaceType,
        jobLocation,
        employmentType,
        description,
        skills,
      };
      await axios.post(url, Data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("job posted successfully");
    } catch (error) {
      console.error("Error posting job:", error);
    }
  };

  return (
    <div>
      <Card className="mx-auto my-4 p-3" style={{ maxWidth: "900px" }}>
        <h1 className="font-weight-semibold">Post a job</h1>
        <Colxx sm="12" md="12" lg="12" xxs="12" className="mx-auto ">
          <Formik>
            <Form className="av-tooltip tooltip-label-right ">
              <Row>
                <Col md={6}>
                  <FormGroup className="error-l-75">
                    <Label>Job title*</Label>
                    <Field
                      className="form-control"
                      name="jobTitle"
                      onChange={(e) => setJobTitle(e.target.value)}
                      //   validate={}
                    />
                    {/* {errors.jobTitle && touched.jobTitle && (
                              <div className="invalid-feedback d-block">
                                {errors.jobTitle}
                              </div>
                            )} */}
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
                      {WorkPlaceTypeData.map((option) => (
                        <option key={option} value={option}>
                          {option}
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
                  {EmploymentTypeData.map((option) => (
                    <option key={option} value={option}>
                      {option}
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
                    />
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
              <FormGroup>
                <Label for="skills">Skills</Label>
                <Field
                  type="text"
                  name="skills"
                  id="skills"
                  className="form-control"
                  placeholder="Enter skills (comma-separated)"
                  // validate={validateSkills}
                  onChange={(e) => {
                    const skillArray = e.target.value
                      .split(",")
                      .map((skill) => skill.trim());
                    setSkills("skills", skillArray);
                  }}
                />
                {/* {errors.skills && touched.skills && (
                          <div className="invalid-feedback d-block">
                            {errors.skills}
                          </div>
                        )} */}
              </FormGroup>
              <div className="mt-3">
                <Button
                  color="primary "
                  className="default  py-2 "
                  onClick={handleSubmit}
                >
                  Post a job
                </Button>
              </div>
            </Form>
          </Formik>
        </Colxx>
      </Card>
    </div>
  );
};

export default JobPosting;
