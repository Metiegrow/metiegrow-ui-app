import React, { useState } from 'react'; //
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
  Row,
  Col,
} from 'reactstrap';
import personalInformationData from '../data/personalInformation-data';

const bachelorDgDomainCourseOptions = ['Select', 'Male', 'Female', 'Other'];
const { payload } = personalInformationData;

function InputPersonalInformation() {
  const [data, setData] = useState({
    firstName: '',
    lastName: '',
    Gender: '',
    Age: 0,
    dateOfBirth: '',
    addressLane1: '',
    addressLane2: '',
    zipCode: 0,
    state: '',
    country: '',
    adhaarNumber: '',
  });

  const [open, setOpen] = useState(false);
  function toggleModalFunction() {
    setOpen((oldValue) => !oldValue);
  }
  function handleChange(event) {
    switch (event.target.name) {
      case 'first_name':
        setData((prevValue) => {
          return { ...prevValue, firstName: event.target.value };
        });

        break;
      case 'last_name':
        setData((prevValue) => {
          return { ...prevValue, lastName: event.target.value };
        });
        break;
      case 'age':
        setData((prevValue) => {
          return { ...prevValue, Age: event.target.value };
        });
        break;
      case 'date_of_birth':
        setData((prevValue) => {
          return { ...prevValue, dateOfBirth: event.target.value };
        });
        break;
      case 'address_L1':
        setData((prevValue) => {
          return {
            ...prevValue,
            addressLane1: event.target.value,
          };
        });
        break;
      case 'address_L2':
        setData((prevValue) => {
          return { ...prevValue, addressLane2: event.target.value };
        });
        break;
      case 'gender':
        setData((prevValue) => {
          return { ...prevValue, Gender: event.target.value };
        });
        break;
      case 'state':
        setData((prevValue) => {
          return { ...prevValue, state: event.target.value };
        });
        break;
      case 'country':
        setData((prevValue) => {
          return { ...prevValue, country: event.target.value };
        });
        break;
      case 'zip_code':
        setData((prevValue) => {
          return { ...prevValue, zipCode: event.target.value };
        });
        break;
      case 'adhaar_number':
        setData((prevValue) => {
          return { ...prevValue, adhaarNumber: event.target.value };
        });
        break;

      default:
        console.log('default ran');
        break;
    }
    console.log(data);
  }

  return (
    <div>
      <span className="d-flex flex-row-reverse justify-content-between">
        <Button
          outline
          style={{ margin: '0 3% 3% 0' }}
          onClick={() => {
            toggleModalFunction();
          }}
        >
          {payload.title === null ? 'Enter' : 'Edit'}
        </Button>
      </span>
      <Modal
        scrollable={!false}
        style={{ maxWidth: '70%', maxHeight: '80%' }}
        isOpen={open}
        toggle={() => {
          toggleModalFunction();
        }}
        centered={!false}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <ModalHeader
            style={{
              display: 'inline',
              alignSelf: 'flex-end',
            }}
          >
            Personal Information
          </ModalHeader>

          <Button
            onClick={() => {
              toggleModalFunction();
            }}
            outline
            style={{ height: '2rem' }}
            color="danger"
          >
            <i className="iconsminds-close" />
          </Button>
        </div>

        <ModalBody>
          <Form>
            <FormGroup>
              <Row>
                <Col xs="6">
                  <Label>First Name</Label>
                  <Input
                    type="text"
                    name="first_name"
                    id="first_name"
                    placeholder="Alex"
                    onChange={(e) => {
                      handleChange(e);
                    }}
                  />
                </Col>
                {/* </FormGroup>
            <FormGroup> */}
                <Col xs="6">
                  <Label>Last Name</Label>
                  <Input
                    type="text"
                    name="last_name"
                    id="last_name"
                    placeholder="Murfy"
                    onChange={(e) => {
                      handleChange(e);
                    }}
                  />
                </Col>
              </Row>
            </FormGroup>
            <FormGroup>
              <Row>
                <Col xs="6">
                  <Label>Age</Label>
                  <Input
                    type="text"
                    name="age"
                    id="age"
                    placeholder="eg. 18"
                    onChange={(e) => {
                      handleChange(e);
                    }}
                  />
                </Col>
                {/* </FormGroup>
            <FormGroup> */}
                <Col xs="6">
                  <Label>Gender</Label>
                  <Input
                    type="select"
                    name="gender"
                    id="gender"
                    placeholder=""
                    onChange={(e) => {
                      handleChange(e);
                    }}
                  >
                    {bachelorDgDomainCourseOptions.map((course, id) => {
                      // random key generation
                      let i = id;
                      i += 17;
                      return <option key={i}>{course}</option>;
                    })}
                  </Input>
                </Col>
              </Row>
            </FormGroup>
            <FormGroup>
              <Label>Date Of Birth</Label>
              <Input
                type="date"
                name="date_of_birth"
                id="date_of_birth"
                placeholder=""
                onChange={(e) => {
                  handleChange(e);
                }}
              />
            </FormGroup>
            <FormGroup>
              <Label>Address Lane 1</Label>
              <Input
                type="text"
                name="address_L1"
                id="address_L1"
                placeholder="..."
                onChange={(e) => {
                  handleChange(e);
                }}
              />
            </FormGroup>
            <FormGroup>
              <Label>Address Lane 2</Label>
              <Input
                type="text"
                name="address_L2"
                id="address_L2"
                placeholder="..."
                onChange={(e) => {
                  handleChange(e);
                }}
              />
            </FormGroup>

            <FormGroup>
              <Row>
                <Col xs="6">
                  <Label>State</Label>
                  <Input
                    type="text"
                    name="state"
                    id="state"
                    placeholder="California"
                    onChange={(e) => {
                      handleChange(e);
                    }}
                  />
                </Col>
                {/* </FormGroup>
            <FormGroup> */}
                <Col xs="6">
                  <Label>Country</Label>
                  <Input
                    type="text"
                    name="country"
                    id="country"
                    placeholder="USA"
                    onChange={(e) => {
                      handleChange(e);
                    }}
                  />
                </Col>
              </Row>
            </FormGroup>
            <FormGroup>
              <Row>
                <Col xs="6">
                  <Label>ZIP Code</Label>
                  <Input
                    type="text"
                    name="zip_code"
                    id="zip_code"
                    placeholder="54770"
                    onChange={(e) => {
                      handleChange(e);
                    }}
                  />
                </Col>
                {/* </FormGroup>
            <FormGroup> */}
                <Col xs="6">
                  <Label>ADHAAR Number</Label>
                  <Input
                    type="text"
                    name="adhaar_number"
                    id="adhaar_number"
                    placeholder="0"
                    onChange={(e) => {
                      handleChange(e);
                    }}
                  />
                </Col>
              </Row>
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button
            //   type="submit"
            onClick={() => {
              console.log('pushed : ', data);
              setOpen(false);
            }}
          >
            Submit
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default InputPersonalInformation;
