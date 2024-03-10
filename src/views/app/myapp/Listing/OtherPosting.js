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

const OtherPosting = () => {
  const [title, setTitle] = useState("");
  const [job, setJob] = useState("");
  const [description, setDescription] = useState("");
  const [skills, setSkills] = useState([]);

  const url = `${baseUrl}/api/posts/other-post`;

  function getTokenRes() {
    return localStorage.getItem("tokenRes");
  }
  const token = getTokenRes();

  const handleSubmit = async () => {
    try {
      const Data = {
        title,
        job,
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
        <h1 className="font-weight-semibold">Other Post</h1>
        <Colxx sm="12" md="12" lg="12" xxs="12" className="mx-auto ">
          <Formik>
            <Form className="av-tooltip tooltip-label-right ">
              <Row>
                <Col md={6}>
                  <FormGroup className="error-l-75">
                    <Label>Title*</Label>
                    <Field
                      className="form-control"
                      name="title"
                      onChange={(e) => setTitle(e.target.value)}
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
                    <Label>Job</Label>
                    <Field
                      className="form-control"
                      name="job"
                      onChange={(e) => setJob(e.target.value)}
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

              <div className="mt-4">
                <h6 className="font-weight-semibold">Add a job description</h6>
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
              <div className="mt-2">
                <h6 className="font-weight-semibold">Add Skills</h6>
                {/* <p className="text-muted">
              Add up to 5 tags to decribe what your question is about
            </p> */}
                <input
                  type="text"
                  className="form-control shadow-none border-none  text-one font-weight-medium my-3"
                  placeholder=""
                  //   value={inputkey1}
                  onChange={(e) => setSkills(e.target.value)}
                />
              </div>
              <div className="mt-3">
                <Button
                  color="primary "
                  className="default  py-2 "
                  onClick={handleSubmit}
                >
                  Post
                </Button>
              </div>
            </Form>
          </Formik>
        </Colxx>
      </Card>
    </div>
  );
};

export default OtherPosting;
