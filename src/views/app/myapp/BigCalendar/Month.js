import { Colxx } from 'components/common/CustomBootstrap';
import React,{useState} from 'react';
import {  Button, Card, CardBody, Modal, ModalBody, Table ,
  Dropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu} from 'reactstrap';
// import EventModal from './EventModal';
import DatePicker from './DatePicker';


const Month = () => {
 

  // const [isModalOpen, setModalOpen] = useState(false);
  // const [clickedRowPosition, setClickedRowPosition] = useState({ top: 0, left: 0 });
  const [modalSmall, setModalSmall] = useState(false);
  const [selectedHourDropdown, setSelectedHourDropdown] = useState(null); // Renamed state variable

  const [minutedrop,setMinuteDrop]=useState(null)



  const [title,setTitle]=useState("");
  const [description,setDescription]=useState("");
  const [dropdownBasicOpen, setDropdownBasicOpen] = useState(false);
  const [dropdownBasicOpen1, setDropdownBasicOpen1] = useState(false);
  const [savedEntries, setSavedEntries] = useState([]);
  

 

  const handleDropdownItemClick = (selectedHour) => {
    // Handle the selected hour as needed
    console.log(`Selected hour: ${selectedHour}`);
    setSelectedHourDropdown(selectedHour); 
  };
  const handleDropdownItemClick1 = (selectedMinute) => {
    // Handle the selected minutes as needed
    console.log(`Selected minute: ${selectedMinute}`);
    setMinuteDrop(selectedMinute); 
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
 
  // const handleRowClick = (event) => {
  //   const rect = event.currentTarget.getBoundingClientRect();
  //   setClickedRowPosition({ top: rect.top + window.scrollY, left: rect.left + window.scrollX });
  //   setModalOpen(true);
    
  // }
  

  const handleSave = () => {
    // Create a new entry object with the current form values
    const newEntry = {
      title,
      description,
      selectedHour: selectedHourDropdown,
      selectedMinute:minutedrop

      // Add other properties as needed
    }
      // Update the state with the new entry
    setSavedEntries([...savedEntries, newEntry]);

    // Clear the form fields after saving
    setTitle('');
    setDescription('');
    setSelectedHourDropdown(null); // Reset the selected hour state
    setMinuteDrop(null)
    // Reset other form fields as needed
     // Close the modal
  setModalSmall(false);
    
  }
  
  return (
    <div>
     

    
    <Colxx xxs="6" className='mx-auto'>
   

    <h2>Mentor availability</h2>
    <div className='font-weight-semibold d-flex justify-content-between'>
      <span className='font-weight-semibold text-one'><i className='simple-icon-arrow-left'/></span>
      <span className='ml-5 font-weight-semibold text-one' ><i className='simple-icon-arrow-right '/></span>
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
                  {/* <tr onClick={(event) => handleRowClick(event)}> */}
                  <tr  onClick={() => setModalSmall(true)}>
                    
                    <td>Feb 01,2024</td>
                    <td>10pm to 12pm</td>
                    
                    
                  </tr>
                  <tr  onClick={() => setModalSmall(true)}>
                    
                    <td>Feb 02,2024</td>
                    <td>7pm to 12pm </td>
                    
                     
                  </tr>
                  {savedEntries.map((entry) => (
            <tr key={entry.title} >
              <td>{entry.title}</td>
              <td>{entry.description}</td>
              <td>hour:{entry.selectedHour}</td>
            <td>min:{entry.selectedMinute}</td>
              {/* Render other properties as needed */}
            </tr>
          ))}
                  <tr  onClick={() => setModalSmall(true)}>
                    
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
                  </tr>
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
            <DatePicker />
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
           <div className='d-flex align-items-center justify-content-start'>
            <span><i className='iconsminds-align-left'/></span>
            <input type="text"  placeholder='Add a description' className='py-3 ml-2 border-top-0 border-left-0
             border-right-0 focus-none text-one   w-80 shadow-none'
           required value={description} onChange={(e) => setDescription(e.target.value)}/>
           </div>
           <footer className="d-flex justify-content-end border-t p-3 mt-5">
          <Button type='submit'  className="bg-primary  px-6 py-2 " onClick={handleSave}>
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
        </Colxx>
    </div>
  );
}

export default Month;
