import axios from 'axios';
import { baseUrl } from 'constants/defaultValues';

export const documentsService = {};
export const myDetailsService = {
  async getEducationalInformation() {
    // https://api.sampleapis.com/baseball/hitsSingleSeason
    const url = `${baseUrl}api/student/edu/info`;
    try {
      return await axios
        .get(url)
        .then((res) => {
          console.log('Response getEducationalInformation', res);
          return res;
        })
        .catch((error) => {
          return error;
        });
    } catch (e) {
      return e;
    }
  },
  async postEducationalInformation(body) {
    const url = `${baseUrl}api/student/info`;
    try {
      return await axios
        .post(url, body)
        .then((res) => {
          console.log('Response', res);
          return res;
        })
        .catch((error) => {
          console.log('err on post ', error);
          return error;
        });
    } catch (e) {
      return e;
    }
  },
  async getPersonalInformation() {
    const url = `${baseUrl}api/student/personal/info`;
    try {
      return await axios
        .get(url)
        .then((res) => {
          console.log('Response', res);
          return res;
        })
        .catch((error) => {
          return error;
        });
    } catch (e) {
      return e;
    }
  },
  async postPersonalInformation(body) {
    const url = `${baseUrl}api/student/personal/info`;
    try {
      return await axios
        .post(url, body)
        .then((res) => {
          console.log('Response', res);
          return res;
        })
        .catch((error) => {
          return error;
        });
    } catch (e) {
      return e;
    }
  },
  async getProfessionalInformation() {
    const url = `${baseUrl}api/student/prof/info`;
    try {
      return await axios
        .get(url)
        .then((res) => {
          console.log('Response', res);
          return res;
        })
        .catch((error) => {
          return error;
        });
    } catch (e) {
      return e;
    }
  },
  async postProfessionalInformation(body) {
    const url = `${baseUrl}api/student/prof/info`;
    try {
      return await axios
        .post(url, body)
        .then((res) => {
          console.log('Response', res);
          return res;
        })
        .catch((error) => {
          return error;
        });
    } catch (e) {
      return e;
    }
  },
};
