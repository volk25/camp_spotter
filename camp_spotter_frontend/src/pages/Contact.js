import React from "react";

import ContactForm from "./ContactForm";

function Contact() {
  return (
    <div className="background text-center text-white mt-5">
      <h1 className="contact-header">Contact</h1>
      <ContactForm />
      <div style={{ height: "100vh" }}> </div>
    </div>
  );
}

export default Contact;

