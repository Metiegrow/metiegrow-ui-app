import axios from "axios";
import { Colxx } from "components/common/CustomBootstrap";
// import { useHistory } from "react-router-dom";
// import IntlMessages from 'helpers/IntlMessages';
import { baseUrl } from "constants/defaultValues";
import Pagination from "containers/pages/Pagination";
import { useEffect, useState } from "react";
import { Badge, Button, Card, CardBody, CardText, Row } from "reactstrap";
// import RatingExamples from './RatingExamples';
import ThumbnailLetters from "components/cards/ThumbnailLetters";
import Rating from "components/common/Rating";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import MentorFilter from "./MentorFilter";
import "./mentorcard.css";
// import MentorDropDown from './MentorDropDown';

const MentorCard = () => {
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [selectedTools, setSelectedTools] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState("");
  const [selectedPrice, setSelectedPrice] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [paginationMeta, setPaginationMeta] = useState([]);

  const locationCategory = useLocation();
  const category = locationCategory.state?.category;

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
  // console.log("selectedPrice", selectedPrice);
  // console.log("selectedLocation", selectedLocation);

  const [isMentorCardFetched, setIsMentorCardFetched] = useState(false);

  // const url1=`${baseUrl}/mentorDetails`
  // const url1=`${baseUrl}/api/mentor`
  const url2 = `${baseUrl}/api/mentor/cards`;
  // const imageUrl = `${baseUrl}/api/public/images`;
  // To change to backend api url uncomment the below line
  // const url1=`${baseUrl}/api/mentor`
  // const history = useHistory();

  const [mentordetails, setMentorDetails] = useState([]);
  // const[mentorfilter,setMentorFilter]=useState([]);
  // const [image]=useState('');
  const [inputkey, setInputKey] = useState("");

  // const [filteredMentors, setFilteredMentors] = useState([]);
  const truncateBio = (bio, lineCount) => {
    if (!bio) return "";
    const words = bio.split(" ");

    const truncatedBio = words.slice(0, lineCount).join(" ");

    if (words.length > lineCount) {
      return `${truncatedBio}...`;
    }
    return truncatedBio;
  };

  useEffect(() => {
    setIsMentorCardFetched(false);
    const mentorCardDetails = async () => {
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
        params.minPrice = selectedPrice.at(0);
        params.maxPrice = selectedPrice.at(1);
      }
      if (inputkey) {
        params.firstName = inputkey;
      }
      if (category) {
        params.category = category.value; // Adding selectedCategory.value
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    selectedLocation,
    selectedIndustry,
    selectedSkills,
    selectedTools,
    selectedPrice,
    currentPage,
    inputkey,
  ]);

  return (
    <div>
      <Colxx sm="12" md="12" lg="8" xxs="12" className="mx-auto ">
        <div>
          <div className="">
            <div className="form-group">
              <div className="input-group">
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
              </div>

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
                userRole="mentor"
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
                        lg="9"
                        xxs="12"
                        className="mx-auto"
                      >
                        <Card
                          className="flex-row flex-wrap flex-sm-nowrap listing-card-container my-3 p-3"
                          style={{ gap: "16px" }}
                        >
                          <div className="d-block mentor-card-img-container">
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
                                  width: "200px",
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
                                className="mentor-card-width"
                                // src={`${baseUrl}/api/public/images/${mentors.id}/profile-pic`}
                                src={`${baseUrl}/${mentors.imageUrl}`}
                                // src={`${baseUrl/${mentors.imageUrl}`}
                                alt="Card"
                              />
                            )}
                          </div>

                          {/* <div className="d-flex flex-fill"> */}
                          <CardBody className="d-flex flex-column flex-fill p-0">
                            {/* <CardText className=" font-weight-semibold text-xlarge text-sm-small mb-4">
                     {mentors.firstName} {mentors.lastName}
                    </CardText> */}
                            <div
                              className="d-flex flex-wrap justify-content-between mb-1"
                              style={{ columnGap: "24px" }}
                            >
                              <div
                                className="d-flex flex-wrap align-items-center"
                                style={{ gap: "10px" }}
                              >
                                <div className="font-weight-semibold text-large text-capitalize">
                                  {mentors.firstName}
                                </div>
                                <div className="font-weight-semibold text-large text-capitalize">
                                  {mentors.lastName}
                                </div>
                                <div className="mx-2">
                                  <Badge
                                    pill
                                    style={{
                                      background: "#fcba0a",
                                    }}
                                    color="#fcba0a"
                                    className="py-1 px-2 text-one text-dark"
                                  >
                                    {mentors.consultations} consultants
                                  </Badge>
                                </div>
                              </div>

                              <CardText
                                className="text-one d-flex align-items-center flex-wrap"
                                style={{ gap: "4px" }}
                              >
                                <span className="font-weight-semibold mt-md-0 mt-2">
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

                            <div>
                              <CardText>
                                <p className="text-muted ">Ready to offer</p>
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
                                      <Badge color="light">{skill}</Badge>
                                    </div>
                                  ))}
                              </CardText>
                            </div>

                            <div
                              className="d-flex justify-content-between align-items-center mt-auto flex-wrap"
                              style={{ columnGap: "24px" }}
                            >
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
                              {/* <Button
                                color="primary"
                                onClick={() =>
                                  history.push(
                                    `/app/mentorprofile/${mentors.id}`
                                  )
                                }
                                className="rounded"
                              >
                                View Profile
                              </Button> */}
                              <a
                                href={`/app/mentorprofile/${mentors.id}`}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <Button color="primary" className="rounded">
                                  View Profile
                                </Button>
                              </a>
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
    </div>
  );
};

export default MentorCard;
