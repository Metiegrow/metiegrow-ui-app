import { Colxx } from "components/common/CustomBootstrap";
import { RangeTooltip } from "components/common/SliderTooltips";
import React, { useEffect, useState } from "react";
import 'react-perfect-scrollbar/dist/css/styles.css';
import {
  Button,
  Card,
  // CustomInput,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  // FormGroup,
  // Label,
  Row,
} from "reactstrap";
import axios from "axios";
import { baseUrl } from "constants/defaultValues";
import PerfectScrollbar from 'react-perfect-scrollbar';
import country from "../my-login/Country";

const MentorFilter = ({
  onSkillsChange,
  onToolsChange,
  onIndustryChange,
  onPriceChange,
  onLocationChange,
  selectedSkills,
  selectedLocation,
  selectedIndustry,
  selectedTools,
}) => {
  const [dropdownBasicOpen, setDropdownBasicOpen] = useState(false);
  const [dropdownBasicOpen1, setDropdownBasicOpen1] = useState(false);
  const [dropdownBasicOpen2, setDropdownBasicOpen2] = useState(false);
  const [dropdownBasicOpen3, setDropdownBasicOpen3] = useState(false);
  const [dropdownBasicOpen4, setDropdownBasicOpen4] = useState(false);
  const [priceRange,setPriceRange] = useState([500, 15000]);

  const searchUrl = `${baseUrl}/api/mentor/search/skills`

  const handleSkillSelect = (skill) => {
    onSkillsChange(skill);
  };

  const handleToolSelect = (tool) => {
    onToolsChange(tool);
  };

  const handleIndustrySelect = (industry) => {
    onIndustryChange(industry);
  };

  const handleLocationSelect = (location) => {
    onLocationChange(location);
  };

  const handleSliderChange = ( value) => {
    onPriceChange(value);
    setPriceRange(value);
    // console.log("priceChange",value)
   
  };

  const companies = [
    "Apple",
    "Microsoft",
    "Google",
    "Amazon",
    "Facebook",
    "Tesla",
    "IBM ",
    "Intel",
    "Netflix",
    "Adobe"
  ]

  const tools = [
    "VSCode",
    "Git",
    "GitHub",
    "Docker",
    "Postman",
    "Jenkins",
    "Webpack",
    "ESLint",
    "Sublime Text",
    "JIRA",
    "Slack",
    "Figma"
  ]

  
  // const skills = [
  //   "HTML",
  //   "CSS",
  //   "JavaScript",
  //   "Python",
  //   "Java",
  //   "React",
  //   "Node.js",
  //   "SQL",
  //   "TypeScript",
  //   "GraphQL"
  // ]
  const [searchText, setSearchText] = useState('');
  const [searchCompanies, setSearchCompanies] = useState('');
  const [searchTools, setSearchTools] = useState('');
  const [searchSkills, setSearchSkills] = useState('');
  const [filteredCountry, setFilteredCountry] = useState(country);
  const [filteredTools, setFilteredTools] = useState(tools);
  const [filteredCompanies, setFilteredCompanies] = useState(companies);
  // const [filteredSkills, setFilteredSkills] = useState(skills);
  const [viewFilters, setViewFilters] = useState(false);
  const [skillsData,setSkillsData] = useState([]);
  const [paginationMeta, setPaginationMeta] = useState([]);
  const [size, setSize] = useState(10);
  console.log("skillsData",skillsData)
console.log("pagination", paginationMeta);


  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 992); 
    };

    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);

    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);

  const handleSearchChange = (event) => {
    const newText = event.target.value.toLowerCase();
    setSearchText(newText);
    setFilteredCountry(country.filter((c) => c.name.toLowerCase().includes(newText)));
  };

  const handleSearchCompanies = (event) => {
    const newText = event.target.value.toLowerCase();
    setSearchCompanies(newText);
    setFilteredCompanies(companies.filter((c) => c.toLowerCase().includes(newText)));
  };
  const handleSearchTools = (event) => {
    const newText = event.target.value.toLowerCase();
    setSearchTools(newText);
    setFilteredTools(tools.filter((t) => t.toLowerCase().includes(newText)));
  };
  const handleSearchSkills = (event) => {
    // const newText = event.target.value.toLowerCase();
    setSearchSkills(event.target.value);
    // setFilteredSkills(skills.filter((s) => s.toLowerCase().includes(newText)));
  };

  useEffect(() => {
    const FetchSkills = async () => {
      // const params = {
      //   company: selectedIndustry,
      //   location: selectedLocation,
      //   skills: selectedSkills,
      // };
      const params = {};

    if (searchSkills) {
      params.skill = searchSkills;
    }
    
    params.size = size;
    params.page = 0;
      try {
        const response = await axios.get(searchUrl,{params});
        setSkillsData(response.data.data);
        setPaginationMeta(response.data.paginationMeta);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    FetchSkills();
  }, [searchSkills, size]);

  const handleViewFilters = () => {
    setViewFilters(!viewFilters)
  };

  const handleLoadMore = () => setSize(size + 5)


  return (
    <div>
      <Row className="mb-4">
        <Colxx xxs="12" sm="12" md="12" lg="12" className=" ">
          <div className="">
            <div className="d-flex flex-wrap my-3">
            {/* <Dropdown
                isOpen={dropdownBasicOpen}
                toggle={() => setDropdownBasicOpen(!dropdownBasicOpen)}
                className="mb-5 mx-2 col-lg-auto col-sm-12 "
              ><DropdownToggle className="col-lg-auto col-sm-12" caret color="primary" outline>
              Check
              </DropdownToggle></Dropdown> */}
               {isMobile && (
                <Button
                  size="sm"
                  color="primary"
                  outline
                  className="d-block d-lg-none col-sm-12 mb-3 position-relative"
                  onClick={handleViewFilters}
                >
                  {viewFilters ? (
                    <span>
                      Close filters
                      <i
                        className="simple-icon-arrow-up mr-0 icon-right"
                        style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)' }}
                      />
                    </span>
                  ) : (
                    <span>
                      View filters
                      <i
                        className="simple-icon-arrow-down icon-right"
                        style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)' }}
                      />
                    </span>
                  )}
                </Button>
              )}

              {(!isMobile || viewFilters) && (
              <>
              <Dropdown
                isOpen={dropdownBasicOpen}
                toggle={() => setDropdownBasicOpen(!dropdownBasicOpen)}
                className="mb-3  col-lg-auto col-sm-12 "
              >
                <DropdownToggle size="sm" className="col-lg-auto col-sm-12 " caret color="primary" outline>
                {selectedSkills[0] ? selectedSkills : <span>Skills</span>}
                </DropdownToggle>
                <DropdownMenu>
                <div className="search-sm mr-1 ml-1 mb-1 align-top">
                    <input
                      type="text"
                      className="form-control "
                      placeholder="Search skills"
                      value={searchSkills}
                      onChange={handleSearchSkills}
                    />
                  </div>
                  <PerfectScrollbar style={{ maxHeight: '200px' }}
                  options={{ suppressScrollX: true, wheelPropagation: false }}>
                 {selectedSkills[0] &&  <DropdownItem onClick={() => handleSkillSelect("")}  className="bg-light d-flex justify-content-between align-items-center">
                    <span>{selectedSkills}</span><i className="iconsminds-close ml-auto" />
                  </DropdownItem>}
                  {skillsData.length === 0 &&  <Card  className=" d-flex justify-content-between align-items-center">
                    {searchSkills} was not found
                  </Card>}
                  {skillsData.map((s,index) => (
                    // eslint-disable-next-line react/no-array-index-key
                      <DropdownItem key={index} onClick={() => handleSkillSelect(s)}>
                        {s}
                      </DropdownItem>
                    ))}
                     {!paginationMeta.last &&  <Card style={{cursor: "pointer"}} onClick={handleLoadMore}  className="bg-light d-flex justify-content-between align-items-center">
                    load more
                  </Card>}
                 </PerfectScrollbar>
                </DropdownMenu>
              </Dropdown>

              <Dropdown
                isOpen={dropdownBasicOpen1}
                toggle={() => setDropdownBasicOpen1(!dropdownBasicOpen1)}
                className="mb-3  col-lg-auto col-sm-12"
              >
                <DropdownToggle size="sm" className="col-lg-auto col-sm-12" caret color="primary" outline>
                {selectedTools[0] ? selectedTools :  <span>Tools</span>}
                </DropdownToggle>
                <DropdownMenu>
                <div className="search-sm mr-1 ml-1 mb-1 align-top">
                    <input
                      type="text"
                      className="form-control "
                      placeholder="Search tools"
                      value={searchTools}
                      onChange={handleSearchTools}
                    />
                  </div>
                  <PerfectScrollbar style={{ maxHeight: '200px' }}
                  options={{ suppressScrollX: true, wheelPropagation: false }}>
                  {selectedTools[0] && <DropdownItem onClick={() => handleToolSelect("")} className="bg-light d-flex justify-content-between align-items-center">
                    <span>{selectedTools}</span>
                    <i className="iconsminds-close ml-auto" />
                  </DropdownItem>}
                  {filteredTools.length === 0 &&  <Card  className=" d-flex justify-content-between align-items-center">
                    {searchTools} was not found
                  </Card>}
                  {filteredTools.map((t) => (
                      <DropdownItem key={t} onClick={() => handleToolSelect(t)}>
                        {t}
                      </DropdownItem>
                    ))}
                 </PerfectScrollbar>
                </DropdownMenu>
              </Dropdown>

              <Dropdown
                isOpen={dropdownBasicOpen2}
                toggle={() => setDropdownBasicOpen2(!dropdownBasicOpen2)}
                className="mb-3  col-lg-auto col-sm-12"
              >
                <DropdownToggle size="sm" className="col-lg-auto col-sm-12" caret color="primary" outline>
                {selectedIndustry || <span>Companies</span>}
                </DropdownToggle>
                <DropdownMenu className="col-lg-auto col-sm-12">
                 
                  <div className="search-sm mr-1 ml-1 mb-1 align-top">
                    <input
                      type="text"
                      className="form-control "
                      placeholder="Search Company"
                      value={searchCompanies}
                      onChange={handleSearchCompanies}
                    />
                  </div>
                  <PerfectScrollbar style={{ maxHeight: '200px' }}
                  options={{ suppressScrollX: true, wheelPropagation: false }}>
                  {selectedIndustry &&  <DropdownItem onClick={() => handleIndustrySelect("")}  className="bg-light d-flex justify-content-between align-items-center">
                    <span>{selectedIndustry}</span><i className="iconsminds-close ml-auto" />
                  </DropdownItem>}
                  {filteredCompanies.length === 0 &&  <Card  className=" d-flex justify-content-between align-items-center">
                    {searchCompanies} was not found
                  </Card>}
                  {filteredCompanies.map((c,index) => (
                    // eslint-disable-next-line react/no-array-index-key
                      <DropdownItem key={index} onClick={() => handleIndustrySelect(c)}>
                        {c}
                      </DropdownItem>
                    ))}
                 </PerfectScrollbar>
                </DropdownMenu>
              </Dropdown>
              

              <Dropdown
                isOpen={dropdownBasicOpen3}
                toggle={() => setDropdownBasicOpen3(!dropdownBasicOpen3)}
                className="mb-3  col-lg-auto col-sm-12"
              >
                <DropdownToggle size="sm" className="col-lg-auto col-sm-12" caret color="primary" outline>
                  Price
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem>
                    {/* <SliderExamples onChange={onPriceChange} /> */}
                    <Row>
                      <Colxx xxs="12" sm="12">
                        <RangeTooltip
                          min={500}
                          max={15000}
                          className="mb-5"
                          defaultValue={[500, 15000]}
                          allowCross={false}
                          pushable={100}
                          step={500}
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
                className="mb-3  col-lg-auto col-sm-12"
              >
                <DropdownToggle size="sm" className="col-lg-auto col-sm-12" caret color="primary" outline >
                 {selectedLocation ? (country.find(c => c.iso_code === selectedLocation)?.name) : ( <span>Location</span> )}
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
                  <PerfectScrollbar style={{ maxHeight: '200px' }}
                  options={{ suppressScrollX: true, wheelPropagation: false }}>
                  {selectedLocation &&  <DropdownItem onClick={() => handleLocationSelect("")}  className=" d-flex justify-content-between align-items-center">
                    <span>{country.find(c => c.iso_code === selectedLocation)?.name}</span><i className="iconsminds-close ml-auto" />
                  </DropdownItem>}
                  {filteredCountry.length === 0 &&  <Card  className="bg-light d-flex justify-content-between align-items-center">
                    {searchText} was not found
                  </Card>}
                    {filteredCountry.map((c,index) => (
                      // eslint-disable-next-line react/no-array-index-key
                      <DropdownItem key={index} onClick={() => handleLocationSelect(c.iso_code)}>
                        {c.name}
                      </DropdownItem>
                    ))}
                  </PerfectScrollbar>
                </DropdownMenu>
              </Dropdown>
              </>
              )}
            </div>
          </div>
        </Colxx>
      </Row>
    </div>
  );
};

export default MentorFilter;
