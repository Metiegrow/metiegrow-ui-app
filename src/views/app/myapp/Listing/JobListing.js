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

const url = `${baseUrl}/joblistingcard`;

const JobListing = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage] = useState(2);
  const [items, setItems] = useState([]);
  const [expandedIndex, setExpandedIndex] = useState(-1);

  const toggleExpand = (index) => {
    setExpandedIndex((prevIndex) => (prevIndex === index ? -1 : index));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${url}?_page=${currentPage}&_limit=8`);
        console.log(res);
        const { data } = res;
        //   setTotalPage(data.totalPage);
        setItems(data.map((x) => ({ ...x })));
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
              <CardBody>
                <Row>
                  <Col>
                    <CardTitle className="font-weight-bold">
                      {data.title}
                    </CardTitle>
                  </Col>
                  <Col className="text-right">
                    <p className="text-muted">
                      Posted on {new Date(data.postedOn).toLocaleDateString()}{" "}
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
                <Row className="mt-2">
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
                <Row>
                  <Col className="mt-2">
                    <p className="text-muted">
                      {data.interestedCount} people have shown interest
                    </p>
                  </Col>
                  <Col className="text-right">
                    <Button outline color="primary">
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
