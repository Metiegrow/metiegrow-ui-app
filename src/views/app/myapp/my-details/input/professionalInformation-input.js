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
import professionalInformationData from '../data/professionalInformation-data';

function InputProfessionalInformation() {
  const [data, setData] = useState({
    Organization: '',
    Role: '',
    StartDate: '',
    EndDate: '',
    TerminationReason: '',
  });
  const { payload } = professionalInformationData;
  const [open, setOpen] = useState(false);
  function toggleModalFunction() {
    setOpen((oldValue) => !oldValue);
  }

  function handleChange(event) {
    switch (event.target.name) {
      case 'organization':
        setData((prevValue) => {
          return { ...prevValue, Organization: event.target.value };
        });

        break;
      case 'role':
        setData((prevValue) => {
          return { ...prevValue, Role: event.target.value };
        });
        break;
      case 'start_date':
        setData((prevValue) => {
          return { ...prevValue, StartDate: event.target.value };
        });
        break;
      case 'end_date':
        setData((prevValue) => {
          return { ...prevValue, EndDate: event.target.value };
        });
        break;
      case 'termination_rsn':
        setData((prevValue) => {
          return {
            ...prevValue,
            TerminationReason: event.target.value,
          };
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
          style={{ margin: '0 3% 3% 0' }}
          outline
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
            Professional Information
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
                  <Label>Organization</Label>
                  <Input
                    type="text"
                    name="organization"
                    id="organization"
                    placeholder="NUST"
                    onChange={(e) => {
                      handleChange(e);
                    }}
                  />
                </Col>
                {/* </FormGroup>
            <FormGroup> */}
                <Col xs="6">
                  <Label>Role</Label>
                  <Input
                    type="text"
                    name="role"
                    id="role"
                    placeholder="Professor"
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
                  <Label>Start Date</Label>
                  <Input
                    type="date"
                    name="start_date"
                    id="start_date"
                    placeholder=""
                    onChange={(e) => {
                      handleChange(e);
                    }}
                  />
                </Col>
                {/* </FormGroup>
            <FormGroup> */}
                <Col xs="6">
                  <Label>End Date</Label>
                  <Input
                    type="date"
                    name="end_date"
                    id="end_date"
                    placeholder=""
                    onChange={(e) => {
                      handleChange(e);
                    }}
                  />
                </Col>
              </Row>
            </FormGroup>
            <FormGroup>
              <Label>Termination Reason</Label>
              <Input
                type="text"
                name="termination_rsn"
                id="termination_rsn"
                placeholder="bad manners"
                onChange={(e) => {
                  handleChange(e);
                }}
              />
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

export default InputProfessionalInformation;
