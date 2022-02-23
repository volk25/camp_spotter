import React from "react";
import { Link } from "react-router-dom";
import "../App.css";
import UserCreate from '../components/UserCreate';
import NavBar from "../components/NavBar";

/**
 * Signup page of the application.
 * The following components are used:
 * - UserCreate
 * @returns renders the page
 */
export default function SignupPage() {

	// Render the page
  	return(

    	<div>
			{/* Render the Navbar component */}
			<div className='position-relative'>
				<NavBar/>
			</div>

			{/* Create a header */}
			<h1 className="signup-header text-center text-white">Signup</h1>
			<div className="bottom-text mt-3">
				Already have an account? <Link to="/login" style={{ color: '#055d3d', textDecoration: 'inherit'}}><span className="fw-bold">Login here</span></Link>
			</div>
		
			{/* Render the UserCreate form */}
			<div>
				<UserCreate/>
			</div>
				
			<div style={{ height: "5vh" }}></div>

    	</div>

  	);
};
