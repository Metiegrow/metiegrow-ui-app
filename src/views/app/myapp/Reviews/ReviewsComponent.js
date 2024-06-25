import React, { useEffect, useState } from "react";
import { Colxx } from "components/common/CustomBootstrap";
import Rating from "components/common/Rating";

import { Card, CardBody, Col, NavLink, Progress, Row } from "reactstrap";
import { baseUrl } from "constants/defaultValues";
import axios from "axios";
// import ThumbnailLetters from "components/cards/ThumbnailLetters";
import TimestampConverter from "../Calculation/TimestampConverter";
import ThumbnailLetters from "../Chat/ThumbnailLetters";

const ReviewsComponent = ({revieweeId,category}) => {
  // console.log("prop chk", props);
  // const rid = props;
  // const revieweeId = rid.id;
  const [averageStar, setAverageStar] = useState(0);
  const [totalRatings, setTotalRatings] = useState(0);
  const [totalFeedBack, setTotalFeedBack] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [starRatings, setStarRatings] = useState({
    oneStar: 0,
    twoStar: 0,
    threeStar: 0,
    fourStar: 0,
    fiveStar: 0,
  });
  const metaRatingUrl = `${baseUrl}/api/${category}/rating/meta/${revieweeId}`;
  const ratingUrl = `${baseUrl}/api/${category}/rating/${revieweeId}`;
  useEffect(() => {
    const ReviewDetails = async () => {
      try {
        const response = await axios.get(metaRatingUrl);
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
        const res = await axios.get(ratingUrl);
        const response = res.data;
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

  function removeTags(str) {
    if (str === null || str === '') {
        return false;
    }
    const newStr = str.toString();
    return newStr.replace(/(<([^>]+)>)/ig, '');
}



  return (
    <Colxx xl="4" lg="6" md="12" className="mb-4">
            <h1 className="fw-bold mb-4">Ratings & Reviews</h1>
      {totalRatings > 0 && (
        <Card className="mb-3">
          <CardBody>
            {/* <h3 className="fw-bold">Ratings & Reviews</h3> */}

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
      {reviews.length > 0 ? (
      <div className="">
        {reviews &&
          reviews.map((rv) => {
            <hr />;
            return (

              <div
                  key={rv.reviewerId}
                  className="d-flex flex-row   border-bottom "
                >
                  <NavLink to={`/app/user/${rv.reviewerId}`}>
                  <ThumbnailLetters
                      rounded
                      extraSmall
                      text={rv.name}
                      className=""
                    />
                    {/* <img
                      src={`${baseUrl}/${rv.imageUrl}`}
                      alt={rv.name}
                      className="img-thumbnail border-0 rounded-circle list-thumbnail align-self-center xsmall"
                    /> */}

                  </NavLink>

                  <div className=" pr-2">
                    <NavLink to='#'>
                      <p className="font-weight-medium mb-0">{removeTags(rv.feedBack)}</p>
                      <p className="text-muted mb-0 text-small">
                      {rv.name} | {" "}
                      <span>
                        <TimestampConverter timeStamp={rv.time} format="datetime" />
                      </span>
                      </p>
                      {/* {displayRate && ( */}
                        <div className="form-group mb-1 mt-2">
                          <Rating total={5} rating={rv.star} interactive={false} />
                        </div>
                      {/* )} */}
                    </NavLink>
                  </div>
                </div>

              // <div
              //   className="d-flex  justify-content-start my-4"
              //   key={rv.reviewerId}
              // >
              //   <div>
              //     <NavLink className="">
              //       <ThumbnailLetters
              //         rounded
              //         small
              //         text={rv.name}
              //         className=""
              //       />
              //     </NavLink>
              //   </div>
              //   <div className="ml-2">
              //     <h6 className="font-weight-bold">{rv.name}</h6>
              //     {/* <h6>country</h6> */}

              //     <div className="d-flex align-items-center my-2">
              //       <Rating total={5} rating={rv.star} interactive={false} />
              //       <p className="text-small  mb-0 d-inline-block ml-2">
              //         {rv.star}
              //       </p>
              //     </div>
              //     {/* <p>{rv.feedBack}</p> */}
              //     {/* <div>{rv.feedBack}</div> */}
              //     <div>{removeTags(rv.feedBack)}</div>
              //     {/* <p>{timeConvert(rv.time)}</p> */}
              //     <p><TimestampConverter timeStamp={rv.time} format="datetime" /></p>
              //     <div className="d-flex font-weight-medium">
              //       <p>Helpful?</p>
              //       <div className="d-flex ">
              //         <span className=" ml-2">
              //           <i className="simple-icon-like mr-2" />
              //           yes
              //         </span>
              //         <span className=" ml-2">
              //           <i className="simple-icon-dislike mr-2" />
              //           no
              //         </span>
              //       </div>
              //       <hr />
              //     </div>
              //   </div>
              // </div>
            );
          })}
      </div>
      ): (
        // <Button>Be the first to write a review</Button>
        <div className="ml-4">No reviews available</div>    
      )}
    </Colxx>
  );
};

export default ReviewsComponent;
