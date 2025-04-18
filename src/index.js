/* eslint-disable global-require */
import './assets/css/vendor/bootstrap.min.css';
import './assets/css/vendor/bootstrap.rtl.only.min.css';
import 'react-circular-progressbar/dist/styles.css';
import 'react-perfect-scrollbar/dist/css/styles.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-image-lightbox/style.css';
import 'video.js/dist/video-js.css';
import axios from 'axios';

import {
  isMultiColorActive,
  defaultColor,
  isDarkSwitchActive,
} from './constants/defaultValues';
import { getCurrentColor, setCurrentColor } from './helpers/Utils';

const color =
  isMultiColorActive || isDarkSwitchActive ? getCurrentColor() : defaultColor;
setCurrentColor(color);

// Add a request interceptor
axios.interceptors.request.use(
  config => {
    const req = config;
    const currentUserDetails = JSON.parse(localStorage.getItem('gogo_current_user'));
    
    if (currentUserDetails?.token && !req.url?.includes('/authenticate') && !req.url?.includes('/signUp')) {
      req.headers.Authorization = `Bearer ${currentUserDetails.token}`
    }
    
    req.headers[`Content-Type`] = 'application/json';

    return req
  },
  (error) => {
    Promise.reject(error)
  }
);


const render = () => {
  import(`./assets/css/sass/themes/gogo.${color}.scss`).then(() => {
    require('./AppRenderer');
  });
};
render();
