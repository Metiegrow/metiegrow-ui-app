import { Colxx } from 'components/common/CustomBootstrap';
import React,{useState,useEffect} from 'react';
import { useLocation } from 'react-router-dom';
import {  Button, Card, CardBody, Modal, ModalBody, Table ,
  Dropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
  Form,
  Label,
  Row,
  FormGroup,

  // FormGroup,  CustomInput, Form 
  } from 'reactstrap';
  import { useHistory } from 'react-router-dom/cjs/react-router-dom';
  import axios from 'axios';
import { baseUrl } from 'constants/defaultValues';
import DateRangePicker from '../BigCalendar/DateRangePicker';




const MentorCreatedSlot = () => {
  // const url=`${baseUrl}/mentorSlotAvailablity`;

  // To change the url to backend uncomment the below line 
   const url=`${baseUrl}/api/calendar/appointment/mentor`;

  const[mentoravailable,setMentorAvailable]=useState([]);
  const [currentWeekStart, setCurrentWeekStart] = useState(new Date());
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  // const mentorName = searchParams.get('mentorName');
  const mentorId = searchParams.get('mentorId');
  const history = useHistory();  
// const redirectToSessionLists1 = () => {
//   // Redirect to the specified URL with the query parameter
//   history.push('/app/sessionmentor');
// };

  const [selectedDate, setSelectedDate] = useState(null); 
  // const [selectedDate, setSelectedDate] = useState(''); 
  // const [selectedDates, setSelectedDates] = useState([]); 
  const [dropdownBasicOpen, setDropdownBasicOpen] = useState(false);
  const [dropdownBasicOpen1, setDropdownBasicOpen1] = useState(false);
  const [dropdownBasicOpen2, setDropdownBasicOpen2] = useState(false);
  const [dropdownBasicOpen3, setDropdownBasicOpen3] = useState(false);
  const [dropdownBasicOpen4, setDropdownBasicOpen4] = useState(false);
  const [dropdownBasicOpen5, setDropdownBasicOpen5] = useState(false);
  const [selectedHourDropdown, setSelectedHourDropdown] = useState(null); // Renamed state variable
   const [selectedHourDropdown1, setSelectedHourDropdown1] = useState(null); // Renamed state variable
  //  const [upcomingSessions] = useState([]); 
  const [minutedrop,setMinutedrop]=useState(null)
  const [minutedrop1,setMinutedrop1]=useState(null)
  const [modalSmall, setModalSmall] = useState(false);
  const [selectedfromampm, setSelectedFromAmPm] = useState(null); // State for AM selection
  const [selectedfromampm1, setSelectedFromAmPm1] = useState(null); // State for AM selection

  const redirectToSessionLists1 = () => {
    // Redirect to the specified URL with the query parameter
    history.push('/app/sessionmentor');
  };

  
  // const handleOkButtonClick = async () => {
  //   // Ensure selectedDate is not null
  //   if (!selectedDate) {
  //     console.error('Selected date is null');
  //     return;
  //   }
  
  //   // Get the selected date in milliseconds
  //   const selectedDateMillis = selectedDate.getTime();
  
  //   // Store the selected timestamps
  //   const fromTimeStamp = new Date(selectedDateMillis).setHours(selectedHourDropdown, minutedrop, 0, 0);
  //   const toTimeStamp = new Date(selectedDateMillis).setHours(selectedHourDropdown1, minutedrop1, 0, 0);
    
  //   // Create an object with the required structure and assign id=1
  //   const slot = {
      
  //     fromTimeStamp,
  //     toTimeStamp
  //   };
  
  //   // Make the POST request
  //   try {
  //     const response = await axios.post(url, [slot]);
  //     // Handle success response
  //     console.log('Data saved successfully:', response.data);
  //   } catch (error) {
  //     // Handle error
  //     console.error('Error saving data:', error);
  //   }
    
  //   // Optionally, close the modal
  //   setModalSmall(false);
  // };
  const handleOkButtonClick = async () => {
    // Ensure selectedDate is not null
    if (!selectedDate) {
      console.error('Selected date is null');
      return;
    }
  
    // Convert selected date to UTC timestamp
    const selectedDateTime = new Date(selectedDate);
  
    // Set the hours and minutes for the selected date
    const selectedHourFrom = selectedHourDropdown % 12 + (selectedfromampm === 'PM' ? 12 : 0); // Adjust for PM
    selectedDateTime.setHours(selectedHourFrom, minutedrop, 0, 0);
    const fromTimeStamp = selectedDateTime.getTime(); // Get the UTC timestamp for 'from' time
  
    // Calculate 'to' time
    const toDateTime = new Date(selectedDateTime); // Create a new Date object based on 'from' time
    const selectedHourTo = selectedHourDropdown1 % 12 + (selectedfromampm1 === 'PM' ? 12 : 0); // Adjust for PM
    toDateTime.setHours(selectedHourTo, minutedrop1, 0, 0); // Set the 'to' hour
    const toTimeStamp = toDateTime.getTime(); // Get the UTC timestamp for 'to' time
  
    // Create an object with the required structure
    const slot = {
      fromTimeStamp,
      toTimeStamp
    };
  
    // Make the POST request
    try {
      const response = await axios.post(url, [slot]);
      // Handle success response
      console.log('Data saved successfully:', response.data);
    } catch (error) {
      // Handle error
      console.error('Error saving data:', error);
    }
  
    // Optionally, close the modal
    setModalSmall(false);
  };
  
  
  
  
  

  // Function to get the start date of the current week
  const getStartOfWeek = () => {
    const currentDate = new Date();
    const day = currentDate.getDay();
    const diff = currentDate.getDate() - day + (day === 0 ? -6 : 1); // Adjust when day is Sunday
    return new Date(currentDate.setDate(diff));
  };

 
  const fetchMentorSlotsCreate = async (fromTime, toTime) => {
    try {
      const response = await axios.get(`${url}?&fromTime=${fromTime}&toTime=${toTime}`);
      const availability = response.data;
      setMentorAvailable(availability);
      console.log(availability);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  
  useEffect(() => {
    // Set the time of currentWeekStart to 12:00 PM (noon)
    const startOfWeekTimestamp = new Date(currentWeekStart);
    startOfWeekTimestamp.setHours(0, 0, 0, 0);
  
    // Set the time of endOfWeekTimestamp to 11:59 PM
    const endOfWeekTimestamp = new Date(currentWeekStart);
    endOfWeekTimestamp.setDate(endOfWeekTimestamp.getDate() + 6); // Set to end of week
    endOfWeekTimestamp.setHours(23, 59, 59, 999);
  
    const newUrl = `${window.location.origin}${window.location.pathname}?&fromTime=${startOfWeekTimestamp.getTime()}&toTime=${endOfWeekTimestamp.getTime()}`;
    window.history.replaceState(null, '', newUrl);
  
    fetchMentorSlotsCreate(startOfWeekTimestamp.getTime(), endOfWeekTimestamp.getTime());
  }, [currentWeekStart, mentorId]);
  


  useEffect(() => {
    const startOfWeek = getStartOfWeek();
    setCurrentWeekStart(startOfWeek);
  }, []);
  

  
  
  const handleDropdownItemClick = (selectedHour) => {
    // Handle the selected hour as needed
    setSelectedHourDropdown(selectedHour);
    
    console.log(`Selected hour: ${selectedHour}`);
    // setSelectedHourDropdown(selectedHour); 
  };
  const handleDropdownItemClick1 = (selectedMinute) => {
    // Handle the selected minutes as needed
    setMinutedrop(selectedMinute);
  //  setMinutedrop1(selectedMinute);
    console.log(`Selected minute: ${selectedMinute}`);
    // setMinuteDrop(selectedMinute); 
  };
  const handleDropdownItemClick2 = (selectedHour) => {
    // Handle the selected hour as needed
    setSelectedHourDropdown1(selectedHour)
    console.log(`Selected hour: ${selectedHour}`);
    // setSelectedHourDropdown(selectedHour); 
  };
  const handleDropdownItemClick3 = (selectedMinute) => {
    // Handle the selected minutes as needed
    setMinutedrop1(selectedMinute);
    console.log(`Selected minute: ${selectedMinute}`);
    // setMinuteDrop(selectedMinute); 
  };
  const handleDropdownItemClick4 = (selectedAmPmFrom) => {
    // Handle the selected minutes as needed
    setSelectedFromAmPm(selectedAmPmFrom);
    console.log(`Selected from AM/PM: ${selectedAmPmFrom}`);
    // setMinuteDrop(selectedMinute); 
  };
  const handleDropdownItemClick5 = (selectedAmPmTo) => {
    // Handle the selected minutes as needed
    setSelectedFromAmPm1(selectedAmPmTo);
    console.log(`Selected from AM/PM: ${selectedAmPmTo}`);
    // setMinuteDrop(selectedMinute); 
  };
  const generateDropdownItems = () => {
    const items = [];
    for (let i = 1; i <= 12; i+=1) {
      const formattedHour = i < 10 ? `0${i}` : i;
      items.push(
        <DropdownItem key={i} onClick={() => handleDropdownItemClick(i)} >
          {formattedHour}
        </DropdownItem>
      );
    }
    return items;
  };
  const generateMinuteDropdownItems = () => {
    const minutes = [0, 15, 30, 45];
    const items = minutes.map((minute) => {
      const formattedMinute = minute < 10 ? `0${minute}` : minute;
      return (
        <DropdownItem key={minute} onClick={() => handleDropdownItemClick1(minute)}>
          {formattedMinute}
        </DropdownItem>
      );
    });
    return items;
  };
  const generateDropdownItems1 = () => {
    const items = [];
    for (let i = 1; i <= 12; i+=1) {
      const formattedHour = i < 10 ? `0${i}` : i;
      items.push(
        <DropdownItem key={i} onClick={() => handleDropdownItemClick2(i)} >
          {formattedHour}
        </DropdownItem>
      );
    }
    return items;
  };


  
  const generateMinuteDropdownItems1 = () => {
    const minutes = [0, 15, 30, 45];
    const items = minutes.map((minute) => {
      const formattedMinute = minute < 10 ? `0${minute}` : minute;
      return (
        <DropdownItem key={minute} onClick={() => handleDropdownItemClick3(minute)}>
          {formattedMinute}
        </DropdownItem>
      );
    });
    return items;
  };
  const generateAmPmDropdownItems = () => {
    const amPmOptions = ['AM', 'PM'];
    return amPmOptions.map((amPm) => (
      <DropdownItem key={amPm} onClick={() => handleDropdownItemClick4(amPm)}>
        {amPm}
      </DropdownItem>
    ));
  };
  const generateAmPmDropdownItems1 = () => {
    const amPmOptions = ['AM', 'PM'];
    return amPmOptions.map((amPm) => (
      <DropdownItem key={amPm} onClick={() => handleDropdownItemClick5(amPm)}>
        {amPm}
      </DropdownItem>
    ));
  };
 
 
 

  // weeklist functions start
  const goToPreviousWeek = () => {
    const newStartDate = new Date(currentWeekStart);
    newStartDate.setDate(newStartDate.getDate() - 7);
    setCurrentWeekStart(newStartDate);
  };

  const goToNextWeek = () => {
    const newStartDate = new Date(currentWeekStart);
    newStartDate.setDate(newStartDate.getDate() + 7);
    setCurrentWeekStart(newStartDate);
  };

  
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
 
  

  // const isPreviousWeekDisabled = () => {
  //   // Disable the button if you're already in the current week
  //   const today = new Date();
  //   const currentWeekStartDate = new Date(today);
  //  currentWeekStartDate.setDate(today.getDate() - today.getDay() + 1); // Adjust to the start of the week
  
  //   // console.log('Current Week Start Date:', currentWeekStartDate);
  //   // console.log('Stored Current Week Start Date:', currentWeekStart);
  
  //   const disabled = (
  //     currentWeekStartDate.getFullYear() === currentWeekStart.getFullYear() &&
  //     currentWeekStartDate.getMonth() === currentWeekStart.getMonth() &&
  //     currentWeekStartDate.getDate() === currentWeekStart.getDate()
  //   );
  //   // console.log('Is Previous Week Disabled:', disabled);

  
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

console.log('Current Week Start Date:', currentWeekStartDate);

    console.log('Stored Current Week Start Date:', currentWeekStart);
    
    const storedWeekStart = new Date(currentWeekStart);
    storedWeekStart.setHours(0, 0, 0, 0); // Set hours, minutes, seconds, and milliseconds to zero
    
    const disabled = currentWeekStartDate.getTime() === storedWeekStart.getTime();
    console.log('Is Previous Week Disabled:', disabled);
  
    return disabled;
  };

  const handleTimeSlotClick = (date) => {
    setSelectedDate(date);
    console.log(selectedDate);
    setModalSmall(true); // Optionally open the modal when a time slot is clicked
    
  };

  const handleAddSlotClick = (date) => {
    setSelectedDate(date); // Set the selected date
    setModalSmall(true); // Show the modal
  };
 
 


  return (
    <div>
     

    <Row>
    <Colxx xxs="8" className='mx-auto'>
  

   {/* <h1 className='py-4 text-large'> {mentorName} availability</h1> */}
   <h1 className='py-4 text-large'>My slots</h1>

   <div className='font-weight-semibold d-flex justify-content-center align-items-center'>
     {/* <Button className='font-weight-semibold text-one ' color="primary" onClick={goToPreviousWeek}   disabled={isPreviousWeekDisabled()}><i className='simple-icon-arrow-left'/></Button> */}
     {/* <span className='font-weight-semibold text-xlarge mr-2 cursor-pointer'
     style={{cursor:"pointer"}}
      onClick={!isPreviousWeekDisabled() ? goToPreviousWeek : undefined}
      onKeyDown={(e) => {
    if (!isPreviousWeekDisabled() && (e.key === 'Enter' || e.key === ' ')) {
      goToPreviousWeek();
    }
  }} 
  role="button"
  tabIndex={!isPreviousWeekDisabled() ? 0 : -1}
  aria-disabled={isPreviousWeekDisabled()}
><i className='simple-icon-arrow-left' />
</span> */}
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
      <span className='ml-2 font-weight-semibold text-xlarge' role="button" tabIndex={0} 
       style={{cursor:"pointer"}}
      onClick={goToNextWeek}
      onKeyDown={(e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      goToNextWeek();
    }
  }}
>
<i className='simple-icon-arrow-right' />
</span>
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
    <td > {formatDate(date)}</td>
   
    <td>
     
 {/*  new one */}

 {mentoravailable.map((availability) => (
  availability.availableSlots.map((avail) => {
    const availDate = new Date(avail.fromTimeStamp);
    if (availDate.toDateString() === date.toDateString()) {
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
        <>
          {/* <Button
            key={date.getTime()}
            outline
            color='primary'
            block
            className={`text-center ${isPastTime ? 'cursor-not-allowed' : 'cursor-pointer'}`}
            disabled={isPastTime}
            onClick={() => handleTimeSlotClick(date)}
          >
              <span className=' d-flex justify-content-center  align-items-center  ' 
               style={{display:'block'}}>{fromTime} to {toTime}
               <i className='iconsminds-close font-weight-bold ml-3  '  /></span>
          </Button> */}
          {/* <Button  key={date.getTime()}  color='primary' block
          className={` text-center ${isPastTime ? 'cursor-not-allowed' : 'cursor-pointer'} m-2`}
          disabled={isPastTime}
          onClick={() => handleTimeSlotClick(date)}
        >
         {fromTime} to {toTime}
    
        </Button> */}
        {/* <div
      key={date.getTime()}
      role="button" // Add role attribute for accessibility
      tabIndex={0}   // Add tabIndex for keyboard accessibility
      className={`text-center ${isPastTime ? 'cursor-not-allowed' : 'cursor-pointer'} bg-primary py-2`}
      style={{ outline: 'none', cursor:"pointer"}} // Remove default focus outline if needed
      onClick={() => handleTimeSlotClick(date)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          handleTimeSlotClick(date);
        }
      }}
    >
      <span className='d-flex gap-5 justify-content-center align-items-center'> {fromTime} to {toTime}<i className='simple-icon-close ml-4'/></span> 
    </div> */}
    
          <div
      key={date.getTime()}
      role="button" // Add role attribute for accessibility
      tabIndex={0}   // Add tabIndex for keyboard accessibility
      className={`text-center ${isPastTime ? 'cursor-not-allowed' : 'cursor-pointer'} py-2 mt-2`}
      style={{ outline: `1px solid black`,cursor:"pointer" }} // Remove default focus outline if needed
      onClick={() => handleTimeSlotClick(date)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          handleTimeSlotClick(date);
        }
      }}
      onMouseEnter={(e) => { e.currentTarget.classList.add('bg-primary'); }}
  onMouseLeave={(e) => { e.currentTarget.classList.remove('bg-primary'); }} 
    >
      <span className='d-flex gap-5 justify-content-center align-items-center'> {fromTime} to {toTime} <i className='simple-icon-close ml-4'/></span> 
    </div>
        </>
      );
    }
   
   return  null;
    
  })
 
 
))}
{mentoravailable.every(availability => (
        !availability.availableSlots.some(avail => new Date(avail.fromTimeStamp).toDateString() === date.toDateString())
      ))  &&(
        <div className='mt-2 text-center mx-auto' key={`edit-${date.getTime()}`}>
          <Button
            size='sm'
            className='text-center mx-auto my-4 '
            onClick={()=>handleAddSlotClick(date)}
            key={`edit-${date.getTime()}`}
            outline
            color="primary"
            block
          >
            +
          </Button>
        </div>
      )}



