import React from "react";
import ContactForm from "../components/ContactForm";

/**
 * Render the contact page. 
 * @returns renders the page
 */
export default function ContactPage() {

	// Render the page
	return(

		// Insert the contact form
		<div className="background text-center text-white mt-5">
			<h1 className="contact-header">Contact</h1>
			<ContactForm/>
			<div style={{ height: "100vh" }}></div>
		</div>

	);
};