import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "../App.css";

/**
 * After inputting the credentials, if they are correct, the token is memorized in the localStorage and used for further
 * authentication on website pages. If the credentials are not correct an alert notifying about it is displayed.
 * @returns stores in localStorage the token
 */
export default function ObtainAuthToken() {

	// Define the variables/constants/states
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState();
	let navigate = useNavigate();

	/**
	 * Form validator (it will be also validated in the backend)
	 * @returns
	 */
	function validateForm() {
	return username.length > 0 && password.length > 0;
	}

	/**
	 * Event handler for credentials submission
	 * @param {*} event
	 */
	function handleSubmit(event) {

		event.preventDefault();

		// Fetch the data to the API (keep in mind that the current requesting address should be authorized in the API)
		fetch('http://127.0.0.1:8000/api-token-auth/', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
			username: username,
			password: password,
			})
		})

		// Process the response if it is ok, otherwise throw an error
		.then(response => {
			if (!response.ok) {
				throw Error(response.statusText) 
			};
			return response.json()
		})

		// Set the token to a variable in the localStorage and redirect the user
		.then(result => {
			localStorage.setItem('token', result.token)
			navigate('/map') // this can be changed further on!!!
		})

		// Catch the error if present, and specify an error message for it
		.catch(err => {
			if (err.message === 'Bad Request') {
				setError('Invalid username and/or password, please check your credentials.');
			} 
		})

  	};

	// Render the component
	return (

    	<div>

			{/* Create an allert for notifying about wrong credentials if this is the case*/}
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
			<Form.Group className="form-group" size="lg" controlId="username">
				<Form.Label>Username *</Form.Label>
				<Form.Control
					autoFocus
					type="username"
					value={username}
					placeholder="Please enter your username"
					onChange={(e) => setUsername(e.target.value)}
				/>
			</Form.Group>

			{/* Password input group */}
			<Form.Group className="form-group" size="lg" controlId="password">
				<Form.Label>Password *</Form.Label>
				<Form.Control
					type="password"
					value={password}
					placeholder="Please enter your password"
					onChange={(e) => setPassword(e.target.value)}
				/>
			</Form.Group>

			{/* Required fields warning */}
			<div className="bottom-text">
				Fields marked with  *  are the required ones.
			</div>

			{/* Login button group */}
			<div className="text-center">
				<Button size="lg" type="submit" disabled={!validateForm()} className="mt-3 btn-success">Login</Button>
			</div>

      	</Form>

    </div>
  );
};
