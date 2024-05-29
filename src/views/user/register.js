import React, { useState } from 'react';
import {
  Row,
  Card,
  CardTitle,
  // Form,
  FormGroup,
  Label,
  Input,
  Button,
  // ButtonGroup,
  Col,
} from 'reactstrap';
import { NavLink, useHistory  } from 'react-router-dom';
import { connect } from 'react-redux';
import { registerUser } from 'redux/actions';
import { NotificationManager } from 'components/common/react-notifications';

import IntlMessages from 'helpers/IntlMessages';
import { AvForm, AvField} from 'availity-reactstrap-validation';
import { Colxx } from 'components/common/CustomBootstrap';
import { authService } from 'services/authservice';
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
  const [username,setUsername] = useState("")
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("+91");
  const [password,setPassword] = useState("");
  const [userRoles,setUserRoles] = useState(["MENTOR"]);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [roleError, setRoleError] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false)

  const history = useHistory();

  // 
  
  const handleRoleChange = (role) => {
    if (userRoles.includes(role)) {
      setUserRoles(userRoles.filter(item => item !== role)); 
    } else {
      setUserRoles([...userRoles, role]);
    }
  };

  const clickToLogin = () => {
    history.push('/login')
  }

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
  //           role: e === 1 ? 'MENTOR' : 'MENTEE', // checks if the event value passed is 1 and assigns the respective role
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
      if (userRoles.length === 0) {
        setRoleError(true); 
        return;
      }
      setRoleError(false);

       const signUpResponse = await authService.signUp(
        email,
        phoneNumber,
        password,
        firstName,
        lastName,
        userRoles,
        username
      );
      if (signUpResponse && signUpResponse.status === 201) {
        setIsSubmitted(true)
        // console.log("signupsuccess")
        // history.push('/login');
    } else {
        console.error('Signup Failed:', signUpResponse);

        // console.log("su",signUpResponse)
        NotificationManager.warning("Something went wrong", 'Oops!', 3000, null, null, '');
    }
    } catch (error) {
      console.error('Error registering user:', error);
      NotificationManager.warning("Something went wrong", 'Oops!', 3000, null, null, '');

    }
  }


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
            <p className="text-white h2">MAGIC IS IN THE DETAILS</p>
            {isSubmitted ? (
              <div />
            ) : (
            <p className="white mb-0">
              Please use this form to register. <br />
              If you are a member, please{' '}
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
            </NavLink>
            {isSubmitted?(
              <Row>
                  <h4>A verification link has been sent to your registered email address.</h4>
                <Col className="text-center mt-4" ><Button onClick={clickToLogin} color='primary'>Login</Button></Col>
              </Row>) : (
            <AvForm onValidSubmit={OnRegisterButtonclick}>
              <CardTitle className="mb-4">
              <IntlMessages id="user.register" />
            </CardTitle>
              <Row>
                <Col>
                <AvField
                name="firstName"
                label="First Name"
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                validate={{
                  required: { value: true, errorMessage: 'First name cannot be empty' },
                  pattern: {
                    value: '^[a-zA-Z]+$',
                    errorMessage: 'First name must contain only alphabetic characters',
                  },
                }}
                autoComplete="off"
              />

              </Col>
              <Col>
              <AvField
                name="lastName"
                label="Last Name"
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                validate={{
                  required: { value: true, errorMessage: 'Last name cannot be empty' },
                  pattern: {
                    value: '^[a-zA-Z]+$',
                    errorMessage: 'Last name must contain only alphabetic characters',
                  },
                }}
                autoComplete="off"
              />

              </Col>
              </Row>
              <AvField
                  name="username"
                  label="Username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  validate={{
                    required: { value: true, errorMessage: 'Username cannot be empty' },
                    pattern: {
                      value: '^[a-zA-Z0-9_@]{3,20}$',
                      errorMessage: 'Username must contain 3-20 characters and may include alphanumeric characters, underscores, and the @ symbol',
                    },
                  }}
                  autoComplete="off"
                />



                <AvField
                  name="email"
                  label="Email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  validate={{
                    required: { value: true, errorMessage: 'Email cannot be empty' },
                    email: { value: true, errorMessage: 'Please provide a valid email address' },
                  }}
                  autoComplete="off"
                />

             <AvField
                name="phoneNumber"
                label="Mobile Number"
                type="text"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                validate={{
                  required: { value: true, errorMessage: 'Phone number cannot be empty' },
                  pattern: {
                    value: '^\\+[0-9]{2}[0-9]{10}$',
                    errorMessage: 'Please enter a valid mobile number',
                  },
                }}
                autoComplete="off"
              />

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
              <AvField
                    name="password"
                    label="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    validate={{
                      required: { value: true, errorMessage: 'Please enter your password' },
                      pattern: {
                        value: '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@#$%^&+=!]).{8,15}$',
                        errorMessage: 'Password must contain at least one lowercase letter, one uppercase letter, one digit, one special character, and be between 8 and 15 characters long',
                      },
                      minLength: {
                        value: 8,
                        errorMessage: 'Password must be at least 8 characters long',
                      },
                      maxLength: {
                        value: 15,
                        errorMessage: 'Password must be at most 15 characters long',
                      },
                    }}
                  />
                  {/* </AvGroup> */}


                                

              </Col>
              <Col>
              <AvField
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                validate={{ 
                  required: { value: true, errorMessage: 'Confirm Password cannot be empty' },
                   match: { value: 'password', errorMessage: 'Passwords do not match' } }}
              />
              </Col>
              </Row>
               <Row>
              <FormGroup check>
                <Label check className='ml-2'>
                   <Input
                    type="checkbox"
                    onChange={() => handleRoleChange('MENTOR')}
                    checked={userRoles.includes('MENTOR')}
                  />
                  Mentor
                </Label>
              </FormGroup>
              <FormGroup check className='ml-2'>
                  
                <Label check >
                  <Input
                    type="checkbox"
                    onChange={() => handleRoleChange('MENTEE')}
                    checked={userRoles.includes('MENTEE')}
                  />
                  Mentee
                </Label>
              </FormGroup>
              <FormGroup check>
                <Label check className='ml-2'>
                  <Input
                    type="checkbox"
                    onChange={() => handleRoleChange('LAWYER')}
                    checked={userRoles.includes('LAWYER')}
                  />
                  Lawyer
                </Label>
              </FormGroup>
              </Row>
              {roleError && <p className="text-danger">Please select at least one role</p>}
              <div className="d-flex justify-content-end align-items-center">
                <Button
                 color="primary"
                 className="btn-shadow"
                 size="lg"
                 type="submit"
                >
                 <IntlMessages id="user.register-button" />
                </Button>
              </div>
              <div>Already a registered user? {" "}
              <NavLink to="/login" >
                login
              </NavLink>
              </div>
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
