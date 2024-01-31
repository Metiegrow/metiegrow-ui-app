/* eslint-disable no-param-reassign */
import React, { createRef, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  FormGroup,
  Label,
  Spinner,
  Row,
  Col,
  FormText,
  Alert,
  CustomInput,
  InputGroupAddon,
  InputGroup,
} from "reactstrap";
import axios from "axios";
import ThumbnailImage from "components/cards/ThumbnailImage";
import { Wizard, Steps, Step, WithWizard } from "react-albus";
import { injectIntl } from "react-intl";
import { Formik, Form, Field } from "formik";
// import IntlMessages from "helpers/IntlMessages";
// import BottomNavigation from "components/wizard/BottomNavigation";
import TopNavigation from "components/wizard/TopNavigation";
// import { AvField, AvForm } from "availity-reactstrap-validation";
// import Experience from "./Experience";
// import { FormikTagsInput } from "containers/form-validations/FormikFields";
import { baseUrl } from "constants/defaultValues";
import JumbotronUi from "./JumbotronUi";
import {
  validateLastName,
  validateFirstName,
  validateEmail,
  validatePassword,
  validateCategory,
  validateLocation,
  validateCompany,
  validateJobTitle,
  validateSkills,
  validateBio,
  validateLinkedinUrl,
  validateWhy,
  validateWhat,
  validateFile,
} from "./validation";

const CategoryData = [
  "Select Category",
  "Category1",
  "Category2",
  "Category3",
  "Category4",
];
const LocationData = [
  "Select Location",
  "Location1",
  "Location2",
  "Location3",
  "Location4",
];

const BottomNavigation = ({
  className,
  onClickPrev,
  prevLabel,
  onClickNext,
  // nextLabel,
}) => {
  return (
    <WithWizard
      render={({ next, previous, step, steps }) => {
        if (steps.indexOf(step) === 3) {
          return null;
        }

        return (
          <div className={`wizard-buttons ${className}`}>
            {steps.indexOf(step) > 0 && (
              <div className="position-relative w-100 h-100">
                <Button
                  color="primary"
                  outline
                  className={`mr-1 ${
                    steps.indexOf(step) <= 0 ? "disabled" : ""
                  }`}
                  onClick={() => {
                    onClickPrev(previous, steps, step);
                  }}
                >
                  {prevLabel}
                </Button>
              </div>
            )}
            <div>
              <Button
                color="primary"
                className={`${
                  steps.indexOf(step) >= steps.length - 1 ? "disabled" : ""
                } text-nowrap  ml-2`}
                onClick={() => {
                  onClickNext(next, steps, step);
                }}
              >
                {/* {nextLabel} */}
                {steps.indexOf(step) === 2 ? "Submit Application" : "Next Step"}
              </Button>
            </div>
          </div>
        );
      }}
    />
  );
};

