import React from "react";
import "../App.css";
import TokenObtain from '../components/TokenObtain';

/**
 * Render the login page.
 * @returns renders the login page
 */
export default function LoginPage() {

	// Render the page
	return (

		<div className="Login">

			{/* Create a header */}
			<h1 className="login-header mt-5">Login</h1>
			<div style={{ height: "40vh" }}></div>

			{/* Render the Authentication form */}
			<div>
				<TokenObtain />
			</div>

			<div style={{ height: "100vh" }}></div>
		
		</div>

	);
};
