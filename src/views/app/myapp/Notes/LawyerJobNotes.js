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
} from "reactstrap";
import TimestampConverter from "../Calculation/TimestampConverter";

const LawyerJobNotes = ({jobId}) => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [modal, setModal] = useState(false);
 const notesUrl = `${baseUrl}/api/lawyer/job/${jobId}/notes`
  useEffect(() => {
    axios
      .get(notesUrl)
      .then((response) => {
        setNotes(response.data);
      })
      .catch((error) => {
        console.error("Error fetching notes:", error);
      });
  }, []);

    // const saveNotes= (updatedNotes) => {
    //   axios.put("https://localhost:3001/api/lawyer/jobs/notes", updatedNotes)
    //     .then(response => {
    //       console.log("Notes saved successfully:", response.data);
    //     })
    //     .catch(error => {
    //       console.error("Error saving notes:", error);
    //     });
    // };

  const toggleModal = () => {
    setModal(!modal);
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
          // toggleModal();
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
      })
      .catch((error) => {
        console.error("Error deleting note:", error);
      });
  };

  const [editModal, setEditModal] = useState(false);
  const [editNoteId, setEditNoteId] = useState(null);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedText, setEditedText] = useState("");

  const toggleEditModal = () => {
    setEditModal(!editModal);
  };

  const handleEditNote = (id) => {
    const noteToEdit = notes.find((note) => note.id === id);
    setEditNoteId(id);
    setEditedTitle(noteToEdit.title);
    setEditedText(noteToEdit.text);
    toggleEditModal();
  };

  const saveEditedNote = () => {
    const updatedNote = {
      title: editedTitle,
      details: editedText,
    };
    axios
      .put(

        `${baseUrl}/api/lawyer/job/notes/${editNoteId}`,
        updatedNote
      )
      .then((response) => {
        console.log(response);
        const updatedNotes = notes.map((note) => {
          if (note.id === editNoteId) {
            return { ...note, title: editedTitle, text: editedText };
          }
          return note;
        });
        setNotes(updatedNotes);
        toggleEditModal();
      })
      .catch((error) => {
        console.error("Error updating note:", error);
      });
  };

  const sortedNotes = [...notes].sort((a, b) => b.createdOn - a.createdOn);

  return (
    <Container>
      <Row className="justify-content-center ">
        <Col xs={12} sm={8} md={6} lg={12}>
          <Row className="justify-content-between  mb-4">
            <Col xs="auto">
              {/* <h1 className="mb-4">Lawyer job notes</h1> */}
            </Col>
            <Col xs="auto">
              <Button color="primary" onClick={toggleModal} size="sm">
                Notes
              </Button>
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
            <ModalHeader toggle={toggleModal}>Add a new note</ModalHeader>
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
                  />
                </FormGroup>
                <Button color="primary" block>
                  Add Note
                </Button>
              </Form>
              <Row>
                {sortedNotes.map((note) => (
                  <Col key={note.id} xs={12} sm={12} lg={12}>
                    <Card className="mt-3">
                      <div className="p-3 d-flex flex-column">
                        <Row className="">
                          <Col xs="auto">
                            <h5>{note.title}</h5>
                          </Col>
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
                        </Row>

                        <p>{note.details}</p>
                        <Row className="">
                          <Col className="" lg={6}>
                            <p className="text-muted">
                              Created at -{" "}
                              <TimestampConverter
                                timeStamp={note.createdAt}
                                format="datetime"
                              />
                            </p>
                            <p className="text-muted">
                              Modified at -{" "}
                              <TimestampConverter
                                timeStamp={note.modifiedAt}
                                format="datetime"
                              />
                            </p>
                          </Col>
                          <Col className="">
                            <p className="text-muted">
                              Created by - {note.name}
                            </p>
                          </Col>

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
                        </Row>
                      </div>
                    </Card>
                  </Col>
                ))}
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
