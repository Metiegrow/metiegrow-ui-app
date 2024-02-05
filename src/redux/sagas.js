import { all } from 'redux-saga/effects';
import authSagas from './auth/saga';
import chatSagas from './chat/saga';

export default function* rootSaga() {
  yield all([authSagas(),
    chatSagas()]);
}
