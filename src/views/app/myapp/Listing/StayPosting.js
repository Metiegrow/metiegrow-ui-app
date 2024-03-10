import React, { useState } from "react";
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

const ApartmentTypeData = [
  "Independent House/Villa",
  "Gated Community Villa",
  "Apartment",
];
const BHKData = ["1 BHK", "2 BHK", "3 BHK"];
const FloorData = ["Ground Floor", "1", "2", "3", "4", "5", "6"];
const RoomTypeData = ["Single Room", "Shared Room"];

const StayPosting = () => {
  const [availableFrom, setAvailableFrom] = useState(new Date());
  const [title, setTitle] = useState("");
  const [apartmentType, setApartmentType] = useState("");
  const [BHKType, setBHKType] = useState("");
  const [floor, setFloor] = useState("");
  const [roomType, setRoomType] = useState("");
  const [roomMate, setRoomMate] = useState("");
  const [expectedRent, setExpectedRent] = useState("");
  const [expectedDeposit, setExpectedDeposit] = useState("");
  const [monthlyMaintenance, setMonthlyMaintenance] = useState(false);
  const [maintenanceAmount, setMaintenanceAmount] = useState("");
  const [parking, setParking] = useState("");
  const [contact, setContact] = useState("");
  const [description, setDescription] = useState("");

  const url = `${baseUrl}/api/posts/stay-post`;

  function getTokenRes() {
    return localStorage.getItem("tokenRes");
  }
  const token = getTokenRes();

  const handleSubmit = async () => {
    try {
      const Data = {
        title,
        apartmentType,
        BHKType,
        floor,
        roomType,
        roomMate,
        expectedRent,
        expectedDeposit,
        availableFrom,
        monthlyMaintenance,
        maintenanceAmount,
        parking,
        contact,
        description,
      };
      await axios.post(url, Data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("job posted successfully");
    } catch (error) {
      console.error("Error posting job:", error);
    }
  };

  return (
    <div>
      <Card className="mx-auto my-4 p-3" style={{ maxWidth: "900px" }}>
        <h1 className="font-weight-semibold">Post a Room Stay</h1>
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
                      {BHKData.map((option) => (
                        <option key={option} value={option}>
                          {option}
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
                      {FloorData.map((option) => (
                        <option key={option} value={option}>
                          {option}
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
                      {ApartmentTypeData.map((option) => (
                        <option key={option} value={option}>
                          {option}
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
                      {RoomTypeData.map((option) => (
                        <option key={option} value={option}>
                          {option}
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
                      <option key="Male" value="Male">
                        Male
                      </option>
                      <option key="Female" value="Female">
                        Female
                      </option>
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
                      onChange={(e) => setMonthlyMaintenance(e.target.value)}
                      //   validate={}
                      className="form-control"
                      value={monthlyMaintenance || ""}
                    >
                      <option key="" value="" disabled>
                        Select
                      </option>
                      <option key="include" value="true">
                        Include
                      </option>
                      <option key="Extra" value="false">
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
                      onChange={setAvailableFrom}
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
                      <option key="Car" value="Car">
                        Car
                      </option>
                      <option key="Bike" value="Bike">
                        Bike
                      </option>
                      <option key="Car and Bike" value="Car and Bike">
                        Car and Bike
                      </option>
                      <option key="No" value="No">
                        No
                      </option>
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
              <div className="mt-3">
                <Button
                  color="primary "
                  className="default  py-2 "
                  onClick={handleSubmit}
                >
                  List a Room
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
