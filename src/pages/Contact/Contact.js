import React from "react";
import NavBar from "../../components/Navbar/Navbar";
import "../Home/Home.css";
import ContactForm from "./ContactForm";

function Contact() {
  return (
    <div className="background">
      <NavBar />
      <h1 className="contact-header">Contact</h1>
      <ContactForm />
      <div style={{ height: "100vh" }}> </div>
    </div>
  );
}

export default Contact;
