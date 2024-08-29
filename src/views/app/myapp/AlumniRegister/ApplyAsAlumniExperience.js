import axios from "axios";
import { NotificationManager } from "components/common/react-notifications";
import { baseUrl } from "constants/defaultValues";
import { Form, Formik } from "formik";
import { createRef, useState } from "react";
import "react-tagsinput/react-tagsinput.css";
import { Button, Card, Col, FormGroup, Input, Label, Row } from "reactstrap";
import { EmploymentTypeData } from "../Listing/ListingData";
import ToasterComponent from "../notifications/ToasterComponent";

const ApplyAsAlumniexperience = ({
  currentStep,
  setCurrentStep,
  setLoading,
}) => {
  const forms = [createRef(null), createRef(null), createRef(null)];
  const [profileLoading, setProfileLoading] = useState(false);
  const currentYear = new Date().getFullYear();
  const [work, setWork] = useState([
    {
      company: "",
      jobTitle: "",
      employmentType: "",
      jobLocation: "",
      startDate: "",
      endDate: "",
      price: "",
    },
  ]);
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

  const alumniExperienceUrl = `${baseUrl}/api/alumni/alumnidetails/experience`;

  const token = localStorage.getItem("tokenRes");

  const postExperience = async (data) => {
    setProfileLoading(true);
    try {
      const response = await axios.post(alumniExperienceUrl, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProfileLoading(false);
      ToasterComponent("success", response.data.statuses);
      handleNextStep();
      localStorage.setItem("status", "3");
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 3000);
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

  const removeWorkExperience = (index) => {
    const newWorkExperience = [...work];
    newWorkExperience.splice(index, 1);
    setWork(newWorkExperience);
  };

  const addWorkExperience = () => {
    setWork([
      ...work,
      {
        company: "",
        jobTitle: "",
        employmentType: "",
        jobLocation: "",
        startDate: "",
        endDate: "",
      },
    ]);
  };

  const handleWorkInputChange = (index, field, value) => {
    setWork((previousWorkExperience) =>
      previousWorkExperience.map((works, i) =>
        i === index ? { ...works, [field]: value } : works
      )
    );
  };

  return (
    <>
      <Formik
        innerRef={forms[2]}
        initialValues={work}
        onSubmit={() => {
          postExperience(work);
        }}
        validateOnMount
      >
        {({ errors, touched }) => (
          <Form className="av-tooltip tooltip-label-right my-4">
            {work.map((works, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <div key={index}>
                <div className="text-right">
                  {work.length > 1 && (
                    <span>
                      <Button
                        id="closeButton"
                        color="primary"
                        outline
                        className="icon-button"
                        onClick={() => removeWorkExperience(index)}
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
                      <Label>Company Name*</Label>
                      <Input
                        className="form-control"
                        required
                        name={`education[${index}].company`}
                        value={works.company}
                        onChange={(e) =>
                          handleWorkInputChange(
                            index,
                            "company",
                            e.target.value
                          )
                        }
                      />
                      {errors.education?.[index]?.company &&
                        touched.education?.[index]?.company && (
                          <div className="invalid-feedback d-block">
                            {errors.education[index].company}
                          </div>
                        )}
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup>
                      <Label for={`education[${index}].jobTitle`}>
                        Job title*
                      </Label>
                      <Input
                        name={`education[${index}].jobTitle`}
                        id={`education[${index}].jobTitle`}
                        required
                        className="form-control"
                        value={works.jobTitle}
                        onChange={(e) =>
                          handleWorkInputChange(
                            index,
                            "jobTitle",
                            e.target.value
                          )
                        }
                      />
                      {errors.education?.[index]?.jobTitle &&
                        touched.education?.[index]?.jobTitle && (
                          <div className="invalid-feedback d-block">
                            {errors.education[index].jobTitle}
                          </div>
                        )}
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <FormGroup>
                      <Label for={`education[${index}].employmentType`}>
                        Employment type*
                      </Label>
                      <Input
                        type="select"
                        name={`education[${index}].employmentType`}
                        id={`education[${index}].employmentType`}
                        className="form-control"
                        value={works.employmentType}
                        required
                        onChange={(e) =>
                          handleWorkInputChange(
                            index,
                            "employmentType",
                            e.target.value
                          )
                        }
                      >
                        <option key="" value="" disabled>
                          Select Employment type
                        </option>
                        {EmploymentTypeData.map((option, i) => (
                          // eslint-disable-next-line react/no-array-index-key
                          <option key={i} value={option.label}>
                            {option.label}
                          </option>
                        ))}
                      </Input>

                      {errors.education?.[index]?.employmentType &&
                        touched.education?.[index]?.employmentType && (
                          <div className="invalid-feedback d-block">
                            {errors.education[index].employmentType}
                          </div>
                        )}
                    </FormGroup>
                  </Col>

                  <Col md={6}>
                    <FormGroup>
                      <Label for={`education[${index}].jobLocation`}>
                        Job location*
                      </Label>
                      <Input
                        type="text"
                        name={`education[${index}].jobLocation`}
                        id={`education[${index}].jobLocation`}
                        className="form-control"
                        required
                        value={works.jobLocation}
                        onChange={(e) =>
                          handleWorkInputChange(
                            index,
                            "jobLocation",
                            e.target.value
                          )
                        }
                        // validate={validatePackageDescription}
                      />
                      {errors.education?.[index]?.jobLocation &&
                        touched.education?.[index]?.jobLocation && (
                          <div className="invalid-feedback d-block">
                            {errors.education[index].jobLocation}
                          </div>
                        )}
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <FormGroup>
                      <Label for={`education[${index}].startDate`}>
                        Start year
                      </Label>

                      <Input
                        type="select"
                        name={`education[${index}].startDate`}
                        id={`education[${index}].startDate`}
                        className="form-control"
                        value={works.startDate}
                        required
                        onChange={(e) =>
                          handleWorkInputChange(
                            index,
                            "startDate",
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

                      {errors.education?.[index]?.startDate &&
                        touched.education?.[index]?.startDate && (
                          <div className="invalid-feedback d-block">
                            {errors.education[index].startDate}
                          </div>
                        )}
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup>
                      <Label for={`education[${index}].endDate`}>
                        End year
                      </Label>
                      <Input
                        type="select"
                        name={`education[${index}].endDate`}
                        id={`education[${index}].endDate`}
                        className="form-control"
                        value={works.endDate}
                        required
                        onChange={(e) =>
                          handleWorkInputChange(
                            index,
                            "endDate",
                            parseInt(e.target.value, 10)
                          )
                        }
                        // validate={validatePackageDescription}
                      >
                        <option disabled value="">
                          Select year
                        </option>
                        {years.map((yr) => (
                          <option key={yr} value={yr}>
                            {currentYear === yr ? "Present" : yr}
                          </option>
                        ))}
                      </Input>
                      {errors.education?.[index]?.endDate &&
                        touched.education?.[index]?.endDate && (
                          <div className="invalid-feedback d-block">
                            {errors.education[index].endDate}
                          </div>
                        )}
                    </FormGroup>
                  </Col>
                  <Row>
                    <Col>
                      <FormGroup className="error-l-75">
                        <Label>Price</Label>
                        <Input
                          className="form-control"
                          name={`education[${index}].company`}
                          value={works.price}
                          onChange={(e) =>
                            handleWorkInputChange(
                              index,
                              "Price",
                              e.target.value
                            )
                          }
                        />
                        {errors.education?.[index]?.company &&
                          touched.education?.[index]?.company && (
                            <div className="invalid-feedback d-block">
                              {errors.education[index].price}
                            </div>
                          )}
                      </FormGroup>
                    </Col>
                  </Row>
                </Row>
                <hr />
              </div>
            ))}

            <Card
              onClick={addWorkExperience}
              className="p-3 text-center my-5"
              style={{ cursor: "pointer" }}
            >
              <h3 className="font-weight-bold text-primary">
                + Add more work experience
              </h3>
            </Card>
            <Row>
              {" "}
              <Col>
                {" "}
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

export default ApplyAsAlumniexperience;
