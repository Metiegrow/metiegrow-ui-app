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
  Spinner,
} from "reactstrap";
import TimestampConverter from "../Calculation/TimestampConverter";
import ToasterComponent from "../notifications/ToasterComponent";

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
  const [notsFetched, setNotesFetched] = useState(false);
  const [addNoteLoading, setAddNoteLoading] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);
  // const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState({});

  const [addModal, setAddModal] = useState(false);

  const notesUrl = `${baseUrl}/api/lawyer/job/${jobId}/notes`;
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await axios.get(notesUrl);
        setNotes(response.data);
        setNotesFetched(true);
      } catch (error) {
        console.error("Error fetching notes:", error);
        setNotesFetched(false);
      }
    };
  
    fetchNotes();
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

  const handleAddNote = async () => {
    setAddNoteLoading(true);
    if (newTitle.trim() !== "" && newNote.trim() !== "") {
      const newNoteData = {
        title: newTitle,
        details: newNote,
      };
  
      try {
        const response = await axios.post(notesUrl, newNoteData);
        // const updatedNotes = [...notes, response.data];
        // setNotes(updatedNotes);
        setUpdate(!update);
        toggleAddModal();
        setAddNoteLoading(false);
      ToasterComponent('success', response.data.statuses);
      } catch (error) {
        if(error.response){
          ToasterComponent('error', error.response.data.statuses);
        } else{
          console.error("Error adding note:", error);
        }
        setAddNoteLoading(false);
      }
  
      setNewTitle("");
      setNewNote("");
    }
  };
  

  const handleDeleteNote = async (id) => {
    setDeleteLoading(prev => ({ ...prev, [id]: true }));
    try {
      const response = await axios.delete(`${baseUrl}/api/lawyer/job/notes/${id}`);
      const updatedNotes = notes.filter((note) => note.id !== id);
      setNotes(updatedNotes);
      console.log(response);
      setUpdate(!update);
      ToasterComponent('success', response.data.statuses);
    } catch (error) {
      if(error.response){
        ToasterComponent('error', error.response.data.statuses);
      } else{
        console.error("Error deleting note:", error);
      }
    } finally {
      setDeleteLoading(prev => ({ ...prev, [id]: false }));
    }
  };
  

  const handleEditNote = (id) => {
    const noteToEdit = notes.find((note) => note.id === id);
    setEditNoteId(id);
    setEditedTitle(noteToEdit.title);
    setEditedText(noteToEdit.details);
    toggleEditModal();
  };

  const saveEditedNote = async () => {
    setSaveLoading(true);
    const updatedNote = {
      title: editedTitle,
      details: editedText,
    };
  
    try {
      const response = await axios.put(`${baseUrl}/api/lawyer/job/notes/${editNoteId}`, updatedNote);
      // console.log(response);
  
      const updatedNotes = notes.map((note) => {
        if (note.id === editNoteId) {
          return { ...note, title: editedTitle, text: editedText };
        }
        return note;
      });
      ToasterComponent('success', response.data.statuses);
      setSaveLoading(false);
      setNotes(updatedNotes);
      setUpdate(!update);
      toggleEditModal();
    } catch (error) {
      setSaveLoading(false);
      if(error.response){
        ToasterComponent('error', error.response.data.statuses);
      } else{
        console.error("Error updating note:", error);
      }
      
    }
  };
  

  // const sortedNotes = [...notes].sort((a, b) => b.createdOn - a.createdOn);

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
                    <Button type="submit" color="primary" block className={`btn-shadow btn-multiple-state ${
                      addNoteLoading ? "show-spinner" : ""
                    }`}>
                      <span className="spinner d-inline-block">
                      <span className="bounce1" />
                      <span className="bounce2" />
                      <span className="bounce3" />
                    </span>
                    <span className="label">
                    Add Note
                    </span>
                    </Button>
                  </Form>
                </ModalBody>
              </Modal>
              {!notsFetched ? (
                <div className="d-flex justify-content-center mt-4">
                <Spinner color="primary" className="mb-1" />
              </div>
                  ) : (
              <Row>
              {notes.length === 0 ? (
                  <Col className="mt-4 d-flex justify-content-center align-items-center">
                  <h4 className="text-center">There are no notes.</h4>
                </Col>
                ) : (
                  notes.map((note) => (
                  <>
                  
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
                                {!deleteLoading[note.id] ? (
                                  <i className="simple-icon-trash" />
                                ) : (
                                  <Spinner size="sm" />
                                )}
                              </Button>
                            {/* <Button color="primary" size="sm" onClick={() => handleEditNote(note.id)}>Edit</Button>{' '} */}
                            {/* <Button color="danger" size="sm" onClick={() => handleDeleteNote(note.id)}>Delete</Button> */}
                          </Col>
                          )}
                        </Row>
                      </div>
                    </Card>
                  </Col>
                  </>
                ))
              )}
              </Row>
                  )}

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
                <Button type="submit" color="primary" block className={`btn-shadow btn-multiple-state ${
                      saveLoading ? "show-spinner" : ""
                    }`}>
                  <span className="spinner d-inline-block">
                      <span className="bounce1" />
                      <span className="bounce2" />
                      <span className="bounce3" />
                    </span>
                    <span className="label">
                    Save Changes
                    </span>
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
