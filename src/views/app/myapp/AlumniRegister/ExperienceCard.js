import React from 'react';
import { Container, Row, Col, Card, CardBody } from 'reactstrap';

const experiences = [
  {
    id: 1,
    role: 'Director Of Technology - Distributed Platform Engineering',
    company: 'Target',
    duration: 'February, 2020 - Present',
    tenure: '4Y, 5M',
    logo: ''
  },
  {
    id: 2,
    role: 'Technical Instructor - System Design and Architecture',
    company: 'upGrad',
    duration: 'July, 2022 - February, 2023',
    tenure: '7M',
    logo: ''
  },
  {
    id: 3,
    role: 'Senior Technical Lead',
    company: 'Adobe',
    duration: 'July, 2019 - February, 2020',
    tenure: '7M',
    logo: ''
  },
  {
    id: 4,
    role: 'Senior Software Engineer-4 / Staff Engineer',
    company: 'Apple',
    duration: 'February, 2018 - July, 2019',
    tenure: '1Y, 5M',
    logo: ''
  },
  {
    id: 5,
    role: 'Technical Lead',
    company: 'Cohesity',
    duration: 'January, 2018 - February, 2018',
    tenure: '1M',
    logo: ''
  }
];

const ExperienceCard = ({ experience }) => (
  <Row className="mb-4 align-items-center">
    <Col md="2" className="text-center">
      <p className="mb-0">{experience.duration}</p>
      <small className="text-muted">({experience.tenure})</small>
    </Col>
    <Col md="10">
      <Card className="p-2">
        <CardBody>
          <Row>
            <Col md="1">
              <img src={experience.logo} alt={experience.company} className="rounded-circle" width="40" height="40" />
            </Col>
            <Col md="11">
              <h5 className="mb-1">{experience.role}</h5>
              <h6 className="text-muted mb-0">{experience.company}</h6>
            </Col>
          </Row>
        </CardBody>
      </Card>
    </Col>
  </Row>
);

const ExperiencePage = () => (
  <Container className="my-4">
    <h4 className="mb-4">Career Journey</h4>
    {experiences.map(exp => (
      <ExperienceCard key={exp.id} experience={exp} />
    ))}
  </Container>
);

export default ExperiencePage;
