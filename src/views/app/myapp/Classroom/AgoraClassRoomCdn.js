import React, { useEffect } from 'react';
import { Col } from 'reactstrap';

// Define the variables at the top of your file
let AgoraSelector;
let AgoraCountdown;
let AgoraHXChatWidget;
let FcrStreamMediaPlayerWidget;
let AgoraPolling;
let FcrWatermarkWidget;
let FcrWebviewWidget;
// let FcrBoardWidget;

const VideoRoom = () => {
    useEffect(() => {
        

        const sdkScript = document.createElement('script');
        sdkScript.src = 'https://download.agora.io/edu-apaas/release/edu_sdk@2.9.40.bundle.js';
        sdkScript.async = true;
        document.head.appendChild(sdkScript);

        // Load Agora Widget dynamically
        const widgetScript = document.createElement('script');
        widgetScript.src = 'https://download.agora.io/edu-apaas/release/edu_widget@2.9.40.bundle.js';
        widgetScript.async = true;
        document.head.appendChild(widgetScript);

        // Initialize Agora SDK and launch classroom
        sdkScript.onload = () => {
            window.AgoraEduSDK.config({
                appId: '297d069bbbae41a8a0778b06f333298c',
                region: 'NA'
            });

            window.AgoraEduSDK.launch(document.querySelector('#root'), {
              userUuid: 'user id',
              userName: 'user name',
              roomUuid: 'room id',
              roleType: 1, // User roles: 1 is teacher, 2 is student.
              roomType: 0, // Room type: 0 is one-on-one, 2 is large class, and 4 is small class.
              roomName: 'room name',
              pretest: true, // Whether to enable pre-class equipment detection.
              rtmToken: '', // In a test environment, you can use a temporary RTM Token; in a production or security environment, it is strongly recommended that you use a server-generated RTM Token.
              language: 'en', // The language of the classroom interface. If the interface is in English, set it to 'en'.
              duration: 60 * 30, // Course time in seconds.
              recordUrl: 'https://solutions-apaas.agora.io/apaas/record/dev/2.8.0/record_page.html',
              courseWareList: [],
              virtualBackgroundImages: [], // Virtual background image resource list.
              webrtcExtensionBaseUrl: 'https://solutions-apaas.agora.io/static', // WebRTC Plug-in deployment address.
              uiMode: 'light', // Set the classroom interface to bright mode. If you want the interface to be in dark mode, set it to 'dark'.
              widgets: {
                  popupQuiz: AgoraSelector,
                  countdownTimer: AgoraCountdown,
                  easemobIM: AgoraHXChatWidget,
                  mediaPlayer: FcrStreamMediaPlayerWidget,
                  poll: AgoraPolling,
                  watermark: FcrWatermarkWidget,
                  webView: FcrWebviewWidget,
              },
            });
        };

        // Clean up function
        return () => {
            document.head.removeChild(sdkScript);
            document.head.removeChild(widgetScript);
        };
    }, []);

    // eslint-disable-next-line
    return <Col id="root"></Col>;
    
    
};

export default VideoRoom;
