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
import TopNavigation from "components/wizard/TopNavigation";
import { baseUrl } from "constants/defaultValues";
import { SliderTooltip } from 'components/common/SliderTooltips';
import LawyerJumbotron from "./LawyerJumbotron";
import {
  // validateLastName,
  // validateFirstName,
  // validateEmail,
  // validatePassword,
  // validateCategory,
  validateLanguages,
  validateLocation,
  // validatePackageTitle,
  validatePackageTopic,
  validatePackageDescription,
  // validatePackageAmount,
  // validateCompany,
  // validateJobTitle,
  validateAbout,
  // validateSkills,
  validateTopics,
  validateBio,
  validateServiceName,
  // validateServiceDescription,
  // validateLinkedinUrl,
  // validateReasonForMentor,
  // validateAchievement,
  validateFile,
} from "./ValidationsPart";
// import SingleRangeSlider from "./SingleRangeSlider";


// const CategoryData = [
//   "Select Category",
//   "Category1",
//   "Category2",
//   "Category3",
//   "Category4",
// ];
// const LanguageDate=[
//   "Choose Language",
//   "TA",
//   "EN-UK",
//   "ML"

// ]
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

const LawyerLogin = ({ intl}) => {
  const forms = [createRef(null), createRef(null), createRef(null)];
  const [bottomNavHidden, setBottomNavHidden] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fields, setFields] = useState({
    image: "",
    // firstName: "",
    // lastName: "",
    headline:"",
    topics:[],
    serviceName:"",
    title:"",
    description:"",
    // email: "",
    // password: "",
    // jobTitle: "",
    // company: "",
    location: "",
    // category: "",
    // skills: [],
    bio: "",
    // linkedinUrl: "",
    // twitterHandle: "",
    // website: "",
    // introVideo: "",
    // featuredArticle: "",
    // reasonForMentor: "",
    // achievement: "",
    languages:[],
    // shortDescription:"",
    about:"",
    // amount:"",
  });
  const [aboutField, setAboutField] = useState({
    image: "",
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [amount, setAmount] = useState(1000);
  
  const handleSliderChange = (value) => {
    setAmount(value);
    
  };

  // const url = `${baseUrl}/mentor/profile`;
  const lawyerAboutUrl=`${baseUrl}/api/lawyer/about`;
  // const lawyerAboutUrl=`${baseUrl}/lawyerAbout`;
  const lawyerProfileUrl =`${baseUrl}/api/lawyer/profile` ;
  // const lawyerProfileUrl =`${baseUrl}/lawyerProfileStep` ;
  const packageUrl = `${baseUrl}/api/lawyer/services`;
  // const packageUrl = `${baseUrl}/`;

 
  function getTokenRes() {
    return localStorage.getItem('tokenRes');
}
const token = getTokenRes();
// console.log(token);

  


  const postDataAbout = async (data) => {
    try {
      const response = await axios.post(lawyerAboutUrl, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(`resres ${response.status}`);
    } catch (error) {
      console.error(error);
    }
  };
  

  const postDataProfile = async (data) => {
    try {
      const response = await axios.post(lawyerProfileUrl, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(`resres ${response.status}`);
  } catch (error) {
    console.error(error);
  }
};


  const postDataExperience = async (data) => {
    const sendData=[{...data,amount}]
    try {
      const response = await axios.post(packageUrl, sendData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };
  

  

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        const base64Image = reader.result;
        // .split(",")[1];
        setSelectedFile(base64Image);
        // setFieldValue("image", base64Image);
        setAboutField({ ...aboutField, image: base64Image });
        // console.log(base64Image)
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
            // await postData(newFields);
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
        <h1 className="mt-4 font-weight-bold">Apply as a lawyer</h1>
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
                    // image: aboutField.image,
                    firstName: fields.firstName,
                    lastName: fields.lastName,
                    // email: fields.email,
                    // password: fields.password,
                    // jobTitle: fields.jobTitle,
                    // company: fields.company,
                    location: fields.location,
                    languages:fields.languages
                  }}
                  validateOnMount
                  onSubmit={(values) => {
                    // postDataAbout(values,aboutField.image);
                    postDataAbout({ ...values, image: aboutField.image });

                    console.log(aboutField.image);
                  }}
                >
                  {({ errors, touched , setFieldValue,}) => (
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
                        <Label for="image">image</Label>
                        <Row>
                          <Col md={1}>
                            <ThumbnailImage
                              rounded
                              small
                              src={
                                selectedFile || "/assets/img/profiles/l-1.jpg"
                                // "https://gogo-react.coloredstrategies.com/assets/img/profiles/l-1.jpg"
                              }
                              alt="image"
                            />
                          </Col>
                          <Col md={5} className="mt-3">
                            <Label for="image" className="d-md-none">
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
                                id="image"
                                name="image"
                                onChange={handleFileChange}
                                // onChange={() => {
                                //   handleFileChange()}}
                                validate={validateFile}
                              />
                              {/* <Field
                                className="form-control"
                                type="file"
                                id="exampleCustomFileBrowser1"
                                name="image"
                                validate={validateFile}
                                onChange={handleFileChange}
                              /> */}
                              {errors.image && touched.image && (
                                <div className="invalid-feedback d-block">
                                  {errors.image}
                                </div>
                              )}
                            </InputGroup>
                          </Col>
                        </Row>
                      </FormGroup>
                      {/* <Row>
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
                      </Row> */}
                      {/* <Row>
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
                      </Row> */}
                      {/* <Row>
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
                      </Row> */}
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
                      <FormGroup className="error-l-75">
                        <Label>Languages*</Label>
                        <Field
                          
                          type="text"
                          name="languages"
                          validate={validateLanguages}
                          className="form-control"
                          placeholder="Enter your languages (comma-separated)"
                          onChange={(e) => {
                            const languagesArray = e.target.value
                              .split(",")
                              .map((languages) => languages.trim());
                            setFieldValue("languages", languagesArray);
                          }}
                        />
                          
                        
                        {errors.languages && touched.languages && (
                          <div className="invalid-feedback d-block">
                            {errors.languages}
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
                    // category: fields.category,
                    // skills: fields.skills,
                    bio: fields.bio,
                    topics:fields.topics,
                   
                    about:fields.about
                    // linkedinUrl: fields.linkedinUrl,
                    // twitterHandle: fields.twitterHandle,
                    // website: fields.website,
                  }}
                  onSubmit={(values) => {
                    postDataProfile(values);
                  }}
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
                      {/* <FormGroup className="error-l-75">
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
                      </FormGroup> */}
                       {/* <FormGroup className="error-l-75">
                        <Label>Languages*</Label>
                        <Field
                          
                          type="text"
                          name="languages"
                          validate={validateLanguages}
                          className="form-control"
                          placeholder="Enter your languages (comma-separated)"
                          onChange={(e) => {
                            const languagesArray = e.target.value
                              .split(",")
                              .map((languages) => languages.trim());
                            setFieldValue("languages", languagesArray);
                          }}
                        />
                          
                        
                        {errors.languages && touched.languages && (
                          <div className="invalid-feedback d-block">
                            {errors.languages}
                          </div>
                        )}
                      </FormGroup> */}

                      {/* <FormGroup>
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
                      </FormGroup> */}
                      <FormGroup>
                        <Label for="topics">Topics*</Label>
                        <Field
                          type="text"
                          name="topics"
                          id="topics"
                          className="form-control"
                          placeholder="Enter your topics (comma-separated)"
                          validate={validateTopics}
                          onChange={(e) => {
                            const topicArray = e.target.value
                              .split(",")
                              .map((topics) => topics.trim());
                            setFieldValue("topics", topicArray);
                          }}
                        />
                        {errors.topics && touched.topics && (
                          <div className="invalid-feedback d-block">
                            {errors.topics}
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
                        {/* <FormText color="muted">
                          Tell us (and your mentees) a little bit about
                          yourself. Talk about yourself in the first person, as
                          if you&apos;d directly talk to a mentee. This will be
                          public.
                        </FormText> */}
                      </FormGroup>
                      <FormGroup>
                        <Label for="about">About*</Label>
                        <Field
                          as="textarea"
                          name="about"
                          id="about"
                          className="form-control"
                          validate={validateAbout}
                        />
                        {errors.about && touched.about && (
                          <div className="invalid-feedback d-block">
                            {errors.about}
                          </div>
                        )}
                        <FormText color="muted">
                          Tell us (and your mentees) a little bit about
                          yourself. Talk about yourself in the first person, as
                          if you&apos;d directly talk to a mentee. This will be
                          public.
                        </FormText>
                      </FormGroup>
                      {/* <FormGroup className="error-l-125">
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
                           
                          </Col>
                        </Row>
                      </FormGroup>
                      <FormGroup>
                        <Label for="website">Personal Website (optional)</Label>
                        <Field
                          type="url"
                          name="website"
                          id="website"
                          className="form-control"
                        />
                        <FormText color="muted">
                          You can add your blog, GitHub profile or similar here
                        </FormText>
                    
                      </FormGroup> */}
                    </Form>
                  )}
                </Formik>
              </div>
            </Step>
            <Step
              id="step3"
              name="Services"
              desc={messages["wizard.step-desc-3"]}
            >
              <div className="wizard-basic-step">
                <Formik
                  innerRef={forms[2]}
                  initialValues={{
                    // introVideo: fields.introVideo,
                    // featuredArticle: fields.featuredArticle,
                    // reasonForMentor: fields.reasonForMentor,
                    // achievement: fields.achievement,
                    // title:fields.title,
                    headline:fields.headline,
                    // shortDescription:fields.description,
                    serviceName:fields.serviceName,
                    description:fields.servicedescription,
                    // amount:fields.amount
                  }}
                  onSubmit={(values) => {
                    postDataExperience(values);
                  }}
                  validateOnMount
                >
                  {({ errors, touched }) => (
                    <Form className="av-tooltip tooltip-label-right">
                      <Alert color="primary">
                        <strong>Almost there!</strong> <br /> You&apos;re just
                        one last step away from being a lawyer and connecting
                        with mentees all over the world! in this step, shows off
                        your accomplishments and how you can help others.
                        <br />
                        <br /> Many of these fields are optional, but will help
                        us get better insights into your work - and therefore
                        exponentially increase your chances. They also give you
                        a jumpstart once you&apos;re a lawyer.
                      </Alert>
                    

                      <Row>
                        <Col md={12}>
                        <FormGroup className="error-l-75">
                            <Label>Service Name*</Label>
                            <Field
                              className="form-control"
                              name="serviceName"
                              validate={validateServiceName}
                            />
                            {errors.serviceName && touched.serviceName && (
                              <div className="invalid-feedback d-block">
                                {errors.serviceName}
                              </div>
                            )}
                          </FormGroup>
                        </Col>
                        {/* <Col md={6}>
                        <FormGroup className="error-l-75">
                            <Label>Service Description*</Label>
                            <Field
                              className="form-control"
                              name="servicedescription"
                              validate={validateServiceDescription}
                            />
                            {errors.servicedescription && touched.servicedescription && (
                              <div className="invalid-feedback d-block">
                                {errors.servicedescription}
                              </div>
                            )}
                          </FormGroup>
                        </Col> */}
                      </Row>
                      <Row>
                      {/* <Col md={6}>
                      <FormGroup>
                        <Label>Service Amount</Label>
                        
                        <SliderExamples/>
                      </FormGroup>
         
                      </Col> */}
                      </Row>
                      <FormGroup>
                        <Row>
                          {/* <Col md={6}>
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
                          
                          </Col> */}
                          {/* <Col md={12}>
                          <FormGroup className="error-l-75">
                            <Label>Package Name*</Label>
                            <Field
                              className="form-control"
                              name="title"
                              validate={validatePackageTitle}
                            />
                            {errors.title && touched.title && (
                              <div className="invalid-feedback d-block">
                                {errors.title}
                              </div>
                            )}
                          </FormGroup>
                        </Col> */}
                          {/* <Col md={6}>
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
                          </Col> */}
                          
                        </Row>
                      </FormGroup>
                      <FormGroup>
                        <Label for="headline">Headline*</Label>
                        <Field
                          
                          name="headline"
                          id="headline"
                          className="form-control"
                          validate={validatePackageTopic}
                        />
                        {errors.topic && touched.topic && (
                          <div className="invalid-feedback d-block">
                            {errors.topic}
                          </div>
                        )}
                       
                      </FormGroup>
                      <FormGroup>
                        <Label for="description">Description*</Label>
                        <Field
                          as="textarea"
                          name="description"
                          id="description"
                          className="form-control"
                          validate={validatePackageDescription}
                        />
                        {errors.desc && touched.desc && (
                          <div className="invalid-feedback d-block">
                            {errors.desc}
                          </div>
                        )}
                       
                      </FormGroup>
                          <Row>
                            <Col md={6}>
                            <FormGroup className="error-l-75">
                            <Label>Amount*</Label>
                             {/* <Field
                              className="form-control"
                              name="amount"
                              validate={validatePackageAmount}
                            />
                            {errors.amount && touched.amount && (
                              <div className="invalid-feedback d-block">
                                {errors.amount}
                              </div>
                            )}  */}
                           {/* <SingleRangeSlider/> */}
                           <SliderTooltip
                          min={0}
                          max={2500}
                          
                          defaultValue={amount}
                          className="mb-5"
                          step={500}
                          value={amount} 
                          onChange={handleSliderChange}
          
                 />
                          </FormGroup>
                            </Col>
                          </Row>
                         
                       

                      {/* <FormGroup>
                        <Label>
                          Why do you want to become a mentor?(Not publicly
                          visible)*
                        </Label>
                        <Field
                          as="textarea"
                          name="reasonForMentor"
                          id="reasonForMentor"
                          className="form-control"
                          validate={validateReasonForMentor}
                        />
                        {errors.reasonForMentor && touched.reasonForMentor && (
                          <div className="invalid-feedback d-block">
                            {errors.reasonForMentor}
                          </div>
                        )}
                      </FormGroup> */}
                      {/* <FormGroup>
                        <Label>
                          What, in your opinion, has been your greatest
                          achievement so far?(Not publicly visible)*
                        </Label>
                        <Field
                          as="textarea"
                          name="achievement"
                          id="achievement"
                          className="form-control"
                          validate={validateAchievement}
                        />
                        {errors.achievement && touched.achievement && (
                          <div className="invalid-feedback d-block">
                            {errors.achievement}
                          </div>
                        )}
                      </FormGroup> */}
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
                   
                    <LawyerJumbotron/>
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
export default injectIntl(LawyerLogin);