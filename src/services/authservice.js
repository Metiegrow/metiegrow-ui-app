/* eslint-disable */

import axios from 'axios';
// import { NotificationManager } from 'components/common/react-notifications';

import { baseUrl } from '../constants/defaultValues';

export const authService = {
  async signUp(email,phoneNumber, password, firstName,lastName, userRoles, username) {
    localStorage.clear();
    const bodyData = JSON.stringify({
      firstName,
      lastName,
      username,
      password,
      email,
      phoneNumber,
      userRoles,
    });
    const url = `${baseUrl}/api/signUp`;
    try {
      return await axios
        .post(url, bodyData)
        .then((res) => {
          // console.log(res);
          return res;
        })
        .catch((error) => {
          console.log('ERR:: ', error);
          // NotificationManager.warning(error, 'Error', 3000, null, null, '');
          if (error.response) {
            console.log('ERR:response: ', error);
          // NotificationManager.warning(error, 'Error', 3000, null, null, '');
          } else if (error.request) {
            console.log('ERR:request: ', error);
            // NotificationManager.warning(error, 'Error', 3000, null, null, '');
          } else if (error.message) {
            console.log('ERR:message: ', error);
            // NotificationManager.warning(error, 'Error', 3000, null, null, '');
          }
          throw error;
        });
    } catch (e) {
      return e.response;
    }
  },
  
//   async login(email, password) {
//     const bodyData = JSON.stringify({ email: email, password: password });
//     const url = `${baseUrl}/api/authenticate`;
//     try {
//         const res = await axios.post(url, bodyData);
//         const tokenRes = res.data.token; 
//         console.log(res.data)
//         // const statusRes = res.data.roles.map(role => role.status);
//         // const roleRes = res.data.roles.map(role => role.role);
//         const statusRes = "7"; 
//         const roleRes = ["MENTOR"]; 
//         console.log(res.data.token);
//         console.log(statusRes);
//         console.log(roleRes);
//         // localStorage.setItem('status', JSON.stringify(statusRes));
//         // localStorage.setItem('roleRes', JSON.stringify(roleRes));
//         localStorage.setItem('tokenRes', tokenRes);
//         localStorage.setItem('status', statusRes);
//         localStorage.setItem('roleRes', roleRes);
//         localStorage.setItem('cRes', "check");
//         return res;
//     } catch (error) {
//         throw error;
//     }
// },


// with backend

async login(email, password , history) {
  const bodyData = JSON.stringify({ email: email, password: password });  
  const url = `${baseUrl}/api/authenticate`;
  try {
      const res = await axios.post(url, bodyData);
      const tokenRes = res.data.token; 
      // console.log(res.data)
      // console.log("res.data.roles: check")

      if(res.data.roles){
        // console.log("res.data.roles: true")
      const statusRes = res.data.roles.map(role => role.status);
        const roleRes = res.data.roles.map(role => role.role);
        const userName = res.data.userName;
        const imageUrl = res.data.imageUrl;
        const userId = res.data.userId;
      // console.log("role res from auth", roleRes)
      const expirationTime = new Date(Date.now() + 6 * 60 * 60 * 1000);

      localStorage.setItem('expirationTime', expirationTime.getTime());
      localStorage.setItem('userName', userName);
      localStorage.setItem('imageUrl', imageUrl);
      localStorage.setItem("userId", userId)
      //const statusRes = "3"; 
      // console.log(res.data.token);
      // console.log("status response", statusRes);
      // console.log("Role response", roleRes);
      const check1=JSON.stringify(statusRes);
      // const check2=JSON.stringify(roleRes);
      localStorage.setItem('status', check1[1]);
      // localStorage.setItem('roleRes', check2[1]);
      localStorage.setItem('tokenRes', tokenRes);
    localStorage.setItem('roleRes', roleRes);
     // localStorage.setItem('status', statusRes);
      // localStorage.setItem('cRes', "check");
    }
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
  async sendPasswordResetEmail(email) {
    const bodyData = JSON.stringify({ email: email});  
    const url = `${baseUrl}/api/forgot-password`;
    try {
        const res = await axios.put(url, bodyData);
  console.log(res);
        return res;
    } catch (error) {
        throw error;
    }
  }
};

export default authService;
