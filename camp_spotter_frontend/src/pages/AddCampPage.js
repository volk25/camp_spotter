import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import "../App.css";
import CampCreate from '../components/CampCreate';
import NavBar from "../components/NavBar";

/**
 * Add camp page of the application.
 * The following components are used:
 * - Navbar
 * - CampCreate
 * @returns renders the page
 */
export default function AddCampPage() {

	// Define the parameters coming from outside the component
	const token = localStorage.getItem('token')

	// Define the variables/constants/states
	let navigate = useNavigate();

	// Redirect to the login page if without token
	useEffect(() => {
		if (!token) {
			navigate('/login')
		}
	},[]);

	// Render the page
  	return(

		<div>
		
			{/* Render the Navbar component */}
			<div className='position-relative'>
				<NavBar/>
			</div>

			{/* Create a header */}
			<h1 className="text-center text-white">Add Camp</h1>
		
			{/* Insert the CampCreate component */}
			<div>
				<CampCreate 
				token={token}/>
			</div>

			<div style={{ height: "5vh" }}></div>

    	</div>
  	);
};