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
  const [priceRange, setPriceRange] = useState([500, 15000]);

  const topicSearchUrl = `${baseUrl}/api/lawyer/search/lawyertopic`;

  const [topicsSize, setTopicsSize] = useState(10);

  const [topicsPaginationMeta, setTopicsPaginationMeta] = useState([]);

  const [topicsData, setTopicsData] = useState([]);

  const [topicsFetched, setTopicsFetched] = useState(false);
  // const topics = [
  //   "Visas",
  //   "Immigration",
  //   "Accreditation",
  //   "Rights",
  //   "Employment",
  //   "Work-permits",
  //   "Housing",
  //   "Intellectual-property",
  //   "Dependents",
  //   "Healthcare"
  // ]

  const handleTopicsSelect = (topic) => {
    onTopicsChange(topic);
  };
  const handleLanguageSelect = (lang) => {
    onLanguageChange(lang);
  };

  const handleLocationSelect = (location) => {
    onLocationChange(location);
  };

  const handleSliderChange = (value) => {
    setPriceRange(value);
  };
  const handleAfterChange = useCallback((finalRange) => {
    onPriceChange(finalRange);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [searchText, setSearchText] = useState("");
  const [filteredCountry, setFilteredCountry] = useState(country);
  const [filteredLanguage, setFilteredLanguage] = useState(language);
  const [searchLanguage, setSearchLanguage] = useState("");
  // const [filteredTopics, setFilteredTopics] = useState(topics);
  const [searchTopics, setSearchTopics] = useState("");
  const [viewFilters, setViewFilters] = useState(false);

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

  const handleSearchLanguage = (event) => {
    const newText = event.target.value.toLowerCase();
    setSearchLanguage(newText);
    setFilteredLanguage(
      language.filter((s) => s.name.toLowerCase().includes(newText))
    );
  };
  const handleSearchTopics = (event) => {
    // const newText = event.target.value.toLowerCase();
    setSearchTopics(event.target.value);
    // setFilteredTopics(topics.filter((t) => t.toLowerCase().includes(newText)));
  };

  useEffect(() => {
    const FetchTopics = async () => {
      const params = {};

      if (searchTopics) {
        params.skill = searchTopics;
      }

      params.size = topicsSize;
      params.page = 0;
      try {
        const response = await axios.get(topicSearchUrl, { params });
        setTopicsData(response.data.data);
        setTopicsPaginationMeta(response.data.paginationMeta);
        setTopicsFetched(true);
      } catch (error) {
        console.error("Error fetching data:", error);
        setTopicsFetched(false);
      }
    };
    FetchTopics();
  }, [searchTopics, topicsSize]);

  const handleViewFilters = () => {
    setViewFilters(!viewFilters);
  };

  const handleTopicsLoadMore = () => setTopicsSize(topicsSize + 5);

  return (
    <div>
      <Row className="mb-4">
        <Colxx xxs="12" sm="12" md="12" lg="12" className=" ">
          <div className="">
            <div className="d-flex flex-wrap  my-3">
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
                  <Dropdown
                    isOpen={dropdownBasicOpen}
                    toggle={() => setDropdownBasicOpen(!dropdownBasicOpen)}
                    className="mb-3 col-lg-auto col-sm-12"
                  >
                    <DropdownToggle
                      size="sm"
                      caret
                      color="primary"
                      outline
                      className="col-lg-auto col-sm-12 "
                    >
                      {selectedTopics[0] ? selectedTopics : <span>Topics</span>}
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
                      <PerfectScrollbar
                        style={{ maxHeight: "200px" }}
                        options={{
                          suppressScrollX: true,
                          wheelPropagation: false,
                        }}
                      >
                        {selectedTopics[0] && (
                          <DropdownItem
                            onClick={() => handleTopicsSelect("")}
                            className="bg-light d-flex justify-content-between align-items-center"
                          >
                            <span>{selectedTopics}</span>
                            <i className="iconsminds-close ml-auto" />
                          </DropdownItem>
                        )}
                        {topicsFetched && topicsData.length === 0 && (
                          <Card className=" d-flex justify-content-between align-items-center">
                            {searchTopics} was not found
                          </Card>
                        )}
                        {!topicsFetched && (
                          <Card className=" d-flex justify-content-between align-items-center">
                            Failed to load data!
                          </Card>
                        )}
                        {topicsData.map((t, index) => (
                          <DropdownItem
                            // eslint-disable-next-line react/no-array-index-key
                            key={index}
                            onClick={() => handleTopicsSelect(t)}
                          >
                            {t}
                          </DropdownItem>
                        ))}
                        {!topicsPaginationMeta.last && topicsFetched && (
                          <Card
                            style={{ cursor: "pointer" }}
                            onClick={handleTopicsLoadMore}
                            className="bg-light d-flex justify-content-between align-items-center"
                          >
                            load more
                          </Card>
                        )}
                      </PerfectScrollbar>
                    </DropdownMenu>
                  </Dropdown>

                  <Dropdown
                    isOpen={dropdownBasicOpen1}
                    toggle={() => setDropdownBasicOpen1(!dropdownBasicOpen1)}
                    className="mb-3 col-lg-auto col-sm-12"
                  >
                    <DropdownToggle
                      size="sm"
                      caret
                      color="primary"
                      outline
                      className="col-lg-auto col-sm-12 "
                    >
                      {selectedLanguage ? (
                        language.find((l) => l.iso_code === selectedLanguage)
                          ?.name
                      ) : (
                        <span>Languages</span>
                      )}
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
                      <PerfectScrollbar
                        style={{ maxHeight: "200px" }}
                        options={{
                          suppressScrollX: true,
                          wheelPropagation: false,
                        }}
                      >
                        {selectedLanguage[0] && (
                          <DropdownItem
                            onClick={() => handleLanguageSelect("")}
                            className="bg-light d-flex justify-content-between align-items-center"
                          >
                            <span>
                              {
                                language.find(
                                  (c) => c.iso_code === selectedLanguage
                                )?.name
                              }
                            </span>
                            <i className="iconsminds-close  ml-auto" />
                          </DropdownItem>
                        )}
                        {filteredLanguage.map((l) => (
                          <DropdownItem
                            key={l.iso_code}
                            onClick={() => handleLanguageSelect(l.iso_code)}
                          >
                            <span>{l.name}</span>
                          </DropdownItem>
                        ))}
                      </PerfectScrollbar>
                    </DropdownMenu>
                  </Dropdown>
                  <Dropdown
                    isOpen={dropdownBasicOpen2}
                    toggle={() => setDropdownBasicOpen2(!dropdownBasicOpen2)}
                    className="mb-3 col-lg-auto col-sm-12"
                  >
                    <DropdownToggle
                      size="sm"
                      caret
                      color="primary"
                      outline
                      className="col-lg-auto col-sm-12 "
                    >
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
                              value={priceRange}
                              step={500}
                              onChange={handleSliderChange}
                              onAfterChange={handleAfterChange}
                            />
                          </Colxx>
                        </Row>
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                  <Dropdown
                    isOpen={dropdownBasicOpen3}
                    toggle={() => setDropdownBasicOpen3(!dropdownBasicOpen3)}
                    className="mb-3 col-lg-auto col-sm-12"
                  >
                    <DropdownToggle
                      size="sm"
                      caret
                      color="primary"
                      outline
                      className="col-lg-auto col-sm-12 "
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
                            className="bg-light d-flex justify-content-between align-items-center"
                          >
                            <span>
                              {
                                country.find(
                                  (c) => c.iso_code === selectedLocation
                                )?.name
                              }
                            </span>
                            <i className="iconsminds-close  ml-auto" />
                          </DropdownItem>
                        )}
                        {filteredCountry.map((c) => (
                          <DropdownItem
                            key={c.iso_code}
                            onClick={() => handleLocationSelect(c.iso_code)}
                          >
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
                </>
              )}
            </div>
          </div>
        </Colxx>
      </Row>
    </div>
  );
};

export default LawyerCardFilter;
