import React from "react";
import Navbar from "../components/Navbar";

import {
  Form,
  Row,
  Col,
  Button,
  Image,
  Container,
  Stack,
  Figure,
  Card,
  CardGroup,
} from "react-bootstrap";
import "../App.css";

function handleSubmit(event) {
  event.preventDefault();
}
function UserProfile() {
  return (
    <div className="background">
      <Container>
        <Row>
          <Col>
            <Image
              className="profileimage"
              src="https://www.winhelponline.com/blog/wp-content/uploads/2017/12/user.png"
            />

            <div style={{ color: "white", margin: "auto" }}>
              <h4 className="nickname">@ProCamper</h4>
            </div>
          </Col>
          <Col>
            <Form className="profileform">
              <Form.Group
                as={Row}
                className="mb-3"
                controlId="formPlainTextName"
              >
                <Form.Label column sm="2">
                  First Name :
                </Form.Label>
                <Col sm="10">
                  <Form.Control
                    type="text"
                    placeholder="John"
                    aria-label="Disabled input example"
                    disabled
                    readOnly
                  />
                </Col>
              </Form.Group>
              <Form.Group
                as={Row}
                className="mb-3"
                controlId="formPlainTextLastname"
              >
                <Form.Label column sm="2">
                  Last Name :
                </Form.Label>
                <Col sm="10">
                  <Form.Control
                    type="text"
                    placeholder="Doe"
                    aria-label="Disabled input example"
                    disabled
                    readOnly
                  />
                </Col>
              </Form.Group>
              <Form.Group
                as={Row}
                className="mb-3"
                controlId="formPlainTextLastname"
              >
                <Form.Label column sm="2">
                  Email :
                </Form.Label>
                <Col sm="10">
                  <Form.Control
                    type="text"
                    placeholder="example@gmail.com"
                    aria-label="Disabled input example"
                    disabled
                    readOnly
                  />
                </Col>
              </Form.Group>
              <Form.Group
                as={Row}
                className="mb-3"
                controlId="formPlainTextEmail"
              >
                <Form.Label column sm="2">
                  Date Joined :
                </Form.Label>
                <Col sm="10">
                  <Form.Control
                    type="text"
                    placeholder="01/01/2020"
                    aria-label="Disabled input example"
                    disabled
                    readOnly
                  />
                </Col>
              </Form.Group>
            </Form>
          </Col>
        </Row>
      </Container>
      <Container>
        <Row>
          <div style={{ color: "white", margin: "auto" }}>
            <h4>Camps </h4>
          </div>
          <CardGroup>
            <Card>
              <Card.Img variant="top" src="holder.js/100px160" />
              <Card.Body>
                <Card.Title>Camp Amsterdam</Card.Title>
                <Card.Text>Brief explanation about the camp</Card.Text>
              </Card.Body>
            </Card>
            <Card>
              <Card.Img variant="top" src="holder.js/100px160" />
              <Card.Body>
                <Card.Title>Camp Utrecht</Card.Title>
                <Card.Text>Brief Camp details here</Card.Text>
              </Card.Body>
            </Card>
            <Card>
              <Card.Img variant="top" src="holder.js/100px160" />
              <Card.Body>
                <Card.Title>Camp Rotterdam</Card.Title>
                <Card.Text>Brief Camp explanation here</Card.Text>
              </Card.Body>
            </Card>
          </CardGroup>
        </Row>
      </Container>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    </div>
  );
}

export default UserProfile;
