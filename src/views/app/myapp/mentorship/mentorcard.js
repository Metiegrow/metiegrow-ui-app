import axios from "axios";
import { Colxx } from "components/common/CustomBootstrap";
import { useHistory } from "react-router-dom";
// import IntlMessages from 'helpers/IntlMessages';
import { baseUrl } from "constants/defaultValues";
import React, { useState, useEffect } from "react";
import { Badge, Button, Card, CardBody, CardText, Row } from "reactstrap";
import Pagination from "containers/pages/Pagination";
// import RatingExamples from './RatingExamples';
import ThumbnailLetters from "components/cards/ThumbnailLetters";
import Rating from "components/common/Rating";
import MentorFilter from "./MentorFilter";
// import MentorDropDown from './MentorDropDown';

const MentorCard = () => {
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [selectedTools, setSelectedTools] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState("");
  const [selectedPrice, setSelectedPrice] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [paginationMeta, setPaginationMeta] = useState([]);

  // const [searchClick, setSearchClick] = useState("")
  // const [searchClicked, setSearchClicked] = useState(false)

  // const [pageSize, setPageSize] = useState(2)
  // console.log(paginationMeta.totalPage)
  // console.log(paginationMeta.first)
  // console.log(paginationMeta.last)

  const handleSkillsChange = (skills) => setSelectedSkills(skills);
  const handleToolsChange = (tools) => setSelectedTools(tools);
  const handleIndustryChange = (industry) => setSelectedIndustry(industry);
  const handlePriceChange = (price) => setSelectedPrice(price);
  const handleLocationChange = (location) => setSelectedLocation(location);

  // console.log("skills",selectedSkills)
  // console.log("selectedTools",selectedTools)
  // console.log("selectedIndustry",selectedIndustry)
  // console.log("selectedPrice",selectedPrice)
  // console.log("selectedLocation",selectedLocation)

  const [isMentorCardFetched, setIsMentorCardFetched] = useState(false);

  // const url1=`${baseUrl}/mentorDetails`
  // const url1=`${baseUrl}/api/mentor`
  const url2 = `${baseUrl}/api/mentor/cards`;
  // const imageUrl = `${baseUrl}/api/public/images`;
  // To change to backend api url uncomment the below line
  // const url1=`${baseUrl}/api/mentor`
  const history = useHistory();

  // const {category}=useParams();
  // const location = useLocation();
  // const firstNameParam = new URLSearchParams(location.search).get('firstName');
  // const jobTitleParam = new URLSearchParams(location.search).get('jobTitle');
  // Using useLocation hook
  // const age = new URLSearchParams(location.search);

  // let filteredUrl = `${url}?`;
  // if (firstNameParam) filteredUrl += `firstName=${firstNameParam}&`;
  // if (jobTitleParam) filteredUrl += `jobTitle=${jobTitleParam}&`;
  // Add more conditions for other parameters
  // const age = searchParams.get('age');
  // console.log('Category:', category);
  // const url=`${baseUrl}/mentor/cards`;
  // const url=`${baseUrl}/mentorDetails/?${firstNameParam}&jobTitle=${jobTitleParam}`;
  // const url1=`${baseUrl}/mentorDetails/${category}`;
  // const url='http://localhost:9091/api/mentor/cards?page=0&size=3 ';
  const [mentordetails, setMentorDetails] = useState([]);
  // const[mentorfilter,setMentorFilter]=useState([]);
  // const [image]=useState('');
  const [inputkey, setInputKey] = useState("");
  //   const handleSearchByName = () => {
  //     setSearchClick(inputkey);
  //     setSearchClicked(true);
  //   }
  // const handleSearchClear = () =>{
  //   setInputKey("");
  //   setSearchClick("");
  //   setSearchClicked(false);
  // }

  // const [filteredMentors, setFilteredMentors] = useState([]);
  const truncateBio = (bio, lineCount) => {
    const words = bio.split(" ");

    const truncatedBio = words.slice(0, lineCount).join(" ");

    if (words.length > lineCount) {
      return `${truncatedBio}...`;
    }
    return truncatedBio;
  };

  // const setFirstName = (newFirstName) => {
  //   const searchParams = new URLSearchParams(location.search);
  //   searchParams.set('firstName', newFirstName);
  //   const newSearch = searchParams.toString();
  //   const newPath = `${location.pathname}?${newSearch}`;
  //   window.history.replaceState(null, '', newPath);
  //   setInputKey(newFirstName); // Optionally, you can update the state with the new value
  // };

  // useEffect(()=>{
  //   const mentorCardDetails = async () => {
  //     try {
  //       const response = await axios.get(url);
  //       setMentorDetails(response.data);
  //     } catch (error) {
  //       console.error('Error fetching data:', error);
  //     }
  //   };
  //   mentorCardDetails();
  // },[location.search])
  // useEffect(() => {
  //   setIsMentorCardFetched(false);
  //   const mentorCardDetails = async () => {
  //     try {
  //       let url = url1;
  //       if (firstNameParam || jobTitleParam) {
  //         url += `?firstName=${firstNameParam || ''}&jobTitle=${jobTitleParam || ''}`;
  //       }
  //       const response = await axios.get(url);
  //       setMentorDetails(response.data);
  //       setIsMentorCardFetched(true);
  //     } catch (error) {
  //       console.error('Error fetching data:', error);
  //       setIsMentorCardFetched(true);
  //     }
  //   };
  //   mentorCardDetails();
  // }, [location.search]);
  useEffect(() => {
    setIsMentorCardFetched(false);
    const mentorCardDetails = async () => {
      // const params = {
      //   company: selectedIndustry,
      //   location: selectedLocation,
      //   skills: selectedSkills,
      // };
      const params = {};

      if (selectedIndustry) {
        params.company = selectedIndustry;
      }
      if (selectedLocation) {
        params.location = selectedLocation;
      }
      if (selectedSkills) {
        params.skills = selectedSkills;
      }
      if (selectedTools) {
        params.tools = selectedTools;
      }
      if (selectedPrice) {
        // params.price = selectedPrice;
        params.minPrice = selectedPrice.at(0);
        params.maxPrice = selectedPrice.at(1);
      }
      if (inputkey) {
        params.firstName = inputkey;
      }
      params.size = 10;
      params.page = currentPage - 1;
      try {
        const response = await axios.get(url2, { params });
        setMentorDetails(response.data.data);
        setPaginationMeta(response.data.paginationMeta);
        setIsMentorCardFetched(true);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsMentorCardFetched(true);
      }
    };
    mentorCardDetails();
  }, [
    selectedLocation,
    selectedIndustry,
    selectedSkills,
    selectedTools,
    selectedPrice,
    currentPage,
    inputkey,
  ]);

  //   useEffect(() => {
  //     if (!paginationMeta.last) {
  //    const handleScroll = (e) => {
  //   const { documentElement, defaultView } = e.target;
  //   const { innerHeight } = defaultView || window;
  //   const { scrollHeight, scrollTop } = documentElement;

  //   const currentHeight = scrollTop + innerHeight;

  //   if (currentHeight + 1 >= scrollHeight) {
  //     setPageSize((prevPageSize) => prevPageSize + 5);
  //   }
  // };

  //       window.addEventListener("scroll", handleScroll);

  //       return () => {
  //         window.removeEventListener("scroll", handleScroll);
  //       };
  //     }

  //     return undefined;
  //   }, [paginationMeta]);

  // useEffect(() => {
  //   const filterMentors = () => {
  //     const filtered = mentordetails.filter((mentor) => {
  //       const lowercasedFilter = inputkey.toLowerCase();
  //       return (
  //         mentor.jobTitle.toLowerCase().includes(lowercasedFilter) ||
  //         mentor.skills.some(skill => skill.toLowerCase().includes(lowercasedFilter))
  //       );
  //     });
  //     setFilteredMentors(filtered);
  //   };
  //   filterMentors();
  // }, [inputkey, mentordetails]);

  // const history = useHistory();
  // const handleMySlotsClick = () =>{
  //   history.push(`${adminRoot}/calendar/mentor/appointment`)
  // }
  // const role = localStorage.getItem("roleRes");

  // useEffect(() => {
  //   const mentorCardDetails = async () => {
  //     try {
  //       const queryParams = new URLSearchParams(location.search);
  //       const firstNameParam = queryParams.get('firstName');
  //       const jobTitleParam = queryParams.get('jobTitle');
  //       // Add more parameters as needed

  //       let filteredUrl = `${url}?`;
  //       if (firstNameParam) filteredUrl += `firstName=${firstNameParam}&`;
  //       if (jobTitleParam) filteredUrl += `jobTitle=${jobTitleParam}&`;
  //       // Add more conditions for other parameters

  //       const response = await axios.get(filteredUrl);
  //       setMentorDetails(response.data);
  //     } catch (error) {
  //       console.error('Error fetching data:', error);
  //     }
  //   };
  //   mentorCardDetails();
  // }, [location.search]);

  // const mentorFilterSearch = async () => {
  //   try {
  //     const response = await axios.get(url1);
  //     setMentorFilter(response.data);
  //   } catch (error) {
  //     console.error('Error fetching data:', error);
  //   }
  // };
  // const handleInputChange = (e) => {
  //   setInputKey(e.target.value);
  //   mentorFilterSearch(); // Call the search function when input changes
  // };
  return (
    <div>
      {/* <Button onClick={mentorCardDetails}>
    Get
  </Button> */}
      {/* {mentordetails.map((mentors) => (
        <div key={mentors.id}>
          <p>Name: {mentors.firstName} {mentors.lastName}</p>
          <p>Star: {mentors.star}</p>
          
        </div>
      ))} */}
      {/* <SearchBar/> */}
      {/* <Nav pills>
                <NavItem>
                  <NavLink href="/app/mentorprofile" active>
                    <IntlMessages id="nav.link" />
                  </NavLink>
                </NavItem>
</Nav> */}

      {/* searchbar starts */}

      <Colxx sm="12" md="12" lg="8" xxs="12" className="mx-auto ">
        <div>
          <div className="">
            <div className="form-group">
              <div className="input-group">
                {/* <input
            type="text"
            className="form-control rounded col-12 col-lg-8 col-md-8 py-2"
            placeholder='Search by name'
            // placeholder='Search by skill or job title'
            // disabled={searchClicked}
            value={inputkey}
            onChange={(e) =>setInputKey(e.target.value)}
            // onChange={handleInputChange}
          /> */}
                <div
                  style={{ position: "relative" }}
                  className="col-12 col-lg-8 col-md-8"
                >
                  <i
                    className="simple-icon-magnifier mr-3"
                    style={{
                      position: "absolute",
                      top: "50%",
                      right: "15px",
                      transform: "translateY(-50%)",
                      zIndex: 2,
                      color: "#aaa",
                    }}
                  />
                  <input
                    type="text"
                    className="form-control rounded py-2"
                    placeholder="Search by name"
                    value={inputkey}
                    onChange={(e) => setInputKey(e.target.value)}
                    style={{ paddingRight: "2.5rem" }}
                  />
                </div>

                {/* <i className="simple-icon-magnifier" /> */}
                {/* {!searchClicked ? (
          <Button disabled={!inputkey} className='ml-3 ' onClick={() => handleSearchByName()} color='primary' >Search</Button>) : (
          <Button className='ml-3 ' onClick={() => handleSearchClear()} color='primary' >Clear</Button>
        )}
         */}

                {/* {role === "MENTOR" && (
       
       <Button color='primary' className='ml-3' onClick={handleMySlotsClick}>My slots</Button>
       
       )} */}
              </div>

              {/* <MentorDropDown/> */}
              <MentorFilter
                onSkillsChange={handleSkillsChange}
                onToolsChange={handleToolsChange}
                onIndustryChange={handleIndustryChange}
                onPriceChange={handlePriceChange}
                onLocationChange={handleLocationChange}
                selectedSkills={selectedSkills}
                selectedLocation={selectedLocation}
                selectedIndustry={selectedIndustry}
                selectedTools={selectedTools}
              />
            </div>
          </div>
        </div>
      </Colxx>

      {/* searchbar ends */}
      {!isMentorCardFetched ? (
        <div className="loading" />
      ) : (
        <>
          <div>
            {mentordetails.length === 0 ? (
              <Colxx sm="12" md="12" lg="8" xxs="12" className="mx-auto ">
                <Card>
                  <CardBody>
                    <h2 className="text-center text-large ">No mentors</h2>
                  </CardBody>
                </Card>
              </Colxx>
            ) : (
              Array.isArray(mentordetails) &&
              mentordetails.map((mentors) => {
                return (
                  <Colxx xxs="12" key={mentors.id}>
                    <Row>
                      <Colxx
                        sm="12"
                        md="12"
                        lg="8"
                        xxs="12"
                        className="mx-auto"
                      >
                        <Card
                          className="flex-row listing-card-container my-3 p-3"
                          style={{ gap: "16px" }}
                        >
                          <div
                            className="d-flex flex-column"
                            style={{ gap: "16px" }}
                          >
                            {/* <img
                      className="card-img-left"
                      src={mentors.image}
                      alt="Card"
                      style={{minWidth:'150px',minHeight:"300px"}}
                    /> */}
                            {mentors.imageUrl == null ? (
                              <div
                                className="card-img-left bg-primary 
                 d-flex align-items-center justify-content-center"
                                style={{
                                  width: "150px",
                                  height: "250px",
                                  borderRadius: "0.75rem",
                                }}
                              >
                                <ThumbnailLetters
                                  rounded
                                  text={mentors.firstName}
                                  className="text-xlarge border border-1"
                                  style={{ textAlign: "center" }}
                                />
                              </div>
                            ) : (
                              <img
                                // className="card-img-left"
                                // src={`${baseUrl}/api/public/images/${mentors.id}/profile-pic`}
                                src={`${baseUrl}/${mentors.imageUrl}`}
                                // src={`${baseUrl/${mentors.imageUrl}`}
                                alt="Card"
                                style={{
                                  width: "200px",
                                  height: "240px",
                                  borderRadius: "0.75rem",
                                  objectFit: "cover",
                                }}
                              />
                            )}
                          </div>

                          {/* <div className="d-flex flex-fill"> */}
                          <CardBody className="d-flex flex-column flex-fill p-0">
                            {/* <CardText className=" font-weight-semibold text-xlarge text-sm-small mb-4">
                     {mentors.firstName} {mentors.lastName}
                    </CardText> */}
                            <div className="d-flex flex-wrap justify-content-between mb-1">
                              <div
                                className="d-flex flex-wrap"
                                style={{ gap: "10px" }}
                              >
                                <div className="font-weight-semibold text-large text-capitalize">
                                  {mentors.firstName}
                                </div>
                                <div className="font-weight-semibold text-large text-capitalize">
                                  {mentors.lastName}
                                </div>
                              </div>
                              <CardText
                                className="text-one d-flex align-items-center flex-wrap"
                                style={{ gap: "4px" }}
                              >
                                <span className="font-weight-semibold">
                                  <Rating
                                    total={5}
                                    rating={mentors.star}
                                    interactive={false}
                                  />
                                </span>
                                <span className="font-weight-semibold">
                                  {mentors.star}
                                </span>
                                <span> ({mentors.ratings} reviews)</span>
                              </CardText>
                            </div>
                            <div className="d-flex" style={{ gap: "8px" }}>
                              <CardText className="text-one text-muted mb-2">
                                {mentors.jobTitle}
                              </CardText>
                              <div>|</div>
                              <CardText className="text-one text-primary mb-2">
                                {mentors.company}
                              </CardText>
                            </div>
                            <CardText
                              className="text-one mb-2"
                              style={{ maxHeight: "62px", overflow: "hidden" }}
                            >
                              {/* {mentors.bio} */}
                              {truncateBio(mentors.bio, 20)}
                            </CardText>
                            <CardText className="d-flex flex-wrap">
                              {/* {mentordetails.skills&&mentordetails.skills.map((skill) => (
              <span key={skill} className="">{skill}</span>
            ))} */}
                              {mentors.skills &&
                                mentors.skills.slice(0, 3).map((skill) => (
                                  <div
                                    key={skill}
                                    className="pr-2"
                                    id="btn.rounded"
                                  >
                                    <Badge color="info">{skill}</Badge>
                                  </div>
                                ))}
                            </CardText>

                            <div className="d-flex justify-content-between align-items-center mt-auto">
                              {/* <NavLink href={`/app/mentorprofile/${mentors.id}`}>
                       <Button color="primary " className="default w-80 py-2  rounded" >
                        View Profile
              </Button>
              </NavLink> */}

                              <div className="text-primary">
                                <span className="text-xlarge font-weight-semibold">
                                  ₹{Math.floor(mentors.price).toLocaleString()}
                                </span>
                                /Hour
                              </div>
                              <Button
                                color="primary"
                                onClick={() =>
                                  history.push(
                                    `/app/mentorprofile/${mentors.id}`
                                  )
                                }
                                className="rounded"
                              >
                                View Profile
                              </Button>
                            </div>
                          </CardBody>
                          {/* </div> */}
                        </Card>
                      </Colxx>
                    </Row>
                  </Colxx>
                );
              })
            )}
          </div>
        </>
      )}
      {isMentorCardFetched && (
        <Pagination
          currentPage={currentPage}
          totalPage={paginationMeta.totalPage}
          onChangePage={(i) => setCurrentPage(i)}
          lastIsActive={paginationMeta.last}
          firstIsActive={paginationMeta.first}
        />
      )}

      {/* <Colxx xxs="12">
      <Row>
      <Colxx  sm="12" md="12" lg="8" xxs="12" className='mx-auto'>
            <Card className=" flex-row listing-card-container  ">
           
              <div className=' postion-relative'>
            
                <img
                      className="card-img-left"
                      src='/assets/img/cards/thumb-1.jpg'
                      alt="Card"
                    />
                    
              </div>
             
              <div className=" d-flex align-items-center">
              <CardBody className=" " >
                  <div className="min-width-zero">
                 
                    <CardText className=" font-weight-semibold text-large mb-2">
                     Suresh Kumar
                    </CardText>
                    <CardText className=" text-one mb-2">
                     FrontEnd developer IN
                    </CardText>
                    <CardText className=" text-one mb-2 text-primary">
                     Aaga technologies
                    </CardText>
                    <CardText className="text-small text-small mb-2">
                     4.5(100 reviews)
                    </CardText>
                    <CardText className=" text-one mb-2">
                    I started programming at an age of 14 because I wanted to help people, 
                    specifically my mother who is an artist and who I made a website for. 
                    Since then I simply got addicted to creating cool and hopefully helpful apps.
                     Peculiarly, it turned out that freelancing as a software …
                    </CardText>
                  
                  </div>
                  <div className='d-flex align-items-center justify-content-between my-5'>
                        <CardText className='text-primary'>
                            <span className='text-large font-weight-semibold'>$290</span>/month
                        </CardText>
                        <Button color="primary " className="default  ">
                        View Profile
              </Button>
                    </div>
                </CardBody>
                
              </div>
             
            </Card>
            
           
          </Colxx>
        
      </Row>
      </Colxx> */}
    </div>
  );
};

export default MentorCard;
