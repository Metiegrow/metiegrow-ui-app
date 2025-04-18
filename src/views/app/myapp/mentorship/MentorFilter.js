/* eslint-disable react/no-array-index-key */
import axios from "axios";
import { Colxx } from "components/common/CustomBootstrap";
import { RangeTooltip } from "components/common/SliderTooltips";
import { baseUrl } from "constants/defaultValues";
import { useCallback, useEffect, useState } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";
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
import DomainList from "../AlumniRegister/DomainList";
import country from "../my-login/Country";

const MentorFilter = ({
  onSkillsChange,
  onToolsChange,
  onIndustryChange,
  onUniversityChange,
  onPriceChange,
  onLocationChange,
  onDomainChange,
  selectedSkills,
  selectedLocation,
  selectedIndustry,
  selectedUniversity,
  selectedTools,
  userRole,
}) => {
  const [dropdownBasicOpen, setDropdownBasicOpen] = useState(false);
  const [dropdownBasicOpen1, setDropdownBasicOpen1] = useState(false);
  const [dropdownBasicOpen2, setDropdownBasicOpen2] = useState(false);
  const [dropdownBasicOpen3, setDropdownBasicOpen3] = useState(false);
  const [dropdownBasicOpen4, setDropdownBasicOpen4] = useState(false);
  const [dropdownBasicOpen5, setDropdownBasicOpen5] = useState(false);
  const [dropdownBasicOpen6, setDropdownBasicOpen6] = useState(false);
  const [priceRange, setPriceRange] = useState([500, 15000]);
  const [selectedDomain, setSelectedDomain] = useState("");

  // const searchUrl = `${baseUrl}/api/mentor/search/skills`;
  // const companySearchUrl = `${baseUrl}/api/mentor/search/company`;
  // const toolsSearchUrl = `${baseUrl}/api/mentor/search/tools`;

  const getApiEndpoint = (endpointType) => {
    switch (userRole) {
      case "alumni":
        switch (endpointType) {
          case "skills":
            return `${baseUrl}/api/alumni/search/skills`;
          case "company":
            return `${baseUrl}/api/alumni/search/company`;
          case "university":
            return `${baseUrl}/api/alumni/search/university`;
          default:
            throw new Error(`Invalid endpoint type for alumni role`);
        }
      case "mentor":
        switch (endpointType) {
          case "skills":
            return `${baseUrl}/api/mentor/search/skills`;
          case "company":
            return `${baseUrl}/api/mentor/search/company`;
          case "tools":
            return `${baseUrl}/api/mentor/search/tools`;
          default:
            throw new Error(`Invalid endpoint type for mentor role`);
        }
      default:
        throw new Error(`Invalid user role`);
    }
  };

  const handleSkillSelect = (skill) => {
    onSkillsChange(skill);
  };

  const handleToolSelect = (tool) => {
    onToolsChange(tool);
  };

  const handleIndustrySelect = (industry) => {
    onIndustryChange(industry);
  };
  const handleUniversitySelect = (university) => {
    onUniversityChange(university);
  };

  const handleLocationSelect = (location) => {
    onLocationChange(location);
  };
  const handleDomainSelect = (domain) => {
    onDomainChange(domain);
    setSelectedDomain(domain);
  };

  const handleSliderChange = (value) => {
    setPriceRange(value);
  };
  const handleAfterChange = useCallback((finalRange) => {
    onPriceChange(finalRange);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // const tools = [
  //   "VSCode",
  //   "Git",
  //   "GitHub",
  //   "Docker",
  //   "Postman",
  //   "Jenkins",
  //   "Webpack",
  //   "ESLint",
  //   "Sublime Text",
  //   "JIRA",
  //   "Slack",
  //   "Figma"
  // ]

  const [searchText, setSearchText] = useState("");
  const [searchText1, setSearchText1] = useState("");
  const [searchCompanies, setSearchCompanies] = useState("");
  const [searchUniversities, setSearchUniversities] = useState("");
  const [searchTools, setSearchTools] = useState("");
  const [searchSkills, setSearchSkills] = useState("");
  const [filteredCountry, setFilteredCountry] = useState(country);
  const [filteredDomain, setFilteredDomain] = useState(DomainList);
  // const [filteredTools, setFilteredTools] = useState(tools);
  // const [filteredCompanies, setFilteredCompanies] = useState(companies);
  // const [filteredSkills, setFilteredSkills] = useState(skills);
  const [viewFilters, setViewFilters] = useState(false);

  const [skillsData, setSkillsData] = useState([]);
  const [companyData, setCompanyData] = useState([]);
  const [universityData, setUniversityData] = useState([]);
  const [toolsData, setToolsData] = useState([]);

  const [paginationMeta, setPaginationMeta] = useState([]);
  const [companyPaginationMeta, setCompanyPaginationMeta] = useState([]);
  const [universityPaginationMeta, setUniversityPaginationMeta] = useState([]);
  const [toolsPaginationMeta, setToolsPaginationMeta] = useState([]);

  const [size, setSize] = useState(10);
  const [companySize, setCompanySize] = useState(10);
  const [universitySize, setUniversitySize] = useState(10);
  const [toolsSize, setToolsSize] = useState(10);

  const [skillsFetched, setSkillsFetched] = useState(false);
  const [toolsFetched, setToolsFetched] = useState(false);
  const [companiesFetched, setCompaniesFetched] = useState(false);
  const [universityFetched, setUniversitiesFetched] = useState(false);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 992);
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);

    return () => {
      window.removeEventListener("resize", checkIfMobile);
    };
  }, []);

  const handleSearchChange = (event) => {
    const newText = event.target.value.toLowerCase();
    setSearchText(newText);
    setFilteredCountry(
      country.filter((c) => c.name.toLowerCase().includes(newText))
    );
  };
  const handleSearchDomainChange = (event) => {
    const newText = event.target.value.toLowerCase();
    setSearchText1(newText);
    setFilteredDomain(
      DomainList.filter((c) => c.name.toLowerCase().includes(newText))
    );
  };

  const handleSearchCompanies = (event) => {
    // const newText = event.target.value.toLowerCase();
    setSearchCompanies(event.target.value);
    // setFilteredCompanies(companies.filter((c) => c.toLowerCase().includes(newText)));
  };
  const handleSearchUniversities = (event) => {
    setSearchUniversities(event.target.value);
  };
  const handleSearchTools = (event) => {
    // const newText = event.target.value.toLowerCase();
    setSearchTools(event.target.value);
    // setFilteredTools(tools.filter((t) => t.toLowerCase().includes(newText)));
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
        const response = await axios.get(getApiEndpoint("skills"), { params });
        setSkillsData(response.data.data);
        setPaginationMeta(response.data.paginationMeta);
        setSkillsFetched(true);
      } catch (error) {
        console.error("Error fetching data:", error);
        setSkillsFetched(false);
      }
    };
    FetchSkills();
  }, [searchSkills, size]);

  useEffect(() => {
    const FetchCompanies = async () => {
      // const params = {
      //   company: selectedIndustry,
      //   location: selectedLocation,
      //   skills: selectedSkills,
      // };
      const params = {};

      if (searchCompanies) {
        params.company = searchCompanies;
      }

      // params.size = companySize;
      if (companySize) {
        params.size = companySize;
      }
      params.page = 0;
      try {
        const response = await axios.get(getApiEndpoint("company"), { params });
        setCompanyData(response.data.data);
        setCompanyPaginationMeta(response.data.paginationMeta);
        setCompaniesFetched(true);
      } catch (error) {
        console.error("Error fetching data:", error);
        setCompaniesFetched(false);
      }
    };
    FetchCompanies();
  }, [searchCompanies, companySize]);

  useEffect(() => {
    const FetchUniversities = async () => {
      // const params = {
      //   company: selectedIndustry,
      //   location: selectedLocation,
      //   skills: selectedSkills,
      // };
      const params = {};

      if (searchUniversities) {
        params.university = searchUniversities;
      }

      // params.size = companySize;
      if (universitySize) {
        params.size = universitySize;
      }
      params.page = 0;
      try {
        const response = await axios.get(getApiEndpoint("university"), {
          params,
        });
        setUniversityData(response.data.data);
        setUniversityPaginationMeta(response.data.paginationMeta);
        setUniversitiesFetched(true);
      } catch (error) {
        console.error("Error fetching data:", error);
        setUniversitiesFetched(false);
      }
    };
    FetchUniversities();
  }, [searchUniversities, universitySize]);

  useEffect(() => {
    const FetchTools = async () => {
      const params = {};

      if (searchTools) {
        params.tool = searchTools;
      }

      params.size = toolsSize;
      params.page = 0;
      try {
        const response = await axios.get(getApiEndpoint("tools"), { params });
        setToolsData(response.data.data);
        setToolsPaginationMeta(response.data.paginationMeta);
        setToolsFetched(true);
      } catch (error) {
        console.error("Error fetching data:", error);
        setToolsFetched(false);
      }
    };
    FetchTools();
  }, [searchTools, toolsSize]);

  const handleViewFilters = () => {
    setViewFilters(!viewFilters);
  };

  const handleLoadMore = () => setSize(size + 5);
  const handleCompanyLoadMore = () => setCompanySize(companySize + 5);
  const handleUniversityLoadMore = () => setUniversitySize(universitySize + 5);
  const handleToolsLoadMore = () => setToolsSize(toolsSize + 5);

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
                        style={{
                          position: "absolute",
                          right: "10px",
                          top: "50%",
                          transform: "translateY(-50%)",
                        }}
                      />
                    </span>
                  ) : (
                    <span>
                      View filters
                      <i
                        className="simple-icon-arrow-down icon-right"
                        style={{
                          position: "absolute",
                          right: "10px",
                          top: "50%",
                          transform: "translateY(-50%)",
                        }}
                      />
                    </span>
                  )}
                </Button>
              )}

              {(!isMobile || viewFilters) && (
                <>
                  {/* university filter starts */}
                  {userRole === "alumni" && (
                    <Dropdown
                      isOpen={dropdownBasicOpen6}
                      toggle={() => setDropdownBasicOpen6(!dropdownBasicOpen6)}
                      className="mb-3  col-lg-auto col-sm-12"
                    >
                      <DropdownToggle
                        size="sm"
                        className="col-lg-auto col-sm-12"
                        caret
                        color="primary"
                        outline
                      >
                        {selectedUniversity || <span>Universities</span>}
                      </DropdownToggle>
                      <DropdownMenu className="col-lg-auto col-sm-12">
                        <div className="search-sm mr-1 ml-1 mb-1 align-top">
                          <input
                            type="text"
                            className="form-control "
                            placeholder="Search University"
                            value={searchUniversities}
                            onChange={handleSearchUniversities}
                          />
                        </div>
                        <PerfectScrollbar
                          style={{ maxHeight: "200px" }}
                          options={{
                            suppressScrollX: true,
                            wheelPropagation: false,
                          }}
                        >
                          {selectedUniversity && (
                            <DropdownItem
                              onClick={() => handleUniversitySelect("")}
                              className="bg-light d-flex justify-content-between align-items-center"
                            >
                              <span>{selectedUniversity}</span>
                              <i className="iconsminds-close ml-auto" />
                            </DropdownItem>
                          )}
                          {universityFetched && universityData.length === 0 && (
                            <Card className=" d-flex justify-content-between align-items-center">
                              {searchUniversities} was not found
                            </Card>
                          )}
                          {!universityFetched && (
                            <Card className=" d-flex justify-content-between align-items-center">
                              Failed to load data!
                            </Card>
                          )}
                          {universityData.map((c, index) => (
                            <DropdownItem
                              key={index}
                              onClick={() => handleUniversitySelect(c)}
                            >
                              {c}
                            </DropdownItem>
                          ))}
                          {!universityPaginationMeta.last &&
                            universityFetched && (
                              <Card
                                style={{ cursor: "pointer" }}
                                onClick={handleUniversityLoadMore}
                                className="bg-light d-flex justify-content-between align-items-center"
                              >
                                load more
                              </Card>
                            )}
                        </PerfectScrollbar>
                      </DropdownMenu>
                    </Dropdown>
                  )}

                  {/* university filter ends */}
                  <Dropdown
                    isOpen={dropdownBasicOpen}
                    toggle={() => setDropdownBasicOpen(!dropdownBasicOpen)}
                    className="mb-3  col-lg-auto col-sm-12 "
                  >
                    <DropdownToggle
                      size="sm"
                      className="col-lg-auto col-sm-12 "
                      caret
                      color="primary"
                      outline
                    >
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
                      <PerfectScrollbar
                        style={{ maxHeight: "200px" }}
                        options={{
                          suppressScrollX: true,
                          wheelPropagation: false,
                        }}
                      >
                        {selectedSkills[0] && (
                          <DropdownItem
                            onClick={() => handleSkillSelect("")}
                            className="bg-light d-flex justify-content-between align-items-center"
                          >
                            <span>{selectedSkills}</span>
                            <i className="iconsminds-close ml-auto" />
                          </DropdownItem>
                        )}
                        {skillsFetched && skillsData.length === 0 && (
                          <Card className=" d-flex justify-content-between align-items-center">
                            {searchSkills} was not found
                          </Card>
                        )}
                        {!skillsFetched && (
                          <Card className=" d-flex justify-content-between align-items-center">
                            Failed to load data!
                          </Card>
                        )}
                        {skillsData.map((s, index) => (
                          <DropdownItem
                            key={index}
                            onClick={() => handleSkillSelect(s)}
                          >
                            {s}
                          </DropdownItem>
                        ))}
                        {!paginationMeta.last && skillsFetched && (
                          <Card
                            style={{ cursor: "pointer" }}
                            onClick={handleLoadMore}
                            className="bg-light d-flex justify-content-between align-items-center"
                          >
                            load more
                          </Card>
                        )}
                      </PerfectScrollbar>
                    </DropdownMenu>
                  </Dropdown>

                  {userRole !== "alumni" && userRole !== "user" && (
                    <Dropdown
                      isOpen={dropdownBasicOpen1}
                      toggle={() => setDropdownBasicOpen1(!dropdownBasicOpen1)}
                      className="mb-3  col-lg-auto col-sm-12"
                    >
                      <DropdownToggle
                        size="sm"
                        className="col-lg-auto col-sm-12"
                        caret
                        color="primary"
                        outline
                      >
                        {selectedTools[0] ? selectedTools : <span>Tools</span>}
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
                        <PerfectScrollbar
                          style={{ maxHeight: "200px" }}
                          options={{
                            suppressScrollX: true,
                            wheelPropagation: false,
                          }}
                        >
                          {selectedTools[0] && (
                            <DropdownItem
                              onClick={() => handleToolSelect("")}
                              className="bg-light d-flex justify-content-between align-items-center"
                            >
                              <span>{selectedTools}</span>
                              <i className="iconsminds-close ml-auto" />
                            </DropdownItem>
                          )}
                          {toolsFetched && toolsData.length === 0 && (
                            <Card className=" d-flex justify-content-between align-items-center">
                              {searchTools} was not found
                            </Card>
                          )}
                          {!toolsFetched && (
                            <Card className=" d-flex justify-content-between align-items-center">
                              Failed to load data!
                            </Card>
                          )}
                          {toolsData.map((t, index) => (
                            <DropdownItem
                              key={index}
                              onClick={() => handleToolSelect(t)}
                            >
                              {t}
                            </DropdownItem>
                          ))}
                          {!toolsPaginationMeta.last && toolsFetched && (
                            <Card
                              style={{ cursor: "pointer" }}
                              onClick={handleToolsLoadMore}
                              className="bg-light d-flex justify-content-between align-items-center"
                            >
                              load more
                            </Card>
                          )}
                        </PerfectScrollbar>
                      </DropdownMenu>
                    </Dropdown>
                  )}

                  {userRole !== "user" && (
                    <Dropdown
                      isOpen={dropdownBasicOpen2}
                      toggle={() => setDropdownBasicOpen2(!dropdownBasicOpen2)}
                      className="mb-3  col-lg-auto col-sm-12"
                    >
                      <DropdownToggle
                        size="sm"
                        className="col-lg-auto col-sm-12"
                        caret
                        color="primary"
                        outline
                      >
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
                        <PerfectScrollbar
                          style={{ maxHeight: "200px" }}
                          options={{
                            suppressScrollX: true,
                            wheelPropagation: false,
                          }}
                        >
                          {selectedIndustry && (
                            <DropdownItem
                              onClick={() => handleIndustrySelect("")}
                              className="bg-light d-flex justify-content-between align-items-center"
                            >
                              <span>{selectedIndustry}</span>
                              <i className="iconsminds-close ml-auto" />
                            </DropdownItem>
                          )}
                          {companiesFetched && companyData.length === 0 && (
                            <Card className=" d-flex justify-content-between align-items-center">
                              {searchCompanies} was not found
                            </Card>
                          )}
                          {!companiesFetched && (
                            <Card className=" d-flex justify-content-between align-items-center">
                              Failed to load data!
                            </Card>
                          )}
                          {companyData.map((c, index) => (
                            <DropdownItem
                              key={index}
                              onClick={() => handleIndustrySelect(c)}
                            >
                              {c}
                            </DropdownItem>
                          ))}
                          {!companyPaginationMeta.last && companiesFetched && (
                            <Card
                              style={{ cursor: "pointer" }}
                              onClick={handleCompanyLoadMore}
                              className="bg-light d-flex justify-content-between align-items-center"
                            >
                              load more
                            </Card>
                          )}
                        </PerfectScrollbar>
                      </DropdownMenu>
                    </Dropdown>
                  )}

                  {userRole !== "user" && (
                    <Dropdown
                      isOpen={dropdownBasicOpen3}
                      toggle={() => setDropdownBasicOpen3(!dropdownBasicOpen3)}
                      className="mb-3  col-lg-auto col-sm-12"
                    >
                      <DropdownToggle
                        size="sm"
                        className="col-lg-auto col-sm-12"
                        caret
                        color="primary"
                        outline
                      >
                        Price
                      </DropdownToggle>
                      <DropdownMenu>
                        <DropdownItem className="no-bg-price">
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
                                onAfterChange={handleAfterChange}
                              />
                            </Colxx>
                          </Row>
                        </DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                  )}

                  <Dropdown
                    isOpen={dropdownBasicOpen4}
                    toggle={() => setDropdownBasicOpen4(!dropdownBasicOpen4)}
                    className="mb-3  col-lg-auto col-sm-12"
                  >
                    <DropdownToggle
                      size="sm"
                      className="col-lg-auto col-sm-12"
                      caret
                      color="primary"
                      outline
                    >
                      {selectedLocation ? (
                        country.find((c) => c.iso_code === selectedLocation)
                          ?.name
                      ) : (
                        <span>Location</span>
                      )}
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
                      <PerfectScrollbar
                        style={{ maxHeight: "200px" }}
                        options={{
                          suppressScrollX: true,
                          wheelPropagation: false,
                        }}
                      >
                        {selectedLocation && (
                          <DropdownItem
                            onClick={() => handleLocationSelect("")}
                            className=" d-flex justify-content-between align-items-center"
                          >
                            <span>
                              {
                                country.find(
                                  (c) => c.iso_code === selectedLocation
                                )?.name
                              }
                            </span>
                            <i className="iconsminds-close ml-auto" />
                          </DropdownItem>
                        )}
                        {filteredCountry.length === 0 && (
                          <Card className="bg-light d-flex justify-content-between align-items-center">
                            {searchText} was not found
                          </Card>
                        )}
                        {filteredCountry.map((c, index) => (
                          <DropdownItem
                            key={index}
                            onClick={() => handleLocationSelect(c.iso_code)}
                          >
                            {c.name}
                          </DropdownItem>
                        ))}
                      </PerfectScrollbar>
                    </DropdownMenu>
                  </Dropdown>
                  {/* domain filter starts */}
                  {userRole === "alumni" && (
                    <Dropdown
                      isOpen={dropdownBasicOpen5}
                      toggle={() => setDropdownBasicOpen5(!dropdownBasicOpen5)}
                      className="mb-3  col-lg-auto col-sm-12"
                    >
                      <DropdownToggle
                        size="sm"
                        className="col-lg-auto col-sm-12"
                        caret
                        color="primary"
                        outline
                      >
                        {selectedDomain || <span>Domain</span>}
                      </DropdownToggle>

                      <DropdownMenu>
                        <div className="search-sm mr-1 ml-1 mb-1 align-top">
                          <input
                            type="text"
                            className="form-control "
                            placeholder="Search Domain"
                            value={searchText1}
                            onChange={handleSearchDomainChange}
                          />
                        </div>
                        <PerfectScrollbar
                          style={{ maxHeight: "200px" }}
                          options={{
                            suppressScrollX: true,
                            wheelPropagation: false,
                          }}
                        >
                          {selectedDomain && (
                            <DropdownItem
                              onClick={() => handleDomainSelect("")}
                              className=" d-flex justify-content-between align-items-center "
                            >
                              <span>
                                {
                                  DomainList.find(
                                    (c) => c.name === selectedDomain
                                  )?.name
                                }
                              </span>
                              <i className="iconsminds-close ml-auto " />
                            </DropdownItem>
                          )}
                          {filteredDomain.length === 0 && (
                            <Card className="bg-light d-flex justify-content-between align-items-center">
                              {searchText1} was not found
                            </Card>
                          )}
                          {filteredDomain.map((c) => (
                            <DropdownItem
                              key={c.name}
                              onClick={() => handleDomainSelect(c.name)}
                            >
                              {c.name}
                            </DropdownItem>
                          ))}
                        </PerfectScrollbar>
                      </DropdownMenu>
                    </Dropdown>
                  )}
                  {/* domain filter ends */}
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
