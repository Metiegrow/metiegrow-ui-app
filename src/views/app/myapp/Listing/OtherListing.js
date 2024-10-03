import axios from "axios";
import { Colxx } from "components/common/CustomBootstrap";
import { baseUrl } from "constants/defaultValues";
import Pagination from "containers/pages/Pagination";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  CardSubtitle,
  CardTitle,
  Col,
  Row,
} from "reactstrap";
import TimestampConverter from "../Calculation/TimestampConverter";
import DesktopNotifications from "../notifications/DesktopNotifications";
import ToasterComponent from "../notifications/ToasterComponent";

const JobListing = ({ isPosted }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  // const [totalPage] = useState(2);
  const [items, setItems] = useState([]);
  const [pagination, setPagination] = useState([]);
  const [expandedIndex, setExpandedIndex] = useState(-1);
  const [clickedCardTitle, setClickedCardTitle] = useState("");
  // const [copied, setCopied] = useState(false);
  const [copiedId, setCopiedId] = useState(null);
  const [noData, setNoData] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  console.log("data", noData);
  const url = `${baseUrl}/api/posts/other-post/`;

  const interestedClickUrl = `${baseUrl}/api/posts/other-post/interest`;

  const history = useHistory();

  const toggleExpand = (index) => {
    setExpandedIndex((prevIndex) => (prevIndex === index ? -1 : index));
  };
  // const handleInterest = (title) => {
  //   setClickedCardTitle(title);
  // };
  // const handleInterest = (title) => {
  //   // setClickedCardTitle(title);
  //   // DesktopNotifications({ title });
  //   <DesktopNotifications title={title} />
  // };
  const fetchData = async () => {
    const params = {
      page: currentPage - 1,
      size: 20,
      // sort: [""]
    };
    try {
      // const res = await axios.get(`${url}?_page=${currentPage}&_limit=8`);
      const res = await axios.get(url, { params });
      // console.log("other data",res);
      const { data } = res;
      // const sortedData = data
      //   .map((x) => ({ ...x }))
      //   .sort((a, b) => new Date(b.postedOn) - new Date(a.postedOn));
      setItems(data.otherposts);
      setPagination(data.paginationMeta);
      setIsLoaded(true);
    } catch (error) {
      console.error("Error fetching data:", error);
      // console.log("ck",error.response.data.statuses[0].code)
      setIsLoaded(true);
      if (
        error.response &&
        error.response.data &&
        error.response.data.statuses &&
        error.response.data.statuses[0].code === 40348
      ) {
        setNoData(true);
      }
    }
  };

  useEffect(() => {
    setTimeout(() => {
      fetchData();
    }, 3000);
  }, [currentPage, isPosted]);

  const handleClick = (id) => {
    history.push(`/app/listing/others/view/${id}`);
  };

  // const removeTags = (str) => {
  //   if (str === null || str === '') {
  //       return false;
  //   }
  //   const newStr = str.toString();
  //   return newStr.replace(/<\/?[^>]+(>|$)/g, ' ').trim().replace(/\s+/g, ' ');
  // };
  function removeTags(str) {
    if (typeof str !== "string") {
      return "";
    }
    return str.replace(/(<([^>]+)>)/gi, "");
  }

  const handleInterestedButtonClick = async (id, title) => {
    const data = {
      otherPostId: id,
      interested: true,
    };

    try {
      const response = await axios.post(interestedClickUrl, data);
      setClickedCardTitle(title);
      ToasterComponent("success", response.data.statuses);
      fetchData();
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

  const handleShareButtonClick = async (id) => {
    try {
      await navigator.clipboard.writeText(
        `${window.location.href}/otherlisting/view/${id}`
      );
      setCopiedId(id);
      setTimeout(() => {
        setCopiedId(null);
      }, 3000);
    } catch (error) {
      console.error("Error copying link:", error);
    }
  };

  return !isLoaded ? (
    <div className="loading" />
  ) : (
    <>
      {!items.length > 0 ? (
        <Card className="d-flex justify-content-center align-items-center ">
          <h2 className="mt-4 mb-4">There are no posts available</h2>
        </Card>
      ) : (
        <div className="disable-text-selection">
          {items.map((data, index) => (
            <Row key={data.id} className="mb-2">
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
                          {/* Posted on {new Date(data.postedOn).toLocaleDateString()}{" "} */}
                          {/* Posted on {new Date(data.postedOn).toLocaleString()} */}
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

                    <Row className="align-items-center">
                      <Col className="">
                        {/* {data.interestedCount && (
                          <div className="text-muted mt-2">
                            {data.interestedCount} people have shown interest
                          </div>
                        )} */}
                        {data.interestedCount} people have shown interest
                      </Col>
                      <Col className="text-md-right mt-2 mt-md-0 d-flex justify-content-end">
                        <Button
                          outline
                          color="primary"
                          className="mr-2"
                          size="xs"
                          onClick={() => handleClick(data.id)}
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
                          outline
                          color="primary"
                          className="d-block d-lg-none"
                          size="xs"
                          active={data.loggedInUserInterested}
                          // onClick={() =>
                          //   handleInterestedButtonClick(data.id, data.title)
                          // }
                          onClick={() =>
                            handleInterestedButtonClick(data.id, data.title)
                          }
                          // onClick={() =>
                          //   handleInterestedButtonClick(
                          //     data.loggedInUserInterested,
                          //     data.id
                          //   )
                          // }
                          onMouseEnter={() => setIsHovered(true)}
                          onMouseLeave={() => setIsHovered(false)}
                        >
                          <i
                            // className={`iconsminds-like ${
                            //   data.loggedInUserInterested
                            //     ? "text-white"
                            //     : "text-primary"
                            // }`}
                            className={`iconsminds-like ${
                              data.loggedInUserInterested || isHovered
                                ? "text-white"
                                : "text-primary"
                            }`}
                          />
                        </Button>
                        {/* <Button
                          outline
                          color="primary"
                          size="xs"
                          className="d-none d-lg-block"
                          onClick={() =>
                            handleInterestedButtonClick(data.id, data.title)
                          }
                        >
                          I&apos;m interested
                        </Button> */}
                        <Button
                          // onClick={() =>
                          //   handleInterestedButtonClick(
                          //     data.loggedInUserInterested,
                          //     data.id
                          //   )
                          // }
                          onClick={() =>
                            handleInterestedButtonClick(data.id, data.title)
                          }
                          outline
                          color="primary"
                          size="xs"
                          active={data.loggedInUserInterested}
                          className="d-none d-lg-block "
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
          {clickedCardTitle && (
            <DesktopNotifications title={clickedCardTitle} />
          )}
        </div>
      )}
    </>
  );
};

export default JobListing;
