import axios from "axios";
import { NotificationManager } from "components/common/react-notifications";
import { baseUrl } from "constants/defaultValues";
import { Form, Formik } from "formik";
import { createRef, useState } from "react";
import "react-tagsinput/react-tagsinput.css";
import { Button, Card, Col, FormGroup, Input, Label, Row } from "reactstrap";
import ToasterComponent from "../notifications/ToasterComponent";

const ApplyAsAlumniProfile = ({ currentStep, setCurrentStep }) => {
  const forms = [createRef(null), createRef(null), createRef(null)];
  const [profileLoading, setProfileLoading] = useState(false);

  const [education, setEducation] = useState({
    colleges: [
      {
        collegeName: "",
        degree: "",
        department: "",
        year: "",
      },
    ],
  });

  const currentYear = new Date().getFullYear();
  const years = [];

  for (let year = currentYear; year >= 2005; year -= 1) {
    years.push(year);
  }

  const handleNextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const handlePrevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const alumniProfileUrl = `${baseUrl}/api/alumni/alumnidetails/profile`;

  const token = localStorage.getItem("tokenRes");

  const postExperience = async (data) => {
    setProfileLoading(true);
    try {
      const response = await axios.post(alumniProfileUrl, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProfileLoading(false);
      ToasterComponent("success", response.data.statuses);
      handleNextStep();
      localStorage.setItem("status", "3");
    } catch (error) {
      setProfileLoading(false);
      if (
        error.response &&
        error.response.data &&
        error.response.data.statuses
      ) {
        error.response.data.statuses.forEach((status) => {
          NotificationManager.error(
            status.message,
            "Oops!",
            3000,
            null,
            null,
            ""
          );
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

  const removeEducation = (index) => {
    setEducation((prevState) => ({
      ...prevState,
      colleges: prevState.colleges.filter((_, i) => i !== index),
    }));
  };

  const addEducation = () => {
    setEducation((prevState) => ({
      ...prevState,
      colleges: [
        ...prevState.colleges,
        {
          collegeName: "",
          degree: "",
          department: "",
          year: "",
        },
      ],
    }));
  };

  const handleInputChange = (index, field, value) => {
    setEducation((prevState) => ({
      ...prevState,
      colleges: prevState.colleges.map((edu, i) =>
        i === index ? { ...edu, [field]: value } : edu
      ),
    }));
  };

  return (
    <>
      <Formik
        innerRef={forms[2]}
        initialValues={education}
        onSubmit={() => {
          postExperience(education);
        }}
        validateOnMount
      >
        {({ errors, touched }) => (
          <Form className="av-tooltip tooltip-label-right my-4">
            {education.colleges.map((service, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <div key={index}>
                <div className="text-right">
                  {education.colleges.length > 1 && (
                    <span>
                      <Button
                        id="closeButton"
                        color="primary"
                        outline
                        className="icon-button"
                        onClick={() => removeEducation(index)}
                      >
                        <span className="text-primary">
                          <strong>x</strong>
                        </span>
                      </Button>
                    </span>
                  )}
                </div>
                <Row>
                  <Col md={6}>
                    <FormGroup className="error-l-75">
                      <Label>College Name*</Label>
                      <Input
                        className="form-control"
                        required
                        name={`education[${index}].collegeName`}
                        value={service.college}
                        onChange={(e) =>
                          handleInputChange(
                            index,
                            "collegeName",
                            e.target.value
                          )
                        }
                      />
                      {errors.education?.[index]?.collegeName &&
                        touched.education?.[index]?.collegeName && (
                          <div className="invalid-feedback d-block">
                            {errors.education[index].collegeName}
                          </div>
                        )}
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup>
                      <Label for={`education[${index}].degree`}>Degree*</Label>
                      <Input
                        name={`education[${index}].degree`}
                        id={`education[${index}].degree`}
                        className="form-control"
                        value={service.degree}
                        required
                        onChange={(e) =>
                          handleInputChange(index, "degree", e.target.value)
                        }
                        // validate={validatePackageTopic}
                      />
                      {errors.education?.[index]?.degree &&
                        touched.education?.[index]?.degree && (
                          <div className="invalid-feedback d-block">
                            {errors.education[index].degree}
                          </div>
                        )}
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <FormGroup>
                      <Label for={`education[${index}].fieldStudy`}>
                        Department*
                      </Label>
                      <Input
                        type="text"
                        name={`fieldStudy[${index}].fieldStudy`}
                        id={`fieldStudy[${index}].fieldStudy`}
                        className="form-control"
                        value={service.fieldStudy}
                        required
                        onChange={(e) =>
                          handleInputChange(index, "department", e.target.value)
                        }
                        // validate={validatePackageDescription}
                      />
                      {errors.education?.[index]?.fieldStudy &&
                        touched.education?.[index]?.fieldStudy && (
                          <div className="invalid-feedback d-block">
                            {errors.education[index].fieldStudy}
                          </div>
                        )}
                    </FormGroup>
                  </Col>

                  <Col md={6}>
                    <FormGroup>
                      <Label for={`education[${index}].department`}>
                        Year of passing*
                      </Label>
                      <Input
                        type="select"
                        name={`education[${index}].year`}
                        id={`education[${index}].year`}
                        className="form-control"
                        value={service.year}
                        required
                        onChange={(e) =>
                          handleInputChange(
                            index,
                            "year",
                            parseInt(e.target.value, 10)
                          )
                        }
                      >
                        <option disabled value="">
                          Select year
                        </option>
                        {years.map((yr) => (
                          <option key={yr} value={yr}>
                            {yr}
                          </option>
                        ))}
                      </Input>
                      {errors.education?.[index]?.department &&
                        touched.education?.[index]?.department && (
                          <div className="invalid-feedback d-block">
                            {errors.education[index].department}
                          </div>
                        )}
                    </FormGroup>
                  </Col>
                </Row>

                <hr />
              </div>
            ))}

            <Card
              onClick={addEducation}
              className="p-3 text-center my-5"
              style={{ cursor: "pointer" }}
            >
              <h3 className="font-weight-bold text-primary">
                + Add more education
              </h3>
            </Card>

            <Row>
              <Col>
                <Button color="primary" onClick={handlePrevStep}>
                  Previous
                </Button>
              </Col>
              <Col className="text-right">
                <Button
                  color="primary"
                  type="submit"
                  className={`btn-shadow btn-multiple-state ${
                    profileLoading ? "show-spinner" : ""
                  }`}
                >
                  <span className="spinner d-inline-block">
                    <span className="bounce1" />
                    <span className="bounce2" />
                    <span className="bounce3" />
                  </span>
                  <span className="label">Submit</span>
                </Button>
              </Col>
            </Row>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default ApplyAsAlumniProfile;
