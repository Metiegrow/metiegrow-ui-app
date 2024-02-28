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
    const url = `${baseUrl}/signUp`;
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
    const bodyData = JSON.stringify({ email: email, password: password });
    const url = `${baseUrl}/signIn`;
    try {
        const res = await axios.post(url, bodyData);
        const tokenRes = res.data.token; 
        console.log(res.data.token);
        localStorage.setItem('tokenRes', tokenRes);
        localStorage.setItem('cRes', "check");
        return res;
    } catch (error) {
        throw error;
    }
},


//   async login(email, password) {
//     const bodyData = JSON.stringify({ email, password });
//     const url = `${baseUrl}/signIn`;
//     try {
//       return await axios.post(url, bodyData)
//       .then((res) =>{
//         console.log(res.data.email);
//         const emailREs = res.data.email;
//         console.log("input - "+email)
//         if (emailREs !== email) {
//           console.log("faild")
//         } else {
//           return res;
           
//         }
//       });
//     } catch (error) {
//       throw error;
//     }
// }

  // async login(email, password) {
  //   const bodyData = JSON.stringify({ email: email, password: password });
  //   const url = `${baseUrl}/signIn`;
  //   try {
  //     const response = await axios.post(url, bodyData);
  //     console.log(response.data);
  //     if (response.data) {
  //       return response.data; 
  //     } else {
  //       throw new Error(response.data.message); 
  //     }
  //   } catch (error) {
  //     console.error('Login error:', error.response.data);
  //     throw error;
  //   }
  // },
  
  // async login(email, password) {
  //   // localStorage.clear();
  //   const bodyData = JSON.stringify({
  //     email: email,
  //     password: password,
      
  //   });
  //   const url = `${baseUrl}/signIn`;
  //   try {
  //     return await axios
  //       .get(url, bodyData)
  //       .then((res) => {
  //         console.log(res);
  //         // console.log(res.data);
  //         // console.log('Full response:', loginResponse);

  //         // localStorage.setItem('email', res.data.email);
  //         // if (!res.data.email) {
  //         //   console.error('User email not found in the response:', res.data);
  //         // } else {
  //         //   localStorage.setItem('email', res.data.email);
  //         console.log(res.data.data.userType);
  //         localStorage.setItem('userType', 0);
  //         // localStorage.setItem('gogo_react_login')
  //         // }

  //         return res;
  //       })
  //       .catch((error) => {
  //         throw error;
  //       });
  //   } catch (e) {
  //     return e;
  //   }
  // },
};

export default authService;
