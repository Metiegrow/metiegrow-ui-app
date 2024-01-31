import { Colxx } from 'components/common/CustomBootstrap';
import React, {useState} from 'react';
// import { Button } from 'reactstrap';
import {

  Dropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
  Button
} from 'reactstrap';


const EventModal = ({ onClose, clickedRowPosition }) => {
  const [title,setTitle]=useState("");
  const [description,setDescription]=useState("");
  const [dropdownBasicOpen, setDropdownBasicOpen] = useState(false);
  const [dropdownBasicOpen1, setDropdownBasicOpen1] = useState(false);


  
  // const end = 24;
  // const dropdown = [];
  // for (let drop = start; drop <= end; drop+=1) {
  //   dropdown.push(drop);
  // }
  
  // const startHour = 0;
  // const endHour = 23;
  

  
  // const dropdownHour = [];
  // for (let drop = startHour; drop <= endHour; drop+=1) {
  //   dropdownHour.push(drop);
  // }
  const handleDropdownItemClick = (selectedHour) => {
    // Handle the selected hour as needed
    console.log(`Selected hour: ${selectedHour}`);
  };

  const generateDropdownItems = () => {
    const items = [];
    for (let i = 1; i <= 12; i+=1) {
      const formattedHour = i < 10 ? `0${i}` : i;
      items.push(
        <DropdownItem key={i} onClick={() => handleDropdownItemClick(i)}>
          {formattedHour}
        </DropdownItem>
      );
    }
    return items;
  };
 
  return (
    <div  style={{ position: 'absolute', top: clickedRowPosition.top, left: clickedRowPosition.left }}>
    <Colxx xxs='12'>
    <div className=''>
    {/* <div className='select'>
      <select  className='menu' >
        {dropdown.map((hour) => (
          <option key={hour} value={hour} > 
            {hour}
          </option>
        ))}
      </select>
    </div> */}
 
        <form className='bg-white rounded-lg shadow-2xl w-1/4 p-2 '  >
        <Button onClick={onClose}><i className='simple-icon-close'/></Button>
        <div>
        <input type="text"  placeholder='Add a title' className='py-3 ml-3 border-top-0
         border-left-0 border-right-0 my-2 text-one   w-80 shadow-none'
           required value={title} onChange={(e) => setTitle(e.target.value)}/>
        </div>
          
           <div className='d-flex my-3 '>
            <span className='text-one'><i className='simple-icon-calendar'/></span>
            <p className='text-one ml-2'>Feb 01,2024</p>
           </div>
           <div className='d-flex my-3 '>
            <div className='ml-2 '>
        {/* <Dropdown
                isOpen={dropdownBasicOpen}
                toggle={() => setDropdownBasicOpen(!dropdownBasicOpen)}
                className="mb-5"
              >
                <DropdownToggle caret color="secondary" outline>
                  Hours
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem>
                   1
                  </DropdownItem>
                  <DropdownItem >
                   2
                  </DropdownItem>
                  <DropdownItem>
                    3
                  </DropdownItem>
                
                </DropdownMenu>
              </Dropdown> */}
              <Dropdown direction="down"
      isOpen={dropdownBasicOpen}
      toggle={() => setDropdownBasicOpen(!dropdownBasicOpen)}
      className="mb-5 "
     
    >
      <DropdownToggle caret color="secondary" outline className=''>
        Hours
      </DropdownToggle>
      <DropdownMenu className=''>
      {generateDropdownItems()}
      </DropdownMenu>
    </Dropdown>
        </div>
        <div className='ml-2'>
        <Dropdown
                isOpen={dropdownBasicOpen1}
                toggle={() => setDropdownBasicOpen1(!dropdownBasicOpen1)}
                className="mb-5"
              >
                <DropdownToggle caret color="secondary" outline>
                  Minutes
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem>
                   1
                  </DropdownItem>
                  <DropdownItem >
                   2
                  </DropdownItem>
                  <DropdownItem>
                    3
                  </DropdownItem>
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
          <Button type='submit'  className="bg-primary  px-6 py-2 ">
            Save
          </Button>
        </footer>
        </form>
      </div>
    </Colxx>
      
    </div>
  );
}

export default EventModal;
