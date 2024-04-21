import React, { useState, useEffect } from "react";
import {useParams} from "react-router-dom";
// import { Container, Row, Col } from "reactstrap";
// import AgoraRTC from "agora-rtc-react"
import { baseUrl } from "constants/defaultValues";
import axios from "axios";
import {
  config,
  useClient,
  useMicrophoneAndCameraTracks,
  channelName,
} from "./settings";

import Video from "./Video";
import Controls from "./Controls";

const VideoCallCtrl = (props) => {
  const { setInCall } = props;
  const [users, setUsers] = useState([]);
  const [start, setStart] = useState(false);
  const [connectionState, setConnectionState] = useState("");
  const [callStartTime, setCallStartTime] = useState(null);
  const [callEndTime, setCallEndTime] = useState(null);
  const [timeRemaining, setTimeRemaining] = useState(5 * 60);
  const [status, setStatus] = useState("MENTOR_JOINED");
  const client = useClient();
  const { ready, tracks } = useMicrophoneAndCameraTracks();
  const {id}=useParams();

  console.log("idds:", id)
  console.log("user chk", users);
  console.log("check status", status);
 const url = `${baseUrl}/api/mentee/connect-to-videocall`;
  // useEffect(() => {
  //   const fetchData = async () => {
  //     console.log("fetchedData chk");
  //     try {
  //       if (callStartTime && callEndTime && callEndTime > callStartTime) {
  //         const duration = callEndTime - callStartTime;
  //         console.log("Call duration:", duration);
  //         const response = await axios.post(
  //           url,
  //           {
  //             id: 22,
  //             status,
  //             startTime: callStartTime,
  //             endTime: callEndTime,
  //             duration,
  //           }
  //         );
  //         console.log("status post vid :", response.data);
  //         setTimeRemaining(response.data.remainingDuration);
  //       }
  //     } catch (error) {
  //       console.error("Error:", error);
  //     }
  //   };

  //   if (callStartTime && callEndTime) {
  //     fetchData();
  //   }

  //   const intervalId = setInterval(() => {
  //     fetchData();
  //   }, 300000);

  //   return () => {
  //     console.log("Clearing interval chk");
  //     clearInterval(intervalId);
  //   };
  // }, [callStartTime]);

  useEffect(() => {
    const fetchData = async () => {
      console.log("fetchedData chk");
      try {

        if (callStartTime) {
          const endTime = Date.now();
          const duration = endTime - callStartTime;
          console.log("Call duration:", duration);
        const response = await axios.post(url, {
          id: 22,
          status: connectionState,
          
        });
        console.log("status post vid :",response.data);
      }
      } catch (error) {
        console.error('Error:', error);
      }
    };
    fetchData();

    const intervalId = setInterval(() => {
      fetchData();
    }, 300000);
    return () => {
      console.log("Clearing interval chk");
      clearInterval(intervalId);
    };
  }, [connectionState, callStartTime, callEndTime]);

  useEffect(() => {
    const init = async (name) => {
      client.on("user-joined", () => {
        if (!callStartTime) {
          setCallStartTime(Date.now());
          setStatus("BOTH_JOINED")
          console.log("user joined cc");
        }
      });

      client.on("user-left", () => {
        if (users.length === 1) {
          // setCallStartTime(null);
          setCallEndTime(Date.now());
          setStatus("CALL_ENDED")
          console.log("user left cc");
        }
      });

      client.on("connection-state-change", (state) => {
        console.log("Connection state changed:", state);
        setConnectionState(state);
      });

      client.on("user-published", async (user, mediaType) => {
        await client.subscribe(user, mediaType);
        if (mediaType === "video") {
          setUsers((prevUsers) => {
            return [...prevUsers, user];
          });
        }
        if (mediaType === "audio") {
          user.audioTrack.play();
        }
      });

      client.on("user-unpublished", (user, mediaType) => {
        if (mediaType === "audio") {
          if (user.audioTrack) user.audioTrack.stop();
        }
        if (mediaType === "video") {
          setUsers((prevUsers) => {
            return prevUsers.filter((User) => User.uid !== user.uid);
          });
        }
      });

      client.on("user-left", (user) => {
        setUsers((prevUsers) => {
          return prevUsers.filter((User) => User.uid !== user.uid);
        });
      });

      try {
        await client.join(config.appId, name, config.token, null);
      } catch (error) {
        console.log("error");
      }

      if (tracks) await client.publish([tracks[0], tracks[1]]);
      setStart(true);
    };

    if (ready && tracks) {
      try {
        init(channelName);
      } catch (error) {
        console.log(error);
      }
    }
  }, [channelName, client, ready, tracks, users.length]);

  const iTime = new Date(parseInt(callStartTime, 10));

  const hours = iTime.getHours() % 12 || 12;
  const minutes = String(iTime.getMinutes()).padStart(2, "0");
  const period = iTime.getHours() < 12 ? "AM" : "PM";

  const initiatedTime = `${hours}:${minutes} ${period}`;

  console.log(initiatedTime);

  useEffect(() => {
    let timerId;
    if (timeRemaining > 0) {
      timerId = setInterval(() => {
        setTimeRemaining((prevTime) => prevTime - 1);
      }, 1000);
    }

    return () => {
      if (timerId) {
        clearInterval(timerId);
      }
    };
  }, [timeRemaining]);

  // useEffect(() => {
  //   if (connectionState === "CONNECTED") {
  //     setStatus("CALL_IN_PROGRESS");
  //   }
  //   if (callStartTime) {
  //     setStatus("BOTH_JOINED");
  //   } else if (connectionState === "DISCONNECTED") {
  //     setStatus("CALL_ENDED");
  //   }
  // }, [connectionState]);

  const minutes1 = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;
  const formattedTimeRemaining = `${minutes1}:${
    seconds < 10 ? "0" : ""
  }${seconds}`;

  return (
    // <Container fluid style={{ height: "100%" }}>
    //   <Row style={{ height: "5%" }}>
    //     {ready && tracks && (
    //       <Col>
    //         <Controls tracks={tracks} setStart={setStart} setInCall={setInCall} />
    //       </Col>
    //     )}
    //   </Row>
    //   <Row style={{ height: "95%" }}>
    //     {start && tracks && <Video tracks={tracks} users={users} />}
    //   </Row>
    // </Container>
    <div className="container-fluid" style={{ height: "75vh" }}>
      <div className="row p-0 d-flex justify-content-between">
        <h4 className="mr-auto">Initiated Time: {initiatedTime}</h4>
        <h4>
          Time Remaining :{" "}
          <span className="text-danger">{formattedTimeRemaining}</span>
        </h4>
      </div>
      <div className="row" style={{ height: "90%" }}>
        {start && tracks && <Video tracks={tracks} users={users} />}
      </div>
      <div className="row ml-2" style={{ height: "10%" }}>
        {ready && tracks && (
          <>
            <Controls
              tracks={tracks}
              setStart={setStart}
              setInCall={setInCall}
            />
            <p>Connection State: {connectionState}</p>
          </>
        )}
      </div>
    </div>
  );
};

export default VideoCallCtrl;
