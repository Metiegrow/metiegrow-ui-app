import { Colxx } from 'components/common/CustomBootstrap';
import React,{useState,useEffect} from 'react';
import {  Button, Card, CardBody, Modal, ModalBody, Table ,
  Dropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
  Row} from 'reactstrap';
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
  // const [selectedHourDropdown, setSelectedHourDropdown] = useState(null); // Renamed state variable

  // const [minutedrop,setMinuteDrop]=useState(null)



  const [title,setTitle]=useState("");
  const [description,setDescription]=useState("");
  const [dropdownBasicOpen, setDropdownBasicOpen] = useState(false);
  const [dropdownBasicOpen1, setDropdownBasicOpen1] = useState(false);
  // const [savedEntries, setSavedEntries] = useState([]);
  const [currentWeekStart, setCurrentWeekStart] = useState(new Date());

 

  const handleDropdownItemClick = (selectedHour) => {
    // Handle the selected hour as needed
    console.log(`Selected hour: ${selectedHour}`);
    // setSelectedHourDropdown(selectedHour); 
  };
  const handleDropdownItemClick1 = (selectedMinute) => {
    // Handle the selected minutes as needed
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
  // weeklist functions ends
 
  // const handleRowClick = (event) => {
  //   const rect = event.currentTarget.getBoundingClientRect();
  //   setClickedRowPosition({ top: rect.top + window.scrollY, left: rect.left + window.scrollX });
  //   setModalOpen(true);
    
  // }
  

  // const handleSave = () => {
  //   // Create a new entry object with the current form values
  //   const newEntry = {
  //     title,
  //     description,
  //     selectedHour: selectedHourDropdown,
  //     selectedMinute:minutedrop

  //     // Add other properties as needed
  //   }
  //     // Update the state with the new entry
  //   setSavedEntries([...savedEntries, newEntry]);

  //   // Clear the form fields after saving
  //   setTitle('');
  //   setDescription('');
  //   setSelectedHourDropdown(null); // Reset the selected hour state
  //   setMinuteDrop(null)
  //   // Reset other form fields as needed
  //    // Close the modal
  // setModalSmall(false);
    
  // }
  


  return (
    <div>
     

    <Row>
    <Colxx xxs="8" className='mx-auto'>
    {/* <WeekList/> */}

   <h2>Mentor availability</h2>
   <div className='font-weight-semibold d-flex justify-content-between'>
     <Button className='font-weight-semibold text-one ' onClick={goToPreviousWeek}><i className='simple-icon-arrow-left'/></Button>
     <Button className='ml-5 font-weight-semibold text-one' onClick={goToNextWeek} ><i className='simple-icon-arrow-right '/></Button>
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
               {/* {getWeekDates().map((date) => (
                        <tr key={date.getTime()}>
                        <td >{getMonthName(date.getMonth())}  {formatDate(date)} 
            </td>
                        </tr>
           
            
          ))} */}
               {/* {mentoravailable.map((avail)=>{
                 const FromDate = new Date(avail.fromTimeStamp);
                 const ToDate = new Date(avail.toTimeStamp);
                 const date=new Date(avail.fromTimeStamp)
                 
                 return(
                   <tr key={avail.id} onClick={()=>setModalSmall(true)}>
                  <td>{date.toLocaleDateString('en-US')}</td>
                  

                 <td>{FromDate.toLocaleTimeString()} to {ToDate.toLocaleTimeString()}</td>
                </tr>
                 )
               
               })} */}
           
                 {/* <tr onClick={(event) => handleRowClick(event)}> */}
                 {/* <tr  onClick={() => setModalSmall(true)}>
                   
                   <td>Feb 01,2024</td>
                   <td>10pm to 12pm</td>
                   
                   
                 </tr>
                 <tr  onClick={() => setModalSmall(true)}>
                   
                   <td>Feb 02,2024</td>
                   <td>7pm to 12pm </td>
                   
                    
                 </tr> */}
                 {/* {savedEntries.map((entry) => (
           <tr key={entry.title} >
             <td>{entry.title}</td>
             <td>{entry.description}</td>
             <td>hour:{entry.selectedHour}</td>
           <td>min:{entry.selectedMinute}</td>
           
           </tr>
         ))} */}
                 {/* <tr  onClick={() => setModalSmall(true)}>
                   
                   <td>Feb 03,2024</td>
                   <td>8pm to 12pm</td>
                 </tr>
                 <tr>
                
                   <td>Feb 04,2024</td>
                   <td>8pm to 12pm</td>
                 </tr>
                 <tr>
                   
                   <td>Feb 05,2024</td>
                   <td>8pm to 12pm</td>
                 </tr> */}
                 {/* new */}

                 {getWeekDates().map((date) => (
  <tr key={date.getTime()} onClick={() => setModalSmall(true)}>
    <td>{getMonthName(date.getMonth())} {formatDate(date)}</td>
    <td>
      {mentoravailable.map((avail) => {
        const availDate = new Date(avail.fromTimeStamp);
        if (availDate.toDateString() === date.toDateString()) {
          // Mentor is available on this date, display the available time
          const FromDate = new Date(avail.fromTimeStamp);
          const ToDate = new Date(avail.toTimeStamp);
          console.log(avail.length);
          
          return  <td className='bg-primary d-block text-center' key={date.getTime()}>{FromDate.toLocaleTimeString()} to {ToDate.toLocaleTimeString()} 
        
          </td>
          
       
          
        } 
          // Mentor is not available on this date, display an empty string
         
          return '-';
        
      })}
    </td>
  </tr>
))}
{/* another */}













 {/* return `${FromDate.toLocaleTimeString()} to ${ToDate.toLocaleTimeString()} `; */}






               </tbody>
             </Table>
             <Button onClick={() => setModalSmall(true)}>Book Now</Button>
             <div className="mb-4">
           <div>
         
             <div className=''>
             
               <Modal
                 isOpen={modalSmall}
                 toggle={() => setModalSmall(!modalSmall)}
                 className='mt-5'
               >
                 <ModalBody >
                   <form className=' '  >
       <div>
       <input type="text"  placeholder='Add a title' className='py-3 ml-3 border-top-0
        border-left-0 border-right-0 my-2 text-one   w-80 shadow-none'
          required value={title} onChange={(e) => setTitle(e.target.value)}/>
       </div>
         
          <div className='d-flex my-3 align-items-center'>
           <span className='text-one'><i className='simple-icon-calendar'/></span>
           {/* <p className='text-one ml-2'>Feb 02,2024</p> */}
           <div>
           {/* <DatePicker /> */}
           <DateRangePicker/>
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
       Hours
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
                 Minutes
               </DropdownToggle>
               <DropdownMenu style={{ maxHeight: '200px', overflowY: 'auto' }}>
                {generateMinuteDropdownItems()}
               </DropdownMenu>
             </Dropdown>
       </div>

          </div>
          <form className='d-flex align-items-center justify-content-start'>
           <span><i className='iconsminds-align-left'/></span>
           <input type="text"  placeholder='Add a description' className='py-3 ml-2 border-top-0 border-left-0
            border-right-0 focus-none text-one   w-80 shadow-none'
          required value={description} onChange={(e) => setDescription(e.target.value)}/>
          </form>
          <footer className="d-flex justify-content-end border-t p-3 mt-5">
         <Button type='submit'  className="bg-primary  px-6 py-2 ">
         {/*  onClick={handleSave} */}
           Save
         </Button>
         <Button className='ml-2'  color="secondary" onClick={() => setModalSmall(false)}
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
