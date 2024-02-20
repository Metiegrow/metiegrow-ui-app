import React, { useState, useEffect } from 'react';
import { Row, Card, CardTitle, Label, FormGroup, Button } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import { NotificationManager } from 'components/common/react-notifications';
import { loginUser } from 'redux/actions';
import { Colxx } from 'components/common/CustomBootstrap';
import IntlMessages from 'helpers/IntlMessages';
// import axios from 'axios';
// import { baseUrl } from 'constants/defaultValues';
import { authService } from 'services/authservice';
import axios from 'axios';
import { baseUrl } from 'constants/defaultValues';

// import { connect } from 'react-redux';


// check
// ck

const validatePassword = (value) => {
  let error;
  if (!value) {
    error = 'Please enter your password';
  } else if (value.length < 4) {
    error = 'Value must be longer than 3 characters';
  }
  return error;
};

const validateEmail = (value) => {
  let error;
  if (!value) {
    error = 'Please enter your email address';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
    error = 'Invalid email address';
  }
  return error;
};

const Login = ({ history, loading, error, loginUserAction }) => {
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
  const [email] = useState('vssivanesh@gmail.com');
  const [password] = useState('sivanesh');

  useEffect(() => {
    if (error) {
      NotificationManager.warning(error, 'Login Error', 3000, null, null, '');
    }
  }, [error]);

  // const getStudents = () => {
  //   axios.get(`${baseUrl}/student/personal/info`).then((res) => {
  //     console.log(res);
  //   });
  // };

  // new 
  const [emailData, setEmailData] = useState('');
const [passwordData, setPasswordData] = useState('');
  const url = `${baseUrl}/signIn`
  useEffect(() => {
    axios.get(url)
      .then(response => {
        // console.log(response.data.password);
        setEmailData(response.data.email);
        setPasswordData(response.data.password);
      }).catch(loginError => {
        console.error('Error fetching data: ', loginError);
        NotificationManager.warning("Network errorr", 'Login Error', 6000, null, null, '');
      });
      
  }, []);
  

  const onUserLogin = (values) => {
    if (!loading) {
      if (values.email !== emailData) {
        NotificationManager.warning('Not a registered user', 'Login Error');
        return;
      }
  
      if (values.password !== passwordData) {
        NotificationManager.warning('Incorrect password', 'Login Error');
        return;
      }
  
      const loginResponse = authService.login(email, password);
      console.log(loginResponse.data);
      loginUserAction(values, history);
    }
  };
  
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

 


  const initialValues = { email, password };

  return (
    <Row className="h-100">
      <Colxx xxs="12" md="10" className="mx-auto my-auto">
        <Card className="auth-card">
          <div className="position-relative image-side ">
            <p className="text-white h2">MAGIC IS IN THE DETAILS</p>
            <p className="white mb-0">
              Please use your credentials to login.
              <br />
              If you are not a member, please{' '}
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
              <IntlMessages id="user.login-title" />
            </CardTitle>

            <Formik initialValues={initialValues} onSubmit={onUserLogin}>
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
                  <FormGroup className="form-group has-float-label">
                    <Label>
                      <IntlMessages id="user.password" />
                    </Label>
                    <Field
                      className="form-control"
                      type="password"
                      name="password"
                      validate={validatePassword}
                    />
                    {errors.password && touched.password && (
                      <div className="invalid-feedback d-block">
                        {errors.password}
                      </div>
                    )}
                  </FormGroup>
                  <div className="d-flex justify-content-between align-items-center">
                    <NavLink to="/user/forgot-password">
                      <IntlMessages id="user.forgot-password-question" />
                    </NavLink>
                    <Button type='submit'
                      color="primary"
                      className={`btn-shadow btn-multiple-state ${
                        loading ? 'show-spinner' : ''
                      }`}
                      size="lg"
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
