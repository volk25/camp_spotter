import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "../App.css";

/**
 * Render the login-form, sends the form data with a POST request (all users are allowed).
 * @returns stores in localStorage the token
 */
export default function TokenObtain() {

	// Define the variables/constants/states
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const responseOk = useRef(false);
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
		
		// Fetch the data to the API
		fetch('http://127.0.0.1:8000/token/', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				username: username,
				password: password,
			})
		})

		// Process the response
		.then(response => {
			if (response.ok) {
                responseOk.current = true
            };
			return response.json()
		})

		// Store the token in localStorage redirect and reload the page if the reponse was ok, otherwise show toasts with the errors
		// The page is reloaded in order for the navbar to realize the presence of the token and adjust its menu structure
		.then((result) => {
			if (responseOk.current) {
				localStorage.setItem('token', result.token)
				navigate('/map/localize')
				window.location.reload(false)
			} else {
				for(var i in result){
					for(var k in result[i]){
						toast.error(result[i][k])
					}
				}
			}
		})

		// Catch the other errors if present
		.catch(err => console.log(err))

  	};

	// Render the component
	return (

    	<div>

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
