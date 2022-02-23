import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "../App.css";

/**
* Renders the contact form, sends the form data in the body of a POST request to formsubmit.co.
* @returns renders the form and sends POST requests to formsubmit.co.
*/
export default function ContactForm() {

	// Define the variables/constants/states
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [message, setMessage] = useState("");
	let navigate = useNavigate();

	/**
	* Form validator
	* @returns
	*/
	function validateForm() {
		return email.length > 0 && message.length > 0 && name.length > 0;
	}

	/**
	* Event handler for form submission
	* As from the official formsubmit site https://formsubmit.co/ajax-documentation.
	* @param {*} event
	*/
	function handleSubmit(event) {

		event.preventDefault();

		// Fetch the data to formsubmit.co API
		fetch('https://formsubmit.co/ajax/nikita.volkov25@gmail.com', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				name: name,
				message: message,
				email: email
			})
		})

		// Process the response if it is ok, otherwise throw an error
		.then(response => {
			if (!response.ok) {
				throw Error(response.statusText) 
			};
			return response.json()
		})

		// Redirect the user
		.then(() => {
			navigate('/thankyou') // this can be changed further on!!!
		})

		// Catch the error if present, and console.log it
		.catch(err => console.log(err))

  	};

	// Render the component
	return(

		<div className="Contact text-white">
			<div style={{ height: "50vh" }}></div>

			{/* Initialize the form */}
			<Form onSubmit={handleSubmit}>

				{/* Name input group */}
				<Form.Group className="form-group" size="lg" controlId="name">
					<Form.Label> Name *</Form.Label>
					<Form.Control
					autoFocus
					type="text"
					value={name}
					placeholder="Enter your name here"
					onChange={(e) => setName(e.target.value)}/>
				</Form.Group>

				{/* Email input group */}
				<Form.Group className="form-group" size="lg" controlId="email">
					<Form.Label>Email *</Form.Label>
					<Form.Control
					autoFocus
					type="email"
					value={email}
					placeholder="Enter your email address here"
					onChange={(e) => setEmail(e.target.value)}/>
				</Form.Group>

				{/* Message input group */}
				<Form.Group className="form-group" size="lg" controlId="message" >
					<Form.Label>Enter your message *</Form.Label>
					<Form.Control
					type="text"
					value={message}
					componentClass="textarea" 
					style={{ height: 300}}
					onChange={(e) => setMessage(e.target.value)}/>
				</Form.Group>

				{/* Required fields warning */}
				<div className="bottom-text">
					Fields marked with  *  are the required ones.
				</div>

				{/* Send button group */}
				<div className="text-center">
					<Button 
					block size="lg" 
					type="submit" 
					disabled={!validateForm()} 
					className="mt-3 btn-success">
					Send message
					</Button>
				</div>

			</Form>

		</div>
	);
};
