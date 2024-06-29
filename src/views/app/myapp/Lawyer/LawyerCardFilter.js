import { Colxx } from "components/common/CustomBootstrap";
import React, { useState } from "react";
import {
  CustomInput,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  FormGroup,
  Label,
  Row,
} from "reactstrap";
import { RangeTooltip } from "components/common/SliderTooltips";

const LawyerCardFilter = () => {
  const [dropdownBasicOpen, setDropdownBasicOpen] = useState(false);
  const [dropdownBasicOpen1, setDropdownBasicOpen1] = useState(false);
  const [dropdownBasicOpen2, setDropdownBasicOpen2] = useState(false);
  const [dropdownBasicOpen3, setDropdownBasicOpen3] = useState(false);

  return (
    <div>
      <Row className="mb-4">
        <Colxx xxs="12" sm="12" md="12" lg="12" className=" ">
          <div className="">
            <div className="d-flex flex-wrap  my-3">
              <Dropdown
                isOpen={dropdownBasicOpen}
                toggle={() => setDropdownBasicOpen(!dropdownBasicOpen)}
                className="mb-5 mx-2"
              >
                <DropdownToggle caret color="secondary" outline>
                  Topics
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem>
                    <span>Designer</span>
                  </DropdownItem>
                  <DropdownItem>
                    <span>Developer</span>
                  </DropdownItem>
                  <DropdownItem>
                    <span>Product Marketer</span>
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>

              <Dropdown
                isOpen={dropdownBasicOpen1}
                toggle={() => setDropdownBasicOpen1(!dropdownBasicOpen1)}
                className="mb-5 mx-2"
              >
                <DropdownToggle caret color="secondary" outline>
                  Languages
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem>
                    <span>HTML</span>
                  </DropdownItem>
                  <DropdownItem>
                    <span>CSS</span>
                  </DropdownItem>
                  <DropdownItem>
                    <span>JS</span>
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
              <Dropdown
                isOpen={dropdownBasicOpen2}
                toggle={() => setDropdownBasicOpen2(!dropdownBasicOpen2)}
                className="mb-5 mx-2"
              >
                <DropdownToggle caret color="secondary" outline>
                  Location
                </DropdownToggle>
                <DropdownMenu className="">
                  <FormGroup className="d-flex   ">
                    <CustomInput type="checkbox" id="" />
                    <Label>Startup</Label>
                  </FormGroup>
                </DropdownMenu>
              </Dropdown>
              <Dropdown
                isOpen={dropdownBasicOpen3}
                toggle={() => setDropdownBasicOpen3(!dropdownBasicOpen3)}
                className="mb-5 mx-2"
              >
                <DropdownToggle caret color="secondary" outline>
                  Price
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem>
                    <RangeTooltip
                      min={500}
                      max={1500}
                      className="mb-5"
                      defaultValue={[800, 1200]}
                      allowCross={false}
                      pushable={100}
                    />
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
              {/* <Dropdown
                isOpen={dropdownBasicOpen4}
                toggle={() => setDropdownBasicOpen4(!dropdownBasicOpen4)}
                className="mb-5 mx-2"
              >
                <DropdownToggle caret color="secondary" outline>
                  More Filters
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem>
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown> */}
            </div>
          </div>
        </Colxx>
      </Row>
    </div>
  );
};

export default LawyerCardFilter;
