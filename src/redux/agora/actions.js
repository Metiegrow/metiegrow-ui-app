/* eslint-disable import/prefer-default-export */

import { SET_APP_ID } from '../contants';

export const setAppId = (id) => ({
  type: SET_APP_ID,
  payload: id
});

