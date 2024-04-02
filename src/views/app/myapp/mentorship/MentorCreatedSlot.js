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
  FormGroup
  // FormGroup,  CustomInput, Form 
  } from 'reactstrap';

  import axios from 'axios';
import { baseUrl } from 'constants/defaultValues';
import DateRangePicker from '../BigCalendar/DateRangePicker';







const MentorCreatedSlot = () => {
  // const url=`${baseUrl}/api/calendar/appointment/mentee`;
  // const url='http://localhost:9091/api/mentor/cards?page=0&size=3 ';
  const[mentoravailable,setMentorAvailable]=useState([]);
  const [currentWeekStart, setCurrentWeekStart] = useState(new Date());
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const mentorName = searchParams.get('mentorName');
  const mentorId = searchParams.get('mentorId');

  const [selectedDate, setSelectedDate] = useState(null); 
  // const [selectedDate, setSelectedDate] = useState(''); 
  // const [selectedDates, setSelectedDates] = useState([]); 
  const [dropdownBasicOpen, setDropdownBasicOpen] = useState(false);
  const [dropdownBasicOpen1, setDropdownBasicOpen1] = useState(false);
  const [dropdownBasicOpen2, setDropdownBasicOpen2] = useState(false);
  const [dropdownBasicOpen3, setDropdownBasicOpen3] = useState(false);
  const [selectedHourDropdown, setSelectedHourDropdown] = useState(null); // Renamed state variable
   const [selectedHourDropdown1, setSelectedHourDropdown1] = useState(null); // Renamed state variable
  //  const [upcomingSessions] = useState([]); 
  const [minutedrop,setMinutedrop]=useState(null)
  const [minutedrop1,setMinutedrop1]=useState(null)
  const [modalSmall, setModalSmall] = useState(false);

  // const handleOkButtonClick = () => {
  //   // Store the selected timestamps
  //   const fromTimestamp = new Date().setHours(selectedHourDropdown, minutedrop, 0, 0);
  //   const toTimestamp = new Date().setHours(selectedHourDropdown1, minutedrop1, 0, 0);
  //   const selectedTimestamps = { fromTimestamp, toTimestamp };
  //   setSelectedDate([...selectedDate, selectedTimestamps]);
  //   setModalSmall(false); // Close the modal after storing timestamps
  //   console.log("date is",selectedDate);
  // };

  // const handleOkButtonClick = async () => {
  //   // Store the selected timestamps
  //   const fromTimestamp = new Date().setHours(selectedHourDropdown, minutedrop, 0, 0);
  //   const toTimestamp = new Date().setHours(selectedHourDropdown1, minutedrop1, 0, 0);
  //   const selectedTimestamps = { fromTimestamp, toTimestamp };

  //   // Perform any additional validation or checks here

  //   // Make the POST request
  //   try {
  //     const response = await axios.post(`${baseUrl}/mentorCreatedSlot`, [selectedTimestamps]);
  //     // Handle success response
  //     console.log('Data saved successfully:', response.data);
  //   } catch (error) {
  //     // Handle error
  //     console.error('Error saving data:', error);
  //   }

  //   // Optionally, close the modal
  //   setModalSmall(false);
  // };

  // post request
  // const handleSaveButtonClick = async () => {
  //   // Store the selected timestamps
  //   const fromTimestamp = new Date().setHours(selectedHourDropdown, minutedrop, 0, 0);
  //   const toTimestamp = new Date().setHours(selectedHourDropdown1, minutedrop1, 0, 0);
    
  //   // Include createdById in the payload
  //   const id = 2; // Assuming you have the createdById available in your component state
  //   const selectedTimestamps = { id, fromTimestamp, toTimestamp };
    
  //   // Send the stored timestamps to the server
  //   try {
  //     const response = await axios.post(`${baseUrl}/mentorCreatedSlot`, [selectedTimestamps]);
  //     // Handle success response
  //     console.log('Data saved successfully:', response.data);
  //   } catch (error) {
  //     // Handle error
  //     console.error('Error saving data:', error);
  //   }
  // };
  

  // Function to get the start date of the current week
  const getStartOfWeek = () => {
    const currentDate = new Date();
    const day = currentDate.getDay();
    const diff = currentDate.getDate() - day + (day === 0 ? -6 : 1); // Adjust when day is Sunday
    return new Date(currentDate.setDate(diff));
  };

  // Function to get the end date of the current week
  // const getEndOfWeek = (startOfWeek) => {
  //   const endOfWeek = new Date(startOfWeek);
  //   endOfWeek.setDate(endOfWeek.getDate() + 6);
  //   return endOfWeek;
  // };
  const fetchMentorSlotsCreate = async (fromTime, toTime) => {
    try {
      const response = await axios.get(`${baseUrl}/mentorSlotAvailablity?mentorId=${mentorId}&fromTime=${fromTime}&toTime=${toTime}`);
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
    startOfWeekTimestamp.setHours(12, 0, 0, 0);
  
    // Set the time of endOfWeekTimestamp to 11:59 PM
    const endOfWeekTimestamp = new Date(currentWeekStart);
    endOfWeekTimestamp.setDate(endOfWeekTimestamp.getDate() + 6); // Set to end of week
    endOfWeekTimestamp.setHours(11, 59, 59, 999);
  
    const newUrl = `${window.location.origin}${window.location.pathname}?mentorId=${mentorId}&mentorName=${mentorName}&fromTime=${startOfWeekTimestamp.getTime()}&toTime=${endOfWeekTimestamp.getTime()}`;
    window.history.replaceState(null, '', newUrl);
  
    fetchMentorSlotsCreate(startOfWeekTimestamp.getTime(), endOfWeekTimestamp.getTime());
  }, [currentWeekStart, mentorId]);
  



  // from and to starts
  
  

  // Update the current week start date when component mounts
  useEffect(() => {
  
    setCurrentWeekStart(getStartOfWeek());
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
 
 
  const isPreviousWeekDisabled = () => {
    // Disable the button if you're already in the current week
    const today = new Date();
    const currentWeekStartDate = new Date(today);
   currentWeekStartDate.setDate(today.getDate() - today.getDay() + 1); // Adjust to the start of the week
  
    // console.log('Current Week Start Date:', currentWeekStartDate);
    // console.log('Stored Current Week Start Date:', currentWeekStart);
  
    const disabled = (
      currentWeekStartDate.getFullYear() === currentWeekStart.getFullYear() &&
      currentWeekStartDate.getMonth() === currentWeekStart.getMonth() &&
      currentWeekStartDate.getDate() === currentWeekStart.getDate()
    );
    // console.log('Is Previous Week Disabled:', disabled);

  
    return disabled;
  };
 
  
  const handleTimeSlotClick = (date) => {
    setSelectedDate(date);
    console.log(selectedDate);
    setModalSmall(true); // Optionally open the modal when a time slot is clicked
    
  };

  
 


  return (
    <div>
     

    <Row>
    <Colxx xxs="8" className='mx-auto'>
  

   {/* <h1 className='py-4 text-large'> {mentorName} availability</h1> */}
   <h1 className='py-4 text-large'>My slots</h1>

   <div className='font-weight-semibold d-flex justify-content-center align-items-center'>
     {/* <Button className='font-weight-semibold text-one ' color="primary" onClick={goToPreviousWeek}   disabled={isPreviousWeekDisabled()}><i className='simple-icon-arrow-left'/></Button> */}
     <span className='font-weight-semibold text-xlarge mr-2 cursor-pointer'
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
 {/* {mentoravailable.map((availability) => (
  availability.availableSlots.map((slot) => (
    <h1 key={slot.id}>{slot.fromTimeStamp}</h1>
  ))
))} */}
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
          <Button
            key={date.getTime()}
            color='primary'
            block
            className={`text-center ${isPastTime ? 'cursor-not-allowed' : 'cursor-pointer'}`}
            disabled={isPastTime}
            onClick={() => handleTimeSlotClick(date)}
          >
            {fromTime} to {toTime}
          </Button>
          <div className='mt-2 text-center mx-auto'>
            <Button
              block
              className='text-center mx-auto my-4'
              onClick={() => setModalSmall(true)}
              key={`edit-${date.getTime()}`}
              outline
              color="primary"
            >
              +
            </Button>
          </div>
        </>
      );
    }
    return <div key={date.getTime()} className='text-center text-one'>-</div>;
  })
))}

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
          <Button
            key={date.getTime()}
            color='primary'
            block
            className={`text-center ${isPastTime ? 'cursor-not-allowed' : 'cursor-pointer'}`}
            disabled={isPastTime}
            onClick={() => handleTimeSlotClick(date)}
          >
            {fromTime} to {toTime}
          </Button>
         
        </>
      );
    }
    return <div key={date.getTime()} className='text-center text-one'>-</div>;
  })
))}

 
 {/* { mentoravailable.availableSlots&&mentoravailable.availableSlots.map((avail) => {
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
                <Button key={date.getTime()} color='primary' block
                    className={`text-center ${isPastTime ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                    disabled={isPastTime}
                    onClick={() => handleTimeSlotClick(date)}
                >
                    {fromTime} to {toTime}
                </Button>
                <div className='mt-2 text-center mx-auto'>
                    <Button block className='text-center mx-auto' onClick={() => setModalSmall(true)} key={`edit-${date.getTime()}`} outline color="primary">+</Button>
                </div>
            </>
        );
    } 
    return <div key={date.getTime()} className='text-center text-one'>-</div>;
})} */}



{/* { mentoravailable.bookedSlots&&mentoravailable.bookedSlots.map((avail) => {
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
                <Button key={date.getTime()} color='primary' block
                    className={`text-center ${isPastTime ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                    disabled={isPastTime}
                    onClick={() => handleTimeSlotClick(date)}
                >
                    {fromTime} to {toTime}
                </Button>
                <div className='mt-2 text-center mx-auto'>
                    <Button block className='text-center mx-auto' onClick={() => setModalSmall(true)} key={`edit-${date.getTime()}`} outline color="primary">+</Button>
                </div>
            </>
        );
    } 
    return <div key={date.getTime()} className='text-center text-one'>-</div>;
})} */}










    </td>
  </tr>
))}

{/* another */}


 {/* return `${FromDate.toLocaleTimeString()} to ${ToDate.toLocaleTimeString()} `; */}

               </tbody>
             </Table>
             <Button outline color="primary" >Save</Button>
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
       </div>
       <Button >OK</Button>
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
      {/* <PopupWizard/> */}
       </Colxx>
    </Row>
  
    </div>
  );
}

export default MentorCreatedSlot;
