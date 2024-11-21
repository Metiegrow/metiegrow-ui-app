import axios from "axios";
import { NotificationManager } from "components/common/react-notifications";
import { baseUrl } from "constants/defaultValues";
import { Form, Formik } from "formik";
import { createRef, useState } from "react";
import "react-tagsinput/react-tagsinput.css";
import { Button, Card, Col, FormGroup, Input, Label, Row } from "reactstrap";
import { EmploymentTypeData } from "../../Listing/ListingData";
import ToasterComponent from "../../notifications/ToasterComponent";

const RealEstateAgentExperience = ({
  currentStep,
  setCurrentStep,
  setLoading,
}) => {
  const forms = [createRef(null), createRef(null), createRef(null)];
  const [profileLoading, setProfileLoading] = useState(false);
  const currentYear = new Date().getFullYear();
  const [work, setWork] = useState({
    experiences: [
      {
        company: "",
        jobTitle: "",
        employmentType: "",
        jobLocation: "",
        startYear: "",
        endYear: "",
        // price: "",
      },
    ],
    price: "",
  });
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

  const hrExperienceUrl = `${baseUrl}/api/humanresource/experience`;

  const token = localStorage.getItem("tokenRes");

  const postExperience = async (data) => {
    setProfileLoading(true);
    try {
      const response = await axios.post(hrExperienceUrl, data, {
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
    setWork((prevState) => ({
      ...prevState,
      experiences: prevState.experiences.filter((_, i) => i !== index),
    }));
  };

  const addWorkExperience = () => {
    setWork((prevState) => ({
      ...prevState,
      experiences: [
        ...prevState.experiences,
        {
          company: "",
          jobTitle: "",
          employmentType: "",
          jobLocation: "",
          startYear: "",
          endYear: "",
        },
      ],
    }));
  };

  const handleWorkInputChange = (index, field, value) => {
    setWork((prevState) => ({
      ...prevState,
      experiences: prevState.experiences.map((exp, i) =>
        i === index ? { ...exp, [field]: value } : exp
      ),
      // If the field being updated is 'price', update the outer price as well
      //   price: field === "price" ? value : prevState.price,
    }));
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
            {work.experiences.map((works, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <div key={index}>
                <div className="text-right">
                  {work.experiences.length > 1 && (
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
                        Start year*
                      </Label>

                      <Input
                        type="select"
                        name={`education[${index}].startYear`}
                        id={`education[${index}].startYear`}
                        className="form-control"
                        value={works.startYear}
                        required
                        onChange={(e) =>
                          handleWorkInputChange(
                            index,
                            "startYear",
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

                      {errors.education?.[index]?.startYear &&
                        touched.education?.[index]?.startYear && (
                          <div className="invalid-feedback d-block">
                            {errors.education[index].startYear}
                          </div>
                        )}
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup>
                      <Label for={`education[${index}].endYear`}>
                        End year*
                      </Label>
                      <Input
                        type="select"
                        name={`education[${index}].endYear`}
                        id={`education[${index}].endYear`}
                        className="form-control"
                        value={works.endYear}
                        required
                        onChange={(e) =>
                          handleWorkInputChange(
                            index,
                            "endYear",
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
                      {errors.education?.[index]?.endYear &&
                        touched.education?.[index]?.endYear && (
                          <div className="invalid-feedback d-block">
                            {errors.education[index].endYear}
                          </div>
                        )}
                    </FormGroup>
                  </Col>
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
            {/* <Row className="my-2">
              <Col md={12}>
                <FormGroup>
                  <Label for="price">Price*</Label>
                  <Input
                    type="number"
                    name="price"
                    id="price"
                    required
                    className="form-control"
                    value={work.price || ""}
                    onChange={(e) => {
                      const value = e.target?.value;
                      if (value !== null && value !== undefined) {
                        setWork((prevState) => ({
                          ...prevState,
                          price: value, // Update price directly here
                        }));
                      }
                    }}
                  />
                  {errors.price && touched.price && (
                    <div className="invalid-feedback d-block">
                      {errors.price}
                    </div>
                  )}
                </FormGroup>
              </Col>
            </Row> */}
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

export default RealEstateAgentExperience;
