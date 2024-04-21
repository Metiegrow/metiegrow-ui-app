import React, { useState } from 'react';
import {
  Row,
  Card,
  CardTitle,
  Form,
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

import IntlMessages from 'helpers/IntlMessages';
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
  const [password,setPassword] = useState("")
  const [userRoles,setUserRoles] = useState(["MENTOR"])

  const history = useHistory();

  // 
  
  const handleRoleChange = (role) => {
    if (userRoles.includes(role)) {
      setUserRoles(userRoles.filter(item => item !== role)); 
    } else {
      setUserRoles([...userRoles, role]);
    }
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
  //           role: e === 1 ? 'MENTOR' : 'MENTEE', // checks if the event value passed is 1 and assigns the respective role
  //         };
  //       });
  //       break;

  //     default:
  //       console.log('default case ran');
  //       break;
  //   }
  // }
  async function OnRegisterButtonclick() {
    try {
      // const response = await authService.signUp(
      //   newUser.email,
      //   newUser.password,
      //   newUser.name,
      //   newUser.role
      const response = await authService.signUp(
        email,
        phoneNumber,
        password,
        firstName,
        lastName,
        userRoles,
        username
      );
      
      console.log(response.data);
      history.push('/login');
    } catch (error) {
      console.error('Error registering user:', error);
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
            <p className="white mb-0">
              Please use this form to register. <br />
              If you are a member, please{' '}
              <NavLink to="/login" className="white">
                login
              </NavLink>
              .
            </p>
          </div>
          <div className="form-side">
            <NavLink to="/" className="white">
              <span className="logo-single" />
            </NavLink>
            <CardTitle className="mb-4">
              <IntlMessages id="user.register" />
            </CardTitle>
            <Form>
              <Row>
                <Col md={6}>
              <FormGroup className="form-group has-float-label  mb-4">
                <Label>
                  {/* <IntlMessages id="user.fullname" /> */}
                  First Name
                </Label>
                <Input
                  type="name"
                  defaultValue={firstName}
                  // onChange={(e) => {
                  //   handleChange('name', e);
                  // }}
                  onChange={(e) => {
                    setFirstName(e.target.value);
                  }}
                />
              </FormGroup>
              </Col>
              <Col md={6}>
              <FormGroup className="form-group has-float-label  mb-4">
                <Label>
                  {/* <IntlMessages id="user.fullname" /> */}
                  Last Name
                </Label>
                <Input
                  type="name"
                  defaultValue={lastName}
                  // onChange={(e) => {
                  //   handleChange('name', e);
                  // }}
                  onChange={(e) => {
                    setLastName(e.target.value);
                  }}
                />
              </FormGroup>
              </Col>
              </Row>

              <FormGroup className="form-group has-float-label  mb-4">
                <Label>
                  {/* <IntlMessages id="user.email" /> */}
                  Set user name
                </Label>
                <Input
                  type="name"
                  defaultValue={username}
                  // onChange={(e) => {
                  //   handleChange('email', e);
                  // }}
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                />
              </FormGroup>
              <FormGroup className="form-group has-float-label  mb-4">
                <Label>
                  <IntlMessages id="user.email" />
                </Label>
                <Input
                  type="email"
                  defaultValue={email}
                  // onChange={(e) => {
                  //   handleChange('email', e);
                  // }}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </FormGroup>
              <FormGroup className="form-group has-float-label  mb-4">
                <Label>
                  Mobile Number
                </Label>
                <Input
                  type="text"
                  defaultValue={phoneNumber}
                  // onChange={(e) => {
                  //   handleChange('email', e);
                  // }}
                  onChange={(e) => {
                    setPhoneNumber(e.target.value);
                  }}
                />
              </FormGroup>

              <FormGroup className="form-group has-float-label  mb-4">
                <Label>
                  <IntlMessages
                    id="user.password"
                    />
                </Label>
                <Input
                  type="password"
                  defaultValue={password}
                  // onChange={(e) => {
                  //   handleChange('password', e);
                  // }}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </FormGroup>
              <h4>Select Role</h4>
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
              {/* <ButtonGroup>
                <Button
                  color="primary"
                  // onChange={(e) => {
                  //   handleChange('role', e);
                  // }}
                  onClick={() => {
                    // handleChange('role', 1);
                    handleRoleChange('MENTOR')
                  }} 
                  active={userRoles === 'MENTOR'}
                >
                  Mentor
                </Button>
                <Button
                  color="primary"
                  onClick={() => {
                    // handleChange('role', 2);
                    handleRoleChange('MENTEE')
                  }}
                  active={userRoles === 'MENTEE'}
                >
                  Mentee
                </Button>
                <Button
                  color="primary"
                  onClick={() => {
                    // handleChange('role', 3);
                    handleRoleChange('LAWYER')
                  }}
                  active={userRoles === 'LAWYER'}
                >
                  Lawyer
                </Button>
              </ButtonGroup> */}

              <div className="d-flex justify-content-end align-items-center">
                <Button
                  color="primary"
                  className="btn-shadow"
                  size="lg"
                  onClick={() => {
                    OnRegisterButtonclick();
                  }}
                >
                  <IntlMessages id="user.register-button" />
                </Button>
              </div>
            </Form>
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
