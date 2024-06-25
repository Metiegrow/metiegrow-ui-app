import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
// import { Container, Row, Col } from "reactstrap";
// import AgoraRTC from "agora-rtc-react"
import { baseUrl } from "constants/defaultValues";
import axios from "axios";
import { Button } from "reactstrap";
import { useClient, useMicrophoneAndCameraTracks } from "./settings";

import Video from "./Video";
import Controls from "./Controls";

const VideoCallCtrl = (props) => {
  const { setInCall } = props;
  const [users, setUsers] = useState([]);
  const [start, setStart] = useState(false);
  // const [connectionState, setConnectionState] = useState("");
  const [callStartTime, setCallStartTime] = useState(null);
  // const [startTime, setStartTime] = useState(0)
  const [endTime, setEndTime] = useState(0);
  // const [callEndTime, setCallEndTime] = useState(null);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [channelName, setChannelName] = useState("");
  const [status, setStatus] = useState("");
  const [rtcToken, setRtcToken] = useState(null);
  const [appId, setAppId] = useState(null)
  const [bookedByName, setBookedByName] =useState("");
  const [createdByName, setCreatedByName] = useState("");
  const client = useClient();
  const { ready, tracks } = useMicrophoneAndCameraTracks();
  const { userId, id } = useParams();
  const history = useHistory();
  // const currentTime = Date.now();

  //     const durationMs = currentTime - endTime;

  //     const durationSec = durationMs / 1000;

  //     setTimeRemaining(durationSec);

  // console.log(callEndTime)
  // console.log("userid:", userId)
  // console.log("iid",id)
  // console.log("user chk", users);
  // console.log("check status", status);
  const url = `${baseUrl}/api/mentee/connect-to-videocall`;

  //  const [rtcToken, setRtcToken] = useState()
  //  console.log("rrtc",rtcToken)
  //  const getToken = async () => {
  //    const url2 = `${baseUrl}/api/generate-rtc-token/${id}`;
  //    const response = await axios.get(url2);
  //    console.log("chkchk",response)
  //    setRtcToken(response.data.rtcToken);

  //  };
  // //  useEffect(() => {
  //  getToken()
  // //  }, []);

  useEffect(() => {
    const getToken = async () => {
      try {
        const url2 = `${baseUrl}/api/generate-rtc-token/${id}`;
        const response = await axios.get(url2);
        // console.log("resp",response)
        setRtcToken(response.data.rtcToken);
        setChannelName(response.data.channelName);
        setAppId(response.data.appId);
        // setStartTime(response.data.startTime)
        setEndTime(response.data.endTime);
        setCreatedByName(response.data.createdByName);
        setBookedByName(response.data.bookedByName);
      } catch (error) {
        console.error("Error fetching RTC token:", error);
      }
    };

    getToken();
  }, []);

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

  function getRoleRes() {
    return localStorage.getItem("roleRes");
  }

  const roleRes = getRoleRes();

  useEffect(() => {
    if (roleRes.includes("MENTOR")) {
      const postData = async () => {
        console.log("fetchedData chk");
        try {
          if (callStartTime) {
            const endTime1 = Date.now();
            const duration = endTime1 - callStartTime;
            console.log("Call duration:", duration);
            const response = await axios.post(url, {
              id,
              status,
            });
            console.log("status post vid :", response.data.remainingDuration);
          }
        } catch (error) {
          console.error("Error:", error);
        }
      };
      postData();
    }
    // const intervalId = setInterval(() => {
    //   postData();
    // }, 300000);
    // return () => {
    //   console.log("Clearing interval chk");
    //   clearInterval(intervalId);
    // };
  }, [status]);

  useEffect(() => {
    const init = async (name) => {
      client.on("user-joined", () => {
        if (!callStartTime) {
          setCallStartTime(Date.now());
          setStatus("CONNECTED");
          // console.log("user joined cc");
        }
      });

      client.on("user-left", () => {
        if (users.length === 1) {
          client.leave();
          // setCallStartTime(null);
          // setCallEndTime(Date.now());
          setStatus("DISCONNECTED");
          // console.log("user left cc");
        }
      });

      client.on("connection-state-change", (state) => {
        console.log("Connection state changed:", state);
        // setConnectionState(state);
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

      const disconnectRemainingUser = () => {
        setStatus("DISCONNECTED");
        client.leave();
        client.removeAllListeners();
        tracks[0].close();
        tracks[1].close();
        setStart(false);
        setInCall(false);
        history.push(`/app/callcompleted/${userId}/${id}`);
      };

      // client.on("user-left", (user) => {
      //   setUsers((prevUsers) => {
      //     return prevUsers.filter((User) => User.uid !== user.uid);
      //   });
      // });
      client.on("user-left", (user) => {
        setUsers((prevUsers) => prevUsers.filter((User) => User.uid !== user.uid));
      
        if (users.length === 1) {
          disconnectRemainingUser();
        }
      });

     

      try {
        await client.join(appId, name, rtcToken, null);
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
  }, [channelName, client, ready, tracks, users.length, rtcToken]);

  const iTime = new Date(parseInt(callStartTime, 10));

  const hours = iTime.getHours() % 12 || 12;
  const minutes = String(iTime.getMinutes()).padStart(2, "0");
  const period = iTime.getHours() < 12 ? "AM" : "PM";

  const initiatedTime = `${hours}:${minutes} ${period}`;

  // console.log(initiatedTime);

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

  // const minutes1 = Math.floor(timeRemaining / 60);
  // const seconds = timeRemaining % 60;
  // const formattedTimeRemaining = `${minutes1}:${
  //   seconds < 10 ? "0" : ""
  // }${seconds}`;
  // const callCurrentTime = Date.now()

  // const callTimeRemaining = endTime - callCurrentTime
  // const minutesRemaining = Math.floor(callTimeRemaining / 1000 / 60);

  const [minutesRemaining1, setMinutesRemaining1] = useState(null);

  useEffect(() => {
    // const endTime = 1716544815000; 
    const updateRemainingTime = () => {
      const callCurrentTime = Date.now();
      const callTimeRemaining = endTime - callCurrentTime;
      const minutesRemaining = Math.max(
        0,
        Math.floor(callTimeRemaining / 1000 / 60)
      );
      setMinutesRemaining1(minutesRemaining);
    };

    updateRemainingTime();
    const intervalId = setInterval(updateRemainingTime, 60000); 

    return () => clearInterval(intervalId);
  }, [endTime]);

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
        {/* <h4 className="mr-auto">Initiated Time: {initiatedTime}</h4> */}
        {callStartTime && (
          <h4 className="mr-auto">Initiated Time: {initiatedTime}</h4>
        )}
        {/* <h4>
          Time Remaining :{" "}
          <span className="text-danger">{minutesRemaining1}</span>
        </h4> */}
        {minutesRemaining1 > 0 && minutesRemaining1 <= 10 ? (
          // <div>Time Remaining : {minutesRemaining1} minutes</div>
          <h4>
            Time Remaining :{" "}
            <span className="text-danger">{minutesRemaining1} minutes</span>{" "}{roleRes.includes("MENTEE") ? (<span>Extend by 15 minutes? <Button color="primary">Pay from wallet</Button></span>) : null }
          </h4>
        ) : (
          <></>
        )}
        {roleRes.includes("MENTEE") && minutesRemaining1 === 0 ? (
          <div>
            <h4>
            Extend by 15 minutes? <Button color="primary">Pay from wallet</Button>
            </h4>
          </div>
        ) : null}
      </div>
      <div className="row" style={{ height: "90%" }}>
        {start && tracks && <Video tracks={tracks} users={users} createdByName={createdByName} bookedByName={bookedByName} />}
      </div>
      <div className="row ml-2" style={{ height: "10%" }}>
        {ready && tracks && (
          <>
            <Controls
              id={userId}
              sid={id}
              tracks={tracks}
              setStart={setStart}
              setInCall={setInCall}
              setStatus={setStatus}
            />
            {/* <p>Connection State: {connectionState}</p> */}
          </>
        )}
      </div>
    </div>
  );
};

export default VideoCallCtrl;

// import React from 'react'

// const [minutesRemaining, setMinutesRemaining] = useState(0);

//   useEffect(() => {
//     const endTime = 1716544815000; // Example end time
//     const updateRemainingTime = () => {
//       const callCurrentTime = Date.now();
//       const callTimeRemaining = endTime - callCurrentTime;
//       const minutesRemaining = Math.max(0, Math.floor(callTimeRemaining / 1000 / 60));
//       setMinutesRemaining(minutesRemaining);
//     };

//     // Update the time remaining initially and then every minute
//     updateRemainingTime();
//     const intervalId = setInterval(updateRemainingTime, 60000); // 60000 milliseconds = 1 minute

//     // Cleanup function to clear the interval when component unmounts
//     return () => clearInterval(intervalId);
//   }, []);
