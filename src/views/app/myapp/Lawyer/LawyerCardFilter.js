import { Colxx } from "components/common/CustomBootstrap";
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
import { RangeTooltip } from "components/common/SliderTooltips";
import PerfectScrollbar from 'react-perfect-scrollbar';
import country from "../my-login/Country";
import language from "../my-login/Languages";

const LawyerCardFilter = ({
  onTopicsChange,
  onPriceChange,
  onLocationChange,
  onLanguageChange,
  selectedTopics,
  selectedLocation,
  selectedLanguage,
}) => {
  const [dropdownBasicOpen, setDropdownBasicOpen] = useState(false);
  const [dropdownBasicOpen1, setDropdownBasicOpen1] = useState(false);
  const [dropdownBasicOpen2, setDropdownBasicOpen2] = useState(false);
  const [dropdownBasicOpen3, setDropdownBasicOpen3] = useState(false);
  const [priceRange,setPriceRange] = useState([800, 1200]);


  const topics = [
    "Visas",
    "Immigration",
    "Accreditation",
    "Rights",
    "Employment",
    "Work-permits",
    "Housing",
    "Intellectual-property",
    "Dependents",
    "Healthcare"
  ]

  const handleTopicsSelect = (topic) => {
    onTopicsChange(topic);
  };
  const handleLanguageSelect = (lang) => {
    onLanguageChange(lang);
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
  const [filteredLanguage, setFilteredLanguage] = useState(language);
  const [searchLanguage, setSearchLanguage] = useState('');
  const [filteredTopics, setFilteredTopics] = useState(topics);
  const [searchTopics, setSearchTopics] = useState('');

  const handleSearchChange = (event) => {
    const newText = event.target.value.toLowerCase();
    setSearchText(newText);
    setFilteredCountry(country.filter((c) => c.name.toLowerCase().includes(newText)));
  };

  const handleSearchLanguage = (event) => {
    const newText = event.target.value.toLowerCase();
    setSearchLanguage(newText);
    setFilteredLanguage(language.filter((s) => s.name.toLowerCase().includes(newText)));
  };
  const handleSearchTopics = (event) => {
    const newText = event.target.value.toLowerCase();
    setSearchTopics(newText);
    setFilteredTopics(topics.filter((t) => t.toLowerCase().includes(newText)));
  };

  return (
    <div>
      <Row className="mb-4">
        <Colxx xxs="12" sm="12" md="12" lg="12" className=" ">
          <div className="">
            <div className="d-flex flex-wrap  my-3">
              <Dropdown
                isOpen={dropdownBasicOpen}
                toggle={() => setDropdownBasicOpen(!dropdownBasicOpen)}
                className="mb-5 mx-2"
              >
                <DropdownToggle caret color="primary" outline>
                  Topics
                </DropdownToggle>
                <DropdownMenu>
                    <div className="search-sm mr-1 ml-1 mb-1 align-top">
                    <input
                      type="text"
                      className="form-control "
                      placeholder="Search topic"
                      value={searchTopics}
                      onChange={handleSearchTopics}
                    />
                  </div>
                  <PerfectScrollbar style={{ maxHeight: '200px' }}>
                  {selectedTopics[0] &&  <DropdownItem onClick={() => handleTopicsSelect("")}>
                    <span>{selectedTopics}</span><i className="iconsminds-close" />
                  </DropdownItem>}
                  {filteredTopics.map((t) => (
                      <DropdownItem key={t} onClick={() => handleTopicsSelect(t)}>
                        {t}
                      </DropdownItem>
                    ))}
                 </PerfectScrollbar>
                </DropdownMenu>
              </Dropdown>

              <Dropdown
                isOpen={dropdownBasicOpen1}
                toggle={() => setDropdownBasicOpen1(!dropdownBasicOpen1)}
                className="mb-5 mx-2"
              >
                <DropdownToggle caret color="primary" outline>
                 Languages
                </DropdownToggle>
                <DropdownMenu>
                <div className="search-sm mr-1 ml-1 mb-1 align-top">
                    <input
                      type="text"
                      className="form-control "
                      placeholder="Search language"
                      value={searchLanguage}
                      onChange={handleSearchLanguage}
                    />
                  </div>
                  <PerfectScrollbar style={{ maxHeight: '200px' }}>
                 {selectedLanguage[0] &&  <DropdownItem onClick={() => handleLanguageSelect("")}>
                    <span>{language.find(c => c.iso_code === selectedLanguage)?.name}</span><i className="iconsminds-close" />
                  </DropdownItem>}
                  {filteredLanguage.map((l) => (
                  <DropdownItem key={l.iso_code} onClick={() => handleLanguageSelect(l.iso_code)}>
                    <span>{l.name}</span>
                  </DropdownItem>

                  ))}
                  </PerfectScrollbar>
                </DropdownMenu>
              </Dropdown>
              <Dropdown
                isOpen={dropdownBasicOpen2}
                toggle={() => setDropdownBasicOpen2(!dropdownBasicOpen2)}
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
                isOpen={dropdownBasicOpen3}
                toggle={() => setDropdownBasicOpen3(!dropdownBasicOpen3)}
                className="mb-5 mx-2"
              >
                <DropdownToggle caret color="primary" outline>
                 {selectedLocation ? (country.find(c => c.iso_code === selectedLocation)?.name) : ( <span>Location</span> )}
                </DropdownToggle>
               
                 <DropdownMenu>
                 
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
                  {selectedLocation &&  <DropdownItem onClick={() => handleLocationSelect("")}>
                    <span>{country.find(c => c.iso_code === selectedLocation)?.name}</span><i className="iconsminds-close" />
                  </DropdownItem>}
                    {filteredCountry.map((c) => (
                      <DropdownItem key={c.iso_code} onClick={() => handleLocationSelect(c.iso_code)}>
                        {c.name}
                      </DropdownItem>
                    ))}
                  </PerfectScrollbar>
                </DropdownMenu>
              </Dropdown>
              
              {/* <Dropdown
                isOpen={dropdownBasicOpen4}
                toggle={() => setDropdownBasicOpen4(!dropdownBasicOpen4)}
                className="mb-5 mx-2"
              >
                <DropdownToggle caret color="secondary" outline>
                  More Filters
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem>
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown> */}
            </div>
          </div>
        </Colxx>
      </Row>
    </div>
  );
};

export default LawyerCardFilter;
