import { Colxx } from 'components/common/CustomBootstrap';
import React,{useState,useEffect} from 'react';
import { useLocation } from 'react-router-dom';

import {  Button, Card, CardBody, Modal, ModalBody, Table ,
  // Dropdown,
  // DropdownToggle,
  // DropdownItem,
  // DropdownMenu,
  Row,

  // FormGroup,  CustomInput, Form 
  } from 'reactstrap';
  import axios from 'axios';
import { baseUrl } from 'constants/defaultValues';
// import EventModal from './EventModal';
// import DatePicker from './DatePicker';
// import DateRangePicker from './DateRangePicker';
import PopupWizard from './PopupWizard';



// import WeekDisplay from './WeekList';
// import WeekDays from './WeekDays';
// import WeekList from './WeekList';



const Month = () => {
  // const url=`${baseUrl}/api/calendar/appointment/mentee`;
  // const url='http://localhost:9091/api/mentor/cards?page=0&size=3 ';
  const[mentoravailable,setMentorAvailable]=useState([]);
  const [currentWeekStart, setCurrentWeekStart] = useState(new Date());
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const mentorName = searchParams.get('mentorName');
  const mentorId = searchParams.get('mentorId');

  const [selectedDate, setSelectedDate] = useState(null); 
  

 
  useEffect(() => {
    const fetchMentorAvailability = async () => {
      try {
        const response = await axios.get(`${baseUrl}/api/calendar/appointment/mentee`);
        // Filter availability data based on mentorId
        const filteredAvailability = response.data.filter(avail => avail.id === parseInt(mentorId, 10));

        setMentorAvailable(filteredAvailability);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    if (mentorId) {
      fetchMentorAvailability();
    }
  }, [mentorId]);


  // from and to starts
  
  // Function to get the start date of the current week
  const getStartOfWeek = () => {
    const currentDate = new Date();
    const day = currentDate.getDay();
    const diff = currentDate.getDate() - day + (day === 0 ? -6 : 1); // Adjust when day is Sunday
    return new Date(currentDate.setDate(diff));
  };

  // Function to get the end date of the current week
  const getEndOfWeek = (startOfWeek) => {
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(endOfWeek.getDate() + 6);
    return endOfWeek;
  };

  // Update the current week start date when component mounts
  useEffect(() => {
    setCurrentWeekStart(getStartOfWeek());
  }, []);

  // Add start and end date parameters to the URL
  useEffect(() => {
    const startOfWeek = getStartOfWeek();
    const endOfWeek = getEndOfWeek(startOfWeek);
    const newUrl = `${window.location.origin}${window.location.pathname}?mentorId=${mentorId}&mentorName=${mentorName}&fromTime=${startOfWeek.getTime()}&toTime=${endOfWeek.getTime()}`;
    window.history.replaceState(null, '', newUrl);
  }, [currentWeekStart]);

  // from and to ends


  // const [isModalOpen, setModalOpen] = useState(false);
  // const [clickedRowPosition, setClickedRowPosition] = useState({ top: 0, left: 0 });
  const [modalSmall, setModalSmall] = useState(false);
  //  const [selectedHourDropdown, setSelectedHourDropdown] = useState(null); // Renamed state variable
  //  const [selectedHourDropdown1, setSelectedHourDropdown1] = useState(null); // Renamed state variable

  // const [minutedrop,setMinutedrop]=useState(null)
  // const [minutedrop1,setMinutedrop1]=useState(null)



  // const [selectedHour, setSelectedHour] = useState(null); // State variable for selected hour
  // const [selectedMinute, setSelectedMinute] = useState(null); // State variable for selected minute
  
  // const [title,setTitle]=useState("");
  // const [description,setDescription]=useState("");
  // const [dropdownBasicOpen, setDropdownBasicOpen] = useState(false);
  // const [dropdownBasicOpen1, setDropdownBasicOpen1] = useState(false);
  // const [dropdownBasicOpen2, setDropdownBasicOpen2] = useState(false);
  // const [dropdownBasicOpen3, setDropdownBasicOpen3] = useState(false);
  // const [selectedRadioButton, setSelectedRadioButton] = useState(null);
  // const [savedEntries, setSavedEntries] = useState([]);
  
 
 
 

  // const handleDropdownItemClick = (selectedHour) => {
  //   // Handle the selected hour as needed
  //   setSelectedHourDropdown(selectedHour);
    
  //   console.log(`Selected hour: ${selectedHour}`);
  //   // setSelectedHourDropdown(selectedHour); 
  // };
  // const handleDropdownItemClick1 = (selectedMinute) => {
  //   // Handle the selected minutes as needed
  //   setMinutedrop(selectedMinute);
  //  setMinutedrop1(selectedMinute);
  //   console.log(`Selected minute: ${selectedMinute}`);
  //   // setMinuteDrop(selectedMinute); 
  // };
  // const handleDropdownItemClick2 = (selectedHour) => {
  //   // Handle the selected hour as needed
  //   setSelectedHourDropdown1(selectedHour)
  //   console.log(`Selected hour: ${selectedHour}`);
  //   // setSelectedHourDropdown(selectedHour); 
  // };
  // const handleDropdownItemClick3 = (selectedMinute) => {
  //   // Handle the selected minutes as needed
  //   setMinutedrop1(selectedMinute);
  //   console.log(`Selected minute: ${selectedMinute}`);
  //   // setMinuteDrop(selectedMinute); 
  // };
  // const generateDropdownItems = () => {
  //   const items = [];
  //   for (let i = 1; i <= 12; i+=1) {
  //     const formattedHour = i < 10 ? `0${i}` : i;
  //     items.push(
  //       <DropdownItem key={i} onClick={() => handleDropdownItemClick(i)} >
  //         {formattedHour}
  //       </DropdownItem>
  //     );
  //   }
  //   return items;
  // };
  // const generateMinuteDropdownItems = () => {
  //   const minutes = [0, 15, 30, 45];
  //   const items = minutes.map((minute) => {
  //     const formattedMinute = minute < 10 ? `0${minute}` : minute;
  //     return (
  //       <DropdownItem key={minute} onClick={() => handleDropdownItemClick1(minute)}>
  //         {formattedMinute}
  //       </DropdownItem>
  //     );
  //   });
  //   return items;
  // };
  // const generateDropdownItems1 = () => {
  //   const items = [];
  //   for (let i = 1; i <= 12; i+=1) {
  //     const formattedHour = i < 10 ? `0${i}` : i;
  //     items.push(
  //       <DropdownItem key={i} onClick={() => handleDropdownItemClick2(i)} >
  //         {formattedHour}
  //       </DropdownItem>
  //     );
  //   }
  //   return items;
  // };


  
  // const generateMinuteDropdownItems1 = () => {
  //   const minutes = [0, 15, 30, 45];
  //   const items = minutes.map((minute) => {
  //     const formattedMinute = minute < 10 ? `0${minute}` : minute;
  //     return (
  //       <DropdownItem key={minute} onClick={() => handleDropdownItemClick3(minute)}>
  //         {formattedMinute}
  //       </DropdownItem>
  //     );
  //   });
  //   return items;
  // };
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
  // const getMonthName = (monthIndex) => {
  //   const monthNames = [
  //     'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  //   ];
  //   return monthNames[monthIndex];
  // };
 
  const isPreviousWeekDisabled = () => {
    // Disable the button if you're already in the current week
    const today = new Date();
    const currentWeekStartDate = new Date(today);
   currentWeekStartDate.setDate(today.getDate() - today.getDay() + 1); // Adjust to the start of the week
  
    console.log('Current Week Start Date:', currentWeekStartDate);
    console.log('Stored Current Week Start Date:', currentWeekStart);
  
    const disabled = (
      currentWeekStartDate.getFullYear() === currentWeekStart.getFullYear() &&
      currentWeekStartDate.getMonth() === currentWeekStart.getMonth() &&
      currentWeekStartDate.getDate() === currentWeekStart.getDate()
    );
    console.log('Is Previous Week Disabled:', disabled);

  
    return disabled;
  };
 
  
  const handleTimeSlotClick = (date) => {
    setSelectedDate(date);
    console.log(selectedDate);
    setModalSmall(true); // Optionally open the modal when a time slot is clicked
    
  };

  // weeklist functions ends
  // const handlesave = () => {
  //   console.log('Selected Date:', selectedDate);
  //   console.log('Selected Hour:', selectedHourDropdown);
  //   console.log('Selected Minute:', minutedrop);
  //   console.log('Selected Radio Button:', selectedRadioButton);
   
  // };

 


  return (
    <div>
     

    <Row>
    <Colxx xxs="8" className='mx-auto'>
  

   <h1 className='py-4 text-large'> {mentorName} availability</h1>
   <div className='font-weight-semibold d-flex justify-content-center align-items-center'>
     {/* <Button className='font-weight-semibold text-one ' color="primary" onClick={goToPreviousWeek}   disabled={isPreviousWeekDisabled()}><i className='simple-icon-arrow-left'/></Button> */}
     <span className='font-weight-semibold text-xlarge mr-2' onClick={!isPreviousWeekDisabled() ? goToPreviousWeek : undefined}
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
      <span className='ml-2 font-weight-semibold text-xlarge' role="button" tabIndex={0} onClick={goToNextWeek}
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
    <td> {formatDate(date)}</td>
    <td>
      {/* {mentoravailable.map((avail) => {
        const availDate = new Date(avail.fromTimeStamp);
        if (availDate.toDateString() === date.toDateString()) {
    
          const FromDate = new Date(avail.fromTimeStamp);
          const ToDate = new Date(avail.toTimeStamp);
         
          
          return  <td className='bg-primary d-block text-center' key={date.getTime()}>{FromDate.toLocaleTimeString()} to {ToDate.toLocaleTimeString()} 
        
          </td>
          
       
          
        } 
          // Mentor is not available on this date, display an empty string
         
          return '-';
        
      })} */}
     
{mentoravailable.map((avail) => {
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
          className={` text-center ${isPastTime ? 'cursor-not-allowed' : 'cursor-pointer'}`}
          disabled={isPastTime}
          onClick={() => handleTimeSlotClick(date)}
        >
         {fromTime} to {toTime}
</Button>

            
        );
    } 
        return <div key={date.getTime()} className='text-center text-one '>-</div>; // Returning null when condition is not met
    
})}

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
                 <div className='text-right py-2'>
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
                
                   {/* <form className=' '  >
       
         
          <div className='d-flex my-3 align-items-center'>
           <span className='text-one'><i className='simple-icon-calendar'/></span>
           
           <div>
          
           <DateRangePicker selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
           </div>
        

          </div>
        
         <div className='d-flex justify-content-between '>
         <div>
          <h5 className='text-center'>From</h5>
          <div className='d-flex'>
          <Dropdown direction="down"
     isOpen={dropdownBasicOpen}
     toggle={() => setDropdownBasicOpen(!dropdownBasicOpen)}
     className="mb-5 "
     
    
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
        <div className=''>
          <h5 className='text-center'>To</h5>
          <div className='d-flex'>
          <Dropdown direction="down"
     isOpen={dropdownBasicOpen2}
     toggle={() => setDropdownBasicOpen2(!dropdownBasicOpen2)}
     className="mb-5 "
     
    
   >
  
     <DropdownToggle caret color="secondary" outline className=''>
       
       
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
        </div>
         </div>
       
          <Form>
           <FormGroup>
       
        <div className='d-flex '>
          <CustomInput
            type="radio"
            id="exCustomRadio"
            name="customRadio"
            label="Audio"
            onChange={() => setSelectedRadioButton('Audio')}
          />
          <CustomInput
            type="radio"
            id="exCustomRadio2"
            name="customRadio"
            label="Video"
            className='ml-3'
            onChange={() => setSelectedRadioButton('Video')}
          />
            
        </div>
      </FormGroup>
      </Form>
        
          <footer className="d-flex justify-content-end border-t p-3 mt-5">
         <Button type='submit'  className="  px-6 py-2 " color='primary'  onClick={handlesave}>
          
           Next
         </Button>
         <Button className='ml-2'  outline  color="secondary"  onClick={() => setModalSmall(false)}
                   >
                     Cancel
                   </Button>
       </footer>
       </form> */}
   
       <PopupWizard selectedDate={selectedDate} setSelectedDate={setSelectedDate}/>
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
