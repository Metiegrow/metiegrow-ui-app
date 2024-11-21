/* eslint-disable no-param-reassign */

import { Colxx } from "components/common/CustomBootstrap";
import { adminRoot } from "constants/defaultValues";
import { useEffect, useState } from "react";
import { injectIntl } from "react-intl";
import { useHistory } from "react-router-dom";
import "react-tagsinput/react-tagsinput.css";
import {
  Button,
  Card,
  CardBody,
  Jumbotron,
  NavLink,
  Row,
  Spinner,
} from "reactstrap";

import ApplyAsHrAbout from "./ApplyAsHrAbout";
import ApplyAsHrExperience from "./ApplyAsHrExperience";
import ApplyAsHrProfile from "./ApplyAsHrProfile";

const ApplyHR = () => {
  const steps = ["About you", "profile", "Experience"];
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const status = localStorage.getItem("status");
    console.log("status", status);
    if (status) {
      if (status === "0") {
        setCurrentStep(0);
      } else if (status === "1") {
        setCurrentStep(1);
      } else if (status === "3") {
        setCurrentStep(2);
      } else if (status === "7") {
        setCurrentStep(3);
      } else {
        setCurrentStep(0);
      }
    }
  }, []);

  const history = useHistory();
  const handleMySlotsClick = () => history.push(`${adminRoot}/listing/job`);

  return (
    <Card className="mx-auto my-4 " style={{ maxWidth: "900px" }}>
      <CardBody className="wizard wizard-default">
        <h1 className="mt-4 font-weight-bold">Apply as a HR</h1>
        <ul className="nav nav-tabs justify-content-center">
          {steps.map((stepItem, index) => (
            <li
              // eslint-disable-next-line
              key={`topNavStep_${index}`}
              className={`nav-item ${
                // eslint-disable-next-line
                index === currentStep
                  ? "step-doing"
                  : index < currentStep
                  ? "step-done"
                  : ""
              }`}
            >
              <NavLink to="#" location={{}} className="nav-link">
                <span>{stepItem}</span>
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="wizard-basic-step">
          {currentStep === 0 && (
            <ApplyAsHrAbout
              currentStep={currentStep}
              setCurrentStep={setCurrentStep}
            />
          )}
          {currentStep === 1 && (
            <ApplyAsHrProfile
              currentStep={currentStep}
              setCurrentStep={setCurrentStep}
            />
          )}
          {currentStep === 2 && (
            <ApplyAsHrExperience
              currentStep={currentStep}
              setCurrentStep={setCurrentStep}
              setLoading={setLoading}
            />
          )}
          {loading ? (
            <div className="wizard-basic-step text-center pt-3">
              <Spinner color="primary" className="mb-1" />
              <p>Submitting</p>
            </div>
          ) : (
            <>
              {currentStep === 3 && (
                <Row>
                  <Colxx xxs="12" className="mb-4">
                    <Card>
                      <CardBody className="text-center">
                        <i
                          alt=""
                          className="glyph-icon iconsminds-yes text-success"
                          style={{ fontSize: "75px" }}
                        />
                        <Jumbotron className="text-center">
                          <h1 className="display-4">Submitted Successfully!</h1>
                          <p className="lead">We will reach you shortly</p>
                          <hr className="my-4" />
                          <p className="lead mb-0">
                            <Button
                              color="primary"
                              size="lg"
                              onClick={() => handleMySlotsClick()}
                            >
                              job list
                            </Button>
                          </p>
                        </Jumbotron>
                      </CardBody>
                    </Card>
                  </Colxx>
                </Row>
              )}
            </>
          )}
        </div>
      </CardBody>
    </Card>
  );
};

export default injectIntl(ApplyHR);
