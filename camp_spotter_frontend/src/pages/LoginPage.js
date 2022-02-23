import React from "react";
import "../App.css";
import TokenObtain from '../components/TokenObtain';
import NavBar from "../components/NavBar";

/**
 * Render the login page.
 * The following components are used:
 * - Navbar
 * - TokenObtain
 * @returns renders the login page
 */
export default function LoginPage() {

	// Render the page
	return (

		<div className="Login">
			{/* Render the Navbar component */}
			<div className='position-relative'>
				<NavBar/>
			</div>

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
