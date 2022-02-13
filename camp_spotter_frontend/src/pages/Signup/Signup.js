import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Navbar from "../../components/Navbar/Navbar";
import "./Signup.css";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUserName] = useState("");
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [image, setImage] = useState("");

  function validateForm() {
    return email.length > 0 && password.length > 0 && username.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
  }

  return (
    <div className="Signup">
      <div><Navbar/></div>
      <h1 className="signup-header">Signup</h1>
      <div className="bottom-text mt-5">
        Already have an account? <a href="/login">Login here</a>
      </div>
      <div style={{ height: "50vh" }}> </div>
      

      <Form onSubmit={handleSubmit}>
        <Form.Group className="form-group" size="lg" controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control
            autoFocus
            type="username"
            value={username}
            onChange={(e) => setUserName(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="form-group" size="lg" controlId="firstname">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            autoFocus
            type="firstname"
            value={firstname}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="form-group" size="lg" controlId="lastname">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            autoFocus
            type="lastname"
            value={lastname}
            onChange={(e) => setLastName(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="form-group" size="lg" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            autoFocus
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="form-group" size="lg" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="form-group" size="lg" controlId="password">
          <Form.Label>Validate Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="form-group" size="lg" controlId="lastname">
          <Form.Label className="custom-file-label" htmlFor="inputGroupFile01">Upload your profile image</Form.Label>
          <Form.Control
            autoFocus
            type="file"
            className="custom-file-input"
            id="inputGroupFile01"
            aria-describedby="inputGroupFileAddon01"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </Form.Group>
        <div className="text-center button">
        <Button size="lg" type="submit" disabled={!validateForm()} className="mt-3 btn-success">
          Signup
        </Button>
        </div>
      </Form>
     
    </div>
  );
}
