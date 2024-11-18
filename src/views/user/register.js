import { NotificationManager } from "components/common/react-notifications";
import { useState } from "react";
import { connect } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import {
  Button,
  Card,
  CardTitle,
  // ButtonGroup,
  Col,
  // Form,
  FormGroup,
  Input,
  Label,
  Row,
} from "reactstrap";
import { registerUser } from "redux/actions";

import { AvField, AvForm } from "availity-reactstrap-validation";
import { Colxx } from "components/common/CustomBootstrap";
import IntlMessages from "helpers/IntlMessages";
import { authService } from "services/authservice";
// import { baseUrl } from 'constants/defaultValues';
// import axios from 'axios';
// import { adminRoot } from 'constants/defaultValues';

const Register = () => {
  // const [newUser, setNewUser] = useState({
  //   name: 'testName',
  //   email: 'test@email.com',
  //   password: 'TestPass',
  //   role: "MENTOR",
  // });
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("+91");
  const [password, setPassword] = useState("");
  // const [userRoles, setUserRoles] = useState(["MENTOR"]);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [roleError, setRoleError] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState("MENTOR");

  const history = useHistory();

  const handleRoleChange = (role) => {
    setSelectedRole(role);
  };

  // const handleRoleChange = (role) => {
  //   if (userRoles.includes(role)) {
  //     setUserRoles(userRoles.filter((item) => item !== role));
  //   } else {
  //     setUserRoles([...userRoles, role]);
  //   }
  // };

  const clickToLogin = () => {
    history.push("/login");
  };

  // function handleChange(field, value) {
  //   setNewUser((prevState) => ({
  //     ...prevState,
  //     [field]: value,
  //   }));
  // }

  // function handleChange(field, e) {
  //   switch (field) {
  //     case 'name':
  //       setNewUser((props) => {
  //         return {
  //           ...props,
  //           name: e.target.value,
  //         };
  //       });
  //       break;
  //     case 'email':
  //       setNewUser((props) => {
  //         return {
  //           ...props,
  //           email: e.target.value,
  //         };
  //       });
  //       break;
  //     case 'password':
  //       setNewUser((props) => {
  //         return {
  //           ...props,
  //           password: e.target.value,
  //         };
  //       });
  //       break;
  //     case 'role':
  //       setNewUser((props) => {
  //         return {
  //           ...props,
  //           role: e === 1 ? 'MENTOR' : 'USER', // checks if the event value passed is 1 and assigns the respective role
  //         };
  //       });
  //       break;

  //     default:
  //       console.log('default case ran');
  //       break;
  //   }
  // }
  const OnRegisterButtonclick = async () => {
    try {
      // const response = await authService.signUp(
      //   newUser.email,
      //   newUser.password,
      //   newUser.name,
      //   newUser.role
      if (selectedRole.length === 0) {
        setRoleError(true);
        return;
      }
      setRoleError(false);
      setLoading(true);

      const signUpResponse = await authService.signUp(
        email,
        phoneNumber,
        password,
        firstName,
        lastName,
        [selectedRole],
        username
      );
      if (signUpResponse && signUpResponse.status === 200) {
        setIsSubmitted(true);
        setLoading(false);
        // console.log("signupsuccess")
        // history.push('/login');
      } else {
        console.error("Signup Failed:", signUpResponse);
        setLoading(false);
        // console.log("su",signUpResponse.data.statuses[0].message)
        signUpResponse.data.statuses.forEach((status) => {
          NotificationManager.warning(
            status.message,
            status.status,
            5000,
            null,
            null,
            ""
          );
        });
        // NotificationManager.warning(
        //   "Something went wrong",
        //   "Oops!",
        //   3000,
        //   null,
        //   null,
        //   ""
        // );
      }
    } catch (error) {
      console.error("Error registering user:", error);
      NotificationManager.warning(
        "Something went wrong",
        "Oops!",
        3000,
        null,
        null,
        ""
      );
    }
  };

  // function OnRegisterButtonclick() {
  //   console.log(newUser);
  //   authService.signUp(
  //     newUser.email,
  //     newUser.password,
  //     newUser.name,
  //     newUser.role
  //   );
  // axios
  //   .post(`${baseUrl}api/signup`, {
  //     username: newUser.name,
  //     password: newUser.password,
  //     email: newUser.email,
  //     userType: newUser.role,
  //   })
  //   .then((response) => {
  //     console.log(response.status);
  //     // console.log(response.data.token);
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
  // }

  // const [email] = useState('demo@gogo.com');
  // const [password] = useState('gogo123');
  // const [name] = useState('Sarah Kortney');

  // const onUserRegister = (payload) => {
  //   console.log(payload);
  //   if (payload.email !== '' && payload.password !== '') {
  //     console.log(history);
  //     // history.push(adminRoot);
  //   }
  //   // call registerUserAction()
  // };

  return (
    <Row className="h-100">
      <Colxx xxs="12" md="10" className="mx-auto my-auto">
        <Card className="auth-card">
          <div className="position-relative image-side ">
            <p className="text-white h2">METIEGROW</p>
            {isSubmitted ? (
              <div />
            ) : (
              <p className="white mb-0">
                Please use this form to register. <br />
                If you are a member, please{" "}
                <NavLink to="/login" className="white">
                  login
                </NavLink>
                .
              </p>
            )}
          </div>
          <div className="form-side">
            <NavLink to="/" className="white">
              <span className="logo-single" />
              {/* <div
                style={{
                  width: "110px",
                  marginBottom: "30px",
                  height: "100px",
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
            {/* <img src={`${process.env.PUBLIC_URL}/metiegrowfavicon.jpg`} alt="Logo" className="img-thumbnail" 
        style={{ width: '100px', height: '100px' }} /> */}
            {isSubmitted ? (
              <Row>
                <div className="d-flex ">
                  <div className="m-auto text-center">
                    <i className="iconsminds-inbox-full display-4 mb-3 text-muted" />
                    <h2 className="font-weight-bold mb-3">Check your inbox</h2>
                    <h4>
                      We&apos;ve sent you a verification link to{" "}
                      <strong>{email}</strong>. Please click the link to confirm
                      your address.
                    </h4>
                    <p className="text-muted mt-2">
                      Can&apos;t find the email? Please check the spam folder.
                    </p>
                  </div>
                </div>
                <Col className="text-center mt-4">
                  <Button onClick={clickToLogin} color="primary">
                    Login
                  </Button>
                </Col>
              </Row>
            ) : (
              <AvForm onValidSubmit={OnRegisterButtonclick}>
                <CardTitle className="mb-4">
                  <IntlMessages id="user.register" />
                </CardTitle>
                <Row>
                  <Col>
                    <FormGroup className="form-group has-float-label">
                      <Label>First Name</Label>
                      <AvField
                        name="firstName"
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        validate={{
                          required: {
                            value: true,
                            errorMessage: "First name cannot be empty",
                          },
                          pattern: {
                            value: "^[a-zA-Z]+$",
                            errorMessage:
                              "First name must contain only alphabetic characters",
                          },
                        }}
                        autoComplete="off"
                      />
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup className="form-group has-float-label">
                      <Label>Last Name</Label>
                      <AvField
                        name="lastName"
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        validate={{
                          required: {
                            value: true,
                            errorMessage: "Last name cannot be empty",
                          },
                          pattern: {
                            value: "^[a-zA-Z]+$",
                            errorMessage:
                              "Last name must contain only alphabetic characters",
                          },
                        }}
                        autoComplete="off"
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <FormGroup className="form-group has-float-label">
                  <Label>Username</Label>
                  <AvField
                    name="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    validate={{
                      required: {
                        value: true,
                        errorMessage: "Username cannot be empty",
                      },
                      pattern: {
                        value: "^[a-zA-Z0-9_@]{3,20}$",
                        errorMessage:
                          "Username must contain 3-20 characters and may include alphanumeric characters, underscores, and the @ symbol",
                      },
                    }}
                    autoComplete="off"
                  />
                </FormGroup>

                <FormGroup className="form-group has-float-label">
                  <Label>Email</Label>
                  <AvField
                    name="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    validate={{
                      required: {
                        value: true,
                        errorMessage: "Email cannot be empty",
                      },
                      email: {
                        value: true,
                        errorMessage: "Please provide a valid email address",
                      },
                    }}
                    autoComplete="off"
                  />
                </FormGroup>

                <FormGroup className="form-group has-float-label">
                  <Label>Mobile Number</Label>
                  <AvField
                    name="phoneNumber"
                    type="text"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    validate={{
                      required: {
                        value: true,
                        errorMessage: "Phone number cannot be empty",
                      },
                      pattern: {
                        value: "^\\+[0-9]{2}[0-9]{10}$",
                        errorMessage: "Please enter a valid mobile number",
                      },
                    }}
                    autoComplete="off"
                  />
                </FormGroup>

                <Row>
                  <Col>
                    {/* <AvField
                name="password"
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                validate={{ required: true }}
              /> */}
                    {/* <AvGroup className="error-l-100 tooltip-label-right"> */}
                    <FormGroup className="form-group has-float-label">
                      <Label>Password</Label>
                      <AvField
                        name="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        validate={{
                          required: {
                            value: true,
                            errorMessage: "Please enter your password",
                          },
                          pattern: {
                            value:
                              "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@#$%^&+=!]).{8,15}$",
                            errorMessage:
                              "Password must contain at least one lowercase letter, one uppercase letter, one digit, one special character, and be between 8 and 15 characters long",
                          },
                          minLength: {
                            value: 8,
                            errorMessage:
                              "Password must be at least 8 characters long",
                          },
                          maxLength: {
                            value: 15,
                            errorMessage:
                              "Password must be at most 15 characters long",
                          },
                        }}
                      />
                    </FormGroup>

                    {/* </AvGroup> */}
                  </Col>
                  <Col>
                    <FormGroup className="form-group has-float-label">
                      <Label>Confirm Password</Label>
                      <AvField
                        name="confirmPassword"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        validate={{
                          required: {
                            value: true,
                            errorMessage: "Confirm Password cannot be empty",
                          },
                          match: {
                            value: "password",
                            errorMessage: "Passwords do not match",
                          },
                        }}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <FormGroup check>
                    <Label check className="ml-2">
                      <Input
                        type="radio"
                        onChange={() => handleRoleChange("MENTOR")}
                        checked={selectedRole === "MENTOR"}
                        name="userRole"
                      />
                      Mentor
                    </Label>
                  </FormGroup>
                  <FormGroup check className="ml-2">
                    <Label check>
                      <Input
                        type="radio"
                        onChange={() => handleRoleChange("USER")}
                        checked={selectedRole === "USER"}
                        name="userRole"
                      />
                      Student
                    </Label>
                  </FormGroup>
                  <FormGroup check className="">
                    <Label check className="ml-2">
                      <Input
                        type="radio"
                        onChange={() => handleRoleChange("LAWYER")}
                        checked={selectedRole === "LAWYER"}
                        name="userRole"
                      />
                      Lawyer
                    </Label>
                  </FormGroup>
                  <FormGroup check>
                    <Label check className="ml-2">
                      <Input
                        type="radio"
                        onChange={() => handleRoleChange("ALUMNI")}
                        checked={selectedRole === "ALUMNI"}
                        name="userRole"
                      />
                      Alumni
                    </Label>
                  </FormGroup>
                </Row>
                {roleError && (
                  <div className="invalid-feedback d-block mt-2 ml-4">
                    Please select at least one role
                  </div>
                )}
                {/* {roleError && <p className="text-danger">Please select at least one role</p>} */}
                <div className="d-flex justify-content-between flex-wrap align-items-center">
                  <div>
                    Already a registered user?{" "}
                    <NavLink to="/login">login</NavLink>
                  </div>
                  <Button
                    color="primary"
                    //  className="btn-shadow"
                    //  size="lg"
                    type="submit"
                    className={`btn-shadow btn-multiple-state ${
                      loading ? "show-spinner" : ""
                    } mt-2 mt-sm-0`}
                    size="lg"
                  >
                    <span className="spinner d-inline-block">
                      <span className="bounce1" />
                      <span className="bounce2" />
                      <span className="bounce3" />
                    </span>
                    <span className="label">
                      <IntlMessages id="user.register-button" />
                    </span>
                  </Button>
                </div>
                {/* <div>
                  Already a registered user?{" "}
                  <NavLink to="/login">login</NavLink>
                </div> */}
              </AvForm>
            )}
          </div>
        </Card>
      </Colxx>
    </Row>
  );
};
const mapStateToProps = () => {};

export default connect(mapStateToProps, {
  registerUserAction: registerUser,
})(Register);
