import axios from "axios";
import { NotificationManager } from "components/common/react-notifications";
import { baseUrl } from "constants/defaultValues";
import { Field, Form, Formik } from "formik";
import { createRef, useState } from "react";
import TagsInput from "react-tagsinput";
import "react-tagsinput/react-tagsinput.css";
import {
  Alert,
  Button,
  Col,
  FormGroup,
  FormText,
  Label,
  Row,
} from "reactstrap";
import { validateBio } from "../../AlumniRegister/validation";
import ToasterComponent from "../../notifications/ToasterComponent";

const RealEstateAgentProfile = ({ currentStep, setCurrentStep }) => {
  const forms = [createRef(null), createRef(null), createRef(null)];

  const [aboutLoading, setAboutLoading] = useState(false);

  const [skillsTag, setSkillsTag] = useState([]);

  const [fields] = useState({
    personalWebsite: "",
    bio: "",
  });

  const handleNextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const hrProfileUrl = `${baseUrl}/api/realestate/profile`;

  function getTokenRes() {
    return localStorage.getItem("tokenRes");
  }
  const token = getTokenRes();

  const postProfileData = async (data) => {
    const hrProfile = {
      personalWebsite: data.personalWebsite,
      skills: data.skills,
      bio: data.bio,
    };

    try {
      const response = await axios.post(hrProfileUrl, hrProfile, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json", // Set Content-Type to application/json
        },
      });
      setAboutLoading(false);
      ToasterComponent("success", response.data.statuses);
      handleNextStep();
      localStorage.setItem("status", "1");
    } catch (error) {
      setAboutLoading(false);
      NotificationManager.error(
        "Failed to submit profile data",
        "Oops!",
        3000,
        null,
        null,
        ""
      );
      throw error;
    }
  };

  const handleSubmit = async (values) => {
    setAboutLoading(true);

    try {
      await postProfileData({
        personalWebsite: values.personalWebsite,
        skills: skillsTag,
        bio: values.bio,
      });
    } catch (error) {
      setAboutLoading(false); // Stop loading in case of error
    }
  };

  const handleTagsChange = (newSkills) => {
    setSkillsTag(newSkills);
  };

  return (
    <>
      <Formik
        innerRef={forms[0]}
        initialValues={{
          personalWebsite: fields.personalWebsite,
          bio: fields.bio,
        }}
        validateOnMount
        // onSubmit={(values) => {
        //   if (!file1 || validateFile(file1)) {
        //     postDataAbout({
        //       ...values,
        //       language: languages,
        //       skills: skillsTag,
        //     });
        //   }
        // }}
        onSubmit={(values) => {
          handleSubmit(values);
        }}
      >
        {({ errors, touched }) => (
          <Form className="av-tooltip tooltip-label-right ">
            <Alert color="primary">
              <strong>Lovely to see you!</strong>
              <br /> Filling out the form only takes a couple of minutes.
              We&apos;d love to learn more about your background and the
              ins-and-outs of why you&apos;d like to become a mentor. Keep
              things personal and talk directly to us and your mentees. We
              don&apos;t need jargon and polished cover letters here! <br />
              <br />
              You agree to our code of conduct and the mentor agreement by
              sending the form, so be sure to have a look at those.
            </Alert>

            <FormGroup>
              <Row>
                <Col md={12}>
                  <FormGroup>
                    <Label for="skills">Skills*</Label>

                    <TagsInput
                      required
                      value={skillsTag}
                      onChange={handleTagsChange}
                      inputProps={{ placeholder: "Add skills " }}
                      addOnBlur
                      addKeys={[13, 188]}
                    />

                    <FormText>Add skill and press Enter or Comma </FormText>
                    <FormText color="muted">
                      Describe your expertise to connect with mentors who have
                      similar interests.
                      <br />
                      {/* Comma-separated list of your skills  */}
                      (keep it below 10). Mentors will use this to find you.
                    </FormText>
                  </FormGroup>
                </Col>
              </Row>
            </FormGroup>

            <FormGroup>
              <Label for="bio">Bio*</Label>
              <Field
                as="textarea"
                name="bio"
                id="bio"
                className="form-control"
                validate={validateBio}
                autoComplete="off"
              />
              {errors.bio && touched.bio && (
                <div className="invalid-feedback d-block">{errors.bio}</div>
              )}
              <FormText color="muted">
                Tell us (and your mentees) a little bit about yourself. Talk
                about yourself in the first person, as if you&apos;d directly
                talk to a mentee. This will be public.
              </FormText>
            </FormGroup>
            <FormGroup className="error-l-125">
              <Row>
                <Col md={12}>
                  <Label for="website">Personal Website (optional)</Label>
                  <Field
                    type="url"
                    name="website"
                    id="website"
                    className="form-control"
                    autoComplete="off"
                  />
                  <FormText color="muted">
                    You can add your blog, GitHub profile or similar here
                  </FormText>
                </Col>
              </Row>
            </FormGroup>
            <Row>
              <Col className="text-center">
                <Button
                  color="primary"
                  type="submit"
                  className={`btn-shadow btn-multiple-state ${
                    aboutLoading ? "show-spinner" : ""
                  }`}
                >
                  <span className="spinner d-inline-block">
                    <span className="bounce1" />
                    <span className="bounce2" />
                    <span className="bounce3" />
                  </span>
                  <span className="label">Next</span>
                </Button>
              </Col>
            </Row>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default RealEstateAgentProfile;
