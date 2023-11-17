/* eslint-disable */

import axios from 'axios';
import { baseUrl } from '../constants/defaultValues';

export const jobService = {
  async getJob() {
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

  async getJobById(id) {
    const url = `${baseUrl}api/job/${id}`;
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

  async deleteJob(id) {
    const url = `${baseUrl}api/job/${id}`;
    try {
      return await axios
        .delete(url)
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

  async addJob(body) {
    const url = `${baseUrl}api/job`;
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

  async editJob(body) {
    const url = `${baseUrl}api/job`;
    try {
      return await axios
        .put(url, body)
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

export default jobService;
