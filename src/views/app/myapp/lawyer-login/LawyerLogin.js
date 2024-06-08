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
  // CustomInput,
  // InputGroupAddon,
  InputGroup,
  Input,
  
} from "reactstrap";
import axios from "axios";
// import ThumbnailImage from "components/cards/ThumbnailImage";
import { Wizard, Steps, Step, WithWizard } from "react-albus";
import { injectIntl } from "react-intl";
import { Formik, Form, Field } from "formik";
import TopNavigation from "components/wizard/TopNavigation";
import { baseUrl } from "constants/defaultValues";
import { SliderTooltip } from 'components/common/SliderTooltips';
import Select from 'react-select';
import TagsInput from "react-tagsinput";
import 'react-tagsinput/react-tagsinput.css';
import LawyerJumbotron from "./LawyerJumbotron";
import country from "../my-login/Country";
import language from "../my-login/Languages";




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
  // validateTopics,
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
// const LocationData = [
//   "Select Location",
//   "Location1",
//   "Location2",
//   "Location3",
//   "Location4",
// ];
const languageOptions = language.map(option => ({
  value: option.iso_code,
  label: option.name
}));

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
 
  // const forms = Array.from({ length: stepsCount }, () => createRef());
  const [bottomNavHidden, setBottomNavHidden] = useState(false);
  // const [languagesTag, setLanguagesTag] = useState([]);
  const [topicsTag, setTopicsTag] = useState([]);
  const [loading, setLoading] = useState(false);
  const [file1, setFile1] = useState(null);
  // const [services, setServices] = useState([
  //   {
  //     id:1,
  //     serviceName: '',
  //     description: '',
  //     amount: 1000,
  //     headline: '',
  //   }
  // ]);
  // const addService = () => {
  //   setServices([
  //     ...services,
  //     {
  //       id:services.length + 1,
  //       serviceName: '',
  //       description: '',
  //       amount: 1000,
  //       headline: '',
  //     }
  //   ]);
  // };
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
  // const [amount,setAmount] = useState(1000);
  
  // const handleSliderChange = (value) => {
  //   setAmount(value);
   
    
  // };
  // const [amount,setAmount]=useState(1000); 

  const [services, setServices] = useState([{ serviceName: '', description: '', headline: '',amount:1000}]);

  //   const handleSliderChange = (index, value) => {
  //   const newServices = [...services];
  //   newServices[index].amount = value;
  //   setServices(newServices);
  //   console.log("added",newServices);
  // };


  const handleSliderChange = (index, value) => {
    const newServices = [...services];
    newServices[index].amount = value;
    setServices(newServices);
    console.log("added",newServices);
   
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


  // const postDataExperience = async (data) => {
    
  //   // const sendData=[{...data,amount}]
  //   // const sendData=[{...data}]
    
  
  //   try {
  //     // const response = await axios.post(packageUrl, sendData, {
  //     const response = await axios.post(packageUrl, data, {
     
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });
  //     console.log(response);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
  
 
  const postDataExperience = async (data) => {
    // const payload = {
    //  ...data,
    //   services: data.services.map(service => ({...service, })),
    // };

    try {
      const response = await axios.post(packageUrl, data, {
        headers: {
        Authorization: `Bearer ${token}`,
      },
      });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };


  const addService = () => {
    setServices([...services, { serviceName: '', description: '', headline: '', amount: 1000 }]);
  };
  
  

  

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFile1(event.target.files[0]);

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

  // const onClickNext = (goToNext, steps, step) => {
  //   if (steps.length - 1 <= steps.indexOf(step)) {
  //     return;
  //   }
    
  //   const formIndex = steps.indexOf(step);
  //   const form = forms[formIndex]?.current; // Null check added here
  
  //   if (form) {
  //     form.submitForm().then(async () => {
  //       if (!form.isDirty && form.isValid) {
  //         const newFields = { ...fields, ...form.values };
  //         setFields(newFields);
  
  //         if (steps.length - 2 <= steps.indexOf(step)) {
  //           // done
  //           setBottomNavHidden(true);
  //           setLoading(true);
  
  //           try {
  //             // await postData(newFields);
  //             console.log("Posting data:", newFields);
  //             await postDataExperience(newFields);
  //             setTimeout(() => {
  //               setLoading(false);
  //             }, 3000);
  //           } catch (error) {
  //             console.error("Error posting data:", error);
  //             setLoading(false);
  //           }
  //         }
  
  //         goToNext();
  //         step.isDone = true;
  //       }
  //     });
  //   } else {
  //     console.error("Form is null.");
  //   }
  // };
  

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
            console.log("Posting data:", newFields);
            // await postDataExperience(newFields);
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

  // const handleLanguagesTagsChange = (newLanguages) => {
  //   setLanguagesTag(newLanguages);
  // };
  const handleTopicsTagsChange = (newTopics) => {
    setTopicsTag(newTopics);
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
                    postDataAbout({ ...values, image: aboutField.image});

                    console.log(aboutField.image);
                  }}
                >
                  {({setFieldValue, errors, touched }) => (
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
                    <Label for="image">Image*</Label>
                    <Row>
                      <Col md={2} className="">
                        <img
                          src={
                            selectedFile || "/assets/img/profiles/l-1.jpg"
                            // "https://gogo-react.coloredstrategies.com/assets/img/profiles/l-1.jpg"
                          }
                          className="mx-2 rounded-circle img-thumbnail border"
                          style={{ width: "70px", height: "70px" }}
                          alt=""
                        />
                      </Col>
                      <Col md={5} className="mt-3 ">
                        <InputGroup className="mb-3">
                          {errors.image && touched.image && (
                            <div className="invalid-feedback d-block">
                              {errors.image}
                            </div>
                          )}
                          <div className="mt-2">
                            <Button
                              className="default"
                              color="primary"
                              onClick={() =>
                                document.getElementById("file-upload").click()
                              }
                            >
                              Upload profile pic{" "}
                              <i className="iconsminds-upload " />
                            </Button>
                            {/* <Form> */}
                            <Input
                              id="file-upload"
                              type="file"
                              className="form-control d-none"
                              onChange={handleFileChange}
                              validate={validateFile}
                            />
                            {/* </Form> */}
                            {file1 && (
                              <p className="mt-2">
                                Selected file: {file1.name}
                              </p>
                            )}
                            {errors.image && touched.image && (
                              <div className="invalid-feedback d-block">
                                {errors.image}
                              </div>
                            )}
                          </div>
                        </InputGroup>
                      </Col>
                    </Row>
                  </FormGroup>
                      {/* <FormGroup>
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
                              /> */}
                              {/* <Field
                                className="form-control"
                                type="file"
                                id="exampleCustomFileBrowser1"
                                name="image"
                                validate={validateFile}
                                onChange={handleFileChange}
                              /> */}
                              {/* {errors.image && touched.image && (
                                <div className="invalid-feedback d-block">
                                  {errors.image}
                                </div>
                              )}
                            </InputGroup>
                          </Col>
                        </Row>
                      </FormGroup> */}
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
                          {/* {LocationData.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))} */}

                          <option disabled value="">
                              Select Location
                            </option>
                          {country.map((option) => (
                            <option key={option.iso_code} value={option.iso_code}>
                              {option.name}
                            </option>
                          ))}
                        </Field>
                        {errors.location && touched.location && (
                          <div className="invalid-feedback d-block">
                            {errors.location}
                          </div>
                        )}
                      </FormGroup>
                      {/* <FormGroup className="error-l-75">
                        <Label>Languages*</Label>
                        {/* <Field
                          
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
                        /> */}
                        {/* <TagsInput
                        value={languagesTag}
                        onChange={handleLanguagesTagsChange}
                        inputProps={{ placeholder: "Add Languages " }}
                        // validate={validateLanguages}
                      /> */}
                          {/*  */}
{/*                         
                        {errors.languages && touched.languages && (
                          <div className="invalid-feedback d-block">
                            {errors.languages}
                          </div>
                        )}
                      </FormGroup> */} 
                      <FormGroup className="error-l-75">
                        <Label>Languages*</Label>
                        <Select
                          placeholder="Select Languages"
                          name="languages"
                          isMulti
                          options={languageOptions}
                          validate={validateLanguages}
                          className="react-select"
                          classNamePrefix="react-select"
                          onChange={selectedOptions => {
                          const languagesArray = selectedOptions ? selectedOptions.map(option => option.value) : [];
                          setFieldValue('languages', languagesArray);
                  }}
                        >
                        
                          {/* <option disabled value="">
                              Select Languages
                            </option>
                          {language.map((option) => (
                            <option key={option.iso_code} value={option.iso_code}>
                              {option.name}
                            </option>
                          ))} */}
                          
                        </Select>
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
                    // topics:fields.topics,
                   
                    about:fields.about
                    // linkedinUrl: fields.linkedinUrl,
                    // twitterHandle: fields.twitterHandle,
                    // website: fields.website,
                  }}
                  onSubmit={(values) => {
                    const profileData ={...values, topics:topicsTag}
                    postDataProfile(profileData);
                  }}
                  validateOnMount
                >
                  {({
                    errors,
                    touched,
                    // values,
                    //  setFieldValue,
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
                        {/* <Field
                          type="text"
                          name="topics"
                          id="topics"
                          className="form-control"
                          placeholder="Enter your topics (comma-separated)"
                          validate={validateTopics}
                          onChange={(e) => {
                            const topicArray = e.target.value
                              .split(",")
                              .map((topic) => topic.trim());
                            setFieldValue("topics", topicArray);
                          }}
                        /> */}

                      <TagsInput
                        value={topicsTag}
                        onChange={handleTopicsTagsChange}
                        inputProps={{ placeholder: "Add topics " }}
                        // validate={validateLanguages}
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
           
            <Step id="step3" name="Services" desc="Step Description">
      <div className="wizard-basic-step">
        <Formik
          innerRef={forms[2]}
          initialValues={{ services }}
          onSubmit={(values) => {
            // postDataExperience(values.services);
            
            postDataExperience(values);
            console.log("my services",services);
            console.log("values",values);
          }}
          validateOnMount
        >
          {({ errors, touched }) => (
            <Form className="av-tooltip tooltip-label-right my-4">
              <Alert color="primary">
                <strong>Almost there!</strong> <br /> You&apos;re just
                one last step away from being a lawyer and connecting
                with mentees all over the world! In this step, show off
                your accomplishments and how you can help others.
                <br />
                <br /> Many of these fields are optional, but will help
                us get better insights into your work - and therefore
                exponentially increase your chances. They also give you
                a jumpstart once you&apos;re a lawyer.
              </Alert>
              
              {services.map((service, index) => (
                <div key={service.serviceName}>
                  <Row>
                    <Col md={12}>
                      <FormGroup className="error-l-75">
                        <Label>Service Name*</Label>
                        <Input
                        type="text"
                          className="form-control"
                          name={`services[${index}].serviceName`}
                          validate={validateServiceName}
                          value={services.serviceName}
                          onChange={(e) => {
                            const newServices = [...services];
                            newServices[index].serviceName = e.target.value; 
                            setServices(newServices); 
                          }}
                        />
                        {errors.services?.[index]?.serviceName && touched.services?.[index]?.serviceName && (
                          <div className="invalid-feedback d-block">
                            {errors.services[index].serviceName}
                          </div>
                        )}
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={12}>
                      <FormGroup>
                        <Label for={`services[${index}].headline`}>Headline*</Label>
                        <Field
                          name={`services[${index}].headline`}
                          id={`services[${index}].headline`}
                          className="form-control"
                          validate={validatePackageTopic}
                        />
                        {errors.services?.[index]?.headline && touched.services?.[index]?.headline && (
                          <div className="invalid-feedback d-block">
                            {errors.services[index].headline}
                          </div>
                        )}
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={12}>
                      <FormGroup>
                        <Label for={`services[${index}].description`}>Description*</Label>
                        <Field
                          as="textarea"
                          name={`services[${index}].description`}
                          id={`services[${index}].description`}
                          className="form-control"
                          validate={validatePackageDescription}
                        />
                        {errors.services?.[index]?.description && touched.services?.[index]?.description && (
                          <div className="invalid-feedback d-block">
                            {errors.services[index].description}
                          </div>
                        )}
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={12}>
                      <FormGroup className="error-l-75">
                        <Label>Amount*</Label>
                        <SliderTooltip
                          min={0}
                          max={500000}
                          defaultValue={service.amount}
                          className="mb-5"
                          step={500}
                          value={service.amount}
                          onChange={(value) => handleSliderChange(index, value)}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <hr />
                </div>
              ))}
              
              <Button color="primary" className="my-5" onClick={addService}>Add more services</Button>
             
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
            className={`justify-content-center mt-3 ${
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