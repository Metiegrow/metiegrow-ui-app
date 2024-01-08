/* eslint-disable */

import axios from 'axios';

import { baseUrl } from '../constants/defaultValues';

export const authService = {
  async signUp(email, password, name, role) {
    localStorage.clear();
    const bodyData = JSON.stringify({
      username: name,
      password: password,
      email: email,
      userType: role,
    });
    
    const url = `${baseUrl}signUp`;
    try {
      return await axios
        .post(url, bodyData)
        .then((res) => {
          console.log(res);
          return res;
        })
        .catch((error) => {
          console.log('ERR:: ', error);
          if (error.response) {
            console.log('ERR:response: ', error);
          } else if (error.request) {
            console.log('ERR:request: ', error);
          } else if (error.message) {
            console.log('ERR:message: ', error);
          }
          throw error;
        });
    } catch (e) {
      return e;
    }
  },

  async login(email, password) {
    localStorage.clear();
    const bodyData = JSON.stringify({
      username: email,
      password: password,
    });
    const url = `${baseUrl}signIn`;
    try {
      return await axios
        .post(url, bodyData)
        .then((res) => {
          console.log(res);
          console.log(res.data.data.userType);
          localStorage.setItem('userType', res.data.data.userType);

          return res;
        })
        .catch((error) => {
          throw error;
        });
    } catch (e) {
      return e;
    }
  },
};

export default authService;
