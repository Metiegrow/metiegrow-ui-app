import React, { useState, useEffect } from "react";
import axios from "axios";
import { baseUrl } from "constants/defaultValues";
import Pagination from "containers/pages/Pagination";
import {
  Button,
  Card,
  CardBody,
  CardSubtitle,
  CardTitle,
  Col,
  Row,
} from "reactstrap";
import { Colxx } from "components/common/CustomBootstrap";

const url = `${baseUrl}/alllistingcard`;

const JobListing = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage] = useState(2);
  const [items, setItems] = useState([]);
  const [expandedIndex, setExpandedIndex] = useState(-1);

  const toggleExpand = (index) => {
    setExpandedIndex((prevIndex) => (prevIndex === index ? -1 : index));
  };

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const res = await axios.get(`${url}?_page=${currentPage}&_limit=8`);
//         console.log(res);
//         const { data } = res;
//         //   setTotalPage(data.totalPage);
//         setItems(data.map((x) => ({ ...x })));
//         setIsLoaded(true);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//         setIsLoaded(true);
//       }
//     };

//     fetchData();
//   }, [currentPage]);

useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${url}?_page=${currentPage}&_limit=8`);
        console.log(res);
        const { data } = res;
        const sortedData = data.map(x => ({ ...x })).sort((a, b) => new Date(b.postedOn) - new Date(a.postedOn));
        setItems(sortedData);
        setIsLoaded(true);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoaded(true);
      }
    };
  
    fetchData();
  }, [currentPage]);
  

  
  return !isLoaded ? (
    <div className="loading" />
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
                    Posted on {new Date(data.postedOn).toLocaleString()} 
                    </p>
                  </Col>
                </Row>
                {expandedIndex === index ? (
                  <CardSubtitle>{data.description}</CardSubtitle>
                ) : (
                  <CardSubtitle>
                    {`${data.description.slice(0, 100)}...`}
                    {data.description.length > 100 && (
                      <Button
                        color="link"
                        onClick={() => toggleExpand(index)}
                        className=" p-0"
                      >
                        {expandedIndex === index ? "Read less" : "Read more"}
                      </Button>
                    )}
                  </CardSubtitle>
                )}
                {data.company ? (
                <Row>
                  <Col>
                    <i className="iconsminds-office text-primary" />{" "}
                    {data.company}
                  </Col>
                  <Col>
                    <i className="iconsminds-engineering text-primary" />{" "}
                    {data.jobTitle}
                  </Col>
                  <Col>
                    {" "}
                    <i className="simple-icon-location-pin text-primary" />{" "}
                    {data.jobLocation}
                  </Col>
                  <Col>
                    {" "}
                    <i className="iconsminds-building text-primary" />{" "}
                    {data.workPlaceType}
                  </Col>
                  <Col>
                    {" "}
                    <i className="simple-icon-briefcase text-primary" />{" "}
                    {data.employmentType}
                  </Col>
                </Row>
                ) : null}
                {data.skills ? (
                <Row className="mt-3">
                  <Col>
                    {data.skills.map((skill) => (
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
                ) : null}
                {data.apartmentType ? (
                <Row className="mb-2">
                  <Col md={5}>
                    <i className="iconsminds-office text-primary" />{" "}
                    <span data-toggle="tooltip" title="Apartment Type">{data.apartmentType}</span> | <span data-toggle="tooltip" title="Floor">{data.floor}</span> |  <span data-toggle="tooltip" title="BHK Type">{data.BHKType}</span>
                  </Col>
                  {/* <Col>
                    <i className="iconsminds-engineering text-primary" />{" "}
                    {data.BHKType}
                  </Col> */}
                  <Col>
                    {" "}
                    <i className="simple-icon-people text-primary" />{" "}
                    <span data-toggle="tooltip" title="Room mate">{data.roomMate}</span>
                    
                  </Col>
                  <Col>
                    {" "}
                    {/* <i className="iconsminds-building text-primary" /> */}
                    <span className="text-primary">₹</span>  <span data-toggle="tooltip" title="Expected Rent">{data.expectedRent}</span>
                  </Col>
                  <Col>
                  {/* <a href="#" class="btn btn-primary" title="This is a hover tooltip">Hover me!</a> */}

                    {" "}
                    <i className="iconsminds-car text-primary" />
                    {/* <i className="iconsminds-motorcycle text-primary"/> */}
                    {"  "}
                    
                    <span data-toggle="tooltip" title="Parking">{data.parking}</span>
                  </Col>
                </Row>
                ) : null}
                <Row className="">
                  <Col className="">
                    <div className="text-muted mt-2">
                      {data.interestedCount} people have shown interest
                    </div>
                  </Col>
                  <Col className="text-right">
                  <Button
                      outline
                      color="primary"
                      className="mr-2"
                      size="xs"
                      // onClick={}
                    >
                      <i className="iconsminds-sharethis text-primary" />
                    </Button>
                    <Button outline color="primary" size="xs">
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
      />
    </div>
  );
};

export default JobListing;
