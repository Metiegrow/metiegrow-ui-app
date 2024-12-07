import React from "react";
import { Colxx } from "components/common/CustomBootstrap";
import {
  Button,
  Card,
  CardBody,
  CardTitle,
  Form,
  FormGroup,
  // FormText,
  Input,
  Label,
  Row,
} from "reactstrap";

const Settings = () => {
  return (
    <Row className="mb-4 justify-content-center">
      <Colxx xxs="12" md="8" lg="8">
        <Card>
          <CardBody>
            <CardTitle>Reset email</CardTitle>
            <Form>
              <FormGroup>
                <Input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Enter your email"
                />
                {/* <FormText color="muted">email</FormText> */}
              </FormGroup>

              <Button color="primary" className="mt-4">
                Reset email
              </Button>
            </Form>
          </CardBody>
        </Card>
      </Colxx>
      <Colxx xxs="12" md="8" lg="8" className="mt-3">
        <Card>
          <CardBody>
            <CardTitle>Reset password</CardTitle>
            <Form>
              <FormGroup>
                <Label for="oldPassword">Enter old password</Label>
                <Input
                  type="password"
                  name="oldPassword"
                  id="oldPassword"
                  placeholder="Enter old password"
                />
              </FormGroup>
              <FormGroup>
                <Label for="newPassword">Enter new password</Label>
                <Input
                  type="password"
                  name="newPassword"
                  id="newPassword"
                  placeholder="Enter new password"
                />
              </FormGroup>
              <FormGroup>
                <Label for="confirmPassword">Confirm new password</Label>
                <Input
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  placeholder="Confirm new password"
                />
              </FormGroup>

              <Button color="primary" className="mt-4">
                Reset Password
              </Button>
            </Form>
          </CardBody>
        </Card>
      </Colxx>
    </Row>
  );
};

export default Settings;
