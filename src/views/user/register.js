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
  ButtonGroup,
} from 'reactstrap';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { registerUser } from 'redux/actions';

import IntlMessages from 'helpers/IntlMessages';
import { Colxx } from 'components/common/CustomBootstrap';
import { authService } from 'services/authservice';
// import { baseUrl } from 'constants/defaultValues';
// import axios from 'axios';
// import { adminRoot } from 'constants/defaultValues';

const Register = () => {
  const [newUser, setNewUser] = useState({
    name: 'testName',
    email: 'test@email.com',
    password: 'TestPass',
    role: 0,
  });

  function handleChange(field, e) {
    switch (field) {
      case 'name':
        setNewUser((props) => {
          return {
            ...props,
            name: e.target.value,
          };
        });
        break;
      case 'email':
        setNewUser((props) => {
          return {
            ...props,
            email: e.target.value,
          };
        });
        break;
      case 'password':
        setNewUser((props) => {
          return {
            ...props,
            password: e.target.value,
          };
        });
        break;
      case 'role':
        setNewUser((props) => {
          return {
            ...props,
            role: e === 1 ? 'COORDINATOR' : 'STUDENT', // checks if the event value passed is 1 and assigns the respective role
          };
        });
        break;

      default:
        console.log('default case ran');
        break;
    }
  }

  function OnRegisterButtonclick() {
    console.log(newUser);
    authService.signUp(
      newUser.email,
      newUser.password,
      newUser.name,
      newUser.role
    );
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
  }

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
              <FormGroup className="form-group has-float-label  mb-4">
                <Label>
                  <IntlMessages id="user.fullname" />
                </Label>
                <Input
                  type="name"
                  defaultValue={newUser.name}
                  onChange={(e) => {
                    handleChange('name', e);
                  }}
                />
              </FormGroup>

              <FormGroup className="form-group has-float-label  mb-4">
                <Label>
                  <IntlMessages id="user.email" />
                </Label>
                <Input
                  type="email"
                  defaultValue={newUser.email}
                  onChange={(e) => {
                    handleChange('email', e);
                  }}
                />
              </FormGroup>

              <FormGroup className="form-group has-float-label  mb-4">
                <Label>
                  <IntlMessages
                    id="user.password"
                    defaultValue={newUser.password}
                  />
                </Label>
                <Input
                  type="password"
                  onChange={(e) => {
                    handleChange('password', e);
                  }}
                />
              </FormGroup>
              <h4>Select Role</h4>
              <ButtonGroup>
                <Button
                  color="primary"
                  // onChange={(e) => {
                  //   handleChange('role', e);
                  // }}
                  onClick={() => {
                    handleChange('role', 1);
                  }} // click function
                  active={newUser.role === 'COORDINATOR'} // set property to selected
                >
                  Coordinator
                </Button>
                <Button
                  color="primary"
                  onClick={() => {
                    handleChange('role', 2);
                  }}
                  active={newUser.role === 'STUDENT'}
                >
                  Student
                </Button>
              </ButtonGroup>

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
