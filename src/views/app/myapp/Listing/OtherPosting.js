import { Colxx } from "components/common/CustomBootstrap";
import { useState } from "react";
import ReactQuill from "react-quill";
import { Button, Card, Col, Form, FormGroup, Label, Row } from "reactstrap";

import axios from "axios";
import { baseUrl } from "constants/defaultValues";
import { Field, Formik } from "formik";
import "react-quill/dist/quill.bubble.css";
import "react-quill/dist/quill.snow.css";

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
// const validate = (values) => {
//   const errors = {};
//   if (!values.title) {
//     errors.title = "Title is required";
//   }
//   return errors;
// };

const OtherPosting = ({ closeModal }) => {
  const [title, setTitle] = useState("");
  const [job, setJob] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  // const [skills, setSkills] = useState([]);

  const url = `${baseUrl}/api/posts/other-post/`;

  function getTokenRes() {
    return localStorage.getItem("tokenRes");
  }
  const token = getTokenRes();

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const Data = {
        title,
        job,
        description,
        // skills,
      };
      await axios.post(url, Data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setIsLoading(false);
      closeModal();
      // console.log("job posted successfully");
    } catch (error) {
      console.error("Error posting job:", error);
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Card className="mx-auto my-4 p-3" style={{ maxWidth: "900px" }}>
        {/* <h1 className="font-weight-semibold">Other Post</h1> */}
        <Colxx sm="12" md="12" lg="12" xxs="12" className="mx-auto ">
          <Formik
            initialValues={{
              title,
              job,
              description,
            }}
            // validate={validate}
          >
            {({ errors, touched }) => (
              <Form className="av-tooltip tooltip-label-right ">
                <Row>
                  <Col md={6}>
                    <FormGroup className="error-l-75">
                      <Label>Title*</Label>
                      <Field
                        className="form-control"
                        name="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        // validate={validate}
                      />
                      {errors.title && touched.title && (
                        <div className="invalid-feedback d-block">
                          {errors.title}
                        </div>
                      )}
                      {/* <ErrorMessage name="title" component="div" className="invalid-feedback d-block" /> */}
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup className="error-l-75">
                      <Label>Job</Label>
                      <Field
                        className="form-control"
                        name="job"
                        value={job}
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
                <h6 className="font-weight-semibold">Add Skills</h6> */}
                {/* <p className="text-muted">
              Add up to 5 tags to decribe what your question is about
            </p> */}
                {/* <input
                  type="text"
                  className="form-control shadow-none border-none  text-one font-weight-medium my-3"
                  placeholder="" */}
                {/* //   value={inputkey1}
              //     onChange={(e) => setSkills(e.target.value)}
              //   />
              // </div> */}

                <div className="mt-3 d-flex justify-content-end">
                  {/* <Button
                  color="primary "
                  className="default  py-2 "
                  onClick={handleSubmit}
                >
                  Post
                </Button> */}
                  <Button
                    color="primary"
                    // className="py-2"
                    className={`col-12 col-md-3 btn-shadow btn-multiple-state ${
                      isLoading ? "show-spinner" : ""
                    }`}
                    // disabled={!isValid}
                    onClick={() => {
                      handleSubmit();
                      // closeModal();
                    }}
                  >
                    <span className="spinner d-inline-block">
                      <span className="bounce1" />
                      <span className="bounce2" />
                      <span className="bounce3" />
                    </span>
                    <span className="label">Post</span>
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

export default OtherPosting;
