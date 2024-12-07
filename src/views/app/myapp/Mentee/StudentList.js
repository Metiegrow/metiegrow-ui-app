import axios from "axios";
import ThumbnailLetters from "components/cards/ThumbnailLetters";
import { Colxx } from "components/common/CustomBootstrap";
import { baseUrl } from "constants/defaultValues";
import Pagination from "containers/pages/Pagination";
import { useEffect, useState } from "react";
import { Button, Card, CardBody, Row } from "reactstrap";
import MentorFilter from "../mentorship/MentorFilter";

const StudentList = () => {
  const [studentListData, setStudentListData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [paginationMeta, setPaginationMeta] = useState([]);
  const [isStudentCardFetched, setIsStudentCardFetched] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedSkills, setSelectedSkills] = useState([]);
  const handleLocationChange = (location) => setSelectedLocation(location);
  const handleSkillsChange = (skills) => setSelectedSkills(skills);

  const [inputkey, setInputKey] = useState("");

  const url = `${baseUrl}/api/userprofile/cards`;

  useEffect(() => {
    setIsStudentCardFetched(false);
    const getStudentData = async () => {
      const params = {};
      params.size = 10;
      params.page = currentPage - 1;

      if (selectedLocation) {
        params.location = selectedLocation;
      }
      if (selectedSkills) {
        params.skills = selectedSkills;
      }
      try {
        const response = await axios.get(url, { params });
        setStudentListData(response.data.data);
        setPaginationMeta(response.data.paginationMeta);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsStudentCardFetched(true);
      }
    };
    getStudentData();
  }, [selectedLocation, inputkey]);
  return (
    <div>
      <Colxx sm="12" md="12" lg="8" xxs="12" className="mx-auto ">
        <div>
          <div className="">
            <div className="form-group">
              <div className="input-group">
                <div
                  style={{ position: "relative" }}
                  className="col-12 col-lg-8 col-md-8"
                >
                  <i
                    className="simple-icon-magnifier mr-3"
                    style={{
                      position: "absolute",
                      top: "50%",
                      right: "15px",
                      transform: "translateY(-50%)",
                      zIndex: 2,
                      color: "#aaa",
                    }}
                  />
                  <input
                    type="text"
                    className="form-control rounded py-2"
                    placeholder="Search by name"
                    value={inputkey}
                    onChange={(e) => setInputKey(e.target.value)}
                    style={{ paddingRight: "2.5rem" }}
                  />
                </div>
              </div>

              <MentorFilter
                onLocationChange={handleLocationChange}
                selectedLocation={selectedLocation}
                selectedSkills={selectedSkills}
                onSkillsChange={handleSkillsChange}
                userRole="user"
              />
            </div>
          </div>
        </div>
      </Colxx>

      {isStudentCardFetched ? (
        <div className="loading" />
      ) : (
        <>
          <div>
            {studentListData.length === 0 ? (
              <Colxx sm="12" md="12" lg="8" xxs="12" className="mx-auto ">
                <Card>
                  <CardBody>
                    <h2 className="text-center text-large ">No Students</h2>
                  </CardBody>
                </Card>
              </Colxx>
            ) : (
              Array.isArray(studentListData) &&
              studentListData.map((students) => {
                return (
                  <Colxx xxs="12" key={students}>
                    <Row>
                      <Colxx
                        sm="12"
                        md="12"
                        lg="9"
                        xxs="12"
                        className="mx-auto"
                      >
                        <Card
                          className="flex-row flex-wrap flex-sm-nowrap listing-card-container my-3 p-3"
                          style={{ gap: "16px" }}
                        >
                          <div className="d-block lawyer-card-img-container">
                            {students.imageUrl === null ? (
                              <div
                                className="card-img-left bg-primary 
                                 d-flex align-items-center justify-content-center"
                                style={{
                                  width: "200px",
                                  height: "250px",
                                  borderRadius: "0.75rem",
                                }}
                              >
                                <ThumbnailLetters
                                  rounded
                                  text={students.firstName}
                                  className="text-xlarge border border-1"
                                  style={{
                                    textAlign: "center",
                                  }}
                                />
                              </div>
                            ) : (
                              <img
                                className="lawyer-card-width"
                                src={`${baseUrl}/${students.imageUrl}`}
                                alt="Card"
                                style={{
                                  width: "200px",
                                  height: "250px",
                                  borderRadius: "0.75rem",
                                }}
                              />
                            )}
                          </div>
                          <CardBody className="d-flex flex-column flex-fill p-0">
                            <div
                              className="d-flex flex-wrap justify-content-between mb-1"
                              style={{ columnGap: "24px" }}
                            >
                              <div
                                className="d-flex flex-wrap"
                                style={{ gap: "10px" }}
                              >
                                <div className="font-weight-semibold text-large text-capitalize">
                                  {students.firstName}
                                </div>
                                <div className="font-weight-semibold text-large text-capitalize">
                                  {students.lastName}
                                </div>
                              </div>
                            </div>
                            <div className="d-flex justify-content-between align-items">
                              <div className="">
                                <h6>
                                  {students.department} | {students.year}
                                </h6>
                                <h6>{students.college}</h6>
                              </div>
                              <div
                                className="d-flex flex-column "
                                style={{ gap: "10px" }}
                              >
                                <a
                                  href={`/app/studentprofile/${students.id}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  <Button color="primary">View Profile</Button>
                                </a>
                              </div>
                            </div>
                          </CardBody>
                        </Card>
                      </Colxx>
                    </Row>
                  </Colxx>
                );
              })
            )}
          </div>
        </>
      )}
      {isStudentCardFetched && (
        <Pagination
          currentPage={currentPage}
          totalPage={paginationMeta.totalPage}
          onChangePage={(i) => setCurrentPage(i)}
          lastIsActive={paginationMeta.last}
          firstIsActive={paginationMeta.first}
        />
      )}
    </div>
  );
};

export default StudentList;
