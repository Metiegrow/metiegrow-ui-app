import React, { useState, useEffect } from "react";
import {
  Row,
  Card,
  CardTitle,
  Label,
  FormGroup,
  Button,
  Input,
} from "reactstrap";
import { NavLink } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import { connect } from "react-redux";
import { Colxx } from "components/common/CustomBootstrap";
import IntlMessages from "helpers/IntlMessages";
import { forgotPassword } from "redux/actions";
import { NotificationManager } from "components/common/react-notifications";
import axios from "axios";
import { baseUrl } from "constants/defaultValues";
import ResetPassword from "./reset-password";

const validateEmail = (value) => {
  let error;
  if (!value) {
    error = "Please enter your email address";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
    error = "Invalid email address";
  }
  return error;
};

const ForgotPassword = ({
  history,
  forgotUserMail,
  loading,
  error,
  forgotPasswordAction,
}) => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);
  const [otpSubmitted, setOtpSubmitted] = useState(false);

  const onForgotPassword = (values) => {
    if (!loading) {
      setEmail(values.email);
      if (values.email !== "") {
        setIsFormSubmitted(true);
        forgotPasswordAction(values.email, history);
      }
    }
  };

  useEffect(() => {
    if (isFormSubmitted) {
      if (error) {
        NotificationManager.warning(
          error,
          "Forgot Password Error",
          3000,
          null,
          null,
          ""
        );
        setIsFormSubmitted(false);
      } else if (!loading && forgotUserMail === "success") {
        NotificationManager.success(
          "Please check your email.",
          "Forgot Password Success",
          3000,
          null,
          null,
          ""
        );
        setIsSubmitted(true);
        setIsFormSubmitted(false);
      }
    }
  }, [error, forgotUserMail, loading, isFormSubmitted]);

  const handleOtpSend = async () => {
    setOtpLoading(true);
    try {
      const data = { email, otp };
      const url = `${baseUrl}/api/verifyotp`;
      const response = await axios.post(url, data);
      setOtpLoading(false);
      if (response.data.statuses[0].status === "success") {
        setOtpSubmitted(true);
      }
    } catch (er) {
      console.error(
        "Error sending OTP:",
        er.response ? er.response.data : er.message
      );
      setOtpLoading(false);
    }
  };

  const initialValues = { email };

  return !otpSubmitted ? (
    <Row className="h-100">
      <Colxx xxs="12" md="10" className="mx-auto my-auto">
        <Card className="auth-card">
          <div className="position-relative image-side">
            <p className="text-white h2">MAGIC IS IN THE DETAILS</p>
            <p className="white mb-0">
              Please use your e-mail to reset your password. <br />
              If you are not a member, please{" "}
              <NavLink to="/user/register" className="white">
                register
              </NavLink>
              .
            </p>
          </div>
          <div className="form-side">
            <NavLink to="/" className="white">
              <span className="logo-single" />
            </NavLink>
            <CardTitle className="mb-4">
              <IntlMessages id="user.forgot-password" />
            </CardTitle>

            <Formik initialValues={initialValues} onSubmit={onForgotPassword}>
              {({ errors, touched }) => (
                <Form className="av-tooltip tooltip-label-bottom">
                  <FormGroup className="form-group has-float-label">
                    <Label>
                      <IntlMessages id="user.email" />
                    </Label>
                    <Field
                      className="form-control"
                      name="email"
                      validate={validateEmail}
                    />
                    {errors.email && touched.email && (
                      <div className="invalid-feedback d-block">
                        {errors.email}
                      </div>
                    )}
                  </FormGroup>
                  {!isSubmitted && (
                    <div className="d-flex justify-content-between align-items-center">
                      <NavLink to="/login">Back to login</NavLink>
                      <Button
                        type="submit"
                        color="primary"
                        className={`btn-shadow btn-multiple-state ${
                          loading ? "show-spinner" : ""
                        }`}
                        size="lg"
                      >
                        <span className="spinner d-inline-block">
                          <span className="bounce1" />
                          <span className="bounce2" />
                          <span className="bounce3" />
                        </span>
                        <span className="label">Submit</span>
                      </Button>
                    </div>
                  )}
                </Form>
              )}
            </Formik>

            {isSubmitted && (
              <FormGroup className="form-group has-float-label mt-4">
                <Label>Enter OTP</Label>
                <Input
                  className="form-control"
                  name="otp"
                  type="number"
                  onChange={(e) => setOtp(e.target.value)}
                />
                <div className="text-right">
                  <Button
                    color="primary"
                    className={`mt-3 btn-shadow btn-multiple-state ${
                      otpLoading ? "show-spinner" : ""
                    }`}
                    size="lg"
                    onClick={handleOtpSend}
                  >
                    <span className="spinner d-inline-block">
                      <span className="bounce1" />
                      <span className="bounce2" />
                      <span className="bounce3" />
                    </span>
                    <span className="label">Submit OTP</span>
                  </Button>
                </div>
              </FormGroup>
            )}
          </div>
        </Card>
      </Colxx>
    </Row>
  ) : (
    <ResetPassword email={email} />
  );
};

const mapStateToProps = ({ authUser }) => {
  const { forgotUserMail, loading, error } = authUser;
  return { forgotUserMail, loading, error };
};

export default connect(mapStateToProps, {
  forgotPasswordAction: forgotPassword,
})(ForgotPassword);