const Mylogin = ({ intl }) => {
  const forms = [createRef(null), createRef(null), createRef(null)];
  const [bottomNavHidden, setBottomNavHidden] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fields, setFields] = useState({
    // photo: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    jobTitle: "",
    company: "",
    location: "",
    category: "",
    skills: [],
    bio: "",
    linkedinUrl: "",
    twitterHandle: "",
    personalWebsite: "",
    introVideo: "",
    featuredArticle: "",
    why: "",
    what: "",
  });
  const [selectedFile, setSelectedFile] = useState(null);

  const url = `${baseUrl}/mentor/profile`;

  // const postData = async () => {

  //     await axios.post(url, fields);

  // };

  const postData = async (data) => {
    await axios.post(url, data);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setSelectedFile(reader.result);
      };

      reader.readAsDataURL(file);
    }
  };

  const onClickNext = (goToNext, steps, step) => {
    if (steps.length - 1 <= steps.indexOf(step)) {
      return;
    }
    const formIndex = steps.indexOf(step);
    const form = forms[formIndex].current;

    form.submitForm().then(async () => {
      if (!form.isDirty && form.isValid) {
        const newFields = { ...fields, ...form.values };
        setFields(newFields);

        if (steps.length - 2 <= steps.indexOf(step)) {
          // done
          setBottomNavHidden(true);
          setLoading(true);

          try {
            await postData(newFields);

            setTimeout(() => {
              setLoading(false);
            }, 3000);
          } catch (error) {
            console.error("Error posting data:", error);
            setLoading(false);
          }
        }

        goToNext();
        step.isDone = true;
      }
    });
  };

  const onClickPrev = (goToPrev, steps, step) => {
    if (steps.indexOf(step) <= 0) {
      return;
    }
    goToPrev();
  };

  const { messages } = intl;
  return (
    <Card className="mx-auto my-4 " style={{ maxWidth: "900px" }}>
      <CardBody className="wizard wizard-default">
        <h1 className="mt-4 font-weight-bold">Apply as a mentor</h1>
        <Wizard>
          <TopNavigation className="justify-content-center" disableNav />
          <Steps>
            <Step
              id="step1"
              name="About You"
              desc={messages["wizard.step-desc-1"]}
            >
              <div className="wizard-basic-step">
                <Formik
                  innerRef={forms[0]}
                  initialValues={{
                    photo: fields.photo,
                    firstName: fields.firstName,
                    lastName: fields.lastName,
                    email: fields.email,
                    password: fields.password,
                    jobTitle: fields.jobTitle,
                    company: fields.company,
                    location: fields.location,
                  }}
                  validateOnMount
                  onSubmit={(values) => {
                    console.log("Form 1 values:", values);
                  }}
                >
                  {({ errors, touched }) => (
                    <Form className="av-tooltip tooltip-label-right ">
                      <Alert color="primary">
                        <strong>Lovely to see you!</strong>
                        <br /> Filling out the form only takes a couple of
                        minutes. We&apos;d love to learn more about your
                        background and the ins-and-outs of why you&apos;d like
                        to become a mentor. Keep things personal and talk
                        directly to us and your mentees. We don&apos;t need
                        jargon and polished cover letters here! <br />
                        <br />
                        You agree to our code of conduct and the mentor
                        agreement by sending the form, so be sure to have a look
                        at those.
                      </Alert>
                      <FormGroup>
                        <Label for="photo">Photo</Label>
                        <Row>
                          <Col md={1}>
                            <ThumbnailImage
                              rounded
                              small
                              src={
                                selectedFile || "/assets/img/profiles/l-1.jpg"
                                // "https://gogo-react.coloredstrategies.com/assets/img/profiles/l-1.jpg"
                              }
                              alt="photo"
                            />
                          </Col>
                          <Col md={5} className="mt-3">
                            <Label for="photo" className="d-md-none">
                              Photo
                            </Label>
                            <InputGroup className="mb-3">
                              <InputGroupAddon
                                addonType="prepend"
                                className="cursor-pointer"
                              >
                                Upload Photo
                              </InputGroupAddon>
                              <CustomInput
                                type="file"
                                id="exampleCustomFileBrowser1"
                                name="photo"
                                onChange={handleFileChange}
                                validate={validateFile}
                              />
                              {/* <Field
                                className="form-control"
                                type="file"
                                id="exampleCustomFileBrowser1"
                                name="photo"
                                validate={validateFile}
                                onChange={handleFileChange}
                              /> */}
                              {errors.photo && touched.photo && (
                                <div className="invalid-feedback d-block">
                                  {errors.photo}
                                </div>
                              )}
                            </InputGroup>
                          </Col>
                        </Row>
                      </FormGroup>
                      <Row>
                        <Col md={6}>
                          <FormGroup className="error-l-75">
                            <Label>First Name*</Label>
                            <Field
                              className="form-control"
                              name="firstName"
                              validate={validateFirstName}
                            />
                            {errors.firstName && touched.firstName && (
                              <div className="invalid-feedback d-block">
                                {errors.firstName}
                              </div>
                            )}
                          </FormGroup>
                        </Col>
                        <Col md={6}>
                          <FormGroup className="error-l-75">
                            <Label>Last Name*</Label>
                            <Field
                              className="form-control"
                              name="lastName"
                              validate={validateLastName}
                            />
                            {errors.lastName && touched.lastName && (
                              <div className="invalid-feedback d-block">
                                {errors.lastName}
                              </div>
                            )}
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col md={6}>
                          <FormGroup>
                            <Label>Email*</Label>
                            <Field
                              className="form-control"
                              name="email"
                              type="email"
                              validate={validateEmail}
                            />
                            {errors.email && touched.email && (
                              <div className="invalid-feedback d-block">
                                {errors.email}
                              </div>
                            )}
                          </FormGroup>
                        </Col>
                        <Col md={6}>
                          <FormGroup className="error-l-125">
                            <Label>Choose a Password*</Label>
                            <Field
                              className="form-control"
                              name="password"
                              type="password"
                              validate={validatePassword}
                            />
                            {errors.password && touched.password && (
                              <div className="invalid-feedback d-block">
                                {errors.password}
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
                              type="text"
                              name="jobTitle"
                              validate={validateJobTitle}
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
                              type="text"
                              name="company"
                              validate={validateCompany}
                            />
                            {errors.company && touched.company && (
                              <div className="invalid-feedback d-block">
                                {errors.company}
                              </div>
                            )}
                          </FormGroup>
                        </Col>
                      </Row>
                      <FormGroup className="error-l-75">
                        <Label>Location*</Label>
                        <Field
                          as="select"
                          name="location"
                          validate={validateLocation}
                          className="form-control"
                        >
                          {LocationData.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </Field>
                        {errors.location && touched.location && (
                          <div className="invalid-feedback d-block">
                            {errors.location}
                          </div>
                        )}
                      </FormGroup>
                    </Form>
                  )}
                </Formik>
              </div>
            </Step>
            <Step
              id="step2"
              name="Profile"
              desc={messages["wizard.step-desc-2"]}
            >
              <div className="wizard-basic-step">
                <Formik
                  innerRef={forms[1]}
                  initialValues={{
                    category: fields.category,
                    skills: fields.skills,
                    bio: fields.bio,
                    linkedinUrl: fields.linkedinUrl,
                    twitterHandle: fields.twitterHandle,
                    personalWebsite: fields.personalWebsite,
                  }}
                  onSubmit={() => {}}
                  validateOnMount
                >
                  {({
                    errors,
                    touched,
                    // values,
                    setFieldValue,
                    // setFieldTouched,
                  }) => (
                    <Form className="av-tooltip tooltip-label-right">
                      <FormGroup className="error-l-75">
                        <Label>Category*</Label>
                        <Field
                          as="select"
                          name="category"
                          validate={validateCategory}
                          className="form-control"
                        >
                          {CategoryData.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </Field>
                        {errors.category && touched.category && (
                          <div className="invalid-feedback d-block">
                            {errors.category}
                          </div>
                        )}
                      </FormGroup>

                      <FormGroup>
                        <Label for="skills">Skills*</Label>
                        <Field
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
                        />
                        {errors.skills && touched.skills && (
                          <div className="invalid-feedback d-block">
                            {errors.skills}
                          </div>
                        )}
                        <FormText color="muted">
                          Describe your expertise to connect with mentees who
                          have similar interests.
                          <br />
                          Comma-separated list of your skills (keep it below
                          10). Mentees will use this to find you.
                        </FormText>
                      </FormGroup>

                      {/* <FormGroup className="error-l-175">
                        <Label className="d-block">
                          Skills*
                        </Label>

                        <FormikTagsInput
                          name="skills"
                          value={values.skills}
                          onChange={setFieldValue}
                          onBlur={setFieldTouched}
                          validate={validateSkills}
                        />

                        {errors.skills && touched.skills && (
                          <div className="invalid-feedback d-block">
                            {errors.skills}
                          </div>
                        )}
                      </FormGroup> */}

                      <FormGroup>
                        <Label for="bio">Bio*</Label>
                        <Field
                          as="textarea"
                          name="bio"
                          id="bio"
                          className="form-control"
                          validate={validateBio}
                        />
                        {errors.bio && touched.bio && (
                          <div className="invalid-feedback d-block">
                            {errors.bio}
                          </div>
                        )}
                        <FormText color="muted">
                          Tell us (and your mentees) a little bit about
                          yourself. Talk about yourself in the first person, as
                          if you&apos;d directly talk to a mentee. This will be
                          public.
                        </FormText>
                      </FormGroup>
                      <FormGroup className="error-l-125">
                        <Row>
                          <Col md={6}>
                            <Label for="linkedinUrl">LinkedIn URL*</Label>
                            <Field
                              className="form-control"
                              name="linkedinUrl"
                              type="url"
                              validate={validateLinkedinUrl}
                            />
                            {errors.linkedinUrl && touched.linkedinUrl && (
                              <div className="invalid-feedback d-block">
                                {errors.linkedinUrl}
                              </div>
                            )}
                          </Col>
                          <Col md={6}>
                            <Label for="twitterHandle">
                              Twitter Handle (optional)
                            </Label>
                            <Field
                              type="text"
                              name="twitterHandle"
                              id="twitterHandle"
                              className="form-control"
                            />
                            <FormText color="muted">
                              Omit the &ldquo;@&rdquo; -e.g.
                              &ldquo;dqmonn&rdquo;
                            </FormText>
                            {/* {errors.twitterHandle && touched.twitterHandle && (
                              <div className="invalid-feedback d-block">
                                {errors.twitterHandle}
                              </div>
                            )} */}
                          </Col>
                        </Row>
                      </FormGroup>
                      <FormGroup>
                        <Label for="personalWebsite">
                          Personal Website (optional)
                        </Label>
                        <Field
                          type="url"
                          name="personalWebsite"
                          id="personalWebsite"
                          className="form-control"
                        />
                        <FormText color="muted">
                          You can add your blog, GitHub profile or similar here
                        </FormText>
                        {/* {errors.personalWebsite && touched.personalWebsite && (
                          <div className="invalid-feedback d-block">
                            {errors.personalWebsite}
                          </div>
                        )} */}
                      </FormGroup>
                    </Form>
                  )}
                </Formik>
              </div>
            </Step>
            <Step
              id="step3"
              name="Experience"
              desc={messages["wizard.step-desc-3"]}
            >
              <div className="wizard-basic-step">
                <Formik
                  innerRef={forms[2]}
                  initialValues={{
                    introVideo: fields.introVideo,
                    featuredArticle: fields.featuredArticle,
                    why: fields.why,
                    what: fields.what,
                  }}
                  onSubmit={(values) => {
                    console.log("Form 3 values:", values);
                  }}
                  validateOnMount
                >
                  {({ errors, touched }) => (
                    <Form className="av-tooltip tooltip-label-right">
                      <Alert color="primary">
                        <strong>Almost there!</strong> <br /> You&apos;re just
                        one last step away from being a mentor and connecting
                        with mentees all over the world! in this step, shows off
                        your accomplishments and how you can help others.
                        <br />
                        <br /> Many of these fields are optional, but will help
                        us get better insights into your work - and therefore
                        exponentially increase your chances. They also give you
                        a jumpstart once you&apos;re a mentor.
                      </Alert>
                      <FormGroup>
                        <Row>
                          <Col md={6}>
                            <Label for="introVideo">Intro Video</Label>
                            <Field
                              type="url"
                              name="introVideo"
                              id="introVideo"
                              className="form-control"
                            />
                            <FormText color="muted">
                              Add a youTube video or record a Loom for your
                              future mentees
                            </FormText>
                            {/* {errors.introvideo && touched.introvideo && (
                          <div className="invalid-feedback d-block">
                            {errors.introvideo}
                          </div>
                          )} */}
                          </Col>
                          <Col md={6}>
                            <Label for="featuredArticle">
                              Featured Article
                            </Label>
                            <Field
                              type="url"
                              name="featuredArticle"
                              id="featuredArticle"
                              className="form-control"
                            />
                            <FormText color="muted">
                              Link an interview / podcast / piece of writing you
                              are proud of or were featured in.
                            </FormText>
                          </Col>
                        </Row>
                      </FormGroup>
                      <FormGroup>
                        <Label>
                          Why do you want to become a mentor?(Not publicly
                          visible)*
                        </Label>
                        <Field
                          as="textarea"
                          name="why"
                          id="why"
                          className="form-control"
                          validate={validateWhy}
                        />
                        {errors.why && touched.why && (
                          <div className="invalid-feedback d-block">
                            {errors.why}
                          </div>
                        )}
                      </FormGroup>
                      <FormGroup>
                        <Label>
                          What, in your opinion, has been your greatest
                          achievement so far?(Not publicly visible)*
                        </Label>
                        <Field
                          as="textarea"
                          name="what"
                          id="what"
                          className="form-control"
                          validate={validateWhat}
                        />
                        {errors.what && touched.what && (
                          <div className="invalid-feedback d-block">
                            {errors.what}
                          </div>
                        )}
                      </FormGroup>
                    </Form>
                  )}
                </Formik>
              </div>
            </Step>
            <Step id="step4" hideTopNav>
              <div className="wizard-basic-step text-center pt-3">
                {loading ? (
                  <div>
                    <Spinner color="primary" className="mb-1" />
                    <p>
                      {/* <IntlMessages id="wizard.async" /> */}
                      Submitting
                    </p>
                  </div>
                ) : (
                  <div>
                    {/* <h2 className="mb-2">
                      <IntlMessages id="wizard.content-thanks" />
                    </h2>
                    <p>
                      <IntlMessages id="wizard.registered" />
                    </p> */}
                    <JumbotronUi />
                  </div>
                )}
              </div>
            </Step>
          </Steps>
          <BottomNavigation
            onClickNext={onClickNext}
            onClickPrev={onClickPrev}
            className={`justify-content-center ${
              bottomNavHidden && "invisible"
            }`}
            prevLabel="Previous Step"
            // nextLabel="Next Step"
          />
        </Wizard>
      </CardBody>
    </Card>
  );
};
export default injectIntl(Mylogin);
