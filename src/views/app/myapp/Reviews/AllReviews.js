import React, { useEffect } from "react";
import { Colxx } from "components/common/CustomBootstrap";
import Rating from "components/common/Rating";

import { Card, CardBody, Col, Progress, Row } from "reactstrap";
import { baseUrl } from "constants/defaultValues";
import axios from "axios";

const AllReviews = () => {
  const url = `${baseUrl}/api/rating/meta/mentor`;
  useEffect(() => {
    const ReviewDetails = async () => {
      try {
        const response = await axios.get(url);
        const reviewData = response.data;
        console.log("userData:", reviewData);
        // if (reviewData) {

        // }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    ReviewDetails();
  }, []);
  return (
    <Colxx xl="4" lg="6" md="12" className="mb-4">
      <Card>
        <CardBody>
          <h3 className="fw-bold">Reviews</h3>

          <Row xxs="12" sm="6">
            <Col>
              <Rating total={5} rating={4.1} interactive={false} />
            </Col>
            <Col>
              <h4>4.1 out of 5 stars</h4>
            </Col>
          </Row>
          <h4>6 ratings</h4>
          <div className="mb-4">
            <p className="mb-2">
              5 Star
              <span className="float-right text-muted">80%</span>
            </p>
            <Progress value={80} />
          </div>
          <div className="mb-4">
            <p className="mb-2">
              4 Star
              <span className="float-right text-muted">10%</span>
            </p>
            <Progress value={10} />
          </div>
          <div className="mb-4">
            <p className="mb-2">
              3 Star
              <span className="float-right text-muted">5%</span>
            </p>
            <Progress value={5} />
          </div>
          <div className="mb-4">
            <p className="mb-2">
              2 Star
              <span className="float-right text-muted">4%</span>
            </p>
            <Progress value={4} />
          </div>
          <div className="mb-4">
            <p className="mb-2">
              1 Star
              <span className="float-right text-muted">1%</span>
            </p>
            <Progress value={1} />
          </div>
        </CardBody>
      </Card>
    </Colxx>
  );
};

export default AllReviews;
