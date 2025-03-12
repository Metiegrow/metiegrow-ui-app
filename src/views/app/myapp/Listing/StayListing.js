import axios from "axios";
import { baseUrl } from "constants/defaultValues";
import Pagination from "containers/pages/Pagination";
import { useEffect, useState } from "react";
// import { useHistory } from "react-router-dom";
import {
  // Collapse,
  Button,
  Card,
  CardBody,
  CardImg,
  CardSubtitle,
  Col,
  Row,
} from "reactstrap";
import ToasterComponent from "../notifications/ToasterComponent";

const StayListing = ({ isPosted }) => {
  const [expandedIndex, setExpandedIndex] = useState(-1);
  const [items, setItems] = useState([]);
  const [pagination, setPagination] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoaded, setIsLoaded] = useState(false);
  // const [copiedId, setCopiedId] = useState(null);
  const [isOwnerInfoVisible, setIsOwnerInfoVisible] = useState(false);

  // const toggleOwnerInfo = () => {
  //   setIsOwnerInfoVisible((prev) => !prev);
  // };
  const toggleOwnerInfo = (id) => {
    setIsOwnerInfoVisible((prevId) => (prevId === id ? null : id)); // Toggle owner info
  };

  // const [totalPage] = useState(2);
  // const history = useHistory();

  const url = `${baseUrl}/api/posts/stay-post/`;
  // const interestedClickUrl = `${baseUrl}/api/posts/stay-post/intereststayroomId=${id}&interested=true`;
  const interestedClickUrl = `${baseUrl}/api/posts/stay-post/interest`;

  const fetchDataFromServer = async () => {
    try {
      const params = {
        page: currentPage - 1,
        size: 20,
        // sort: [""]
      };
      // const res = await axios.get(`${url}?_page=${currentPage}&_limit=4`);
      const res = await axios.get(url, { params });
      const { data } = res;
      // const sortedData = data.map(x => ({ ...x })).sort((a, b) => new Date(b.postedOn) - new Date(a.postedOn));
      setPagination(data.paginationMeta);
      setItems(data.stayrooms);
      setIsLoaded(true);

      console.log(data.stayrooms);
    } catch (error) {
      setIsLoaded(true);

      console.error("Error while fetching data from the server", error);
    }
  };
  useEffect(() => {
    fetchDataFromServer();
  }, [currentPage, isPosted]);

  const toggleExpand = (index) => {
    if (expandedIndex === index) {
      setExpandedIndex(-1);
    } else {
      setExpandedIndex(index);
    }
  };
  // const handleClick = (id) => {
  //   history.push(`/app/listing/stay/view/${id}`);
  // };

  const handleInterestedButtonClick = async (id) => {
    const data = {
      // jobListingId: id,
      stayroomId: id,
      interested: true,
    };

    try {
      const response = await axios.post(interestedClickUrl, data);
      ToasterComponent("success", response.data.statuses);
      fetchDataFromServer();
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.statuses
      ) {
        ToasterComponent("error", error.response.data.statuses);
      } else {
        console.error("Error sending interest:", error);
      }
    }
  };

  function removeTags(str) {
    if (typeof str !== "string") {
      return "";
    }
    return str.replace(/(<([^>]+)>)/gi, "");
  }

  // const handleShareButtonClick = async (id) => {
  //   try {
  //     await navigator.clipboard.writeText(
  //       `${window.location.href}/staylisting/view/${id}`
  //     );
  //     setCopiedId(id);
  //     setTimeout(() => {
  //       setCopiedId(null);
  //     }, 3000);
  //   } catch (error) {
  //     console.error("Error copying link:", error);
  //   }
  // };

  return !isLoaded ? (
    <div className="loading" />
  ) : (
    <>
      {/* {!items.length > 0 ? (
        <Card className="d-flex justify-content-center align-items-center ">
          <h2 className="mt-4 mb-4">There are no posts available</h2>
        </Card>
      ) : (
        <div className="disable-text-selection">
          {items.map((data, index) => (
            <Row key={data.title} className="mb-2">
              <Colxx xxs="12">
                <Card className="mx-auto" style={{ maxWidth: "900px" }}>
                  <CardBody className="p-4">
                    <Row>
                      <Col>
                        <CardTitle className="font-weight-bold">
                          {data.title}
                        </CardTitle>
                      </Col>

                      <Col className="text-right">
                        <p className="text-muted">
                          Posted on{" "}
                          <TimestampConverter
                            timeStamp={data.postedOn}
                            format="datetime"
                          />
                        </p>
                      </Col>
                    </Row>
                   
                    {expandedIndex === index ? (
                      <CardSubtitle>
                        {removeTags(data.description)}
                      </CardSubtitle>
                    ) : (
                      <CardSubtitle>
                        {`${removeTags(data.description).slice(0, 100)}...`}
                        {data.description.length > 100 && (
                          <Button
                            color="link"
                            onClick={() => toggleExpand(index)}
                            className=" p-0"
                          >
                            {expandedIndex === index
                              ? "Read less"
                              : "Read more"}
                          </Button>
                        )}
                      </CardSubtitle>
                    )}

                    <Row>
                      <Col md={5}>
                        <i className="iconsminds-office text-primary" />{" "}
                        <span data-toggle="tooltip" title="Apartment Type">
                          {data.apartmentType}
                        </span>{" "}
                        |{" "}
                        <span data-toggle="tooltip" title="Floor">
                          {data.floor}
                        </span>{" "}
                        |{" "}
                        <span data-toggle="tooltip" title="BHK Type">
                          {data.bhkType}
                        </span>
                      </Col>

                      <Col>
                        <i className="simple-icon-people text-primary" />{" "}
                        <span data-toggle="tooltip" title="Room mate">
                          {data.roomMate}
                        </span>
                      </Col>
                      <Col>
                        <span className="text-primary">₹</span>{" "}
                        <span data-toggle="tooltip" title="Expected Rent">
                          {data.expectedRent}
                        </span>
                      </Col>
                      <Col>
                        <i className="iconsminds-car text-primary" />

                        <span data-toggle="tooltip" title="Parking">
                          {data.parking}
                        </span>
                      </Col>
                    </Row>

                    <Row className="mt-2">
                      <Col className="text-start text-sm-left" xs={12} sm={6}>
                        <div className="text-muted mt-2">
                          {data.interestedCount} people have shown interest
                        </div>
                      </Col>
                      <Col
                        className="text-sm-right texr-start mt-sm-0 mt-2"
                        xs={12}
                        sm={6}
                      >
                        <Button
                          outline
                          color="primary"
                          className="mr-2"
                          size="xs"
                          onClick={() => handleClick(data.id)}
                          data-toggle="tooltip"
                          title="Full screen"
                        >
                          <i className="simple-icon-size-fullscreen text-primary" />
                        </Button>
                        {copiedId === data.id && (
                          <span className="text-success mr-2">
                            Link copied to clipboard!
                          </span>
                        )}
                        <Button
                          outline
                          color="primary"
                          className="mr-2"
                          size="xs"
                          onClick={() => handleShareButtonClick(data.id)}
                          data-toggle="tooltip"
                          title="copy"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="bi bi-copy"
                            viewBox="0 0 16 16"
                          >
                            <path
                              fillRule="evenodd"
                              d="M4 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1h1v1a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1v1z"
                            />
                          </svg>
                        </Button>
                        <Button
                          onClick={() => handleInterestedButtonClick(data.id)}
                          outline
                          color="primary"
                          size="xs"
                          active={data.loggedInUserInterested}
                        >
                          I&apos;m interested
                        </Button>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Colxx>
            </Row>
          ))}
          <Pagination
            currentPage={currentPage}
            totalPage={pagination.totalPage}
            onChangePage={(i) => setCurrentPage(i)}
            lastIsActive={pagination.first}
            firstIsActive={pagination.last}
          />
        </div>
      )} */}

      {/* new design starts  */}
      {!items.length > 0 ? (
        <Card className="d-flex justify-content-center align-items-center ">
          <h2 className="mt-4 mb-4">There are no posts available</h2>
        </Card>
      ) : (
        <div className="disable-text-selection">
          <Row>
            {items.map((data, index) => (
              <Col xxs="12" md={6} key={data.title} className="mb-2">
                <Card className="mx-auto mt-2">
                  <CardBody className="p-4 position-relative">
                    <Button
                      className="rounded-circle px-2 py-0   text-one bg-white position-absolute "
                      style={{
                        border: "3px solid #a16390",
                        top: "30px",
                        right: "30px",
                        cursor: "pointer",
                        zIndex: 10,
                      }}
                      // onClick={toggleOwnerInfo}
                      onClick={() => toggleOwnerInfo(data.id)}
                    >
                      <i
                        className="fa-solid fa-user"
                        color="secondary"
                        style={{ color: "#a16390" }}
                      />
                    </Button>
                    <CardImg
                      top
                      // src="/assets/img/cards/thumb-1.jpg"
                      // src="https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
                      src={
                        data.images.length > 0
                          ? `${baseUrl}/${data.images[0].imageUrl}` // Use the first image URL
                          : "https://via.placeholder.com/300x200?text=No+Image" // Fallback image
                      }
                      alt="Card image cap"
                      className="mb-2"
                      style={{
                        opacity: isOwnerInfoVisible === data.id ? 0.1 : 1, // Reduce opacity when info is visible
                        transition: "opacity 0.3s ease-in-out",
                        height: "300px",
                        objectFit: "fill", // Add a transition effect
                      }}
                    />
                    {/* <span>
                      <h2>Owner: Prakash Raj</h2>
                      <h5>
                        <i className="simple-icon-phone" /> 9876543210
                      </h5>
                      <h5>
                        <i className="iconsminds-mail-link" />
                        prakash@gmail.com
                      </h5>
                    </span> */}

                    {isOwnerInfoVisible === data.id && (
                      <span
                        style={{
                          position: "absolute",
                          top: "100px",
                          right: "80px",

                          padding: "10px",
                          borderRadius: "5px",
                          // boxShadow: "0 0 5px rgba(0,0,0,0.5)",
                        }}
                        className="font-weight-bold"
                      >
                        <h2 className="text-large">Owner: {data.ownerName}</h2>
                        <h4 className="">
                          {/* <i className="simple-icon-phone" /> */}
                          <i className="fa-solid fa-phone mr-2" />
                          {data.mobileNumber}
                        </h4>
                        <h4
                          className="d-inline-flex align-items-center"
                          style={{ display: "inline-flex" }}
                        >
                          {/* <i className="iconsminds-envelope" color="primary" />{" "} */}
                          <i className="fa-solid fa-envelope mr-2" />{" "}
                          {data.email}
                        </h4>
                      </span>
                    )}

                    <Row>
                      <Col
                        xs="12"
                        sm="12"
                        className="d-flex align-items-center"
                      >
                        <h3 className="font-weight-bold mt-2 text-one ">
                          Rent: <span className="text-primary">₹</span>
                          <span data-toggle="tooltip" title="Expected Rent">
                            {data.expectedRent}
                          </span>
                        </h3>
                        <Button
                          color="light"
                          className=" font-weight-semibold mx-2"
                          size="xs"
                          style={{ pointerEvents: "none" }} 
                        >
                          {data.apartmentType}
                        </Button>
                      </Col>

                      {/* <Col className="text-right">
                        <p className="text-muted">
                          Posted on{" "}
                          <TimestampConverter
                            timeStamp={data.postedOn}
                            format="datetime"
                          />
                        </p>
                      </Col> */}
                    </Row>
                    {/* <CardSubtitle>{data.description}</CardSubtitle> */}
                    {expandedIndex === index ? (
                      <CardSubtitle>
                        {removeTags(data.description)}
                      </CardSubtitle>
                    ) : (
                      <CardSubtitle>
                        {`${removeTags(data.description).slice(0, 100)}...`}

                        {data.description.length > 100 && (
                          <Button
                            color="link"
                            onClick={() => toggleExpand(index)}
                            className=" p-0"
                          >
                            {expandedIndex === index
                              ? "Read less"
                              : "Read more"}
                          </Button>
                        )}
                      </CardSubtitle>
                    )}

                    {/* <Row>
                      <Col md={5}>
                        <i className="iconsminds-office text-primary" />{" "}
                        <span data-toggle="tooltip" title="Apartment Type">
                          {data.apartmentType}
                        </span>{" "}
                        |{" "}
                        <span data-toggle="tooltip" title="Floor">
                          {data.floor}
                        </span>{" "}
                        |{" "}
                        <span data-toggle="tooltip" title="BHK Type">
                          {data.bhkType}
                        </span>
                      </Col>

                      <Col>
                        <i className="simple-icon-people text-primary" />{" "}
                        <span data-toggle="tooltip" title="Room mate">
                          {data.roomMate}
                        </span>
                      </Col>
                      <Col>
                        <span className="text-primary">₹</span>{" "}
                        <span data-toggle="tooltip" title="Expected Rent">
                          {data.expectedRent}
                        </span>
                      </Col>
                      <Col>
                        <i className="iconsminds-car text-primary" />

                        <span data-toggle="tooltip" title="Parking">
                          {data.parking}
                        </span>
                      </Col>
                    </Row> */}
                    {/* icons tstart */}
                    <Row>
                      <Col className="d-flex flex-wrap">
                        <Button
                          color="light"
                          className="font-weight-bold mr-1 my-1"
                          size="sm"
                            style={{ pointerEvents: "none" }} 
                        >
                          <i className="fas fa-bed " /> {data.bhkTypeValue}
                        </Button>
                        <Button
                          color="light"
                          className="font-weight-bold m-1"
                          size="sm"
                          style={{ pointerEvents: "none" }} 
                        >
                          <i className="fa-solid fa-shower" />{" "}
                          {data.bhkTypeValue}
                        </Button>
                        <Button
                          color="light"
                          className="font-weight-bold m-1"
                          size="sm"
                          style={{ pointerEvents: "none" }} 
                        >
                          <i className="fa-solid fa-car" /> {data.parkingCount}
                        </Button>
                      </Col>
                    </Row>
                    {/* icons end */}

                    <Row className="mt-2">
                      <Col className="text-start text-sm-left" xs={12} sm={6}>
                        <div className="text-muted mt-2">
                          {data.interestedCount} liked this property
                        </div>
                      </Col>
                      <Col
                        className="text-sm-right texr-start mt-sm-0 mt-2"
                        xs={12}
                        sm={6}
                      >
                        {/* <Button
                          outline
                          color="primary"
                          className="mr-2"
                          size="xs"
                          onClick={() => handleClick(data.id)}
                          data-toggle="tooltip"
                          title="Full screen"
                        >
                          <i className="simple-icon-size-fullscreen text-primary" />
                        </Button>
                        {copiedId === data.id && (
                          <span className="text-success mr-2">
                            Link copied to clipboard!
                          </span>
                        )}
                        <Button
                          outline
                          color="primary"
                          className="mr-2"
                          size="xs"
                          onClick={() => handleShareButtonClick(data.id)}
                          data-toggle="tooltip"
                          title="copy"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="bi bi-copy"
                            viewBox="0 0 16 16"
                          >
                            <path
                              fillRule="evenodd"
                              d="M4 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1h1v1a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1v1z"
                            />
                          </svg>
                        </Button> */}
                        <Button
                          onClick={() => handleInterestedButtonClick(data.id)}
                          outline
                          color="primary"
                          size="xs"
                          active={data.loggedInUserInterested}
                        >
                          I&apos;m interested
                        </Button>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
            ))}
          </Row>
          <Pagination
            currentPage={currentPage}
            totalPage={pagination.totalPage}
            onChangePage={(i) => setCurrentPage(i)}
            lastIsActive={pagination.first}
            firstIsActive={pagination.last}
          />
        </div>
      )}
      {/* new design ends  */}
    </>
  );
};

export default StayListing;
