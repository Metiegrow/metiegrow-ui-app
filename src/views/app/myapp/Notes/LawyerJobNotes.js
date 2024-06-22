import axios from "axios";
import { baseUrl } from "constants/defaultValues";
import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Card,
  Modal,
  ModalHeader,
  ModalBody,
  Badge,
} from "reactstrap";
import TimestampConverter from "../Calculation/TimestampConverter";

const LawyerJobNotes = ({ jobId }) => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [modal, setModal] = useState(false);

  const [editModal, setEditModal] = useState(false);
  const [editNoteId, setEditNoteId] = useState(null);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedText, setEditedText] = useState("");
  const [update, setUpdate] = useState(false)

  const [addModal, setAddModal] = useState(false);

  const notesUrl = `${baseUrl}/api/lawyer/job/${jobId}/notes`;
  useEffect(() => {
    axios
      .get(notesUrl)
      .then((response) => {
        setNotes(response.data);
      })
      .catch((error) => {
        console.error("Error fetching notes:", error);
      });
  }, [update]);

  const toggleAddModal = () => {
    setAddModal(!addModal);
  };

  const toggleModal = () => {
    setModal(!modal);
  };

  const toggleEditModal = () => {
    setEditModal(!editModal);
  };

  const handleAddNote = () => {
    if (newTitle.trim() !== "" && newNote.trim() !== "") {
      const newNoteData = {
        title: newTitle,
        details: newNote,
      };
      axios
        .post(notesUrl, newNoteData)
        .then((response) => {
          const updatedNotes = [...notes, response.data];
          setNotes(updatedNotes);
          setUpdate(!update)
          toggleAddModal();
        })
        .catch((error) => {
          console.error("Error adding note:", error);
        });
      setNewTitle("");
      setNewNote("");
    }
  };

  const handleDeleteNote = (id) => {
    axios
      .delete(`${baseUrl}/api/lawyer/job/notes/${id}`)
      .then((response) => {
        const updatedNotes = notes.filter((note) => note.id !== id);
        setNotes(updatedNotes);
        console.log(response);
        setUpdate(!update)
      })
      .catch((error) => {
        console.error("Error deleting note:", error);
      });
  };

  const handleEditNote = (id) => {
    const noteToEdit = notes.find((note) => note.id === id);
    setEditNoteId(id);
    setEditedTitle(noteToEdit.title);
    setEditedText(noteToEdit.details);
    toggleEditModal();
  };

  const saveEditedNote = () => {
    const updatedNote = {
      title: editedTitle,
      details: editedText,
    };
    axios
      .put(`${baseUrl}/api/lawyer/job/notes/${editNoteId}`, updatedNote)
      .then((response) => {
        console.log(response);
        const updatedNotes = notes.map((note) => {
          if (note.id === editNoteId) {
            return { ...note, title: editedTitle, text: editedText };
          }
          return note;
        });
        setNotes(updatedNotes);
        setUpdate(!update)
        toggleEditModal();
      })
      .catch((error) => {
        console.error("Error updating note:", error);
      });
  };

  const sortedNotes = [...notes].sort((a, b) => b.createdOn - a.createdOn);

  const userName = localStorage.getItem('userName');

  return (
    <Container>
      <Row className="justify-content-center ">
        <Col xs={12} sm={12} md={12} lg={12}>
          <Row className="justify-content-between  mb-4">
            <Col xs="auto">
              {/* <h1 className="mb-4">Lawyer job notes</h1> */}
            </Col>
            <Col xs="auto">
              <Button color="primary" onClick={toggleModal} size="sm" className="mt-4 header-icon notificationButton position-relative">
                Notes {" "}
                {/* <span className="count">{notes.length}</span> */}
                <Badge  color="light" className=" ">{notes.length}</Badge>
              </Button>
              {/* <Button color="primary" onClick={toggleModal} size="sm" className="header-icon notificationButton position-relative">
                Notes
                <span className="position-absolute top-10 start-100 translate-middle badge rounded-pill bg-secondary">
                  {notes.length}
                </span>
              </Button> */}
            </Col>
          </Row>
          <Modal
            isOpen={modal}
            toggle={toggleModal}
            // isOpen={modalOpen}
            // toggle={toggleModal}
            wrapClassName="modal-right"
            backdrop="static"
          >
            <ModalHeader toggle={toggleModal}>Notes</ModalHeader>

            <ModalBody>
              <Button color="primary" block onClick={toggleAddModal}>
                Add Note
              </Button>
              <Modal
                isOpen={addModal}
                toggle={toggleAddModal}
                // isOpen={modalOpen}
                // toggle={toggleModal}
                wrapClassName="modal-right"
                backdrop="static"
              >
                <ModalHeader toggle={toggleAddModal}>
                  Add a new note
                </ModalHeader>
                <ModalBody>
                  <Form
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleAddNote();
                    }}
                  >
                    <FormGroup>
                      <Label for="newTitle">Enter note title:</Label>
                      <Input
                        type="text"
                        id="newTitle"
                        placeholder="Enter note title"
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                        autoComplete="off"
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label for="newNote">Enter your note:</Label>
                      <Input
                        type="textarea"
                        id="newNote"
                        placeholder="Enter your note"
                        value={newNote}
                        onChange={(e) => setNewNote(e.target.value)}
                        autoComplete="off"
                      />
                    </FormGroup>
                    <Button color="primary" block>
                      Add Note
                    </Button>
                  </Form>
                </ModalBody>
              </Modal>

              <Row>
              {sortedNotes.length === 0 ? (
                  <Col className="mt-4 d-flex justify-content-center align-items-center">
                  <h4 className="text-center">There are no notes.</h4>
                </Col>
                ) : (
                sortedNotes.map((note) => (
                  <Col key={note.id} xs={12} sm={12} lg={12}>
                    <Card className="mt-3">
                      <div className="p-3 d-flex flex-column">
                        <Row className="">
                          <Col xs="auto">
                            <h5>{note.title}</h5>
                          </Col>
                            {userName === note.name && (
                          <Col xs="auto" className="ml-auto" lg={2}>
                            <Button
                              outline
                              onClick={() => handleEditNote(note.id)}
                              color="primary"
                              className="icon-button"
                            >
                              <i className="simple-icon-pencil" />
                            </Button>
                          </Col>
                        )}
                        </Row>

                        <p>{note.details}</p>
                        <Row className="">
                        <Col className="d-flex flex-column justify-content-end" lg={6}>
                            <p className="text-muted mb-0">
                              Created at -{" "}
                              <TimestampConverter
                                timeStamp={note.createdAt}
                                format="datetime"
                              />
                            </p>
                            {/* <p className="text-muted">
                              Modified at -{" "}
                              <TimestampConverter
                                timeStamp={note.modifiedAt}
                                format="datetime"
                              />
                            </p> */}
                          </Col>
                          <Col className="d-flex flex-column justify-content-end">
                            <p className="text-muted mb-0">
                              Created by - {note.name}
                            </p>
                          </Col>
                          {userName === note.name && (
                          <Col className="" lg={2}>
                            <Button
                              outline
                              onClick={() => handleDeleteNote(note.id)}
                              color="danger"
                              className="icon-button"
                            >
                              <i className="simple-icon-trash" />
                            </Button>
                            {/* <Button color="primary" size="sm" onClick={() => handleEditNote(note.id)}>Edit</Button>{' '} */}
                            {/* <Button color="danger" size="sm" onClick={() => handleDeleteNote(note.id)}>Delete</Button> */}
                          </Col>
                          )}
                        </Row>
                      </div>
                    </Card>
                  </Col>
                ))
              )}
              </Row>
            </ModalBody>
          </Modal>
          <Modal
            isOpen={editModal}
            toggle={toggleEditModal}
            // isOpen={modalOpen}
            // toggle={toggleModal}
            wrapClassName="modal-right"
            backdrop="static"
          >
            <ModalHeader toggle={toggleEditModal}>Edit Note</ModalHeader>
            <ModalBody>
              <Form
                onSubmit={(e) => {
                  e.preventDefault();
                  saveEditedNote();
                }}
              >
                <FormGroup>
                  <Label for="editedTitle">Edit note title:</Label>
                  <Input
                    type="text"
                    id="editedTitle"
                    placeholder="Enter note title"
                    value={editedTitle}
                    onChange={(e) => setEditedTitle(e.target.value)}
                    autoComplete="off"
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="editedText">Edit your note:</Label>
                  <Input
                    type="textarea"
                    id="editedText"
                    placeholder="Enter your note"
                    value={editedText}
                    onChange={(e) => setEditedText(e.target.value)}
                    autoComplete="off"
                  />
                </FormGroup>
                <Button color="primary" block>
                  Save Changes
                </Button>
              </Form>
            </ModalBody>
          </Modal>
          {/* <h2 className="mt-4">My Notes</h2> */}
        </Col>
      </Row>
    </Container>
  );
};

export default LawyerJobNotes;
