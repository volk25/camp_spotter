import React from "react";
import Navbar from "../components/Navbar";

import {
  Button,
  Col,
  Row,
  Card,
  CardGroup,
  Stack,
  Container,
  Form,
  Image,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import "../App.css";

function handleSubmit(event) {
  event.preventDefault();
}
function MyCamps() {
  return (
    <div className="background">
      <br />
      <br />
      <Container>
        <Row>
          <div style={{ color: "white", margin: "auto" }}>
            <h4> My Camps </h4>
          </div>
          <CardGroup>
            <Card>
              <Card.Img variant="top" src="holder.js/100px160" />
              <Card.Body>
                <Card.Title>Camp Amsterdam</Card.Title>
                <Card.Text>Brief explanation about the camp</Card.Text>
                <Button variant="primary">Edit</Button>
                <Button variant="danger">Delete</Button>
              </Card.Body>
            </Card>
            <Card>
              <Card.Img variant="top" src="holder.js/100px160" />
              <Card.Body>
                <Card.Title>Camp Utrecht</Card.Title>
                <Card.Text>Brief Camp details here</Card.Text>
                <Button variant="primary">Edit</Button>
                <Button variant="danger">Delete</Button>
              </Card.Body>
            </Card>
            <Card>
              <Card.Img variant="top" src="holder.js/100px160" />
              <Card.Body>
                <Card.Title>Camp Rotterdam</Card.Title>
                <Card.Text>Brief Camp explanation here</Card.Text>
                <Button variant="primary">Edit</Button>
                <Button variant="danger">Delete</Button>
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

export default MyCamps;
