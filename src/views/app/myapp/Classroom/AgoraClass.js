// import React from 'react';
// import { Button } from 'reactstrap';

// const AgoraClass = () => {
//   const handleClick = () => {
//     window.open(`${process.env.PUBLIC_URL}/VideoRoom.html`, '_blank');
// };

//   return (
//     <div>
//       <Button onClick={handleClick}>Open Class room</Button>
//     </div>
//   );
// };

// export default AgoraClass;


import React, { useEffect } from 'react';

const MyComponent = () => {
  useEffect(() => {
    window.location.href = `${process.env.PUBLIC_URL}/VideoRoom.html`;
  }, []);

  return (
    <div>
     {/* <h4> Opening classroom...</h4> */}
     <div className='loading' />
    </div>
  );
};

export default MyComponent;

