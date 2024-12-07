import axios from "axios";
import { Colxx } from "components/common/CustomBootstrap";
import { NotificationManager } from "components/common/react-notifications";
import { baseUrl } from "constants/defaultValues";
import Pagination from "containers/pages/Pagination";
import { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CustomInput,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Input,
  InputGroup,
  InputGroupAddon,
  NavLink,
  Spinner,
} from "reactstrap";

const FilterQuestions = () => {
  const [isQuestionFetched, setIsQuestionFetched] = useState(false);
  const [dropdownBasicOpen, setDropdownBasicOpen] = useState(false);
  const [dropdownBasicOpen1, setDropdownBasicOpen1] = useState(false);

  // Backend url below
  const url = `${baseUrl}/api/questions`;

  const [multiquestions, setMultiQuestions] = useState([]);
  const [editing, setEditing] = useState(false);
  const [editedQuestion, setEditedQuestion] = useState("");
  const [originalQuestions, setOriginalQuestions] = useState([]);
  const [loadingStates, setLoadingStates] = useState({});
  const [editStates, setEditStates] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [paginationMeta, setPaginationMeta] = useState([]);
  const [inputkey, setInputKey] = useState("");
  const [selectedValue, setSelectedValue] = useState("Sort by"); // Default value
  const [selectedCategories, setSelectedCategories] = useState([]);

  const userId = localStorage.getItem("userId");

  // Handle dropdown item click
  const handleSelect = (value) => {
    setSelectedValue(value); // Update the selected value
  };

  const handleCategoryChange = (e) => {
    const { id, checked } = e.target;
    if (checked) {
      setSelectedCategories([...selectedCategories, id]);
    } else {
      setSelectedCategories(
        selectedCategories.filter((category) => category !== id)
      );
    }
  };

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
    const questionToEdit = multiquestions.find(
      (question) => question.id === id
    );
    if (questionToEdit) {
      setEditedQuestion(questionToEdit);
      setEditStates((prevState) => ({
        ...prevState,
        [id]: true,
      }));
    }
    setEditing(true);
  };

  // const handleSave = async () => {
  //   try {
  //     // await axios.put(`${baseUrl}/multipleQuestions/${questionId}`,
  //     await axios.put(`${baseUrl}/api/mentee/question`, {
  //       id: questionId,
  //       questionHeading: answers.questionHeading,
  //       questionHeadingBrief: editedQuestion,
  //       views: answers.views, // Keep the views unchanged
  //       time: answers.time, // Keep the time unchanged
  //     });
  //     setAnswers((prevAnswers) => ({
  //       ...prevAnswers,
  //       questionHeadingBrief: editedQuestion,
  //     }));
  //   } catch (error) {
  //     console.error("Error updating question:", error);
  //   }
  //   setEditing(false);
  // };
  const categories = [
    { id: "c1", label: "Category 1" },
    { id: "c2", label: "Category 2" },
    { id: "c3", label: "Category 3" },
    { id: "c4", label: "Category 4" },
    { id: "c5", label: "Category 5" },
  ];

  const handleSave = async (id) => {
    const questionToUpdate = multiquestions.find((q) => q.id === id);
    if (!questionToUpdate) return;

    setLoadingStates((prev) => ({ ...prev, [id]: true }));

    try {
      const response = await axios.put(`${baseUrl}/api/mentee/question`, {
        id: questionToUpdate.id,
        questionHeading: questionToUpdate.questionHeading,
        questionHeadingBrief: questionToUpdate.questionHeadingBrief,
        views: questionToUpdate.views,
        time: questionToUpdate.time,
      });

      if (response.status === 200) {
        // Update the original questions state
        setOriginalQuestions((prevQuestions) =>
          prevQuestions.map((q) => (q.id === id ? questionToUpdate : q))
        );

        // Update edit states
        setEditStates((prevState) => ({
          ...prevState,
          [id]: false,
        }));

        setEditing(false);
        setEditedQuestion(null);

        NotificationManager.success(
          "Question successfully updated",
          "Success",
          3000
        );
      }
    } catch (error) {
      console.error("Error updating question:", error);
      NotificationManager.error("Failed to update question", "Error", 3000);
    } finally {
      setLoadingStates((prev) => ({ ...prev, [id]: false }));
    }
  };

  const handleCancel = () => {
    if (editedQuestion) {
      setMultiQuestions((prevQuestions) =>
        prevQuestions.map((q) =>
          q.id === editedQuestion.id
            ? originalQuestions.find((oq) => oq.id === q.id)
            : q
        )
      );
      setEditStates((prevState) => ({
        ...prevState,
        [editedQuestion.id]: false,
      }));
    }
    setEditing(false);
    setEditedQuestion(null);
  };

  useEffect(() => {
    const FilterMultiQuestions = async () => {
      const params = {};
      if (inputkey) {
        params.q = inputkey;
      }
      params.size = 10;
      params.page = currentPage - 1;

      // Add the sort parameter based on the selected dropdown option
      if (selectedValue === "Most liked") {
        params.sort = "likes";
      } else if (selectedValue === "Most Viewed") {
        params.sort = "views";
      }

      if (selectedCategories.length > 0) {
        params.categories = selectedCategories.join(","); // Join selected categories into a comma-separated string
      }

      try {
        const response = await axios.get(url, { params });
        setMultiQuestions(response.data.data);
        setOriginalQuestions(response.data.data);
        setPaginationMeta(response.data.paginationMeta);
        setIsQuestionFetched(true);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    FilterMultiQuestions();
  }, [inputkey, currentPage, selectedValue, selectedCategories]);

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
        <div className="input-group">
          <div
            style={{ position: "relative" }}
            className="col-12 col-lg-12 col-md-12"
          >
            <i
              className="simple-icon-magnifier mr-3"
              style={{
                position: "absolute",
                top: "40%",
                right: "15px",
                transform: "translateY(-50%)",
                zIndex: 2,
                color: "#aaa",
              }}
            />
            {/* <input
              type="text"
              className="form-control text-one py-3"
              placeholder="Search questions"
              value={inputkey}
              onChange={(e) => setInputKey(e.target.value)}
              style={{ paddingRight: "2.5rem" }}
            /> */}

            <InputGroup className="mb-3 ">
              <InputGroupAddon addonType="prepend">
                <Dropdown
                  isOpen={dropdownBasicOpen}
                  toggle={() => setDropdownBasicOpen(!dropdownBasicOpen)}
                  className=" default"
                  style={{
                    borderRadius: "0px",
                    height: "100%",
                  }}
                >
                  <DropdownToggle
                    caret
                    color="primary"
                    outline
                    style={{
                      borderRadius: "0px",
                      height: "100%",
                    }}
                  >
                    {/* Sort by */}
                    {selectedValue}
                  </DropdownToggle>
                  <DropdownMenu>
                    {/* <DropdownItem>Most liked</DropdownItem>
                    <DropdownItem>Most Viewed</DropdownItem>
                    <DropdownItem>Category</DropdownItem> */}
                    <DropdownItem onClick={() => handleSelect("Most liked")}>
                      Most liked
                    </DropdownItem>
                    <DropdownItem onClick={() => handleSelect("Most Viewed")}>
                      Most Viewed
                    </DropdownItem>
                    {/* <DropdownItem onClick={() => handleSelect("Category")}>
                      Category
                    </DropdownItem> */}
                  </DropdownMenu>
                </Dropdown>
                {/* caategory filter */}
                <Dropdown
                  isOpen={dropdownBasicOpen1}
                  toggle={() => setDropdownBasicOpen1(!dropdownBasicOpen1)}
                  className=" default"
                  style={{
                    borderRadius: "0px",
                    height: "100%",
                  }}
                >
                  <DropdownToggle
                    caret
                    color="primary"
                    outline
                    style={{
                      borderRadius: "0px",
                      height: "100%",
                    }}
                  >
                    Category
                  </DropdownToggle>
                  <DropdownMenu>
                    {categories.map((category) => (
                      <CustomInput
                        key={category.id}
                        className="ml-2 "
                        type="checkbox"
                        id={category.id}
                        label={category.label}
                        onChange={handleCategoryChange}
                      />
                    ))}
                  </DropdownMenu>
                </Dropdown>
              </InputGroupAddon>
              <Input
                type="text"
                className="form-control text-one py-3"
                placeholder="Search questions"
                value={inputkey}
                onChange={(e) => setInputKey(e.target.value)}
              />
            </InputGroup>
          </div>
        </div>
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
                        {editStates[qs.id] ? (
                          <>
                            <input
                              type="text"
                              className="form-control py-2 my-2"
                              value={qs.questionHeading}
                              onChange={(e) => {
                                const newValue = e.target.value;
                                setMultiQuestions((prevQuestions) =>
                                  prevQuestions.map((q) =>
                                    q.id === qs.id
                                      ? { ...q, questionHeading: newValue }
                                      : q
                                  )
                                );
                              }}
                            />
                            <input
                              type="text"
                              className="form-control py-2 my-2"
                              value={qs.questionHeadingBrief}
                              onChange={(e) => {
                                const newValue = e.target.value;
                                setMultiQuestions((prevQuestions) =>
                                  prevQuestions.map((q) =>
                                    q.id === qs.id
                                      ? { ...q, questionHeadingBrief: newValue }
                                      : q
                                  )
                                );
                              }}
                            />
                          </>
                        ) : (
                          <NavLink href={`/app/questions/${qs.id}`}>
                            <h2 className="font-weight-medium">
                              {qs.questionHeading}
                            </h2>
                            <p>{qs.questionHeadingBrief}</p>
                            <h6 className="text-muted">{qs.views} views</h6>
                            <h6 className="text-muted">
                              Asked on {date.toLocaleString()}
                            </h6>
                          </NavLink>
                        )}
                        {+userId === qs.menteeUserId && (
                          <>
                            {editing ? (
                              <>
                                <Button
                                  outline
                                  color="primary"
                                  onClick={() => handleSave(qs.id)}
                                  className="mr-2"
                                  disabled={loadingStates[qs.id]}
                                >
                                  {loadingStates[qs.id] ? (
                                    <Spinner size="sm" color="primary" />
                                  ) : (
                                    "Save"
                                  )}
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

        {isQuestionFetched && (
          <Pagination
            currentPage={currentPage}
            totalPage={paginationMeta.totalPage}
            onChangePage={(i) => setCurrentPage(i)}
            lastIsActive={paginationMeta.last}
            firstIsActive={paginationMeta.first}
          />
        )}
      </Colxx>
    </div>
  );
};

export default FilterQuestions;
