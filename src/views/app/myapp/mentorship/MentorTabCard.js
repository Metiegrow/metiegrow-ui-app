import React, { useState } from 'react';
import {
  Row,
  Card,
  CardBody,
  CardTitle,
  CardHeader,
  Nav,
  NavItem,
  TabContent,
  TabPane,
 Button
} from 'reactstrap';
import { NavLink, useHistory } from 'react-router-dom';

import classnames from 'classnames';

import { Colxx } from 'components/common/CustomBootstrap';
import { adminRoot } from 'constants/defaultValues';

const MentorTabCard = ({ handleConnectClick, chatUserId , price}) => {
  const [activeFirstTab, setActiveFirstTab] = useState('3');
  const role = localStorage.getItem("roleRes")
  
  const history = useHistory();
  const handleChatClick = () => {
    history.push(`${adminRoot}/chat/${chatUserId}`)
  }
  return (
    <Row  className="mt-4">
      <Colxx xxs="12">
    
        <Row>
          <Colxx xxs="12" xs="6" lg="10">
            <Card className="mb-4 ">
              <CardHeader>
                <Nav tabs className="card-header-tabs ">
                  {/* <NavItem>
                    <NavLink
                      to="#"
                      location={{}}
                      className={classnames({
                        active: activeFirstTab === '1',
                        'nav-link': true,
                      })}
                      onClick={() => {
                        setActiveFirstTab('1');
                      }}
                    >
                      6 months
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      to="#"
                      location={{}}
                      className={classnames({
                        active: activeFirstTab === '2',
                        'nav-link': true,
                      })}
                      onClick={() => {
                        setActiveFirstTab('2');
                      }}
                    >
                      3 months
                    </NavLink>
                  </NavItem> */}
                  <NavItem>
                    <NavLink
                      to="#"
                      location={{}}
                      className={classnames({
                        active: activeFirstTab === '3',
                        'nav-link': true,
                      })}
                      onClick={() => {
                        setActiveFirstTab('3');
                      }}
                    >
                      Hourly plan
                    </NavLink>
                  </NavItem>
                  {/* <NavItem>
                    <NavLink
                      to="#"
                      location={{}}
                      className={classnames({
                        active: activeFirstTab === '4',
                        'nav-link': true,
                      })}
                      onClick={() => {
                        setActiveFirstTab('4');
                      }}
                    >
                      Premium1
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      to="#"
                      location={{}}
                      className={classnames({
                        active: activeFirstTab === '5',
                        'nav-link': true,
                      })}
                      onClick={() => {
                        setActiveFirstTab('5');
                      }}
                    >
                      Premium2
                    </NavLink>
                  </NavItem> */}
                </Nav>
              </CardHeader>

              <TabContent activeTab={activeFirstTab}>
                {/* <TabPane tabId="1">
                <Row>
                    <Colxx sm="12">
                      <CardBody>
                        <CardTitle className="mb-4">
                        <h2>₹12500</h2>
                          <h5>Premium package</h5>
                        </CardTitle>
                       
                      </CardBody>
                    </Colxx>
                  </Row>
                </TabPane>
                <TabPane tabId="2">
                  <Row>
                    <Colxx sm="12">
                      <CardBody>
                        <CardTitle className="mb-4">
                        <h2>₹8500</h2>
                          <h5>Standard package</h5>
                        </CardTitle>
                       
                      </CardBody>
                    </Colxx>
                  </Row>
                </TabPane> */}
                <TabPane tabId="3">
                <Row>
                    <Colxx sm="12">
                      <CardBody>
                        <CardTitle className="mb-4">
                          {price && <h2>₹{price}</h2>}
                          <h5>Basic package</h5>
                          <div className='mt-4 '>
                            <div className=''  >
                              {role.includes("MENTEE") && (
                                <Row>
                            <Button onClick={handleConnectClick} outline color="primary" className=" font-weight-semibold mx-2 " size='large'>
                                <span className='font-weight-semibold  text-one'>Connect</span>
                              
                            </Button>
                            <Button onClick={handleChatClick} outline color="primary" className=" font-weight-semibold mx-2 " size='large'>
                                <span className='font-weight-semibold  text-one'>Contact</span>
                              
                            </Button>
                            </Row>
                            )}
                            </div>
                            </div>
                        </CardTitle>
                       
                      </CardBody>
                    </Colxx>
                  </Row>
                </TabPane>
                {/* <TabPane tabId="4">
                  <Row>
                    <Colxx sm="12">
                      <CardBody>
                        <CardTitle className="mb-4">
                        <h2>₹12500</h2>
                          <h5>Premium package 1</h5>
                        </CardTitle>
                       
                      </CardBody>
                    </Colxx>
                  </Row>
                </TabPane>
                <TabPane tabId="5">
                  <Row>
                    <Colxx sm="12">
                      <CardBody>
                        <CardTitle className="mb-4">
                        <h2>₹15500</h2>
                          <h5>Premium package 2</h5>
                        </CardTitle>
                       
                      </CardBody>
                    </Colxx>
                  </Row>
                </TabPane> */}
              </TabContent>
            </Card>
          </Colxx>

        </Row>
      </Colxx>
    </Row>
  );
};

export default MentorTabCard;