{mentoravailable.map((availability) => (
  availability.bookedSlots.map((avail) => {
    const availDate = new Date(avail.fromTimeStamp);
    if (availDate.toDateString() === date.toDateString()) {
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
        <>
          {/* <Button
            key={date.getTime()}
            color='primary'
            block
            className={`text-center ${isPastTime ? 'cursor-not-allowed' : 'cursor-pointer'}`}
            disabled={isPastTime}
            onClick={() => handleTimeSlotClick(date)}
          >
          <span className='d-flex gap-5 justify-content-center align-items-center'><i className='iconsminds-full-view-2 mr-4'/> {fromTime} to {toTime}</span> 
          </Button> */}

          {/* <div
      key={date.getTime()}
      role="button" // Add role attribute for accessibility
      tabIndex={0}   // Add tabIndex for keyboard accessibility
      className={`text-center ${isPastTime ? 'cursor-not-allowed' : 'cursor-pointer'} py-2 mt-2`}
      style={{ outline: `1px solid black`,cursor:"pointer" }} // Remove default focus outline if needed
      onClick={() => handleTimeSlotClick(date)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          handleTimeSlotClick(date);
        }
      }}
      onMouseEnter={(e) => { e.currentTarget.classList.add('bg-primary'); }}
  onMouseLeave={(e) => { e.currentTarget.classList.remove('bg-primary'); }} 
    >
      <span className='d-flex gap-5 justify-content-center align-items-center'><i className='iconsminds-full-view-2 mr-4'/> {fromTime} to {toTime}</span> 
    </div> */}

    <div
      key={date.getTime()}
      role="button" // Add role attribute for accessibility
      tabIndex={0}   // Add tabIndex for keyboard accessibility
      className={`text-center ${isPastTime ? 'cursor-not-allowed' : 'cursor-pointer'} bg-primary py-2 mt-2`}
      style={{ outline: 'none', cursor:"pointer"}} // Remove default focus outline if needed
      onClick={() => handleTimeSlotClick(date)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          handleTimeSlotClick(date);
        }
      }}
    >
      <span className='d-flex gap-5 justify-content-center align-items-center'> {fromTime} to {toTime}<i className='iconsminds-full-view-2 ml-4'/></span> 
    </div>
    

         
        </>
      );
    }
   
  return null;
  })
))}

 










    </td>
  </tr>
))}

