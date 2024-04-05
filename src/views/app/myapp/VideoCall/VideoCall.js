// import React, {useState} from 'react';
// import { useHistory } from 'react-router-dom';
// import AgoraUIKit from 'agora-react-uikit';
// import { Card } from 'reactstrap';
// import MentorSessionList from '../BigCalendar/MentorSessionList';

// const VideoCall = () => {
//   const [videoCall, setVideoCall] = useState(true);
//   const history = useHistory();

//   const rtcProps = {
//     appId: '0b60a4bb92204911a7c24ac04304b518',
//     channel: 'gogo',
//     token: '007eJxTYGjN2XcuSlDOUX5v2ymVL5YziplDyw7oBdwIt/35bNeJpw4KDAZJZgaJJklJlkZGBiaWhoaJ5slGJonJBibGBiZJpoYWxy5wpTUEMjKYeV9mZmSAQBCfhSE9Pz2fgQEAJ5Qe0A==',
//   };

//   // const callbacks = {
//   //   EndCall: () => setVideoCall(false);
//   //   history.push('/app/sessionlists');
//   // };

//   // const callbacks = {
//   //   EndCall: () => {
//   //     setVideoCall(false);
//   //     history.push('/app/sessionlists');
//   //   },
//   // };

//   const callbacks = {
//     EndCall: () => {
//       if (videoCall) {
//         setVideoCall(false);
//       history.push('/app/sessionlists');

//       }
//     },
//   };
  

//   return videoCall ? (
//     <Card style={{ display: 'flex', width: '80vw', height: '80vh' }}>
//     {/* // <Card className="d-flex flex-column w-100 h-100">  */}

//       <AgoraUIKit rtcProps={rtcProps} callbacks={callbacks} />
//     </Card>
//   ) 
//   : (
//     // <Button color='primary' onClick={() => setVideoCall(true)}>Start Call</Button>
//     <MentorSessionList onClick={() => setVideoCall(true)} />
//   );
//   // return  (
//   //   <Card style={{ display: 'flex', width: '80vw', height: '80vh' }}>
//   //   {/* // <Card className="d-flex flex-column w-100 h-100">  */}

//   //     <AgoraUIKit rtcProps={rtcProps} callbacks={callbacks} />
//   //   </Card>
//   // ) 
  
// };

// export default VideoCall;



import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory, useLocation  } from 'react-router-dom';
import AgoraUIKit from 'agora-react-uikit';
import { Card } from 'reactstrap';
import { baseUrl } from 'constants/defaultValues';
import MentorSessionList from '../BigCalendar/MentorSessionList';

const VideoCall = () => {
  const [videoCall, setVideoCall] = useState(true);
  const [startTime, setStartTime] = useState(null); 
  const [endCallTime, setEndCallTime] = useState(null)

  const history = useHistory();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const name = searchParams.get('name');
  const mode = searchParams.get('mode');
  const fromtime = searchParams.get('fromtime');
  const totime = searchParams.get('totime');
const url = `${baseUrl}/api/mentee/connect-to-videocall`
console.log("from video", name)

useEffect(() => {
  setStartTime(new Date());
}, []);
  
  const calculateDuration = () => {
    if (startTime && endCallTime) {
      const durationMs = endCallTime.getTime() - startTime.getTime();
      const durationSeconds = Math.floor(durationMs / 1000);
      return durationSeconds;
    }
    return null;
  };

  const rtcProps = {
    appId: '4e6374a1eddd4d20a604fb0513fae8fb',
    channel: 'gogo',
    token: '007eJxTYNiu+Vpij9ma90J3dFQu9hWZpgi1C1zXlr7z/9p8lpvpX6YpMJikmhmbmyQapqakpJikGBkkmhmYpCUZmBoapyWmWqQl5YcIpDUEMjJETTzCwAiFID4LQ3p+ej4DAwBhix+/',
  };

  const callbacks = {
    EndCall: () => {
      if (videoCall) {
        setVideoCall(false);
        setEndCallTime(new Date());
        history.push(`/app/callcompleted?name=${name}&fromtime=${fromtime}&totime=${totime}&mode=${mode}`);


        const endTime = new Date();
        const duration = calculateDuration(); 
        const data = {
          menteeUserId: '1',
          mentorUserId: "2",
          status: 'ended',
          startTime,
          endTime,
          duration,
        };

        axios.post(url, data)
          .then(response => {
            console.log('API call successful:', response.data);
          })
          .catch(error => {
            console.error('API call failed:', error);
          });
      }
    },
    
    
  };

  return videoCall ? (
    <Card style={{ display: 'flex', width: '80vw', height: '80vh' }}>
      <AgoraUIKit rtcProps={rtcProps} callbacks={callbacks} />
    </Card>
  ) : (
    <MentorSessionList onClick={() => setVideoCall(true)} />
  );
};

export default VideoCall;



