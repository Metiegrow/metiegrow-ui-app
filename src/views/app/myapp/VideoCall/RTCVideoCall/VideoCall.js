// import React,{ useState } from "react";
// import { Button } from "reactstrap";
// import VideoCall from "./VideoCall";

// function App() {
//   const [inCall, setInCall] = useState(false);

//   return (
//     <div className="App" style={{ height: "100%" }}>
//       {inCall ? (
//         <VideoCall setInCall={setInCall} />
//       ) : (
//         <Button
//           variant="contained"
//           color="primary"
//           onClick={() => setInCall(true)}
//         >
//           Join Call
//         </Button>
//       )}
//     </div>
//   );
// }

// export default App;

import React, { useState } from "react";
// import { Button } from "reactstrap";
import {useParams} from "react-router-dom";

import VideoCallCtrl from "./VideoCallCtrl";

const VideoCall = () => {
  const [inCall, setInCall] = useState(false);
  const {id}=useParams();

console.log("idd:", id)

  // useEffect(() => {
    
  //   const getIDFromURL = () => {
  //     const searchParams = new URLSearchParams(location.search);
  //     const id = searchParams.get("id");
      
  //     console.log("id from url", id);
  //   };

  //   getIDFromURL(); 
  // }, [location]);

  const handleJoinCall = () => {
    setInCall(false);
    setTimeout(() => {
      setInCall(true);
    }, 2000);
  };

  return (
    <div className="App" style={{ height: "100%" }}>
      {!inCall && (
        <>
          <h1>Connecting...</h1>
          {setTimeout(handleJoinCall)}
        </>
      )}
      {inCall && <VideoCallCtrl id={id} setInCall={setInCall} />}
    </div>
  );
}

export default VideoCall;

// import React, { useState, useEffect } from "react";
// import VideoCall from "./VideoCall";

// function App() {
//   const [inCall, setInCall] = useState(false);
//   const [showConnectingText, setShowConnectingText] = useState(true);

//   useEffect(() => {
//     let timer;
//     if (inCall) {
//       timer = setTimeout(() => {
//         setShowConnectingText(true);
//       }, 3000);
//     }
//     return () => clearTimeout(timer);
//   }, [inCall]);

//   return (
//     <div className="App" style={{ height: "100%" }}>
//       {/* eslint-disable-next-line */}
//       {showConnectingText ? (
//         <p>Connecting...</p>
//       ) : inCall ? (
//         <VideoCall setInCall={setInCall} />
//       ) : null}
//     </div>
//   );
// }

// export default App;


