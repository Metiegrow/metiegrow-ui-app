import { Colxx } from 'components/common/CustomBootstrap';
import React,{useState} from 'react';
import {   
  
       CustomInput,  
       Dropdown, DropdownItem, DropdownMenu, DropdownToggle,      FormGroup,     Label,     Row,  } from 'reactstrap';
import SliderExamples from './SliderExamples';
import MoreFilter from './MoreFilter';
// import SearchBar from './SearchBar';


const MentorDropDown = () => {
    const [dropdownBasicOpen, setDropdownBasicOpen] = useState(false);
    const [dropdownBasicOpen1, setDropdownBasicOpen1] = useState(false);
    const [dropdownBasicOpen2, setDropdownBasicOpen2] = useState(false);
    const [dropdownBasicOpen3, setDropdownBasicOpen3] = useState(false);
    const [dropdownBasicOpen4, setDropdownBasicOpen4] = useState(false);
 
  return (
    <div>
         <Row className="mb-4">
        <Colxx xxs="12" sm="12" md="12" lg="12"  className=' '>
          {/* <Card className=''>
        
            <CardBody className='d-flex flex-wrap'>
            
            <FormGroup>
       
      
      </FormGroup>
              <Dropdown
                isOpen={dropdownBasicOpen}
                toggle={() => setDropdownBasicOpen(!dropdownBasicOpen)}
                className="mb-5 mx-2"
              >
                <DropdownToggle caret color="secondary" outline>
                
                  Skills
                </DropdownToggle>
                <DropdownMenu>
             
                  <DropdownItem>
                   <span>Designer</span>
                  </DropdownItem>
                  <DropdownItem>
                   <span>Developer</span>
                  </DropdownItem>
                  <DropdownItem>
                   <span>Product Marketer</span>
                  </DropdownItem>
                
                </DropdownMenu>
              
              </Dropdown>

              <Dropdown
                isOpen={dropdownBasicOpen1}
                toggle={() => setDropdownBasicOpen1(!dropdownBasicOpen1)}
                className="mb-5 mx-2"
              >
                <DropdownToggle caret color="secondary" outline>
               
                  Tools
                </DropdownToggle>
                <DropdownMenu>
             
                  <DropdownItem>
                   <span>HTML</span>
                  </DropdownItem>
                  <DropdownItem>
                   <span>CSS</span>
                  </DropdownItem>
                  <DropdownItem>
                   <span>JS</span>
                  </DropdownItem>
                
                </DropdownMenu>
              
              </Dropdown>
              <Dropdown
                isOpen={dropdownBasicOpen2}
                toggle={() => setDropdownBasicOpen2(!dropdownBasicOpen2)}
                className="mb-5 mx-2"
              >
                <DropdownToggle caret color="secondary" outline>
                
                  Industry
                </DropdownToggle>
                <DropdownMenu className=''>
             
                 
                  <FormGroup className='d-flex   ' >
                  <CustomInput
            type="checkbox"
            id=""
            
          />
          <Label>Startup</Label>
                  </FormGroup>
                 
                
                </DropdownMenu>
              
              </Dropdown>
              <Dropdown
                isOpen={dropdownBasicOpen3}
                toggle={() => setDropdownBasicOpen3(!dropdownBasicOpen3)}
                className="mb-5 mx-2"
              >
                <DropdownToggle caret color="secondary" outline>
                 
                  Price
                </DropdownToggle>
                <DropdownMenu>
             
                <DropdownItem>
                   <SliderExamples/>
                </DropdownItem>
                
                </DropdownMenu>
              
              </Dropdown>
            </CardBody>
          </Card> */}
          <div className=''>
          {/* <SearchBar/> */}
            <div className='d-flex flex-wrap  my-3'>
            
            {/* <FormGroup>
       
        <div>
          <CustomInput
            type="checkbox"
            id="exCustomCheckbox"
            label="Check this custom checkbox"
          />
          <CustomInput
            type="checkbox"
            id="exCustomCheckbox2"
            label="Or this one"
          />
          <CustomInput
            type="checkbox"
            id="exCustomCheckbox3"
            label="But not this disabled one"
            disabled
          />
        </div>
      </FormGroup> */}
              <Dropdown
                isOpen={dropdownBasicOpen}
                toggle={() => setDropdownBasicOpen(!dropdownBasicOpen)}
                className="mb-5 mx-2"
              >
                <DropdownToggle caret color="secondary" outline>
                  
                  Skills
                </DropdownToggle>
                <DropdownMenu>
             
                  <DropdownItem>
                   <span>Designer</span>
                  </DropdownItem>
                  <DropdownItem>
                   <span>Developer</span>
                  </DropdownItem>
                  <DropdownItem>
                   <span>Product Marketer</span>
                  </DropdownItem>
                
                </DropdownMenu>
              
              </Dropdown>

              <Dropdown
                isOpen={dropdownBasicOpen1}
                toggle={() => setDropdownBasicOpen1(!dropdownBasicOpen1)}
                className="mb-5 mx-2"
              >
                <DropdownToggle caret color="secondary" outline>
                  {/* <IntlMessages id="dropdowns.dropdown" /> */}
                  Tools
                </DropdownToggle>
                <DropdownMenu>
             
                  <DropdownItem>
                   <span>HTML</span>
                  </DropdownItem>
                  <DropdownItem>
                   <span>CSS</span>
                  </DropdownItem>
                  <DropdownItem>
                   <span>JS</span>
                  </DropdownItem>
                
                </DropdownMenu>
              
              </Dropdown>
              <Dropdown
                isOpen={dropdownBasicOpen2}
                toggle={() => setDropdownBasicOpen2(!dropdownBasicOpen2)}
                className="mb-5 mx-2"
              >
                <DropdownToggle caret color="secondary" outline>
                
                  Industry
                </DropdownToggle>
                <DropdownMenu className=''>
             
                 
                  <FormGroup className='d-flex   ' >
                  <CustomInput
            type="checkbox"
            id=""
            
          />
          <Label>Startup</Label>
                  </FormGroup>
                 
                
                </DropdownMenu>
              
              </Dropdown>
              <Dropdown
                isOpen={dropdownBasicOpen3}
                toggle={() => setDropdownBasicOpen3(!dropdownBasicOpen3)}
                className="mb-5 mx-2"
              >
                <DropdownToggle caret color="secondary" outline>
                  {/* <IntlMessages id="dropdowns.dropdown" /> */}
                  Price
                </DropdownToggle>
                <DropdownMenu>
             
                <DropdownItem>
                   <SliderExamples/>
                </DropdownItem>
                
                </DropdownMenu>
              
              </Dropdown>
              <Dropdown
                isOpen={dropdownBasicOpen4}
                toggle={() => setDropdownBasicOpen4(!dropdownBasicOpen4)}
                className="mb-5 mx-2"
              >
                <DropdownToggle caret color="secondary" outline>
                  {/* <IntlMessages id="dropdowns.dropdown" /> */}
                  More Filters
                </DropdownToggle>
                <DropdownMenu>
             
                <DropdownItem>
                 <MoreFilter/>
                </DropdownItem>
                
                </DropdownMenu>
              
              </Dropdown>
            </div>
          </div>
        </Colxx>
      </Row>
    </div>
  );
}

export default MentorDropDown;
