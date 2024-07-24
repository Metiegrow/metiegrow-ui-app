import React, { useEffect, useState } from "react";
import { Colxx } from "components/common/CustomBootstrap";
import {
  Row,
  Card,
  Button,
  FormGroup,
  Label,
  Col,
  Form,
  Input,
  InputGroup,
  InputGroupAddon,
} from "reactstrap";
import ReactQuill from "react-quill";

import "react-quill/dist/quill.snow.css";
import "react-quill/dist/quill.bubble.css";
import { Field, Formik } from "formik";
import { baseUrl } from "constants/defaultValues";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  ApartmentTypeData,
  BHKData,
  FloorData,
  RoomMateType,
  RoomTypeData,
  parkingOptions,
} from "./ListingData";

const quillModules = {
  toolbar: [
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image"],
    ["clean"],
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

// const ApartmentTypeData = [
//   { label: "Independent House/Villa", value: 0 },
//   { label: "Gated Community Villa", value: 1 },
//   { label: "Apartment", value: 2 },
// ];

// const BHKData = [
//   { label: "1 BHK", value: 0 },
//   { label: "2 BHK", value: 1 },
//   { label: "3 BHK", value: 2 },
// ];

// const FloorData = [
//   { label: "Ground Floor", value: 0 },
//   { label: "1", value: 1 },
//   { label: "2", value: 2 },
//   { label: "3", value: 3 },
//   { label: "4", value: 4 },
//   { label: "5", value: 5 },
//   { label: "6", value: 6 },
// ];

// const RoomTypeData = [
//   { label: "Single Room", value: 0 },
//   { label: "Shared Room", value: 1 },
// ];

const StayPosting = ({ closeModal }) => {
  const [availableFrom, setAvailableFrom] = useState(new Date().getTime());
  const [title, setTitle] = useState("");
  const [apartmentType, setApartmentType] = useState(null);
  const [BHKType, setBHKType] = useState(null);
  const [floor, setFloor] = useState(null);
  const [roomType, setRoomType] = useState(null);
  const [roomMate, setRoomMate] = useState(null);
  const [expectedRent, setExpectedRent] = useState(null);
  const [expectedDeposit, setExpectedDeposit] = useState(null);
  const [monthlyMaintenance, setMonthlyMaintenance] = useState(false);
  const [maintenanceAmount, setMaintenanceAmount] = useState(null);
  const [parking, setParking] = useState(null);
  const [contact, setContact] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!monthlyMaintenance) {
      setMaintenanceAmount(null);
    }
  }, [monthlyMaintenance]);

  const url = `${baseUrl}/api/posts/stay-post/`;

  function getTokenRes() {
    return localStorage.getItem("tokenRes");
  }
  const token = getTokenRes();

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const Data = {
        title,
        apartmentType,
        bhkType: BHKType,
        floor,
        roomType,
        roomMate,
        expectedRent,
        expectedDeposit,
        availableFrom,
        monthlyMaintenance,
        maintenanceAmount : monthlyMaintenance ? maintenanceAmount : null,
        parking,
        contact,
        description,
      };
      await axios.post(url, Data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      closeModal();
      setIsLoading(false);
      // console.log("job posted successfully");
    } catch (error) {
      console.error("Error posting job:", error);
      setIsLoading(false);
    }
  };

  const handleDateChange = (date) => {
    setAvailableFrom(date);
    // const timestampInSeconds = date ? Math.floor(date.getTime() / 1000) : null;
    const timestampInMilliseconds = date ? date.getTime() : null;

    // console.log(timestampInSeconds);
    setAvailableFrom(timestampInMilliseconds);
  };
  

  return (
    <div>
      <Card className="mx-auto my-4 p-3" style={{ maxWidth: "900px" }}>
        {/* <h1 className="font-weight-semibold">Create a Room Stay post</h1> */}
        {/* <Card className="mt-3 p-3"> */}
        <Colxx sm="12" md="12" lg="12" xxs="12" className="mx-auto ">
          <Formik>
            <Form className="av-tooltip tooltip-label-right ">
              <Row>
                <Col md={6}>
                  <FormGroup className="error-l-75">
                    <Label>Title*</Label>
                    <Field
                      className="form-control"
                      name="title"
                      placeholder=""
                      onChange={(e) => setTitle(e.target.value)}
                      //   validate={}
                    />

                    {/* {errors.apartmentType && touched.apartmentType && (
                          <div className="invalid-feedback d-block">
                            {errors.apartmentType}
                          </div>
                        )} */}
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup className="error-l-75">
                    <Label>BHK Type</Label>
                    <Field
                      as="select"
                      name="BHKType"
                      onChange={(e) => setBHKType(e.target.value)}
                      //   validate={}
                      className="form-control"
                      value={BHKType || ""}
                    >
                      <option key="" value="" disabled>
                        Select BHK type
                      </option>
                      {BHKData.map((option, index) => (
                        // eslint-disable-next-line react/no-array-index-key
                        <option key={index} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </Field>
                    {/* {errors.BHKType && touched.BHKType && (
                          <div className="invalid-feedback d-block">
                            {errors.BHKType}
                          </div>
                        )} */}
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <FormGroup className="error-l-75">
                    <Label>Floor</Label>
                    <Field
                      as="select"
                      name="floor"
                      onChange={(e) => setFloor(e.target.value)}
                      //   validate={}
                      className="form-control"
                      value={floor || ""}
                    >
                      <option key="" value="" disabled>
                        Select Floor
                      </option>
                      {FloorData.map((option, index) => (
                        // eslint-disable-next-line react/no-array-index-key
                        <option key={index} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </Field>
                    {/* {errors.floor && touched.floor && (
                          <div className="invalid-feedback d-block">
                            {errors.floor}
                          </div>
                        )} */}
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup className="error-l-75">
                    <Label>Apartment Type</Label>
                    <Field
                      as="select"
                      name="apartmentType"
                      onChange={(e) => setApartmentType(e.target.value)}
                      //   validate={}
                      className="form-control"
                      value={apartmentType || ""}
                    >
                      <option key="" value="" disabled>
                        Select Apartment type
                      </option>
                      {ApartmentTypeData.map((option, index) => (
                        // eslint-disable-next-line react/no-array-index-key
                        <option key={index} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </Field>
                    {/* {errors.apartmentType && touched.apartmentType && (
                          <div className="invalid-feedback d-block">
                            {errors.apartmentType}
                          </div>
                        )} */}
                  </FormGroup>
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <FormGroup className="error-l-75">
                    <Label>Room Type</Label>
                    <Field
                      as="select"
                      name="roomType"
                      onChange={(e) => setRoomType(e.target.value)}
                      //   validate={}
                      className="form-control"
                      value={roomType || ""}
                    >
                      <option key="" value="" disabled>
                        Select Room Type
                      </option>
                      {RoomTypeData.map((option, index) => (
                        // eslint-disable-next-line react/no-array-index-key
                        <option key={index} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </Field>
                    {/* {errors.floor && touched.floor && (
                          <div className="invalid-feedback d-block">
                            {errors.floor}
                          </div>
                        )} */}
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup className="error-l-75">
                    <Label>Room Mate</Label>

                    <Field
                      as="select"
                      name="roomMate"
                      onChange={(e) => setRoomMate(e.target.value)}
                      className="form-control"
                      value={roomMate || ""}
                    >
                      <option key="" value="" disabled>
                        Select Room Mate
                      </option>
                      {RoomMateType.map((option, index) => (
                        // eslint-disable-next-line react/no-array-index-key
                        <option key={index} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </Field>

                    {/* {errors.floor && touched.floor && (
                          <div className="invalid-feedback d-block">
                            {errors.floor}
                          </div>
                        )} */}
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <FormGroup className="error-l-75">
                    <Label>Expected Rent</Label>

                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">₹</InputGroupAddon>
                      <Input
                        type="number"
                        placeholder="Enter Amount"
                        //   value={}
                        onChange={(e) => setExpectedRent(e.target.value)}
                        //   className="col-12 col-md-3"
                      />
                    </InputGroup>
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup className="error-l-75">
                    <Label>Expected Deposit</Label>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">₹</InputGroupAddon>
                      <Input
                        type="number"
                        placeholder="Enter Amount"
                        //   value={}
                        onChange={(e) => setExpectedDeposit(e.target.value)}
                        //   className="col-12 col-md-3"
                      />
                    </InputGroup>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <FormGroup className="error-l-75">
                    <Label>Monthly Maintenance</Label>
                    <Field
                      as="select"
                      name="monthlyMaintenance"
                      // onChange={(e) => setMonthlyMaintenance(e.target.value)}
                      onChange={(e) =>
                        setMonthlyMaintenance(e.target.value === "extra")
                      }
                      //   validate={}
                      className="form-control"
                      value={monthlyMaintenance ? "extra" : "include"}
                    >
                      <option key="" value="" disabled>
                        Select
                      </option>
                      <option key="include" value="include">
                        Include
                      </option>
                      <option key="Extra" value="extra">
                        Extra
                      </option>
                    </Field>
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup className="error-l-75">
                    <Label>Maintenance Amount</Label>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">₹</InputGroupAddon>
                      <Input
                        type="number"
                        placeholder="Enter Amount"
                        disabled={!monthlyMaintenance}
                        //   value={}
                        value={maintenanceAmount || ''}
                        onChange={(e) => setMaintenanceAmount(e.target.value)}
                        //   className="col-12 col-md-3"
                      />
                    </InputGroup>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <FormGroup className="error-l-75">
                    <Label>Contact</Label>
                    <Field
                      className="form-control"
                      name="company"
                      placeholder="Enter Email or phone Number"
                      onChange={(e) => setContact(e.target.value)}
                      //   validate={}
                    />
                    {/* {errors.company && touched.company && (
                              <div className="invalid-feedback d-block">
                                {errors.company}
                              </div>
                            )} */}
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup className="error-l-75">
                    <Label>Available From</Label>
                    <DatePicker
                      selected={availableFrom}
                      onChange={handleDateChange}
                      // placeholderText={messages['forms.date']}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <FormGroup className="error-l-75">
                    <Label>Parking</Label>
                    <Field
                      as="select"
                      name="parking"
                      onChange={(e) => setParking(e.target.value)}
                      //   validate={}
                      className="form-control"
                      value={parking || ""}
                    >
                      <option key="" value="" disabled>
                        Select
                      </option>

                      {parkingOptions.map((option, index) => (
                        // eslint-disable-next-line react/no-array-index-key
                        <option key={index} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </Field>
                    {/* {errors.company && touched.company && (
                              <div className="invalid-feedback d-block">
                                {errors.company}
                              </div>
                            )} */}
                  </FormGroup>
                </Col>
              </Row>

              <div className="mt-4">
                <h6 className="font-weight-semibold">Description*</h6>
                {/* <p className='text-muted'>Include all the information would need to answer your question</p> */}
                <Row className="mb-4">
                  <Colxx xxs="12">
                    <ReactQuill
                      theme="snow"
                      //   value={description}
                      onChange={(val) => setDescription(val)}
                      modules={quillModules}
                      formats={quillFormats}
                    />
                  </Colxx>
                </Row>
              </div>
              <div className="mt-3 d-flex justify-content-end">
                <Button
                  color="primary "
                  className={`col-12 col-md-3 btn-shadow btn-multiple-state ${
                    isLoading ? "show-spinner" : ""
                  }`}
                  onClick={() => {
                    handleSubmit();
                    // closeModal();
                  }}
                >
                  <span className="spinner d-inline-block">
                    <span className="bounce1" />
                    <span className="bounce2" />
                    <span className="bounce3" />
                  </span>
                  <span className="label">List a Room</span>
                </Button>
              </div>
            </Form>
          </Formik>
        </Colxx>
      </Card>
    </div>
  );
};

export default StayPosting;
