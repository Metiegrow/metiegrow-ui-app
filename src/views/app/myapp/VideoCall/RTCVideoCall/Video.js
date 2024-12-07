import React from "react";
import { AgoraVideoPlayer } from "agora-rtc-react";
// import { Container, Row, Col } from "reactstrap";

export default function Video(props) {
  const { users, tracks, bookedByName, createdByName } = props;
  const currentUser = localStorage.getItem("userName")
  const otherUser = currentUser === createdByName ? bookedByName : createdByName;
// console.log("otherUsernamebook", bookedByName)
// console.log("otherUsernamecreate", createdByName)
console.log("lenth", users)
  return (
   
    <div className="container-fluid" style={{ height: "100%" }}>
      <div className="row" style={{ height: "100%" }}>
        <div className='col-xs-6' style={{ position: "relative" }}>
          <AgoraVideoPlayer
            videoTrack={tracks[1]}
            style={{ height: "100%", width: "100%", border: "5px solid white" }}
          />
          <div style={{ position: "absolute", bottom: 10, left: 10, color: "white", backgroundColor: "rgba(0,0,0,0.5)", padding: "5px" }}>
            {currentUser}
          </div>
        </div>
        {/* {users.length > 0 &&
          users.map((user) => {
            console.log("uuser", users)
            if (user.videoTrack) {
              return (
                <div className='col-xs-6' key={user.uid}>
                  <AgoraVideoPlayer
                    videoTrack={user.videoTrack}
                    style={{ height: "100%", width: "100%" }}
                  />
                </div>
              );
                      // eslint-disable-next-line
            } else return null;
          }
          )} */}
           <div className='col-xs-6' style={{ position: "relative" }}>
          {users.length > 0 && users[0].videoTrack ? (
            <AgoraVideoPlayer
              videoTrack={users[0].videoTrack}
              style={{ height: "100%", width: "100%", border: "5px solid white" }}
            />
          ) : (
            <div style={{ height: "100%", width: "100%", border: "5px solid white", backgroundColor: "#f0f0f0", display: "flex", justifyContent: "center", alignItems: "center" }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-camera-video-off" viewBox="0 0 16 20">
                <path fillRule="evenodd" d="M10.961 12.365a2 2 0 0 0 .522-1.103l3.11 1.382A1 1 0 0 0 16 11.731V4.269a1 1 0 0 0-1.406-.913l-3.111 1.382A2 2 0 0 0 9.5 3H4.272l.714 1H9.5a1 1 0 0 1 1 1v6a1 1 0 0 1-.144.518zM1.428 4.18A1 1 0 0 0 1 5v6a1 1 0 0 0 1 1h5.014l.714 1H2a2 2 0 0 1-2-2V5c0-.675.334-1.272.847-1.634zM15 11.73l-3.5-1.555v-4.35L15 4.269zm-4.407 3.56-10-14 .814-.58 10 14z"/>
              </svg>
            </div>
          )}
          <div style={{ position: "absolute", bottom: 10, left: 10, color: "white", backgroundColor: "rgba(0,0,0,0.5)", padding: "5px" }}>
            {otherUser}
          </div>
          </div>
      </div>
    </div>
  );
}
