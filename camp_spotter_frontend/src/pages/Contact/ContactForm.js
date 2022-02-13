import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Navbar from "../../components/Navbar/Navbar";
import "./ContactForm.css";

export default function ContactForm() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [name, setFullName] = useState("");

  function validateForm() {
    return email.length > 0 && message.length > 0 && name.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
  }

  return (
    <div className="Contact">
      <div style={{ height: "50vh" }}> </div>

      <Form onSubmit={handleSubmit}>
        <Form.Group className="form-group" size="lg" controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            autoFocus
            type="name"
            value={name}
            placeholder="Enter your name here"
            onChange={(e) => setFullName(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="form-group" size="lg" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            autoFocus
            type="email"
            value={email}
            placeholder="Enter your email address here"
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="form-group" size="lg" controlId="message" >
          <Form.Label>Enter your message</Form.Label>
          <Form.Control
            type="message"
            value={message}
            componentClass="textarea" 
            style={{ height: 300}}
            onChange={(e) => setMessage(e.target.value)}
          />
        </Form.Group>
        <div className="text-center">
          <Button block size="lg" type="submit" disabled={!validateForm()} className="mt-3 btn-success">
            Send
          </Button>
        </div>
      </Form>
    </div>
  );
}
