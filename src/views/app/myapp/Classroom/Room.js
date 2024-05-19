/*eslint-disable*/

// import React, { useEffect } from 'react';

// const AgoraClassroom = () => {
//  useEffect(() => {
//     // Configure the SDK
//     AgoraEduSDK.config({
//       appId: 'Your App ID',
//       region: 'NA'
//     });

//     // Start online classroom
//     const unmount = AgoraEduSDK.launch(document.querySelector("#root"), {
//       userUuid: 'user id',
//       userName: 'user name',
//       roomUuid: 'room id',
//       roleType: 1, // User roles: 1 is teacher, 2 is student.
//       roomType: 0, // Room type: 0 is one-on-one, 2 is large class, and 4 is small class.
//       roomName: 'room name',
//       pretest: true, // Whether to enable pre-class equipment detection.
//       rtmToken: 'rtm token', // In a test environment, you can use a temporary RTM Token; in a production or security environment, it is strongly recommended that you use a server-generated RTM Token.
//       language: 'zh', // The language of the classroom interface. If the interface is in English, set it to 'en'.
//       duration: 60 * 30, // Course time in seconds.
//       recordUrl: 'https://solutions-apaas.agora.io/apaas/record/dev/2.8.0/record_page.html',
//       courseWareList: [],
//       virtualBackgroundImages: [], // Virtual background image resource list.
//       webrtcExtensionBaseUrl: 'https://solutions-apaas.agora.io/static', // WebRTC Plug-in deployment address.
//       uiMode: 'light', // Set the classroom interface to bright mode. If you want the interface to be in dark mode, set it to 'dark'.
//       widgets: {
//         popupQuiz: AgoraSelector,
//         countdownTimer: AgoraCountdown,
//         easemobIM: AgoraHXChatWidget,
//         mediaPlayer: FcrStreamMediaPlayerWidget,
//         poll: AgoraPolling,
//         watermark: FcrWatermarkWidget,
//         webView: FcrWebviewWidget,
//         netlessBoard: FcrBoardWidget
//       },
//       listener: (evt, args) => {
//       },
//     });

//     // Cleanup on component unmount
//     return () => {
//       unmount();
//     };
//  }, []);

//  return (
//     <div id="root" style={{ width: '100%', height: '100%' }}></div>
//  );
// };

// export default AgoraClassroom;

import React, { useEffect } from 'react';
import { useExternalScript } from './useExternalScript'; 

const AgoraClassroom = () => {
 const sdkScriptState = useExternalScript("https://download.agora.io/edu-apaas/release/edu_sdk@2.9.20.bundle.js");
 const widgetsScriptState = useExternalScript("https://download.agora.io/edu-apaas/release/edu_widget@2.9.20.bundle.js");

 useEffect(() => {
    if (sdkScriptState === "ready" && widgetsScriptState === "ready") {
      // Configure the SDK
      window.AgoraEduSDK.config({
        appId: 'Your App ID',
        region: 'NA'
      });

      // Start online classroom
      const unmount = window.AgoraEduSDK.launch(document.querySelector("#root"), {
        userUuid: 'user id',
        userName: 'user name',
        roomUuid: 'room id',
        roleType: 1, // User roles: 1 is teacher, 2 is student.
        roomType: 0, // Room type: 0 is one-on-one, 2 is large class, and 4 is small class.
        roomName: 'room name',
        pretest: true, // Whether to enable pre-class equipment detection.
        rtmToken: 'rtm token', // In a test environment, you can use a temporary RTM Token; in a production or security environment, it is strongly recommended that you use a server-generated RTM Token.
        language: 'zh', // The language of the classroom interface. If the interface is in English, set it to 'en'.
        duration: 60 * 30, // Course time in seconds.
        recordUrl: 'https://solutions-apaas.agora.io/apaas/record/dev/2.8.0/record_page.html',
        courseWareList: [],
        virtualBackgroundImages: [], // Virtual background image resource list.
        webrtcExtensionBaseUrl: 'https://solutions-apaas.agora.io/static', // WebRTC Plug-in deployment address.
        uiMode: 'light', // Set the classroom interface to bright mode. If you want the interface to be in dark mode, set it to 'dark'.
        widgets: {
          popupQuiz: window.AgoraSelector,
          countdownTimer: window.AgoraCountdown,
          easemobIM: window.AgoraHXChatWidget,
          mediaPlayer: window.FcrStreamMediaPlayerWidget,
          poll: window.AgoraPolling,
          watermark: window.FcrWatermarkWidget,
          webView: window.FcrWebviewWidget,
          netlessBoard: window.FcrBoardWidget
        },
        listener: (evt, args) => {
          // Handle events here
        },
      });

      // Cleanup on component unmount
      return () => {
        unmount();
      };
    }
 }, [sdkScriptState, widgetsScriptState]); // Depend on the script loading states

 return (
    <div id="root" style={{ width: '100%', height: '100%' }}></div>
 );
};

export default AgoraClassroom;

