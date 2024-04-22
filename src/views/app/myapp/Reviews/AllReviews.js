import React, { useEffect, useState } from "react";
import { Colxx } from "components/common/CustomBootstrap";
import Rating from "components/common/Rating";

import { Card, CardBody, Col, NavLink, Progress, Row } from "reactstrap";
import { baseUrl } from "constants/defaultValues";
import axios from "axios";
import ThumbnailLetters from "components/cards/ThumbnailLetters";

const AllReviews = (props) => {
  // console.log("prop chk", props);
  const rid = props;
  const revieweeId = rid.id;
  const [averageStar, setAverageStar] = useState(0);
  const [totalRatings, setTotalRatings] = useState(0);
  const [totalFeedBack, setTotalFeedBack] = useState(0);
  const [reviews, setReviews] = useState([])
  const [starRatings, setStarRatings] = useState({
    oneStar: 0,
    twoStar: 0,
    threeStar: 0,
    fourStar: 0,
    fiveStar: 0,
  });
  const url = `${baseUrl}/api/mentorship/rating/meta/${revieweeId}`;
  const url2 = `${baseUrl}/api/mentorship/rating/${revieweeId}`
  useEffect(() => {
    const ReviewDetails = async () => {
      try {
        const response = await axios.get(url);
        const reviewData = response.data;
        // console.log("reviewData:", reviewData);
        // console.log("reviewData1:", reviewData.averageStar);
        if (reviewData) {
          setAverageStar(reviewData.averageStar);
          setTotalRatings(reviewData.totalRatings);
          setTotalFeedBack(reviewData.totalFeedBack);
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(url2);
        const response = res.data
        // console.log(response);
        setReviews(response);
        // setIsLoaded(true);
      } catch (error) {
        console.error("Error fetching data:", error);
        // setIsLoaded(true);
      }
    };

    fetchData();
  }, []);

  const calculatePercentage = (starCount) => {
    return (starCount / totalRatings) * 100;
  };
  const timeConvert = (time1) => {
    const time = new Date(parseInt(time1, 10));
    const Hours = time.getHours() % 12 || 12;
    const Minutes = String(time.getMinutes()).padStart(2, "0");
    const Period = time.getHours() < 12 ? "AM" : "PM";
    const Month = time.getMonth() + 1;
    const Day = time.getDate();
    const Year = time.getFullYear();
    return `${Month}/${Day}/${Year} ${Hours}:${Minutes} ${Period}`;
  }
  

  return (
    <Colxx xl="4" lg="6" md="12" className="mb-4">
      {totalRatings > 0 && (
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
          <h4>
            {totalRatings} ratings & {totalFeedBack} Reviews
          </h4>
          <div className="mb-4">
            <p className="mb-2">
              5 Star
              <span className="float-right text-muted">
                {starRatings.fiveStar}
              </span>
            </p>
            <Progress value={calculatePercentage(starRatings.fiveStar)} />
          </div>
          <div className="mb-4">
            <p className="mb-2">
              4 Star
              <span className="float-right text-muted">
                {starRatings.fourStar}
              </span>
            </p>
            <Progress value={calculatePercentage(starRatings.fourStar)} />
          </div>
          <div className="mb-4">
            <p className="mb-2">
              3 Star
              <span className="float-right text-muted">
                {starRatings.threeStar}
              </span>
            </p>
            <Progress value={calculatePercentage(starRatings.threeStar)} />
          </div>
          <div className="mb-4">
            <p className="mb-2">
              2 Star
              <span className="float-right text-muted">
                {starRatings.twoStar}
              </span>
            </p>
            <Progress value={calculatePercentage(starRatings.twoStar)} />
          </div>
          <div className="mb-4">
            <p className="mb-2">
              1 Star
              <span className="float-right text-muted">
                {starRatings.oneStar}
              </span>
            </p>
            <Progress
              value={calculatePercentage(starRatings.oneStar)}
              barStyle={{ backgroundColor: "primary" }}
            />
          </div>
        </CardBody>
      </Card>
      )}
      <div className="">
        {reviews &&
          reviews.map((rv) => {
             <hr />;
            return ( 
              <div
                className="d-flex  justify-content-start my-4"
                key={rv.reviewerId}
              >
                <div>
                  <NavLink className="">
                    <ThumbnailLetters
                      rounded
                      small
                      text={rv.name}
                      className=""
                    />
                  </NavLink>
                </div>
                <div className="ml-2">
                  <h6 className="font-weight-bold">{rv.name}</h6>
                  {/* <h6>country</h6> */}

                  <div className="d-flex align-items-center my-2">
                    <Rating total={5} rating={rv.star} interactive={false} />
                    <p className="text-small  mb-0 d-inline-block ml-2">
                      {rv.star}
                    </p>
                  </div>
                  <p>{rv.feedBack}</p>
                  <p>{timeConvert(rv.time)}</p>
                  <div className="d-flex font-weight-medium">
                    <p>Helpful?</p>
                    <div className="d-flex ">
                      <span className=" ml-2">
                        <i className="simple-icon-like mr-2" />
                        yes
                      </span>
                      <span className=" ml-2">
                        <i className="simple-icon-dislike mr-2" />
                        no
                      </span>
                    </div>
                    <hr />
                  </div>
                </div>
              </div>
             ); 
            })} 
      </div>
    </Colxx>
  );
};

export default AllReviews;
