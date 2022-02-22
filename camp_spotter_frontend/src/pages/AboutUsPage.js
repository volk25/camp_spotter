import React from "react";
import ContactForm from "../components/ContactForm";
import { Card, Button } from "react-bootstrap";

/**
 * Render the contact page.
 * @returns renders the page
 */
export default function AboutUsPage() {

  // Render the page
  return (

    <div>

      {/* About Us Text */}
      <div className="background text-center text-white mt-5">
        <h1 className="contact-header">About Us</h1>
      </div>

      {/* About us text */}
      <div className="text-white mt-5 h5 w-50 aboutUs">
        Magna sint do non ipsum duis velit quis ea magna enim tempor aute
        sit deserunt. Officia veniam sint voluptate eiusmod nostrud sunt
        deserunt labore cillum elit est deserunt ut. Occaecat aute duis
        aliqua ad. Ullamco in enim enim laboris esse incididunt amet. Ad
        deserunt ut cupidatat id veniam velit elit labore occaecat
        occaecat incididunt consequat ipsum. Voluptate aliqua ea cupidatat
        reprehenderit dolore enim occaecat officia commodo voluptate ut
        veniam. Nostrud ea aliqua proident eu ea irure do sit dolor
        proident esse culpa.
      </div>

      {/* Insert the contact form */}
      <div className="background  text-white mt-5">
        <h1 className="contact-header text-center">Contact</h1>
        <ContactForm />
        <div style={{ height: "100vh" }}></div>
      </div>

    </div>
  );
}
