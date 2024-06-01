import React from "react";
import { AgoraVideoPlayer } from "agora-rtc-react";
// import { Container, Row, Col } from "reactstrap";

export default function Video(props) {
  const { users, tracks, bookedByName, createdByName } = props;
  const currentUser = localStorage.getItem("userName")
  const otherUser = currentUser === createdByName ? bookedByName : createdByName;
// console.log("otherUsernamebook", bookedByName)
// console.log("otherUsernamecreate", createdByName)
  return (
   
    <div className="container-fluid" style={{ height: "100%" }}>
      <div className="row" style={{ height: "100%" }}>
        <div className='col-xs-6' style={{ position: "relative" }}>
          <AgoraVideoPlayer
            videoTrack={tracks[1]}
            style={{ height: "100%", width: "100%" }}
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
          {users.length > 0 && users[0].videoTrack && (
            <div className='col-xs-6'  style={{ position: "relative" }} key={users[0].uid}>
              <AgoraVideoPlayer
                videoTrack={users[0].videoTrack}
                style={{ height: "100%", width: "100%" }}
              />
              <div style={{ position: "absolute", bottom: 10, left: 10, color: "white", backgroundColor: "rgba(0,0,0,0.5)", padding: "5px" }}>
              {otherUser}
            </div>
            </div>
          )}

      </div>
    </div>
  );
}
