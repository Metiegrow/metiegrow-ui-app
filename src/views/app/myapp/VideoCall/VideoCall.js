import React, {useState} from 'react';
import { useHistory } from 'react-router-dom';
import AgoraUIKit from 'agora-react-uikit';
import { Card } from 'reactstrap';
import MentorSessionList from '../BigCalendar/MentorSessionList';

const VideoCall = () => {
  const [videoCall, setVideoCall] = useState(true);
  const history = useHistory();

  const rtcProps = {
    appId: '0b60a4bb92204911a7c24ac04304b518',
    channel: 'gogo',
    token: '007eJxTYGjN2XcuSlDOUX5v2ymVL5YziplDyw7oBdwIt/35bNeJpw4KDAZJZgaJJklJlkZGBiaWhoaJ5slGJonJBibGBiZJpoYWxy5wpTUEMjKYeV9mZmSAQBCfhSE9Pz2fgQEAJ5Qe0A==',
  };

  // const callbacks = {
  //   EndCall: () => setVideoCall(false);
  //   history.push('/app/sessionlists');
  // };

  // const callbacks = {
  //   EndCall: () => {
  //     setVideoCall(false);
  //     history.push('/app/sessionlists');
  //   },
  // };

  const callbacks = {
    EndCall: () => {
      if (videoCall) {
        setVideoCall(false);
      history.push('/app/sessionlists');

      }
    },
  };
  

  return videoCall ? (
    <Card style={{ display: 'flex', width: '80vw', height: '80vh' }}>
    {/* // <Card className="d-flex flex-column w-100 h-100">  */}

      <AgoraUIKit rtcProps={rtcProps} callbacks={callbacks} />
    </Card>
  ) 
  : (
    // <Button color='primary' onClick={() => setVideoCall(true)}>Start Call</Button>
    <MentorSessionList onClick={() => setVideoCall(true)} />
  );
  // return  (
  //   <Card style={{ display: 'flex', width: '80vw', height: '80vh' }}>
  //   {/* // <Card className="d-flex flex-column w-100 h-100">  */}

  //     <AgoraUIKit rtcProps={rtcProps} callbacks={callbacks} />
  //   </Card>
  // ) 
  
};

export default VideoCall;







