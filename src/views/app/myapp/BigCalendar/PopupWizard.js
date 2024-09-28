/* eslint-disable no-param-reassign */
import axios from "axios";
import { Colxx } from "components/common/CustomBootstrap";
import { baseUrl } from "constants/defaultValues";
import { useState } from "react";
import {
  Button,
  Card,
  CardBody,
  Col,
  CustomInput,
  Form,
  FormGroup,
  InputGroup,
  Label,
  Row,
} from "reactstrap";
//  import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';
//  Dropdown, DropdownItem, DropdownMenu,
//  DropdownToggle
import CustomSelectInput from "components/common/CustomSelectInput";
import { Step, Steps, Wizard } from "react-albus";
import { injectIntl } from "react-intl";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import Select from "react-select";

import TopNavigation from "components/wizard/TopNavigation";
import BottomNavigation from "../my-login/BottomNavigation";
import ToasterComponent from "../notifications/ToasterComponent";
import DateRangePicker from "./DateRangePicker";

// const PopupWizard = ({ selectedDate,setSelectedDate,upcomingsession,mentorId,mentorName})
const PopupWizard = ({ selectedDate, setSelectedDate, mentorId, role }) => {
  const history = useHistory();

  //  const url=`${baseUrl}/sessionUpcomingHistroy`;

  //  if you want to change backend url uncomment the below line
  // const url=`${baseUrl}/api/calendar/mentee/upcoming-bookedslots-session-history`

  // const url1=`${baseUrl}/ mentorAppointmentTime`
  // const url1 = `${baseUrl}/api/calendar/appointment/UserProfile`;
  const url1 = `${baseUrl}/api/calendar/appointment/book?role=${role}`;

  //  if you want to change backend url uncomment the below line

  const redirectToSessionLists = () => {
    // Redirect to the specified URL with the query parameter
    history.push("/app/sessionlists?appointment=true");
  };
  // const [selectedDate, setSelectedDate] = useState(null);
  // const [storedData, setStoredData] = useState(null);
  // const [dropdownBasicOpen, setDropdownBasicOpen] = useState(false);
  // const [dropdownBasicOpen1, setDropdownBasicOpen1] = useState(false);
  // const [dropdownBasicOpen2, setDropdownBasicOpen2] = useState(false);
  // const [dropdownBasicOpen3, setDropdownBasicOpen3] = useState(false);
  // const [dropdownBasicOpen4, setDropdownBasicOpen4] = useState(false);
  // const [dropdownBasicOpen5, setDropdownBasicOpen5] = useState(false);
  const [selectedradiobutton, setSelectedRadioButton] = useState(null);
  const [selectedHourDropdown, setSelectedHourDropdown] = useState(null); // Renamed state variable
  const [selectedHourDropdown1, setSelectedHourDropdown1] = useState(null); // Renamed state variable
  //  const [upcomingSessions] = useState([]);
  const [minutedrop, setMinutedrop] = useState(null);
  const [minutedrop1, setMinutedrop1] = useState(null);
  const [selectedfromampm, setSelectedFromAmPm] = useState(null); // State for AM selection
  const [selectedfromampm1, setSelectedFromAmPm1] = useState(null); // State for AM selection
  const [license, setLicense] = useState([]);

  // const url=`${baseUrl}/licenseDetails`;

  // Backend Url
  // const url = `${baseUrl}/api/calendar/mentee/license-details`;
  const url = `${baseUrl}/api/calendar/license-details`;

  const LicenseDetails = async () => {
    console.log("Mentor ID:", mentorId);
    console.log("Role from async function:", role);
    try {
      // Generate newData object
      const selectedDateTime = new Date(selectedDate);
      const selectedHour =
        (selectedHourDropdown % 12) + (selectedfromampm === "PM" ? 12 : 0);
      selectedDateTime.setHours(selectedHour, minutedrop, 0, 0);
      const fromTimeStamp = selectedDateTime.getTime();

      const toDateTime = new Date(selectedDateTime);
      const selectedHourTo =
        (selectedHourDropdown1 % 12) + (selectedfromampm1 === "PM" ? 12 : 0);
      toDateTime.setHours(selectedHourTo, minutedrop1, 0, 0);
      const toTimeStamp = toDateTime.getTime();

      const newData = {
        userId: mentorId,
        role,
        fromTimeStamp,
        toTimeStamp,
      };

      // Convert newData object to query parameters string
      const queryString = Object.keys(newData)
        .map(
          (key) =>
            `${encodeURIComponent(key)}=${encodeURIComponent(newData[key])}`
        )
        .join("&");

      // Perform axios request with query parameters
      const response = await axios.get(`${url}?${queryString}`);
      console.log("Response from server:", response.data);

      // Set the license state with the response data
      setLicense(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      if (error.response) {
        ToasterComponent("error", error.response.data.statuses);
      }
    }
  };

  const handleLicenseNextButtonClick = () => {
    LicenseDetails();
  };

  const handleNextButtonClick = () => {
    // Convert selected date to UTC timestamp
    const selectedDateTime = new Date(selectedDate);

    // Set the hours and minutes for the selected date
    const selectedHour =
      (selectedHourDropdown % 12) + (selectedfromampm === "PM" ? 12 : 0); // Adjust for PM
    selectedDateTime.setHours(selectedHour, minutedrop, 0, 0);
    const fromTimeStamp = selectedDateTime.getTime(); // Get the UTC timestamp for 'from' time

    // Calculate 'to' time
    const toDateTime = new Date(selectedDateTime); // Create a new Date object based on 'from' time
    const selectedHourTo =
      (selectedHourDropdown1 % 12) + (selectedfromampm1 === "PM" ? 12 : 0); // Adjust for PM
    toDateTime.setHours(selectedHourTo, minutedrop1, 0, 0); // Set the 'to' hour
    const toTimeStamp = toDateTime.getTime(); // Get the UTC timestamp for 'to' time

    console.log("From Timestamp (milliseconds):", fromTimeStamp);
    console.log("To Timestamp (milliseconds):", toTimeStamp);

    const newData = {
      mentorId,
      mode: selectedradiobutton,
      fromTimeStamp,
      toTimeStamp,
    };

    axios
      .post(url1, [newData])
      .then((response) => {
        // Handle successful response, such as redirecting the user
        console.log("Post request successful:", response.data);
        ToasterComponent("success", response.data.statuses);
        // redirectToSessionLists(); // Redirect to the specified URL
      })
      .catch((error) => {
        // Handle error
        console.error("Error posting data:", error);
        if (error.response) {
          ToasterComponent("error", error.response.data.statuses);
        }
      });
  };

  // This function is used to check the available slot is same as the input given by the user
  const handleCheckAvailability = () => {
    // Convert selected date to UTC timestamp
    const selectedDateTime = new Date(selectedDate);

    // Set the hours and minutes for the selected date
    const selectedHour =
      (selectedHourDropdown % 12) + (selectedfromampm === "PM" ? 12 : 0); // Adjust for PM
    selectedDateTime.setHours(selectedHour, minutedrop, 0, 0);
    const fromTimeStamp = selectedDateTime.getTime(); // Get the UTC timestamp for 'from' time

    // Calculate 'to' time
    const toDateTime = new Date(selectedDateTime); // Create a new Date object based on 'from' time
    const selectedHourTo =
      (selectedHourDropdown1 % 12) + (selectedfromampm1 === "PM" ? 12 : 0); // Adjust for PM
    toDateTime.setHours(selectedHourTo, minutedrop1, 0, 0); // Set the 'to' hour
    const toTimeStamp = toDateTime.getTime(); // Get the UTC timestamp for 'to' time

    console.log("From Timestamp (milliseconds):", fromTimeStamp);
    console.log("To Timestamp (milliseconds):", toTimeStamp);

    const availabilityUrl = `${baseUrl}/api/calendar/appointment/booking/availability?userId=${mentorId}&fromTimeStamp=${fromTimeStamp}&toTimeStamp=${toTimeStamp}`;

    return axios
      .get(availabilityUrl)
      .then((response) => {
        // Handle successful response
        console.log("Availability check successful:", response.data);
        // alert("Availability data fetched successfully"); // Use alert instead of Toaster
        return response; // Return the response for further processing if needed
      })
      .catch((error) => {
        // Handle error
        console.error("Error checking availability:", error);
        if (error.response) {
          alert(error.response.data.statuses || "Error fetching availability"); // Use alert for error messages
        } else {
          alert("An unexpected error occurred. Please try again."); // Handle unexpected errors
        }
      });
  };

  const handleDropdownItemClick = (selectedHour) => {
    // Handle the selected hour as needed
    setSelectedHourDropdown(selectedHour.value);

    console.log(`Selected hour: ${selectedHour.value}`);
    // setSelectedHourDropdown(selectedHour);
  };

  const handleDropdownItemClick1 = (selectedMinute) => {
    // Handle the selected minutes as needed
    setMinutedrop(selectedMinute.value);
    //  setMinutedrop1(selectedMinute);
    // console.log(`Selected minute: ${selectedMinute}`);
    // setMinuteDrop(selectedMinute);
  };

  // const handleDropdownItemClick2 = (selectedHour) => {
  //   // Handle the selected hour as needed
  //   setSelectedHourDropdown1(selectedHour)
  //   console.log(`Selected hour: ${selectedHour}`);
  //   // setSelectedHourDropdown(selectedHour);
  // };

  const handleDropdownItemClick2 = (selectedHour) => {
    // Handle the selected minutes as needed
    setSelectedHourDropdown1(selectedHour.value);
  };
  const handleDropdownItemClick3 = (selectedMinute) => {
    // Handle the selected minutes as needed
    setMinutedrop1(selectedMinute.value);
    // console.log(`Selected minute: ${selectedMinute.value}`);
    // setMinuteDrop(selectedMinute);
  };

  // const handleDropdownItemClick4 = (selectedAmPmFrom) => {
  //   // Handle the selected minutes as needed
  //   setSelectedFromAmPm(selectedAmPmFrom);
  //   console.log(`Selected from AM/PM: ${selectedAmPmFrom}`);
  //   // setMinuteDrop(selectedMinute);
  // };

  const handleDropdownItemClick4 = (selectedAmPmFrom) => {
    // Handle the selected minutes as needed
    setSelectedFromAmPm(selectedAmPmFrom.value);
    console.log(`Selected from AM/PM: ${selectedAmPmFrom.value}`);
    // setMinuteDrop(selectedMinute);
  };
  const handleDropdownItemClick5 = (selectedAmPmTo) => {
    // Handle the selected minutes as needed
    setSelectedFromAmPm1(selectedAmPmTo.value);
    console.log(`Selected from AM/PM: ${selectedAmPmTo.value}`);
    // setMinuteDrop(selectedMinute);
  };
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

  // const generateDropdownItemsSelect = () => {
  //   const items = [];
  //   for (let i = 1; i <= 12; i += 1) {
  //     const formattedHour = i < 10 ? `0${i}` : i;
  //     items.push(
  //       <option key={i} value={i}>
  //         {formattedHour}
  //       </option>
  //     );
  //   }
  //   return items;
  // };

  const generateDropdownItemsSelect = () => {
    const items = [];
    for (let i = 1; i <= 12; i += 1) {
      const formattedHour = i < 10 ? `0${i}` : i;
      items.push({ value: formattedHour, label: formattedHour });
    }
    return items;
  };
  const generateMinuteDropdownItems = () => {
    const minutes = [0, 15, 30, 45];
    const items = [];

    minutes.forEach((minute) => {
      const formattedMinute = minute < 10 ? `0${minute}` : `${minute}`;
      items.push({ value: formattedMinute, label: formattedMinute });
    });

    return items;
  };

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
  const generateDropdownItems1 = () => {
    const items = [];
    for (let i = 1; i <= 12; i += 1) {
      const formattedHour = i < 10 ? `0${i}` : i;
      items.push({ value: formattedHour, label: formattedHour });
    }
    return items;
  };
  const generateMinuteDropdownItems1 = () => {
    const minutes = [0, 15, 30, 45];
    const items = [];

    minutes.forEach((minute) => {
      const formattedMinute = minute < 10 ? `0${minute}` : `${minute}`;
      items.push({ value: formattedMinute, label: formattedMinute });
    });

    return items;
  };

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
  const generateAmPmDropdownItems = () => {
    const amPmOptions = ["AM", "PM"];
    const items = [];

    amPmOptions.forEach((amPm) => {
      items.push({ value: amPm, label: amPm });
    });

    return items;
  };

  // const generateAmPmDropdownItems = () => {
  //   const amPmOptions = ['AM', 'PM'];
  //   return amPmOptions.map((amPm) => (
  //     <DropdownItem key={amPm} onClick={() => handleDropdownItemClick4(amPm)}>
  //       {amPm}
  //     </DropdownItem>
  //   ));
  // };

  const generateAmPmDropdownItems1 = () => {
    const amPmOptions = ["AM", "PM"];
    const items = [];

    amPmOptions.forEach((amPm) => {
      items.push({ value: amPm, label: amPm });
    });

    return items;
  };
  // const generateAmPmDropdownItems1 = () => {
  //   const amPmOptions = ['AM', 'PM'];
  //   return amPmOptions.map((amPm) => (
  //     <DropdownItem key={amPm} onClick={() => handleDropdownItemClick5(amPm)}>
  //       {amPm}
  //     </DropdownItem>
  //   ));
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

    // new code start

    // If the current step is Step 1, handle availability check
    if (step.id === "step1") {
      handleCheckAvailability().then((response) => {
        // Log the response to ensure it's correct
        console.log("Response from availability check:", response);

        if (response && response.data && response.data.status) {
          // If the status is true, allow to go to the next step
          handleLicenseNextButtonClick();
          goToNext();
        } else {
          // If the status is false, show an error and do not proceed
          // alert("There is no such slot");
          ToasterComponent("error", [{ message: "Slot is unavailable" }]);
        }
      });
      return; // Prevent further execution until the availability check is done
    }

    // new code ends
    if (steps.length - 1 <= steps.indexOf(step)) {
      if (step.id === "step3") {
        redirectToSessionLists(); // Redirect to the session list
        return;
      }
    }

    if (step.id === "step2") {
      handleNextButtonClick();
      // Call the function to post data when moving to Step 2
    }

    // handleNextButtonClick(); // Call the function to post data when moving to the next step
    handleLicenseNextButtonClick();
    goToNext();
  };

  const onClickPrev = (goToPrev, steps, step) => {
    if (steps.indexOf(step) <= 0) {
      return;
    }
    goToPrev();
  };

  const selectData = generateDropdownItemsSelect();
  const minutesSelectData = generateMinuteDropdownItems();
  const toHoursSelectData = generateDropdownItems1();
  const toMinutesSelectData = generateMinuteDropdownItems1();
  const fromAmPmSelectData = generateAmPmDropdownItems();
  const toAmPmSelectData = generateAmPmDropdownItems1();

  return (
    <Row>
      <Colxx>
        <Card className="mt-2    ">
          <CardBody className="wizard wizard-default  ">
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
                  <Form className=" ">
                    <FormGroup className="">
                      <div className="">
                        <Label className="text-one font-weight-bold">
                          Appointment date
                        </Label>
                        <InputGroup className="mb-3 ">
                          <DateRangePicker
                            selectedDate={selectedDate}
                            setSelectedDate={setSelectedDate}
                          />
                        </InputGroup>
                      </div>
                    </FormGroup>

                    <FormGroup>
                      <div className="">
                        <div>
                          <Label className="text-one font-weight-bold">
                            From
                          </Label>
                          <Row>
                            <Col md={4} sm={12} lg={4}>
                              <div className="form-group has-float-label">
                                <Label>Hours</Label>

                                <Select
                                  components={{ Input: CustomSelectInput }}
                                  className="react-select"
                                  classNamePrefix="react-select"
                                  name="form-field-name"
                                  value={generateDropdownItemsSelect().find(
                                    (option) =>
                                      option.value === selectedHourDropdown
                                  )}
                                  onChange={handleDropdownItemClick}
                                  options={[
                                    {
                                      value: "",
                                      label: "Hours",
                                      isDisabled: true,
                                    },
                                    ...selectData,
                                  ]}
                                />
                              </div>
                            </Col>
                            <Col md={4} sm={12} lg={4}>
                              <div className="form-group has-float-label">
                                <Label>Minutes</Label>

                                <Select
                                  components={{ Input: CustomSelectInput }}
                                  className="react-select"
                                  classNamePrefix="react-select"
                                  name="form-field-name"
                                  value={generateMinuteDropdownItems().find(
                                    (option) => option.value === minutedrop
                                  )}
                                  onChange={handleDropdownItemClick1}
                                  options={[
                                    {
                                      value: "",
                                      label: "Minutes",
                                      isDisabled: true,
                                    },
                                    ...minutesSelectData,
                                  ]}
                                />
                              </div>
                            </Col>
                            <Col md={4} sm={12} lg={4}>
                              <div className="form-group has-float-label">
                                <Label>AM/PM</Label>

                                <Select
                                  components={{ Input: CustomSelectInput }}
                                  className="react-select"
                                  classNamePrefix="react-select"
                                  name="form-field-name"
                                  // value={selectedfromampm}
                                  value={fromAmPmSelectData.find(
                                    (option) =>
                                      option.value === selectedfromampm
                                  )}
                                  onChange={handleDropdownItemClick4}
                                  options={[
                                    {
                                      value: "",
                                      label: "AM/PM",
                                      isDisabled: true,
                                    },
                                    ...fromAmPmSelectData,
                                  ]}
                                />
                              </div>
                              {/* <Dropdown direction="down"
          isOpen={dropdownBasicOpen4}
          toggle={() => setDropdownBasicOpen4(!dropdownBasicOpen4)}
          className="mb-5 "
          
        
        >
        <DropdownToggle caret color="primary" outline className='ml-3'>
        {selectedfromampm !==null ? selectedfromampm : 'AM /PM' }
        <DropdownMenu className=''>
          { generateAmPmDropdownItems ()}
          </DropdownMenu>
        </DropdownToggle>
              
          </Dropdown> */}
                            </Col>
                          </Row>
                          <div className="">
                            {/* <Dropdown direction="down"
        isOpen={dropdownBasicOpen}
        toggle={() => setDropdownBasicOpen(!dropdownBasicOpen)}
        className="mb-5 "
        
      
      >
 



  <DropdownToggle caret color="primary" outline className=''>
    
    
    {selectedHourDropdown !== null ? selectedHourDropdown : 'Hours'} 
   
  </DropdownToggle>
  <DropdownMenu className=''>
  {generateDropdownItems()}
  </DropdownMenu>
</Dropdown> */}

                            {/* <Input
        type="select"
        value={selectedHourDropdown}
        onChange={handleSelectChange}
        style={{width:"80px",height:"40px"}}
        
      >
        <option disabled value="">
          Hours
        </option>
        {generateDropdownItemsSelect()}
      </Input> */}

                            {/* <Dropdown direction='down'
            isOpen={dropdownBasicOpen1}
            toggle={() => setDropdownBasicOpen1(!dropdownBasicOpen1)}
            className="mb-5 ml-3"
           
          >
            <DropdownToggle caret color="primary" outline>
           
              {minutedrop !== null ? minutedrop : 'Minutes'} 
   
            </DropdownToggle>
            <DropdownMenu >
             {generateMinuteDropdownItems()}
            </DropdownMenu>
          </Dropdown> */}

                            {/* form minutes select start */}

                            {/* form minutes select end */}
                          </div>
                        </div>

                        <div className="">
                          <Label className="text-one font-weight-bold">
                            To
                          </Label>
                          <div className="">
                            <Row>
                              <Col md={4} lg={4} sm={12}>
                                {/* <Dropdown direction="down"
        isOpen={dropdownBasicOpen2}
        toggle={() => setDropdownBasicOpen2(!dropdownBasicOpen2)}
        className="mb-5"
        
      
      >

        <DropdownToggle caret color="primary" outline className='' >
          
          
          {selectedHourDropdown1 !== null ? selectedHourDropdown1 : 'Hours'} 
        </DropdownToggle>
        <DropdownMenu className=''>
        {generateDropdownItems1()}
        </DropdownMenu>
      </Dropdown> */}
                                <div className="form-group has-float-label">
                                  <Label>Hours</Label>

                                  <Select
                                    components={{ Input: CustomSelectInput }}
                                    className="react-select"
                                    classNamePrefix="react-select"
                                    name="form-field-name"
                                    value={generateDropdownItems1().find(
                                      (option) =>
                                        option.value === selectedHourDropdown1
                                    )}
                                    onChange={handleDropdownItemClick2}
                                    options={[
                                      {
                                        value: "",
                                        label: "Hours",
                                        isDisabled: true,
                                      },
                                      ...toHoursSelectData,
                                    ]}
                                  />
                                </div>
                              </Col>
                              <Col md={4} lg={4} sm={12}>
                                <div className="form-group has-float-label">
                                  <Label>Minutes</Label>

                                  <Select
                                    components={{ Input: CustomSelectInput }}
                                    className="react-select"
                                    classNamePrefix="react-select"
                                    name="form-field-name"
                                    value={generateMinuteDropdownItems1().find(
                                      (option) =>
                                        option.value === selectedHourDropdown1
                                    )}
                                    onChange={handleDropdownItemClick3}
                                    options={[
                                      {
                                        value: "",
                                        label: "Minutes",
                                        isDisabled: true,
                                      },
                                      ...toMinutesSelectData,
                                    ]}
                                  />
                                </div>
                              </Col>
                              <Col md={4} lg={4} sm={12}>
                                <div>
                                  {/* <Dropdown direction="down"
        isOpen={dropdownBasicOpen5}
        toggle={() => setDropdownBasicOpen5(!dropdownBasicOpen5)}
        className="mb-5 "
        
      
      >
      <DropdownToggle caret color="primary" outline className='ml-3'>
      {selectedfromampm1 !==null ? selectedfromampm1 : 'AM /PM' }
      <DropdownMenu className=''>
        { generateAmPmDropdownItems1 ()}
        </DropdownMenu>
      </DropdownToggle>
            
        </Dropdown> */}
                                  <div className="form-group has-float-label">
                                    <Label>AM/PM</Label>

                                    <Select
                                      components={{ Input: CustomSelectInput }}
                                      className="react-select"
                                      classNamePrefix="react-select"
                                      name="form-field-name"
                                      // value={selectedfromampm}
                                      value={toAmPmSelectData.find(
                                        (option) =>
                                          option.value === selectedfromampm1
                                      )}
                                      onChange={handleDropdownItemClick5}
                                      options={[
                                        {
                                          value: "",
                                          label: "AM/PM",
                                          isDisabled: true,
                                        },
                                        ...toAmPmSelectData,
                                      ]}
                                    />
                                  </div>
                                </div>
                              </Col>
                            </Row>

                            {/* <Dropdown direction='down'
            isOpen={dropdownBasicOpen3}
            toggle={() => setDropdownBasicOpen3(!dropdownBasicOpen3)}
            className="mb-5 ml-3"
           
          >
            <DropdownToggle caret color="primary" outline>
           
              {minutedrop1 !== null ? minutedrop1 : 'Minutes'} 
   
            </DropdownToggle>
            <DropdownMenu >
             {generateMinuteDropdownItems1()}
            </DropdownMenu>
          </Dropdown> */}
                          </div>
                        </div>
                      </div>
                    </FormGroup>

                    <Form>
                      <FormGroup>
                        <Label className="text-one font-weight-bold">
                          Call type
                        </Label>
                        <div className="d-flex ">
                          <CustomInput
                            type="radio"
                            id="exCustomRadio"
                            name="customRadio"
                            label="Audio"
                            value={selectedradiobutton}
                            onChange={() => setSelectedRadioButton("Audio")}
                          />
                          <CustomInput
                            type="radio"
                            id="exCustomRadio2"
                            name="customRadio"
                            label="Video"
                            className="ml-3"
                            value={selectedradiobutton}
                            onChange={() => setSelectedRadioButton("Video")}
                          />
                        </div>
                      </FormGroup>
                    </Form>
                  </Form>
                </Step>
                <Step
                  id="step2"
                  // name={messages['wizard.step-name-2']}
                  name="step 2"
                  desc="Payment"
                >
                  <Form className="">
                    {license && (
                      <>
                        {license.balance ? (
                          <>
                            <FormGroup className="w-100">
                              <div className="d-flex justify-content-between align-items-center">
                                <Label className="text-one">
                                  Session Price
                                </Label>
                                <Colxx lg={5} className="">
                                  <h3 className="">
                                    <span className="font-weight-bold color-theme-1">
                                      ₹{license.sessionPrice}
                                    </span>
                                  </h3>
                                </Colxx>
                              </div>
                            </FormGroup>
                            <FormGroup className="w-100">
                              <div className="d-flex justify-content-between align-items-center">
                                <Label className="text-one">
                                  Your Available Balance
                                </Label>
                                <Colxx lg={5}>
                                  <h3 className="">
                                    <span className="font-weight-bold color-theme-1">
                                      ₹{license.availableBalance}
                                    </span>
                                  </h3>
                                </Colxx>
                              </div>
                            </FormGroup>
                            <FormGroup className="w-100">
                              <div className="d-flex justify-content-between align-items-center">
                                <Label className="text-one">
                                  Balance after deduction
                                </Label>
                                <Colxx lg={5}>
                                  <h3 className="">
                                    <span className="font-weight-bold color-theme-1">
                                      ₹{license.balanceAfterDeducation}
                                    </span>
                                  </h3>
                                </Colxx>
                              </div>
                            </FormGroup>
                          </>
                        ) : (
                          <>
                            <FormGroup className="w-100">
                              <div className="d-flex justify-content-between align-items-center">
                                <Label className="text-one">
                                  Session Price
                                </Label>
                                <Colxx lg={5}>
                                  <h3>
                                    <span className="font-weight-bold color-theme-1">
                                      ₹{license.sessionPrice}
                                    </span>
                                  </h3>
                                </Colxx>
                              </div>
                            </FormGroup>
                            <FormGroup className="w-100">
                              <div className="d-flex justify-content-between align-items-center">
                                <Label className="text-one">
                                  Your Available Balance
                                </Label>
                                <Colxx lg={5}>
                                  <h3>
                                    <span className="font-weight-bold color-theme-1">
                                      ₹{license.availableBalance}
                                    </span>
                                  </h3>
                                </Colxx>
                              </div>
                            </FormGroup>
                            <FormGroup className="w-100">
                              <div className="d-flex justify-content-between align-items-center">
                                <Label className="text-one">
                                  Do you want to recharge ?
                                </Label>
                              </div>
                              <Colxx lg={12}>
                                <div className="d-flex">
                                  <Button
                                    outline
                                    color="primary"
                                    onClick={() =>
                                      history.push("/app/mywallet")
                                    }
                                  >
                                    Yes
                                  </Button>
                                  <Button
                                    outline
                                    color="primary"
                                    className="ml-3"
                                    onClick={() =>
                                      history.push("/app/mentor/list")
                                    }
                                  >
                                    No
                                  </Button>
                                </div>
                              </Colxx>
                            </FormGroup>
                          </>
                        )}
                      </>
                    )}
                  </Form>
                </Step>
                <Step
                  id="step3"
                  // name={messages['wizard.step-name-3']}
                  name="step 3"
                  desc="Finish"
                >
                  <div className="text-center ">
                    <span className="text-xlarge text-primary">
                      <i className="simple-icon-check" />
                    </span>
                    <h3 className=" my-3 py-3 ">
                      Your appointment is successfull
                    </h3>
                    <h2 className=" my-3">Thank you</h2>

                    <div className="text-center my-2">
                      {/* <Button color='primary' className="btn btn-primary " onClick={handleCloseButtonClick}> */}
                      <Button
                        color="primary"
                        className="btn btn-primary "
                        onClick={redirectToSessionLists}
                      >
                        Close
                      </Button>
                    </div>
                  </div>
                </Step>
              </Steps>

              <Form className="mt-4">
                <FormGroup>
                  <BottomNavigation
                    onClickNext={onClickNext}
                    onClickPrev={onClickPrev}
                    className="justify-content-center"
                    prevLabel="Back"
                    nextLabel="Next"
                    // licenseBalance={license.length > 0 ? license[0].balance : null}
                    licenseBalance={license && license.balance}
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
