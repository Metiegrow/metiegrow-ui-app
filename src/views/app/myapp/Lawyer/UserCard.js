import axios from "axios";
import ThumbnailLetters from "components/cards/ThumbnailLetters";
import { Colxx } from "components/common/CustomBootstrap";
import Rating from "components/common/Rating";
import { baseUrl } from "constants/defaultValues";
import Pagination from "containers/pages/Pagination";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Badge, Button, Card, CardBody, CardText, Row } from "reactstrap";
// import MentorDropDown from '../mentorship/MentorDropDown';
import "./ThumbnailImage.css";

import LawyerCardFilter from "./LawyerCardFilter";

const UserCard = () => {
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [selectedPrice, setSelectedPrice] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isFirst, setIsFirst] = useState(true);
  const [isLast, setIsLast] = useState(true);
  const [totalPage, setTotalPage] = useState(1);

  // const [searchClick, setSearchClick] = useState("")
  // const [searchClicked, setSearchClicked] = useState(false)

  const url = `${baseUrl}/api/lawyer/lawyercards`;

  const handleTopicsChange = (topics) => setSelectedTopics(topics);
  const handlePriceChange = (price) => setSelectedPrice(price);
  const handleLocationChange = (location) => setSelectedLocation(location);
  const handleLanguageChange = (language) => setSelectedLanguage(language);

  // console.log("selectedTopics",selectedTopics)
  // console.log("selectedLanguage",selectedLanguage)
  // console.log("selectedPrice",selectedPrice)
  // console.log("selectedLocation",selectedLocation)

  const [isLawyerCardFetched, setIsLawyerCardFetched] = useState(false);

  const [userdetails, setUserDetails] = useState("");
  const [inputkey, setInputKey] = useState("");
  // const handleSearchByName = () => {
  //   setSearchClick(inputkey);
  //   // setSearchClicked(true);
  // }
  // const handleSearchClear = () =>{
  //   setInputKey("");
  //   setSearchClick("");
  //   setSearchClicked(false);
  // }
  // const url=`${baseUrl}/user/cards`
  const history = useHistory();

  // Backend url below
  // const url =`${baseUrl}/api/lawyer`
  // useEffect(()=>{
  //   setIsLawyerCardFetched(false);
  //   const UserList = async () => {
  //     try {
  //       const response = await axios.get(url);
  //       setUserDetails(response.data);
  //       setIsLawyerCardFetched(true);
  //     } catch (error) {
  //       console.error('Error fetching data:', error);
  //       setIsLawyerCardFetched(true);
  //     }
  //   };
  //   UserList();
  // },[])

  useEffect(() => {
    setIsLawyerCardFetched(false);
    const LawyerCardDetails = async () => {
      // const params = {
      //   company: selectedIndustry,
      //   location: selectedLocation,
      //   skills: selectedSkills,
      // };
      const params = {};

      if (selectedLocation) {
        params.location = selectedLocation;
      }
      if (selectedPrice) {
        // params.price = selectedPrice;
        params.minPrice = selectedPrice.at(0);
        params.maxPrice = selectedPrice.at(1);
      }
      if (selectedLanguage) {
        params.languages = selectedLanguage;
      }
      if (selectedTopics) {
        params.topic = selectedTopics;
      }
      if (inputkey) {
        params.firstName = inputkey;
      }
      params.page = currentPage - 1;
      params.size = 10;
      try {
        const response = await axios.get(url, { params });
        setUserDetails(response.data.data);
        // setCurrentPage(response.data.paginationMeta.pageNumber);
        setTotalPage(response.data.paginationMeta.totalPage);
        setIsFirst(response.data.paginationMeta.first);
        setIsLast(response.data.paginationMeta.last);
        setIsLawyerCardFetched(true);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLawyerCardFetched(true);
      }
    };
    LawyerCardDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    selectedLocation,
    selectedLanguage,
    selectedTopics,
    currentPage,
    selectedPrice,
    inputkey,
  ]);

  const truncateBio = (bio, lineCount) => {
    if (!bio) return "";
    const words = bio.split(" ");

    const truncatedBio = words.slice(0, lineCount).join(" ");

    if (words.length > lineCount) {
      return `${truncatedBio}...`;
    }
    return truncatedBio;
  };

  return (
    <div>
      <Colxx sm="12" md="12" lg="8" xxs="12" className="mx-auto ">
        <div>
          <div className="">
            <div className="form-group">
              <div className="input-group">
                {/* <input
            type="text"
            className="form-control rounded col-12 col-lg-8 col-md-8 py-2"
            placeholder='Search by name'
            // disabled={searchClicked}
            value={inputkey}
            onChange={(e) =>setInputKey(e.target.value)}
          /> */}
                <div
                  style={{ position: "relative" }}
                  className="col-12 col-lg-7 col-md-7"
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

                {/* {!searchClicked ? (
      
          <Button disabled={!inputkey} className='ml-3 ' color='primary' onClick={() => handleSearchByName()} >Search</Button> ) : (
          <Button className='ml-3 ' onClick={() => handleSearchClear()} color='primary' >Clear</Button>
        )} */}
              </div>

              <LawyerCardFilter
                onTopicsChange={handleTopicsChange}
                onPriceChange={handlePriceChange}
                onLocationChange={handleLocationChange}
                onLanguageChange={handleLanguageChange}
                selectedTopics={selectedTopics}
                selectedLocation={selectedLocation}
                selectedLanguage={selectedLanguage}
              />
            </div>
          </div>
        </div>
      </Colxx>
      {!isLawyerCardFetched ? (
        <div className="loading" />
      ) : (
        <>
          {userdetails.length === 0 ? (
            <Colxx sm="12" md="12" lg="8" xxs="12" className="mx-auto ">
              <Card>
                <CardBody>
                  <h2 className="text-center text-large ">No Lawyers</h2>
                </CardBody>
              </Card>
            </Colxx>
          ) : (
            userdetails.map((users) => {
              return (
                <Colxx xxs="12" key={users.id}>
                  <Row>
                    <Colxx sm="12" md="12" lg="8" xxs="12" className="mx-auto">
                      <Card
                        className="flex-row flex-wrap flex-sm-nowrap listing-card-container my-3 p-3"
                        style={{ gap: "16px" }}
                      >
                        {/* <Col md={5} lg={5}> */}
                        <div className="d-block lawyer-card-img-container">
                          {users.imageUrl === null ? (
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
                                text={users.firstName}
                                className="text-xlarge border border-1"
                                style={{ textAlign: "center" }}
                              />
                            </div>
                          ) : (
                            <img
                              className="lawyer-card-width"
                              src={`${baseUrl}/${users.imageUrl}`}
                              alt="Card"
                            />
                          )}
                          {/* <img src="/assets/img/profiles/1.jpg" alt='card' className='card-img-left'/> */}
                        </div>
                        {/* <div className="my-5  ">
                              <CardText className="text-primary ">
                                <span className="text-xlarge font-weight-semibold">
                                  ₹{Math.floor(users.price).toLocaleString()}
                                </span>
                              </CardText>
                            </div>
                          </div> */}
                        {/* </Col> */}
                        {/* <Col md={7} lg={7}> */}
                        {/* <div className=" d-flex align-items-center"> */}
                        <CardBody className="d-flex flex-column flex-fill p-0">
                          {/* <div className="min-width-zero"> */}
                          {/* <CardText className=" font-weight-semibold text-xlarge mb-4">
                     {users.firstName} {users.lastName}
                    </CardText> */}
                          <div
                            className="d-flex flex-wrap justify-content-between mb-1"
                            style={{ columnGap: "24px" }}
                          >
                            <div
                              className="d-flex flex-wrap"
                              style={{ gap: "10px" }}
                            >
                              <div className="font-weight-semibold text-xlarge text-capitalize">
                                {users.firstName}
                              </div>
                              <div className="font-weight-semibold text-xlarge text-capitalize">
                                {users.lastName}
                              </div>
                            </div>
                            {/* <CardText className=" text-one mb-2 text-primary">
                     {users.company}
                    </CardText> */}
                            <CardText
                              className="text-one d-flex flex-wrap align-items-center"
                              style={{ gap: "4px" }}
                            >
                              <span className="font-weight-semibold">
                                <Rating
                                  total={5}
                                  rating={users.star}
                                  interactive={false}
                                />
                              </span>
                              <span className="font-weight-semibold">
                                {users.star}
                              </span>
                              <span> ({users.ratings} reviews)</span>
                            </CardText>
                          </div>
                          {/* <div className="d-flex" style={{ gap: "8px" }}>
                            <CardText className="text-one text-muted mb-2">
                              {users.jobTitle}
                            </CardText>
                            <div>|</div>
                            <CardText className="text-one text-primary mb-2">
                              {users.company}
                            </CardText>
                          </div> */}
                          <CardText
                            className="text-one mb-2"
                            style={{ maxHeight: "62px", overflow: "hidden" }}
                          >
                            {truncateBio(users.bio, 20)}
                          </CardText>
                          <CardText className="d-flex flex-wrap">
                            {users.topic &&
                              users.topic.slice(0, 3).map((skill) => (
                                <div
                                  key={skill}
                                  className="pr-2"
                                  id="btn.rounded"
                                >
                                  <Badge color="light">{skill}</Badge>
                                </div>
                              ))}
                          </CardText>

                          <div
                            className="d-flex justify-content-between align-items-center mt-auto flex-wrap"
                            style={{ columnGap: "24px" }}
                          >
                            {/* <NavLink href={`/app/mentorprofile/${users.id}`}>
                       <Button color="primary " className="default w-80 py-2  rounded" >
                        View Profile
              </Button>
              </NavLink> */}
                            {/* <NavLink href={`/app/lawyerprofile/${users.id}`}>
              <Button color="primary " className="default w-80 py-2  rounded" >
                        View Profile
              </Button>
              </NavLink> */}
                            <div className="text-primary">
                              <span className="text-xlarge font-weight-semibold">
                                ₹{Math.floor(users.price).toLocaleString()}
                              </span>
                            </div>
                            <Button
                              color="primary"
                              onClick={() =>
                                history.push(`/app/lawyerprofile/${users.id}`)
                              }
                              className="rounded"
                            >
                              View Profile
                            </Button>
                          </div>
                        </CardBody>
                        {/* </div> */}
                        {/* </Col> */}
                      </Card>
                    </Colxx>
                  </Row>
                </Colxx>
              );
            })
          )}
        </>
      )}
      {isLawyerCardFetched && (
        <Pagination
          currentPage={currentPage}
          totalPage={totalPage}
          onChangePage={(i) => setCurrentPage(i)}
          lastIsActive={isFirst}
          firstIsActive={isLast}
        />
      )}
    </div>
  );
};

export default UserCard;
