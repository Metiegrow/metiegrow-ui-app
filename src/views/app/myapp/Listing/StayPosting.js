import { Colxx } from "components/common/CustomBootstrap";
import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import {
  Button,
  Card,
  Col,
  Form,
  FormGroup,
  Input,
  InputGroup,
  InputGroupAddon,
  Label,
  Row,
} from "reactstrap";

import axios from "axios";
import { baseUrl } from "constants/defaultValues";
import { Field, Formik } from "formik";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "react-quill/dist/quill.bubble.css";
import "react-quill/dist/quill.snow.css";
import indentityStatusList from "../CommonCardList/IdentityStatusList";
import ToasterComponent from "../notifications/ToasterComponent";
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

const StayPosting = ({ closeModal, initialData, onEdit }) => {
  const [id] = useState(initialData?.id || 0);
  const [availableFrom, setAvailableFrom] = useState(
    initialData?.availableFrom || new Date().getTime()
  );
  // const [title] = useState(initialData?.title || "");
  // const [apartmentType] = useState(initialData?.apartmentTypeValue || null);
  // const [BHKType] = useState(initialData?.bhkTypeValue || null);
  // const [floor] = useState(initialData?.floorValue || null);
  // const [roomType] = useState(initialData?.roomTypeValue || null);
  // const [roomMate] = useState(initialData?.roomMateValue || null);
  // const [expectedRent] = useState(initialData?.expectedRent || null);
  // const [expectedDeposit] = useState(initialData?.expectedDeposit || null);
  const [monthlyMaintenance, setMonthlyMaintenance] = useState(
    initialData?.monthlyMaintenance || false
  );
  const [maintenanceAmount, setMaintenanceAmount] = useState(
    initialData?.maintenanceAmount || null
  );
  // const [parking] = useState(initialData?.parkingValue || null);
  // const [contact, setContact] = useState(initialData?.contact || "");
  // const [email, setEmail] = useState(initialData?.email || "");
  // const [mobileNumber, setMobileNumber] = useState(
  //   initialData?.mobileNumber || ""
  // );
  // const [ownerName, setOwnerName] = useState(initialData?.ownerName || "");
  // const [location, setLocation] = useState(initialData?.location || "");
  // const [description, setDescription] = useState(
  //   initialData?.description || ""
  // );
  // console.log("init",initialData)
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

  // const handleSubmit = async () => {
  //   setIsLoading(true);
  //   try {
  //     const data = {
  //       id,
  //       title,
  //       apartmentType,
  //       bhkType: BHKType,
  //       floor,
  //       roomType,
  //       roomMate,
  //       expectedRent,
  //       expectedDeposit,
  //       availableFrom,
  //       monthlyMaintenance,
  //       maintenanceAmount: monthlyMaintenance ? maintenanceAmount : null,
  //       parking,
  //       contact,
  //       description,
  //     };
  //     if (initialData) {
  //       await onEdit(data);
  //     } else {
  //       const response = await axios.post(url, data, {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       });
  //       ToasterComponent("success", response.data.statuses);
  //     }
  //     closeModal();
  //     setIsLoading(false);
  //     // console.log("job posted successfully");
  //   } catch (error) {
  //     setIsLoading(false);
  //     if (
  //       error.response &&
  //       error.response.data &&
  //       error.response.data.statuses
  //     ) {
  //       ToasterComponent("error", error.response.data.statuses);
  //     } else {
  //       console.error("Error posting job:", error);
  //     }
  //   }
  // };

  const handleDateChange = (date) => {
    setAvailableFrom(date);
    // const timestampInSeconds = date ? Math.floor(date.getTime() / 1000) : null;
    const timestampInMilliseconds = date ? date.getTime() : null;

    // console.log(timestampInSeconds);
    setAvailableFrom(timestampInMilliseconds);
  };

  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleFileChange2 = (e) => {
    setSelectedFiles([...e.target.files]); // Converts FileList to an array
  };

  return (
    <div>
      <Card className="mx-auto my-4 p-3" style={{ maxWidth: "900px" }}>
        {/* <h1 className="font-weight-semibold">Create a Room Stay post</h1> */}
        {/* <Card className="mt-3 p-3"> */}
        <Colxx sm="12" md="12" lg="12" xxs="12" className="mx-auto ">
          <Formik
            initialValues={{
              title: initialData?.title || "",
              BHKType: initialData?.bhkTypeValue || "",
              floor: initialData?.floorValue || "",
              apartmentType: initialData?.apartmentTypeValue || "",
              roomType: initialData?.roomTypeValue || "",
              roomMate: initialData?.roomMateValue || "",
              expectedRent: initialData?.expectedRent || "",
              expectedDeposit: initialData?.expectedDeposit || "",
              // contact: initialData?.contact || "",
              email: initialData?.email || "",
              location: initialData?.location || "",
              ownerName: initialData?.ownerName || "",
              mobileNumber: initialData?.mobileNumber || "",
              monthlyMaintenance: initialData?.monthlyMaintenance || false,
              maintenanceAmount: initialData?.maintenanceAmount || null,
              parking: initialData?.parkingValue || "",
              description: initialData?.description || "",
              stayCategory: initialData?.stayCategory || "",
              parkingCount: initialData?.parkingCount || "",
            }}
            validate={(values) => {
              const errors = {};
              if (!values.title.trim()) {
                errors.title = "Title is required";
              }
              if (!values.parkingCount.trim()) {
                errors.parkingCount = "Parking count is required";
              }
              // if (!values.jobTitle.trim()) {
              //   errors.jobTitle = "Job title is required";
              // }

              // if (!values.jobLocation.trim()) {
              //   errors.jobLocation = "Job location is required";
              // }
              // if (!values.company.trim()) {
              //   errors.company = "Company is required";
              // }

              if (!values.description.trim()) {
                errors.description = "Description is required";
              }
              if (!values.BHKType.trim()) {
                errors.BHKType = "BHK type is required";
              }
              if (!values.roomMate.trim()) {
                errors.roomMate = "Room mate is required";
              }
              if (!values.apartmentType.trim()) {
                errors.apartmentType = "Apartment type is required";
              }
              if (!values.floor.trim()) {
                errors.floor = "Floor type is required";
              }
              if (!values.expectedRent.trim()) {
                errors.expectedRent = "Expected rent is required";
              }
              if (!values.parking.trim()) {
                errors.parking = "parking is required";
              }
              if (!values.stayCategory.trim()) {
                errors.stayCategory = "stay category is required";
              }
              // if (values.skills.length === 0) {
              //   errors.skills = "At least one skill is required";
              // }
              return errors;
            }}
            onSubmit={async (values, { setSubmitting }) => {
              setIsLoading(true);
              try {
                const formData = new FormData();
                // formData.append(
                //   "images",
                //   // selectedFiles.map((file) => file)
                //   selectedFiles
                // );
                // const data = {
                //   id,
                //   title: values.title,
                //   apartmentType: values.apartmentType,
                //   bhkType: values.BHKType,
                //   floor: values.floor,
                //   roomType: values.roomType,
                //   roomMate: values.roomMate,
                //   expectedRent: values.expectedRent,
                //   expectedDeposit: values.expectedDeposit,
                //   availableFrom,
                //   monthlyMaintenance,
                //   maintenanceAmount: monthlyMaintenance
                //     ? maintenanceAmount
                //     : null,
                //   parking: values.parking,
                //   parkingCount: values.parkingCount,
                //   contact,
                //   description: values.description,
                //   // stayCategory: values.stayCategory,
                // };
                // const data = {
                //   id,
                //   title: values.title,
                //   apartmentType: parseInt(values.apartmentType, 10),
                //   bhkType: parseInt(values.BHKType, 10),
                //   floor: parseInt(values.floor, 10),
                //   roomType: parseInt(values.roomType, 10),
                //   roomMate: parseInt(values.roomMate, 10),
                //   expectedRent: parseInt(values.expectedRent, 10),
                //   expectedDeposit: parseInt(values.expectedDeposit, 10),
                //   availableFrom: parseInt(availableFrom, 10),
                //   monthlyMaintenance: values.monthlyMaintenance,
                //   maintenanceAmount: values.monthlyMaintenance
                //     ? parseInt(maintenanceAmount, 10)
                //     : null,
                //   parking: parseInt(values.parking, 10),
                //   parkingCount: parseInt(values.parkingCount, 10),
                //   ownerName: values.ownerName,
                //   mobileNumber: parseInt(values.mobileNumber, 10),
                //   email: values.email,
                //   location: values.location,
                //   description: values.description,
                // };
                const data = {
                  id,
                  title: values.title,
                  apartmentType: parseInt(values.apartmentType, 10),
                  bhkType: parseInt(values.BHKType, 10),
                  floor: parseInt(values.floor, 10),
                  roomType: parseInt(values.roomType, 10),
                  roomMate: parseInt(values.roomMate, 10),
                  expectedRent: parseInt(values.expectedRent, 10),
                  expectedDeposit: parseInt(values.expectedDeposit, 10),
                  availableFrom: parseInt(availableFrom, 10),
                  monthlyMaintenance: values.monthlyMaintenance,
                  maintenanceAmount: monthlyMaintenance
                    ? parseInt(maintenanceAmount, 10)
                    : null,
                  parking: parseInt(values.parking, 10),
                  parkingCount: parseInt(values.parkingCount, 10),
                  // contact,
                  ownerName: values.ownerName,
                  mobileNumber: parseInt(values.mobileNumber, 10),
                  // mobileNumber: +${values.mobileNumber},
                  identityStatus: values.stayCategory,
                  // };
                  email: values.email,
                  location: values.location,
                  description: values.description,
                };

                // selectedFiles.forEach((file) => {
                //   formData.append("images", file);
                // });

                // formData.append(
                //   "stayRoom",
                //   // new Blob([JSON.stringify(data)], { type: "application/json" })
                //   JSON.stringify(data)
                // );

                // formData.append("stayRoom", JSON.stringify(data));
                formData.append(
                  "stayRoom",
                  new Blob([JSON.stringify(data)], { type: "application/json" })
                );

                // Then append each file in selectedFiles as "images"
                // selectedFiles.forEach((file) => {
                //   formData.append("images", file);
                // });
                console.log("Selected files:", selectedFiles);
                if (selectedFiles && selectedFiles.length > 0) {
                  selectedFiles.forEach((file) => {
                    console.log("File:", file);
                    formData.append("images", file);
                  });
                }

                console.log("FormData being sent: ", formData);
                if (initialData) {
                  await onEdit(data);
                } else {
                  const response = await axios.post(url, formData, {
                    headers: {
                      Authorization: `Bearer ${token}`,
                    },
                  });
                  ToasterComponent("success", response.data.statuses);
                }
                closeModal();
                setIsLoading(false);
              } catch (error) {
                setIsLoading(false);
                if (
                  error.response &&
                  error.response.data &&
                  error.response.data.statuses
                ) {
                  ToasterComponent("error", error.response.data.statuses);
                } else {
                  console.error("Error posting/editing job:", error);
                }
              }
              setSubmitting(false);
            }}
          >
            {({
              isValid,
              errors,
              touched,
              setFieldValue,
              handleSubmit,
              setFieldTouched,
              values,
            }) => (
              <Form className="av-tooltip tooltip-label-right ">
                <Row>
                  <Col md={6}>
                    <FormGroup className="error-l-75">
                      <Label>Title*</Label>
                      <Field
                        className="form-control"
                        name="title"
                        placeholder=""
                        value={values.title}
                        // onChange={(e) => setTitle(e.target.value)}
                        onChange={(e) => setFieldValue("title", e.target.value)}
                        required
                        //   validate={}
                      />

                      {/* {errors.apartmentType && touched.apartmentType && (
                          <div className="invalid-feedback d-block">
                            {errors.apartmentType}
                          </div>
                        )} */}
                      {errors.title && touched.title && (
                        <div className="invalid-feedback d-block">
                          {errors.title}
                        </div>
                      )}
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup className="error-l-75">
                      <Label>BHK Type*</Label>
                      <Field
                        as="select"
                        name="BHKType"
                        // onChange={(e) => setBHKType(e.target.value)}
                        onChange={(e) =>
                          setFieldValue("BHKType", e.target.value)
                        }
                        //   validate={}
                        className="form-control"
                        // value={BHKType || ""}
                        value={values.BHKType}
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
                      {errors.BHKType && touched.BHKType && (
                        <div className="invalid-feedback d-block">
                          {errors.BHKType}
                        </div>
                      )}
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <FormGroup className="error-l-75">
                      <Label>Floor*</Label>
                      <Field
                        as="select"
                        name="floor"
                        // onChange={(e) => setFloor(e.target.value)}
                        onChange={(e) => setFieldValue("floor", e.target.value)}
                        //   validate={}
                        className="form-control"
                        // value={floor || ""}
                        value={values.floor}
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
                      {errors.floor && touched.floor && (
                        <div className="invalid-feedback d-block">
                          {errors.floor}
                        </div>
                      )}
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup className="error-l-75">
                      <Label>Apartment Type*</Label>
                      <Field
                        as="select"
                        name="apartmentType"
                        // onChange={(e) => setApartmentType(e.target.value)}
                        onChange={(e) =>
                          setFieldValue("apartmentType", e.target.value)
                        }
                        //   validate={}
                        className="form-control"
                        // value={apartmentType || ""}
                        value={values.apartmentType}
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
                      {errors.apartmentType && touched.apartmentType && (
                        <div className="invalid-feedback d-block">
                          {errors.apartmentType}
                        </div>
                      )}
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
                        // onChange={(e) => setRoomType(e.target.value)}
                        onChange={(e) =>
                          setFieldValue("roomType", e.target.value)
                        }
                        //   validate={}
                        className="form-control"
                        // value={roomType || ""}
                        value={values.roomType}
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
                      {errors.roomType && touched.roomType && (
                        <div className="invalid-feedback d-block">
                          {errors.roomType}
                        </div>
                      )}
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup className="error-l-75">
                      <Label>Room Mate*</Label>

                      <Field
                        as="select"
                        name="roomMate"
                        // onChange={(e) => setRoomMate(e.target.value)}
                        onChange={(e) =>
                          setFieldValue("roomMate", e.target.value)
                        }
                        className="form-control"
                        // value={roomMate || ""}
                        value={values.roomMate}
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

                      {errors.roomMate && touched.roomMate && (
                        <div className="invalid-feedback d-block">
                          {errors.roomMate}
                        </div>
                      )}
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <FormGroup className="error-l-75">
                      <Label>Expected Rent*</Label>

                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">₹</InputGroupAddon>
                        <Input
                          type="number"
                          placeholder="Enter Amount"
                          //   value={}
                          // onChange={(e) => setExpectedRent(e.target.value)}
                          onChange={(e) =>
                            setFieldValue("expectedRent", e.target.value)
                          }
                          //   className="col-12 col-md-3"
                          // value={expectedRent}
                          value={values.expectedRent}
                        />
                      </InputGroup>
                      {errors.expectedRent && touched.expectedRent && (
                        <div className="invalid-feedback d-block">
                          {errors.expectedRent}
                        </div>
                      )}
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
                          // onChange={(e) => setExpectedDeposit(e.target.value)}
                          onChange={(e) =>
                            setFieldValue("expectedDeposit", e.target.value)
                          }
                          //   className="col-12 col-md-3"
                          // value={expectedDeposit}
                          value={values.expectedDeposit}
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
                        // onChange={(e) =>
                        //     setFieldValue("monthlyMaintenence", e.target.value)
                        //   }
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
                          value={maintenanceAmount || ""}
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
                      <Label>Owner name</Label>
                      <Field
                        className="form-control"
                        name="ownerName"
                        placeholder="Enter owner name"
                        // onChange={(e) => setOwnerName(e.target.value)}
                        onChange={(e) =>
                          setFieldValue("ownerName", e.target.value)
                        }
                        value={values.owenerName}
                        //   validate={}
                      />
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup className="error-l-75">
                      <Label>Mobile number</Label>
                      <Field
                        className="form-control"
                        name="mobile"
                        placeholder="Enter mobile number"
                        onChange={(e) =>
                          setFieldValue("mobileNumber", e.target.value)
                        }
                        value={values.mobileNumber}
                        //   validate={}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <FormGroup className="error-l-75">
                      <Label>Email</Label>
                      <Field
                        className="form-control"
                        name="company"
                        placeholder="Enter your email "
                        onChange={(e) => setFieldValue("email", e.target.value)}
                        value={values.email}
                        //   validate={}
                      />
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
                        // onChange={(e) => setParking(e.target.value)}
                        onChange={(e) =>
                          setFieldValue("parking", e.target.value)
                        }
                        //   validate={}
                        className="form-control"
                        // value={parking || ""}
                        value={values.parking}
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
                      {errors.parking && touched.parking && (
                        <div className="invalid-feedback d-block">
                          {errors.parking}
                        </div>
                      )}
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <Label>Stay Category*</Label>
                    <Field
                      as="select"
                      name="stayCategory"
                      // validate={validateIdentityStatus}
                      onChange={(e) =>
                        setFieldValue("stayCategory", e.target.value)
                      }
                      className="form-control"
                      value={values.stayCategory}
                    >
                      <option disabled value="">
                        Select Stay Category
                      </option>
                      {indentityStatusList.map((option) => (
                        <option key={option.name} value={option.name}>
                          {option.label}
                        </option>
                      ))}
                    </Field>
                    {errors.stayCategory && touched.stayCategory && (
                      <div className="invalid-feedback d-block">
                        {errors.stayCategory}
                      </div>
                    )}
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <FormGroup className="error-l-75">
                      <Label>Parking Count*</Label>
                      <Field
                        className="form-control"
                        name="parkingCount"
                        placeholder=""
                        value={values.parkingCount}
                        // onChange={(e) => setTitle(e.target.value)}
                        onChange={(e) =>
                          setFieldValue("parkingCount", e.target.value)
                        }
                        required
                        //   validate={}
                      />

                      {errors.parkingCount && touched.parkingCount && (
                        <div className="invalid-feedback d-block">
                          {errors.parkingCount}
                        </div>
                      )}
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup className="error-l-75">
                      <Label>Location</Label>
                      <Field
                        className="form-control"
                        name="company"
                        placeholder="Enter your location"
                        onChange={(e) =>
                          setFieldValue("location", e.target.value)
                        }
                        value={values.location}
                        //   validate={}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <Label>Image</Label>
                    {/* Image Error Message */}
                    {/* {imageError1 && (
    <div className="invalid-feedback d-block">
      {imageErrorMessage1}
    </div>
  )} */}

                    <InputGroup>
                      <div>
                        <Button
                          className="default"
                          color="primary"
                          onClick={() =>
                            document
                              .getElementById("file-upload-resume")
                              .click()
                          }
                        >
                          Upload Photos <i className="iconsminds-upload ml-2" />
                        </Button>
                        <Input
                          id="file-upload-resume"
                          type="file"
                          multiple
                          className="d-none"
                          onChange={handleFileChange2}
                        />
                      </div>
                    </InputGroup>
                    <div className="my-2">
                      {selectedFiles.length > 0 ? (
                        <ul>
                          {selectedFiles.map((file) => (
                            <li key={file}>Selected file: {file.name}</li>
                          ))}
                        </ul>
                      ) : (
                        ""
                      )}
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <FormGroup className="error-l-75">
                      <Label>Description*</Label>
                      <ReactQuill
                        theme="snow"
                        value={values.description}
                        onChange={(val) => setFieldValue("description", val)}
                        onBlur={() => setFieldTouched("description", true)}
                        modules={quillModules}
                        formats={quillFormats}
                      />
                      {errors.description && touched.description && (
                        <div className="invalid-feedback d-block">
                          {errors.description}
                        </div>
                      )}
                    </FormGroup>
                  </Col>
                </Row>
                <div className="mt-3 d-flex justify-content-end">
                  <Button
                    color="primary "
                    className={`col-12 col-md-3 btn-shadow btn-multiple-state ${
                      isLoading ? "show-spinner" : ""
                    }`}
                    // onClick={() => {
                    //   handleSubmit();
                    //   // closeModal();
                    // }}
                    onClick={handleSubmit}
                    type="submit"
                    disabled={!isValid}
                  >
                    <span className="spinner d-inline-block">
                      <span className="bounce1" />
                      <span className="bounce2" />
                      <span className="bounce3" />
                    </span>
                    <span className="label">
                      {initialData ? "Submit" : "List a Room"}
                    </span>
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </Colxx>
      </Card>
    </div>
  );
};

export default StayPosting;
