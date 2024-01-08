import React from 'react';
import { Card, Col, Container, Row, Table } from 'reactstrap';
import { Colxx } from 'components/common/CustomBootstrap';
import { NavLink } from 'react-router-dom';
import { adminRoot } from 'constants/defaultValues';
// import Courses from 'courses/courses';



const ProfilePage = () => {
  return (
    <>
      <Row>
        <Colxx xxs="12">
          <h1>Home</h1>
          
        </Colxx>
       
      </Row>
      <Container
        style={{
          maxHeight: '650px',
          overflowY: 'scroll',
        }}
      >
        <Row>
          <Col xs="4" className="pb-3">
            <Card className="p-3  ">
              <NavLink
                to={`${adminRoot}/myapplications#9`}
                onClick={(e) => console.log(e)}
              >
                <Container>
                  <Row>
                    <Col>
                      <p className="h4 pt-2"> Application 10</p>
                     
                    </Col>
                  </Row>
                </Container>
                <Table>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Application ID</td>
                      <td>00123</td>
                    </tr>
                    <tr>
                      <td>College Name</td>
                      <td>UCP</td>
                    </tr>
                    <tr>
                      <td>Course Name</td>
                      <td>Maths</td>
                    </tr>
                    <tr>
                      <td>Application Status</td>
                      <td>Passed</td>
                    </tr>
                  </tbody>
                </Table>
              </NavLink>
            </Card>
          </Col>
        </Row>
      </Container>
      
    </>
  );
};

export default ProfilePage;
