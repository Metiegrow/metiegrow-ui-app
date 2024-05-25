import React from "react";
import { AgoraVideoPlayer } from "agora-rtc-react";
// import { Container, Row, Col } from "reactstrap";

export default function Video(props) {
  const { users, tracks } = props;

  return (
   
    <div className="container-fluid" style={{ height: "100%" }}>
      <div className="row" style={{ height: "100%" }}>
        <div className='col-xs-6'>
          <AgoraVideoPlayer
            videoTrack={tracks[1]}
            style={{ height: "100%", width: "100%" }}
          />
        </div>
        {users.length > 0 &&
          users.map((user) => {
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
          })}
      </div>
    </div>
  );
}
