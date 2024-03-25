import React, { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom';
import {
  // Collapse,
  Button,
  Row,
  Card,
  CardSubtitle,
  CardBody,
  CardTitle,
  Col,
} from "reactstrap";
import { Colxx } from "components/common/CustomBootstrap";
import { baseUrl } from "constants/defaultValues";
import axios from "axios";
import Pagination from "containers/pages/Pagination";


const StayListing = () => {
  const url = `${baseUrl}/staylistingcard`;
  const [expandedIndex, setExpandedIndex] = useState(-1);
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage] = useState(2);
  const history = useHistory();


  useEffect(() => {
    const fetchDataFromServer = async () => {
      try {
        const res = await axios.get(`${url}?_page=${currentPage}&_limit=4`);
        const { data } = res;
        const sortedData = data.map(x => ({ ...x })).sort((a, b) => new Date(b.postedOn) - new Date(a.postedOn));
        setItems(sortedData);
        // const stayListingCardData = res.data;
        // console.log("staylisting", stayListingCardData);
        // setItems(stayListingCardData);

        // console.log("Fetched data:", walletData);
      } catch (error) {
        console.error("Error while fetching data from the server", error);
      }
    };
    fetchDataFromServer();
  }, [currentPage]);

  const toggleExpand = (index) => {
    if (expandedIndex === index) {
      setExpandedIndex(-1);
    } else {
      setExpandedIndex(index);
    }
  };
  const handleClick = (id) => {
    history.push(`/app/listing/staylisting/view/${id}`);
  };

  return (
    <>
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
                {/* <CardSubtitle>{data.description}</CardSubtitle> */}
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
                {/* {data.description.length > 100 && (
                  <Button
                    color="link"
                    onClick={() => toggleExpand(index)}
                    className=" p-0"
                  >
                    {expandedIndex === index ? "Read less" : "Read more"}
                  </Button>
                )} */}
                {/* <Row className="justify-content-between">
                  
                </Row> */}

                <Row>
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

                <Row className="mt-2">
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
    </>
  );
};

export default StayListing;
