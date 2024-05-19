import React from 'react'
// import { Button } from 'reactstrap';
// import AgoraEduClassroom from './Room';
// import VideoRoom from './AgoraClassRoomCdn';
// import AgoraFlexibleClassroom from './FcrClassRoom';


const ClassRoom = () => {
//   const openInNewTab = () => {
//     window.open('http://localhost:3000/VideoRoom.html', '_blank', 'noreferrer');
//  };

 return (
    <div>
      videoroom
      {/* <VideoRoom /> */}
      {/* <AgoraFlexibleClassroom /> */}
      {/* <AgoraEduClassroom /> */}
    </div>
 );
}

export default ClassRoom

// import React from 'react';
// import { Button } from 'reactstrap';
// import VideoRoom from './AgoraClassRoomCdn';

// const ClassRoom = () => {
//   const openNewTab = () => {
//     // Open a new tab/window when the button is clicked
//     const newWindow = window.open('', '_blank');
//     // Render the VideoRoom component in the new tab/window
//     newWindow.document.write('<html><head><title>Video Room</title></head><body><div id="root"></div></body></html>');
//     newWindow.document.getElementById('root').innerHTML = "<h1>Loading Video Room...</h1>";
//     newWindow.document.getElementById('root').style.textAlign = "center";
//     // Delaying the rendering to ensure the DOM is ready
//     setTimeout(() => {
//       newWindow.ReactDOM.render(<VideoRoom />, newWindow.document.getElementById('root'));
//     }, 1000);
//   };

//   return (
//     <div>
//       {/* Button to open the VideoRoom component in a new tab */}
//       <Button onClick={openNewTab}>Open Video Room in New Tab</Button>
//     </div>
//   );
// };

// export default ClassRoom;


 