{/* another */}


 {/* return `${FromDate.toLocaleTimeString()} to ${ToDate.toLocaleTimeString()} `; */}

               </tbody>
             </Table>
          {/* <div className=''>
          <Button outline color="primary "  className=''>Save</Button>
          </div> */}
         
             <div className="mb-4">
           <div>
         
             <div className=''>
             
               <Modal
                 isOpen={modalSmall}
                 toggle={() => setModalSmall(!modalSmall)}
                 className='mt-5'
               >
                 
                 <ModalBody >
                 <div className='text-right p-2'>
                  
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
          
          <div>
            <Form className='mt-4'>
            <FormGroup row className=''>
                  <Label  sm={2} className='font-weight-bold'>
                    Date
                  </Label>
                  <Colxx sm={10}>
                  <DateRangePicker  selectedDate={selectedDate} setSelectedDate={setSelectedDate}/>
                  </Colxx>
                </FormGroup>
            <FormGroup row>
                  <Label  sm={2} className='font-weight-bold'>
                    From
                  </Label>
                  <Colxx sm={10}>
                  <div>
       <div className='d-flex '>
    
       <Dropdown direction="down"
  isOpen={dropdownBasicOpen}
  toggle={() => setDropdownBasicOpen(!dropdownBasicOpen)}
  className="mb-5  "
  
 
