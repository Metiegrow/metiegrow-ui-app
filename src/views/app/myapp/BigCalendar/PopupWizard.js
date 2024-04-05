/* eslint-disable no-param-reassign */
import React, { useState } from 'react';
import axios from 'axios';
import { baseUrl } from 'constants/defaultValues';
import { Colxx } from 'components/common/CustomBootstrap';
import {  Button, Card, CardBody, CustomInput, Dropdown, DropdownItem, DropdownMenu,
   DropdownToggle, Form, FormGroup, InputGroup, Label, Row

   } from 'reactstrap';
  //  import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import { Wizard, Steps, Step } from 'react-albus';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';
import { injectIntl } from 'react-intl';

import TopNavigation from 'components/wizard/TopNavigation';
import DateRangePicker from './DateRangePicker';
import BottomNavigation from '../my-login/BottomNavigation';

// const PopupWizard = ({ selectedDate,setSelectedDate,upcomingsession,mentorId,mentorName})
 const PopupWizard = ({ selectedDate,setSelectedDate,mentorId}) => {

  const history = useHistory();  
  
//  const url=`${baseUrl}/sessionUpcomingHistroy`;


//  if you want to change backend url uncomment the below line
// const url=`${baseUrl}/api/calendar/mentee/upcoming-bookedslots-session-history`

 const url1=`${baseUrl}/ mentorAppointmentTime`
// const url1=`${baseUrl}/api/calendar/appointment/mentee`
 
//  if you want to change backend url uncomment the below line


  const redirectToSessionLists = () => {
    // Redirect to the specified URL with the query parameter
    history.push('/app/sessionlists?appointment=true');
  };
  // const [selectedDate, setSelectedDate] = useState(null);
  // const [storedData, setStoredData] = useState(null);
  const [dropdownBasicOpen, setDropdownBasicOpen] = useState(false);
  const [dropdownBasicOpen1, setDropdownBasicOpen1] = useState(false);
  const [dropdownBasicOpen2, setDropdownBasicOpen2] = useState(false);
  const [dropdownBasicOpen3, setDropdownBasicOpen3] = useState(false);
  const [dropdownBasicOpen4, setDropdownBasicOpen4] = useState(false);
  const [dropdownBasicOpen5, setDropdownBasicOpen5] = useState(false);
  const [selectedradiobutton, setSelectedRadioButton] = useState(null);
  const [selectedHourDropdown, setSelectedHourDropdown] = useState(null); // Renamed state variable
   const [selectedHourDropdown1, setSelectedHourDropdown1] = useState(null); // Renamed state variable
  //  const [upcomingSessions] = useState([]); 
  const [minutedrop,setMinutedrop]=useState(null)
  const [minutedrop1,setMinutedrop1]=useState(null)
  const [selectedfromampm, setSelectedFromAmPm] = useState(null); // State for AM selection
  const [selectedfromampm1, setSelectedFromAmPm1] = useState(null); // State for AM selection

  // const handleCloseButtonClick = () => {
  //   // Convert selectedDate to timestamp in milliseconds
  //   const DateTime = new Date(selectedDate).getTime();
  //   // const fromTimestamp =  DateTime + (selectedHourDropdown * 3600000) + (minutedrop * 60000)
  //   const fromTimestamp = DateTime + (selectedHourDropdown % 12) * 3600000 + (minutedrop * 60000) + (selectedfromampm === 'PM' ? 43200000 : 0);
  //   const toTimestamp = DateTime + (selectedHourDropdown1 % 12) * 3600000 + (minutedrop1 * 60000) + (selectedfromampm1 === 'PM' ? 43200000 : 0);
  
  
  //   // Calculate the 'to' timestamp based on selected hours and minutes
  //   // const toTimestamp = fromTimestamp + (selectedHourDropdown * 3600000) + (minutedrop * 60000) + (selectedHourDropdown1 * 3600000) + (minutedrop1 * 60000);
  //   // const toTimestamp = DateTime + (selectedHourDropdown1 * 3600000) + (minutedrop1 * 60000);
  //   // No need to multiply timestamps by 1000 to convert to milliseconds
    
  //   console.log('From Timestamp (milliseconds):', fromTimestamp);
  //   console.log('To Timestamp (milliseconds):', toTimestamp);
  
  //   const newData = {
  //     mentorId,
  //     name: mentorName,
  //     mode: selectedradiobutton,
  //     fromtimestamp: fromTimestamp, // Already in milliseconds
  //     totimestamp: toTimestamp, // Already in milliseconds
  //   };
  
  //   axios.post(url, {
  //     data: {
  //       ...upcomingsession,
  //       upcomingSessions: upcomingsession && upcomingsession.upcomingSessions ? [...upcomingsession.upcomingSessions, newData] : [newData],
  //     }
     
  //   })
  //     .then(() => {
  //       redirectToSessionLists();
  //     })
  //     .catch(error => {
  //       console.error('Error storing data:', error);
  //     });
  // };
  
 
  // const handleNextButtonClick = () => {
  //   const DateTime = new Date(selectedDate).getTime();
  //   const fromTimeStamp =  DateTime + (selectedHourDropdown * 3600000) + (minutedrop * 60000)
  //   const toTimeStamp = DateTime + (selectedHourDropdown1 * 3600000) + (minutedrop1 * 60000);
  //   console.log('From Timestamp (milliseconds):', fromTimeStamp);
  //   console.log('To Timestamp (milliseconds):', toTimeStamp);
  //   const newData = {
  //     mentorId,
  //     mode: selectedradiobutton,
  //     fromtimestamp: fromTimeStamp,
  //     totimestamp: toTimeStamp,
  //   };
  
  //   axios.post('http://localhost:3001/mentorAppointmentTime', newData)
  //     .then(response => {
  //       // Handle successful response, such as redirecting the user
  //       console.log('Post request successful:', response.data);
  //       // redirectToSessionLists(); // Redirect to the specified URL
  //     })
  //     .catch(error => {
  //       // Handle error
  //       console.error('Error posting data:', error);
  //     });
  // };


  // const handleNextButtonClick = () => {
  //   // Convert selected date to UTC timestamp
  //   const selectedDateTime = new Date(selectedDate);
  
  //   // Set the hours and minutes for the selected date
  //   selectedDateTime.setHours(selectedHourDropdown, minutedrop, 0, 0);
  //   const fromTimeStamp = selectedDateTime.getTime(); // Get the UTC timestamp for 'from' time
  
  //   // Calculate 'to' time
  //   const toDateTime = new Date(selectedDateTime); // Create a new Date object based on 'from' time
  //   toDateTime.setMinutes(toDateTime.getMinutes() + minutedrop1); // Add selected minutes
  
  //   // Check if adding minutes exceeds 59 minutes, if so, increment the hour
  //   if (toDateTime.getMinutes() !== minutedrop1) {
  //     toDateTime.setHours(toDateTime.getHours() + 1);
  //   }
  
  //   const toTimeStamp = toDateTime.getTime(); // Get the UTC timestamp for 'to' time
  
  //   console.log('From Timestamp (milliseconds):', fromTimeStamp);
  //   console.log('To Timestamp (milliseconds):', toTimeStamp);
  
  //   const newData = {
  //     mentorId,
  //     mode: selectedradiobutton,
  //     fromtimestamp: fromTimeStamp,
  //     totimestamp: toTimeStamp,
  //   };
  
  //   axios.post('http://localhost:3001/mentorAppointmentTime', [newData])
  //     .then(response => {
  //       // Handle successful response, such as redirecting the user
  //       console.log('Post request successful:', response.data);
  //       // redirectToSessionLists(); // Redirect to the specified URL
  //     })
  //     .catch(error => {
  //       // Handle error
  //       console.error('Error posting data:', error);
  //     });
  // };
  
  
  
// const handleFromAmPm=(selectampm)=>{
//   setSelectedFromAmPm(selectampm)
// }
  
// const handleToAmPm=(selectampm)=>{
//   setSelectedToAmPm(selectampm)
// }
const handleNextButtonClick = () => {
  // Convert selected date to UTC timestamp
  const selectedDateTime = new Date(selectedDate);

  // Set the hours and minutes for the selected date
  const selectedHour = selectedHourDropdown % 12 + (selectedfromampm === 'PM' ? 12 : 0); // Adjust for PM
  selectedDateTime.setHours(selectedHour, minutedrop, 0, 0);
  const fromTimeStamp = selectedDateTime.getTime(); // Get the UTC timestamp for 'from' time

  // Calculate 'to' time
  const toDateTime = new Date(selectedDateTime); // Create a new Date object based on 'from' time
  const selectedHourTo = selectedHourDropdown1 % 12 + (selectedfromampm1 === 'PM' ? 12 : 0); // Adjust for PM
  toDateTime.setHours(selectedHourTo, minutedrop1, 0, 0); // Set the 'to' hour
  const toTimeStamp = toDateTime.getTime(); // Get the UTC timestamp for 'to' time

  console.log('From Timestamp (milliseconds):', fromTimeStamp);
  console.log('To Timestamp (milliseconds):', toTimeStamp);

  const newData = {
    mentorId,
    mode: selectedradiobutton,
    fromTimeStamp,
    toTimeStamp,
  };

  axios.post(url1, [newData])
    .then(response => {
      // Handle successful response, such as redirecting the user
      console.log('Post request successful:', response.data);
      // redirectToSessionLists(); // Redirect to the specified URL
    })
    .catch(error => {
      // Handle error
      console.error('Error posting data:', error);
    });
};


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
  // const handlesave = () => {
  //   console.log('Selected Date:', selectedDate);
  //   console.log('Selected Hour:', selectedHourDropdown);
  //   console.log('Selected Minute:', minutedrop);
  //   console.log('Selected Radio Button:', selectedRadioButton);
   
  // };
  const topNavClick = (stepItem, push) => {
    push(stepItem.id);
  };

  // const onClickNext = (goToNext, steps, step) => {
  //   step.isDone = true;
  //   if (steps.length - 1 <= steps.indexOf(step)) {
  //     return;
  //   }
  //   goToNext();
  // };
  // const onClickNext = (goToNext, steps, step) => {
  //   step.isDone = true;
  //   if (steps.length - 1 <= steps.indexOf(step)) {
  //     redirectToSessionLists();
  //   } else {
  //     goToNext();
  //   }
  // };
  const onClickNext = (goToNext, steps, step) => {
    step.isDone = true;
    if (steps.length - 1 <= steps.indexOf(step)) {
      
      if (step.id === 'step3') {
        redirectToSessionLists(); // Redirect to the session list
        return;
      }
    }
    handleNextButtonClick(); // Call the function to post data when moving to the next step
    goToNext();
};

  const onClickPrev = (goToPrev, steps, step) => {
    if (steps.indexOf(step) <= 0) {
      return;
    }
    goToPrev();
  };


  return (
    <Row >
      <Colxx  >
      <Card className='mt-2    '>
      <CardBody className="wizard wizard-default  " >
      <Wizard>
          <TopNavigation
            className="justify-content-center"
            disableNav
            topNavClick={topNavClick}
          />
          <Steps>
            <Step
              id="step1"
              // name={messages['wizard.step-name-1']}
              name="step 1"
              desc="Schedule appointement"
            
            >
                       <Form className=' '  >

       
                       <FormGroup className=''>  
                       
     
     <div className=''>
     
     <Label className='text-one font-weight-bold'>Appointment date</Label>  
            <InputGroup className="mb-3 ">
             <DateRangePicker  selectedDate={selectedDate} setSelectedDate={setSelectedDate}/>
            </InputGroup>
           
            

     </div>
                       </FormGroup>
                       {/* <FormGroup row>
                  <Label  sm={4} className='font-weight-bold'>
                    Appointment date
                  </Label>
                  <Colxx sm={8}>
                  <DateRangePicker  selectedDate={selectedDate} setSelectedDate={setSelectedDate}/>
                  </Colxx>
                </FormGroup> */}
                       {/* <FormGroup>
                       <Colxx sm="3">
                          <Label className='text-one'>Appointment date</Label>
                        </Colxx>
                        <Colxx sm="9">
                          <InputGroup className="mb-3">
                            <DateRangePicker selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
                          </InputGroup>
                        </Colxx>
    </FormGroup> */}
      
    {/* <FormGroup row className=''>
                  <Label  sm={4} className='font-weight-bold'>
                    From
                  </Label>
                  <Colxx sm={8}>
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
                </FormGroup> */}
                {/* <FormGroup row>
                  <Label  sm={4} className='font-weight-bold'>
                    To
                  </Label>
                  <Colxx sm={8}>
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
     </div>
                  </Colxx>
                </FormGroup>
                <FormGroup row>
        <Label  sm={4} className='font-weight-bold'>
                    Call type
                  </Label>
                  <Colxx sm={8}>
                  <div className='d-flex '>
       <CustomInput
         type="radio"
         id="exCustomRadio"
         name="customRadio"
         label="Audio"
         value={selectedradiobutton}
         onChange={() => setSelectedRadioButton('Audio')}
       />
       <CustomInput
         type="radio"
         id="exCustomRadio2"
         name="customRadio"
         label="Video"
         className='ml-3'
         value={selectedradiobutton}
         onChange={() => setSelectedRadioButton('Video')}
       />
         
     </div>
                  </Colxx>
        </FormGroup> */}
      <FormGroup>
      
      
      <div className=''>
      <div>
       
       <Label className='text-one font-weight-bold'>From</Label>
       <div className='d-flex '>
      

       <Dropdown direction="down"
  isOpen={dropdownBasicOpen}
  toggle={() => setDropdownBasicOpen(!dropdownBasicOpen)}
  className="mb-5 "
  
 
>
 



  <DropdownToggle caret color="secondary" outline className=''>
    
    
    {selectedHourDropdown !== null ? selectedHourDropdown : 'Hours'} 
  </DropdownToggle>
  <DropdownMenu className=''>
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
            <DropdownMenu >
             {generateMinuteDropdownItems()}
            </DropdownMenu>
          </Dropdown>

          {/* <Dropdown isOpen={ampmDropdownOpen} toggle={toggleAmpmDropdown} className='ml-3'>
        <DropdownToggle caret color="secondary" outline>
          {selectedAmPm !=null ? selectedAmPm : 'Select AM/PM'}
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem onClick={() => handleAmPmSelection('AM')}>AM</DropdownItem>
          <DropdownItem onClick={() => handleAmPmSelection('PM')}>PM</DropdownItem>
        </DropdownMenu>
      </Dropdown> */}
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

     <div className=''>
  
       <Label className='text-one font-weight-bold'>To</Label>
       <div className='d-flex'>
       <Dropdown direction="down"
  isOpen={dropdownBasicOpen2}
  toggle={() => setDropdownBasicOpen2(!dropdownBasicOpen2)}
  className="mb-5"
  
 
>

  <DropdownToggle caret color="secondary" outline className='' >
    
    
    {selectedHourDropdown1 !== null ? selectedHourDropdown1 : 'Hours'} 
  </DropdownToggle>
  <DropdownMenu className=''>
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
            <DropdownMenu >
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
          {/* <Dropdown isOpen={ampmDropdownOpen1} toggle={toggleAmpmDropdown1} className='ml-3'>
        <DropdownToggle caret color="secondary" outline>
          {selectedAmPm1 !=null ? selectedAmPm1 : 'Select AM/PM'}
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem onClick={() => handleAmPmSelection1('AM')}>AM</DropdownItem>
          <DropdownItem onClick={() => handleAmPmSelection1('PM')}>PM</DropdownItem>
        </DropdownMenu>
      </Dropdown> */}
       </div>
     </div>
      </div>
      </FormGroup>
     
   
       <Form>

        <FormGroup>
      <Label className='text-one font-weight-bold'>Call type</Label>
     <div className='d-flex '>
       <CustomInput
         type="radio"
         id="exCustomRadio"
         name="customRadio"
         label="Audio"
         value={selectedradiobutton}
         onChange={() => setSelectedRadioButton('Audio')}
       />
       <CustomInput
         type="radio"
         id="exCustomRadio2"
         name="customRadio"
         label="Video"
         className='ml-3'
         value={selectedradiobutton}
         onChange={() => setSelectedRadioButton('Video')}
       />
         
     </div>
   </FormGroup>
   </Form>
     
       {/* <footer className="d-flex justify-content-end border-t p-3 mt-5">
      <Button type='submit'  className="  px-6 py-2 " color='primary'  onClick={handlesave}>
       
        Next
      </Button>
      <Button className='ml-2'  outline  color="secondary"  onClick={() => setModalSmall(false)}
                >
                  Cancel
                </Button>
    </footer> */}
    </Form>
              
            </Step>
            <Step
              id="step2"
              // name={messages['wizard.step-name-2']}
              name="step 2"
              desc="Payment"
            
            >
              {/* <div className="wizard-basic-step">
                <Form>
                  <FormGroup>
                    <Label>
                      <IntlMessages id="forms.email" />
                    </Label>
                    <Input
                      type="email"
                      name="email"
                      placeholder={messages['forms.email']}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </FormGroup>
                </Form>
              </div> */}
              <Card className='my-3 '>
                <CardBody>
                <Form className=''>
                  <FormGroup className='w-100'>
                  <div className='d-flex justify-content-between align-items-center  '>
                  <Label  className='text-one '>Session Price</Label>
                  <Colxx lg={5}  className=''>
                  <h3 className=''><span className='font-weight-bold color-theme-1 '>Rs:300 </span></h3>
                  </Colxx>
                  </div>
                 
              
                  </FormGroup>
                  <FormGroup className='w-100'>
                  <div className='d-flex justify-content-between align-items-center '>
                  <Label  className='text-one'>Your Available Balance</Label>
                  <Colxx lg={5}>
                  <h3 className=''><span className='font-weight-bold color-theme-1'>Rs:14000 </span></h3>
                  </Colxx>
                  </div>
                 
              
                  </FormGroup>
                  <FormGroup className='w-100'>
                  <div className='d-flex justify-content-between align-itmes-center '>
                  <Label  className='text-one'>Balance after deduction</Label>
                  <Colxx lg={5}>
                  <h3 className=''><span className='font-weight-bold color-theme-1'>Rs:11000</span></h3>
                  </Colxx>
                  </div>
                 
              
                  </FormGroup>
                  
                 
                
             
                </Form>
               
               
                   
                </CardBody>
              </Card>
              
            </Step>
            <Step
              id="step3"
              // name={messages['wizard.step-name-3']}
              name="step 3"
              desc="Finish"
              
            >
             
              <div className='text-center ' >
              <span className='text-xlarge text-primary'><i className='simple-icon-check'/></span>
              <h3 className=' my-3 py-3 '>Your appointment is successfull</h3>
              <h2 className=' my-3'>Thank you</h2>
                

              {/* <div className='text-center my-2'>
              <Button className="btn btn-primary " onClick={redirectToSessionLists}>
                   Close
                  </Button>
              </div> */}
              <div className='text-center my-2'>
              {/* <Button color='primary' className="btn btn-primary " onClick={handleCloseButtonClick}> */}
              <Button color='primary' className="btn btn-primary " onClick={redirectToSessionLists}>
                   Close
                  </Button>
              </div>
                  
              </div>
              
              
            </Step>
         
           
            
            {/* <Step id="step4" hideTopNav>
              <div className="wizard-basic-step text-center">
                <h2 className="mb-2">
                  Thank You
                </h2>
                
              </div>
            </Step> */}
          </Steps>
          
          <Form className='mt-4'>
            <FormGroup>
            <BottomNavigation
            onClickNext={onClickNext}
            onClickPrev={onClickPrev}
            className="justify-content-center"
            prevLabel="Back"
            nextLabel="Next"
          />
            </FormGroup>
          </Form>
         
        </Wizard>
        
      </CardBody>
    </Card>
    
      </Colxx>
    </Row>
      );
};
export default injectIntl(PopupWizard);

