import React, { useState } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  ButtonDropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
  Row,
  Col,
} from 'reactstrap';

function UploadData(props) {
  const { MenuOptions } = props;
  const [dropDownValue, setDropDownValue] = useState('Document Type');
  const [dropDowsState, setDropDownState] = useState(false);
  const [open, setOpen] = useState(false);
  const [data, setData] = useState({
    file: '',
    type: '',
  });

  function handleUploadData(type, value) {
    switch (type) {
      case 'documentTypeSelect':
        setData((prevValue) => {
          return { ...prevValue, type: value };
        });
        break;
      case 'fileName':
        setData((prevValue) => {
          return { ...prevValue, file: value };
        });
        break;
      default:
        break;
    }
  }

  function toggleModalFunction() {
    setOpen((oldValue) => !oldValue);
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
          {MenuOptions.title === null ? 'Upload Document' : 'Edit'}
        </Button>
      </span>

      <div>
        <Modal
          style={{ maxWidth: '70%' }}
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
              Upload Document
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
            <Row>
              <Col xs="6">
                <Input
                  onChange={(e) => {
                    console.log(e.target.files);
                    handleUploadData('fileName', e.target.files);
                  }}
                  type="file"
                />
              </Col>
              <Col xs="6">
                <ButtonDropdown
                  direction="right"
                  isOpen={dropDowsState}
                  toggle={() => {
                    setDropDownState((prevValue) => {
                      return !prevValue;
                    });
                  }}
                >
                  <DropdownToggle caret>{dropDownValue}</DropdownToggle>
                  <DropdownMenu>
                    {MenuOptions.map((product) => {
                      return (
                        <DropdownItem
                          name="documentTypeSelect"
                          onClick={(e) => {
                            console.log(e);
                            setDropDownValue(e.target.innerHTML);
                            handleUploadData(
                              'documentTypeSelect',
                              e.target.innerHTML
                            );
                          }}
                          key={product.id}
                        >
                          {product.title}
                        </DropdownItem>
                      );
                    })}
                  </DropdownMenu>
                </ButtonDropdown>
              </Col>
            </Row>
          </ModalBody>
          <ModalFooter>
            <Button
              //   type="submit"
              onClick={() => {
                console.log('pushed : ', data);
                setOpen(false);
              }}
            >
              Upload
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    </div>
  );
}

export default UploadData;
