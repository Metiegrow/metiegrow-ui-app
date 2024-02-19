import { Colxx } from 'components/common/CustomBootstrap';
import React,{useState,useEffect} from 'react';
import { useLocation } from 'react-router-dom';

import {  Button, Card, CardBody, Modal, ModalBody, Table ,
  Dropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
  Row,
  } from 'reactstrap';
  import axios from 'axios';
import { baseUrl } from 'constants/defaultValues';
// import EventModal from './EventModal';
// import DatePicker from './DatePicker';
import DateRangePicker from './DateRangePicker';

// import WeekDisplay from './WeekList';
// import WeekDays from './WeekDays';
// import WeekList from './WeekList';



const Month = () => {
  const url=`${baseUrl}/api/calendar/appointment/mentee`;
  // const url='http://localhost:9091/api/mentor/cards?page=0&size=3 ';
  const[mentoravailable,setMentorAvailable]=useState([]);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const mentorName = searchParams.get('mentorName');

  useEffect(()=>{
    const MentorAvailabllity = async () => {
      try {
        const response = await axios.get(url);
        setMentorAvailable(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    MentorAvailabllity();
  },[])

  // const [isModalOpen, setModalOpen] = useState(false);
  // const [clickedRowPosition, setClickedRowPosition] = useState({ top: 0, left: 0 });
  const [modalSmall, setModalSmall] = useState(false);
   const [selectedHourDropdown, setSelectedHourDropdown] = useState(null); // Renamed state variable

  const [minutedrop,setMinutedrop]=useState(null)


  // const [selectedHour, setSelectedHour] = useState(null); // State variable for selected hour
  // const [selectedMinute, setSelectedMinute] = useState(null); // State variable for selected minute
  
  // const [title,setTitle]=useState("");
  // const [description,setDescription]=useState("");
  const [dropdownBasicOpen, setDropdownBasicOpen] = useState(false);
  const [dropdownBasicOpen1, setDropdownBasicOpen1] = useState(false);
  // const [savedEntries, setSavedEntries] = useState([]);
  const [currentWeekStart, setCurrentWeekStart] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);  
 
 

  const handleDropdownItemClick = (selectedHour) => {
    // Handle the selected hour as needed
    setSelectedHourDropdown(selectedHour)
    console.log(`Selected hour: ${selectedHour}`);
    // setSelectedHourDropdown(selectedHour); 
  };
  const handleDropdownItemClick1 = (selectedMinute) => {
    // Handle the selected minutes as needed
    setMinutedrop(selectedMinute);
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
    const items1 = [];
    for (let i = 1; i <= 60; i+=1) {
      const formattedMinute = i < 10 ? `0${i}` : i;
      items1.push(
        <DropdownItem key={i} onClick={() => handleDropdownItemClick1(i)}>
          {formattedMinute}
        </DropdownItem>
      );
    }
    return items1;
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
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
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
  const getMonthName = (monthIndex) => {
    const monthNames = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];
    return monthNames[monthIndex];
  };
  const isPreviousWeekDisabled = () => {
    // Disable the button if you're already in the current week
    const today = new Date();
    const currentWeekStartDate = new Date(today);
    currentWeekStartDate.setDate(today.getDate() - today.getDay() + 1); // Adjust to the start of the week
  
   
  
    const disabled = (
      currentWeekStartDate.getFullYear() === currentWeekStart.getFullYear() &&
      currentWeekStartDate.getMonth() === currentWeekStart.getMonth() &&
      currentWeekStartDate.getDate() === currentWeekStart.getDate()
    );
 
  
    return disabled;
  };
  
  const handleTimeSlotClick = (date) => {
    setSelectedDate(date);
    setModalSmall(true); // Optionally open the modal when a time slot is clicked
    
  };

  // weeklist functions ends
 
  
  


  return (
    <div>
     

    <Row>
    <Colxx xxs="8" className='mx-auto'>
  

   <h2> {mentorName} availability</h2>
   <div className='font-weight-semibold d-flex justify-content-between align-items-center'>
     <Button className='font-weight-semibold text-one ' color="primary" onClick={goToPreviousWeek}  disabled={isPreviousWeekDisabled()}><i className='simple-icon-arrow-left'/></Button>
      <div>
      <h4 className=' font-weight-semibold'> 
      From {formatDate(currentWeekStart)} to {formatDate(new Date(currentWeekStart.getTime() + 6 * 24 * 60 * 60 * 1000))}
      </h4>
       
      </div>
     <Button className='ml-5 font-weight-semibold text-one' color="primary" onClick={goToNextWeek} ><i className='simple-icon-arrow-right '/></Button>
   </div>
         <Card className="mb-4 mt-4">
           <CardBody>
            
             <Table bordered>
               <thead>
       
                 <tr >
                   <th>Date</th>
                   <th>Availablilty time</th>
                    
                 </tr>
               </thead>
               <tbody >
              

                 {getWeekDates().map((date) => (
  <tr key={date.getTime()} >
    <td>{getMonthName(date.getMonth())} {formatDate(date)}</td>
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
        
        return (
            <td className='bg-primary d-block text-center' key={date.getTime()} onClick={() => handleTimeSlotClick(date)}>
                {fromTime} to {toTime}
            </td>
        );
    } 
        return '-'; // Returning null when condition is not met
    
})}

    </td>
  </tr>
))}
{/* another */}













 {/* return `${FromDate.toLocaleTimeString()} to ${ToDate.toLocaleTimeString()} `; */}






               </tbody>
             </Table>
             <Button onClick={() => setModalSmall(true)} color="primary">Book Now</Button>
             <div className="mb-4">
           <div>
         
             <div className=''>
             
               <Modal
                 isOpen={modalSmall}
                 toggle={() => setModalSmall(!modalSmall)}
                 className='mt-5 '
               >
                 <ModalBody >
                   <form className=' '  >
       {/* <div>
       <input type="text"  placeholder='Add a title' className='py-3 ml-3 border-top-0
        border-left-0 border-right-0 my-2 text-one   w-80 shadow-none'
          required value={title} onChange={(e) => setTitle(e.target.value)}/>
       </div> */}
         
          <div className='d-flex my-3 align-items-center'>
           <span className='text-one'><i className='simple-icon-calendar'/></span>
           {/* <p className='text-one ml-2'>Feb 02,2024</p> */}
           <div>
           {/* <DatePicker /> */}
           <DateRangePicker selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
           </div>
        

          </div>
          <div className='d-flex my-3 '>
           <div className='ml-2 '>
             <Dropdown direction="down"
     isOpen={dropdownBasicOpen}
     toggle={() => setDropdownBasicOpen(!dropdownBasicOpen)}
     className="mb-5 "
     
    
   >
     <DropdownToggle caret color="secondary" outline className=''>
       {/* Hours */}
       {selectedHourDropdown !== null ? selectedHourDropdown : 'Hours'} {/* Display selected hour */}
     </DropdownToggle>
     <DropdownMenu className='' style={{ maxHeight: '200px', overflowY: 'auto'}}>
     {generateDropdownItems()}
     </DropdownMenu>
   </Dropdown>
       </div>
       <div className='ml-2'>
       <Dropdown direction='down'
               isOpen={dropdownBasicOpen1}
               toggle={() => setDropdownBasicOpen1(!dropdownBasicOpen1)}
               className="mb-5"
              
             >
               <DropdownToggle caret color="secondary" outline>
                 {/* Minutes */}
                 {minutedrop !== null ? minutedrop : 'Minutes'} {/* Display selected minute */}
               </DropdownToggle>
               <DropdownMenu style={{ maxHeight: '200px', overflowY: 'auto' }}>
                {generateMinuteDropdownItems()}
               </DropdownMenu>
             </Dropdown>
       </div>
     
          </div>
          <form className='d-flex align-items-center justify-content-start'>
           {/* <span><i className='iconsminds-align-left'/></span> */}
           {/* <input type="text"  placeholder='Add a description' className='py-3 ml-2 border-top-0 border-left-0
            border-right-0 focus-none text-one   w-80 shadow-none'
          required value={description} onChange={(e) => setDescription(e.target.value)}/> */}
          </form>
          <footer className="d-flex justify-content-end border-t p-3 mt-5">
         <Button type='submit'  className="bg-primary  px-6 py-2 ">
         {/*  onClick={handleSave} */}
           Save
         </Button>
         <Button className='ml-2'   color="secondary" onClick={() => setModalSmall(false)}
                   >
                     Cancel
                   </Button>
       </footer>
       </form>
                 </ModalBody>
               </Modal>
             </div>
           </div>
         </div>
             {/* {isModalOpen && <EventModal onClose={() => setModalOpen(false)} 
                 clickedRowPosition={clickedRowPosition}
             />} */}
           </CardBody>
         </Card>
         {/* <EventModal/> */}
        {/* <WeekDisplay/> */}
        {/* <WeekDays/> */}
       </Colxx>
    </Row>
  
    </div>
  );
}

export default Month;
