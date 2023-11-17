import React, { useState } from 'react';
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
import educationalInformationData from '../data/educationalInformation-data';
// import classNames from 'classnames';

const bachelorDgDomainCourseOptions = [
  'Select',
  'pf',
  'oop',
  'databse',
  'psycology',
  'calculus',
  'discrete math',
  'communication skill',
  'technical writing',
  'functional english',
  'ISL',
  'PS',
  'Human resource management',
];

const { payload } = educationalInformationData;
function InputEducationalInformation() {
  const [data, setData] = useState({
    TwelfthPercentage: '',
    TenthPercentage: '',
    TwelfthGroup: '',
    BachelorDegreeName: '',
    BachelorDegreeDomainCourse: '',
    BachelorPercentage: '',
    Backlogs: '',
  });

  const [open, setOpen] = useState(false);
  function toggleModalFunction() {
    setOpen((oldValue) => !oldValue);
  }

  function handleChange(event) {
    switch (event.target.name) {
      case 'twelfth_percent':
        setData((prevValue) => {
          return { ...prevValue, TwelfthPercentage: event.target.value };
        });

        break;
      case 'tenth_percent':
        setData((prevValue) => {
          return { ...prevValue, TenthPercentage: event.target.value };
        });
        break;
      case 'twelfth_group':
        setData((prevValue) => {
          return { ...prevValue, TwelfthGroup: event.target.value };
        });
        break;
      case 'bachelor_degName':
        setData((prevValue) => {
          return { ...prevValue, BachelorDegreeName: event.target.value };
        });
        break;
      case 'bachelor_degDomain_course':
        setData((prevValue) => {
          return {
            ...prevValue,
            BachelorDegreeDomainCourse: event.target.value,
          };
        });
        break;
      case 'bachelor_degPercentage':
        setData((prevValue) => {
          return { ...prevValue, BachelorPercentage: event.target.value };
        });
        break;
      case 'Backlogs':
        setData((prevValue) => {
          return { ...prevValue, Backlogs: event.target.value };
        });
        break;

      default:
        console.log('default ran');
        break;
    }
    setTimeout(() => {
      console.log(data);
    }, 2000);
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

      <div>
        <Modal
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
              Educational Information
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
              {/* <div
        style={{
          display: 'flex',
          flexBasis: '40%',
          flexWrap: 'wrap',
          rowGap: '10px',
          justifyContent: 'space-evenly',
          alignContent: 'space-between',
        }}
        > */}
              {/* <div
            style={{ width: '50%' }}
          > */}
              <FormGroup inline>
                <Row>
                  <Col xs="6">
                    <Label>Twelfth Percentage</Label>
                    <Input
                      // style={{ width: '50%' }}
                      type="text"
                      name="twelfth_percent"
                      id="twelfth_percent"
                      placeholder="eg 80"
                      onChange={(e) => {
                        handleChange(e);
                      }}
                    />
                  </Col>
                  {/* </FormGroup>
                <FormGroup> */}
                  <Col xs="6">
                    <Label>Tenth Percentage</Label>
                    <Input
                      // style={{ width: '50%' }}
                      type="text"
                      name="tenth_percent"
                      id="tenthth_percent"
                      placeholder="eg 80"
                      onChange={(e) => {
                        handleChange(e);
                      }}
                    />
                  </Col>
                </Row>
              </FormGroup>
              <FormGroup>
                <Label>Twelfth Group</Label>
                <Input
                  type="text"
                  name="twelfth_group"
                  id="twelfth_group"
                  placeholder="eg A"
                  onChange={(e) => {
                    handleChange(e);
                  }}
                />
              </FormGroup>
              <FormGroup>
                <Row>
                  <Col xs="6">
                    <Label>Bachelor Degree Name</Label>
                    <Input
                      type="text"
                      name="bachelor_degName"
                      id="bachelor_degName"
                      placeholder="eg Computer Science"
                      onChange={(e) => {
                        handleChange(e);
                      }}
                    />
                  </Col>
                  {/* </FormGroup> */}
                  {/* </div> */}
                  {/* <div style={{ width: '50%' }}> */}
                  {/* <FormGroup> */}
                  <Col xs="6">
                    <Label>Bachelor Degree Domain Course</Label>
                    <Input
                      type="select"
                      name="bachelor_degDomain_course"
                      id="bachelor_degDomain_course"
                      placeholder="eg Computer Science"
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
                <Row>
                  <Col xs="6">
                    <Label>Bachelor Percentage</Label>
                    <Input
                      type="text"
                      name="bachelor_degPercentage"
                      id="bachelor_degPercentage"
                      placeholder="eg 80"
                      onChange={(e) => {
                        handleChange(e);
                      }}
                    />
                  </Col>
                  {/* </FormGroup>
              <FormGroup> */}
                  <Col xs="6">
                    <Label>Backlogs</Label>
                    <Input
                      type="text"
                      name="Backlogs"
                      id="Backlogs"
                      placeholder="0"
                      onChange={(e) => {
                        handleChange(e);
                      }}
                    />
                  </Col>
                </Row>
              </FormGroup>
              {/* </div> */}
              {/* </div> */}
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
    </div>
  );
}

export default InputEducationalInformation;
