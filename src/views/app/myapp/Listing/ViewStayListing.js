import React, { useEffect, useState } from "react";
import { baseUrl } from "constants/defaultValues";
import { useParams, NavLink } from "react-router-dom";
import axios from "axios";
import {
  Card,
  CardBody,
  //   CardTitle,
  Col,
  Row,
  Button,
} from "reactstrap";
import { Colxx } from "components/common/CustomBootstrap";
import TimestampConverter from "../Calculation/TimestampConverter";

const ViewOtherListing = () => {
  const [data, setData] = useState();
  const [copied, setCopied] = useState(false);
  const { id } = useParams();
  const url = `${baseUrl}/staylistingcard/${id}`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(url);
        setData(res.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [url]);

  const handleCopyLink = async () => {
    try {
      if (data) {
        await navigator.clipboard.writeText(window.location.href);
        setCopied(true);
      }
      setTimeout(() => {
        setCopied(false);
      }, 3000);
    } catch (error) {
      console.error("Error copying link:", error);
    }
  };

  return (
    <Row className="mb-2">
      <Colxx xxs="12">
        <Card className="mx-auto" style={{ maxWidth: "900px" }}>
          <CardBody className="p-4">
            {data && (
              <>
                <Row>
                  <Col className="d-flex flex-row mb-3">
                    <NavLink to="#" location={{}}>
                      <img
                        src="https://gogo-react.coloredstrategies.com/assets/img/profiles/l-1.jpg"
                        alt="thumbnail"
                        className="img-thumbnail border-0 rounded-circle list-thumbnail align-self-center xsmall"
                      />
                    </NavLink>
                    <div className="pl-3">
                      <NavLink to="#" location={{}}>
                        <p className="font-weight-medium mb-0 ">Name</p>
                        <p className="text-muted mb-0 text-small">
                    Posted on <TimestampConverter timeStamp={data.postedOn} format="datetime" />
                        </p>
                      </NavLink>
                    </div>
                  </Col>
                  <Col className="text-right">
                    {copied && (
                      <span className="text-success mr-2">
                        Link copied to clipboard!
                      </span>
                    )}
                    <Button
                      outline
                      color="primary"
                      className="mr-2"
                      size="xs"
                      onClick={handleCopyLink}
                    >
                      <i className="iconsminds-sharethis text-primary" />
                    </Button>
                  </Col>
                </Row>

                <h1>{data.title}</h1>

                <Row className="mb-2">
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
                      {data.BHKType}
                    </span>
                  </Col>
                  {/* <Col>
                    <i className="iconsminds-engineering text-primary" />{" "}
                    {data.BHKType}
                  </Col> */}
                  <Col>
                    {" "}
                    <i className="simple-icon-people text-primary" />{" "}
                    <span data-toggle="tooltip" title="Room mate">
                      {data.roomMate}
                    </span>
                  </Col>
                  <Col>
                    {" "}
                    {/* <i className="iconsminds-building text-primary" /> */}
                    <span className="text-primary">₹</span>{" "}
                    <span data-toggle="tooltip" title="Expected Rent">
                      {data.expectedRent}
                    </span>
                  </Col>
                  <Col>
                    {/* <a href="#" class="btn btn-primary" title="This is a hover tooltip">Hover me!</a> */}{" "}
                    <i className="iconsminds-car text-primary" />
                    {/* <i className="iconsminds-motorcycle text-primary"/> */}
                    {"  "}
                    <span data-toggle="tooltip" title="Parking">
                      {data.parking}
                    </span>
                  </Col>
                </Row>
                <div className="mt-2">{data.description}</div>
                <Row className="">
                  <Col className="">
                  {data.interestedCount && (
                    <div className="text-muted mt-2">
                      {data.interestedCount} people have shown interest
                    </div>
                    )}
                  </Col>
                  <Col className="text-right">
                    <Button
                      outline
                      color="primary"
                      size="xs"
                      //   onClick={() => handleInterest(data.title)}
                    >
                      I&apos;m interested
                    </Button>
                  </Col>
                </Row>
              </>
            )}
          </CardBody>
        </Card>
      </Colxx>
    </Row>
  );
};

export default ViewOtherListing;
