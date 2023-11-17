import React, { useEffect, useState } from 'react';
import {
  Collapse,
  Card,
  Button,
  Row,
  Col,
  Container,
  Table,
  InputGroup,
  Input,
  InputGroupAddon,
} from 'reactstrap';
import { Colxx } from 'components/common/CustomBootstrap';
import { ContextMenuTrigger } from 'react-contextmenu';

const AllUserApplications = (props) => {
  const userType = localStorage.getItem('userType');

  const { currentItem, expand } = props;
  console.log(props);
  const [toggle, onSetToggle] = useState(expand);
  function onButtonClick() {
    onSetToggle((prevValue) => !prevValue);
  }
  const title = 'Application';

  const handleClickScroll = () => {
    const element = document.getElementById('9');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };
  useEffect(() => {
    setTimeout(() => {
      handleClickScroll();
    }, 200);
  }, []);

  return (
    <div id={`${currentItem.id}`}>
      <Colxx xxs="12" className="mb-3" key={currentItem.id}>
        <ContextMenuTrigger id="menu_id" data={title}>
          <Card>
            <div className="pl-2 d-flex flex-grow-1 min-width-zero">
              <div className="card-body align-self-center d-flex flex-column flex-lg-row  min-width-zero align-items-lg-center">
                <span className="d-flex ">
                  <p className="h4" style={{ marginRight: '1rem' }}>
                    {`${title} ${currentItem.id}`}
                  </p>
                </span>
              </div>
              <div className="align-self-center">
                {userType === 'COORDINATOR' && toggle === true && (
                  <Button outline>Update Status</Button>
                )}
                <Button
                  color="link"
                  size="lg"
                  onClick={() => {
                    onButtonClick();
                  }}
                >
                  <i
                    className={
                      toggle === !false
                        ? 'iconsminds-arrow-up'
                        : 'iconsminds-arrow-down'
                    }
                  />
                </Button>
              </div>
            </div>
            <Collapse isOpen={toggle}>
              <div
                className="pl-4"
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  flex: '0 0 73%',
                }}
              >
                <Container>
                  <Row className="mr-3">
                    <Col xs="4">
                      <p className="h6">Application Id : {currentItem.id}</p>
                    </Col>
                    <Col xs="4">
                      <p className="h6">
                        College Name : {currentItem.collegeName}
                      </p>
                    </Col>
                    <Col xs="4">
                      <p className="h6">
                        Applied Date : {currentItem.createdAt}
                      </p>
                    </Col>
                  </Row>
                  <Row className="mr-3 mt-3">
                    <Col xs="8">
                      <p className="h5">Status</p>
                      <Card>
                        <Table>
                          <thead>
                            <tr>
                              <th>#</th>
                              <th>Event</th>
                              <th>Updated at</th>
                            </tr>
                          </thead>
                          <tbody>
                            {currentItem.applnEventLogs.map((subItem) => {
                              return (
                                <tr key={subItem.updatedAt}>
                                  <td>
                                    <i className="iconsminds-yes" />
                                  </td>
                                  <td>{subItem.eventName}</td>
                                  <td>{subItem.updatedAt} pm</td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </Table>
                      </Card>
                    </Col>
                  </Row>
                  <Row className=" mt-5 mb-5 ">
                    <Col xs="8">
                      <p className="h5">Comments</p>
                      <Card>
                        <Table>
                          <tbody>
                            {currentItem.applnMsgLogs.map((subItem) => {
                              return (
                                <React.Fragment key={subItem.created_at}>
                                  <tr>
                                    <th>{subItem.senderName}</th>
                                    <th className="text-right">
                                      {subItem.created_at}pm
                                    </th>
                                  </tr>
                                  <tr>
                                    <td>{subItem.message}</td>
                                  </tr>
                                </React.Fragment>
                              );
                            })}
                          </tbody>
                        </Table>
                        <InputGroup className="p-3">
                          <Input
                            placeholder="New Comment"
                            style={{ borderColor: '#4556ac' }}
                          />
                          <InputGroupAddon addonType="append">
                            <Button
                              onClick={() => {
                                console.log('i was clicked');
                              }}
                            >
                              Post
                            </Button>
                          </InputGroupAddon>
                        </InputGroup>
                      </Card>
                    </Col>
                  </Row>
                </Container>
              </div>
            </Collapse>
          </Card>
        </ContextMenuTrigger>
      </Colxx>
    </div>
  );
};

export default AllUserApplications;
