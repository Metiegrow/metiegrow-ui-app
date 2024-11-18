/* eslint-disable jsx-a11y/click-events-have-key-events */
import axios from "axios";
import { baseUrl } from "constants/defaultValues";
import Pagination from "containers/pages/Pagination";
import { useEffect, useState } from "react";
// import { useHistory } from "react-router-dom";

import {
  Button,
  Card,
  CardBody,
  CardImg,
  CardSubtitle,
  Col,
  Row,
} from "reactstrap";

import TimestampConverter from "../Calculation/TimestampConverter";
// import ToasterComponent from "../notifications/ToasterComponent";
import ToasterComponent from "../notifications/ToasterComponent";

const JobListing = ({ isPosted }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [items, setItems] = useState([]);
  const [expandedIndex, setExpandedIndex] = useState(-1);
  const [isFirst, setIsFirst] = useState(true);
  const [isLast, setIsLast] = useState(true);
  // const [modal, setModal] = useState(false);
  // const [interestPerson, setInterestPerson] = useState([]);
  // const [copiedId, setCopiedId] = useState(null);

  // const toggle = () => setModal(!modal);
  const url = `${baseUrl}/api/posts/job-post/`;
  const interestedClickUrl = `${baseUrl}/api/posts/job-post/interested`;
  // const history = useHistory();
  const currentUserId = localStorage.getItem("userId");
  const currentUserRole = localStorage.getItem("roleRes");
  const currentUserName = localStorage.getItem("userName");
  const toggleExpand = (index) => {
    setExpandedIndex((prevIndex) => (prevIndex === index ? -1 : index));
  };

  const fetchData = async () => {
    const params = {
      page: currentPage - 1,
      size: 20,
      // sort: [""]
    };
    try {
      // const res = await axios.get(`${url}?_page=${currentPage}&_limit=8`);
      const res = await axios.get(url, { params });
      const { data } = res;
      const sortedData = data.jobLists
        .map((x) => ({ ...x }))
        .sort((a, b) => new Date(b.postedOn) - new Date(a.postedOn));
      setItems(sortedData);
      setTotalPage(data.pagination.totalPage);
      setIsFirst(data.pagination.first);
      setIsLast(data.pagination.last);
      // setItems(data.map((x) => ({ ...x })));
      setIsLoaded(true);
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsLoaded(true);
    }
  };

  const fetchInterestedUsers = async (jobId) => {
    try {
      const res = await axios.get(
        `${baseUrl}/api/posts/job-post/interested-users/${jobId}`,
        {
          params: { page: 0, size: 10 },
        }
      );
      const { data } = res;
      return data.interestedUsers; // Return the list of interested users
    } catch (error) {
      console.error("Error fetching interested users:", error);
      return []; // Return an empty array if there's an error
    }
  };
  useEffect(() => {
    setTimeout(() => {
      fetchData();
      fetchInterestedUsers();
    }, 1000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, isPosted, interestedClickUrl]);

  // const handleClick = (id) => {
  //   history.push(`/app/listing/job/view/${id}`);
  // };

  function removeTags(str) {
    if (typeof str === "string") {
      return str.replace(/<[^>]*>/g, "");
    }
    return "";
  }

  // const handleInterestedButtonClick = async (isCurrentlyInterested, itemId) => {
  //   setItems((prev) =>
  //     prev.map((job) => {
  //       if (job.id === itemId) {
  //         // const isAlreadyInterested = job.interestedUsers.some(
  //         //   (user) => user.id === currentUserId
  //         // );
  //         if (isCurrentlyInterested) {
  //           // If already interested, decrement the count and remove the user
  //           return {
  //             ...job,
  //             loggedInUserInterested: false,
  //             interestedCount: job.interestedCount - 1,
  //             interestedUsers: job.interestedUsers.filter(
  //               (user) => user.userId !== +currentUserId
  //             ),
  //           };
  //         }
  //         // If not already interested, increment the count and add the user
  //         return {
  //           ...job,
  //           loggedInUserInterested: true,
  //           interestedCount: job.interestedCount + 1,
  //           interestedUsers: [
  //             ...job.interestedUsers,
  //             {
  //               userId: +currentUserId,
  //               role: currentUserRole,
  //               userName: currentUserName,
  //             },
  //           ],
  //         };
  //       }
  //       return job;
  //     })
  //   );
  //   const data = {
  //     jobListingId: itemId,
  //     interested: !isCurrentlyInterested,
  //   };
  //   try {
  //     await axios.post(interestedClickUrl, data);
  //     // ToasterComponent("success", res.data.statuses);
  //   } catch (error) {
  //     console.error("Error sending interest:", error);
  //   }
  // };

  // const handleInterestPersonPage = (item) => {
  //   setInterestPerson(item);
  //   setModal(!modal);
  // };

  const handleInterestedButtonClick = async (isCurrentlyInterested, itemId) => {
    setItems((prev) =>
      prev.map((job) => {
        if (job.id === itemId) {
          // Initialize interestedUsers array if it doesn't exist
          const interestedUsers = job.interestedUsers || [];

          if (isCurrentlyInterested) {
            // If already interested, decrement the count and remove the user
            return {
              ...job,
              loggedInUserInterested: false,
              interestedCount: job.interestedCount - 1,
              interestedUsers: interestedUsers.filter(
                (user) => user.userId !== +currentUserId
              ),
            };
          }
          // If not already interested, increment the count and add the user
          return {
            ...job,
            loggedInUserInterested: true,
            interestedCount: job.interestedCount + 1,
            interestedUsers: [
              ...interestedUsers,
              {
                userId: +currentUserId,
                role: currentUserRole,
                userName: currentUserName,
              },
            ],
          };
        }
        return job;
      })
    );

    const data = {
      jobListingId: itemId,
      interested: !isCurrentlyInterested,
    };

    try {
      const response = await axios.post(interestedClickUrl, data);
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

  // const handleInterestPersonPage = (item) => {
  //   // Set the state with the interested users
  //   setInterestPerson(item);
  //   setModal(!modal);
  // };
  // const handleKeyDown = (event) => {
  //   if (event.key === "Enter" || event.key === " ") {
  //     handleInterestPersonPage();
  //   }
  // };

  // const handleUserClick = (user) => {
  //   const lowerCaseRole = user.role.toLowerCase();
  //   // history.push(`/app/${lowerCaseRole}profile/${user.userId}`);
  //   if (lowerCaseRole === "alumni") {
  //     history.push(`/app/alumni/profile/${user.userId}`);
  //   } else if (lowerCaseRole === "user") {
  //     history.push(`/app/user/profile/${user.userId}`);
  //   } else {
  //     history.push(`/app/${lowerCaseRole}profile/${user.userId}`);
  //   }
  // };

  // const handleShareButtonClick = async (id) => {
  //   try {
  //     await navigator.clipboard.writeText(
  //       `${window.location.href}/joblisting/view/${id}`
  //     );
  //     setCopiedId(id);
  //     setTimeout(() => {
  //       setCopiedId(null);
  //     }, 3000);
  //   } catch (error) {
  //     console.error("Error copying link:", error);
  //   }
  // };

  return (
    <>
      {/* <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader className="p-3" toggle={toggle}>
          Interested
        </ModalHeader>
        <ModalBody className="p-3">
          <ListGroup flush>
            {interestPerson?.length > 0 ? (
              interestPerson.map((data) => (
                <ListGroupItem
                  key={data.userId}
                  tag="a"
                  style={{ cursor: "pointer" }}
                  // href={`/app/mentorprofile/${data.id}`}
                  onClick={() => handleUserClick(data)}
                >
                  {data.userName}
                </ListGroupItem>
              ))
            ) : (
              <p>No interested persons yet.</p>
            )}
          </ListGroup>
        </ModalBody>
      </Modal> */}
      {/* {!isLoaded ? (
        <div className="loading" />
      ) : (
        <>
          {!items?.length > 0 ? (
            <Card className="d-flex justify-content-center align-items-center ">
              <h2 className="mt-4 mb-4">There are no posts available</h2>
            </Card>
          ) : (
            <div className="disable-text-selection">
              {items.map((data, index) => (
                <Row key={data.title + data.id} className="mb-2">
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
                              Posted on
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
                            {`${(
                              (data.description &&
                                removeTags(data.description)) ||
                              ""
                            ).slice(0, 100)}`}{" "}
                            {data.description?.length > 100 && (
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
                          <Col xs={12} sm={6} md={4} lg={2}>
                            <i className="iconsminds-office text-primary" />{" "}
                            {data.company}
                          </Col>
                          <Col xs={12} sm={6} md={4} lg={3}>
                            <i className="iconsminds-engineering text-primary" />{" "}
                            {data.jobTitle}
                          </Col>
                          <Col xs={12} sm={6} md={4} lg={2}>
                            <i className="simple-icon-location-pin text-primary" />{" "}
                            {data.jobLocation}
                          </Col>
                          <Col xs={12} sm={6} md={4} lg={2}>
                            <i className="iconsminds-building text-primary" />{" "}
                            {data.workPlaceType}
                          </Col>
                          <Col xs={12} sm={6} md={4} lg={2}>
                            <i className="simple-icon-briefcase text-primary" />{" "}
                            {data.employmentType}
                          </Col>
                        </Row>

                        <Row className="mt-3">
                          <Col>
                            {data.skills?.map((skill) => (
                              <Button
                                key={skill}
                                color="light"
                                className="mb-2 font-weight-semibold mx-2"
                                size="xs"
                              >
                                {skill}
                              </Button>
                            ))}
                          </Col>
                        </Row>
                        <Row className="">
                          <Col
                            className="text-start text-sm-left"
                            xs={12}
                            sm={6}
                          >
                            <div
                              
                              className="text-muted mt-2"
                             
                            >
                              {data.interestedCount} people have shown interest
                            </div>
                          </Col>
                          <Col
                            className="text-sm-right text-start mt-sm-0 mt-2"
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
                              onClick={() =>
                                handleInterestedButtonClick(
                                  data.loggedInUserInterested,
                                  data.id
                                )
                              }
                              outline
                              // className="d-none d-lg-block"
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
                totalPage={totalPage}
                onChangePage={(i) => setCurrentPage(i)}
                lastIsActive={isFirst}
                firstIsActive={isLast}
              />
            </div>
          )}
        </>
      )} */}

      {/* new design starts */}

      {!isLoaded ? (
        <div className="loading" />
      ) : (
        <>
          {!items?.length > 0 ? (
            <Card className="d-flex justify-content-center align-items-center ">
              <h2 className="mt-4 mb-4">There are no posts available</h2>
            </Card>
          ) : (
            <div className="disable-text-selection">
              <Row>
                {items.map((data, index) => (
                  <Col
                    xxs="12"
                    md="6"
                    lg="6"
                    sm="12"
                    key={data.title + data.id}
                    className="mb-2"
                  >
                    <Card className=" my-2">
                      <CardBody className="p-3">
                        <CardImg
                          top
                          // src="/assets/img/cards/thumb-1.jpg"
                          // src="https://images.pexels.com/photos/269077/pexels-photo-269077.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
                          // src={
                          //   data.image !== null
                          //     ? `${baseUrl}/${data.imageUrl}`
                          //     : "https://via.placeholder.com/300x200?text=No+Image"
                          // }
                          src={
                            data.image && data.image.imageUrl
                              ? `${baseUrl}/${data.image.imageUrl}`
                              : "https://via.placeholder.com/300x200?text=No+Image"
                          }
                          alt="Card image cap"
                        />

                        <Row>
                          <Col>
                            <h3 className="font-weight-bold mt-2 text-large">
                              {data.jobTitle}
                            </h3>
                            <h6>{data.company}</h6>
                          </Col>
                        </Row>
                        {expandedIndex === index ? (
                          <CardSubtitle>
                            {removeTags(data.description)}
                          </CardSubtitle>
                        ) : (
                          <CardSubtitle>
                            {`${(
                              (data.description &&
                                removeTags(data.description)) ||
                              ""
                            ).slice(0, 100)}`}{" "}
                            {data.description?.length > 100 && (
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
                          <Col>
                            <Button
                              color="light"
                              className="mb-2 font-weight-semibold"
                              size="xs"
                            >
                              job
                            </Button>
                            <Button
                              color="light"
                              className="mb-2 font-weight-semibold mx-1"
                              size="xs"
                            >
                              fresher
                            </Button>
                            <Button
                              color="light"
                              className="mb-2 font-weight-semibold mx-1"
                              size="xs"
                            >
                              {data.workPlaceType}
                            </Button>
                            <Button
                              color="light"
                              className="mb-2 font-weight-semibold mx-1"
                              size="xs"
                            >
                              {data.jobLocation}
                            </Button>
                          </Col>
                        </Row>

                        <Row className="mt-2 text-one">
                          <Col className="" xs={12} sm={8}>
                            <span className="text-muted ">
                              Posted on
                              <TimestampConverter
                                timeStamp={data.postedOn}
                                format="datetime"
                              />
                            </span>
                          </Col>
                          <Col
                            // className="text-sm-right text-start mt-sm-0 mt-2"
                            className="d-flex justify-content-sm-end justify-content-start align-items-center mt-sm-0 mt-2"
                            xs={12}
                            sm={4}
                          >
                            <Button
                              onClick={() =>
                                handleInterestedButtonClick(
                                  data.loggedInUserInterested,
                                  data.id
                                )
                              }
                              outline
                              // className="d-none d-lg-block"
                              color="primary"
                              size="xs"
                              active={data.loggedInUserInterested}
                            >
                              I&apos;m interested
                            </Button>
                          </Col>
                        </Row>

                        {/* <Row className="mt-2 ">
                          <Col className="d-flex justify-content-between align-items-center">
                            <span className="text-muted ">
                              Posted on
                              <TimestampConverter
                                timeStamp={data.postedOn}
                                format="datetime"
                              />
                            </span>
                            <Button
                              onClick={() =>
                                handleInterestedButtonClick(
                                  data.loggedInUserInterested,
                                  data.id
                                )
                              }
                              outline
                              // className="d-none d-lg-block"
                              color="primary"
                              size="xs"
                              active={data.loggedInUserInterested}
                            >
                              I&apos;m interested
                            </Button>
                          </Col>
                        </Row> */}
                      </CardBody>
                    </Card>
                  </Col>
                ))}
              </Row>
              <Pagination
                currentPage={currentPage}
                totalPage={totalPage}
                onChangePage={(i) => setCurrentPage(i)}
                lastIsActive={isFirst}
                firstIsActive={isLast}
              />
            </div>
          )}
        </>
      )}
      {/* new design ends */}
    </>
  );
};

export default JobListing;