>

  <DropdownToggle caret color="secondary" outline className=''>
    
    
    {selectedHourDropdown !== null ? selectedHourDropdown : 'Hours'} 
  </DropdownToggle>
  <DropdownMenu className='' style={{ maxHeight: '200px', overflowY: 'auto'}}>
  {generateDropdownItems()}
  </DropdownMenu>
</Dropdown>
<Dropdown direction='down'
            isOpen={dropdownBasicOpen1}
            toggle={() => setDropdownBasicOpen1(!dropdownBasicOpen1)}
            className="mb-5 ml-3"
           
          >
            <DropdownToggle caret color="secondary" outline>
           
              {minutedrop !== null ? minutedrop : 'Minutes'} 
   
            </DropdownToggle>
            <DropdownMenu style={{ maxHeight: '200px', overflowY: 'auto' }}>
             {generateMinuteDropdownItems()}
            </DropdownMenu>
          </Dropdown>
          <Dropdown direction="down"
  isOpen={dropdownBasicOpen4}
  toggle={() => setDropdownBasicOpen4(!dropdownBasicOpen4)}
  className="mb-5 "
  
 
>
<DropdownToggle caret color="secondary" outline className='ml-3'>
{selectedfromampm !==null ? selectedfromampm : 'AM /PM' }
<DropdownMenu className=''>
  { generateAmPmDropdownItems ()}
  </DropdownMenu>
