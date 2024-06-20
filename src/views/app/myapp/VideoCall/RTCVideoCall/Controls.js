import React, { useState } from "react";
import { Container, Row, Col, Button } from "reactstrap";
import { useHistory } from "react-router-dom";
import { useClient } from "./settings";

const Controls = (props) => {
  const client = useClient();
  const { tracks, setStart, setInCall, id, setStatus, sid } = props;
  const [trackState, setTrackState] = useState({ video: true, audio: true });

  const mute = async (type) => {
    if (type === "audio") {
      await tracks[0].setEnabled(!trackState.audio);
      setTrackState((ps) => {
        return { ...ps, audio: !ps.audio };
      });
    } else if (type === "video") {
      await tracks[1].setEnabled(!trackState.video);
      setTrackState((ps) => {
        return { ...ps, video: !ps.video };
      });
    }
  };
  const history = useHistory();
  const leaveChannel = async () => {
    await client.leave();
    setStatus("DISCONNECTED")
    client.removeAllListeners();
    tracks[0].close();
    tracks[1].close();
    setStart(false);
    setInCall(false);
    history.push(`/app/callcompleted/${id}/${sid}`);
  };

  return (
    <Container fluid>
      <Row md={6} className="align-items-center mt-2">
        <Col md={3} />
        <Col md={2} xs={4}>
          <Button
            color="primary"
            onClick={() => mute("audio")}
            className="icon-button"
          >
            {trackState.audio ? (
              // <i className="simple-icon-microphone " />
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-mic" viewBox="0 0 16 20">
  <path d="M3.5 6.5A.5.5 0 0 1 4 7v1a4 4 0 0 0 8 0V7a.5.5 0 0 1 1 0v1a5 5 0 0 1-4.5 4.975V15h3a.5.5 0 0 1 0 1h-7a.5.5 0 0 1 0-1h3v-2.025A5 5 0 0 1 3 8V7a.5.5 0 0 1 .5-.5"/>
  <path d="M10 8a2 2 0 1 1-4 0V3a2 2 0 1 1 4 0zM8 0a3 3 0 0 0-3 3v5a3 3 0 0 0 6 0V3a3 3 0 0 0-3-3"/>
</svg>
            ) : (
              // <i className="simple-icon-microphone" />
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-mic-mute" viewBox="0 0 16 20">
  <path d="M13 8c0 .564-.094 1.107-.266 1.613l-.814-.814A4 4 0 0 0 12 8V7a.5.5 0 0 1 1 0zm-5 4c.818 0 1.578-.245 2.212-.667l.718.719a5 5 0 0 1-2.43.923V15h3a.5.5 0 0 1 0 1h-7a.5.5 0 0 1 0-1h3v-2.025A5 5 0 0 1 3 8V7a.5.5 0 0 1 1 0v1a4 4 0 0 0 4 4m3-9v4.879l-1-1V3a2 2 0 0 0-3.997-.118l-.845-.845A3.001 3.001 0 0 1 11 3"/>
  <path d="m9.486 10.607-.748-.748A2 2 0 0 1 6 8v-.878l-1-1V8a3 3 0 0 0 4.486 2.607m-7.84-9.253 12 12 .708-.708-12-12z"/>
</svg>
            )}
          </Button>
        </Col>
        <Col md={2} xs={4}>
          <Button
            color="primary"
            onClick={() => mute("video")}
            className="icon-button"
          >
            {trackState.video ? (
              // <i className="simple-icon-camrecorder " />
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-camera-video" viewBox="0 0 16 20">
  <path fillRule="evenodd" d="M0 5a2 2 0 0 1 2-2h7.5a2 2 0 0 1 1.983 1.738l3.11-1.382A1 1 0 0 1 16 4.269v7.462a1 1 0 0 1-1.406.913l-3.111-1.382A2 2 0 0 1 9.5 13H2a2 2 0 0 1-2-2zm11.5 5.175 3.5 1.556V4.269l-3.5 1.556zM2 4a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h7.5a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1z"/>
</svg>
            ) : (
              // <i className="simple-icon-camrecorder" />
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-camera-video-off" viewBox="0 0 16 20">
  <path fillRule="evenodd" d="M10.961 12.365a2 2 0 0 0 .522-1.103l3.11 1.382A1 1 0 0 0 16 11.731V4.269a1 1 0 0 0-1.406-.913l-3.111 1.382A2 2 0 0 0 9.5 3H4.272l.714 1H9.5a1 1 0 0 1 1 1v6a1 1 0 0 1-.144.518zM1.428 4.18A1 1 0 0 0 1 5v6a1 1 0 0 0 1 1h5.014l.714 1H2a2 2 0 0 1-2-2V5c0-.675.334-1.272.847-1.634zM15 11.73l-3.5-1.555v-4.35L15 4.269zm-4.407 3.56-10-14 .814-.58 10 14z"/>
</svg>
            )}
          </Button>
          {/* <span onClick={() => mute("video")}><i className="simple-icon-camrecorder " /></span> */}
          {/* <span
            role="button"
            tabIndex={0}
            onClick={() => mute("video")}
            onKeyPress={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                mute("video");
              }
            }}
          >
            <i className="simple-icon-camrecorder" />
          </span> */}
        </Col>
        <Col md={2} xs={4}>
          <Button color="danger" onClick={() => leaveChannel()}  className="icon-button" >
            <i className="simple-icon-call-end" />{" "}
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default Controls;
