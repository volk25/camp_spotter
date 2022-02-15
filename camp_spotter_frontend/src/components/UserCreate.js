import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "../App.css";

/**
 * Renders the user-create form, sends the form data in the body of a POST request (all users are allowed).
 * @returns user create component
 */
export default function UserCreate() {

	// Define the variables/constants/states
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [firstname, setFirstName] = useState("");
	const [lastname, setLastName] = useState("");
	const [image, setImage] = useState("");
	const [password, setPassword] = useState("");
	const [password2, setPassword2] = useState("");
	const [error, setError] = useState();
	let navigate = useNavigate();

	/**
	 * Form validator (it will be also validated in the backend)
	 * @returns
	 */
	function validateForm() {
	return email.length > 0 && password.length > 0 && password2.length > 0 && username.length > 0;
	}

	/**
	 * Event handler for Signup details submission
	 * @param {*} event
	 */
	function handleSubmit(event) {

		event.preventDefault();

		// Prepare the payload to be attached to the fetch body
		let formData = new FormData()
		formData.append('username', username);
		formData.append('email', email);
		formData.append('first_name', firstname);
		formData.append('last_name', lastname);
		formData.append('password', password);
		formData.append('password2', password2);
		formData.append('image', image)

		// Fetch the data to the API (keep in mind that the current requesting address should be authorized in the API)
		fetch('http://127.0.0.1:8000/users/', {
			method: 'POST',
			body: formData
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
			navigate('/map') // this can be changed further on!!!
		})

		// Catch the error if present, and specify an error message for it
		.catch(err => {
			if (err.message === 'Bad Request') {
				setError('Please fill in all the required fields');
			}
		})

	};

	// Render the component
  	return(

      	<div className="form">

			{/* Create an allert for notifying about wrong input */}
			{ error ?
				<div class="alert alert-danger fixed-bottom w-25 mx-3" role="alert">
				{error}
				</div>
			:
				<div></div>
			}

			{/* Initialize the form */}
			<Form onSubmit={handleSubmit}>

				{/* Username input group */}
				<Form.Group className="form-group mt-5" size="lg" controlId="username">
					<Form.Label>Username *</Form.Label>
					<Form.Control
						autoFocus
						type="username"
						value={username}
						placeholder="Please enter your username"
						onChange={(e) => setUsername(e.target.value)}
					/>
				</Form.Group>

				{/* First name input group */}
				<Form.Group className="form-group" size="lg" controlId="firstname">
					<Form.Label>First Name</Form.Label>
					<Form.Control
						autoFocus
						type="text"
						value={firstname}
						placeholder="Please enter your first name"
						onChange={(e) => setFirstName(e.target.value)}
					/>
				</Form.Group>

				{/* Last name input group */}
				<Form.Group className="form-group" size="lg" controlId="lastname">
					<Form.Label>Last Name</Form.Label>
					<Form.Control
						autoFocus
						type="text"
						value={lastname}
						placeholder="Please enter your last name"
						onChange={(e) => setLastName(e.target.value)}
					/>
				</Form.Group>

				{/* Email input form */}
				<Form.Group className="form-group" size="lg" controlId="email">
					<Form.Label>Email *</Form.Label>
					<Form.Control
						autoFocus
						type="text"
						value={email}
						placeholder="Please enter your email address"
						onChange={(e) => setEmail(e.target.value)}
					/>
				</Form.Group> 

				{/* Password input group */}
				<Form.Group className="form-group" size="lg" controlId="password">
					<Form.Label>Password *</Form.Label>
					<Form.Control
						type="password"
						value={password}
						placeholder="Please create your password"
						onChange={(e) => setPassword(e.target.value)}
					/>
				</Form.Group>

				{/* Password confirmation input group */}
				<Form.Group className="form-group" size="lg" controlId="password2">
					<Form.Label>Confirm Password *</Form.Label>
					<Form.Control
						type="password"
						value={password2}
						placeholder="Please repeat your password"
						onChange={(e) => setPassword2(e.target.value)}
					/>
				</Form.Group> 

				{/* Image upload group */}
				<Form.Group className="form-group" size="lg">
					<Form.Label>Upload your profile image</Form.Label>
					<Form.Control
						type="file"
						onChange={(e) => setImage(e.target.files[0])}
					/>
				</Form.Group>

				{/* Required fields warning */}
				<div className="bottom-text">
					Fields marked with  *  are the required ones.
				</div>

				{/* Signup button group */}
				<div className="text-center button mb-5">
					<Button size="lg" type="submit" disabled={!validateForm()} className="mt-3 btn-success">Signup</Button>
				</div>

      		</Form>

    	</div>
  	);
};