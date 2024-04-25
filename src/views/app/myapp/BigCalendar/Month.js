import { Colxx } from 'components/common/CustomBootstrap';
import React,{useState,useEffect} from 'react';
import { useLocation } from 'react-router-dom';

import {  Button, Card, CardBody, Modal, ModalBody, Table ,Row,} from 'reactstrap';
import axios from 'axios';
import { baseUrl } from 'constants/defaultValues';
import PopupWizard from './PopupWizard';

const Month = () => {
  
  // const url=`${baseUrl}/mentorAvailablity`


  // if you change the url to backend uncomment the below line
  const url=`${baseUrl}/api/calendar/appointment/mentee`

  const[mentoravailable,setMentorAvailable]=useState([]);
  const [currentWeekStart, setCurrentWeekStart] = useState(new Date());
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const mentorName = searchParams.get('mentorName');
  const mentorId = searchParams.get('mentorId');

  const [selectedDate, setSelectedDate] = useState(null); 
  const [hasAvailableSlots,setHasAvailableSlots] = useState(true);
 
  // const [selectedStartTime, setSelectedStartTime] = useState(null);
  // const [selectedEndTime, setSelectedEndTime] = useState(null);
  

  // Function to get the start date of the current week
  // const getStartOfWeek = () => {
  //   const currentDate = new Date();
  //   const day = currentDate.getDay();
  //   const diff = currentDate.getDate() - day + (day === 0 ? -6 : 1); // Adjust when day is Sunday
  //   return new Date(currentDate.setDate(diff));
  // };
  const getStartOfWeek = () => {
    const currentDate = new Date();
    const day = currentDate.getDay();
    const diff = currentDate.getDate() - day + (day === 0 ? -6 : 1); // Adjust when day is Sunday
    const startOfWeek = new Date(currentDate.setDate(diff));
    
    return startOfWeek;
  };

  // Function to get the end date of the current week
  // const getEndOfWeek = (startOfWeek) => {
  //   const endOfWeek = new Date(startOfWeek);
  //   endOfWeek.setDate(endOfWeek.getDate() + 6);
  //   return endOfWeek;
  // };

 

  

const fetchMentorAvailability = async (fromTime, toTime) => {
  try {
    // const response = await axios.get(`${baseUrl}/mentorAvailablity?mentorId=${mentorId}&fromTime=${fromTime}&toTime=${toTime}`);
    const response = await axios.get(`${url}?mentorId=${mentorId}&fromTime=${fromTime}&toTime=${toTime}`);
    const availability = response.data;
    setMentorAvailable(availability);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};


// useEffect(() => {
//   const startOfWeek = getStartOfWeek();
//   const endOfWeek = getEndOfWeek(startOfWeek);
//   const newUrl = `${window.location.origin}${window.location.pathname}?mentorId=${mentorId}&mentorName=${mentorName}&fromTime=${startOfWeek.getTime()}&toTime=${endOfWeek.getTime()}`;
//   window.history.replaceState(null, '', newUrl);
//   if (mentorId) {
//     fetchMentorAvailability(startOfWeek.getTime(), endOfWeek.getTime());
//   }
// }, []);
// useEffect(() => {
//   const startOfWeekTimestamp = currentWeekStart.getTime(); // Start of the current week
//   const endOfWeekTimestamp = new Date(currentWeekStart); // End of the current week
//   endOfWeekTimestamp.setDate(endOfWeekTimestamp.getDate() + 6);

//   const newUrl = `${window.location.origin}${window.location.pathname}?mentorId=${mentorId}&mentorName=${mentorName}&fromTime=${startOfWeekTimestamp}&toTime=${endOfWeekTimestamp.getTime()}`;
//   window.history.replaceState(null, '', newUrl);

//   if (mentorId) {
//     fetchMentorAvailability(startOfWeekTimestamp, endOfWeekTimestamp.getTime());
//   }
// }, []);
// useEffect(() => {
//   // Set the time of currentWeekStart to 12:00 PM (noon)
//   const startOfWeekTimestamp = new Date(currentWeekStart);
//   startOfWeekTimestamp.setHours(12, 0, 0, 0);

//   // Set the time of endOfWeekTimestamp to 11:59 PM
//   const endOfWeekTimestamp = new Date(currentWeekStart);
//   endOfWeekTimestamp.setDate(endOfWeekTimestamp.getDate() + 6); // Set to end of week
//   endOfWeekTimestamp.setHours(11, 59, 59, 999);

//   const newUrl = `${window.location.origin}${window.location.pathname}?mentorId=${mentorId}&mentorName=${mentorName}&fromTime=${startOfWeekTimestamp.getTime()}&toTime=${endOfWeekTimestamp.getTime()}`;
//   window.history.replaceState(null, '', newUrl);

//   if (mentorId) {
//     fetchMentorAvailability(startOfWeekTimestamp.getTime(), endOfWeekTimestamp.getTime());
//   }
// }, [currentWeekStart, mentorId]);
// new code
useEffect(() => {
  // Set the time of currentWeekStart to 12:00 AM (midnight)
  const startOfWeekTimestamp = new Date(currentWeekStart);
  startOfWeekTimestamp.setHours(0, 0, 0, 0); // Set hours, minutes, seconds, and milliseconds to zero

  // Set the time of endOfWeekTimestamp to 11:59 PM
  const endOfWeekTimestamp = new Date(currentWeekStart);
  endOfWeekTimestamp.setDate(endOfWeekTimestamp.getDate() + 6); // Set to end of week
  endOfWeekTimestamp.setHours(23, 59, 59, 999); // Set hours to 11, minutes to 59, seconds to 59, and milliseconds to 999

  const newUrl = `${window.location.origin}${window.location.pathname}?mentorId=${mentorId}&mentorName=${mentorName}&fromTime=${startOfWeekTimestamp.getTime()}&toTime=${endOfWeekTimestamp.getTime()}`;
  window.history.replaceState(null, '', newUrl);
  

  if (mentorId) {
    fetchMentorAvailability(startOfWeekTimestamp.getTime(), endOfWeekTimestamp.getTime());
  }
}, [currentWeekStart, mentorId]);







// useEffect(() => {
//   const startOfWeek = getStartOfWeek();
//   console.log('Start of the Current Week checking:', startOfWeek);
//   setCurrentWeekStart(startOfWeek);
// }, []);
useEffect(() => {
  const startOfWeek = getStartOfWeek();

  setCurrentWeekStart(startOfWeek);
}, []);

  

  
  
  const [modalSmall, setModalSmall] = useState(false);
  
  // weeklist functions start
  const goToPreviousWeek = () => {
    const newStartDate = new Date(currentWeekStart);
    newStartDate.setDate(newStartDate.getDate() - 7);
    setCurrentWeekStart(newStartDate);
  };

  // const goToNextWeek = () => {
  //   const newStartDate = new Date(currentWeekStart);
  //   newStartDate.setDate(newStartDate.getDate() + 7);
  //   setCurrentWeekStart(newStartDate);

    
  // };

  // const goToNextWeek = () => {
  //   const newStartDate = new Date(currentWeekStart);
  //   newStartDate.setDate(newStartDate.getDate() + 7);
  //   setCurrentWeekStart(newStartDate);
  
  //   // Calculate the start of the next week
  //   const nextWeekStart = new Date(newStartDate);
  //   nextWeekStart.setDate(nextWeekStart.getDate() - nextWeekStart.getDay() + 1);
  
  //   // Calculate the end of the next week
  //   const nextWeekEnd = new Date(nextWeekStart);
  //   nextWeekEnd.setDate(nextWeekEnd.getDate() + 6);
  
  //   const fromTime = nextWeekStart.getTime(); // Timestamp of the start of the next week
  //   const toTime = nextWeekEnd.getTime(); // Timestamp of the end of the next week
  
  //   fetchMentorAvailability(fromTime, toTime);
  // };
  // Modify the goToNextWeek function to update the URL and fetch availability for the next week
const goToNextWeek = () => {
  const newStartDate = new Date(currentWeekStart);
  newStartDate.setDate(newStartDate.getDate() + 7);

  // setCurrentWeekStart(newStartDate);

  // Calculate the start of the next week
  const nextWeekStart = new Date(newStartDate);
  nextWeekStart.setDate(nextWeekStart.getDate() - nextWeekStart.getDay() + 1);

  // Calculate the end of the next week
  const nextWeekEnd = new Date(nextWeekStart);
  nextWeekEnd.setDate(nextWeekEnd.getDate() + 6);

  const hasAvailable = mentoravailable.some(avail => {
    const availDate = new Date(avail.fromTimeStamp);
    return availDate >= nextWeekStart && availDate <= nextWeekEnd;
  });
 
  if (!hasAvailable) {
    // Optionally display a message to inform the user
    setHasAvailableSlots(false);
    
    return; // Exit the function without updating state if no slots available
  }

  // Update the state and fetch availability for the next week
  setCurrentWeekStart(newStartDate);


};




  

  // const formatDate = (date) => {
  //   return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  // };
  const formatDate = (date) => {
    const monthNames = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];
    const month = monthNames[date.getMonth()];
    const day = String(date.getDate()).padStart(2, '0');
    return `${day}-${month}-${date.getFullYear()}`;
  };
  const getWeekDates = () => {
    const weekDates = [];
    const startDate = new Date(currentWeekStart);
    for (let i = 0; i < 7; i += 1) {
      const currentDate = new Date(startDate);
      currentDate.setDate(startDate.getDate() + i);
      weekDates.push(currentDate);
    }
    return weekDates;
  };
;
 
  // const isPreviousWeekDisabled = () => {
  //   // Disable the button if you're already in the current week
  //   const today = new Date();
  //   const currentWeekStartDate = new Date(today);
  //  currentWeekStartDate.setDate(today.getDate() - today.getDay() + 1); // Adjust to the start of the week
  
  //   console.log('Current Week Start Date:', currentWeekStartDate);
  //   console.log('Stored Current Week Start Date:', currentWeekStart);
  
  //   // const disabled = (
  //   //   currentWeekStartDate.getFullYear() === currentWeekStart.getFullYear() &&
  //   //   currentWeekStartDate.getMonth() === currentWeekStart.getMonth() &&
  //   //   currentWeekStartDate.getDate() === currentWeekStart.getDate()
  //   // );
    
  //   const disabled = currentWeekStartDate.getTime() === currentWeekStart.getTime();
  //   console.log('Is Previous Week Disabled:', disabled);
   

  
  //   return disabled;
  // };
  const isPreviousWeekDisabled = () => {
    // Disable the button if you're already in the current week
    const today = new Date();
    const currentWeekStartDate = new Date(today);
const day = today.getDay(); // Get the day of the week (0 = Sunday, 1 = Monday, ..., 6 = Saturday)

if (day === 0) {
  // If today is Sunday, subtract 6 days to get the start of the current week
  currentWeekStartDate.setDate(today.getDate() - 6);
} else {
  // Otherwise, subtract the number of days from the current day to get the start of the current week
  currentWeekStartDate.setDate(today.getDate() - (day - 1));
}

// Set hours, minutes, seconds, and milliseconds to zero
currentWeekStartDate.setHours(0, 0, 0, 0);


    
    const storedWeekStart = new Date(currentWeekStart);
    storedWeekStart.setHours(0, 0, 0, 0); // Set hours, minutes, seconds, and milliseconds to zero
    
    const disabled = currentWeekStartDate.getTime() === storedWeekStart.getTime();
   
  
    return disabled;
  };
  
  
 
  
  const handleTimeSlotClick = (date) => {
    setSelectedDate(date);
   
    setModalSmall(true); // Optionally open the modal when a time slot is clicked
    
    
  };
 
 




 


  return (
    <div>
     

    <Row>
    <Colxx xxs="12" md='9' lg='7' className='mx-auto'>
  

   <h1 className='py-4 text-large'> {mentorName} availability</h1>
   <div className='font-weight-semibold d-flex justify-content-center align-items-center'>
     {/* <Button className='font-weight-semibold text-one ' color="primary" onClick={goToPreviousWeek}   disabled={isPreviousWeekDisabled()}><i className='simple-icon-arrow-left'/></Button> */}
     <span className='font-weight-semibold text-xlarge mr-2 cursor-pointer'
      style={{ 
       cursor: isPreviousWeekDisabled() ? "not-allowed" : "pointer",
       opacity: isPreviousWeekDisabled() ? 0.5 : 1, // Lower opacity for disabled state
     }}
      onClick={!isPreviousWeekDisabled() ? goToPreviousWeek : undefined}
      onKeyDown={(e) => {
    if (!isPreviousWeekDisabled() && (e.key === 'Enter' || e.key === ' ')) {
      goToPreviousWeek();
    }
  }} 
  role="button"
  tabIndex={!isPreviousWeekDisabled() ? 0 : -1}
  aria-disabled={isPreviousWeekDisabled()}
>
{/* <i className='simple-icon-arrow-left' /> */}
<i className={`simple-icon-arrow-left ${isPreviousWeekDisabled() ? 'disabled' : ''}`} />
</span>

      <div>
      <h4 className=' font-weight-semibold'> 
       {formatDate(currentWeekStart)} - {formatDate(new Date(currentWeekStart.getTime() + 6 * 24 * 60 * 60 * 1000))}
      </h4>
       
      </div>
      {/* <span className='ml-2 font-weight-semibold text-xlarge' role="button" tabIndex={0} 
       style={{cursor:"pointer"}}
      onClick={goToNextWeek}
      onKeyDown={(e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      goToNextWeek();
    }
  }}
>
<i className='simple-icon-arrow-right' />
</span> */}
{hasAvailableSlots && (
  <span
    className='ml-2 font-weight-semibold text-xlarge'
    role="button"
    tabIndex={0}
    style={{ cursor: "pointer" }}
    onClick={goToNextWeek}
    onKeyDown={(e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        goToNextWeek();
      }
    }}
  >
    <i className='simple-icon-arrow-right' />
  </span>
)}

{!hasAvailableSlots && (
  <span
    className='ml-2 font-weight-semibold text-xlarge disabled'
    style={{ cursor: "not-allowed", color: "gray" }}
  >
    <i className='simple-icon-arrow-right' />
  </span>
)}
     {/* <Button className='ml-5 font-weight-semibold text-one' color="primary" onClick={goToNextWeek} ><i className='simple-icon-arrow-right '/></Button> */}
   </div>
         <Card className="mb-4 mt-4">
           <CardBody>
            
             <Table bordered>
               <thead>
       
                 <tr >
                   <th className='text-one'>Date</th>
                   <th className='text-center text-one'>Availablilty time</th>
                    
                 </tr>
               </thead>
               <tbody >
              

                 {getWeekDates().map((date) => (
  <tr key={date.getTime()} >
    {/* <td>{getMonthName(date.getMonth())} {formatDate(date)}</td> */}
    <td> {formatDate(date)}</td>
    <td>
      
  {/* {mentoravailable.map((avail) => {
    const availDate = new Date(avail.fromTimeStamp);
    if (availDate.toDateString() === date.toDateString()) {
        // Mentor is available on this date, display the available time
        const FromDate = new Date(avail.fromTimeStamp);
        const ToDate = new Date(avail.toTimeStamp);
        
        // Get hours, minutes, and AM/PM indicator
        const fromHours = FromDate.getHours() % 12 || 12; // Convert 0 to 12 for 12-hour format
        const fromMinutes = String(FromDate.getMinutes()).padStart(2, '0');
        const fromPeriod = FromDate.getHours() < 12 ? 'AM' : 'PM';
        
        const toHours = ToDate.getHours() % 12 || 12; // Convert 0 to 12 for 12-hour format
        const toMinutes = String(ToDate.getMinutes()).padStart(2, '0');
        const toPeriod = ToDate.getHours() < 12 ? 'AM' : 'PM';
        
        // Construct the time string with AM/PM indicator
        const fromTime = `${fromHours}:${fromMinutes} ${fromPeriod}`;
        const toTime = `${toHours}:${toMinutes} ${toPeriod}`;

         // Check if the availability time is in the past
         const isPastTime = ToDate < new Date();

        return (
        <Button  key={date.getTime()}  color='primary' block
          className={` text-center ${isPastTime ? 'cursor-not-allowed' : 'cursor-pointer'} my-2`}
          disabled={isPastTime}
          onClick={() => handleTimeSlotClick(date)}
        >
         {fromTime} to {toTime}
        </Button>
        );
    } 
    
       return null;
})}  */}
{mentoravailable
        .filter(avail => new Date(avail.fromTimeStamp).toDateString() === date.toDateString())
        .map(avail => {
          const FromDate = new Date(avail.fromTimeStamp);
          const ToDate = new Date(avail.toTimeStamp);
          
          const fromHours = FromDate.getHours() % 12 || 12;
          const fromMinutes = String(FromDate.getMinutes()).padStart(2, '0');
          const fromPeriod = FromDate.getHours() < 12 ? 'AM' : 'PM';
          
          const toHours = ToDate.getHours() % 12 || 12;
          const toMinutes = String(ToDate.getMinutes()).padStart(2, '0');
          const toPeriod = ToDate.getHours() < 12 ? 'AM' : 'PM';
          
          const fromTime = `${fromHours}:${fromMinutes} ${fromPeriod}`;
          const toTime = `${toHours}:${toMinutes} ${toPeriod}`;

          const isPastTime = ToDate < new Date();

          return (
            <Button
              key={avail.fromTimeStamp} // Ensure a unique key for each button
              color='primary'
              block
              className={`text-center ${isPastTime ? 'cursor-not-allowed' : 'cursor-pointer'} my-2`}
              disabled={isPastTime}
              onClick={() => handleTimeSlotClick(date)}
              // onClick={() => handleTimeSlotClick(date, avail.fromTimeStamp, avail.toTimeStamp)}
            >
              {fromTime} to {toTime}
            </Button>
          );
        })
      }

{mentoravailable.every(avail => new Date(avail.fromTimeStamp).toDateString() !== date.toDateString()) && (
        <div className="text-center text-one">-</div>
      )}
    </td>
  </tr>
))}

{/* another */}


 {/* return `${FromDate.toLocaleTimeString()} to ${ToDate.toLocaleTimeString()} `; */}

               </tbody>
             </Table>
             <Button onClick={() => setModalSmall(true)} outline color="primary">Book Now</Button>
             <div className="mb-4">
           <div>
         
             <div className=''>
             
               <Modal
                 isOpen={modalSmall}
                 toggle={() => setModalSmall(!modalSmall)}
                 className='mt-5'
               >
                 
                 <ModalBody >
                 <div className='text-right my-2'>
                 {/* <Button className='ml-2 my-4 '  outline   color="primary"  onClick={() => setModalSmall(false)}
        ><i className='simple-icon-close text-one'  />
                   </Button> */}
                   <span style={{cursor:'pointer'}} 
            className='mt-2'
            role='button'
            tabIndex={0}
            onClick={() => setModalSmall(false)}
            onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    setModalSmall(false);
                }
            }}
        >
            <i className='simple-icon-close text-large' />
        </span>
                 </div>
                
              
   
       <PopupWizard selectedDate={selectedDate} setSelectedDate={setSelectedDate} 
        mentorName={mentorName} mentorId={mentorId}   
 
     />
       {/* <Button className='ml-2 mt-2 '  outline  color="secondary"  onClick={() => setModalSmall(false)}
                   >
                     Close
                   </Button> */}
          
       
                 </ModalBody>
               </Modal>
             </div>
           </div>
         </div>
            
           </CardBody>
         </Card>
      {/* <PopupWizard/> */}
       </Colxx>
    </Row>
  
    </div>
  );
}

export default Month;
