import { Colxx } from "components/common/CustomBootstrap";
import { NotificationManager } from "components/common/react-notifications";
import { Field, Form, Formik } from "formik";
import IntlMessages from "helpers/IntlMessages";
import { useState } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import { Button, Card, CardTitle, FormGroup, Label, Row } from "reactstrap";
import { loginUser } from "redux/actions";
import { FaEye, FaEyeSlash } from "react-icons/fa"; 
// import axios from 'axios';
// import { baseUrl } from 'constants/defaultValues';
// import { authService } from 'services/authservice';

// import { connect } from 'react-redux';

// const validatePassword = (value) => {
//   let error;
//   if (!value) {
//     error = 'Please enter your password';
//   } else if (value.length < 4) {
//     error = 'Value must be longer than 3 characters';
//   }
//   return error;
// };
const validatePassword = (value) => {
  let error;

  const lowercaseRegex = /[a-z]/;
  const uppercaseRegex = /[A-Z]/;
  const digitRegex = /\d/;
  const specialCharRegex = /[@#$%^&+=!]/;
  const lengthRegex = /^.{8,15}$/;

  if (!value) {
    error = "Please enter your password";
  } else if (!lowercaseRegex.test(value)) {
    error = "Password must contain at least one lowercase letter";
  } else if (!uppercaseRegex.test(value)) {
    error = "Password must contain at least one uppercase letter";
  } else if (!digitRegex.test(value)) {
    error = "Password must contain at least one digit";
  } else if (!specialCharRegex.test(value)) {
    error =
      "Password must contain at least one special character from the set @#$%^&+=!";
  } else if (!lengthRegex.test(value)) {
    error = "Password must be between 8 and 15 characters long";
  }

  return error;
};

const validateEmail = (value) => {
  let error;
  if (!value) {
    error = "Please enter your email address";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
    error = "Invalid email address";
  }
  return error;
};

const Login = ({ loading, loginUserAction }) => {
  const history = useHistory();
  // const [user, setUser] = useState({
  //   username: '',
  //   password: '',
  // });

  // function handleChange(value, event) {
  //   switch (value) {
  //     case 'username':
  //       setUser((props) => {
  //         return {
  //           ...props,
  //           username: event.target.value,
  //         };
  //       });

  //       break;
  //     case 'password':
  //       setUser((props) => {
  //         return {
  //           ...props,
  //           password: event.target.value,
  //         };
  //       });
  //       break;

  //     default:
  //       break;
  //   }
  // }
  const [email] = useState("");
  const [password] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // useEffect(() => {
  //   if (error) {
  //     NotificationManager.warning(error, 'Login Errorrr', 3000, null, null, '');
  //     console.log("nerror",error.response.data.error.message)
  //     console.log("nerror",error)
  //   }
  // }, [error]);

  // const getStudents = () => {
  //   axios.get(`${baseUrl}/student/personal/info`).then((res) => {
  //     console.log(res);
  //   });
  // };

  // new
  // const onUserLogin = (values) => {
  //   if (!loading) {
  //     if (values.email !== '' && values.password !== '') {
  //       // if (values.email === email && values.password === password) {

  //       const loginResponse = authService.login(email, password);
  //       // const loginResponse = authService.login(values.email, values.password);

  //       console.log(loginResponse);
  //       // axios
  //       //   .post(`${baseUrl}/signIn`, {
  //       //     username: 'test.student1', //  values.email,
  //       //     password: 'student1', // values.password,
  //       //   })
  //       //   .then((response) => {
  //       //     console.log(response);
  //       //     console.log(response.data.data.token);
  //       //     localStorage.setItem('AUTH_TOKEN', response.data.data.token);
  //       //     getStudents();
  //       //   })
  //       //   .catch((err) => {
  //       //     console.log(err);
  //       //   });
  //       // console.log(values, history);
  //       loginUserAction(values, history);

  //     }
  //   }
  // };
  const onUserLogin = (values) => {
    if (!loading) {
      if (values.email !== "" && values.password !== "") {
        loginUserAction(values, history);
      } else {
        NotificationManager.error(
          "Please enter email and password",
          "Login Error",
          3000,
          null,
          null,
          ""
        );
      }
    }
  };

  const initialValues = { email, password };

  return (
    <Row className="h-100">
      <Colxx xxs="12" md="10" className="mx-auto my-auto">
        <Card className="auth-card">
          <div className="position-relative image-side ">
            <p className="text-white h2">METIEGROW</p>
            <p className="white mb-0">
              Please use your credentials to login.
              <br />
              If you are not a member, please{" "}
              <NavLink to="/user/register" className="white">
                register
              </NavLink>
              .
            </p>
          </div>
          <div className="form-side ">
            <NavLink to="/" className="">
              <span className="logo-single" />

              {/* <span
                style={{
                  display: "inline-block",
                  width: "110px",
                  height: "55px",
                  backgroundImage: "url('/assets/logos/metiegrowlogo.jpg')",
                  backgroundSize: "cover",
                  backgroundPosition: "center center",
                  marginBottom: "60px",
                }}
                aria-label="Metiegrow Logo"
              /> */}
              {/* <div
                style={{
                  width: "120px",
                  marginBottom: "60px",
                  height: "120px",
                }}
              >
                <img
                  src="/assets/logos/backgroundpng.png"
                  // src="/assets/img/profiles/1.jpg"
                  className="w-100 h-100"
                  alt="Metiegrow Logo"
                  style={{
                    textAlign: "start",

                    marginLeft: "0px !important",
                    display: "flex",
                  }}
                />
              </div> */}
            </NavLink>

            <CardTitle className="mb-4 d-flex flex-column">
              <IntlMessages id="user.login-title" />
            </CardTitle>
            <Formik initialValues={initialValues} onSubmit={onUserLogin}>
              {({ errors, touched, handleSubmit }) => (
                <Form className="av-tooltip tooltip-label-bottom">
                  <FormGroup className="form-group has-float-label">
                    <Label>
                      <IntlMessages id="user.email" />
                    </Label>
                    <Field
                      className="form-control"
                      name="email"
                      validate={validateEmail}
                      autoComplete="off"
                    />
                    {errors.email && touched.email && (
                      <div className="invalid-feedback d-block">
                        {errors.email}
                      </div>
                    )}
                  </FormGroup>
                     <FormGroup className="form-group has-float-label">
  <Label>
    <IntlMessages id="user.password" />
  </Label>
  <div className="position-relative">
    <Field
      className="form-control pe-5" // Adds padding to prevent text overlap
      type={showPassword ? "text" : "password"}
      name="password"
      validate={validatePassword}
    />
    <button
      type="button"
      className="btn btn-link position-absolute p-0"
      style={{
        top: "50%",
        right: "10px",
        transform: "translateY(-50%)",
        border: "none",
        background: "transparent",
        outline: "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      onClick={() => setShowPassword(!showPassword)}
    >
      {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
    </button>
  </div>
  {errors.password && touched.password && (
    <div className="invalid-feedback d-block">{errors.password}</div>
  )}
</FormGroup>
                  <div className="d-flex justify-content-between align-items-center">
                    <NavLink to="/forgot-password">
                      <IntlMessages id="user.forgot-password-question" />
                    </NavLink>
                    {/* <div>Not a registered user? {" "}
                    <NavLink to="/user/register" className="">
                      register
                    </NavLink>
                    </div> */}
                    <Button
                      type="submit"
                      color="primary"
                      className={`btn-shadow btn-multiple-state ${
                        loading ? "show-spinner" : ""
                      }`}
                      size="lg"
                      onClick={handleSubmit}
                    >
                      <span className="spinner d-inline-block">
                        <span className="bounce1" />
                        <span className="bounce2" />
                        <span className="bounce3" />
                      </span>
                      <span className="label">
                        <IntlMessages id="user.login-button" />
                      </span>
                    </Button>
                  </div>
                  <div>
                    Not a registered user?{" "}
                    <NavLink
                      to="/user/register"
                      className=""
                      style={{ textDecoration: "underline" }}
                    >
                      register
                    </NavLink>
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
  const { loading, error } = authUser;
  return { loading, error };
};

export default connect(mapStateToProps, {
  loginUserAction: loginUser,
})(Login);
