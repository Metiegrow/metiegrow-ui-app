import React, { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom';
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
import TimestampConverter from "../Calculation/TimestampConverter";


const JobListing = ({isPosted}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [items, setItems] = useState([]);
  const [expandedIndex, setExpandedIndex] = useState(-1);
  const [isFirst, setIsFirst] = useState(true);
  const [isLast, setIsLast] = useState(true);
  
  const url = `${baseUrl}/api/posts/job-post/`;
  const interestedClickUrl = `${baseUrl}/api/posts/job-post/interested`;

  const history = useHistory();

  const toggleExpand = (index) => {
    setExpandedIndex((prevIndex) => (prevIndex === index ? -1 : index));
  };

  useEffect(() => {
    const fetchData = async () => {
      const params = {
        page: currentPage-1,
        size: 20,
        // sort: [""]
      };
      try {
        // const res = await axios.get(`${url}?_page=${currentPage}&_limit=8`);
        const res = await axios.get(url, { params });
        // console.log(res);
        const { data } = res;
        const sortedData = data.jobLists.map(x => ({ ...x })).sort((a, b) => new Date(b.postedOn) - new Date(a.postedOn));
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
    setTimeout(() => {
      fetchData();
    },1000)
  }, [currentPage, isPosted, interestedClickUrl]);

  const handleClick = (id) => {
    history.push(`/app/listing/job/view/${id}`);
  };

    function removeTags(str) {
    if (str === null || str === '') {
        return false;
    }
    const newStr = str.toString();
    return newStr.replace(/(<([^>]+)>)/ig, '');
}

const handleInterestedButtonClick = async (id) => {
  const data = {
    jobListingId: id,
    interested: true
  };

  try {
    await axios.post(interestedClickUrl, data);
  } catch (error) {
    console.error('Error sending interest:', error);
  }
};

 
return !isLoaded ? (
  <div className="loading" />
) : (<>
{!items.length > 0 ? (
  <Card className="d-flex justify-content-center align-items-center "><h2 className="mt-4 mb-4">There are no posts available</h2></Card>
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
                    Posted on <TimestampConverter timeStamp={data.postedOn} format="datetime" />
                    </p>
                  </Col>
                </Row>
                {expandedIndex === index ? (
                  <CardSubtitle>{removeTags(data.description)}</CardSubtitle>
                ) : (
                  <CardSubtitle>
                    {`${removeTags(data.description).slice(0, 100)}`}
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
                        onClick={() =>handleClick(data.id)}
                      >
                        <i className="simple-icon-size-fullscreen text-primary" />
                      </Button>
                  <Button
                      outline
                      color="primary"
                      className="mr-2"
                      size="xs"
                      // onClick={}
                    >
                      <i className="iconsminds-sharethis text-primary" />
                    </Button>
                    <Button onClick={() =>handleInterestedButtonClick(data.id)} outline color="primary" size="xs">
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
        lastIsActive = {isFirst}
        firstIsActive = {isLast}
      />
    </div>
    )}
    </>
  );
};

export default JobListing;
