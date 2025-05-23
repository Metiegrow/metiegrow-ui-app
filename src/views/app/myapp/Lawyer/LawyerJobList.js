import axios from "axios";
import ThumbnailLetters from "components/cards/ThumbnailLetters";
import { Colxx } from "components/common/CustomBootstrap";
import { baseUrl } from "constants/defaultValues";
import { useEffect, useState } from "react";

import { useHistory } from "react-router-dom";
import { Card, CardBody } from "reactstrap";
// import ToasterComponent from "../notifications/ToasterComponent";

const LawyerJobList = () => {
  const [joblist, setJobList] = useState("");
  // const url=`${baseUrl}/lawyerJobList`;
  const history = useHistory();
  // Backend url
  const url = `${baseUrl}/api/lawyer/job`;
  // this file is logged by lawyer

  useEffect(() => {
    const LawyerJobsList = async () => {
      try {
        const response = await axios.get(url);
        setJobList(response.data);
      } catch (error) {
        if (error.response) {
          // ToasterComponent("error", error.response.data.statuses);
        } else {
          console.error("Error fetching data:", error);
        }
      }
    };
    LawyerJobsList();
  }, []);
  return (
    <div>
      <Colxx sm="12" md="12" lg="8" xxs="12" className="mx-auto">
        <h1 className="font-weight-bold">In Progress Jobs</h1>
        {joblist && joblist.inProgress && joblist.inProgress.length > 0 ? (
          joblist.inProgress.map((j) => {
            const createdAtDate = new Date(j.createdAt);
            const formattedDate = `${createdAtDate.toLocaleDateString()} ${createdAtDate.toLocaleTimeString()}`;

            const modifiedAtDate = new Date(j.modifiedAt);
            const formattedModifiedAt = `${modifiedAtDate.toLocaleDateString()} ${modifiedAtDate.toLocaleTimeString()}`;

            return (
              <Card
                key={j.id}
                className="my-2"
                style={{ cursor: "pointer" }}
                onClick={() =>
                  history.push(`/app/jobsdetails/${j.id}`, {
                    clientName: j.clientName,
                  })
                }
              >
                <CardBody>
                  <div className="d-flex justify-content-between flex-wrap ">
                    <div className="d-flex align-items-center flex-wrap">
                      <div className="">
                        {/* <ThumbnailLetters
                          rounded
                          text={j.clientName}
                          className="border border-1 mr-3 "
                        /> */}
                        {j.imageUrl == null ? (
                          <ThumbnailLetters
                            rounded
                            text={j.clientName}
                            className="border border-1 mr-3"
                          />
                        ) : (
                          <img
                            src={`${baseUrl}/${j.imageUrl}`}
                            alt={j.clientName}
                            className="border border-1 mr-3"
                            style={{
                              width: "90px",
                              height: "90px",
                              borderRadius: "50%",
                              objectFit: "cover",
                            }}
                          />
                        )}
                      </div>
                      <div className="d-flex flex-column ">
                        <h2 className="text-primary">{j.clientName}</h2>
                        <h4>
                          Job Name:
                          <span className="font-weight-semibold">
                            {" "}
                            {j.jobName}
                          </span>
                        </h4>
                      </div>
                    </div>

                    <div className="d-flex flex-column mt-sm-2 ">
                      <h4>
                        Status:
                        <span className="font-weight-semibold">
                          {" "}
                          {j.status}
                        </span>{" "}
                      </h4>

                      <h4>
                        Created At:
                        <span className="text-muted">
                          {" "}
                          {formattedDate}
                        </span>{" "}
                      </h4>
                      <h4>
                        Modified At:
                        <span className="text-muted">
                          {" "}
                          {formattedModifiedAt}
                        </span>
                      </h4>
                    </div>
                  </div>
                </CardBody>
              </Card>
            );
          })
        ) : (
          <div>
            <Card>
              <CardBody>
                <h2 className="text-center">No In Progress Jobs</h2>
              </CardBody>
            </Card>
          </div>
        )}
      </Colxx>

      <Colxx sm="12" md="12" lg="8" xxs="12" className="mx-auto">
        <h1 className="font-weight-bold my-2">Completed Jobs</h1>
        {joblist && joblist.completed && joblist.completed.length > 0 ? (
          joblist.completed.map((j) => {
            const createdAtDate = new Date(j.createdAt);
            const formattedDate = `${createdAtDate.toLocaleDateString()} ${createdAtDate.toLocaleTimeString()}`;

            const modifiedAtDate = new Date(j.modifiedAt);
            const formattedModifiedAt = `${modifiedAtDate.toLocaleDateString()} ${modifiedAtDate.toLocaleTimeString()}`;

            return (
              <Card
                key={j.id}
                className="my-2"
                style={{ cursor: "pointer" }}
                onClick={() =>
                  history.push(`/app/jobsdetails/${j.id}`, {
                    clientName: j.clientName,
                    clientId: j.clientUserId,
                  })
                }
              >
                <CardBody>
                  <div className="d-flex justify-content-between flex-wrap">
                    <div className="d-flex align-items-center flex-wrap">
                      <div className="">
                        {/* <ThumbnailLetters
                          rounded
                          text={j.clientName}
                          className="border border-1 mr-3 "
                        /> */}
                        {j.imageUrl == null ? (
                          <ThumbnailLetters
                            rounded
                            text={j.clientName}
                            className="border border-1 mr-3"
                          />
                        ) : (
                          <img
                            src={`${baseUrl}/${j.imageUrl}`}
                            alt={j.clientName}
                            className="border border-1 mr-3"
                            style={{
                              width: "90px",
                              height: "90px",
                              borderRadius: "50%",
                              objectFit: "cover",
                            }}
                          />
                        )}
                      </div>
                      <div className="d-flex flex-column ">
                        <h2 className="text-primary">{j.clientName}</h2>
                        <h4>
                          Job Name:
                          <span className="font-weight-semibold">
                            {" "}
                            {j.jobName}
                          </span>
                        </h4>
                      </div>
                    </div>

                    <div className="d-flex flex-column mt-sm-2">
                      <h4>
                        Status:
                        <span className="font-weight-semibold">
                          {" "}
                          {j.status}
                        </span>{" "}
                      </h4>
                      <h4>
                        Created At:
                        <span className="text-muted">
                          {" "}
                          {formattedDate}
                        </span>{" "}
                      </h4>
                      <h4>
                        Modified At:
                        <span className="text-muted">
                          {" "}
                          {formattedModifiedAt}
                        </span>
                      </h4>
                    </div>
                  </div>
                </CardBody>
              </Card>
            );
          })
        ) : (
          <div>
            <Card>
              <CardBody>
                <h2 className="text-center">No Completed Jobs</h2>
              </CardBody>
            </Card>
          </div>
        )}
      </Colxx>
    </div>
  );
};

export default LawyerJobList;
