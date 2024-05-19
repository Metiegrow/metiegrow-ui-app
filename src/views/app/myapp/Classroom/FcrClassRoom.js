import React, { useEffect, useRef } from 'react';
import { FcrUIScene } from 'fcr-ui-scene';
import {
  FcrChatroom,
  FcrBoardWidget,
  FcrPollingWidget,
  FcrStreamMediaPlayerWidget,
  FcrWebviewWidget,
  FcrCountdownWidget,
  FcrPopupQuizWidget
} from 'agora-plugin-gallery/scene';

const AgoraFlexibleClassroom = () => {
  const classroomContainer = useRef(null);

  useEffect(() => {
    const launchOptions = {
      appId: "4e6374a1eddd4d20a604fb0513fae8fb",
      region: "NA",
      userUuid: "2",
      userName: "user name",
      roomUuid: "2",
      roomType: 4, // Room type: 4 is for small classes, currently only small classes are supported.
      roomName: "gogoroom",
      devicePretest: true, // Whether to enable pre-class equipment detection
      token: "007eJxSYMiqOCB/3ZhVdGPnpKde93jTJoonbFlcrsT03pfx+M8bc3gUGExSzYzNTRINU1NSUkxSjAwSzQxM0pIMTA2N0xJTLdKS3m0xTBPgY2A4a8LDyMTAyADCID4LmORgSM9Pzy/Kz89lZDACSUEkGRmMAAEAAP//zz4fzw==",
      language: "en",
      duration: 60 * 30, // Course time in seconds.
      recordUrl: "your record url",
      roleType: 1, // User roles: 1 is teacher, 2 is student
      widgets: {
        easemobIM: FcrChatroom, // IM widget
        netlessBoard: FcrBoardWidget, // Interactive whiteboard widget
        poll: FcrPollingWidget, // Voter widget
        mediaPlayer: FcrStreamMediaPlayerWidget, // Video sync player widget
        webView: FcrWebviewWidget, // Embedded browser widget
        countdownTimer: FcrCountdownWidget, // Countdown widget
        popupQuiz: FcrPopupQuizWidget, // Clicker widget
      }
    };

    const destroyScene = FcrUIScene.launch(
      classroomContainer.current,
      launchOptions,
      () => {
        console.log('Classroom launched successfully');
      },
      (err) => {
        console.error('Failed to launch classroom:', err);
      },
      (type) => {
        console.log('Classroom destroyed:', type);
      }
    );

    return () => {
      destroyScene(); 
    };
  }, []);

  return <div ref={classroomContainer} />;
};

export default AgoraFlexibleClassroom;
