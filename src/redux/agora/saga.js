import { takeLatest, call  } from 'redux-saga/effects';
import { SET_APP_ID } from '../contants';

function* handleSetAppId() {
  // console.log('App ID set saga chk:', action.payload);
  yield call(() => {});
}

export default function* watchSetAppId() {
  yield takeLatest(SET_APP_ID, handleSetAppId);
}