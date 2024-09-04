import axios from "axios";
import { Colxx } from "components/common/CustomBootstrap";
import { baseUrl } from "constants/defaultValues";
import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  //   CardTitle,
  Col,
  Row,
} from "reactstrap";
import TimestampConverter from "../Calculation/TimestampConverter";

const ViewJobListing = () => {
  const [copied, setCopied] = useState(false);
  const [data, setData] = useState();
  const { id } = useParams();
  const url = `${baseUrl}/api/posts/job-post/${id}`;

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
                          Posted on{" "}
                          <TimestampConverter
                            timeStamp={data.postedOn}
                            format="datetime"
                          />
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
                      </svg>{" "}
                    </Button>
                  </Col>
                </Row>
                <h1>{data.title}</h1>

                <Row className="mt-2 mb-2">
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
                <div
                  className="mt-2"
                  dangerouslySetInnerHTML={{ __html: data.description }}
                />
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

export default ViewJobListing;
