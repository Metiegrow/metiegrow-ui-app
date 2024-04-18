import React, { useState } from "react";
import { Container, Row, Col, Button } from "reactstrap";
import { useHistory } from "react-router-dom";
import { useClient } from "./settings";

const Controls = (props) => {
  const client = useClient();
  const { tracks, setStart, setInCall } = props;
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
    client.removeAllListeners();
    tracks[0].close();
    tracks[1].close();
    setStart(false);
    setInCall(false);
    history.push("/app/callcompleted");
  };

  return (
    <Container fluid>
      <Row md={6} className="align-items-center mt-2">
        <Col md={3} />
        <Col md={2}>
          <Button
            color={trackState.audio ? "primary" : "secondary"}
            onClick={() => mute("audio")}
          >
            {trackState.audio ? (
              <i className="simple-icon-microphone " />
            ) : (
              <i className="simple-icon-microphone" />
            )}
          </Button>
        </Col>
        <Col md={2}>
          <Button
            color={trackState.video ? "primary" : "secondary"}
            onClick={() => mute("video")}
          >
            {trackState.video ? (
              <i className="simple-icon-camrecorder " />
            ) : (
              <i className="simple-icon-camrecorder" />
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
        <Col md={2}>
          <Button color="danger" onClick={() => leaveChannel()}>
            <i className="simple-icon-call-end" />{" "}
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default Controls;
