import axios from "axios";
import { Colxx } from "components/common/CustomBootstrap";
import { baseUrl } from "constants/defaultValues";
import Pagination from "containers/pages/Pagination";
import { Field, Formik } from "formik";
import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import { NavLink } from "react-router-dom";
import {
  Button,
  Card,
  Col,
  Form,
  FormGroup,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
} from "reactstrap";
import TimestampConverter from "../Calculation/TimestampConverter";
import ToasterComponent from "../notifications/ToasterComponent";

const quillModules = {
  toolbar: [
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

const MyOtherListing = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [deleteStayPost, setDeleteStayPost] = useState(false);

  const [otherListEdit, setOtherListingEdit] = useState(false);

  const [title, setTitle] = useState("");
  const [job, setJob] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // console.log(data)
  const url = `${baseUrl}/api/posts/other-post/myotherposts`;
  const updateUrl = `${baseUrl}/api/posts/other-post/`;

  useEffect(() => {
    const fetchMyOtherListingData = async () => {
      try {
        const response = await axios.get(url);
        setPagination(response.data.paginationMeta);
        setData(response.data.otherposts);
        setIsLoaded(true);
      } catch (error) {
        setIsLoaded(true);
        if (error.response) {
          console.error("Response error:", error.response);
        }
      }
    };

    fetchMyOtherListingData();
  }, [deleteStayPost]);

  const submitForm = async () => {
    setIsLoading(true);
    try {
      const response = await axios.put(updateUrl, ...data);
      console.log(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error("There was an error!", error);
    }
  };

  const deletePost = async (id) => {
    const otherDeleteUrl = `${baseUrl}/api/posts/other-post/${id}`;
    try {
      const response = await axios.delete(otherDeleteUrl);
      setDeleteStayPost(!deleteStayPost);
      ToasterComponent("success", response.data.statuses);
    } catch (error) {
      console.error("There was an error!", error);
    }
  };

  const handleMyOtherListDelete = (id) => deletePost(id);
  const handleMyOtherListEdit = () => setOtherListingEdit(true);
  const handleSaveOtherListing = () => {
    setOtherListingEdit(false);
    submitForm();
  };
  const handleCancelOtherListing = () => {
    setOtherListingEdit(false);
  };

  return !isLoaded ? (
    <div className="loading" />
  ) : (
    <>
      {!data.length > 0 ? (
        <Card className="d-flex justify-content-center align-items-center ">
          <h2 className="mt-4 mb-4">There are no posts available</h2>
        </Card>
      ) : (
        <Colxx xxs="12" className="mb-3">
          {data.map((item) => (
            <Card key={item} className="mb-4">
              <div className="pl-2 d-flex flex-grow-1 min-width-zero">
                <div className="card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center">
                  <NavLink
                    to={`/app/listing/other/view/${item.id}`}
                    className="w-30 w-sm-100"
                  >
                    <p className="list-item-heading mb-1 truncate">
                      {item.title}
                    </p>
                  </NavLink>
                  <p className="mb-1 text-muted text-small w-30 w-sm-100">
                    <i className="simple-icon-layers" /> {item.job}
                  </p>
                  <p className="mb-1 text-muted text-small w-15 w-sm-100">
                    <i className="simple-icon-clock" />{" "}
                    <TimestampConverter
                      timeStamp={item.postedOn}
                      format="datetime"
                    />
                  </p>
                </div>
                <div className="custom-control custom-checkbox pl-1 align-self-center pr-4">
                  <Button
                    onClick={() => handleMyOtherListEdit()}
                    outline
                    color="primary"
                    className="icon-button"
                  >
                    <i className="simple-icon-pencil" />
                  </Button>
                  <Button
                    onClick={() => handleMyOtherListDelete(item.id)}
                    outline
                    color="primary"
                    className="icon-button ml-2"
                  >
                    <i className="simple-icon-trash" />
                  </Button>
                </div>
              </div>
              <Modal
                isOpen={otherListEdit}
                toggle={() => setOtherListingEdit(!otherListEdit)}
                className=""
                size="lg"
                style={{
                  borderRadius: "10px",
                  overflow: "hidden",
                }}
              >
                <ModalHeader style={{ borderBottom: "none" }}>
                  <h2 className="font-weight-bold">Edit other listing</h2>
                </ModalHeader>
                <ModalBody className="d-flex justify-content-center align-items-center">
                  <Formik
                    initialValues={{
                      title,
                      job,
                      description,
                    }}
                    // validate={validate}
                  >
                    {({ errors, touched }) => (
                      <Form className="av-tooltip tooltip-label-right ">
                        <Row>
                          <Col md={6}>
                            <FormGroup className="error-l-75">
                              <Label>Title*</Label>
                              <Field
                                className="form-control"
                                name="title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                // validate={validate}
                              />
                              {errors.title && touched.title && (
                                <div className="invalid-feedback d-block">
                                  {errors.title}
                                </div>
                              )}
                              {/* <ErrorMessage name="title" component="div" className="invalid-feedback d-block" /> */}
                            </FormGroup>
                          </Col>
                          <Col md={6}>
                            <FormGroup className="error-l-75">
                              <Label>Job</Label>
                              <Field
                                className="form-control"
                                name="job"
                                value={job}
                                onChange={(e) => setJob(e.target.value)}
                                //   validate={}
                              />
                            </FormGroup>
                          </Col>
                        </Row>

                        <div className="mt-4">
                          <h6 className="font-weight-semibold">
                            Add a description*
                          </h6>
                          {/* <p className='text-muted'>Include all the information would need to answer your question</p> */}
                          <Row className="mb-4">
                            <Colxx xxs="12">
                              <ReactQuill
                                theme="snow"
                                value={description}
                                onChange={(val) => setDescription(val)}
                                modules={quillModules}
                                formats={quillFormats}
                              />
                            </Colxx>
                          </Row>
                        </div>

                        {/* <div className="mt-3 d-flex justify-content-end"></div> */}
                      </Form>
                    )}
                  </Formik>
                </ModalBody>

                <ModalFooter
                  // style={{ borderTop: 'none' }}
                  className="d-flex align-items-center justify-content-center"
                >
                  <Button
                    color="primary"
                    outline
                    // className="py-2"
                    className={`col-12 col-md-3 btn-shadow btn-multiple-state ${
                      isLoading ? "show-spinner" : ""
                    }`}
                    // disabled={!isValid}
                    onClick={() => handleSaveOtherListing()}
                  >
                    <span className="spinner d-inline-block">
                      <span className="bounce1" />
                      <span className="bounce2" />
                      <span className="bounce3" />
                    </span>
                    Save
                  </Button>
                  {/* <Button
                    outline
                    color="primary"
                    onClick={() => handleSaveOtherListing()}
                    className=""
                    // style={{ border: "none" }}
                  >
                    Save
                  </Button>{" "} */}
                  <Button
                    color="primary"
                    outline
                    onClick={() => handleCancelOtherListing()}
                    className=""
                    // style={{ border: "none" }}
                  >
                    {/* <i className="simple-icon-trash" /> */}
                    <span className="label">Cancel</span>
                  </Button>
                </ModalFooter>
              </Modal>
            </Card>
          ))}
          <Pagination
            currentPage={currentPage}
            totalPage={pagination.totalPage}
            onChangePage={(i) => setCurrentPage(i)}
            lastIsActive={pagination.first}
            firstIsActive={pagination.last}
          />
        </Colxx>
      )}
    </>
  );
};

export default MyOtherListing;
