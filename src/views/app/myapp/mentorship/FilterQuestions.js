import axios from "axios";
import { Colxx } from "components/common/CustomBootstrap";
import { NotificationManager } from "components/common/react-notifications";
import { baseUrl } from "constants/defaultValues";
import { useEffect, useState } from "react";
import { Button, Card, CardBody, NavLink, Spinner } from "reactstrap";

const FilterQuestions = () => {
  const [isQuestionFetched, setIsQuestionFetched] = useState(false);

  // Backend url below
  const url = `${baseUrl}/api/mentee/multipleQuestions`;
  const [multiquestions, setMultiQuestions] = useState([]);
  const [editing, setEditing] = useState(false);
  // const [editedQuestion, setEditedQuestion] = useState("");
  const [loadingStates, setLoadingStates] = useState({});
  const [editStates, setEditStates] = useState({});

  const userId = localStorage.getItem("userId");

  const handleDeleteAnswer = async (questionId) => {
    setLoadingStates((prev) => ({ ...prev, [questionId]: true }));
    try {
      const deleteUrl = `${baseUrl}/api/mentee/${questionId}/question`;

      const response = await axios.delete(deleteUrl);

      if (response.status === 200) {
        NotificationManager.success(
          `Question successfully deleted`,
          "Success",
          3000
        );
        // Update the state locally
        setMultiQuestions((prevQuestions) =>
          prevQuestions.filter((question) => question.id !== questionId)
        );
      }
    } catch (error) {
      console.error("Error deleting answer:", error);
      NotificationManager.error("Failed to delete question", "Error", 3000);
    }
    setLoadingStates((prev) => ({ ...prev, [questionId]: false }));
  };

  const handleEdit = (id) => {
    const answerToUpdate = multiquestions.find((answer) => answer.id === id);
    if (answerToUpdate) {
      // setEditedAnswer1(answerToUpdate.answered); // Use answered to initialize editedAnswer1
      setEditStates((prevState) => ({
        ...prevState,
        [id]: true, // Set edit mode to true
      }));
    }
    setEditing(true);
  };

  const handleSave = async () => {
    // try {
    //   // await axios.put(`${baseUrl}/multipleQuestions/${questionId}`,
    //   await axios.put(`${baseUrl}/api/mentee/question`, {
    //     id: questionId,
    //     questionHeading: answers.questionHeading,
    //     questionHeadingBrief: editedQuestion,
    //     views: answers.views, // Keep the views unchanged
    //     time: answers.time, // Keep the time unchanged
    //   });
    //   setAnswers((prevAnswers) => ({
    //     ...prevAnswers,
    //     questionHeadingBrief: editedQuestion,
    //   }));
    // } catch (error) {
    //   console.error("Error updating question:", error);
    // }
    setEditing(false);
  };

  const handleCancel = () => {
    // setEditedQuestion("");
    setEditing(false);
  };

  useEffect(() => {
    const FilterMultiQuestions = async () => {
      try {
        const response = await axios.get(url);
        setMultiQuestions(response.data);
        setIsQuestionFetched(true);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    FilterMultiQuestions();
  }, []);

  return (
    <div>
      <Colxx sm="12" md="12" lg="8" xxs="12" className="mx-auto ">
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
        {!isQuestionFetched ? (
          <div className="loading" />
        ) : (
          <>
            {multiquestions.length > 0 ? (
              <Card className="my-3">
                <CardBody>
                  <h1 className="font-weight-semibold">
                    Recently Answered Questions on topics
                  </h1>
                  <hr />
                  {multiquestions.map((qs) => {
                    const date = new Date(qs.time);
                    return (
                      <div key={qs.id}>
                        <NavLink href={`/app/questions/${qs.id}`}>
                          {editStates[qs.id] ? (
                            <>
                              <input
                                type="text"
                                className="form-control py-2 my-2"
                                // value={editedAnswer1}
                                // onChange={(e) => setEditedAnswer1(e.target.value)}
                              />
                              <input
                                type="text"
                                className="form-control py-2 my-2"
                                // value={editedAnswer1}
                                // onChange={(e) => setEditedAnswer1(e.target.value)}
                              />
                            </>
                          ) : (
                            <>
                              <h2 className="font-weight-medium">
                                {qs.questionHeading}
                              </h2>
                              <p>{qs.questionHeadingBrief}</p>
                              <h6 className="text-muted">{qs.views} views</h6>
                              <h6 className="text-muted">
                                Asked on {date.toLocaleString()}
                              </h6>
                            </>
                          )}
                        </NavLink>
                        {+userId === qs.menteeUserId && (
                          <>
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
                              <div className="d-flex align-items-center justify-content-end">
                                <Button
                                  className="mr-2"
                                  outline
                                  color="primary"
                                  onClick={() => handleEdit(qs.id)}
                                >
                                  <i className="simple-icon-pencil" />
                                </Button>

                                <Button
                                  outline
                                  color="primary"
                                  onClick={() => handleDeleteAnswer(qs.id)}
                                >
                                  {loadingStates[qs.id] ? (
                                    <Spinner size="sm" />
                                  ) : (
                                    <i className="simple-icon-trash" />
                                  )}
                                </Button>
                              </div>
                            )}
                          </>
                        )}
                        <hr />
                      </div>
                    );
                  })}
                </CardBody>
              </Card>
            ) : (
              <Card className="my-3">
                <CardBody>
                  <h1 className="font-weight-semibold">
                    No Answered Questions Found
                    <span className="ml-2">
                      <i className="simple-icon-ban" />
                    </span>
                  </h1>
                </CardBody>
              </Card>
            )}
          </>
        )}
      </Colxx>
    </div>
  );
};

export default FilterQuestions;
