import React, { useEffect, useState } from "react";
import { Colxx } from "components/common/CustomBootstrap";
import Rating from "components/common/Rating";

import { Card, CardBody, Col, Progress, Row } from "reactstrap";
import { baseUrl } from "constants/defaultValues";
import axios from "axios";

const AllReviews = () => {
  const [averageStar, setAverageStar] = useState("");
  const [totalRatings, setTotalRatings] = useState("");
  const [totalFeedBack, setTotalFeedBack] = useState("");
  const [starRatings, setStarRatings] = useState({
    oneStar: 0,
    twoStar: 0,
    threeStar: 0,
    fourStar: 0,
    fiveStar: 0,
 });
  const url = `${baseUrl}/api/rating/meta/mentor/1`;
  useEffect(() => {
    const ReviewDetails = async () => {
      try {
        const response = await axios.get(url);
        const reviewData = response.data;
        console.log("reviewData:", reviewData);
        console.log("reviewData1:", reviewData.averageStar);
        if (reviewData) {
          setAverageStar(reviewData.averageStar)
          setTotalRatings(reviewData.totalRatings)
          setTotalFeedBack(reviewData.totalFeedBack)
          setStarRatings({
            oneStar: reviewData.oneStar,
            twoStar: reviewData.twoStar,
            threeStar: reviewData.threeStar,
            fourStar: reviewData.fourStar,
            fiveStar: reviewData.fiveStar,
          });
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    ReviewDetails();
  }, []);

  const calculatePercentage = (starCount) => {
    return (starCount / totalRatings) * 100;
 };

  return (
    <Colxx xl="4" lg="6" md="12" className="mb-4">
      <Card>
        <CardBody>
          <h3 className="fw-bold">Ratings & Reviews</h3>

          <Row xxs="12" sm="6">
            <Col>
              <Rating total={5} rating={averageStar} interactive={false} />
            </Col>
            <Col>
              <h4>{averageStar} out of 5 stars</h4>
            </Col>
          </Row>
          <h4>{totalRatings} ratings & {totalFeedBack} Reviews</h4>
          <div className="mb-4">
            <p className="mb-2">
              5 Star
              <span className="float-right text-muted">{starRatings.fiveStar}</span>
            </p>
            <Progress value={calculatePercentage(starRatings.fiveStar)} />
          </div>
          <div className="mb-4">
            <p className="mb-2">
              4 Star
              <span className="float-right text-muted">{starRatings.fourStar}</span>
            </p>
            <Progress value={calculatePercentage(starRatings.fourStar)} />
          </div>
          <div className="mb-4">
            <p className="mb-2">
              3 Star
              <span className="float-right text-muted">{starRatings.threeStar}</span>
            </p>
            <Progress value={calculatePercentage(starRatings.threeStar)} />
          </div>
          <div className="mb-4">
            <p className="mb-2">
              2 Star
              <span className="float-right text-muted">{starRatings.twoStar}</span>
            </p>
            <Progress value={calculatePercentage(starRatings.twoStar)} />
          </div>
          <div className="mb-4">
            <p className="mb-2">
              1 Star
              <span className="float-right text-muted">{starRatings.oneStar}</span>
            </p>
            <Progress value={calculatePercentage(starRatings.oneStar)} barStyle={{ backgroundColor: 'primary'}}  />
          </div>
        </CardBody>
      </Card>
    </Colxx>
  );
};

export default AllReviews;
