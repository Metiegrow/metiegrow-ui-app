import { Colxx } from "components/common/CustomBootstrap";
import { RangeTooltip } from "components/common/SliderTooltips";
import React, { useState } from "react";
import 'react-perfect-scrollbar/dist/css/styles.css';
import {
  // CustomInput,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  // FormGroup,
  // Label,
  Row,
} from "reactstrap";
import PerfectScrollbar from 'react-perfect-scrollbar';
import country from "../my-login/Country";

const MentorFilter = ({
  onSkillsChange,
  onToolsChange,
  onIndustryChange,
  onPriceChange,
  onLocationChange,
}) => {
  const [dropdownBasicOpen, setDropdownBasicOpen] = useState(false);
  const [dropdownBasicOpen1, setDropdownBasicOpen1] = useState(false);
  const [dropdownBasicOpen2, setDropdownBasicOpen2] = useState(false);
  const [dropdownBasicOpen3, setDropdownBasicOpen3] = useState(false);
  const [dropdownBasicOpen4, setDropdownBasicOpen4] = useState(false);
  const [priceRange,setPriceRange] = useState([800, 1200])

  const handleSkillSelect = (skill) => {
    onSkillsChange(skill);
  };

  const handleToolSelect = (tool) => {
    onToolsChange([tool]);
  };

  const handleIndustrySelect = (industry) => {
    onIndustryChange(industry);
  };

  const handleLocationSelect = (location) => {
    onLocationChange(location);
  };

  const handleSliderChange = ( value) => {
    onPriceChange([value]);
    setPriceRange(value);
    // console.log("priceChange",value)
   
  };

  const [searchText, setSearchText] = useState('');
  const [filteredCountry, setFilteredCountry] = useState(country);

  const handleSearchChange = (event) => {
    const newText = event.target.value.toLowerCase();
    setSearchText(newText);
    setFilteredCountry(country.filter((c) => c.name.toLowerCase().includes(newText)));
  };

  return (
    <div>
      <Row className="mb-4">
        <Colxx xxs="12" sm="12" md="12" lg="12" className=" ">
          <div className="">
            <div className="d-flex flex-wrap my-3">
              <Dropdown
                isOpen={dropdownBasicOpen}
                toggle={() => setDropdownBasicOpen(!dropdownBasicOpen)}
                className="mb-5 mx-2"
              >
                <DropdownToggle caret color="primary" outline>
                  Skills
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem onClick={() => handleSkillSelect("HTML")}>
                    <span>HTML</span>
                  </DropdownItem>
                  <DropdownItem onClick={() => handleSkillSelect("CSS")}>
                    <span>CSS</span>
                  </DropdownItem>
                  <DropdownItem onClick={() => handleSkillSelect("Java")}>
                    <span>Java</span>
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>

              <Dropdown
                isOpen={dropdownBasicOpen1}
                toggle={() => setDropdownBasicOpen1(!dropdownBasicOpen1)}
                className="mb-5 mx-2"
              >
                <DropdownToggle caret color="primary" outline>
                  Tools
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem onClick={() => handleToolSelect("Git")}>
                    <span>Git</span>
                  </DropdownItem>
                  <DropdownItem onClick={() => handleToolSelect("VS Code")}>
                    <span>VS Code</span>
                  </DropdownItem>
                  <DropdownItem onClick={() => handleToolSelect("Postman")}>
                    <span>Postman</span>
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>

              <Dropdown
                isOpen={dropdownBasicOpen2}
                toggle={() => setDropdownBasicOpen2(!dropdownBasicOpen2)}
                className="mb-5 mx-2"
              >
                <DropdownToggle caret color="primary" outline>
                  Companies
                </DropdownToggle>
                <DropdownMenu className="">
                  {/* <FormGroup className="d-flex">
                    <CustomInput type="checkbox" id="" />
                    <Label onClick={() => handleIndustrySelect("Amazon")}>
                      Amazon
                    </Label>
                  </FormGroup> */}

                  <DropdownItem onClick={() => handleIndustrySelect("Amazon")}>
                    <span>Amazon</span>
                  </DropdownItem>
                  <DropdownItem onClick={() => handleIndustrySelect("TCS")}>
                    <span>TCS</span>
                  </DropdownItem>
                 
                </DropdownMenu>
              </Dropdown>
              

              <Dropdown
                isOpen={dropdownBasicOpen3}
                toggle={() => setDropdownBasicOpen3(!dropdownBasicOpen3)}
                className="mb-5 mx-2"
              >
                <DropdownToggle caret color="primary" outline>
                  Price
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem>
                    {/* <SliderExamples onChange={onPriceChange} /> */}
                    <Row>
                      <Colxx xxs="12" sm="12">
                        <RangeTooltip
                          min={500}
                          max={1500}
                          className="mb-5"
                          defaultValue={[800, 1200]}
                          allowCross={false}
                          pushable={100}
                          value={priceRange}
                          onChange={handleSliderChange}
                        />
                      </Colxx>
                    </Row>
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>

              <Dropdown
                isOpen={dropdownBasicOpen4}
                toggle={() => setDropdownBasicOpen4(!dropdownBasicOpen4)}
                className="mb-5 mx-2"
              >
                <DropdownToggle caret color="primary" outline>
                  Location
                </DropdownToggle>
                {/* <DropdownMenu
                  style={{
                    maxHeight: '200px',
                    overflowY: 'auto'
                  }}
                > */}
                {/* <DropdownMenu>
                  <PerfectScrollbar style={{ maxHeight: '200px' }}>
                    {country.map((c) => (
                      <DropdownItem key={c.iso_code} onClick={() => handleLocationSelect(c.iso_code)}>
                        {c.name}
                      </DropdownItem>
                    ))}
                  </PerfectScrollbar>
                </DropdownMenu> */}
                 <DropdownMenu>
                  {/* <input
                    type="text"
                    className="form-control mb-2"
                    placeholder="Search Country"
                    value={searchText}
                    onChange={handleSearchChange}
                  /> */}
                  <div className="search-sm mr-1 ml-1 mb-1 align-top">
                    <input
                      type="text"
                      className="form-control "
                      placeholder="Search Country"
                      value={searchText}
                      onChange={handleSearchChange}
                    />
                  </div>
                  <PerfectScrollbar style={{ maxHeight: '200px' }}>
                    {filteredCountry.map((c) => (
                      <DropdownItem key={c.iso_code} onClick={() => handleLocationSelect(c.iso_code)}>
                        {c.name}
                      </DropdownItem>
                    ))}
                  </PerfectScrollbar>
                </DropdownMenu>
              </Dropdown>
            </div>
          </div>
        </Colxx>
      </Row>
    </div>
  );
};

export default MentorFilter;
