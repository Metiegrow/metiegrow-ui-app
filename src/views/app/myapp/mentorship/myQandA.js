import axios from "axios";
import { Colxx } from "components/common/CustomBootstrap";
import { baseUrl } from "constants/defaultValues";
import Pagination from "containers/pages/Pagination";
import { useEffect, useState } from "react";
import { Card, CardBody, NavLink, Row } from "reactstrap";

const MyQandA = () => {
  const [myanswers, setMyAnswers] = useState("");
  const [answerPagination, setAnswerPagination] = useState("");
  const [myquestions, setMyQuestions] = useState("");
  const url = `${baseUrl}/api/mentor/myAnswers`;
  const url1 = `${baseUrl}/api/mentee/myQuestions`;
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPage1, setCurrentPage1] = useState(1);
  const [pagination, setPagination] = useState("");

  useEffect(() => {
    const MyAnswers = async () => {
      try {
        const response = await axios.get(
          `${url}?_page=${currentPage1}&_limit=5`
        );
        setMyAnswers(response.data.data);
        setAnswerPagination(response.data.paginationMeta);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    MyAnswers();
    const MyQuestions = async () => {
      try {
        const response = await axios.get(
          `${url1}?_page=${currentPage}&_size=3`
        );
        setMyQuestions(response.data.data);
        setPagination(response.data.paginationMeta);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    MyQuestions();
  }, []);

  function getRoleRes() {
    return localStorage.getItem("roleRes");
  }

  const roleRes = getRoleRes();

  return (
    <div>
      <Colxx lg="8" className="mx-auto">
        <Row>
          {/* Pass myquestions array */}
          <Colxx>
            <h1 className="text-center text-large w-100 py-2">
              My questions and answers
            </h1>
            <div>
              <div className="mt-2">
                <div className="d-flex justify-content-between">
                  <h2 className="font-weight-semibold">Questions</h2>
                </div>

                {myquestions && myquestions?.totalQuestions === 0 ? (
                  <></>
                ) : (
                  <h3 className="my-2">
                    View all
                    <span className="font-weight-bold px-1">
                      {myquestions.totalQuestions}
                    </span>
                    questions
                  </h3>
                )}
              </div>
              <div className="">
                <div className="">
                  {myquestions &&
                  myquestions.questions &&
                  myquestions.questions.length > 0 ? (
                    myquestions.questions.map((qs) => {
                      const qdate = new Date(qs.timestamp);
                      const qsdateformat = `${qdate.getDate()}/${
                        qdate.getMonth() + 1
                      }/${qdate.getFullYear()}`;
                      return (
                        <Card key={qs.questionId} className="mb-3">
                          <NavLink
                            href={`/app/questions/${qs.questionId}`}
                            className="d-flex justify-content-between"
                          >
                            <CardBody>
                              <div className="d-flex justify-content-between">
                                <NavLink
                                  href={`/app/questions/${qs.questionId}`}
                                  className="d-flex justify-content-between"
                                >
                                  <h3>{qs.question}</h3>
                                </NavLink>
                                <h3>{qsdateformat}</h3>
                              </div>
                            </CardBody>
                          </NavLink>
                        </Card>
                      );
                    })
                  ) : (
                    <Card>
                      <CardBody>
                        <h3>No questions</h3>
                      </CardBody>
                    </Card>
                  )}
                </div>
              </div>
            </div>
          </Colxx>
        </Row>
        <Pagination
          currentPage={currentPage}
          totalPage={pagination.totalPage}
          onChangePage={(i) => setCurrentPage(i)}
          lastIsActive={pagination.last}
          firstIsActive={pagination.first}
        />
        <div className="mt-5" />
        <hr />
        {roleRes &&
        (roleRes.includes("MENTOR") ||
          roleRes.includes("ALUMNI") ||
          roleRes.includes("LAWYER")) ? (
          <>
            <Row>
              <Colxx xxs="12">
                <div>
                  <div className="mt-4">
                    <div className="d-flex justify-content-between">
                      <h2 className="font-weight-semibold">Answers</h2>
                    </div>

                    {myanswers?.totalAnswers !== 0 ? (
                      <h3 className="my-2">
                        View all
                        <span className="font-weight-bold px-1">
                          {myanswers.totalAnswers}
                        </span>
                        answers
                      </h3>
                    ) : (
                      <></>
                    )}
                  </div>
                  {myanswers &&
                  myanswers.questions &&
                  myanswers.questions.length > 0 ? (
                    myanswers.questions.map((qs) => {
                      const qdate = new Date(qs.timestamp);
                      const qsdateformat = `${qdate.getDate()}/${
                        qdate.getMonth() + 1
                      }/${qdate.getFullYear()}`;
                      return (
                        <Card key={qs.questionId} className="mb-3">
                          <NavLink
                            href={`/app/questions/${qs.questionId}`}
                            className="d-flex justify-content-between"
                          >
                            <CardBody>
                              <div className="d-flex justify-content-between">
                                <h3>{qs.question}</h3>
                                <h3>{qsdateformat}</h3>
                              </div>
                            </CardBody>
                          </NavLink>
                        </Card>
                      );
                    })
                  ) : (
                    <Card>
                      <CardBody>
                        <h3>No answers</h3>
                      </CardBody>
                    </Card>
                  )}
                </div>
              </Colxx>
            </Row>
            <Pagination
              currentPage={currentPage1}
              totalPage={answerPagination.totalPage}
              onChangePage={(i) => setCurrentPage1(i)}
              lastIsActive={answerPagination.last}
              firstIsActive={answerPagination.first}
            />
          </>
        ) : (
          ""
        )}
      </Colxx>
    </div>
  );
};

export default MyQandA;
