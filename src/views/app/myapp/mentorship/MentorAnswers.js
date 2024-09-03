import axios from "axios";
import { Colxx } from "components/common/CustomBootstrap";
import { NotificationManager } from "components/common/react-notifications";
import { baseUrl } from "constants/defaultValues";
import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css";
import "react-quill/dist/quill.snow.css";
import { useHistory, useParams } from "react-router-dom";
import { Button, Card, CardBody, NavLink, Row } from "reactstrap";

const quillModules = {
  toolbar: [
    // [{ header: [1, 2, false] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    // ["link", "image"],
    // ["clean"],
  ],
};
const quillFormats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
];

const MentorAnswers = () => {
  const { questionId } = useParams();
  const history = useHistory();
  //  const {ansid}=useParams();

  // const [inputkey, setInputKey] = useState("");
  // const url=`${baseUrl}/mentorAnswers/${questionId}`;
  // const url1=`${baseUrl}/multipleQuestions/${questionId}`;
  // const deleteurl=`${baseUrl}/mentorAnswers/${questionId}/answer/${ansid}`
  // console.log('Params:', { questionId, ansid });
  // frontend url for post answer url
  // const answerUrl=`${baseUrl}/mentorAnswers/${questionId}/answer`

  // Backend url
  const url1 = `${baseUrl}/api/mentee/multipleQuestions/${questionId}`;
  const url = `${baseUrl}/api/mentorAnswers/${questionId}`;
  const [answers, setAnswers] = useState([]);
  const [answers1, setAnswers1] = useState([]);
  const [editing, setEditing] = useState(false);
  const [editedQuestion, setEditedQuestion] = useState("");
  // const [editing1, setEditing1] = useState(false);
  const [editedAnswer1, setEditedAnswer1] = useState("");
  //  const [editedAnswerId, setEditedAnswerId] = useState(null);
  const [editStates, setEditStates] = useState({});
  // const [editStates, setEditStates] = useState('');
  //  const [newAnswer,setNewAnswer]=useState('')

  const [loading, setLoading] = useState(false);

  const isArrayOfLength = (value, length) => {
    return Array.isArray(value) && value.length > length;
  };

  const [textQuillStandart, setTextQuillStandart] = useState("");
  const AnswersByMentors = async () => {
    try {
      const response = await axios.get(url1);
      setAnswers(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const AnswersByMentors1 = async () => {
    try {
      const response = await axios.get(url);
      setAnswers1(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    AnswersByMentors();

    AnswersByMentors1();
  }, []);

  const handleEdit = () => {
    setEditedQuestion(answers.questionHeadingBrief);
    setEditing(true);
  };

  function getRoleRes() {
    return localStorage.getItem("roleRes");
  }
  const roleRes = getRoleRes();

  const handleSave = async () => {
    try {
      // await axios.put(`${baseUrl}/multipleQuestions/${questionId}`,
      await axios.put(`${baseUrl}/api/mentee/question`, {
        id: questionId,
        questionHeading: answers.questionHeading,
        questionHeadingBrief: editedQuestion,
        views: answers.views, // Keep the views unchanged
        time: answers.time, // Keep the time unchanged
      });
      setAnswers((prevAnswers) => ({
        ...prevAnswers,
        questionHeadingBrief: editedQuestion,
      }));
    } catch (error) {
      console.error("Error updating question:", error);
    }
    setEditing(false);
  };

  const handleCancel = () => {
    setEditedQuestion("");
    setEditing(false);
  };

  //   const handleEdit1 = (id) => {
  //     const answerToUpdate = answers1.answer.find(answer => answer.id === id);
  //     setEditedAnswer1(answerToUpdate.answerText); // Update the edited answer text
  //     setEditStates(prevState => ({
  //       ...prevState,
  //       [id]: !prevState[id]
  //     }));
  //   };
  // ;
  const handleEdit1 = (id) => {
    const answerToUpdate = answers1.answer.find((answer) => answer.id === id);
    if (answerToUpdate) {
      setEditedAnswer1(answerToUpdate.answered); // Use answered to initialize editedAnswer1
      setEditStates((prevState) => ({
        ...prevState,
        [id]: true, // Set edit mode to true
      }));
    }
  };

  const handleSave1 = async (id) => {
    try {
      const updatedAnswers = answers1.answer.map((ans) =>
        ans.id === id ? { ...ans, answerText: editedAnswer1 } : ans
      );
      setAnswers1((prevAnswers) => ({
        ...prevAnswers,
        answer: updatedAnswers,
      }));

      const updatedAnswer = {
        id,
        answerText: editedAnswer1,
      };

      const response = await axios.put(
        `${baseUrl}/api/mentor/answer`,
        updatedAnswer
      );
      console.log("Updated answer:", response.data);
      if (response.status === 201) {
        await AnswersByMentors1();
      }
    } catch (error) {
      console.error("Error updating answered:", error);
    }

    setEditStates((prevState) => ({
      ...prevState,
      [id]: false,
    }));
  };

  const handleCancel1 = (id) => {
    setEditStates((prevState) => ({
      ...prevState,
      [id]: false,
    }));
  };

  const handleDeleteAnswer = async (answerId) => {
    try {
      // Construct the URL for deleting the answer
      // const deleteUrl = `${baseUrl}/mentorAnswers/${questionId}/answer/${answerId}`;
      const deleteUrl = `${baseUrl}/api/mentor/${answerId}/answer`;

      const response = await axios.delete(deleteUrl);

      if (response.status === 200) {
        NotificationManager.success(
          `Answer successfully deleted`,
          "Success",
          3000
        );
        setAnswers1((prevState) => ({
          ...prevState,
          answer: prevState.answer.filter((answer) => answer.id !== answerId),
        }));
      }
    } catch (error) {
      console.error("Error deleting answer:", error);
    }
  };
  const handleDeleteQuestion = async () => {
    try {
      const deleteUrl = `${baseUrl}/api/mentee/${questionId}/question`;

      const response = await axios.delete(deleteUrl);
      if (response.status === 200) {
        NotificationManager.success(
          `Question successfully deleted`,
          "Success",
          3000
        );
        // setAnswers1(prevState => ({
        //   ...prevState,
        //   question: prevState.question.filter(question => question.id !== questionsId)
        // }));
        history.push("/app/questions");
      }
    } catch (error) {
      console.error("Error deleting question:", error);
    }
  };

  const handlePostAnswer = async () => {
    setLoading(true);
    try {
      const doc = new DOMParser().parseFromString(
        textQuillStandart,
        "text/html"
      );
      const strippedAnswerText = doc.body.textContent || "";

      await axios.post(`${baseUrl}/api/mentor/${questionId}/answer`, {
        answerText: strippedAnswerText,
      });
      NotificationManager.success(
        `Answer posted successfully`,
        "Success",
        3000
      );
    } catch (error) {
      NotificationManager.error(`Error posting answer`, "Error", 3000);
      console.error("Error posting answer:", error);
    }
    try {
      const updatedResponse = await axios.get(
        `${baseUrl}/api/mentorAnswers/${questionId}`
      );
      setAnswers1(updatedResponse.data.answer);
      await AnswersByMentors();
      await AnswersByMentors1();
      setTextQuillStandart("");
    } catch (error) {
      console.error("Error fecting answer:", error);
    }
    setLoading(false);
  };

  return (
    <div className="">
      <Colxx sm="12" md="12" lg="8" xxs="12" className="mx-auto ">
        <div className="form-group">
          {/* <div className="input-group">
            <input
              type="text"
              className="form-control   "
              placeholder="Search here"
              value={inputkey}
              onChange={(e) => setInputKey(e.target.value)}
            />
          </div> */}

          {/*  Questions card starts */}

          <Card className="mt-3">
            <CardBody>
              <div className="d-flex justify-content-between">
                <h3 className="font-weight-semibold">
                  {answers.questionHeading}
                </h3>
                {roleRes.includes("USER") && (
                  <div className="d-flex ">
                    {editing ? (
                      <>
                        <Button
                          outline
                          color="primary"
                          onClick={handleSave}
                          className="mr-2"
                        >
                          Save
                        </Button>
                        <Button
                          outline
                          color="primary"
                          onClick={handleCancel}
                          className="mr-2"
                        >
                          Cancel
                        </Button>
                      </>
                    ) : (
                      <Button
                        outline
                        color="primary"
                        className="mr-2"
                        onClick={handleEdit}
                      >
                        <i className="simple-icon-pencil" />
                      </Button>
                    )}
                    <Button
                      outline
                      color="primary"
                      onClick={() => handleDeleteQuestion(questionId)}
                    >
                      <i className="simple-icon-trash" />
                    </Button>
                  </div>
                )}
              </div>

              {editing ? (
                <input
                  type="text"
                  className="form-control my-2 py-2"
                  value={editedQuestion}
                  onChange={(e) => setEditedQuestion(e.target.value)}
                />
              ) : (
                <p className="text-one">{answers.questionHeadingBrief}</p>
              )}

              <h6 className="text-muted">
                Asked on {new Date(answers.time).toLocaleString()}
              </h6>
              <hr />
              <div className="d-flex justify-content-between">
                <h6 className="font-weight-semibold">
                  {answers.views}
                  <span className="text-muted"> views</span>
                </h6>
                {/* <span className="text-one">
                  <i className="iconsminds-mail-inbox" />
                </span> */}
              </div>
            </CardBody>
          </Card>

          <div className="w-100">
            {/* <Button color="primary " className="default w-20 py-0   rounded" >
      Ask a questions
      </Button> */}

            <NavLink href="/app/askquestions">
              <Button
                color="primary"
                outline
                block
                className="default mt-3 mb-2 text-one py-3 w-100"
              >
                Ask a Free Question
              </Button>
            </NavLink>
          </div>

          {/*  Questions  card ends  */}
          {isArrayOfLength(answers1.answer, 0) && (
            <div
              className=" mt-3 d-flex justify-content-between font-weight-medium"
              style={{ gap: "16px" }}
            >
              <h6 className="text-nowrap">
                Answers {answers1.answer && answers1.answer.length}
              </h6>

              {/* <h6>
                Like the answers? Consult privately with the Mentor of your
                choice
              </h6> */}
            </div>
          )}
          {/*  answer starts  */}

          {answers1.answer &&
            answers1.answer.map((an) => {
              return (
                <Card key={an.id} className="mt-3 ">
                  <CardBody>
                    <div className="d-flex w-100 justify-content-between">
                      <div className=" ">
                        <h3>{an.mentorName}</h3>
                        <p className="text-one text-muted">{an.mentorRole}</p>
                      </div>
                      {/* <div>
                        <NavLink href="/app/mentorconsult">
                          <Button
                            outline
                            color="primary"
                            size="sm"
                            className=""
                          >
                            Consult Now
                          </Button>
                        </NavLink>
                      </div> */}
                    </div>

                    {/* <p>{an.answered}</p> */}
                    {/* want */}
                    {/* {editing1 ? (
                      <input
                        type="text"
                        className="form-control py-2 my-2"
                        value={editedAnswer1}
                        onChange={(e) => setEditedAnswer1(e.target.value)}
                      />
                    ) : (
                      <p>{an.answered}</p>
                    )} */}
                    {/* want ends */}
                    {editStates[an.id] ? (
                      <input
                        type="text"
                        className="form-control py-2 my-2"
                        value={editedAnswer1}
                        onChange={(e) => setEditedAnswer1(e.target.value)}
                      />
                    ) : (
                      <p>{an.answered}</p>
                    )}
                    <p>Answered {an.answeredYear} years ago</p>
                    {/* <p>0/1 people found this helpful</p> */}
                    <hr />
                    <div className="d-flex justify-content-between">
                      <div className="d-flex align-items-center">
                        {/* <h6 className="">Was this answer helpful?</h6>
                        <div className="ml-3">
                          <Button
                            outline
                            color="primary"
                            size="sm"
                            className="mr-2"
                          >
                            Yes
                          </Button>
                          <Button
                            outline
                            color="primary"
                            size="sm"
                            className=""
                          >
                            No
                          </Button>
                        </div> */}
                      </div>
                      <div>
                        <div className="d-flex align-items-center">
                          {roleRes.includes("MENTOR") && (
                            <>
                              {editStates[an.id] ? (
                                <>
                                  <Button
                                    outline
                                    color="primary"
                                    onClick={() => handleSave1(an.id)}
                                    className="mr-2"
                                  >
                                    Save
                                  </Button>
                                  <Button
                                    className="mr-2"
                                    outline
                                    color="primary"
                                    onClick={() => handleCancel1(an.id)}
                                  >
                                    Cancel
                                  </Button>
                                </>
                              ) : (
                                <Button
                                  className="mr-2"
                                  outline
                                  color="primary"
                                  onClick={() => handleEdit1(an.id)}
                                >
                                  <i className="simple-icon-pencil" />
                                </Button>
                              )}
                              <Button
                                outline
                                color="primary"
                                onClick={() => handleDeleteAnswer(an.id)}
                              >
                                <i className="simple-icon-trash" />
                              </Button>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              );
            })}
          {/*  answer ends  */}
          {roleRes.includes("USER") ? (
            <></>
          ) : (
            <div className="mt-4">
              <h5 className="font-weight-semibold">Your Answer</h5>
              <Row className="mb-4">
                <Colxx xxs="12">
                  <ReactQuill
                    theme="snow"
                    value={textQuillStandart}
                    onChange={(val) => setTextQuillStandart(val)}
                    modules={quillModules}
                    formats={quillFormats}
                  />
                  <div>
                    <Button
                      className="mt-2"
                      szie="xs"
                      color="primary"
                      onClick={handlePostAnswer}
                      disabled={loading}
                    >
                      {loading ? "Posting..." : "Post your answer"}
                    </Button>
                  </div>
                </Colxx>
              </Row>
            </div>
          )}
        </div>
      </Colxx>
    </div>
  );
};

export default MentorAnswers;
