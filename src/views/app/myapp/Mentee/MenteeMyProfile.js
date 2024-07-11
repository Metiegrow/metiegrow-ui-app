import React, { useState, useEffect } from "react";
import {
  Button,
  NavLink,
  Row,
  Input,
  Label,
  Col,
  Form,
  Card,
} from "reactstrap";
import axios from "axios";
import { baseUrl } from "constants/defaultValues";

import { Colxx } from "components/common/CustomBootstrap";
import ThumbnailLetters from "components/cards/ThumbnailLetters";
import country from "../my-login/Country";

const MyProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [image, setImage] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [location, setLocation] = useState("");
  const [lastName, setLastName] = useState("");
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [twitterHandle, setTwitterHandle] = useState("");

  // const userId = localStorage.getItem("userId");
  const endUrl = `${baseUrl}/api/mentee/myprofile`;

  const [loading, setLoading] = useState(true);
  const [profileData, setProfileData] = useState(false);

  useEffect(() => {
    const mentorProfileDetails = async () => {
      try {
        const response = await axios.get(endUrl);
        const userData = response.data;
        if (userData) {
          setImage(userData.imageUrl);
          // setFirstName(userData.firstName);
          // setLastName(userData.lastName);
          setJobTitle(userData.jobTitle);
          setLocation(userData.location);
          // setEmail(userData.email);
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

  // useEffect(() => {
  //   const mentorProfileDetails = async () => {
  //     try {
  //       const response = await axios.get(inputUrl);
  //       const inputData = response.data;
  //       console.log("inputData:", inputData);
  //       if (inputData) {
  //         setExperience(inputData.experience)
  //         setLoading(false)
  //       }
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //       setLoading(true)
  //       setTimeout(() => {
  //       setLoading(false)
  //         }, 4000);
  //       setProfileData(true)
  //     }
  //   };

  //   mentorProfileDetails();
  // }, []);

  function getTokenRes() {
    return localStorage.getItem("tokenRes");
  }
  const token = getTokenRes();
  // console.log(token);

  const updateMEntorProfile = async () => {
    try {
      const updatedData = {
        image,
        firstName,
        lastName,
        jobTitle,
        location,
        linkedinUrl,
        twitterHandle,
      };

      await axios.put(endUrl, updatedData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.error("Error updating profile", error);
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
    updateMEntorProfile();
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

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

  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const countryName = country.find((c) => c.iso_code === location)?.name;
  const menteeName = localStorage.getItem("userName");
  return (
    <div className="mentor-profile">
      {/* <div className=""> */}

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
                    style={{ width: "110px", height: "110px", objectFit: "cover" }}
                    alt="img"
                  />
                )}
                <div className="ml-4 mt-2">
                  <h1 className="font-weight-semibold text-large">
                    {/* {firstName} {lastName} */}
                    {menteeName}
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
                  {isEditing && (
                    <div className="mt-2">
                      <Button
                        className="default"
                        color="light"
                        onClick={() =>
                          document.getElementById("file-upload").click()
                        }
                      >
                        Change profile pic{" "}
                        <i className="iconsminds-upload text-primary" />
                      </Button>
                      <Form>
                        <input
                          id="file-upload"
                          type="file"
                          className="form-control d-none"
                          onChange={handleFileChange}
                        />
                      </Form>
                      {file && <p>Selected file: {file.name}</p>}
                    </div>
                  )}
                  <Row>
                    <Col lg="6" md="12" className="mt-4">
                      <div>
                        {isEditing ? (
                          <div>
                            <>
                              <Row>
                                <Col md="6">
                                  <Label for="firstName">
                                    <h4>First Name</h4>
                                  </Label>
                                  <Input
                                    type="text"
                                    id="firstName"
                                    value={firstName}
                                    onChange={(e) =>
                                      setFirstName(e.target.value)
                                    }
                                  />
                                </Col>
                                <Col md="6">
                                  <Label for="lastName">
                                    <h4>Last Name</h4>
                                  </Label>
                                  <Input
                                    type="text"
                                    id="lastName"
                                    value={lastName}
                                    onChange={(e) =>
                                      setLastName(e.target.value)
                                    }
                                  />
                                </Col>
                              </Row>
                              <br />
                            </>
                            <>
                              <Label for="jobtitle">
                                <h4>Job Title</h4>
                              </Label>
                              <Input
                                type="text"
                                id="jobtitle"
                                value={jobTitle}
                                onChange={(e) => setJobTitle(e.target.value)}
                              />
                              <br />
                            </>

                            <>
                              <Label
                                for="location"
                                className="font-weight-medium"
                              >
                                <h4>Location</h4>
                              </Label>
                              {/* <Input
                        type="text"
                        id="location"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                      /> */}
                              <Input
                                type="select"
                                name="location"
                                value={location}
                                // validate={validateLocation}
                                onChange={(e) => setLocation(e.target.value)}
                                className="form-control"
                              >
                                <option disabled value="">
                                  Select Location
                                </option>
                                {country.map((option) => (
                                  <option
                                    key={option.iso_code}
                                    value={option.iso_code}
                                  >
                                    {option.name}
                                  </option>
                                ))}
                              </Input>
                              <br />
                            </>
                            <>
                              <Label for="email" className="font-weight-medium">
                                <h4>LinkedIn</h4>
                              </Label>
                              <Input
                                type="text"
                                id="linkedinUrl"
                                value={linkedinUrl}
                                onChange={(e) => setLinkedinUrl(e.target.value)}
                              />
                              <br />
                            </>
                            <>
                              <Label for="email" className="font-weight-medium">
                                <h4>Twitter</h4>
                              </Label>
                              <Input
                                type="text"
                                id="twitterHandle"
                                value={twitterHandle}
                                onChange={(e) =>
                                  setTwitterHandle(e.target.value)
                                }
                              />
                              <p className="text-muted">
                                Omit the &ldquo;@&rdquo; -e.g.
                                &ldquo;dqmonn&rdquo;
                              </p>
                              <br />
                            </>
                          </div>
                        ) : (
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
                              <span className="ml-2 font-weight-medium">{countryName}</span>
                            </h5>
                          </div>
                        )}
                      </div>
                      {!isEditing && (
                        <Button
                          color="primary"
                          outline
                          onClick={handleEditClick}
                          className="ml-2"
                        >
                          <i className="simple-icon-pencil" /> Edit
                        </Button>
                      )}
                      {isEditing && (
                        <>
                          <Button
                            color="primary"
                            onClick={handleSave}
                            className="mr-2"
                          >
                            Save
                          </Button>
                          <Button
                            color="primary"
                            outline
                            onClick={handleCancel}
                            className="ml-2"
                          >
                            Cancel
                          </Button>
                        </>
                      )}
                    </Col>
                  </Row>
                </>
              )}
            </>
          )}
        </div>
      </Colxx>
    </div>

    // </div>
  );
};

export default MyProfile;
