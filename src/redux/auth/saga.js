import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import { auth } from 'helpers/Firebase';
import { adminRoot, currentUser } from 'constants/defaultValues';
import { setCurrentUser } from 'helpers/Utils';
import { authService } from 'services/authservice';
import {
  LOGIN_USER,
  REGISTER_USER,
  LOGOUT_USER,
  FORGOT_PASSWORD,
  RESET_PASSWORD,
} from '../contants';

import {
  loginUserSuccess,
  loginUserError,
  registerUserSuccess,
  registerUserError,
  forgotPasswordSuccess,
  forgotPasswordError,
  resetPasswordSuccess,
  resetPasswordError,
} from './actions';


export function* watchLoginUser() {
  // eslint-disable-next-line no-use-before-define
  yield takeEvery(LOGIN_USER, loginWithEmailPassword);
}

// let userObj=null;

// const loginWithEmailPasswordAsync = async (email, password) =>
//   authService.login(email,password)
//   .then(res => {
//     userObj=res.data;
//   })
//   .catch((error) => {
//     throw error;
//   });
const loginWithEmailPasswordAsync = async (email, password) =>
  // eslint-disable-next-line no-return-await
  await authService
    .login(email, password)
    .then((user) => user)
    .catch((error) => error);


function* loginWithEmailPassword({ payload }) {
  const { email, password } = payload.user;
  const { history } = payload;
  try {
    const userObj = yield call(loginWithEmailPasswordAsync, email, password);
    if (userObj!=null && userObj.data) {
      const item = { token:userObj.data.token,role:userObj.data.userType, ...currentUser };
      setCurrentUser(item);
      yield put(loginUserSuccess(item));
      history.push(adminRoot);
    } else if(userObj.response && userObj.response.data && userObj.response.data.error && userObj.response.data.error.message) {
      yield put(loginUserError(userObj.response.data.error.message));
    } else if(userObj.response && userObj.response.data && userObj.response.data.error) {
      yield put(loginUserError(userObj.response.data.error));
    }
    else yield put(loginUserError(userObj.message));
  } catch (error) {
    yield put(loginUserError(error));
  }
}

export function* watchRegisterUser() {
  // eslint-disable-next-line no-use-before-define
  yield takeEvery(REGISTER_USER, registerWithEmailPassword);
}



// const registerWithEmailAndPasswordAsync = async (email, password,name) =>
//   authService.signUp(email,password,name)
//   .then(res => {
//     userObj=res.data;
//   })
//   .catch((error) => error);
const registerWithEmailAndPasswordAsync = async (email, password) =>
  // eslint-disable-next-line no-return-await
  await authService
    .signUp(email, password)
    .then((user) => user)
    .catch((error) => error);



function* registerWithEmailPassword({ payload }) {
  const { email, password,name } = payload.user;
  const { history } = payload;
  try {
   const userObj = yield call(registerWithEmailAndPasswordAsync, email, password,name);
    if (userObj!=null && userObj.data) {
      const item = { id: userObj.data.id, ...currentUser };
      yield put(registerUserSuccess(item));
      history.push(adminRoot);
    } else {
      yield put(registerUserError(userObj.data.message));
    }
  } catch (error) {
    yield put(registerUserError(error));
  }
}

export function* watchLogoutUser() {
  // eslint-disable-next-line no-use-before-define
  yield takeEvery(LOGOUT_USER, logout);
}

const logoutAsync = async (history) => {
  await auth
    .signOut()
    .then((user) => user)
    .catch((error) => error);
  history.push(adminRoot);
};

function* logout({ payload }) {
  const { history } = payload;
  setCurrentUser();
  yield call(logoutAsync, history);
}



const forgotPasswordAsync = async (email) => {
  // eslint-disable-next-line
  return await authService
    .sendPasswordResetEmail(email)
    .then((user) => user)
    .catch((error) => error);
};

function* forgotPassword({ payload }) {
  const { forgotUserMail } = payload;
  try {
    const forgotPasswordStatus = yield call(forgotPasswordAsync, forgotUserMail);
    if (forgotPasswordStatus && forgotPasswordStatus.status === 200) {
      yield put(forgotPasswordSuccess('success'));
    } else {
      yield put(forgotPasswordError(forgotPasswordStatus.message || 'Unknown error occurred'));
    }
  } catch (error) {
    yield put(forgotPasswordError(error.message || 'Unknown error occurred'));
  }
}
export function* watchForgotPassword() {
  yield takeEvery(FORGOT_PASSWORD, forgotPassword);
}

export function* watchResetPassword() {
  // eslint-disable-next-line no-use-before-define
  yield takeEvery(RESET_PASSWORD, resetPassword);
}

const resetPasswordAsync = async ( newPassword, confirmPassword, email) => {
  // eslint-disable-next-line no-return-await
  return await authService
    .confirmPasswordReset( newPassword, confirmPassword, email)
    .then((user) => user)
    .catch((error) => error);
};

function* resetPassword({ payload }) {
  const { newPassword, confirmPassword, email } = payload;
  try {
    const resetPasswordStatus = yield call(
      resetPasswordAsync,
      confirmPassword,
      newPassword,
      email
    );
    if (resetPasswordStatus && resetPasswordStatus.status === 200) {
      console.log("vv",resetPasswordStatus)
      yield put(resetPasswordSuccess('success'));
    } else {
      yield put(resetPasswordError(resetPasswordStatus.message || 'Unknown error occurred'));
    }
  } catch (error) {
    yield put(resetPasswordError(error || 'Unknown error occurred'));
  }
}

export default function* rootSaga() {
  yield all([
    fork(watchLoginUser),
    fork(watchLogoutUser),
    fork(watchRegisterUser),
    fork(watchForgotPassword),
    fork(watchResetPassword),
  ]);
}
