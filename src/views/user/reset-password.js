import React, { useState, useEffect } from "react";
import { Row, Card, CardTitle, Label, FormGroup, Button } from "reactstrap";
import { NavLink, useHistory } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import { connect } from "react-redux";
import { Colxx } from "components/common/CustomBootstrap";
import IntlMessages from "helpers/IntlMessages";
import { resetPassword } from "redux/actions";
import { NotificationManager } from "components/common/react-notifications";
import { authService } from "services/authservice";

const validateNewPassword = (values) => {
  const { newPassword, confirmPassword } = values;
  const errors = {};
  if (confirmPassword && newPassword !== confirmPassword) {
    errors.confirmPassword = "Please check your new password";
  }
  return errors;
};

const ResetPassword = ({
  // location,
  // history,
  loading,
  error,
  // resetPasswordAction,
  email,
}) => {
  const [newPassword] = useState("");
  const [confirmPassword] = useState("");
  const [resetLoading, setResetLoading] = useState(false);
  // console.log("emailv",email)
  const history = useHistory();

  useEffect(() => {
    if (error) {
      NotificationManager.warning(
        error,
        "Forgot Password Error",
        3000,
        null,
        null,
        ""
      );
    } else if (!loading && newPassword === "success")
      NotificationManager.success(
        "Please login with your new password.",
        "Reset Password Success",
        3000,
        null,
        null,
        ""
      );
    // history.push("/login")
  }, [error, loading, newPassword]);

  // const onResetPassword = (values) => {
  //   if (!loading) {
  //     // const params = new URLSearchParams(location.search);
  //     // const oobCode = params.get('oobCode');

  //       if (values.newPassword !== '') {
  //       //   resetPasswordAction({
  //       //     newPassword: values.newPassword,
  //       //     confirmPassword: values.confirmPassword,
  //       //     email,
  //       //     // history
  //       //   });
  //       // }
  //       const response = await authService.confirmPasswordReset(
  //         newPassword,
  //           confirmPassword,
  //           email,
  //       ) ;if (response && response.status === 200) {
  //         setIsSubmitted(true)
  //         console.log("resetsuccess")
  //         // history.push('/login');
  //     }
  //      else {
  //       NotificationManager.warning(
  //         'Please check your email url.',
  //         'Reset Password Error',
  //         3000,
  //         null,
  //         null,
  //         ''
  //       );
  //     }
  //   }
  // };
  const onResetPassword = async (values) => {
    setResetLoading(true);
    if (!loading) {
      try {
        if (values.newPassword !== "") {
          const response = await authService.confirmPasswordReset({
            newPassword: values.newPassword,
            confirmPassword: values.confirmPassword,
            email,
          });

          if (response && response.status === 200) {
            // setIsSubmitted(true);
            // console.log("Reset success");
            // history.push("/login");
              response.data.statuses.forEach((status) => {
                NotificationManager.success(
                  status.message,
                  status.status,
                  6000,
                  null,
                  null,
                  ""
                );
              });
              history.push("/login");
              setResetLoading(false);
          } else {
            NotificationManager.warning(
              "Please check your email url.",
              "Reset Password Error",
              3000,
              null,
              null,
              ""
            );
          }
        }
      } catch (er) {
        console.error("An error occurred during password reset:", er);
        NotificationManager.error(
          "An unexpected error occurred.",
          "Reset Password Error",
          3000,
          null,
          null,
          ""
        );
      }
    }
  };

  const initialValues = { newPassword, confirmPassword };

  return (
    <Row className="h-100">
      <Colxx xxs="12" md="10" className="mx-auto my-auto">
        <Card className="auth-card">
          <div className="position-relative image-side ">
            <p className="text-white h2">MAGIC IS IN THE DETAILS</p>
            <p className="white mb-0">
              Please use your e-mail to reset your password. <br />
              If you are not a member, please{" "}
              <NavLink to="/register" className="white">
                register
              </NavLink>
              .
            </p>
          </div>
          <div className="form-side">
            <NavLink to="/" className="white">
              <span className="logo-single" />
            </NavLink>
            <CardTitle className="mb-4">Reset password</CardTitle>

            <Formik
              validate={validateNewPassword}
              initialValues={initialValues}
              onSubmit={onResetPassword}
            >
              {({ errors, touched }) => (
                <Form className="av-tooltip tooltip-label-bottom">
                  <FormGroup className="form-group has-float-label">
                    <Label>New password</Label>
                    <Field
                      className="form-control"
                      name="newPassword"
                      type="password"
                    />
                  </FormGroup>
                  <FormGroup className="form-group has-float-label">
                    <Label>Confirm new password</Label>
                    <Field
                      className="form-control"
                      name="confirmPassword"
                      type="password"
                    />
                    {errors.confirmPassword && touched.confirmPassword && (
                      <div className="invalid-feedback d-block">
                        {errors.confirmPassword}
                      </div>
                    )}
                  </FormGroup>

                  <div className="d-flex justify-content-between align-items-center">
                    <NavLink to="/login">Back to login</NavLink>
                    <Button
                      color="primary"
                      className={`btn-shadow btn-multiple-state ${
                        resetLoading ? "show-spinner" : ""
                      }`}
                      size="lg"
                    >
                      <span className="spinner d-inline-block">
                        <span className="bounce1" />
                        <span className="bounce2" />
                        <span className="bounce3" />
                      </span>
                      <span className="label">
                        <IntlMessages id="user.reset-password-button" />
                      </span>
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </Card>
      </Colxx>
    </Row>
  );
};

const mapStateToProps = ({ authUser }) => {
  const { newPassword, resetPasswordCode, loading, error } = authUser;
  return { newPassword, resetPasswordCode, loading, error };
};

export default connect(mapStateToProps, {
  resetPasswordAction: resetPassword,
})(ResetPassword);
