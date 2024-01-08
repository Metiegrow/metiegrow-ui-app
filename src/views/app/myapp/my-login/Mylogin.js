import React, { useState } from "react";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Alert,
  Col,
  Row,
  CustomInput,
  // InputGroup,
  // InputGroupAddon,
  FormText,
  CardBody,
  Card,
  Jumbotron,
} from "reactstrap";
import ThumbnailImage from "components/cards/ThumbnailImage";
import { AvField, AvForm } from "availity-reactstrap-validation";
import { Wizard, Steps, Step, WithWizard } from "react-albus";
import { injectIntl } from "react-intl";
import TopNavigation from "components/wizard/TopNavigation";
import { Colxx } from "components/common/CustomBootstrap";

const AboutYou = ({setFirstName, setLastName, setEmail, setPassword, setJobTitle, setLocation, setCompany}) => {
  const [selectedFile, setSelectedFile] = useState(null);
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

  const LocationData = ["Location1", "Location2", "Location3", "Location4"];

  return (
    <Form>
      <Alert color="primary">
        <strong>Lovely to see you!</strong>
        <br /> Filling out the form only takes a couple of minutes. We&apos;d
        love to learn more about your background and the ins-and-outs of why
        you&apos;d like to become a mentor. Keep things personal and talk
        directly to us and your mentees. We don&apos;t need jargon and polished
        cover letters here! <br />
        <br />
        You agree to our code of conduct and the mentor agreement by sending the
        form, so be sure to have a look at those.
      </Alert>

      <FormGroup>
        <Label for="photo">Photo</Label>
        <Row>
          <Col md={1}>
            <ThumbnailImage
              rounded
              small
              src={
                selectedFile ||
                "https://gogo-react.coloredstrategies.com/assets/img/profiles/l-1.jpg"
              }
              alt="photo"
            />
          </Col>
          <Col md={2} className="mt-3">
            <Label for="photo" className="d-md-none">
              Photo
            </Label>
            
            <CustomInput
              type="file"
              id="exampleCustomFileBrowser1"
              name="customFile"
              onChange={handleFileChange}
            />

          </Col>
        </Row>
      </FormGroup>

      <Row>
        <Col md={6}>
          <FormGroup>
            <Label for="firstName">First Name*</Label>
            <Input id="firstName" name="firstNAme" type="text" onChange={(e) => setFirstName(e.target.value)} required />
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup>
            <Label for="lastName">Last Name*</Label>
            <Input id="lastName" name="lastName" type="text" onChange={(e) => setLastName(e.target.value)} required />
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <FormGroup>
            <Label for="email">Email*</Label>
            <Input type="email" name="email" id="email"onChange={(e) => setEmail(e.target.value)} required />
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup>
            <Label for="password">Choose a Password*</Label>
            <Input type="password" name="password" id="password" onChange={(e) => setPassword(e.target.value)} required />
            
          </FormGroup>
        </Col>
      </Row>

      <Row>
        <Col md={6}>
          <FormGroup>
            <Label for="jobTitle">Job Title*</Label>
            <Input type="text" name="jobTitle" id="jobTitle" onChange={(e) => setJobTitle(e.target.value)} required />
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup>
            <Label for="company">Company</Label>
            <Input type="text" name="company" id="company" onChange={(e) => setCompany(e.target.value)} />
          </FormGroup>
        </Col>
      </Row>
      <AvForm>

        <AvField
          type="select"
          name="location"
          label="Location*"
          required
          className="form-control-sm"
          onChange={(e) => setLocation(e.target.value)}
        >
          

          {LocationData.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </AvField>

        
      </AvForm>
      
    </Form>
  );
};

const Profile = () => {
  const CategoryData = ["Category1", "Category2", "Category3", "Category4"];

  return (
    <Form>
      <AvForm>
        
        <AvField
          type="select"
          name="category"
          label="Category*"
          required
          className="form-control-sm"
        >
          

          {CategoryData.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </AvField>
      </AvForm>
      <FormGroup>
        <Label for="skill">Skills*</Label>
        <Input
          type="text"
          name="skill"
          id="skill"
          placeholder="Add a new skill..."
          required
        />
        

        <FormText color="muted">
          Describe your expertise to connect with mentees who have similar
          interests.
          <br />
          Comma-separated list of your skills (keep it below 10). Mentees will
          use this to find you.
        </FormText>
      </FormGroup>
      <FormGroup>
        <Label for="bio">Bio*</Label>
        <Input type="textarea" name="bio" id="bio" required />
        {/* <Label>Bio*</Label> */}


        <FormText color="muted">
          Tell us (and your mentees) a little bit about yourself. Talk about
          yourself in the first person, as if you&apos;d directly talk to a
          mentee. This will be public.
        </FormText>
      </FormGroup>
      <FormGroup>
        <Row>
          <Col md={6}>
            <Label for="linkedinUrl">LinkedIn URL*</Label>
            <Input type="url" name="linkedinUrl" id="linkedinUrl" required />
          </Col>
          <Col md={6}>
            <Label for="twitterHandle">Twitter Handle (optional)</Label>
            <Input type="text" name="twitterHandle" id="twitterHandle" />
            

            <FormText color="muted">
              Omit the &ldquo;@&rdquo; -e.g. &ldquo;dqmonn&rdquo;
            </FormText>
          </Col>
        </Row>
      </FormGroup>
      <FormGroup>
        <Label for="personalWebsite">Personal Website (optional)</Label>
        <Input type="url" name="personalWebsite" id="personalWebsite" />
        

        <FormText color="muted">
          You can add your blog, GitHub profile or similar here
        </FormText>
      </FormGroup>
      
    </Form>
  );
};
const Experience = () => {
  return (
    <div>
      <Alert color="primary">
        <strong>Almost there!</strong> <br /> You&apos;re just one last step
        away from being a mentor and connecting with mentees all over the world!
        in this step, shows off your accomplishments and how you can help
        others.
        <br />
        <br /> Many of these fields are optional, but will help us get better
        insights into your work - and therefore exponentially increase your
        chances. They also give you a jumpstart once you&apos;re a mentor.
      </Alert>

      <FormGroup>
        <Row>
          <Col md={6}>
            <Label for="introvideo">Intro Video</Label>
            <Input
              type="url"
              name="introvideo"
              id="introvideo"
              placeholder="https://your-intro-video-URL"
            />
            <FormText color="muted">
              Add a youTube video or record a Loom for your future mentees
            </FormText>
          </Col>

          <Col md={6}>
            <Label for="featuredarticle">Featured Article</Label>
            <Input
              type="url"
              name="featuredarticle"
              id="featuredarticle"
              placeholder="https://your-blog-article-URL"
            />
            <FormText color="muted">
              Link an interview / podcast /piece of writing you are proud of or
              were featured in.
            </FormText>
          </Col>
        </Row>
      </FormGroup>
      <FormGroup>
        <Label>
          Why do you want to become a mentor?(Not publicaly visible)*
        </Label>
        <Input type="textarea" name="why" id="why" />
      </FormGroup>
      <FormGroup>
        <Label>
          What, in your opinion, has been your greatest achievement so far?(Not
          publicaly visible)*
        </Label>
        <Input type="textarea" name="what" id="what" />
      </FormGroup>

      
    </div>
  );
};

const JumbotronUi = () => {
  return (
    <>
      
      <Row>
        <Colxx xxs="12" className="mb-4">
          <Card>
            <CardBody className="text-center">
              <i
                alt=""
                className="glyph-icon iconsminds-yes"
                style={{ fontSize: "75px", color: "green" }}
              />

              <Jumbotron className="text-center">
                <h1 className="display-4">
                  Submitted Succesfully!
                </h1>
                <p className="lead">
                  We will reach you shortly
                </p>
                <hr className="my-4" />
               
                <p className="lead mb-0 ">
                  <Button color="primary" size="lg">
                    check status
                  </Button>
                </p>
              </Jumbotron>
            </CardBody>
          </Card>
        </Colxx>
      </Row>
    </>
  );
};



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
                className={`mr-1 ${steps.indexOf(step) <= 0 ? "disabled" : ""}`}
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
                className={`${steps.indexOf(step) >= steps.length - 1 ? "disabled" : ""} text-nowrap`}
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



const Mylogin = () => {
  
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [company, setCompany] = useState('');
  const [location, setLocation] = useState('');
  // const [category, setCategory] = useState('');
  // const [skills, setSkills] = useState('');
  // const [bio, setBio] = useState('');
  // const [linkedInUrl , setLinkedInUrl] = useState('');
  // const [twitterHandle, setTwitterHandle] = useState('');
  // const [personalWebsite, setPersonalWebsite] = useState('');


  const topNavClick = (stepItem, push) => {
    push(stepItem.id);
  };

  const onClickNext = (goToNext, steps, step) => {
    const updatedStep = { ...step, isDone: true };
    if (steps.length - 1 <= steps.indexOf(updatedStep)) {
      console.log(`First Name: ${firstName}, Last Name: ${lastName}, email: ${email}, password: ${password}, job title: ${jobTitle}, company: ${company}, location: ${location}`);
      return;
    }
    goToNext();
  };

  const onClickPrev = (goToPrev, steps, step) => {
    if (steps.indexOf(step) <= 0) {
      return;
    }
    goToPrev();
  };

  // const { messages } = intl;
  return (
    <Card className="mx-auto my-4 " style={{ maxWidth: "900px" }}>
      <CardBody className="wizard wizard-default">
        <h1 className="mt-4 font-weight-bold">Apply as a mentor</h1>
        <Wizard>
          <TopNavigation
            className="justify-content-center"
            disableNav={false}
            topNavClick={topNavClick}
            onClickNext={onClickNext}
            onClickPrev={onClickPrev}
          />
          <Steps>
            <Step id="step1" name="About You">
              <AboutYou setFirstName={setFirstName} setLastName={setLastName}  setEmail={setEmail} setPassword={setPassword} setJobTitle={setJobTitle} setLocation={setLocation} setCompany={setCompany}  />
            </Step>
            <Step id="step2" name="Profile">
              <Profile />
            </Step>
            <Step id="step3" name="Experience">
              <Experience />
            </Step>
            <Step id="step4" hideTopNav className="justify-content-center">
              {/* <h2 className=" mb-2">
                  Submitted Succesfully!
                </h2>
                <p>
                  we will contact you shortly
                </p> */}
              <JumbotronUi />
            </Step>
          </Steps>
          <BottomNavigation
            onClickNext={onClickNext}
            onClickPrev={onClickPrev}
            className="d-flex justify-content-end"
            prevLabel="Previous Step"
            // nextLabel="Next Step"
            color="secondary"
          />
        </Wizard>
      </CardBody>
    </Card>
  );
};
export default injectIntl(Mylogin);