</DropdownToggle>
      
  </Dropdown>
       </div>
     </div>
                  </Colxx>
                </FormGroup>
                <FormGroup row>
                  <Label  sm={2} className='font-weight-bold'>
                    To
                  </Label>
                  <Colxx sm={10}>
                  <div className=''>
       
       <div className='d-flex'>
       <Dropdown direction="down"
  isOpen={dropdownBasicOpen2}
  toggle={() => setDropdownBasicOpen2(!dropdownBasicOpen2)}
  className="mb-5"
  
 
>

  <DropdownToggle caret color="secondary" outline className='' >
    
    
    {selectedHourDropdown1 !== null ? selectedHourDropdown1 : 'Hours'} 
  </DropdownToggle>
  <DropdownMenu className='' style={{ maxHeight: '200px', overflowY: 'auto'}}>
  {generateDropdownItems1()}
  </DropdownMenu>
</Dropdown>
<Dropdown direction='down'
            isOpen={dropdownBasicOpen3}
            toggle={() => setDropdownBasicOpen3(!dropdownBasicOpen3)}
            className="mb-5 ml-3"
           
          >
            <DropdownToggle caret color="secondary" outline>
           
              {minutedrop1 !== null ? minutedrop1 : 'Minutes'} 
   
            </DropdownToggle>
            <DropdownMenu style={{ maxHeight: '200px', overflowY: 'auto' }}>
             {generateMinuteDropdownItems1()}
            </DropdownMenu>
          </Dropdown>
          <Dropdown direction="down"
  isOpen={dropdownBasicOpen5}
  toggle={() => setDropdownBasicOpen5(!dropdownBasicOpen5)}
  className="mb-5 "
  
 
>
<DropdownToggle caret color="secondary" outline className='ml-3'>
{selectedfromampm1 !==null ? selectedfromampm1 : 'AM /PM' }
<DropdownMenu className=''>
  { generateAmPmDropdownItems1 ()}
  </DropdownMenu>
</DropdownToggle>
      
  </Dropdown>
       </div>
       <Button onClick={handleOkButtonClick}>OK</Button>
     </div>
                  </Colxx>
                </FormGroup>
            </Form>
          </div>
                 </div>
                
       
         
         
       {/* <PopupWizard selectedDate={selectedDate} setSelectedDate={setSelectedDate} 
        mentorName={mentorName} mentorId={mentorId} /> */}
      
          
       
                 </ModalBody>
               </Modal>
             </div>
           </div>
         </div>
            
           </CardBody>
         </Card>
         <Button className='' onClick={redirectToSessionLists1}>My Sessions</Button>
        
      {/* <PopupWizard/> */}
       </Colxx>
   
  

    </Row>
   
    </div>
  );
}

export default MentorCreatedSlot;
