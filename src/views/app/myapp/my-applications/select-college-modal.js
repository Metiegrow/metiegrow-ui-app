import React, { useState } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  InputGroup,
  InputGroupButtonDropdown,
  Row,
  Col,
  DropdownItem,
  DropdownToggle,
  DropdownMenu,
} from 'reactstrap';

const MenuOptions = [
  {
    id: 0,
    name: 'UCP',
  },
  {
    id: 1,
    name: 'UOL',
  },
  {
    id: 3,
    name: 'BNU',
  },
  {
    id: 4,
    name: 'ITU',
  },
  {
    id: 5,
    name: 'GCU',
  },
  {
    id: 6,
    name: 'GUL',
  },
  {
    id: 7,
    name: 'LUMS',
  },
  {
    id: 8,
    name: 'ATC',
  },
  {
    id: 9,
    name: 'PU',
  },
];

function SelectCollegeModal() {
  const [open, setOpen] = useState(false);
  const [dropDowsState, setDropDownState] = useState(false);
  const [dropDownValue, setDropDownValue] = useState('Select College');

  //   const [data, setData] = useState({
  //     value: '',
  //   });
  function toggleModalFunction() {
    setOpen((oldValue) => !oldValue);
  }
  //   function handleUploadData(e) {
  //     setData(e.target.value);
  //   }

  return (
    <div>
      <Button
        outline
        // style={{ margin: '0 3% 3% 0' }}
        onClick={() => {
          toggleModalFunction();
        }}
      >
        Add New
      </Button>

      <div>
        <Modal
          style={{ maxWidth: '30%' }}
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
              College Name
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
              <Col xs="12">
                <InputGroup>
                  <InputGroupButtonDropdown
                    addonType="prepend"
                    isOpen={dropDowsState}
                    toggle={() => {
                      setDropDownState((prevValue) => {
                        return !prevValue;
                      });
                    }}
                  >
                    <Button
                      outline
                      color={
                        dropDownValue === 'Select College'
                          ? 'danger'
                          : 'secondary'
                      }
                    >
                      {dropDownValue}
                    </Button>
                    <DropdownToggle
                      split
                      outline
                      color={
                        dropDownValue === 'Select College'
                          ? 'danger'
                          : 'secondary'
                      }
                    />
                    <DropdownMenu>
                      {MenuOptions.map((product) => {
                        return (
                          <DropdownItem
                            key={product.id}
                            onClick={(e) => {
                              setDropDownValue(e.target.innerHTML);
                            }}
                          >
                            {product.name}
                          </DropdownItem>
                        );
                      })}
                    </DropdownMenu>
                  </InputGroupButtonDropdown>
                </InputGroup>
              </Col>
            </Row>
          </ModalBody>
          <ModalFooter>
            <Button
              onClick={() => {
                console.log('Selected College : ', dropDownValue);
                setOpen(false);
              }}
            >
              Add
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    </div>
  );
}

export default SelectCollegeModal;
