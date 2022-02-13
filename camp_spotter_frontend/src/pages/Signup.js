import React, { useState } from "react";
import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "../App.css";

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
    <div className="form">

      <h1 className="signup-header text-center text-white">Signup</h1>
      <div className="bottom-text">
        Already have an account? <Link to="/login" style={{ color: '#055d3d', textDecoration: 'inherit'}}><span className="fw-bold">Login here</span></Link>
      </div>
      
      

      <Form onSubmit={handleSubmit}>
        <Form.Group className="form-group mt-5" size="lg" controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control
            autoFocus
            type="username"
            value={username}
            placeholder="Please enter your username"
            onChange={(e) => setUserName(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="form-group" size="lg" controlId="firstname">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            autoFocus
            type="firstname"
            value={firstname}
            placeholder="Please enter your first name"
            onChange={(e) => setFirstName(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="form-group" size="lg" controlId="lastname">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            autoFocus
            type="lastname"
            value={lastname}
            placeholder="Please enter your last name"
            onChange={(e) => setLastName(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="form-group" size="lg" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            autoFocus
            type="email"
            value={email}
            placeholder="Please enter your email address"
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="form-group" size="lg" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            placeholder="Please create your password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="form-group" size="lg" controlId="password">
          <Form.Label>Validate Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            placeholder="Please repeat your password"
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
        <div className="text-center button mb-5">
        <Button size="lg" type="submit" disabled={!validateForm()} className="mt-3 btn-success">
          Signup
        </Button>
        </div>
      </Form>
      <div style={{ height: "5vh" }}> </div>
    </div>
  );
}
