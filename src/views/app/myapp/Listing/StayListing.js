import React, { useState, useEffect } from "react";
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

const StayListing = () => {
  const url = `${baseUrl}/api/staylisting/cards`;
  const [expandedIndex, setExpandedIndex] = useState(-1);
  const [cardData, setCardData] = useState([]);

  useEffect(() => {
    const fetchDataFromServer = async () => {
      try {
        const response = await axios.get(url);

        const stayListingCardData = response.data;
        console.log("staylisting", stayListingCardData);
        setCardData(stayListingCardData);

        // console.log("Fetched data:", walletData);
      } catch (error) {
        console.error("Error while fetching data from the server", error);
      }
    };
    fetchDataFromServer();
  }, []);

  const toggleExpand = (index) => {
    if (expandedIndex === index) {
      setExpandedIndex(-1);
    } else {
      setExpandedIndex(index);
    }
  };

  return (
    <>
      {cardData.map((data, index) => (
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
    </>
  );
};

export default StayListing;
