import React, { useState, useEffect } from "react";
import axios from "axios";
import { baseUrl } from "constants/defaultValues";
import { Colxx } from "components/common/CustomBootstrap";
import { Button, Card, CardBody, CardText, Row, Badge } from "reactstrap";
import Rating from "components/common/Rating";
import ThumbnailLetters from "components/cards/ThumbnailLetters";
import "../Lawyer/ThumbnailImage.css";
import { useHistory } from "react-router-dom";

const CommonCard = ({ type, showPrice, noneText }) => {
  const [cardlist, setCardList] = useState("");
  const history = useHistory();

  const truncateBio = (bio, lineCount) => {
    const words = bio.split(" ");

    const truncatedBio = words.slice(0, lineCount).join(" ");

    if (words.length > lineCount) {
      return `${truncatedBio}...`;
    }
    return truncatedBio;
  };
  console.log(showPrice);
  const url = `${baseUrl}/api/${type}`;
  useEffect(() => {
    const UserList = async () => {
      try {
        const response = await axios.get(url);
        setCardList(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    UserList();
  }, []);

  return (
    // <div>
    //   {cardlist.length === 0 ? (
    //     <Colxx sm="12" md="12" lg="8" xxs="12" className="mx-auto ">
    //       <Card>
    //         <CardBody>
    //           <h2 className="text-center text-large ">No {noneText}</h2>
    //         </CardBody>
    //       </Card>
    //     </Colxx>
    //   ) : (
    // cardlist.map((mentors) => {
    //   return (
    //     <Colxx xxs="12" key={mentors.id}>
    //       <Row>
    //         <Colxx sm="12" md="12" lg="8" xxs="12" className="mx-auto ">
    //           <Card
    //             className=" flex-row listing-card-container my-3 p-3"
    //             style={{ gap: "16px" }}
    //           >
    //             <div className="d-flex flex-column" style={{ gap: "16px" }}>
    //               {mentors.imageUrl == null ? (
    //                 <div
    //                   className="card-img-left bg-primary
    //          d-flex align-items-center justify-content-center"
    //                   style={{
    //                     width: "150px",
    //                     height: "250px",
    //                     borderRadius: "0.75rem",
    //                   }}
    //                 >
    //                   <ThumbnailLetters
    //                     rounded
    //                     text={mentors.firstName}
    //                     className="text-xlarge border border-1"
    //                     style={{ textAlign: "center" }}
    //                   />
    //                 </div>
    //               ) : (
    //                 <img
    //                   src={`${baseUrl}/${mentors.imageUrl}`}
    //                   alt="Card"
    //                   style={{
    //                     width: "200px",
    //                     height: "240px",
    //                     borderRadius: "0.75rem",
    //                     objectFit: "cover",
    //                   }}
    //                 />
    //               )}
    //             </div>
    //             {/* {showPrice ? (
    //                 <div className="my-5  ">
    //                   <CardText className="text-primary ">
    //                     <span className="text-xlarge font-weight-semibold">
    //                       ₹{mentors.price}
    //                     </span>
    //                     /month
    //                   </CardText>
    //                 </div>
    //               ) : null}
    //             </div> */}

    //             <CardBody className="d-flex flex-column flex-fill p-0">
    //               <div className="d-flex flex-wrap justify-content-between mb-1">
    //                 <div
    //                   className="d-flex flex-wrap"
    //                   style={{ gap: "10px" }}
    //                 >
    //                   <div className="font-weight-semibold text-large text-capitalize">
    //                     {mentors.firstName}
    //                   </div>
    //                   <div className="font-weight-semibold text-large text-capitalize">
    //                     {mentors.lastName}
    //                   </div>
    //                 </div>
    //               </div>
    //               <div className="d-flex" style={{ gap: "8px" }}>
    //                 <CardText className="text-one text-muted mb-2">
    //                   {mentors.jobTitle}
    //                 </CardText>
    //                 <div>|</div>
    //                 <CardText className="text-one text-primary mb-2">
    //                   {mentors.company}
    //                 </CardText>
    //               </div>
    //               {/* <CardText className="text-one mb-2 d-flex align-items-center">
    //                 <span className="font-weight-semibold ">
    //                   <Rating
    //                     total={5}
    //                     rating={mentors.star}
    //                     interactive={false}
    //                   />
    //                 </span>
    //                 <span className="font-weight-semibold">
    //                   {mentors.star}
    //                 </span>
    //                 <span> ({mentors.ratings} reviews)</span>
    //               </CardText> */}
    //               <CardText
    //                 className="text-one mb-2"
    //                 style={{ maxHeight: "62px", overflow: "hidden" }}
    //               >
    //                 {truncateBio(mentors.bio, 20)}
    //               </CardText>
    //               <CardText className="d-flex flex-wrap">
    //                 {mentors.skills &&
    //                   mentors.skills.slice(0, 3).map((skill) => (
    //                     <div key={skill} className="pr-2" id="btn.rounded">
    //                       <Badge color="light">{skill}</Badge>
    //                     </div>
    //                   ))}
    //               </CardText>

    //               <div className="">
    //                 <Button
    //                   color="primary "
    //                   onClick={() =>
    //                     history.push(`/app/alumni/profile/${mentors.id}`)
    //                   }
    //                   className="default w-80 py-2  rounded"
    //                 >
    //                   View Profile
    //                 </Button>
    //               </div>
    //             </CardBody>
    //           </Card>
    //         </Colxx>
    //       </Row>
    //     </Colxx>
    //   );
    // })
    <div>
      {cardlist.length === 0 ? (
        <Colxx sm="12" md="12" lg="8" xxs="12" className="mx-auto ">
          <Card>
            <CardBody>
              <h2 className="text-center text-large">No {noneText}</h2>
            </CardBody>
          </Card>
        </Colxx>
      ) : (
        Array.isArray(cardlist) &&
        cardlist.map((mentors) => {
          return (
            <Colxx xxs="12" key={mentors.id}>
              <Row>
                <Colxx sm="12" md="12" lg="8" xxs="12" className="mx-auto">
                  <Card
                    className="flex-row listing-card-container my-3 p-3"
                    style={{ gap: "16px" }}
                  >
                    <div className="d-flex flex-column" style={{ gap: "20px" }}>
                      <div className="d-flex flex-row" style={{ gap: "16px" }}>
                        <div className="d-block position-relative">
                          {mentors.imageUrl == null ? (
                            <div
                              className="card-img-left bg-primary 
             d-flex align-items-center justify-content-center"
                              style={{
                                width: "125px",
                                height: "125px",
                                borderRadius: "0.75rem",
                              }}
                            >
                              <ThumbnailLetters
                                rounded
                                text={mentors.firstName}
                                className="text-xlarge border border-1"
                                style={{ textAlign: "center" }}
                              />
                            </div>
                          ) : (
                            <img
                              src={`${baseUrl}/${mentors.imageUrl}`}
                              alt="Card"
                              style={{
                                width: "125px",
                                height: "125px",
                                borderRadius: "50%",
                                objectFit: "cover",
                              }}
                            />
                          )}
                          <div
                            className="text-one position-absolute bg-primary d-flex"
                            style={{
                              gap: "4px",
                              width: "fit-content",
                              padding: "8px 10px",
                              borderRadius: "25px",
                              bottom: "-12px",
                              left: "50%",
                              transform: "translateX(-50%)",
                            }}
                          >
                            <span className="font-weight-semibold">
                              <Rating
                                total={1}
                                rating={mentors.star}
                                interactive={false}
                              />
                            </span>
                            <span className="font-weight-semibold">
                              {mentors.star}
                            </span>
                          </div>
                        </div>
                        <CardBody className="d-flex flex-column flex-fill p-0 justify-content-center">
                          <div className="d-flex flex-wrap justify-content-between mb-1">
                            <div
                              className="d-flex flex-wrap"
                              style={{ gap: "10px" }}
                            >
                              <div className="font-weight-semibold text-large text-capitalize">
                                {mentors.firstName}
                              </div>
                              <div className="font-weight-semibold text-large text-capitalize">
                                {mentors.lastName}
                              </div>
                            </div>
                          </div>
                          <div className="d-flex" style={{ gap: "8px" }}>
                            <CardText className="text-one text-muted mb-2">
                              {mentors.jobTitle}
                            </CardText>
                            <div>|</div>
                            <CardText className="text-one text-primary mb-2">
                              {mentors.company}
                            </CardText>
                          </div>

                          <CardText className="d-flex flex-wrap">
                            {mentors.skills &&
                              mentors.skills.slice(0, 3).map((skill) => (
                                <div
                                  key={skill}
                                  className="pr-2"
                                  id="btn.rounded"
                                >
                                  <Badge color="light" pill>
                                    {skill}
                                  </Badge>
                                </div>
                              ))}
                          </CardText>
                        </CardBody>
                      </div>
                      <div>
                        <CardText
                          className="text-one mb-2"
                          style={{ maxHeight: "62px", overflow: "hidden" }}
                        >
                          {truncateBio(mentors.bio, 20)}
                        </CardText>
                      </div>
                    </div>
                    <div className="d-flex align-items-center">
                      <div
                        className="d-flex align-items-center flex-column"
                        style={{ gap: "8px" }}
                      >
                        <div className="text-primary">
                          <span className="text-xlarge font-weight-semibold">
                            ₹{Math.floor(mentors.price).toLocaleString()}
                          </span>
                          /mo
                        </div>
                        <Button
                          color="primary"
                          onClick={() =>
                            history.push(`/app/alumni/profile/${mentors.id}`)
                          }
                          className="rounded"
                        >
                          View Profile
                        </Button>
                      </div>
                    </div>
                  </Card>
                </Colxx>
              </Row>
            </Colxx>
          );
        })
      )}
    </div>
  );
};

export default CommonCard;
