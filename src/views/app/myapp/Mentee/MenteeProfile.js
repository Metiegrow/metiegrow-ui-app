import React, { useState, useEffect } from "react";
import { Button, NavLink, Row, Col, Card } from "reactstrap";
import axios from "axios";
import { baseUrl } from "constants/defaultValues";
import { useParams } from "react-router-dom";
import { Colxx } from "components/common/CustomBootstrap";
import ThumbnailLetters from "components/cards/ThumbnailLetters";
import country from "../my-login/Country";

const UserProfile = () => {
  const { uid } = useParams();

  const [image, setImage] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [location, setLocation] = useState("");
  const [lastName, setLastName] = useState("");
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [twitterHandle, setTwitterHandle] = useState("");

  const [loading, setLoading] = useState(true);
  const [profileData, setProfileData] = useState(false);
  const url = `${baseUrl}/api/mentee/profile/${uid}`;

  useEffect(() => {
    const mentorProfileDetails = async () => {
      try {
        const response = await axios.get(url);
        const userData = response.data;
        if (userData) {
          setImage(userData.imageUrl);
          setFirstName(userData.firstName);
          setLastName(userData.lastName);
          setJobTitle(userData.jobTitle);
          setLocation(userData.location);
          setLinkedinUrl(userData.linkedIn);
          setTwitterHandle(userData.twitterHandle);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(true);
        setTimeout(() => {
          setLoading(false);
        }, 4000);
        setProfileData(true);
      }
    };

    mentorProfileDetails();
  }, []);

  const handleLinkedInClick = () => {
    if (linkedinUrl) {
      window.open(linkedinUrl, "_blank");
    }
  };

  const handleTwitterClick = () => {
    if (twitterHandle) {
      const twitterUrl = `https://x.com/${twitterHandle}`;
      window.open(twitterUrl, "_blank");
    }
  };

  const countryName = country.find((c) => c.iso_code === location)?.name;
  return (
    <div className="mentor-profile">
      <Colxx sm="12" md="12" lg="12" xxs="12" className="">
        <div className="">
          <Card
            style={{ height: "160px", width: "100%", overflow: "hidden" }}
            className="bg-primary"
          >
            <div
              className="d-flex align-items-center justify-content-between"
              style={{ height: "100%" }}
            >
              <div className="d-flex align-items-center mt-4 ml-4 mb-4">
                {image === null ? (
                  <ThumbnailLetters
                    // small
                    rounded
                    text={firstName}
                    className="mx-2"
                    color="secondary"
                  />
                ) : (
                  <img
                    src={`${baseUrl}/${image}`}
                    // src="/assets/img/profiles/2.jpg"
                    className="mx-2 rounded-circle img-thumbnail border"
                    style={{
                      width: "110px",
                      height: "110px",
                      objectFit: "cover",
                    }}
                    alt="img"
                  />
                )}
                <div className="ml-4 mt-2">
                  <h1 className="font-weight-semibold text-large">
                    {firstName} {lastName}
                  </h1>
                </div>
              </div>
              <div className="mr-4">
                {linkedinUrl && (
                  <NavLink className="d-none d-md-inline-block">
                    <Button
                      color="light"
                      className="font-weight-semibold icon-button"
                      size="large"
                      onClick={handleLinkedInClick}
                    >
                      <i className="simple-icon-social-linkedin text-primary font-weight-semibold text-one" />
                    </Button>
                  </NavLink>
                )}
                {twitterHandle && (
                  <NavLink className="d-none d-md-inline-block">
                    <Button
                      color="light"
                      className="font-weight-semibold icon-button"
                      size="large"
                      onClick={handleTwitterClick}
                    >
                      <i className="simple-icon-social-twitter text-primary font-weight-semibold text-one" />
                    </Button>
                  </NavLink>
                )}
              </div>
            </div>
          </Card>
          {loading ? (
            <div className="loading" />
          ) : (
            <>
              {profileData ? (
                <div className="text-center mt-4">
                  <i className="simple-icon-exclamation display-4" />
                  <h4 className="mt-4">
                    Failed to fetch profile data from server{" "}
                  </h4>
                </div>
              ) : (
                <>
                  <Row>
                    <Col lg="6" md="12" className="mt-4">
                      <div>
                        <div className="ml-3">
                          {/* <h1 className="font-weight-semibold text-large">
                                  {firstName} {lastName}
                                </h1> */}
                          <h3 className="font-weight-semibold">
                            <i className="simple-icon-briefcase text-primary" />
                            <span className="ml-2">{jobTitle}</span>
                          </h3>
                          <h5 className="font-weight-medium">
                            <i className="simple-icon-location-pin text-primary" />
                            <span className="ml-2 font-weight-medium">
                              {countryName}
                            </span>
                          </h5>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </>
              )}
            </>
          )}
        </div>
      </Colxx>
    </div>
  );
};

export default UserProfile;
