import React from 'react';
import { Row, Card, Button, Jumbotron, CardBody } from "reactstrap";
import { Colxx } from "components/common/CustomBootstrap";

const LawyerJumbotron = () => {
  return (
   <>
     <Row>
          <Colxx xxs="12" className="mb-4">
            <Card>
              <CardBody className="text-center">
                <i
                  alt=""
                  className="glyph-icon iconsminds-yes text-success "
                  style={{ fontSize: "75px"}}
                />
  
                <Jumbotron className="text-center">
                  <h1 className="display-4">Submitted Succesfully!</h1>
                  <p className="lead">We will reach you shortly</p>
                  <hr className="my-4" />
  
                  <p className="lead mb-0 ">
                    <Button color="primary" size="lg">
                      Check status
                    </Button>
                  </p>
                </Jumbotron>
              </CardBody>
            </Card>
          </Colxx>
        </Row>
   </>
  );
}

export default LawyerJumbotron;
