/* eslint-disable no-param-reassign */
import React, { useState } from 'react';
// import { baseUrl } from 'constants/defaultValues';
import axios from 'axios';
import { Colxx } from 'components/common/CustomBootstrap';
import {  Button, Card, CardBody, CustomInput, Dropdown, DropdownItem, DropdownMenu,
   DropdownToggle, Form, FormGroup, Label, Row

   } from 'reactstrap';
  //  import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import { Wizard, Steps, Step } from 'react-albus';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';
import { injectIntl } from 'react-intl';
// import IntlMessages from 'helpers/IntlMessages';
import BottomNavigation from 'components/wizard/BottomNavigation';
import TopNavigation from 'components/wizard/TopNavigation';
import DateRangePicker from './DateRangePicker';





const PopupWizard = ({ selectedDate,setSelectedDate,upcomingsession,mentorId,mentorName}) => {

  const history = useHistory();  
  

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
  const [selectedradiobutton, setSelectedRadioButton] = useState(null);
  const [selectedHourDropdown, setSelectedHourDropdown] = useState(null); // Renamed state variable
   const [selectedHourDropdown1, setSelectedHourDropdown1] = useState(null); // Renamed state variable
  //  const [upcomingSessions] = useState([]); 
  const [minutedrop,setMinutedrop]=useState(null)
  const [minutedrop1,setMinutedrop1]=useState(null)

  // const [upcomingSessions] = useState([]);
//    const fromTimestamp = new Date(selectedDate).getTime();
// const toTimestamp = fromTimestamp + (selectedHourDropdown * 3600000) + (minutedrop * 60000) + (selectedHourDropdown1 * 3600000) + (minutedrop1 * 60000);

// const fromTime = new Date(fromTimestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
// const toTime = new Date(toTimestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
 
const handleCloseButtonClick = () => {
  const fromTimestamp = new Date(selectedDate).getTime();
  const toTimestamp = fromTimestamp + (selectedHourDropdown * 3600000) + (minutedrop * 60000) + (selectedHourDropdown1 * 3600000) + (minutedrop1 * 60000);

  // Convert timestamps to milliseconds
  const fromTimestampMilliseconds = fromTimestamp * 1000;
  const toTimestampMilliseconds = toTimestamp * 1000;

  console.log('From Timestamp (milliseconds):', fromTimestampMilliseconds);
  console.log('To Timestamp (milliseconds):', toTimestampMilliseconds);

  const newData = {
    mentorId,
    name: mentorName,
    mode: selectedradiobutton,
    fromtimestamp: fromTimestampMilliseconds,
    totimestamp: toTimestampMilliseconds,
  };

  axios.post('http://localhost:3001/sessionUpcomingHistroy', {
    data: {
      ...upcomingsession,
      upcomingSessions: upcomingsession && upcomingsession.upcomingSessions ? [...upcomingsession.upcomingSessions, newData] : [newData],
    }
  })
    .then(() => {
      redirectToSessionLists();
    })
    .catch(error => {
      console.error('Error storing data:', error);
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
      <Card className='mt-2  '  >
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

       
                       {/* <FormGroup className=''>  
                       
     
     <div className=''>
     
     <Label className='text-one font-weight-bold'>Appointment date</Label>  
            <InputGroup className="mb-3 ">
             <DateRangePicker  selectedDate={selectedDate} setSelectedDate={setSelectedDate}/>
            </InputGroup>
           
            

     </div>
                       </FormGroup> */}
                       <FormGroup row>
                  <Label  sm={4} className='font-weight-bold'>
                    Appointment date
                  </Label>
                  <Colxx sm={8}>
                  <DateRangePicker  selectedDate={selectedDate} setSelectedDate={setSelectedDate}/>
                  </Colxx>
                </FormGroup>
                       {/* <FormGroup>
                      <Row>
                        <Colxx sm="3">
                          <Label className='text-one'>Appointment date</Label>
                        </Colxx>
                        <Colxx sm="9">
                          <InputGroup className="mb-3">
                            <DateRangePicker selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
                          </InputGroup>
                        </Colxx>
                      </Row>
    </FormGroup> */}
      
    <FormGroup row>
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
                </FormGroup>
                <FormGroup row>
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
        </FormGroup>
      {/* <FormGroup>
      
      
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
  
       <Label className='text-one font-weight-bold'>To</Label>
       <div className='d-flex'>
       <Dropdown direction="down"
  isOpen={dropdownBasicOpen2}
  toggle={() => setDropdownBasicOpen2(!dropdownBasicOpen2)}
  className="mb-5 ml-2"
  
 
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
      </div>
      </FormGroup> */}
     
   
       {/* <Form>

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
   </Form> */}
     
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
              <Button className="btn btn-primary " onClick={handleCloseButtonClick}>
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

